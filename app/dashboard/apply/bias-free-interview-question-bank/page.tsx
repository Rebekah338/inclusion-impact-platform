"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

type Category = "all" | "general" | "disability" | "gender" | "neurodiversity" | "race" | "age" | "religion" | "behaviour";

const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: "all",          label: "All questions",          icon: "📋" },
  { key: "general",      label: "Inclusive by design",    icon: "🌿" },
  { key: "behaviour",    label: "Behavioural and values",  icon: "🤝" },
  { key: "disability",   label: "Disability and access",   icon: "♿" },
  { key: "gender",       label: "Gender equity",           icon: "⚖️" },
  { key: "neurodiversity", label: "Neurodiversity",        icon: "🧠" },
  { key: "race",         label: "Race and ethnicity",      icon: "✊🏾" },
  { key: "age",          label: "Age and experience",      icon: "🔄" },
  { key: "religion",     label: "Religion and belief",     icon: "🌐" },
];

type Question = {
  id: string;
  category: Category;
  competency: string;
  question: string;
  whatToListen: string;
  watchOut: string;
};

const QUESTIONS: Question[] = [
  // General / inclusive by design
  {
    id: "g1", category: "general", competency: "Collaboration",
    question: "Tell me about a time you worked with someone whose approach was very different to yours. How did you navigate that?",
    whatToListen: "Curiosity about difference, willingness to adapt, evidence of genuine collaboration rather than just tolerance.",
    watchOut: "Answers that frame difference as a problem to manage rather than a strength to draw on.",
  },
  {
    id: "g2", category: "general", competency: "Communication",
    question: "How do you adjust the way you communicate depending on who you are speaking to?",
    whatToListen: "Awareness of audience, flexibility, examples across different contexts (written, verbal, formal, informal).",
    watchOut: "Generic answers that describe communication as a fixed skill rather than a responsive practice.",
  },
  {
    id: "g3", category: "general", competency: "Problem-solving",
    question: "Describe a situation where the standard approach did not work for someone you were working with or supporting. What did you do?",
    whatToListen: "Willingness to flex, resourcefulness, person-centred thinking, evidence of listening.",
    watchOut: "Answers that default to rule-following without evidence of judgement or adaptation.",
  },
  {
    id: "g4", category: "general", competency: "Self-awareness",
    question: "What have you learned about yourself in the last year that has changed how you work?",
    whatToListen: "Genuine reflection, specific examples, evidence of growth mindset and openness to feedback.",
    watchOut: "Answers that present the candidate as already excellent with no room to grow.",
  },
  {
    id: "g5", category: "general", competency: "Contribution",
    question: "What do you bring to a team that is not obvious from your CV?",
    whatToListen: "Self-awareness, ability to articulate value beyond technical credentials, insight into how they show up for colleagues.",
    watchOut: "Avoid reading silence or uncertainty here as weakness; some candidates, particularly those from underrepresented backgrounds, are conditioned not to self-promote.",
  },
  // Behavioural and values
  {
    id: "bv1", category: "behaviour", competency: "Inclusion",
    question: "Tell me about a time you noticed someone being excluded or overlooked. What did you do?",
    whatToListen: "Whether they acted or stayed silent, what motivated their response, whether they centred the person who was excluded.",
    watchOut: "Answers that make the candidate the hero without centring the person who was impacted.",
  },
  {
    id: "bv2", category: "behaviour", competency: "Integrity",
    question: "Describe a time when you had to challenge something you disagreed with at work. How did you approach it?",
    whatToListen: "Courage, clarity, respectfulness, evidence that the challenge was grounded in values rather than personal preference.",
    watchOut: "Answers that conflate challenging authority with obstruction; listen for the motivation and method.",
  },
  {
    id: "bv3", category: "behaviour", competency: "Accountability",
    question: "Tell me about a mistake you made at work. How did you handle it, and what changed as a result?",
    whatToListen: "Genuine ownership, no blame-shifting, specific action taken, evidence of learning embedded into future practice.",
    watchOut: "Answers that are not really about a mistake ('I work too hard') or that shift responsibility to others.",
  },
  {
    id: "bv4", category: "behaviour", competency: "Values fit",
    question: "What does a workplace environment where you do your best work look and feel like?",
    whatToListen: "Specificity, self-awareness, alignment with what you can genuinely offer as an employer.",
    watchOut: "Do not penalise candidates who name flexibility, autonomy, or psychological safety; these are evidence-based performance drivers.",
  },
  // Disability and access
  {
    id: "da1", category: "disability", competency: "Access",
    question: "Is there anything about the way this process has been set up that we should have done differently to allow you to show your best?",
    whatToListen: "Honest feedback, practical adjustments the organisation can act on, a signal that you are genuinely committed to access.",
    watchOut: "This question should be asked of every candidate, not only those who have disclosed a disability.",
  },
  {
    id: "da2", category: "disability", competency: "Reasonable adjustments",
    question: "If there is anything about how you work that you would like us to factor into how we set up this role, please share that now or at any point in this process.",
    whatToListen: "Not an assessment question: this is a signal of intent. What you do with the answer matters more than the answer itself.",
    watchOut: "Never probe for a diagnosis or condition. Adjustments are about function, not label.",
  },
  {
    id: "da3", category: "disability", competency: "Flexibility",
    question: "Are there aspects of how or where this role is delivered that you would like to explore further?",
    whatToListen: "Openness to the role's requirements; any practical considerations the employer can address proactively.",
    watchOut: "Flexibility requests are not a red flag. Research shows flexibility improves retention, performance, and wellbeing across all employees.",
  },
  // Gender equity
  {
    id: "ge1", category: "gender", competency: "Equity awareness",
    question: "Have you ever been in a setting where one group of people was consistently talked over or given less credit than others? What did you notice, and what did you do?",
    whatToListen: "Observation skills, willingness to name gendered or racialised dynamics, evidence of intervention or learning.",
    watchOut: "Answers that deny the existence of these dynamics or attribute them solely to individual personalities.",
  },
  {
    id: "ge2", category: "gender", competency: "Caregiving and flexibility",
    question: "This role offers [X flexibility]. Is there anything about the working pattern that you would like to discuss before we go further?",
    whatToListen: "Practical questions the employer can resolve; this should be asked of every candidate, not only those who appear to have caregiving responsibilities.",
    watchOut: "Never ask about pregnancy, childcare arrangements, or plans for children; this constitutes unlawful discrimination.",
  },
  // Neurodiversity
  {
    id: "nd1", category: "neurodiversity", competency: "Working style",
    question: "Are there any ways of working that help you think, plan, or produce your best output that we should know about?",
    whatToListen: "Specific, practical information the employer can act on; evidence of self-knowledge.",
    watchOut: "Do not require a diagnosis or label. Ask all candidates this question, not only those who appear neurodivergent.",
  },
  {
    id: "nd2", category: "neurodiversity", competency: "Process",
    question: "What does a productive day look like for you in terms of how you organise your time and attention?",
    whatToListen: "Self-awareness, strategies for managing competing demands, insight into preferred environment and workflow.",
    watchOut: "Penalising non-linear or unconventional working patterns unless there is a genuine and specific operational reason.",
  },
  {
    id: "nd3", category: "neurodiversity", competency: "Communication",
    question: "How do you prefer to receive feedback, and is there a format or approach that helps you act on it most effectively?",
    whatToListen: "Self-knowledge, openness, practical preferences an employer can accommodate.",
    watchOut: "Do not interpret structured preferences as rigidity or difficulty; this is evidence of self-awareness.",
  },
  // Race and ethnicity
  {
    id: "re1", category: "race", competency: "Inclusion in practice",
    question: "Can you give me an example of something you did to make a colleague or team member feel genuinely included or valued?",
    whatToListen: "Specificity, evidence of attention to others, awareness of who might be on the margins of a team.",
    watchOut: "Vague answers about 'being friendly' without evidence of deliberate action.",
  },
  {
    id: "re2", category: "race", competency: "Cultural competence",
    question: "Tell me about a time you worked with or for people from a significantly different cultural background to your own. What did you learn?",
    whatToListen: "Curiosity, humility, willingness to adapt, evidence that the learning was integrated into practice.",
    watchOut: "Answers that reduce cultural difference to food, festivals, or surface-level awareness.",
  },
  // Age and experience
  {
    id: "ag1", category: "age", competency: "Knowledge transfer",
    question: "Tell me about a time you helped someone else develop a skill or piece of knowledge. How did you approach it?",
    whatToListen: "Patience, clarity, adaptability in teaching approach, satisfaction in others' growth.",
    watchOut: "Avoid reading career gaps or unconventional routes negatively; ask about them with genuine curiosity if relevant.",
  },
  {
    id: "ag2", category: "age", competency: "Adaptability",
    question: "How have your priorities and ways of working evolved over the course of your career?",
    whatToListen: "Reflection, growth, a narrative that does not privilege youth or seniority.",
    watchOut: "Never probe for age, graduation years, or dates that are not directly relevant to the competency being assessed.",
  },
  // Religion and belief
  {
    id: "rb1", category: "religion", competency: "Respect",
    question: "Have you ever needed to navigate a situation where someone's personal commitments or observances affected how a team operated? How did you handle it?",
    whatToListen: "Flexibility, respect, practical problem-solving, absence of resentment.",
    watchOut: "Never ask directly about religious practice or observance; let candidates raise it if relevant to their working pattern.",
  },
];

export default function BiasFreeInterviewQuestionBankPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    let pool = activeCategory === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.category === activeCategory);
    const q = search.toLowerCase();
    if (q) pool = pool.filter((q_) => q_.question.toLowerCase().includes(q) || q_.competency.toLowerCase().includes(q));
    return pool;
  }, [activeCategory, search]);

  const copyQuestion = (q: Question) => {
    navigator.clipboard.writeText(q.question);
    setCopied(q.id);
    setTimeout(() => setCopied(null), 2000);
  };

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

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* Breadcrumb */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Bias-Free Interview Question Bank</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🎯</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Tool
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Bias-Free Interview Question Bank
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            {visible.length} competency-based questions designed to assess the skills that actually matter, without the assumptions that skew decisions. Filter by theme, search by keyword, and copy any question directly into your interview pack.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
            <input
              type="search" placeholder="Search questions or competencies…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
          </div>

          {/* Category chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "1.25rem" }}>
            {CATEGORIES.map((c) => (
              <button key={c.key} onClick={() => setActiveCategory(c.key)} style={chipStyle(activeCategory === c.key)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No questions match your current filters.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("all"); }} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>Clear filters</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {visible.map((q) => {
            const isOpen = expanded === q.id;
            return (
              <div key={q.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                {/* Question row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : q.id)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "1.1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
                >
                  <span style={{ marginTop: "0.1rem", fontSize: "1rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "block", color: "var(--sage-dark)", fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>+</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                        {q.competency}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {q.question}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); copyQuestion(q); }}
                    aria-label="Copy question"
                    title="Copy question"
                    style={{ flexShrink: 0, background: copied === q.id ? "var(--sage-dark)" : "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "999px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: copied === q.id ? "var(--white)" : "var(--sage-dark)", whiteSpace: "nowrap", transition: "all 0.15s ease" }}
                  >
                    {copied === q.id ? "✓ Copied" : "Copy"}
                  </button>
                </button>

                {/* Expanded guidance */}
                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem 3.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--gray-border)" }}>
                    <div style={{ paddingTop: "0.875rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.3rem" }}>What to listen for</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>{q.whatToListen}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#b45309", marginBottom: "0.3rem" }}>Watch out for</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>{q.watchOut}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* About this tool */}
        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>About this tool</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            These questions are designed to assess competencies rather than cultural fit, background, or presentation style. Each question is followed by guidance on what a strong answer looks and sounds like, and what interviewer assumptions to watch for. Use structured scoring (the same criteria, applied consistently across all candidates) alongside these questions for the most equitable outcomes.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
