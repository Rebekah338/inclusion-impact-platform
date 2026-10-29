"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const MICRO_FEEDBACK: Record<number, string> = {
  0: "This is a real growth opportunity. Even small steps toward awareness here can shift your practice meaningfully.",
  1: "You are beginning to notice this area. Building on these moments will strengthen your competence over time.",
  2: "You are developing here. Consistency and intentionality will help you move from sometimes to often.",
  3: "You are doing this well. Staying curious and seeking feedback will help you embed it further.",
  4: "You are modelling this consistently. Consider how you might support others to develop here too.",
};

const SECTION_FEEDBACK: Record<string, {
  developing: string;
  building: string;
  practising: string;
  leading: string;
  nextSteps: string[];
}> = {
  awareness: {
    developing: "Developing self-awareness is the foundation of cultural competence. You are at the start of this journey, and recognising that is itself an important step.",
    building: "You are beginning to examine your own assumptions and privilege. This foundational work will shape every other area of your practice.",
    practising: "You have a solid level of self-awareness. The challenge now is to deepen this reflection, particularly in high-pressure or unfamiliar situations.",
    leading: "Your self-awareness is strong. You understand how your background shapes your decisions and relationships, and you reflect on this regularly.",
    nextSteps: [
      "Keep a brief reflective journal after cross-cultural interactions: what assumptions did you notice yourself making?",
      "Ask a trusted colleague from a different background for honest feedback on your blind spots.",
      "Read one book or article written by someone with a very different cultural lens to your own.",
    ],
  },
  knowledge: {
    developing: "Building cultural knowledge takes time and intentional effort. Start with the communities and identities most relevant to your work.",
    building: "You are developing your understanding of different cultures and systemic inequalities. Continue seeking out perspectives beyond your own experience.",
    practising: "You have a good working knowledge of cultural and structural contexts. Deepening your understanding of intersectionality will strengthen this further.",
    leading: "You have strong cultural knowledge and understand systemic barriers in depth. The next step is using this to educate and influence others.",
    nextSteps: [
      "Identify one cultural or identity group you work with and seek out writing, podcasts, or research created by people from that group.",
      "Review your team or organisation's policies through the lens of one underrepresented group: what barriers might exist?",
      "Attend a training session, webinar, or community event outside your usual professional circle.",
    ],
  },
  skills: {
    developing: "Communication across difference is a skill that improves with practice. Begin by focusing on listening and checking your assumptions before responding.",
    building: "You are developing the communication skills needed to work effectively across cultures. Focus on creating space for others to define their own experience.",
    practising: "Your cross-cultural communication skills are growing. Practising repair and accountability when things go wrong will strengthen your relationships further.",
    leading: "You communicate effectively and thoughtfully across cultural difference. You adapt your style without making assumptions, and you repair harm when it occurs.",
    nextSteps: [
      "In your next cross-cultural conversation, focus entirely on listening: resist the urge to relate, compare, or respond too quickly.",
      "Practise using open, identity-affirming language: ask people how they prefer to be referred to rather than assuming.",
      "If you have caused a misunderstanding recently, revisit it: acknowledge it and ask how you can do better.",
    ],
  },
  action: {
    developing: "Taking inclusive action is where intent becomes impact. Start by identifying one concrete change you can make in your everyday practice.",
    building: "You are beginning to take action on inclusion. Focusing on consistency, especially when it is uncomfortable, will accelerate your growth.",
    practising: "You are actively working to create more inclusive environments. Seeking feedback and reviewing your processes regularly will help you go further.",
    leading: "You are taking consistent, meaningful action to challenge exclusion and create equity. Your leadership in this area is visible and valuable.",
    nextSteps: [
      "Review one meeting, process, or decision from the past month: who was missing from the room, and why?",
      "Identify one instance of bias or exclusion you witnessed but did not address: what would you do differently next time?",
      "Invite feedback from someone with a different background on a process or product you own.",
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
      "I understand that within any cultural or identity group, individuals vary enormously: I do not generalise.",
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
      "I speak up when I witness exclusion, bias, or discrimination; even when it is uncomfortable.",
      "I regularly review my processes and practices to identify and remove cultural barriers.",
      "I use feedback from people with different experiences to improve how I lead or operate.",
    ],
  },
];

export default function CulturalCompetenceReflectionPage() {
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
      "<head><meta charset='utf-8'><title>Cultural Competence Reflection Tool</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>Cultural Competence Reflection Tool</h1>" +
      "<p class='meta'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class='footer'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["﻿", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cultural-competence-reflection.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const allQuestions = SECTIONS.flatMap((s) => s.questions.map((_, qi) => `${s.id}-${qi}`));
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

  const overallLabel = (score: number) => {
    if (score < 1) return "Developing awareness";
    if (score < 2) return "Building foundations";
    if (score < 3) return "Actively developing";
    if (score < 3.5) return "Practising consistently";
    return "Embedding and leading";
  };

  // Find strengths and growth areas from section scores
  const getSectionInsights = () => {
    const scored = SECTIONS.map((s) => ({ section: s, score: sectionScore(s) ?? 0 }));
    const sorted = [...scored].sort((a, b) => b.score - a.score);
    const strength = sorted[0];
    const growth = sorted[sorted.length - 1];
    return { strength, growth };
  };

  // Collect next steps from lowest-scoring sections (bottom 2)
  const getPriorityNextSteps = () => {
    const scored = SECTIONS.map((s) => ({ section: s, score: sectionScore(s) ?? 0 }));
    const sorted = [...scored].sort((a, b) => a.score - b.score);
    const bottom2 = sorted.slice(0, 2);
    const steps: string[] = [];
    bottom2.forEach(({ section }) => {
      const fb = SECTION_FEEDBACK[section.id];
      if (fb) steps.push(fb.nextSteps[0]);
    });
    // Add one step from the top section for momentum
    if (sorted[sorted.length - 1]) {
      const topFb = SECTION_FEEDBACK[sorted[sorted.length - 1].section.id];
      if (topFb) steps.push(topFb.nextSteps[2]);
    }
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
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Reflection Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Self-assessment &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Cultural Competence Reflection Tool
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Use this tool to reflect honestly on where your cultural competence is strong and where there is room to develop. There are no right or wrong answers; the value is in honest reflection, not in scoring well. Rate each statement from 0 (Never) to 4 (Always).
        </p>
        <div data-noprint="true" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
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
                        const selected = selectedVal === ri;
                        return (
                          <button
                            key={r}
                            onClick={() => setAnswers((prev) => ({ ...prev, [key]: ri }))}
                            style={{
                              padding: "6px 14px",
                              borderRadius: 20,
                              border: "1.5px solid",
                              borderColor: selected ? "var(--sage-dark, #2D5A3C)" : "#d1d5db",
                              background: selected ? "var(--sage-dark, #2D5A3C)" : "#fff",
                              color: selected ? "#fff" : "#6b7280",
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
                    {/* Micro-feedback: appears immediately after selection */}
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
            {complete ? "See my results" : `Answer all questions to see results (${answered}/${allQuestions.length} answered)`}
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
                  Cultural competence is not a destination; it is an ongoing practice. Your results below show where you are strong and where your greatest development opportunity lies.
                </p>
              </div>

              {/* Per-section breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                {SECTIONS.map((s) => {
                  const score = sectionScore(s)!;
                  const tier = getSectionTier(score);
                  const colors = TIER_COLORS[tier];
                  const fb = SECTION_FEEDBACK[s.id];
                  const feedbackText = fb[tier];
                  return (
                    <div key={s.id} style={{ background: "#fff", border: `1.5px solid ${colors.border}`, borderRadius: 12, padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 13, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0, lineHeight: 1.3 }}>{s.title}</p>
                        <span style={{ background: colors.bg, color: colors.text, fontWeight: 700, fontSize: 11, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 8 }}>{TIER_LABELS[tier]}</span>
                      </div>
                      {/* Score bar */}
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
                  Based on your results, these are the three actions most likely to move your practice forward:
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
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>What is cultural competence?</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Cultural competence is the ability to work effectively across cultural, social, and identity differences. It is not about mastering a checklist of cultural facts; it is about developing awareness, knowledge, and skills that help you relate to others more fairly and effectively.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            It develops over time, through deliberate reflection and practice. The goal of a tool like this is not a perfect score; it is an honest starting point for a development journey.
          </p>
        </div>
      </div>

      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
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
