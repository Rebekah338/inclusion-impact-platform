"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const SECTIONS = [
  {
    id: "visibility",
    title: "Visibility and voice",
    questions: [
      "I actively notice who speaks in meetings and who does not; and create space for quieter voices.",
      "I attribute ideas to the people who generated them, especially when they are not in the room.",
      "I ensure that people from underrepresented groups are included in high-profile projects and decisions.",
      "I challenge the tendency to hear the same voices repeatedly, including my own.",
    ],
  },
  {
    id: "fairness",
    title: "Fairness in decisions",
    questions: [
      "I use structured, criteria-based processes for performance reviews, promotions, and pay decisions.",
      "I actively look for evidence that counters my first impressions before making judgements about people.",
      "I apply the same standards and expectations to all team members, regardless of identity or background.",
      "I regularly audit outcomes in my team (who gets promoted, developed, stretched, or exited) for patterns.",
    ],
  },
  {
    id: "belonging",
    title: "Belonging and psychological safety",
    questions: [
      "People in my team feel safe to raise concerns, disagree, or make mistakes without fear of consequences.",
      "I respond to disclosures of discrimination or exclusion with seriousness and without minimising.",
      "I ensure social norms in my team do not systematically exclude any group of people.",
      "I check in individually with team members rather than assuming I understand their experience.",
    ],
  },
  {
    id: "development",
    title: "Development and growth",
    questions: [
      "I invest equally in the development of all team members, not just those most like me or most visible.",
      "I sponsor people from underrepresented groups; advocating for them in rooms where they are not present.",
      "I seek out mentoring or coaching from people whose backgrounds differ from my own.",
      "I hold myself accountable to inclusion goals with the same rigour I apply to business goals.",
    ],
  },
];

export default function InclusiveLeadershipReflectionPage() {
  type Answers = Record<string, number>;
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const allQ = SECTIONS.flatMap((s) => s.questions.map((_, qi) => `${s.id}-${qi}`));
  const answered = allQ.filter((k) => answers[k] !== undefined).length;
  const complete = answered === allQ.length;

  const sectionScore = (s: typeof SECTIONS[0]) => {
    const keys = s.questions.map((_, qi) => `${s.id}-${qi}`);
    const vals = keys.map((k) => answers[k]).filter((v) => v !== undefined);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };

  const overall = () => {
    const vals = Object.values(answers);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };

  const label = (s: number) => {
    if (s < 1) return "Beginning the journey";
    if (s < 2) return "Building awareness";
    if (s < 3) return "Developing practice";
    if (s < 3.5) return "Practising consistently";
    return "Leading with inclusion";
  };

  const lowestSection = submitted ? [...SECTIONS].sort((a, b) => {
    const sa = sectionScore(a) ?? 4;
    const sb = sectionScore(b) ?? 4;
    return sa - sb;
  })[0] : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Reflection Tool</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Self-assessment &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Leadership Reflection Tool
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          This tool helps leaders and managers reflect on how inclusive their practice is across four key areas: voice and visibility, fair decision-making, psychological safety, and equitable development. Rate each statement honestly from 0 (Never) to 4 (Always).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Leadership", "Inclusion Practices", "Management"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        {SECTIONS.map((section) => (
          <div key={section.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0 }}>{section.title}</h2>
              {submitted && sectionScore(section) !== null && (
                <span style={{ background: lowestSection?.id === section.id ? "#fef3c7" : "#EFF5F0", color: lowestSection?.id === section.id ? "#92400e" : "var(--sage-dark, #2D5A3C)", fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 20 }}>
                  {sectionScore(section)}/4 {lowestSection?.id === section.id ? "(focus area)" : ""}
                </span>
              )}
            </div>
            <div style={{ padding: "20px 24px 24px" }}>
              {section.questions.map((q, qi) => {
                const key = `${section.id}-${qi}`;
                return (
                  <div key={key} style={{ marginBottom: qi < section.questions.length - 1 ? 24 : 0 }}>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 10px" }}>{q}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {RATINGS.map((r, ri) => {
                        const sel = answers[key] === ri;
                        return (
                          <button key={r} onClick={() => setAnswers((p) => ({ ...p, [key]: ri }))} style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: sel ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", background: sel ? "var(--sage-dark, #2D5A3C)" : "#fff", color: sel ? "#fff" : "#6b7280", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button onClick={() => complete && setSubmitted(true)} style={{ background: complete ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", color: "#fff", fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 15, padding: "14px 36px", borderRadius: 10, border: "none", cursor: complete ? "pointer" : "not-allowed" }}>
            {complete ? "See my results" : `Answer all questions to see results (${answered}/${allQ.length} answered)`}
          </button>
        </div>

        {submitted && overall() !== null && (
          <div style={{ background: "#fff", border: "2px solid var(--sage-dark, #2D5A3C)", borderRadius: 16, padding: "32px", marginTop: 32, textAlign: "center" }}>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 8px" }}>Your overall score</p>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 48, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>{overall()}<span style={{ fontSize: 20, color: "#9ca3af" }}>/4</span></p>
            <p style={{ fontSize: 17, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", margin: "0 0 20px" }}>{label(overall()!)}</p>
            {lowestSection && (
              <p style={{ fontSize: 14, color: "#374151", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.7 }}>
                Your lowest-scoring area is <strong>{lowestSection.title}</strong>. Consider what one concrete change you could make this month in that area.
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {SECTIONS.map((s) => (
                <div key={s.id} style={{ background: lowestSection?.id === s.id ? "#fef3c7" : "var(--sage-xlight, #f4f8f5)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af", margin: "0 0 4px" }}>{s.title}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0 }}>{sectionScore(s)}/4</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Inclusive leadership</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Inclusive leadership is not a personality type; it is a set of behaviours that can be developed and practised. Research shows that how a leader behaves has a greater impact on whether people feel included than any other single factor, including organisational policy.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The most effective inclusive leaders combine self-awareness with deliberate action: they notice who is missing from conversations, who is overlooked in decisions, and who is not getting the development they deserve; and they do something about it.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Cultural Competence Reflection Tool", slug: "cultural-competence-reflection", format: "Reflection Tool" },
              { title: "Recognising Bias: Common Types in the Workplace", slug: "recognising-bias", format: "Tool" },
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
            {/* Share / Download bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>Found this useful?</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Share it with a colleague or save it for later.</p>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sage-dark, #2D5A3C)", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Raleway, sans-serif" }}
            >
              <span>↗</span> Share or download
            </button>
            {showShareMenu && (
              <div style={{ position: "absolute", right: 0, bottom: "calc(100% + 8px)", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", minWidth: 220, zIndex: 50, overflow: "hidden" }}>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                >
                  🔗 Copy link
                </button>
                <button
                  onClick={() => { window.open(window.location.href, "_blank"); setShowShareMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  🖨️ Print or save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
