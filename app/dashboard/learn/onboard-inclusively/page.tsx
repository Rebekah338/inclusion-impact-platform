"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

type QuizAnswers = Record<number, string>;

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
          {prompt}
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
      Once you have written down your answers, you can move to the next slide.
    </p>
  );
}

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Onboard Inclusively From Day One" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Inclusion does not begin when someone has been in post for six months. It begins on the day a person is told they have the job. Onboarding is the moment when an organisation's commitment to inclusion either becomes real or reveals itself as rhetoric.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you design and deliver an onboarding experience that makes every new starter feel genuinely welcomed, informed, and set up to succeed from their very first day.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Describe what inclusive onboarding looks like across its key stages",
        "Identify the most common gaps that leave new starters from underrepresented groups feeling excluded or unsupported",
        "Apply a practical framework for reviewing and improving onboarding in your own organisation",
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
      <SlideHeading title="Pre-Onboarding: Setting the Tone Before Day One" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide2-welcome.jpg" alt="A new employee receiving a warm welcome communication before their first day" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        The onboarding experience begins long before a person walks through the door. What happens in the days and weeks between offer acceptance and day one sets expectations, builds confidence, and signals whether the organisation is genuinely prepared to welcome this person.
      </BodyText>

      <SectionLabel text="What inclusive pre-onboarding looks like:" />
      <BulletList items={[
        "Send a warm, personalised welcome message within 48 hours of acceptance: confirm the details, express genuine enthusiasm, and tell them who their point of contact is",
        "Share practical logistics well in advance: where to go, what to bring, what to expect on day one",
        "Ask about accessibility requirements, communication preferences, and any support needs before they arrive; do not wait for them to raise it",
        "Provide a pre-reading pack that is genuinely useful and not overwhelming: a team chart, a brief on the organisation's values and inclusion commitments, and a glossary of any acronyms or internal language",
        "Assign a buddy or welcome contact before day one so the new starter has a named person they can message with questions",
      ]} />

      <SectionLabel text="What to avoid:" />
      <BulletList items={[
        "Silence between offer acceptance and day one; this creates anxiety and undermines belonging before the relationship has begun",
        "One-size-fits-all communication that does not account for different accessibility or communication needs",
        "Assuming the new starter will raise any concerns themselves: many people, particularly those from underrepresented groups, do not feel safe to ask for what they need",
      ]} />

      <KeyReminder text="Inclusive onboarding is proactive, not reactive. Ask before day one; do not wait to be told." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="The First Day and First Week" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide3-first-day.jpg" alt="A new employee being welcomed warmly by colleagues on their first day" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        The first day carries disproportionate weight. Research on belonging in the workplace consistently shows that first impressions of inclusion are hard to reverse. A first day that is chaotic, cold, or exclusionary sets a tone that many people never fully recover from.
      </BodyText>

      <SectionLabel text="First day essentials:" />
      <BulletList items={[
        "Greet the new starter at the door or virtually at the call start: do not leave them waiting alone",
        "Ensure their workspace, equipment, and access are fully set up before they arrive",
        "Introduce them to the team meaningfully: give context about each person's role and how they connect to the new starter's work",
        "Have a structured, manageable agenda for the day: not so packed they are overwhelmed, not so empty they feel abandoned",
        "Give them time and space to absorb information without pressure to perform immediately",
      ]} />

      <SectionLabel text="First week priorities:" />
      <BulletList items={[
        "Hold a one-to-one check-in at the end of the first week: ask what is going well and what could be better",
        "Ensure the new starter has met key stakeholders and understands how their role connects to the wider organisation",
        "Clarify expectations clearly: what does success look like in the first 30, 60, and 90 days?",
        "Check in on any accessibility or support needs that were identified pre-start",
      ]} />

      <ReflectionBox
        prompt="Think about a time you started a new role, or watched someone else do so."
        subPrompts={[
          "What made you or them feel welcomed and included?",
          "What created uncertainty or a sense of not belonging?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Policy and Process Awareness" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide4-policies.jpg" alt="An employee reviewing workplace policies and inclusion documents" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        New starters need to understand the systems, policies, and processes that govern their working life. For inclusion to feel real rather than performative, this must go beyond a policy document handed over with a signature sheet.
      </BodyText>

      <SectionLabel text="Policies every new starter should understand:" />
      <BulletList items={[
        "The organisation's equality, diversity, and inclusion policy: what it commits to, and how it is enacted in practice",
        "How to raise a concern, report discrimination, or access support: make this explicit and normalise using it",
        "Flexible working arrangements and how to request them",
        "Reasonable adjustments: who to speak to, how requests are considered, and what the process looks like",
        "Employee networks and communities of practice, including identity-based networks",
        "Mental health and wellbeing support: what is available and how to access it without stigma",
      ]} />

      <SectionLabel text="How to make policy handover inclusive:" />
      <BulletList items={[
        "Walk through key policies with the new starter rather than simply emailing a link",
        "Explain the spirit of the policy as well as its content: what does this look like in practice here?",
        "Explicitly name that raising concerns is encouraged and protected, not discouraged",
        "Check in on policy understanding in the first-month review, not just on day one",
      ]} />

      <KeyReminder text="A policy that sits in a folder and is never discussed is not inclusion; it is paperwork. Inclusive onboarding brings policies to life." />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Ongoing Support and Development" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide5-development.jpg" alt="A manager and new employee in a supportive one-to-one conversation" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Onboarding is not a week-long event. For new starters from underrepresented groups in particular, the first three to six months are a critical period in which the gap between the organisation's stated values and its lived culture becomes apparent. Ongoing support during this period is not optional.
      </BodyText>

      <SectionLabel text="Structured support beyond the first week:" />
      <BulletList items={[
        "Schedule regular one-to-ones during the first three months: at minimum monthly, ideally fortnightly",
        "Explicitly create space in these conversations for the new starter to raise concerns or share their experience of inclusion",
        "Assign a mentor or sponsor, distinct from the line manager, who can provide guidance and advocacy",
        "Connect new starters with employee networks relevant to their identity or interests",
        "Agree a development plan within the first 90 days: make clear that investment in this person's growth starts now, not at the six-month mark",
      ]} />

      <SectionLabel text="Sponsorship versus mentorship:" />
      <BodyText>
        Mentorship provides advice and guidance. Sponsorship provides advocacy and visibility. New starters from underrepresented groups often have access to mentors but not sponsors. A sponsor actively advocates for the person in rooms they are not in: recommending them for projects, nominating them for opportunities, and amplifying their contributions. Pairing new starters with sponsors during onboarding is one of the most evidence-based interventions in inclusion practice.
      </BodyText>
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Inclusive Communication During Onboarding" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide6-communication.jpg" alt="Colleagues communicating inclusively across different backgrounds and communication styles" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Communication is never neutral. The language we use, the assumptions we make, and the formats we default to all carry inclusion implications. During onboarding, when new starters are absorbing everything, inclusive communication makes the difference between feeling welcomed and feeling like an outsider.
      </BodyText>

      <SectionLabel text="Language and tone:" />
      <BulletList items={[
        "Use plain English: avoid jargon, acronyms, and internal shorthand until they have been explained",
        "Do not default to humour or banter as a bonding mechanism: it can exclude rather than include, particularly for people who are new to the culture",
        "Ask for and use the new starter's preferred name and pronouns: normalise this as standard practice for everyone",
        "Be explicit about unwritten rules: every culture has them, and not naming them disadvantages those who did not grow up in similar contexts",
      ]} />

      <SectionLabel text="Communication formats and accessibility:" />
      <BulletList items={[
        "Provide onboarding materials in accessible formats: check font size, colour contrast, and screen-reader compatibility",
        "Ask whether the new starter has any communication preferences: some people process information better in writing; others prefer to talk through material",
        "Record key onboarding sessions where possible so they can be revisited",
        "Offer captions or transcripts for any video content used in onboarding",
      ]} />

      <ReflectionBox
        prompt="Think about the language and communication culture in your organisation's onboarding."
        subPrompts={[
          "What assumptions does it make about who is coming in?",
          "What unwritten rules do new starters currently have to discover for themselves?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Wellbeing and Psychological Safety" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide7-wellbeing.jpg" alt="A new employee feeling psychologically safe and supported in their new workplace" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Psychological safety is the belief that one can speak up, ask questions, make mistakes, and be oneself without fear of punishment or humiliation. It is the single most important predictor of team performance and individual wellbeing, according to Google's Project Aristotle and a substantial body of subsequent research.
      </BodyText>
      <BodyText>
        For new starters, psychological safety during onboarding is foundational. If it is not established early, the costs compound: people do not ask for help, do not flag problems, and do not bring their full selves and capabilities to their work.
      </BodyText>

      <SectionLabel text="Building psychological safety during onboarding:" />
      <BulletList items={[
        "Model vulnerability from the start: leaders and managers who share their own learning curves and mistakes signal that it is safe to do the same",
        "Normalise asking questions: name explicitly that there are no stupid questions and that asking for help is a sign of professionalism, not weakness",
        "Respond to mistakes with curiosity rather than blame: how do we learn from this together?",
        "Ensure that feedback is regular, specific, and given in private; do not use a new starter as an example of what not to do in front of others",
        "Create structured opportunities for the new starter to give feedback on their onboarding experience: and demonstrate that you act on what they say",
      ]} />

      <KeyReminder text="Psychological safety is not about being nice. It is about creating the conditions in which people can do their best work. Inclusive onboarding builds it from day one." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Measuring Inclusion in Onboarding" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/onboard-inclusively/slide8-measurement.jpg" alt="Data and feedback being used to improve onboarding practices" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        You cannot improve what you do not measure. Organisations that take inclusive onboarding seriously gather structured data about the experience and use it to drive change. This does not require a large budget; it requires intentionality and consistency.
      </BodyText>

      <SectionLabel text="What to measure:" />
      <BulletList items={[
        "New starter experience surveys at 30 days, 60 days, and 90 days: include questions specifically about inclusion and belonging",
        "Retention data disaggregated by protected characteristics: are particular groups leaving within the first year at higher rates?",
        "Time to productivity: are some groups taking significantly longer to become fully effective, which might indicate an onboarding gap?",
        "Buddy and mentor feedback: what are they observing about how new starters are settling in?",
        "Qualitative exit interview data from people who left within their first year",
      ]} />

      <SectionLabel text="Acting on what you learn:" />
      <BodyText>
        Data without action is not inclusion practice; it is data collection. Close the loop by sharing what you have heard from new starters, what you are changing in response, and when those changes will be in place. This builds trust and signals that onboarding is a continuous improvement process rather than a fixed programme.
      </BodyText>

      <ReflectionBox
        prompt="Consider how your organisation currently measures the experience of new starters."
        subPrompts={[
          "What data do you gather, and how disaggregated is it?",
          "What one change to your measurement approach would give you the most useful information?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" subtitle="What would you do?" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <BodyText>
          Priya joined a mid-sized public sector organisation as a senior policy advisor. She is the first person of South Asian heritage to be appointed at this level. Her line manager was warm and welcoming in the interview process but has been largely absent since she started three weeks ago. Her laptop was not set up on day one. She has not been introduced to key stakeholders. She asked about the organisation's flexible working policy and was told to look it up on the intranet. She has not yet had a one-to-one with her manager.
        </BodyText>
        <BodyText>
          Priya is highly capable and motivated. But she is beginning to question whether she made the right decision.
        </BodyText>
      </div>

      <SectionLabel text="Questions to consider:" />
      <ReflectionBox
        subPrompts={[
          "Which elements of inclusive onboarding are missing from Priya's experience so far?",
          "What is the likely impact on Priya's sense of belonging and psychological safety?",
          "What are the three most important things Priya's manager should do in the next week?",
          "What systemic changes could prevent this happening to the next person who joins?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="An Inclusive Onboarding Checklist" />

      <BodyText>
        Use this checklist to audit your current onboarding process. The goal is not to have every item in place from day one; it is to identify the gaps that matter most and build a realistic plan to address them.
      </BodyText>

      <SectionLabel text="Before day one:" />
      <BulletList items={[
        "Warm welcome message sent within 48 hours of offer acceptance",
        "Practical logistics shared in advance: location, timing, what to bring",
        "Accessibility and support needs proactively asked about",
        "Equipment and access set up and confirmed",
        "Buddy or welcome contact assigned and introduced",
      ]} />

      <SectionLabel text="First day and week:" />
      <BulletList items={[
        "Structured, manageable day-one agenda in place",
        "Team introductions given with context",
        "Clear expectations shared for the first 30, 60, and 90 days",
        "End-of-week check-in held",
      ]} />

      <SectionLabel text="First three months:" />
      <BulletList items={[
        "Regular one-to-ones with explicit space for inclusion feedback",
        "Mentor or sponsor assigned",
        "Development plan agreed",
        "Onboarding experience survey at 30, 60, and 90 days",
        "Results from surveys acted on and communicated back",
      ]} />

      <KeyReminder text="An inclusive onboarding checklist is only useful if someone owns it. Assign clear accountability for each stage." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <BodyText>
        Here is what to take away from this lesson.
      </BodyText>

      <SectionLabel text="Key principles:" />
      <BulletList items={[
        "Inclusion begins before day one: the pre-onboarding period sets expectations about whether this person is genuinely welcome",
        "The first day carries disproportionate weight; chaos, coldness, or exclusion in those first hours is hard to recover from",
        "Policies must be brought to life through conversation, not handed over as documents",
        "Ongoing support, particularly in the first three to six months, is where the gap between stated values and lived culture becomes visible",
        "Inclusive communication during onboarding means plain language, accessible formats, and making the unwritten rules explicit",
        "Psychological safety is built from day one through modelling, normalising questions, and responding to mistakes with curiosity",
        "Measuring inclusion in onboarding, disaggregated by protected characteristics, is what separates intention from accountability",
      ]} />

      <KeyReminder text="Every new starter deserves to feel that they were expected, prepared for, and genuinely welcomed. That is not a luxury; it is the baseline for inclusion." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "At what point does inclusive onboarding begin?",
      options: [
        { id: "a", text: "On the new starter's first day" },
        { id: "b", text: "During the induction week" },
        { id: "c", text: "Before day one, from the moment of offer acceptance" },
        { id: "d", text: "At the end of the probationary period" },
      ],
      correct: "c",
      explanation: "Inclusive onboarding begins from the moment someone accepts an offer. What happens between acceptance and day one sets expectations, builds confidence, and signals whether the organisation is genuinely prepared to welcome this person.",
    },
    {
      q: "What is the difference between a mentor and a sponsor?",
      options: [
        { id: "a", text: "A mentor is more senior; a sponsor is a peer" },
        { id: "b", text: "A mentor provides advice and guidance; a sponsor provides active advocacy in rooms the person is not in" },
        { id: "c", text: "A sponsor provides formal training; a mentor provides informal support" },
        { id: "d", text: "There is no meaningful difference between the two roles" },
      ],
      correct: "b",
      explanation: "Mentorship provides advice and guidance. Sponsorship provides advocacy and visibility: a sponsor actively advocates for the person when they are not in the room, recommending them for opportunities and amplifying their contributions.",
    },
    {
      q: "Why is psychological safety important during onboarding?",
      options: [
        { id: "a", text: "It ensures new starters comply with health and safety regulations" },
        { id: "b", text: "It allows managers to give more critical feedback without consequences" },
        { id: "c", text: "Without it, people do not ask for help, do not flag problems, and do not bring their full capabilities to their work" },
        { id: "d", text: "It is only important for junior employees, not senior ones" },
      ],
      correct: "c",
      explanation: "Psychological safety is the belief that one can speak up, ask questions, and make mistakes without fear of punishment. If it is not established during onboarding, the costs compound throughout the employment relationship.",
    },
    {
      q: "Which approach to measuring inclusion in onboarding is most effective?",
      options: [
        { id: "a", text: "A single satisfaction survey sent at the end of induction week" },
        { id: "b", text: "Disaggregated data at 30, 60, and 90 days, with findings communicated back and acted on" },
        { id: "c", text: "Monitoring attendance at onboarding sessions as a proxy for engagement" },
        { id: "d", text: "Waiting for the six-month performance review to assess how well the new starter has integrated" },
      ],
      correct: "b",
      explanation: "Effective measurement requires disaggregated data (so gaps affecting particular groups are visible), multiple checkpoints (so trends can be identified), and a feedback loop (so new starters know their input led to change). Data without action is not inclusion practice.",
    },
  ];

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("onboard-inclusively");
    onComplete(finalScore);
  };

  return (
    <SlideShell>
      <SlideHeading title="Quiz" subtitle="Test what you have learned" />
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: "1.75rem", padding: "1.25rem", background: "var(--sage-xlight)", borderRadius: "0.75rem", border: "1px solid var(--sage-light)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.75rem 0" }}>
            {qi + 1}. {q.q}
          </p>
          {q.options.map((opt) => {
            const chosen = answers[qi] === opt.id;
            const isCorrect = opt.id === q.correct;
            let bg = "var(--white)";
            let border = "1px solid var(--gray-border)";
            if (submitted && chosen && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            else if (submitted && chosen && !isCorrect) { bg = "#f8d7da"; border = "1px solid #dc3545"; }
            else if (submitted && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            return (
              <label key={opt.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: submitted ? "default" : "pointer", background: bg, border, borderRadius: "0.4rem", padding: "0.6rem 0.75rem", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  name={`q${qi}`}
                  value={opt.id}
                  checked={chosen}
                  disabled={submitted}
                  onChange={() => setAnswers({ ...answers, [qi]: opt.id })}
                  style={{ marginTop: "0.15rem", flexShrink: 0 }}
                />
                <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem" }}>{opt.text}</span>
              </label>
            );
          })}
          {submitted && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.875rem", margin: "0.5rem 0 0 0", fontStyle: "italic" }}>
              {q.explanation}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          style={{
            background: Object.keys(answers).length < questions.length ? "var(--sage-light)" : "var(--sage-dark)",
            color: "var(--white)", border: "none", borderRadius: "0.5rem",
            padding: "0.75rem 2rem", fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "1rem", cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer",
          }}
        >
          Submit answers
        </button>
      )}
      {submitted && (
        <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "0.5rem", textAlign: "center" as const }}>
          <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
            You scored {questions.filter((q, i) => answers[i] === q.correct).length} out of {questions.length}
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
            Your result has been saved to your learning record.
          </p>
        </div>
      )}
    </SlideShell>
  );
}

function Slide13({ score }: { score: number }) {
  return (
    <SlideShell>
      <SlideHeading title="How You Did and Your Takeaways" />

      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" as const }}>
        <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          {score} / 4
        </p>
      </div>

      <SectionLabel text="Your takeaways from this lesson:" />
      <BulletList items={[
        "Inclusive onboarding begins before day one; the pre-onboarding period signals whether the organisation is genuinely prepared to welcome this person",
        "The first day carries disproportionate weight; getting it right is non-negotiable",
        "Policies must be brought to life through conversation, not handed over as documents",
        "Sponsorship, not just mentorship, is one of the most evidence-based interventions available during onboarding",
        "Psychological safety is built from the first interaction and determines whether people bring their full capabilities to their work",
        "Measurement that is disaggregated and acted on is what separates inclusion intention from inclusion accountability",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Pre-Onboarding: Before Day One",
  "The First Day and First Week",
  "Policy and Process Awareness",
  "Ongoing Support and Development",
  "Inclusive Communication",
  "Wellbeing and Psychological Safety",
  "Measuring Inclusion in Onboarding",
  "Real World Scenario",
  "An Inclusive Onboarding Checklist",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function OnboardInclusivelyPage() {
  const [slide, setSlide] = useState(0);
  const [ttsActive, setTtsActive] = React.useState(false);
  const [quizScore, setQuizScore] = useState(0);

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

  React.useEffect(() => { stopSpeech(); }, [slide]);

  const totalSlides = SLIDE_TITLES.length;

  const goNext = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.min(s + 1, totalSlides - 1));
  };
  const goPrev = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.max(s - 1, 0));
  };

  const slides = [
    <Slide1 key={0} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
    <Slide4 key={3} />,
    <Slide5 key={4} />,
    <Slide6 key={5} />,
    <Slide7 key={6} />,
    <Slide8 key={7} />,
    <Slide9 key={8} />,
    <Slide10 key={9} />,
    <Slide11 key={10} />,
    <Slide12Quiz key={11} onComplete={setQuizScore} />,
    <Slide13 key={12} score={quizScore} />,
  ];

  const progress = ((slide + 1) / totalSlides) * 100;

  return (
    <>
      <PlatformNav />
      <main style={{
        minHeight: "100vh",
        background: "var(--white)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}>
        <div style={{ position: "sticky", top: "3.5rem", zIndex: 10, background: "var(--white)", borderBottom: "1px solid var(--gray-border)", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.8rem" }}>
                Slide {slide + 1} of {totalSlides}
              </span>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.5, fontSize: "0.8rem" }}>
                {SLIDE_TITLES[slide]}
              </span>
            </div>
            <div style={{ height: "4px", background: "var(--sage-xlight)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--sage-dark)", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{
            background: "var(--white)",
            border: "1.5px solid var(--gray-border)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
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
              {slides[slide]}
            </div>
          </div>
        </div>

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
              disabled={slide === 0}
              style={{
                background: "none", border: "1px solid var(--gray-border)",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: slide === 0 ? "var(--gray-border)" : "var(--charcoal)",
                cursor: slide === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {SLIDE_TITLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlide(i); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  style={{
                    width: i === slide ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "99px",
                    background: i === slide ? "var(--sage-dark)" : "var(--gray-border)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            {slide < totalSlides - 1 ? (
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
