"use client";

import Link from "next/link";
import { useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const STRATEGIES = [
  {
    id: "s1",
    number: "01",
    category: "Leadership",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534" },
    title: "Senior leadership commitment",
    points: [
      "Set measurable diversity targets at board and executive level and report publicly on progress.",
      "Include diversity outcomes in executive performance reviews and remuneration frameworks.",
      "Ensure leaders visibly sponsor under-represented groups rather than delegating EDI to HR alone.",
    ]
  },
  {
    id: "s2",
    number: "02",
    category: "Data",
    color: { bg: "#EFF6FF", border: "#93c5fd", text: "#1e40af" },
    title: "Robust diversity data collection",
    points: [
      "Collect voluntary, anonymised data on protected characteristics at every stage of the employee lifecycle.",
      "Disaggregate data to identify intersectional gaps rather than relying on single-characteristic analysis.",
      "Share data transparently with employees and use it to set priorities and evaluate interventions.",
    ]
  },
  {
    id: "s3",
    number: "03",
    category: "Recruitment",
    color: { bg: "#FFF7ED", border: "#fdba74", text: "#9a3412" },
    title: "Inclusive recruitment practices",
    points: [
      "Use structured, criteria-based interviews with diverse panels and standardised scoring.",
      "Remove identifying information from applications at shortlisting stage where possible.",
      "Expand talent pipelines beyond traditional networks to reach under-represented candidates.",
    ]
  },
  {
    id: "s4",
    number: "04",
    category: "Progression",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8" },
    title: "Equitable progression pathways",
    points: [
      "Audit promotion rates by protected characteristic and investigate and address gaps.",
      "Make criteria for advancement explicit, written, and consistently applied.",
      "Use sponsorship programmes to actively advocate for under-represented talent in promotion decisions.",
    ]
  },
  {
    id: "s5",
    number: "05",
    category: "Retention",
    color: { bg: "#FFF1F2", border: "#fda4af", text: "#9f1239" },
    title: "Retention and belonging",
    points: [
      "Conduct stay interviews and exit interviews disaggregated by protected characteristic.",
      "Build psychologically safe team cultures where challenge and difference are welcomed.",
      "Create employee resource groups with executive sponsors and protected meeting time.",
    ]
  },
  {
    id: "s6",
    number: "06",
    category: "Pay",
    color: { bg: "#FFFBEB", border: "#fcd34d", text: "#92400e" },
    title: "Pay and reward equity",
    points: [
      "Conduct annual equal pay audits and publish results with a credible action plan.",
      "Remove negotiation-based starting salaries that perpetuate historical pay gaps.",
      "Audit bonus and discretionary pay distributions for patterns by protected characteristic.",
    ]
  },
  {
    id: "s7",
    number: "07",
    category: "Culture",
    color: { bg: "#F0FDFA", border: "#5eead4", text: "#134e4a" },
    title: "Inclusive culture and belonging",
    points: [
      "Train all staff on inclusion, not just managers; make allyship skills explicit and practical.",
      "Address microaggressions and exclusionary behaviour promptly and consistently.",
      "Celebrate cultural and religious diversity in the calendar and in workplace norms.",
    ]
  },
  {
    id: "s8",
    number: "08",
    category: "Flexibility",
    color: { bg: "#F5F3FF", border: "#a5b4fc", text: "#3730a3" },
    title: "Flexible and accessible working",
    points: [
      "Offer flexible working as a day-one right and remove the assumption that requesting it signals low commitment.",
      "Conduct accessibility audits of physical and digital workspaces at regular intervals.",
      "Ensure reasonable adjustments processes are straightforward and confidentially supported.",
    ]
  },
  {
    id: "s9",
    number: "09",
    category: "Learning",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534" },
    title: "Diversity-focused learning and development",
    points: [
      "Invest in reverse mentoring programmes that surface lived experience to senior leaders.",
      "Offer targeted development for under-represented groups alongside universal programmes.",
      "Measure whether learning interventions change behaviour, not just participant satisfaction scores.",
    ]
  },
  {
    id: "s10",
    number: "10",
    category: "Accountability",
    color: { bg: "#EFF6FF", border: "#93c5fd", text: "#1e40af" },
    title: "Accountability structures",
    points: [
      "Establish a diversity committee with cross-functional membership and senior sponsorship.",
      "Publish an annual diversity report with progress against commitments, not just aspirations.",
      "Include diversity metrics in team and departmental scorecards, not only in central EDI reports.",
    ]
  },
  {
    id: "s11",
    number: "11",
    category: "Procurement",
    color: { bg: "#FFF7ED", border: "#fdba74", text: "#9a3412" },
    title: "Supplier diversity",
    points: [
      "Set targets for procurement spend with diverse-owned businesses and track progress.",
      "Include diversity criteria in supplier selection and contract renewal assessments.",
      "Support diverse suppliers through prompt payment, mentoring, and reduced tender barriers.",
    ]
  },
  {
    id: "s12",
    number: "12",
    category: "Community",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8" },
    title: "Community and sector partnerships",
    points: [
      "Partner with schools and colleges in under-represented communities to build early pipelines.",
      "Participate in sector-wide diversity benchmarking to identify relative strengths and gaps.",
      "Share what works openly; diversity is not a competitive advantage that benefits from secrecy.",
    ]
  },
  {
    id: "s13",
    number: "13",
    category: "Communication",
    color: { bg: "#FFF1F2", border: "#fda4af", text: "#9f1239" },
    title: "Inclusive internal communication",
    points: [
      "Use plain language and avoid jargon that excludes newer or junior employees.",
      "Ensure communications are accessible: screen-reader-friendly formats, captions on video, alt text on images.",
      "Feature diverse voices and stories in internal communications rather than always centring senior leaders.",
    ]
  },
  {
    id: "s14",
    number: "14",
    category: "Evaluation",
    color: { bg: "#FFFBEB", border: "#fcd34d", text: "#92400e" },
    title: "Continuous evaluation and learning",
    points: [
      "Run regular inclusion surveys with high-frequency pulse checks between annual cycles.",
      "Disaggregate employee engagement and wellbeing data by protected characteristic.",
      "Build a culture of honest review: celebrate what improved and investigate what did not.",
    ]
  },
];

export default function SupportingDiversityGuidePage() {
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setTicked(p => ({ ...p, [key]: !p[key] }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Supporting Diversity: A Strategy Guide
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Fourteen evidence-based strategies for embedding diversity across the organisation: from senior leadership commitment to supplier diversity and community partnerships. Use the tick boxes to track which strategies your organisation has in place.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Strategy", "Inclusion Practices", "Leadership", "Recruitment", "Retention"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {STRATEGIES.map(s => {
            const done = ticked[s.id];
            return (
              <div key={s.id} style={{
                background: "#fff", borderRadius: 12,
                border: `2px solid ${done ? "#BBF7D0" : "var(--gray-border, #e5e7eb)"}`,
                overflow: "hidden", display: "flex", flexDirection: "column"
              }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${s.color.border}`, background: s.color.bg }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: s.color.text }}>{s.number} &middot; {s.category}</span>
                    {done && <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", background: "#BBF7D0", padding: "2px 8px", borderRadius: 10 }}>In place</span>}
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "var(--charcoal)" }}>{s.title}</p>
                </div>
                <div style={{ padding: "0.875rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <ul style={{ margin: "0 0 12px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.points.map((pt, i) => {
                      const key = `${s.id}-${i}`;
                      const checked = ticked[key];
                      return (
                        <li key={i} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
                          <span style={{
                            flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
                            border: `2px solid ${checked ? s.color.text : "#d1d5db"}`,
                            background: checked ? s.color.bg : "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1
                          }}>
                            {checked && <span style={{ color: s.color.text, fontSize: 10, fontWeight: 800 }}>✓</span>}
                          </span>
                          <span style={{ fontSize: 13, color: checked ? "#9ca3af" : "#444", lineHeight: 1.5, textDecoration: checked ? "line-through" : "none" }}>{pt}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <button onClick={() => toggle(s.id)} style={{
                    background: done ? "#F0FDF4" : "var(--sage-dark)",
                    color: done ? "#166534" : "#fff",
                    border: `1px solid ${done ? "#86efac" : "var(--sage-dark)"}`,
                    borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700,
                    cursor: "pointer", width: "100%"
                  }}>
                    {done ? "✓ Strategy in place" : "Mark as in place"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why a strategic approach to diversity matters</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Diversity initiatives that exist in isolation rarely produce lasting change. A targeted recruitment campaign without equitable progression pathways simply moves under-representation to a different level. A leadership training programme without accountability structures produces short-lived behaviour change. Sustainable diversity requires a coherent strategy in which each element reinforces the others.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Evidence consistently shows that organisations with genuine diversity at all levels: including senior leadership: outperform their peers on innovation, decision-making quality, and employee engagement. The key word is genuine. Surface-level diversity that is not backed by an inclusive culture, equitable processes, and accountable leadership produces neither the business outcomes nor the social good that the research describes.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The fourteen strategies in this guide are drawn from academic research, organisational case studies, and evidence from the Equality and Human Rights Commission. None of them is a quick fix. All of them require sustained commitment, data-informed decision making, and the willingness to act on what the data reveals: even when the findings are uncomfortable.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { slug: "positive-action-guide", format: "Guide", title: "Positive Action Guide" },
              { slug: "making-policies-inclusive", format: "Checklist", title: "Making Policies Inclusive" },
              { slug: "inclusive-onboarding-guide", format: "Guide", title: "Inclusive Onboarding Guide" },
            ].map(r => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
