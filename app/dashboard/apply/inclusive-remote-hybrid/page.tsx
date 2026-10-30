"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const PILLARS = [
  {
    id: "accessibility", num: "01", icon: "♿",
    title: "Accessibility for all",
    color: "#7c3aed", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    summary: "Ensure digital and physical access for every employee",
    actions: [
      "Ensure digital tools are screen-reader friendly with captions and accessible software",
      "Provide alternative formats for all shared content",
      "Support employees with disabilities to access the right technology and adjustments",
      "Evaluate technology regularly for inclusive usability",
      "Test digital platforms with assistive technology before rollout",
    ],
  },
  {
    id: "communication", num: "02", icon: "💬",
    title: "Communication and connection",
    color: "#0F766E", colorLight: "#F0FDFA", colorBorder: "#5EEAD4",
    summary: "Multiple channels; clarity; informal connection",
    actions: [
      "Use multiple communication channels to reach different preferences and needs",
      "Maintain clarity and transparency in all written communications",
      "Create regular opportunities for informal connection across teams",
      "Be mindful of language, idiom, and cultural references in written communication",
      "Offer alternatives to text-heavy formats for neurodiverse team members",
    ],
  },
  {
    id: "meetings", num: "03", icon: "📅",
    title: "Inclusive meetings and collaboration",
    color: "#1E40AF", colorLight: "#EFF6FF", colorBorder: "#93C5FD",
    summary: "Scheduling, facilitation, and equitable contribution",
    actions: [
      "Schedule meetings considering time zones, caregiving responsibilities, and religious observances",
      "Record meetings and share notes so those who cannot attend remain included",
      "Rotate meeting times to share inconvenience fairly across global teams",
      "Use facilitation techniques that give everyone a chance to contribute",
      "Avoid scheduling key decisions only in meetings where remote attendees are at a disadvantage",
    ],
  },
  {
    id: "flexibility", num: "04", icon: "⚖️",
    title: "Flexibility and wellbeing",
    color: "#2D5A3C", colorLight: "#EFF5F0", colorBorder: "#86EFAC",
    summary: "Flexible hours; mental health; equitable access",
    actions: [
      "Offer genuine flexible working hours; avoid rewarding presence over output",
      "Recognise and actively address digital fatigue",
      "Support mental health through regular wellbeing check-ins",
      "Ensure remote workers have equitable access to promotions and learning opportunities",
      "Avoid creating a two-tier culture where office workers are advantaged by default",
    ],
  },
  {
    id: "policies", num: "05", icon: "📋",
    title: "Inclusive policies and practices",
    color: "#92400E", colorLight: "#FFF7ED", colorBorder: "#FCD34D",
    summary: "Embed inclusion into remote and hybrid policy",
    actions: [
      "Embed inclusion explicitly in all remote and hybrid working policies",
      "Include religious and cultural observances in scheduling guidance",
      "Make remote policies intersectional; consider compounding barriers",
      "Establish clear and accessible reporting mechanisms for remote workers",
      "Review policies at least annually with employee input",
    ],
  },
  {
    id: "leadership", num: "06", icon: "⭐",
    title: "Leadership and accountability",
    color: "#BE185D", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
    summary: "Train managers; recognise contributions; act on feedback",
    actions: [
      "Train managers to lead inclusively in online and hybrid environments",
      "Recognise and celebrate diverse contributions during virtual meetings",
      "Use correct pronouns and names consistently in all digital communications",
      "Collect regular digital feedback on inclusion and act visibly on findings",
      "Hold leaders accountable for inclusive behaviours through performance frameworks",
    ],
  },
  {
    id: "technology", num: "07", icon: "💻",
    title: "Technology and tools",
    color: "#4D7C0F", colorLight: "#F7FEE7", colorBorder: "#A3E635",
    summary: "Choose inclusive tools; train teams; audit for bias",
    actions: [
      "Choose collaboration tools evaluated for accessibility and inclusion",
      "Provide comprehensive training on digital tools for all team members",
      "Regularly audit technology for embedded bias in algorithms or design",
      "Ensure tools work across different devices, connections, and languages",
      "Give employees a voice in selecting and evaluating the tools they use",
    ],
  },
  {
    id: "culture", num: "08", icon: "🤝",
    title: "Team culture and belonging",
    color: "#6B21A8", colorLight: "#FAF5FF", colorBorder: "#D8B4FE",
    summary: "Psychological safety online; celebrate diversity",
    actions: [
      "Create psychological safety in online spaces; model respectful disagreement",
      "Celebrate diversity virtually through meaningful events and recognition",
      "Be mindful of intersectionality when designing culture initiatives",
      "Ensure remote workers feel genuinely part of the team, not peripheral",
      "Create virtual spaces for affinity groups and informal community",
    ],
  },
  {
    id: "measuring", num: "09", icon: "📊",
    title: "Measuring inclusion and impact",
    color: "#0C4A6E", colorLight: "#F0F9FF", colorBorder: "#7DD3FC",
    summary: "Track participation; review equity; survey regularly",
    actions: [
      "Track online participation rates across teams and identity groups",
      "Assess remote equity by reviewing promotions, pay, and development by location",
      "Conduct regular employee surveys specifically about remote inclusion and accessibility",
      "Disaggregate data to reveal disparities between remote and office-based workers",
      "Use findings to drive visible, measurable change rather than compliance reporting",
    ],
  },
];

const RATING_LABELS = ["Not started", "Early stages", "Developing", "Established", "Leading"];

export default function InclusiveRemoteHybrid() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const ratedCount = Object.keys(ratings).length;
  const avgRating = useMemo(() => {
    const vals = Object.values(ratings);
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [ratings]);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      <div style={{ background: "linear-gradient(135deg, #0F766E 0%, #0c4a42 100%)", padding: "3rem 1.5rem 2.5rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Framework</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--white)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Inclusive Remote and Hybrid Working Guide
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          Nine pillars of inclusive remote and hybrid practice. Rate your organisation on each pillar and build your action plan.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{ratedCount}/9</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Pillars rated</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{avgRating ?? "—"}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Average score</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{checkedCount}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Actions committed</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {PILLARS.map((pillar) => {
            const isExpanded = expanded[pillar.id];
            const rating = ratings[pillar.id];
            const pillarChecked = pillar.actions.map((_, i) => checked[`${pillar.id}-${i}`] || false).filter(Boolean).length;
            return (
              <div key={pillar.id} style={{ background: "var(--white)", border: `2px solid ${isExpanded ? pillar.colorBorder : "var(--gray-border)"}`, borderRadius: "12px", overflow: "hidden", transition: "all 0.2s", boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div onClick={() => setExpanded((p) => ({ ...p, [pillar.id]: !p[pillar.id] }))} style={{ cursor: "pointer", padding: "1.25rem", background: isExpanded ? pillar.colorLight : "var(--white)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{pillar.icon}</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: pillar.color, background: pillar.colorLight, border: `1px solid ${pillar.colorBorder}`, borderRadius: "999px", padding: "0.15rem 0.55rem" }}>{pillar.num}</span>
                    </div>
                    <span style={{ color: "#aaa", fontSize: "0.85rem" }}>{isExpanded ? "▲" : "▼"}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.25rem" }}>{pillar.title}</h3>
                  <p style={{ fontSize: "0.78rem", color: "#888", margin: 0, lineHeight: 1.4 }}>{pillar.summary}</p>
                  {(rating !== undefined || pillarChecked > 0) && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                      {rating !== undefined && <span style={{ fontSize: "0.72rem", fontWeight: 600, color: pillar.color, background: pillar.colorLight, borderRadius: "999px", padding: "0.15rem 0.5rem" }}>{RATING_LABELS[rating]}</span>}
                      {pillarChecked > 0 && <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#555", background: "var(--gray-soft)", borderRadius: "999px", padding: "0.15rem 0.5rem" }}>{pillarChecked} action{pillarChecked !== 1 ? "s" : ""} committed</span>}
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${pillar.colorBorder}`, padding: "1rem 1.25rem", background: "#fafafa" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.4rem" }}>How are we doing?</p>
                    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      {RATING_LABELS.map((r, ri) => (
                        <button key={r} onClick={() => setRatings((p) => ({ ...p, [pillar.id]: ri }))} style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem", fontWeight: 600, borderRadius: "5px", cursor: "pointer", border: "1.5px solid", borderColor: rating === ri ? pillar.color : "var(--gray-border)", background: rating === ri ? pillar.colorLight : "var(--white)", color: rating === ri ? pillar.color : "#777", transition: "all 0.2s" }}>{r}</button>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.4rem" }}>Actions:</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {pillar.actions.map((action, ai) => {
                        const key = `${pillar.id}-${ai}`;
                        const isChecked = checked[key] || false;
                        return (
                          <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer" }}>
                            <input type="checkbox" checked={isChecked} onChange={() => setChecked((p) => ({ ...p, [key]: !p[key] }))} style={{ marginTop: "2px", accentColor: pillar.color, width: "14px", height: "14px", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.8rem", color: "var(--charcoal)", lineHeight: 1.45, textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.55 : 1, transition: "all 0.2s" }}>{action}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {(ratedCount > 0 || checkedCount > 0) && (
          <div style={{ background: "#F0FDFA", border: "2px solid #5EEAD4", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#0F766E", margin: "0 0 0.5rem" }}>Your framework snapshot</h2>
            <p style={{ fontSize: "0.88rem", color: "#444", margin: 0 }}>
              {ratedCount > 0 ? `You have rated ${ratedCount} of 9 pillars with an average score of ${avgRating}.` : "Start rating pillars above to see your snapshot."}{" "}
              {checkedCount > 0 ? `You have committed to ${checkedCount} action${checkedCount !== 1 ? "s" : ""} across your framework.` : ""}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button onClick={() => window.print()} style={{ background: "#0F766E", color: "var(--white)", border: "none", borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
            Print or save your framework summary
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/dashboard/apply" style={{ fontSize: "0.85rem", color: "var(--sage-dark)", textDecoration: "none", fontWeight: 600 }}>← Back to resources</Link>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
