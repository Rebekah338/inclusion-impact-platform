"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const SECTIONS = [
  {
    key: "making-the-case",
    heading: "Making the Case",
    subheading: "Tools to build the evidence, justify investment, and bring leadership with you.",
    tools: [
      {
        id: "evidence-argument-builder",
        icon: "⚖️",
        name: "Evidence Argument Builder",
        tagline: "Build a structured, evidence-backed argument for EDI investment.",
        desc: "Tell us what you are trying to argue and who you are presenting to. We surface the most relevant evidence from our research library and build you a tailored business case.",
        href: "/dashboard/evidence",
      },
      {
        id: "research-interpreter",
        icon: "🔬",
        name: "Personalised Research Interpreter",
        tagline: "Turn academic research into actionable insight for your organisation.",
        desc: "Paste any research paper, report or article and receive an inclusion-focused summary: key findings, practical takeaways, and how the evidence applies to your specific context.",
        href: "/dashboard/evidence",
      },
      {
        id: "gender-pay-gap-statement-builder",
        icon: "📊",
        name: "Gender Pay Gap Statement Builder",
        tagline: "Turn your statutory figures into a clear, honest published statement.",
        desc: "Input your gender pay gap figures and receive a clear, honest narrative: contextualising your numbers, explaining root causes and setting out your action commitments.",
        href: "/dashboard/inclusion-ai/gender-pay-gap-statement-builder",
      },
      {
        id: "inclusion-strategy-builder",
        icon: "🗺️",
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
    subheading: "Remove bias from your talent pipeline before it costs you candidates.",
    tools: [
      {
        id: "jd-equity-checker",
        icon: "💼",
        name: "Job Spec Equity Check",
        tagline: "Remove bias before your role goes live.",
        desc: "Paste any job description and get an instant equity review: gendered language, unnecessary requirements that exclude diverse candidates, accessibility considerations and rewritten suggestions ready to use.",
        href: "/dashboard/inclusion-ai/jd-equity-checker",
      },
      {
        id: "interview-question-generator",
        icon: "🎯",
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
    subheading: "Diagnostic and audit tools that tell you what to fix and where to start.",
    tools: [
      {
        id: "policy-equity-auditor",
        icon: "📋",
        name: "Policy Equity Auditor",
        tagline: "Turn any policy into an equity action plan.",
        desc: "Upload or paste an existing policy and receive a comprehensive equity audit: inclusive language assessment, missing provisions, alignment with legal frameworks and charters, and a prioritised improvement plan.",
        href: "/dashboard/inclusion-ai/policy-equity-auditor",
      },
      {
        id: "inclusion-health-check",
        icon: "🏥",
        name: "Inclusion Health Check",
        tagline: "A rapid diagnostic for your inclusion culture.",
        desc: "Answer a set of targeted questions about your organisation and receive a clear inclusion health score across key dimensions: leadership, policy, recruitment, culture, data and psychological safety.",
        href: "/dashboard/inclusion-ai/inclusion-health-check",
      },
      {
        id: "case-study-roadmap",
        icon: "📖",
        name: "Case Study Replication Roadmap",
        tagline: "Turn someone else's success into your action plan.",
        desc: "Provide a case study from another organisation and receive a step-by-step replication roadmap adapted to your context: what they did, why it worked, and how you can apply it.",
        href: "/dashboard/evidence",
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

  return (
    <>
      <PlatformNav />
      <div style={{ background: "var(--sage-xlight)", minHeight: "100vh" }}>

      {/* Page header — matches Apply page style */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2.25rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.25rem" }}>
            <Link href="/dashboard" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)", textDecoration: "none" }}>← Dashboard</Link>
          </div>

          {/* Title row */}
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            ✨ Inclusion AI
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--gray-soft)", maxWidth: "580px", lineHeight: 1.65, margin: "0 0 1.75rem" }}>
            Nine specialist AI tools designed for the real complexity of inclusion work. Audit policies, build evidence, remove recruitment bias and analyse pay gaps.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "480px" }}>
            <span style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", color: "var(--gray-soft)", pointerEvents: "none" }}>🔍</span>
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem 2.5rem 0.7rem 2.5rem",
                borderRadius: "10px",
                border: "1.5px solid var(--gray-border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                background: "var(--sage-xlight)",
                color: "var(--charcoal)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1rem", padding: "0.2rem" }}
              >✕</button>
            )}
          </div>

          {/* Stats chips */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            {[
              { label: "9 AI tools" },
              { label: "Built for EDI practitioners" },
              { label: "Evidence-backed" },
            ].map((chip) => (
              <span key={chip.label} style={{
                fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
                color: "#A8883C", background: "rgba(201,168,76,0.09)",
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "0.3rem 0.75rem", borderRadius: "999px",
              }}>{chip.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tool sections */}
      <div style={{ padding: "2.5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>

          {filteredSections.length === 0 && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>No tools match your search.</p>
          )}

          {filteredSections.map((section) => (
            <div key={section.key}>
              <div style={{ marginBottom: "1.25rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>
                  {section.heading}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", margin: 0 }}>
                  {section.subheading}
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: section.tools.length === 4
                  ? "repeat(4, 1fr)"
                  : section.tools.length === 2
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}>
                {section.tools.map((tool) => (
                  <Link key={tool.id} href={tool.href} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        background: hovered === tool.id ? "#FDF8EE" : "#FAF5E9",
                        border: hovered === tool.id
                          ? "1.5px solid #C9A84C"
                          : "1.5px solid rgba(201,168,76,0.45)",
                        borderRadius: "14px",
                        padding: "1.1rem 1.15rem",
                        cursor: "pointer",
                        transition: "box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease",
                        boxShadow: hovered === tool.id
                          ? "0 4px 22px rgba(201,168,76,0.28)"
                          : "0 1px 4px rgba(201,168,76,0.10)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        height: "100%",
                      }}
                      onMouseEnter={() => setHovered(tool.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.15rem" }}>
                        <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{tool.icon}</span>
                        <span style={{
                          fontFamily: "var(--font-heading)", fontSize: "0.6rem", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                          color: "var(--charcoal)", border: "1.5px solid rgba(201,168,76,0.6)",
                          padding: "0.18rem 0.55rem", borderRadius: "999px",
                        }}>Inclusion AI</span>
                      </div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.3 }}>
                        {tool.name}
                      </div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "#A8883C", lineHeight: 1.4 }}>
                        {tool.tagline}
                      </div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.6, marginTop: "0.1rem" }}>
                        {tool.desc}
                      </div>
                      <div style={{ marginTop: "auto", paddingTop: "0.6rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "#A8883C" }}>
                        Open tool →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
      </div>
      <BottomBanner />
    </>
  );
}
