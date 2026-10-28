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

export default function EdiStrategyLesson() {
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
    { q: "What is the key distinction between an EDI strategy and an EDI action plan?", options: ["A strategy is written by senior leaders; an action plan is written by the EDI team", "A strategy defines why you are doing the work and what success looks like; an action plan lists the activities you will do to get there. One without the other is incomplete", "A strategy is a long document; an action plan is a short document", "A strategy covers the whole organisation; an action plan covers a single department"], correct: 1 },
    { q: "What does a theory of change do in an EDI strategy?", options: ["It lists the activities the organisation will carry out", "It explains who is responsible for delivering the strategy", "It makes explicit the assumptions behind the strategy: if we do X, then Y will happen, because Z", "It provides the evidence base for why EDI matters"], correct: 2 },
    { q: "Why is stakeholder mapping important when developing an EDI strategy?", options: ["It ensures the strategy is approved by the board before launch", "It identifies who has the power to enable or block the strategy, who needs to be involved in its design, and who will be most affected by it, so that engagement is targeted and genuine rather than token", "It satisfies the Public Sector Equality Duty", "It helps the EDI team prioritise which activities to focus on"], correct: 1 },
    { q: "An organisation publishes an EDI strategy with five objectives, none of which have named owners, deadlines, or measures. Which statement best describes this strategy?", options: ["It is a reasonable first step; owners and measures can be added later", "It is a list of intentions dressed up as a strategy; without accountability structures it is unlikely to deliver change and may actively undermine trust if progress cannot be demonstrated", "It is sufficient if the objectives are specific and ambitious", "It is appropriate for a strategy in its first year when baselines are not yet established"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("edi-strategy");
  }

  const slides = [
    <SlideShell key="s1">
      <SlideHeading title="Developing an EDI Strategy from Scratch" subtitle="From intention to infrastructure" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>Most EDI strategies fail because they are lists of activities dressed up as strategy. They describe what an organisation will do without explaining why it matters, what it is trying to achieve, or how it will know whether it got there. This lesson is about building something that works rather than something that looks good.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Develop a coherent EDI strategy that defines clear outcomes, accounts for organisational context, and includes the accountability structures needed to drive genuine change.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Explain the difference between a strategy and an action plan, and why both are needed", "Apply a theory of change to EDI strategy development", "Conduct a baseline assessment and use it to set meaningful objectives", "Map stakeholders and design genuine engagement processes", "Describe the governance and accountability structures that make a strategy functional", "Apply the power of three to pressure-test any EDI strategy"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    <SlideShell key="s2">
      <SlideHeading title="Strategy vs Plan" subtitle="The difference matters more than it sounds" />
      <BodyText>A strategy is not a list of activities. It is a coherent account of where you are starting from, where you are trying to get to, and why you believe the route you have chosen will get you there. An action plan is what you will do to execute the strategy. Most organisations skip the strategy and go straight to the action plan.</BodyText>
      <SectionLabel text="What a strategy answers:" />
      <BulletList items={["What is the problem we are trying to solve? What does the data tell us about where inequity exists in this organisation?", "What does success look like in three to five years? How will we know we got there?", "Why do we believe our planned interventions will lead to that outcome?", "What are the biggest barriers and how will we address them?", "What is not in scope, and why?"]} />
      <SectionLabel text="What an action plan answers:" />
      <BulletList items={["What specific activities will we carry out?", "Who is responsible for each one?", "By when?", "How much will it cost?", "How will we measure whether it worked?"]} />
      <KeyReminder text="A strategy without a plan is wishful thinking. A plan without a strategy is activity without direction. Both are needed, and the strategy should come first." />
    </SlideShell>,

    <SlideShell key="s3">
      <SlideHeading title="Theory of Change and Logic Model" subtitle="Making your assumptions explicit" />
      <BodyText>A theory of change makes explicit the assumptions that underlie a strategy. It says: if we do X, then Y will happen, because of Z. This is important for two reasons: it exposes assumptions that can be tested, and it creates a basis for evaluating whether the strategy is working as intended or whether the assumptions were wrong.</BodyText>
      <BodyText>A logic model is the practical expression of a theory of change. It maps inputs, activities, outputs, outcomes, and impact in sequence, showing the chain of causation from what you do to what changes.</BodyText>
      <SectionLabel text="A simple example:" />
      <BulletList items={["Input: time from line managers and an inclusion training programme", "Activity: all line managers complete inclusive leadership training and practise structured quarterly inclusion conversations with each team member", "Output: 100% of managers trained; 80% of employees have had a documented inclusion conversation in the past quarter", "Outcome: employees from underrepresented groups report a greater sense of belonging and describe their manager as actively inclusive", "Impact: reduced turnover gap between demographic groups; improved promotion rates for underrepresented groups over three years"]} />
      <ReflectionBox prompt="What is the core assumption behind the most prominent EDI activity your organisation runs? Is there evidence that it leads to the outcomes it is intended to produce?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s4">
      <SlideHeading title="Starting with the Baseline" subtitle="You cannot measure progress without knowing where you started" />
      <BodyText>A baseline assessment is a structured snapshot of where the organisation is now. It informs which problems the strategy is addressing and provides the starting point against which progress will be measured.</BodyText>
      <SectionLabel text="What a baseline assessment covers:" />
      <BulletList items={["Workforce composition data broken down by level, function, and protected characteristic", "Pay gap data: gender, ethnicity, disability", "Recruitment, progression, and retention rates by group", "Employee engagement and inclusion survey data broken down by group", "Existing policies: which exist, whether they are used, whether they are effective", "Culture data: qualitative themes from interviews, focus groups, or networks about what it is like to work here", "External benchmarks: how does the organisation compare to sector peers or the available labour market?"]} />
      <ReflectionBox subPrompts={["What does your organisation's baseline data tell you about where inequity is most significant?", "Where are the gaps in the data? What would you need to fill them?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s5">
      <SlideHeading title="Activity: Strategy Audit" subtitle="Write down your assessment for each issue" />
      <BodyText>Below are eight common mistakes in EDI strategies. For each one, consider whether it applies to a strategy you know, what the consequence is, and what a stronger approach would look like.</BodyText>
      <ActivityBox title="Eight common EDI strategy mistakes">
        <BulletList items={["The strategy opens with a values statement and moves straight to a list of activities, with no data on what the problem actually is", "All objectives focus on representation numbers at senior levels, with no outcomes relating to people's experience of the workplace", "The strategy has no named owners: activities are assigned to 'the EDI team' or 'HR'", "There is no baseline: the strategy sets targets without saying what the starting point was", "The strategy was written by HR without meaningful involvement from employees, especially those from underrepresented groups", "The strategy runs for one year and is then replaced with a new strategy that does not evaluate what the previous one achieved", "Every activity in the plan is a training or awareness-raising event, with no structural or policy changes", "The strategy commits to nothing that the organisation will find uncomfortable or that involves meaningful risk"]} />
      </ActivityBox>
      <ReflectionBox prompt="Which of these mistakes is most common in your sector or experience? What drives it?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s6">
      <SlideHeading title="Setting Objectives" subtitle="Making commitments that mean something" />
      <BodyText>Objectives are not aspirations. They are specific, measurable commitments that create accountability. A good EDI objective names what will change, for whom, by how much, and by when.</BodyText>
      <SectionLabel text="Weak objective:" />
      <KeyReminder text="We will improve diversity at senior levels." />
      <SectionLabel text="Stronger objective:" />
      <KeyReminder text="By 2027, increase representation of employees from ethnic minority backgrounds at senior manager level and above from 8% to 15%, and reduce the gap in promotion rates between ethnic minority and white employees from 12 percentage points to 5 percentage points." />
      <SectionLabel text="Principles for setting EDI objectives:" />
      <BulletList items={["Include both diversity objectives (who is here) and inclusion objectives (what it is like to be here)", "Set objectives that address the specific problems the baseline identified, not generic targets that apply everywhere", "Make sure every objective has a named owner who has accepted accountability for it", "Include at least one objective that is uncomfortable: one that commits to something the organisation will have to change significantly to achieve", "Fewer objectives done well beat many objectives done superficially"]} />
    </SlideShell>,

    <SlideShell key="s7">
      <SlideHeading title="Stakeholder Mapping" subtitle="Who needs to be in this, and how" />
      <BodyText>Every EDI strategy is shaped by who was involved in developing it. A strategy written by a small team in isolation will reflect their assumptions and blind spots. Genuine involvement of the people most affected by inequity is not just good practice: it produces better strategies and builds the trust needed for implementation.</BodyText>
      <SectionLabel text="A stakeholder map for an EDI strategy should identify:" />
      <BulletList items={["Decision-makers: who needs to approve and resource the strategy? What are their priorities and concerns?", "Enablers: who can help deliver it? Line managers, HR business partners, network leads, training teams", "Affected groups: who experiences the inequity the strategy is designed to address? Their experience is data, not decoration", "Potential blockers: who has the power or motivation to resist change? How can their concerns be engaged honestly?", "External voices: sector peers, specialists, external networks or benchmarking bodies"]} />
      <SectionLabel text="Levels of involvement:" />
      <BulletList items={["Inform: share the strategy and its rationale with affected groups", "Consult: ask for input before decisions are made and show how it was used", "Co-design: involve affected groups in developing the objectives and approach from the start"]} />
      <KeyReminder text="Token consultation is worse than no consultation: it raises expectations without meeting them and erodes trust in the process." />
    </SlideShell>,

    <SlideShell key="s8">
      <SlideHeading title="Governance and Accountability" subtitle="Who owns this when things get difficult" />
      <BodyText>Governance is the system that ensures the strategy is implemented, monitored, and updated. Without it, even the best-designed strategy stalls when the people who wrote it move on, when priorities shift, or when the easy activities have been done and only the difficult ones remain.</BodyText>
      <SectionLabel text="Core governance components:" />
      <BulletList items={["Executive sponsor: a senior leader who is personally accountable for the strategy's outcomes and will escalate when barriers arise", "EDI steering group or board: a cross-functional group with decision-making authority over resourcing and policy changes, meeting at least quarterly", "Named objective owners: every objective has a named person who reports on progress and is evaluated on it", "Regular reporting cycle: progress against objectives reported to the board or senior leadership team at least annually, with interim updates to the steering group", "Review and update process: a structured annual review that evaluates what worked, what did not, and what needs to change"]} />
      <ReflectionBox subPrompts={["Does your organisation's EDI strategy have a named executive sponsor with genuine accountability?", "What happens when an EDI objective is not on track? Who escalates it, and to whom?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s9">
      <SlideHeading title="The Power of Three" subtitle="Pressure-testing any EDI strategy" />
      <BodyText>Before finalising or presenting an EDI strategy, test it against three questions. These are the questions that separate strategies that will deliver change from strategies that will sit in a drawer.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "Does every objective have a named owner, a deadline, and a measure?", detail: "An objective without all three is an aspiration. Owners create accountability. Deadlines create urgency. Measures create the basis for honest review. If any of the three is missing, the objective will not be delivered." },
          { n: "2", q: "Could you tell in 12 months whether this worked?", detail: "If the strategy does not specify what data you will look at in a year to assess progress, it cannot be evaluated. An unevaluable strategy cannot learn from its failures or build on its successes. Build the evaluation into the design from the start." },
          { n: "3", q: "Does it commit to anything the organisation will find uncomfortable?", detail: "A strategy that only commits to activities the organisation was already comfortable with will not change power structures, culture, or outcomes. The most important test of a strategy's ambition is whether it includes at least one commitment that will require the organisation to do something it has previously avoided." },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
      <ReflectionBox prompt="Apply these three questions to an EDI strategy you know. What do they reveal?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s10">
      <SlideHeading title="Communicating the Strategy" subtitle="How you communicate is part of the strategy" />
      <BodyText>An EDI strategy that has not been communicated is not a strategy: it is a document. How the strategy is communicated signals the organisation's commitment and sets expectations about what employees can hold leadership accountable for.</BodyText>
      <SectionLabel text="Principles for communicating an EDI strategy:" />
      <BulletList items={["Lead with the problem: explain what the data showed and why this strategy is the response, before describing what you are going to do", "Be specific about what you are committing to: vague language erodes trust; specific objectives invite accountability", "Acknowledge what has not worked before: if this is not the organisation's first EDI strategy, say what was learned from previous efforts and how this one is different", "Tell people how they can get involved: employees who feel the strategy is happening to them rather than with them will not engage with it", "Close the loop: report back on progress regularly, in plain language, including being honest when objectives are not on track"]} />
      <KeyReminder text="The gap between what organisations say about inclusion and what employees experience is one of the most corrosive forces in workplace culture. Communication that overpromises and underdelivers is worse than saying less." />
    </SlideShell>,

    <SlideShell key="s11">
      <SlideHeading title="Year One Priorities" subtitle="Where to focus when everything feels urgent" />
      <BodyText>A new EDI strategy can feel overwhelming. Year one is not about doing everything; it is about building the foundations that make everything else possible. Three priorities stand above the others in the first year of a new strategy.</BodyText>
      <BulletList items={["Establish the baseline: if you do not have robust data on where you are starting from, collect it. Everything else depends on this. A year spent building a credible baseline is a year well spent.", "Build the governance: put the accountability structures in place before the activity starts. An executive sponsor who is genuinely accountable, a steering group with authority, named objective owners. Governance without activity is better than activity without governance.", "Do fewer things better: choose two or three interventions with the strongest evidence base, implement them well, measure their impact, and learn from them. A long list of activities completed superficially produces no change and exhausts everyone involved."]} />
      <SectionLabel text="What year one is not for:" />
      <BulletList items={["Rewriting policies that are not broken in order to appear active", "Running training events to demonstrate commitment without changing anything structural", "Publishing diversity data before you have a plan to act on what it shows"]} />
      <ReflectionBox prompt="If you were starting an EDI strategy in your organisation tomorrow, what would your three year one priorities be and why?" />
      <MoveOnNote />
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
      <SlideHeading title="Key Takeaways" subtitle="Developing an EDI Strategy from Scratch" />
      <BulletList items={["A strategy is not a list of activities: it is a coherent account of where you are, where you are trying to get to, and why you believe your chosen approach will get you there", "A theory of change makes your assumptions explicit so they can be tested; without one, you cannot know whether your strategy is working or whether it was built on faulty assumptions", "A baseline assessment is not optional: you cannot set meaningful targets or measure progress without knowing where you are starting from", "Genuine stakeholder involvement produces better strategies and builds the trust needed for implementation; token consultation is worse than none", "Governance is the system that makes accountability real: named owners, reporting structures, and an executive sponsor who will escalate when barriers arise", "Test any strategy against three questions: does every objective have a named owner, deadline, and measure; could you tell in 12 months whether it worked; and does it commit to anything the organisation will find uncomfortable?", "Year one is for building foundations: a credible baseline, robust governance, and two or three well-evidenced interventions done well"]} />
      <ReflectionBox subPrompts={["What is the single most important thing missing from your current or most recent experience of an EDI strategy?", "What would you do differently if you were developing one from scratch today?"]} />
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
