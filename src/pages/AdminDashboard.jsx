// import { useState } from 'react';
// import axios from 'axios';

// export default function AdminDashboard() {
//   const [formData, setFormData] = useState({
//     name: '', email: '', password: '', role: 'student',
//     registerNumber: '',
//     studentDetails: {
//       grade: '', registerNumber: '', degree: '', branch: '', section: '',
//       father: { name: '', occupation: '' },
//       mother: { name: '', occupation: '' },
//       address: { street: '', city: '', state: '', pincode: '' },
//       personalDetails: { bloodGroup: '', height: '', weight: '', linkedIn: '', aadhaarNumber: '', panNumber: '' }
//     }
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', formData);
//       alert("Student added successfully!");
//     } catch (err) { alert("Error: " + (err.response?.data?.message || "Failed")); }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.card}>
//         <h1 style={styles.heading}>Add New Student</h1>
//         <div style={styles.grid}>
//           <input style={styles.input} placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
//           <input style={styles.input} placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
//           <input type="password" style={styles.input} placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
//           <input 
//     style={styles.input} 
//     placeholder="Reg No" 
//     onChange={(e) => setFormData({...formData, registerNumber: e.target.value})} 
// />
//           <input style={styles.input} placeholder="Degree" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, degree: e.target.value}})} />
//           <input style={styles.input} placeholder="Branch" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, branch: e.target.value}})} />
//           <input style={styles.input} placeholder="Grade" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, grade: e.target.value}})} />
//           <input style={styles.input} placeholder="Section" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, section: e.target.value}})} />
//           <input style={styles.input} placeholder="Father Name" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, father: {...formData.studentDetails.father, name: e.target.value}}})} />
//           <input style={styles.input} placeholder="Father Occupation" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, father: {...formData.studentDetails.father, occupation: e.target.value}}})} />
//           <input style={styles.input} placeholder="Mother Name" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, mother: {...formData.studentDetails.mother, name: e.target.value}}})} />
//           <input style={styles.input} placeholder="Mother Occupation" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, mother: {...formData.studentDetails.mother, occupation: e.target.value}}})} />
//           <input style={styles.input} placeholder="Street Address" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, address: {...formData.studentDetails.address, street: e.target.value}}})} />
//           <input style={styles.input} placeholder="City" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, address: {...formData.studentDetails.address, city: e.target.value}}})} />
//           <input style={styles.input} placeholder="State" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, address: {...formData.studentDetails.address, state: e.target.value}}})} />
//           <input style={styles.input} placeholder="Pincode" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, address: {...formData.studentDetails.address, pincode: e.target.value}}})} />
//           <input style={styles.input} placeholder="Blood Group" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, bloodGroup: e.target.value}}})} />
//           <input style={styles.input} placeholder="Height" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, height: e.target.value}}})} />
//           <input style={styles.input} placeholder="Weight" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, weight: e.target.value}}})} />
//           <input style={styles.input} placeholder="[Aadhaar Redacted]" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, aadhaarNumber: e.target.value}}})} />
//           <input style={styles.input} placeholder="PAN Number" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, panNumber: e.target.value}}})} />
//           <input style={styles.input} placeholder="LinkedIn Profile" onChange={(e) => setFormData({...formData, studentDetails: {...formData.studentDetails, personalDetails: {...formData.studentDetails.personalDetails, linkedIn: e.target.value}}})} />
//         </div>
//         <button type="submit" style={styles.button}>Add Student</button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', padding: '40px', display: 'flex', justifyContent: 'center' },
//   card: { backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: '900px' },
//   heading: { color: '#fff', textAlign: 'center', marginBottom: '30px' },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   input: { padding: '12px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.8)', transition: '0.3s' },
//   button: { marginTop: '30px', width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: '#00d2ff', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }
// };


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Lock, UsersIcon, LogIn, GraduationCap, UserCog, PlusIcon } from 'lucide-react';
const TABS = ['Add Student', 'Add Teacher', 'All Students', 'All Teachers'];

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchStudents = () => axios.get('http://localhost:5000/api/admin/students').then(r => setStudents(r.data));
  const fetchTeachers = () => axios.get('http://localhost:5000/api/admin/teachers').then(r => setTeachers(r.data));

  useEffect(() => { if (tab === 2) fetchStudents(); if (tab === 3) fetchTeachers(); }, [tab]);

  // Student Form 
  const [sf, setSf] = useState({
    name:'', email:'', password:'', role:'student',
    studentDetails:{
      registerNumber:'', degree:'', branch:'', section:'', grade:'',
      aadhaarNumber:'',
      father:{name:'',occupation:''},
      mother:{name:'',occupation:''},
      address:{street:'',city:'',state:'',country:'',pincode:''},
      personalDetails:{bloodGroup:'',height:'',weight:'',panNumber:'',linkedIn:'',dob:'',phone:''}
    }
  });

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', sf);
      showToast('Student added successfully!');
      setSf({name:'',email:'',password:'',role:'student',studentDetails:{registerNumber:'',degree:'',branch:'',section:'',grade:'',aadhaarNumber:'',father:{name:'',occupation:''},mother:{name:'',occupation:''},address:{street:'',city:'',state:'',country:'',pincode:''},personalDetails:{bloodGroup:'',height:'',weight:'',panNumber:'',linkedIn:'',dob:'',phone:''}}});
    } catch(err) { showToast('Error: ' + (err.response?.data?.message || 'Failed')); }
  };

  // ---------- Teacher Form ----------
  const [tf, setTf] = useState({
    name:'', email:'', password:'', role:'teacher',
    teacherDetails:{ subject:'', assignedClass:'', department:'', phone:'', qualification:'', experience:'' }
  });

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', tf);
      showToast('Teacher added successfully!');
      setTf({name:'',email:'',password:'',role:'teacher',teacherDetails:{subject:'',assignedClass:'',department:'',phone:'',qualification:'',experience:''}});
    } catch(err) { showToast('Error: ' + (err.response?.data?.message || 'Failed')); }
  };

  const us = (fn) => (k, v) => fn(prev => ({ ...prev, [k]: v }));
  const usd = (k, v) => setSf(p => ({ ...p, studentDetails: { ...p.studentDetails, [k]: v }}));
  const usdFather = (k,v) => setSf(p => ({...p,studentDetails:{...p.studentDetails,father:{...p.studentDetails.father,[k]:v}}}));
  const usdMother = (k,v) => setSf(p => ({...p,studentDetails:{...p.studentDetails,mother:{...p.studentDetails.mother,[k]:v}}}));
  const usdAddr = (k,v) => setSf(p => ({...p,studentDetails:{...p.studentDetails,address:{...p.studentDetails.address,[k]:v}}}));
  const usdPers = (k,v) => setSf(p => ({...p,studentDetails:{...p.studentDetails,personalDetails:{...p.studentDetails.personalDetails,[k]:v}}}));
  const utd = (k,v) => setTf(p => ({...p,teacherDetails:{...p.teacherDetails,[k]:v}}));

  return (
    <div style={s.page}>
      {toast && <div style={s.toast}>{toast}</div>}
      <div style={s.header}>
        <div style={s.logoRow}><UserCog size={24} style={s.logoIcon} /><span style={s.logoTxt}>Admin Dashboard</span></div>
        <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={s.logoutBtn}>Logout</button>
      </div>

      <div style={s.tabs}>
        {TABS.map((t,i) => (
          <button key={i} onClick={() => setTab(i)} style={{...s.tab,...(tab===i?s.tabActive:{})}}>{t}</button>
        ))}
      </div>

      <div style={s.content}>

        {/* ADD STUDENT */}
        {tab === 0 && (
          <form onSubmit={handleStudentSubmit} style={s.form}>
            <h2 style={s.formTitle}><PlusIcon size={20} style={s.formIcon} /> Add New Student</h2>
            <div style={s.sect}><div style={s.sectTitle}>Account Info</div>
              <div style={s.grid3}>
                <Field label="Full Name" value={sf.name} onChange={v=>setSf(p=>({...p,name:v}))} required/>
                <Field label="Email" type="email" value={sf.email} onChange={v=>setSf(p=>({...p,email:v}))} required/>
                <Field label="Password" type="password" value={sf.password} onChange={v=>setSf(p=>({...p,password:v}))} required/>
              </div>
            </div>
            <div style={s.sect}><div style={s.sectTitle}>Academic Details</div>
              <div style={s.grid3}>
                <Field label="Register No" value={sf.studentDetails.registerNumber} onChange={v=>usd('registerNumber',v)} required/>
                <Field label="Degree" value={sf.studentDetails.degree} onChange={v=>usd('degree',v)}/>
                <Field label="Branch" value={sf.studentDetails.branch} onChange={v=>usd('branch',v)}/>
                <Field label="Section" value={sf.studentDetails.section} onChange={v=>usd('section',v)}/>
                <Field label="Grade / CGPA" value={sf.studentDetails.grade} onChange={v=>usd('grade',v)}/>
                <Field label="Aadhaar Number" value={sf.studentDetails.aadhaarNumber} onChange={v=>usd('aadhaarNumber',v)}/>
              </div>
            </div>
            <div style={s.sect}><div style={s.sectTitle}>Personal Details</div>
              <div style={s.grid3}>
                <Field label="Date of Birth" type="date" value={sf.studentDetails.personalDetails.dob} onChange={v=>usdPers('dob',v)}/>
                <Field label="Phone" value={sf.studentDetails.personalDetails.phone} onChange={v=>usdPers('phone',v)}/>
                <Field label="Blood Group" value={sf.studentDetails.personalDetails.bloodGroup} onChange={v=>usdPers('bloodGroup',v)}/>
                <Field label="Height (cm)" value={sf.studentDetails.personalDetails.height} onChange={v=>usdPers('height',v)}/>
                <Field label="Weight (kg)" value={sf.studentDetails.personalDetails.weight} onChange={v=>usdPers('weight',v)}/>
                <Field label="PAN Number" value={sf.studentDetails.personalDetails.panNumber} onChange={v=>usdPers('panNumber',v)}/>
                <Field label="LinkedIn URL" value={sf.studentDetails.personalDetails.linkedIn} onChange={v=>usdPers('linkedIn',v)}/>
              </div>
            </div>
            <div style={s.sect}><div style={s.sectTitle}>Family Details</div>
              <div style={s.grid3}>
                <Field label="Father Name" value={sf.studentDetails.father.name} onChange={v=>usdFather('name',v)}/>
                <Field label="Father Occupation" value={sf.studentDetails.father.occupation} onChange={v=>usdFather('occupation',v)}/>
                <Field label="Mother Name" value={sf.studentDetails.mother.name} onChange={v=>usdMother('name',v)}/>
                <Field label="Mother Occupation" value={sf.studentDetails.mother.occupation} onChange={v=>usdMother('occupation',v)}/>
              </div>
            </div>
            <div style={s.sect}><div style={s.sectTitle}>Address</div>
              <div style={s.grid3}>
                <Field label="Street" value={sf.studentDetails.address.street} onChange={v=>usdAddr('street',v)}/>
                <Field label="City" value={sf.studentDetails.address.city} onChange={v=>usdAddr('city',v)}/>
                <Field label="State" value={sf.studentDetails.address.state} onChange={v=>usdAddr('state',v)}/>
                <Field label="Country" value={sf.studentDetails.address.country} onChange={v=>usdAddr('country',v)}/>
                <Field label="Pincode" value={sf.studentDetails.address.pincode} onChange={v=>usdAddr('pincode',v)}/>
              </div>
            </div>
            <button type="submit" style={s.submitBtn}>Add Student</button>
          </form>
        )}

        {/* ADD TEACHER */}
        {tab === 1 && (
          <form onSubmit={handleTeacherSubmit} style={s.form}>
            <h2 style={s.formTitle}><PlusIcon size={20} style={s.formIcon} /> Add New Teacher</h2>
            <div style={s.sect}><div style={s.sectTitle}>Account Info</div>
              <div style={s.grid3}>
                <Field label="Full Name" value={tf.name} onChange={v=>setTf(p=>({...p,name:v}))} required/>
                <Field label="Email" type="email" value={tf.email} onChange={v=>setTf(p=>({...p,email:v}))} required/>
                <Field label="Password" type="password" value={tf.password} onChange={v=>setTf(p=>({...p,password:v}))} required/>
              </div>
            </div>
            <div style={s.sect}><div style={s.sectTitle}>Professional Details</div>
              <div style={s.grid3}>
                <Field label="Subject" value={tf.teacherDetails.subject} onChange={v=>utd('subject',v)} required/>
                <Field label="Assigned Class" value={tf.teacherDetails.assignedClass} onChange={v=>utd('assignedClass',v)}/>
                <Field label="Department" value={tf.teacherDetails.department} onChange={v=>utd('department',v)}/>
                <Field label="Phone" value={tf.teacherDetails.phone} onChange={v=>utd('phone',v)}/>
                <Field label="Qualification" value={tf.teacherDetails.qualification} onChange={v=>utd('qualification',v)}/>
                <Field label="Experience (years)" value={tf.teacherDetails.experience} onChange={v=>utd('experience',v)}/>
              </div>
            </div>
            <button type="submit" style={s.submitBtn}>Add Teacher</button>
          </form>
        )}

        {/* ALL STUDENTS */}
        {tab === 2 && (
          <div>
            <h2 style={s.formTitle}><UsersIcon size={20} style={s.formIcon} /> All Students ({students.length})</h2>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead><tr style={s.thead}>
                  {['Name','Email','Reg No','Degree','Branch','Section','Grade'].map(h=><th key={h} style={s.th}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {students.map((st,i)=>(
                    <tr key={st._id} style={i%2===0?s.trEven:s.trOdd}>
                      <td style={s.td}>{st.name}</td>
                      <td style={s.td}>{st.email}</td>
                      <td style={s.td}>{st.studentDetails?.registerNumber||'—'}</td>
                      <td style={s.td}>{st.studentDetails?.degree||'—'}</td>
                      <td style={s.td}>{st.studentDetails?.branch||'—'}</td>
                      <td style={s.td}>{st.studentDetails?.section||'—'}</td>
                      <td style={s.td}>{st.studentDetails?.grade||'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ALL TEACHERS */}
        {tab === 3 && (
          <div>
            <h2 style={s.formTitle}><UsersIcon size={20} style={s.formIcon} /> All Teachers ({teachers.length})</h2>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead><tr style={s.thead}>
                  {['Name','Email','Subject','Department','Class','Qualification','Experience'].map(h=><th key={h} style={s.th}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {teachers.map((t,i)=>(
                    <tr key={t._id} style={i%2===0?s.trEven:s.trOdd}>
                      <td style={s.td}>{t.name}</td>
                      <td style={s.td}>{t.email}</td>
                      <td style={s.td}>{t.teacherDetails?.subject||'—'}</td>
                      <td style={s.td}>{t.teacherDetails?.department||'—'}</td>
                      <td style={s.td}>{t.teacherDetails?.assignedClass||'—'}</td>
                      <td style={s.td}>{t.teacherDetails?.qualification||'—'}</td>
                      <td style={s.td}>{t.teacherDetails?.experience||'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function Field({ label, value, onChange, type='text', required=false }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      <label style={{color:'#94a3b8',fontSize:12,fontWeight:500}}>{label}{required&&<span style={{color:'#f87171'}}> *</span>}</label>
      <input
        type={type} value={value} required={required}
        onChange={e=>onChange(e.target.value)}
        style={{padding:'10px 12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:9,color:'#f1f5f9',fontSize:13,outline:'none'}}
      />
    </div>
  );
}

const s = {
  page:{minHeight:'100vh',background:'#0a0e1a',fontFamily:"'Inter','Segoe UI',sans-serif",color:'#f1f5f9'},
  toast:{position:'fixed',top:20,right:20,background:'#1e293b',border:'1px solid rgba(99,102,241,0.5)',color:'#a5b4fc',padding:'12px 20px',borderRadius:12,zIndex:999,fontSize:14,fontWeight:500},
  header:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',background:'rgba(15,20,40,0.9)',borderBottom:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:0,zIndex:100},
  logoRow:{display:'flex',alignItems:'center',gap:10},
  logoBadge:{fontSize:24},
  logoTxt:{fontSize:20,fontWeight:700,background:'linear-gradient(90deg,#6366f1,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'},
  logoutBtn:{padding:'8px 18px',background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:9,color:'#f87171',cursor:'pointer',fontSize:13,fontWeight:500},
  tabs:{display:'flex',gap:4,padding:'16px 32px',background:'rgba(15,20,40,0.6)',borderBottom:'1px solid rgba(255,255,255,0.06)'},
  tab:{padding:'10px 20px',border:'none',borderRadius:10,cursor:'pointer',fontSize:14,fontWeight:500,color:'#64748b',background:'transparent',transition:'all 0.2s'},
  tabActive:{background:'rgba(99,102,241,0.2)',color:'#818cf8',border:'1px solid rgba(99,102,241,0.3)'},
  content:{padding:'32px'},
  form:{background:'rgba(15,20,40,0.7)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'32px',maxWidth:1100},
  formTitle:{fontSize:22,fontWeight:700,marginBottom:24,color:'#f1f5f9'},
  sect:{marginBottom:28},
  sectTitle:{fontSize:12,fontWeight:600,color:'#6366f1',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(99,102,241,0.2)'},
  grid3:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16},
  submitBtn:{marginTop:12,padding:'14px 40px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:12,color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 20px rgba(99,102,241,0.4)'},
  tableWrap:{overflowX:'auto',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'},
  table:{width:'100%',borderCollapse:'collapse',fontSize:13},
  thead:{background:'rgba(99,102,241,0.15)'},
  th:{padding:'13px 16px',textAlign:'left',color:'#818cf8',fontWeight:600,whiteSpace:'nowrap'},
  td:{padding:'12px 16px',color:'#cbd5e1'},
  trEven:{background:'rgba(255,255,255,0.02)'},
  trOdd:{background:'transparent'},
};