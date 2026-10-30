"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const SECTIONS = [
  {
    id: "flexible-hours",
    num: "01",
    title: "Flexible working hours",
    category: "employer",
    summary: "Adjust schedules around religious observances",
    detail: "Offer flexibility so employees can adjust schedules around religious observances; avoid penalising employees for time taken. Consider core-hours policies that allow shifts earlier or later in the day without loss of pay or status.",
    actions: [
      "Review current flexible working policies for religious accommodation",
      "Ensure managers understand the right to request flexible hours",
      "Communicate clearly how employees can request schedule adjustments",
    ],
  },
  {
    id: "leave-policies",
    num: "02",
    title: "Leave and holiday policies",
    category: "employer",
    summary: "Religious and cultural leave options",
    detail: "Provide options for religious or cultural leave; allow swapping of public holidays; communicate options clearly. Not all employees celebrate the same bank holidays, and equitable access to leave matters for belonging.",
    actions: [
      "Create a holiday-swap policy to allow cultural or religious substitutions",
      "Communicate leave entitlements in induction and staff handbooks",
      "Audit whether current holiday calendar reflects only dominant traditions",
    ],
  },
  {
    id: "prayer-spaces",
    num: "03",
    title: "Prayer, meditation, and reflection spaces",
    category: "workplace",
    summary: "Neutral, accessible quiet spaces for all",
    detail: "Provide accessible, neutral, quiet spaces; ensure clear guidance that the space is open to everyone. Avoid labelling spaces for one religion only; a multi-faith room signals inclusion to all.",
    actions: [
      "Identify or create at least one neutral, quiet space in each office",
      "Share clear guidance on booking and using the space",
      "Ensure the space is accessible for employees with mobility needs",
    ],
  },
  {
    id: "dress-appearance",
    num: "04",
    title: "Dress and appearance",
    category: "workplace",
    summary: "Respect religious and cultural attire",
    detail: "Respect religious or cultural attire including head coverings, hairstyles, clothing, and markings; ensure dress codes accommodate diverse expressions. Challenge any dress code language that is unintentionally discriminatory.",
    actions: [
      "Review dress code policy with an inclusion lens",
      "Remove language that restricts hairstyles, head coverings, or cultural dress",
      "Train managers to handle appearance-related situations respectfully",
    ],
  },
  {
    id: "dietary",
    num: "05",
    title: "Dietary considerations",
    category: "workplace",
    summary: "Halal, kosher, vegetarian, and cultural diets",
    detail: "Offer options for dietary restrictions including vegetarian, halal, kosher, or other culturally significant diets; label food clearly. Catering decisions signal whether employees are truly considered.",
    actions: [
      "Audit catering suppliers and canteen menus for diverse dietary options",
      "Ensure food is clearly labelled at all events and in the canteen",
      "Ask employees about dietary needs during onboarding and for events",
    ],
  },
  {
    id: "observing-practices",
    num: "06",
    title: "Observing religious practices",
    category: "manager",
    summary: "Plan workloads around observances",
    detail: "Plan workloads and meetings outside important observances; avoid assuming the main religion is the most important. Key dates differ across faiths; a shared calendar of major observances supports equitable planning.",
    actions: [
      "Create or use a multi-faith calendar of significant observances",
      "Avoid scheduling key deadlines or events during major observances",
      "Ask employees proactively rather than waiting for them to raise needs",
    ],
  },
  {
    id: "manager-guidance",
    num: "07",
    title: "Manager guidance",
    category: "manager",
    summary: "Listen actively and plan inclusively",
    detail: "Listen actively; research employee needs; plan events and meetings inclusively; be proactive in scheduling. Managers set the tone for whether employees feel safe disclosing religious or cultural needs.",
    actions: [
      "Provide training on religious and cultural awareness for all managers",
      "Encourage managers to proactively ask about support needs",
      "Create a culture where disclosing needs is welcomed, not tolerated",
    ],
  },
  {
    id: "leadership",
    num: "08",
    title: "Leadership role modelling",
    category: "manager",
    summary: "Model respect and equitable treatment",
    detail: "Educate teams; promote awareness of diverse practices; model respect by treating all beliefs equitably. Leaders who visibly honour diverse practices give permission for others to do the same.",
    actions: [
      "Share stories of diverse religious and cultural observances at leadership level",
      "Ensure senior leaders participate in or acknowledge diverse observances",
      "Avoid language that implies one faith or tradition is the default",
    ],
  },
  {
    id: "org-actions",
    num: "09",
    title: "Organisational actions",
    category: "employer",
    summary: "Embed in EDI and HR policies",
    detail: "Explicitly include religious and cultural observance in EDI, HR, and flexible working policies; provide awareness training. Policy embeds intent; without it, inclusion depends on individual managers rather than the organisation.",
    actions: [
      "Update HR, EDI, and flexible working policies to name religious accommodation",
      "Provide organisation-wide religious and cultural awareness training",
      "Assign accountability for monitoring and reviewing policy effectiveness",
    ],
  },
  {
    id: "feedback-celebration",
    num: "10",
    title: "Feedback and celebration",
    category: "workplace",
    summary: "Celebrate diversity thoughtfully",
    detail: "Allow employees to raise challenges; celebrate diversity thoughtfully by recognising diverse events respectfully. Celebration should be meaningful, not tokenistic; involve employees in how events are marked.",
    actions: [
      "Create safe channels for employees to raise concerns about inclusion",
      "Co-design celebration plans with employees from relevant communities",
      "Evaluate whether celebrations are meaningful or performative",
    ],
  },
  {
    id: "intersectional",
    num: "11",
    title: "Intersectional awareness",
    category: "employer",
    summary: "Recognise overlapping barriers",
    detail: "Recognise employees may face overlapping barriers related to gender, disability, race, or caring responsibilities. A Muslim woman with caring responsibilities faces compounding challenges that a single-lens policy will miss.",
    actions: [
      "Apply an intersectional lens when reviewing accommodation requests",
      "Train managers to recognise compounding barriers, not just single identities",
      "Collect and analyse data disaggregated by multiple characteristics",
    ],
  },
];

const CATEGORY_META: Record<string, { label: string; bg: string; text: string; border: string }> = {
  employer: { label: "Organisational", bg: "#EFF5F0", text: "#2D5A3C", border: "#2D5A3C" },
  manager: { label: "Manager", bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD" },
  workplace: { label: "Workplace", bg: "#FFF7ED", text: "#92400E", border: "#FCD34D" },
};

const RATINGS = ["Not started", "Early stages", "In progress", "Well embedded", "Leading practice"];

export default function ReligiousCulturalObservance() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [orgChecked, setOrgChecked] = useState<Record<string, boolean>>({});

  const avgRating = useMemo(() => {
    const vals = Object.values(ratings);
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [ratings]);

  const checkedCount = Object.values(orgChecked).filter(Boolean).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)", padding: "3rem 1.5rem 2.5rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Culture and Faith</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--white)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Religious and Cultural Observance at Work
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "580px", margin: "0 auto 1.5rem" }}>
          Explore 11 areas of good practice. Rate your organisation and build an action plan that reflects your current stage.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{Object.keys(ratings).length}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Sections rated</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{avgRating ?? "—"}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Average rating</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--white)", fontSize: "1.8rem", fontWeight: 700 }}>{checkedCount}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Actions checked</div>
          </div>
        </div>
      </div>

      {/* Category key */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0.75rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem", color: "#888", fontWeight: 600 }}>CATEGORY KEY:</span>
          {Object.entries(CATEGORY_META).map(([k, v]) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 600, color: v.text, background: v.bg, border: `1px solid ${v.border}`, borderRadius: "999px", padding: "0.2rem 0.7rem" }}>
              {v.label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {SECTIONS.map((sec) => {
            const cat = CATEGORY_META[sec.category];
            const isExpanded = expanded[sec.id];
            const rating = ratings[sec.id] ?? null;
            return (
              <div key={sec.id} style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                {/* Header row */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer" }} onClick={() => setExpanded((p) => ({ ...p, [sec.id]: !p[sec.id] }))}>
                  <div style={{ minWidth: "38px", height: "38px", borderRadius: "50%", background: cat.bg, border: `2px solid ${cat.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: cat.text }}>
                    {sec.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>{sec.title}</h3>
                        <p style={{ fontSize: "0.82rem", color: "#888", margin: "0.2rem 0 0" }}>{sec.summary}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: cat.text, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: "999px", padding: "0.15rem 0.6rem" }}>{cat.label}</span>
                        {rating !== null && (
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--sage-dark)", background: "var(--sage-xlight)", borderRadius: "999px", padding: "0.15rem 0.6rem" }}>
                            {RATINGS[rating]}
                          </span>
                        )}
                        <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "1.25rem 1.5rem", background: "#fafafa" }}>
                    <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.65, margin: "0 0 1.25rem" }}>{sec.detail}</p>

                    {/* Rating */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.5rem" }}>How well does your organisation do this?</p>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {RATINGS.map((r, ri) => (
                          <button key={r} onClick={() => setRatings((p) => ({ ...p, [sec.id]: ri }))} style={{
                            padding: "0.3rem 0.7rem", fontSize: "0.78rem", fontWeight: 600,
                            borderRadius: "6px", cursor: "pointer", border: "1.5px solid",
                            borderColor: rating === ri ? cat.border : "var(--gray-border)",
                            background: rating === ri ? cat.bg : "var(--white)",
                            color: rating === ri ? cat.text : "#666",
                            transition: "all 0.2s",
                          }}>{r}</button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Actions to consider:</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {sec.actions.map((action, ai) => {
                          const key = `${sec.id}-${ai}`;
                          return (
                            <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
                              <input type="checkbox" checked={orgChecked[key] || false} onChange={() => setOrgChecked((p) => ({ ...p, [key]: !p[key] }))} style={{ marginTop: "2px", accentColor: "var(--sage-dark)", width: "15px", height: "15px" }} />
                              <span style={{ fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.5, textDecoration: orgChecked[key] ? "line-through" : "none", opacity: orgChecked[key] ? 0.6 : 1, transition: "all 0.2s" }}>
                                {action}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {checkedCount > 0 && (
          <div style={{ background: "#EFF5F0", border: "2px solid #2D5A3C", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#2D5A3C", margin: "0 0 0.5rem" }}>
              Your action progress: {checkedCount} action{checkedCount !== 1 ? "s" : ""} committed
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#444", margin: 0 }}>
              Keep expanding each section to rate your organisation and check off additional actions.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button onClick={() => window.print()} style={{ background: "#7c3aed", color: "var(--white)", border: "none", borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
            Print or save this guide
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/dashboard/apply" style={{ fontSize: "0.85rem", color: "var(--sage-dark)", textDecoration: "none", fontWeight: 600 }}>
            ← Back to resources
          </Link>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
