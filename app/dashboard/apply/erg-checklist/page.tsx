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
  },
  {
    id: "leadership",
    title: "Leadership and Governance",
    setup: [
      "Appoint co-chairs or leads: ideally from the community served",
      "Define clear roles: Chair, Secretary, Events Lead, Comms Lead, etc.",
      "Establish a senior sponsor or executive ally with genuine influence",
      "Create a handover and succession plan from the start",
    ],
    audit: [
      "Is leadership diverse and rotated to prevent burnout?",
      "Does the executive sponsor actively champion the ERG and attend events?",
      "Is there a clear process for selecting new leaders?",
    ],
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
      "Are meetings accessible (timing, format, location)?",
      "Is there a good mix of event types to suit different member needs?",
      "Are events well attended? If not, what is the barrier?",
    ],
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
  },
  {
    id: "remember",
    title: "Things to Remember",
    setup: [
      "ERG labour is often invisible; recognise and resource it explicitly",
      "ERGs exist to support their communities, not to educate the whole organisation alone",
      "Psychological safety in the ERG space is non-negotiable",
      "ERGs are not a substitute for organisational accountability on EDI",
    ],
    audit: [
      "Are ERG members being asked to carry too much of the EDI burden?",
      "Is the organisation using the ERG as a substitute for structural change?",
      "Do ERG members feel proud to be part of this group?",
    ],
  },
];

export default function ErgChecklist() {
  const [mode, setMode] = useState<"setup" | "audit">("setup");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [health, setHealth] = useState<Record<string, number>>({});

  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const getItems = (s: typeof SECTIONS[0]) => mode === "setup" ? s.setup : s.audit;
  const totalItems = SECTIONS.reduce((sum, s) => sum + getItems(s).length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const healthColors = [
    { label: "Needs work", bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
    { label: "Developing", bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
    { label: "Good", bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
  ];

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
            Checklist
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          ERG Checklist: Setting Up and Auditing Employee Resource Groups
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Use this checklist to set up a new ERG or audit an existing one across ten areas of effective practice.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["ERGs", "Employee Voice", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Mode toggle */}
        <div className="flex gap-3 mb-6">
          {(["setup", "audit"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setChecked({}); }}
              className="px-5 py-2 rounded-full text-sm font-semibold border transition-all"
              style={
                mode === m
                  ? { background: "var(--sage-dark)", color: "var(--white)", borderColor: "var(--sage-dark)" }
                  : { background: "var(--white)", color: "var(--charcoal)", borderColor: "var(--gray-border)" }
              }
            >
              {m === "setup" ? "Setting up an ERG" : "Auditing an existing ERG"}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="rounded-xl p-4 mb-6 border" style={{ background: "var(--white)", borderColor: "var(--gray-border)" }}>
          <div className="flex justify-between text-sm mb-2" style={{ color: "var(--charcoal)" }}>
            <span>{checkedCount} of {totalItems} items checked</span>
            <span>{Math.round((checkedCount / totalItems) * 100)}% complete</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "var(--gray-border)" }}>
            <div className="h-2 rounded-full transition-all" style={{ width: `${(checkedCount / totalItems) * 100}%`, background: "var(--sage-dark)" }} />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section, idx) => {
            const items = getItems(section);
            const sectionChecked = items.filter((_, i) => checked[`${mode}-${section.id}-${i}`]).length;
            const isOpen = expanded[`${mode}-${section.id}`];
            const sectionHealth = health[section.id];

            return (
              <div key={section.id} className="rounded-xl border overflow-hidden" style={{ background: "var(--white)", borderColor: "var(--gray-border)" }}>
                <button onClick={() => toggleSection(`${mode}-${section.id}`)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: sectionChecked === items.length ? "var(--sage-dark)" : "var(--sage-xlight)", color: sectionChecked === items.length ? "var(--white)" : "var(--sage-dark)" }}>
                      {idx + 1}
                    </span>
                    <span className="font-semibold" style={{ color: "var(--charcoal)", fontFamily: "var(--font-heading)" }}>{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {mode === "audit" && sectionHealth !== undefined && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: healthColors[sectionHealth].bg, color: healthColors[sectionHealth].text, border: `1px solid ${healthColors[sectionHealth].border}` }}>
                        {healthColors[sectionHealth].label}
                      </span>
                    )}
                    <span className="text-xs" style={{ color: "var(--sage-dark)" }}>{sectionChecked}/{items.length}</span>
                    <span style={{ color: "var(--sage-dark)" }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="space-y-2 mb-4">
                      {items.map((item, i) => {
                        const key = `${mode}-${section.id}-${i}`;
                        return (
                          <label key={key} className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)}
                              className="mt-0.5 shrink-0 w-4 h-4" style={{ accentColor: "var(--sage-dark)" }} />
                            <span className="text-sm" style={{ color: "var(--charcoal)", opacity: checked[key] ? 0.5 : 1, textDecoration: checked[key] ? "line-through" : "none" }}>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                    {mode === "audit" && (
                      <div className="mt-3">
                        <p className="text-xs font-medium mb-2" style={{ color: "var(--charcoal)", opacity: 0.7 }}>Section health rating:</p>
                        <div className="flex gap-2">
                          {healthColors.map((hc, hi) => (
                            <button key={hi} onClick={() => setHealth((p) => ({ ...p, [section.id]: hi }))}
                              className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                              style={{ background: sectionHealth === hi ? hc.bg : "transparent", color: sectionHealth === hi ? hc.text : "var(--charcoal)", borderColor: sectionHealth === hi ? hc.border : "var(--gray-border)" }}>
                              {hc.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => window.print()} className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ background: "var(--sage-dark)", color: "var(--white)" }}>
            Print Summary
          </button>
        </div>
      </main>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
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
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link key="supporting-diversity-guide" href={`/dashboard/apply/supporting-diversity-guide`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Supporting Diversity in Your Team
                </span>
              </Link>
              <Link key="inclusive-event-planning" href={`/dashboard/apply/inclusive-event-planning`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Planning Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Event Planning
                </span>
              </Link>
              <Link key="making-policies-inclusive" href={`/dashboard/apply/making-policies-inclusive`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Making Policies More Inclusive
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
