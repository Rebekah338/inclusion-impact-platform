"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Phase = "all" | "before" | "during" | "after";

const CHECKLIST_ITEMS = [
  // Before you advertise
  { phase: "before" as Phase, id: "b1", text: "Review the job description and person specification for language that may deter underrepresented candidates (e.g. gendered language, jargon, an excessive list of 'essential' criteria)." },
  { phase: "before" as Phase, id: "b2", text: "Ensure criteria marked 'essential' are genuinely essential for doing the job — not historical assumptions or cultural preferences." },
  { phase: "before" as Phase, id: "b3", text: "Include a diversity and inclusion statement in the job advert, and ensure it reflects genuine practice, not aspiration only." },
  { phase: "before" as Phase, id: "b4", text: "Advertise beyond default channels: post with organisations, networks, and publications that reach underrepresented candidates." },
  { phase: "before" as Phase, id: "b5", text: "Confirm the salary range is included and transparent — salary ambiguity disproportionately disadvantages women and candidates from lower socioeconomic backgrounds." },
  { phase: "before" as Phase, id: "b6", text: "State the flexibility available for the role (remote, hybrid, part-time, flexible hours) — do not wait to be asked." },
  { phase: "before" as Phase, id: "b7", text: "Confirm that anonymous shortlisting is in place (names, addresses, graduation years removed before scoring)." },
  { phase: "before" as Phase, id: "b8", text: "Brief the hiring panel on bias in recruitment, including affinity bias, halo effect, and confirmation bias." },
  { phase: "before" as Phase, id: "b9", text: "Ensure the panel itself includes people with different backgrounds, perspectives, and identities where possible." },
  // During the process
  { phase: "during" as Phase, id: "d1", text: "Score CVs and applications against the agreed criteria before discussing candidates — do not share first impressions before scoring." },
  { phase: "during" as Phase, id: "d2", text: "Use a structured interview format: the same questions, in the same order, for every candidate." },
  { phase: "during" as Phase, id: "d3", text: "Score each competency independently before moving to the next — do not let one strong or weak answer colour everything else." },
  { phase: "during" as Phase, id: "d4", text: "Offer adjustments proactively: tell all candidates that reasonable adjustments are available and invite them to request what they need." },
  { phase: "during" as Phase, id: "d5", text: "Ensure interview panels have received the same questions and scoring criteria in advance and have confirmed they understand them." },
  { phase: "during" as Phase, id: "d6", text: "Avoid small talk before interviews that may build affinity bias towards candidates who share panellists' backgrounds or interests." },
  { phase: "during" as Phase, id: "d7", text: "If a task or assessment is used, make sure it directly tests a skill required for the role — not general intelligence or polish." },
  { phase: "during" as Phase, id: "d8", text: "Record scores immediately after each interview, before the next one." },
  // After the decision
  { phase: "after" as Phase, id: "a1", text: "Make the hiring decision based on scores against the criteria — do not revisit general impressions after scoring is complete." },
  { phase: "after" as Phase, id: "a2", text: "If the panel disagrees, discuss specific evidence for each criterion — not overall gut feeling." },
  { phase: "after" as Phase, id: "a3", text: "Offer timely, constructive feedback to unsuccessful candidates who request it." },
  { phase: "after" as Phase, id: "a4", text: "Record diversity data for applicants, those shortlisted, and those appointed — and review it after each round." },
  { phase: "after" as Phase, id: "a5", text: "If the shortlist or appointment lacks diversity, review at which stage candidates were lost and why — then adjust." },
  { phase: "after" as Phase, id: "a6", text: "Review your onboarding process: does it set new joiners up to succeed, or does it assume a particular background or working style?" },
];

const PHASE_LABELS: Record<string, string> = {
  all: "All stages",
  before: "Before you advertise",
  during: "During the process",
  after: "After the decision",
};

export default function DiverseRecruitmentChecklistPage() {
  const [activePhase, setActivePhase] = useState<Phase>("all");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const filtered = activePhase === "all" ? CHECKLIST_ITEMS : CHECKLIST_ITEMS.filter((i) => i.phase === activePhase);
  const phaseItems = (phase: Phase) => CHECKLIST_ITEMS.filter((i) => i.phase === phase);
  const phaseComplete = (phase: Phase) => phaseItems(phase).every((i) => checked.has(i.id));
  const total = CHECKLIST_ITEMS.length;
  const done = CHECKLIST_ITEMS.filter((i) => checked.has(i.id)).length;
  const pct = Math.round((done / total) * 100);

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

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
            Checklist
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Interactive checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Diverse Recruitment Checklist
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Use this checklist at each stage of your recruitment process to reduce the impact of bias and improve outcomes for candidates from all backgrounds. Tick items off as you go — your progress is saved in this session.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Recruitment", "Bias Reduction", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["all", "before", "during", "after"] as Phase[]).map((ph) => (
                <button key={ph} onClick={() => setActivePhase(ph)} style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: activePhase === ph ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", background: activePhase === ph ? "var(--sage-dark, #2D5A3C)" : "transparent", color: activePhase === ph ? "#fff" : "var(--charcoal, #2C2C2C)", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                  {PHASE_LABELS[ph]}
                  {ph !== "all" && phaseComplete(ph) && <span style={{ marginLeft: 6 }}>✓</span>}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", whiteSpace: "nowrap" }}>{done}/{total} complete</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: 99, height: 6 }}>
            <div style={{ background: "var(--sage-dark, #2D5A3C)", borderRadius: 99, height: 6, width: `${pct}%`, transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {(["before", "during", "after"] as Phase[]).map((ph) => {
          const items = filtered.filter((i) => i.phase === ph);
          if (!items.length) return null;
          return (
            <div key={ph} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 16 }}>
                {PHASE_LABELS[ph]}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item) => {
                  const isDone = checked.has(item.id);
                  return (
                    <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: isDone ? "#f0faf3" : "#fff", border: `1.5px solid ${isDone ? "#86c99a" : "#e5e7eb"}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer" }}>
                      <div onClick={() => toggle(item.id)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isDone ? "var(--sage-dark, #2D5A3C)" : "#d1d5db"}`, background: isDone ? "var(--sage-dark, #2D5A3C)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, cursor: "pointer" }}>
                        {isDone && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 14, color: isDone ? "#6b7280" : "#374151", lineHeight: 1.7, textDecoration: isDone ? "line-through" : "none" }} onClick={() => toggle(item.id)}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Why recruitment is where inclusion starts</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Biased recruitment processes are one of the primary drivers of workplace inequality. Without structured processes and intentional design, recruitment naturally favours candidates who resemble those already in the organisation — replicating existing gaps in representation rather than closing them.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Diverse recruitment is not about lowering standards or introducing special treatment. It is about removing the barriers and biases that prevent talented candidates from being seen and selected fairly.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Recognising Bias: Common Types in the Workplace", slug: "recognising-bias", format: "Tool" },
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
              { title: "EDI Glossary", slug: "edi-glossary", format: "Glossary" },
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
