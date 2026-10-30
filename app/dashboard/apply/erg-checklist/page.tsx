"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SECTIONS = [
  {
    id: "foundations",
    title: "Foundations and Purpose",
    setup: [
      "Define the ERG's purpose clearly: what community does it serve and why?",
      "Align ERG purpose with the organisation's broader EDI strategy",
      "Document a clear mission statement that members helped create",
      "Establish whether the ERG is identity-based, ally-focused, or both",
    ],
    audit: [
      "Is the mission still relevant and understood by current members?",
      "Does the ERG purpose align with the organisation's current EDI priorities?",
      "Has the founding purpose shifted over time; is it time to refresh?",
    ],
    redFlag: { label: "Mission drift", desc: "An ERG that started with a clear purpose but has become a social committee or a box-ticking exercise for the organisation. Members disengage; the community it was meant to serve stops trusting it." },
  },
  {
    id: "membership",
    title: "Membership and Attendance",
    setup: [
      "Create an open, accessible sign-up process",
      "Clarify who can join: identity members, allies, or both",
      "Set expectations around confidentiality and psychological safety",
      "Share the ERG with new starters as part of onboarding",
    ],
    audit: [
      "Is membership growing, stable, or declining? Why?",
      "Are attendees representative of the group the ERG is meant to serve?",
      "Are allies engaged appropriately without dominating the space?",
    ],
    redFlag: null,
  },
  {
    id: "leadership",
    title: "Leadership and Governance",
    setup: [
      "Appoint co-chairs or leads: ideally from the community served",
      "Define clear roles: Chair, Secretary, Events Lead, Comms Lead",
      "Establish a senior sponsor or executive ally with genuine influence",
      "Create a handover and succession plan from the start",
    ],
    audit: [
      "Is leadership diverse and rotated to prevent burnout?",
      "Does the executive sponsor actively champion the ERG and attend events?",
      "Is there a clear process for selecting new leaders?",
    ],
    redFlag: { label: "Sponsor in name only", desc: "An executive who agreed to be sponsor but has never attended an event, never mentioned the ERG to the board, and has no idea what it does. Their name on the page signals nothing to members and nothing to senior leadership." },
  },
  {
    id: "meetings",
    title: "Meetings and Events",
    setup: [
      "Schedule regular meetings: monthly or bimonthly at consistent times",
      "Offer hybrid or virtual options to maximise accessibility",
      "Plan a mix of: community support sessions, educational events, and external speakers",
      "Document an annual calendar with key awareness dates",
    ],
    audit: [
      "Are meetings accessible in timing, format, and location?",
      "Is there a good mix of event types to suit different member needs?",
      "Are events well attended? If not, what is the barrier?",
    ],
    redFlag: null,
  },
  {
    id: "comms",
    title: "Communications and Visibility",
    setup: [
      "Create a shared communication channel: Slack, Teams, email list, or intranet page",
      "Introduce the ERG to all staff via internal communications",
      "Establish a visible presence on the company intranet or website",
      "Create a template for event promotion and member updates",
    ],
    audit: [
      "Do staff know the ERG exists?",
      "Are communications regular, clear, and inclusive in tone?",
      "Is there a feedback mechanism so members can shape the ERG direction?",
    ],
    redFlag: null,
  },
  {
    id: "support",
    title: "Support and Resourcing",
    setup: [
      "Secure a dedicated budget: even a small one signals organisational commitment",
      "Agree on protected time for ERG leads to do their work",
      "Identify an HR or EDI point of contact for escalation and guidance",
      "Understand whether ERG activity will be recognised in appraisals or workload planning",
    ],
    audit: [
      "Is the budget adequate for the ERG's ambitions?",
      "Are ERG leaders burning out due to lack of time or recognition?",
      "Is senior leadership visibly investing in the ERG?",
    ],
    redFlag: { label: "Invisible labour trap", desc: "ERG leads running everything in their lunch break and evenings, on top of their full workload, with no time protected and no recognition in performance reviews. This is the most common reason ERGs collapse and the most avoidable." },
  },
  {
    id: "equity",
    title: "Inclusion and Equity Practices",
    setup: [
      "Create a safe space agreement for all meetings",
      "Establish clear processes for raising concerns or experiences of harm",
      "Ensure the ERG does not recreate hierarchies or exclusion within itself",
      "Review intersectionality: are all members of the community included?",
    ],
    audit: [
      "Are all sub-communities within the ERG heard and represented?",
      "Are any voices being marginalised within the group itself?",
      "Does the ERG actively challenge tokenism and performative inclusion?",
    ],
    redFlag: null,
  },
  {
    id: "impact",
    title: "Impact and Measurement",
    setup: [
      "Define 2 to 3 measurable goals for the first year",
      "Agree on how success will be tracked: attendance, policy change, sentiment surveys",
      "Plan an annual review or ERG health check",
      "Report outcomes back to members and senior leadership",
    ],
    audit: [
      "Is the ERG meeting its stated goals?",
      "How is impact being measured beyond event attendance?",
      "Is leadership using ERG insights to drive real organisational change?",
    ],
    redFlag: { label: "Consultation without influence", desc: "The organisation asks the ERG for input on policies, initiatives, or decisions — then ignores what they say. Members quickly learn their voice changes nothing. This destroys trust faster than not asking at all." },
  },
  {
    id: "sustainability",
    title: "Long-Term Sustainability",
    setup: [
      "Document processes so the ERG can survive leadership change",
      "Build partnerships with other ERGs or external organisations",
      "Plan for succession: identify and develop emerging leaders",
      "Avoid placing all responsibility on marginalised individuals",
    ],
    audit: [
      "Could the ERG continue if the founding members left?",
      "Is there a risk of ERG fatigue among core members?",
      "Does the ERG have a sense of momentum and community beyond events?",
    ],
    redFlag: null,
  },
  {
    id: "remember",
    title: "Accountability and Boundaries",
    setup: [
      "ERG labour is often invisible: recognise and resource it explicitly",
      "ERGs exist to support their communities, not to educate the whole organisation alone",
      "Psychological safety in the ERG space is non-negotiable",
      "ERGs are not a substitute for organisational accountability on EDI",
    ],
    audit: [
      "Are ERG members being asked to carry too much of the EDI burden?",
      "Is the organisation using the ERG as a substitute for structural change?",
      "Do ERG members feel proud to be part of this group?",
    ],
    redFlag: { label: "ERG as EDI substitute", desc: "Leadership points to the ERG when asked about inclusion strategy, rather than to policies, pay gap data, or structural change. The ERG becomes a shield against accountability rather than a force for it." },
  },
];

const HEALTH_OPTIONS = [
  { label: "Needs work", bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  { label: "Developing", bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  { label: "Strong", bg: "#dcfce7", text: "#166534", border: "#86efac" },
];

export default function ErgChecklist() {
  const [setupChecked, setSetupChecked] = useState<Record<string, boolean>>({});
  const [auditChecked, setAuditChecked] = useState<Record<string, boolean>>({});
  const [health, setHealth] = useState<Record<string, number>>({});
  const [showSponsor, setShowSponsor] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSetup = (key: string) => setSetupChecked(p => ({ ...p, [key]: !p[key] }));
  const toggleAudit = (key: string) => setAuditChecked(p => ({ ...p, [key]: !p[key] }));

  const totalSetup = SECTIONS.reduce((s, sec) => s + sec.setup.length, 0);
  const totalAudit = SECTIONS.reduce((s, sec) => s + sec.audit.length, 0);
  const doneSetup = Object.values(setupChecked).filter(Boolean).length;
  const doneAudit = Object.values(auditChecked).filter(Boolean).length;

  // Sponsor briefing generator
  const weakSections = SECTIONS.filter(s => health[s.id] === 0);
  const developingSections = SECTIONS.filter(s => health[s.id] === 1);
  const strongSections = SECTIONS.filter(s => health[s.id] === 2);
  const redFlagsHit = SECTIONS.filter(s => s.redFlag && health[s.id] === 0);
  const hasHealthData = Object.keys(health).length > 0;

  const sponsorBriefing = hasHealthData ? [
    `This ERG has completed a structured audit across ${SECTIONS.length} areas of effective practice.`,
    strongSections.length > 0
      ? `We are performing strongly in: ${strongSections.map(s => s.title).join(", ")}.`
      : null,
    developingSections.length > 0
      ? `Areas that are developing and need continued attention: ${developingSections.map(s => s.title).join(", ")}.`
      : null,
    weakSections.length > 0
      ? `Areas that need immediate investment or structural support: ${weakSections.map(s => s.title).join(", ")}.`
      : null,
    redFlagsHit.length > 0
      ? `We have identified ${redFlagsHit.length} critical risk${redFlagsHit.length > 1 ? "s" : ""} that require organisational action: ${redFlagsHit.map(s => s.redFlag!.label).join("; ")}.`
      : null,
    `We are asking for your visible support in addressing these gaps. ERGs are most effective when they have genuine executive sponsorship, protected time for leads, and a clear mandate to influence decisions. We would welcome a conversation about how you can help us take this forward.`,
  ].filter(Boolean).join("\n\n") : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(sponsorBriefing).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      {/* Back nav */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Checklist</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          ERG Checklist: Setting Up and Auditing Employee Resource Groups
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 780, margin: "0 0 24px" }}>
          Use this tool to set up a new ERG or audit an existing one. Each section shows what good practice looks like and the questions to ask when reviewing. Work through both columns together for the clearest picture.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["ERGs", "Employee Voice", "Inclusion Practices"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Progress bars — two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {/* Setup progress */}
          <div style={{ borderRadius: 12, padding: 16, background: "var(--white)", border: "1px solid var(--gray-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "var(--charcoal)", fontWeight: 600 }}>
              <span>Setting up</span>
              <span style={{ color: "var(--sage-dark)" }}>{doneSetup}/{totalSetup}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "var(--gray-border)" }}>
              <div style={{ height: 6, borderRadius: 3, transition: "width 0.3s", width: `${(doneSetup / totalSetup) * 100}%`, background: "var(--sage-dark)" }} />
            </div>
          </div>
          {/* Audit progress */}
          <div style={{ borderRadius: 12, padding: 16, background: "var(--white)", border: "1px solid var(--gray-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "var(--charcoal)", fontWeight: 600 }}>
              <span>Auditing</span>
              <span style={{ color: "var(--sage-dark)" }}>{doneAudit}/{totalAudit}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "var(--gray-border)" }}>
              <div style={{ height: 6, borderRadius: 3, transition: "width 0.3s", width: `${(doneAudit / totalAudit) * 100}%`, background: "#6366f1" }} />
            </div>
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
          <div style={{ padding: "10px 16px", borderRadius: 8, background: "var(--sage-dark)", color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 0.3 }}>
            Setting up your ERG
          </div>
          <div style={{ padding: "10px 16px", borderRadius: 8, background: "#4f46e5", color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 0.3 }}>
            Auditing your existing ERG
          </div>
        </div>

        {/* Section cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SECTIONS.map((section, idx) => {
            const setupDone = section.setup.filter((_, i) => setupChecked[`setup-${section.id}-${i}`]).length;
            const auditDone = section.audit.filter((_, i) => auditChecked[`audit-${section.id}-${i}`]).length;
            const sectionHealth = health[section.id];

            return (
              <div key={section.id} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--gray-border)", background: "var(--white)" }}>
                {/* Section title bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "var(--sage-xlight)", borderBottom: "1px solid var(--gray-border)" }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: "var(--sage-dark)", color: "#fff" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 16, color: "var(--charcoal)", fontFamily: "var(--font-heading)", flex: 1 }}>{section.title}</span>
                  {section.redFlag && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#b45309", background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 20, padding: "3px 10px", flexShrink: 0 }}>
                      ⚠ Red flag risk
                    </span>
                  )}
                </div>

                {/* Two-column body */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {/* Setup column */}
                  <div style={{ padding: "20px", borderRight: "1px solid var(--gray-border)" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 14 }}>
                      Setting up · {setupDone}/{section.setup.length}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {section.setup.map((item, i) => {
                        const key = `setup-${section.id}-${i}`;
                        return (
                          <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                            <input type="checkbox" checked={!!setupChecked[key]} onChange={() => toggleSetup(key)}
                              style={{ marginTop: 3, flexShrink: 0, width: 16, height: 16, accentColor: "var(--sage-dark)" }} />
                            <span style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.5, textDecoration: setupChecked[key] ? "line-through" : "none", opacity: setupChecked[key] ? 0.45 : 1 }}>
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Audit column */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#4f46e5", marginBottom: 0 }}>
                      Auditing · {auditDone}/{section.audit.length}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {section.audit.map((item, i) => {
                        const key = `audit-${section.id}-${i}`;
                        return (
                          <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                            <input type="checkbox" checked={!!auditChecked[key]} onChange={() => toggleAudit(key)}
                              style={{ marginTop: 3, flexShrink: 0, width: 16, height: 16, accentColor: "#4f46e5" }} />
                            <span style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.5, textDecoration: auditChecked[key] ? "line-through" : "none", opacity: auditChecked[key] ? 0.45 : 1 }}>
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Health rating */}
                    <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--gray-border)" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Section health</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        {HEALTH_OPTIONS.map((h, hi) => (
                          <button key={hi} onClick={() => setHealth(p => ({ ...p, [section.id]: hi }))}
                            style={{ padding: "5px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all 0.15s", background: sectionHealth === hi ? h.bg : "#fff", color: sectionHealth === hi ? h.text : "#6b7280", borderColor: sectionHealth === hi ? h.border : "#e5e7eb" }}>
                            {h.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Red flag callout */}
                {section.redFlag && (
                  <div style={{ margin: "0 20px 20px", borderRadius: 10, padding: "12px 16px", background: "#fffbeb", border: "1px solid #fcd34d", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>⚠</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#92400e", margin: "0 0 4px" }}>{section.redFlag.label}</p>
                      <p style={{ fontSize: 13, color: "#78350f", margin: 0, lineHeight: 1.55 }}>{section.redFlag.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Take this to your sponsor */}
        <div style={{ marginTop: 40, borderRadius: 20, border: "2px solid var(--sage-dark)", background: "var(--white)", overflow: "hidden" }}>
          <button
            onClick={() => setShowSponsor(p => !p)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 4px" }}>Tool</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "var(--charcoal)", fontFamily: "var(--font-heading)", margin: 0 }}>Take this to your sponsor</p>
              <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
                {hasHealthData ? "Generate a briefing based on your audit results to share with your executive sponsor." : "Rate at least one section's health above to generate your briefing."}
              </p>
            </div>
            <span style={{ fontSize: 22, color: "var(--sage-dark)", flexShrink: 0, marginLeft: 16 }}>{showSponsor ? "▲" : "▼"}</span>
          </button>

          {showSponsor && (
            <div style={{ padding: "0 24px 28px", borderTop: "1px solid var(--gray-border)" }}>
              {!hasHealthData ? (
                <p style={{ fontSize: 14, color: "#6b7280", marginTop: 20, fontStyle: "italic" }}>
                  Complete the health ratings for each section above, then come back here to generate your sponsor briefing.
                </p>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: "20px 0 12px" }}>
                    Copy this briefing and adapt it for your context. It is based on the health ratings you selected above.
                  </p>
                  <div style={{ background: "var(--sage-xlight)", borderRadius: 12, padding: "20px 24px", fontSize: 14, color: "var(--charcoal)", lineHeight: 1.8, whiteSpace: "pre-wrap", border: "1px solid #c6dbc9" }}>
                    {sponsorBriefing}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <button onClick={handleCopy}
                      style={{ padding: "10px 22px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", background: copied ? "#dcfce7" : "var(--sage-dark)", color: copied ? "#166534" : "#fff", borderColor: copied ? "#86efac" : "var(--sage-dark)", transition: "all 0.2s" }}>
                      {copied ? "✓ Copied" : "Copy briefing"}
                    </button>
                    <button onClick={() => window.print()}
                      style={{ padding: "10px 22px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid var(--gray-border)", cursor: "pointer", background: "#fff", color: "var(--charcoal)" }}>
                      Print full summary
                    </button>
                  </div>

                  {/* Health summary chips */}
                  {Object.keys(health).length > 0 && (
                    <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {SECTIONS.filter(s => health[s.id] !== undefined).map(s => {
                        const h = HEALTH_OPTIONS[health[s.id]];
                        return (
                          <span key={s.id} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99, background: h.bg, color: h.text, border: `1px solid ${h.border}` }}>
                            {s.title}: {h.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            The role of employee resource groups in inclusion
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Employee resource groups (ERGs) are voluntary, employee-led communities that bring together people who share an identity or experience, and those who support them. They can play a valuable role in inclusion efforts: providing community and support for underrepresented employees, offering a channel for lived experience to inform organisational decision-making, and raising the visibility of inclusion as a priority.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            However, ERGs are only as effective as the infrastructure and support around them. Groups that are under-resourced, led by volunteers who receive no recognition for the additional work, or consulted without any real influence on outcomes quickly become a burden on the very people they are meant to support. The question is not just whether an organisation has ERGs, but whether those ERGs are set up to succeed.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Effective ERGs have clear mandates, genuine executive sponsorship, and a defined relationship to the organisation's wider EDI strategy. They measure their impact, share their learning, and are reviewed regularly to ensure they continue to meet the needs of their members. This checklist supports both the setup and the ongoing audit of that kind of effective group.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { href: "/dashboard/apply/supporting-diversity-guide", label: "Guide", title: "Supporting Diversity in Your Team" },
              { href: "/dashboard/apply/inclusive-event-planning", label: "Planning Tool", title: "Inclusive Event Planning" },
              { href: "/dashboard/apply/making-policies-inclusive", label: "Guide", title: "Making Policies More Inclusive" },
            ].map(r => (
              <Link key={r.href} href={r.href} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.label}</span>
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
