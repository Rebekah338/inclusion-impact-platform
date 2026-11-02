'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PlatformNav from '@/app/components/PlatformNav';
import BottomBanner from '@/app/components/BottomBanner';

const SECTORS = [
  'Private sector','Public sector','Third sector / Charity',
  'Education (schools)','Education (higher education)','Healthcare / NHS',
  'Financial services','Legal','Technology','Hospitality and retail','Other',
];
const ORG_SIZES = [
  '1 to 10 employees','11 to 50 employees','51 to 200 employees',
  '201 to 500 employees','500 or more employees',
];
const LOADING_STEPS = [
  'Reading your responses...','Analysing each dimension...',
  'Identifying priority areas...','Generating your Start this week actions...',
  'Preparing leadership questions...','Compiling your health check report...',
];

type TrafficLight = 'green' | 'amber' | 'red';
interface DimensionResult { name: string; status: TrafficLight; observation: string; whatGoodLooksLike: string; }
interface PriorityArea { name: string; why: string; }
interface StartThisWeek { action: string; }
interface LeadershipQuestion { question: string; }
interface RecommendedResource { title: string; description: string; link: string; }
interface HealthCheckResult {
  orgName: string; headline: string;
  dimensions: DimensionResult[]; priorityAreas: PriorityArea[];
  startThisWeek: StartThisWeek[]; leadershipQuestions: LeadershipQuestion[];
  recommendedResources: RecommendedResource[];
}
const STATUS_CFG: Record<TrafficLight, { colour: string; bg: string; border: string; label: string }> = {
  green: { colour: '#27ae60', bg: 'rgba(39,174,96,0.08)', border: '#27ae60', label: 'Strong' },
  amber: { colour: '#e67e22', bg: 'rgba(230,126,34,0.08)', border: '#e67e22', label: 'Developing' },
  red:   { colour: '#c0392b', bg: 'rgba(192,57,43,0.08)',  border: '#c0392b', label: 'Needs attention' },
};

function buildReport(r: HealthCheckResult): string {
  const l: string[] = [];
  l.push(r.orgName ? `INCLUSION HEALTH CHECK: ${r.orgName.toUpperCase()}` : 'INCLUSION HEALTH CHECK REPORT');
  l.push('The Inclusion Edit\n');
  l.push(r.headline + '\n\n---\n\nDIMENSION BREAKDOWN\n');
  r.dimensions.forEach(d => {
    l.push(`${d.name} (${STATUS_CFG[d.status].label})`);
    l.push(d.observation);
    l.push(`What good looks like: ${d.whatGoodLooksLike}\n`);
  });
  l.push('---\n\nPRIORITY AREAS\n');
  r.priorityAreas.forEach((p,i) => { l.push(`${i+1}. ${p.name}`); l.push(p.why + '\n'); });
  l.push('---\n\nSTART THIS WEEK\n');
  r.startThisWeek.forEach((s,i) => l.push(`${i+1}. ${s.action}`));
  l.push('\n---\n\nQUESTIONS FOR YOUR LEADERSHIP TEAM\n');
  r.leadershipQuestions.forEach((q,i) => l.push(`${i+1}. ${q.question}`));
  l.push('\n---\n\nRECOMMENDED RESOURCES\n');
  r.recommendedResources.forEach(res => { l.push(res.title); l.push(res.description + '\n'); });
  return l.join('\n');
}

const PROMPTS = [
  { key:'leadership', label:'Leadership and Governance', q:'How does your leadership team engage with EDI?', hint:'Think about whether EDI is on the board or senior leadership agenda, whether there are named champions, and whether targets are set and reviewed.' },
  { key:'recruitment', label:'Recruitment and Hiring', q:'What does your current approach to recruitment look like from an inclusion perspective?', hint:'Think about your job adverts, interview processes, who makes hiring decisions, and whether you track who applies versus who gets hired.' },
  { key:'culture', label:'Culture and Belonging', q:'How would employees describe the day-to-day experience of inclusion in your organisation?', hint:'Think about psychological safety, how microaggressions are handled, whether all voices are heard in meetings, and whether people feel they can be themselves at work.' },
  { key:'data', label:'Data and Evidence', q:'What data do you collect about your workforce, and what do you do with it?', hint:'Think about diversity data, pay gap reporting, employee survey results, and whether data actually drives decisions or just gets collected.' },
  { key:'policy', label:'Policy and Process', q:'How well do your policies and processes support inclusion?', hint:'Think about whether your policies have been reviewed through an EDI lens, whether reasonable adjustments are handled well, and whether promotion and progression processes are transparent.' },
  { key:'learning', label:'Learning and Development', q:'What EDI learning exists in your organisation, and who accesses it?', hint:'Think about whether training is mandatory or optional, one-off or ongoing, and whether it reaches leadership as well as all staff.' },
];

export default function InclusionHealthCheckPage() {
  const [orgName, setOrgName] = useState('');
  const [sector, setSector] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [userRole, setUserRole] = useState('');
  const [fields, setFields] = useState<Record<string,string>>({
    leadership:'', recruitment:'', culture:'', data:'', policy:'', learning:'',
  });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<HealthCheckResult|null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const stepRef = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => {
    if (loading) { stepRef.current = setInterval(() => setLoadingStep(s => (s+1)%LOADING_STEPS.length), 1800); }
    else { if (stepRef.current) clearInterval(stepRef.current); setLoadingStep(0); }
    return () => { if (stepRef.current) clearInterval(stepRef.current); };
  }, [loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sector || !orgSize) return;
    const allFilled = PROMPTS.every(p => fields[p.key]?.trim());
    if (!allFilled) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/inclusion-health-check', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ orgName, sector, orgSize, userRole, ...fields }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setResult(json);
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  }

  function copyReport() {
    if (!result) return;
    navigator.clipboard.writeText(buildReport(result)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const inp: React.CSSProperties = { width:'100%', padding:'12px 14px', border:'1px solid var(--gray-soft)', borderRadius:8, fontSize:15, background:'var(--white)', color:'var(--charcoal)', boxSizing:'border-box', outline:'none', fontFamily:'inherit' };
  const lbl: React.CSSProperties = { display:'block', fontSize:14, fontWeight:600, color:'var(--charcoal)', marginBottom:4 };
  const hint: React.CSSProperties = { fontSize:13, color:'#888', margin:'0 0 8px 0', lineHeight:1.5 };

  return (
    <div style={{ minHeight:'100vh', background:'var(--sage-xlight)', display:'flex', flexDirection:'column' }}>
      <PlatformNav />
      <main style={{ flex:1, padding:'40px 24px', maxWidth:860, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

        {!result && !loading && (
          <>
            <div style={{ marginBottom:32 }}>
              <h1 style={{ fontSize:28, fontWeight:700, color:'var(--charcoal)', margin:0 }}>Inclusion Health Check</h1>
              <p style={{ fontSize:16, color:'#555', marginTop:8, lineHeight:1.6, maxWidth:640 }}>
                Describe your organisation across six key dimensions and get a personalised diagnostic report with priority areas, actions to take this week, and questions to raise with your leadership team.
              </p>
              <p style={{ fontSize:14, color:'#888', marginTop:6 }}>A few honest sentences per question is all you need. This takes around 10 minutes.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ background:'var(--white)', borderRadius:12, padding:28, boxShadow:'0 1px 4px rgba(0,0,0,0.06)', marginBottom:20 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:'var(--charcoal)', margin:'0 0 20px 0' }}>About your organisation</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label style={lbl}>Organisation name <span style={{ color:'#aaa', fontWeight:400 }}>(optional)</span></label>
                      <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Riverside Housing Trust" style={inp} />
                    </div>
                    <div>
                      <label style={lbl}>Your role <span style={{ color:'#aaa', fontWeight:400 }}>(optional)</span></label>
                      <input type="text" value={userRole} onChange={e => setUserRole(e.target.value)} placeholder="e.g. Head of People" style={inp} />
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label style={lbl}>Sector <span style={{ color:'#c00' }}>*</span></label>
                      <select value={sector} onChange={e => setSector(e.target.value)} style={{ ...inp, cursor:'pointer' }} required>
                        <option value="">Select sector</option>
                        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Organisation size <span style={{ color:'#c00' }}>*</span></label>
                      <select value={orgSize} onChange={e => setOrgSize(e.target.value)} style={{ ...inp, cursor:'pointer' }} required>
                        <option value="">Select size</option>
                        {ORG_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {PROMPTS.map((p,i) => (
                  <div key={p.key} style={{ background:'var(--white)', borderRadius:12, padding:28, boxShadow:'0 1px 4px rgba(0,0,0,0.06)', borderLeft:'3px solid #C9A84C' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:'#C9A84C', textTransform:'uppercase', letterSpacing:'0.06em' }}>{i+1} of 6</span>
                      <span style={{ fontSize:15, fontWeight:700, color:'var(--charcoal)' }}>{p.label}</span>
                    </div>
                    <p style={{ fontSize:15, fontWeight:600, color:'var(--charcoal)', margin:'0 0 6px 0' }}>{p.q} <span style={{ color:'#c00' }}>*</span></p>
                    <p style={hint}>{p.hint}</p>
                    <textarea
                      value={fields[p.key]} onChange={e => setFields(f => ({ ...f, [p.key]: e.target.value }))}
                      placeholder="Describe what this looks like in your organisation right now..."
                      style={{ ...inp, minHeight:100, resize:'vertical' }} required
                    />
                  </div>
                ))}
              </div>
              {error && <div style={{ background:'#fff0f0', border:'1px solid #ffccc7', borderRadius:8, padding:'12px 16px', color:'#c0392b', fontSize:14, marginTop:16 }}>{error}</div>}
              <button type="submit" style={{ marginTop:24, background:'var(--charcoal)', color:'var(--white)', border:'none', borderRadius:8, padding:'14px 28px', fontSize:16, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                Generate my health check report
              </button>
            </form>
          </>
        )}

        {loading && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, gap:20 }}>
            <div style={{ width:48, height:48, border:'4px solid rgba(201,168,76,0.3)', borderTop:'4px solid #C9A84C', borderRadius:'50%', animation:'spin 0.9s linear infinite' }} />
            <p style={{ fontSize:15, color:'#555', fontWeight:500 }}>{LOADING_STEPS[loadingStep]}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {result && !loading && (
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
              <div>
                <h1 style={{ fontSize:26, fontWeight:700, color:'var(--charcoal)', margin:0 }}>
                  {result.orgName ? `${result.orgName}: Inclusion Health Check` : 'Your Inclusion Health Check'}
                </h1>
                <p style={{ fontSize:14, color:'#888', marginTop:4 }}>Generated by The Inclusion Edit</p>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button onClick={copyReport} style={{ background:'#C9A84C', color:'var(--white)', border:'none', borderRadius:8, padding:'10px 18px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  {copied ? '✓ Copied' : 'Copy report'}
                </button>
                <button onClick={() => { setResult(null); setError(''); }} style={{ background:'transparent', border:'1px solid var(--gray-soft)', borderRadius:8, padding:'10px 18px', fontSize:14, cursor:'pointer', fontFamily:'inherit', color:'var(--charcoal)' }}>
                  Start again
                </button>
              </div>
            </div>

            <div style={{ background:'var(--charcoal)', borderRadius:12, padding:'24px 28px' }}>
              <p style={{ fontSize:12, fontWeight:700, color:'#C9A84C', textTransform:'uppercase', letterSpacing:'0.06em', margin:'0 0 8px 0' }}>Overall picture</p>
              <p style={{ fontSize:17, color:'var(--white)', margin:0, lineHeight:1.7 }}>{result.headline}</p>
            </div>

            <div>
              <h2 style={{ fontSize:18, fontWeight:700, color:'var(--charcoal)', margin:'0 0 14px 0' }}>Dimension breakdown</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {result.dimensions.map(d => {
                  const cfg = STATUS_CFG[d.status];
                  return (
                    <div key={d.name} style={{ background:'var(--white)', borderRadius:10, padding:'20px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', borderLeft:`3px solid ${cfg.border}` }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                        <span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', background:cfg.colour, flexShrink:0 }} />
                        <span style={{ fontSize:15, fontWeight:700, color:'var(--charcoal)' }}>{d.name}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:cfg.colour, background:cfg.bg, padding:'2px 8px', borderRadius:20, marginLeft:'auto' }}>{cfg.label}</span>
                      </div>
                      <p style={{ fontSize:14, color:'#444', margin:'0 0 10px 0', lineHeight:1.65 }}>{d.observation}</p>
                      <div style={{ background:'rgba(201,168,76,0.08)', borderRadius:6, padding:'8px 12px', borderLeft:'2px solid #C9A84C' }}>
                        <p style={{ fontSize:12, fontWeight:700, color:'#8a6b1e', margin:'0 0 3px 0', textTransform:'uppercase', letterSpacing:'0.04em' }}>What good looks like</p>
                        <p style={{ fontSize:13, color:'#555', margin:0, lineHeight:1.55 }}>{d.whatGoodLooksLike}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 style={{ fontSize:18, fontWeight:700, color:'var(--charcoal)', margin:'0 0 14px 0' }}>Priority areas</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {result.priorityAreas.map((p,i) => (
                  <div key={i} style={{ background:'var(--white)', borderRadius:10, padding:'18px 22px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', display:'flex', gap:16, alignItems:'flex-start' }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--charcoal)', color:'var(--white)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                    <div>
                      <p style={{ fontSize:15, fontWeight:700, color:'var(--charcoal)', margin:'0 0 4px 0' }}>{p.name}</p>
                      <p style={{ fontSize:14, color:'#555', margin:0, lineHeight:1.65 }}>{p.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:'rgba(201,168,76,0.1)', border:'1px solid #C9A84C', borderRadius:12, padding:'24px 28px' }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:'var(--charcoal)', margin:'0 0 14px 0' }}>Start this week</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {result.startThisWeek.map((s,i) => (
                  <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                    <span style={{ fontSize:14, fontWeight:700, color:'#C9A84C', flexShrink:0, marginTop:1 }}>→</span>
                    <p style={{ fontSize:14, color:'var(--charcoal)', margin:0, lineHeight:1.65 }}>{s.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:'var(--white)', borderRadius:12, padding:'24px 28px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:'var(--charcoal)', margin:'0 0 6px 0' }}>Questions to take to your leadership team</h2>
              <p style={{ fontSize:14, color:'#777', margin:'0 0 16px 0' }}>Use these to open a conversation or put them on a senior leadership agenda.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {result.leadershipQuestions.map((q,i) => (
                  <div key={i} style={{ padding:'12px 16px', background:'var(--sage-xlight)', borderRadius:8, display:'flex', gap:12, alignItems:'flex-start' }}>
                    <span style={{ fontSize:13, fontWeight:700, color:'#888', flexShrink:0, marginTop:1 }}>{i+1}.</span>
                    <p style={{ fontSize:14, color:'var(--charcoal)', margin:0, lineHeight:1.6 }}>{q.question}</p>
                  </div>
                ))}
              </div>
            </div>

            {result.recommendedResources.length > 0 && (
              <div>
                <h2 style={{ fontSize:18, fontWeight:700, color:'var(--charcoal)', margin:'0 0 14px 0' }}>Recommended resources</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {result.recommendedResources.map((r,i) => (
                    <Link key={i} href={r.link} style={{ display:'block', background:'var(--white)', borderRadius:10, padding:'16px 20px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', textDecoration:'none', border:'1px solid var(--gray-soft)' }}>
                      <p style={{ fontSize:15, fontWeight:700, color:'var(--charcoal)', margin:'0 0 4px 0' }}>{r.title} →</p>
                      <p style={{ fontSize:13, color:'#666', margin:0, lineHeight:1.55 }}>{r.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background:'var(--white)', borderRadius:12, padding:'24px 28px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <p style={{ fontSize:15, fontWeight:700, color:'var(--charcoal)', margin:'0 0 4px 0' }}>Share this report</p>
                <p style={{ fontSize:13, color:'#777', margin:0 }}>Copy the full report to share with a senior stakeholder or use as the basis for an EDI business case.</p>
              </div>
              <button onClick={copyReport} style={{ background:'#C9A84C', color:'var(--white)', border:'none', borderRadius:8, padding:'12px 22px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                {copied ? '✓ Copied' : 'Copy full report'}
              </button>
            </div>
          </div>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
