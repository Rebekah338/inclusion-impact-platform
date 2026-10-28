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

export default function MeasuringInclusionLesson() {
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
    { q: "What is the key difference between a diversity metric and an inclusion metric?", options: ["Diversity metrics are collected annually; inclusion metrics are collected quarterly", "Diversity metrics measure who is in the organisation; inclusion metrics measure whether people experience equitable outcomes and a sense of belonging once they are there", "Diversity metrics are required by law; inclusion metrics are optional", "Diversity metrics apply to all staff; inclusion metrics apply only to underrepresented groups"], correct: 1 },
    { q: "What is the difference between a leading and a lagging indicator?", options: ["Leading indicators measure inputs and early signals of change; lagging indicators measure outcomes after they have occurred", "Leading indicators are more important than lagging indicators", "Leading indicators come from survey data; lagging indicators come from HR systems", "Leading indicators measure diversity; lagging indicators measure inclusion"], correct: 0 },
    { q: "Why is intersectional data important for measuring inclusion?", options: ["It allows organisations to report on more protected characteristics", "It reveals where disadvantage compounds: a group that appears to fare well on average may contain a subgroup that fares very poorly when characteristics are analysed together", "It is required under the Public Sector Equality Duty", "It reduces the number of separate surveys needed"], correct: 1 },
    { q: "An organisation reports that its gender pay gap has reduced from 18% to 12% over two years. What additional information would you need before concluding that inclusion has improved?", options: ["You would need to see the organisation's gender diversity data", "You would need to understand how the gap was calculated, whether it is a mean or median figure, and what happened to progression, representation at senior levels, and women's experience of the workplace over the same period", "You would need to compare the figure with the sector average", "The reduction in the gender pay gap is sufficient evidence that inclusion has improved"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("measuring-inclusion");
  }

  const slides = [
    <SlideShell key="s1">
      <SlideHeading title="Measuring Inclusion" subtitle="Metrics that matter" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>What gets measured gets managed. But the wrong measures will manage you toward the appearance of inclusion rather than its reality. Understanding what to measure, and why, is one of the most practically important skills in this work.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Design a measurement framework that captures what is actually happening to people in your organisation, not just what the organisation is doing about inclusion.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Explain why most diversity data tells us relatively little about inclusion", "Distinguish between diversity and inclusion metrics, and between leading and lagging indicators", "Identify and critique common inclusion metrics", "Describe what employee voice data is and why it matters", "Apply the power of three to evaluate any inclusion metric", "Outline the seven components of a basic measurement framework"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    <SlideShell key="s2">
      <SlideHeading title="Why Most Diversity Data Tells You Little" subtitle="The gap between measurement and meaning" />
      <BodyText>Most organisations collect workforce diversity data. Very few of them use it to understand what is actually happening. The data tells you who is in the building. It rarely tells you whether they are thriving, progressing, or experiencing fair treatment.</BodyText>
      <SectionLabel text="Common limitations of workforce diversity data:" />
      <BulletList items={[
        "It captures headcount at a point in time but not movement: who joined, who left, who progressed, and whether different groups move at different rates",
        "It rarely breaks down by level, function, or geography, which can obscure significant pockets of exclusion within an apparently diverse organisation",
        "It depends on voluntary disclosure, which means that groups who fear identification are likely to be underrepresented in the data",
        "It measures what the organisation is doing, not what people are experiencing",
        "It can create a false sense of progress: hiring more people from underrepresented groups without changing the culture does not constitute inclusion",
      ]} />
      <ReflectionBox prompt="What diversity data does your organisation collect? What does it tell you? What does it not tell you?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s3">
      <SlideHeading title="Diversity vs Inclusion Metrics" subtitle="Measuring who is there vs what it is like to be there" />
      <BodyText>Diversity metrics and inclusion metrics answer different questions. Both are necessary; neither is sufficient alone.</BodyText>
      <SectionLabel text="Diversity metrics (who is here):" />
      <BulletList items={[
        "Workforce composition by protected characteristic at each level of the organisation",
        "Recruitment pipeline: applications, shortlisting rates, offer rates, and acceptance rates by group",
        "Retention rates by group and level",
        "Pay gaps: gender pay gap, ethnicity pay gap, disability pay gap",
        "Promotion rates by group",
      ]} />
      <SectionLabel text="Inclusion metrics (what it is like to be here):" />
      <BulletList items={[
        "Engagement scores broken down by demographic group",
        "Belonging and psychological safety scores",
        "Rates of reported discrimination, harassment, or unfair treatment",
        "Uptake of reasonable adjustments and flexible working by group",
        "Participation in employee networks and representation in leadership pipelines",
        "Exit interview themes, especially whether different groups leave for different reasons",
      ]} />
      <KeyReminder text="An organisation can have strong diversity metrics and poor inclusion metrics. Both matter. But inclusion metrics are harder to collect, harder to fake, and closer to the actual experience of your people." />
    </SlideShell>,

    <SlideShell key="s4">
      <SlideHeading title="Leading and Lagging Indicators" subtitle="Measuring what is happening before it shows up in outcomes" />
      <BodyText>Lagging indicators tell you what already happened. Leading indicators tell you where things are heading. Most organisations measure lagging indicators and then wonder why they are always reacting rather than preventing.</BodyText>
      <SectionLabel text="Lagging indicators (outcome measures):" />
      <BulletList items={["Gender pay gap percentage", "Percentage of senior leaders from ethnic minority backgrounds", "Number of tribunal claims in a year", "Staff turnover rate by group"]} />
      <SectionLabel text="Leading indicators (early signals):" />
      <BulletList items={["Engagement scores broken down by group, especially for recently joined employees", "Rates of microaggression reporting or use of speak-up channels", "Proportion of line managers who have completed a meaningful inclusion conversation with each team member in the past six months", "Percentage of job adverts reviewed against inclusive language criteria", "Representation in talent pipelines and succession plans by group"]} />
      <ReflectionBox subPrompts={["What leading indicators does your organisation currently track?", "What leading indicator, if you started tracking it today, would most change how you understand inclusion in your workplace?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s5">
      <SlideHeading title="Activity: Which Metrics Actually Measure Inclusion?" subtitle="Write down your reasoning" />
      <BodyText>For each metric below, decide whether it is primarily a diversity metric or an inclusion metric, whether it is leading or lagging, and whether it could improve without real inclusion improving.</BodyText>
      <ActivityBox title="Eight metrics to evaluate">
        <BulletList items={[
          "Percentage of employees from ethnic minority backgrounds at director level",
          "Proportion of employees who agree 'I feel I can be myself at work' in the annual survey",
          "Number of EDI training completions",
          "Promotion rates for disabled employees vs non-disabled employees",
          "Gender pay gap",
          "Percentage of managers who have completed an inclusive leadership programme",
          "Rates of anonymous speak-up channel usage",
          "Ratio of internal to external hires from underrepresented groups",
        ]} />
      </ActivityBox>
      <ReflectionBox prompt="Which metric on this list is most likely to give a false positive, showing improvement even when real inclusion has not changed?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s6">
      <SlideHeading title="Employee Voice Data" subtitle="The data you cannot extract from your HR system" />
      <BodyText>Some of the most important inclusion data cannot be collected from systems. It lives in people's experience and has to be sought directly. Employee voice data encompasses all the ways an organisation listens to its people: surveys, focus groups, pulse checks, exit interviews, and speak-up channels.</BodyText>
      <SectionLabel text="Why employee voice data matters:" />
      <BulletList items={[
        "It captures qualitative experience that quantitative data cannot: why people stay, why they leave, what it feels like to be overlooked, what made the difference",
        "It can reveal the gap between official culture and lived reality",
        "It provides leading indicators: how people feel now predicts what they will do next",
        "It creates accountability: when people know they will be asked and that their answers will be used, behaviour changes",
      ]} />
      <SectionLabel text="Making employee voice data meaningful:" />
      <BulletList items={[
        "Break down survey results by demographic group rather than reporting averages: averages hide the most important patterns",
        "Ask questions that are specific enough to act on, not just broad sentiment",
        "Close the loop: tell people what you heard and what you are going to do about it",
        "Protect confidentiality rigorously: small group sizes can make individuals identifiable, which reduces honest responses",
      ]} />
    </SlideShell>,

    <SlideShell key="s7">
      <SlideHeading title="Intersectional Data" subtitle="Why group averages can mislead" />
      <BodyText>Intersectionality describes how different aspects of a person's identity interact to shape their experience. In measurement terms, it means that looking at one characteristic at a time can miss the most important patterns.</BodyText>
      <BodyText>An organisation may have gender pay parity overall while women of colour face a significantly larger pay gap than white women. An organisation may have strong disability inclusion outcomes for employees with physical impairments while employees with mental health conditions have very different experiences.</BodyText>
      <SectionLabel text="Practical approaches to intersectional data:" />
      <BulletList items={[
        "Where data volumes allow, cross-tabulate key metrics by two or more characteristics: gender and ethnicity, disability and age, race and level",
        "Where data is too small for quantitative analysis, use qualitative research targeted at specific groups",
        "Be transparent about the limits of your data: 'We cannot report on this group because the numbers are too small to protect anonymity' is more honest than silence",
        "Ask focus groups and networks about intersectional experiences directly rather than trying to infer them from survey data",
      ]} />
      <KeyReminder text="The groups most likely to be invisible in your data are often those experiencing the most significant disadvantage. Acknowledging the limits of what you can see is not a weakness; it is analytical honesty." />
    </SlideShell>,

    <SlideShell key="s8">
      <SlideHeading title="Data You Should Be Collecting" subtitle="A practical checklist" />
      <BodyText>Most organisations are collecting less data than they could and using less of what they collect than they should. The following are the minimum datasets that enable meaningful inclusion measurement:</BodyText>
      <BulletList items={[
        "Workforce composition by protected characteristic, broken down by level: not just overall percentages",
        "Recruitment funnel by stage and by group: where do different groups drop out?",
        "Promotion and progression rates by group",
        "Pay data: mean and median pay by group, bonus eligibility and receipt by group",
        "Absence and turnover by group",
        "Annual engagement or inclusion survey results by group",
        "Exit interview themes, coded and broken down by group where possible",
        "Grievance, disciplinary, and complaint data by group: both as originator and subject",
      ]} />
      <ReflectionBox prompt="Which of these datasets does your organisation not currently collect or use? What would it take to start?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s9">
      <SlideHeading title="The Power of Three" subtitle="Testing every inclusion metric before using it" />
      <BodyText>Before relying on any metric to tell the story of inclusion in your organisation, test it against three questions. These questions shift the focus from data collection to data meaning.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "Does this measure what is happening to people or only what the organisation is doing?", detail: "Training completion rates measure what the organisation is doing. Psychological safety scores measure what people experience. Both have value, but only the second tells you whether inclusion is real." },
          { n: "2", q: "Could this number improve while real inclusion gets worse?", detail: "A diversity metric can improve while exclusion within a more diverse workforce intensifies. A training completion rate can reach 100% while behaviour stays unchanged. Metrics that can be gamed should be complemented by metrics that cannot." },
          { n: "3", q: "Who is not visible in this data?", detail: "Small group sizes, low disclosure rates, and single-characteristic analysis all leave people invisible. Knowing what you cannot see is as important as knowing what you can." },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
      <ReflectionBox prompt="Apply these three questions to the most prominent inclusion metric your organisation currently reports. What do they reveal?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s10">
      <SlideHeading title="From Data to Action" subtitle="Why measurement only matters if it changes something" />
      <BodyText>Measurement without action is surveillance. Collecting data from employees and then making no visible use of it can reduce trust and willingness to engage in future surveys. The purpose of measurement is to generate insight that drives decisions.</BodyText>
      <SectionLabel text="Principles for turning data into action:" />
      <BulletList items={[
        "Set a threshold for action before you collect the data: 'If the engagement gap between groups exceeds X, we will investigate and respond'",
        "Name who is responsible for responding to each data point: data without ownership does not move",
        "Close the loop publicly: tell people what the data showed and what you are doing about it",
        "Distinguish between data that requires immediate action and data that informs longer-term strategy",
        "Treat absence of data as data: if a group is not disclosing or not responding, ask why",
      ]} />
      <KeyReminder text="The test of a measurement framework is not the sophistication of the data it generates. It is the quality of the decisions it informs." />
    </SlideShell>,

    <SlideShell key="s11">
      <SlideHeading title="Building a Measurement Framework" subtitle="Seven components" />
      <BodyText>A measurement framework is not a list of metrics. It is a coherent system that connects what you are trying to achieve with how you will know whether you are getting there. Seven components make a framework functional rather than decorative.</BodyText>
      <BulletList items={[
        "Outcomes: what does inclusion look like when it is working? Define it in terms of people's experience, not just organisational activity",
        "Metrics: which specific data points will tell you whether you are achieving those outcomes? Include leading and lagging indicators",
        "Baseline: what does the data show now? You cannot measure change without knowing where you started",
        "Targets: what are you aiming to achieve and by when? Targets without timelines are wishes",
        "Ownership: who is responsible for each metric and for acting on what it shows?",
        "Review cadence: how often will data be reviewed and by whom? Metrics reviewed annually cannot inform in-year decisions",
        "Transparency: what data will be shared publicly, with the workforce, or with the board, and in what form?",
      ]} />
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
      <SlideHeading title="Key Takeaways" subtitle="Measuring Inclusion" />
      <BulletList items={[
        "Diversity data tells you who is in the building. Inclusion data tells you whether people are thriving once they are there. Both matter, but they answer different questions",
        "Leading indicators tell you where things are heading; lagging indicators tell you where they have been. A framework needs both",
        "Group averages conceal the most important patterns: an organisation that appears inclusive on average may have significant pockets of exclusion that only become visible through disaggregated data",
        "Intersectional analysis reveals where disadvantage compounds; looking at one characteristic at a time misses the people who face the most complex barriers",
        "Before using any metric, test it against three questions: does it measure experience or activity, can it improve without real inclusion improving, and who is not visible in it?",
        "Measurement without action is surveillance: the purpose of collecting data is to make better decisions, not to produce a report",
      ]} />
      <ReflectionBox subPrompts={["What is the single most important piece of data your organisation is not currently collecting?", "Which metric in your current measurement approach is most likely to give a false picture of inclusion? What would replace it?"]} />
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
