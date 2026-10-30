"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Tab = "audit" | "frameworks";
type Rating = "not_in_place" | "partially" | "fully" | null;

type CheckItem = {
  id: string;
  text: string;
  prompt: string;
};
type Section = { key: string; heading: string; icon: string; items: CheckItem[] };

const SECTIONS: Section[] = [
  {
    key: "pathways",
    heading: "Progression pathways and transparency",
    icon: "🗺️",
    items: [
      { id: "pp1", text: "Have clear progression pathways that are documented and accessible to all employees.", prompt: "Where are these pathways documented, and how do employees access them?" },
      { id: "pp2", text: "Ensure that criteria for promotion is consistent across all teams and roles.", prompt: "Who checks that criteria are consistent, and how often is this reviewed?" },
      { id: "pp3", text: "Ensure all employees understand the criteria and what is required to progress.", prompt: "How do you know employees understand the criteria? What evidence do you have?" },
      { id: "pp4", text: "Ensure all progression information is shared proactively with employees, not only on request.", prompt: "What mechanisms exist to proactively share this information?" },
    ],
  },
  {
    key: "data",
    heading: "Promotion data and outcomes",
    icon: "📊",
    items: [
      { id: "pd1", text: "Ensure promotion data is reviewed regularly to identify gaps or discrimination.", prompt: "How often is this data reviewed, and who is responsible for the review?" },
      { id: "pd2", text: "Regularly disaggregate the data by protected characteristics, including gender, race, ethnicity, disability, and age, to understand who is getting promoted and from which groups.", prompt: "Which characteristics do you currently disaggregate by, and are there any gaps?" },
      { id: "pd3", text: "Ensure any disparities in progression outcomes are investigated and not ignored; seek to rectify practices to ensure discrimination does not continue.", prompt: "Can you name a recent example where a disparity was identified and acted on?" },
      { id: "pd4", text: "Be transparent about all findings and share with all senior leaders and stakeholders.", prompt: "Who currently receives this data, and is it shared beyond HR?" },
    ],
  },
  {
    key: "performance",
    heading: "Performance management and bias",
    icon: "⚖️",
    items: [
      { id: "pm1", text: "Performance criteria must be clear, measurable, and role-relevant.", prompt: "How are criteria set, and who verifies they are free from subjectivity?" },
      { id: "pm2", text: "Train managers and senior leaders to recognise their own privileges and identify biases.", prompt: "When did managers last receive this training, and what did it cover?" },
      { id: "pm3", text: "Review language used in performance criteria for bias or exclusion; remove gendered and elitist language.", prompt: "Who has reviewed your language, and when was this last done?" },
      { id: "pm4", text: "Ensure consistent progression criteria is used to define outcomes, rather than perceived potential or readiness defined by likability or personal preference.", prompt: "What safeguards prevent personal preference from influencing outcomes?" },
      { id: "pm5", text: "Ensure subjective traits are not involved in decision making, such as style, appearance, personality type, accent, or culture fit.", prompt: "Is 'culture fit' used in your process? If so, how is it defined and bounded?" },
    ],
  },
  {
    key: "development",
    heading: "Access to development opportunities",
    icon: "🌱",
    items: [
      { id: "dev1", text: "Training and development opportunities must be advertised and shared openly with all employees.", prompt: "How are opportunities shared, and is there a central place employees can find them?" },
      { id: "dev2", text: "All employees should be encouraged to apply for progression opportunities by their managers; managers should mitigate their own biases in this process.", prompt: "How do you know managers are encouraging all employees equally?" },
      { id: "dev3", text: "Offer mentoring and sponsorship opportunities to all and ensure these opportunities are accessible to marginalised groups.", prompt: "Who currently benefits from mentoring and sponsorship, and is this tracked?" },
      { id: "dev4", text: "Learn employees' personal circumstances and become aware of barriers they may face such as time, cost, caring responsibilities, and location challenges; seek to support these barriers with appropriate interventions and access points.", prompt: "What adjustments or support do you currently offer to remove these barriers?" },
      { id: "dev5", text: "Ensure remote and hybrid workers have equal access to development and are not excluded from progression opportunities.", prompt: "Is access to development tracked by work pattern or location?" },
    ],
  },
  {
    key: "allocation",
    heading: "Opportunity allocation",
    icon: "🎯",
    items: [
      { id: "oa1", text: "Ensure high-profile and stretch projects are allocated fairly and equitably to give all employees the chance to develop their skills.", prompt: "Who decides who gets stretch opportunities, and is this process audited?" },
      { id: "oa2", text: "Decision-making about progression opportunities must be transparent and able to be communicated to employees and stakeholders if necessary; all decisions must be documented and supported by justification.", prompt: "How are decisions documented, and are employees told the reasons for outcomes?" },
    ],
  },
  {
    key: "leadership",
    heading: "Leadership and decision-making",
    icon: "👥",
    items: [
      { id: "ld1", text: "Promotional decisions should be made by more than one person and deliberated over using fair criteria.", prompt: "Who is involved in promotion decisions, and what criteria guides the panel?" },
      { id: "ld2", text: "Decision-making panels should be diverse and trained in inclusive decision-making and mitigating biases.", prompt: "How diverse are your current panels, and when did they last receive training?" },
      { id: "ld3", text: "Ensure there are open channels of communication where employees can ask for feedback on promotion outcomes.", prompt: "How easy is it for employees to request feedback, and is it consistently given?" },
    ],
  },
  {
    key: "intersectionality",
    heading: "Intersectionality check",
    icon: "🔗",
    items: [
      { id: "int1", text: "Critically examine power and privilege dynamics to inform fair, inclusive decision-making.", prompt: "In what ways do power dynamics show up in your progression processes?" },
      { id: "int2", text: "Assess how intersecting identities can lead to compounded disadvantage; for example, race and gender, disability and caregiving responsibilities.", prompt: "Does your data analysis look at intersecting characteristics, not just single ones?" },
      { id: "int3", text: "Actively work to dismantle these barriers to ensure certain groups are not consistently stalled at the same level.", prompt: "Which groups are currently stalled, and what targeted action is underway?" },
    ],
  },
  {
    key: "voice",
    heading: "Employee voice and lived experience",
    icon: "💬",
    items: [
      { id: "ev1", text: "Create safe opportunities for employees to share their views on progression fairness twice a year, such as staff surveys, town halls, etc.", prompt: "When did employees last have a structured opportunity to share views on progression?" },
      { id: "ev2", text: "Ensure chosen feedback mechanisms are varied and include anonymous and accessible channels.", prompt: "Can employees share concerns anonymously, and are all accessibility needs met?" },
      { id: "ev3", text: "Use exit interview data to capture progression-related insights; ensure all feedback leads to visible action.", prompt: "What changes have been made in the last year as a result of employee feedback?" },
    ],
  },
  {
    key: "accountability",
    heading: "Accountability and review",
    icon: "✅",
    items: [
      { id: "acc1", text: "Ensure inclusion goals are built into performance objectives and embedded into appraisal, promotion, and reward processes.", prompt: "Who currently has inclusion goals in their performance objectives?" },
      { id: "acc2", text: "Leaders should clearly own responsibility for fair progression, and leadership actions should be tracked and reviewed.", prompt: "Which leaders are held accountable for progression equity, and how?" },
      { id: "acc3", text: "Regularly review this audit to better your organisation's progression practices.", prompt: "When will you revisit this audit, and who will be part of that review?" },
    ],
  },
];

type FrameworkGroup = { heading: string; items: { name: string; desc: string }[] };

const FRAMEWORK_GROUPS: FrameworkGroup[] = [
  {
    heading: "Legal frameworks and statutory guidance",
    items: [
      { name: "Equality Act 2010", desc: "This foundational legislation protects individuals from discrimination based on protected characteristics, including sex and gender reassignment. It mandates equal treatment in employment and access to services." },
      { name: "Public Sector Equality Duty (PSED)", desc: "Public bodies must have due regard to eliminating discrimination, advancing equality, and fostering good relations between different people." },
      { name: "Worker Protection (Amendment of Equality Act 2010) Act 2023", desc: "Effective from October 2023, this act imposes a proactive duty on employers to prevent sexual harassment in the workplace." },
      { name: "Positive Action in the Workplace", desc: "Practical UK Government guidance on how employers can use positive action to remove barriers and improve equality in recruitment and promotion." },
    ],
  },
  {
    heading: "Industry standards and accreditation frameworks",
    items: [
      { name: "Athena SWAN Charter", desc: "A framework used across the UK to support and transform gender equality within higher education and research institutions. It recognises commitment to advancing the careers of women in STEM and beyond." },
      { name: "British Academy's Gender Equality in Research and Innovation Framework", desc: "This framework defines minimum standards and provides guidance on enhancing gender equality within research and innovation sectors." },
      { name: "National Equality Standard (NES)", desc: "Developed in collaboration with the UK government, NES provides a comprehensive framework for organisations to assess and benchmark their EDI performance." },
      { name: "Global Equality Standard", desc: "The GES takes into account the nuances of each culture across the globe including external socio-political environment, legislative and regulatory requirements, permissibility of demographic data collection, cultural views and norms, and external/industry levels of DE&I maturation and best practice." },
    ],
  },
  {
    heading: "Educational frameworks and research",
    items: [
      { name: "UCL Institute of Education: Accountability for Gender Equality in Education", desc: "UCL's framework supports national and international commitments to gender equality in education, providing tools for measuring and promoting equity." },
      { name: "CIPD: Discrimination at Work Factsheet", desc: "Chartered Institute of Personnel and Development resource which explains how the Equality Act protects employees from discrimination across hiring, training, and promotion." },
      { name: "UK Research and Innovation (UKRI) EDI Guidance", desc: "Offers best practices for integrating EDI principles into research design and organisational culture." },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

const RATING_CONFIG: Record<NonNullable<Rating>, { short: string; color: string; bg: string; border: string }> = {
  not_in_place: { short: "Not in place",     color: "#b91c1c", bg: "#fef2f2", border: "#fca5a5" },
  partially:    { short: "Partial",           color: "#92400e", bg: "#fffbeb", border: "#fcd34d" },
  fully:        { short: "Fully embedded",    color: "#166534", bg: "#f0fdf4", border: "#86efac" },
};

export default function FairProgressionAuditToolPage() {
  const [tab, setTab] = useState<Tab>("audit");
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const setRating = (id: string, rating: Rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
    if (rating) setExpanded((prev) => ({ ...prev, [id]: true }));
  };

  const toggleExpanded = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const ratedCount  = Object.values(ratings).filter(Boolean).length;
  const fullyCount  = Object.values(ratings).filter((r) => r === "fully").length;
  const partialCount = Object.values(ratings).filter((r) => r === "partially").length;
  const notCount    = Object.values(ratings).filter((r) => r === "not_in_place").length;
  const progressPct = TOTAL_ITEMS > 0 ? (ratedCount / TOTAL_ITEMS) * 100 : 0;

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const ratingBtn = (id: string, rv: NonNullable<Rating>) => {
    const cfg = RATING_CONFIG[rv];
    const active = ratings[id] === rv;
    return (
      <button
        key={rv}
        onClick={() => setRating(id, active ? null : rv)}
        style={{
          flex: 1, padding: "0.45rem 0.5rem", borderRadius: "8px", cursor: "pointer",
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem",
          lineHeight: 1.3, textAlign: "center" as const,
          border: active ? `2px solid ${cfg.border}` : "1.5px solid var(--gray-border)",
          background: active ? cfg.bg : "var(--white)",
          color: active ? cfg.color : "#6b7280",
          transition: "all 0.15s ease",
          boxShadow: active ? `0 0 0 2px ${cfg.border}` : "none",
        }}
      >
        {cfg.short}
      </button>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Fair Progression Audit Tool</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🔍</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Tool
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Fair Progression Audit: An Equity-Focused Assessment Tool
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "680px", margin: "0 0 1.25rem" }}>
            Rate how well your organisation embeds each practice: Not in place, Partially embedded, or Fully embedded. After each rating, a reflection prompt appears to help you think critically about the evidence behind your answer.
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("audit")} style={chipStyle(tab === "audit")}>📋 Self-assessment</button>
            <button onClick={() => setTab("frameworks")} style={chipStyle(tab === "frameworks")}>📚 Legal and research frameworks</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {tab === "audit" && (
          <>
            <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "1.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)" }}>Your progress</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--sage-dark)" }}>{ratedCount} of {TOTAL_ITEMS} assessed</span>
              </div>
              <div style={{ height: "8px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden", marginBottom: "1rem" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: "var(--sage-dark)", borderRadius: "999px", transition: "width 0.3s ease" }} />
              </div>
              {ratedCount > 0 && (
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {fullyCount > 0 && <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: RATING_CONFIG.fully.color, background: RATING_CONFIG.fully.bg, border: `1px solid ${RATING_CONFIG.fully.border}`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>✓ {fullyCount} fully embedded</span>}
                  {partialCount > 0 && <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: RATING_CONFIG.partially.color, background: RATING_CONFIG.partially.bg, border: `1px solid ${RATING_CONFIG.partially.border}`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>◑ {partialCount} partially embedded</span>}
                  {notCount > 0 && <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: RATING_CONFIG.not_in_place.color, background: RATING_CONFIG.not_in_place.bg, border: `1px solid ${RATING_CONFIG.not_in_place.border}`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>✕ {notCount} not in place</span>}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {SECTIONS.map((section) => {
                const sectionRated = section.items.filter((i) => ratings[i.id]).length;
                return (
                  <div key={section.key}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.875rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
                      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.975rem", color: "var(--charcoal)", margin: 0 }}>{section.heading}</h2>
                      <span style={{ marginLeft: "auto", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{sectionRated}/{section.items.length} rated</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {section.items.map((item) => {
                        const r = ratings[item.id] as NonNullable<Rating> | undefined;
                        const cfg = r ? RATING_CONFIG[r] : null;
                        const isExpanded = expanded[item.id];
                        return (
                          <div key={item.id} style={{ background: cfg ? cfg.bg : "var(--white)", border: cfg ? `1.5px solid ${cfg.border}` : "1.5px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "border-color 0.2s, background 0.2s" }}>
                            <div style={{ padding: "1rem 1rem 0.75rem" }}>
                              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.65, color: "var(--charcoal)", margin: "0 0 0.75rem" }}>{item.text}</p>
                              <div style={{ display: "flex", gap: "0.4rem" }}>
                                {(["not_in_place", "partially", "fully"] as NonNullable<Rating>[]).map((rv) => ratingBtn(item.id, rv))}
                              </div>
                            </div>
                            {r && (
                              <div style={{ borderTop: `1px solid ${cfg!.border}`, padding: "0.875rem 1rem" }}>
                                <button onClick={() => toggleExpanded(item.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: isExpanded ? "0.625rem" : 0, width: "100%" }}>
                                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: cfg!.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>💭 Reflection prompt</span>
                                  <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: cfg!.color, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                                </button>
                                {isExpanded && (
                                  <>
                                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: cfg!.color, lineHeight: 1.6, margin: "0 0 0.625rem", fontStyle: "italic" }}>{item.prompt}</p>
                                    <textarea
                                      value={notes[item.id] || ""}
                                      onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                      placeholder="Add your notes here..."
                                      rows={3}
                                      style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.6, color: "var(--charcoal)", background: "rgba(255,255,255,0.7)", border: `1px solid ${cfg!.border}`, borderRadius: "8px", padding: "0.5rem 0.75rem", resize: "vertical" as const, outline: "none" }}
                                    />
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem", marginTop: 0 }}>About this tool</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
                This tool supports teams to identify gaps, bias, and hidden barriers within promotion, development, and opportunity allocation. Rate each practice honestly to build a picture of your organisation's current maturity. It is not a substitute for legal advice: where your audit reveals potential unlawful discrimination, seek specialist HR or legal counsel before publishing findings externally. Your responses are not saved when you leave this page.
              </p>
            </div>
          </>
        )}

        {tab === "frameworks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {FRAMEWORK_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.875rem" }}>{group.heading}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {group.items.map((item) => (
                    <div key={item.name} className="card" style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", margin: "0 0 0.375rem" }}>{item.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <BottomBanner />
    </div>
  );
}
