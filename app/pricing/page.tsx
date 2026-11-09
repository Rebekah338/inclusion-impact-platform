'use client';

import { useState } from 'react';
import Link from 'next/link';

const SIZE_OPTIONS = [
  { label: "1 to 49 employees", value: "small" },
  { label: "50 to 250 employees", value: "growing" },
  { label: "250 to 1,000 employees", value: "established" },
  { label: "1,000-plus employees", value: "enterprise" },
];

export default function PricingPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <main style={{ background: "var(--white)", minHeight: "100vh" }}>

      {/* PAGE HEADER */}
      <section style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--evergreen)", background: "rgba(74,99,71,0.08)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
            Membership
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", lineHeight: 1.1, color: "var(--forest)", marginBottom: "1.25rem" }}>
            Find the right level of support for where you are.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.8, color: "var(--slate)", maxWidth: "600px", margin: "0 auto" }}>
            Whether you're working this out largely on your own, or you're ready to bring your whole organisation with you, there's a membership built for exactly where you're standing.
          </p>
        </div>
      </section>

      {/* PATH ONE: JOINING AS YOURSELF */}
      <section style={{ padding: "5rem 2rem", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--forest)", marginBottom: "0.75rem" }}>
              For the person carrying this alone.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", maxWidth: "560px" }}>
              You don't need to wait for anyone's permission to start. These two memberships are yours: no sign off, no waiting on budget approval from someone else.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: "760px" }}>

            {/* Individual */}
            <div style={{ background: "var(--white)", border: "1.5px solid var(--line)", borderRadius: "18px", padding: "2rem", boxShadow: "0 1px 3px rgba(26,50,32,0.08)" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-mid)", margin: "0 0 0.5rem" }}>Individual</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--forest)", margin: 0, lineHeight: 1 }}>£249
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", color: "var(--slate)" }}> a year</span>
                </p>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
                Everything you need to stop guessing.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--slate)", marginBottom: "1.75rem" }}>
                Full access to the resource library, every learning module across all three pathways, templates and guides you can use the same day, and a way to track your own progress. Built for the person doing this work without a team around her yet.
              </p>
              <Link href="/sign-up?tier=individual" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.875rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
                Start Your Membership
              </Link>
            </div>

            {/* Practitioner Plus */}
            <div style={{ background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", border: "2px solid var(--evergreen)", borderRadius: "18px", padding: "2rem", boxShadow: "0 4px 20px rgba(26,50,32,0.10)", position: "relative" }}>
              <span style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--white)", background: "var(--evergreen)", padding: "0.3rem 1rem", borderRadius: "0 0 8px 8px" }}>Most popular</span>
              <div style={{ marginBottom: "1.5rem", marginTop: "0.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--evergreen)", margin: "0 0 0.5rem" }}>Practitioner Plus</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--forest)", margin: 0, lineHeight: 1 }}>£449
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", color: "var(--slate)" }}> a year</span>
                </p>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
                For when you already know what to do, you just need more hours in the day.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--slate)", marginBottom: "1.75rem" }}>
                Everything in Individual, plus Inclusion AI tools and a full health check and action plan. The work that used to take you an evening now takes you an hour, and you walk into every conversation with evidence already behind you.
              </p>
              <Link href="/sign-up?tier=practitioner-plus" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.875rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
                Upgrade to Practitioner Plus
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* PATH TWO: JOINING AS AN ORGANISATION */}
      <section style={{ padding: "5rem 2rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--forest)", marginBottom: "0.75rem" }}>
              For bringing your whole organisation with you.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)" }}>
              Tell us how many people are at your organisation, and we'll show you the right membership and price. One licence, a set of full seats for the people doing the work, and genuinely unlimited onboarding for every new starter you ever hire.
            </p>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)", marginBottom: "1rem" }}>
              How many people work at your organisation?
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSize(opt.value)}
                  style={{
                    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem",
                    padding: "0.6rem 1.25rem", borderRadius: "999px", cursor: "pointer",
                    border: selectedSize === opt.value ? "2px solid var(--evergreen)" : "1.5px solid var(--line)",
                    background: selectedSize === opt.value ? "rgba(74,99,71,0.08)" : "var(--white)",
                    color: selectedSize === opt.value ? "var(--evergreen)" : "var(--slate)",
                    transition: "all 0.15s",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Band reveals */}
          {selectedSize === "small" && (
            <div style={{ background: "var(--white)", border: "1.5px solid var(--line)", borderRadius: "18px", padding: "2rem", maxWidth: "580px", boxShadow: "0 1px 3px rgba(26,50,32,0.08)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--slate)", marginBottom: "1.5rem" }}>
                For organisations under 50 people, our Individual and Practitioner Plus memberships are the right fit. Each person joins with their own account.
              </p>
              <Link href="#path-one" onClick={() => document.getElementById('path-one')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", textDecoration: "none" }}>
                See individual memberships above ↑
              </Link>
            </div>
          )}

          {selectedSize === "growing" && (
            <div style={{ background: "var(--white)", border: "2px solid var(--evergreen)", borderRadius: "18px", padding: "2rem", maxWidth: "580px", boxShadow: "0 4px 20px rgba(26,50,32,0.10)" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-mid)", margin: "0 0 0.5rem" }}>Growing Teams</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--forest)", margin: 0, lineHeight: 1 }}>£2,400
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", color: "var(--slate)" }}> a year</span>
                </p>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
                Enough seats for the people doing the work, unlimited onboarding for everyone who joins.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--slate)", marginBottom: "1.75rem" }}>
                10 full seats for your champion and her wider HR or People team, covering everything in Practitioner Plus plus scheduled time with a real inclusion expert. Every new starter gets a consistent, guided onboarding, with no limit on how many and no extra charge as your team grows.
              </p>
              <Link href="/sign-up?tier=growing-teams" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.875rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
                Start Your Organisation Membership
              </Link>
            </div>
          )}

          {selectedSize === "established" && (
            <div style={{ background: "var(--white)", border: "2px solid var(--evergreen)", borderRadius: "18px", padding: "2rem", maxWidth: "580px", boxShadow: "0 4px 20px rgba(26,50,32,0.10)" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-mid)", margin: "0 0 0.5rem" }}>Established Orgs</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--forest)", margin: 0, lineHeight: 1 }}>£4,800
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", color: "var(--slate)" }}> a year</span>
                </p>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
                The same support, sized for a bigger team.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--slate)", marginBottom: "1.75rem" }}>
                25 full seats, the same unlimited onboarding for every new starter, and everything in Growing Teams. Need more full seats as you grow? They're available any time.
              </p>
              <Link href="/sign-up?tier=established-orgs" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.875rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
                Start Your Organisation Membership
              </Link>
            </div>
          )}

          {selectedSize === "enterprise" && (
            <div style={{ background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "18px", padding: "2rem", maxWidth: "580px", boxShadow: "0 6px 28px rgba(42,74,48,0.22)" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 0.5rem" }}>Enterprise</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--white)", margin: 0, lineHeight: 1 }}>From £7,500
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)" }}> a year</span>
                </p>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--white)", marginBottom: "0.75rem" }}>
                Built around your organisation, not a fixed band.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", marginBottom: "1.75rem" }}>
                Full seat count, pricing and entitlements agreed around your organisation's size and structure. Unlimited onboarding, as standard.
              </p>
              <Link href="/contact-us?enquiry=enterprise" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", background: "var(--white)", padding: "0.875rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
                Talk to Us
              </Link>
            </div>
          )}

          {/* Approver panel */}
          {(selectedSize === "growing" || selectedSize === "established" || selectedSize === "enterprise") && (
            <div style={{ marginTop: "2.5rem", maxWidth: "580px", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "18px", padding: "2rem 2.25rem", boxShadow: "0 6px 28px rgba(42,74,48,0.22)" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 0.75rem" }}>For the approver</p>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--white)", marginBottom: "0.875rem" }}>
                For whoever's approving this.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", marginBottom: "1.75rem" }}>
                Your organisation already has someone carrying inclusion forward. An organisation membership gives them, and everyone they work with, full access to evidence, practical tools, AI powered support and expert led sessions, at a fraction of the cost of a specialist DEI platform or a one off consultancy engagement, with no per seat charges as your team grows. You get visible, reportable progress and a consistent onboarding experience for every new starter, with no risk of outgrowing it.
              </p>
              <Link href="/contact-us?enquiry=organisation" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", background: "var(--white)", padding: "0.875rem 1.75rem", borderRadius: "8px", textDecoration: "none" }}>
                Book a Call to Discuss Your Organisation
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* FOOTER NOTE */}
      <section style={{ padding: "2rem", textAlign: "center", background: "var(--white)", borderTop: "1px solid var(--line)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: 0 }}>
          Every price is annual. No per seat charges on organisational memberships. Cancel any time.
        </p>
      </section>

    </main>
  );
}
