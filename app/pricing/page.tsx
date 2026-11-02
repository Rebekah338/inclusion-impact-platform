'use client';

import Link from 'next/link';

const TIERS = [
  {
    tier: 'Individual Practitioner',
    price: '£249',
    period: '/year',
    desc: 'For EDI practitioners, HR professionals, and people managers building their own capability.',
    size: '1 person',
    features: [
      '1 named user account',
      'Full access to all platform modules',
      'Inclusion AI tools',
      'CPD certificate on completion',
      'Tools and frameworks library',
      'Evidence and research library',
    ],
    cta: 'Join today',
    ctaHref: '/sign-up?tier=individual',
    highlight: false,
    badge: null,
  },
  {
    tier: 'Growing Teams',
    price: '£2,400',
    period: '/year',
    desc: 'For organisations with up to 500 employees investing in inclusive culture across their whole team.',
    size: 'Up to 500 employees',
    features: [
      'Access for up to 5 team members',
      'Full access to all platform modules',
      'Inclusion AI tools',
      'Unlimited new starter access across all onboarding modules',
      'Team progress dashboard',
      'Organisation-wide certificates',
      'Priority support',
    ],
    cta: 'Get started',
    ctaHref: '/sign-up?tier=growing-teams',
    highlight: true,
    badge: 'Most chosen',
  },
  {
    tier: 'Established Organisations',
    price: '£4,800',
    period: '/year',
    desc: 'For organisations with 501 to 2,000 employees embedding inclusion across teams and leadership.',
    size: '501 to 2,000 employees',
    features: [
      'Access for up to 10 team members',
      'Full access to all platform modules',
      'Inclusion AI tools',
      'Unlimited new starter access across all onboarding modules',
      'Bespoke reporting',
      'Dedicated account support',
      'Consultancy add-ons available',
    ],
    cta: 'Get started',
    ctaHref: '/sign-up?tier=established-organisations',
    highlight: false,
    badge: null,
  },
];
const COMPARISON = [
  { label: 'Named user accounts', individual: '1', growing: 'Up to 5', established: 'Up to 10' },
  { label: 'Onboarding modules access', individual: 'Your account only', growing: 'Unlimited new starters', established: 'Unlimited new starters' },
  { label: 'Full platform access', individual: '✓', growing: '✓', established: '✓' },
  { label: 'Inclusion AI tools', individual: '✓', growing: '✓', established: '✓' },
  { label: 'CPD certificate', individual: '✓', growing: '✓', established: '✓' },
  { label: 'Team progress dashboard', individual: null, growing: '✓', established: '✓' },
  { label: 'Organisation-wide certificates', individual: null, growing: '✓', established: '✓' },
  { label: 'Bespoke reporting', individual: null, growing: null, established: '✓' },
  { label: 'Dedicated account support', individual: null, growing: null, established: '✓' },
  { label: 'Priority support', individual: null, growing: '✓', established: '✓' },
];
export default function PricingPage() {
  return (
    <>
      <nav style={{ borderBottom: '1px solid var(--gray-border)', background: 'var(--white)', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'none' }}>
          The Inclusion Edit <span style={{ fontWeight: 400, color: 'var(--sage-dark)' }}>Impact Platform</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/sign-in" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--charcoal)', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/sign-up" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.78rem', color: 'var(--white)', background: 'var(--sage-dark)', padding: '0.4rem 1rem', borderRadius: '8px', textDecoration: 'none' }}>Join now</Link>
        </div>
      </nav>
      <main style={{ background: 'var(--sage-xlight)', minHeight: '100vh' }}>
        <section style={{ padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--sage-dark)', background: 'var(--white)', border: '1px solid var(--sage-light)', padding: '0.3rem 0.875rem', borderRadius: '999px', marginBottom: '1.25rem' }}>Membership</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--charcoal)', marginBottom: '1rem', lineHeight: 1.15 }}>Choose your membership</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--gray-soft)', maxWidth: '520px', margin: '0 auto' }}>Annual membership. No per-seat charges. Cancel any time.</p>
        </section>
        <section style={{ padding: '1.5rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {TIERS.map((t) => (
                <div key={t.tier} style={{ background: 'var(--white)', borderRadius: '20px', padding: '2.25rem', border: t.highlight ? '2px solid var(--sage)' : '1.5px solid var(--gray-border)', boxShadow: t.highlight ? '0 8px 40px rgba(92,131,96,0.18)' : '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {t.badge && (
                    <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'var(--sage-dark)', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.3rem 1rem', borderRadius: '0 0 8px 8px', whiteSpace: 'nowrap' }}>{t.badge}</div>
                  )}
                  <div style={{ flex: 1, marginTop: t.badge ? '0.75rem' : 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sage-dark)', marginBottom: '0.35rem' }}>{t.tier}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray-soft)', marginBottom: '0.875rem' }}>{t.size}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.875rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.25rem', color: 'var(--charcoal)' }}>{t.price}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-soft)' }}>{t.period}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--gray-soft)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{t.desc}</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {t.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                          <span style={{ color: 'var(--sage)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={t.ctaHref} style={{ display: 'block', textAlign: 'center', padding: '0.75rem 1.5rem', borderRadius: '10px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', background: t.highlight ? 'var(--sage-dark)' : 'transparent', color: t.highlight ? 'var(--white)' : 'var(--sage-dark)', border: t.highlight ? 'none' : '1.5px solid var(--sage-dark)' }}>{t.cta}</Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--gray-soft)' }}>
              For organisations with over 2,000 employees: <Link href="mailto:info@theinclusionedit.com" style={{ color: 'var(--sage-dark)', fontWeight: 600, textDecoration: 'underline' }}>contact us for a custom quote</Link>.
            </div>
          </div>
        </section>
        <section style={{ padding: '2rem 1.5rem 3rem', background: 'var(--white)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--charcoal)', textAlign: 'center', marginBottom: '2.5rem' }}>Compare memberships</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-soft)', borderBottom: '2px solid var(--gray-border)', width: '35%' }}></th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sage-dark)', borderBottom: '2px solid var(--gray-border)' }}>Individual</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sage-dark)', borderBottom: '2px solid var(--sage)', background: 'rgba(42,107,58,0.04)' }}>Growing Teams</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sage-dark)', borderBottom: '2px solid var(--gray-border)' }}>Established Orgs</th>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--gray-border)' }}></td>
                    <td style={{ textAlign: 'center', padding: '0.5rem 1rem', borderBottom: '1px solid var(--gray-border)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--charcoal)' }}>£249<span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.78rem', color: 'var(--gray-soft)' }}>/yr</span></td>
                    <td style={{ textAlign: 'center', padding: '0.5rem 1rem', borderBottom: '1px solid var(--gray-border)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--charcoal)', background: 'rgba(42,107,58,0.04)' }}>£2,400<span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.78rem', color: 'var(--gray-soft)' }}>/yr</span></td>
                    <td style={{ textAlign: 'center', padding: '0.5rem 1rem', borderBottom: '1px solid var(--gray-border)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--charcoal)' }}>£4,800<span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.78rem', color: 'var(--gray-soft)' }}>/yr</span></td>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>
                      <td style={{ padding: '0.875rem 1rem', color: 'var(--charcoal)', fontWeight: 500 }}>{row.label}</td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 1rem', color: row.individual === '✓' ? 'var(--sage)' : 'var(--charcoal)', fontWeight: row.individual === '✓' ? 700 : 400 }}>{row.individual ?? <span style={{ color: 'var(--gray-border)', fontSize: '1.2rem' }}>—</span>}</td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 1rem', color: row.growing === '✓' ? 'var(--sage)' : 'var(--charcoal)', fontWeight: row.growing === '✓' ? 700 : 400, background: 'rgba(42,107,58,0.04)' }}>{row.growing ?? <span style={{ color: 'var(--gray-border)', fontSize: '1.2rem' }}>—</span>}</td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 1rem', color: row.established === '✓' ? 'var(--sage)' : 'var(--charcoal)', fontWeight: row.established === '✓' ? 700 : 400 }}>{row.established ?? <span style={{ color: 'var(--gray-border)', fontSize: '1.2rem' }}>—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section style={{ padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--sage-xlight)' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--charcoal)', marginBottom: '1rem' }}>Want to see the platform first?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray-soft)', lineHeight: 1.7, marginBottom: '2rem' }}>Book a short call and we can walk you through the platform, answer your questions, and help you find the right membership for your organisation.</p>
            <button disabled style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--white)', background: '#1e3c23', border: 'none', padding: '0.875rem 2rem', borderRadius: '10px', cursor: 'not-allowed', opacity: 0.7 }}>Book a call — coming soon</button>
          </div>
        </section>
      </main>
      <footer style={{ borderTop: '1px solid var(--gray-border)', padding: '2rem 1.5rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>The Inclusion Edit</span>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray-soft)', display: 'flex', gap: '1.5rem' }}>
            <span>© {new Date().getFullYear()} The Inclusion Edit</span>
            <Link href="/privacy" style={{ color: 'var(--gray-soft)', textDecoration: 'none' }}>Privacy</Link>
          </div>
        </div>
      </footer>
      <style>{'.pricing-grid { } @media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr !important; } }'}</style>
    </>
  );
}
