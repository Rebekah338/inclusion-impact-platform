"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

function SlideShell({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>{children}</div>;
}
function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.6, fontSize: "1rem", marginTop: "0.35rem" }}>{subtitle}</p>}
    </div>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
      {items.map((item, i) => <li key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>{item}</li>)}
    </ul>
  );
}
function BodyText({ children, italic, small }: { children: React.ReactNode; italic?: boolean; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: small ? "0.9rem" : "1rem", lineHeight: 1.75, fontStyle: italic ? "italic" : "normal", margin: "0.6rem 0" }}>{children}</p>;
}
function ReflectionBox({ prompt, subPrompts }: { prompt?: string; subPrompts?: string[] }) {
  return (
    <div style={{ background: "var(--sage-xlight)", borderLeft: "4px solid var(--sage-dark)", borderRadius: "0 0.5rem 0.5rem 0", padding: "1rem 1.25rem", margin: "1.5rem 0" }}>
      <p style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>💭 Reflect (write down on your paper):</p>
      {prompt && <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.25rem 0" }}>✏️ {prompt}</p>}
      {subPrompts && subPrompts.map((sp, i) => <p key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.4rem 0" }}>✏️ {sp}</p>)}
    </div>
  );
}
function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.5rem", padding: "0.9rem 1.1rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>📌 {text}</p>
    </div>
  );
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "1rem", margin: "1.25rem 0 0.4rem 0" }}>{text}</p>;
}
function MoveOnNote() {
  return <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>Once you have written down your answer, you can move to the next slide.</p>;
}
function ActivityBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--white)", border: "2px solid var(--sage-dark)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "0.95rem", margin: "0 0 0.75rem 0" }}>✍️ {title}</p>
      {children}
    </div>
  );
}

export default function ReasonableAdjustmentsLesson() {
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [ttsActive, setTtsActive] = useState(false);
  const total = 13;
  const progress = ((slide + 1) / total) * 100;

  React.useEffect(() => { return () => { window.speechSynthesis?.cancel(); }; }, []);

  function readSlide() {
    if (ttsActive) { window.speechSynthesis?.cancel(); setTtsActive(false); return; }
    const el = document.getElementById("slide-content-area");
    if (!el) return;
    const utt = new SpeechSynthesisUtterance(el.innerText || el.textContent || "");
    utt.onend = () => setTtsActive(false);
    setTtsActive(true);
    window.speechSynthesis?.speak(utt);
  }
  function goNext() { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(s => Math.min(s + 1, total - 1)); }
  function goPrev() { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(s => Math.max(s - 1, 0)); }

  const questions = [
    { q: "Under the Equality Act 2010, when does the duty to make reasonable adjustments arise?", options: ["Only when an employee formally requests an adjustment in writing", "When a provision, criterion, practice, or physical feature puts a disabled person at a substantial disadvantage compared to non-disabled people", "When a disabled person has been employed for at least two years", "Only in relation to physical accessibility of the workplace"], correct: 1 },
    { q: "Which of the following is NOT one of the four factors used to assess whether an adjustment is reasonable?", options: ["The cost of the adjustment", "How effective the adjustment is likely to be", "Whether the employee has disclosed their diagnosis to HR", "The resources available to the employer"], correct: 2 },
    { q: "What is the difference between a proactive and a reactive approach to reasonable adjustments?", options: ["Proactive means making adjustments before a request is made; reactive means waiting until someone asks", "Proactive means making physical adjustments; reactive means making policy adjustments", "Proactive adjustments are permanent; reactive adjustments are temporary", "There is no legal difference: both are treated the same under the Equality Act"], correct: 0 },
    { q: "An employee's health condition changes and the reasonable adjustment they have in place is no longer working well. What should happen?", options: ["The adjustment should remain in place until the employee formally requests a review", "The adjustment should be removed since it is no longer serving its purpose", "A review should be triggered to reassess what is needed and agree a revised arrangement", "The employer should commission an occupational health report before taking any action"], correct: 2 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("reasonable-adjustments");
  }

  const slides = [
    <SlideShell key="s1">
      <SlideHeading title="Reasonable Adjustments in Practice" subtitle="A legal right, not a favour" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>A reasonable adjustment is not a favour. It is a legal right. The way we talk about it in organisations shapes whether disabled people feel able to ask, and whether managers feel equipped to respond. This lesson is about getting both right.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Understand what the reasonable adjustments duty requires, how to assess what is reasonable, and how to have effective conversations that support disabled people at work.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Describe the legal basis for reasonable adjustments and who is covered", "Apply the four-factor test to assess whether an adjustment is reasonable", "Explain the difference between proactive and reactive approaches", "Have a productive conversation about adjustments with a colleague or direct report", "Identify when adjustments should be reviewed and how to manage that process"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    <SlideShell key="s2">
      <SlideHeading title="The Legal Basis" subtitle="Where the duty comes from" />
      <BodyText>The duty to make reasonable adjustments is contained in the Equality Act 2010. It places a positive obligation on employers to take steps to remove or reduce the disadvantage that a disabled person experiences in the workplace.</BodyText>
      <BodyText>Unlike most discrimination law, which is about not doing something harmful, the reasonable adjustments duty requires employers to act. Failure to comply is a form of disability discrimination.</BodyText>
      <SectionLabel text="The three types of reasonable adjustment:" />
      <BulletList items={[
        "Changes to provisions, criteria, or practices: for example, allowing flexible working, adjusting performance standards during a health episode, or waiving an attendance policy during a period of treatment",
        "Changes to physical features: for example, installing a ramp, adjusting desk height, or relocating a person's work area to reduce barriers",
        "Provision of auxiliary aids: for example, screen reader software, ergonomic equipment, a support worker, or written information in an accessible format",
      ]} />
      <KeyReminder text="The duty is owed to the individual, not to disabled people in general. What counts as reasonable depends on the specific person, their specific disadvantage, and the specific circumstances." />
    </SlideShell>,

    <SlideShell key="s3">
      <SlideHeading title="Who Is Covered" subtitle="The definition of disability matters" />
      <BodyText>The Equality Act defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on a person's ability to carry out normal day-to-day activities.</BodyText>
      <SectionLabel text="Unpacking the definition:" />
      <BulletList items={[
        "Substantial means more than minor or trivial. It does not have to be severe",
        "Long-term means it has lasted or is expected to last at least 12 months, or for the rest of the person's life",
        "Normal day-to-day activities includes things like concentrating, remembering, communicating, moving around, and managing emotions",
        "Progressive conditions such as cancer, HIV, and multiple sclerosis are covered from the point of diagnosis, even before symptoms are substantial",
        "Conditions that are managed with medication or treatment are assessed as if the treatment were not being taken, with the exception of corrective glasses and contact lenses",
      ]} />
      <KeyReminder text="Many conditions that are not immediately obvious qualify under this definition: chronic pain, mental health conditions, neurodivergence, long-term fatigue syndromes, and more. The duty arises when the employer knows or could reasonably be expected to know about the disability." />
      <ReflectionBox prompt="Think of someone in your team or organisation who may experience disadvantage at work because of a health condition or impairment. Are they likely to meet the legal definition of disability? What barriers do they face?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s4">
      <SlideHeading title="The Four-Factor Test" subtitle="How to assess what is reasonable" />
      <BodyText>There is no list of adjustments that are automatically reasonable or unreasonable. Each case must be assessed on its merits. Four factors help determine whether an adjustment is reasonable:</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", title: "Effectiveness", detail: "How likely is the adjustment to remove or reduce the disadvantage? An adjustment that makes little practical difference is harder to justify at cost." },
          { n: "2", title: "Cost", detail: "What will the adjustment cost? Cost is a factor but not a veto. The test is whether the cost is disproportionate given the employer's resources. Many adjustments are low cost or no cost." },
          { n: "3", title: "Practicability", detail: "How disruptive or difficult is the adjustment to implement? Impracticability must be genuine, not assumed." },
          { n: "4", title: "Resources", detail: "What resources does the employer have available? A large employer with significant resources is held to a higher standard than a small employer. Access to Work funding may also offset costs." },
        ].map(({ n, title, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.1rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.2rem" }}>{title}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
    </SlideShell>,

    <SlideShell key="s5">
      <SlideHeading title="Activity: Reasonable or Not?" subtitle="Write down your reasoning before checking" />
      <BodyText>For each scenario, consider whether the proposed adjustment is likely to be reasonable under the four-factor test. Write down your reasoning for each one before moving on.</BodyText>
      <ActivityBox title="Scenarios">
        <BulletList items={[
          "A call centre employee with anxiety asks to have her desk moved away from the main noise of the floor. Cost: minimal. Effect: likely significant reduction in distress.",
          "A teacher with a progressive neurological condition asks to stop taking playground duty. The school says all teachers must be equally available for duties.",
          "An employee with ADHD asks for written summaries of all verbal instructions and meeting notes. The manager says this is too time-consuming.",
          "A sales manager with chronic fatigue asks to work from home three days a week. The employer says presence in the office is required for the role.",
          "An employee undergoing cancer treatment asks to reduce their hours temporarily and take additional medical appointments as paid time. The employer says this sets a precedent.",
        ]} />
      </ActivityBox>
      <ReflectionBox subPrompts={["Which adjustment is most clearly reasonable? Which is least clear?", "In which case is the employer's reasoning likely to fail the four-factor test?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s6">
      <SlideHeading title="How to Have the Conversation" subtitle="Getting the dialogue right" />
      <BodyText>The quality of the conversation between a manager and a disabled employee often determines whether adjustments work in practice. Many adjustments fail not because they are poorly designed but because the communication around them is poor.</BodyText>
      <SectionLabel text="Principles for a good conversation:" />
      <BulletList items={[
        "Start with the person's experience, not the diagnosis: ask what barriers they are experiencing at work, not what their condition is",
        "Be curious, not clinical: the goal is to understand their situation well enough to help, not to audit their disability",
        "Separate the assessment from the decision: listen fully before proposing anything",
        "Be clear about what you can and cannot commit to, and when you will come back to them",
        "Document what was agreed and why, including any adjustments that were discussed but not taken forward and the reason",
      ]} />
      <SectionLabel text="Questions that open rather than close:" />
      <BulletList items={[
        "What aspects of your current role are most affected by your condition?",
        "What would make the biggest difference to how you work?",
        "Is there anything about your working environment or schedule that we could change?",
        "What has worked well in the past, here or elsewhere?",
      ]} />
      <KeyReminder text="Employees are not required to disclose their diagnosis. They are required to give enough information for the employer to understand the disadvantage they face. A good conversation makes that easier." />
    </SlideShell>,

    <SlideShell key="s7">
      <SlideHeading title="Proactive vs Reactive" subtitle="The difference a posture makes" />
      <BodyText>Most organisations are reactive: they respond to adjustment requests when they are made. A proactive approach goes further, identifying potential barriers before they cause disadvantage.</BodyText>
      <SectionLabel text="Reactive (legally compliant minimum):" />
      <BulletList items={["Responding promptly and reasonably when a request is made", "Engaging properly with the individual to understand their needs", "Exploring options before declining", "Documenting what was considered and decided"]} />
      <SectionLabel text="Proactive (good practice):" />
      <BulletList items={[
        "Including questions about adjustments in regular one-to-ones and return-to-work conversations",
        "Reviewing job descriptions and ways of working for unnecessary barriers",
        "Training managers to recognise when a conversation about adjustments might be appropriate, without waiting to be asked",
        "Using occupational health proactively, not only when absence has become an issue",
        "Making the process for requesting adjustments visible and straightforward",
      ]} />
      <ReflectionBox prompt="In your organisation, what barriers might prevent a disabled person from requesting an adjustment even if they need one? What could you do to lower those barriers?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s8">
      <SlideHeading title="Documentation" subtitle="What to record and why" />
      <BodyText>Documentation of reasonable adjustments serves multiple purposes: it protects the employee by formalising what has been agreed, it protects the employer in the event of a dispute, and it ensures continuity if the line manager changes.</BodyText>
      <SectionLabel text="What good documentation includes:" />
      <BulletList items={[
        "A description of the disadvantage the person experiences, without requiring disclosure of a diagnosis",
        "The adjustment or adjustments agreed",
        "Any adjustments that were considered but not taken forward, and the reason",
        "A review date",
        "Who is responsible for implementing each element",
        "Any support or funding accessed, such as Access to Work",
      ]} />
      <KeyReminder text="Documentation should be kept confidentially and shared only with those who need to know in order to implement the adjustments. It is not a performance record. It is a support record." />
      <SectionLabel text="What documentation is not:" />
      <BulletList items={[
        "A contract: adjustments can and should evolve as needs change",
        "A diagnosis record: the focus is on the functional impact, not the medical label",
        "A reason to apply lesser standards without discussion: adjustments support someone to meet the standard, they are not a waiver of it",
      ]} />
    </SlideShell>,

    <SlideShell key="s9">
      <SlideHeading title="Adjustments Over Time" subtitle="Review as a responsibility, not a formality" />
      <BodyText>A reasonable adjustment is not a permanent fixture. Health conditions change. Roles change. Organisational contexts change. An adjustment that worked well two years ago may no longer be appropriate, or may need to be enhanced.</BodyText>
      <SectionLabel text="When to review:" />
      <BulletList items={[
        "At a pre-agreed review date",
        "When the person's role or responsibilities change significantly",
        "When they move to a new team or manager",
        "When they return from a period of sickness absence",
        "When they indicate, formally or informally, that things are not working well",
        "When the adjustment itself changes, such as a move to hybrid working",
      ]} />
      <SectionLabel text="How to approach a review:" />
      <BodyText>A review is not an opportunity to remove adjustments that are inconvenient. It is an opportunity to check that what is in place is still the right support. The starting question is: is this still working for you? Not: do we still need to do this?</BodyText>
      <ReflectionBox subPrompts={["Think of someone whose adjustments you are aware of. When were they last reviewed?", "What would make it easier for managers in your organisation to initiate adjustment reviews without it feeling threatening to the person?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s10">
      <SlideHeading title="The Power of Three" subtitle="Before declining any adjustment request" />
      <BodyText>When an adjustment request seems difficult, unreasonable, or impractical, train yourself to ask three questions before reaching a decision. These questions shift the focus from what the organisation finds convenient to what the law requires.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "Have you explored all possible options?", detail: "Not just the most obvious one. Not just the one that is easiest for the manager. The full range of what could reduce or remove the disadvantage, including partial solutions and temporary arrangements." },
          { n: "2", q: "Is the cost genuinely disproportionate?", detail: "Cost is one of four factors, not a trump card. Many adjustments cost very little. Have you looked at Access to Work funding? Have you costed the real alternative, which may include losing a valued employee or defending a tribunal claim?" },
          { n: "3", q: "Could a temporary arrangement work?", detail: "A permanent adjustment may feel impossible when a temporary one could bridge the gap, give the organisation time to plan, and keep the person at work. Temporary does not mean indefinite and uncommitted." },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
      <ReflectionBox prompt="Think of a time when an adjustment was declined or a request was handled poorly. Applying these three questions, what should have happened instead?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s11">
      <SlideHeading title="What Good Practice Looks Like" subtitle="The standard to work toward" />
      <BulletList items={[
        "Adjustments are discussed as a matter of course, not only when someone is struggling: they are part of how the organisation supports everyone to do their best work",
        "Managers know what adjustments are in place for members of their team and feel confident having supportive conversations about them",
        "The process for requesting an adjustment is visible, simple, and does not require a person to prove their disability before being taken seriously",
        "Occupational health is used as a resource, not a gate: it helps employers understand what support is needed, not just whether someone is fit for work",
        "Adjustments are reviewed proactively rather than waiting for things to go wrong",
        "When adjustments are not possible, the reason is explained clearly and alternatives are offered where they exist",
        "The language used internally frames adjustments as a positive tool for keeping talented people at work, not as a concession or a burden",
      ]} />
      <KeyReminder text="The organisations that handle reasonable adjustments well are also the ones with lower disability-related absence, higher retention of disabled employees, and fewer tribunal claims. The legal duty and the business case point in the same direction." />
    </SlideShell>,

    <SlideShell key="s12">
      <SlideHeading title="Knowledge Check" />
      {!submitted ? (
        <div>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: "1.5rem" }}>
              <BodyText><strong>Question {qi + 1}:</strong> {q.q}</BodyText>
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.65rem 1rem", marginBottom: "0.4rem", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", background: answers[qi] === oi ? "var(--sage-light)" : "var(--white)", border: answers[qi] === oi ? "2px solid var(--sage-dark)" : "1.5px solid var(--gray-border)", color: "var(--charcoal)" }}>{opt}</button>
              ))}
            </div>
          ))}
          <button onClick={handleQuizSubmit} disabled={answers.some(a => a === null)} style={{ marginTop: "0.5rem", padding: "0.75rem 2rem", background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, opacity: answers.some(a => a === null) ? 0.5 : 1 }}>Submit Answers</button>
        </div>
      ) : (
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--sage-dark)", marginBottom: "1rem" }}>You scored {score} out of {questions.length}</p>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: answers[qi] === q.correct ? "var(--sage-xlight)" : "#fff5f5", border: `1px solid ${answers[qi] === q.correct ? "var(--sage-dark)" : "#f5a0a0"}` }}>
              <BodyText small><strong>Q{qi + 1}:</strong> {q.q}</BodyText>
              <BodyText small>Correct answer: <strong>{q.options[q.correct]}</strong></BodyText>
            </div>
          ))}
          <button onClick={goNext} style={{ marginTop: "0.5rem", padding: "0.75rem 2rem", background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600 }}>See Takeaways</button>
        </div>
      )}
    </SlideShell>,

    <SlideShell key="s13">
      <SlideHeading title="Key Takeaways" subtitle="Reasonable Adjustments in Practice" />
      <BulletList items={[
        "The duty to make reasonable adjustments is a positive legal obligation: it requires action, not just the absence of discrimination",
        "Reasonableness is assessed using four factors: effectiveness, cost, practicability, and the employer's resources. Cost alone is not sufficient grounds for refusal",
        "The conversation matters as much as the adjustment itself: how a manager responds when someone asks for support shapes whether disabled people feel able to bring their whole selves to work",
        "Proactive organisations do not wait for people to struggle before offering support: they build adjustment conversations into regular management practice",
        "Adjustments should be reviewed, not set and forgotten: they need to evolve as circumstances change",
        "Before declining any request, ask three questions: have all options been explored, is the cost genuinely disproportionate, and could a temporary arrangement work?",
      ]} />
      <ReflectionBox subPrompts={["What is the single most practical change you could make to how reasonable adjustments are handled in your team or organisation?", "Is there someone in your team who might benefit from a conversation about adjustments who has not yet been offered one?"]} />
    </SlideShell>,
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "1.25rem", padding: "2.5rem 2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", opacity: 0.6 }}>Slide {slide + 1} of {total}</span>
              <button onClick={readSlide} style={{ background: "none", border: "1px solid var(--gray-border)", borderRadius: "0.4rem", padding: "0.25rem 0.65rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)" }}>{ttsActive ? "⏹ Stop" : "🔊 Listen"}</button>
            </div>
            <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "2px" }}>
              <div style={{ height: "100%", background: "var(--sage-dark)", borderRadius: "2px", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>
          <div id="slide-content-area">{slides[slide]}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--gray-border)" }}>
            <button onClick={goPrev} disabled={slide === 0} style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", border: "1.5px solid var(--gray-border)", background: "var(--white)", cursor: slide === 0 ? "default" : "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: slide === 0 ? "var(--gray-border)" : "var(--charcoal)", opacity: slide === 0 ? 0.4 : 1 }}>← Previous</button>
            <div style={{ display: "flex", gap: "0.4rem" }}>{Array.from({ length: total }).map((_, i) => <button key={i} onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(i); }} style={{ width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", background: i === slide ? "var(--sage-dark)" : "var(--gray-border)", padding: 0 }} />)}</div>
            {slide < total - 1 ? <button onClick={goNext} style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", border: "none", background: "var(--sage-dark)", color: "var(--white)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600 }}>Next →</button> : <Link href="/dashboard/learn" style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", background: "var(--sage-dark)", color: "var(--white)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600 }}>Done ✓</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
