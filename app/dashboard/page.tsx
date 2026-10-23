"use client";


import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchContent, CONTENT, FEATURED_CONTENT, TYPE_ICONS, TYPE_LABELS } from "@/lib/content";

const TRENDING = [
  "psychological safety", "power & privilege", "inclusive recruitment",
  "EDI strategy", "neurodiversity", "pay gap", "allyship",
];

export default function DashboardPage() {
  
  const firstName = "there";

  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchContent>>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Today's focus rotation
  const [featuredIdx, setFeaturedIdx] = useState(0);

  // Milestone celebration
  const [milestone, setMilestone] = useState<string | null>(null);

  // Completed modules (persisted in localStorage)
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [pinnedSummaries, setPinnedSummaries] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("a11y");
    if (saved) {
      const prefs = JSON.parse(saved);
      setDyslexiaMode(prefs.dyslexia || false);
      setLargeText(prefs.largeText || false);
    }
    const comp = localStorage.getItem("completedModules");
    if (comp) setCompletedModules(JSON.parse(comp));
    const pins = localStorage.getItem("pinnedSummaries");
    if (pins) setPinnedSummaries(JSON.parse(pins));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dyslexia-mode", dyslexiaMode);
    document.body.classList.toggle("large-text", largeText);
    localStorage.setItem("a11y", JSON.stringify({ dyslexia: dyslexiaMode, largeText }));
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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const featured = FEATURED_CONTENT[featuredIdx];
  const totalModules = 31;
  const completedCount = completedModules.length;
  const progressPct = Math.round((completedCount / totalModules) * 100);

  const sections = [
    { href: "/dashboard/learn", icon: "📚", title: "Learn", subtitle: "CPD Modules", desc: "31 structured learning modules across three pathways.", count: `${completedCount}/${totalModules}` },
    { href: "/dashboard/watch", icon: "🎥", title: "Watch", subtitle: "Masterclasses", desc: "Expert-led video masterclasses on inclusive practice.", count: "Coming soon" },
    { href: "/dashboard/apply", icon: "🛠️", title: "Apply", subtitle: "Tools & Frameworks", desc: "Interactive tools, guides, checklists, and frameworks for your work.", count: "18 resources" },
    { href: "/dashboard/evidence", icon: "📊", title: "Make the Case", subtitle: "Evidence & ROI", desc: "Research, data, case studies and downloadable resources for building your business case.", count: "15 resources" },
    { href: "/dashboard/community", icon: "🗣️", title: "The Inclusion Editors", subtitle: "Peer Community", desc: "Ask questions, share experiences, and read insights from Rebekah and the community.", count: "Community" },
    { href: "/dashboard/support", icon: "🤝", title: "Get Support", subtitle: "Coaching & Office Hours", desc: "Book office hours with Rebekah, enquire about coaching, or join a live event.", count: "3 slots/week" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)", paddingBottom: "5rem" }}>

      {/* Top nav */}
      <nav role="navigation" aria-label="Platform navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" aria-label="Home" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          THE INCLUSION EDIT
          <span style={{ color: "var(--sage)", marginLeft: "0.5rem", fontWeight: 400 }}>· Impact Platform</span>
        </Link>

        {/* Search */}
        <div ref={searchRef} style={{ position: "relative", flex: "0 1 340px" }}>
          <input
            type="search"
            placeholder="Search modules, tools…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
            aria-label="Search platform content"
            style={{ width: "100%", padding: "0.4rem 1rem 0.4rem 2.25rem", borderRadius: "999px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.85rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none" }}
          />
          <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.8rem" }}>🔍</span>
          {searchOpen && searchResults.length > 0 && (
            <div role="listbox" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden" }}>
              {searchResults.map((item) => (
                <Link key={item.id} href={item.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", textDecoration: "none", borderBottom: "1px solid var(--gray-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-xlight)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <span aria-hidden="true">{TYPE_ICONS[item.type]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--charcoal)" }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: "0.72rem", color: "var(--gray-soft)" }}>{item.subtitle}</div>}
                  </div>
                  <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-light)", padding: "0.15rem 0.5rem", borderRadius: "999px", whiteSpace: "nowrap" }}>{TYPE_LABELS[item.type]}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Accessibility toolbar */}
          <div role="group" aria-label="Accessibility options" style={{ display: "flex", gap: "0.375rem" }}>
            <button onClick={() => setLargeText(!largeText)} aria-pressed={largeText} aria-label="Toggle large text" title="Larger text"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", padding: "0.25rem 0.5rem", borderRadius: "6px", border: "1.5px solid var(--gray-border)", background: largeText ? "var(--sage-light)" : "transparent", color: largeText ? "var(--sage-dark)" : "var(--gray-soft)", cursor: "pointer" }}>
              A+
            </button>
            <button onClick={() => setDyslexiaMode(!dyslexiaMode)} aria-pressed={dyslexiaMode} aria-label="Toggle dyslexia-friendly font" title="Dyslexia-friendly font"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.67rem", padding: "0.25rem 0.5rem", borderRadius: "6px", border: "1.5px solid var(--gray-border)", background: dyslexiaMode ? "var(--sage-light)" : "transparent", color: dyslexiaMode ? "var(--sage-dark)" : "var(--gray-soft)", cursor: "pointer" }}>
              Dy
            </button>
          </div>
          <Link href="/dashboard/pulse" style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, textDecoration: "none" }}>Inclusion Pulse</Link>
          <Link href="/dashboard/saved" style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>Saved</Link>
          <Link href="/dashboard/settings" style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>Settings</Link>
          
        </div>
      </nav>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* Welcome + milestone */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.25rem" }}>
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem" }}>
            What would you like to work on today?
          </p>
        </div>

        {/* Milestone celebration */}
        {milestone && (
          <div role="status" aria-live="polite" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1.5px solid #86efac", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", animation: "fadeInUp 0.4s ease" }}>
            <span style={{ fontSize: "2rem" }}>🎉</span>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#166534", fontSize: "1rem" }}>{milestone}</div>
              <div style={{ fontFamily: "var(--font-body)", color: "#16a34a", fontSize: "0.875rem" }}>Keep up the great work!</div>
            </div>
            <button onClick={() => setMilestone(null)} aria-label="Dismiss" style={{ marginLeft: "auto", background: "none", border: "none", color: "#16a34a", cursor: "pointer", fontSize: "1.25rem" }}>×</button>
          </div>
        )}

        {/* Progress + stats */}
        <div className="card" style={{ marginBottom: "1.5rem", padding: "1.5rem" }} aria-label="Your learning progress">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)" }}>Your progress</span>
            <span style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>{completedCount} of {totalModules} modules complete</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalModules} aria-label="Module completion">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%`, transition: "width 0.6s ease" }} />
          </div>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: "Modules completed", value: String(completedCount) },
              { label: "CPD hours", value: String(completedCount * 1) },
              { label: "Pathways started", value: completedCount > 0 ? "1" : "0" },
              { label: "Resources saved", value: "0" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "var(--sage-dark)" }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Focus */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", margin: 0 }}>✨ Today's Focus</h2>
            <div style={{ display: "flex", gap: "0.375rem" }}>
              {FEATURED_CONTENT.map((_, i) => (
                <button key={i} onClick={() => setFeaturedIdx(i)} aria-label={`Featured item ${i + 1}`}
                  style={{ width: i === featuredIdx ? "18px" : "7px", height: "7px", borderRadius: "999px", background: i === featuredIdx ? "var(--sage-dark)" : "var(--gray-border)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
          </div>
          <div key={featured.id} style={{ background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage-mid) 100%)", borderRadius: "14px", padding: "1.75rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", animation: "fadeInUp 0.4s ease" }}>
            <div>
              <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "var(--white)", marginBottom: "0.625rem", display: "inline-block" }}>{featured.pathway}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--white)", marginBottom: "0.375rem" }}>{featured.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", margin: 0 }}>{featured.tagline}</p>
            </div>
            <Link href={featured.href} style={{ background: "var(--white)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.625rem 1.25rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              Start module →
            </Link>
          </div>
        </div>

        {/* Trending topics */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "0.75rem" }}>🔥 Trending this week</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {TRENDING.map((tag) => (
              <button key={tag} onClick={() => setSearchQuery(tag)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", padding: "0.375rem 0.875rem", borderRadius: "999px", border: "1.5px solid var(--gray-border)", background: "var(--white)", color: "var(--charcoal-mid)", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--sage-light)"; e.currentTarget.style.borderColor = "var(--sage)"; e.currentTarget.style.color = "var(--sage-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.borderColor = "var(--gray-border)"; e.currentTarget.style.color = "var(--charcoal-mid)"; }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Section cards */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
          Explore the platform
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card" style={{ textDecoration: "none", display: "block" }} aria-label={`${s.title} ${s.subtitle}`}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.625rem" }} aria-hidden="true">{s.icon}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.2rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)" }}>{s.title}</span>
                <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{s.count}</span>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{s.subtitle}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              <div style={{ marginTop: "0.875rem", fontSize: "0.85rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)" }}>Explore →</div>
            </Link>
          ))}
        </div>

        {/* Inclusion Pulse CTA */}
        <div style={{ background: "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage-mid) 100%)", borderRadius: "12px", padding: "1.25rem 1.75rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", marginBottom: "0.2rem" }}>🌡 Take the Inclusion Pulse</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", margin: 0 }}>5 quick questions to find your best starting point.</p>
          </div>
          <Link href="/dashboard/pulse" style={{ background: "var(--white)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", padding: "0.6rem 1.25rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Start →</Link>
        </div>

        {/* Pinned summaries */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "0.75rem" }}>
          📌 Pinned summaries
        </h2>
        {pinnedSummaries.length === 0 ? (
          <div className="card" style={{ background: "var(--white)", border: "1px dashed var(--gray-border)", textAlign: "center", padding: "2.5rem" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📌</div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", margin: "0 0 1rem" }}>Key learnings you pin after completing a module will appear here.</p>
            <Link href="/dashboard/learn" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--sage-dark)", textDecoration: "none" }}>
              Start your first module →
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {pinnedSummaries.map((pin) => (
              <div key={pin} className="card" style={{ borderLeft: "3px solid var(--sage)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)" }}>{pin}</div>
              </div>
            ))}
          </div>
        )}

      {/* REQUEST A NEW RESOURCE */}
      <section style={{ padding: "3rem 1.5rem", background: "var(--sage-xlight)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{
            borderRadius: "18px", padding: "2.25rem 2.5rem",
            background: "linear-gradient(135deg, #2A4A30 0%, #3D6142 100%)",
            boxShadow: "0 6px 32px rgba(42,74,48,0.2)",
            display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "var(--white)", marginBottom: "0.4rem" }}>
                💡 Request a new resource
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>
                Is there a topic, tool, or resource you&apos;d love to see on the platform? Let us know and we&apos;ll prioritise it.
              </div>
            </div>
            <a href="mailto:hello@theinclusionedit.com?subject=Resource%20Request"
              style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", background: "var(--white)", color: "var(--sage-dark)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>
              Send a request →
            </a>
          </div>
        </div>
      </section>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
