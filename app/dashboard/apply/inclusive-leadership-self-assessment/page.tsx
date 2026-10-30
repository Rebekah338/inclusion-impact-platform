"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const SECTIONS = [
  {
    id: "awareness",
    title: "Awareness and Mindset",
    questions: [
      {
        id: 1,
        text: "Do I create space for all voices, especially those who are underrepresented, to be heard and valued?",
        example: "I intentionally pause in meetings and invite introverted or marginalised colleagues to contribute without putting them on the spot.",
      },
      {
        id: 2,
        text: "Am I aware of how my own identity, privilege, or biases influence my decisions?",
        example: "Before choosing someone for a project, I ask myself whether I am selecting them based on familiarity or actual suitability.",
      },
      {
        id: 3,
        text: "Do my actions match my stated commitment to equity and inclusion?",
        example: "I review workloads and opportunities to ensure diverse staff are not being overlooked or overburdened.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication and Inclusion",
    questions: [
      {
        id: 4,
        text: "Have I adapted my communication style to meet the needs of different team members?",
        example: "I offer information in multiple formats: written, verbal, and visual, to support neurodiverse staff and different learning preferences.",
      },
      {
        id: 5,
        text: "Do I actively remove barriers rather than expecting employees to fit in to existing systems?",
        example: "When a staff member discloses a need, I explore adjustments immediately, rather than encouraging the staff member to make changes.",
      },
      {
        id: 6,
        text: "Am I transparent and fair in how I allocate opportunities, recognition, and progression pathways?",
        example: "I use clear criteria and salary transparency for promotions and openly share them so everyone knows what success looks like.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and Accountability",
    questions: [
      {
        id: 7,
        text: "Do I respond appropriately when exclusionary behaviour or microaggressions occur?",
        example: "I address the situation promptly, name what happened, and support the affected person rather than staying silent.",
      },
      {
        id: 8,
        text: "Have I built psychological safety so staff feel comfortable speaking up or offering dissenting views?",
        example: "I thank people for raising concerns and avoid penalising honest feedback.",
      },
      {
        id: 9,
        text: "Do I seek feedback from employees, especially underrepresented groups, and act on it?",
        example: "After gathering insights, I make visible changes and explain what has been implemented and why.",
      },
    ],
  },
  {
    id: "learning",
    title: "Learning and Modelling",
    questions: [
      {
        id: 10,
        text: "Am I continuously learning about inclusion, equity, intersectionality, and diverse lived experiences?",
        example: "I attend training, read widely, and reflect on how structural inequities show up in the workplace.",
      },
      {
        id: 11,
        text: "Do I model inclusive behaviour in everyday interactions?",
        example: "I honour how people choose to identify, treat everyone with dignity, and show consistent allyship through my words and actions.",
      },
      {
        id: 12,
        text: "Do I recognise when different employees have different starting points, needs, or barriers, and respond with flexibility?",
        example: "I offer flexible hours or workload adjustments during flare-ups, caring responsibilities, or sensory overwhelm.",
      },
    ],
  },
];

const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

function getTier(score: number): { label: string; bg: string; text: string; border: string } {
  if (score <= 4) return { label: "Developing", bg: "#fffbeb", text: "#92400e", border: "#fde68a" };
  if (score <= 7) return { label: "Building", bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" };
  if (score <= 10) return { label: "Practising", bg: "var(--sage-xlight)", text: "var(--sage-dark)", border: "var(--sage-light)" };
  return { label: "Leading", bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" };
}

export default function InclusiveLeadershipSelfAssessment() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [insights, setInsights] = useState("");
  const [commitment, setCommitment] = useState("");

  const sectionScores = useMemo(() =>
    SECTIONS.map(section => ({
      ...section,
      score: section.questions.reduce((sum, q) => sum + (ratings[q.id] ?? 0), 0),
      answered: section.questions.filter(q => ratings[q.id] !== undefined).length,
    })), [ratings]);

  const totalScore = useMemo(() =>
    Object.values(ratings).reduce((a, b) => a + b, 0), [ratings]);

  const totalAnswered = Object.keys(ratings).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/dashboard/apply" style={{ color: "var(--sage-dark)", fontSize: "0.875rem", textDecoration: "none" }}>
            Back to Resources
          </Link>
          <div style={{ marginTop: "1rem", background: "var(--sage-dark)", borderRadius: 16, padding: "2rem", color: "var(--white)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.5rem" }}>
              Self-Assessment Tool
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, margin: "0 0 0.75rem" }}>
              Inclusive Leadership: Self-Assessment
            </h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              Reflect on your leadership practice across 12 questions. Rate yourself honestly to identify strengths and areas for growth. Each question includes a real-world example to guide your thinking.
            </p>
          </div>
        </div>

        <div style={{ background: "var(--white)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--charcoal)" }}>
            <span>{totalAnswered} of 12 questions answered</span>
            <span style={{ fontWeight: 700, color: "var(--sage-dark)" }}>Score: {totalScore} / 48</span>
          </div>
          <div style={{ height: 8, background: "var(--gray-soft)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(totalAnswered / 12) * 100}%`, background: "var(--sage-dark)", borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        </div>

        {SECTIONS.map((section, si) => {
          const secData = sectionScores[si];
          const tier = getTier(secData.score);
          const allAnswered = secData.answered === 3;
          return (
            <div key={section.id} style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sage-xlight)", color: "var(--sage-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
                  {si + 1}
                </div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  {section.title}
                </h2>
              </div>
              {section.questions.map(q => (
                <div key={q.id} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--gray-soft)" }}>
                  <p style={{ color: "var(--charcoal)", lineHeight: 1.6, margin: "0 0 0.75rem", fontWeight: 500 }}>{q.text}</p>
                  <button
                    onClick={() => setExpanded(p => ({ ...p, [q.id]: !p[q.id] }))}
                    style={{ fontSize: "0.8rem", color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "0.75rem", textDecoration: "underline" }}
                  >
                    {expanded[q.id] ? "Hide example" : "See example"}
                  </button>
                  {expanded[q.id] && (
                    <div style={{ background: "var(--sage-xlight)", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "0.75rem", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.6, borderLeft: "3px solid var(--sage-dark)" }}>
                      <strong>Example:</strong> {q.example}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {RATINGS.map((label, i) => (
                      <button
                        key={label}
                        onClick={() => setRatings(p => ({ ...p, [q.id]: i }))}
                        style={{ padding: "0.4rem 0.875rem", borderRadius: 99, border: "2px solid", borderColor: ratings[q.id] === i ? "var(--sage-dark)" : "var(--gray-border)", background: ratings[q.id] === i ? "var(--sage-dark)" : "var(--white)", color: ratings[q.id] === i ? "var(--white)" : "var(--charcoal)", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 600, transition: "all 0.15s" }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {allAnswered && (
                <div style={{ borderRadius: 10, padding: "0.875rem 1.25rem", background: tier.bg, border: `1px solid ${tier.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: tier.text, fontWeight: 600, fontSize: "0.875rem" }}>{section.title}: {secData.score} / 12</span>
                  <span style={{ background: tier.border, color: tier.text, borderRadius: 99, padding: "0.25rem 0.875rem", fontSize: "0.8rem", fontWeight: 700 }}>{tier.label}</span>
                </div>
              )}
            </div>
          );
        })}

        {totalAnswered === 12 && (
          <div style={{ background: "var(--sage-dark)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", color: "var(--white)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem" }}>Your Overall Score</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>{totalScore}<span style={{ fontSize: "1.25rem", opacity: 0.7 }}> / 48</span></div>
            <div style={{ height: 10, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden", marginBottom: "1rem" }}>
              <div style={{ height: "100%", width: `${(totalScore / 48) * 100}%`, background: "var(--sage-xlight)", borderRadius: 99 }} />
            </div>
            <p style={{ opacity: 0.9, fontSize: "0.875rem", margin: 0 }}>
              {totalScore <= 16 ? "You are in the early stages of developing inclusive leadership skills. Focus on the questions where you scored lowest."
                : totalScore <= 32 ? "You are building a solid foundation. Identify two or three areas to deepen your practice."
                : totalScore <= 44 ? "You are practising inclusive leadership consistently. Look for opportunities to model and mentor others."
                : "You are leading inclusively at a high level. Keep learning and challenge yourself to go further."}
            </p>
          </div>
        )}

        <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 1rem" }}>My Reflection</h3>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "0.5rem" }}>My key insights from this assessment:</label>
          <textarea value={insights} onChange={e => setInsights(e.target.value)} placeholder="What patterns do you notice? Where do you feel most confident? Where do you want to grow?" rows={4} style={{ width: "100%", border: "1.5px solid var(--gray-border)", borderRadius: 10, padding: "0.75rem", fontSize: "0.9rem", fontFamily: "var(--font-body)", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--charcoal)", margin: "1rem 0 0.5rem" }}>My commitment going forward:</label>
          <textarea value={commitment} onChange={e => setCommitment(e.target.value)} placeholder="What one or two things will you commit to changing or improving?" rows={3} style={{ width: "100%", border: "1.5px solid var(--gray-border)", borderRadius: 10, padding: "0.75rem", fontSize: "0.9rem", fontFamily: "var(--font-body)", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
        </div>

        <button onClick={() => window.print()} style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 10, padding: "0.875rem 2rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>
          Print / Save Assessment
        </button>
      </div>
      <BottomBanner />
    </div>
  );
}
