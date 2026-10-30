"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SECTIONS = [
  {
    id: "lived-experience",
    title: "Centre Lived Experience",
    desc: "Use images that authentically reflect real communities and lived experiences; go beyond surface-level diversity.",
    points: [
      "Include socioeconomic backgrounds, neurodiversity, disability (visible and non-visible), LGBTQ+ identities, cultural and religious practices, and intersectional identities",
      "Avoid tokenistic visuals",
      "Allow employees or community members to guide how they are represented",
    ],
    avoid: "Avoid using stock photos that feel staged or that only show a narrow slice of diversity.",
  },
  {
    id: "stereotypes",
    title: "Challenge Stereotypes and Bias",
    desc: "Avoid imagery that reinforces power imbalances or harmful tropes.",
    points: [
      "Avoid portraying certain groups only as helpers, caregivers, or victims",
      "Avoid portraying people of colour solely in over-represented or stereotyped contexts",
      "Avoid depicting disabled people as \"inspirational\" as a default framing",
      "Show agency, leadership, and multidimensionality across all groups",
    ],
    avoid: "Avoid imagery where certain identities are only shown in subordinate or supporting roles.",
  },
  {
    id: "global-diversity",
    title: "Reflect Global Diversity",
    desc: "Ensure your imagery reflects the full breadth of human experience.",
    points: [
      "Include disability (visible and non-visible) in imagery",
      "Include LGBTQ+ identities and expressions",
      "Include cultural and religious practices and attire",
      "Include intersectional identities such as women of colour and disabled LGBTQ+ individuals",
    ],
    avoid: null,
  },
  {
    id: "accessibility",
    title: "Prioritise Accessibility",
    desc: "Make visual content usable for everyone.",
    points: [
      "Provide alt text that describes meaning, not just appearance",
      "Use high-contrast visuals and clear, readable elements",
      "Ensure images are compatible with screen readers and assistive technology",
      "Provide captions, transcripts, or audio descriptions where relevant",
    ],
    avoid: "Avoid decorative images without alt text or images that rely solely on colour to convey meaning.",
  },
  {
    id: "power",
    title: "Represent Power Equitably",
    desc: "Consider who holds authority and visibility in your imagery.",
    points: [
      "Show diversity in leadership roles and visible positions of authority",
      "Ensure underrepresented groups are depicted as decision-makers and experts, not only participants",
      "Avoid limiting certain groups to subordinate or supporting roles",
    ],
    avoid: "Avoid imagery where leadership is consistently represented by one demographic group.",
  },
  {
    id: "authenticity",
    title: "Ensure Authenticity",
    desc: "Use imagery that reflects genuine, real-world experiences.",
    points: [
      "Use natural, unstaged imagery when possible",
      "Avoid photos that erase or ignore cultural, physical, or social diversity",
      "Ensure illustrations and photography reflect real settings and authentic interactions",
    ],
    avoid: null,
  },
  {
    id: "trauma-informed",
    title: "Be Trauma-Informed",
    desc: "Handle imagery with care and awareness of harm.",
    points: [
      "Avoid imagery that exploits pain, marginalisation, or conflict",
      "Do not use traumatic imagery for casual or decorative purposes",
      "Show resilience, agency, and empowerment rather than suffering as spectacle",
      "Ensure images do not re-traumatise or sensationalise lived experience",
    ],
    avoid: "Avoid using images of communities in crisis as a way to illustrate diversity or hardship.",
  },
  {
    id: "intersectionality",
    title: "Include Intersectionality",
    desc: "Reflect the complexity of overlapping identities.",
    points: [
      "Represent overlapping experiences of race, gender, ability, age, sexuality, and culture",
      "Show how systemic barriers affect real people",
      "Never show one group as a monolith",
    ],
    avoid: null,
  },
  {
    id: "alignment",
    title: "Align with Organisational Action",
    desc: "Ensure visuals match your organisation\'s actual practices.",
    points: [
      "Visuals should align with your organisational policies and practices",
      "Ensure what you show in images reflects actual inclusive behaviours and culture",
      "Address misalignment between visuals and practice: it undermines trust and credibility",
    ],
    avoid: "Avoid using inclusive imagery as a substitute for inclusive practice.",
  },
  {
    id: "iterate",
    title: "Review, Reflect, and Iterate",
    desc: "Make imagery review a regular, ongoing practice.",
    points: [
      "Regularly assess your imagery: are all communities represented fairly?",
      "Check whether stereotypes are creeping in unnoticed",
      "Ask whether the imagery centres dignity and equity",
      "Update imagery as your understanding of inclusion evolves",
    ],
    avoid: null,
  },
];

export default function InclusiveImageryChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<"checklist" | "audit">("checklist");
  const [auditRating, setAuditRating] = useState<Record<string, number>>({});

  const totalPoints = SECTIONS.reduce((sum, s) => sum + s.points.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const completedSections = SECTIONS.filter((s) =>
    s.points.every((_, i) => checked[`${s.id}-${i}`])
  ).length;

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const ratingLabels = ["Not done", "In progress", "Done"];
  const ratingColors = [
    "bg-red-100 text-red-700 border-red-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-green-100 text-green-700 border-green-200",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
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
            Checklist
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Checklist &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Imagery Checklist
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Audit your organisation's visual communications across ten sections. Ensure the imagery you use reflects and includes everyone you serve.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Communications", "Representation", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["checklist", "audit"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as "checklist" | "audit")}
              
              style={
                mode === m
                  ? { padding: "8px 16px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", borderColor: "var(--sage-dark)" }
                  : { padding: "8px 16px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", background: "var(--white)", color: "var(--charcoal)", borderColor: "var(--gray-border)" }
              }
            >
              {m === "checklist" ? "Sub-point checklist" : "Quick audit mode"}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div style={{ borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid", background: "var(--white)", borderColor: "var(--gray-border)" }}>
          {mode === "checklist" ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8, color: "var(--charcoal)" }}>
                <span>{checkedCount} of {totalPoints} points checked</span>
                <span>{completedSections} of {SECTIONS.length} sections complete</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "var(--gray-border)" }}>
                <div
                  style={{ height: 8, borderRadius: 4, transition: "width 0.3s", width: `${(checkedCount / totalPoints) * 100}%`, background: "var(--sage-dark)" }}
                />
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "var(--charcoal)" }}>
              Rate each section: <strong>Not done</strong> / <strong>In progress</strong> / <strong>Done</strong>. Use this for a quick imagery audit.
            </p>
          )}
        </div>

        {/* Section cards — 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
          {SECTIONS.map((section, idx) => {
            const sectionChecked = section.points.filter((_, i) => checked[`${section.id}-${i}`]).length;
            const isComplete = sectionChecked === section.points.length;

            return (
              <div key={section.id} style={{ borderRadius: 16, border: "2px solid", background: "var(--white)", borderColor: isComplete ? "var(--sage-dark)" : "var(--gray-border)", display: "flex", flexDirection: "column" }}>
                {/* Card header */}
                <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid var(--gray-border)", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: isComplete ? "var(--sage-dark)" : "var(--sage-xlight)", color: isComplete ? "var(--white)" : "var(--sage-dark)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "var(--charcoal)", fontFamily: "var(--font-heading)" }}>{section.title}</span>
                      {mode === "checklist" && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: isComplete ? "var(--sage-dark)" : "#6b7280", flexShrink: 0 }}>
                          {isComplete ? "✓ Done" : `${sectionChecked}/${section.points.length}`}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0", lineHeight: 1.5 }}>{section.desc}</p>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  {mode === "checklist" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {section.points.map((point, i) => {
                        const key = `${section.id}-${i}`;
                        return (
                          <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={!!checked[key]}
                              onChange={() => toggle(key)}
                              style={{ marginTop: 3, flexShrink: 0, width: 16, height: 16, accentColor: "var(--sage-dark)" }}
                            />
                            <span style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.5, textDecoration: checked[key] ? "line-through" : "none", opacity: checked[key] ? 0.45 : 1 }}>
                              {point}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {ratingLabels.map((label, ri) => (
                        <button
                          key={ri}
                          onClick={() => setAuditRating((prev) => ({ ...prev, [section.id]: ri }))}
                          style={{ padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, border: "2px solid", cursor: "pointer", ...(auditRating[section.id] === ri ? { background: "var(--sage-dark)", color: "#fff", borderColor: "var(--sage-dark)" } : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }) }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  {section.avoid && (
                    <div style={{ borderRadius: 8, padding: "10px 12px", fontSize: 13, background: "#fff7f7", border: "1px solid #fecaca", color: "#991b1b", marginTop: "auto" }}>
                      <strong>Watch out:</strong> {section.avoid}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button
            onClick={() => window.print()}
            style={{ padding: "8px 24px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", borderColor: "var(--sage-dark)" }}
          >
            Print Audit Summary
          </button>
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Why visual representation matters
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The images an organisation uses communicate who belongs. When the same types of people appear repeatedly in leadership contexts, marketing materials, and internal communications, a message is sent to everyone else: this place was not made with you in mind. Diverse, authentic representation does the opposite: it signals that the organisation's commitment to inclusion extends to its visual identity.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Inclusive imagery is not about tokenism or box-ticking. It is about ensuring that the full diversity of employees, clients, and communities is reflected across all visual touchpoints: not just in a dedicated diversity campaign, but in everyday stock photography choices, leadership team photos, event materials, and digital content. The standard to aim for is that no group is consistently absent or consistently stereotyped.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Reviewing imagery is a practical and visible step that any organisation can take. It does not require a large budget or a specialist team: it requires a commitment to looking critically at what you publish and asking honestly whether it reflects the values you claim to hold.
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
              <Link key="inclusive-comms-boundaries" href={`/dashboard/apply/inclusive-comms-boundaries`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Communications and Boundaries
                </span>
              </Link>
              <Link key="recognising-bias" href={`/dashboard/apply/recognising-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Recognising Bias: Common Types in the Workplace
                </span>
              </Link>
              <Link key="micro-affirmation-examples" href={`/dashboard/apply/micro-affirmation-examples`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Micro-Affirmation Examples
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
