"use client";

import Link from "next/link";
import { useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const TIPS = [
  {
    id: "t1",
    number: "01",
    phase: "Design",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534", pill: "#BBF7D0" },
    title: "Start with the people the policy affects",
    detail: "Before drafting, consult employees from groups the policy is most likely to affect: through surveys, focus groups, or one-to-one conversations. Policies designed without input from affected people consistently produce unintended gaps.",
    auditQuestion: "Did the policy involve meaningful consultation with affected groups before drafting?"
  },
  {
    id: "t2",
    number: "02",
    phase: "Design",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534", pill: "#BBF7D0" },
    title: "Conduct an equality impact assessment",
    detail: "Assess how the policy could affect people differently based on protected characteristics. Document the assessment and publish it alongside the policy so the reasoning is transparent.",
    auditQuestion: "Has a documented equality impact assessment been completed and published?"
  },
  {
    id: "t3",
    number: "03",
    phase: "Design",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534", pill: "#BBF7D0" },
    title: "Write in plain language",
    detail: "Use short sentences, active voice, and everyday words. Aim for a reading age of 9 to 11 years. Avoid acronyms, legalese, and unexplained jargon. Plain language is not just a style preference: it is an access requirement.",
    auditQuestion: "Has the policy been reviewed against a plain language standard?"
  },
  {
    id: "t4",
    number: "04",
    phase: "Design",
    color: { bg: "#F0FDF4", border: "#86efac", text: "#166534", pill: "#BBF7D0" },
    title: "Use inclusive language throughout",
    detail: "Use gender-neutral terms, avoid ableist language, and do not conflate marital status with family structure. Review all examples and scenarios in the policy for assumptions about who the 'default' employee is.",
    auditQuestion: "Has the policy been reviewed for inclusive language and assumptions about the default employee?"
  },
  {
    id: "t5",
    number: "05",
    phase: "Scope",
    color: { bg: "#EFF6FF", border: "#93c5fd", text: "#1e40af", pill: "#BFDBFE" },
    title: "Define scope clearly and comprehensively",
    detail: "State explicitly who the policy applies to: employees, workers, contractors, volunteers, board members. Vague scope creates inconsistent application, which disproportionately affects those with less institutional power.",
    auditQuestion: "Does the policy explicitly state who it covers, including non-employee workers?"
  },
  {
    id: "t6",
    number: "06",
    phase: "Scope",
    color: { bg: "#EFF6FF", border: "#93c5fd", text: "#1e40af", pill: "#BFDBFE" },
    title: "Address intersectionality explicitly",
    detail: "Policies that address one protected characteristic in isolation can inadvertently disadvantage people with intersecting identities. Consider how your policy operates for someone who holds multiple protected characteristics simultaneously.",
    auditQuestion: "Does the policy consider the experience of people with intersecting protected characteristics?"
  },
  {
    id: "t7",
    number: "07",
    phase: "Scope",
    color: { bg: "#EFF6FF", border: "#93c5fd", text: "#1e40af", pill: "#BFDBFE" },
    title: "Build in flexibility by default",
    detail: "Where a policy sets a standard approach, also specify the process for requesting variations or adjustments. Do not force employees to navigate a separate process to ask for what the policy should have anticipated.",
    auditQuestion: "Does the policy include a clear process for requesting adjustments or exceptions?"
  },
  {
    id: "t8",
    number: "08",
    phase: "Process",
    color: { bg: "#FFF7ED", border: "#fdba74", text: "#9a3412", pill: "#FED7AA" },
    title: "Specify decision-making criteria",
    detail: "Vague policies delegate too much discretion to individual managers, which introduces bias. Define the criteria for any discretionary decisions within the policy and document how those criteria should be weighted.",
    auditQuestion: "Does the policy specify criteria for discretionary decisions rather than leaving them to managerial judgement?"
  },
  {
    id: "t9",
    number: "09",
    phase: "Process",
    color: { bg: "#FFF7ED", border: "#fdba74", text: "#9a3412", pill: "#FED7AA" },
    title: "Define accountability and escalation routes",
    detail: "Name who is responsible for implementing the policy, who employees can go to with questions or concerns, and what happens if the policy is not followed. Accountability must be specific: a named role, not a department.",
    auditQuestion: "Does the policy name specific accountable roles and a clear escalation route?"
  },
  {
    id: "t10",
    number: "10",
    phase: "Process",
    color: { bg: "#FFF7ED", border: "#fdba74", text: "#9a3412", pill: "#FED7AA" },
    title: "Make the policy accessible in multiple formats",
    detail: "Publish policies in accessible digital formats: screen-reader-friendly, with sufficient colour contrast and resizable text. Offer paper copies, easy-read versions, or translations where there is reasonable need.",
    auditQuestion: "Is the policy available in accessible digital formats, and are alternative formats offered where needed?"
  },
  {
    id: "t11",
    number: "11",
    phase: "Review",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8", pill: "#E9D5FF" },
    title: "Set a review date at the point of publication",
    detail: "Every policy should carry a review date: typically one to three years from publication, or sooner if legislation changes. A policy without a review date is a policy without accountability.",
    auditQuestion: "Does the policy carry a review date and a named owner responsible for initiating the review?"
  },
  {
    id: "t12",
    number: "12",
    phase: "Review",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8", pill: "#E9D5FF" },
    title: "Track usage and outcomes by protected characteristic",
    detail: "Monitor who is using the policy and what outcomes they experience. Collect data disaggregated by protected characteristic so you can identify whether the policy is working equitably in practice, not just on paper.",
    auditQuestion: "Is there a mechanism to track policy usage and outcomes disaggregated by protected characteristic?"
  },
  {
    id: "t13",
    number: "13",
    phase: "Review",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8", pill: "#E9D5FF" },
    title: "Gather feedback from those who use it",
    detail: "Build in a feedback mechanism so employees can report where the policy worked, where it fell short, and what they needed that was not there. Treat this feedback as evidence that informs the next version.",
    auditQuestion: "Does the policy include a mechanism for employees to give feedback on their experience of using it?"
  },
  {
    id: "t14",
    number: "14",
    phase: "Review",
    color: { bg: "#FDF4FF", border: "#d8b4fe", text: "#6b21a8", pill: "#E9D5FF" },
    title: "Compare against sector benchmarks and legal developments",
    detail: "At review, check the policy against current legislation, ACAS guidance, and sector benchmarks. Best practice evolves: a policy that was excellent three years ago may now fall below the standard employees and regulators expect.",
    auditQuestion: "Has the policy been reviewed against current legislation, ACAS guidance, and sector best practice?"
  },
];

const PHASES = ["Design", "Scope", "Process", "Review"];
const PHASE_COLORS: Record<string, { bg: string; text: string }> = {
  Design: { bg: "#F0FDF4", text: "#166534" },
  Scope: { bg: "#EFF6FF", text: "#1e40af" },
  Process: { bg: "#FFF7ED", text: "#9a3412" },
  Review: { bg: "#FDF4FF", text: "#6b21a8" },
};

export default function MakingPoliciesInclusivePage() {
  const [mode, setMode] = useState<"tips" | "audit">("tips");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));

  const completedCount = TIPS.filter(t => checked[t.id]).length;

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
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Checklist</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Making Policies Inclusive
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Fourteen tips for designing inclusive policies from scratch or auditing existing ones. Switch between Checklist mode to work through each tip, and Audit mode to assess a specific policy against each criterion.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Policy Design", "Inclusion Practices", "Accessibility", "Accountability"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {(["tips", "audit"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
              background: mode === m ? "var(--sage-dark)" : "#fff",
              color: mode === m ? "#fff" : "var(--sage-dark)",
              border: `2px solid var(--sage-dark)`, transition: "all 0.15s"
            }}>
              {m === "tips" ? "Checklist Mode" : "Audit Mode"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
        {/* Progress bar */}
        {mode === "audit" && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sage-dark)" }}>Policy audit progress</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{completedCount} / {TIPS.length} criteria met</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: 8, height: 8, overflow: "hidden" }}>
              <div style={{ background: "var(--sage-dark)", height: "100%", width: `${(completedCount / TIPS.length) * 100}%`, transition: "width 0.3s" }} />
            </div>
          </div>
        )}

        {PHASES.map(phase => {
          const phaseTips = TIPS.filter(t => t.phase === phase);
          const pc = PHASE_COLORS[phase];
          return (
            <div key={phase} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ background: pc.bg, color: pc.text, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>{phase}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {phaseTips.map(tip => {
                  const done = checked[tip.id];
                  return (
                    <div key={tip.id} style={{
                      background: "#fff", borderRadius: 12,
                      border: `2px solid ${done ? "#BBF7D0" : "var(--gray-border, #e5e7eb)"}`,
                      padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start"
                    }}>
                      <button onClick={() => toggle(tip.id)} style={{
                        flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                        border: `2px solid ${done ? tip.color.text : "#d1d5db"}`,
                        background: done ? tip.color.bg : "#fff",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 2, padding: 0
                      }}>
                        {done && <span style={{ color: tip.color.text, fontSize: 13, fontWeight: 800 }}>✓</span>}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: tip.color.text }}>{tip.number}</span>
                          {done && <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", background: "#BBF7D0", padding: "1px 8px", borderRadius: 10 }}>Done</span>}
                        </div>
                        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15, textDecoration: done ? "line-through" : "none", color: done ? "#9ca3af" : "var(--charcoal)" }}>
                          {tip.title}
                        </p>
                        <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                          {mode === "audit" ? tip.auditQuestion : tip.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why inclusive policy design matters</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Policies are the operating system of an organisation. They set the conditions under which people work, are evaluated, progress, and are supported. When policies are poorly designed, or designed without considering the full range of people they affect, the gaps they create are not neutral: they consistently disadvantage those who are already under-represented or vulnerable.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Inclusive policy design is not about adding an EDI paragraph to the end of an existing document. It is about beginning with the question: who does this policy affect, and how might it affect them differently? That question, asked genuinely and early, transforms the design process. It surfaces assumptions that would otherwise remain invisible and produces policies that work in practice, not just in principle.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The audit mode in this resource is particularly useful for reviewing existing policies: those that were written before inclusive design principles were widely adopted, or that have not been reviewed since the organisation's workforce or the legislative landscape changed. A policy audit is not a criticism of the people who wrote the original: it is a recognition that organisations and societies develop, and that the documents that govern working life need to keep pace.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { slug: "positive-action-guide", format: "Guide", title: "Positive Action Guide" },
              { slug: "supporting-diversity-guide", format: "Guide", title: "Supporting Diversity: A Strategy Guide" },
              { slug: "mitigating-sexism-misogyny", format: "Guide", title: "Mitigating Sexism and Misogyny" },
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
