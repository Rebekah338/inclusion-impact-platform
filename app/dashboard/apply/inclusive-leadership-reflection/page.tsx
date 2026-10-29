"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const MICRO_FEEDBACK: Record<number, string> = {
  0: "This is an important area to grow into. Even one deliberate change here can shift how your team experiences your leadership.",
  1: "You are starting to build this habit. Naming it and tracking it will help you do it more consistently.",
  2: "You are practising this at times. The next step is making it a default, not an occasional choice.",
  3: "You are demonstrating this well. Staying intentional, especially under pressure, will consolidate it further.",
  4: "This is embedded in how you lead. Consider how you might coach others to develop this too.",
};

const SECTION_FEEDBACK: Record<string, {
  developing: string;
  building: string;
  practising: string;
  leading: string;
  nextSteps: string[];
}> = {
  visibility: {
    developing: "Amplifying voice and visibility is one of the highest-impact things an inclusive leader can do. Start by noticing, in your next meeting, who speaks and who does not.",
    building: "You are beginning to create space for different voices. Building this into a consistent habit, rather than an occasional intervention, is the next step.",
    practising: "You are actively working to ensure different voices are heard and credited. Paying attention to who gets access to high-profile opportunities will deepen this further.",
    leading: "You consistently amplify voices, credit ideas fairly, and ensure underrepresented people are visible in important spaces. This is high-impact inclusive leadership.",
    nextSteps: [
      "In your next team meeting, track who speaks and for how long: then actively create an opening for someone who has not contributed.",
      "Before your next decision-making process, check: who is missing from this room, and how can I bring their perspective in?",
      "If you notice a colleague's idea being credited to someone else, name it in the moment: 'That builds on what X said earlier.'",
    ],
  },
  fairness: {
    developing: "Fair decision-making requires actively countering the bias we all carry. Start by introducing one structured step into your next performance or promotion conversation.",
    building: "You are developing more structured approaches to fairness. Auditing your outcomes, not just your intentions, will reveal where gaps remain.",
    practising: "You are applying consistent standards and looking for disconfirming evidence in your decisions. Auditing patterns in your team outcomes will show where more work is needed.",
    leading: "You approach decisions with rigour and structure, actively countering bias and checking your outcomes for patterns. This is the foundation of equitable leadership.",
    nextSteps: [
      "Before your next performance review cycle, write down the criteria you will use before you start: then apply them consistently to everyone.",
      "Look at the last three stretch assignments or development opportunities you gave: was there a pattern in who received them?",
      "Ask a trusted peer to challenge your reasoning on your next significant people decision before you finalise it.",
    ],
  },
  belonging: {
    developing: "Psychological safety is the foundation of inclusion. Begin by reflecting on whether people in your team currently feel safe to speak up, and what might be getting in the way.",
    building: "You are creating more moments of safety and belonging. The challenge is to make this consistent across all team members, not just the most confident or vocal ones.",
    practising: "You are actively building an environment where people feel safe and included. Continuing to respond seriously to disclosures and checking in individually will strengthen this.",
    leading: "You have built strong psychological safety in your team. People feel heard, safe to take risks, and confident that concerns will be taken seriously.",
    nextSteps: [
      "In your next one-to-one with a team member, ask: 'Is there anything about how we work as a team that makes it harder for you to contribute fully?'",
      "Review your team's social norms and informal rituals: are there any that might systematically exclude certain people?",
      "The next time someone raises a concern about exclusion, respond with curiosity and commitment: 'Tell me more' and 'What would help?'",
    ],
  },
  development: {
    developing: "Equitable investment in development is where many leaders have the biggest blind spots. Start by asking yourself honestly: who do I spend the most development energy on, and why?",
    building: "You are beginning to invest more equitably in your team's development. Sponsorship, not just mentoring, is the highest-leverage action you can take for underrepresented team members.",
    practising: "You are actively developing your team equitably and holding yourself accountable to inclusion goals. Seeking development from people whose backgrounds differ from yours will sharpen your own practice.",
    leading: "You invest deliberately in the development of all team members, sponsor underrepresented colleagues actively, and hold yourself to the same standard you hold others to on inclusion.",
    nextSteps: [
      "List every team member and write one development action you have taken for each in the past quarter: look for gaps.",
      "Identify one person in your team from an underrepresented group and think about where you could actively advocate for them in a room they are not in.",
      "Set one measurable inclusion goal for yourself this quarter and review it with the same rigour as your business goals.",
    ],
  },
};

function getSectionTier(score: number): "developing" | "building" | "practising" | "leading" {
  if (score < 1) return "developing";
  if (score < 2.5) return "building";
  if (score < 3.5) return "practising";
  return "leading";
}

const TIER_LABELS: Record<string, string> = {
  developing: "Developing",
  building: "Building",
  practising: "Practising",
  leading: "Leading",
};

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  developing: { bg: "#FFF7ED", text: "#92400E", border: "#FCD34D" },
  building: { bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD" },
  practising: { bg: "#F0FDF4", text: "#166534", border: "#86EFAC" },
  leading: { bg: "#EFF5F0", text: "#2D5A3C", border: "#2D5A3C" },
};

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

  const downloadAsWord = () => {
    const css = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2C2C2C;margin:2cm}h1{font-family:Calibri,Arial,sans-serif;font-size:20pt;color:#2D5A3C;margin-bottom:4pt}h2{font-family:Calibri,Arial,sans-serif;font-size:13pt;color:#2D5A3C;margin-top:18pt;margin-bottom:6pt;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt}h3{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2D5A3C;margin-top:12pt;margin-bottom:4pt}p{font-size:11pt;line-height:1.5;margin:4pt 0}ul{margin:6pt 0 12pt 20pt}li{margin-bottom:6pt;line-height:1.5}.meta{color:#6b7280;font-size:10pt;margin-bottom:16pt}.footer{font-size:9pt;color:#6b7280;margin-top:24pt;border-top:1pt solid #e5e7eb;padding-top:8pt}.reflection{background:#f4f8f5;border-left:3pt solid #2D5A3C;padding:8pt 12pt;margin:12pt 0}';
    const body = SECTIONS.map((s) => "<h2>" + s.title + "</h2><ul>" + s.questions.map((q: string) => "<li>" + q + "</li>").join("") + "</ul>").join("");
    const html =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office'" +
      " xmlns:w='urn:schemas-microsoft-com:office:word'" +
      " xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Inclusive Leadership Reflection Tool</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>Inclusive Leadership Reflection Tool</h1>" +
      "<p class='meta'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class='footer'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["﻿", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inclusive-leadership-reflection.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const allQ = SECTIONS.flatMap((s) => s.questions.map((_, qi) => `${s.id}-${qi}`));
  const answered = allQ.filter((k) => answers[k] !== undefined).length;
  const complete = answered === allQ.length;

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

  const overallLabel = (s: number) => {
    if (s < 1) return "Beginning the journey";
    if (s < 2) return "Building awareness";
    if (s < 3) return "Developing practice";
    if (s < 3.5) return "Practising consistently";
    return "Leading with inclusion";
  };

  const getSectionInsights = () => {
    const scored = SECTIONS.map((s) => ({ section: s, score: sectionScore(s) ?? 0 }));
    const sorted = [...scored].sort((a, b) => b.score - a.score);
    return { strength: sorted[0], growth: sorted[sorted.length - 1] };
  };

  const getPriorityNextSteps = () => {
    const scored = SECTIONS.map((s) => ({ section: s, score: sectionScore(s) ?? 0 }));
    const sorted = [...scored].sort((a, b) => a.score - b.score);
    const steps: string[] = [];
    sorted.slice(0, 2).forEach(({ section }) => {
      steps.push(SECTION_FEEDBACK[section.id].nextSteps[0]);
    });
    steps.push(SECTION_FEEDBACK[sorted[sorted.length - 1].section.id].nextSteps[2]);
    return steps;
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div data-noprint="true" style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
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
        <div data-noprint="true" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Leadership", "Inclusion Practices", "Management"].map((tag) => (
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
                {submitted && sectionScore(section) !== null && (() => {
                  const score = sectionScore(section)!;
                  const tier = getSectionTier(score);
                  const colors = TIER_COLORS[tier];
                  return (
                    <span style={{ background: colors.bg, color: colors.text, border: `1.5px solid ${colors.border}`, fontWeight: 700, fontSize: 12, padding: "4px 12px", borderRadius: 20 }}>
                      {TIER_LABELS[tier]} &middot; {score}/4
                    </span>
                  );
                })()}
              </div>
            </div>
            <div style={{ padding: "20px 24px 24px" }}>
              {section.questions.map((q, qi) => {
                const key = `${section.id}-${qi}`;
                const selectedVal = answers[key];
                return (
                  <div key={key} style={{ marginBottom: qi < section.questions.length - 1 ? 28 : 0 }}>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 10px" }}>{q}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {RATINGS.map((r, ri) => {
                        const sel = selectedVal === ri;
                        return (
                          <button
                            key={r}
                            onClick={() => setAnswers((p) => ({ ...p, [key]: ri }))}
                            style={{
                              padding: "6px 14px",
                              borderRadius: 20,
                              border: "1.5px solid",
                              borderColor: sel ? "var(--sage-dark, #2D5A3C)" : "#d1d5db",
                              background: sel ? "var(--sage-dark, #2D5A3C)" : "#fff",
                              color: sel ? "#fff" : "#6b7280",
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                    {selectedVal !== undefined && (
                      <div style={{
                        marginTop: 10,
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: selectedVal <= 1 ? "#FFF7ED" : selectedVal === 2 ? "#EFF6FF" : "#EFF5F0",
                        borderLeft: `3px solid ${selectedVal <= 1 ? "#F59E0B" : selectedVal === 2 ? "#60A5FA" : "#2D5A3C"}`,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}>
                        <span style={{ fontSize: 13 }}>
                          {selectedVal <= 1 ? "💡" : selectedVal === 2 ? "📈" : "✓"}
                        </span>
                        <p style={{
                          fontSize: 13,
                          color: selectedVal <= 1 ? "#92400E" : selectedVal === 2 ? "#1E40AF" : "#166534",
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          {MICRO_FEEDBACK[selectedVal]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={() => complete && setSubmitted(true)}
            style={{
              background: complete ? "var(--sage-dark, #2D5A3C)" : "#d1d5db",
              color: "#fff",
              fontFamily: "Raleway, sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: "14px 36px",
              borderRadius: 10,
              border: "none",
              cursor: complete ? "pointer" : "not-allowed",
            }}
          >
            {complete ? "See my results" : `Answer all questions to see results (${answered}/${allQ.length} answered)`}
          </button>
        </div>

        {submitted && overallScore() !== null && (() => {
          const overall = overallScore()!;
          const { strength, growth } = getSectionInsights();
          const nextSteps = getPriorityNextSteps();
          return (
            <div style={{ marginTop: 40 }}>
              {/* Overall score banner */}
              <div style={{ background: "var(--sage-dark, #2D5A3C)", borderRadius: 16, padding: "36px 32px", textAlign: "center", marginBottom: 20 }}>
                <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>Your overall result</p>
                <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 56, fontWeight: 800, color: "#fff", margin: "0 0 4px", lineHeight: 1 }}>{overall}<span style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>/4</span></p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#A8D5B5", margin: "0 0 16px" }}>{overallLabel(overall)}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                  Inclusive leadership is not a fixed trait; it is a daily practice. Your results below show where your leadership is already creating impact and where your attention will make the biggest difference.
                </p>
              </div>

              {/* Per-section breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                {SECTIONS.map((s) => {
                  const score = sectionScore(s)!;
                  const tier = getSectionTier(score);
                  const colors = TIER_COLORS[tier];
                  const feedbackText = SECTION_FEEDBACK[s.id][tier];
                  return (
                    <div key={s.id} style={{ background: "#fff", border: `1.5px solid ${colors.border}`, borderRadius: 12, padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 13, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0, lineHeight: 1.3 }}>{s.title}</p>
                        <span style={{ background: colors.bg, color: colors.text, fontWeight: 700, fontSize: 11, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 8 }}>{TIER_LABELS[tier]}</span>
                      </div>
                      <div style={{ height: 6, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(score / 4) * 100}%`, background: colors.border, borderRadius: 4, transition: "width 0.6s ease" }} />
                      </div>
                      <p style={{ fontSize: 22, fontWeight: 800, color: colors.text, margin: 0 }}>{score}<span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>/4</span></p>
                      <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{feedbackText}</p>
                    </div>
                  );
                })}
              </div>

              {/* Strengths and growth */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "#EFF5F0", border: "1.5px solid #2D5A3C", borderRadius: 12, padding: "20px 22px" }}>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#2D5A3C", margin: "0 0 8px" }}>✓ Your greatest strength</p>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 6px" }}>{strength.section.title}</p>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    {SECTION_FEEDBACK[strength.section.id].leading}
                  </p>
                </div>
                <div style={{ background: "#FFF7ED", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "20px 22px" }}>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#92400E", margin: "0 0 8px" }}>💡 Greatest growth opportunity</p>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 6px" }}>{growth.section.title}</p>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    {SECTION_FEEDBACK[growth.section.id][getSectionTier(growth.score)]}
                  </p>
                </div>
              </div>

              {/* Next steps */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 28px 32px" }}>
                <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 8px" }}>Your next steps</p>
                <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
                  Based on your results, these are the three actions most likely to strengthen your inclusive leadership practice:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {nextSteps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontWeight: 800, fontSize: 12, borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
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

      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
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
      <div data-noprint="true" style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>Useful?</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Share it with a colleague, or save a copy for your records. Print-friendly version included.</p>
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
                  onClick={() => { setShowShareMenu(false); window.print(); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                >
                  🖨️ Print or save as PDF
                </button>
                <button
                  onClick={downloadAsWord}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  📄 Download as Word doc
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
