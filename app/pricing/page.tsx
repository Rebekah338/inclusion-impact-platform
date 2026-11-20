'use client';

import Link from 'next/link';
import { bookingLink } from '@/lib/booking';
import SiteNav from '@/components/SiteNav';
import HeroSideCard from "@/components/HeroSideCard";
import Footer from '../components/Footer';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const individualFeatures = [
  { label: "Named user accounts", individual: "1", plus: "1", expert: "1" },
  { label: "Full resource library", individual: true, plus: true, expert: true },
  { label: "All learning modules (3 pathways)", individual: true, plus: true, expert: true },
  { label: "Templates and guides", individual: true, plus: true, expert: true },
  { label: "Progress tracking", individual: true, plus: true, expert: true },
  { label: "The Inclusion Editors community", individual: true, plus: true, expert: true },
  { label: "Inclusion AI tools", individual: false, plus: true, expert: true },
  { label: "Full inclusion health check and action plan", individual: false, plus: true, expert: true },
  { label: "Advanced resources", individual: false, plus: true, expert: true },
  { label: "Guaranteed monthly 1:1 with Rebekah", individual: false, plus: false, expert: "12 per year" },
  { label: "The same person all year: continuity from start to finish", individual: false, plus: false, expert: true },
  { label: "No booking required: your session is secured for the year", individual: false, plus: false, expert: true },
  { label: "Human or AI support", individual: "Self-paced", plus: "AI-assisted", expert: "AI + 1:1 with Rebekah" },
];

const orgFeatures = [
  { label: "Full seats included", small: "5", growing: "10", established: "25", enterprise: "50 or more" },
  { label: "Every seat has Practitioner Plus access (AI tools, health check, advanced resources)", small: true, growing: true, established: true, enterprise: true },
  { label: "Full resource library", small: true, growing: true, established: true, enterprise: true },
  { label: "All learning modules (3 pathways)", small: true, growing: true, established: true, enterprise: true },
  { label: "Templates, guides and progress tracking", small: true, growing: true, established: true, enterprise: true },
  { label: "The Inclusion Editors community", small: true, growing: true, established: true, enterprise: true },
  { label: "Inclusion AI tools", small: true, growing: true, established: true, enterprise: true },
  { label: "Full inclusion health check and action plan", small: true, growing: true, established: true, enterprise: true },
  { label: "Advanced resources", small: true, growing: true, established: true, enterprise: true },
  { label: "Office hours with an inclusion expert", small: true, growing: true, established: true, enterprise: true },
  { label: "New starter access: onboarding module", small: true, growing: true, established: true, enterprise: true },
  { label: "New starters included at no extra charge", small: "Up to 25 a year", growing: "Up to 50 a year", established: "Up to 200 a year", enterprise: "Unlimited" },
  { label: "Completion reporting and downloadable certificates", small: true, growing: true, established: true, enterprise: true },
  { label: "Add full seats at any time", small: "£350 a seat a year", growing: "£295 a seat a year", established: "£220 a seat a year", enterprise: "By agreement" },
];

/* ─── Tick / Cross / Text cell ─────────────────────────────────────────── */

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  const base: React.CSSProperties = {
    padding: "0.75rem 1rem",
    textAlign: "center",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    color: "var(--ink)",
    borderBottom: "1px solid var(--line)",
    background: highlight ? "rgba(74,99,71,0.04)" : "transparent",
    verticalAlign: "middle",
  };

  if (value === true) {
    return <td style={base}><span aria-hidden="true" style={{ color: "var(--evergreen)", fontWeight: 700, fontSize: "1rem" }}>&#10003;</span><span className="a11y-sr">Included</span></td>;
  }
  if (value === false) {
    return <td style={base}><span aria-hidden="true" style={{ color: "var(--slate)", opacity: 0.45, fontSize: "0.95rem" }}>&#10005;</span><span className="a11y-sr">Not included</span></td>;
  }
  return <td style={{ ...base, color: "var(--slate)", lineHeight: 1.5 }}>{value as string}</td>;
}

/* ─── Phone layout: one card per membership ───────────────────────────── */

type Tier = {
  key: string; name: string; sub?: string; price: string; badge?: string; gold?: boolean; recommended?: boolean;
  href: string; cta: string; note?: string; extra?: string; saving?: string;
};

const individualTiers: Tier[] = [
  { key: "individual", name: "Individual", price: "£345", extra: "or £34 a month", href: "/early-access?tier=individual#join", cta: "Get Early Access" },
  { key: "plus", name: "Practitioner Plus", price: "£495", extra: "or £49 a month", badge: "Recommended", recommended: true, href: "/early-access?tier=practitioner-plus#join", cta: "Get Early Access", note: "No inclusion budget? You may not need one. Most organisations fund this from learning and development or professional development budgets, because it builds your skills. We can send a quote or invoice your organisation directly." },
  { key: "expert", name: "The Expert Track", price: "£1,800", badge: "Limited places", gold: true, href: "/early-access?tier=expert-track#join", cta: "Get Early Access", note: "Places are limited and released quarterly." },
];

const orgTiers: Tier[] = [
  { key: "small", name: "Small Teams", sub: "5 full seats", price: "£1,750", extra: "£350 a seat", saving: "£725 less than 5 Practitioner Plus memberships", href: "/early-access?tier=small-teams#join", cta: "Get Early Access" },
  { key: "growing", name: "Growing Teams", sub: "10 full seats", price: "£2,950", extra: "£295 a seat", saving: "£2,000 less than 10 Practitioner Plus memberships", recommended: true, href: "/early-access?tier=growing-teams#join", cta: "Get Early Access" },
  { key: "established", name: "Established Teams", sub: "25 full seats", price: "£5,500", extra: "£220 a seat", saving: "£6,875 less than 25 Practitioner Plus memberships", href: "/early-access?tier=established#join", cta: "Get Early Access" },
];

function TierCards({ tiers, features }: { tiers: Tier[]; features: Array<{ label: string } & Record<string, string | boolean>> }) {
  return (
    <div className="pricing-cards" style={{ display: "none", flexDirection: "column", gap: "1.25rem" }}>
      {tiers.map((t) => {
        const included = features.filter((f) => f[t.key] !== false);
        const accent = t.gold ? "#C9A84C" : "var(--evergreen)";
        return (
          <div key={t.key} style={{ position: "relative", background: t.recommended ? "rgba(74,99,71,0.04)" : "var(--white)", borderRadius: "18px", border: t.recommended ? "2px solid var(--evergreen)" : "1.5px solid #c8d9cb", boxShadow: "0 8px 36px rgba(26,50,32,0.10)", overflow: "hidden" }}>
            {(t.recommended || t.gold) && <div aria-hidden="true" style={{ height: "4px", background: accent }} />}
            <div style={{ padding: "1.5rem 1.4rem 1.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: t.gold ? "#7A5200" : "var(--evergreen)", margin: 0 }}>{t.name}</h3>
                {t.badge && (
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "999px", padding: "0.25rem 0.65rem", color: t.gold ? "#7A5200" : "var(--white)", background: t.gold ? "rgba(201,168,76,0.15)" : "var(--evergreen)" }}>{t.badge}</span>
                )}
              </div>
              {t.sub && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: "0 0 0.4rem" }}>{t.sub}</p>}
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", color: "var(--forest)", margin: "0 0 1.1rem", lineHeight: 1 }}>
                {t.price} <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.9rem", color: "var(--slate)" }}>/year</span>
              </p>
              {t.extra && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: "-0.6rem 0 1.1rem" }}>{t.extra}</p>}
              {t.saving && <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", margin: "-0.8rem 0 1.1rem" }}>{t.saving}</p>}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.4rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {included.map((f) => (
                  <li key={f.label} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.5 }}>
                    <span aria-hidden="true" style={{ color: "var(--evergreen)", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                    <span>{f.label}{typeof f[t.key] === "string" ? <span style={{ color: "var(--slate)" }}>: {f[t.key] as string}</span> : null}</span>
                  </li>
                ))}
              </ul>
              <Link href={t.href} style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.875rem 1rem", borderRadius: "8px", textDecoration: "none", ...(t.recommended ? { background: "var(--evergreen)", color: "var(--white)" } : t.gold ? { border: "1.5px solid #C9A84C", color: "#7A5200" } : { border: "2px solid var(--evergreen)", color: "var(--evergreen)" }) }}>
                {t.cta}<span className="sr-only">: {t.name}</span>
              </Link>
              {t.note && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: "0.7rem 0 0", lineHeight: 1.5, textAlign: "center" }}>{t.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const PRICING_CSS = `
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  @media (max-width: 760px) {
    .pricing-table { display: none !important; }
    .pricing-cards { display: flex !important; }
  }
`;

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" style={{ background: "var(--white)", minHeight: "100vh" }}>
      <style>{PRICING_CSS}</style>

      {/* PAGE HEADER */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "440px", display: "flex", alignItems: "center" }}>
        {/* Photo */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url(/pricing-team.jpg)", backgroundSize: "cover", backgroundPosition: "center 30%", backgroundRepeat: "no-repeat" }} />
        {/* Forest overlay */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)" }} />
        {/* Content wrapper */}
        <div style={{ position: "relative", width: "100%", padding: "2.25rem 2rem" }}>
        {/* Subtle top-edge gloss line */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
            <HeroSideCard kind="cta" eyebrow="Need sign off?" title="Give your approver everything in one page." text="The seat packs, what every seat includes and what it costs, ready to forward to whoever approves the spend." href="/downloads/impact-platform-organisation-summary.pdf" label="Download the Summary (PDF)" />
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
            Membership
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, color: "var(--white)", marginBottom: "1.25rem", maxWidth: "680px" }}>
            Find the right level of support for where you are.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", maxWidth: "680px" }}>
            Whether you're largely working this out on your own, or ready to bring your whole organisation with you, there's a membership built for exactly where you are.
          </p>
          <Link href="/early-access#join" style={{ display: "inline-block", lineHeight: 1.4, marginTop: "1.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Join Early Access</Link>
        </div>
        </div>
      </section>

      {/* INDIVIDUAL TABLE */}
      <section id="individual" style={{ padding: "4rem 1.5rem 3rem", background: "var(--mist)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--sage-dark)", marginBottom: "0.5rem" }}>
              For the person carrying this alone
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--forest)", marginBottom: "0.625rem" }}>
              Individual memberships
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", margin: 0 }}>
              No sign-off needed, no waiting on anyone else. Join the early access list and these memberships are yours as soon as the platform goes live. Your price then stays the same for your first two renewals. No VAT is added.
            </p>
          </div>

          <div className="pricing-table" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as unknown as undefined, borderRadius: "18px", boxShadow: "0 8px 36px rgba(26,50,32,0.13)", border: "1.5px solid #c8d9cb", background: "var(--white)" }}>
            <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" as const }}>
              <thead>
                <tr>
                  <th style={{ width: "34%", padding: "1.25rem 1.25rem 1rem", textAlign: "left" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--slate)", borderBottom: "2px solid var(--line)", background: "var(--white)" }}>
                    What you get
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--line)", background: "var(--white)", verticalAlign: "top" as const }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--evergreen)", margin: "0 0 0.375rem" }}>Individual</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1 }}>£345 <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.8rem", color: "var(--slate)" }}>/year</span></p>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.75rem", color: "var(--slate)", margin: "-0.2rem 0 0.5rem" }}>or £34 a month</p>
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--evergreen)", background: "rgba(74,99,71,0.04)", verticalAlign: "top" as const, position: "relative" as const }}>
                    <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "var(--evergreen)", borderRadius: "16px 16px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--evergreen)", margin: "0 0 0.375rem" }}>Practitioner Plus</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1 }}>£495 <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.8rem", color: "var(--slate)" }}>/year</span></p>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.75rem", color: "var(--slate)", margin: "-0.2rem 0 0.5rem" }}>or £49 a month</p>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--white)", background: "var(--evergreen)", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>Recommended</span>
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid #C9A84C", background: "var(--white)", verticalAlign: "top" as const, position: "relative" as const }}>
                    <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "#C9A84C", borderRadius: "16px 16px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#7A5200", margin: "0 0 0.375rem" }}>The Expert Track</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1 }}>£1,800 <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.8rem", color: "var(--slate)" }}>/year</span></p>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#7A5200", background: "rgba(201,168,76,0.15)", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>Limited places</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {individualFeatures.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "0.75rem 1.25rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink)", borderBottom: "1px solid var(--line)", lineHeight: 1.5 }}>
                      {row.label}
                    </td>
                    <Cell value={row.individual} />
                    <Cell value={row.plus} highlight />
                    <Cell value={row.expert} />
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "1.5rem 1.25rem" }} />
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "var(--white)" }}>
                    <Link href="/early-access?tier=individual#join" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--evergreen)", color: "var(--evergreen)", whiteSpace: "nowrap" as const }}>
                      Get Early Access
                    </Link>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "rgba(74,99,71,0.04)" }}>
                    <Link href="/early-access?tier=practitioner-plus#join" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", background: "var(--evergreen)", color: "var(--white)", whiteSpace: "nowrap" as const }}>
                      Get Early Access
                    </Link>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", marginTop: "0.625rem", marginBottom: 0, lineHeight: 1.5 }}>
                      No inclusion budget? You may not need one. Most organisations fund this from learning and development or professional development budgets, because it builds your skills. We can send a quote or invoice your organisation directly.
                    </p>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "var(--white)" }}>
                    <Link href="/early-access?tier=expert-track#join" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid #C9A84C", color: "#7A5200", whiteSpace: "nowrap" as const }}>
                      Get Early Access
                    </Link>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", marginTop: "0.625rem", marginBottom: 0, lineHeight: 1.5 }}>
                      Places are limited and released quarterly.
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <TierCards tiers={individualTiers} features={individualFeatures} />
        </div>
      </section>

      {/* SECTION DIVIDER */}
      {/* SOCIAL PROOF STRIP */}
      <section style={{ background: "var(--mist)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>

            {/* Quote: Tiona Knight */}
            <div style={{ background: "linear-gradient(160deg, #2C4A31 0%, #1A3220 100%)", borderRadius: "14px", padding: "1.5rem", border: "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1, color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>&ldquo;&rdquo;</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.88)", margin: "0 0 1.25rem", fontStyle: "italic" }}>
                &ldquo;Thanks to The Inclusion Edit’s EDI Hub, I’m now navigating EDI with more intention, bandwidth and knowledge. Having access to their library of content has saved me a tremendous amount of time.&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", margin: 0 }}>Tiona Knight</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "rgba(255,255,255,0.55)", margin: "0.2rem 0 0" }}>EDI Lead, Mentivity</p>
            </div>

            {/* Quote: Adlyn Walton */}
            <div style={{ background: "linear-gradient(160deg, #2C4A31 0%, #1A3220 100%)", borderRadius: "14px", padding: "1.5rem", border: "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1, color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>&ldquo;&rdquo;</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.88)", margin: "0 0 1.25rem", fontStyle: "italic" }}>
                &ldquo;I personally found the online materials on The Inclusion Edit’s website helpful when creating ArtsEd resources and training programmes for both students and staff.&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", margin: 0 }}>Adlyn Walton</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "rgba(255,255,255,0.55)", margin: "0.2rem 0 0" }}>Diversity, Equity, Inclusion and Belonging Partner, ArtsEd</p>
            </div>

            {/* Stat: 93% survey */}
            <div style={{ background: "linear-gradient(160deg, #2C4A31 0%, #1A3220 100%)", borderRadius: "14px", padding: "1.5rem", border: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "3rem", lineHeight: 1, color: "var(--white)", marginBottom: "0.75rem" }}>93%</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(255,255,255,0.85)", margin: "0 0 1rem", maxWidth: "200px" }}>
                of those who have used our resources said they were &ldquo;very helpful in developing their inclusion knowledge.&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Survey of 60+ users, February 2026</p>
            </div>

          </div>
        </div>
      </section>

      <div style={{ padding: "1rem 1.5rem 0", background: "var(--mist)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", borderTop: "1px solid var(--line)" }} />
      </div>

      {/* ORG TABLE */}
      <section id="organisation" style={{ padding: "4rem 1.5rem 5rem", background: "var(--mist)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--sage-dark)", marginBottom: "0.5rem" }}>
              For bringing your whole organisation with you
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--forest)", marginBottom: "0.625rem" }}>
              Organisation memberships
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", margin: "0 0 1.5rem" }}>
              Full seats for the people doing the work, and onboarding for your new starters every year. Your price then stays the same for your first two renewals.
            </p>
            <div style={{ background: "var(--white)", borderRadius: "18px", border: "1.5px solid #c8d9cb", boxShadow: "0 4px 20px rgba(26,50,32,0.08)", padding: "1.5rem 1.75rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1.3 }}>Choose by the people who will use it, not the size of your organisation.</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>Seats are for the people leading and doing the inclusion work: your inclusion lead, your HR and people team, and the managers who shape everyday culture. Not sure how many you need? <a href="#pack-guide" style={{ color: "var(--evergreen)", fontWeight: 700 }}>See which pack fits</a>.</p>
            </div>
          </div>

          <div className="pricing-table" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as unknown as undefined, borderRadius: "18px", boxShadow: "0 8px 36px rgba(26,50,32,0.13)", border: "1.5px solid #c8d9cb", background: "var(--white)" }}>
            <table style={{ width: "100%", minWidth: "760px", borderCollapse: "collapse" as const }}>
              <thead>
                <tr>
                  <th style={{ width: "31%", padding: "1.25rem 1.25rem 1rem", textAlign: "left" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--slate)", borderBottom: "2px solid var(--line)", background: "var(--white)" }}>
                    What you get
                  </th>
                  {orgTiers.map((t) => (
                    <th key={t.key} style={{ width: "23%", padding: "1.25rem 0.75rem 1rem", textAlign: "center" as const, borderBottom: t.recommended ? "2px solid var(--evergreen)" : "2px solid var(--line)", background: t.recommended ? "rgba(74,99,71,0.04)" : "var(--white)", verticalAlign: "top" as const, position: "relative" as const }}>
                      {t.recommended && <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "var(--evergreen)" }} />}
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--evergreen)", margin: "0 0 0.25rem" }}>{t.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>{t.sub}</p>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1 }}>{t.price} <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.8rem", color: "var(--slate)" }}>/year</span></p>
                      {t.extra && <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.75rem", color: "var(--slate)", margin: "-0.2rem 0 0.35rem" }}>{t.extra}</p>}
                      {t.saving && <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", color: "var(--evergreen)", margin: "0 0 0.5rem", lineHeight: 1.4 }}>{t.saving}</p>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orgFeatures.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "0.75rem 1.25rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink)", borderBottom: "1px solid var(--line)", lineHeight: 1.5 }}>
                      {row.label}
                    </td>
                    {orgTiers.map((t) => (
                      <Cell key={t.key} value={(row as Record<string, string | boolean>)[t.key]} highlight={t.recommended} />
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "1.5rem 1.25rem" }} />
                  {orgTiers.map((t) => (
                    <td key={t.key} style={{ padding: "1.5rem 0.75rem", textAlign: "center" as const, background: t.recommended ? "rgba(74,99,71,0.04)" : undefined }}>
                      <Link href={t.href} style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.1rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" as const, ...(t.recommended ? { background: "var(--evergreen)", color: "var(--white)" } : { border: "2px solid var(--evergreen)", color: "var(--evergreen)" }) }}>
                        {t.cta}<span className="sr-only">: {t.name}</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <TierCards tiers={orgTiers} features={orgFeatures} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.65, margin: "1.25rem 0 0" }}><strong style={{ color: "var(--forest)" }}>Full seat:</strong> full access for one named person. <strong style={{ color: "var(--forest)" }}>New starter:</strong> Inclusion Foundations, our onboarding module, for people joining your organisation. Prices are per year, and no VAT is added.</p>
          <div style={{ maxWidth: "760px", margin: "1.75rem auto 0", background: "var(--white)", borderRadius: "14px", border: "1.5px solid #c8d9cb", padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" as const }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", lineHeight: 1.6, margin: 0, flex: "1 1 360px" }}><strong style={{ color: "var(--forest)" }}>Need 50 or more seats?</strong> Talk to us about Enterprise: from £8,500 a year, with unlimited new starter onboarding, custom reporting and a dedicated contact.</p>
            <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.7rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--evergreen)", color: "var(--evergreen)", whiteSpace: "nowrap" as const }}>Talk to Us<span className="sr-only"> about Enterprise</span></Link>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", textAlign: "center" as const, margin: "1.75rem auto 0", maxWidth: "640px", lineHeight: 1.6 }}>Where the budget can come from: learning and development, people and culture, leadership development, onboarding or employee engagement. One membership covers your team’s development and your new starters’ onboarding, so it often replaces costs you already have.</p>
          {/* Seat guide */}
          <div id="pack-guide" style={{ scrollMarginTop: "6rem", maxWidth: "760px", margin: "2.5rem auto 0", background: "var(--white)", borderRadius: "18px", border: "1.5px solid #c8d9cb", boxShadow: "0 4px 20px rgba(26,50,32,0.08)", padding: "2rem 2rem 1.75rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>Which pack is right for you?</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.4vw, 1.45rem)", color: "var(--forest)", margin: "0 0 0.875rem", lineHeight: 1.25 }}>A guide based on your new starters each year.</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", lineHeight: 1.7, margin: "0 0 0.875rem" }}>The more of your people who work from the same tools, evidence and language, the more aligned your inclusion work becomes, and the more value your membership adds.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", lineHeight: 1.7, margin: "0 0 1.25rem" }}>Every pack also includes onboarding for your new starters each year. Not sure how many you have? Most UK organisations take on new starters equal to roughly 15% to 35% of their workforce each year. As a guide:</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink)" }}>
                <thead>
                  <tr>
                    {["Your organisation", "New starters a year", "A pack that often fits"].map((h) => (
                      <th key={h} scope="col" style={{ textAlign: "left" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--slate)", padding: "0.6rem 0.75rem", borderBottom: "2px solid var(--line)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Up to 70 people", "Up to about 25", "Small Teams"],
                    ["70 to 150 people", "About 10 to 50", "Growing Teams"],
                    ["150 to 600 people", "About 25 to 200", "Established Teams"],
                    ["600 people or more", "100 or more", "Enterprise (talk to us)"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid var(--line)" }}>{r[0]}</td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid var(--line)", color: "var(--slate)" }}>{r[1]}</td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid var(--line)", fontWeight: 700, color: "var(--evergreen)" }}>{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", lineHeight: 1.65, margin: "1.1rem 0 0" }}>You can add seats at any time at your pack&rsquo;s price per seat, or move up a pack at renewal. Only need one or two seats? Individual memberships may suit you better.</p>
          </div>

          {/* Approver panel */}
          <div style={{ marginTop: "3rem", background: "linear-gradient(160deg, #1A3220 0%, #1E3624 100%)", borderRadius: "18px", padding: "2.5rem 2.5rem 2.25rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
              For whoever is approving this
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--white)", marginBottom: "1rem", lineHeight: 1.2 }}>
              Your organisation already has someone carrying inclusion forward.
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.975rem", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", maxWidth: "680px", marginBottom: "1.75rem" }}>
              An organisation membership gives them, and everyone they work with, full access to evidence, practical tools, AI-powered support and expert-led sessions, at a price point that makes a retained expert resource possible for organisations that cannot yet afford a full-time EDI hire. You get visible, reportable progress and a consistent onboarding experience for your new starters. Most organisations fund this from existing learning, people or onboarding budgets, not a separate inclusion line. Every membership sits well below formal tender thresholds, and we can provide a quote, accept a purchase order or invoice you directly.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", maxWidth: "680px", marginBottom: "1.5rem" }}>
              Need sign-off? <a href="/downloads/impact-platform-organisation-summary.pdf" download style={{ color: "rgba(168,212,176,0.95)", textDecoration: "underline", fontWeight: 600 }}>Download a one-page summary</a> to forward to whoever approves the spend.
            </p>
            <a href={bookingLink("An organisation membership")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", background: "var(--white)", color: "var(--forest)", whiteSpace: "nowrap" as const }}>
              Book a Call to Discuss Your Organisation<span className="a11y-sr"> (opens in a new tab)</span>
            </a>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", margin: "0.85rem 0 0", lineHeight: 1.6 }}>A free 30 minute video call. Tell us what you are working on and we will suggest the right next step, with no obligation.</p>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div style={{ textAlign: "center", padding: "2rem 1.5rem 4rem", background: "var(--mist)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--slate)", margin: 0 }}>
          These are our launch prices. Join early access and your price stays the same for your first two renewals.
        </p>
      </div>

    </main>
    <Footer />
    </>
  );
}
