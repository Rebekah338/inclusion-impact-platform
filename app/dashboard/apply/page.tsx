"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

/* ── Topic taxonomy (consistent with Learn section) ── */
const TOPIC_CHIPS = [
  "Race and Ethnicity",
  "Gender",
  "Disability",
  "Age",
  "Sexual Orientation and Gender Identity",
  "Religion and Belief",
  "Pregnancy and Maternity",
  "Neurodiversity",
  "Socioeconomic Background",
  "Mental Health",
  "Inclusion Practices",
];

/* ── Format chips ── */
const FORMAT_CHIPS = ["Guide", "Checklist", "Tool", "Reflection", "Survey", "Framework", "Glossary"];

/* ── Resource data ── */
type Resource = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  format: string;
  topics: string[];
  time: string;
};

const ALL_RESOURCES: Resource[] = [
  { id: "r1", icon: "🔍", title: "EDI Audit Tool", desc: "A structured self-assessment to identify gaps in your current EDI practice across recruitment, leadership, culture, and systems.", format: "Tool", topics: ["Inclusion Practices"], time: "30–45 min" },
  { id: "r2", icon: "⚖️", title: "Equality Impact Assessment Template", desc: "A ready-to-use EIA template for policy, project, or service changes with step-by-step guidance and example completions.", format: "Tool", topics: ["Inclusion Practices"], time: "20–60 min" },
  { id: "r3", icon: "📊", title: "EDI Data Collection Framework", desc: "How to collect, store, and use EDI data responsibly with sample questions, comms templates, and GDPR considerations.", format: "Framework", topics: ["Inclusion Practices"], time: "Reference" },
  { id: "r4", icon: "📣", title: "Business Case Builder", desc: "Structure your internal business case for EDI investment using evidence, ROI data, and narrative frameworks that resonate with decision-makers.", format: "Tool", topics: ["Inclusion Practices"], time: "45–60 min" },
  { id: "r5", icon: "🗓️", title: "30/60/90 Day EDI Action Planner", desc: "A practical planning tool for those new to an EDI role or kicking off a new strategy. Break your first quarter into focused, achievable steps.", format: "Tool", topics: ["Inclusion Practices"], time: "60 min" },
  { id: "r6", icon: "📐", title: "Inclusion Maturity Framework", desc: "Assess where your organisation sits on the inclusion maturity spectrum and identify the most impactful next steps.", format: "Framework", topics: ["Inclusion Practices"], time: "45 min" },
  { id: "r7", icon: "🎯", title: "Getting Started with EDI Strategy", desc: "A step-by-step guide to scoping, designing, and launching your first organisation-wide EDI strategy from baseline audit to board sign-off.", format: "Guide", topics: ["Inclusion Practices"], time: "20 min read" },
  { id: "r8", icon: "🗣️", title: "Talking to Sceptical Stakeholders", desc: "How to navigate resistance from senior leaders and budget holders with evidence-based arguments and conversation frameworks.", format: "Guide", topics: ["Inclusion Practices"], time: "10 min read" },
  { id: "r9", icon: "🌱", title: "Building an Inclusion Culture", desc: "Moving beyond policy to embed inclusion in everyday practice covering psychological safety, belonging, and manager behaviour.", format: "Guide", topics: ["Inclusion Practices"], time: "15 min read" },
  { id: "r10", icon: "🧩", title: "Intersectionality in Practice", desc: "How to apply an intersectional lens to your EDI work in research, policy, and practice without tokenism or oversimplification.", format: "Guide", topics: ["Inclusion Practices"], time: "15 min read" },
  { id: "r11", icon: "🤝", title: "Allyship: From Awareness to Action", desc: "A practical guide to building a culture of active allyship across your organisation: not just declarations, but sustainable behaviour change.", format: "Guide", topics: ["Inclusion Practices"], time: "12 min read" },
  { id: "r12", icon: "📋", title: "Inclusive Recruitment Checklist", desc: "Step-by-step guidance for each stage of your recruitment process from job design to onboarding. 47 checkpoints across 8 stages.", format: "Checklist", topics: ["Race and Ethnicity", "Gender", "Disability"], time: "15 min" },
  { id: "r13", icon: "✅", title: "Inclusive Meetings Checklist", desc: "Before, during, and after checks to ensure your meetings and workshops are accessible and inclusive to all participants.", format: "Checklist", topics: ["Disability", "Neurodiversity"], time: "5 min" },
  { id: "r14", icon: "🌐", title: "Accessible Communications Checklist", desc: "Ensure your internal and external comms, documents, emails, events, and social media are accessible to people with disabilities.", format: "Checklist", topics: ["Disability"], time: "10 min" },
  { id: "r15", icon: "📝", title: "Inclusive Job Description Checklist", desc: "Review any job description against 25 inclusion criteria: language, requirements, and structure.", format: "Checklist", topics: ["Gender", "Disability", "Race and Ethnicity"], time: "10 min" },
  { id: "r16", icon: "🎤", title: "Inclusive Event Planning Checklist", desc: "For conferences, training days, and team events: from venue access to dietary requirements and speaker diversity.", format: "Checklist", topics: ["Disability", "Religion and Belief"], time: "15 min" },
  { id: "r17", icon: "🔒", title: "EDI Policy Audit Checklist", desc: "A checklist to review your existing HR and people policies through an inclusion lens: identifying gaps, exclusionary language, and missed opportunities.", format: "Checklist", topics: ["Inclusion Practices"], time: "30 min" },
  { id: "r18", icon: "📖", title: "EDI Glossary", desc: "A comprehensive glossary of EDI terms, concepts, and definitions: from allyship to intersectionality, psychological safety to systemic racism.", format: "Glossary", topics: ["Inclusion Practices"], time: "Reference" },
  { id: "r19", icon: "🪞", title: "Guided Reflection Tool", desc: "A structured reflection tool to help you consolidate your learning, identify your next steps, and track your professional development journey.", format: "Reflection", topics: ["Inclusion Practices"], time: "20 min" },
  { id: "r20", icon: "📊", title: "Inclusion Culture Survey", desc: "Ready-to-use survey template for an inclusion pulse check: deploy internally, collect anonymised data, and receive analysis guidance.", format: "Survey", topics: ["Inclusion Practices"], time: "30 min" },
];

const FORMAT_ICONS: Record<string, string> = {
  Guide: "📖",
  Checklist: "✅",
  Tool: "🛠️",
  Reflection: "🪞",
  Survey: "📊",
  Framework: "📐",
  Glossary: "📖",
};

export default function ApplyPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [myToolkit, setMyToolkit] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [toolkitView, setToolkitView] = useState(false);

  /* ── Filter logic ── */
  const visibleResources = useMemo(() => {
    let pool = toolkitView
      ? ALL_RESOURCES.filter((r) => myToolkit.includes(r.id))
      : ALL_RESOURCES;

    const q = search.toLowerCase();
    if (q) pool = pool.filter((r) => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));
    if (activeTopics.length) pool = pool.filter((r) => r.topics.some((t) => activeTopics.includes(t)));
    if (activeFormats.length) pool = pool.filter((r) => activeFormats.includes(r.format));
    return pool;
  }, [search, activeTopics, activeFormats, myToolkit, toolkitView]);

  const toggleTopic = (t: string) =>
    setActiveTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const toggleFormat = (f: string) =>
    setActiveFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const toggleToolkit = (id: string) =>
    setMyToolkit((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));


  const RESOURCE_SLUGS: Record<string, string> = {
    r18: "edi-glossary",
  };

  const openResource = (id: string) => {
    if (!visited.includes(id)) setVisited((prev) => [...prev, id]);
    const slug = RESOURCE_SLUGS[id];
    if (slug) router.push(`/dashboard/apply/${slug}`);
  };

  const clearFilters = activeTopics.length > 0 || activeFormats.length > 0 || search;

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    fontSize: "0.8rem",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* ── Breadcrumb ── */}
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Apply</span>
      </nav>

      {/* ── Page header + filters ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.375rem" }}>Apply</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.5rem", maxWidth: "600px" }}>
            Tools, frameworks, guides, and checklists: everything you need to put your learning into practice.
          </p>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "1.25rem", maxWidth: "560px" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search tools, guides, checklists…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search resources"
              style={{ width: "100%", padding: "0.75rem 2.5rem 0.75rem 2.5rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "0.9rem", padding: "0.2rem" }}>✕</button>
            )}
          </div>

          {/* Topic chips — primary filter row */}
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-soft)", marginBottom: "0.5rem" }}>Filter by topic</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {TOPIC_CHIPS.map((t) => (
                <button key={t} onClick={() => toggleTopic(t)} style={chipStyle(activeTopics.includes(t))} aria-pressed={activeTopics.includes(t)}>
                  {activeTopics.includes(t) && <span aria-hidden="true">✓</span>}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Format chips + My Toolkit — secondary filter row */}
          <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--gray-border)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-soft)", marginRight: "0.25rem", alignSelf: "center" }}>Format:</span>
              {FORMAT_CHIPS.map((f) => (
                <button key={f} onClick={() => toggleFormat(f)} style={chipStyle(activeFormats.includes(f))} aria-pressed={activeFormats.includes(f)}>
                  {FORMAT_ICONS[f]} {f}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "32px", background: "var(--gray-border)", margin: "0 0.5rem", alignSelf: "center" }} aria-hidden="true" />

            {/* My Toolkit tab */}
            <button
              onClick={() => setToolkitView((v) => !v)}
              style={{
                ...chipStyle(toolkitView),
                background: toolkitView ? "var(--sage-dark)" : "var(--sage-xlight)",
                border: toolkitView ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--sage-light)",
                color: toolkitView ? "var(--white)" : "var(--sage-dark)",
              }}
              aria-pressed={toolkitView}
            >
              🔖 My Toolkit {myToolkit.length > 0 && <span style={{ background: toolkitView ? "rgba(255,255,255,0.25)" : "var(--sage-dark)", color: "var(--white)", borderRadius: "999px", padding: "0 0.4rem", fontSize: "0.7rem", fontWeight: 700 }}>{myToolkit.length}</span>}
            </button>
          </div>

          {/* Active filter summary + clear */}
          {clearFilters && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0", borderBottom: "1px solid var(--gray-border)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)" }}>
                Showing {visibleResources.length} {visibleResources.length === 1 ? "resource" : "resources"}
              </span>
              <button
                onClick={() => { setSearch(""); setActiveTopics([]); setActiveFormats([]); }}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Resource grid ── */}
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* My Toolkit empty state */}
        {toolkitView && myToolkit.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔖</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Your toolkit is empty</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", maxWidth: "380px", margin: "0 auto 1.5rem" }}>
              Bookmark any resource using the 🔖 icon on its card and it will appear here for quick access.
            </p>
            <button onClick={() => setToolkitView(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>
              Browse all resources
            </button>
          </div>
        )}

        {/* No results */}
        {!toolkitView && visibleResources.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1rem" }}>No resources match your current filters.</p>
            <button onClick={() => { setSearch(""); setActiveTopics([]); setActiveFormats([]); }} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Cards */}
        {visibleResources.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {visibleResources.map((r) => {
              const isVisited = visited.includes(r.id);
              const isBookmarked = myToolkit.includes(r.id);
              return (
                <div
                  key={r.id}
                  className="card"
                  style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: isVisited ? 0.85 : 1 }}
                >
                  {/* Visited badge */}
                  {isVisited && (
                    <span style={{ position: "absolute", top: "0.875rem", left: "0.875rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                      ✓ Visited
                    </span>
                  )}

                  {/* Bookmark + Share icons */}
                  <div style={{ position: "absolute", top: "0.875rem", right: "0.875rem", display: "flex", gap: "0.4rem" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleToolkit(r.id); }}
                      aria-label={isBookmarked ? "Remove from My Toolkit" : "Save to My Toolkit"}
                      title={isBookmarked ? "Remove from My Toolkit" : "Save to My Toolkit"}
                      style={{ background: isBookmarked ? "var(--sage-dark)" : "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "999px", padding: "0.3rem 0.55rem", cursor: "pointer", fontSize: "0.8rem", color: isBookmarked ? "var(--white)" : "var(--sage-dark)", lineHeight: 1 }}
                    >
                      🔖
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); /* share logic to be wired */ }}
                      aria-label="Share this resource"
                      title="Share this resource"
                      style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "999px", padding: "0.3rem 0.55rem", cursor: "pointer", fontSize: "0.8rem", color: "var(--sage-dark)", lineHeight: 1 }}
                    >
                      ↗
                    </button>
                  </div>

                  {/* Icon */}
                  <div style={{ fontSize: "1.75rem", marginTop: isVisited ? "1.25rem" : "0" }} aria-hidden="true">{r.icon}</div>

                  {/* Format badge */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px", width: "fit-content" }}>
                    {FORMAT_ICONS[r.format]} {r.format}
                  </span>

                  {/* Title */}
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", lineHeight: 1.35 }}>{r.title}</div>

                  {/* Description */}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>{r.desc}</p>

                  {/* Time + CTA */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--gray-border)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>⏱ {r.time}</span>
                    <button
                      className="btn-primary"
                      style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}
                      onClick={() => openResource(r.id)}
                    >
                      Open {r.format.toLowerCase()} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomBanner />
    </div>
  );
}