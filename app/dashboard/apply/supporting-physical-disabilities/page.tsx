"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const SECTIONS = [
  {
    id: "understanding", title: "Understanding physical disability",
    color: "#7c3aed", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    questions: [
      { id: 1, statement: "I recognise that physical disabilities can be visible or invisible and may fluctuate over time.", example: "I avoid assuming consistent capacity and check in about support needs during flare-ups or recovery periods." },
      { id: 2, statement: "I avoid making assumptions about what physically disabled colleagues can or cannot do.", example: "I ask what access or adjustments are needed for travel or events rather than excluding someone by default." },
      { id: 3, statement: "I actively consider how workplace barriers, not individual ability, can create exclusion.", example: "I question whether a task is inaccessible because of how it is designed rather than who is doing it." },
      { id: 4, statement: "I understand how physical disability can intersect with gender, race, and caring responsibilities.", example: "I reflect on whether certain colleagues needs are taken less seriously and address this in decision-making." },
    ],
  },
  {
    id: "systems", title: "Systems and policies",
    color: "#1E40AF", colorLight: "#EFF6FF", colorBorder: "#93C5FD",
    questions: [
      { id: 5, statement: "I have developed and follow clear, consistent processes for applying reasonable adjustments.", example: "I have a policy in place and respond promptly to adjustment requests." },
      { id: 6, statement: "I protect confidentiality and handle disability-related information with care.", example: "I only share information on a need-to-know basis." },
      { id: 7, statement: "I ensure physical spaces are accessible by default, rather than waiting for issues to be raised.", example: "I check step-free access, seating, and toilet facilities before confirming venues." },
      { id: 8, statement: "I consider accessibility when planning off-sites, events, or social activities.", example: "I avoid activities requiring prolonged standing without accessible alternatives." },
      { id: 9, statement: "I ensure digital tools and systems are usable for people with physical access needs.", example: "I test forms and intranet content with adaptive keyboards or voice-to-text software." },
    ],
  },
  {
    id: "practice", title: "Day-to-day practice",
    color: "#166534", colorLight: "#F0FDF4", colorBorder: "#86EFAC",
    questions: [
      { id: 10, statement: "I support flexible working as a legitimate accessibility need, not a favour.", example: "I approve remote or hybrid work to reduce pain, fatigue, or travel barriers." },
      { id: 11, statement: "I recognise that stamina and energy levels can vary for people with physical disabilities.", example: "I build in breaks and avoid scheduling long meetings without rest periods." },
      { id: 12, statement: "I adapt workload expectations during periods of illness, recovery, or flare-ups.", example: "I adjust deadlines or redistribute tasks rather than penalising disability-related absence." },
      { id: 13, statement: "I challenge ableist language or behaviour when it appears.", example: "I address comments that frame accessibility as special treatment or inconvenience." },
    ],
  },
  {
    id: "leadership", title: "Leadership and accountability",
    color: "#92400E", colorLight: "#FFF7ED", colorBorder: "#FCD34D",
    questions: [
      { id: 14, statement: "I ensure physically disabled colleagues have equal access to development and progression.", example: "I do not exclude someone from stretch projects because of assumptions about capacity." },
      { id: 15, statement: "I regularly review adjustments to ensure they remain effective.", example: "I touch base with employees when roles or workloads change." },
      { id: 16, statement: "I take responsibility for accessibility rather than placing the burden on disabled colleagues.", example: "I proactively ask about access needs instead of waiting for someone to repeatedly self-advocate." },
      { id: 17, statement: "I encourage colleagues to be allies for accessibility.", example: "I ask teams to flag access issues when booking spaces or organising events." },
      { id: 18, statement: "I understand my legal responsibilities around disability and reasonable adjustments.", example: "I ensure my decisions align with the Equality Act 2010." },
      { id: 19, statement: "I seek out guidance and resources to improve physical accessibility and commit to making it a continuous practice.", example: "I attend training, review policies, and benchmark against best practice frameworks." },
    ],
  },
];

const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id })));
const TOTAL = ALL_QUESTIONS.length;
const RATINGS = ["Never", "Rarely", "Sometimes", "Often", "Always"];
const TIER_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; desc: string }> = {
  developing: { label: "Developing", bg: "#FFF7ED", text: "#92400E", border: "#FCD34D", desc: "You are beginning to build awareness. Focus on foundational questions first." },
  building: { label: "Building", bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD", desc: "You have some practices in place. Identify gaps and prioritise systemic changes." },
  practising: { label: "Practising", bg: "#F0FDF4", text: "#166534", border: "#86EFAC", desc: "Your practices are consistent. Share learning with peers and embed into culture." },
  leading: { label: "Leading", bg: "#EFF5F0", text: "#2D5A3C", border: "#2D5A3C", desc: "You demonstrate strong, consistent leadership. Champion accessibility across your organisation." },
};

function getOverallTier(avg: number): string {
  if (avg < 1) return "developing";
  if (avg < 2) return "building";
  if (avg < 3) return "practising";
  return "leading";
}

export default function SupportingPhysicalDisabilities() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [showExamples, setShowExamples] = useState<Record<number, boolean>>({});

  const ratedCount = Object.keys(ratings).length;
  const avgScore = useMemo(() => {
    const vals = Object.values(ratings);
    if (!vals.length) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [ratings]);

  const tier = avgScore !== null ? getOverallTier(avgScore) : null;
  const tierInfo = tier ? TIER_CONFIG[tier] : null;
  const priorityAreas = ALL_QUESTIONS.filter((q) => ratings[q.id] !== undefined && ratings[q.id] <= 1);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
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
            Reflection Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reflection tool &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Supporting Employees with Physical Disabilities
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Rate yourself on 19 practice statements across four areas. Reveal your tier and identify priority areas for action.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Disability Inclusion", "Accessibility"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "2rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#888" }}>RATING SCALE:</span>
          {RATINGS.map((r, i) => (
            <span key={r} style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--charcoal)", background: "var(--gray-soft)", borderRadius: "4px", padding: "0.2rem 0.5rem" }}>{i} = {r}</span>
          ))}
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.id} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: "4px", height: "28px", background: sec.color, borderRadius: "2px" }} />
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>{sec.title}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {sec.questions.map((q) => {
                const rating = ratings[q.id];
                const isLow = rating !== undefined && rating <= 1;
                return (
                  <div key={q.id} style={{ background: "var(--white)", borderRadius: "10px", border: `1.5px solid ${isLow ? sec.colorBorder : "var(--gray-border)"}`, padding: "1.1rem 1.25rem", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem" }}>
                      <span style={{ minWidth: "26px", height: "26px", borderRadius: "50%", background: rating !== undefined ? sec.color : "var(--gray-border)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{q.id}</span>
                      <p style={{ fontSize: "0.9rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.55, fontWeight: 500 }}>{q.statement}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                      {RATINGS.map((r, ri) => (
                        <button key={r} onClick={() => setRatings((p) => ({ ...p, [q.id]: ri }))} style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem", fontWeight: 600, borderRadius: "6px", cursor: "pointer", border: "1.5px solid", borderColor: rating === ri ? sec.color : "var(--gray-border)", background: rating === ri ? sec.colorLight : "var(--white)", color: rating === ri ? sec.color : "#777", transition: "all 0.2s" }}>{r}</button>
                      ))}
                    </div>
                    <button onClick={() => setShowExamples((p) => ({ ...p, [q.id]: !p[q.id] }))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: sec.color, fontWeight: 600, padding: 0 }}>
                      {showExamples[q.id] ? "Hide example ▴" : "See example ▾"}
                    </button>
                    {showExamples[q.id] && (
                      <div style={{ marginTop: "0.5rem", background: sec.colorLight, border: `1px solid ${sec.colorBorder}`, borderRadius: "6px", padding: "0.6rem 0.75rem" }}>
                        <p style={{ fontSize: "0.83rem", color: "var(--charcoal)", margin: 0, fontStyle: "italic" }}>{q.example}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {tierInfo && (
          <div style={{ background: tierInfo.bg, border: `2px solid ${tierInfo.border}`, borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: tierInfo.text, margin: "0 0 0.5rem" }}>Your tier: {tierInfo.label}</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--charcoal)", margin: 0 }}>{tierInfo.desc}</p>
          </div>
        )}
        {priorityAreas.length > 0 && (
          <div style={{ background: "#FFF7ED", border: "2px solid #FCD34D", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#92400E", margin: "0 0 0.75rem" }}>Priority areas ({priorityAreas.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {priorityAreas.map((q) => (
                <div key={q.id} style={{ fontSize: "0.85rem", color: "var(--charcoal)", background: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "0.4rem 0.75rem" }}>
                  <strong>#{q.id}:</strong> {q.statement}
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button onClick={() => window.print()} style={{ background: "#1E40AF", color: "var(--white)", border: "none", borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Print or save your reflection</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/dashboard/apply" style={{ fontSize: "0.85rem", color: "var(--sage-dark)", textDecoration: "none", fontWeight: 600 }}>← Back to resources</Link>
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Disability inclusion in the workplace
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Physical disabilities are diverse and often invisible. An employee may have a condition that fluctuates day to day, that is not apparent from their appearance, or that they have chosen not to disclose. Effective disability inclusion requires organisations to move beyond the legal minimum of reasonable adjustments and towards a culture where disabled employees do not have to fight to be accommodated.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Many disabled employees report that the barriers they face are not primarily about their condition: they are about how organisations respond to it. Slow adjustment processes, inaccessible environments, managers who are uncomfortable with the conversation, and cultures where asking for help feels risky all compound the experience of disability at work.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Inclusive practice in this area means auditing physical environments, training managers to have confident conversations about adjustments, reviewing recruitment and progression practices for hidden barriers, and building a culture in which disability is treated as a dimension of diversity rather than a problem to be managed.
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
              <Link key="making-policies-inclusive" href={`/dashboard/apply/making-policies-inclusive`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Making Policies More Inclusive
                </span>
              </Link>
              <Link key="inclusive-onboarding-guide" href={`/dashboard/apply/inclusive-onboarding-guide`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Checklist
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Onboarding Guide
                </span>
              </Link>
              <Link key="inclusive-remote-hybrid" href={`/dashboard/apply/inclusive-remote-hybrid`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Audit Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Remote and Hybrid Working
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
