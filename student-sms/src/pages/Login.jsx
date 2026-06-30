import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, LogIn, GraduationCap } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      if (user.role !== role) {
        alert('Role mismatch! Check your selection.');
        setLoading(false);
        return;
      }
      navigate(`/${user.role}-dashboard`);
    } catch {
      alert('Login Failed: Invalid credentials');
    }
    setLoading(false);
  };

  const roleIcons = { student: '', teacher: '', admin: '' };

  return (
    <div style={s.page}>
      <div style={s.blob1} /><div style={s.blob2} /><div style={s.blob3} />
      <div style={s.card}>
        <div style={s.logoWrap}>
          <div style={s.logoCircle}><span style={{fontSize:28}}><GraduationCap /></span></div>
          <span style={s.logoText}>EduSync</span>
        </div>
        <h1 style={s.title}>Welcome Back</h1>
        <p style={s.subtitle}>Sign in to your portal</p>
        <div style={s.roleTabs}>
          {['student','teacher','admin'].map(r=>(
            <button key={r} onClick={()=>setRole(r)} style={{...s.roleTab,...(role===r?s.roleTabActive:{})}}>
              {roleIcons[r]} {r.charAt(0).toUpperCase()+r.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleLogin} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <div style={s.inputWrap}>
              <Mail size={16} style={{margin:'0 12px',color:'#94a3b8'}} />
              <input type="email" style={s.input} placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <Lock size={16} style={{margin:'0 12px',color:'#94a3b8'}} />
              <input type={showPass?'text':'password'} style={s.input} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="button" onClick={()=>setShowPass(!showPass)} style={s.eyeBtn}>{showPass?'':''}</button>
            </div>
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? <span style={s.spinner}/> : <>Sign In →</>}
          </button>
        </form>
        <p style={s.footer}>Don't have an account? <Link to="/signup" style={s.link}>Sign up</Link></p>
      </div>
    </div>
  );
}

const s = {
  page:{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0e1a',fontFamily:"'Inter','Segoe UI',sans-serif",overflow:'hidden',position:'relative'},
  blob1:{position:'fixed',top:'-100px',left:'-100px',width:400,height:400,background:'radial-gradient(circle,rgba(99,102,241,0.3),transparent 70%)',borderRadius:'50%',filter:'blur(40px)',zIndex:0},
  blob2:{position:'fixed',bottom:'-100px',right:'-100px',width:500,height:500,background:'radial-gradient(circle,rgba(168,85,247,0.25),transparent 70%)',borderRadius:'50%',filter:'blur(50px)',zIndex:0},
  blob3:{position:'fixed',top:'50%',left:'50%',width:300,height:300,background:'radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)',borderRadius:'50%',filter:'blur(60px)',zIndex:0,transform:'translate(-50%,-50%)'},
  card:{position:'relative',zIndex:1,background:'rgba(15,20,40,0.85)',backdropFilter:'blur(20px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:24,padding:'48px 40px',width:'100%',maxWidth:420,boxShadow:'0 25px 60px rgba(0,0,0,0.5)'},
  logoWrap:{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:28},
  logoCircle:{width:52,height:52,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(99,102,241,0.4)'},
  logoText:{fontSize:24,fontWeight:800,background:'linear-gradient(90deg,#6366f1,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'},
  title:{color:'#f1f5f9',fontSize:26,fontWeight:700,textAlign:'center',margin:'0 0 6px'},
  subtitle:{color:'#64748b',fontSize:14,textAlign:'center',margin:'0 0 28px'},
  roleTabs:{display:'flex',gap:8,marginBottom:28,background:'rgba(255,255,255,0.04)',borderRadius:12,padding:4},
  roleTab:{flex:1,padding:'9px 4px',border:'none',borderRadius:9,cursor:'pointer',fontSize:13,fontWeight:500,color:'#94a3b8',background:'transparent',transition:'all 0.2s'},
  roleTabActive:{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',boxShadow:'0 4px 15px rgba(99,102,241,0.4)'},
  form:{display:'flex',flexDirection:'column',gap:20},
  field:{display:'flex',flexDirection:'column',gap:6},
  label:{color:'#94a3b8',fontSize:13,fontWeight:500},
  inputWrap:{display:'flex',alignItems:'center',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,overflow:'hidden'},
  icon:{padding:'0 12px',fontSize:16},
  input:{flex:1,background:'transparent',border:'none',outline:'none',padding:'13px 4px',color:'#f1f5f9',fontSize:14},
  eyeBtn:{background:'none',border:'none',cursor:'pointer',padding:'0 12px',fontSize:16},
  btn:{padding:'15px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',fontWeight:700,fontSize:16,boxShadow:'0 4px 20px rgba(99,102,241,0.4)',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:8},
  spinner:{width:20,height:20,border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid #fff',borderRadius:'50%',display:'inline-block'},
  footer:{color:'#64748b',textAlign:'center',marginTop:24,fontSize:14},
  link:{color:'#818cf8',textDecoration:'none',fontWeight:600},
};


