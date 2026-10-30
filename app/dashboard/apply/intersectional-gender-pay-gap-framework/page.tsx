"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Section = "overview" | "data" | "analysis" | "action" | "report";

const SECTIONS: { key: Section; label: string; icon: string }[] = [
  { key: "overview",  label: "Overview",          icon: "🗺️" },
  { key: "data",      label: "Data collection",   icon: "📊" },
  { key: "analysis",  label: "Analysis",          icon: "🔍" },
  { key: "action",    label: "Action planning",   icon: "🎯" },
  { key: "report",    label: "Reporting",         icon: "📋" },
];

type AccordionItem = { id: string; title: string; body: React.ReactNode };

const SECTION_CONTENT: Record<Section, { heading: string; intro: string; items: AccordionItem[] }> = {
  overview: {
    heading: "Why an intersectional lens matters",
    intro: "A standard gender pay gap figure tells you very little. Aggregated data masks the experiences of women who face compounding disadvantage: a Black woman, a disabled woman, a woman with caring responsibilities. This framework guides you through analysis that disaggregates by multiple characteristics, so you can see where the real gaps are and act on the real drivers.",
    items: [
      {
        id: "ov1",
        title: "What intersectionality means for pay gap analysis",
        body: (
          <div>
            <p>Intersectionality, a term coined by Kimberlé Crenshaw, describes how different aspects of a person&apos;s identity — race, gender, disability, class, and others — interact to produce compounding and distinct experiences of disadvantage. In pay gap terms, this means:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, marginTop: "0.5rem" }}>
              <li>The overall gender pay gap may be 14%. But the gap between white men and Black women may be 32%.</li>
              <li>Women without disabilities may sit close to the organisational mean. Disabled women may be concentrated at the bottom of every grade.</li>
              <li>A standard gender pay gap report averages these experiences away. It allows organisations to report &ldquo;progress&rdquo; that has not touched the people with the greatest need.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "ov2",
        title: "What this framework does and does not do",
        body: (
          <p>This framework provides a structured process for collecting, analysing, and acting on intersectional pay data. It assumes you have some form of workforce data and some analytical capacity, though it suggests ways to work even with limited data. It does not replace legal advice: if your analysis reveals potential unlawful pay discrimination, seek legal counsel before reporting findings externally.</p>
        ),
      },
      {
        id: "ov3",
        title: "Who should lead this work",
        body: (
          <p>Intersectional pay analysis is most powerful when led by a cross-functional group: HR data, finance, a senior sponsor, and — critically — people with lived experience of intersecting disadvantage. Consider establishing a small analysis group that includes employees from underrepresented groups, with appropriate protections, so that insight into what the data means is not limited to those at the top of the organisation.</p>
        ),
      },
    ],
  },
  data: {
    heading: "Data collection",
    intro: "Good analysis depends on good data. Most organisations have gaps in their workforce data, particularly on characteristics like disability, ethnicity, and socioeconomic background. This section helps you understand what you have, what you need, and how to close the gap.",
    items: [
      {
        id: "d1",
        title: "What data to collect",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>For each employee, you ideally need:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li><strong>Pay:</strong> base pay, bonuses, benefits in kind, total remuneration</li>
              <li><strong>Grade or level:</strong> job family, pay band, seniority level</li>
              <li><strong>Role type:</strong> full-time or part-time, contract type</li>
              <li><strong>Protected characteristics:</strong> gender (including non-binary where possible), ethnicity, disability status, age</li>
              <li><strong>Socioeconomic background indicators:</strong> parental occupation at age 14, type of school attended (as a proxy for background, not ability)</li>
              <li><strong>Caring responsibilities:</strong> whether someone has declared caring responsibilities (this is not legally a protected characteristic in all jurisdictions but is a significant driver of pay gaps)</li>
              <li><strong>Tenure and time in grade:</strong> years in the organisation and in current role</li>
            </ul>
          </div>
        ),
      },
      {
        id: "d2",
        title: "How to improve data quality",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Low declaration rates for characteristics like ethnicity and disability are common. Causes: distrust that data will be used against employees; forms with limited options; lack of visible action on previous data. To improve rates:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Communicate clearly what the data will be used for and what protections are in place</li>
              <li>Make declaration optional but actively encouraged, with senior sponsorship</li>
              <li>Offer free-text fields alongside tick-box options for ethnicity, gender identity, and disability</li>
              <li>Publish what you have found and what you have done as a result: trust is built by closing the loop</li>
              <li>Set a minimum threshold for reporting (typically n = 10) to protect individual confidentiality and communicate that threshold to employees</li>
            </ul>
          </div>
        ),
      },
      {
        id: "d3",
        title: "Working with incomplete data",
        body: (
          <p>If you have data for 60% of employees on ethnicity, you can still report on those 60% — but be transparent about coverage rates. Avoid over-indexing on the characteristics where data is complete (typically gender, because it is legally required) at the expense of characteristics where data is sparse. A &ldquo;we do not know&rdquo; is more honest, and more useful, than a &ldquo;no gap found&rdquo; that is only true because the data is missing.</p>
        ),
      },
    ],
  },
  analysis: {
    heading: "Analysis",
    intro: "The analysis stage translates raw data into meaningful findings. Work through the layers below in sequence: each builds on the last.",
    items: [
      {
        id: "an1",
        title: "Step 1: Establish your baseline figures",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Start with the standard statutory figures (where legally required) to establish a baseline:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Mean and median gender pay gap (total and for each pay quartile)</li>
              <li>Bonus gap (mean and median)</li>
              <li>Proportion of men and women receiving a bonus</li>
              <li>Gender representation across each pay quartile</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>These figures are the floor, not the ceiling. They tell you very little about cause. They do not tell you whether the gap is driven by occupational segregation, by differences in progression rates, by part-time working patterns, or by unequal base pay within the same grade.</p>
          </div>
        ),
      },
      {
        id: "an2",
        title: "Step 2: Disaggregate by ethnicity",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Where data allows, calculate pay gaps for each ethnic group relative to white men (not just relative to &ldquo;women&rdquo; or the organisation mean). Look for:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Mean and median base pay gap for each ethnic group</li>
              <li>Bonus gap for each ethnic group</li>
              <li>Representation at each grade level</li>
              <li>Progression rates: what proportion of each group moved up a grade in the last 3 years?</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>Note: UK reporting currently requires ethnicity pay gap reporting to use binary groupings in some frameworks. Report at the most granular level your data allows, not just at the binary level required for compliance.</p>
          </div>
        ),
      },
      {
        id: "an3",
        title: "Step 3: Disaggregate by disability status",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Calculate:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Pay gap between disabled and non-disabled employees overall</li>
              <li>Pay gap within gender groups (disabled women vs non-disabled women; disabled men vs non-disabled men)</li>
              <li>Representation of disabled employees at each grade</li>
              <li>Progression and retention rates for disabled employees</li>
            </ul>
          </div>
        ),
      },
      {
        id: "an4",
        title: "Step 4: Intersectional cross-tabulations",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Now cross-tabulate to find the compounding effects:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Pay for disabled Black women vs non-disabled white men</li>
              <li>Progression rates for women of colour vs white men</li>
              <li>Bonus distribution for part-time disabled women</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>Minimum cell sizes apply here too: where you have fewer than 10 people in a cell, do not report that specific figure externally but flag internally that data is insufficient. Small cell sizes may indicate structural exclusion at senior levels that should itself be named as a finding.</p>
          </div>
        ),
      },
      {
        id: "an5",
        title: "Step 5: Identify drivers",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Gaps are produced by specific mechanisms. Common drivers to investigate:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li><strong>Occupational segregation:</strong> are certain groups concentrated in lower-paid roles or job families?</li>
              <li><strong>Grade distribution:</strong> are certain groups over-represented at the bottom and under-represented at the top?</li>
              <li><strong>Starting salary inequity:</strong> were certain groups offered lower salaries on entry?</li>
              <li><strong>Progression inequity:</strong> are certain groups less likely to be promoted, or progressing more slowly?</li>
              <li><strong>Part-time working penalty:</strong> are pay gaps partly explained by the concentration of certain groups in part-time roles that attract lower pro-rata pay or fewer bonuses?</li>
              <li><strong>Bonus allocation:</strong> are certain groups systematically receiving lower bonuses for equivalent roles?</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  action: {
    heading: "Action planning",
    intro: "Analysis without action is just data collection. Use the findings from your analysis to build a targeted action plan that addresses the specific drivers you have identified, not generic initiatives that may not touch the people most affected.",
    items: [
      {
        id: "ac1",
        title: "Match actions to drivers",
        body: (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>Each driver calls for a specific response:</p>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li><strong>Occupational segregation:</strong> inclusive recruitment targeting underrepresented groups in higher-paid roles; reviewing job evaluation systems for bias</li>
              <li><strong>Grade distribution:</strong> sponsorship and mentoring programmes targeted at underrepresented groups; transparent promotion criteria; structured promotion panels with diverse membership</li>
              <li><strong>Starting salary inequity:</strong> ban negotiation on starting salary; set starting salaries within a defined range and apply consistently; audit starting salaries for each new hire</li>
              <li><strong>Bonus allocation inequity:</strong> structured calibration of bonus recommendations; blind review of performance ratings; clear and measurable bonus criteria</li>
              <li><strong>Part-time working penalty:</strong> ensure part-time roles are available at all grades; review pro-rata bonus treatment; ensure part-time workers are equally eligible for progression</li>
            </ul>
          </div>
        ),
      },
      {
        id: "ac2",
        title: "Prioritise and sequence",
        body: (
          <p>Not all actions can be taken at once. Prioritise actions by: the size of the gap they address, the speed at which change is achievable, and the degree to which they address systemic vs symptomatic causes. A salary audit can produce results within months; shifting progression rates takes years. Both are necessary; neither alone is sufficient. Set targets with timeframes and name an accountable owner for each action.</p>
        ),
      },
      {
        id: "ac3",
        title: "Involve affected employees",
        body: (
          <p>Action plans developed without input from the people they are meant to help often miss the mark. Convene a working group that includes employees from underrepresented groups — with appropriate protections and recognition for their time — to stress-test your action plan before finalising it. Ask: what would actually make a difference? What has been tried before and not worked? What would make this organisation a better place to work for people like you?</p>
        ),
      },
    ],
  },
  report: {
    heading: "Reporting",
    intro: "How you report findings matters as much as what you find. Transparency builds trust; vagueness erodes it. Use these principles when communicating your analysis internally and externally.",
    items: [
      {
        id: "r1",
        title: "What to include in your report",
        body: (
          <div>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li><strong>Coverage:</strong> what proportion of your workforce data covers each characteristic you analysed</li>
              <li><strong>Headline figures:</strong> mean and median gaps for each group you analysed, with a clear benchmark (typically white non-disabled men at the same grade or seniority level)</li>
              <li><strong>Trends:</strong> are gaps narrowing, stable, or widening year on year?</li>
              <li><strong>Drivers:</strong> what your analysis indicates is driving each gap</li>
              <li><strong>Actions:</strong> what you are doing, with targets and timescales</li>
              <li><strong>What you do not yet know:</strong> where data is insufficient and what you are doing to address it</li>
            </ul>
          </div>
        ),
      },
      {
        id: "r2",
        title: "Narrative traps to avoid",
        body: (
          <div>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li><strong>The pipeline excuse:</strong> attributing gaps entirely to external pipeline issues obscures what the organisation can control (retention, progression, starting salary).</li>
              <li><strong>The positive framing distortion:</strong> leading with what has improved and burying what has not.</li>
              <li><strong>The adjusted gap sleight of hand:</strong> reporting a &ldquo;controlled&rdquo; or &ldquo;adjusted&rdquo; gap (which adjusts for seniority and role) as the primary figure. The adjusted gap measures whether people are paid equally for the same job. The unadjusted gap measures the structural inequality of who gets which job. Both matter; neither replaces the other.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "r3",
        title: "How often to report",
        body: (
          <p>Report annually as a minimum. Share interim progress updates — what actions have been taken, what has changed — with the workforce at least twice a year. Silence between annual reports suggests either that nothing has been done or that progress is being obscured. Neither is a good look.</p>
        ),
      },
    ],
  },
};

export default function IntersectionalGenderPayGapFrameworkPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sectionData = SECTION_CONTENT[activeSection];

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
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Intersectional Gender Pay Gap Framework</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>⚖️</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              📐 Framework
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Intersectional Gender Pay Gap Framework
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            A structured approach to pay gap analysis that goes beyond binary gender reporting: how to collect intersectional data, what to analyse, how to identify the real drivers, and how to plan and report action.
          </p>

          {/* Section tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "0.25rem" }}>
            {SECTIONS.map((s) => (
              <button key={s.key} onClick={() => { setActiveSection(s.key); setExpanded(null); }} style={chipStyle(activeSection === s.key)}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>{sectionData.heading}</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{sectionData.intro}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sectionData.items.map((item) => {
            const isOpen = expanded === item.id;
            return (
              <div key={item.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.875rem" }}
                >
                  <span style={{ fontSize: "1rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "block", color: "var(--sage-dark)", fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>+</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>{item.title}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem 1.25rem", borderTop: "1px solid var(--gray-border)", paddingTop: "1rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.75 }}>
                    {item.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* About */}
        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>About this framework</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            This framework draws on established pay equity methodology and intersectionality scholarship. It is intended as a starting point, not a complete analytical protocol: the appropriate approach will depend on your organisation&apos;s size, data maturity, and legal context. For personalised analysis of your own pay data, see the Gender Pay Gap Analysis Tool.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
