"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const TIPS = [
  {
    id: 1,
    title: "Accept that everyone has bias",
    body: "We all have bias; acknowledging this allows you to approach reflection and decision-making with honesty and self-awareness.",
    prompt: "What assumptions might you be carrying right now that you haven't examined?",
  },
  {
    id: 2,
    title: "Reflect before reacting",
    body: "Pause and ask yourself: What assumptions am I making? Whose perspective might I be overlooking?",
    prompt: "Think of a recent situation where you reacted quickly. What might you have missed?",
  },
  {
    id: 3,
    title: "Challenge first impressions",
    body: "Notice when you make quick judgments; slow down and seek more context before drawing conclusions.",
    prompt: "Who have you misjudged based on a first impression? What changed when you learned more?",
  },
  {
    id: 4,
    title: "Question what you consider 'normal'",
    body: "Consider how your cultural background or upbringing may shape your ideas of what is "standard".",
    prompt: "What do you consider 'normal' at work that might not feel normal to others?",
  },
  {
    id: 5,
    title: "Seek out diverse perspectives",
    body: "Actively engage with people, stories, and experiences different from your own to broaden understanding.",
    prompt: "Whose voice have you not heard lately that you should seek out?",
  },
  {
    id: 6,
    title: "Listen to feedback openly",
    body: "When someone highlights a biased comment, avoid defensiveness; treat it as valuable information.",
    prompt: "How do you typically respond when someone challenges something you've said or done?",
  },
  {
    id: 7,
    title: "Review your language and tone",
    body: "Reflect on whether your communication is inclusive, neutral, and respectful across different identities.",
    prompt: "Is there language you use regularly that might be excluding or othering someone?",
  },
  {
    id: 8,
    title: "Reflect on your influences",
    body: "Think about the media, communities, and role models that shape your views.",
    prompt: "Who or what has most shaped your worldview, and how inclusive are those influences?",
  },
  {
    id: 9,
    title: "Use evidence, not instinct",
    body: "Ground your judgments in evidence and clear criteria rather than personal feelings or assumptions.",
    prompt: "In a recent decision, what evidence did you use, and what was instinct?",
  },
  {
    id: 10,
    title: "Be mindful of comfort zones",
    body: "Notice who you naturally gravitate towards; make an effort to include different voices.",
    prompt: "Who do you rarely collaborate with that you could proactively include?",
  },
  {
    id: 11,
    title: "Reflect regularly",
    body: "Build short moments of reflection into your week after meetings, lessons, or key decisions.",
    prompt: "When in your week could you carve out five minutes to reflect on your actions?",
  },
  {
    id: 12,
    title: "Commit to lifelong learning",
    body: "Bias awareness is ongoing; stay curious, attend training, read widely.",
    prompt: "What is one book, podcast, or course on bias or inclusion you could explore next?",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
  "0": { bg: "#F0FDF4", border: "#86EFAC", badge: "var(--sage-dark)" },
  "1": { bg: "#EFF6FF", border: "#93C5FD", badge: "#1E40AF" },
  "2": { bg: "#FFF7ED", border: "#FCD34D", badge: "#92400E" },
  "3": { bg: "#FDF4FF", border: "#D8B4FE", badge: "#7E22CE" },
};

export default function AcknowledgingPersonalBias() {
  const [committed, setCommitted] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [journalNotes, setJournalNotes] = useState<Record<number, string>>({});

  const committedCount = useMemo(() => Object.values(committed).filter(Boolean).length, [committed]);
  const progressPct = Math.round((committedCount / TIPS.length) * 100);

  const focusTips = TIPS.filter((t) => committed[t.id]);

  const toggleCommit = (id: number) => setCommitted((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleExpand = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--sage-dark) 0%, #1a3d2b 100%)", padding: "3rem 1.5rem 2.5rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Self-Awareness</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--white)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Top 10 Tips: Acknowledging Personal Bias
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
          Check the tips you are actively working on. Use the reflection prompts to go deeper and build your self-awareness practice.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "2rem", fontWeight: 700 }}>{committedCount}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Tips committed</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "2rem", fontWeight: 700 }}>{TIPS.length}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Total tips</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "2rem", fontWeight: 700 }}>{progressPct}%</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Progress</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "1rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--charcoal)", fontWeight: 600 }}>Your commitment progress</span>
            <span style={{ fontSize: "0.8rem", color: "var(--sage-dark)", fontWeight: 700 }}>{committedCount} / {TIPS.length}</span>
          </div>
          <div style={{ background: "var(--gray-border)", borderRadius: "999px", height: "10px", overflow: "hidden" }}>
            <div style={{ background: "var(--sage-dark)", width: `${progressPct}%`, height: "100%", borderRadius: "999px", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Tips grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {TIPS.map((tip, i) => {
            const colorKey = String(i % 4);
            const colors = CATEGORY_COLORS[colorKey];
            const isCommitted = committed[tip.id];
            const isExpanded = expanded[tip.id];
            return (
              <div key={tip.id} style={{
                background: isCommitted ? colors.bg : "var(--white)",
                border: `2px solid ${isCommitted ? colors.border : "var(--gray-border)"}`,
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                transition: "all 0.25s ease",
                boxShadow: isCommitted ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  {/* Number badge */}
                  <div style={{
                    minWidth: "36px", height: "36px", borderRadius: "50%",
                    background: isCommitted ? colors.badge : "var(--gray-border)",
                    color: isCommitted ? "var(--white)" : "var(--charcoal)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.85rem", fontWeight: 700, transition: "all 0.25s ease",
                  }}>
                    {String(tip.id).padStart(2, "0")}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", margin: 0, flex: 1 }}>
                        {tip.title}
                      </h3>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <button
                          onClick={() => toggleExpand(tip.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px", transition: "background 0.2s" }}
                        >
                          {isExpanded ? "Hide prompt" : "Reflection prompt"}
                        </button>
                        <button
                          onClick={() => toggleCommit(tip.id)}
                          style={{
                            background: isCommitted ? colors.badge : "var(--white)",
                            color: isCommitted ? "var(--white)" : "var(--charcoal)",
                            border: `1.5px solid ${isCommitted ? colors.badge : "var(--gray-border)"}`,
                            borderRadius: "6px", padding: "0.3rem 0.75rem",
                            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                            transition: "all 0.2s ease", whiteSpace: "nowrap",
                          }}
                        >
                          {isCommitted ? "Working on this ✓" : "I'm working on this"}
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#555", margin: "0.4rem 0 0", lineHeight: 1.55 }}>{tip.body}</p>

                    {isExpanded && (
                      <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.7)", border: "1px solid var(--gray-border)", borderRadius: "8px", padding: "1rem" }}>
                        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>Reflection prompt:</p>
                        <p style={{ fontSize: "0.88rem", color: "var(--charcoal)", margin: "0 0 0.75rem", fontStyle: "italic" }}>{tip.prompt}</p>
                        <textarea
                          value={journalNotes[tip.id] || ""}
                          onChange={(e) => setJournalNotes((prev) => ({ ...prev, [tip.id]: e.target.value }))}
                          placeholder="Write your reflection here..."
                          rows={3}
                          style={{
                            width: "100%", boxSizing: "border-box", border: "1px solid var(--gray-border)",
                            borderRadius: "6px", padding: "0.6rem", fontSize: "0.85rem",
                            resize: "vertical", fontFamily: "var(--font-body)", color: "var(--charcoal)",
                            background: "var(--white)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* My focus areas */}
        {focusTips.length > 0 && (
          <div style={{ background: "var(--white)", border: "2px solid var(--sage-dark)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--sage-dark)", margin: "0 0 1rem" }}>
              My focus areas ({focusTips.length} tip{focusTips.length !== 1 ? "s" : ""})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {focusTips.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.75rem", background: "var(--sage-xlight)", borderRadius: "6px" }}>
                  <span style={{ color: "var(--sage-dark)", fontWeight: 700, fontSize: "0.8rem" }}>#{String(t.id).padStart(2, "0")}</span>
                  <span style={{ fontSize: "0.88rem", color: "var(--charcoal)", fontWeight: 500 }}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Print button */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => window.print()}
            style={{
              background: "var(--sage-dark)", color: "var(--white)", border: "none",
              borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "0.9rem",
              fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)",
            }}
          >
            Print or save your reflections
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/dashboard/apply" style={{ fontSize: "0.85rem", color: "var(--sage-dark)", textDecoration: "none", fontWeight: 600 }}>
            ← Back to resources
          </Link>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
