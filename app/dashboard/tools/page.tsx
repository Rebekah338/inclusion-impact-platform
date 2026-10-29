"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const TOOLS = [
  {
    icon: "📊",
    number: "Tool 1",
    title: "Argument Builder",
    subtitle: "Build your business case",
    desc: "Tell us about your organisation — sector, size, the challenge you are facing — and this tool assembles a tailored, evidence-backed argument for inclusion investment. Drawing on the research library, it surfaces the statistics most relevant to your context and structures them into a clear narrative you can take to leadership.",
    outputs: [
      "A structured business case framed around your specific challenge",
      "Relevant statistics and sources from the research library",
      "Objection-handling language for common leadership pushbacks",
      "A downloadable summary you can adapt for presentations or papers",
    ],
    cta: "Build your argument",
    href: "/dashboard/evidence?tab=evidence-builder&tool=argument",
    accent: "#2D5A3C",
    bg: "#EFF5F0",
  },
  {
    icon: "🔬",
    number: "Tool 2",
    title: "Research Interpreter",
    subtitle: "Make research relevant to your organisation",
    desc: "Paste in any statistic or research finding from the platform — or bring your own — and this tool explains what it means in practice, contextualises it for your sector, and suggests how to use it in conversations with specific stakeholders: from HR directors to finance leads to sceptical line managers.",
    outputs: [
      "A plain-English explanation of what the data actually means",
      "Sector-specific context so the statistic lands for your audience",
      "Suggested language for different stakeholder conversations",
      "Related findings from the library to strengthen your case",
    ],
    cta: "Interpret your research",
    href: "/dashboard/evidence?tab=evidence-builder&tool=research",
    accent: "#1a4a5c",
    bg: "#EEF4F8",
  },
  {
    icon: "🗺️",
    number: "Tool 3",
    title: "Case Study Replication Roadmap",
    subtitle: "Adapt what worked elsewhere to your context",
    desc: "Choose a case study from the library — or describe an initiative you have read about — and this tool builds a step-by-step action plan for replicating it in your organisation. It identifies what needs adapting for your sector, size, and maturity level, and surfaces the questions to answer before you begin.",
    outputs: [
      "A phased action plan tailored to your organisation",
      "Adaptation notes: what to change for your sector and size",
      "Key risks and how similar organisations have navigated them",
      "Suggested success metrics based on the original case study",
    ],
    cta: "Build your roadmap",
    href: "/dashboard/evidence?tab=evidence-builder&tool=cases",
    accent: "#5a3c1a",
    bg: "#F8F4EE",
  },
];

export default function ToolsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      {/* Header */}
      <div style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 14px" }}>Evidence Builder</p>
          <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.15 }}>
            Three AI tools to help you<br />make the case for inclusion
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, maxWidth: 640, margin: 0 }}>
            The research is there. The case is strong. These tools help you translate evidence into language that lands with your specific stakeholders: their sector, their concerns, their objections.
          </p>
        </div>
      </div>

      {/* Tool cards */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TOOLS.map((tool) => (
            <div key={tool.number} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* Card top accent */}
              <div style={{ background: tool.bg, padding: "28px 28px 20px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{tool.icon}</div>
                <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: tool.accent, margin: "0 0 6px" }}>{tool.number}</p>
                <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px", lineHeight: 1.2 }}>{tool.title}</h2>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0, fontWeight: 600 }}>{tool.subtitle}</p>
              </div>

              {/* Card body */}
              <div style={{ padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: "0 0 20px" }}>{tool.desc}</p>

                <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px" }}>What you get</p>
                <ul style={{ margin: "0 0 28px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  {tool.outputs.map((output) => (
                    <li key={output} style={{ display: "flex", gap: 10, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                      <span style={{ color: tool.accent, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>›</span>
                      {output}
                    </li>
                  ))}
                </ul>

                <Link href={tool.href} style={{ display: "block", background: tool.accent, color: "#fff", textAlign: "center", padding: "12px 20px", borderRadius: 8, fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: 0.3 }}>
                  {tool.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How it works strip */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "36px 36px 32px", marginTop: 40 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 24px" }}>How the Evidence Builder works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { step: "1", text: "You answer a short set of questions about your organisation, stakeholder, and challenge." },
              { step: "2", text: "The tool searches the research library and structures a response using evidence relevant to your context." },
              { step: "3", text: "You receive a tailored output you can copy, adapt, and use — in a meeting, a paper, or a presentation." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--sage-xlight, #EFF5F0)", border: "2px solid var(--sage-dark, #2D5A3C)", color: "var(--sage-dark, #2D5A3C)", fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.step}</div>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/dashboard/evidence" style={{ color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            ← Browse the full research library
          </Link>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
