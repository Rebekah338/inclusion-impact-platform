"use client";

import Link from "next/link";
import { useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const EXAMPLES = [
  {
    id: 1,
    topic: "Recruitment shortlisting",
    before: "Shortlisting only candidates who attended Russell Group universities for a graduate scheme.",
    after: "Removing university names from applications at shortlisting stage and widening outreach to under-represented institutions.",
    label: "Removing a barrier"
  },
  {
    id: 2,
    topic: "Job advertising",
    before: "Posting vacancies only on mainstream job boards that reach a predominantly white, non-disabled audience.",
    after: "Advertising roles through specialist networks including disability employment services, Black professional networks, and women-in-tech communities.",
    label: "Widening reach"
  },
  {
    id: 3,
    topic: "Interview preparation",
    before: "Offering no preparation support and assuming all candidates arrive equally ready.",
    after: "Offering a pre-interview briefing to all candidates, with additional targeted outreach to groups who are under-represented in the organisation.",
    label: "Equalising access"
  },
  {
    id: 4,
    topic: "Mentoring programmes",
    before: "A general mentoring scheme open to all, where uptake is lowest among junior women and ethnic minority staff.",
    after: "A targeted mentoring scheme specifically for under-represented groups at mid-career level, running alongside the general scheme.",
    label: "Targeted support"
  },
  {
    id: 5,
    topic: "Leadership development",
    before: "Nominations for leadership development programmes decided informally by line managers, producing cohorts that mirror existing senior demographics.",
    after: "Structured nomination criteria with monitored diversity data and a parallel programme for under-represented talent.",
    label: "Structured equity"
  },
  {
    id: 6,
    topic: "Paid internships",
    before: "An unpaid internship programme that is effectively only accessible to those with financial support.",
    after: "A paid internship programme with targeted outreach to communities that are under-represented in the sector.",
    label: "Access and pay"
  },
  {
    id: 7,
    topic: "Board recruitment",
    before: "Using an informal network of existing board connections to identify new trustees.",
    after: "Running an open recruitment process with a statement that applications are particularly welcomed from under-represented groups.",
    label: "Open process"
  },
  {
    id: 8,
    topic: "Training investment",
    before: "Training budget distributed equally across teams with no consideration of development gaps by protected characteristic.",
    after: "Additional training investment directed towards groups who are under-represented in senior roles, to support progression.",
    label: "Targeted investment"
  },
  {
    id: 9,
    topic: "Flexible working",
    before: "Flexible working available in theory but rarely approved, disadvantaging carers and disabled employees disproportionately.",
    after: "Flexible working as a default offer at the point of hire, with a culture where it is expected to be approved unless there is a strong operational reason otherwise.",
    label: "Default flexibility"
  },
  {
    id: 10,
    topic: "Redundancy selection",
    before: "Last-in-first-out redundancy selection, which disproportionately impacts employees from under-represented groups hired as part of recent diversity initiatives.",
    after: "Skills-based redundancy criteria that consider impact on workforce diversity and require sign-off from HR and EDI leads before any selection is finalised.",
    label: "Equity-aware selection"
  },
];

const QUIZ = [
  {
    q: "An employer offers a leadership development programme only to women. Is this positive action or positive discrimination?",
    options: [
      "Positive action: it is lawful if women are under-represented in leadership",
      "Positive discrimination: it is never lawful to offer a programme only to one group",
      "Neither: it depends on whether the women asked for it",
    ],
    correct: 0,
    explanation: "Under the Equality Act 2010, organisations can take positive action measures such as targeted development programmes if a group is under-represented or faces particular disadvantage. This is positive action, not positive discrimination."
  },
  {
    q: "An employer appoints a less qualified Black candidate over a more qualified white candidate solely because of race. Is this positive action?",
    options: [
      "Yes: addressing racial inequality always counts as positive action",
      "No: this is positive discrimination and is unlawful in Great Britain",
      "It depends on how large the qualification gap is",
    ],
    correct: 1,
    explanation: "Positive discrimination means selecting someone because of a protected characteristic regardless of merit. This is unlawful in Great Britain. Positive action supports under-represented groups to compete on equal terms; it does not override merit-based selection."
  },
  {
    q: "A charity advertises a role stating that applications are particularly welcomed from disabled people. Is this lawful?",
    options: [
      "No: job adverts cannot refer to protected characteristics",
      "Yes: this is a lawful positive action statement where disabled people are under-represented",
      "Only if the role is specifically a disability-related post",
    ],
    correct: 1,
    explanation: "Encouraging applications from under-represented groups is a form of positive action and is lawful under the Equality Act 2010, provided the organisation can demonstrate that the group is under-represented or faces particular disadvantage."
  },
  {
    q: "Two candidates are equally qualified for a role. The hiring manager selects the woman because women are under-represented in the team. Is this lawful?",
    options: [
      "No: you must always make the decision on purely objective criteria",
      "Yes: the tie-break provision in the Equality Act 2010 permits this in defined circumstances",
      "Only if the hiring manager documents it in writing",
    ],
    correct: 1,
    explanation: "Section 159 of the Equality Act 2010 allows employers to use a protected characteristic as a tie-breaker where candidates are as qualified as each other and the group is under-represented. This must not be used as an automatic preference: the candidates must genuinely be equally qualified."
  },
];

export default function PositiveActionGuidePage() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

  const answer = (qi: number, ai: number) => {
    setQuizAnswers(p => ({ ...p, [qi]: ai }));
    setQuizRevealed(p => ({ ...p, [qi]: true }));
  };

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
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Positive Action Guide
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Positive action and positive discrimination are not the same thing: one is a legal and effective tool for building equity, the other is unlawful. This guide explains the difference clearly, with 10 before-and-after examples and a short quiz to test your understanding.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Inclusion Practices", "Race and Ethnicity", "Gender", "Disability"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>

        {/* Explainer */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: "2px solid #c6dbc9" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 10 }}>Positive Action</p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              Lawful steps taken to support people from under-represented or disadvantaged groups to compete on more equal terms. It does not guarantee outcomes; it removes barriers and levels the playing field.
            </p>
          </div>
          <div style={{ background: "#FEF2F2", borderRadius: 12, padding: "24px", border: "2px solid #FECACA" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#DC2626", marginBottom: 10 }}>Positive Discrimination</p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              Selecting or favouring someone solely because of a protected characteristic, regardless of merit. This is unlawful in Great Britain under the Equality Act 2010 (with very limited exceptions for specific roles).
            </p>
          </div>
        </div>

        {/* Before and after examples */}
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>10 Before-and-After Examples</p>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24 }}>Each card shows the original approach on the left and the positive action alternative on the right.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {EXAMPLES.map(ex => (
            <div key={ex.id} style={{ borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", background: "#fff" }}>
              <div style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "var(--sage-dark)" }}>{String(ex.id).padStart(2, "0")}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)" }}>{ex.topic}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, background: "#F0FDF4", color: "#166534", border: "1px solid #86efac", borderRadius: 10, padding: "2px 10px" }}>{ex.label}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "16px 20px", borderRight: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#DC2626", display: "block", marginBottom: 8 }}>Before</span>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: 0 }}>{ex.before}</p>
                </div>
                <div style={{ padding: "16px 20px", background: "#F0FDF4" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#166534", display: "block", marginBottom: 8 }}>Positive action approach</span>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: 0 }}>{ex.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz */}
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>Test Your Understanding</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {QUIZ.map((q, qi) => {
            const selected = quizAnswers[qi];
            const revealed = quizRevealed[qi];
            const correct = selected === q.correct;
            return (
              <div key={qi} style={{ background: "#fff", borderRadius: 12, padding: "24px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--charcoal)", marginBottom: 16 }}>{q.q}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: revealed ? 16 : 0 }}>
                  {q.options.map((opt, oi) => {
                    let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
                    if (revealed) {
                      if (oi === q.correct) { bg = "#F0FDF4"; border = "#86efac"; color = "#166534"; }
                      else if (oi === selected && !correct) { bg = "#FEF2F2"; border = "#fca5a5"; color = "#991b1b"; }
                    } else if (oi === selected) { bg = "var(--sage-xlight)"; border = "var(--sage-dark)"; }
                    return (
                      <button key={oi} onClick={() => answer(qi, oi)} disabled={revealed} style={{
                        background: bg, border: `2px solid ${border}`, borderRadius: 8,
                        padding: "10px 14px", textAlign: "left", fontSize: 14, color, fontWeight: oi === q.correct && revealed ? 700 : 400,
                        cursor: revealed ? "default" : "pointer", transition: "all 0.15s", lineHeight: 1.5
                      }}>{opt}</button>
                    );
                  })}
                </div>
                {revealed && (
                  <div style={{ background: correct ? "#F0FDF4" : "#FFF8F0", border: `1px solid ${correct ? "#86efac" : "#F59E0B"}`, borderRadius: 8, padding: "12px 16px" }}>
                    <p style={{ fontSize: 13, color: correct ? "#166534" : "#92400E", margin: 0, lineHeight: 1.6 }}>
                      <strong>{correct ? "Correct." : "Not quite."}</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why positive action matters</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Positive action is one of the most misunderstood concepts in equality law. Many organisations avoid it entirely because they conflate it with positive discrimination; as a result they forgo a set of entirely lawful tools that could meaningfully accelerate equity. Understanding the distinction is not just a legal exercise: it is a practical precondition for doing this work effectively.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The Equality Act 2010 explicitly permits organisations to take proportionate steps to address under-representation or disadvantage. This includes targeted outreach, development programmes, mentoring, and in defined circumstances the tie-break provision in Section 159. None of these override merit; all of them are designed to ensure that merit-based processes are not distorted by the structural disadvantages some candidates carry into them.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Organisations that use positive action well do not do so instead of addressing culture and systemic barriers: they do both. Positive action measures work best as part of a coherent equity strategy in which data guides decisions, accountability is built into leadership, and the goal is a workplace where targeted support becomes less necessary over time because the underlying inequities have been addressed.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { slug: "making-policies-inclusive", format: "Checklist", title: "Making Policies Inclusive" },
              { slug: "fair-progression-audit-tool", format: "Audit Tool", title: "Fair Progression Audit Tool" },
              { slug: "inclusive-data-collection", format: "Guide", title: "Inclusive Data Collection" },
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
