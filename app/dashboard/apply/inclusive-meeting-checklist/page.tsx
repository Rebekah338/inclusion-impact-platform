"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Stage = "before" | "during" | "after";

const ITEMS = [
  // Before
  { stage: "before" as Stage, id: "b1", text: "Send a clear agenda in advance, including the purpose of the meeting and what input is expected from participants." },
  { stage: "before" as Stage, id: "b2", text: "Share any relevant documents or pre-reading at least 24 hours ahead; do not assume people can review materials in the meeting itself." },
  { stage: "before" as Stage, id: "b3", text: "Consider whether the meeting is necessary, or whether the same outcome could be achieved asynchronously." },
  { stage: "before" as Stage, id: "b4", text: "Schedule meetings at times that work across time zones, caring responsibilities, and religious observances where relevant." },
  { stage: "before" as Stage, id: "b5", text: "Provide access and joining information in advance, including dial-in options and captioning if available." },
  { stage: "before" as Stage, id: "b6", text: "Consider who is and is not in the meeting; are all relevant perspectives represented?" },
  // During
  { stage: "during" as Stage, id: "d1", text: "Begin with a brief check-in or context-setting so that latecomers can orient without the meeting being restarted." },
  { stage: "during" as Stage, id: "d2", text: "State the meeting norms explicitly at the start: how to signal you want to speak, whether cameras are on or off, how questions will be taken." },
  { stage: "during" as Stage, id: "d3", text: "Actively invite quieter participants to contribute; do not let the same voices dominate." },
  { stage: "during" as Stage, id: "d4", text: "Attribute ideas clearly and specifically to the people who raised them." },
  { stage: "during" as Stage, id: "d5", text: "Interrupt interruptions: if someone is cut off, bring them back: 'I think [name] was making a point. [Name], please go ahead.'" },
  { stage: "during" as Stage, id: "d6", text: "Do not require cameras to be on; allow people to participate in whatever format is accessible to them." },
  { stage: "during" as Stage, id: "d7", text: "Use inclusive language throughout: avoid gendered collective terms, jargon, and cultural references that may exclude." },
  { stage: "during" as Stage, id: "d8", text: "Summarise key points and decisions verbally before moving on, and check understanding before closing an agenda item." },
  { stage: "during" as Stage, id: "d9", text: "If anything arises that could be discussed asynchronously, park it and share it afterwards rather than extending the meeting." },
  // After
  { stage: "after" as Stage, id: "a1", text: "Share clear, written notes or a summary within 24 hours; including decisions made, actions agreed, and who is responsible for each." },
  { stage: "after" as Stage, id: "a2", text: "Record and share the meeting where appropriate, so that those who could not attend can access what they need." },
  { stage: "after" as Stage, id: "a3", text: "Follow up individually with anyone who was talked over, whose contribution was missed, or who may have found the meeting difficult." },
  { stage: "after" as Stage, id: "a4", text: "Reflect on the meeting: who spoke, who did not, whose ideas were picked up, and what you would do differently." },
];

const STAGE_LABELS: Record<Stage, string> = {
  before: "Before the meeting",
  during: "During the meeting",
  after: "After the meeting",
};

export default function InclusiveMeetingChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeStage, setActiveStage] = useState<Stage | "all">("all");

  const toggle = (id: string) =>
    setChecked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = activeStage === "all" ? ITEMS : ITEMS.filter((i) => i.stage === activeStage);
  const stageItems = (s: Stage) => ITEMS.filter((i) => i.stage === s);
  const stageDone = (s: Stage) => stageItems(s).filter((i) => checked.has(i.id)).length;
  const total = ITEMS.length;
  const done = ITEMS.filter((i) => checked.has(i.id)).length;
  const pct = Math.round((done / total) * 100);

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
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Checklist</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Interactive checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Meeting Checklist
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Meetings are one of the most common sites of exclusion at work: who gets heard, whose ideas are credited, who is interrupted, and who is not in the room at all. Use this checklist before, during, and after every meeting to make your meeting practice more equitable and inclusive.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Meetings", "Inclusion Practices", "Accessibility"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Sticky bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["all", "before", "during", "after"] as (Stage | "all")[]).map((s) => (
                <button key={s} onClick={() => setActiveStage(s)} style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: activeStage === s ? "var(--sage-dark, #2D5A3C)" : "#d1d5db", background: activeStage === s ? "var(--sage-dark, #2D5A3C)" : "transparent", color: activeStage === s ? "#fff" : "var(--charcoal, #2C2C2C)", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                  {s === "all" ? "All stages" : STAGE_LABELS[s]}
                  {s !== "all" && stageDone(s) === stageItems(s).length && stageItems(s).length > 0 && <span style={{ marginLeft: 6 }}>✓</span>}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", whiteSpace: "nowrap" }}>{done}/{total}</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: 99, height: 6 }}>
            <div style={{ background: "var(--sage-dark, #2D5A3C)", borderRadius: 99, height: 6, width: `${pct}%`, transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {(["before", "during", "after"] as Stage[]).map((stage) => {
          const items = filtered.filter((i) => i.stage === stage);
          if (!items.length) return null;
          return (
            <div key={stage} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 16 }}>
                {STAGE_LABELS[stage]}
                <span style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", marginLeft: 10 }}>({stageDone(stage)}/{stageItems(stage).length})</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item) => {
                  const isDone = checked.has(item.id);
                  return (
                    <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: isDone ? "#f0faf3" : "#fff", border: `1.5px solid ${isDone ? "#86c99a" : "#e5e7eb"}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer" }}>
                      <div onClick={() => toggle(item.id)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isDone ? "var(--sage-dark, #2D5A3C)" : "#d1d5db"}`, background: isDone ? "var(--sage-dark, #2D5A3C)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, cursor: "pointer" }}>
                        {isDone && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 14, color: isDone ? "#6b7280" : "#374151", lineHeight: 1.7, textDecoration: isDone ? "line-through" : "none" }} onClick={() => toggle(item.id)}>{item.text}</span>
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
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Why meetings matter for inclusion</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Research consistently shows that who gets heard in meetings, whose contributions are credited, and who is interrupted shapes perceptions of competence, commitment, and leadership potential. These patterns are not random; they track with gender, race, disability, and other characteristics.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Changing meeting culture is one of the highest-impact, lowest-cost interventions available to leaders and managers who are serious about inclusion.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
              { title: "Supporting Neurodivergent People at Work", slug: "neurodivergent-support-guide", format: "Guide" },
              { title: "Challenging Non-Inclusive Behaviour", slug: "challenging-non-inclusive-behaviour", format: "Guide" },
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
