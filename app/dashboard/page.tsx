"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";
import { searchContent, FEATURED_CONTENT, TYPE_LABELS } from "@/lib/content";

/* Popular topics: quick searches (a fixed list, so it is labelled "popular", not "trending") */
const POPULAR = ["psychological safety", "inclusive recruitment", "EDI strategy", "neurodiversity", "pay gap", "allyship"];

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

  const prefButton = (on: boolean, onClick: () => void, label: string, text: string) => (
    <button onClick={onClick} aria-pressed={on} aria-label={label} title={label}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", padding: "0.35rem 0.75rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: `1.5px solid ${on ? "var(--evergreen)" : "var(--line)"}`, background: on ? "var(--evergreen)" : "var(--white)", color: on ? "var(--white)" : "var(--ink)" }}>
      {text}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO with search (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", background: "var(--forest)", zIndex: 5 }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src="/dashboard-hero.jpg" alt="" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: "28%", width: "72%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 2.75rem", width: "100%", boxSizing: "border-box" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
            Impact Platform: Your dashboard
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Welcome</span> <span style={{ color: "var(--hero-mint)" }}>back.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "540px", margin: "0 0 1.25rem" }}>
            What would you like to work on today?
          </p>

          {/* Search across the whole platform */}
          <div ref={searchRef} style={{ position: "relative", maxWidth: "560px" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex", zIndex: 1 }}><Icon name="search" color="var(--slate)" /></span>
            <input type="search" placeholder="Search courses, tools and resources" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)} aria-label="Search platform content"
              style={{ width: "100%", padding: "0.95rem 1.25rem 0.95rem 3rem", borderRadius: "var(--radius-md)", border: "none", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--white)", color: "var(--ink)", boxSizing: "border-box", boxShadow: "var(--shadow-md)" }} />
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
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem", marginTop: "0.85rem" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--hero-cream)", marginRight: "0.25rem" }}>Popular</span>
            {POPULAR.map((tag) => (
              <button key={tag} onClick={() => setSearchQuery(tag)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", padding: "0.35rem 0.8rem", minHeight: "32px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "var(--white)", cursor: "pointer", backdropFilter: "blur(4px)" }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* PROGRESS STRIP (as on Onboarding) with reading preferences */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "1.15rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem 2rem" }}>
          <div style={{ flex: "1 1 380px", minWidth: 0 }} aria-label="Your learning progress">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.45rem", gap: "1rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)" }}>Your progress: {completedCount} of {totalModules} modules complete</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--evergreen)", fontVariantNumeric: "lining-nums" }}>{progressPct}%</span>
            </div>
            <div role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalModules} aria-label="Module completion" style={{ height: "8px", borderRadius: "999px", background: "var(--line)", overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "var(--evergreen)", borderRadius: "999px", transition: "width 0.6s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "CPD hours", value: String(completedCount), icon: "clock" },
              { label: "Summaries pinned", value: String(pinnedSummaries.length), icon: "bookmark" },
            ].map((s) => (
              <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)" }}>
                <Icon name={s.icon} size={17} color="var(--evergreen)" /> <strong style={{ fontFamily: "var(--font-heading)", color: "var(--ink)", fontVariantNumeric: "lining-nums" }}>{s.value}</strong> {s.label}
              </span>
            ))}
          </div>
          <div role="group" aria-label="Reading preferences" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)", marginRight: "0.2rem" }}>Reading</span>
            {prefButton(largeText, () => setLargeText(!largeText), "Larger text", "Larger text")}
            {prefButton(dyslexiaMode, () => setDyslexiaMode(!dyslexiaMode), "Dyslexia-friendly font", "Dyslexia font")}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {[{ href: "/dashboard/saved", label: "Saved", icon: "bookmark" }, { href: "/dashboard/settings", label: "Settings", icon: "layers" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", textDecoration: "none", minHeight: "36px" }}>
                <Icon name={l.icon} size={15} color="var(--evergreen)" /> {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 4.5rem" }}>

        {/* ORIENTATION ROW: Today's focus beside the Inclusion Pulse */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
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

          <section aria-labelledby="pulse" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.5rem 1.6rem", display: "flex", flexDirection: "column" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--pale-sage)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="pulse" size={21} color="var(--evergreen)" /></span>
            <h2 id="pulse" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", margin: "0.75rem 0 0.35rem" }}>Not sure where to start?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--slate)", margin: "0 0 1rem" }}>Take the Inclusion Pulse: five quick questions that point you to your best starting point.</p>
            <Link href="/dashboard/pulse" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--evergreen)", color: "var(--white)", textDecoration: "none" }}>
              Take the Pulse
            </Link>
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
