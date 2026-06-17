

// // App.jsx
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

// Route guard
function PrivateRoute({ children, allowedRole }) {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" />;
  if (allowedRole && role !== allowedRole) return <Navigate to={`/${role}-dashboard`} />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', 'Segoe UI', sans-serif; }
        input, select, textarea { font-family: inherit; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/student-dashboard" element={
          <PrivateRoute allowedRole="student"><StudentDashboard /></PrivateRoute>
        } />
        <Route path="/teacher-dashboard" element={
          <PrivateRoute allowedRole="teacher"><TeacherDashboard /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}