'use client';
import { useState } from 'react';
import PlatformNav from '@/app/components/PlatformNav';
import BottomBanner from '@/app/components/BottomBanner';

const POLICY_TYPES = ['Parental Leave','Flexible Working','Recruitment and Selection','Disciplinary and Grievance','Bullying and Harassment','Equality and Diversity','Reasonable Adjustments','Pay and Reward','Other'];
const JURISDICTIONS = ['England','Scotland','Wales','Northern Ireland','Republic of Ireland','Bermuda','United States'];
const SECTORS = ['Private sector','Public sector','Third sector / charity','Education (schools)','Education (higher education)','Healthcare / NHS','Financial services','Legal','Technology','Hospitality and retail','Other'];
const ORG_SIZES = ['Under 50 employees','50 to 249 employees','250 to 999 employees','1,000 or more employees'];
const LAST_REVIEWED = ['Within the last year','1 to 2 years ago','3 to 5 years ago','More than 5 years ago','Unknown / never reviewed'];

const LOADING_STEPS = [
  'Reviewing language and tone...',
  'Checking legal framework alignment...',
  'Assessing coverage of protected characteristics...',
  'Reviewing accountability and governance...',
  'Checking action points vs aspirations...',
  'Applying intersectionality lens...',
  'Reviewing accessibility of the document...',
  'Generating your audit report...',
];

type Finding = { quote: string; finding: string; severity: 'critical' | 'recommended' | 'enhancement' };
type Dimension = { name: string; status: 'red' | 'amber' | 'green'; findings: Finding[] };
type Rewrite = { id: string; section: string; original_text: string; suggested_text: string; reason: string; severity: string };
type ActionPlan = { signOff: string; nextReview: string; consultation: string; frameworks: string[]; equalityImpact: string; communication: string };
type AuditResult = {
  overallRating: 'needs_work' | 'developing' | 'strong';
  overallSummary: string;
  dimensions: Dimension[];
  rewrites: Rewrite[];
  actionPlan: ActionPlan;
  legalReferences: string[];
  policyName: string;
  jurisdiction: string;
  sector: string;
};

export default function PolicyEquityAuditor() {
  // Form state
  const [policyName, setPolicyName] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [usState, setUsState] = useState('');
  const [sector, setSector] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [lastReviewed, setLastReviewed] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [doesWell, setDoesWell] = useState('');
  const [focusOn, setFocusOn] = useState('');
  const [policyText, setPolicyText] = useState('');
  // UI state
  const [step, setStep] = useState<'form' | 'loading' | 'audit' | 'rewrites' | 'action'>('form');
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  // Rewrite state
  const [rewriteDecisions, setRewriteDecisions] = useState<Record<string, 'accepted' | 'skipped' | null>>({});
  const [rewriteIndex, setRewriteIndex] = useState(0);
  const [updatedPolicy, setUpdatedPolicy] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function wordCount(text: string) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  function decideRewrite(id: string, decision: 'accepted' | 'skipped') {
    setRewriteDecisions(prev => ({ ...prev, [id]: decision }));
    if (result && rewriteIndex < result.rewrites.length - 1) {
      setRewriteIndex(i => i + 1);
    }
  }

  function generateUpdatedPolicy() {
    if (!result) return;
    let updated = policyText;
    result.rewrites.forEach(rw => {
      if (rewriteDecisions[rw.id] === 'accepted') {
        updated = updated.replace(rw.original_text, rw.suggested_text);
      }
    });
    setUpdatedPolicy(updated);
    setStep('action');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!policyName || !policyType || !jurisdiction || !sector || !orgSize || !lastReviewed || !policyText.trim()) {
      setError('Please complete all required fields and paste your policy text.');
      return;
    }
    setError('');
    setStep('loading');
    setLoadingStep(0);
    const interval = setInterval(() => setLoadingStep(s => (s + 1) % LOADING_STEPS.length), 1800);
    try {
      const res = await fetch('/api/policy-equity-auditor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyName, policyType, jurisdiction, usState, sector, orgSize, lastReviewed, policyDescription, doesWell, focusOn, policyText }),
      });
      const data = await res.json();
      clearInterval(interval);
      if (data.error) { setError(data.error); setStep('form'); }
      else {
        setResult(data);
        const initial: Record<string, null> = {};
        (data.rewrites || []).forEach((rw: Rewrite) => { initial[rw.id] = null; });
        setRewriteDecisions(initial);
        setRewriteIndex(0);
        setStep('audit');
      }
    } catch {
      clearInterval(interval);
      setError('Something went wrong. Please try again.');
      setStep('form');
    }
  }

  // Styles
  const selectStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--gray-soft)', fontSize: 15, background: 'var(--white)', color: 'var(--charcoal)', fontFamily: 'inherit', boxSizing: 'border-box' };
  const inputStyle: React.CSSProperties = { ...selectStyle };
  const textareaStyle: React.CSSProperties = { ...selectStyle, minHeight: 90, resize: 'vertical' };
  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 15, color: 'var(--charcoal)' };
  const sectionCard: React.CSSProperties = { background: 'var(--white)', borderRadius: 12, padding: '28px 32px', marginBottom: 24, border: '1px solid var(--gray-soft)' };
  const copyBtn: React.CSSProperties = { border: '1.5px solid #C9A84C', borderRadius: 8, background: 'transparent', color: 'var(--charcoal)', padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500 };

  const ragColor = (s: string) => s === 'red' ? '#e74c3c' : s === 'amber' ? '#e67e22' : '#27ae60';
  const ragLabel = (s: string) => s === 'red' ? 'Needs Work' : s === 'amber' ? 'Developing' : 'Strong';
  const severityColor = (s: string) => s === 'critical' ? '#e74c3c' : s === 'recommended' ? '#e67e22' : '#3498db';
  const overallLabel = (r: string) => r === 'needs_work' ? 'Needs Significant Work' : r === 'developing' ? 'Developing' : 'Strong';
  const overallColor = (r: string) => r === 'needs_work' ? '#e74c3c' : r === 'developing' ? '#e67e22' : '#27ae60';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sage-xlight)', fontFamily: 'inherit' }}>
      <PlatformNav />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 80px' }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.2)', border: '1px solid #C9A84C', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8a6d1f', marginBottom: 14 }}>INCLUSION AI</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--charcoal)', margin: '0 0 12px' }}>Policy Equity Auditor</h1>
          <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6, maxWidth: 640, margin: 0 }}>Paste any workplace policy and receive a comprehensive equity audit: language issues, legal gaps, structural weaknesses, suggested rewrites, and a personalised action plan.</p>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit}>
            <div style={sectionCard}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px', color: 'var(--charcoal)' }}>About the policy</h2>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Policy name <span style={{ color: '#c0392b' }}>*</span></label>
                <input style={inputStyle} value={policyName} onChange={e => setPolicyName(e.target.value)} placeholder="e.g. Flexible Working Policy" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Policy type <span style={{ color: '#c0392b' }}>*</span></label>
                  <select style={selectStyle} value={policyType} onChange={e => setPolicyType(e.target.value)}>
                    <option value="">Select type</option>
                    {POLICY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Jurisdiction <span style={{ color: '#c0392b' }}>*</span></label>
                  <select style={selectStyle} value={jurisdiction} onChange={e => setJurisdiction(e.target.value)}>
                    <option value="">Select jurisdiction</option>
                    {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
              </div>
              {jurisdiction === 'United States' && (
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>State <span style={{ fontWeight: 400, color: '#888' }}>(optional)</span></label>
                  <input style={inputStyle} value={usState} onChange={e => setUsState(e.target.value)} placeholder="e.g. California" />
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Sector <span style={{ color: '#c0392b' }}>*</span></label>
                  <select style={selectStyle} value={sector} onChange={e => setSector(e.target.value)}>
                    <option value="">Select sector</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Organisation size <span style={{ color: '#c0392b' }}>*</span></label>
                  <select style={selectStyle} value={orgSize} onChange={e => setOrgSize(e.target.value)}>
                    <option value="">Select size</option>
                    {ORG_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>When was this policy last reviewed? <span style={{ color: '#c0392b' }}>*</span></label>
                <select style={selectStyle} value={lastReviewed} onChange={e => setLastReviewed(e.target.value)}>
                  <option value="">Select</option>
                  {LAST_REVIEWED.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Brief description <span style={{ fontWeight: 400, color: '#888' }}>(optional)</span></label>
                <textarea style={textareaStyle} value={policyDescription} onChange={e => setPolicyDescription(e.target.value)} placeholder="What is this policy for? 2 to 3 sentences." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>What does it do well? <span style={{ fontWeight: 400, color: '#888' }}>(optional)</span></label>
                  <textarea style={{ ...textareaStyle, minHeight: 72 }} value={doesWell} onChange={e => setDoesWell(e.target.value)} placeholder="Any areas you think are already strong." />
                </div>
                <div>
                  <label style={labelStyle}>What should we focus on? <span style={{ fontWeight: 400, color: '#888' }}>(optional)</span></label>
                  <textarea style={{ ...textareaStyle, minHeight: 72 }} value={focusOn} onChange={e => setFocusOn(e.target.value)} placeholder="Any concerns or areas you want highlighted." />
                </div>
              </div>
            </div>

            <div style={sectionCard}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--charcoal)' }}>Paste your policy</h2>
              <p style={{ fontSize: 13, color: '#888', margin: '0 0 12px' }}>Include all sections and appendices for the most thorough audit. {wordCount(policyText) > 0 && <span style={{ color: 'var(--charcoal)', fontWeight: 600 }}>{wordCount(policyText).toLocaleString()} words</span>}</p>
              <textarea style={{ ...textareaStyle, minHeight: 280 }} value={policyText} onChange={e => setPolicyText(e.target.value)} placeholder="Paste your full policy text here..." />
            </div>

            {error && <p style={{ color: '#c0392b', marginBottom: 16, fontWeight: 500 }}>{error}</p>}
            <button type="submit" style={{ background: 'var(--charcoal)', color: 'var(--white)', border: 'none', borderRadius: 10, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Run Audit</button>
          </form>
        )}

        {step === 'loading' && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 48, height: 48, border: '4px solid var(--gray-soft)', borderTop: '4px solid #C9A84C', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 0.9s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 17, color: 'var(--charcoal)', fontWeight: 600 }}>{LOADING_STEPS[loadingStep]}</p>
            <p style={{ fontSize: 14, color: '#888', marginTop: 8 }}>This takes around 45 seconds</p>
          </div>
        )}

        {step === 'audit' && result && (
          <div>
            {/* Overall rating banner */}
            <div style={{ background: overallColor(result.overallRating), borderRadius: 14, padding: '24px 32px', marginBottom: 28, color: 'var(--white)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 6 }}>OVERALL EQUITY RATING</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>{overallLabel(result.overallRating)}</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: 15, lineHeight: 1.6 }}>{result.overallSummary}</p>
              <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: 13 }}>{result.policyName} · {result.jurisdiction} · {result.sector}</p>
            </div>

            {/* Dimension cards */}
            {result.dimensions.map(dim => (
              <div key={dim.name} style={{ ...{ background: 'var(--white)', borderRadius: 12, padding: '22px 28px', marginBottom: 16, border: '1px solid var(--gray-soft)' }, borderLeft: `4px solid ${ragColor(dim.status)}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: ragColor(dim.status), flexShrink: 0 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', margin: 0 }}>{dim.name}</h3>
                  <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: ragColor(dim.status), background: `${ragColor(dim.status)}18`, padding: '3px 10px', borderRadius: 12 }}>{ragLabel(dim.status)}</span>
                </div>
                {dim.findings.map((f, i) => (
                  <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < dim.findings.length - 1 ? '1px solid var(--gray-soft)' : 'none' }}>
                    {f.quote && <blockquote style={{ margin: '0 0 6px', padding: '8px 14px', background: '#f8f8f8', borderLeft: '3px solid #ddd', borderRadius: 4, fontSize: 13, color: '#555', fontStyle: 'italic' }}>{f.quote}</blockquote>}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: severityColor(f.severity), background: `${severityColor(f.severity)}15`, padding: '2px 8px', borderRadius: 8, flexShrink: 0, marginTop: 2, textTransform: 'uppercase' }}>{f.severity}</span>
                      <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.6 }}>{f.finding}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Legal references */}
            {result.legalReferences && result.legalReferences.length > 0 && (
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 28px', marginBottom: 24, border: '1px solid var(--gray-soft)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', margin: '0 0 12px' }}>Relevant Legal Frameworks and Standards</h3>
                <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                  {result.legalReferences.map((ref, i) => <li key={i} style={{ fontSize: 14, color: '#444', marginBottom: 6, lineHeight: 1.5 }}>{ref}</li>)}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => copy(result.dimensions.map(d => `${d.name} (${ragLabel(d.status)})\n${d.findings.map(f => `${f.severity.toUpperCase()}: ${f.finding}`).join('\n')}`).join('\n\n'), 'audit')} style={copyBtn}>{copied === 'audit' ? 'Copied' : 'Copy audit report'}</button>
              {result.rewrites && result.rewrites.length > 0 && (
                <button onClick={() => setStep('rewrites')} style={{ background: 'var(--charcoal)', color: 'var(--white)', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Review suggested rewrites ({result.rewrites.length}) →
                </button>
              )}
              <button onClick={() => setStep('action')} style={{ border: '1.5px solid var(--gray-soft)', borderRadius: 8, background: 'transparent', padding: '10px 24px', fontSize: 15, cursor: 'pointer', color: '#666' }}>
                Skip to action plan →
              </button>
            </div>
          </div>
        )}

        {step === 'rewrites' && result && (
          <div>
            <div style={{ background: 'var(--charcoal)', borderRadius: 14, padding: '24px 32px', marginBottom: 28, color: 'var(--white)' }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>Suggested Rewrites</h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: 15 }}>Review each suggestion and choose to accept or skip it. When you are done, we will generate your updated policy with only the accepted changes.</p>
            </div>

            {/* Progress */}
            <div style={{ background: 'var(--white)', borderRadius: 10, padding: '14px 20px', marginBottom: 20, border: '1px solid var(--gray-soft)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#C9A84C', borderRadius: 4, width: `${(Object.values(rewriteDecisions).filter(v => v !== null).length / result.rewrites.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: 14, color: '#666', whiteSpace: 'nowrap' }}>{Object.values(rewriteDecisions).filter(v => v !== null).length} of {result.rewrites.length} reviewed</span>
            </div>

            {result.rewrites.map((rw, i) => {
              const decision = rewriteDecisions[rw.id];
              const isCurrent = i === rewriteIndex;
              return (
                <div key={rw.id} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 28px', marginBottom: 14, border: `2px solid ${decision === 'accepted' ? '#27ae60' : decision === 'skipped' ? '#ddd' : isCurrent ? '#C9A84C' : 'var(--gray-soft)'}`, opacity: decision === 'skipped' ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>#{i + 1}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>{rw.section}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: severityColor(rw.severity), background: `${severityColor(rw.severity)}15`, padding: '2px 8px', borderRadius: 8, textTransform: 'uppercase' }}>{rw.severity}</span>
                    </div>
                    {decision && <span style={{ fontSize: 13, fontWeight: 700, color: decision === 'accepted' ? '#27ae60' : '#999' }}>{decision === 'accepted' ? 'Accepted' : 'Skipped'}</span>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#e74c3c', marginBottom: 6, letterSpacing: 0.5 }}>ORIGINAL</div>
                      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, background: '#fef9f9', padding: '10px 14px', borderRadius: 8, margin: 0, fontStyle: 'italic', border: '1px solid #fdd' }}>{rw.original_text}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#27ae60', marginBottom: 6, letterSpacing: 0.5 }}>SUGGESTED</div>
                      <p style={{ fontSize: 14, color: '#333', lineHeight: 1.6, background: '#f0faf4', padding: '10px 14px', borderRadius: 8, margin: 0, border: '1px solid #c3e6cb' }}>{rw.suggested_text}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#666', margin: '0 0 14px', fontStyle: 'italic' }}>{rw.reason}</p>
                  {!decision && (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => decideRewrite(rw.id, 'accepted')} style={{ background: '#27ae60', color: 'var(--white)', border: 'none', borderRadius: 8, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Accept</button>
                      <button onClick={() => decideRewrite(rw.id, 'skipped')} style={{ background: 'transparent', border: '1.5px solid var(--gray-soft)', borderRadius: 8, padding: '9px 22px', fontSize: 14, cursor: 'pointer', color: '#666' }}>Skip</button>
                    </div>
                  )}
                  {decision && (
                    <button onClick={() => setRewriteDecisions(prev => ({ ...prev, [rw.id]: null }))} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Undo</button>
                  )}
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
              <button onClick={generateUpdatedPolicy} style={{ background: 'var(--charcoal)', color: 'var(--white)', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Generate updated policy ({Object.values(rewriteDecisions).filter(v => v === 'accepted').length} changes accepted)
              </button>
              <button onClick={() => setStep('audit')} style={{ border: '1.5px solid var(--gray-soft)', borderRadius: 10, background: 'transparent', padding: '14px 24px', fontSize: 15, cursor: 'pointer', color: '#666' }}>Back to audit</button>
            </div>
          </div>
        )}

        {step === 'action' && result && (
          <div>
            <div style={{ background: 'var(--charcoal)', borderRadius: 14, padding: '24px 32px', marginBottom: 28, color: 'var(--white)' }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>Your Action Plan</h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: 15 }}>These are the things the AI cannot fix by rewriting: the steps that need human action, consultation, and governance.</p>
            </div>

            {[
              { label: 'Who needs to sign this off', value: result.actionPlan?.signOff },
              { label: 'When to review it next', value: result.actionPlan?.nextReview },
              { label: 'Who to consult before finalising', value: result.actionPlan?.consultation },
              { label: 'Whether an equality impact assessment is needed', value: result.actionPlan?.equalityImpact },
              { label: 'Communication plan', value: result.actionPlan?.communication },
            ].map(item => item.value ? (
              <div key={item.label} style={{ background: 'var(--white)', borderRadius: 12, padding: '20px 26px', marginBottom: 14, border: '1px solid var(--gray-soft)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>{item.label}</div>
                <p style={{ margin: 0, fontSize: 15, color: '#333', lineHeight: 1.7 }}>{item.value}</p>
              </div>
            ) : null)}

            {result.actionPlan?.frameworks && result.actionPlan.frameworks.length > 0 && (
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '20px 26px', marginBottom: 14, border: '1px solid var(--gray-soft)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>Frameworks to align to</div>
                <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                  {result.actionPlan.frameworks.map((f, i) => <li key={i} style={{ fontSize: 14, color: '#444', marginBottom: 6, lineHeight: 1.5 }}>{f}</li>)}
                </ul>
              </div>
            )}

            {updatedPolicy && (
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 28px', marginBottom: 20, border: '1.5px solid #27ae60' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', margin: 0 }}>Updated Policy</h3>
                  <button onClick={() => copy(updatedPolicy, 'policy')} style={copyBtn}>{copied === 'policy' ? 'Copied' : 'Copy updated policy'}</button>
                </div>
                <textarea readOnly value={updatedPolicy} style={{ ...textareaStyle, minHeight: 200, background: '#f8fff9', cursor: 'text' }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
              <button onClick={() => copy([
                `POLICY EQUITY AUDIT: ${result.policyName}`,
                `Overall: ${overallLabel(result.overallRating)}`,
                '',
                ...result.dimensions.map(d => `${d.name} (${ragLabel(d.status)})\n${d.findings.map(f => `${f.severity.toUpperCase()}: ${f.finding}`).join('\n')}`),
                '',
                'ACTION PLAN',
                result.actionPlan?.signOff ? `Sign-off: ${result.actionPlan.signOff}` : '',
                result.actionPlan?.nextReview ? `Next review: ${result.actionPlan.nextReview}` : '',
                result.actionPlan?.consultation ? `Consultation: ${result.actionPlan.consultation}` : '',
                result.actionPlan?.communication ? `Communication: ${result.actionPlan.communication}` : '',
              ].filter(Boolean).join('\n'), 'full')} style={copyBtn}>{copied === 'full' ? 'Copied' : 'Copy full report'}</button>
              {!updatedPolicy && result.rewrites && result.rewrites.length > 0 && (
                <button onClick={() => setStep('rewrites')} style={{ border: '1.5px solid #C9A84C', borderRadius: 8, background: 'transparent', padding: '10px 20px', fontSize: 14, cursor: 'pointer', color: 'var(--charcoal)', fontWeight: 600 }}>Review rewrites</button>
              )}
              <button onClick={() => { setStep('form'); setResult(null); setPolicyText(''); setRewriteDecisions({}); setUpdatedPolicy(''); }} style={{ border: '1.5px solid var(--gray-soft)', borderRadius: 8, background: 'transparent', padding: '10px 20px', fontSize: 14, cursor: 'pointer', color: '#666' }}>Audit another policy</button>
            </div>

            <div style={{ background: 'var(--white)', borderRadius: 12, padding: '24px 28px', textAlign: 'center', border: '1px solid var(--gray-soft)' }}>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: '0 0 16px' }}>Need help taking this further? The Inclusion Edit can work with you to rewrite, consult on, and implement policies across your organisation.</p>
              <a href="/dashboard/apply" style={{ display: 'inline-block', background: 'var(--charcoal)', color: 'var(--white)', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Work with us</a>
            </div>
          </div>
        )}

        {step === 'form' && (
          <div style={{ background: 'var(--white)', borderRadius: 12, padding: '28px 32px', marginTop: 32, border: '1px solid var(--gray-soft)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', margin: '0 0 12px' }}>About this tool</h3>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, margin: 0 }}>The Policy Equity Auditor reviews any workplace policy across seven equity dimensions: language and tone, legal framework alignment, coverage of protected characteristics, accountability and governance, action vs aspiration, intersectionality, and accessibility. It returns specific findings with severity ratings, suggested rewrites you can accept or skip, and a personalised action plan. Legal references are jurisdiction and sector specific. No policy text is stored after your session ends.</p>
          </div>
        )}

      </div>
      <BottomBanner />
    </div>
  );
}
