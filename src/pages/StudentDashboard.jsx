// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { User, Mail, GraduationCap, MapPin, Phone, Briefcase, Award, IdCard, IdCardLanyardIcon, LucideUserRoundKey } from 'lucide-react';

// export default function StudentDashboard() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) return;
    
//     axios.get(`http://localhost:5000/api/student/profile/${userId}`)
//       .then(res => setStudent(res.data))
//       .catch(err => console.error("Error fetching:", err));
//   }, []);

//   if (!student) return <div style={styles.loading}>Loading Profile...</div>;

//   const { studentDetails } = student;

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Welcome, {student.name}!</h1>
      
//       {/* 1. Academic Information */}
//       <section style={styles.section}>
//         <h2 style={styles.subHeader}><GraduationCap size={20}/> Academic Profile</h2>
//         <div style={styles.grid}>
//           <p><strong>Reg No:</strong> {studentDetails?.registerNumber}</p>
//           <p><strong>Degree:</strong> {studentDetails?.degree}</p>
//           <p><strong>Branch:</strong> {studentDetails?.branch}</p>
//           <p><strong>Section:</strong> {studentDetails?.section}</p>
//           <p><strong> Overall Grade:</strong> {studentDetails?.grade || "N/A"} </p>
//         </div>
//       </section>

//       {/* 2. Personal & Contact Details */}
//       <section style={styles.section}>
//         <h2 style={styles.subHeader}><User size={20}/> Personal Details</h2>
//         <div style={styles.grid}>
//           <p><Mail size={16}/> <strong>Mail:</strong> {student.email}</p>
//           <p><MapPin size={16}/> <strong>Address:</strong> {studentDetails?.address?.city}, {studentDetails?.address?.state}, {studentDetails?.address?.pincode},</p>
//           <p><strong>Blood Group:</strong> {studentDetails?.personalDetails?.bloodGroup}</p>
//         </div>
//       </section>

//       {/* 3. Family Information */}
//       <section style={styles.section}>
//         <h2 style={styles.subHeader}><Briefcase size={20}/> Family Details</h2>
//         <div style={styles.grid}>
//           <p><strong>Father:</strong> {studentDetails?.father?.name}</p>
//           <p><strong>Father's Occupation</strong> {studentDetails?.father?.occupation}</p>
//           <p><strong>Mother:</strong> {studentDetails?.mother?.name}</p>
//           <p><strong>Mother's Occupation</strong> {studentDetails?.mother?.occupation}</p>
//         </div>
//       </section>

//       <section style={styles.section}>
//         <h2 style={styles.subHeader}><Briefcase size={20}/> Formal Details</h2>
//         <div style={styles.grid}>
//           <p><IdCard size={16}/> <strong>Aadhaar Number:</strong> {studentDetails?.aadhaarNum || "[Aadhaar Redacted]"}</p>
//           <p><IdCardLanyardIcon size={16}/> <strong>PAN Number:</strong>{studentDetails?.personalDetails?.panNumber}</p>
//           <p><LucideUserRoundKey size={16}/> <strong>Linked In:</strong>{studentDetails?.personalDetails?.linkedIn}</p>
//         </div>
//       </section>

// // 1. Subjects Summary Section
// <section style={styles.section}>
//   <h2 style={{ textAlign: 'center' }}>Total Subjects: {student.teacherDetails?.marks?.length || 0}</h2>
  
//   <div style={styles.marksContainer}>
//     {student.teacherDetails?.marks?.map((m, i) => (
//       <div key={i} style={styles.marksRow}>
//         <div style={{ flex: 1, fontWeight: 'bold' }}>{m.subject}</div> {/* Subject front */}
//         <div style={{ flex: 2, textAlign: 'center' }}>
//           Internal: {m.internal} | External: {m.external}
//         </div> {/* Marks center */}
//         <div style={{ flex: 1, textAlign: 'right', color: '#000000', fontWeight: 'bold' }}>
//           Total: {Number(m.internal) + Number(m.external)}
//         </div> {/* Total last */}
//       </div>
//     ))}
//   </div>
// </section>

// // 2. Timetable Section (Updated for 9x6 layout)
// <section style={styles.section}>
//   <h2>Weekly Timetable</h2>
//   <table style={styles.table}>
//     <thead>
//       <tr><th>Day</th>{[...Array(8)].map((_, i) => <th key={i}>P{i+1}</th>)}</tr>
//     </thead>
//     <tbody>
//       {/* DB-la teacherDetails.timetable oru array-ah irukkum */}
//       {student.teacherDetails?.timetable?.map((entry, index) => (
//         <tr key={index}>
//           <td><strong>{entry.day}</strong></td>
//           {entry.periods?.map((p, i) => <td key={i}>{p || "-"}</td>)}
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </section>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: '40px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
//   header: { color: '#1f2937', marginBottom: '30px' },
//   section: { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
//   subHeader: { display: 'flex', alignItems: 'center', gap: '10px', color: '#4f46e5', marginBottom: '15px' },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' },
//   loading: { textAlign: 'center', marginTop: '50px', fontSize: '20px' },
//    pageContainer: { 
//     minHeight: '100vh', 
//     background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', 
//     padding: '40px', 
//     display: 'flex', 
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
  
//   // Card Design (Glassmorphism)
//   formCard: { 
//     backgroundColor: 'rgba(255, 255, 255, 0.1)', 
//     backdropFilter: 'blur(15px)', 
//     padding: '40px', 
//     borderRadius: '25px', 
//     border: '1px solid rgba(255, 255, 255, 0.2)', 
//     boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
//     width: '100%', 
//     maxWidth: '900px' 
//   },
  
//   // Typography
//   title: { 
//     color: '#fff', 
//     textAlign: 'center', 
//     marginBottom: '30px', 
//     fontSize: '2rem',
//     textShadow: '0 2px 4px rgba(0,0,0,0.2)'
//   },
  
//   // Grid Layout
//   gridContainer: { 
//     display: 'grid', 
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
//     gap: '20px' 
//   },
  
//   // Input Design
//   input: { 
//     padding: '14px', 
//     borderRadius: '12px', 
//     border: 'none', 
//     background: 'rgba(255, 255, 255, 0.9)', 
//     outline: 'none', 
//     transition: 'transform 0.2s, box-shadow 0.3s',
//     fontSize: '14px',
//     cursor: 'text'
//   },
  
//   // Button Design
//   button: { 
//     marginTop: '30px', 
//     width: '100%', 
//     padding: '18px', 
//     borderRadius: '12px', 
//     border: 'none', 
//     background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', 
//     color: '#fff', 
//     fontSize: '18px', 
//     fontWeight: 'bold', 
//     cursor: 'pointer', 
//     transition: 'all 0.3s ease',
//     textTransform: 'uppercase',
//     letterSpacing: '1px'
//   },
//   table: { 
//     width: '100%', 
//     borderCollapse: 'collapse', 
//     marginTop: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     overflow: 'hidden'
//   },
//   // Table cell-kku padding and border
//   th: { padding: '12px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' },
//   td: { padding: '12px', border: '1px solid #ddd', textAlign: 'center' },

//   marksContainer: { 
//     display: 'flex', 
//     flexDirection: 'column', 
//     gap: '10px',
//     marginTop: '20px'
//   },
//   marksRow: { 
//     display: 'flex', 
//     alignItems: 'center', 
//     justifyContent: 'space-between',
//     padding: '15px',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: '10px',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//   }
// };

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, GraduationCap, MapPin, Phone, Briefcase, Award, IdCard, IdCardLanyardIcon, LucideUserRoundKey, Book, StarIcon, LucideBuilding2, Pin, Calendar, SheetIcon } from 'lucide-react';

const TABS = ['Profile', 'Marks', 'Timetable', 'Leave'];

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [tab, setTab] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [leave, setLeave] = useState({ teacherId:'', fromDate:'', toDate:'', reason:'' });
  const [leaveMsg, setLeaveMsg] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(''),3000); };

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) return;
    axios.get(`http://localhost:5000/api/student/profile/${id}`)
      .then(r => setStudent(r.data))
      .catch(err => console.error(err));
    axios.get('http://localhost:5000/api/teachers/list')
      .then(r => setTeachers(r.data))
      .catch(()=>{});
  }, []);

  const sendLeave = async () => {
    if (!leave.teacherId || !leave.fromDate || !leave.toDate || !leave.reason) {
      return showToast('Please fill all fields');
    }
    try {
      await axios.post('http://localhost:5000/api/leave/request', {
        studentId: localStorage.getItem('userId'),
        ...leave
      });
      showToast('Leave request sent!');
      setLeave({ teacherId:'', fromDate:'', toDate:'', reason:'' });
    } catch { showToast('Failed to send leave'); }
  };

  if (!student) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0a0e1a'}}>
      <div style={{color:'#818cf8',fontSize:18,fontWeight:600}}>Loading Profile...</div>
    </div>
  );

  const sd = student.studentDetails || {};
  const pd = sd.personalDetails || {};
  const addr = sd.address || {};

  const DAYS_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const timetableSorted = [...(sd.timetable||[])].sort((a,b)=>DAYS_ORDER.indexOf(a.day)-DAYS_ORDER.indexOf(b.day));

  return (
    <div style={s.page}>
      {toast && <div style={s.toast}>{toast}</div>}

      {/* Header */}
      <div style={s.header}>
        <div style={s.logoRow}>
          <div style={s.avatar}>{student.name?.charAt(0)?.toUpperCase()}</div>
          <div>
            <div style={s.name}>Welcome, {student.name}</div>
            <div style={s.regNo}>{sd.registerNumber ? ` ${sd.registerNumber}` : 'Student Portal'}</div>
          </div>
        </div>
        <button onClick={()=>{localStorage.clear();window.location.href='/';}} style={s.logoutBtn}>Logout</button>
      </div>

      {/* Stats row */}
      <div style={s.statsRow}>
        {[
          {label:'Subjects',val:sd.marks?.length||0,icon:<Book size={20}/>},
          {label:'CGPA',val:sd.grade||'N/A',icon:<StarIcon size={20}/>},
          {label:'Branch',val:sd.branch||'N/A',icon:<LucideBuilding2 size={20}/>},
          {label:'Section',val:sd.section||'N/A',icon:<Pin size={20}/>},
        ].map((st,i)=>(
          <div key={i} style={s.statCard}>
            <span style={s.statIcon}>{st.icon}</span>
            <div style={s.statVal}>{st.val}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{...s.tab,...(tab===i?s.tabActive:{})}}>
            {[<User size={20}/>,<Book size={20} />,<Calendar size={20} />,<SheetIcon size={20} />][i]} {t}
          </button>
        ))}
      </div>

      <div style={s.content}>

        {/* PROFILE TAB */}
        {tab === 0 && (
          <div style={s.grid2}>
             <Card title="Academic Profile">
              <InfoRow label="Register No" val={sd.registerNumber}/>
              <InfoRow label="Degree" val={sd.degree}/>
              <InfoRow label="Branch" val={sd.branch}/>
              <InfoRow label="Section" val={sd.section}/>
              <InfoRow label="Grade / CGPA" val={sd.grade}/>
            </Card>
            <Card title="Contact & Personal">
              <InfoRow label="Email" val={student.email}/>
              <InfoRow label="Phone" val={pd.phone}/>
              <InfoRow label="Date of Birth" val={pd.dob}/>
              <InfoRow label="Blood Group" val={pd.bloodGroup}/>
              <InfoRow label="Height" val={pd.height ? pd.height+' cm' : null}/>
              <InfoRow label="Weight" val={pd.weight ? pd.weight+' kg' : null}/>
              <InfoRow label="LinkedIn" val={pd.linkedIn}/>
            </Card>
            <Card title="Family Details">
              <InfoRow label="Father" val={sd.father?.name}/>
              <InfoRow label="Father's Occupation" val={sd.father?.occupation}/>
              <InfoRow label="Mother" val={sd.mother?.name}/>
              <InfoRow label="Mother's Occupation" val={sd.mother?.occupation}/>
            </Card>
            <Card title="Address">
              <InfoRow label="Street" val={addr.street}/>
              <InfoRow label="City" val={addr.city}/>
              <InfoRow label="State" val={addr.state}/>
              <InfoRow label="Country" val={addr.country}/>
              <InfoRow label="Pincode" val={addr.pincode}/>
            </Card>
            <Card title="Formal Documents">
              <InfoRow label="Aadhaar" val={sd.aadhaarNumber ? '•••• •••• '+sd.aadhaarNumber.slice(-4) : null}/>
              <InfoRow label="PAN Number" val={pd.panNumber}/>
            </Card>
          </div>
        )}

        {/* MARKS TAB */}
        {tab === 1 && (
          <Card title="Subject Marks">
            {!sd.marks?.length ? (
              <div style={s.empty}>No marks added yet. Your teacher will upload your scores.</div>
            ) : (
              <>
                <div style={s.marksHeader}>
                  <span>Subject</span><span>Internal</span><span>External</span><span>Total</span><span>Status</span>
                </div>
                {sd.marks.map((m,i) => {
                  const total = Number(m.internal)+Number(m.external);
                  const pass = total >= 50;
                  return (
                    <div key={i} style={s.markRow}>
                      <span style={s.subjName}>{m.subject}</span>
                      <span style={s.markChip}>{m.internal}<span style={s.markOf}>/40</span></span>
                      <span style={s.markChip}>{m.external}<span style={s.markOf}>/60</span></span>
                      <span style={{...s.totalBadge,background:pass?'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)',color:pass?'#4ade80':'#f87171'}}>{total}/100</span>
                      <span style={{...s.statusPill,background:pass?'rgba(34,197,94,0.2)':'rgba(239,68,68,0.2)',color:pass?'#4ade80':'#f87171'}}>{pass?'PASS':'FAIL'}</span>
                    </div>
                  );
                })}
                <div style={s.avgRow}>
                  Average: {(sd.marks.reduce((a,m)=>a+Number(m.internal)+Number(m.external),0)/sd.marks.length).toFixed(1)} / 100
                </div>
              </>
            )}
          </Card>
        )}

        {/* TIMETABLE TAB */}
        {tab === 2 && (
          <Card title="Weekly Timetable">
            {!timetableSorted.length ? (
              <div style={s.empty}>No timetable uploaded yet.</div>
            ) : (
              <div style={{overflowX:'auto'}}>
                <table style={s.table}>
                  <thead>
                    <tr style={s.tableHead}>
                      <th style={s.th}>Day</th>
                      {[1,2,3,4,5,6,7,8].map(n=><th key={n} style={s.th}>Period {n}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {timetableSorted.map((row,i)=>(
                      <tr key={i} style={i%2===0?s.trEven:s.trOdd}>
                        <td style={{...s.td,fontWeight:700,color:'#818cf8'}}>{row.day}</td>
                        {Array(8).fill(null).map((_,j)=>(
                          <td key={j} style={s.td}>{row.periods?.[j] || <span style={{color:'#334155'}}>—</span>}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* LEAVE TAB */}
        {tab === 3 && (
          <div style={s.grid2}>
            <Card title="Apply for Leave">
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <LeaveField label="Select Teacher">
                  <select value={leave.teacherId} onChange={e=>setLeave({...leave,teacherId:e.target.value})} style={s.sel}>
                    <option value="">-- Select Teacher --</option>
                    {teachers.map(t=>(
                      <option key={t._id} value={t._id}>{t.name} ({t.teacherDetails?.subject||'Teacher'})</option>
                    ))}
                  </select>
                </LeaveField>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <LeaveField label="From Date">
                    <input type="date" value={leave.fromDate} onChange={e=>setLeave({...leave,fromDate:e.target.value})} style={s.inp}/>
                  </LeaveField>
                  <LeaveField label="To Date">
                    <input type="date" value={leave.toDate} onChange={e=>setLeave({...leave,toDate:e.target.value})} style={s.inp}/>
                  </LeaveField>
                </div>
                <LeaveField label="Reason">
                  <textarea rows={4} value={leave.reason} onChange={e=>setLeave({...leave,reason:e.target.value})} placeholder="Describe your reason..." style={{...s.inp,resize:'vertical'}}/>
                </LeaveField>
                <button onClick={sendLeave} style={s.sendBtn}>Send Leave Request →</button>
              </div>
            </Card>

            <Card title="My Leave History">
              {!sd.leaveRequests?.length ? (
                <div style={s.empty}>No leave requests yet.</div>
              ) : (
                [...sd.leaveRequests].reverse().map((lr,i)=>(
                  <div key={i} style={s.leaveCard}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <div style={{color:'#e2e8f0',fontWeight:600,marginBottom:4}}>{lr.fromDate} → {lr.toDate}</div>
                        <div style={{color:'#94a3b8',fontSize:13}}>{lr.reason}</div>
                      </div>
                      <span style={{...s.leaveStatus,...statusColor(lr.status)}}>{lr.status?.toUpperCase()}</span>
                    </div>
                  </div>
                ))
              )}
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}

const statusColor = (st) => {
  if(st==='approved') return {background:'rgba(34,197,94,0.2)',color:'#4ade80'};
  if(st==='rejected') return {background:'rgba(239,68,68,0.2)',color:'#f87171'};
  return {background:'rgba(234,179,8,0.2)',color:'#facc15'};
};

function Card({title,children}) {
  return (
    <div style={{background:'rgba(15,20,40,0.7)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:'24px',marginBottom:20}}>
      <div style={{fontSize:16,fontWeight:700,color:'#f1f5f9',marginBottom:18,paddingBottom:12,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>{title}</div>
      {children}
    </div>
  );
}
function InfoRow({label,val}) {
  if(!val) return null;
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
      <span style={{color:'#64748b',fontSize:13}}>{label}</span>
      <span style={{color:'#cbd5e1',fontSize:13,fontWeight:500,textAlign:'right',maxWidth:'55%'}}>{val}</span>
    </div>
  );
}
function LeaveField({label,children}) {
  return <div style={{display:'flex',flexDirection:'column',gap:6}}><label style={{color:'#94a3b8',fontSize:12,fontWeight:500}}>{label}</label>{children}</div>;
}

const s = {
  page:{minHeight:'100vh',background:'#0a0e1a',fontFamily:"'Inter','Segoe UI',sans-serif",color:'#f1f5f9'},
  toast:{position:'fixed',top:20,right:20,background:'#1e293b',border:'1px solid rgba(99,102,241,0.5)',color:'#a5b4fc',padding:'12px 20px',borderRadius:12,zIndex:999,fontSize:14},
  header:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',background:'rgba(15,20,40,0.9)',borderBottom:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:0,zIndex:100},
  logoRow:{display:'flex',alignItems:'center',gap:14},
  avatar:{width:46,height:46,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:700,color:'#fff'},
  name:{fontSize:16,fontWeight:700,color:'#f1f5f9'},
  regNo:{fontSize:12,color:'#64748b'},
  logoutBtn:{padding:'8px 18px',background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:9,color:'#f87171',cursor:'pointer',fontSize:13,fontWeight:500},
  statsRow:{display:'flex',gap:16,padding:'20px 32px',overflowX:'auto'},
  statCard:{background:'rgba(15,20,40,0.7)',border:'1px solid rgba(99,102,241,0.2)',borderRadius:14,padding:'16px 24px',minWidth:130,textAlign:'center'},
  statIcon:{fontSize:24},
  statVal:{fontSize:22,fontWeight:800,color:'#a78bfa',marginTop:4},
  statLabel:{fontSize:12,color:'#64748b',marginTop:2},
  tabs:{display:'flex',gap:4,padding:'0 32px 0',background:'rgba(15,20,40,0.6)',borderBottom:'1px solid rgba(255,255,255,0.06)'},
  tab:{padding:'14px 20px',border:'none',cursor:'pointer',fontSize:14,fontWeight:500,color:'#64748b',background:'transparent',transition:'all 0.2s',borderBottom:'2px solid transparent'},
  tabActive:{color:'#818cf8',borderBottom:'2px solid #6366f1'},
  content:{padding:'28px 32px'},
  grid2:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))',gap:20},
  empty:{color:'#475569',textAlign:'center',padding:'30px',fontSize:14},
  marksHeader:{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:8,padding:'8px 12px',background:'rgba(99,102,241,0.1)',borderRadius:9,marginBottom:8,fontSize:12,color:'#818cf8',fontWeight:600},
  markRow:{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:8,padding:'12px',background:'rgba(255,255,255,0.03)',borderRadius:9,marginBottom:6,alignItems:'center'},
  subjName:{color:'#e2e8f0',fontWeight:600,fontSize:14},
  markChip:{color:'#a78bfa',fontWeight:700,fontSize:15},
  markOf:{color:'#475569',fontSize:11,fontWeight:400},
  totalBadge:{padding:'4px 10px',borderRadius:8,fontWeight:700,fontSize:14,textAlign:'center'},
  statusPill:{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:700,textAlign:'center'},
  avgRow:{textAlign:'right',color:'#818cf8',fontWeight:700,marginTop:12,fontSize:14},
  table:{width:'100%',borderCollapse:'collapse',fontSize:13},
  tableHead:{background:'rgba(99,102,241,0.1)'},
  th:{padding:'12px 14px',textAlign:'left',color:'#818cf8',fontWeight:600,whiteSpace:'nowrap'},
  td:{padding:'11px 14px',color:'#cbd5e1'},
  trEven:{background:'rgba(255,255,255,0.02)'},
  trOdd:{background:'transparent'},
  sel:{padding:'10px 12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:9,color:'#f1f5f9',fontSize:13,outline:'none',width:'100%'},
  inp:{padding:'10px 12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:9,color:'#f1f5f9',fontSize:13,outline:'none',width:'100%',boxSizing:'border-box'},
  sendBtn:{padding:'13px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:10,color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 15px rgba(99,102,241,0.3)'},
  leaveCard:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'14px',marginBottom:10},
  leaveStatus:{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:700},
};