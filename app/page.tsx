"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchContent, CONTENT, FEATURED_CONTENT, TYPE_ICONS, TYPE_LABELS } from "@/lib/content";

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [heroSearchResults, setHeroSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [heroSearchOpen, setHeroSearchOpen] = useState(false);

  const [activePathway, setActivePathway] = useState<string | null>(null);
  const [watchTab, setWatchTab] = useState<"deep-dives" | "masterclasses" | "quick-wins">("deep-dives");
  const [carouselIdx, setCarouselIdx] = useState(0);
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

  const NAV_LINKS = [
    { href: "/dashboard/learn", label: "Learn" },
    { href: "/dashboard/watch", label: "Watch" },
    { href: "/dashboard/apply", label: "Apply" },
    { href: "/dashboard/evidence", label: "Make the Case" },
    { href: "/dashboard/community", label: "The Inclusion Editors" },
    { href: "/dashboard/support", label: "Get Support" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--white)" }}>

      {/* STICKY NAV */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "68px", display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Link href="/" aria-label="The Inclusion Edit home" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--charcoal)" }}>
              THE INCLUSION EDIT
            </span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "0.82rem", color: "var(--sage)", marginLeft: "0.5rem" }}>
              · Impact Platform
            </span>
          </Link>

          <div className="hidden md:flex" style={{ gap: "0.125rem", flex: 1 }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.4rem 0.65rem", borderRadius: "6px", transition: "background 0.15s", letterSpacing: "0.01em", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div ref={searchRef} style={{ position: "relative", flex: "0 1 260px" }}>
            <input
              type="search"
              placeholder="Search modules, tools…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
              aria-label="Search platform content"
              style={{ width: "100%", padding: "0.45rem 1rem 0.45rem 2.25rem", borderRadius: "999px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.82rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none" }}
            />
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.8rem" }} aria-hidden="true">🔍</span>
            {searchOpen && searchResults.length > 0 && (
              <div role="listbox" style={{ position: "absolute", top: "calc(100% + 8px)", left: "-60px", right: "-60px", minWidth: "420px", background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.13)", zIndex: 200, overflow: "hidden" }}>
                {searchResults.map((item) => (
                  <button key={item.id} role="option" aria-selected="false"
                    onClick={() => { item.free ? (window.location.href = item.href) : handleLockedClick(item.title); setSearchOpen(false); setSearchQuery(""); }}
                    style={{ width: "100%", padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid var(--gray-border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <span style={{ fontSize: "1rem" }} aria-hidden="true">{TYPE_ICONS[item.type]}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.84rem", color: "var(--charcoal)" }}>{item.title}</div>
                      {item.subtitle && <div style={{ fontSize: "0.72rem", color: "var(--gray-soft)" }}>{item.subtitle}</div>}
                    </div>
                    <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-light)", padding: "0.18rem 0.5rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                      {item.free ? "Free" : TYPE_LABELS[item.type]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
            <img src="/Transparent%20Green%20Current%20main%20%20logo%202026%202.png" alt="The Inclusion Edit" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
            <Link href="/dashboard"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", padding: "0.45rem 1rem", borderRadius: "8px", background: "var(--sage-dark)", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(42,74,48,0.25)" }}
            >
              Members Dashboard
            </Link>
            <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--charcoal)", padding: "0.45rem 0.875rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.45rem 1rem", whiteSpace: "nowrap" }}>
              Join now
            </Link>
          </div>
        </div>
      </nav>

      <main id="main-content">

        {/* HERO */}
        <section
          style={{
            position: "relative",
            minHeight: "clamp(520px, 68vh, 780px)",
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

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>
              Members-only platform · EDI professionals
            </span>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              color: "var(--white)",
              maxWidth: "680px",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}>
              Your EDI Practice<br />
              <span style={{ color: "#A8D4B0" }}>Built To Last.</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "580px",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}>
              The tools, training and evidence to lead inclusion that works not just in theory, but in practice.
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
          </div>
        </section>

        {/* BIG SEARCH BAR */}
        <section style={{ background: "var(--white)", padding: "3rem 1.5rem 0" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", textAlign: "center", marginBottom: "1.25rem" }}>
              What are you looking for today?
            </p>
            <div ref={heroSearchRef} style={{ position: "relative" }}>
              <input
                type="search"
                placeholder="Search modules, tools, guides, research…"
                value={heroSearchQuery}
                onChange={(e) => setHeroSearchQuery(e.target.value)}
                onFocus={() => heroSearchQuery.length >= 2 && setHeroSearchOpen(true)}
                aria-label="Search all platform content"
                style={{
                  width: "100%", padding: "1rem 1.5rem 1rem 3.25rem",
                  borderRadius: "14px", border: "2px solid var(--sage-light)",
                  fontFamily: "var(--font-body)", fontSize: "1rem",
                  background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none",
                  boxShadow: "0 4px 24px rgba(92,131,96,0.1)",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ position: "absolute", left: "1.125rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem" }} aria-hidden="true">🔍</span>
              {heroSearchOpen && heroSearchResults.length > 0 && (
                <div role="listbox" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "var(--white)", border: "1.5px solid var(--sage-light)", borderRadius: "14px", boxShadow: "0 16px 48px rgba(0,0,0,0.14)", zIndex: 200, overflow: "hidden" }}>
                  {heroSearchResults.map((item) => (
                    <button key={item.id} role="option" aria-selected="false"
                      onClick={() => { item.free ? (window.location.href = item.href) : handleLockedClick(item.title); setHeroSearchOpen(false); setHeroSearchQuery(""); }}
                      style={{ width: "100%", padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", gap: "0.875rem", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid var(--gray-border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <span style={{ fontSize: "1.1rem" }} aria-hidden="true">{TYPE_ICONS[item.type]}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)" }}>{item.title}</div>
                        {item.subtitle && <div style={{ fontSize: "0.75rem", color: "var(--gray-soft)" }}>{item.subtitle}</div>}
                      </div>
                      <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-light)", padding: "0.2rem 0.6rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                        {item.free ? "Free" : TYPE_LABELS[item.type]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WHERE WOULD YOU LIKE TO START */}
        <section style={{ padding: "2.5rem 1.5rem 0", background: "var(--white)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gray-soft)", textAlign: "center", marginBottom: "1.25rem" }}>
              Where would you like to start?
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <Link href="/sign-up" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "18px", padding: "2rem",
                  background: "linear-gradient(135deg, #3D6142 0%, #2A4A30 100%)",
                  boxShadow: "0 8px 32px rgba(42,74,48,0.25)",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ fontSize: "2rem", marginBottom: "0.875rem" }}>👤</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "white", marginBottom: "0.375rem" }}>I&apos;m an individual</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55, marginBottom: "1.25rem" }}>Practitioners, HR leads, people managers building their EDI capability.</div>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "rgba(255,255,255,0.9)" }}>Join as an individual →</span>
                </div>
              </Link>
              <Link href="/sign-up" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "18px", padding: "2rem",
                  background: "linear-gradient(135deg, #5C8360 0%, #4A6E4E 100%)",
                  boxShadow: "0 8px 32px rgba(92,131,96,0.25)",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ fontSize: "2rem", marginBottom: "0.875rem" }}>🏢</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "white", marginBottom: "0.375rem" }}>I represent an organisation</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55, marginBottom: "1.25rem" }}>Team access, group learning, and organisation-wide reporting.</div>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "rgba(255,255,255,0.9)" }}>Get organisation access →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* EVERYTHING YOU NEED */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
                The platform
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
                Everything you need in one place
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
                A complete EDI learning ecosystem structured, practical, and evidence-based.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "1.25rem" }}>
              {[
                { href: "/dashboard/learn", icon: "📚", label: "Learn", sub: "CPD Modules", desc: "31 structured CPD modules across three learning pathways." },
                { href: "/dashboard/watch", icon: "🎥", label: "Watch", sub: "Masterclasses", desc: "Expert-led video masterclasses on inclusive practice coming soon." },
                { href: "/dashboard/apply", icon: "🛠️", label: "Apply", sub: "Tools & Frameworks", desc: "Interactive tools, guides, checklists, and frameworks for your work." },
                { href: "/dashboard/evidence", icon: "📊", label: "Make the Case", sub: "Evidence & ROI", desc: "Research, data, case studies and resources for your business case." },
              ].map((f) => (
                <Link key={f.label} href={f.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)",
                    borderRadius: "18px", padding: "1.75rem 1.5rem",
                    boxShadow: "0 6px 28px rgba(42,74,48,0.22)",
                    cursor: "pointer", height: "100%", position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }} aria-hidden="true">{f.icon}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "white", marginBottom: "0.2rem" }}>{f.label}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{f.sub}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
              {[
                { href: "/dashboard/support", icon: "🤝", label: "Get Support", sub: "Coaching & Office Hours", desc: "Book office hours with Rebekah, enquire about expert coaching, or join a live event." },
                { href: "/dashboard/community", icon: "🌍", label: "The Inclusion Editors", sub: "Community", desc: "Connect with practitioners, share insights, and grow your network." },
              ].map((f) => (
                <Link key={f.label} href={f.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)",
                    borderRadius: "18px", padding: "1.75rem 1.5rem",
                    boxShadow: "0 6px 28px rgba(42,74,48,0.22)",
                    cursor: "pointer", position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }} aria-hidden="true">{f.icon}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "white", marginBottom: "0.2rem" }}>{f.label}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{f.sub}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ background: "linear-gradient(135deg, var(--sage-dark) 0%, #3A6040 100%)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
            {[
              { value: "31", label: "CPD modules" },
              { value: "3", label: "Learning pathways" },
              { value: "50+", label: "Practical tools" },
              { value: "WCAG 2.1", label: "Accessibility standard" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "1rem" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--white)", lineHeight: 1, marginBottom: "0.5rem" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPLORE LEARNING PATHWAYS */}
        <section style={{ padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} aria-hidden="true" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(240, 244, 241, 0.91)", backdropFilter: "blur(2px)", zIndex: 1 }} aria-hidden="true" />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--white)", border: "1px solid var(--sage-light)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
                Learning pathways
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
                Explore the platform
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", maxWidth: "460px", margin: "0 auto" }}>
                Browse all 31 modules. A selection is free join to unlock the full library.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {PATHWAY_INFO.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setActivePathway(activePathway === p.key ? null : p.key)}
                  style={{
                    background: "var(--white)", borderRadius: "16px", overflow: "hidden",
                    border: `2px solid ${activePathway === p.key ? p.color : "var(--gray-border)"}`,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{ height: "140px", backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
                    <span style={{ position: "absolute", bottom: "0.75rem", left: "1rem", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.72rem", color: "white", textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.count} modules</span>
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "1.25rem" }} aria-hidden="true">{p.icon}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)" }}>{p.key}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                    <div style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: p.color }}>
                      {activePathway === p.key ? "Hide modules ↑" : "Browse modules →"}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {activePathway && visibleModules.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {visibleModules.map((m) => (
                  <div key={m.id} className="card" style={{ background: "var(--white)", opacity: m.free ? 1 : 0.85 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.35 }}>{m.title}</span>
                      {!m.free && <span style={{ fontSize: "0.8rem", flexShrink: 0 }}>🔒</span>}
                    </div>
                    <button onClick={() => m.free ? (window.location.href = m.href) : handleLockedClick(m.title)}
                      style={{ marginTop: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: m.free ? "var(--sage-dark)" : "var(--gray-soft)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      {m.free ? "Start free →" : "Members only"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.95rem", padding: "0.875rem 2rem" }}>
                Join to access all 31 modules →
              </Link>
            </div>
          </div>
        </section>

        {/* EXPLORE THE WATCH LIBRARY */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
                Coming soon
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
                Explore the Watch library
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto" }}>
                Expert-led video content in production launching to members first. Three formats, designed to fit your day.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "3.5rem" }}>
              {[
                { icon: "🎓", label: "Deep Dives", desc: "Full 30–45 minute expert-led training sessions on complex EDI topics.", key: "deep-dives" as const },
                { icon: "🎬", label: "Masterclasses", desc: "Focused 15–20 minute sessions on a single skill, framework or challenge.", key: "masterclasses" as const },
                { icon: "⚡", label: "Nuggets", desc: "5–10 minute sharp, actionable takeaways easy to fit into your week.", key: "quick-wins" as const },
              ].map((w) => (
                <button key={w.label}
                  onClick={() => { setWatchTab(w.key); setCarouselIdx(0); }}
                  style={{
                    textAlign: "left",
                    background: watchTab === w.key ? "linear-gradient(160deg, #3D6142 0%, #2C4A31 100%)" : "var(--sage-xlight)",
                    border: watchTab === w.key ? "2px solid var(--sage-dark)" : "1.5px solid var(--sage-light)",
                    borderRadius: "16px", padding: "1.75rem 1.5rem",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.875rem" }} aria-hidden="true">{w.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: watchTab === w.key ? "white" : "var(--charcoal)", marginBottom: "0.5rem" }}>{w.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: watchTab === w.key ? "rgba(255,255,255,0.82)" : "var(--gray-soft)", lineHeight: 1.6 }}>{w.desc}</div>
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {WATCH_ITEMS[watchTab].map((item, i) => (
                <div key={item.title} style={{
                  borderRadius: "16px", overflow: "hidden",
                  boxShadow: carouselIdx === i ? "0 12px 40px rgba(0,0,0,0.18)" : "0 4px 16px rgba(0,0,0,0.08)",
                  border: carouselIdx === i ? "2px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
                  cursor: "pointer",
                }} onClick={() => setCarouselIdx(i)}>
                  <div style={{ position: "relative", height: "190px", backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)" }} />
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.2rem 0.6rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span style={{ fontSize: "0.65rem" }}>🔒</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Members only</span>
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid var(--sage-dark)", marginLeft: "4px" }} />
                    </div>
                    <span style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "rgba(255,255,255,0.9)", background: "rgba(0,0,0,0.4)", padding: "0.2rem 0.55rem", borderRadius: "999px" }}>{item.duration}</span>
                  </div>
                  <div style={{ background: "var(--white)", padding: "1.125rem 1.25rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.35 }}>{item.title}</div>
                    <div style={{ marginTop: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.68rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {watchTab === "deep-dives" ? "Deep Dive" : watchTab === "masterclasses" ? "Masterclass" : "Nugget"} · Coming soon
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "1.5rem" }}>
              {WATCH_ITEMS[watchTab].map((_, i) => (
                <button key={i} onClick={() => setCarouselIdx(i)} aria-label={`Show video ${i + 1}`}
                  style={{ width: carouselIdx === i ? "22px" : "8px", height: "8px", borderRadius: "999px", background: carouselIdx === i ? "var(--sage-dark)" : "var(--gray-border)", border: "none", cursor: "pointer", padding: 0 }} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.9rem" }}>
                Join to access the full Watch library →
              </Link>
            </div>
          </div>
        </section>

        {/* COACHING */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--sage-xlight)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{
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
              <div style={{ background: "var(--white)", padding: "3rem 2.75rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1.5rem" }}>
                  Real-life expert support
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--charcoal)", marginBottom: "0.875rem" }}>
                  Get coaching from a real inclusion expert
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--gray-soft)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Backed by Rebekah Hayward, award-winning EDI consultant. Book weekly office hours, enquire about one-to-one coaching, or join a live event.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                  {[
                    { icon: "📅", text: "Weekly office hours book a slot" },
                    { icon: "🧠", text: "One-to-one expert coaching packages" },
                    { icon: "🎤", text: "Live events and cohort sessions" },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.5 }}>{item.text}</span>
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

        {/* SHARE AN INCLUSION CHALLENGE */}
        <section style={{ padding: "4rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{
              borderRadius: "20px", padding: "2.75rem",
              background: "linear-gradient(135deg, #1E3624 0%, #2C4A31 100%)",
              boxShadow: "0 8px 40px rgba(30,54,36,0.25)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
                  💬 Community
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--white)", marginBottom: "0.75rem" }}>
                  Share an inclusion challenge
                </h2>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", marginBottom: "1.75rem", lineHeight: 1.65, maxWidth: "520px" }}>
                  Facing something tricky in your EDI work? Share it here and we&apos;ll address it through the platform in content, resources, or our live sessions.
                </p>
                {challengeSubmitted ? (
                  <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", fontSize: "0.95rem" }}>✅ Thank you challenge received!</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", marginTop: "0.375rem" }}>We&apos;ll review it and address it through the platform.</div>
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={challengeText}
                      onChange={(e) => setChallengeText(e.target.value)}
                      placeholder="Describe your inclusion challenge…"
                      rows={3}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "10px",
                        border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)",
                        color: "var(--white)", fontFamily: "var(--font-body)", fontSize: "0.9rem",
                        outline: "none", resize: "vertical", marginBottom: "0.875rem",
                        boxSizing: "border-box",
                      }}
                    />
                    <button
                      onClick={() => { if (challengeText.trim()) setChallengeSubmitted(true); }}
                      style={{
                        fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem",
                        background: "var(--white)", color: "var(--sage-dark)",
                        padding: "0.75rem 1.75rem", borderRadius: "8px", border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Share your challenge →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP / PRICING */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--sage-xlight)" }} aria-label="Membership options">
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--white)", border: "1px solid var(--sage-light)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem" }}>
                Pricing
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
                Membership for every stage
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", maxWidth: "440px", margin: "0 auto" }}>
                Choose the plan that fits where you are.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                {
                  tier: "Individual Practitioner", price: "£XX", period: "/month",
                  desc: "For EDI practitioners, HR professionals, and people managers building their capability.",
                  features: ["Full access to all 31 modules", "CPD certificate on completion", "Tools & frameworks library", "Member community access", "Weekly office hours"],
                  cta: "Start free trial", highlight: false,
                },
                {
                  tier: "Small Organisation", price: "£XXX", period: "/month",
                  desc: "For SMEs and teams investing in their collective EDI capability.",
                  features: ["Up to 25 seats", "Team progress dashboard", "Organisation-wide certificate", "All individual features", "Priority support"],
                  cta: "Get started", highlight: true,
                },
                {
                  tier: "Enterprise", price: "Custom", period: "",
                  desc: "For larger organisations embedding inclusion at scale across teams and leadership.",
                  features: ["Unlimited seats", "Custom learning pathways", "Bespoke reporting", "Dedicated account support", "Consultancy add-ons"],
                  cta: "Contact us", highlight: false,
                },
              ].map((t) => (
                <div key={t.tier} style={{
                  background: "var(--white)", borderRadius: "20px", padding: "2.25rem",
                  border: t.highlight ? "2px solid var(--sage)" : "1.5px solid var(--gray-border)",
                  boxShadow: t.highlight ? "0 8px 40px rgba(92,131,96,0.18)" : "0 2px 12px rgba(0,0,0,0.04)",
                  position: "relative",
                }}>
                  {t.highlight && (
                    <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--sage-dark)", color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.3rem 1rem", borderRadius: "0 0 8px 8px" }}>
                      Most popular
                    </div>
                  )}
                  <div style={{ marginTop: t.highlight ? "0.75rem" : 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{t.tier}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.875rem" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--charcoal)" }}>{t.price}</span>
                      {t.period && <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--gray-soft)" }}>{t.period}</span>}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.65, marginBottom: "1.5rem" }}>{t.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {t.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)" }}>
                          <span style={{ color: "var(--sage)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/sign-up" className={t.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", textAlign: "center", display: "block" }}>
                      {t.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: "6rem 1.5rem", textAlign: "center", background: "var(--white)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1.5rem" }}>
            Join today
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "var(--charcoal)", marginBottom: "1rem" }}>
            Ready to build inclusion that lasts?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.1rem", maxWidth: "36rem", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Join practitioners, HR leaders, and people managers across the UK building their EDI capability backed by real expertise, not just content.
          </p>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.75rem" }}>
            Start your membership →
          </Link>
          <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--gray-soft)", letterSpacing: "0.04em" }}>
            CPD content · WCAG 2.1 AA · Cancel any time
          </p>
        </section>
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
          <strong style={{ color: "var(--white)" }}>Unlock the full platform</strong> 31 CPD modules, 50+ tools, evidence resources and expert coaching.
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
    </div>
  );
}
