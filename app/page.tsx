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
  const [aiCarouselIdx, setAiCarouselIdx] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinModalItem, setJoinModalItem] = useState("");
  const [challengeText, setChallengeText] = useState("");
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { href: "/dashboard/inclusion-ai", label: "Inclusion AI" },
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

          <div ref={searchRef} style={{ position: "relative", flex: "0 1 400px" }}>
            <input
              type="search"
              placeholder="Search modules, tools, guides…"
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

          <div className="hidden md:flex" style={{ gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
            <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--charcoal)", padding: "0.45rem 0.875rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.45rem 1rem", whiteSpace: "nowrap" }}>
              Join now
            </Link>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--charcoal)", display: "none", fontSize: "1.25rem" }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "1rem 1.5rem 1.5rem", position: "relative", zIndex: 99 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.625rem 0.75rem", borderRadius: "8px", display: "block" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <Link href="/sign-up" className="btn-primary" style={{ textAlign: "center", fontSize: "0.9rem" }}>Join now</Link>
            <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--charcoal)", textDecoration: "none", textAlign: "center", padding: "0.5rem" }}>Sign in</Link>
          </div>
        </div>
      )}

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

          {/* Logo top-right of hero */}
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>
              Inclusion AI Platform · Build inclusive, high-performing cultures
            </span>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
              lineHeight: 1.05,
              color: "var(--white)",
              maxWidth: "780px",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}>
              Your Culture Is<br />
              <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #A8741A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Your Competitive<br />Edge.</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "580px",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}>
              Where inclusive practice meets business impact.
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

            <div className="pathways-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
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
        <section style={{ padding: "3.5rem 1.5rem", background: "var(--white)" }}>
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

            <div className="watch-tabs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "3.5rem" }}>
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

            <div className="watch-videos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
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
        <section style={{ padding: "3.5rem 1.5rem", background: "var(--sage-xlight)" }}>
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

        {/* MEMBERSHIP / PRICING */}
        <section style={{ padding: "3.5rem 1.5rem", background: "var(--sage-xlight)" }} aria-label="Membership options">
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

            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
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

        {/* SHARE A CULTURE CHALLENGE */}
        <section style={{ padding: "3rem 1.5rem", background: "var(--white)" }}>
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
                  Share a culture challenge
                </h2>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", marginBottom: "1.75rem", lineHeight: 1.65, maxWidth: "520px" }}>
                  Facing something tricky in your organisation&apos;s culture? Share it here and we&apos;ll address it through content, resources, or our live sessions.
                </p>
                {challengeSubmitted ? (
                  <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", fontSize: "0.95rem" }}>✅ Thank you challenge received!</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", marginTop: "0.375rem" }}>We&apos;ll review it and address it through the platform.</div>
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="challenge-textarea"
                      value={challengeText}
                      onChange={(e) => setChallengeText(e.target.value)}
                      placeholder="Describe your culture challenge…"
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

        {/* FINAL CTA */}
        <section style={{ padding: "4rem 1.5rem", textAlign: "center", background: "var(--white)" }}>
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
