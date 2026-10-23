"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchContent, CONTENT, FEATURED_CONTENT, TYPE_ICONS, TYPE_LABELS } from "@/lib/content";

// Pulse quiz questions (same as dashboard version)
const PULSE_QUESTIONS = [
  {
    id: "role",
    question: "What best describes your role?",
    options: ["EDI / D&I Lead or Manager", "HR Professional", "People Manager", "Senior Leader / Executive", "Consultant or Trainer", "Other"],
  },
  {
    id: "orgSize",
    question: "How large is your organisation?",
    options: ["Just me / freelance", "2–50 people", "51–250 people", "251–1,000 people", "1,000+ people"],
  },
  {
    id: "experience",
    question: "How long have you been working in EDI?",
    options: ["I'm just starting out", "Less than 2 years", "2–5 years", "5–10 years", "10+ years"],
  },
  {
    id: "priority",
    question: "What's your biggest inclusion challenge right now?",
    options: [
      "Getting leadership buy-in",
      "Knowing where to start",
      "Building an evidence base",
      "Embedding inclusion in day-to-day work",
      "Improving recruitment and retention",
      "Understanding data and measuring impact",
    ],
  },
  {
    id: "goal",
    question: "What do you most want to achieve?",
    options: [
      "Develop my own knowledge and skills",
      "Upskill my team or managers",
      "Build a strategy or action plan",
      "Make the business case for EDI",
      "Improve specific processes or policies",
    ],
  },
];

const PULSE_RECOMMENDATIONS: Record<string, { module: string; id: string; reason: string }> = {
  "Getting leadership buy-in": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "This module gives you the evidence and language to make the case at board level." },
  "Knowing where to start": { module: "Building an EDI Strategy", id: "edi-strategy", reason: "Start here to build a clear, credible roadmap for your EDI work." },
  "Building an evidence base": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "Learn how to gather, present and use evidence that resonates with decision-makers." },
  "Embedding inclusion in day-to-day work": { module: "Psychological Safety", id: "psychological-safety", reason: "Creating the right conditions for inclusion starts with psychological safety." },
  "Improving recruitment and retention": { module: "Inclusive Recruitment", id: "inclusive-recruitment", reason: "End-to-end guidance on removing bias from hiring and keeping diverse talent." },
  "Understanding data and measuring impact": { module: "EDI Data & Workforce Monitoring", id: "edi-data", reason: "Learn to collect, analyse and act on EDI data ethically and effectively." },
};

// Free preview items shown without login
const FREE_ITEMS = CONTENT.filter((c) => c.free);
const FREE_IDS = new Set(FREE_ITEMS.map((c) => c.id));

export default function Home() {
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Pulse quiz
  const [pulseStarted, setPulseStarted] = useState(false);
  const [pulseStep, setPulseStep] = useState(0);
  const [pulseAnswers, setPulseAnswers] = useState<Record<string, string>>({});
  const [pulseComplete, setPulseComplete] = useState(false);
  const [pulseVisible, setPulseVisible] = useState(false);

  // Join modal
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinModalItem, setJoinModalItem] = useState<string>("");

  // Featured content rotation
  const [featuredIdx, setFeaturedIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFeaturedIdx((i) => (i + 1) % FEATURED_CONTENT.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Scroll reveal for pulse section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPulseVisible(true); },
      { threshold: 0.2 }
    );
    const el = document.getElementById("pulse-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Search
  useEffect(() => {
    const results = searchContent(searchQuery);
    setSearchResults(results);
    setSearchOpen(results.length > 0);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handlePulseAnswer(answer: string) {
    const question = PULSE_QUESTIONS[pulseStep];
    const newAnswers = { ...pulseAnswers, [question.id]: answer };
    setPulseAnswers(newAnswers);
    if (pulseStep < PULSE_QUESTIONS.length - 1) {
      setTimeout(() => setPulseStep((s) => s + 1), 280);
    } else {
      setTimeout(() => setPulseComplete(true), 280);
    }
  }

  function resetPulse() {
    setPulseStarted(false);
    setPulseStep(0);
    setPulseAnswers({});
    setPulseComplete(false);
  }

  function handleLockedClick(itemTitle: string) {
    setJoinModalItem(itemTitle);
    setJoinModalOpen(true);
  }

  const featured = FEATURED_CONTENT[featuredIdx];
  const pulseRec = pulseComplete ? PULSE_RECOMMENDATIONS[pulseAnswers.priority] || PULSE_RECOMMENDATIONS["Knowing where to start"] : null;

  const modulesByPathway = {
    "People & Culture": CONTENT.filter((c) => c.type === "module" && c.pathway === "People & Culture"),
    "Systems & Processes": CONTENT.filter((c) => c.type === "module" && c.pathway === "Systems & Processes"),
    "Leadership & Strategy": CONTENT.filter((c) => c.type === "module" && c.pathway === "Leadership & Strategy"),
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--white)" }}>

      {/* Sticky nav */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          borderBottom: "1px solid var(--gray-border)",
          background: "var(--white)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
        className="flex items-center justify-between px-6 py-4"
      >
        <Link href="/" aria-label="The Inclusion Edit — Impact Platform home">
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)" }}>
            THE INCLUSION EDIT
          </span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "0.85rem", color: "var(--sage)", marginLeft: "0.5rem" }}>
            · Impact Platform
          </span>
        </Link>

        {/* Search bar in nav */}
        <div ref={searchRef} style={{ position: "relative", flex: "0 1 380px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="search"
              placeholder="Search modules, tools, resources…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
              aria-label="Search platform content"
              style={{
                width: "100%",
                padding: "0.5rem 1rem 0.5rem 2.5rem",
                borderRadius: "999px",
                border: "1.5px solid var(--gray-border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                background: "var(--sage-xlight)",
                color: "var(--charcoal)",
                outline: "none",
              }}
            />
            <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.875rem" }} aria-hidden="true">🔍</span>
          </div>

          {searchOpen && searchResults.length > 0 && (
            <div
              role="listbox"
              aria-label="Search results"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                background: "var(--white)",
                border: "1px solid var(--gray-border)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                zIndex: 200,
                overflow: "hidden",
              }}
            >
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  role="option"
                  aria-selected="false"
                  onClick={() => {
                    if (!item.free) {
                      handleLockedClick(item.title);
                    } else {
                      window.location.href = item.href;
                    }
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    borderBottom: "1px solid var(--gray-border)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <span style={{ fontSize: "1.1rem" }} aria-hidden="true">{TYPE_ICONS[item.type]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--charcoal)" }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: "0.75rem", color: "var(--gray-soft)" }}>{item.subtitle}</div>}
                  </div>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-light)", padding: "0.2rem 0.5rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                    {item.free ? "Free" : TYPE_LABELS[item.type]}
                  </span>
                </button>
              ))}
              <div style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} — sign in to access all content
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--charcoal)", padding: "0.5rem 1.25rem", borderRadius: "8px", border: "2px solid var(--gray-border)", textDecoration: "none" }}>
            Sign in
          </Link>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}>
            Join now
          </Link>
        </div>
      </nav>

      <main id="main-content">

        {/* Hero */}
        <section style={{ padding: "5rem 1.5rem 4rem", textAlign: "center", background: "var(--white)" }}>
          <span className="badge badge-sage" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Members-only platform</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.15, color: "var(--charcoal)", maxWidth: "44rem", margin: "0 auto 1.5rem" }}>
            Your EDI practice,{" "}
            <em style={{ color: "var(--sage-dark)", fontStyle: "italic" }}>built to last.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "var(--gray-soft)", maxWidth: "36rem", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            The Impact Platform gives you the tools, training, and evidence to lead inclusion that works — not just in theory, but in practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ marginBottom: "1.5rem" }}>
            <Link href="/sign-up" className="btn-primary">Start your membership</Link>
            <Link href="/sign-in" className="btn-secondary">Already a member? Sign in</Link>
          </div>
          <p style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", letterSpacing: "0.04em" }}>
            CPD-accredited · WCAG 2.1 AA accessible · UK-based EDI expertise
          </p>
        </section>

        {/* Today's Focus — animated rotating card */}
        <section style={{ background: "var(--sage-xlight)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", margin: 0 }}>
                ✨ Today's Focus
              </h2>
              <div style={{ display: "flex", gap: "0.375rem" }}>
                {FEATURED_CONTENT.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIdx(i)}
                    aria-label={`Show featured item ${i + 1}`}
                    style={{
                      width: i === featuredIdx ? "20px" : "8px",
                      height: "8px",
                      borderRadius: "999px",
                      background: i === featuredIdx ? "var(--sage-dark)" : "var(--gray-border)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              key={featured.id}
              style={{
                background: "var(--white)",
                borderRadius: "16px",
                padding: "2rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
                border: "1px solid var(--gray-border)",
                animation: "fadeInUp 0.4s ease",
              }}
            >
              <div>
                <span className="badge badge-sage" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{featured.pathway}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                  {featured.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1rem", margin: 0 }}>
                  {featured.tagline}
                </p>
              </div>
              <button
                onClick={() => handleLockedClick(featured.title)}
                className="btn-primary"
                style={{ whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Start module →
              </button>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section style={{ borderTop: "1px solid var(--gray-border)", borderBottom: "1px solid var(--gray-border)", background: "var(--white)", padding: "2rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
            {[
              { value: "31", label: "CPD modules" },
              { value: "3", label: "Learning pathways" },
              { value: "7+", label: "Practical tools" },
              { value: "WCAG 2.1", label: "Accessibility standard" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--sage-dark)" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Module preview — freemium browse */}
        <section style={{ padding: "4rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
                Explore the platform
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1rem" }}>
                Browse all 31 modules. A selection is free — join to unlock the full library.
              </p>
            </div>

            {Object.entries(modulesByPathway).map(([pathway, modules]) => (
              <div key={pathway} style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "1rem", borderBottom: "2px solid var(--sage-light)", paddingBottom: "0.5rem" }}>
                  {pathway}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
                  {modules.map((m) => {
                    const isFree = FREE_IDS.has(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => isFree ? (window.location.href = m.href) : handleLockedClick(m.title)}
                        style={{
                          textAlign: "left",
                          background: "var(--white)",
                          border: "1px solid var(--gray-border)",
                          borderRadius: "10px",
                          padding: "1.125rem",
                          cursor: "pointer",
                          transition: "box-shadow 0.2s, transform 0.15s",
                          position: "relative",
                          opacity: 1,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.375rem" }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.3 }}>{m.title}</span>
                          {isFree ? (
                            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-light)", padding: "0.15rem 0.5rem", borderRadius: "999px", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>Free</span>
                          ) : (
                            <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }} aria-hidden="true">🔒</span>
                          )}
                        </div>
                        {m.subtitle && <p style={{ fontSize: "0.8rem", color: "var(--gray-soft)", margin: 0, lineHeight: 1.5 }}>{m.subtitle}</p>}
                        {m.duration && <div style={{ marginTop: "0.625rem", fontSize: "0.72rem", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 600 }}>⏱ {m.duration}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusion Pulse — embedded quiz */}
        <section
          id="pulse-section"
          style={{
            padding: "5rem 1.5rem",
            background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage-mid) 100%)",
            opacity: pulseVisible ? 1 : 0,
            transform: pulseVisible ? "none" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", marginBottom: "0.75rem" }}>
              🌡 Inclusion Pulse
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--white)", marginBottom: "0.75rem" }}>
              Not sure where to start?
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "2rem" }}>
              5 quick questions to find your best starting point on the platform.
            </p>

            {!pulseStarted && !pulseComplete && (
              <button
                onClick={() => setPulseStarted(true)}
                style={{ background: "var(--white)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2rem", borderRadius: "10px", border: "none", cursor: "pointer" }}
              >
                Let's find out →
              </button>
            )}

            {pulseStarted && !pulseComplete && (
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "2rem", backdropFilter: "blur(4px)" }}>
                {/* Progress dots */}
                <div style={{ display: "flex", gap: "0.375rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                  {PULSE_QUESTIONS.map((_, i) => (
                    <div key={i} style={{ width: "8px", height: "8px", borderRadius: "999px", background: i <= pulseStep ? "var(--white)" : "rgba(255,255,255,0.3)", transition: "background 0.3s" }} />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--white)", marginBottom: "1.25rem" }}>
                  {PULSE_QUESTIONS[pulseStep].question}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {PULSE_QUESTIONS[pulseStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handlePulseAnswer(opt)}
                      style={{
                        background: pulseAnswers[PULSE_QUESTIONS[pulseStep].id] === opt ? "var(--white)" : "rgba(255,255,255,0.12)",
                        color: pulseAnswers[PULSE_QUESTIONS[pulseStep].id] === opt ? "var(--sage-dark)" : "var(--white)",
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {pulseComplete && pulseRec && (
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "16px", padding: "2rem", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎯</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>
                  Your recommended starting point
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--white)", marginBottom: "0.75rem" }}>
                  {pulseRec.module}
                </div>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                  {pulseRec.reason}
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    href="/sign-up"
                    style={{ background: "var(--white)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}
                  >
                    Join to start this module →
                  </Link>
                  <button
                    onClick={resetPulse}
                    style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.3)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.25rem", borderRadius: "8px", cursor: "pointer" }}
                  >
                    Start again
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Platform features */}
        <section style={{ borderTop: "1px solid var(--gray-border)", padding: "4rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", marginBottom: "0.5rem", textAlign: "center" }}>
              Everything you need in one place
            </h2>
            <p style={{ textAlign: "center", color: "var(--gray-soft)", fontFamily: "var(--font-body)", marginBottom: "3rem" }}>
              A complete EDI learning ecosystem — structured, practical, and evidence-based.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "📚", label: "Learn", desc: "31 CPD-accredited modules across 3 structured pathways" },
                { icon: "🎥", label: "Watch", desc: "Expert masterclasses — coming soon" },
                { icon: "🛠️", label: "Apply", desc: "Tools, audits, and frameworks for real-world EDI" },
                { icon: "📊", label: "Make the Case", desc: "Evidence and ROI resources to secure leadership buy-in" },
                { icon: "💬", label: "Get Support", desc: "Member community, coaching, and live events" },
                { icon: "🌡", label: "Inclusion Pulse", desc: "Personalised assessment to find your best starting point" },
              ].map((f) => (
                <div key={f.label} style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                  <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }} aria-hidden="true">{f.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{f.label}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--sage-xlight)" }} aria-label="Membership options">
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
                Membership for every stage
              </h2>
              <p style={{ color: "var(--gray-soft)", fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                Whether you're an individual practitioner or leading inclusion across an organisation.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                { tier: "Individual Practitioner", price: "£XX/month", desc: "For EDI practitioners, HR professionals, and people managers.", features: ["Full access to all 31 modules", "Certificate on completion", "Tools & frameworks", "Member community"], cta: "Start free trial" },
                { tier: "Small Organisation", price: "£XXX/month", desc: "For SMEs investing in their team's EDI capability.", features: ["Up to 25 seats", "Team progress dashboard", "Organisation certificate", "Priority support"], highlight: true, cta: "Get started" },
                { tier: "Enterprise", price: "Custom", desc: "For larger organisations embedding EDI at scale.", features: ["Unlimited seats", "Custom learning pathways", "Dedicated support", "Bespoke reporting"], cta: "Contact us" },
              ].map((t) => (
                <div key={t.tier} className="card" style={t.highlight ? { borderColor: "var(--sage)", boxShadow: "0 0 0 2px var(--sage-light)", background: "var(--white)" } : { background: "var(--white)" }}>
                  {t.highlight && <div className="badge badge-sage" style={{ marginBottom: "1rem" }}>Most popular</div>}
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{t.tier}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>{t.price}</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray-soft)", marginBottom: "1.25rem", lineHeight: 1.6 }}>{t.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
                    {t.features.map((f) => (
                      <li key={f} style={{ fontSize: "0.875rem", color: "var(--charcoal-mid)", padding: "0.3rem 0", paddingLeft: "1.25rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--sage)", fontWeight: 700 }} aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up" className={t.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", textAlign: "center", display: "block" }}>
                    {t.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: "5rem 1.5rem", textAlign: "center", background: "var(--white)", borderTop: "1px solid var(--gray-border)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "1rem" }}>
            Ready to build inclusion that lasts?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "32rem", margin: "0 auto 2rem" }}>
            Join practitioners, HR leaders and people managers across the UK building their EDI capability.
          </p>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            Start your membership →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo" style={{ borderTop: "1px solid var(--gray-border)", padding: "1.5rem", textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)" }}>
        © {new Date().getFullYear()} The Inclusion Edit. All rights reserved.
        {" · "}<Link href="/accessibility" style={{ color: "var(--gray-soft)" }}>Accessibility</Link>
        {" · "}<Link href="/privacy" style={{ color: "var(--gray-soft)" }}>Privacy</Link>
      </footer>

      {/* Sticky join banner for visitors */}
      <div
        role="complementary"
        aria-label="Membership call to action"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--charcoal)",
          color: "var(--white)",
          padding: "0.875rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          zIndex: 200,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", margin: 0 }}>
          <strong style={{ color: "var(--white)" }}>Unlock the full platform</strong> — 31 modules, tools, evidence resources and more.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "0.5rem 0.875rem", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px" }}>
            Sign in
          </Link>
          <Link href="/sign-up" style={{ background: "var(--sage)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none" }}>
            Join now →
          </Link>
        </div>
      </div>

      {/* Join modal */}
      {joinModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-title"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          onClick={(e) => { if (e.target === e.currentTarget) setJoinModalOpen(false); }}
        >
          <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2.5rem", maxWidth: "440px", width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
            <h2 id="join-modal-title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
              Members only
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--charcoal)" }}>{joinModalItem}</strong> is available to Impact Platform members.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Join to access all 31 modules, expert masterclasses, practical tools, and your EDI evidence library.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/sign-up" className="btn-primary" style={{ textAlign: "center" }}>
                Start your membership
              </Link>
              <Link href="/sign-in" className="btn-secondary" style={{ textAlign: "center" }}>
                Already a member? Sign in
              </Link>
              <button onClick={() => setJoinModalOpen(false)} style={{ background: "none", border: "none", color: "var(--gray-soft)", fontFamily: "var(--font-body)", fontSize: "0.875rem", cursor: "pointer", padding: "0.25rem" }}>
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
