import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpenTextIcon, UserCheck, Mail, LogIn, UserCog, Search, ChartColumn, Calendar, MailOpenIcon, CircleCheckBig, CircleX, MessageCircleMoreIcon } from 'lucide-react';
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const TABS = ['Find Student', 'Add Marks', 'Timetable', 'Leave Inbox'];

export default function TeacherDashboard() {
  const [tab, setTab] = useState(0);
  const [regInput, setRegInput] = useState('');
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState({ subject:'', internal:'', external:'' });
  const [timetable, setTimetable] = useState({ day:'Monday', periods: Array(8).fill('') });
  const [leaveInbox, setLeaveInbox] = useState([]);
  const [toast, setToast] = useState('');
  const teacherId = localStorage.getItem('userId');

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(''),3000); };

  useEffect(() => {
    if (tab === 3) fetchLeaveInbox();
  }, [tab]);

  const fetchLeaveInbox = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student/profile/${teacherId}`);
      setLeaveInbox(res.data.teacherDetails?.leaveInbox || []);
    } catch(e) { console.error(e); }
  };

  const findStudent = async () => {
    if (!regInput) return showToast('Enter a Register Number');
    try {
      const res = await axios.get(`http://localhost:5000/api/student/by-reg/${regInput}`);
      setStudent(res.data);
      showToast(`Found: ${res.data.name}`);
    } catch { showToast('Student not found!'); }
  };

  const addMarks = async () => {
    if (!student) return showToast('Search a student first');
    if (!marks.subject || !marks.internal || !marks.external) return showToast(' Fill all mark fields');
    try {
      await axios.post('http://localhost:5000/api/teacher/add-marks', { id: student._id, marks });
      setMarks({ subject:'', internal:'', external:'' });
      showToast('Marks added successfully!');
      // Refresh student data
      const res = await axios.get(`http://localhost:5000/api/student/by-reg/${regInput}`);
      setStudent(res.data);
    } catch { showToast('Failed to add marks'); }
  };

  const addTimetable = async () => {
    if (!student) return showToast('Search a student first');
    try {
      await axios.post('http://localhost:5000/api/teacher/add-timetable', {
        id: student._id,
        timetable: { day: timetable.day, periods: timetable.periods }
      });
      setTimetable({ day:'Monday', periods:Array(8).fill('') });
      showToast(`${timetable.day} timetable saved!`);
    } catch { showToast('Failed to save timetable'); }
  };

  const updateLeaveStatus = async (leaveId, studentId, status) => {
    try {
      await axios.post('http://localhost:5000/api/leave/update-status', {
        teacherId, leaveId, studentId, status
      });
      showToast(`Leave ${status}`);
      fetchLeaveInbox();
    } catch { showToast('Failed to update'); }
  };

  const sd = student?.studentDetails || {};

  return (
    <div style={s.page}>
      {toast && <div style={s.toast}>{toast}</div>}

      {/* Header */}
      <div style={s.header}>
        <div style={s.logoRow}>
          <div style={s.avatar}><BookOpenTextIcon size={24} /></div>
          <div>
            <div style={s.name}>Teacher Dashboard</div>
            <div style={s.sub}>{localStorage.getItem('userName') || 'Teacher'}</div>
          </div>
        </div>
        <button onClick={()=>{localStorage.clear();window.location.href='/';}} style={s.logoutBtn}>Logout</button>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{...s.tab,...(tab===i?s.tabActive:{})}}>
            {[<Search size={20} />,<ChartColumn size={20} />,<Calendar size={20} />,<MailOpenIcon size={20} />][i]} {t}
            {i===3 && leaveInbox.filter(l=>l.status==='pending').length > 0 && (
              <span style={s.badge}>{leaveInbox.filter(l=>l.status==='pending').length}</span>
            )}
          </button>
        ))}
      </div>

      <div style={s.content}>

        {/* FIND STUDENT */}
        {tab === 0 && (
          <div>
            <div style={s.searchRow}>
              <input
                placeholder="Enter Register Number"
                value={regInput}
                onChange={e=>setRegInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&findStudent()}
                style={s.searchInput}
              />
              <button onClick={findStudent} style={s.searchBtn}><Search size={20} /></button>
            </div>
            {student && (
              <div style={s.card}>
                <div style={s.studentCard}>
                  <div style={s.studentAvatar}>{student.name?.charAt(0)}</div>
                  <div>
                    <div style={s.studentName}>{student.name}</div>
                    <div style={s.studentInfo}>{student.email}</div>
                    <div style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap'}}>
                      <Pill label="Reg" val={sd.registerNumber}/>
                      <Pill label="Branch" val={sd.branch}/>
                      <Pill label="Section" val={sd.section}/>
                      <Pill label="Grade" val={sd.grade}/>
                    </div>
                  </div>
                </div>
                {sd.marks?.length > 0 && (
                  <div style={{marginTop:20}}>
                    <div style={s.sectTitle}>Current Marks</div>
                    {sd.marks.map((m,i)=>(
                      <div key={i} style={s.markRow}>
                        <span style={{color:'#e2e8f0',fontWeight:600}}>{m.subject}</span>
                        <span style={{color:'#818cf8'}}>Int: {m.internal}/40</span>
                        <span style={{color:'#818cf8'}}>Ext: {m.external}/60</span>
                        <span style={{color:'#4ade80',fontWeight:700}}>Total: {Number(m.internal)+Number(m.external)}/100</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ADD MARKS */}
        {tab === 1 && (
          <div style={s.card}>
            <div style={s.cardTitle}><ChartColumn size={20} /> Add Subject Marks</div>
            {!student ? (
              <div style={s.empty}><Search size={20} /> Search a student in the "Find Student" tab first</div>
            ) : (
              <>
                <div style={{color:'#818cf8',fontSize:14,marginBottom:16}}>
                  Adding marks for: <strong style={{color:'#a78bfa'}}>{student.name}</strong> ({sd.registerNumber})
                </div>
                <div style={s.marksGrid}>
                  <MField label="Subject Name" value={marks.subject} onChange={v=>setMarks({...marks,subject:v})} placeholder="Enter Subject Name"/>
                  <MField label="Internal Marks (max 40)" type="number" value={marks.internal} onChange={v=>setMarks({...marks,internal:v})} placeholder="0-40"/>
                  <MField label="External Marks (max 60)" type="number" value={marks.external} onChange={v=>setMarks({...marks,external:v})} placeholder="0-60"/>
                </div>
                {marks.internal && marks.external && (
                  <div style={s.totalPreview}>
                    Total Preview: <strong>{Number(marks.internal)+Number(marks.external)}/100</strong>
                    {' '}{Number(marks.internal)+Number(marks.external)>=50? <CircleCheckBig size={16} color="green" />  : <CircleX size={16} color="red" />}
                  </div>
                )}
                <button onClick={addMarks} style={s.submitBtn}>Add Marks</button>
              </>
            )}
          </div>
        )}

        {/* TIMETABLE */}
        {tab === 2 && (
          <div style={s.card}>
            <div style={s.cardTitle}><Calendar size={20} /> Update Timetable (7 Days)</div>
            {!student ? (
              <div style={s.empty}><Search size={20} /> Search a student in the "Find Student" tab first</div>
            ) : (
              <>
                <div style={{color:'#818cf8',fontSize:14,marginBottom:20}}>
                  Editing timetable for: <strong style={{color:'#a78bfa'}}>{student.name}</strong>
                </div>

                {/* Day selector */}
                <div style={{marginBottom:20}}>
                  <label style={s.fieldLabel}>Select Day</label>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
                    {DAYS.map(d=>(
                      <button key={d} onClick={()=>setTimetable({...timetable,day:d})}
                        style={{...s.dayBtn,...(timetable.day===d?s.dayBtnActive:{})}}>
                        {d.slice(0,3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period inputs */}
                <div style={{marginBottom:20}}>
                  <label style={s.fieldLabel}>Periods for {timetable.day}</label>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10,marginTop:10}}>
                    {timetable.periods.map((p,i)=>(
                      <MField
                        key={i}
                        label={`Period ${i+1}`}
                        value={p}
                        onChange={v=>{const np=[...timetable.periods];np[i]=v;setTimetable({...timetable,periods:np});}}
                        placeholder="Period Subject"
                      />
                    ))}
                  </div>
                </div>

                <button onClick={addTimetable} style={s.submitBtn}>Save {timetable.day} Timetable</button>

                {/* Show existing timetable */}
                {sd.timetable?.length > 0 && (
                  <div style={{marginTop:28}}>
                    <div style={s.sectTitle}>Current Saved Timetable</div>
                    <div style={{overflowX:'auto',marginTop:12}}>
                      <table style={s.table}>
                        <thead>
                          <tr style={s.tableHead}>
                            <th style={s.th}>Day</th>
                            {[1,2,3,4,5,6,7,8].map(n=><th key={n} style={s.th}>P{n}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {sd.timetable.map((row,i)=>(
                            <tr key={i} style={i%2===0?s.trEven:s.trOdd}>
                              <td style={{...s.td,fontWeight:700,color:'#818cf8'}}>{row.day}</td>
                              {Array(8).fill(null).map((_,j)=>(
                                <td key={j} style={s.td}>{row.periods?.[j]||<span style={{color:'#334155'}}>—</span>}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* LEAVE INBOX */}
        {tab === 3 && (
          <div style={s.card}>
            <div style={s.cardTitle}><MailOpenIcon size={20} /> Leave Requests Inbox</div>
            {!leaveInbox.length ? (
              <div style={s.empty}>No leave requests yet.</div>
            ) : (
              [...leaveInbox].reverse().map((lr,i)=>(
                <div key={i} style={s.leaveCard}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12}}>
                    <div>
                      <div style={{color:'#f1f5f9',fontWeight:700,fontSize:16}}>{lr.studentName}</div>
                      <div style={{color:'#64748b',fontSize:12,marginTop:2}}>Reg: {lr.registerNumber}</div>
                      <div style={{color:'#94a3b8',fontSize:13,marginTop:8}}>
                        <Calendar size={16} /> {lr.fromDate} → {lr.toDate}
                      </div>
                      <div style={{color:'#cbd5e1',fontSize:13,marginTop:6,maxWidth:420}}>
                        <MessageCircleMoreIcon size={16} /> {lr.reason}
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
                      <span style={{...s.statusPill,...statusColor(lr.status)}}>{lr.status?.toUpperCase()}</span>
                      {lr.status === 'pending' && (
                        <div style={{display:'flex',gap:8}}>
                          <button onClick={()=>updateLeaveStatus(lr._id,lr.studentId,'approved')} style={s.approveBtn}>✓ Approve</button>
                          <button onClick={()=>updateLeaveStatus(lr._id,lr.studentId,'rejected')} style={s.rejectBtn}>✗ Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
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

function Pill({label,val}) {
  if (!val) return null;
  return <span style={{padding:'4px 10px',background:'rgba(99,102,241,0.15)',borderRadius:20,fontSize:12,color:'#a5b4fc'}}><strong>{label}:</strong> {val}</span>;
}
function MField({label,value,onChange,type='text',placeholder=''}) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      <label style={{color:'#94a3b8',fontSize:12,fontWeight:500}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{padding:'10px 12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:9,color:'#f1f5f9',fontSize:13,outline:'none'}}/>
    </div>
  );
}

const s = {
  page:{minHeight:'100vh',background:'#0a0e1a',fontFamily:"'Inter','Segoe UI',sans-serif",color:'#f1f5f9'},
  toast:{position:'fixed',top:20,right:20,background:'#1e293b',border:'1px solid rgba(99,102,241,0.5)',color:'#a5b4fc',padding:'12px 20px',borderRadius:12,zIndex:999,fontSize:14},
  header:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',background:'rgba(15,20,40,0.9)',borderBottom:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:0,zIndex:100},
  logoRow:{display:'flex',alignItems:'center',gap:14},
  avatar:{width:46,height:46,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22},
  name:{fontSize:16,fontWeight:700,color:'#f1f5f9'},
  sub:{fontSize:12,color:'#64748b'},
  logoutBtn:{padding:'8px 18px',background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:9,color:'#f87171',cursor:'pointer',fontSize:13,fontWeight:500},
  tabs:{display:'flex',gap:4,padding:'0 32px',background:'rgba(15,20,40,0.6)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'},
  tab:{padding:'14px 18px',border:'none',cursor:'pointer',fontSize:13,fontWeight:500,color:'#64748b',background:'transparent',transition:'all 0.2s',borderBottom:'2px solid transparent',whiteSpace:'nowrap',position:'relative'},
  tabActive:{color:'#818cf8',borderBottom:'2px solid #6366f1'},
  badge:{position:'absolute',top:10,right:4,background:'#ef4444',color:'#fff',borderRadius:'50%',width:16,height:16,fontSize:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700},
  content:{padding:'28px 32px'},
  card:{background:'rgba(15,20,40,0.7)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:'28px'},
  cardTitle:{fontSize:18,fontWeight:700,marginBottom:20,color:'#f1f5f9'},
  searchRow:{display:'flex',gap:12,marginBottom:24},
  searchInput:{flex:1,padding:'14px 18px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,color:'#f1f5f9',fontSize:14,outline:'none'},
  searchBtn:{padding:'14px 28px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:12,color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'},
  studentCard:{display:'flex',gap:16,alignItems:'flex-start'},
  studentAvatar:{width:56,height:56,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:'#fff',flexShrink:0},
  studentName:{fontSize:20,fontWeight:700,color:'#f1f5f9'},
  studentInfo:{color:'#64748b',fontSize:13,marginTop:3},
  sectTitle:{fontSize:12,fontWeight:600,color:'#6366f1',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:10},
  markRow:{display:'flex',gap:20,padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',flexWrap:'wrap'},
  marksGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,marginBottom:16},
  totalPreview:{padding:'12px 16px',background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.2)',borderRadius:10,color:'#a5b4fc',fontSize:14,marginBottom:16},
  submitBtn:{padding:'13px 36px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:10,color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 15px rgba(99,102,241,0.3)'},
  fieldLabel:{color:'#94a3b8',fontSize:13,fontWeight:500},
  dayBtn:{padding:'8px 14px',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,cursor:'pointer',fontSize:13,color:'#94a3b8',background:'rgba(255,255,255,0.04)',transition:'all 0.2s'},
  dayBtnActive:{background:'rgba(99,102,241,0.3)',color:'#a5b4fc',border:'1px solid rgba(99,102,241,0.5)'},
  table:{width:'100%',borderCollapse:'collapse',fontSize:12},
  tableHead:{background:'rgba(99,102,241,0.1)'},
  th:{padding:'10px 12px',textAlign:'left',color:'#818cf8',fontWeight:600},
  td:{padding:'9px 12px',color:'#cbd5e1'},
  trEven:{background:'rgba(255,255,255,0.02)'},
  trOdd:{background:'transparent'},
  leaveCard:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'18px',marginBottom:12},
  statusPill:{padding:'5px 12px',borderRadius:20,fontSize:11,fontWeight:700},
  approveBtn:{padding:'8px 14px',background:'rgba(34,197,94,0.2)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,color:'#4ade80',cursor:'pointer',fontSize:13,fontWeight:600},
  rejectBtn:{padding:'8px 14px',background:'rgba(239,68,68,0.2)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,color:'#f87171',cursor:'pointer',fontSize:13,fontWeight:600},
  empty:{color:'#475569',textAlign:'center',padding:'30px',fontSize:14},
};