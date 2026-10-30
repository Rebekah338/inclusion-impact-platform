"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const AREAS = [
  {
    id: "understanding",
    title: "Understanding Ageism",
    desc: "Ageism operates in both directions: it can target older workers and younger workers. It often goes unrecognised because age-based assumptions are treated as common sense.",
    items: [
      "Ageism can mean assuming older workers resist change or younger workers lack credibility",
      "Age-based humour and language in the workplace can normalise discrimination",
      "Ageism intersects with gender, race, and disability: older women and workers of colour can face compounded barriers",
      "Not all workers experience ageism in the same way: seniority, role type, and sector all shape the experience",
    ],
    action: "Audit how your organisation talks about age: in job adverts, appraisal language, and informal culture.",
  },
  {
    id: "recruitment",
    title: "Recruitment and Job Design",
    desc: "Ageism enters recruitment through language, criteria, and assumptions about fit.",
    items: [
      "Avoid age-coded language: \"digital native\", \"fresh graduate\", \"energetic\", \"recent experience\"",
      "Do not list years of experience as a proxy for seniority when skills are what matter",
      "Remove graduation years from application forms unless legally required",
      "Train hiring managers to recognise age bias in interviews and scoring",
      "Ensure job design reflects realistic duties rather than assumptions about stamina or pace",
    ],
    action: "Review your last 5 job descriptions for age-coded language and remove or reframe it.",
  },
  {
    id: "progression",
    title: "Career Progression",
    desc: "Assumptions about ambition and development readiness based on age can block progression at any life stage.",
    items: [
      "Do not assume older workers are no longer interested in development or promotion",
      "Do not assume younger workers are not ready for leadership",
      "Provide career conversations that are age-neutral and focused on skills and aspiration",
      "Offer reverse mentoring and cross-generational learning as standard practice",
      "Track promotion data by age to identify patterns of exclusion",
    ],
    action: "Review your promotion data by age cohort and look for gaps or clusters.",
  },
  {
    id: "performance",
    title: "Performance Management",
    desc: "Performance frameworks can embed ageist assumptions about pace, adaptability, and output.",
    items: [
      "Ensure performance criteria are based on outcome, not speed or style",
      "Avoid framing \"growth mindset\" in ways that penalise those who have already developed strong expertise",
      "Do not use age as an implicit explanation for underperformance",
      "Ensure appraisal processes support workers returning from carer leave or health-related absence, which are more common in mid to later career",
    ],
    action: "Audit your performance management language for terms that could disadvantage workers at specific life stages.",
  },
  {
    id: "leadership",
    title: "Leadership and Representation",
    desc: "Leadership pipelines often skew toward specific age ranges, excluding both younger and older talent.",
    items: [
      "Review the age distribution across leadership tiers",
      "Create leadership development pathways that are not age-gated",
      "Ensure your senior leadership team includes people at different life and career stages",
      "Challenge assumptions that younger leaders lack authority or older leaders lack vision",
    ],
    action: "Map your leadership team by age and set targets for broader representation if needed.",
  },
  {
    id: "culture",
    title: "Everyday Language and Culture",
    desc: "Culture is shaped by the small, everyday interactions that normalise or challenge ageism.",
    items: [
      "Challenge age-related jokes and comments even when they seem light-hearted",
      "Avoid language that frames generations as monolithic: \"millennials\" or \"boomers\" as shorthand for attitudes",
      "Celebrate expertise and experience at all career stages",
      "Promote multi-generational teamwork and shared learning",
    ],
    action: "Facilitate a team conversation about generational assumptions and how they show up in your workplace.",
  },
  {
    id: "flexible",
    title: "Flexible Working",
    desc: "Flexible working matters to workers at all life stages for different reasons: caring for children or parents, health, phased retirement, or learning alongside work.",
    items: [
      "Make flexible working requests genuinely supported, not technically available but culturally discouraged",
      "Do not assume only certain age groups need or want flexibility",
      "Support phased retirement as an option for those approaching the end of their career",
      "Review part-time and flexible roles to ensure they are not concentrated in lower grades",
    ],
    action: "Survey staff about whether they feel they can access flexible working without career penalty.",
  },
  {
    id: "intersectionality",
    title: "Intersectionality",
    desc: "Age does not operate in isolation: it compounds with other identities to create layered disadvantage or privilege.",
    items: [
      "Recognise that older women can face a specific double disadvantage in pay, progression, and recognition",
      "Understand that racialised workers can face ageism earlier in their careers due to compounded stereotyping",
      "Ensure your ageism data is disaggregated by gender, ethnicity, and disability where possible",
      "Avoid solutions that address age in isolation from other equity dimensions",
    ],
    action: "Analyse your data at the intersection of age and other protected characteristics.",
  },
  {
    id: "managers",
    title: "Manager Capability",
    desc: "Managers are often the point at which ageism either happens or is prevented.",
    items: [
      "Train managers to recognise age bias in day-to-day decisions",
      "Include age equality in your management development programme",
      "Create structures for managers to support workers through life-stage transitions: parenthood, caring, health, pre-retirement",
      "Ensure managers know how to respond if a worker raises a concern about ageism",
    ],
    action: "Include a question on ageism awareness in your next manager training evaluation.",
  },
  {
    id: "reporting",
    title: "Reporting and Responding",
    desc: "Workers need to feel safe to report ageism and confident that it will be taken seriously.",
    items: [
      "Ensure your grievance process explicitly covers age discrimination and harassment",
      "Investigate age-related complaints with the same rigour as other equality concerns",
      "Make the reporting process accessible across different levels of digital confidence",
      "Track and report on age-related complaints and their outcomes",
    ],
    action: "Test your grievance process: would an older or younger worker feel confident using it?",
  },
  {
    id: "measuring",
    title: "Measuring Change",
    desc: "What gets measured gets managed: without data, ageism goes unchecked.",
    items: [
      "Collect and monitor age data across the full employee lifecycle: recruitment, progression, pay, exit",
      "Include age as a factor in your equality impact assessments",
      "Report on age equity alongside gender pay gap and ethnicity pay gap where possible",
      "Set goals and track progress against them year on year",
    ],
    action: "Schedule a quarterly data review that includes age as a key equality metric.",
  },
];

type Status = "yes" | "partially" | "not-yet" | null;

export default function ChallengingAgeism() {
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const setAreaStatus = (id: string, s: Status) =>
    setStatus((p) => ({ ...p, [id]: p[id] === s ? null : s }));

  const counts = {
    yes: AREAS.filter((a) => status[a.id] === "yes").length,
    partially: AREAS.filter((a) => status[a.id] === "partially").length,
    "not-yet": AREAS.filter((a) => status[a.id] === "not-yet").length,
  };

  const statusConfig: Record<NonNullable<Status>, { label: string; bg: string; text: string; border: string }> = {
    yes: { label: "Yes", bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
    partially: { label: "Partially", bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
    "not-yet": { label: "Not yet", bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Reflection Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reflection tool &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Challenging Ageism at Work
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Reflect on your practice across 11 areas of age-inclusive behaviour. Track your progress and identify priority commitments.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Age Inclusion", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Summary dashboard */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["yes", "partially", "not-yet"] as const).map((s) => (
            <div key={s} className="rounded-xl p-4 text-center border"
              style={{ background: statusConfig[s].bg, borderColor: statusConfig[s].border }}>
              <div className="text-3xl font-bold" style={{ color: statusConfig[s].text }}>{counts[s]}</div>
              <div className="text-sm font-medium" style={{ color: statusConfig[s].text }}>{statusConfig[s].label}</div>
            </div>
          ))}
        </div>

        {/* Areas */}
        <div className="space-y-3">
          {AREAS.map((area) => {
            const currentStatus = status[area.id];
            const isOpen = expanded[area.id];

            return (
              <div key={area.id} className="rounded-xl border overflow-hidden"
                style={{ background: "var(--white)", borderColor: currentStatus ? statusConfig[currentStatus].border : "var(--gray-border)" }}>
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <button onClick={() => toggleSection(area.id)} className="text-left flex-1">
                      <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
                        {area.title}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: "var(--charcoal)", opacity: 0.75 }}>{area.desc}</p>
                    </button>
                    <button onClick={() => toggleSection(area.id)} style={{ color: "var(--sage-dark)", fontSize: 12 }}>
                      {isOpen ? "▲" : "▼"}
                    </button>
                  </div>

                  {/* Status toggles */}
                  <div className="flex gap-2">
                    {(["yes", "partially", "not-yet"] as const).map((s) => (
                      <button key={s} onClick={() => setAreaStatus(area.id, s)}
                        className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                        style={currentStatus === s
                          ? { background: statusConfig[s].bg, color: statusConfig[s].text, borderColor: statusConfig[s].border }
                          : { background: "transparent", color: "var(--charcoal)", borderColor: "var(--gray-border)" }}>
                        {statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--gray-border)" }}>
                    <ul className="space-y-2 mt-4 mb-4">
                      {area.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--charcoal)" }}>
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--sage-dark)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg p-3 text-sm" style={{ background: "var(--sage-xlight)", borderLeft: "3px solid var(--sage-dark)", color: "var(--charcoal)" }}>
                      <strong>Action:</strong> {area.action}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {counts["not-yet"] > 0 && (
          <div className="mt-6 rounded-xl p-4 border" style={{ background: "#FEF3C7", borderColor: "#FCD34D" }}>
            <p className="text-sm font-semibold" style={{ color: "#92400E" }}>
              {counts["not-yet"]} area{counts["not-yet"] > 1 ? "s" : ""} marked as not yet addressed.
            </p>
            <p className="text-sm mt-1" style={{ color: "#92400E" }}>
              Consider prioritising these for your next EDI action plan.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={() => window.print()} className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ background: "var(--sage-dark)", color: "var(--white)" }}>
            Print Audit Summary
          </button>
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Understanding ageism in the workplace
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Age is a protected characteristic in the UK under the Equality Act 2010, yet ageism remains one of the most socially normalised forms of discrimination. It affects workers at both ends of the age spectrum: younger workers whose ideas are dismissed as inexperience, and older workers whose skills are undervalued or whose progression is stalled because of assumptions about their adaptability, ambition, or proximity to retirement.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Ageism in the workplace often operates through assumptions about technology, capacity, and career trajectory. Assumptions that older workers are less digitally capable, that younger workers cannot be trusted with leadership responsibilities, or that employees past a certain age are winding down rather than developing are all forms of age-related stereotyping that harm individuals and deprive organisations of talent.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Challenging ageism requires both individual reflection and systemic review. At the individual level, it means examining the assumptions you bring to conversations about age, career stage, and potential. At the organisational level, it means reviewing recruitment language, development opportunities, and workplace culture to ensure that workers of all ages can participate fully and progress fairly.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link key="recognising-bias" href={`/dashboard/apply/recognising-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Recognising Bias: Common Types in the Workplace
                </span>
              </Link>
              <Link key="inclusive-leadership-self-assessment" href={`/dashboard/apply/inclusive-leadership-self-assessment`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Self-Assessment
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Leadership Self-Assessment
                </span>
              </Link>
              <Link key="acknowledging-personal-bias" href={`/dashboard/apply/acknowledging-personal-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Top Tips
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Top 10 Tips to Acknowledge Your Own Personal Bias
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
