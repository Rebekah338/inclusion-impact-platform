"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Tab = "audit" | "frameworks";

type CheckItem = { id: string; text: string };
type Section = { key: string; heading: string; icon: string; items: CheckItem[] };

const SECTIONS: Section[] = [
  {
    key: "pathways",
    heading: "Progression pathways and transparency",
    icon: "🗺️",
    items: [
      { id: "pp1", text: "Have clear progression pathways that are documented and accessible to all employees." },
      { id: "pp2", text: "Ensure that criteria for promotion is consistent across all teams and roles." },
      { id: "pp3", text: "Ensure all employees understand the criteria and what is required to progress." },
      { id: "pp4", text: "Ensure all progression information is shared proactively with employees, not only on request." },
    ],
  },
  {
    key: "data",
    heading: "Promotion data and outcomes",
    icon: "📊",
    items: [
      { id: "pd1", text: "Ensure promotion data is reviewed regularly to identify gaps or discrimination." },
      { id: "pd2", text: "Regularly disaggregate the data by protected characteristics, including gender, race, ethnicity, disability, and age, to understand who is getting promoted and from which groups." },
      { id: "pd3", text: "Ensure any disparities in progression outcomes are investigated and not ignored; seek to rectify practices to ensure discrimination does not continue." },
      { id: "pd4", text: "Be transparent about all findings and share with all senior leaders and stakeholders." },
    ],
  },
  {
    key: "performance",
    heading: "Performance management and bias",
    icon: "⚖️",
    items: [
      { id: "pm1", text: "Performance criteria must be clear, measurable, and role-relevant." },
      { id: "pm2", text: "Train managers and senior leaders to recognise their own privileges and identify biases." },
      { id: "pm3", text: "Review language used in performance criteria for bias or exclusion; remove gendered and elitist language." },
      { id: "pm4", text: "Ensure consistent progression criteria is used to define outcomes, rather than perceived potential or readiness defined by likability or personal preference." },
      { id: "pm5", text: "Ensure subjective traits are not involved in decision making, such as style, appearance, personality type, accent, or culture fit." },
    ],
  },
  {
    key: "development",
    heading: "Access to development opportunities",
    icon: "🌱",
    items: [
      { id: "dev1", text: "Training and development opportunities must be advertised and shared openly with all employees." },
      { id: "dev2", text: "All employees should be encouraged to apply for progression opportunities by their managers; managers should mitigate their own biases in this process." },
      { id: "dev3", text: "Offer mentoring and sponsorship opportunities to all and ensure these opportunities are accessible to marginalised groups." },
      { id: "dev4", text: "Learn employees' personal circumstances and become aware of barriers they may face such as time, cost, caring responsibilities, and location challenges; seek to support these barriers with appropriate interventions and access points." },
      { id: "dev5", text: "Ensure remote and hybrid workers have equal access to development and are not excluded from progression opportunities." },
    ],
  },
  {
    key: "allocation",
    heading: "Opportunity allocation",
    icon: "🎯",
    items: [
      { id: "oa1", text: "Ensure high-profile and stretch projects are allocated fairly and equitably to give all employees the chance to develop their skills." },
      { id: "oa2", text: "Decision-making about progression opportunities must be transparent and able to be communicated to employees and stakeholders if necessary; all decisions must be documented and supported by justification." },
    ],
  },
  {
    key: "leadership",
    heading: "Leadership and decision-making",
    icon: "👥",
    items: [
      { id: "ld1", text: "Promotional decisions should be made by more than one person and deliberated over using fair criteria." },
      { id: "ld2", text: "Decision-making panels should be diverse and trained in inclusive decision-making and mitigating biases." },
      { id: "ld3", text: "Ensure there are open channels of communication where employees can ask for feedback on promotion outcomes." },
    ],
  },
  {
    key: "intersectionality",
    heading: "Intersectionality check",
    icon: "🔗",
    items: [
      { id: "int1", text: "Critically examine power and privilege dynamics to inform fair, inclusive decision-making." },
      { id: "int2", text: "Assess how intersecting identities can lead to compounded disadvantage; for example, race and gender, disability and caregiving responsibilities." },
      { id: "int3", text: "Actively work to dismantle these barriers to ensure certain groups are not consistently stalled at the same level." },
    ],
  },
  {
    key: "voice",
    heading: "Employee voice and lived experience",
    icon: "💬",
    items: [
      { id: "ev1", text: "Create safe opportunities for employees to share their views on progression fairness twice a year, such as staff surveys, town halls, etc." },
      { id: "ev2", text: "Ensure chosen feedback mechanisms are varied and include anonymous and accessible channels." },
      { id: "ev3", text: "Use exit interview data to capture progression-related insights; ensure all feedback leads to visible action." },
    ],
  },
  {
    key: "accountability",
    heading: "Accountability and review",
    icon: "✅",
    items: [
      { id: "acc1", text: "Ensure inclusion goals are built into performance objectives and embedded into appraisal, promotion, and reward processes." },
      { id: "acc2", text: "Leaders should clearly own responsibility for fair progression, and leadership actions should be tracked and reviewed." },
      { id: "acc3", text: "Regularly review this audit to better your organisation's progression practices." },
    ],
  },
];

type FrameworkGroup = { heading: string; items: { name: string; desc: string }[] };

const FRAMEWORK_GROUPS: FrameworkGroup[] = [
  {
    heading: "Legal frameworks and statutory guidance",
    items: [
      {
        name: "Equality Act 2010",
        desc: "This foundational legislation protects individuals from discrimination based on protected characteristics, including sex and gender reassignment. It mandates equal treatment in employment and access to services.",
      },
      {
        name: "Public Sector Equality Duty (PSED)",
        desc: "Public bodies must have due regard to eliminating discrimination, advancing equality, and fostering good relations between different people.",
      },
      {
        name: "Worker Protection (Amendment of Equality Act 2010) Act 2023",
        desc: "Effective from October 2023, this act imposes a proactive duty on employers to prevent sexual harassment in the workplace.",
      },
      {
        name: "Positive Action in the Workplace",
        desc: "Practical UK Government guidance on how employers can use positive action to remove barriers and improve equality in recruitment and promotion.",
      },
    ],
  },
  {
    heading: "Industry standards and accreditation frameworks",
    items: [
      {
        name: "Athena SWAN Charter",
        desc: "A framework used across the UK to support and transform gender equality within higher education and research institutions. It recognises commitment to advancing the careers of women in STEM and beyond.",
      },
      {
        name: "British Academy's Gender Equality in Research and Innovation Framework",
        desc: "This framework defines minimum standards and provides guidance on enhancing gender equality within research and innovation sectors.",
      },
      {
        name: "National Equality Standard (NES)",
        desc: "Developed in collaboration with the UK government, NES provides a comprehensive framework for organisations to assess and benchmark their EDI performance.",
      },
      {
        name: "Global Equality Standard",
        desc: "The GES takes into account the nuances of each culture across the globe including external socio-political environment, legislative and regulatory requirements, permissibility of demographic data collection, cultural views and norms, and external/industry levels of DE&I maturation and best practice.",
      },
    ],
  },
  {
    heading: "Educational frameworks and research",
    items: [
      {
        name: "UCL Institute of Education: Accountability for Gender Equality in Education",
        desc: "UCL's framework supports national and international commitments to gender equality in education, providing tools for measuring and promoting equity.",
      },
      {
        name: "CIPD: Discrimination at Work Factsheet",
        desc: "Chartered Institute of Personnel and Development resource which explains how the Equality Act protects employees from discrimination across hiring, training, and promotion.",
      },
      {
        name: "UK Research and Innovation (UKRI) EDI Guidance",
        desc: "Offers best practices for integrating EDI principles into research design and organisational culture.",
      },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

export default function FairProgressionAuditToolPage() {
  const [tab, setTab] = useState<Tab>("audit");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const tickedCount = Object.values(checked).filter(Boolean).length;
  const progressPct = TOTAL_ITEMS > 0 ? (tickedCount / TOTAL_ITEMS) * 100 : 0;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

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

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* Breadcrumb */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Fair Progression Audit Tool</span>
      </nav>

      {/* Header */}
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
            A practical tool to assess equity, fairness, and inclusion in progression, promotion, and development. Using a checklist-based approach, it supports teams to identify gaps, bias, and hidden barriers. Tick each item as you work through it.
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("audit")} style={chipStyle(tab === "audit")}>📋 Audit checklist</button>
            <button onClick={() => setTab("frameworks")} style={chipStyle(tab === "frameworks")}>📚 Legal and research frameworks</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {tab === "audit" && (
          <>
            {/* Progress bar */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--charcoal)" }}>Your progress</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--sage-dark)" }}>{tickedCount} of {TOTAL_ITEMS} completed</span>
              </div>
              <div style={{ height: "8px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: "var(--sage-dark)", borderRadius: "999px", transition: "width 0.3s ease" }} />
              </div>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {SECTIONS.map((section) => {
                const sectionChecked = section.items.filter((i) => checked[i.id]).length;
                const allDone = sectionChecked === section.items.length;
                return (
                  <div key={section.key}>
                    {/* Section heading */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
                      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: allDone ? "var(--sage-dark)" : "var(--charcoal)", margin: 0 }}>
                        {section.heading}
                      </h2>
                      {allDone && <span style={{ fontSize: "0.85rem", color: "var(--sage-dark)" }}>✓</span>}
                      <span style={{ marginLeft: "auto", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{sectionChecked}/{section.items.length}</span>
                    </div>

                    {/* Items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {section.items.map((item) => {
                        const isChecked = !!checked[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            style={{
                              background: isChecked ? "#f0faf4" : "var(--white)",
                              border: isChecked ? "1.5px solid var(--sage-light)" : "1.5px solid var(--gray-border)",
                              borderRadius: "10px",
                              padding: "0.85rem 1rem",
                              display: "flex", alignItems: "flex-start", gap: "0.75rem",
                              cursor: "pointer",
                              transition: "background 0.15s, border-color 0.15s",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                            }}
                          >
                            <span style={{
                              flexShrink: 0, width: "1.15rem", height: "1.15rem",
                              borderRadius: "4px",
                              border: isChecked ? "2px solid var(--sage-dark)" : "2px solid var(--gray-border)",
                              background: isChecked ? "var(--sage-dark)" : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#fff", fontSize: "0.7rem", marginTop: "0.1rem",
                            }}>
                              {isChecked && "✓"}
                            </span>
                            <span style={{
                              fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.65,
                              color: isChecked ? "#6b7280" : "var(--charcoal)",
                              textDecoration: isChecked ? "line-through" : "none",
                            }}>
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* About */}
            <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem", marginTop: 0 }}>About this tool</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
                This tool is a practical resource to assess equity, fairness, and inclusion in progression, promotion, and development. It supports teams to identify gaps, bias, and hidden barriers within promotion, development, and opportunity allocation. It encourages reflection, evidence-gathering, and action planning, helping organisations embed fair, transparent, and inclusive progression systems that support long-term equity and sustainable change. It is not a substitute for legal advice: where your audit reveals potential unlawful discrimination, seek specialist HR or legal counsel before publishing findings externally. Your progress is not saved when you leave this page.
              </p>
            </div>
          </>
        )}

        {tab === "frameworks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {FRAMEWORK_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.875rem" }}>
                  {group.heading}
                </h2>
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
