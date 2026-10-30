"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

type IssueType = "all" | "gendered" | "ableist" | "jargon" | "criteria" | "tone";

const ISSUE_TYPES: { key: IssueType; label: string; icon: string; desc: string }[] = [
  { key: "all",      label: "All examples",           icon: "📋", desc: "" },
  { key: "gendered", label: "Gendered language",       icon: "⚖️", desc: "Words and phrases that lean masculine or feminine and deter applicants who do not identify with them." },
  { key: "ableist",  label: "Ableist language",        icon: "♿", desc: "Phrases that assume a particular physical or cognitive capability and may exclude disabled or neurodivergent candidates." },
  { key: "jargon",   label: "Jargon and gatekeeping",  icon: "🔐", desc: "Insider terms, acronyms, and credential-signalling that disadvantage candidates from outside particular networks." },
  { key: "criteria", label: "Inflated requirements",   icon: "📐", desc: "Criteria that are asked for but not essential: experience thresholds, degree requirements, and expectation inflation." },
  { key: "tone",     label: "Tone and culture fit",    icon: "🎯", desc: "Language that signals a narrow culture and signals to underrepresented candidates that this workplace is not for them." },
];

type Example = {
  id: string;
  issueType: IssueType;
  before: string;
  issue: string;
  after: string;
  why: string;
};

const EXAMPLES: Example[] = [
  // Gendered language
  {
    id: "g1", issueType: "gendered",
    before: "We are looking for a confident, assertive leader who is not afraid to make bold decisions.",
    issue: "Traits coded masculine in research (assertive, bold, confident used as standalone descriptors without context) deter women and non-binary applicants.",
    after: "We are looking for someone who can make clear, evidence-based decisions and communicate them with conviction, even when the situation is complex.",
    why: "Replacing coded trait language with behavioural descriptions of what the role actually requires opens the door wider without lowering the bar.",
  },
  {
    id: "g2", issueType: "gendered",
    before: "The ideal candidate will be a natural networker with a rock-star attitude and a passion for crushing targets.",
    issue: "Informal 'bro culture' language (rock star, crushing, natural networker) signals a specific culture and has been shown to reduce applications from women and underrepresented groups.",
    after: "The ideal candidate will be motivated by results, comfortable building external relationships, and clear about how their work connects to the wider goals of the team.",
    why: "Describing what the role requires (results orientation, relationship-building) rather than a personality type that fits a particular culture.",
  },
  {
    id: "g3", issueType: "gendered",
    before: "Must be able to manage multiple projects simultaneously and thrive under pressure.",
    issue: "'Thrive under pressure' can read as 'we do not support wellbeing here'; it also selects against candidates with caregiving responsibilities who need predictability, not chaos.",
    after: "This is a fast-paced role with competing priorities. We will work with you to ensure workload is manageable, and we support flexibility where the work allows.",
    why: "Describing the reality of the role honestly, while signalling that the organisation takes wellbeing seriously, attracts candidates who will stay.",
  },
  // Ableist language
  {
    id: "a1", issueType: "ableist",
    before: "The successful candidate will be able to hit the ground running from day one.",
    issue: "Implies no onboarding support and penalises candidates who need time to learn systems, context, or relationships; can deter neurodivergent applicants and those new to a sector.",
    after: "We will give you a structured onboarding to help you settle in. We expect you to be contributing fully within [X weeks/months].",
    why: "Setting an honest expectation with support signals both ambition and realism: far more attractive than pressure-coded language.",
  },
  {
    id: "a2", issueType: "ableist",
    before: "Must be able to travel frequently, including at short notice.",
    issue: "Excludes disabled candidates, those with caring responsibilities, and people without a driving licence unless travel is genuinely a non-negotiable function of the role.",
    after: "This role requires travel to [location] approximately [X times per month]. We will plan travel in advance where possible and are happy to discuss adjustments.",
    why: "Specificity replaces vagueness; a genuine requirement stated honestly is fair. If travel frequency is not fixed, say so.",
  },
  {
    id: "a3", issueType: "ableist",
    before: "You will need to be hands-on and energetic, with a can-do attitude.",
    issue: "'Hands-on' and 'energetic' imply physical ability rather than describing what the role actually involves. 'Can-do attitude' is a personality demand rather than a competency.",
    after: "You will be comfortable taking practical ownership of tasks and following through without close direction.",
    why: "Describing behaviour (takes ownership, follows through) rather than personality or physicality.",
  },
  // Jargon and gatekeeping
  {
    id: "j1", issueType: "jargon",
    before: "Candidates should be comfortable working in an Agile environment and familiar with JIRA, Confluence, Slack, and Notion.",
    issue: "A list of tools is often a proxy for 'worked somewhere similar before.' Most tools are learnable in days; requiring prior familiarity limits the pool to people who have had access to similar workplaces.",
    after: "You will be working in a collaborative, iterative environment. Experience with project management tools is useful; we will support you to learn the ones we use.",
    why: "Distinguishing between a learnable preference and a genuine requirement.",
  },
  {
    id: "j2", issueType: "jargon",
    before: "A strong personal brand and existing network in the sector is essential.",
    issue: "Networks are built through access, not just effort. Requiring an existing network excludes candidates who have not had access to the spaces where those networks are built.",
    after: "You will be comfortable building relationships in the sector over time. We will support your visibility and connections as part of the role.",
    why: "Framing relationship-building as something the organisation invests in, not just a pre-existing asset the candidate must bring.",
  },
  {
    id: "j3", issueType: "jargon",
    before: "First-class degree from a leading university required.",
    issue: "Degree class and university prestige are poor predictors of job performance and significantly disadvantage candidates from lower socioeconomic backgrounds and state education.",
    after: "A degree is welcome but not required. What matters is your ability to [relevant competency]: tell us about your relevant experience and how you developed it.",
    why: "Removing credential gatekeeping unless a specific qualification is legally or professionally required.",
  },
  // Inflated requirements
  {
    id: "c1", issueType: "criteria",
    before: "Minimum 10 years of experience in a similar role.",
    issue: "Long experience thresholds reflect how long someone has been doing something, not how well. Research shows women are less likely to apply unless they meet all criteria; inflated thresholds amplify this effect.",
    after: "We are looking for significant experience in a similar role. If you are unsure whether your background is the right fit, we encourage you to apply and tell us what you bring.",
    why: "Removing an arbitrary threshold and signalling openness to non-linear or compressed experience.",
  },
  {
    id: "c2", issueType: "criteria",
    before: "Excellent written and verbal communication skills in English are essential.",
    issue: "If fluency in English is genuinely required for the role, say so specifically. If not, this requirement may exclude people for whom English is an additional language but who are fully capable of doing the job.",
    after: "This role requires clear written communication in English [in the context of client reports, internal briefings, etc.]. We welcome applications from people for whom English is an additional language.",
    why: "Specifying the actual communication requirement rather than using fluency as a proxy for background.",
  },
  {
    id: "c3", issueType: "criteria",
    before: "You will have a proven track record of success across all aspects of the role.",
    issue: "'Proven track record' and 'success across all aspects' are unmeasurable expectations that penalise candidates who have had different opportunities or whose experience is broader than deep.",
    after: "You will have demonstrable experience in [specific competency or achievement type]. We value breadth of experience as well as depth.",
    why: "Replacing unmeasurable aspiration with a specific, assessable requirement.",
  },
  // Tone and culture fit
  {
    id: "t1", issueType: "tone",
    before: "We are a family here. If you are the kind of person who leaves at 5pm, this probably is not the right place for you.",
    issue: "'Family' language and implicit presenteeism expectations deter candidates with caregiving responsibilities, disabled candidates, and those who value healthy boundaries at work.",
    after: "We have a collaborative, committed team. We work hard and we respect people's time: most of us keep reasonable hours, and we flag when things need extra effort ahead of time.",
    why: "Describing culture honestly without implying that overworking is a prerequisite for belonging.",
  },
  {
    id: "t2", issueType: "tone",
    before: "You will fit in seamlessly with our close-knit team.",
    issue: "'Fit in' and 'close-knit' are culture-fit proxies that may signal to candidates from underrepresented groups that assimilation, not inclusion, is expected.",
    after: "You will work closely with a supportive team and contribute your own perspective and approach from day one.",
    why: "Framing contribution and belonging as distinct: you do not need to become someone else to belong here.",
  },
  {
    id: "t3", issueType: "tone",
    before: "We are looking for a strong cultural fit who shares our passion for what we do.",
    issue: "'Cultural fit' is one of the most common drivers of affinity bias in hiring: it selects for similarity, not capability.",
    after: "We are looking for someone who cares about the impact of this work and is motivated to do it well. We welcome different perspectives and ways of thinking.",
    why: "Replacing 'cultural fit' (similarity) with values alignment (motivation and care): two very different asks.",
  },
];

const CATEGORY_COLORS: Record<IssueType, { bg: string; border: string; text: string }> = {
  all:      { bg: "var(--sage-xlight)", border: "var(--sage-light)", text: "var(--sage-dark)" },
  gendered: { bg: "#faf0fb", border: "#e9d5f5", text: "#7c3aed" },
  ableist:  { bg: "#eef6fa", border: "#bfdfee", text: "#1d6b8f" },
  jargon:   { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
  criteria: { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  tone:     { bg: "#fefce8", border: "#fde68a", text: "#b45309" },
};

export default function InclusiveLanguageJobDescriptionExamplesPage() {
  const [activeType, setActiveType] = useState<IssueType>("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    let pool = activeType === "all" ? EXAMPLES : EXAMPLES.filter((e) => e.issueType === activeType);
    const q = search.toLowerCase();
    if (q) pool = pool.filter((e) => e.before.toLowerCase().includes(q) || e.after.toLowerCase().includes(q) || e.issue.toLowerCase().includes(q));
    return pool;
  }, [activeType, search]);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const activeTypeInfo = ISSUE_TYPES.find((t) => t.key === activeType);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* Breadcrumb */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Inclusive Language: Job Description Examples</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>📝</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Toolkit
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Inclusive Language: Job Description Examples
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            Before-and-after examples of the language patterns most likely to deter underrepresented candidates: what the original says, why it is a problem, and how to rewrite it without losing what you actually need.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
            <input
              type="search" placeholder="Search examples…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
          </div>

          {/* Type chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "1.25rem" }}>
            {ISSUE_TYPES.map((t) => (
              <button key={t.key} onClick={() => setActiveType(t.key)} style={chipStyle(activeType === t.key)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Active category description */}
          {activeTypeInfo && activeTypeInfo.desc && (
            <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "0.25rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--sage-dark)", margin: 0, lineHeight: 1.6 }}>{activeTypeInfo.desc}</p>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {visible.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No examples match your current filters.</p>
            <button onClick={() => { setSearch(""); setActiveType("all"); }} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ background: "var(--white)", borderRadius: "14px", border: "1px solid var(--gray-border)", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: "2px solid var(--gray-border)", background: "var(--sage-xlight)" }}>
              {[
                { label: "❌ Before", color: "#b91c1c" },
                { label: "⚠️ The problem", color: "#b45309" },
                { label: "✓ After", color: "#15803d" },
                { label: "💡 Why this works", color: "var(--sage-dark)" },
              ].map((col, i) => (
                <div key={i} style={{ padding: "0.85rem 1rem", borderRight: i < 3 ? "1px solid var(--gray-border)" : "none" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: col.color }}>
                    {col.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {visible.map((ex, idx) => {
              const typeInfo = ISSUE_TYPES.find((t) => t.key === ex.issueType);
              const colors = CATEGORY_COLORS[ex.issueType] ?? CATEGORY_COLORS.all;
              const isLast = idx === visible.length - 1;
              return (
                <div
                  key={ex.id}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: isLast ? "none" : "1px solid var(--gray-border)" }}
                >
                  {/* Before */}
                  <div style={{ padding: "1rem", borderRight: "1px solid var(--gray-border)", background: "#fef9f9" }}>
                    {typeInfo && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.07em", textTransform: "uppercase", padding: "0.15rem 0.45rem", borderRadius: "999px", marginBottom: "0.5rem" }}>
                        {typeInfo.icon} {typeInfo.label}
                      </span>
                    )}
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#7f1d1d", fontStyle: "italic", lineHeight: 1.65, margin: 0 }}>
                      &ldquo;{ex.before}&rdquo;
                    </p>
                  </div>

                  {/* The problem */}
                  <div style={{ padding: "1rem", borderRight: "1px solid var(--gray-border)" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>
                      {ex.issue}
                    </p>
                  </div>

                  {/* After */}
                  <div style={{ padding: "1rem", borderRight: "1px solid var(--gray-border)", background: "#f6fdf8" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#14532d", lineHeight: 1.65, margin: 0 }}>
                      {ex.after}
                    </p>
                  </div>

                  {/* Why this works */}
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>
                      {ex.why}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* About this resource */}
        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>About this resource</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            These examples are drawn from patterns in recruitment research and are not exhaustive. Language alone does not determine who applies or who gets hired: process, panel composition, scoring criteria, and organisational culture all matter. Use these examples as a starting point for reviewing your own job descriptions, and consider using the Job Description Equity Checker AI tool for a personalised audit of your own draft.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
