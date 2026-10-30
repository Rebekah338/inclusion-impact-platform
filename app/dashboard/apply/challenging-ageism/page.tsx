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
    roleActions: {
      individual: "Notice the assumptions you hold about colleagues at different career stages. Challenge them when they arise in conversation.",
      manager: "In your next 1:1s, ask about development aspirations without making assumptions based on career stage or age.",
      lead: "Commission a language audit of your recruitment materials and internal communications for age-coded terms.",
    },
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
    roleActions: {
      individual: "If you are involved in hiring, flag age-coded language in job descriptions before they are posted.",
      manager: "Review your team's job descriptions and interview scoring criteria for age-based assumptions.",
      lead: "Build age awareness into your hiring manager training and interview evaluation frameworks.",
    },
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
    roleActions: {
      individual: "Ask for development opportunities and be clear about your ambitions, whatever your career stage.",
      manager: "Initiate career conversations with every team member without assumptions about where they want to go.",
      lead: "Pull promotion data by age band and review it alongside your EDI committee or HR partner.",
    },
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
    roleActions: {
      individual: "If your appraisal feels weighted toward pace or style rather than outcomes, raise this with your manager.",
      manager: "Review your performance ratings by age. If there are patterns, investigate the criteria rather than the people.",
      lead: "Audit your performance framework with age equity in mind before the next appraisal cycle.",
    },
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
    roleActions: {
      individual: "Seek out mentors or sponsors from different career stages to broaden your perspective and visibility.",
      manager: "Actively identify and advocate for high-potential team members regardless of their age or career stage.",
      lead: "Map your leadership pipeline by age band and set explicit targets for age diversity in senior roles.",
    },
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
    roleActions: {
      individual: "The next time you hear an age-based comment, name it. A simple \"I think that's a generalisation\" is enough.",
      manager: "Run a brief team discussion on generational assumptions using a case study or scenario.",
      lead: "Signal through your own communications that age diversity is valued, not just tolerated.",
    },
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
    roleActions: {
      individual: "If you need flexibility, request it. Your experience of the process is data your organisation needs.",
      manager: "Model flexible working visibly. If only junior staff appear to use it, the culture signal is wrong.",
      lead: "Analyse your flexible working data by grade and age. Concentration in junior roles is a structural problem.",
    },
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
    roleActions: {
      individual: "When listening to colleagues' experiences of ageism, hold space for how it intersects with other aspects of their identity.",
      manager: "Avoid designing team interventions around age alone. Ask who might be doubly disadvantaged.",
      lead: "Ensure your EDI data analysis disaggregates by age alongside other protected characteristics.",
    },
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
    roleActions: {
      individual: "If your manager makes age-based assumptions about your work, name the impact directly and calmly.",
      manager: "Ask yourself: do I treat team members differently based on their career stage or age? Be honest.",
      lead: "Include age as a protected characteristic in all management training and hold managers accountable.",
    },
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
    roleActions: {
      individual: "Know your rights. The Equality Act 2010 protects you from age discrimination at work.",
      manager: "If a team member raises an age-related concern, take it seriously and follow your organisation's process.",
      lead: "Publish data on age-related grievances and their outcomes alongside your other EDI transparency reporting.",
    },
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
    roleActions: {
      individual: "Complete your organisation's equality data collection. Your response helps build the evidence base.",
      manager: "Ask your HR team what the age breakdown of your team looks like and whether it reflects the organisation.",
      lead: "Set and publish annual targets for age equity across recruitment, promotion, and pay.",
    },
  },
];

type Status = "yes" | "partially" | "not-yet" | null;
type Role = "individual" | "manager" | "lead" | null;

const statusConfig: Record<NonNullable<Status>, { label: string; bg: string; text: string; border: string }> = {
  yes: { label: "Yes", bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
  partially: { label: "Partially", bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  "not-yet": { label: "Not yet", bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
};

const roleConfig: Record<NonNullable<Role>, { label: string; desc: string }> = {
  individual: { label: "Individual contributor", desc: "Reflecting on your own practice and conversations" },
  manager: { label: "Manager", desc: "Responsible for a team or direct reports" },
  lead: { label: "Organisational lead", desc: "Setting policy, strategy, or culture at scale" },
};

export default function ChallengingAgeism() {
  const [role, setRole] = useState<Role>(null);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [commitments, setCommitments] = useState<Set<string>>(new Set());
  const [planOpen, setPlanOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const setAreaStatus = (id: string, s: Status) =>
    setStatus((p) => ({ ...p, [id]: p[id] === s ? null : s }));
  const toggleCommitment = (id: string) =>
    setCommitments((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const counts = {
    yes: AREAS.filter((a) => status[a.id] === "yes").length,
    partially: AREAS.filter((a) => status[a.id] === "partially").length,
    "not-yet": AREAS.filter((a) => status[a.id] === "not-yet").length,
  };

  const committedAreas = AREAS.filter((a) => commitments.has(a.id));

  const generatePlan = () => {
    const lines: string[] = [];
    lines.push("AGEISM AUDIT: ACTION PLAN");
    lines.push("=".repeat(40));
    lines.push("");
    if (role) lines.push(`Role: ${roleConfig[role].label}`);
    lines.push(`Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`);
    lines.push("");
    lines.push("SUMMARY");
    lines.push(`Yes: ${counts.yes} / Partially: ${counts.partially} / Not yet: ${counts["not-yet"]}`);
    lines.push("");
    if (committedAreas.length > 0) {
      lines.push("COMMITTED ACTIONS");
      lines.push("-".repeat(30));
      committedAreas.forEach((a) => {
        lines.push(`\n${a.title} [${status[a.id] ? statusConfig[status[a.id]!].label : "Not rated"}]`);
        if (role) lines.push(`Action: ${a.roleActions[role]}`);
        else lines.push(`Action: ${a.action}`);
        if (notes[a.id]?.trim()) lines.push(`Notes: ${notes[a.id]}`);
      });
    } else {
      lines.push("No commitments selected yet.");
    }
    return lines.join("\n");
  };

  const copyPlan = () => {
    navigator.clipboard.writeText(generatePlan()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
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
          Reflect on your practice across 11 areas of age-inclusive behaviour. Rate each area, commit to actions, and generate a personalised plan.
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

        {/* Step 1: Role lens */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "24px", marginBottom: 24 }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 8 }}>Step 1</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: "var(--charcoal)", marginBottom: 6 }}>Who is using this tool?</h2>
          <p style={{ fontSize: 14, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>
            Select your role to get actions tailored to your level of influence. You can skip this and use the general actions instead.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {(Object.keys(roleConfig) as NonNullable<Role>[]).map((r) => (
              <button key={r} onClick={() => setRole(role === r ? null : r)}
                style={{
                  padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left",
                  border: role === r ? "2px solid var(--sage-dark)" : "2px solid var(--gray-border)",
                  background: role === r ? "var(--sage-xlight)" : "var(--white)",
                  color: role === r ? "var(--sage-dark)" : "var(--charcoal)",
                }}>
                <div style={{ fontWeight: 700 }}>{roleConfig[r].label}</div>
                <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.75, marginTop: 2 }}>{roleConfig[r].desc}</div>
              </button>
            ))}
          </div>
          {role && (
            <p style={{ fontSize: 13, color: "var(--sage-dark)", marginTop: 12, fontWeight: 600 }}>
              ✓ Viewing actions for: {roleConfig[role].label}
            </p>
          )}
        </div>

        {/* Summary dashboard */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {(["yes", "partially", "not-yet"] as const).map((s) => (
            <div key={s} style={{ background: statusConfig[s].bg, border: `1px solid ${statusConfig[s].border}`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: statusConfig[s].text }}>{counts[s]}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: statusConfig[s].text }}>{statusConfig[s].label}</div>
            </div>
          ))}
        </div>

        {/* Areas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {AREAS.map((area) => {
            const currentStatus = status[area.id];
            const isOpen = expanded[area.id];
            const isCommitted = commitments.has(area.id);

            return (
              <div key={area.id} style={{ background: "var(--white)", border: `1px solid ${currentStatus ? statusConfig[currentStatus].border : "var(--gray-border)"}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                    <button onClick={() => toggleSection(area.id)} style={{ textAlign: "left", flex: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 4px" }}>
                        {area.title}
                      </h3>
                      <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.75, margin: 0, lineHeight: 1.5 }}>{area.desc}</p>
                    </button>
                    <button onClick={() => toggleSection(area.id)} style={{ color: "var(--sage-dark)", fontSize: 12, background: "none", border: "none", cursor: "pointer", flexShrink: 0, paddingTop: 2 }}>
                      {isOpen ? "▲" : "▼"}
                    </button>
                  </div>

                  {/* Status toggles */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(["yes", "partially", "not-yet"] as const).map((s) => (
                      <button key={s} onClick={() => setAreaStatus(area.id, s)}
                        style={{
                          padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                          background: currentStatus === s ? statusConfig[s].bg : "transparent",
                          color: currentStatus === s ? statusConfig[s].text : "var(--charcoal)",
                          border: `1px solid ${currentStatus === s ? statusConfig[s].border : "var(--gray-border)"}`,
                        }}>
                        {statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px 20px 20px" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                      {area.items.map((item, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--charcoal)", lineHeight: 1.6, marginBottom: 8 }}>
                          <span style={{ marginTop: 8, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark)", display: "inline-block" }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Action callout */}
                    <div style={{ background: "var(--sage-xlight)", borderLeft: "3px solid var(--sage-dark)", borderRadius: "0 6px 6px 0", padding: "12px 14px", marginBottom: 16 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark)", margin: "0 0 4px" }}>
                        {role ? `For ${roleConfig[role].label.toLowerCase()}s` : "Action"}
                      </p>
                      <p style={{ fontSize: 14, color: "var(--charcoal)", margin: 0, lineHeight: 1.6 }}>
                        {role ? area.roleActions[role] : area.action}
                      </p>
                    </div>

                    {/* Notes */}
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--charcoal)", marginBottom: 6 }}>
                      Your notes for this area
                    </label>
                    <textarea
                      value={notes[area.id] || ""}
                      onChange={(e) => setNotes((p) => ({ ...p, [area.id]: e.target.value }))}
                      placeholder="What have you noticed? Who needs to be involved? What is your first step?"
                      rows={3}
                      style={{ width: "100%", borderRadius: 8, border: "1px solid var(--gray-border)", fontSize: 13, padding: "10px 12px", resize: "none", color: "var(--charcoal)", background: "#fafafa", boxSizing: "border-box", lineHeight: 1.6, fontFamily: "var(--font-body)" }}
                    />

                    {/* Commit button */}
                    <button onClick={() => toggleCommitment(area.id)}
                      style={{
                        marginTop: 12, padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                        background: isCommitted ? "var(--sage-dark)" : "var(--white)",
                        color: isCommitted ? "var(--white)" : "var(--sage-dark)",
                        border: "2px solid var(--sage-dark)",
                      }}>
                      {isCommitted ? "✓ Committed to this area" : "I'll commit to this area"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Not-yet callout */}
        {counts["not-yet"] > 0 && (
          <div style={{ marginTop: 24, background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 12, padding: "16px 20px" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#92400E", margin: "0 0 4px" }}>
              {counts["not-yet"]} area{counts["not-yet"] > 1 ? "s" : ""} marked as not yet addressed.
            </p>
            <p style={{ fontSize: 14, color: "#92400E", margin: 0 }}>
              Consider prioritising these for your next EDI action plan.
            </p>
          </div>
        )}

        {/* Action plan generator */}
        <div style={{ marginTop: 24, border: "1px solid var(--gray-border)", borderRadius: 14, overflow: "hidden", background: "var(--white)" }}>
          <button onClick={() => setPlanOpen((p) => !p)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                Generate your action plan
              </p>
              <p style={{ fontSize: 13, color: "var(--charcoal)", opacity: 0.7, margin: "2px 0 0" }}>
                {commitments.size} commitment{commitments.size !== 1 ? "s" : ""} selected &middot; click to {planOpen ? "collapse" : "expand"}
              </p>
            </div>
            <span style={{ color: "var(--sage-dark)", fontSize: 12 }}>{planOpen ? "▲" : "▼"}</span>
          </button>

          {planOpen && (
            <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
              {commitments.size === 0 ? (
                <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.7, margin: 0 }}>
                  Open any area and click "I'll commit to this area" to add it to your plan.
                </p>
              ) : (
                <>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--charcoal)", background: "#fafafa", border: "1px solid var(--gray-border)", borderRadius: 8, padding: 16, marginBottom: 16, lineHeight: 1.7 }}>
                    {generatePlan()}
                  </pre>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={copyPlan}
                      style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", border: "none" }}>
                      {copied ? "Copied!" : "Copy to clipboard"}
                    </button>
                    <button onClick={() => window.print()}
                      style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "var(--white)", color: "var(--charcoal)", border: "1px solid var(--gray-border)" }}>
                      Print
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
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
            <Link href="/dashboard/apply/recognising-bias" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Reference Tool</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Recognising Bias: Common Types in the Workplace</span>
            </Link>
            <Link href="/dashboard/apply/inclusive-leadership-self-assessment" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Self-Assessment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusive Leadership Self-Assessment</span>
            </Link>
            <Link href="/dashboard/apply/acknowledging-personal-bias" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Top Tips</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Top 10 Tips to Acknowledge Your Own Personal Bias</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
