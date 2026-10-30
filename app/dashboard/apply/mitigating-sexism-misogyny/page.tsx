"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

type ActionStatus = "yes" | "partially" | "not-yet" | null;
type Category = "understanding" | "action" | "accountability";

interface Section {
  id: string;
  number: string;
  title: string;
  points: string[];
  category: Category;
}

const SECTIONS: Section[] = [
  {
    id: "s1", number: "01", category: "understanding",
    title: "Understanding sexism and misogyny",
    points: [
      "Recognise sexism and misogyny as systemic issues, not isolated incidents",
      "Understand how gendered power and stereotypes shape behaviour",
      "Acknowledge that misogyny often shows up subtly through structures, policies, and decision-making",
      "Recognise that experiences of sexism are shaped by race, disability, class, sexuality, age, and caring responsibilities"
    ]
  },
  {
    id: "s2", number: "02", category: "action",
    title: "Set clear behavioural standards",
    points: [
      "Name misogyny and sexism explicitly in policy, values and codes of conduct",
      "Be specific about unacceptable behaviours not just intent",
      "Apply consequences consistently regardless of seniority",
      "Make expectations visible through training and leadership modelling"
    ]
  },
  {
    id: "s3", number: "03", category: "action",
    title: "Shift from intent to impact",
    points: [
      "Train managers to respond to harm without defensiveness",
      "Use language that centres impact, not motivation",
      "Avoid framing sexism as a misunderstanding by default",
      "Validate experiences without requiring proof of intent"
    ]
  },
  {
    id: "s4", number: "04", category: "action",
    title: "Disrupt gendered power dynamics",
    points: [
      "Rotate visibility, stretch opportunities, and meeting roles",
      "Introduce structured decision-making to reduce bias",
      "Create pathways for women to take on influential, career-advancing work",
      "Monitor who gains influence, recognition, and informal power"
    ]
  },
  {
    id: "s5", number: "05", category: "action",
    title: "Strengthen reporting and response",
    points: [
      "Offer multiple reporting routes including formal and informal",
      "Communicate clearly the protocol after a report is made",
      "Protect complainants from retaliation",
      "Share what was learned from dealing with incidents and what changed"
    ]
  },
  {
    id: "s6", number: "06", category: "action",
    title: "Resource the work properly",
    points: [
      "Avoid placing the burden on women to fix sexist cultures",
      "Allocate time, budget, and authority to this work",
      "Recognise emotional labour as labour",
      "Build inclusion responsibilities into roles, not volunteer efforts"
    ]
  },
  {
    id: "s7", number: "07", category: "action",
    title: "Address everyday sexism, not just extreme cases",
    points: [
      "Challenge interruptions, idea appropriation, and tone policing",
      "Treat banter and stereotypes as harmful cultural risks",
      "Always intervene early before patterns become normalised",
      "Acknowledge cumulative harm, not just isolated incidents"
    ]
  },
  {
    id: "s8", number: "08", category: "action",
    title: "Build manager capability for real-time intervention",
    points: [
      "Equip managers to challenge sexism in the moment",
      "Provide scripts and frameworks for difficult conversations",
      "Hold managers accountable for team culture",
      "Support managers with coaching"
    ]
  },
  {
    id: "s9", number: "09", category: "accountability",
    title: "Apply accountability across performance systems",
    points: [
      "Audit performance feedback for gendered language and stereotypes",
      "Separate personality critiques from measurable outcomes",
      "Ensure culture fit is not used to mask bias",
      "Review how confidence, assertiveness, and leadership are defined"
    ]
  },
  {
    id: "s10", number: "10", category: "action",
    title: "Embed intersectionality into gender equity work",
    points: [
      "Analyse how sexism intersects with race, disability, class, sexuality",
      "Avoid centring only the experiences of the most privileged women",
      "Involve those most impacted in shaping solutions",
      "Use disaggregated data to inform targeted action"
    ]
  },
  {
    id: "s11", number: "11", category: "action",
    title: "Protect psychological safety and voice",
    points: [
      "Make it safe to challenge power without career risk",
      "Model humility and accountability from senior leaders",
      "Respond to concerns with curiosity, not control",
      "Address silence and withdrawal as potential indicators of harm"
    ]
  },
  {
    id: "s12", number: "12", category: "accountability",
    title: "Measure what has changed over time",
    points: [
      "Track pay, progression, attrition, and feedback by gender",
      "Review complaint handling timelines and outcomes",
      "Use data to inform action, not to defend inaction",
      "Share progress transparently to build trust and accountability"
    ]
  }
];

const CATEGORY_LABELS: Record<Category, string> = {
  understanding: "Understanding",
  action: "Taking Action",
  accountability: "Accountability"
};

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  understanding: { bg: "#FFF8F0", text: "#B45309", border: "#F59E0B" },
  action: { bg: "var(--sage-xlight)", text: "var(--sage-dark)", border: "var(--sage-light)" },
  accountability: { bg: "#EFF6FF", text: "#1D4ED8", border: "#93C5FD" }
};

const STATUS_OPTIONS: { value: ActionStatus; label: string; color: string }[] = [
  { value: "yes", label: "Yes", color: "#16a34a" },
  { value: "partially", label: "Partially", color: "#D97706" },
  { value: "not-yet", label: "Not yet", color: "#DC2626" }
];

export default function MitigatingSexismMisogynyPage() {
  const [statuses, setStatuses] = useState<Record<string, ActionStatus>>({});
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");

  const actioned = useMemo(() => Object.values(statuses).filter(v => v === "yes").length, [statuses]);
  const partial = useMemo(() => Object.values(statuses).filter(v => v === "partially").length, [statuses]);

  const setStatus = (id: string, val: ActionStatus) =>
    setStatuses(prev => ({ ...prev, [id]: prev[id] === val ? null : val }));
  const toggleTick = (key: string) => setTicked(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered = filterCategory === "all" ? SECTIONS : SECTIONS.filter(s => s.category === filterCategory);
  const priorities = SECTIONS.filter(s => !statuses[s.id] || statuses[s.id] === "not-yet");

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--sage-xlight)", minHeight: "100vh" }}>
      <PlatformNav />
      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Guide
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Mitigating Sexism and Misogyny at Work
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          A practical guide to identifying, naming, and interrupting sexist behaviour and systemic gender inequity in the workplace. Work through each of the 12 areas below and track where your organisation stands.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Gender Equity", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 6rem" }}>

        {/* Progress Summary */}
        <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Actioned", value: actioned, color: "#16a34a", bg: "#F0FDF4" },
            { label: "Partially", value: partial, color: "#D97706", bg: "#FFFBEB" },
            { label: "Not yet", value: SECTIONS.length - actioned - partial, color: "#DC2626", bg: "#FFF5F5" },
            { label: "Total areas", value: 12, color: "var(--sage-dark)", bg: "var(--sage-xlight)" }
          ].map(({ label, value, color, bg }) => (
            <div key={label} style={{ background: bg, borderRadius: 12, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color, fontFamily: "var(--font-heading)" }}>{value}</div>
              <div style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {(["all", "understanding", "action", "accountability"] as const).map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)} style={{
              padding: "8px 16px", borderRadius: 20, border: "2px solid",
              borderColor: filterCategory === cat ? "var(--sage-dark)" : "var(--gray-border)",
              background: filterCategory === cat ? "var(--sage-dark)" : "var(--white)",
              color: filterCategory === cat ? "var(--white)" : "var(--charcoal)",
              fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s"
            }}>
              {cat === "all" ? "All areas" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Sections — 3-column card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {filtered.map(section => {
            const colors = CATEGORY_COLORS[section.category];
            const status = statuses[section.id];
            return (
              <div key={section.id} style={{ background: "var(--white)", borderRadius: 12, border: `2px solid ${status === "yes" ? "#BBF7D0" : "var(--gray-border)"}`, overflow: "hidden", transition: "border-color 0.2s", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${colors.border}`, background: colors.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ background: "#fff", color: colors.text, borderRadius: 6, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0, border: `1px solid ${colors.border}` }}>{section.number}</span>
                    <span style={{ fontSize: 10, color: colors.text, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{CATEGORY_LABELS[section.category]}</span>
                    {status && (
                      <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: status === "yes" ? "#16a34a" : status === "partially" ? "#D97706" : "#DC2626", background: status === "yes" ? "#F0FDF4" : status === "partially" ? "#FFFBEB" : "#FEF2F2", padding: "2px 8px", borderRadius: 10 }}>
                        {STATUS_OPTIONS.find(o => o.value === status)?.label}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--charcoal)", fontSize: 14, lineHeight: 1.35 }}>{section.title}</div>
                </div>
                <div style={{ padding: "0.875rem 1.25rem", flex: 1 }}>
                  <ul style={{ margin: "0 0 0.875rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {section.points.map((pt, i) => {
                      const key = `${section.id}-${i}`;
                      const isDone = ticked[key] || false;
                      return (
                        <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }} onClick={() => toggleTick(key)}>
                          <span style={{ flexShrink: 0, marginTop: 1, width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isDone ? colors.text : "#d1d5db"}`, background: isDone ? colors.bg : "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                            {isDone && <span style={{ color: colors.text, fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>}
                          </span>
                          <span style={{ color: isDone ? "#9ca3af" : "#444", lineHeight: 1.55, fontSize: 13, textDecoration: isDone ? "line-through" : "none", transition: "all 0.15s" }}>{pt}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#666", marginBottom: 6 }}>Has your organisation taken action here?</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {STATUS_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => setStatus(section.id, opt.value)} style={{
                        padding: "4px 10px", borderRadius: 16, border: "2px solid",
                        borderColor: status === opt.value ? opt.color : "var(--gray-border)",
                        background: status === opt.value ? opt.color : "var(--white)",
                        color: status === opt.value ? "var(--white)" : "var(--charcoal)",
                        fontWeight: 600, fontSize: 12, cursor: "pointer", transition: "all 0.15s"
                      }}>{opt.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority Actions */}
        {priorities.length > 0 && (
          <div style={{ background: "#FFF8F0", border: "1px solid #F59E0B", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", color: "#92400E", fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem" }}>
              Priority areas to address ({priorities.length})
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {priorities.map(s => (
                <button key={s.id} onClick={() => setFilterCategory("all")} style={{ background: "var(--white)", border: "1px solid #F59E0B", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 600, color: "#92400E", cursor: "pointer" }}>
                  {s.number}. {s.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {priorities.length === 0 && Object.keys(statuses).length === 12 && (
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontFamily: "var(--font-heading)", color: "#14532D", margin: "0 0 0.5rem" }}>All 12 areas actioned!</h2>
            <p style={{ color: "#166534", margin: 0 }}>Your organisation has taken action across every area of this guide. Keep monitoring and iterating.</p>
          </div>
        )}
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Understanding gender inequity at work
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Sexism and misogyny in the workplace are not confined to overt harassment or discrimination. They operate through everyday patterns: who is interrupted in meetings, whose ideas are credited, who is assigned administrative tasks regardless of seniority, who is called emotional for expressing views that would be called assertive in a man. These patterns are cumulative and consequential.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Research consistently shows that women, particularly women from racialised groups, are evaluated differently than men performing the same behaviours. They are held to higher standards for promotion, penalised more heavily for mistakes, and less likely to receive sponsorship from senior leaders. These are not individual failures: they are structural patterns that require structural responses.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Effective mitigation goes beyond awareness training. It requires examining data on hiring, promotion, pay, and attrition through a gender lens; building accountability into management practice; redesigning the processes where bias most acutely impacts outcomes; and creating cultures where calling out gender inequity is normalised rather than risky.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link key="recognising-bias" href={`/dashboard/apply/recognising-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Recognising Bias: Common Types in the Workplace
                </span>
              </Link>
              <Link key="inclusive-leadership-self-assessment" href={`/dashboard/apply/inclusive-leadership-self-assessment`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Self-Assessment
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Leadership Self-Assessment
                </span>
              </Link>
              <Link key="inclusive-comms-boundaries" href={`/dashboard/apply/inclusive-comms-boundaries`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Communications and Boundaries
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
