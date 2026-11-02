'use client';

import { useState, useEffect, useRef } from 'react';
import PlatformNav from '@/app/components/PlatformNav';
import BottomBanner from '@/app/components/BottomBanner';

const ROLE_LEVELS = [
  'Entry level / Junior',
  'Mid-level',
  'Senior / Specialist',
  'Manager / Team lead',
  'Director / Head of',
  'Executive / C-suite',
];

const SECTORS = [
  'Private sector',
  'Public sector',
  'Third sector / Charity',
  'Education (schools)',
  'Education (higher education)',
  'Healthcare / NHS',
  'Financial services',
  'Legal',
  'Technology',
  'Hospitality and retail',
  'Other',
];

const FORMATS = [
  'Structured (same questions, same order, for every candidate)',
  'Competency-based (evidence of past behaviour)',
  'Values-based (alignment with organisational values)',
  'Panel interview (multiple interviewers present)',
];

const LOADING_STEPS = [
  'Reading your job specification...',
  'Generating role-specific questions...',
  'Adding follow-up probes...',
  'Checking for bias and exclusionary language...',
  'Compiling your what not to ask list...',
  'Building your question bank...',
];

interface Question {
  id: string;
  text: string;
  assessing: string;
  probes: string[];
}

interface Theme {
  name: string;
  questions: Question[];
}

interface WhatNotToAsk {
  questionType: string;
  why: string;
  alternative: string;
}

interface Result {
  themes: Theme[];
  whatNotToAsk: WhatNotToAsk[];
}

const REASONABLE_ADJUSTMENTS_TEXT = `Before we begin, I want to check whether you need any adjustments to take part in this interview today. This might include the format, timing, or anything else that would help you perform at your best.`;

export default function InterviewQuestionGeneratorPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [roleLevel, setRoleLevel] = useState('');
  const [sector, setSector] = useState('');
  const [interviewFormat, setInterviewFormat] = useState('');
  const [jobSpec, setJobSpec] = useState('');
  const [aboutOrg, setAboutOrg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'bank' | 'notask' | 'build'>('bank');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedRa, setCopiedRa] = useState(false);

  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      stepIntervalRef.current = setInterval(() => {
        setLoadingStep(s => (s + 1) % LOADING_STEPS.length);
      }, 1800);
    } else {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      setLoadingStep(0);
    }
    return () => { if (stepIntervalRef.current) clearInterval(stepIntervalRef.current); };
  }, [loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!jobTitle || !roleLevel || !sector || !interviewFormat || !jobSpec) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSelectedIds(new Set());
    setActiveTab('bank');

    try {
      const res = await fetch('/api/interview-question-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, roleLevel, sector, interviewFormat, jobSpec, aboutOrg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function buildInterviewText(): string {
    if (!result) return '';
    const lines: string[] = [];
    lines.push('REASONABLE ADJUSTMENTS REMINDER');
    lines.push('');
    lines.push(REASONABLE_ADJUSTMENTS_TEXT);
    lines.push('');
    lines.push('---');
    lines.push('');

    result.themes.forEach(theme => {
      const selected = theme.questions.filter(q => selectedIds.has(q.id));
      if (selected.length === 0) return;
      lines.push(theme.name.toUpperCase());
      lines.push('');
      selected.forEach((q, i) => {
        lines.push(`${i + 1}. ${q.text}`);
        if (q.assessing) lines.push(`   Assessing: ${q.assessing}`);
        if (q.probes.length > 0) {
          lines.push('   Follow-up probes:');
          q.probes.forEach(p => lines.push(`   - ${p}`));
        }
        lines.push('');
      });
    });

    return lines.join('\n');
  }

  function copyQuestion(q: Question) {
    const text = `${q.text}\n\nAssessing: ${q.assessing}\n\nFollow-up probes:\n${q.probes.map(p => `- ${p}`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(q.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function copyAll() {
    const text = buildInterviewText();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  }

  function copyRa() {
    navigator.clipboard.writeText(REASONABLE_ADJUSTMENTS_TEXT).then(() => {
      setCopiedRa(true);
      setTimeout(() => setCopiedRa(false), 2000);
    });
  }

  function reset() {
    setResult(null);
    setError('');
    setSelectedIds(new Set());
    setActiveTab('bank');
  }

  const selectedCount = selectedIds.size;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--gray-soft)',
    borderRadius: 8,
    fontSize: 15,
    background: 'var(--white)',
    color: 'var(--charcoal)',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--charcoal)',
    marginBottom: 6,
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    border: 'none',
    background: active ? 'var(--charcoal)' : 'transparent',
    color: active ? 'var(--white)' : 'var(--charcoal)',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    fontFamily: 'inherit',
    transition: 'background 0.15s',
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sage-xlight)', display: 'flex', flexDirection: 'column' }}>
      <PlatformNav />

      <main style={{ flex: 1, padding: '40px 24px', maxWidth: 860, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {!result && !loading && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--charcoal)', margin: 0 }}>
                Interview Question Generator
              </h1>
              <p style={{ fontSize: 16, color: '#555', marginTop: 8, lineHeight: 1.6 }}>
                Generate a bank of inclusive, legally compliant interview questions tailored to your role. Select the questions that work best, then build and download your interview pack.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 24 }}>

                <div>
                  <label style={labelStyle}>Job title <span style={{ color: '#c00' }}>*</span></label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Project Manager"
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Role level <span style={{ color: '#c00' }}>*</span></label>
                    <select value={roleLevel} onChange={e => setRoleLevel(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} required>
                      <option value="">Select level</option>
                      {ROLE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Sector <span style={{ color: '#c00' }}>*</span></label>
                    <select value={sector} onChange={e => setSector(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} required>
                      <option value="">Select sector</option>
                      {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Interview format <span style={{ color: '#c00' }}>*</span></label>
                  <select value={interviewFormat} onChange={e => setInterviewFormat(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} required>
                    <option value="">Select format</option>
                    {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Job specification <span style={{ color: '#c00' }}>*</span></label>
                  <textarea
                    value={jobSpec}
                    onChange={e => setJobSpec(e.target.value)}
                    placeholder="Paste the full job specification here, including responsibilities and requirements..."
                    style={{ ...inputStyle, minHeight: 180, resize: 'vertical' }}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>About your organisation <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></label>
                  <p style={{ fontSize: 13, color: '#777', margin: '0 0 8px 0' }}>
                    Paste your mission statement, values, a description of your team, or anything that helps us tailor the questions to your culture and ways of working.
                  </p>
                  <textarea
                    value={aboutOrg}
                    onChange={e => setAboutOrg(e.target.value)}
                    placeholder="Optional: paste your mission statement, team description, or organisational values..."
                    style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                  />
                </div>

                {error && (
                  <div style={{ background: '#fff0f0', border: '1px solid #ffccc7', borderRadius: 8, padding: '12px 16px', color: '#c0392b', fontSize: 14 }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    background: 'var(--charcoal)',
                    color: 'var(--white)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '14px 28px',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    alignSelf: 'flex-start',
                  }}
                >
                  Generate question bank
                </button>
              </div>
            </form>
          </>
        )}

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 340, gap: 20 }}>
            <div style={{
              width: 48,
              height: 48,
              border: '4px solid rgba(201,168,76,0.3)',
              borderTop: '4px solid #C9A84C',
              borderRadius: '50%',
              animation: 'spin 0.9s linear infinite',
            }} />
            <p style={{ fontSize: 15, color: '#555', fontWeight: 500 }}>{LOADING_STEPS[loadingStep]}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {result && !loading && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--charcoal)', margin: 0 }}>
                  Interview Question Bank
                </h1>
                <p style={{ fontSize: 14, color: '#777', marginTop: 4 }}>
                  {result.themes.reduce((sum, t) => sum + t.questions.length, 0)} questions across {result.themes.length} themes
                </p>
              </div>
              <button
                onClick={reset}
                style={{ background: 'transparent', border: '1px solid var(--gray-soft)', borderRadius: 8, padding: '8px 16px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--charcoal)' }}
              >
                Generate another
              </button>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'var(--white)', borderRadius: 8, padding: 4, border: '1px solid var(--gray-soft)', width: 'fit-content' }}>
              <button onClick={() => setActiveTab('bank')} style={tabStyle(activeTab === 'bank')}>Question Bank</button>
              <button onClick={() => setActiveTab('notask')} style={tabStyle(activeTab === 'notask')}>What Not to Ask</button>
              <button onClick={() => setActiveTab('build')} style={tabStyle(activeTab === 'build')}>
                Build Your Interview{selectedCount > 0 ? ` (${selectedCount})` : ''}
              </button>
            </div>

            {activeTab === 'bank' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Reasonable adjustments reminder */}
                <div style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid #C9A84C', borderRadius: 10, padding: '16px 20px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#8a6b1e', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Reasonable Adjustments Reminder
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--charcoal)', margin: 0, lineHeight: 1.6 }}>
                    Say this to every candidate at the start of the interview:
                  </p>
                  <p style={{ fontSize: 15, color: 'var(--charcoal)', margin: '8px 0 12px 0', lineHeight: 1.6, fontStyle: 'italic' }}>
                    &ldquo;{REASONABLE_ADJUSTMENTS_TEXT}&rdquo;
                  </p>
                  <button
                    onClick={copyRa}
                    style={{ background: 'transparent', border: '1px solid #C9A84C', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: '#8a6b1e', fontWeight: 600 }}
                  >
                    {copiedRa ? '✓ Copied' : 'Copy wording'}
                  </button>
                </div>

                {result.themes.map(theme => (
                  <div key={theme.name} style={{ background: 'var(--white)', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', margin: '0 0 16px 0', paddingBottom: 10, borderBottom: '1px solid var(--gray-soft)' }}>
                      {theme.name}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {theme.questions.map((q, idx) => (
                        <div
                          key={q.id}
                          style={{
                            padding: '14px 16px',
                            borderRadius: 8,
                            border: `1px solid ${selectedIds.has(q.id) ? '#C9A84C' : 'var(--gray-soft)'}`,
                            background: selectedIds.has(q.id) ? 'rgba(201,168,76,0.06)' : 'var(--sage-xlight)',
                            transition: 'border-color 0.15s, background 0.15s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(q.id)}
                              onChange={() => toggleSelect(q.id)}
                              style={{ marginTop: 3, accentColor: '#C9A84C', width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
                            />
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', margin: '0 0 4px 0', lineHeight: 1.5 }}>
                                {idx + 1}. {q.text}
                              </p>
                              {q.assessing && (
                                <p style={{ fontSize: 13, color: '#777', margin: '0 0 10px 0' }}>
                                  Assessing: {q.assessing}
                                </p>
                              )}
                              {q.probes.length > 0 && (
                                <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 6, padding: '8px 12px' }}>
                                  <p style={{ fontSize: 12, fontWeight: 600, color: '#888', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Follow-up probes</p>
                                  {q.probes.map((p, pi) => (
                                    <p key={pi} style={{ fontSize: 13, color: '#555', margin: pi < q.probes.length - 1 ? '0 0 4px 0' : 0 }}>
                                      {p}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => copyQuestion(q)}
                              title="Copy question and probes"
                              style={{
                                background: 'transparent',
                                border: '1px solid var(--gray-soft)',
                                borderRadius: 6,
                                padding: '4px 10px',
                                fontSize: 12,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                color: '#777',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {copiedId === q.id ? '✓' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notask' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 15, color: '#555', margin: 0, lineHeight: 1.6 }}>
                  The following question types are legally problematic or can introduce bias. Avoid them in all interviews.
                </p>
                {result.whatNotToAsk.map((item, i) => (
                  <div key={i} style={{ background: 'var(--white)', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: '3px solid #e74c3c' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '0 0 10px 0' }}>
                      {item.questionType}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px 0' }}>Why it is a problem</p>
                        <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.6 }}>{item.why}</p>
                      </div>
                      <div style={{ background: 'rgba(39,174,96,0.08)', borderRadius: 6, padding: '10px 14px', borderLeft: '2px solid #27ae60' }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#27ae60', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px 0' }}>What to ask instead</p>
                        <p style={{ fontSize: 14, color: '#333', margin: 0, lineHeight: 1.6 }}>{item.alternative}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'build' && (
              <div>
                {selectedCount === 0 ? (
                  <div style={{ background: 'var(--white)', borderRadius: 10, padding: 40, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: 16, color: '#777', margin: '0 0 12px 0' }}>No questions selected yet.</p>
                    <p style={{ fontSize: 14, color: '#999', margin: 0 }}>
                      Go to the Question Bank tab and check the questions you want to include in your interview.
                    </p>
                    <button
                      onClick={() => setActiveTab('bank')}
                      style={{ marginTop: 16, background: 'var(--charcoal)', color: 'var(--white)', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Go to Question Bank
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <p style={{ fontSize: 15, color: '#555', margin: 0 }}>
                        {selectedCount} question{selectedCount !== 1 ? 's' : ''} selected
                      </p>
                      <button
                        onClick={copyAll}
                        style={{
                          background: '#C9A84C',
                          color: 'var(--white)',
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        {copiedAll ? '✓ Copied' : 'Copy all'}
                      </button>
                    </div>

                    {/* Reasonable adjustments at top */}
                    <div style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid #C9A84C', borderRadius: 10, padding: '16px 20px' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#8a6b1e', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Say this at the start of the interview
                      </p>
                      <p style={{ fontSize: 14, color: 'var(--charcoal)', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>
                        &ldquo;{REASONABLE_ADJUSTMENTS_TEXT}&rdquo;
                      </p>
                    </div>

                    {result.themes.map(theme => {
                      const selected = theme.questions.filter(q => selectedIds.has(q.id));
                      if (selected.length === 0) return null;
                      return (
                        <div key={theme.name} style={{ background: 'var(--white)', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '0 0 14px 0', paddingBottom: 10, borderBottom: '1px solid var(--gray-soft)' }}>
                            {theme.name}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {selected.map((q, idx) => (
                              <div key={q.id} style={{ paddingBottom: idx < selected.length - 1 ? 14 : 0, borderBottom: idx < selected.length - 1 ? '1px solid var(--gray-soft)' : 'none' }}>
                                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', margin: '0 0 4px 0', lineHeight: 1.5 }}>
                                  {idx + 1}. {q.text}
                                </p>
                                {q.probes.length > 0 && (
                                  <div style={{ marginTop: 8 }}>
                                    <p style={{ fontSize: 12, fontWeight: 600, color: '#888', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Follow-up probes</p>
                                    {q.probes.map((p, pi) => (
                                      <p key={pi} style={{ fontSize: 13, color: '#555', margin: pi < q.probes.length - 1 ? '0 0 3px 0' : 0 }}>{p}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <BottomBanner />
    </div>
  );
}
