"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const PHASES = [
  {
    id: "pre-onboarding", num: "01", title: "Pre-onboarding preparation", timing: "Before day one",
    color: "#92400E", colorLight: "#FFF7ED", colorBorder: "#FCD34D",
    description: "Laying an inclusive foundation before the employee arrives sets the tone for everything that follows.",
    items: [
      "Ensure job descriptions and offer letters use inclusive, accessible language",
      "Ask new hires about accessibility needs: physical, digital, sensory, and neurodiverse",
      "Share welcome materials including information on EDI policies and employee resource groups",
      "Confirm workspace and technology are accessible before the first day",
      "Assign a buddy or mentor in advance so the new hire knows who to contact",
      "Communicate the organisation's commitment to inclusion from the outset",
    ],
  },
  {
    id: "first-week", num: "02", title: "First day and week essentials", timing: "Days 1 to 7",
    color: "#2D5A3C", colorLight: "#EFF5F0", colorBorder: "#2D5A3C",
    description: "The first week shapes belonging. Small gestures of welcome carry significant weight.",
    items: [
      "Ensure a warm, personal welcome from the team and line manager",
      "Confirm the workspace is set up and accessible on arrival",
      "Set clear expectations, goals, and a 90-day outline",
      "Ask about preferred name, pronouns, and communication styles",
      "Introduce the new hire to their buddy and key contacts",
      "Schedule regular check-ins throughout the first week",
    ],
  },
  {
    id: "policies", num: "03", title: "Policy and process awareness", timing: "Week 1 to 4",
    color: "#1E40AF", colorLight: "#EFF6FF", colorBorder: "#93C5FD",
    description: "Policies protect people; ensuring they are visible and understood is an inclusion act in itself.",
    items: [
      "Share all company policies: anti-discrimination, anti-harassment, flexible working, and equity",
      "Explain clearly how to report concerns or incidents safely",
      "Set out feedback channels and how they are monitored",
      "Ensure policies are accessible in multiple formats",
      "Cover reasonable adjustments processes and how to request support",
      "Communicate the organisation's stance on confidentiality and psychological safety",
    ],
  },
  {
    id: "ongoing", num: "04", title: "Ongoing support and development", timing: "Month 1 onwards",
    color: "#7c3aed", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    description: "Inclusion does not end after the first week. Sustained support builds long-term belonging.",
    items: [
      "Schedule access to company training programmes from day one",
      "Offer mentorship and networking opportunities proactively",
      "Inform new hires of employee resource groups and how to join",
      "Communicate transparent pathways for progression and development",
      "Build in regular inclusion-focused check-ins beyond performance reviews",
      "Invite feedback on the onboarding experience at 30, 60, and 90 days",
    ],
  },
  {
    id: "communication", num: "05", title: "Inclusive communication practices", timing: "Ongoing",
    color: "#0F766E", colorLight: "#F0FDFA", colorBorder: "#5EEAD4",
    description: "How we communicate signals who belongs. Inclusive language and accessible formats reach everyone.",
    items: [
      "Ask for and consistently use correct pronouns and preferred names",
      "Ensure all materials are culturally sensitive, jargon-free, and accessible",
      "Provide materials in multiple formats: written, verbal, and visual",
      "Avoid assumptions about background, experience, or identity",
      "Create space for questions without judgement or hierarchy",
      "Reflect on whether internal language is inclusive of diverse identities",
    ],
  },
  {
    id: "wellbeing", num: "06", title: "Wellbeing and psychological safety", timing: "Ongoing",
    color: "#BE185D", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
    description: "Psychological safety is the foundation of belonging. New employees need to feel safe from the start.",
    items: [
      "Prioritise mental health and wellbeing from day one",
      "Schedule regular check-ins focused on inclusion and belonging, not just tasks",
      "Create safe spaces for questions and honest conversations",
      "Share information on employee assistance programmes and wellbeing support",
      "Avoid cultures of overwork or presenteeism that disadvantage some employees",
      "Acknowledge the emotional adjustment that comes with starting a new role",
    ],
  },
  {
    id: "measuring", num: "07", title: "Measuring inclusion", timing: "Ongoing review",
    color: "#4D7C0F", colorLight: "#F7FEE7", colorBorder: "#A3E635",
    description: "What gets measured gets improved. Inclusion data from onboarding drives systemic change.",
    items: [
      "Conduct surveys at 30, 60, and 90 days to learn about the onboarding experience",
      "Regularly update onboarding materials based on employee feedback",
      "Disaggregate data to identify patterns by identity, role, or team",
      "Share findings with senior leaders and use them to drive action",
      "Track retention by diverse groups to identify early inclusion signals",
      "Review onboarding processes at least annually with an inclusion lens",
    ],
  },
];

export default function InclusiveOnboardingGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "pre-onboarding": true });

  const toggleItem = (phaseId: string, i: number) => {
    const key = `${phaseId}-${i}`;
    setChecked((p) => ({ ...p, [key]: !p[key] }));
  };

  const phaseProgress = (phaseId: string, total: number) => {
    const done = Array.from({ length: total }, (_, i) => `${phaseId}-${i}`).filter((k) => checked[k]).length;
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  const totalItems = PHASES.reduce((a, p) => a + p.items.length, 0);
  const totalDone = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalItems) * 100);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
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
          Inclusive Onboarding Guide
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Use this checklist to ensure your onboarding process sets every new employee up for belonging and success, from their first day through their first six months.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Onboarding", "Inclusion Practices", "Culture"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>


      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "1rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--charcoal)" }}>Overall onboarding readiness</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--sage-dark)" }}>{overallPct}%</span>
          </div>
          <div style={{ background: "var(--gray-border)", borderRadius: "999px", height: "10px", overflow: "hidden" }}>
            <div style={{ background: "var(--sage-dark)", width: `${overallPct}%`, height: "100%", borderRadius: "999px", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {PHASES.map((phase) => {
          const prog = phaseProgress(phase.id, phase.items.length);
          const isExpanded = expanded[phase.id];
          return (
            <div key={phase.id} style={{ marginBottom: "1rem" }}>
              <div
                onClick={() => setExpanded((p) => ({ ...p, [phase.id]: !p[phase.id] }))}
                style={{ background: "var(--white)", border: `2px solid ${prog.done === prog.total && prog.total > 0 ? phase.colorBorder : "var(--gray-border)"}`, borderRadius: isExpanded ? "12px 12px 0 0" : "12px", padding: "1.1rem 1.5rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}
              >
                <div style={{ minWidth: "44px", height: "44px", borderRadius: "50%", background: prog.done > 0 ? phase.color : "var(--gray-border)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, transition: "background 0.3s" }}>
                  {prog.done === prog.total && prog.total > 0 ? "✓" : phase.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>{phase.title}</h3>
                      <p style={{ fontSize: "0.78rem", color: "#888", margin: "0.1rem 0 0" }}>{phase.timing}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "#888", textAlign: "right" }}>{prog.done}/{prog.total}</div>
                        <div style={{ width: "80px", background: "var(--gray-border)", borderRadius: "999px", height: "6px" }}>
                          <div style={{ background: phase.color, width: `${prog.pct}%`, height: "100%", borderRadius: "999px", transition: "width 0.3s" }} />
                        </div>
                      </div>
                      <span style={{ color: "#aaa", fontSize: "0.85rem" }}>{isExpanded ? "▲" : "▼"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div style={{ background: "#fafafa", border: `2px solid ${phase.colorBorder}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontSize: "0.88rem", color: "#555", fontStyle: "italic", margin: "0 0 1rem", lineHeight: 1.55 }}>{phase.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {phase.items.map((item, ii) => {
                      const key = `${phase.id}-${ii}`;
                      const isChecked = checked[key] || false;
                      return (
                        <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", padding: "0.5rem 0.75rem", background: isChecked ? phase.colorLight : "var(--white)", borderRadius: "8px", border: `1px solid ${isChecked ? phase.colorBorder : "var(--gray-border)"}`, transition: "all 0.2s" }}>
                          <input type="checkbox" checked={isChecked} onChange={() => toggleItem(phase.id, ii)} style={{ marginTop: "2px", accentColor: phase.color, width: "16px", height: "16px", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.5, textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.6 : 1, transition: "all 0.2s" }}>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {totalDone > 0 && (
          <div style={{ background: "#EFF5F0", border: "2px solid #2D5A3C", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", marginTop: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#2D5A3C", margin: "0 0 0.4rem" }}>
              Well done: {totalDone} action{totalDone !== 1 ? "s" : ""} completed
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#444", margin: 0 }}>
              Continue working through each phase to build a fully inclusive onboarding experience.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button onClick={() => window.print()} style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
            Print or save your checklist
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/dashboard/apply" style={{ fontSize: "0.85rem", color: "var(--sage-dark)", textDecoration: "none", fontWeight: 600 }}>← Back to resources</Link>
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Why onboarding shapes long-term belonging
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The onboarding experience sends a powerful message to new employees about how much they are valued and whether this organisation is a place they can thrive. Research consistently shows that employees who have a structured, positive onboarding experience are more likely to stay, perform well in their first year, and feel a sense of belonging within the organisation.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            For employees from underrepresented groups, the onboarding period can be particularly revealing. Do they see people like themselves in leadership? Is the culture one that makes difference visible and valued, or one that expects assimilation? Are the processes and systems built with diverse needs in mind? These signals are picked up early and shape long-term engagement.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Inclusive onboarding does not require a complete overhaul. It requires attention: to who is doing the welcoming, what information is assumed versus shared, how social events are designed, and whether each new employee has a clear and supported path into the team and the culture.
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
              <Link key="inclusive-event-planning" href={`/dashboard/apply/inclusive-event-planning`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Planning Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Event Planning
                </span>
              </Link>
              <Link key="religious-cultural-observance" href={`/dashboard/apply/religious-cultural-observance`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Audit Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Religious and Cultural Observance at Work
                </span>
              </Link>
              <Link key="inclusive-remote-hybrid" href={`/dashboard/apply/inclusive-remote-hybrid`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Audit Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Remote and Hybrid Working
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
