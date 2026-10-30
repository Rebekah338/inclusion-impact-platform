"use client";

import { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

type Tab = "steps" | "frameworks";

const STEPS = [
  {
    num: "01",
    title: "Collect pay data",
    bullets: [
      "Collate all pay data including all contract types for all employees across the organisation, including all benefits.",
      "Ensure anonymity and confidentiality in employee data collection.",
      "Order data across gender, race/ethnicity, disability, sexual orientation, age, and contract type.",
    ],
  },
  {
    num: "02",
    title: "Conduct a pay audit",
    bullets: [
      "Use data to examine through an intersectional lens: who is in leadership? Who is in lower-paid roles? Where are the biggest gaps and disparities?",
      "Identify gaps and budget to close these by the next financial year.",
      "Consider back pay to aim for equity.",
    ],
  },
  {
    num: "03",
    title: "Listen to the lived experience of a diverse range of women",
    bullets: [
      "Create safe spaces for staff to share their experiences and create feedback loops so staff can flag pay issues safely.",
      "Incorporate qualitative insights into reports alongside the numbers.",
      "Support Employee Resource Groups that are funded and influential in policy-making.",
    ],
  },
  {
    num: "04",
    title: "Create a pay transparency culture",
    bullets: [
      "Encourage open conversations about pay and progression between all staff.",
      "Share annual pay equity reports, internally and externally; where possible break figures down by marginalised identities.",
      "Report findings with transparency.",
      "Go beyond binary gender reporting.",
    ],
  },
  {
    num: "05",
    title: "Tackle bias in progression",
    bullets: [
      "Review promotion, hiring, and bonus processes.",
      "Set up clear pathways for promotions based on skills, experience, and merit; consider positive action for equity.",
      "Train managers on unconscious bias and equity-focused leadership.",
      "Provide bias interrupter tools for use in appraisals and hiring processes.",
    ],
  },
  {
    num: "06",
    title: "Implement inclusive recruitment practices",
    bullets: [
      "Aim for more women in leadership positions by auditing job descriptions for inclusive language and expand the job pools and platforms you are advertising in.",
      "Use diverse messaging and imagery on your website and attach EDI policies.",
      "Use blind recruitment practices and have a diverse interview panel.",
    ],
  },
  {
    num: "07",
    title: "Standardise pay structures",
    bullets: [
      "Introduce transparent pay bands for each role and ensure all employees know them; include them in job adverts.",
      "Eliminate ad-hoc negotiations that favour the most confident (often men).",
      "Implement structured promotion criteria so advancement is equitable.",
    ],
  },
  {
    num: "08",
    title: "Work to eliminate the motherhood penalty",
    bullets: [
      "Promote hybrid, part-time, and job-share options across all levels and leadership.",
      "Ensure flexible roles are not penalised in pay or progression.",
      "Support return-to-work programmes for those who have taken career breaks.",
      "Do not penalise women for childcare responsibilities.",
    ],
  },
  {
    num: "09",
    title: "Develop targets and track progress",
    bullets: [
      "Set goals and KPIs for reducing pay disparities across identity groups.",
      "Offer mentoring and sponsorship programmes for underrepresented staff.",
      "Ensure parental leave, flexible working, and pay transparency policies are inclusive and accessible to all.",
    ],
  },
  {
    num: "10",
    title: "Hold leadership accountable",
    bullets: [
      "Hold executives and departments accountable for change.",
      "Engage board members and stakeholders in gender pay goals and commitments.",
      "Link progress on pay equity to leadership performance metrics.",
      "Have leaders share and present report findings annually to stay accountable.",
    ],
  },
  {
    num: "11",
    title: "Embed equity in policy",
    bullets: [
      "Audit maternity/paternity/parental leave policies for fairness and inclusivity.",
      "Provide equal access to benefits for part-time and contract workers.",
      "Ensure your grievance processes are equipped to handle discrimination concerns around pay and progression.",
    ],
  },
  {
    num: "12",
    title: "Appoint a pay equity lead or taskforce",
    bullets: [
      "Establish a dedicated person or team responsible for monitoring, analysing, and responding to pay gap trends, especially across intersecting identities.",
      "Review exit interview data: are there patterns by marginalised identities?",
      "Use insights to address barriers and blind spots.",
    ],
  },
  {
    num: "13",
    title: "Praise good practice",
    bullets: [
      "Celebrate organisations and teams closing their gaps.",
      "Celebrate targeted leadership programmes for underrepresented groups.",
      "Celebrate sponsorship and mentoring schemes, especially for minoritised women with intersectional experiences.",
    ],
  },
  {
    num: "14",
    title: "Continue to conduct regular intersectional pay audits",
    bullets: [
      "Continue to compare salaries by gender and by other identity markers (e.g. race, disability, age).",
      "Audit across role types, not just job titles.",
      "Include starting salaries, bonuses, overtime, and benefits.",
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
        name: "WISE Gender Equity Framework",
        desc: "Developed by the WISE Campaign, this framework encompasses five pillars: data, attraction, progression, retention, and engagement, aiming to improve gender balance in STEM industries.",
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
        name: "Women's Budget Group: Education, Gender Equity, and Social Justice",
        desc: "This paper discusses key issues of gender inequity in UK education, highlighting areas such as funding, achievement, and subject choice.",
      },
      {
        name: "UK Research and Innovation (UKRI) EDI Guidance",
        desc: "Offers best practices for integrating EDI principles into research design and organisational culture.",
      },
    ],
  },
];

function StepCard({ step }: { step: typeof STEPS[0] }) {
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <span style={{ flexShrink: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: "var(--sage-light)", lineHeight: 1 }}>
          {step.num}
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.4, paddingTop: "0.15rem" }}>
          {step.title}
        </span>
      </div>
      <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {step.bullets.map((b, i) => (
          <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)", lineHeight: 1.65 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IntersectionalGenderPayGapFrameworkPage() {
  const [tab, setTab] = useState<Tab>("steps");

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

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Intersectional Gender Pay Gap Framework</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>⚖️</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              📐 Framework
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            An Intersectional Framework to Address the Gender Pay Gap
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "680px", margin: "0 0 1.25rem" }}>
            The gender pay gap is not experienced equally. To effectively close the gap, businesses must go beyond broad averages and consider how race, ethnicity, disability, sexual orientation, age, and other identities intersect with gender and pay. Businesses that lead with intersectionality will not only close gaps faster, but foster inclusive cultures.
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("steps")} style={chipStyle(tab === "steps")}>📋 14-step framework</button>
            <button onClick={() => setTab("frameworks")} style={chipStyle(tab === "frameworks")}>📚 Legal and research frameworks</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {tab === "steps" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.875rem" }}>
            {STEPS.map((step) => <StepCard key={step.num} step={step} />)}
          </div>
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

        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem", marginTop: 0 }}>About this resource</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            This framework has been developed by The Inclusion Edit to support organisations in moving beyond binary gender pay gap reporting. It draws on UK legislation, industry accreditation standards, and intersectionality scholarship. It is a starting point for action, not a substitute for legal advice: where your analysis reveals potential unlawful pay discrimination, seek legal counsel before reporting externally.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
