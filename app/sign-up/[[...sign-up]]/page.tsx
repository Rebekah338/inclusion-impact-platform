'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const INDIVIDUAL_TIERS = [
  { id: 'individual', label: 'Individual Practitioner', price: '£249/year', desc: '1 named user account; self-service access' },
  { id: 'practitioner-plus', label: 'Practitioner Plus', price: '£499/year', desc: '1 named user account; AI-assisted support' },
  { id: 'expert-track', label: 'Expert Track', price: '£999/year', desc: '1 named user account; 12 expert sessions per year' },
];

const ORG_TIERS = [
  { id: 'growing-teams', label: 'Growing Teams', price: '£2,400/year', desc: 'Up to 5 team members; up to 500 employees' },
  { id: 'established', label: 'Established Organisations', price: '£4,800/year', desc: 'Up to 10 team members; 501 to 2,000 employees' },
  { id: 'enterprise', label: 'Enterprise', price: 'Contact us', desc: 'Unlimited team members; over 2,000 employees' },
];

const ORG_IDS = new Set(ORG_TIERS.map(t => t.id));

const ORG_SIZES = [
  'Up to 50 employees',
  '51 to 250 employees',
  '251 to 500 employees',
  '501 to 1,000 employees',
  '1,001 to 2,000 employees',
  'Over 2,000 employees',
];

function SignUpForm() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get('tier') ?? 'individual';
  const isOrg = ORG_IDS.has(tierParam);
  const activeTiers = isOrg ? ORG_TIERS : INDIVIDUAL_TIERS;
  const defaultTier = activeTiers.find(t => t.id === tierParam)?.id ?? activeTiers[0].id;
  const [selectedTier, setSelectedTier] = useState(defaultTier);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', jobTitle: '', orgName: '', email: '', orgSize: '' });

  useEffect(() => { setSelectedTier(defaultTier); }, [tierParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1.5px solid var(--gray-border)', fontFamily: 'var(--font-body)',
    fontSize: '0.9rem', color: 'var(--charcoal)', background: 'var(--white)',
    outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.78rem',
    color: 'var(--charcoal)', marginBottom: '0.4rem', display: 'block',
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--sage)' }}>✓</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
          Thank you, {form.firstName}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray-soft)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 2rem' }}>
          We have received your details and will be in touch within 24 hours to complete your membership setup.
        </p>
        <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--sage-dark)', textDecoration: 'underline' }}>
          Return to the platform
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ ...labelStyle, marginBottom: '0.75rem' }}>Select your membership</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {activeTiers.map((t) => {
            const active = selectedTier === t.id;
            return (
              <button type="button" key={t.id} onClick={() => setSelectedTier(t.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', border: active ? '2px solid var(--sage)' : '1.5px solid var(--gray-border)', background: active ? 'rgba(42,107,58,0.05)' : 'var(--white)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', color: active ? 'var(--sage-dark)' : 'var(--charcoal)', marginBottom: '0.2rem' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--gray-soft)' }}>{t.desc}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: active ? 'var(--sage-dark)' : 'var(--charcoal)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{t.price}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--gray-border)' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div><label htmlFor="firstName" style={labelStyle}>First name</label><input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} style={inputStyle} /></div>
        <div><label htmlFor="lastName" style={labelStyle}>Last name</label><input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} style={inputStyle} /></div>
      </div>
      <div><label htmlFor="email" style={labelStyle}>Work email</label><input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} /></div>
      <div><label htmlFor="jobTitle" style={labelStyle}>Job title</label><input id="jobTitle" name="jobTitle" type="text" required value={form.jobTitle} onChange={handleChange} style={inputStyle} /></div>
      {isOrg && (
        <>
          <div><label htmlFor="orgName" style={labelStyle}>Organisation name</label><input id="orgName" name="orgName" type="text" required value={form.orgName} onChange={handleChange} style={inputStyle} /></div>
          <div>
            <label htmlFor="orgSize" style={labelStyle}>Organisation size</label>
            <select id="orgSize" name="orgSize" required value={form.orgSize} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' as const }}>
              <option value="">Select size</option>
              {ORG_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </>
      )}
      <button type="submit" style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)', background: '#1e3c23', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
        Complete sign-up
      </button>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray-soft)', textAlign: 'center', lineHeight: 1.6 }}>
        We will be in touch within 24 hours to complete your membership setup. No payment is taken at this stage.
      </p>
    </form>
  );
}

export default function SignUpPage() {
  return (
    <>
      <nav style={{ borderBottom: '1px solid var(--gray-border)', background: 'var(--white)', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'none' }}>
          The Inclusion Edit <span style={{ fontWeight: 400, color: 'var(--sage-dark)' }}>Impact Platform</span>
        </Link>
        <Link href="/sign-in" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--charcoal)', textDecoration: 'none' }}>Sign in</Link>
      </nav>
      <main style={{ background: 'var(--sage-xlight)', minHeight: '100vh', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>Join the platform</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray-soft)' }}>Tell us a little about yourself and we will get your membership set up.</p>
          </div>
          <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '2.25rem', border: '1.5px solid var(--gray-border)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <Suspense fallback={<div style={{ fontFamily: 'var(--font-body)', color: 'var(--gray-soft)', textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
              <SignUpForm />
            </Suspense>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--gray-soft)' }}>
            Already have an account? <Link href="/sign-in" style={{ color: 'var(--sage-dark)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </main>
    </>
  );
}
