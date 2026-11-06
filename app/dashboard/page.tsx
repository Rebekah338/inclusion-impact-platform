"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";
import { searchContent, FEATURED_CONTENT, TYPE_LABELS } from "@/lib/content";
import { type Certificate, getCertificates, getCertificateName, setCertificateName, openCertificate, openCpdRecord } from "@/lib/certificates";

/* Dates that work themselves out: office hours (first Tuesday and third Thursday) and This Month in EDI (first Monday) */
function nthWeekday(year: number, month: number, weekday: number, n: number) {
  const d = new Date(year, month, 1);
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1);
  d.setDate(d.getDate() + 7 * (n - 1));
  return d;
}
function nextOfficeHours(from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let m = 0; m < 3; m++) {
    const y = from.getFullYear() + Math.floor((from.getMonth() + m) / 12), mo = (from.getMonth() + m) % 12;
    const found = [nthWeekday(y, mo, 2, 1), nthWeekday(y, mo, 4, 3)].find((d) => d >= today);
    if (found) return found;
  }
  return today;
}
function nextRoundUp(from = new Date()) {
  return nthWeekday(from.getFullYear() + (from.getMonth() === 11 ? 1 : 0), (from.getMonth() + 1) % 12, 1, 1);
}
const dayMonth = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const TYPE_ICON: Record<string, string> = { module: "book", masterclass: "video", tool: "wrench", resource: "chart" };

/* The eight areas of the platform, each with its own page photo */
const AREAS = [
  { href: "/dashboard/learn", image: "/learn-hero.jpg", title: "Learn", eyebrow: "CPD courses", desc: "Structured courses and short foundation lessons across three pathways.", meta: "31 modules", icon: "book" },
  { href: "/dashboard/watch", image: "/watch-hero.jpg", title: "Watch", eyebrow: "Video library", desc: "Expert-led videos you can apply the same week.", meta: "Coming soon", icon: "video", soon: true },
  { href: "/dashboard/inclusion-ai", image: "/inclusion-ai-hero.jpg", title: "Inclusion AI", eyebrow: "AI tools", desc: "Specialist tools for audits, business cases and fairer hiring.", meta: "9 tools", icon: "sparkle", ai: true },
  { href: "/dashboard/apply", image: "/apply-hero.jpg", title: "Apply", eyebrow: "Practical resources", desc: "Guides, checklists and toolkits to use in your work today.", meta: "41 resources", icon: "wrench" },
  { href: "/dashboard/evidence", image: "/make-the-case-hero.jpg", title: "Make the Case", eyebrow: "Evidence and ROI", desc: "Research, case studies and templates to win support for inclusion.", meta: "27 summaries", icon: "chart" },
  { href: "/dashboard/community", image: "/inclusion-editors-hero.jpg", title: "Inclusion Editors", eyebrow: "Member community", desc: "Ask questions, share small wins and find member perks.", meta: "Peer community", icon: "people" },
  { href: "/dashboard/support", image: "/get-support-hero.jpg", title: "Get Support", eyebrow: "Talk to a person", desc: "Office hours with an inclusion expert, twice a month.", meta: "30 minute calls", icon: "message" },
  { href: "/onboarding", image: "/onboarding-hero.jpg", title: "Inclusion Foundations", eyebrow: "Staff onboarding", desc: "A structured programme your whole team can work through.", meta: "Certificate", icon: "graduation" },
];

/* What do you need to do today? Hand-picked paths: learn it, use it, do it */
type Step = { kind: "Learn it" | "Use it" | "Do it"; title: string; why: string; href: string; icon: string; ai?: boolean };
const GOALS: { key: string; label: string; icon: string; steps: Step[] }[] = [
  { key: "case", label: "Make the case to leadership", icon: "chart", steps: [
    { kind: "Learn it", title: "The Business Case for Inclusion", why: "Understand the arguments that land with decision makers.", href: "/dashboard/learn/business-case-inclusion", icon: "book" },
    { kind: "Use it", title: "Business Case Essentials", why: "The research and real examples that make it convincing.", href: "/dashboard/evidence", icon: "chart" },
    { kind: "Do it", title: "Evidence Argument Builder", why: "Build a tailored, evidence-backed argument for your audience.", href: "/dashboard/evidence?tab=evidence-builder", icon: "scale", ai: true },
  ] },
  { key: "hire", label: "Hire more fairly", icon: "briefcase", steps: [
    { kind: "Learn it", title: "Recruit Inclusively", why: "Where bias creeps into hiring, and how to design it out.", href: "/dashboard/learn/recruit-inclusively", icon: "book" },
    { kind: "Use it", title: "Diverse Recruitment Checklist", why: "Checkpoints for before you advertise, during and after.", href: "/dashboard/apply/diverse-recruitment-checklist", icon: "checklist" },
    { kind: "Do it", title: "Job Spec Equity Check", why: "Get an equity review of your job description, with rewrites.", href: "/dashboard/inclusion-ai/jd-equity-checker", icon: "briefcase", ai: true },
  ] },
  { key: "policy", label: "Review or write a policy", icon: "clipboard", steps: [
    { kind: "Learn it", title: "Policy Audit", why: "What makes a policy inclusive in practice, not just on paper.", href: "/dashboard/learn/policy-audit", icon: "book" },
    { kind: "Use it", title: "Making Policies Inclusive", why: "Practical tips and a checklist for designing or auditing policies.", href: "/dashboard/apply/making-policies-inclusive", icon: "checklist" },
    { kind: "Do it", title: "Policy Equity Auditor", why: "An equity audit of your policy and a prioritised plan.", href: "/dashboard/inclusion-ai/policy-equity-auditor", icon: "clipboard", ai: true },
  ] },
  { key: "strategy", label: "Shape our inclusion strategy", icon: "map", steps: [
    { kind: "Learn it", title: "Building an EDI Strategy", why: "From aspiration to a plan your organisation can deliver.", href: "/dashboard/learn/edi-strategy", icon: "book" },
    { kind: "Use it", title: "Getting Started with EDI Strategy", why: "A step-by-step guide from baseline to board sign-off.", href: "/dashboard/apply/edi-strategy-guide", icon: "map" },
    { kind: "Do it", title: "Inclusion Strategy Builder", why: "Turn your priorities into a 12-month framework.", href: "/dashboard/inclusion-ai/inclusion-strategy-builder", icon: "map", ai: true },
  ] },
  { key: "difficult", label: "Handle a difficult situation", icon: "shield", steps: [
    { kind: "Learn it", title: "Speaking Up", why: "How to respond in the moment, and how to follow up.", href: "/dashboard/learn/speaking-up", icon: "book" },
    { kind: "Use it", title: "Challenging Non-Inclusive Behaviour", why: "Real language for real situations.", href: "/dashboard/apply/challenging-non-inclusive-behaviour", icon: "message" },
    { kind: "Do it", title: "Talk it through", why: "Ask the Editors anonymously, or book office hours with an inclusion expert.", href: "/dashboard/support#office-hours", icon: "people" },
  ] },
  { key: "confidence", label: "Build my own confidence", icon: "award", steps: [
    { kind: "Learn it", title: "Foundation lessons", why: "Short lessons you can finish in under 20 minutes.", href: "/dashboard/learn#foundation-lessons", icon: "book" },
    { kind: "Use it", title: "The Basics videos", why: "Four short videos for a quick, clear start.", href: "/dashboard/watch#start-here", icon: "video" },
    { kind: "Do it", title: "Take the Inclusion Pulse", why: "Five questions that point you to what to do next.", href: "/dashboard/pulse", icon: "pulse" },
  ] },
  { key: "team", label: "Support or onboard my team", icon: "people", steps: [
    { kind: "Learn it", title: "Inclusion Foundations Programme", why: "A structured programme your whole team can work through.", href: "/onboarding", icon: "graduation" },
    { kind: "Use it", title: "Inclusion Health Check", why: "See where your team or organisation is now.", href: "/dashboard/inclusion-ai/inclusion-health-check", icon: "pulse", ai: true },
    { kind: "Do it", title: "Book a Free Inclusion Call", why: "Talk to us about training or support for your teams.", href: "/dashboard/support#more-support", icon: "message" },
  ] },
];

function greeting(now = new Date()) {
  const h = now.getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default function DashboardPage() {
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [pinnedSummaries, setPinnedSummaries] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certName, setCertName] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [lastLearning, setLastLearning] = useState<{ href: string; title: string; date: string } | null>(null);
  const [hello, setHello] = useState("Welcome back");
  const pathRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHello(greeting());
    try {
      const raw = localStorage.getItem("tie_last_learning");
      if (raw) setLastLearning(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const chooseGoal = (key: string) => {
    setGoal((g) => (g === key ? null : key));
    setTimeout(() => pathRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  useEffect(() => {
    setCertificates(getCertificates());
    setCertName(getCertificateName());
    const onChange = () => setCertificates(getCertificates());
    window.addEventListener("tie_certificates_changed", onChange);
    return () => window.removeEventListener("tie_certificates_changed", onChange);
  }, []);

  /* Saved preferences and progress */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("a11y");
      if (saved) {
        const prefs = JSON.parse(saved);
        setDyslexiaMode(prefs.dyslexia || false);
        setLargeText(prefs.largeText || false);
      }
      const comp = localStorage.getItem("completedModules");
      const compLessons = localStorage.getItem("tie_completed_lessons");
      const merged = Array.from(new Set([...(comp ? JSON.parse(comp) : []), ...(compLessons ? JSON.parse(compLessons) : [])])) as string[];
      if (merged.length > 0) setCompletedModules(merged);
      const pins = localStorage.getItem("pinnedSummaries");
      if (pins) setPinnedSummaries(JSON.parse(pins));
    } catch { /* storage unavailable: keep defaults */ }
  }, []);

  /* Keep progress in sync when a lesson is completed during this visit */
  useEffect(() => {
    const handler = () => {
      try {
        const a = localStorage.getItem("completedModules");
        const b = localStorage.getItem("tie_completed_lessons");
        setCompletedModules(Array.from(new Set([...(a ? JSON.parse(a) : []), ...(b ? JSON.parse(b) : [])])) as string[]);
      } catch { /* ignore */ }
    };
    window.addEventListener("tie_completion_changed", handler);
    return () => window.removeEventListener("tie_completion_changed", handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dyslexia-mode", dyslexiaMode);
    document.body.classList.toggle("large-text", largeText);
    try { localStorage.setItem("a11y", JSON.stringify({ dyslexia: dyslexiaMode, largeText })); } catch { /* ignore */ }
  }, [dyslexiaMode, largeText]);

  useEffect(() => {
    const t = setInterval(() => setFeaturedIdx((i) => (i + 1) % FEATURED_CONTENT.length), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const results = searchContent(searchQuery);
    setSearchResults(results);
    setSearchOpen(results.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const featured = FEATURED_CONTENT[featuredIdx];
  const totalModules = 31;
  const completedCount = completedModules.length;
  const progressPct = Math.min(100, Math.round((completedCount / totalModules) * 100));
  const cpdHours = Math.round(certificates.reduce((sum, c) => sum + (c.cpdHours || 0), 0) * 100) / 100;

  const prefButton = (on: boolean, onClick: () => void, label: string, text: string) => (
    <button onClick={onClick} aria-pressed={on} aria-label={label} title={label}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.75rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: `1.5px solid ${on ? "var(--white)" : "rgba(255,255,255,0.55)"}`, background: on ? "var(--white)" : "transparent", color: on ? "var(--evergreen)" : "var(--white)" }}>
      {text}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO with search (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "400px", display: "flex", alignItems: "stretch", background: "var(--forest)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src="/dashboard-hero.jpg" alt="" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: "28%", width: "72%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 1.25rem", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
          {/* Greeting sits in the space above; the glass bar sits on the bottom edge */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
            Impact Platform: Your dashboard
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>{hello}{certName ? "," : "."}</span>{certName && <> <span style={{ color: "var(--hero-mint)" }}>{certName.split(" ")[0]}.</span></>}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "540px", margin: 0 }}>
            Everything you need for your inclusion work, in one place.
          </p>
          </div>

          {/* PROGRESS BAR: frosted glass along the bottom of the hero, high contrast for easy reading */}
          <div aria-label="Your progress and reading preferences" style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem 1.75rem", padding: "0.85rem 1.25rem", borderRadius: "var(--radius-lg)", background: "rgba(20,40,25,0.72)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--white)" }}>Your progress: {completedCount} of {totalModules} modules complete</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--hero-mint)", fontVariantNumeric: "lining-nums" }}>{progressPct}%</span>
              </div>
              <div role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalModules} aria-label="Module completion" style={{ height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
                <div style={{ width: `${progressPct}%`, height: "100%", background: "var(--hero-mint)", borderRadius: "999px", transition: "width 0.6s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {[
                { label: "CPD hours", value: String(cpdHours), icon: "clock" },
                { label: certificates.length === 1 ? "Certificate" : "Certificates", value: String(certificates.length), icon: "award" },
                { label: "Summaries pinned", value: String(pinnedSummaries.length), icon: "bookmark" },
              ].map((st) => (
                <span key={st.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--white)" }}>
                  <Icon name={st.icon} size={16} color="var(--hero-cream)" /> <strong style={{ fontFamily: "var(--font-heading)", fontVariantNumeric: "lining-nums" }}>{st.value}</strong> {st.label}
                </span>
              ))}
            </div>
            <div role="group" aria-label="Reading preferences" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--hero-cream)", marginRight: "0.2rem" }}>Reading</span>
              {prefButton(largeText, () => setLargeText(!largeText), "Larger text", "Larger text")}
              {prefButton(dyslexiaMode, () => setDyslexiaMode(!dyslexiaMode), "Dyslexia-friendly font", "Dyslexia font")}
            </div>
          </div>
        </div>
      </header>

      {/* Quick links under the hero */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0.75rem 1.5rem 0", display: "flex", justifyContent: "flex-end", gap: "1.25rem" }}>
        {[{ href: "/dashboard/saved", label: "Saved", icon: "bookmark" }, { href: "/dashboard/settings", label: "Settings", icon: "layers" }].map((l) => (
          <Link key={l.href} href={l.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)", textDecoration: "none", minHeight: "36px" }}>
            <Icon name={l.icon} size={15} color="var(--evergreen)" /> {l.label}
          </Link>
        ))}
      </div>

      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1.5rem 4.5rem" }}>

        {/* WHAT DO YOU NEED TO DO TODAY? goals, then search */}
        <section aria-labelledby="what-today" style={{ marginBottom: "2rem" }}>
          <h2 id="what-today" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.8vw, 1.85rem)", color: "var(--ink)", margin: "0 0 0.3rem", lineHeight: 1.2 }}>What do you need to do today?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--slate)", margin: "0 0 1rem" }}>Choose a goal and we will show you where to start, step by step.</p>
          {/* Goals: each opens a hand-picked three-step path below */}
          <div role="group" aria-label="Choose what you need to do" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {GOALS.map((g) => {
              const on = goal === g.key;
              return (
                <button key={g.key} onClick={() => chooseGoal(g.key)} aria-pressed={on} aria-controls="your-path"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", padding: "0.55rem 1rem", minHeight: "44px", borderRadius: "999px", cursor: "pointer", border: `1.5px solid ${on ? "var(--evergreen)" : "var(--line)"}`, background: on ? "var(--evergreen)" : "var(--white)", color: on ? "var(--white)" : "var(--ink)", boxShadow: on ? "none" : "var(--shadow-sm)" }}>
                  <Icon name={g.icon} size={16} color={on ? "var(--white)" : "var(--evergreen)"} /> {g.label}
                </button>
              );
            })}
            <Link href="/dashboard/pulse" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", padding: "0.55rem 1rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "999px", border: "1.5px dashed var(--evergreen)", color: "var(--evergreen)", background: "var(--pale-sage)", textDecoration: "none" }}>
              <Icon name="pulse" size={16} color="var(--evergreen)" /> Not sure? Take the Pulse
            </Link>
          </div>

          {/* Search across the whole platform */}
          <div ref={searchRef} style={{ position: "relative", maxWidth: "640px" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex", zIndex: 1 }}><Icon name="search" color="var(--slate)" /></span>
            <input type="search" placeholder="Or search courses, tools and resources" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)} aria-label="Search platform content"
              style={{ width: "100%", padding: "0.95rem 1.25rem 0.95rem 3rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--white)", color: "var(--ink)", boxSizing: "border-box" }} />
            {searchOpen && searchResults.length > 0 && (
              <div role="listbox" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", zIndex: 200, overflow: "hidden" }}>
                {searchResults.map((item) => (
                  <Link key={item.id} href={item.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", minHeight: "44px", textDecoration: "none", borderBottom: "1px solid var(--line)" }}>
                    <Icon name={TYPE_ICON[item.type] || "book"} size={18} color="var(--evergreen)" />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)" }}>{item.title}</span>
                      {item.subtitle && <span style={{ display: "block", fontSize: "0.8rem", color: "var(--slate)" }}>{item.subtitle}</span>}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--evergreen)", background: "var(--pale-sage)", padding: "0.2rem 0.55rem", borderRadius: "999px", whiteSpace: "nowrap" }}>{TYPE_LABELS[item.type]}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* YOUR PATH: the three steps for the goal chosen above */}
        {goal && (() => {
          const g = GOALS.find((x) => x.key === goal)!;
          return (
            <section id="your-path" ref={pathRef} aria-labelledby="your-path-title" style={{ marginBottom: "2rem", scrollMarginTop: "90px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", padding: "0.85rem 1.25rem", background: "var(--pale-sage)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--evergreen)" }}>
                <Icon name={g.icon} size={22} color="var(--evergreen)" />
                <h2 id="your-path-title" style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--evergreen)", margin: 0 }}>Your path: {g.label}</h2>
                <button onClick={() => setGoal(null)} aria-label="Close this path" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", minHeight: "40px" }}>
                  Close
                </button>
              </div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
                {g.steps.map((st, i) => (
                  <li key={st.title} style={{ display: "flex" }}>
                    <Link href={st.href} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem", background: "var(--white)", borderRadius: "var(--radius-md)", borderTop: "6px solid var(--evergreen)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", borderLeft: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: "1rem 1.15rem 1.1rem", textDecoration: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", border: "2px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--gold-deep)", fontVariantNumeric: "lining-nums" }}>{i + 1}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--evergreen)" }}>
                          {st.kind}{st.ai && <><span aria-hidden="true">·</span><Icon name="sparkle" size={12} color="var(--gold)" strokeWidth={2} /> Inclusion AI</>}
                        </span>
                      </span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink)", lineHeight: 1.3, marginTop: "0.2rem" }}>{st.title}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.5 }}>{st.why}</span>
                      <span style={{ marginTop: "auto", paddingTop: "0.4rem", display: "inline-flex", alignItems: "center", gap: "0.15rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)" }}>
                        {st.kind === "Learn it" ? "Start" : st.kind === "Use it" ? "Open" : "Go"} <Icon name="chevron" size={15} color="var(--evergreen)" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })()}

        {/* CONTINUE (or Today's focus) beside COMING UP */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {lastLearning ? (
            <section aria-labelledby="continue" className="focus-panel" style={{ gridColumn: "span 2", minWidth: 0, borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", boxShadow: "var(--shadow-feature)", padding: "1.5rem 1.75rem", color: "var(--white)", display: "flex", flexDirection: "column" }}>
              <h2 id="continue" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--hero-cream)", margin: 0 }}>
                <Icon name="play" size={15} color="var(--gold-light)" /> Continue where you left off
              </h2>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", lineHeight: 1.15, color: "var(--hero-cream)", margin: "0.75rem 0 0.35rem" }}>{lastLearning.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", margin: "0 0 1.1rem" }}>Last opened {shortDate(lastLearning.date)}. Pick up right where you were.</p>
              <Link href={lastLearning.href} style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--white)", color: "var(--evergreen)", textDecoration: "none" }}>
                Continue Learning
              </Link>
            </section>
          ) : (
          <section aria-labelledby="todays-focus" style={{ gridColumn: "span 2", minWidth: 0, borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", boxShadow: "var(--shadow-feature)", padding: "1.5rem 1.75rem", color: "var(--white)", display: "flex", flexDirection: "column" }} className="focus-panel">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <h2 id="todays-focus" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--hero-cream)", margin: 0 }}>
                  <Icon name="target" size={15} color="var(--gold-light)" /> Today&apos;s focus
                </h2>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  {FEATURED_CONTENT.map((f, i) => (
                    <button key={f.id} onClick={() => setFeaturedIdx(i)} aria-label={`Show focus ${i + 1}: ${f.title}`} aria-pressed={i === featuredIdx}
                      style={{ width: i === featuredIdx ? "20px" : "8px", height: "8px", borderRadius: "999px", background: i === featuredIdx ? "var(--gold-light)" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
                  ))}
                </div>
              </div>
              <div key={featured.id} style={{ animation: "fadeInUp 0.4s ease", margin: "0.9rem 0 1.1rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "999px", padding: "0.25rem 0.75rem" }}>{featured.pathway}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", lineHeight: 1.15, color: "var(--hero-cream)", margin: "0.6rem 0 0.35rem" }}>{featured.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.6, color: "rgba(255,255,255,0.88)", margin: 0 }}>{featured.tagline}</p>
              </div>
              <Link href={featured.href} style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--white)", color: "var(--evergreen)", textDecoration: "none" }}>
                Start Here
              </Link>
            </section>
          )}

          <section aria-labelledby="coming-up" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.35rem 1.5rem" }}>
            <h2 id="coming-up" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", margin: "0 0 0.9rem" }}>
              <Icon name="calendar" size={19} color="var(--evergreen)" /> Coming up
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: "message", title: "Office hours with an inclusion expert", when: `${dayMonth(nextOfficeHours())}, 2pm to 5pm UK`, href: "/dashboard/support#office-hours", cta: "Book a time" },
                { icon: "book", title: "This Month in EDI", when: `Published ${dayMonth(nextRoundUp())}`, href: "/dashboard/community", cta: "Go to the Editors" },
              ].map((i) => (
                <li key={i.title} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "50%", background: "var(--pale-sage)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={i.icon} size={17} color="var(--evergreen)" /></span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.35 }}>{i.title}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--slate)", margin: "0.1rem 0 0.2rem" }}>{i.when}</div>
                    <Link href={i.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.15rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.84rem", color: "var(--evergreen)", textDecoration: "none" }}>{i.cta} <Icon name="chevron" size={14} color="var(--evergreen)" /></Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* YOUR CERTIFICATES */}
        <div style={{ marginBottom: "2.5rem" }}>
          <section aria-labelledby="certificates" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.35rem 1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.6rem 1rem", marginBottom: "0.9rem" }}>
              <h2 id="certificates" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", margin: 0 }}>
                <Icon name="award" size={20} color="var(--gold-deep)" /> Your certificates
              </h2>
              {certificates.length > 0 && (
                <button onClick={() => openCpdRecord(certificates, certName)} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", padding: "0.5rem 1rem", minHeight: "40px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--evergreen)", background: "var(--white)", color: "var(--evergreen)", cursor: "pointer" }}>
                  Download CPD Record
                </button>
              )}
            </div>
            {certificates.length === 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem 1.25rem", background: "var(--linen)", border: "1.5px dashed var(--gold)", borderRadius: "var(--radius-md)", padding: "1rem 1.2rem" }}>
                <p style={{ flex: "1 1 300px", fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.55, color: "var(--slate)", margin: 0 }}>
                  Finish a course to earn your first certificate. Every certificate is kept here, ready to download for appraisals and your CPD record.
                </p>
                <Link href="/dashboard/learn" style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", textDecoration: "none" }}>
                  Browse courses <Icon name="chevron" size={15} color="var(--evergreen)" />
                </Link>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "0.85rem" }}>
                  {[...certificates].sort((a, b) => b.date.localeCompare(a.date)).map((c) => (
                    <article key={c.id} style={{ display: "flex", flexDirection: "column", gap: "0.35rem", background: "var(--linen)", borderTop: "3px solid var(--gold)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", borderLeft: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem 1rem" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-deep)" }}>{c.kind === "programme" ? "Programme" : c.pathway || "Course"}</span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.08rem", color: "var(--ink)", lineHeight: 1.25, margin: 0 }}>{c.title}</h3>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--slate)" }}>
                        Completed {shortDate(c.date)}{c.cpdHours ? ` · ${c.cpdHours} CPD ${c.cpdHours === 1 ? "hour" : "hours"}` : ""}
                      </span>
                      <button onClick={() => openCertificate(c, certName)} style={{ marginTop: "0.35rem", alignSelf: "flex-start", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", padding: "0.5rem 1rem", minHeight: "40px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--evergreen)", color: "var(--white)", cursor: "pointer" }}>
                        Download
                      </button>
                    </article>
                  ))}
                </div>
                <label style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginTop: "0.9rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
                  Name on your certificates
                  <input value={certName} onChange={(e) => { setCertName(e.target.value); setCertificateName(e.target.value); }} placeholder="Your full name"
                    style={{ flex: "0 1 260px", fontFamily: "var(--font-body)", fontSize: "0.92rem", padding: "0.45rem 0.7rem", minHeight: "38px", border: "1.5px solid var(--line)", borderRadius: "var(--radius-sm)", color: "var(--ink)" }} />
                </label>
              </>
            )}
          </section>
        </div>

        {/* EXPLORE THE PLATFORM: photo cards, four across */}
        <section aria-labelledby="explore" style={{ marginBottom: "2.5rem" }}>
          <h2 id="explore" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.8vw, 1.85rem)", color: "var(--ink)", margin: "0 0 1rem", lineHeight: 1.2 }}>Explore the platform</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {AREAS.map((a) => (
              <Link key={a.href} href={a.href} style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-md)", overflow: "hidden", borderTop: "6px solid var(--evergreen)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", borderLeft: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                <div style={{ position: "relative", height: "120px", background: "var(--forest)" }}>
                  <img src={a.image} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--photo-tint)" }} />
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,40,25,0) 40%, rgba(20,40,25,0.7) 100%)" }} />
                  <span style={{ position: "absolute", left: "0.85rem", bottom: "0.7rem", width: "36px", height: "36px", borderRadius: "50%", background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={a.icon} size={18} color={a.ai ? "var(--gold-deep)" : "var(--evergreen)"} strokeWidth={a.ai ? 2 : 1.75} />
                  </span>
                  {a.soon && <span style={{ position: "absolute", top: "0.6rem", right: "0.7rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "var(--gold)", color: "var(--ink)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Coming soon</span>}
                </div>
                <div style={{ padding: "0.85rem 1.05rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--evergreen)" }}>
                    {a.ai && <Icon name="sparkle" size={12} color="var(--gold)" strokeWidth={2} />} {a.eyebrow}
                  </span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)" }}>{a.title}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", lineHeight: 1.5 }}>{a.desc}</span>
                  <span style={{ marginTop: "auto", paddingTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--slate)" }}>{a.meta}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.15rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)" }}>Explore <Icon name="chevron" size={15} color="var(--evergreen)" /></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PINNED SUMMARIES */}
        <section aria-labelledby="pinned">
          <h2 id="pinned" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", margin: "0 0 0.85rem" }}>
            <Icon name="bookmark" size={19} color="var(--evergreen)" /> Your pinned summaries
          </h2>
          {pinnedSummaries.length === 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem 1.25rem", background: "var(--white)", border: "1.5px dashed var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem 1.35rem" }}>
              <p style={{ flex: "1 1 300px", fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--slate)", margin: 0 }}>Key learnings you pin after completing a module will appear here, ready for your next meeting.</p>
              <Link href="/dashboard/learn" style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", textDecoration: "none" }}>
                Start your first module <Icon name="chevron" size={15} color="var(--evergreen)" />
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {pinnedSummaries.map((pin) => (
                <div key={pin} style={{ background: "var(--white)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--evergreen)", borderTop: "1px solid var(--line)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "0.9rem 1.05rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)" }}>{pin}</div>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomBanner />

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 760px) { .focus-panel { grid-column: auto !important; } }
      `}</style>
    </div>
  );
}
