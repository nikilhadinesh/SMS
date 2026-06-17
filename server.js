require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Database ───────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB Error:', err));

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

// Signup (Admin uses this to create students & teachers)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role, studentDetails, teacherDetails } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email,
      password: hashed,
      role,
      studentDetails: role === 'student' ? studentDetails : undefined,
      teacherDetails: role === 'teacher' ? teacherDetails : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── STUDENT ROUTES ──────────────────────────────────────────────────────────

app.get('/api/student/profile/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/student/by-reg/:regNo', async (req, res) => {
  try {
    const student = await User.findOne({
      'studentDetails.registerNumber': req.params.regNo
    }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students
app.get('/api/admin/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all teachers
app.get('/api/admin/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── TEACHER ROUTES ───────────────────────────────────────────────────────────

// Add marks to a student
app.post('/api/teacher/add-marks', async (req, res) => {
  try {
    const { id, marks } = req.body;
    const updated = await User.findByIdAndUpdate(
      id,
      { $push: { 'studentDetails.marks': marks } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a mark entry
app.delete('/api/teacher/delete-marks/:studentId/:markId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.studentId, {
      $pull: { 'studentDetails.marks': { _id: req.params.markId } }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or replace a timetable day for a student
app.post('/api/teacher/add-timetable', async (req, res) => {
  try {
    const { id, timetable } = req.body; // timetable = { day, periods: [] }

    // Remove existing entry for same day first
    await User.findByIdAndUpdate(id, {
      $pull: { 'studentDetails.timetable': { day: timetable.day } }
    });

    // Push new entry
    await User.findByIdAndUpdate(id, {
      $push: { 'studentDetails.timetable': timetable }
    });

    res.json({ success: true, message: 'Timetable updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── LEAVE REQUEST ROUTES ─────────────────────────────────────────────────────

// Student submits leave request
app.post('/api/leave/request', async (req, res) => {
  try {
    const { studentId, teacherId, fromDate, toDate, reason } = req.body;

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const leaveData = {
      studentId,
      studentName: student.name,
      registerNumber: student.studentDetails?.registerNumber,
      fromDate,
      toDate,
      reason,
      status: 'pending',
      createdAt: new Date()
    };

    // Add to student's own leave history
    await User.findByIdAndUpdate(studentId, {
      $push: { 'studentDetails.leaveRequests': leaveData }
    });

    // Add to teacher's inbox
    await User.findByIdAndUpdate(teacherId, {
      $push: { 'teacherDetails.leaveInbox': leaveData }
    });

    res.json({ success: true, message: 'Leave request sent!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Teacher updates leave status
app.post('/api/leave/update-status', async (req, res) => {
  try {
    const { teacherId, leaveId, studentId, status } = req.body;

    // Update in teacher's inbox
    await User.updateOne(
      { _id: teacherId, 'teacherDetails.leaveInbox._id': leaveId },
      { $set: { 'teacherDetails.leaveInbox.$.status': status } }
    );

    // Update in student's leave requests (match by studentId + same timing)
    await User.updateOne(
      { _id: studentId, 'studentDetails.leaveRequests._id': leaveId },
      { $set: { 'studentDetails.leaveRequests.$.status': status } }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all teachers (for student to select when sending leave)
app.get('/api/teachers/list', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('name _id teacherDetails.subject');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── SERVER ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('SMS Backend Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));