"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const pathways = [
  {
    id: "people-culture",
    title: "People & Culture",
    color: "#2A6B3A",
    bg: "var(--sage-light)",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    icon: "🤝",
    modules: [
      { id: "psychological-safety", title: "Psychological Safety", duration: "45 min", cpd: "0.75 hrs", tags: ["Belonging", "Culture", "Wellbeing"] },
      { id: "belonging", title: "Belonging at Work", duration: "50 min", cpd: "0.75 hrs", tags: ["Belonging", "Culture"] },
      { id: "allyship", title: "Active Allyship", duration: "40 min", cpd: "0.75 hrs", tags: ["Allyship", "Race", "LGBTQ+"] },
      { id: "microaggressions", title: "Microaggressions & Micro-affirmations", duration: "55 min", cpd: "1 hr", tags: ["Bias", "Race", "Language"] },
      { id: "power-privilege", title: "Power & Privilege", duration: "60 min", cpd: "1 hr", tags: ["Bias", "Race", "Culture"] },
      { id: "unconscious-bias", title: "Unconscious Bias", duration: "50 min", cpd: "0.75 hrs", tags: ["Bias"] },
      { id: "inclusive-language", title: "Inclusive Language", duration: "40 min", cpd: "0.75 hrs", tags: ["Language", "Culture"] },
      { id: "cultural-competence", title: "Cultural Competence", duration: "55 min", cpd: "1 hr", tags: ["Culture", "Race"] },
    ],
  },
  {
    id: "systems-processes",
    title: "Systems & Processes",
    color: "#5a4a7a",
    bg: "#f0eef8",
    thumbnailBg: "linear-gradient(135deg, #5a4a7a 0%, #7b6fa0 100%)",
    icon: "⚙️",
    modules: [
      { id: "inclusive-recruitment", title: "Inclusive Recruitment", duration: "60 min", cpd: "1 hr", tags: ["Recruitment", "Policy"] },
      { id: "pay-gap-reporting", title: "Pay Gap Reporting & Analysis", duration: "55 min", cpd: "1 hr", tags: ["Data & Evidence", "Policy"] },
      { id: "edi-data", title: "Collecting & Using EDI Data", duration: "50 min", cpd: "0.75 hrs", tags: ["Data & Evidence"] },
      { id: "policy-audit", title: "Policy Auditing for Inclusion", duration: "45 min", cpd: "0.75 hrs", tags: ["Policy"] },
      { id: "reasonable-adjustments", title: "Reasonable Adjustments", duration: "50 min", cpd: "0.75 hrs", tags: ["Disability", "Policy"] },
      { id: "complaints-process", title: "Inclusive Complaints Processes", duration: "45 min", cpd: "0.75 hrs", tags: ["Policy"] },
      { id: "supplier-diversity", title: "Supplier Diversity", duration: "40 min", cpd: "0.75 hrs", tags: ["Strategy", "Recruitment"] },
      { id: "equality-impact", title: "Equality Impact Assessments", duration: "55 min", cpd: "1 hr", tags: ["Data & Evidence", "Policy"] },
      { id: "menopause-policy", title: "Menopause & Workplace Policy", duration: "45 min", cpd: "0.75 hrs", tags: ["Policy", "Wellbeing"] },
      { id: "neuroinclusivity", title: "Neuroinclusion in Practice", duration: "50 min", cpd: "0.75 hrs", tags: ["Neurodiversity", "Policy"] },
    ],
  },
  {
    id: "leadership-strategy",
    title: "Leadership & Strategy",
    color: "#8a5a28",
    bg: "#fdf3e8",
    thumbnailBg: "linear-gradient(135deg, #8a5a28 0%, #b07d4a 100%)",
    icon: "🎯",
    modules: [
      { id: "edi-strategy", title: "Building an EDI Strategy", duration: "70 min", cpd: "1.25 hrs", tags: ["Strategy", "Leadership"] },
      { id: "stakeholder-engagement", title: "Stakeholder Engagement for EDI", duration: "55 min", cpd: "1 hr", tags: ["Leadership", "Strategy"] },
      { id: "roi-inclusion", title: "The ROI of Inclusion", duration: "60 min", cpd: "1 hr", tags: ["Strategy", "Data & Evidence"] },
      { id: "board-accountability", title: "Board-Level Accountability", duration: "50 min", cpd: "0.75 hrs", tags: ["Leadership", "Strategy"] },
      { id: "intersectionality", title: "Intersectionality in Practice", duration: "65 min", cpd: "1 hr", tags: ["Race", "Disability", "Culture"] },
      { id: "edi-governance", title: "EDI Governance Frameworks", duration: "55 min", cpd: "1 hr", tags: ["Strategy", "Policy", "Leadership"] },
      { id: "anti-racism", title: "Anti-Racism in Organisations", duration: "70 min", cpd: "1.25 hrs", tags: ["Race", "Culture", "Leadership"] },
      { id: "change-management", title: "Change Management for Inclusion", duration: "60 min", cpd: "1 hr", tags: ["Leadership", "Strategy"] },
      { id: "measuring-impact", title: "Measuring Inclusion Impact", duration: "55 min", cpd: "1 hr", tags: ["Data & Evidence", "Strategy"] },
      { id: "psychological-contract", title: "The Psychological Contract", duration: "50 min", cpd: "0.75 hrs", tags: ["Culture", "Leadership"] },
      { id: "edi-communications", title: "Communicating EDI Internally", duration: "45 min", cpd: "0.75 hrs", tags: ["Language", "Leadership"] },
      { id: "resilience-wellbeing", title: "EDI & Workplace Wellbeing", duration: "50 min", cpd: "0.75 hrs", tags: ["Wellbeing", "Culture"] },
      { id: "global-edi", title: "Global EDI Cross-Cultural Contexts", duration: "65 min", cpd: "1 hr", tags: ["Culture", "Race", "Strategy"] },
    ],
  },
];

const ALL_TAGS = [
  "Allyship", "Belonging", "Bias", "Culture", "Data & Evidence",
  "Disability", "Language", "Leadership", "LGBTQ+", "Neurodiversity",
  "Policy", "Race", "Recruitment", "Strategy", "Wellbeing",
];

const allModules = pathways.flatMap((p) =>
  p.modules.map((m, idx) => ({ ...m, pathway: p, indexInPathway: idx }))
);

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return pathways.map((pathway) => ({
      ...pathway,
      modules: pathway.modules.filter((mod) => {
        const matchesSearch = !q || mod.title.toLowerCase().includes(q) || mod.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTag = !activeTag || mod.tags.includes(activeTag);
        return matchesSearch && matchesTag;
      }),
    })).filter((p) => p.modules.length > 0);
  }, [search, activeTag]);

  const totalVisible = filtered.reduce((sum, p) => sum + p.modules.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* PAGE HEADER */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2.5rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
            ← Back to dashboard
          </Link>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--charcoal)", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                Explore Modules
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem" }}>
                31 CPD-accredited modules across three learning pathways.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {pathways.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.75rem", borderRadius: "999px", background: p.bg, fontSize: "0.72rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: p.color, whiteSpace: "nowrap" }}>
                  <span aria-hidden="true">{p.icon}</span> {p.title}
                </div>
              ))}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search modules by title or topic…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search modules"
              style={{
                width: "100%",
                padding: "0.9rem 1.25rem 0.9rem 3rem",
                borderRadius: "12px",
                border: "1.5px solid var(--gray-border)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                background: "var(--sage-xlight)",
                color: "var(--charcoal)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1.1rem", padding: "0.25rem" }}
              >
                ✕
              </button>
            )}
          </div>

          {/* TOPIC TAG PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem" }}>
            <button
              onClick={() => setActiveTag(null)}
              style={{
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
                padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
                borderColor: !activeTag ? "var(--sage-dark)" : "var(--gray-border)",
                background: !activeTag ? "var(--sage-dark)" : "transparent",
                color: !activeTag ? "var(--white)" : "var(--charcoal)",
                transition: "all 0.15s",
              }}
            >
              All modules
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
                  padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
                  borderColor: activeTag === tag ? "var(--sage-dark)" : "var(--gray-border)",
                  background: activeTag === tag ? "var(--sage-dark)" : "transparent",
                  color: activeTag === tag ? "var(--white)" : "var(--charcoal)",
                  transition: "all 0.15s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODULES */}
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* Results count */}
        {(search || activeTag) && (
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>
            {totalVisible === 0 ? "No modules found" : `${totalVisible} module${totalVisible === 1 ? "" : "s"} found`}
            {activeTag && <> in <strong style={{ color: "var(--charcoal)" }}>{activeTag}</strong></>}
            {search && <> matching <strong style={{ color: "var(--charcoal)" }}>&ldquo;{search}&rdquo;</strong></>}
            <button onClick={() => { setSearch(""); setActiveTag(null); }} style={{ marginLeft: "0.75rem", fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear filters
            </button>
          </p>
        )}

        {totalVisible === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)" }}>No modules match your search</p>
            <p>Try a different keyword or clear your filters.</p>
          </div>
        )}

        {filtered.map((pathway) => (
          <section key={pathway.id} style={{ marginBottom: "3rem" }} aria-labelledby={`pathway-${pathway.id}`}>
            {/* Pathway header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "0.875rem 1.25rem", background: pathway.bg, borderRadius: "12px", borderLeft: `4px solid ${pathway.color}` }}>
              <span style={{ fontSize: "1.4rem" }} aria-hidden="true">{pathway.icon}</span>
              <div>
                <h2 id={`pathway-${pathway.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>
                  {pathway.title}
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                  {pathway.modules.length} of {pathways.find(p => p.id === pathway.id)!.modules.length} modules
                </span>
              </div>
            </div>

            {/* Module cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {pathway.modules.map((mod, idx) => (
                <Link
                  key={mod.id}
                  href={`/dashboard/learn/${mod.id}`}
                  style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--gray-border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.18s, transform 0.18s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.11)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {/* Colour thumbnail */}
                  <div style={{ background: pathway.thumbnailBg, height: "80px", position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem" }}>
                    <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{pathway.icon}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "rgba(255,255,255,0.2)", lineHeight: 1 }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {/* Free badge on first module of each pathway */}
                    {idx === 0 && (
                      <span style={{ position: "absolute", top: "0.6rem", left: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.25)", color: "var(--white)", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                        Free preview
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "1rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.35 }}>
                      {mod.title}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                      {mod.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: pathway.color, background: pathway.bg, padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "auto", paddingTop: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>⏱ {mod.duration}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.18rem 0.5rem", borderRadius: "999px" }}>
                        {mod.cpd} CPD
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginTop: "0.5rem" }}>
                      <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "0%", background: pathway.color, borderRadius: "999px", transition: "width 0.3s" }} />
                      </div>
                      <div style={{ marginTop: "0.3rem", fontSize: "0.68rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>Not started</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <BottomBanner />
    </div>
  );
}
