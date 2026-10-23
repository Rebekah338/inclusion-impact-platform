"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const TOOLS = [
  { icon: "🔍", title: "EDI Audit Tool", desc: "A structured self-assessment to identify gaps in your current EDI practice across recruitment, leadership, culture, and systems.", type: "Interactive tool", time: "30–45 min" },
  { icon: "⚖️", title: "Equality Impact Assessment Template", desc: "A ready-to-use EIA template for policy, project, or service changes with step-by-step guidance and example completions.", type: "Template", time: "20–60 min" },
  { icon: "📊", title: "EDI Data Collection Framework", desc: "How to collect, store, and use EDI data responsibly with sample questions, comms templates, and GDPR considerations.", type: "Framework", time: "Reference" },
  { icon: "📣", title: "Business Case Builder", desc: "Structure your internal business case for EDI investment using evidence, ROI data, and narrative frameworks that resonate with decision-makers.", type: "Interactive tool", time: "45–60 min" },
  { icon: "🗓️", title: "30/60/90 Day EDI Action Planner", desc: "A practical planning tool for those new to an EDI role or kicking off a new strategy. Break your first quarter into focused, achievable steps.", type: "Planning tool", time: "60 min" },
  { icon: "📐", title: "Inclusion Maturity Framework", desc: "Assess where your organisation sits on the inclusion maturity spectrum and identify the most impactful next steps.", type: "Framework", time: "45 min" },
];

const GUIDES = [
  { icon: "🎯", title: "Getting Started with EDI Strategy", desc: "A step-by-step guide to scoping, designing, and launching your first organisation-wide EDI strategy from baseline audit to board sign-off.", tags: ["strategy", "foundations"], time: "20 min read" },
  { icon: "🗣️", title: "Talking to Sceptical Stakeholders", desc: "How to navigate resistance from senior leaders and budget holders with evidence-based arguments and conversation frameworks.", tags: ["buy-in", "leadership"], time: "10 min read" },
  { icon: "🌱", title: "Building an Inclusion Culture", desc: "Moving beyond policy to embed inclusion in everyday practice covering psychological safety, belonging, and manager behaviour.", tags: ["culture", "belonging"], time: "15 min read" },
  { icon: "📊", title: "Using EDI Data Effectively", desc: "How to collect, analyse, and present EDI data in ways that build understanding and drive action not just fill a report.", tags: ["data", "measurement"], time: "12 min read" },
  { icon: "🧩", title: "Intersectionality in Practice", desc: "How to apply an intersectional lens to your EDI work in research, policy, and practice without tokenism or oversimplification.", tags: ["intersectionality", "theory"], time: "15 min read" },
  { icon: "🤝", title: "Allyship: From Awareness to Action", desc: "A practical guide to building a culture of active allyship across your organisation not just declarations, but sustainable behaviour change.", tags: ["allyship", "behaviour change"], time: "12 min read" },
];

const CHECKLISTS = [
  { icon: "📋", title: "Inclusive Recruitment Checklist", desc: "Step-by-step guidance for each stage of your recruitment process from job design to onboarding. 47 checkpoints across 8 stages.", tags: ["recruitment", "hiring"], time: "15 min" },
  { icon: "✅", title: "Inclusive Meetings Checklist", desc: "Before, during, and after checks to ensure your meetings and workshops are accessible and inclusive to all participants.", tags: ["meetings", "facilitation"], time: "5 min" },
  { icon: "🌐", title: "Accessible Communications Checklist", desc: "Ensure your internal and external comms documents, emails, events, and social are accessible to people with disabilities.", tags: ["accessibility", "communications"], time: "10 min" },
  { icon: "📝", title: "Inclusive Job Description Checklist", desc: "Review any job description against 25 inclusion criteria language, requirements, and structure.", tags: ["recruitment", "language"], time: "10 min" },
  { icon: "🎤", title: "Inclusive Event Planning Checklist", desc: "For conferences, training days, and team events from venue access to dietary requirements and speaker diversity.", tags: ["events", "accessibility"], time: "15 min" },
  { icon: "🔒", title: "EDI Policy Audit Checklist", desc: "A checklist to review your existing HR and people policies through an inclusion lens identifying gaps, exclusionary language, and missed opportunities.", tags: ["policy", "audit"], time: "30 min" },
];

type Tab = "tools" | "guides" | "checklists" | "glossary" | "reflection" | "surveys";

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("tools");

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Apply</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            Apply
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>
            Tools, frameworks, guides, and checklists everything you need to put your learning into practice.
          </p>
          <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--gray-border)" }}>
            {([
              { key: "tools", label: "🛠️ Tools & Frameworks" },
              { key: "guides", label: "📖 Guides" },
              { key: "checklists", label: "✅ Checklists" },
              { key: "glossary", label: "📖 Glossary" },
              { key: "reflection", label: "🪞 Reflection Tool" },
              { key: "surveys", label: "📝 Surveys" },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.5rem", background: "none", border: "none", cursor: "pointer", color: activeTab === tab.key ? "var(--sage-dark)" : "var(--gray-soft)", borderBottom: activeTab === tab.key ? "2px solid var(--sage-dark)" : "2px solid transparent", marginBottom: "-2px" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {activeTab === "tools" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {TOOLS.map((t) => (
              <div key={t.title} className="card">
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{t.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{t.title}</div>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.875rem" }}>
                  <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{t.type}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>⏱ {t.time}</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{t.desc}</p>
                <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>Open tool →</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guides" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {GUIDES.map((g) => (
              <div key={g.title} className="card">
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{g.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.625rem" }}>{g.title}</div>
                <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  {g.tags.map((tag) => <span key={tag} className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{tag}</span>)}
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>📖 {g.time}</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{g.desc}</p>
                <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>Read guide →</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "checklists" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {CHECKLISTS.map((c) => (
              <div key={c.title} className="card">
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{c.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{c.title}</div>
                <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                  {c.tags.map((tag) => <span key={tag} className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{tag}</span>)}
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>⏱ {c.time}</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{c.desc}</p>
                <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", width: "100%" }}>Open checklist →</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "glossary" && (
          <div>
            <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1.5px solid var(--gray-border)" }}>
              <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📖</div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>EDI Glossary</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                  A comprehensive glossary of EDI terms, concepts, and definitions from allyship to intersectionality, psychological safety to systemic racism. Coming soon.
                </p>
                <span style={{ display: "inline-block", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", padding: "0.35rem 1rem", borderRadius: "999px" }}>
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reflection" && (
          <div>
            <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1.5px solid var(--gray-border)" }}>
              <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🪞</div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Reflection Tool</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                  A guided reflection tool to help you consolidate your learning, identify your next steps, and track your professional development journey. Coming soon.
                </p>
                <span style={{ display: "inline-block", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", padding: "0.35rem 1rem", borderRadius: "999px" }}>
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "surveys" && (
          <div>
            <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1.5px solid var(--gray-border)" }}>
              <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📝</div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Surveys</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                  Ready-to-use survey templates for inclusion pulse checks, culture audits, and post-training feedback with analysis guidance. Coming soon.
                </p>
                <span style={{ display: "inline-block", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", padding: "0.35rem 1rem", borderRadius: "999px" }}>
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
