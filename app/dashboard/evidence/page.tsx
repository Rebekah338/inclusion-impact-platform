"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const RESEARCH_REPORTS = [
  {
    icon: "📊",
    title: "McKinsey Diversity Wins Report",
    year: "2023",
    source: "McKinsey & Company",
    desc: "Companies in the top quartile for gender diversity are 25% more likely to have above-average profitability. The data on ethnic and cultural diversity is even stronger.",
    tags: ["data", "business case", "diversity"],
    type: "Research report",
    access: "Read summary",
  },
  {
    icon: "💡",
    title: "Deloitte Millennial Survey: Inclusion at Work",
    year: "2022",
    source: "Deloitte",
    desc: "76% of respondents consider diversity and inclusion important when evaluating prospective employers. Key driver for attraction and retention.",
    tags: ["talent", "retention", "millennial"],
    type: "Research report",
    access: "Read summary",
  },
  {
    icon: "📈",
    title: "Gender Pay Gap Evidence Base",
    year: "2023",
    source: "CIPD / Fawcett Society",
    desc: "Comprehensive look at the UK gender pay gap drivers, sector breakdowns, and interventions with the strongest evidence base.",
    tags: ["gender pay gap", "UK", "data"],
    type: "Data report",
    access: "Read summary",
  },
  {
    icon: "🌍",
    title: "Parker Review: Ethnic Diversity in Boardrooms",
    year: "2022",
    source: "Parker Review Committee",
    desc: "Annual tracking of ethnic representation in FTSE 100 and 250 boardrooms with targets, progress, and sector comparison.",
    tags: ["ethnicity", "leadership", "board"],
    type: "Data report",
    access: "Read summary",
  },
  {
    icon: "🧠",
    title: "Neurodiversity at Work: Business Benefits",
    year: "2023",
    source: "ACAS / British Dyslexia Association",
    desc: "Evidence review on the performance and innovation benefits of building neurodiverse teams, with practical employer guidance.",
    tags: ["neurodiversity", "disability", "inclusion"],
    type: "Research summary",
    access: "Read summary",
  },
  {
    icon: "🏳️‍🌈",
    title: "Stonewall Workplace Equality Index 2023",
    year: "2023",
    source: "Stonewall",
    desc: "Findings from 300+ employers on LGBTQ+ inclusion at work what drives belonging, performance, and retention.",
    tags: ["LGBTQ+", "belonging", "measurement"],
    type: "Index report",
    access: "Read summary",
  },
];

const CASE_STUDIES = [
  {
    org: "NHS Trust",
    sector: "Healthcare",
    title: "Building Psychological Safety Across Clinical Teams",
    outcome: "37% reduction in staff turnover over 18 months following EDI strategy implementation.",
    tags: ["psychological safety", "retention", "healthcare"],
  },
  {
    org: "Tech company (anonymised)",
    sector: "Technology",
    title: "Inclusive Hiring: From 8% to 34% Diverse Shortlists",
    outcome: "Structured inclusion training for hiring managers plus blind CV review doubled diverse shortlists within one recruitment cycle.",
    tags: ["recruitment", "tech", "diversity"],
  },
  {
    org: "Local Authority",
    sector: "Public sector",
    title: "Embedding EDI in Policy An EIA Success Story",
    outcome: "Equality Impact Assessments embedded in all policy cycles reduced legal risk and improved service design for 3 marginalised groups.",
    tags: ["policy", "EIA", "public sector"],
  },
  {
    org: "Financial services firm",
    sector: "Finance",
    title: "Pay Gap Transparency as a Talent Strategy",
    outcome: "Publishing a full gender and ethnicity pay gap report with a five-year action plan increased diverse applications by 44%.",
    tags: ["pay gap", "transparency", "talent"],
  },
];

const DOWNLOADS = [
  {
    icon: "📄",
    title: "Business Case for Inclusion: Template",
    desc: "A structured Word document to present your EDI business case to senior stakeholders with prompts, data placeholders, and worked examples.",
    type: "Word document",
    free: true,
  },
  {
    icon: "📊",
    title: "EDI Metrics One-Pager",
    desc: "One-page overview of the most compelling inclusion metrics for a board or SLT audience. Print-ready.",
    type: "PDF",
    free: true,
  },
  {
    icon: "💰",
    title: "ROI of Inclusion Key Stats Sheet",
    desc: "Ready-to-use statistics from peer-reviewed research and major reports. Cite confidently in internal presentations.",
    type: "PDF",
    free: false,
  },
  {
    icon: "🗣️",
    title: "Talking to Sceptics: Script Guide",
    desc: "Conversation frameworks and language for responding to common objections to EDI from senior leaders and budget holders.",
    type: "PDF",
    free: false,
  },
  {
    icon: "📋",
    title: "Stakeholder Mapping Template",
    desc: "Map and analyse your internal stakeholders on influence and attitude to EDI to prioritise your engagement strategy.",
    type: "Excel / Sheets",
    free: false,
  },
];

type Tab = "research" | "cases" | "downloads";

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("research");

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Make the Case</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            Make the Case
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>
            Evidence, data, case studies and resources to build a compelling business case for inclusion.
          </p>
          <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--gray-border)" }}>
            {([
              { key: "research", label: "📊 Research & Data" },
              { key: "cases", label: "🏢 Case Studies" },
              { key: "downloads", label: "📁 Templates and Resources" },
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

        {activeTab === "research" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Key findings from the major reports curated and contextualised for EDI practitioners and the stakeholders they need to influence.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {RESEARCH_REPORTS.map((r) => (
                <div key={r.title} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{r.icon}</span>
                    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                      <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{r.desc}</p>
                  <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                    {r.access} →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "cases" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Real examples of inclusion driving measurable change for sharing with leadership, informing strategy, or as inspiration.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {CASE_STUDIES.map((c) => (
                <div key={c.title} className="card">
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "280px" }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                        <span className="badge badge-cream" style={{ fontSize: "0.65rem" }}>{c.sector}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{c.org}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{c.title}</h3>
                      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                        {c.tags.map((t) => <span key={t} className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{t}</span>)}
                      </div>
                    </div>
                    <div style={{ background: "var(--sage-xlight)", borderRadius: "10px", padding: "1.25rem", minWidth: "240px", flex: "0 0 auto" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Key outcome</div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{c.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "downloads" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Ready-to-use documents and templates download and adapt for your organisation.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {DOWNLOADS.map((d) => (
                <div key={d.title} className="card" style={{ position: "relative" }}>
                  {d.free && (
                    <span className="badge badge-sage" style={{ fontSize: "0.6rem", position: "absolute", top: "1rem", right: "1rem" }}>Free</span>
                  )}
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{d.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{d.title}</div>
                  <span className="badge badge-cream" style={{ fontSize: "0.6rem", marginBottom: "0.75rem", display: "inline-block" }}>{d.type}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>{d.desc}</p>
                  <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", width: "100%" }}>
                    Download →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
