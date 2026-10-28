"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

// ── Types ────────────────────────────────────────────────────────────────────
type QuizAnswers = Record<number, string>;

// ── Small helpers ─────────────────────────────────────────────────────────────
function ImagePlaceholder({ description, src }: { description: string; src?: string }) {
  if (src) {
    return (
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={description} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px dashed var(--sage-light)",
      borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" as const,
      color: "var(--sage-dark)", fontSize: "0.85rem", fontStyle: "italic",
      fontFamily: "var(--font-body)", marginBottom: "1.5rem",
    }}>
      {description}
    </div>
  );
}

function SlideShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
      {children}
    </div>
  );
}

function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, margin: 0 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.6, fontSize: "1rem", marginTop: "0.35rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ReflectionBox({ prompt, subPrompts }: { prompt?: string; subPrompts?: string[] }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", borderLeft: "4px solid var(--sage-dark)",
      borderRadius: "0 0.5rem 0.5rem 0", padding: "1rem 1.25rem", margin: "1.5rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
        💭 Reflect (write down on your paper):
      </p>
      {prompt && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.25rem 0" }}>
          ✏️ {prompt}
        </p>
      )}
      {subPrompts && subPrompts.map((sp, i) => (
        <p key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.4rem 0" }}>
          ✏️ {sp}
        </p>
      ))}
    </div>
  );
}

function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
      borderRadius: "0.5rem", padding: "0.9rem 1.1rem", margin: "1.25rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
        📌 {text}
      </p>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "1rem", margin: "1.25rem 0 0.4rem 0" }}>
      {text}
    </p>
  );
}

function BodyText({ children, italic, small }: { children: React.ReactNode; italic?: boolean; small?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)", color: "var(--charcoal)",
      fontSize: small ? "0.9rem" : "1rem", lineHeight: 1.75,
      fontStyle: italic ? "italic" : "normal", margin: "0.6rem 0",
    }}>
      {children}
    </p>
  );
}

function MoveOnNote() {
  return (
    <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>
      Once you have written down your answer, you can move to the next slide.
    </p>
  );
}

function MoveOnNote3() {
  return (
    <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>
      Once you have written down your answers to these three questions, you can move to the next slide.
    </p>
  );
}

// ── Slide components ──────────────────────────────────────────────────────────

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Understanding Your Bias" subtitle="A Self-Reflection Starter" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Emotional hook:
        </p>
        <BodyText italic>
          Think about the last time you made a snap judgement about someone, before they had even spoken. That instinct was not a character flaw. It was bias. And it is in all of us.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson introduces unconscious bias, explores how it shows up in the workplace, and gives you practical tools to recognise and challenge it in yourself.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Define unconscious bias in your own words",
        "Recognise how bias shows up in everyday workplace situations",
        "Identify at least three actions you can take to challenge your own bias",
      ]} />

      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </SlideShell>
  );
}

function Slide2() {
  return (
    <SlideShell>
      <SlideHeading title="What is Unconscious Bias?" />
      <ImagePlaceholder description="A brain, an eye, an ear, and a hand shown together in one image" src="/images/bias-lesson/slide-2-brain.jpg" />

      <BodyText italic small>
        Unconscious bias is also referred to as implicit bias. Throughout this lesson we use the term unconscious bias.
      </BodyText>
      <BodyText italic small>
        It is worth knowing that bias can also be conscious: conscious bias is an awareness of a prejudice or preference that a person knowingly holds. Unlike unconscious bias, it is deliberate. For today, we are focusing on unconscious bias.
      </BodyText>
      <BodyText italic small>
        There are also many other types of bias, such as affinity bias, confirmation bias, and halo effect. We will explore these in a dedicated lesson, which will be suggested for you once you complete this one.
      </BodyText>

      <SectionLabel text="Academic definition:" />
      <BodyText>
        Unconscious bias refers to implicit attitudes or stereotypes that affect our understanding, actions, and decisions without our conscious awareness. (Greenwald & Banaji, 1995)
      </BodyText>

      <SectionLabel text="Plain English:" />
      <BodyText>
        A hidden preference or prejudice that influences how we think, decide and act, often without us realising it.
      </BodyText>

      <SectionLabel text="Workplace definition:" />
      <BodyText>
        Unconscious bias is the split-second assumption your brain makes about a person before you have gathered evidence and facts. It can shape who gets hired, who gets heard in meetings, and who gets promoted.
      </BodyText>

      <SectionLabel text="Key reminder:" />
      <BodyText>
        Everyone has bias. It is part of being human. Acknowledging it is not a weakness. It is the foundation of fair, inclusive practice, and the first step to a more equitable workplace.
      </BodyText>

      <KeyReminder text="Unconscious bias: a hidden preference or prejudice that influences our decisions and actions, often without us being aware of it." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Where Does Bias Come From?" />
      <ImagePlaceholder description="Collage or grid of icons: a brain, a television, a social media icon, and books" src="/images/bias-lesson/slide-3-social.jpg" />

      <BodyText>
        Bias does not appear out of nowhere. It is shaped over a lifetime by the messages we receive, the environments we grow up in, and the experiences we have. Our brains absorb these messages and use them as shortcuts to make fast decisions, often without us realising it is happening.
      </BodyText>

      <SectionLabel text="Some of the places bias can develop:" />
      <BulletList items={[
        "Family upbringing and the values we are raised with",
        "Societal messaging and cultural norms",
        "Television, film, radio, and mainstream media",
        "Social media and the algorithms that shape what we see",
        "Books, literature, and what we read",
        "Religion and faith communities",
        "Culture and community groups",
        "Friendship groups and social circles",
        "Work colleagues and workplace culture",
        "The people we are regularly in contact with",
      ]} />

      <SectionLabel text="How the brain internalises these messages:" />
      <BodyText>
        Over time, repeated exposure to the same messages, images, and associations causes the brain to form neural pathways: mental shortcuts that allow us to process information quickly. These shortcuts are useful, but they also mean we can develop preferences and prejudices without ever consciously choosing to. This is the root of unconscious bias.
      </BodyText>

      <ReflectionBox prompt="Can you think back to any messages you received growing up that may have shaped how you see certain groups of people today?" />
      <MoveOnNote />

      <SectionLabel text="Why this matters going forward:" />
      <BodyText>
        This is why it is so important to actively seek out diverse experiences, mix with people outside your usual circles, and continue to read, learn, and challenge your own thinking. Bias is not fixed. It can be unlearned, with intention and effort.
      </BodyText>
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Why It Matters" />
      <ImagePlaceholder description="Rubin's Vase: classic black and white optical illusion" src="/images/bias-lesson/slide-4-vase.jpg" />

      <BodyText>
        <strong>&ldquo;What did you see first? Could you see the vase or the faces straight away?&rdquo;</strong>
      </BodyText>
      <BodyText>
        What we notice first can shape how we interpret everything in front of us. In the workplace, those first impressions happen in milliseconds and they influence decisions that can affect people&rsquo;s experience, careers, opportunities, and more.
      </BodyText>

      <SectionLabel text="If we acknowledge and challenge our bias:" />
      <BulletList items={[
        "Decisions are fairer and based on evidence, not instinct",
        "People feel seen, heard, and valued regardless of their background",
        "Teams make better decisions because they are not driven by prejudgement, reducing blind spots and the risk of unfair outcomes",
        "Organisations become more equitable places to work and grow, where people are assessed on their merits and experience fairer treatment",
      ]} />

      <SectionLabel text="If we don't:" />
      <BulletList items={[
        "People are hired, promoted, or excluded based on gut feeling",
        "Certain voices are consistently overlooked in meetings and decisions",
        "Inequalities can compound quietly over time, meaning certain groups may have consistently different and unfair experiences without it ever being visible or intentional",
        "The organisation misses out on diverse talent, a breadth of perspective, and the innovation that comes with it",
      ]} />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" />
      <ImagePlaceholder description="Two men in professional work attire, one white and one Black, sitting across a table from each other in conversation, professional office setting" src="/images/bias-lesson/slide-5-men.jpg" />

      <SectionLabel text="The Scenario:" />
      <BodyText>
        Marcus has worked in the marketing team for two years. He consistently meets his targets and gets strong feedback from clients. When a senior role comes up, his manager thinks: &ldquo;I&rsquo;m not sure Marcus is quite ready. He&rsquo;s great at the work, but I just don&rsquo;t see him as a leader.&rdquo;
      </BodyText>
      <BodyText>
        Marcus is the only Black man on the team. No one else&rsquo;s readiness has been questioned in the same way.
      </BodyText>

      <ReflectionBox subPrompts={[
        "What might be influencing the manager's instinct here?",
        "What would evidence of leadership actually look like, and how would this be collated?",
        "Who gets to decide these criteria in the workplace?",
      ]} />
      <MoveOnNote3 />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Reflective Scenario" />
      <ImagePlaceholder description="Diverse group of people around a table in a workplace meeting setting" src="/images/bias-lesson/slide-6-meeting.jpg" />

      <SectionLabel text="The Scenario:" />
      <BodyText>
        You are in a team meeting. A colleague, Priya, makes a suggestion. It is ignored and the room moves on quickly. Ten minutes later, a male colleague makes a similar point and it lands differently. People engage, ask questions, and the idea gets taken forward.
      </BodyText>

      <ReflectionBox subPrompts={[
        "Have you ever witnessed something like this?",
        "Have you ever been ignored in a situation like this?",
        "What could you, or someone else in the room, do to ensure Priya is not ignored?",
      ]} />
      <MoveOnNote3 />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Your Turn" subtitle="Activity Slide" />
      <ImagePlaceholder description="Open notebook with a hand holding a pen, ready to write" src="/images/bias-lesson/slide-7-activity.jpg" />

      <BodyText italic>Take 15 minutes. Have your pen and paper ready.</BodyText>
      <BodyText>
        Think about your own workplace. Answer the following questions honestly. There are no right or wrong answers.
      </BodyText>

      <div style={{ margin: "1.25rem 0" }}>
        {[
          "Think of a recent decision you made at work: hiring, a meeting, a project. Was it based entirely on evidence, or did instinct play a part?",
          "Is there a colleague you consistently overlook or underestimate? What might be driving that?",
          "Are there certain people whose ideas you engage with more readily than others? Why might that be?",
          "What is one small change you could make this week to challenge your own bias?",
        ].map((q, i) => (
          <div key={i} style={{
            borderLeft: "3px solid var(--sage-light)", paddingLeft: "1rem",
            marginBottom: "1rem",
          }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
              ✏️ {q}
            </p>
          </div>
        ))}
      </div>

      <KeyReminder text="Unconscious bias: a hidden preference or prejudice that influences our decisions and actions, often without us being aware of it." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="What the Research Says" />
      <ImagePlaceholder description="Research papers or documents on a desk, text blurred out" src="/images/bias-lesson/slide-8-research.jpg" />

      <SectionLabel text="The impact of bias on people:" />
      <BulletList items={[
        "A study by the Equality and Human Rights Commission found that candidates with white-sounding names were 74% more likely to be called for interview than those with ethnic minority-sounding names, with identical CVs.",
        "Research from Project Implicit at Harvard University suggests that more than 75% of people show an implicit preference for white people over Black people on the Implicit Association Test.",
        "A study published in the American Journal of Sociology found that women are interrupted significantly more than men in professional settings, and their ideas are less likely to be credited to them.",
        "Research by Accenture found that employees with disabilities are 25% less likely to be promoted than their non-disabled peers, despite comparable performance ratings.",
        "Stonewall research found that 1 in 5 LGBTQ+ employees have been the target of negative comments or conduct from colleagues because of their sexual orientation or gender identity in the last year.",
      ]} />

      <SectionLabel text="The business case for addressing our bias:" />
      <BulletList items={[
        "McKinsey's Diversity Wins report found that companies in the top quartile for ethnic diversity are 36% more likely to achieve above-average profitability.",
        "Research by Harvard Business Review found that diverse teams make better decisions 87% of the time compared to individuals.",
        "Deloitte research found that inclusive teams outperform their peers by 80% in team-based assessments.",
      ]} />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="What You Can Do to Mitigate Your Bias" />
      <ImagePlaceholder description="Open notepad with ticks and crosses, text blurred out" src="/images/bias-lesson/slide-9-checklist.jpg" />

      <SectionLabel text="✅ Do:" />
      <BulletList items={[
        "Pause before making decisions about people and ask: what evidence am I basing this on?",
        "Use structured processes with set, skills-based criteria for hiring, promotion, and performance review to reduce the influence of gut feeling",
        "Actively seek out perspectives that differ from your own, as this helps interrupt the echo chambers that reinforce bias, exposing you to experiences and viewpoints that challenge your default assumptions",
        "Call in rather than call out: if you notice bias in others, address it privately and constructively",
        "Take the Implicit Association Test (IAT) to surface your own hidden preferences: https://implicit.harvard.edu",
      ]} />

      <SectionLabel text="❌ Don't:" />
      <BulletList items={[
        "Assume that good intentions mean bias-free decisions",
        "Ignore patterns: if the same people are consistently overlooked, that is data",
        "Dismiss discomfort: feeling challenged by this topic is part of the process",
        "Wait for a training day to start: small changes in daily habits make the biggest difference",
      ]} />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <SectionLabel text="Key points from this lesson:" />
      <BulletList items={[
        "We all have bias. It comes from social messaging, upbringing, and lived experience: it does not make you a bad person.",
        "Unconscious bias is automatic and affects everyone, regardless of intention",
        "It shows up in hiring, promotion, meetings, and everyday interactions",
        "Awareness alone is not enough: action is required",
        "Structured processes and evidence-based decisions reduce the impact of bias",
        "Acknowledging bias is not an admission of prejudice: it is the foundation of fair practice",
      ]} />

      <SectionLabel text="Key Terms:" />
      <div style={{ margin: "0.5rem 0 1rem 0" }}>
        <BodyText>
          <strong style={{ color: "var(--sage-dark)" }}>Unconscious bias:</strong> a hidden preference or prejudice that influences our decisions and actions, often without us being aware of it
        </BodyText>
        <BodyText>
          <strong style={{ color: "var(--sage-dark)" }}>Implicit Association Test (IAT):</strong> a research tool used to measure unconscious preferences and associations
        </BodyText>
      </div>

      <KeyReminder text="Unconscious bias: a hidden preference or prejudice that influences our decisions and actions, often without us being aware of it." />
    </SlideShell>
  );
}

// ── Quiz slide ────────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS = [
  {
    id: 0,
    question: "What is unconscious bias?",
    options: [
      { id: "a", text: "A deliberate decision to treat someone unfairly" },
      { id: "b", text: "A hidden preference or prejudice that influences decisions without our awareness" },
      { id: "c", text: "A personality flaw that only some people have" },
      { id: "d", text: "A legal term used in discrimination cases" },
    ],
    correct: "b",
    explanation: "Unconscious bias is automatic and operates below conscious awareness. It is not a character flaw or a deliberate choice.",
  },
  {
    id: 1,
    question: "Which of the following is an example of unconscious bias in the workplace?",
    options: [
      { id: "a", text: "A manager rejecting a candidate because they lied on their CV" },
      { id: "b", text: "A manager not liking a candidate without being able to explain why" },
      { id: "c", text: "A manager following a structured scoring process for all candidates" },
      { id: "d", text: "A manager asking all candidates the same set of questions" },
    ],
    correct: "b",
    explanation: "When a manager cannot articulate why they dislike a candidate, this is a sign that gut feeling (rather than evidence) may be driving the decision. Options c and d are examples of good practice that reduce bias.",
  },
  {
    id: 2,
    question: "Which of the following is the best way to reduce bias in hiring decisions?",
    options: [
      { id: "a", text: "Trust your instincts: they are usually right" },
      { id: "b", text: "Use structured, skills-based criteria applied consistently to all candidates" },
      { id: "c", text: "Hire people similar to your existing team to maintain culture" },
      { id: "d", text: "Ask candidates personal questions to get a feel for them" },
    ],
    correct: "b",
    explanation: "Structured processes with consistent, skills-based criteria reduce the influence of gut feeling and help ensure all candidates are assessed fairly on the same basis.",
  },
  {
    id: 3,
    question: "Which statement about bias is true?",
    options: [
      { id: "a", text: "Only people with prejudiced views have bias" },
      { id: "b", text: "Bias can be eliminated with enough training" },
      { id: "c", text: "Everyone has bias: it is a normal part of how the brain processes information" },
      { id: "d", text: "Bias only affects decisions about race and gender" },
    ],
    correct: "c",
    explanation: "Bias is a universal human experience. It cannot be fully eliminated, but it can be recognised, challenged, and mitigated with consistent effort and structured approaches.",
  },
];

function Slide11({
  quizAnswers,
  setQuizAnswers,
  quizSubmitted,
  setQuizSubmitted,
}: {
  quizAnswers: QuizAnswers;
  setQuizAnswers: (a: QuizAnswers) => void;
  quizSubmitted: boolean;
  setQuizSubmitted: (v: boolean) => void;
}) {
  const score = QUIZ_QUESTIONS.filter(q => quizAnswers[q.id] === q.correct).length;

  return (
    <SlideShell>
      <SlideHeading title="Quiz" subtitle="Test what you have learned. Choose the best answer for each question." />

      {QUIZ_QUESTIONS.map((q) => {
        const selected = quizAnswers[q.id];
        const isCorrect = selected === q.correct;
        return (
          <div key={q.id} style={{ marginBottom: "2rem", borderBottom: "1px solid var(--gray-border)", paddingBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", marginBottom: "0.75rem" }}>
              {q.id + 1}. {q.question}
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
              {q.options.map(opt => {
                let bg = "var(--white)";
                let border = "1px solid var(--gray-border)";
                let color = "var(--charcoal)";
                if (quizSubmitted && opt.id === q.correct) {
                  bg = "var(--sage-xlight)"; border = "2px solid var(--sage-dark)"; color = "var(--sage-dark)";
                } else if (quizSubmitted && opt.id === selected && !isCorrect) {
                  bg = "#fff5f5"; border = "2px solid #e05c5c"; color = "#c0392b";
                } else if (!quizSubmitted && opt.id === selected) {
                  bg = "var(--sage-xlight)"; border = "1px solid var(--sage-dark)";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [q.id]: opt.id })}
                    style={{
                      background: bg, border, borderRadius: "0.5rem",
                      padding: "0.6rem 1rem", textAlign: "left" as const,
                      fontFamily: "var(--font-body)", fontSize: "0.95rem",
                      color, cursor: quizSubmitted ? "default" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontWeight: 600, marginRight: "0.5rem" }}>{opt.id.toUpperCase()}.</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
            {quizSubmitted && (
              <div style={{
                marginTop: "0.75rem", background: isCorrect ? "var(--sage-xlight)" : "#fff5f5",
                border: `1px solid ${isCorrect ? "var(--sage-light)" : "#f5c6c6"}`,
                borderRadius: "0.4rem", padding: "0.6rem 0.9rem",
              }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", margin: 0 }}>
                  {isCorrect ? "✅ " : "❌ "}{q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {!quizSubmitted && (
        <button
          onClick={() => {
            if (Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length) {
              setQuizSubmitted(true);
              markCompleted("understanding-your-bias");
            }
          }}
          style={{
            background: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? "var(--sage-dark)" : "var(--gray-border)",
            color: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? "var(--white)" : "var(--charcoal)",
            border: "none", borderRadius: "0.5rem", padding: "0.75rem 1.75rem",
            fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem",
            cursor: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? "pointer" : "not-allowed",
            marginTop: "0.5rem", transition: "all 0.2s",
          }}
        >
          Submit answers
        </button>
      )}

      {quizSubmitted && (
        <div style={{
          marginTop: "1rem", padding: "1rem 1.25rem",
          background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
          borderRadius: "0.6rem",
        }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "1.1rem", margin: 0 }}>
            You scored {score} out of {QUIZ_QUESTIONS.length}
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.9rem", margin: "0.35rem 0 0 0" }}>
            Well done for completing the quiz. Your score has been recorded.
          </p>
        </div>
      )}
    </SlideShell>
  );
}

function Slide12({ quizAnswers }: { quizAnswers: QuizAnswers }) {
  const score = QUIZ_QUESTIONS.filter(q => quizAnswers[q.id] === q.correct).length;
  const total = QUIZ_QUESTIONS.length;

  return (
    <SlideShell>
      <SlideHeading title="How You Did" />
      <ImagePlaceholder description="Back of a sealed envelope with The Inclusion Edit stamp" src="/images/bias-lesson/slide-12-brain.jpg" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", textAlign: "center" as const,
        margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
          {score}/{total}
        </p>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.7, fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          Your score has been added to your learning record.
        </p>
      </div>

      <SectionLabel text="Your takeaways from this lesson:" />
      <BulletList items={[
        "Unconscious bias affects everyone and shows up in everyday decisions",
        "Awareness is the first step: action is what creates change",
        "Structured, evidence-based processes are your most powerful tool",
        "Small, consistent changes in how you make decisions add up over time",
        "You do not have to be perfect: you just have to keep noticing",
      ]} />


    </SlideShell>
  );
}

// ── Slide definitions ─────────────────────────────────────────────────────────

const SLIDE_TITLES = [
  "Welcome & Guidelines",
  "What is Unconscious Bias?",
  "Where Does Bias Come From?",
  "Why It Matters",
  "Real World Scenario",
  "Reflective Scenario",
  "Your Turn",
  "What the Research Says",
  "What You Can Do",
  "Lesson Roundup",
  "Quiz",
  "How You Did",
];

// ── Main export ───────────────────────────────────────────────────────────────

export default function UnderstandingYourBias() {
  const [current, setCurrent] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Text-to-speech
  const [ttsActive, setTtsActive] = React.useState(false);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setTtsActive(false);
  };

  const readSlide = () => {
    if (ttsActive) { stopSpeech(); return; }
    const el = document.getElementById("slide-content-area");
    if (!el) return;
    const text = el.innerText || el.textContent || "";
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.onend = () => setTtsActive(false);
    utt.onerror = () => setTtsActive(false);
    setTtsActive(true);
    window.speechSynthesis.speak(utt);
  };

  // Stop speech when slide changes
  React.useEffect(() => { stopSpeech(); }, [current]);


  const total = SLIDE_TITLES.length;
  const progress = ((current + 1) / total) * 100;

  const goNext = () => { setCurrent(c => Math.min(c + 1, total - 1)); window.scrollTo({ top: 0, behavior: "instant" }); };
  const goPrev = () => { setCurrent(c => Math.max(c - 1, 0)); window.scrollTo({ top: 0, behavior: "instant" }); };

  const renderSlide = () => {
    switch (current) {
      case 0: return <Slide1 />;
      case 1: return <Slide2 />;
      case 2: return <Slide3 />;
      case 3: return <Slide4 />;
      case 4: return <Slide5 />;
      case 5: return <Slide6 />;
      case 6: return <Slide7 />;
      case 7: return <Slide8 />;
      case 8: return <Slide9 />;
      case 9: return <Slide10 />;
      case 10: return (
        <Slide11
          quizAnswers={quizAnswers}
          setQuizAnswers={setQuizAnswers}
          quizSubmitted={quizSubmitted}
          setQuizSubmitted={setQuizSubmitted}
        />
      );
      case 11: return <Slide12 quizAnswers={quizAnswers} />;
      default: return null;
    }
  };

  return (
    <>
      <PlatformNav />
      <main style={{
        minHeight: "100vh",
        background: "var(--white)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}>
        {/* Progress bar */}
        <div style={{ position: "sticky", top: "3.5rem", zIndex: 10, background: "var(--white)", borderBottom: "1px solid var(--gray-border)", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.8rem" }}>
                Slide {current + 1} of {total}
              </span>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.5, fontSize: "0.8rem" }}>
                {SLIDE_TITLES[current]}
              </span>
            </div>
            <div style={{ background: "var(--gray-border)", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: "var(--sage-dark)",
                borderRadius: "99px",
                transition: "width 0.35s ease",
              }} />
            </div>
          </div>
        </div>

        {/* Slide content */}
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem", maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{
            background: "var(--white)",
            border: "1.5px solid var(--gray-border)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>

            {/* TTS button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
              <button
                onClick={readSlide}
                title={ttsActive ? "Stop reading" : "Read slide aloud"}
                style={{
                  background: ttsActive ? "var(--sage-dark)" : "none",
                  border: "1.5px solid var(--sage-dark)",
                  borderRadius: "99px",
                  padding: "0.35rem 0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  color: ttsActive ? "var(--white)" : "var(--sage-dark)",
                  transition: "all 0.2s",
                }}
              >
                {ttsActive ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
            <div id="slide-content-area">
            {renderSlide()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "var(--white)", borderTop: "1.5px solid var(--gray-border)",
          padding: "0.75rem 1rem",
          zIndex: 20,
        }}>
          <div style={{
            maxWidth: "680px", margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <button
              onClick={goPrev}
              disabled={current === 0}
              style={{
                background: "none", border: "1px solid var(--gray-border)",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: current === 0 ? "var(--gray-border)" : "var(--charcoal)",
                cursor: current === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            {/* Dot nav */}
            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {SLIDE_TITLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  style={{
                    width: i === current ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "99px",
                    background: i === current ? "var(--sage-dark)" : "var(--gray-border)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            {current < total - 1 ? (
              <button
                onClick={goNext}
                style={{
                  background: "var(--sage-dark)", border: "none",
                  borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--white)", cursor: "pointer",
                }}
              >
                Next →
              </button>
            ) : (
              <Link href="/dashboard/learn" style={{
                background: "var(--sage-dark)", border: "none",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: "var(--white)", textDecoration: "none",
              }}>
                Finish lesson
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
