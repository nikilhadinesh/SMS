const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: String,
  registerNumber: String,
  fromDate: String,
  toDate: String,
  reason: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },

  studentDetails: {
    profilePhoto: String,
    registerNumber: String,
    degree: String,
    section: String,
    branch: String,
    grade: String,
    aadhaarNumber: String,
    marks: [{ subject: String, internal: Number, external: Number }],
    timetable: [{
      day: { type: String },
      periods: [String]
    }],
    father: { name: String, occupation: String },
    mother: { name: String, occupation: String },
    guardian: { name: String, occupation: String },
    address: { street: String, city: String, state: String, country: String, pincode: String },
    personalDetails: {
      languages: [String],
      panNumber: String,
      bloodGroup: String,
      height: String,
      weight: String,
      linkedIn: String,
      dob: String,
      phone: String
    },
    leaveRequests: [leaveRequestSchema]
  },

  teacherDetails: {
    subject: String,
    assignedClass: String,
    department: String,
    phone: String,
    qualification: String,
    experience: String,
    marks: [{ subject: String, internal: Number, external: Number }],
    timetable: [{
      day: { type: String },
      periods: [String]
    }],
    leaveInbox: [leaveRequestSchema]
  },

  adminLevel: { type: String, default: 'super' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);