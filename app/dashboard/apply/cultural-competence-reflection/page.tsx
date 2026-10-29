"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const SECTIONS = [
  {
    id: "awareness",
    title: "Self-awareness",
    questions: [
      "I can identify at least three ways my cultural background shapes how I communicate and make decisions.",
      "I regularly reflect on assumptions I may be making about others based on my own cultural norms.",
      "I recognise when my discomfort in cross-cultural interactions is about my own unfamiliarity rather than a problem with the other person.",
      "I am aware of the privilege I hold in relation to others in my workplace or community.",
    ],
  },
  {
    id: "knowledge",
    title: "Cultural knowledge",
    questions: [
      "I seek out information about cultures, identities, and experiences different from my own.",
      "I understand that within any cultural or identity group, individuals vary enormously — I do not generalise.",
      "I am familiar with the history and context behind inequalities that affect the groups I work with.",
      "I can name specific ways that systemic barriers affect the people I work alongside or serve.",
    ],
  },
  {
    id: "skills",
    title: "Communication and relationship skills",
    questions: [
      "I adapt my communication style when working with people from different cultural backgrounds, without making assumptions.",
      "I listen to understand rather than to respond, particularly in cross-cultural conversations.",
      "When I have caused offence or misunderstanding, I repair the relationship without centring my own discomfort.",
      "I create space for others to define and describe their own identity and experience.",
    ],
  },
  {
    id: "action",
    title: "Taking action",
    questions: [
      "I actively include people from different backgrounds in decisions, projects, and conversations.",
      "I speak up when I witness exclusion, bias, or discrimination — even when it is uncomfortable.",
      "I regularly review my processes and practices to identify and remove cultural barriers.",
      "I use feedback from people with different experiences to improve how I lead or operate.",
    ],
  },
];

export default function CulturalCompetenceReflectionPage() {
  type Answers = Record<string, number>;
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const allQuestions = SECTIONS.flatMap((s) => s.questions.map((q, qi) => `${s.id}-${qi}`));
  const answered = allQuestions.filter((k) => answers[k] !== undefined).length;
  const complete = answered === allQuestions.length;

  const sectionScore = (s: typeof SECTIONS[0]) => {
    const keys = s.questions.map((_, qi) => `${s.id}-${qi}`);
    const vals = keys.map((k) => answers[k]).filter((v) => v !== undefined);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };

  const overallScore = () => {
    const vals = Object.values(answers);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };

  const label = (score: number) => {
    if (score < 1) return "Developing awareness";
    if (score < 2) return "Building foundations";
    if (score < 3) return "Actively developing";
    if (score < 3.5) return "Practising consistently";
    return "Embedding and leading";
  };

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
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Reflection Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Self-assessment &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Cultural Competence Reflection Tool
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Use this tool to reflect honestly on where your cultural competence is strong and where there is room to develop. There are no right or wrong answers — the value is in honest reflection, not in scoring well. Rate each statement from 0 (Never) to 4 (Always).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Cultural Competence", "Self-Reflection", "Leadership Development"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        {SECTIONS.map((section) => (
          <div key={section.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16 }}>
                <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0 }}>{section.title}</h2>
                {submitted && sectionScore(section) !== null && (
                  <span style={{ background: "var(--sage-xlight, #EFF5F0)", color: "var(--sage-dark, #2D5A3C)", fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 20 }}>
                    {sectionScore(section)}/4
                  </span>
                )}
              </div>
            </div>
            <div style={{ padding: "20px 24px 24px" }}>
              {section.questions.map((q, qi) => {
                const key = `${section.id}-${qi}`;
                return (
                  <div key={key} style={{ marginBottom: qi < section.questions.length - 1 ? 24 : 0 }}>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 10px" }}>{q}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {RATINGS.map((r, ri) => {
                        const selected = answers[key] === ri;
                        return (
                          <button key={r} onClick={() => setAnswers((prev) => ({ ...prev, [key]: ri }))} style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: selected ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", background: selected ? "var(--sage-dark, #2D5A3C)" : "#fff", color: selected ? "#fff" : "#6b7280", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
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
          <button
            onClick={() => complete && setSubmitted(true)}
            style={{ background: complete ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", color: "#fff", fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 15, padding: "14px 36px", borderRadius: 10, border: "none", cursor: complete ? "pointer" : "not-allowed" }}
          >
            {complete ? "See my results" : `Answer all questions to see results (${answered}/${allQuestions.length} answered)`}
          </button>
        </div>

        {submitted && overallScore() !== null && (
          <div style={{ background: "#fff", border: "2px solid var(--sage-dark, #2D5A3C)", borderRadius: 16, padding: "32px", marginTop: 32, textAlign: "center" }}>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 8px" }}>Your overall score</p>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 48, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>{overallScore()}<span style={{ fontSize: 20, color: "#9ca3af" }}>/4</span></p>
            <p style={{ fontSize: 17, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", margin: "0 0 20px" }}>{label(overallScore()!)}</p>
            <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.7 }}>
              Look at the sections where your score is lowest — these are the areas with the most development potential. Cultural competence is not a destination; it is an ongoing practice.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {SECTIONS.map((s) => (
                <div key={s.id} style={{ background: "var(--sage-xlight, #f4f8f5)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
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
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>What is cultural competence?</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Cultural competence is the ability to work effectively across cultural, social, and identity differences. It is not about mastering a checklist of cultural facts — it is about developing awareness, knowledge, and skills that help you relate to others more fairly and effectively.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            It develops over time, through deliberate reflection and practice. The goal of a tool like this is not a perfect score — it is an honest starting point for a development journey.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
              { title: "Anti-Racist Practice Guide", slug: "anti-racist-practice-guide", format: "Guide" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
