'use client';

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const individualFeatures = [
  { label: "Named user accounts", individual: "1", plus: "1", expert: "1" },
  { label: "Full resource library", individual: true, plus: true, expert: true },
  { label: "All learning modules (3 pathways)", individual: true, plus: true, expert: true },
  { label: "Templates and guides", individual: true, plus: true, expert: true },
  { label: "Progress tracking", individual: true, plus: true, expert: true },
  { label: "Inclusion AI tools", individual: false, plus: true, expert: true },
  { label: "Full inclusion health check and action plan", individual: false, plus: true, expert: true },
  { label: "Advanced resources", individual: false, plus: true, expert: true },
  { label: "Guaranteed monthly 1:1 with an inclusion expert", individual: false, plus: false, expert: "12 per year" },
  { label: "Same expert throughout: continuity across the full year", individual: false, plus: false, expert: true },
  { label: "No booking required: your session is secured for the year", individual: false, plus: false, expert: true },
  { label: "Human or AI support", individual: "Self-service only", plus: "AI-assisted", expert: "AI + 1:1 expert" },
];

const orgFeatures = [
  { label: "Full seats included", growing: "10", established: "25", enterprise: "By agreement" },
  { label: "Full resource library", growing: true, established: true, enterprise: true },
  { label: "All learning modules (3 pathways)", growing: true, established: true, enterprise: true },
  { label: "Templates, guides and progress tracking", growing: true, established: true, enterprise: true },
  { label: "Inclusion AI tools", growing: true, established: true, enterprise: true },
  { label: "Full inclusion health check and action plan", growing: true, established: true, enterprise: true },
  { label: "Advanced resources", growing: true, established: true, enterprise: true },
  { label: "Scheduled expert sessions (Get Support)", growing: true, established: true, enterprise: true },
  { label: "New starter access: onboarding module", growing: true, established: true, enterprise: true },
  { label: "New starters included at no extra charge", growing: "~22 per year", established: "~90 per year", enterprise: "Unlimited" },
  { label: "Completion reporting and downloadable certificates", growing: true, established: true, enterprise: true },
  { label: "Additional full seats available", growing: "Add-on", established: "Add-on", enterprise: "By agreement" },
  { label: "Custom entitlements", growing: false, established: false, enterprise: "Dedicated contact, custom reporting and more" },
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
    return <td style={base}><span style={{ color: "var(--evergreen)", fontWeight: 700, fontSize: "1rem" }}>&#10003;</span></td>;
  }
  if (value === false) {
    return <td style={base}><span style={{ color: "var(--line)", fontSize: "1.1rem" }}>&mdash;</span></td>;
  }
  return <td style={{ ...base, color: "var(--slate)", lineHeight: 1.5 }}>{value as string}</td>;
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

      {/* PAGE HEADER */}
      <section style={{ background: "linear-gradient(160deg, #1A3220 0%, #1E3624 100%)", padding: "3rem 2rem 2.5rem", position: "relative", overflow: "hidden" }}>
        {/* Radial glow */}
        <div aria-hidden="true" style={{ position: "absolute", top: "-60px", left: "-80px", width: "520px", height: "360px", background: "radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 45%, transparent 70%)", pointerEvents: "none" }} />
        {/* Subtle top-edge gloss line */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
            Membership
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, color: "var(--white)", marginBottom: "1.25rem", maxWidth: "680px" }}>
            Find the right level of support for where you are.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", maxWidth: "560px" }}>
            Whether you are working this out largely on your own, or you are ready to bring your whole organisation with you, there is a membership built for exactly where you are standing.
          </p>
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
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", maxWidth: "520px" }}>
              No sign-off needed, no waiting on anyone else. These memberships are yours to start today.
            </p>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as unknown as undefined, borderRadius: "18px", boxShadow: "0 8px 36px rgba(26,50,32,0.13)", border: "1.5px solid #c8d9cb", background: "var(--white)" }}>
            <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" as const }}>
              <thead>
                <tr>
                  <th style={{ width: "34%", padding: "1.25rem 1.25rem 1rem", textAlign: "left" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--slate)", borderBottom: "2px solid var(--line)", background: "var(--white)" }}>
                    What you get
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--line)", background: "var(--white)", verticalAlign: "top" as const }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--sage-mid)", margin: "0 0 0.375rem" }}>Individual</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>&#163;249</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: 0 }}>per year</p>
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--evergreen)", background: "rgba(74,99,71,0.04)", verticalAlign: "top" as const, position: "relative" as const }}>
                    <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "var(--evergreen)", borderRadius: "16px 16px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--evergreen)", margin: "0 0 0.375rem" }}>Practitioner Plus</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>&#163;449</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>per year</p>
                    <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--white)", background: "var(--evergreen)", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>Most popular</span>
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid #C9A84C", background: "var(--white)", verticalAlign: "top" as const, position: "relative" as const }}>
                    <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "#C9A84C", borderRadius: "16px 16px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#7A5200", margin: "0 0 0.375rem" }}>The Expert Track</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>&#163;1,200</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>per year</p>
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
                    <Link href="/sign-up?tier=individual" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--evergreen)", color: "var(--evergreen)", whiteSpace: "nowrap" as const }}>
                      Start Your Membership
                    </Link>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "rgba(74,99,71,0.04)" }}>
                    <Link href="/sign-up?tier=practitioner-plus" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", background: "var(--evergreen)", color: "var(--white)", whiteSpace: "nowrap" as const }}>
                      Upgrade to Practitioner Plus
                    </Link>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", marginTop: "0.625rem", marginBottom: 0, lineHeight: 1.5 }}>
                      Worth asking your employer: qualifies as professional development spend.
                    </p>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "var(--white)" }}>
                    <Link href="/sign-up?tier=expert-track" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid #C9A84C", color: "#7A5200", whiteSpace: "nowrap" as const }}>
                      Apply for the Expert Track
                    </Link>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", marginTop: "0.625rem", marginBottom: 0, lineHeight: 1.5 }}>
                      Places are limited and released quarterly.
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
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
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", maxWidth: "560px" }}>
              One licence, a set of full seats for the people doing the work, and new starter onboarding included for everyone you hire.
            </p>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as unknown as undefined, borderRadius: "18px", boxShadow: "0 8px 36px rgba(26,50,32,0.13)", border: "1.5px solid #c8d9cb", background: "var(--white)" }}>
            <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse" as const }}>
              <thead>
                <tr>
                  <th style={{ width: "32%", padding: "1.25rem 1.25rem 1rem", textAlign: "left" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--slate)", borderBottom: "2px solid var(--line)", background: "var(--white)" }}>
                    What you get
                  </th>
                  <th style={{ width: "23%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--evergreen)", background: "rgba(74,99,71,0.04)", verticalAlign: "top" as const, position: "relative" as const }}>
                    <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: "3px", background: "var(--evergreen)", borderRadius: "16px 16px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--evergreen)", margin: "0 0 0.25rem" }}>Growing Teams</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>50 to 250 employees</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>&#163;2,400</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: 0 }}>per year</p>
                  </th>
                  <th style={{ width: "23%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--line)", background: "var(--white)", verticalAlign: "top" as const }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--sage-mid)", margin: "0 0 0.25rem" }}>Established Orgs</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>250 to 1,000 employees</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>&#163;4,800</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: 0 }}>per year</p>
                  </th>
                  <th style={{ width: "22%", padding: "1.25rem 1rem 1rem", textAlign: "center" as const, borderBottom: "2px solid var(--line)", background: "var(--white)", verticalAlign: "top" as const }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--sage-mid)", margin: "0 0 0.25rem" }}>Enterprise</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--slate)", margin: "0 0 0.375rem" }}>1,000 or more employees</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.125rem", lineHeight: 1 }}>From &#163;7,500</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: 0 }}>per year, by custom quote</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orgFeatures.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "0.75rem 1.25rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink)", borderBottom: "1px solid var(--line)", lineHeight: 1.5 }}>
                      {row.label}
                    </td>
                    <Cell value={row.growing} highlight />
                    <Cell value={row.established} />
                    <Cell value={row.enterprise} />
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "1.5rem 1.25rem" }} />
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const, background: "rgba(74,99,71,0.04)" }}>
                    <Link href="/sign-up?tier=growing-teams" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", background: "var(--evergreen)", color: "var(--white)", whiteSpace: "nowrap" as const }}>
                      Start Your Organisation Membership
                    </Link>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const }}>
                    <Link href="/sign-up?tier=established" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--evergreen)", color: "var(--evergreen)", whiteSpace: "nowrap" as const }}>
                      Start Your Organisation Membership
                    </Link>
                  </td>
                  <td style={{ padding: "1.5rem 1rem", textAlign: "center" as const }}>
                    <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--evergreen)", color: "var(--evergreen)", whiteSpace: "nowrap" as const }}>
                      Talk to Us
                    </Link>
                  </td>
                </tr>
              </tfoot>
            </table>
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
              An organisation membership gives them, and everyone they work with, full access to evidence, practical tools, AI-powered support and expert-led sessions, at a price point that makes a retained expert resource possible for organisations that cannot yet afford a full-time EDI hire. No per seat charges as your team grows. You get visible, reportable progress and a consistent onboarding experience for every new starter, with no risk of outgrowing it.
            </p>
            <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", background: "var(--white)", color: "var(--forest)", whiteSpace: "nowrap" as const }}>
              Book a Call to Discuss Your Organisation
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div style={{ textAlign: "center", padding: "2rem 1.5rem 4rem", background: "var(--mist)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--slate)", margin: 0 }}>
          Every price is annual. No per seat charges on organisation memberships. Cancel any time.
        </p>
      </div>

    </main>
    </>
  );
}
