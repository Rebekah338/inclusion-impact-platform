"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchContent, CONTENT, FEATURED_CONTENT, TYPE_ICONS, TYPE_LABELS } from "@/lib/content";
import SiteNav from "@/components/SiteNav";

const PULSE_QUESTIONS = [
  { id: "role", question: "What best describes your role?", options: ["EDI / D&I Lead or Manager", "HR Professional", "People Manager", "Senior Leader / Executive", "Consultant or Trainer", "Other"] },
  { id: "orgSize", question: "How large is your organisation?", options: ["Just me / freelance", "2–50 people", "51–250 people", "251–1,000 people", "1,000+ people"] },
  { id: "experience", question: "How long have you been working in EDI?", options: ["I'm just starting out", "Less than 2 years", "2–5 years", "5–10 years", "10+ years"] },
  { id: "priority", question: "What's your biggest inclusion challenge right now?", options: ["Getting leadership buy-in", "Knowing where to start", "Building an evidence base", "Embedding inclusion in day-to-day work", "Improving recruitment and retention", "Understanding data and measuring impact"] },
  { id: "goal", question: "What do you most want to achieve?", options: ["Develop my own knowledge and skills", "Upskill my team or managers", "Build a strategy or action plan", "Make the business case for EDI", "Improve specific processes or policies"] },
];

const PULSE_RECOMMENDATIONS: Record<string, { module: string; id: string; reason: string }> = {
  "Getting leadership buy-in": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "This module gives you the evidence and language to make the case at board level." },
  "Knowing where to start": { module: "Building an EDI Strategy", id: "edi-strategy", reason: "Start here to build a clear, credible roadmap for your EDI work." },
  "Building an evidence base": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "Learn how to gather, present and use evidence that resonates with decision-makers." },
  "Embedding inclusion in day-to-day work": { module: "Psychological Safety", id: "psychological-safety", reason: "Creating the right conditions for inclusion starts with psychological safety." },
  "Improving recruitment and retention": { module: "Inclusive Recruitment", id: "inclusive-recruitment", reason: "End-to-end guidance on removing bias from hiring and keeping diverse talent." },
  "Understanding data and measuring impact": { module: "EDI Data & Workforce Monitoring", id: "edi-data", reason: "Learn to collect, analyse and act on EDI data ethically and effectively." },
};

const modulesByPathway = {
  "People & Culture": CONTENT.filter((c) => c.type === "module" && c.pathway === "People & Culture"),
  "Systems & Processes": CONTENT.filter((c) => c.type === "module" && c.pathway === "Systems & Processes"),
  "Leadership & Strategy": CONTENT.filter((c) => c.type === "module" && c.pathway === "Leadership & Strategy"),
};

const PATHWAY_INFO = [
  {
    key: "People & Culture",
    icon: "🤝",
    color: "var(--sage-dark)",
    bg: "var(--sage-xlight)",
    border: "var(--sage-light)",
    desc: "Psychological safety, belonging, wellbeing, and inclusive workplace culture.",
    count: modulesByPathway["People & Culture"].length,
    img: "/team-meeting.jpg",
  },
  {
    key: "Systems & Processes",
    icon: "⚙️",
    color: "#5B6E5F",
    bg: "#F0F4F1",
    border: "#C8D9CB",
    desc: "Recruitment, policy, data, accessibility, and the structures that shape inclusion.",
    count: modulesByPathway["Systems & Processes"].length,
    img: "/collaboration.jpg",
  },
  {
    key: "Leadership & Strategy",
    icon: "🎯",
    color: "#4A5E4E",
    bg: "#EEF3EF",
    border: "#BDD0C0",
    desc: "Strategy, governance, stakeholder engagement, and leading inclusion at scale.",
    count: modulesByPathway["Leadership & Strategy"].length,
    img: "/workshop.jpg",
  },
];

const WATCH_ITEMS = {
  "deep-dives": [
    { title: "What is EDI and Why Does It Matter?", duration: "~25 min", img: "/collaboration.jpg" },
    { title: "Leading with Inclusion: A Framework for Managers", duration: "~30 min", img: "/team-meeting.jpg" },
    { title: "How to Build an EDI Strategy from Scratch", duration: "~35 min", img: "/workshop.jpg" },
  ],
  "masterclasses": [
    { title: "Understanding Intersectionality", duration: "~20 min", img: "/team-meeting.jpg" },
    { title: "Psychological Safety in Teams", duration: "~25 min", img: "/collaboration.jpg" },
    { title: "Making the Business Case for EDI", duration: "~30 min", img: "/workshop.jpg" },
  ],
  "quick-wins": [
    { title: "Running an Inclusive Meeting", duration: "~6 min", img: "/collaboration.jpg" },
    { title: "Reading Your EDI Data", duration: "~10 min", img: "/team-meeting.jpg" },
    { title: "Anti-Racism at Work: Quick Wins", duration: "~8 min", img: "/workshop.jpg" },
  ],
} as const;

function PricingSection() {
  const [path, setPath] = useState<"individual" | "org" | null>(null);
  const [orgSize, setOrgSize] = useState<"small" | "mid" | "large" | null>(null);

  const individualTiers = [
    {
      name: "Individual Practitioner",
      price: "£249",
      headline: "Everything you need to stop guessing.",
      desc: "Full access to the resource library, every learning module across all three pathways, templates and guides you can use the same day, and a way to track your own progress. Built for the person doing this work without the team around them yet.",
      features: [
        "1 named user account",
        "Full resource library",
        "All learning modules across all three pathways",
        "Templates and guides",
        "Progress tracking",
        "Self-service: no AI tools or human support included",
      ],
      cta: "Start Your Membership",
      highlight: false,
    },
    {
      name: "Practitioner Plus",
      price: "£449",
      headline: "For when you already know what to do, you just need more hours in the day.",
      desc: "Everything in Individual, plus Inclusion AI tools and a full health check and action plan. The work that used to take you an evening now takes you an hour, and you walk into every conversation with evidence already behind you.",
      features: [
        "Everything in Individual Practitioner",
        "Inclusion AI tools: policy audits, business case building, fairer hiring and more",
        "Full inclusion health check and action plan",
        "Advanced resources",
        "AI-assisted, self-service: no scheduled time with a human expert",
      ],
      cta: "Upgrade to Practitioner Plus",
      highlight: true,
    },
    {
      name: "The Expert Track",
      price: "£1,200",
      headline: "For the practitioner who doesn\'t want to figure this out alone.",
      desc: "Everything in Practitioner Plus, plus a guaranteed monthly 1:1 with an inclusion expert, yours for the full year. The same expert, every month, focused entirely on your context and your organisation. No booking required: the session is already yours.",
      features: [
        "Everything in Practitioner Plus",
        "12 guaranteed monthly 1:1 sessions with an inclusion expert",
        "Dedicated to your context: your organisation, your challenges, your progress",
        "Same expert throughout: continuity across the full year",
        "No booking required: your session is secured for the year",
      ],
      cta: "Apply for the Expert Track",
      highlight: false,
      limited: true,
    },
  ];

  const orgBands: Record<string, { name: string; price: string; seats: string; band: string; headline: string; desc: string; features: string[]; cta: string; dark?: boolean }> = {
    small: {
      name: "Growing Teams",
      price: "£2,400",
      seats: "10 full seats",
      band: "50 to 250 employees",
      headline: "Enough seats for the people doing the work, unlimited onboarding for everyone who joins.",
      desc: "10 full seats for your champion and her wider HR or People team, covering everything in Practitioner Plus plus scheduled time with a real inclusion expert. Every new starter gets a consistent, guided introduction to inclusion: included in your membership at no extra charge.",
      features: [
        "10 full seats for your champion, HR or People team, and relevant leadership",
        "Full resource library",
        "All learning modules across all three pathways",
        "Templates, guides and progress tracking",
        "Inclusion AI tools: policy audits, business case building, fairer hiring and more",
        "Full inclusion health check and action plan",
        "Advanced resources",
        "Access to scheduled expert sessions through Get Support",
        "New starter access: onboarding module only, unless otherwise agreed",
        "At your size you are likely onboarding around 22 new starters a year: every one of them is included, at no extra charge",
        "Completion reporting and downloadable certificates",
      ],
      cta: "Start Your Organisation Membership",
    },
    mid: {
      name: "Established Organisations",
      price: "£4,800",
      seats: "25 full seats",
      band: "250 to 1,000 employees",
      headline: "The same support, sized for a bigger team.",
      desc: "25 full seats and everything in Growing Teams, sized for a bigger team. Need more full seats as you grow? They are available any time.",
      features: [
        "25 full seats for your champion, HR or People team, and relevant leadership",
        "Full resource library",
        "All learning modules across all three pathways",
        "Templates, guides and progress tracking",
        "Inclusion AI tools: policy audits, business case building, fairer hiring and more",
        "Full inclusion health check and action plan",
        "Advanced resources",
        "Access to scheduled expert sessions through Get Support",
        "New starter access: onboarding module only, unless otherwise agreed",
        "At your size you are likely onboarding around 90 new starters a year: every one of them is included, at no extra charge",
        "Completion reporting and downloadable certificates",
        "Additional full seats available as an add-on",
      ],
      cta: "Start Your Organisation Membership",
    },
    large: {
      name: "Enterprise",
      price: "From £7,500",
      seats: "Seats by agreement",
      band: "1,000 or more employees",
      headline: "Built around your organisation, not a fixed band.",
      desc: "Full seat count, pricing and entitlements agreed around your organisation's size and structure. Unlimited onboarding, as standard.",
      features: [
        "Full seat count and pricing agreed per deal",
        "Full resource library",
        "All learning modules across all three pathways",
        "Templates, guides and progress tracking",
        "Inclusion AI tools: policy audits, business case building, fairer hiring and more",
        "Full inclusion health check and action plan",
        "Advanced resources",
        "Access to scheduled expert sessions through Get Support",
        "New starter access: onboarding module only, unless otherwise agreed",
        "However many people you hire this year, every new starter is included at no extra charge",
        "Completion reporting and downloadable certificates",
        "Custom entitlements by agreement: dedicated contact, custom reporting and more",
      ],
      cta: "Talk to Us",
      dark: true,
    },
  };

  const orgSizeOptions = [
    { id: "small" as const, label: "50 to 250 people" },
    { id: "mid" as const, label: "250 to 1,000 people" },
    { id: "large" as const, label: "1,000 or more" },
  ];

  const activeBand = orgSize ? orgBands[orgSize] : null;

  return (
    <section style={{ padding: "5rem 1.5rem", background: "var(--sage-xlight)" }} aria-label="Membership options">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--white)", border: "1px solid var(--sage-light)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
            Join today
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
            Ready to build inclusion that lasts?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--slate)", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 0.625rem" }}>
            Join practitioners, HR leaders, and people managers across the UK building their EDI capability backed by real expertise, not just content.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--slate)", fontSize: "0.875rem", maxWidth: "460px", margin: "0 auto", opacity: 0.75 }}>
            Annual memberships. Everything your team needs, one licence. Cancel any time.
          </p>
        </div>

        {/* Path selector buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" as const }}>
          {[
            { id: "individual" as const, label: "Just me, for now" },
            { id: "org" as const, label: "Me and my organisation" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => { setPath(btn.id); if (btn.id === "individual") setOrgSize(null); }}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.875rem 2rem",
                borderRadius: "10px",
                border: path === btn.id ? "2px solid var(--evergreen)" : "2px solid var(--sage-mid)",
                background: path === btn.id ? "var(--evergreen)" : "var(--white)",
                color: path === btn.id ? "var(--white)" : "var(--evergreen)",
                cursor: "pointer",
                transition: "all 0.18s",
                minWidth: "220px",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Individual path */}
        {path === "individual" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
              {individualTiers.map((tier) => (
                <div key={tier.name} style={{ background: "var(--white)", borderRadius: "18px", padding: "2.25rem", border: (tier as typeof tier & { limited?: boolean }).limited ? "1.5px solid #C9A84C" : tier.highlight ? "2px solid var(--evergreen)" : "1.5px solid var(--line)", boxShadow: (tier as typeof tier & { limited?: boolean }).limited ? "0 8px 32px rgba(201,168,76,0.14)" : tier.highlight ? "0 8px 40px rgba(74,99,71,0.16)" : "0 2px 12px rgba(0,0,0,0.04)", position: "relative" as const }}>
                  {tier.highlight && (
                    <div style={{ position: "absolute" as const, top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--evergreen)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", padding: "0.3rem 1rem", borderRadius: "0 0 8px 8px", whiteSpace: "nowrap" as const }}>
                      Most popular
                    </div>
                  )}
                  {(tier as typeof tier & { limited?: boolean }).limited && (
                    <div style={{ position: "absolute" as const, top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--gold-deep, #7A5200)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", padding: "0.3rem 1rem", borderRadius: "0 0 8px 8px", whiteSpace: "nowrap" as const }}>
                      Limited places
                    </div>
                  )}
                  <div style={{ marginTop: tier.highlight ? "0.75rem" : 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{tier.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.875rem" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--charcoal)" }}>{tier.price}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--slate)" }}>/year</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.4, marginBottom: "0.5rem" }}>{tier.headline}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--slate)", lineHeight: 1.65, marginBottom: "1.5rem" }}>{tier.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column" as const, gap: "0.625rem" }}>
                      {tier.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink)" }}>
                          <span style={{ color: "var(--evergreen)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/pricing" style={{ display: "block", textAlign: "center" as const, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", background: tier.highlight ? "var(--evergreen)" : "transparent", color: tier.highlight ? "var(--white)" : "var(--evergreen)", border: tier.highlight ? "none" : "2px solid var(--evergreen)" }}>
                      {tier.cta}
                    </Link>
                    {tier.highlight && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", lineHeight: 1.6, marginTop: "1rem", marginBottom: 0, textAlign: "center" as const }}>
                        This one is worth asking your employer about. It qualifies as professional development spend and many organisations will cover it.
                      </p>
                    )}
                    {(tier as typeof tier & { limited?: boolean }).limited && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", lineHeight: 1.6, marginTop: "1rem", marginBottom: 0, textAlign: "center" as const }}>
                        Places are limited and released quarterly. If the current cohort is full, you can join the waitlist.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Org nudge: shown after viewing individual options */}
            <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--slate)", maxWidth: "480px", margin: "2rem auto 0", lineHeight: 1.65, opacity: 0.85 }}>
              Research consistently shows that inclusion work has more lasting impact when the whole organisation is involved, not just one person carrying it alone.{" "}
              <button onClick={() => setPath("org")} style={{ background: "none", border: "none", padding: 0, fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--evergreen)", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
                See organisation memberships.
              </button>
            </p>
          </div>
        )}

        {/* Org path */}
        {path === "org" && (
          <div>
            {/* Size selector */}
            <div style={{ textAlign: "center" as const, marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--slate)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                How many people are you responsible for bringing along?
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--slate)", marginBottom: "1rem", opacity: 0.8 }}>
                Fewer than 50 people? Practitioner Plus or the Expert Track are built for you: go back and take a look.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" as const }}>
                {orgSizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setOrgSize(opt.id)}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.6rem 1.25rem", borderRadius: "8px", border: orgSize === opt.id ? "2px solid var(--evergreen)" : "1.5px solid var(--line)", background: orgSize === opt.id ? "var(--pale-sage)" : "var(--white)", color: orgSize === opt.id ? "var(--evergreen)" : "var(--slate)", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Band reveal */}
            {activeBand && (
              <div style={{ maxWidth: "680px", margin: "0 auto 2rem" }}>

                <div style={{ background: activeBand.dark ? "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)" : "var(--white)", borderRadius: "18px", padding: "2.5rem", border: activeBand.dark ? "none" : "1.5px solid var(--line)", boxShadow: activeBand.dark ? "0 12px 40px rgba(26,50,32,0.22)" : "0 4px 20px rgba(26,50,32,0.08)", position: "relative" as const, overflow: "hidden" as const }}>
                  {activeBand.dark && (
                    <div style={{ position: "absolute" as const, top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.08)", pointerEvents: "none" as const }} />
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: "1rem", marginBottom: "1.5rem" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" as const, letterSpacing: "0.12em", color: activeBand.dark ? "rgba(255,255,255,0.65)" : "var(--sage-dark)", marginBottom: "0.25rem" }}>{activeBand.name}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: activeBand.dark ? "rgba(255,255,255,0.5)" : "var(--slate)", marginBottom: "0.4rem" }}>{activeBand.band}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: activeBand.dark ? "var(--white)" : "var(--charcoal)" }}>{activeBand.price}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: activeBand.dark ? "rgba(255,255,255,0.65)" : "var(--slate)" }}>/year</span>
                      </div>
                    </div>
                    <div style={{ background: activeBand.dark ? "rgba(255,255,255,0.12)" : "var(--sage-xlight)", borderRadius: "8px", padding: "0.5rem 1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: activeBand.dark ? "var(--white)" : "var(--evergreen)" }}>
                      {activeBand.seats}
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: activeBand.dark ? "rgba(255,255,255,0.8)" : "var(--slate)", lineHeight: 1.65, marginBottom: "1.5rem" }}>{activeBand.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column" as const, gap: "0.6rem" }}>
                    {activeBand.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: activeBand.dark ? "rgba(255,255,255,0.88)" : "var(--ink)" }}>
                        <span style={{ color: activeBand.dark ? "rgba(168,212,176,0.9)" : "var(--evergreen)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={activeBand.dark ? "/contact" : "/pricing"}
                    style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.75rem 2rem", borderRadius: "8px", textDecoration: "none", background: activeBand.dark ? "var(--white)" : "var(--evergreen)", color: activeBand.dark ? "var(--evergreen)" : "var(--white)" }}
                  >
                    {activeBand.cta}
                  </Link>
                </div>

                {/* Approver panel */}
                <div style={{ marginTop: "1.5rem", background: "linear-gradient(160deg, #1A3220 0%, #1E3624 100%)", borderRadius: "14px", padding: "1.75rem 2rem", display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                  <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>👤</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)", marginBottom: "0.4rem" }}>For the approver</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>
                      Need to share this with a budget holder or procurement team? <Link href="/pricing" style={{ color: "rgba(168,212,176,0.95)", textDecoration: "underline", fontWeight: 600 }}>Download our one-page pricing summary</Link> or <Link href="/contact" style={{ color: "rgba(168,212,176,0.95)", textDecoration: "underline", fontWeight: 600 }}>get in touch for a formal quote</Link>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <p style={{ textAlign: "center" as const, fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--slate)", marginTop: "2.5rem" }}>
          Every price is annual. Cancel any time.{" "}
          <Link href="/pricing" style={{ color: "var(--evergreen)", fontWeight: 600, textDecoration: "underline" }}>View full pricing details</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [heroSearchResults, setHeroSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [heroSearchOpen, setHeroSearchOpen] = useState(false);

  // Finder form state
  const [finderAudience, setFinderAudience] = useState<"individual" | "organisation" | null>(null);
  const [finderName, setFinderName] = useState("");
  const [finderEmail, setFinderEmail] = useState("");
  const [finderOrgSize, setFinderOrgSize] = useState("");
  const [finderTopic, setFinderTopic] = useState("");
  const [finderSuggestions, setFinderSuggestions] = useState<ReturnType<typeof searchContent>>([]);
  const [finderSuggestionsOpen, setFinderSuggestionsOpen] = useState(false);
  const [finderLoading, setFinderLoading] = useState(false);
  const [finderResults, setFinderResults] = useState<ReturnType<typeof searchContent>>([]);
  const [finderSubmitted, setFinderSubmitted] = useState(false);
  const finderTopicRef = useRef<HTMLTextAreaElement>(null);

  const [activePathway, setActivePathway] = useState<string | null>(null);
  const [watchTab, setWatchTab] = useState<"deep-dives" | "masterclasses" | "quick-wins">("deep-dives");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [platformTab, setPlatformTab] = useState<"pathways" | "watch" | "resources">("pathways");
  const [aiCarouselIdx, setAiCarouselIdx] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinModalItem, setJoinModalItem] = useState("");
  const [challengeText, setChallengeText] = useState("");
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  useEffect(() => {
    setSearchResults(searchContent(searchQuery));
    setSearchOpen(searchQuery.length >= 2);
  }, [searchQuery]);

  useEffect(() => {
    setHeroSearchResults(searchContent(heroSearchQuery));
    setHeroSearchOpen(heroSearchQuery.length >= 2);
  }, [heroSearchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (heroSearchRef.current && !heroSearchRef.current.contains(e.target as Node)) setHeroSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLockedClick(title: string) {
    setJoinModalItem(title); setJoinModalOpen(true);
  }

  const visibleModules = activePathway
    ? modulesByPathway[activePathway as keyof typeof modulesByPathway] || []
    : Object.values(modulesByPathway).flat();


  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--white)" }}>

      <SiteNav />

      <main id="main-content">

        {/* HERO */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Deep green gradient background */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)",
          }} aria-hidden="true" />

          {/* Hero photo overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/hero-people.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.35,
            mixBlendMode: "luminosity",
          }} aria-hidden="true" />

          {/* Fade left so text stays readable */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.1) 100%)",
          }} aria-hidden="true" />

          {/* Logo top-right of hero */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
            <div style={{ maxWidth: "560px" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>
              Inclusion AI Platform · Build inclusive, high-performing cultures
            </span>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              lineHeight: 1.08,
              color: "var(--white)",
              maxWidth: "780px",
              marginBottom: "1.5rem",
            }}>
              Your Best People Stay<br />
              Where They Feel They Belong.
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.88)",
              maxWidth: "560px",
              marginBottom: "2.25rem",
              lineHeight: 1.8,
            }}>
              The practical knowledge, tools and support for organisations serious about getting inclusion right.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "2.5rem" }}>
              <Link href="/sign-up" style={{
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem",
                background: "linear-gradient(135deg, #5C8360 0%, #3D6142 100%)", color: "var(--white)",
                padding: "0.875rem 2rem", borderRadius: "10px", textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                display: "inline-block",
              }}>
                Start your membership →
              </Link>
              <Link href="/sign-in" style={{
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem",
                background: "rgba(255,255,255,0.12)", color: "var(--white)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                padding: "0.875rem 2rem", borderRadius: "10px", textDecoration: "none",
                backdropFilter: "blur(4px)",
                display: "inline-block",
              }}>
                Already a member? Sign in
              </Link>
            </div>

            {/* Trust bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              {["✓ Tools · Training · Evidence", "✓ CPD content", "✓ UK-based EDI expertise"].map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>{t}</span>
              ))}
            </div>
          </div>{/* /inner column */}
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          {/* gold shimmer sweep */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
            {[
              { value: "31", label: "EDI modules", ai: false },
              { value: "50+", label: "Practical tools", ai: false },
              { value: "15", label: "AI tools", ai: true },
              { value: "87%", label: "Better decisions", ai: false },
              { value: "35%", label: "Outperform competitors", ai: false },
              { value: "WCAG 2.1", label: "Accessibility", ai: false },
            ].map((s) => (
              <div key={s.label} style={{ flex: "1 1 0", minWidth: "80px", padding: "0.55rem 0.4rem", textAlign: "center" }}>
                {s.ai ? (
                  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2.6rem", height: "2.6rem", borderRadius: "50%", border: "2px solid #C9A84C", boxShadow: "0 0 10px rgba(201,168,76,0.45), 0 0 20px rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.12)" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "#C9A84C", lineHeight: 1 }}>{s.value}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.65rem", color: "rgba(42,58,42,0.65)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)", color: "var(--charcoal)", lineHeight: 1, marginBottom: "0.2rem" }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.62rem", color: "rgba(42,58,42,0.60)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "rgba(42,58,42,0.40)", marginTop: "0.3rem", position: "relative", zIndex: 3 }}>
            87% stat: Cloverpop 2017 &nbsp;&middot;&nbsp; 35% stat: McKinsey 2023
          </p>
        </section>

        {/* AI-POWERED FINDER */}
        {(() => {
          const ORG_SIZES = ["2–50 people", "51–250 people", "250+ people"];

          const handleTopicChange = (val: string) => {
            setFinderTopic(val);
            if (val.trim().length > 1) {
              const results = searchContent(val).slice(0, 5);
              setFinderSuggestions(results);
              setFinderSuggestionsOpen(results.length > 0);
            } else {
              setFinderSuggestionsOpen(false);
            }
          };

          const handleSubmit = async () => {
            if (!finderName || !finderEmail || !finderTopic) return;
            setFinderSuggestionsOpen(false);
            setFinderLoading(true);
            console.log("Finder submission:", { finderName, finderEmail, finderAudience, finderOrgSize, finderTopic });
            await new Promise((r) => setTimeout(r, 1800));
            const results = searchContent(finderTopic).slice(0, 4);
            setFinderResults(results);
            setFinderLoading(false);
            setFinderSubmitted(true);
          };

          const greetingName = finderName.trim().split(" ")[0];

          return (
            <section style={{ padding: "4rem 1.5rem 3.5rem", background: "var(--white)", position: "relative", overflow: "hidden" }}>
              {/* Radial gold glow — centred behind the heading, slow pulse */}
              <div className="finder-glow" style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "700px", height: "420px", background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.05) 45%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.25rem" }}>
                    Inclusion AI
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--charcoal)", marginBottom: "0.75rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    Find your starting point in{" "}
                    <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #A8741A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      60 seconds.
                    </span>
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-soft)", margin: "0 auto", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                    Tell us what you are working on and we will match you to the right modules, tools and resources; instantly.
                  </p>
                </div>

                {!finderSubmitted ? (
                  <div>
                    {/* Row 1: audience toggle — right-aligned */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.875rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", color: "var(--charcoal)" }}>
                        Who are you looking for support for?
                      </span>
                      {(["individual", "organisation"] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFinderAudience(opt)}
                          style={{ padding: "0.6rem 1.1rem", borderRadius: "10px", border: `1.5px solid ${finderAudience === opt ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: finderAudience === opt ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: finderAudience === opt ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: finderAudience === opt ? "none" : "0 0 0 3px rgba(201,168,76,0.12)" }}
                        >
                          {opt === "individual" ? "👤  Myself" : "🏢  My organisation or team"}
                        </button>
                      ))}
                    </div>

                    {/* Org size pills — conditional, right-aligned */}
                    {finderAudience === "organisation" && (
                      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                        {ORG_SIZES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setFinderOrgSize(s)}
                            style={{ padding: "0.4rem 0.875rem", borderRadius: "999px", border: `1.5px solid ${finderOrgSize === s ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: finderOrgSize === s ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: finderOrgSize === s ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: finderOrgSize === s ? "none" : "0 0 0 2px rgba(201,168,76,0.12)" }}
                          >{s}</button>
                        ))}
                      </div>
                    )}

                    {/* Row 2: Name + Email — no labels, side by side */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
                      <input
                        type="text"
                        placeholder="Your first name"
                        value={finderName}
                        onChange={(e) => setFinderName(e.target.value)}
                        style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid rgba(201,168,76,0.45)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", outline: "none", boxSizing: "border-box", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                        onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.18), 0 0 12px rgba(201,168,76,0.15)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.45)"; e.target.style.boxShadow = "none"; }}
                      />
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={finderEmail}
                        onChange={(e) => setFinderEmail(e.target.value)}
                        style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid rgba(201,168,76,0.45)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", outline: "none", boxSizing: "border-box", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                        onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.18), 0 0 12px rgba(201,168,76,0.15)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.45)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Row 3: Topic textarea — placeholder carries the label */}
                    <div style={{ marginBottom: "1.75rem", position: "relative" }}>
                      <div style={{ position: "relative" }}>
                        <textarea
                          ref={finderTopicRef}
                          placeholder="What do you need help with today? e.g. EDI strategy, gender pay gap, recruitment bias, inclusive leadership, creating a policy, developing a survey..."
                          value={finderTopic}
                          rows={3}
                          onChange={(e) => handleTopicChange(e.target.value)}
                          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "#C9A84C"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.18), 0 0 12px rgba(201,168,76,0.15)"; }}
                          onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,76,0.45)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; setTimeout(() => setFinderSuggestionsOpen(false), 150); }}
                          style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "10px", border: "1.5px solid rgba(201,168,76,0.45)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.6, background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                        />
                        {finderSuggestionsOpen && finderSuggestions.length > 0 && (
                          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 20, overflowY: "auto", maxHeight: "220px", marginTop: "4px" }}>
                            {finderSuggestions.map((s) => (
                              <button
                                key={s.id}
                                onMouseDown={() => { setFinderTopic(s.title); setFinderSuggestionsOpen(false); }}
                                style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.7rem 1rem", background: "none", border: "none", borderBottom: "1px solid var(--gray-border)", cursor: "pointer", textAlign: "left" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                              >
                                <span style={{ fontSize: "0.9rem" }}>{TYPE_ICONS[s.type]}</span>
                                <span>
                                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block" }}>{s.title}</span>
                                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", textTransform: "capitalize" }}>{TYPE_LABELS[s.type]}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA — centered */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={handleSubmit}
                        disabled={!finderName || !finderEmail || !finderTopic}
                        style={{ padding: "0.875rem 2.25rem", borderRadius: "12px", background: (!finderName || !finderEmail || !finderTopic) ? "linear-gradient(160deg, #FDFAF5 0%, #FAF6EE 100%)" : "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", border: `1.5px solid ${(!finderName || !finderEmail || !finderTopic) ? "rgba(201,168,76,0.3)" : "#C9A84C"}`, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", cursor: (!finderName || !finderEmail || !finderTopic) ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: (!finderName || !finderEmail || !finderTopic) ? "none" : "0 0 0 3px rgba(201,168,76,0.25), 0 0 20px rgba(201,168,76,0.35), 0 4px 16px rgba(201,168,76,0.2)" }}
                      >
                        Find my starting points →
                      </button>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", marginTop: "0.875rem" }}>
                        🌍 Trusted by organisations worldwide
                      </p>
                    </div>

                    {/* Loading bar */}
                    {finderLoading && (
                      <div style={{ marginTop: "1.5rem" }}>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--sage-dark)", marginBottom: "0.6rem", textAlign: "center" }}>
                          Matching you to the right resources...
                        </p>
                        <div style={{ height: "4px", borderRadius: "999px", background: "var(--gray-border)", overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, var(--sage-dark), #C9A84C)", animation: "finderLoad 1.8s ease-in-out forwards" }} />
                        </div>
                        <style>{`@keyframes finderLoad { from { width: 0% } to { width: 100% } }`}</style>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Results */
                  <div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                        {greetingName ? `Hi ${greetingName} — here is where to start.` : "Here is where to start."}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--gray-soft)" }}>
                        Results personalised for you based on: <strong style={{ color: "var(--sage-dark)" }}>{finderTopic}</strong>
                      </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.875rem", marginBottom: "1.5rem" }}>
                      {finderResults.map((r) => (
                        <Link key={r.id} href={r.href} style={{ textDecoration: "none" }}>
                          <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "12px", padding: "1.125rem", height: "100%", cursor: "pointer", transition: "box-shadow 0.15s, transform 0.15s", boxSizing: "border-box" }}
                            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 16px rgba(42,74,48,0.12)"; el.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "none"; }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                              <span style={{ fontSize: "1.1rem" }}>{TYPE_ICONS[r.type]}</span>
                              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--sage-dark)", background: "rgba(42,74,48,0.1)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                                Matched: {finderTopic.trim().split(" ").slice(0, 3).join(" ")}
                              </span>
                            </div>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--charcoal)", marginBottom: "0.3rem", lineHeight: 1.3 }}>{r.title}</div>
                            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.55 }}>{r.desc.slice(0, 90)}...</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <button
                        onClick={() => { setFinderSubmitted(false); setFinderResults([]); setFinderTopic(""); }}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Search again
                      </button>
                      <Link href="/sign-up" style={{ textDecoration: "none" }}>
                        <button style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", background: "var(--sage-dark)", border: "none", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", cursor: "pointer", boxShadow: "0 4px 14px rgba(42,74,48,0.25)" }}>
                          Unlock full access →
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })()}
        {/* INCLUSION AI SECTION */}
        {(() => {
          const AI_TOOLS_CAROUSEL = [
            { icon: "⚖️", name: "Evidence Argument Builder", desc: "Build a compelling, evidence-backed business case for EDI investment tailored to your organisation.", href: "/dashboard/evidence", badge: "Available now", badgeColor: "#3D6142" },
            { icon: "🔬", name: "Research Interpreter", desc: "Paste any research paper or report and get an inclusion-focused summary with practical takeaways.", href: "/dashboard/evidence", badge: "Available now", badgeColor: "#3D6142" },
            { icon: "📖", name: "Case Study Roadmap", desc: "Turn an external case study into a step-by-step replication roadmap for your own organisation.", href: "/dashboard/evidence", badge: "Available now", badgeColor: "#3D6142" },
            { icon: "📋", name: "Policy Equity Auditor", desc: "Upload any policy and get a detailed equity audit: inclusive language, missing provisions, legal framework alignment and action points.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
            { icon: "💼", name: "Job Description Equity Checker", desc: "Identify biased language, gendered wording and barriers to diverse applicants before your role goes live.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
            { icon: "🎯", name: "Interview Question Generator", desc: "Generate structured, bias-aware interview questions aligned to your role competencies and inclusion values.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
            { icon: "🏥", name: "Inclusion Health Check", desc: "A rapid diagnostic that surfaces your organisation's inclusion strengths, gaps and priority actions.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
            { icon: "📊", name: "Pay Gap Narrative Generator", desc: "Turn your gender pay gap data into a clear, compliant and compelling narrative for your annual report.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
            { icon: "🔍", name: "Gender Pay Gap Analysis Tool", desc: "Input your pay data and receive a full analysis with root cause indicators and recommended actions.", href: "/dashboard/inclusion-ai", badge: "Coming soon", badgeColor: "#C9A84C" },
          ];
          const totalSlides = Math.ceil(AI_TOOLS_CAROUSEL.length / 3);
          const visibleTools = AI_TOOLS_CAROUSEL.slice(aiCarouselIdx * 3, aiCarouselIdx * 3 + 3);
          return (
            <section style={{ padding: "4.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
              {/* Background: same faded photo technique as Learning Pathways */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} aria-hidden="true" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(232, 238, 230, 0.93)", backdropFilter: "blur(2px)", zIndex: 1 }} aria-hidden="true" />

              <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.25rem" }}>
                    Inclusion AI
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
                    AI-powered tools built for inclusion professionals.
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--gray-soft)", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
                    Audit policies, build evidence, check job descriptions and analyse pay gaps; intelligent tools designed for the real complexity of inclusion work.
                  </p>
                </div>

                {/* Carousel */}
                <div style={{ position: "relative" }}>
                  {/* Prev button */}
                  <button
                    onClick={() => setAiCarouselIdx((i) => Math.max(0, i - 1))}
                    disabled={aiCarouselIdx === 0}
                    aria-label="Previous tools"
                    style={{ position: "absolute", left: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: aiCarouselIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: aiCarouselIdx === 0 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                  >‹</button>

                  {/* Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
                    {visibleTools.map((tool) => (
                      <Link key={tool.name} href={tool.href} style={{ textDecoration: "none" }}>
                        <div
                          style={{ position: "relative", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "16px", padding: "1.75rem", height: "100%", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s", boxSizing: "border-box", boxShadow: "0 0 0 3px rgba(201,168,76,0.12), 0 0 18px 4px rgba(201,168,76,0.13), 0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.22), 0 0 32px 8px rgba(201,168,76,0.22), 0 8px 32px rgba(0,0,0,0.09)"; el.style.transform = "translateY(-4px)"; }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.12), 0 0 18px 4px rgba(201,168,76,0.13), 0 4px 20px rgba(0,0,0,0.06)"; el.style.transform = "none"; }}
                        >
                          {/* Subtle circle orb pattern */}
                          <svg aria-hidden="true" style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", opacity: 0.18, pointerEvents: "none" }} viewBox="0 0 160 160" fill="none">
                            <circle cx="80" cy="80" r="70" stroke="#C9A84C" strokeWidth="1.5"/>
                            <circle cx="80" cy="80" r="50" stroke="#C9A84C" strokeWidth="1"/>
                            <circle cx="80" cy="80" r="30" stroke="#C9A84C" strokeWidth="0.75"/>
                          </svg>
                          <svg aria-hidden="true" style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "120px", height: "120px", opacity: 0.10, pointerEvents: "none" }} viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="55" stroke="#C9A84C" strokeWidth="1.5"/>
                            <circle cx="60" cy="60" r="38" stroke="#C9A84C" strokeWidth="1"/>
                          </svg>
                          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{tool.icon}</span>
                            <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: tool.badge === "Available now" ? "#2C4A31" : "#7A5200", background: tool.badge === "Available now" ? "rgba(61,97,66,0.12)" : "rgba(255,255,255,0.6)", border: `1px solid ${tool.badge === "Available now" ? "rgba(61,97,66,0.3)" : "rgba(180,130,20,0.4)"}`, padding: "0.2rem 0.55rem", borderRadius: "999px", flexShrink: 0, whiteSpace: "nowrap" }}>
                              {tool.badge}
                            </span>
                          </div>
                          <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.5rem", lineHeight: 1.3 }}>{tool.name}</div>
                          <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "#4A4A4A", lineHeight: 1.65 }}>{tool.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => setAiCarouselIdx((i) => Math.min(totalSlides - 1, i + 1))}
                    disabled={aiCarouselIdx === totalSlides - 1}
                    aria-label="Next tools"
                    style={{ position: "absolute", right: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: aiCarouselIdx === totalSlides - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: aiCarouselIdx === totalSlides - 1 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                  >›</button>
                </div>

                {/* Dot indicators */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setAiCarouselIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{ width: i === aiCarouselIdx ? "1.5rem" : "0.5rem", height: "0.5rem", borderRadius: "999px", border: "none", background: i === aiCarouselIdx ? "#C9A84C" : "rgba(42,74,48,0.2)", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center" }}>
                  <Link href="/dashboard/inclusion-ai" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "linear-gradient(135deg, #3D6142 0%, #2C4A31 100%)", padding: "0.875rem 2.25rem", borderRadius: "10px", textDecoration: "none", boxShadow: "0 4px 16px rgba(42,74,48,0.25)" }}>
                    Explore all 9 Inclusion AI tools →
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}

        {/* EVERYTHING YOU NEED */}
        <section style={{ padding: "4rem 1.5rem 5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
                The platform
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
                From knowledge to action to measurable change; all in one place.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", maxWidth: "640px", margin: "0 auto", lineHeight: 1.65, whiteSpace: "nowrap" }}>
                The tools, training and evidence to build a culture that performs.
              </p>
            </div>

            {/* Top row: Learn, Watch, Inclusion AI, Apply — all equal height via grid rows */}
            <div className="platform-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "1.25rem", gridAutoRows: "1fr" }}>
              {[
                { href: "/dashboard/learn", icon: "📚", label: "Learn", sub: "CPD Modules", desc: "Build the knowledge base that reduces risk and drives performance." },
                { href: "/dashboard/watch", icon: "🎥", label: "Watch", sub: "Masterclasses", desc: "Expert insight you can apply the same week." },
              ].map((f) => (
                <Link key={f.label} href={f.href} style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{
                    background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)",
                    borderRadius: "18px", padding: "1.5rem 1.25rem",
                    boxShadow: "0 6px 28px rgba(42,74,48,0.22)",
                    cursor: "pointer", flex: 1, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }} aria-hidden="true">{f.icon}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "white", marginBottom: "0.2rem" }}>{f.label}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.625rem" }}>{f.sub}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </Link>
              ))}
              {/* Inclusion AI card — gold bordered */}
              <Link href="/dashboard/ai-tools" style={{ textDecoration: "none", display: "flex" }}>
                <div style={{
                  background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)",
                  borderRadius: "18px", padding: "1.5rem 1.25rem",
                  border: "2px solid rgba(201,168,76,0.55)",
                  boxShadow: "0 6px 28px rgba(201,168,76,0.18), 0 0 0 1px rgba(201,168,76,0.12)",
                  cursor: "pointer", flex: 1, position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(201,168,76,0.1)" }} />
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }} aria-hidden="true">✨</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.2rem" }}>Inclusion AI</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "#8B6914", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.625rem" }}>15 AI Tools</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--gray-soft)", lineHeight: 1.55 }}>AI-powered tools built for inclusion practitioners; fast, evidence-based and actionable.</div>
                </div>
              </Link>
              {/* Apply card */}
              <Link href="/dashboard/apply" style={{ textDecoration: "none", display: "flex" }}>
                <div style={{
                  background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)",
                  borderRadius: "18px", padding: "1.5rem 1.25rem",
                  boxShadow: "0 6px 28px rgba(42,74,48,0.22)",
                  cursor: "pointer", flex: 1, position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }} aria-hidden="true">🛠️</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "white", marginBottom: "0.2rem" }}>Apply</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.625rem" }}>Tools & Frameworks</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>Turn good intentions into documented, defensible action.</div>
                </div>
              </Link>
            </div>
            {/* Bottom row: Make the Case, The Inclusion Editors, Get Support — same height as top row */}
            <div className="platform-cards-bottom" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", maxWidth: "900px", margin: "0 auto", gridAutoRows: "1fr" }}>
              {[
                { href: "/dashboard/evidence", icon: "📊", label: "Make the Case", sub: "Evidence & ROI", desc: "The data and evidence your leadership team needs." },
                { href: "/dashboard/community", icon: "🌍", label: "The Inclusion Editors", sub: "Community", desc: "Connect with practitioners, share insights, and grow your network." },
                { href: "/dashboard/support", icon: "🤝", label: "Get Support", sub: "Coaching & Office Hours", desc: "Book office hours with Rebekah, enquire about expert coaching, or join a live event." },
              ].map((f) => (
                <Link key={f.label} href={f.href} style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{
                    background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)",
                    borderRadius: "18px", padding: "1.5rem 1.25rem",
                    boxShadow: "0 6px 28px rgba(42,74,48,0.22)",
                    cursor: "pointer", flex: 1, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }} aria-hidden="true">{f.icon}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "white", marginBottom: "0.2rem" }}>{f.label}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.625rem" }}>{f.sub}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>





        {/* WHAT'S INSIDE */}
        <section style={{ padding: "3.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} aria-hidden="true" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(240, 244, 241, 0.91)", backdropFilter: "blur(2px)", zIndex: 1 }} aria-hidden="true" />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            {/* Section heading */}
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--white)", border: "1px solid var(--sage-light)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "0.75rem" }}>
                Inside the platform
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.45rem" }}>
                What&apos;s inside
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
                Practical knowledge, expert insight and ready-to-use tools; so you can lead inclusion with confidence, not guesswork.
              </p>
            </div>

            {/* Row 1: Learning pathways */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Learning pathways</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Build a genuine understanding of the issues that matter</span>
              </div>
              <div className="pathways-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {PATHWAY_INFO.map((p) => (
                  <div key={p.key} style={{ background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1.5px solid var(--gray-border)" }}>
                    <div style={{ height: "110px", backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
                      <span style={{ position: "absolute", bottom: "0.6rem", left: "0.875rem", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.68rem", color: "white", textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.count} modules</span>
                    </div>
                    <div style={{ padding: "0.875rem 1rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "1rem" }} aria-hidden="true">{p.icon}</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.88rem", color: "var(--charcoal)" }}>{p.key}</span>
                      </div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Watch library */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Watch library</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Get expert insight in the time you actually have</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {([
                  { icon: "🎓", label: "Deep Dives",    sub: "30–45 min", desc: "In-depth expert sessions on complex EDI topics.", img: "/watch-deep-dives.jpg" },
                  { icon: "🎬", label: "Masterclasses", sub: "15–20 min", desc: "Focused sessions on a single skill or framework.",  img: "/watch-masterclass.jpg" },
                  { icon: "⚡",     label: "Nuggets",        sub: "5–10 min",  desc: "Sharp, actionable takeaways for a busy week.",       img: "/watch-nuggets.jpg" },
                ] as const).map((w) => (
                  <div key={w.label} style={{ background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1.5px solid var(--gray-border)" }}>
                    <div style={{ height: "110px", backgroundImage: `url('${w.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                      <div style={{ position: "absolute", bottom: "0.6rem", left: "0.875rem", right: "0.875rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.82rem", color: "white" }}>{w.icon} {w.label}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{w.sub}</span>
                      </div>
                    </div>
                    <div style={{ padding: "0.875rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{w.desc}</p>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only 🔒</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Resources */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Resources and frameworks</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Pick up a tool and apply it today</span>
              </div>
              <div className="resources-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {[
                  { title: "Inclusive Meeting Checklist", type: "Checklist", desc: "Run meetings where every voice is heard and psychological safety is maintained.", img: "/resources-meeting.jpg" },
                  { title: "EDI Strategy Roadmap",        type: "Framework", desc: "Build a credible, evidence-led EDI strategy from the ground up.",               img: "/resources-strategy.jpg" },
                  { title: "Business Case Template",      type: "Template",  desc: "Build the evidence-backed case for EDI investment; tailored for leadership teams.", img: "/resources-template.jpg" },
                ].map((r) => (
                  <div key={r.title} style={{ background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1.5px solid var(--gray-border)" }}>
                    <div style={{ height: "110px", backgroundImage: `url('${r.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
                      <div style={{ position: "absolute", top: "0.6rem", left: "0.875rem", background: "var(--sage-dark)", color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>{r.type}</div>
                      <div style={{ position: "absolute", bottom: "0.6rem", left: "0.875rem", right: "0.875rem" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.82rem", color: "white", lineHeight: 1.3 }}>{r.title}</span>
                      </div>
                    </div>
                    <div style={{ padding: "0.875rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only 🔒</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.95rem", padding: "0.875rem 2rem" }}>
                Join to access everything →
              </Link>
            </div>

          </div>
        </section>


        {/* COACHING */}
        <section style={{ padding: "3.5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="coaching-grid" style={{
              borderRadius: "24px", overflow: "hidden",
              display: "grid", gridTemplateColumns: "1fr 1fr",
              boxShadow: "0 8px 48px rgba(0,0,0,0.1)",
              border: "1.5px solid var(--sage-light)",
            }}>
              <div style={{
                backgroundImage: "url('/coaching-people.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                minHeight: "380px",
                position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(42,74,48,0.2) 0%, rgba(0,0,0,0.05) 100%)" }} />
              </div>
              <div style={{ background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 100%)", padding: "3rem 2.75rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "white", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1.5rem" }}>
                  Real-life expert support
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--white)", marginBottom: "0.875rem" }}>
                  Ask an inclusion expert
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Get direct access to real EDI expertise. Book a one-to-one session, join weekly office hours to ask your questions, or attend a live event.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                  {[
                    { icon: "📅", text: "Weekly office hours; book a slot" },
                    { icon: "🧠", text: "One-to-one expert support sessions" },
                    { icon: "💡", text: "Bring a challenge; get expert perspective" },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/support" className="btn-primary" style={{ display: "inline-block", fontSize: "0.875rem" }}>
                  See support options →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP / PRICING */}
        <PricingSection />
      </main>


      {/* FOOTER */}
      <footer role="contentinfo" style={{ borderTop: "1px solid var(--gray-border)", padding: "2rem 1.5rem", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--charcoal)" }}>
            The Inclusion Edit
          </span>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", display: "flex", gap: "1.5rem" }}>
            <span>© {new Date().getFullYear()} The Inclusion Edit</span>
            <Link href="/accessibility" style={{ color: "var(--gray-soft)", textDecoration: "none" }}>Accessibility</Link>
            <Link href="/privacy" style={{ color: "var(--gray-soft)", textDecoration: "none" }}>Privacy</Link>
          </div>
        </div>
      </footer>

      {/* STICKY JOIN BANNER */}
      <div role="complementary" aria-label="Membership call to action" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(30,40,32,0.97)", backdropFilter: "blur(8px)",
        color: "var(--white)", padding: "0.875rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        zIndex: 200, boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
      }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", margin: 0 }}>
          <strong style={{ color: "var(--white)" }}>Unlock the full platform</strong> 31 CPD modules, 50+ tools, 9 AI tools, evidence resources and expert coaching.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", padding: "0.5rem 0.875rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px" }}>
            Sign in
          </Link>
          <Link href="/sign-up" style={{ background: "var(--sage)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", padding: "0.5rem 1.1rem", borderRadius: "6px", textDecoration: "none" }}>
            Join now →
          </Link>
        </div>
      </div>

      {/* JOIN MODAL */}
      {joinModalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="join-modal-title"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setJoinModalOpen(false); }}
        >
          <div style={{ background: "var(--white)", borderRadius: "20px", padding: "2.75rem", maxWidth: "440px", width: "100%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
            <h2 id="join-modal-title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--charcoal)", marginBottom: "0.625rem" }}>Members only</h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--charcoal)" }}>{joinModalItem}</strong> is available to Impact Platform members.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", marginBottom: "2rem", lineHeight: 1.65 }}>
              Join to access all 31 modules, expert masterclasses, 50+ practical tools, and your EDI evidence library.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/sign-up" className="btn-primary" style={{ textAlign: "center" }}>Start your membership</Link>
              <Link href="/sign-in" className="btn-secondary" style={{ textAlign: "center" }}>Already a member? Sign in</Link>
              <button onClick={() => setJoinModalOpen(false)} style={{ background: "none", border: "none", color: "var(--gray-soft)", fontFamily: "var(--font-body)", fontSize: "0.875rem", cursor: "pointer", padding: "0.25rem" }}>
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes finderGlowPulse {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }
        .finder-glow { animation: finderGlowPulse 5s ease-in-out infinite; }
        .challenge-textarea::placeholder { color: rgba(255,255,255,0.5); }
        .hidden { display: none !important; }
        @media (min-width: 768px) {
          .hidden.md\\:flex { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
          nav .hidden { display: none !important; }
        }
        @media (max-width: 900px) {
          .platform-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .platform-cards-bottom { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pathways-grid { grid-template-columns: 1fr !important; }
          .watch-tabs-grid { grid-template-columns: 1fr !important; }
          .watch-videos-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .coaching-grid { grid-template-columns: 1fr !important; }
          .two-paths-grid { grid-template-columns: 1fr !important; }
          .coaching-grid > div:first-child { min-height: 220px !important; }
          [role="complementary"] { flex-direction: column !important; align-items: flex-start !important; padding: 1rem 1.25rem !important; gap: 0.75rem !important; }
          [role="complementary"] > div { width: 100% !important; }
          [role="complementary"] > div a { flex: 1 !important; text-align: center !important; }
        }
        @media (max-width: 600px) {
          .platform-cards-grid { grid-template-columns: 1fr !important; }
          .platform-cards-bottom { grid-template-columns: 1fr !important; }
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
