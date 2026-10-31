"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const MATURITY_LEVELS = [
  {
    id: 1,
    name: "Unaware",
    color: "#DC2626",
    bg: "#FEE2E2",
    border: "#DC2626",
    desc: "EDI is not yet on the organisational agenda. There is no dedicated strategy, data is not collected, and responses to inclusion issues are reactive rather than planned. Responsibility sits with no one in particular.",
    signs: [
      "No EDI strategy or policy exists",
      "No diversity data is collected or reported",
      "Inclusion issues are dealt with on a case-by-case basis only",
      "Leadership has not publicly committed to EDI",
      "No training or awareness activity takes place",
    ],
  },
  {
    id: 2,
    name: "Aware",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "#D97706",
    desc: "EDI is recognised as important but activity is patchy, uncoordinated, and often driven by one or two individuals rather than the organisation. There are good intentions but limited infrastructure to deliver on them.",
    signs: [
      "Some EDI activity exists: training days, awareness events, or an EDI champion",
      "Basic policies are in place but not always enforced",
      "Some data is collected but not systematically analysed",
      "Leadership support is present but not visible or consistent",
      "EDI is seen as separate from core business strategy",
    ],
  },
  {
    id: 3,
    name: "Developing",
    color: "#2563EB",
    bg: "#DBEAFE",
    border: "#2563EB",
    desc: "A structured approach to EDI is beginning to emerge. Policies are in place, some workforce data is being collected, and there is early leadership buy-in. The challenge is consistency and embedding.",
    signs: [
      "An EDI strategy or plan exists and is actively worked to",
      "Diversity data is collected and reported internally",
      "Training is more systematic, not just one-off events",
      "An EDI working group or steering committee exists",
      "Leadership champions are named and visible",
    ],
  },
  {
    id: 4,
    name: "Embedding",
    color: "#7C3AED",
    bg: "#EDE9FE",
    border: "#7C3AED",
    desc: "EDI is integrated into core organisational processes rather than existing as a separate workstream. Decisions are informed by data, accountability is clear, and leadership commitment is visible and active.",
    signs: [
      "EDI objectives sit within individual performance frameworks",
      "Data is disaggregated and used to drive decisions",
      "Inclusion is a criterion in recruitment, promotion, and procurement",
      "Progress is reported externally as well as internally",
      "EDI budget and resource allocation is formal and protected",
    ],
  },
  {
    id: 5,
    name: "Leading",
    color: "#065F46",
    bg: "#D1FAE5",
    border: "#065F46",
    desc: "EDI is a strategic differentiator. The organisation applies an intersectional lens, drives continuous improvement, and actively influences sector practice. Inclusion is woven into identity and operations at every level.",
    signs: [
      "Intersectionality is built into data, policy, and programmes",
      "The organisation benchmarks against external standards and publishes findings",
      "Leadership actively shapes sector norms through advocacy and sharing",
      "Employee voice drives strategy, not just informs it",
      "Continuous improvement loops are embedded and evidenced",
    ],
  },
];

const DIMENSIONS = [
  {
    id: "leadership",
    title: "Leadership and Governance",
    icon: "🏛️",
    question: "How would you describe your leadership team's engagement with EDI?",
    options: [
      "EDI is not discussed at leadership level",
      "Leadership acknowledges EDI but has not committed publicly",
      "At least one senior leader is an active EDI champion",
      "Leadership sets EDI targets and reviews progress formally",
      "Leadership drives sector-wide change and is externally accountable for EDI",
    ],
  },
  {
    id: "data",
    title: "Data and Evidence",
    icon: "📊",
    question: "How does your organisation collect and use diversity data?",
    options: [
      "We do not collect diversity data",
      "We collect some data but do not analyse or act on it",
      "We collect data annually and share results internally",
      "We use disaggregated data to drive decisions and track progress",
      "We publish intersectional data and use it to benchmark against sector leaders",
    ],
  },
  {
    id: "policy",
    title: "Policy and Process",
    icon: "📋",
    question: "How well does your policy and process infrastructure support inclusion?",
    options: [
      "We have no specific EDI policies",
      "We have basic equality policies but they are rarely reviewed",
      "Our key policies include an EDI lens and are regularly updated",
      "EDI criteria are embedded in recruitment, promotion, and procurement processes",
      "All processes are audited through an intersectional inclusion lens on a regular cycle",
    ],
  },
  {
    id: "culture",
    title: "Culture and Inclusion",
    icon: "🤝",
    question: "How would employees describe the day-to-day culture of inclusion in your organisation?",
    options: [
      "Inclusion is not something employees feel confident describing",
      "Some employees feel included but experiences vary widely",
      "Most employees report feeling respected; microaggressions are addressed when raised",
      "Psychological safety is high; belonging is measured and tracked",
      "The organisation is known externally for its inclusive culture; employees are advocates",
    ],
  },
  {
    id: "learning",
    title: "Learning and Development",
    icon: "📚",
    question: "How does your organisation approach EDI learning?",
    options: [
      "No EDI training exists",
      "One-off training events have taken place but there is no ongoing provision",
      "Structured EDI training is available to all staff with some mandatory elements",
      "Learning is role-differentiated, ongoing, and linked to performance",
      "The organisation develops and shares EDI learning resources beyond its own walls",
    ],
  },
  {
    id: "external",
    title: "External Engagement",
    icon: "🌍",
    question: "How does your organisation engage with EDI beyond its own workforce?",
    options: [
      "No external EDI engagement takes place",
      "The organisation participates in awareness days or campaigns",
      "We have signed at least one external EDI commitment or charter",
      "We report publicly against benchmarks and engage with EDI networks actively",
      "We co-create sector standards and advocate for systemic change externally",
    ],
  },
];

const NEXT_STEPS: Record<string, string[]> = {
  leadership: [
    "Secure a named executive sponsor for your EDI work",
    "Add EDI as a standing agenda item at board and senior leadership meetings",
    "Set and publish at least one leadership-level EDI commitment this year",
  ],
  data: [
    "Launch a voluntary diversity data collection exercise with a clear communication plan",
    "Identify which data you already hold and audit its completeness",
    "Set a target response rate and report back to employees on findings within 90 days",
  ],
  policy: [
    "Audit your top five people policies through an inclusion lens",
    "Identify which recruitment and promotion decisions could include explicit EDI criteria",
    "Schedule an annual policy review cycle with EDI as a standing consideration",
  ],
  culture: [
    "Run a listening exercise or pulse survey focused on belonging and psychological safety",
    "Train line managers on responding to microaggressions and disclosures",
    "Create a visible reporting route for inclusion concerns that is separate from HR",
  ],
  learning: [
    "Map your current EDI learning offer and identify the gaps by role and level",
    "Introduce at least one mandatory EDI learning touchpoint for all staff",
    "Create a learning pathway for managers that goes beyond awareness to skill-building",
  ],
  external: [
    "Identify one external EDI benchmark or charter relevant to your sector",
    "Engage with at least one EDI network or community of practice this quarter",
    "Consider publishing your diversity data or committing to a transparency report",
  ],
};

const levelConfig = [
  { label: "Unaware", color: "#DC2626", bg: "#FEE2E2" },
  { label: "Aware", color: "#D97706", bg: "#FEF3C7" },
  { label: "Developing", color: "#2563EB", bg: "#DBEAFE" },
  { label: "Embedding", color: "#7C3AED", bg: "#EDE9FE" },
  { label: "Leading", color: "#065F46", bg: "#D1FAE5" },
];

export default function InclusionMaturityFrameworkPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === DIMENSIONS.length;

  const avgScore = allAnswered
    ? Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / DIMENSIONS.length)
    : null;

  const weakestDimensions = allAnswered
    ? [...DIMENSIONS]
        .sort((a, b) => (answers[a.id] ?? 5) - (answers[b.id] ?? 5))
        .slice(0, 3)
    : [];

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Self-Assessment
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusion Maturity Framework
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Understand where your organisation sits on the EDI maturity journey: from Unaware to Leading. Use this tool to assess six key dimensions, identify your strongest and weakest areas, and generate prioritised next steps.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Self-Assessment", "Strategy", "Organisational Development"].map((tag) => (
            <span key={tag} style={{ background: "var(--white)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Maturity level overview strip */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "20px", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px" }}>
            The Five Maturity Levels
          </h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {MATURITY_LEVELS.map((level) => (
              <div key={level.id} style={{ flex: "1 1 140px", background: level.bg, border: `1px solid ${level.border}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, color: level.color, marginBottom: 4 }}>
                  {level.id}. {level.name}
                </div>
                <div style={{ fontSize: 12, color: level.color, opacity: 0.85, lineHeight: 1.5 }}>
                  {level.desc.split(".")[0]}.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 8, background: "var(--gray-border)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(answeredCount / DIMENSIONS.length) * 100}%`, background: "var(--sage-dark)", borderRadius: 4, transition: "width 0.3s" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark)", whiteSpace: "nowrap" }}>
            {answeredCount} of {DIMENSIONS.length} completed
          </span>
        </div>

        {/* Assessment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {DIMENSIONS.map((dim) => {
            const selected = answers[dim.id];
            return (
              <div key={dim.id} style={{ background: "var(--white)", border: `1px solid ${selected !== undefined ? levelConfig[selected].color : "var(--gray-border)"}`, borderLeft: `4px solid ${selected !== undefined ? levelConfig[selected].color : "var(--sage-dark)"}`, borderRadius: 12, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{dim.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--charcoal)", margin: 0 }}>{dim.title}</h3>
                  {selected !== undefined && (
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10, background: levelConfig[selected].bg, color: levelConfig[selected].color, border: `1px solid ${levelConfig[selected].color}` }}>
                      {levelConfig[selected].label}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 14, color: "#374151", marginBottom: 14, lineHeight: 1.6 }}>{dim.question}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {dim.options.map((opt, i) => (
                    <button key={i} onClick={() => setAnswers((p) => ({ ...p, [dim.id]: i }))}
                      style={{
                        textAlign: "left", padding: "10px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", lineHeight: 1.5,
                        background: selected === i ? levelConfig[i].bg : "var(--sage-xlight)",
                        border: `1.5px solid ${selected === i ? levelConfig[i].color : "var(--gray-border)"}`,
                        color: selected === i ? levelConfig[i].color : "var(--charcoal)",
                        fontWeight: selected === i ? 700 : 400,
                      }}>
                      <span style={{ fontWeight: 800, marginRight: 6 }}>{i + 1}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Results */}
        {allAnswered && avgScore !== null && (
          <div style={{ background: "var(--white)", border: `2px solid ${levelConfig[avgScore].color}`, borderRadius: 14, padding: "28px", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
              Your Results
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Based on your responses across all six dimensions.</p>

            {/* Overall level */}
            <div style={{ background: levelConfig[avgScore].bg, border: `1px solid ${levelConfig[avgScore].color}`, borderRadius: 12, padding: "20px", marginBottom: 24, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: levelConfig[avgScore].color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Overall Maturity Level</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 800, color: levelConfig[avgScore].color }}>
                {levelConfig[avgScore].label}
              </div>
              <div style={{ fontSize: 13, color: levelConfig[avgScore].color, opacity: 0.85, marginTop: 8, maxWidth: 500, margin: "8px auto 0" }}>
                {MATURITY_LEVELS[avgScore].desc}
              </div>
            </div>

            {/* Per-dimension breakdown */}
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 12px" }}>By Dimension</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {DIMENSIONS.map((dim) => {
                const score = answers[dim.id];
                const cfg = levelConfig[score];
                return (
                  <div key={dim.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: cfg.bg, borderRadius: 8, border: `1px solid ${cfg.color}` }}>
                    <span style={{ fontSize: 16 }}>{dim.icon}</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--charcoal)" }}>{dim.title}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color, background: "var(--white)", padding: "2px 10px", borderRadius: 10, border: `1px solid ${cfg.color}` }}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Next steps */}
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 6px" }}>
              Your Prioritised Next Steps
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
              Based on your three lowest-scoring dimensions.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {weakestDimensions.map((dim, i) => (
                <div key={dim.id} style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "var(--sage-dark)", marginBottom: 10 }}>
                    {i + 1}. Focus area: {dim.title}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {NEXT_STEPS[dim.id].map((step, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--charcoal)", lineHeight: 1.6 }}>
                        <span style={{ marginTop: 7, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark)", display: "inline-block" }} />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What each level looks like accordion */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 14px" }}>
            What Does Each Level Look Like in Practice?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MATURITY_LEVELS.map((level) => {
              const isOpen = expanded[`level-${level.id}`];
              return (
                <div key={level.id} style={{ background: "var(--white)", border: `1px solid ${level.border}`, borderLeft: `4px solid ${level.border}`, borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => toggle(`level-${level.id}`)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: level.border, color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {level.id}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: level.color }}>{level.name}</div>
                      {!isOpen && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{level.desc.split(".")[0]}.</div>}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)" }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{level.desc}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 10 }}>Signs you are at this level:</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        {level.signs.map((sign, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                            <span style={{ marginTop: 7, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: level.border, display: "inline-block" }} />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this tool
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Why maturity frameworks matter
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            EDI progress is not linear and it is not uniform. Organisations often overestimate their maturity in areas where they feel confident and underestimate the gaps in areas they have not examined. A structured maturity framework provides a shared language for assessing where you are, what good looks like, and what the next step requires.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            This framework is designed for honest self-assessment, not for producing a flattering score. The most useful thing you can do with the results is share them with your leadership team and use them as the starting point for a conversation about what you are willing to commit to next.
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
            <Link href="/dashboard/apply/edi-strategy-guide" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Getting Started with EDI Strategy</span>
            </Link>
            <Link href="/dashboard/apply/edi-action-planner" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Planning Tool</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>30/60/90 Day EDI Action Planner</span>
            </Link>
            <Link href="/dashboard/apply/inclusive-data-collection" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusive Data Collection</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
