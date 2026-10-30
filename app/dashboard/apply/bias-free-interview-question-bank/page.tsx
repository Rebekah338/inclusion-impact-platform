"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Question = {
  id: string;
  subheading: string;
  question: string;
  whatToListen: string;
  watchOut: string;
};

type Section = {
  id: string;
  title: string;
  icon: string;
  intro?: string;
  questions: Question[];
};

type Stage = {
  id: string;
  stage: string;
  stageIcon: string;
  stageColor: string;
  stageBg: string;
  stageLabel: string;
  sections: Section[];
};

const STAGES: Stage[] = [
  {
    id: "at-invitation",
    stage: "At invitation",
    stageIcon: "🗓️",
    stageColor: "#1d6b8f",
    stageBg: "#eef6fa",
    stageLabel: "Send or ask these before the interview so adjustments are in place before the candidate arrives.",
    sections: [
      {
        id: "disability-and-access",
        title: "Finding out about accessibility needs",
        icon: "♿",
        intro: "These are not assessment questions. They are signals of intent. Ask them of every candidate: the answers tell you what support to put in place, not whether to proceed.",
        questions: [
          {
            id: "da1",
            subheading: "Access",
            question: "Is there anything about this process so far that we could have done differently to allow you to show your best? And are there any adjustments you think we may need to make going forward?",
            whatToListen: "Honest feedback, practical adjustments the organisation can act on, a signal that you are genuinely committed to access.",
            watchOut: "This question should be asked of every candidate, not only those who have disclosed a disability.",
          },
          {
            id: "da2",
            subheading: "Reasonable adjustments",
            question: "Is there anything about how you work that you would like us to factor into how we set up the interview process and this role? Please share now or at any point in this process.",
            whatToListen: "Not an assessment question: this is a signal of intent. What you do with the answer matters more than the answer itself.",
            watchOut: "Never probe for a diagnosis or condition. Adjustments are about function, not label.",
          },

        ],
      },
    ],
  },
  {
    id: "in-the-interview",
    stage: "In the interview",
    stageIcon: "🎯",
    stageColor: "#2d6a4f",
    stageBg: "#eef5f0",
    stageLabel: "Competency-based questions to assess how a candidate works and whether they will actively contribute to an inclusive culture.",
    sections: [
      {
        id: "how-you-work",
        title: "Questions about how you work",
        icon: "🌿",
        intro: "Questions that assess the skills and qualities that predict inclusive, adaptive practice. Ask them of every candidate regardless of role.",
        questions: [
          {
            id: "g1",
            subheading: "Collaboration",
            question: "Tell me about a time you worked with someone whose approach was very different to yours. How did you navigate that?",
            whatToListen: "Curiosity about difference, willingness to adapt, evidence of genuine collaboration rather than just tolerance.",
            watchOut: "Answers that frame difference as a problem to manage rather than a strength to draw on.",
          },
          {
            id: "g2",
            subheading: "Communication",
            question: "How do you adjust the way you communicate depending on who you are speaking to?",
            whatToListen: "Awareness of audience, flexibility, examples across different contexts (written, verbal, formal, informal).",
            watchOut: "Generic answers that describe communication as a fixed skill rather than a responsive practice.",
          },
          {
            id: "g3",
            subheading: "Problem-solving",
            question: "Describe a situation where the standard approach did not work for someone you were working with or supporting. What did you do?",
            whatToListen: "Willingness to flex, resourcefulness, person-centred thinking, evidence of listening.",
            watchOut: "Answers that default to rule-following without evidence of judgement or adaptation.",
          },
          {
            id: "g4",
            subheading: "Self-awareness",
            question: "What have you learned about yourself in the last year that has changed how you work?",
            whatToListen: "Genuine reflection, specific examples, evidence of growth mindset and openness to feedback.",
            watchOut: "Answers that present the candidate as already excellent with no room to grow.",
          },
          {
            id: "g5",
            subheading: "Contribution",
            question: "What do you bring to a team that is not obvious from your CV?",
            whatToListen: "Self-awareness, ability to articulate value beyond technical credentials, insight into how they show up for colleagues.",
            watchOut: "Avoid reading silence or uncertainty here as weakness; some candidates, particularly those from underrepresented backgrounds, are conditioned not to self-promote.",
          },
        ],
      },
      {
        id: "behaviour-and-values",
        title: "Questions about work behaviour and values",
        icon: "🤝",
        intro: "Competency-based questions that surface how a candidate has acted in real situations: not what they believe in theory, but what they have done in practice.",
        questions: [
          {
            id: "bv1",
            subheading: "Inclusion",
            question: "Tell me about a time you noticed someone being excluded or overlooked. What did you do?",
            whatToListen: "Whether they acted or stayed silent, what motivated their response, whether they centred the person who was excluded.",
            watchOut: "Answers that make the candidate the hero without centring the person who was impacted.",
          },
          {
            id: "bv2",
            subheading: "Integrity",
            question: "Describe a time when you had to challenge something you disagreed with at work. How did you approach it?",
            whatToListen: "Courage, clarity, respectfulness, evidence that the challenge was grounded in values rather than personal preference.",
            watchOut: "Answers that conflate challenging authority with obstruction; listen for the motivation and method.",
          },
          {
            id: "bv3",
            subheading: "Accountability",
            question: "Tell me about a mistake you made at work. How did you handle it, and what changed as a result?",
            whatToListen: "Genuine ownership, no blame-shifting, specific action taken, evidence of learning embedded into future practice.",
            watchOut: "Answers that are not really about a mistake ('I work too hard') or that shift responsibility to others.",
          },
          {
            id: "bv4",
            subheading: "Values fit",
            question: "What does a workplace environment where you do your best work look and feel like?",
            whatToListen: "Specificity, self-awareness, alignment with what you can genuinely offer as an employer.",
            watchOut: "Do not penalise candidates who name flexibility, autonomy, or psychological safety; these are evidence-based performance drivers.",
          },
        ],
      },
      {
        id: "allyship",
        title: "Questions to assess inclusion and allyship",
        icon: "✊🏾",
        intro: "Questions that assess whether a candidate will actively contribute to an inclusive culture: what they have done, not what they believe they would do.",
        questions: [
          {
            id: "ge1",
            subheading: "Gender ally",
            question: "Have you ever been in a setting where one group of people was consistently talked over or given less credit than others? What did you notice, and what did you do?",
            whatToListen: "Observation skills, willingness to name gendered or racialised dynamics, evidence of intervention or learning.",
            watchOut: "Answers that deny the existence of these dynamics or attribute them solely to individual personalities.",
          },
          {
            id: "re1",
            subheading: "Racial ally",
            question: "Can you give me an example of something you did to make a colleague or team member feel genuinely included or valued?",
            whatToListen: "Specificity, evidence of attention to others, awareness of who might be on the margins of a team.",
            watchOut: "Vague answers about 'being friendly' without evidence of deliberate action.",
          },
          {
            id: "re2",
            subheading: "Cultural competence",
            question: "Tell me about a time you worked with or for people from a significantly different cultural background to your own. What did you learn?",
            whatToListen: "Curiosity, humility, willingness to adapt, evidence that the learning was integrated into practice.",
            watchOut: "Answers that reduce cultural difference to food, festivals, or surface-level awareness.",
          },
          {
            id: "rb1",
            subheading: "Understanding of others",
            question: "Have you ever needed to navigate a situation where someone's personal commitments or observances affected how a team operated? How did you handle it?",
            whatToListen: "Flexibility, respect, practical problem-solving, absence of resentment.",
            watchOut: "Never ask directly about religious practice or observance; let candidates raise it if relevant to their working pattern.",
          },
          {
            id: "ag1",
            subheading: "Valuing experience",
            question: "Tell me about a time you helped someone else develop a skill or piece of knowledge. How did you approach it?",
            whatToListen: "Patience, clarity, adaptability in teaching approach, satisfaction in others' growth.",
            watchOut: "Avoid reading career gaps or unconventional routes negatively; ask about them with genuine curiosity if relevant.",
          },
          {
            id: "ag2",
            subheading: "Valuing different career paths",
            question: "How have your priorities and ways of working evolved over the course of your career?",
            whatToListen: "Reflection, growth, a narrative that does not privilege youth or seniority.",
            watchOut: "Never probe for age, graduation years, or dates that are not directly relevant to the competency being assessed.",
          },
        ],
      },
    ],
  },
  {
    id: "at-offer",
    stage: "At offer or onboarding",
    stageIcon: "🤝",
    stageColor: "#6b3fa0",
    stageBg: "#f4f0fa",
    stageLabel: "Ask these once someone has accepted the role. The framing shifts from assessment to support: you are setting this person up to succeed.",
    sections: [
      {
        id: "neurodiversity",
        title: "Supporting different ways of working and thinking",
        icon: "🧠",
        intro: "These questions are about onboarding well, not assessing fit. They open space for new starters to share what they need without requiring a diagnosis, a label, or a formal disclosure.",
        questions: [
          {
            id: "nd1",
            subheading: "Working style",
            question: "Are there any ways of working that help you think, plan, or produce your best output that we should know about?",
            whatToListen: "Specific, practical information the employer can act on; evidence of self-knowledge.",
            watchOut: "Do not require a diagnosis or label. Ask all new starters this question, not only those who appear neurodivergent.",
          },
          {
            id: "nd2",
            subheading: "Process",
            question: "What does a productive day look like for you in terms of how you organise your time and attention?",
            whatToListen: "Self-awareness, strategies for managing competing demands, insight into preferred environment and workflow.",
            watchOut: "Penalising non-linear or unconventional working patterns unless there is a genuine and specific operational reason.",
          },
          {
            id: "nd3",
            subheading: "Communication",
            question: "How do you prefer to receive feedback, and is there a format or approach that helps you act on it most effectively?",
            whatToListen: "Self-knowledge, openness, practical preferences an employer can accommodate.",
            watchOut: "Do not interpret structured preferences as rigidity or difficulty; this is evidence of self-awareness.",
          },
          {
            id: "ge2",
            subheading: "Flexibility",
            question: "As you think ahead to starting this role: are there any aspects of how or where the work is delivered that you would want us to explore or plan for together?",
            whatToListen: "Practical requests the employer can plan for proactively; a signal that you are committed to making the role work for this person.",
            watchOut: "Flexibility requests are not a red flag. Research shows flexibility improves retention, performance, and wellbeing across all employees. Never ask about pregnancy, childcare arrangements, or plans for children; this constitutes unlawful discrimination.",
          },
        ],
      },
    ],
  },
];

export default function InclusiveHiringQuestionsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyQuestion = (q: Question) => {
    navigator.clipboard.writeText(q.question);
    setCopied(q.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* Breadcrumb */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Inclusive Hiring Questions</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🎯</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Toolkit
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Inclusive Hiring Questions
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "680px", margin: "0 0 1.5rem" }}>
            Questions mapped to the right moment in the hiring process: from invitation through to onboarding. Each question comes with guidance on what to listen for and what assumptions to watch out for.
          </p>

          {/* Process timeline */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {STAGES.map((stage) => (
              <a key={stage.id} href={`#${stage.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 1rem", borderRadius: "999px", background: stage.stageBg, border: `1.5px solid ${stage.stageColor}30`, color: stage.stageColor, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                <span>{stage.stageIcon}</span>
                {stage.stage}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stages */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {STAGES.map((stage) => (
          <div key={stage.id} id={stage.id}>
            {/* Stage divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: stage.stageBg, border: `1.5px solid ${stage.stageColor}40`, borderRadius: "999px", padding: "0.4rem 1.1rem" }}>
                <span style={{ fontSize: "1rem" }}>{stage.stageIcon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: stage.stageColor }}>{stage.stage}</span>
              </div>
              <div style={{ flex: 1, height: "1px", background: "var(--gray-border)" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.65, margin: "0 0 1.25rem", paddingLeft: "0.25rem" }}>
              {stage.stageLabel}
            </p>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {stage.sections.map((section) => (
                <div key={section.id} style={{ background: "var(--white)", borderRadius: "14px", border: "1px solid var(--gray-border)", overflow: "hidden" }}>
                  {/* Section header */}
                  <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--gray-border)", background: stage.stageBg }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: section.intro ? "0.5rem" : 0 }}>
                      <span style={{ fontSize: "1.2rem" }}>{section.icon}</span>
                      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>
                        {section.title}
                      </h2>
                      <span style={{ marginLeft: "auto", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--gray-soft)" }}>
                        {section.questions.length} {section.questions.length === 1 ? "question" : "questions"}
                      </span>
                    </div>
                    {section.intro && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.65, margin: 0 }}>
                        {section.intro}
                      </p>
                    )}
                  </div>

                  {/* Questions */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {section.questions.map((q, idx) => {
                      const isOpen = expanded === q.id;
                      const isLast = idx === section.questions.length - 1;
                      return (
                        <div key={q.id} style={{ borderBottom: isLast ? "none" : "1px solid var(--gray-border)" }}>
                          {/* Subheading */}
                          <div style={{ padding: "1rem 1.5rem 0" }}>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: stage.stageColor }}>
                              {q.subheading}
                            </span>
                          </div>

                          {/* Question toggle */}
                          <button
                            onClick={() => setExpanded(isOpen ? null : q.id)}
                            style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "0.5rem 1.5rem 1rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
                          >
                            <span style={{ marginTop: "0.15rem", fontSize: "1rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "block", color: stage.stageColor, fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>+</span>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0, fontWeight: 500, flex: 1 }}>
                              {q.question}
                            </p>
                            <button
                              onClick={(e) => { e.stopPropagation(); copyQuestion(q); }}
                              aria-label="Copy question"
                              style={{ flexShrink: 0, background: copied === q.id ? stage.stageColor : stage.stageBg, border: `1px solid ${stage.stageColor}40`, borderRadius: "999px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: copied === q.id ? "var(--white)" : stage.stageColor, whiteSpace: "nowrap", transition: "all 0.15s ease" }}
                            >
                              {copied === q.id ? "✓ Copied" : "Copy"}
                            </button>
                          </button>

                          {/* Expanded guidance */}
                          {isOpen && (
                            <div style={{ padding: "1rem 1.5rem 1.25rem 3.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--gray-border)" }}>
                              <div>
                                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: stage.stageColor, marginBottom: "0.3rem", marginTop: 0 }}>What to listen for</p>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>{q.whatToListen}</p>
                              </div>
                              <div>
                                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#b45309", marginBottom: "0.3rem", marginTop: 0 }}>Watch out for</p>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0 }}>{q.watchOut}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* About this tool */}
        <div className="card" style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem", marginTop: 0 }}>About this resource</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            These questions are designed to assess competencies rather than cultural fit, background, or presentation style. They are mapped to the stage of the hiring process where they are most useful: before the interview, during it, and after an offer is made. Use structured scoring (the same criteria, applied consistently across all candidates) alongside the interview questions for the most equitable outcomes.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
