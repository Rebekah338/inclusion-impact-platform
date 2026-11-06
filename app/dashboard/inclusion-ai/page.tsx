"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";

const SECTIONS = [
  {
    key: "making-the-case",
    heading: "Making the Case",
    color: "var(--coll-green)",
    bg: "var(--coll-green-tint)",
    mid: "var(--coll-green-mid)",
    icon: "scale",
    subheading: "Tools to build the evidence, justify investment, and bring leadership with you.",
    tools: [
      {
        id: "evidence-argument-builder",
        icon: "scale",
        name: "Evidence Argument Builder",
        tagline: "Build a structured, evidence-backed argument for EDI investment.",
        desc: "Tell us what you are trying to argue and who you are presenting to. We surface the most relevant evidence from our research library and build you a tailored business case.",
        href: "/dashboard/evidence?tab=evidence-builder",
      },
      {
        id: "research-interpreter",
        icon: "microscope",
        name: "Personalised Research Interpreter",
        tagline: "Turn academic research into actionable insight for your organisation.",
        desc: "Paste any research paper, report or article and receive an inclusion-focused summary: key findings, practical takeaways, and how the evidence applies to your specific context.",
        href: "/dashboard/evidence?tab=evidence-builder",
      },
      {
        id: "gender-pay-gap-statement-builder",
        icon: "chart",
        name: "Gender Pay Gap Statement Builder",
        tagline: "Turn your statutory figures into a clear, honest published statement.",
        desc: "Input your gender pay gap figures and receive a clear, honest narrative: contextualising your numbers, explaining root causes and setting out your action commitments.",
        href: "/dashboard/inclusion-ai/gender-pay-gap-statement-builder",
      },
      {
        id: "inclusion-strategy-builder",
        icon: "map",
        name: "Inclusion Strategy Builder",
        tagline: "Turn your priorities into a 12-month strategy framework.",
        desc: "Tell us where your organisation is now and what matters most. We generate a prioritised 12-month framework: focus areas, measurable objectives, quick wins, and a board-ready summary.",
        href: "/dashboard/inclusion-ai/inclusion-strategy-builder",
      },
    ],
  },
  {
    key: "recruiting-fairly",
    heading: "Recruiting and Hiring Fairly",
    color: "var(--coll-purple)",
    bg: "var(--coll-purple-tint)",
    mid: "var(--coll-purple-mid)",
    icon: "briefcase",
    subheading: "Remove bias from your talent pipeline before it costs you candidates.",
    tools: [
      {
        id: "jd-equity-checker",
        icon: "briefcase",
        name: "Job Spec Equity Check",
        tagline: "Remove bias before your role goes live.",
        desc: "Paste any job description and get an instant equity review: gendered language, unnecessary requirements that exclude diverse candidates, accessibility considerations and rewritten suggestions ready to use.",
        href: "/dashboard/inclusion-ai/jd-equity-checker",
      },
      {
        id: "interview-question-generator",
        icon: "target",
        name: "Interview Question Generator",
        tagline: "Structured, bias-aware questions for every role.",
        desc: "Generate a full structured interview question set aligned to your role competencies. Each question is designed to surface capability fairly, reduce interviewer bias and create a consistent candidate experience.",
        href: "/dashboard/inclusion-ai/interview-question-generator",
      },
    ],
  },
  {
    key: "understanding-where-you-are",
    heading: "Understanding Where You Are",
    color: "var(--coll-blue)",
    bg: "var(--coll-blue-tint)",
    mid: "var(--coll-blue-mid)",
    icon: "pulse",
    subheading: "Diagnostic and audit tools that tell you what to fix and where to start.",
    tools: [
      {
        id: "policy-equity-auditor",
        icon: "clipboard",
        name: "Policy Equity Auditor",
        tagline: "Turn any policy into an equity action plan.",
        desc: "Upload or paste an existing policy and receive a comprehensive equity audit: inclusive language assessment, missing provisions, alignment with legal frameworks and charters, and a prioritised improvement plan.",
        href: "/dashboard/inclusion-ai/policy-equity-auditor",
      },
      {
        id: "inclusion-health-check",
        icon: "pulse",
        name: "Inclusion Health Check",
        tagline: "A rapid diagnostic for your inclusion culture.",
        desc: "Answer a set of targeted questions about your organisation and receive a clear inclusion health score across key dimensions: leadership, policy, recruitment, culture, data and psychological safety.",
        href: "/dashboard/inclusion-ai/inclusion-health-check",
      },
      {
        id: "case-study-roadmap",
        icon: "book",
        name: "Case Study Replication Roadmap",
        tagline: "Turn someone else's success into your action plan.",
        desc: "Provide a case study from another organisation and receive a step-by-step replication roadmap adapted to your context: what they did, why it worked, and how you can apply it.",
        href: "/dashboard/evidence?tab=evidence-builder",
      },
    ],
  },
];

const ALL_TOOLS = SECTIONS.flatMap((s) => s.tools);

export default function InclusionAIPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return SECTIONS;
    const q = search.toLowerCase();
    return SECTIONS.map((s) => ({
      ...s,
      tools: s.tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q)
      ),
    })).filter((s) => s.tools.length > 0);
  }, [search]);

  const totalVisible = filteredSections.reduce((sum, s) => sum + s.tools.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "440px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/inclusion-ai-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 12%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 2.75rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              <Icon name="sparkle" size={14} color="var(--gold-light)" /> Impact Platform: Inclusion AI
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Explore</span> <span style={{ color: "var(--hero-mint)" }}>AI Tools.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "580px", margin: "0 0 1.25rem" }}>
            Specialist tools built for the real complexity of inclusion work. Audit policies, build evidence, remove recruitment bias and analyse pay gaps.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="sparkle" color="var(--hero-cream)" /> {ALL_TOOLS.length} AI tools</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="people" color="var(--hero-cream)" /> Built for EDI practitioners</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="book" color="var(--hero-cream)" /> Evidence-backed</span>
          </div>
        </div>
      </header>

      {/* FILTER STRIP */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.25rem" }} aria-label="Tool groups">
            {SECTIONS.map((s) => (
              <a key={s.key} href={`#section-${s.key}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.45rem 0.95rem", borderRadius: "999px", border: `1.5px solid ${s.color}`, background: "var(--white)", fontSize: "0.85rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: s.color, whiteSpace: "nowrap", textDecoration: "none" }}>
                <Icon name={s.icon} size={16} color={s.color} /> {s.heading}
              </a>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex" }}><Icon name="search" color="var(--slate)" /></span>
            <input
              type="search"
              placeholder="Search tools by name or task"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tools"
              style={{ width: "100%", padding: "0.9rem 1.25rem 0.9rem 3rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--mist)", color: "var(--ink)", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      {/* TOOLS */}
      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {search && (
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--slate)", marginBottom: "1.5rem" }} aria-live="polite">
            {totalVisible === 0 ? "No tools found" : `${totalVisible} tool${totalVisible === 1 ? "" : "s"} found`} matching <strong style={{ color: "var(--ink)" }}>&ldquo;{search}&rdquo;</strong>
            <button onClick={() => setSearch("")} style={{ marginLeft: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear search
            </button>
          </p>
        )}

        {totalVisible === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}><Icon name="search" size={40} color="var(--sage)" /></div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--ink)" }}>No tools match your search</p>
            <p>Try a different keyword, such as policy, recruitment or pay gap.</p>
          </div>
        )}

        {filteredSections.map((section) => (
          <section key={section.key} id={`section-${section.key}`} style={{ marginBottom: "2.75rem", scrollMarginTop: "90px" }} aria-labelledby={`section-title-${section.key}`}>
            {/* Section opener: pale tint with a 4px left border in the collection tone (as on Learn and Watch) */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "0.95rem 1.35rem", background: section.bg, borderRadius: "var(--radius-md)", borderLeft: `4px solid ${section.color}` }}>
              <Icon name={section.icon} size={22} color={section.color} />
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.25rem 0.75rem" }}>
                <h2 id={`section-title-${section.key}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: section.color, margin: 0 }}>
                  {section.heading}
                </h2>
                <span style={{ fontSize: "0.9rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                  {section.subheading}
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: section.color, whiteSpace: "nowrap" }}>
                {section.tools.length} tool{section.tools.length === 1 ? "" : "s"}
              </span>
            </div>

            {/* Inclusion AI cards: the standard hub card in the collection tone, with a soft gold glow so AI tools stand out */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {section.tools.map((tool) => {
                const isHover = hovered === tool.id;
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onMouseEnter={() => setHovered(tool.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(tool.id)}
                    onBlur={() => setHovered(null)}
                    style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-md)", overflow: "hidden", borderTop: `6px solid ${section.color}`, boxShadow: isHover ? "var(--shadow-ai-hover)" : "var(--shadow-ai)", transform: isHover ? "translateY(-3px)" : "none", transition: "box-shadow 0.2s, transform 0.2s", textDecoration: "none" }}
                  >
                    {/* Pale header in the collection tint */}
                    <div style={{ background: section.bg, padding: "0.9rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                      <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--white)", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={tool.icon} size={21} color={section.color} />
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: section.color, background: "var(--white)", padding: "0.25rem 0.65rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                        <Icon name="sparkle" size={13} color="var(--gold)" strokeWidth={2} /> Inclusion AI
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "1.05rem 1.15rem 1.15rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink)", lineHeight: 1.3, margin: 0 }}>
                        {tool.name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700, color: section.color, lineHeight: 1.45, margin: 0 }}>
                        {tool.tagline}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", lineHeight: 1.6, margin: 0 }}>
                        {tool.desc}
                      </p>
                      <span style={{ marginTop: "auto", paddingTop: "0.6rem", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", textDecoration: isHover ? "underline" : "none" }}>
                        Open Tool <Icon name="chevron" size={16} color="var(--evergreen)" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <BottomBanner />
    </div>
  );
}
