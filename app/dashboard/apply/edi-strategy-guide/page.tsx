"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const BUILDING_BLOCKS = [
  {
    id: "evidence",
    icon: "📊",
    title: "Evidence and Insight",
    preview: "You cannot plan what you have not measured. Your strategy must be grounded in data about your workforce.",
    content: `Your strategy must be grounded in evidence: who works here, at what levels, how they experience inclusion, and what is holding back progress. Without this foundation, you are designing solutions to problems you have not confirmed exist.

Start by auditing what data you already hold. Many organisations have more than they think, but it sits in different systems: payroll, recruitment, exit interviews, engagement surveys. Bring it together.

Then identify the gaps. Workforce composition data tells you who is here. Pay gap analysis tells you whether equality is playing out in practice. Engagement or belonging data tells you how people experience the organisation. All three are needed.`,
    actions: [
      "Conduct a diversity data audit across all people data sources",
      "Run an inclusion survey or add inclusion questions to your existing engagement survey",
      "Analyse your data by level, function, and progression rate to identify structural patterns",
      "Set a baseline and agree on which metrics will track strategy progress",
    ],
    watch: "Avoid building strategy from anecdote or individual feedback alone. One person's experience, however important, is not a trend. Let the data point you to the right priorities before you act.",
  },
  {
    id: "leadership",
    icon: "🏛️",
    title: "Leadership Commitment",
    preview: "Visible, accountable leadership commitment is not a nice-to-have: it is the condition that determines whether everything else works.",
    content: `Visible, accountable leadership commitment is the single most important factor in whether EDI strategy delivers. Without it, practitioners spend most of their time managing resistance rather than driving change.

Commitment is not a statement on a website. It shows up in what gets funded, what appears on board agendas, who gets promoted, and what happens when someone raises a concern. The gap between stated values and these observable behaviours is where credibility is won or lost.

Your job is to make commitment concrete: who is the named executive sponsor? What are they accountable for? How and when will progress be reviewed at leadership level?`,
    actions: [
      "Identify and brief an executive sponsor who will be publicly visible and accountable",
      "Add EDI progress as a standing item on senior leadership and board agendas",
      "Set at least three leadership-level commitments that are measurable and time-bound",
      "Agree on how leadership will respond when EDI concerns are raised publicly or internally",
    ],
    watch: "Be wary of performative commitment: leaders who will sign a statement but will not allocate budget, intervene in specific decisions, or take personal accountability for outcomes. That kind of support can actually make things harder by giving the impression of progress where there is none.",
  },
  {
    id: "priorities",
    icon: "🎯",
    title: "Focused Priorities",
    preview: "A strategy that tries to address every dimension of inclusion at once will deliver nothing well. Focus is not a compromise.",
    content: `A strategy that tries to address every dimension of inclusion simultaneously will deliver nothing well. The evidence, your organisational context, and your available resource will point you toward a subset of priorities. Focus on these with intensity rather than spreading effort thinly across all areas.

Focused priorities do not mean you ignore everything else. It means you are honest about where you can make a genuine difference in the next one to three years, and you are transparent with employees about that choice.

Priorities should be chosen based on where your evidence shows the biggest gaps, where there is genuine leadership appetite, and where the organisation has sufficient capacity to follow through.`,
    actions: [
      "Identify your top two or three priority areas based on evidence and strategic fit",
      "For each priority, define what success looks like in 12 months and in three years",
      "Be explicit in your strategy about what is in scope for this period and what is not",
      "Review priorities annually and adjust based on what the data shows",
    ],
    watch: "Do not allow pressure to be seen to address everything to scatter your effort. It is better to go deep on three things and evidence real change than to have fifteen workstreams that produce only activity.",
  },
  {
    id: "accountability",
    icon: "📋",
    title: "Accountability and Governance",
    preview: "Strategy without accountability is just aspiration. You need clear ownership, review cycles, and consequences for inaction.",
    content: `Clear accountability is what separates a living strategy from a document that gets written, published, and forgotten. Every commitment needs an owner, a deadline, and a review date. Progress needs to be reported, not just monitored.

Governance structures matter here: an EDI steering group with senior representation, a reporting line that reaches the board, and a rhythm of review that is regular enough to catch problems before they become entrenched.

Accountability also needs to operate at line manager level, not just at the centre. If line managers face no consequence for failing to support inclusion, your strategy will not reach the people who experience it every day.`,
    actions: [
      "Assign a named owner to every commitment in your strategy",
      "Establish a quarterly review cycle with your EDI steering group",
      "Include EDI objectives in senior leader and manager performance frameworks",
      "Report progress against your strategy at least annually, internally and where relevant externally",
    ],
    watch: "A governance structure that meets, discusses, and produces minutes but never challenges anyone or escalates failures is worse than no governance at all. It creates the appearance of accountability without any of the substance.",
  },
  {
    id: "inclusion",
    icon: "🤝",
    title: "Inclusive Culture",
    preview: "Policies create the conditions for inclusion; culture determines whether inclusion actually happens in practice.",
    content: `Policies create the conditions for inclusion: they set expectations, remove barriers, and provide routes for redress. But culture determines whether inclusion actually happens. You can have every policy in place and still have an environment where people do not feel safe, respected, or able to contribute fully.

Culture change takes longer than policy change and cannot be mandated. It happens through consistent leadership behaviour, repeated reinforcement of norms, and consequences for behaviour that falls short.

Psychological safety is the most reliable proxy for inclusive culture: when people feel safe to speak up, raise concerns, ask questions, and disagree without fear of punishment or ridicule, inclusion is more likely to be real.`,
    actions: [
      "Measure psychological safety and belonging through your existing survey or a dedicated one",
      "Train line managers to recognise and respond to microaggressions and disclosures",
      "Review your approach to how inclusion concerns are raised, heard, and resolved",
      "Identify and visibly celebrate examples of inclusive leadership behaviour at every level",
    ],
    watch: "Avoid confusing activity with culture change. Awareness days, celebration events, and one-off training can all play a role, but they do not change culture on their own. They need to sit within a sustained programme of behaviour change at all levels.",
  },
  {
    id: "intersectionality",
    icon: "🔄",
    title: "Intersectional Lens",
    preview: "People hold multiple identities simultaneously. A strategy that addresses protected characteristics in isolation will miss the people who sit at their intersection.",
    content: `People hold multiple identities simultaneously and experience inclusion at their intersection. A strategy that addresses race and gender and disability as separate silos will miss the distinct experience of, say, disabled Black women or working-class people of colour.

Applying an intersectional lens does not require you to have data on every possible combination of identity: it requires you to ask, consistently, who is not in the room, whose experience is not visible in this data, and whether our approach works for people with overlapping and compounding disadvantage.

As your strategy matures, you can move from collecting single-characteristic data to cross-tabulating it, and from designing single-characteristic initiatives to programmes that are designed with intersectionality from the outset.`,
    actions: [
      "Cross-tabulate your diversity data where sample sizes allow to identify intersectional patterns",
      "In consultation and engagement activity, actively seek out the voices least likely to be heard",
      "Review initiatives to ask whether they work for people with multiple marginalised identities",
      "Build intersectionality into your learning offer, not as a stand-alone module but as a lens across all EDI training",
    ],
    watch: "Do not treat intersectionality as an advanced concept to tackle later. The people most marginalised by your current practice are often those whose experience is invisible in single-characteristic analysis. Starting with an intersectional awareness, however basic, is better than deferring it.",
  },
];

const STRATEGY_TEMPLATE = `EDI STRATEGY ON A PAGE

Organisation: [Name]
Strategy period: [e.g. 2025 to 2027]
Owner: [Name and role]
Approved by: [Board or senior leadership]
Review date: [Date]

OUR EDI VISION
[One or two sentences on what inclusion looks like for this organisation at its best]

WHERE WE ARE NOW
[Two to three sentences on your current position: what the data shows, what is working, what is not]

OUR PRIORITIES FOR THIS PERIOD
1. [Priority area]: [What you will focus on and why]
2. [Priority area]: [What you will focus on and why]
3. [Priority area]: [What you will focus on and why]

OUR COMMITMENTS
Commitment: [Action]        Owner: [Name]        By: [Date]
Commitment: [Action]        Owner: [Name]        By: [Date]
Commitment: [Action]        Owner: [Name]        By: [Date]

HOW WE WILL KNOW IT IS WORKING
[Three to five metrics you will track; include baseline and target for each]

HOW WE WILL REPORT PROGRESS
[Frequency, format, and audience for progress reporting]

EXECUTIVE SPONSOR
[Name and role of the leader who holds accountability for this strategy]`;

export default function EdiStrategyGuidePage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const handleCopy = () => {
    navigator.clipboard.writeText(STRATEGY_TEMPLATE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
            Strategy Guide
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Getting Started with EDI Strategy
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          A practical guide to building an EDI strategy that is grounded in evidence, focused on the right priorities, and designed to deliver lasting change. Covers the six building blocks of effective strategy plus a one-page strategy template.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Strategy", "Organisational Development", "Leadership"].map((tag) => (
            <span key={tag} style={{ background: "var(--white)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Intro callout */}
        <div style={{ background: "var(--sage-dark)", borderRadius: 14, padding: "24px 28px", marginBottom: 32, color: "var(--white)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, marginBottom: 10 }}>
            Before you start: a common mistake to avoid
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.92, margin: 0 }}>
            Many organisations begin building an EDI strategy by writing the document: the vision, the values, the commitments. This is backwards. A strategy that is written before you have listened to employees, reviewed your data, and secured genuine leadership commitment will be a document rather than a plan. Use this guide to do the groundwork first.
          </p>
        </div>

        {/* Six building blocks */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
          The Six Building Blocks
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          Open each building block for practical guidance and actions.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
          {BUILDING_BLOCKS.map((block, idx) => {
            const isOpen = expanded[block.id];
            const leftColors = ["var(--sage-dark)", "#2563EB", "#7C3AED", "#D97706", "#065F46", "#DC2626"];
            const leftColor = leftColors[idx % leftColors.length];
            return (
              <div key={block.id} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderLeft: `4px solid ${leftColor}`, borderRadius: 12, overflow: "hidden", boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s" }}>
                <button onClick={() => toggle(block.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: leftColor, color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{block.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--charcoal)", marginBottom: isOpen ? 0 : 3 }}>
                      {block.title}
                    </div>
                    {!isOpen && (
                      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {block.preview}
                      </div>
                    )}
                  </div>
                  <span style={{ color: "var(--sage-dark)", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                    {block.content.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, marginBottom: 16 }}>{para}</p>
                    ))}

                    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px", marginBottom: 16 }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--sage-dark)", marginBottom: 10 }}>Actions to take</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        {block.actions.map((action, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--charcoal)", lineHeight: 1.6 }}>
                            <span style={{ marginTop: 7, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark)", display: "inline-block" }} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 10, padding: "14px 16px" }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#92400E", marginBottom: 6 }}>⚠️ Watch out for</p>
                      <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6, margin: 0 }}>{block.watch}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Strategy on a page template */}
        <div style={{ background: "var(--white)", border: "2px solid var(--sage-dark)", borderRadius: 14, padding: "28px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
                Strategy on a Page: Template
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                Copy this template and complete it once you have worked through the six building blocks above.
              </p>
            </div>
            <button onClick={handleCopy} style={{ padding: "10px 18px", background: copied ? "#D1FAE5" : "var(--sage-dark)", color: copied ? "#065F46" : "var(--white)", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
              {copied ? "✓ Copied!" : "Copy template"}
            </button>
          </div>
          <pre style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "var(--sage-xlight)", borderRadius: 8, padding: "20px", margin: 0, border: "1px solid var(--gray-border)" }}>
            {STRATEGY_TEMPLATE}
          </pre>
        </div>
      </div>

      {/* About section */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this guide</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>What makes EDI strategy succeed or fail?</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            The research on what makes EDI strategy effective is consistent. Organisations that make measurable progress share three characteristics: they are grounded in data about their specific context; they have genuine and visible leadership accountability (not just senior sign-off but active engagement); and they focus their effort rather than trying to address everything at once.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The organisations that struggle tend to focus on activity: events, training, statements. Activity is not the same as impact. This guide is designed to help you build the infrastructure for impact rather than the appearance of it.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/dashboard/apply/inclusion-maturity-framework" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Self-Assessment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusion Maturity Framework</span>
            </Link>
            <Link href="/dashboard/apply/sceptical-stakeholders" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Toolkit</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Talking to Sceptical Stakeholders</span>
            </Link>
            <Link href="/dashboard/apply/edi-action-planner" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Planning Tool</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>30/60/90 Day Action Planner</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
