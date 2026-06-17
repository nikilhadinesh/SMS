import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name:'', email:'', password:'', role:'student' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup Success! Now Login.');
      navigate('/');
    } catch(err) {
      alert('Signup Failed: ' + (err.response?.data?.message || 'Error'));
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.blob1}/><div style={s.blob2}/>
      <div style={s.card}>
        <div style={s.logoWrap}>
          <div style={s.logoCircle}><span style={{fontSize:28}}><GraduationCap /></span></div>
          <span style={s.logoText}>EduSync</span>
        </div>
        <h1 style={s.title}>Create Account</h1>
        <p style={s.subtitle}>Join the student portal</p>
        <form onSubmit={handleSignup} style={s.form}>
          <Field label="Full Name" value={formData.name} onChange={v=>setFormData({...formData,name:v})} required/>
          <Field label="Email" type="email" value={formData.email} onChange={v=>setFormData({...formData,email:v})} required/>
          <Field label="Password" type="password" value={formData.password} onChange={v=>setFormData({...formData,password:v})} required/>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={s.label}>Role</label>
            <select value={formData.role} onChange={e=>setFormData({...formData,role:e.target.value})} style={s.select}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={s.btn} disabled={loading}>{loading?'Creating...':'Create Account'}</button>
        </form>
        <p style={s.footer}>Already have an account? <Link to="/" style={s.link}>Sign in</Link></p>
      </div>
    </div>
  );
}

function Field({label,value,onChange,type='text',required}) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      <label style={{color:'#94a3b8',fontSize:13,fontWeight:500}}>{label}</label>
      <input type={type} value={value} required={required} onChange={e=>onChange(e.target.value)}
        style={{padding:'12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'#f1f5f9',fontSize:14,outline:'none'}}/>
    </div>
  );
}

const s = {
  page:{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0e1a',fontFamily:"'Inter',sans-serif",position:'relative',overflow:'hidden'},
  blob1:{position:'fixed',top:'-100px',right:'-100px',width:400,height:400,background:'radial-gradient(circle,rgba(99,102,241,0.25),transparent 70%)',borderRadius:'50%',filter:'blur(40px)'},
  blob2:{position:'fixed',bottom:'-80px',left:'-80px',width:350,height:350,background:'radial-gradient(circle,rgba(168,85,247,0.2),transparent 70%)',borderRadius:'50%',filter:'blur(50px)'},
  card:{position:'relative',zIndex:1,background:'rgba(15,20,40,0.85)',backdropFilter:'blur(20px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:24,padding:'48px 40px',width:'100%',maxWidth:400,boxShadow:'0 25px 60px rgba(0,0,0,0.5)'},
  logoWrap:{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:24},
  logoCircle:{width:52,height:52,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center'},
  logoText:{fontSize:24,fontWeight:800,background:'linear-gradient(90deg,#6366f1,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'},
  title:{color:'#f1f5f9',fontSize:24,fontWeight:700,textAlign:'center',margin:'0 0 6px'},
  subtitle:{color:'#64748b',fontSize:14,textAlign:'center',margin:'0 0 24px'},
  form:{display:'flex',flexDirection:'column',gap:16},
  label:{color:'#94a3b8',fontSize:13,fontWeight:500},
  select:{padding:'12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'#f1f5f9',fontSize:14,outline:'none'},
  btn:{padding:'14px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:12,color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'},
  footer:{color:'#64748b',textAlign:'center',marginTop:20,fontSize:14},
  link:{color:'#818cf8',textDecoration:'none',fontWeight:600},
};