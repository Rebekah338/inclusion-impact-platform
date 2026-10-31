"use client";

import Link from "next/link";
import { useState } from "react";

const AI_TOOLS = [
  {
    id: "policy-equity-auditor",
    icon: "📋",
    name: "Policy Equity Auditor",
    tagline: "Turn any policy into an equity action plan.",
    desc: "Upload or paste an existing policy and receive a comprehensive equity audit: inclusive language assessment, missing provisions, alignment with legal frameworks and charters, and a prioritised action plan to improve it.",
    features: ["Inclusive language analysis", "Legal framework alignment (Equality Act 2010, PSED)", "Missing provisions checklist", "Actionable improvement recommendations", "Charter and code of practice references"],
    href: "/dashboard/inclusion-ai/policy-equity-auditor",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "jd-equity-checker",
    icon: "💼",
    name: "Job Description Equity Checker",
    tagline: "Remove bias before your role goes live.",
    desc: "Paste any job description and get an instant equity review: gendered language, unnecessary requirements that exclude diverse candidates, accessibility considerations and rewritten suggestions ready to use.",
    features: ["Gendered and coded language detection", "Unnecessary qualification flags", "Accessibility language review", "Suggested rewrites", "Inclusive job description template"],
    href: "/dashboard/inclusion-ai/jd-equity-checker",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "interview-question-generator",
    icon: "🎯",
    name: "Interview Question Generator",
    tagline: "Structured, bias-aware questions for every role.",
    desc: "Generate a full structured interview question set aligned to your role competencies. Each question is designed to surface capability fairly, reduce interviewer bias and create a consistent candidate experience.",
    features: ["Competency-based question sets", "Bias-aware framing", "Follow-up probe suggestions", "Scoring guide included", "Adaptable to any seniority level"],
    href: "/dashboard/inclusion-ai/interview-question-generator",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "inclusion-health-check",
    icon: "🏥",
    name: "Inclusion Health Check",
    tagline: "A rapid diagnostic for your inclusion culture.",
    desc: "Answer a set of targeted questions about your organisation and receive a clear inclusion health score across key dimensions: leadership, policy, recruitment, culture, data and psychological safety; with priority actions.",
    features: ["Multi-dimension scoring", "Priority action recommendations", "Benchmarking context", "Shareable summary report", "Board-ready language"],
    href: "/dashboard/inclusion-ai/inclusion-health-check",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "pay-gap-narrative",
    icon: "📊",
    name: "Pay Gap Narrative Generator",
    tagline: "A compliant, compelling pay gap report narrative.",
    desc: "Input your gender pay gap figures and receive a clear, compliant and honest narrative for your annual report: contextualising your numbers, explaining root causes and setting out your action commitments.",
    features: ["Statutory narrative structure", "Root cause framing", "Action commitment language", "Tone options (transparent, strategic)", "Editable and downloadable output"],
    href: "/dashboard/inclusion-ai/pay-gap-narrative",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "pay-gap-analysis",
    icon: "🔍",
    name: "Gender Pay Gap Analysis Tool",
    tagline: "From raw data to insight and action.",
    desc: "Upload your pay data and receive a full analysis: mean and median gaps across pay quartiles, bonus gap breakdown, root cause indicators, and a set of recommended actions prioritised by impact.",
    features: ["Mean and median gap calculations", "Pay quartile breakdown", "Bonus gap analysis", "Root cause identification", "Impact-prioritised action plan"],
    href: "/dashboard/inclusion-ai/pay-gap-analysis",
    status: "coming-soon",
    badge: "Coming soon",
  },
  {
    id: "evidence-argument-builder",
    icon: "⚖️",
    name: "Evidence Argument Builder",
    tagline: "Build the business case for EDI investment.",
    desc: "Answer a set of questions about your organisation and receive a tailored, evidence-backed business case for EDI. Draws on sector data, ROI research and the specific context of your organisation.",
    features: ["Organisation-specific framing", "Sector ROI data", "Board-ready language", "Multiple argument angles", "Export-ready format"],
    href: "/dashboard/evidence",
    status: "available",
    badge: "Available now",
  },
  {
    id: "research-interpreter",
    icon: "🔬",
    name: "Personalised Research Interpreter",
    tagline: "Research made relevant to your context.",
    desc: "Paste any research paper, report or article and receive an inclusion-focused summary: key findings, practical takeaways, and how the evidence applies to your specific organisation and sector.",
    features: ["Research summary and key findings", "Practical takeaways", "Contextualised to your sector", "Citation-ready format", "Action suggestions"],
    href: "/dashboard/evidence",
    status: "available",
    badge: "Available now",
  },
  {
    id: "case-study-roadmap",
    icon: "📖",
    name: "Case Study Replication Roadmap",
    tagline: "Turn someone else's success into your action plan.",
    desc: "Provide a case study from another organisation and receive a step-by-step replication roadmap adapted to your context: what they did, why it worked, and how you can apply it.",
    features: ["What they did analysis", "Why it worked breakdown", "Adaptation to your context", "Step-by-step roadmap", "Risk and consideration flags"],
    href: "/dashboard/evidence",
    status: "available",
    badge: "Available now",
  },
];

export default function InclusionAIPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={{ background: "#1C1F1E", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "4rem 1.5rem 3rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#C9A84C", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.5rem" }}>
            Inclusion AI
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F5F0E8", marginBottom: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            AI tools built for<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E8C870 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              inclusion professionals.
            </span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(245,240,232,0.65)", maxWidth: "640px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
            Inclusion AI brings intelligent automation into your EDI practice. Audit policies, build evidence, remove recruitment bias and analyse pay gaps; all through tools designed for the real complexity of inclusion work.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "9 AI tools", icon: "🤖" },
              { label: "Built for EDI practitioners", icon: "👥" },
              { label: "Evidence-backed", icon: "📊" },
            ].map((chip) => (
              <span key={chip.label} style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600, color: "rgba(245,240,232,0.7)", background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.12)", padding: "0.4rem 0.875rem", borderRadius: "999px" }}>
                {chip.icon} {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section style={{ padding: "3.5rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Available tools */}
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#7DBF8A", marginBottom: "1.5rem" }}>
              ✓ Available now
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "3rem" }}>
              {AI_TOOLS.filter((t) => t.status === "available").map((tool) => (
                <Link key={tool.id} href={tool.href} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: hoveredCard === tool.id ? "#2A2E2C" : "#242827",
                      border: `1px solid ${hoveredCard === tool.id ? "#C9A84C" : "rgba(125,191,138,0.25)"}`,
                      borderRadius: "16px", padding: "1.75rem",
                      cursor: "pointer", transition: "all 0.2s",
                      transform: hoveredCard === tool.id ? "translateY(-2px)" : "none",
                      boxShadow: hoveredCard === tool.id ? "0 8px 30px rgba(201,168,76,0.15)" : "none",
                    }}
                    onMouseEnter={() => setHoveredCard(tool.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "2rem" }} aria-hidden="true">{tool.icon}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7DBF8A", background: "rgba(125,191,138,0.12)", border: "1px solid rgba(125,191,138,0.3)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                        {tool.badge}
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "#F5F0E8", marginBottom: "0.35rem" }}>{tool.name}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "#C9A84C", marginBottom: "0.75rem" }}>{tool.tagline}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{tool.desc}</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {tool.features.map((f) => (
                        <li key={f} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(245,240,232,0.5)", marginBottom: "0.3rem", paddingLeft: "1rem", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: "#C9A84C" }}>·</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Coming soon tools */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#C9A84C", marginBottom: "1.5rem" }}>
              ⚡ Coming soon
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {AI_TOOLS.filter((t) => t.status === "coming-soon").map((tool) => (
                <div
                  key={tool.id}
                  style={{
                    background: "#1E2220",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "16px", padding: "1.75rem",
                    opacity: 0.85,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2rem" }} aria-hidden="true">{tool.icon}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C9A84C", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                      {tool.badge}
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "#F5F0E8", marginBottom: "0.35rem" }}>{tool.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "rgba(201,168,76,0.65)", marginBottom: "0.75rem" }}>{tool.tagline}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{tool.desc}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {tool.features.map((f) => (
                      <li key={f} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(245,240,232,0.35)", marginBottom: "0.3rem", paddingLeft: "1rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "rgba(201,168,76,0.5)" }}>·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
