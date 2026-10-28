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

export default function EqualityActLesson() {
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
    { q: "Which of the following is NOT one of the nine protected characteristics under the Equality Act 2010?", options: ["Age", "Socioeconomic background", "Religion or belief", "Gender reassignment"], correct: 1 },
    { q: "What is indirect discrimination?", options: ["When someone is treated less favourably because of a protected characteristic", "When a rule or practice applies to everyone but disadvantages people with a particular protected characteristic more than others, without objective justification", "When someone is harassed because of a protected characteristic", "When an employer refuses to make a reasonable adjustment"], correct: 1 },
    { q: "What does the Public Sector Equality Duty require of public bodies?", options: ["To publish an annual EDI report", "To employ a minimum percentage of staff from protected groups", "To have due regard to eliminating discrimination, advancing equality, and fostering good relations between different people", "To carry out an equality impact assessment on every decision"], correct: 2 },
    { q: "What is the key difference between positive action and positive discrimination?", options: ["Positive action is legal; positive discrimination is not. Positive action supports underrepresented groups to compete on equal terms; positive discrimination selects someone solely because of a protected characteristic regardless of merit", "Positive action applies only in recruitment; positive discrimination applies to promotion", "Positive discrimination is legal in the public sector only; positive action applies everywhere", "There is no legal distinction: both terms describe the same activity"], correct: 0 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("equality-act");
  }

  const slides = [
    // Slide 1: Intro
    <SlideShell key="s1">
      <SlideHeading title="Understanding the Equality Act" subtitle="What practitioners need to know" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>Most people know the Equality Act exists. Far fewer know what it actually requires of them on a Tuesday morning when a decision has to be made. This lesson is about closing that gap.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Understand how the Equality Act 2010 applies in practice and what it means for the decisions you make every day as a practitioner, manager, or leader.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Define the nine protected characteristics and give a workplace example of each", "Distinguish between direct and indirect discrimination and explain why the difference matters", "Describe the Public Sector Equality Duty and what due regard requires in practice", "Identify when the Equality Act applies to a situation you are handling", "Name three common practitioner mistakes and how to avoid them"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    // Slide 2: What the Act is
    <SlideShell key="s2">
      <SlideHeading title="What the Equality Act Actually Is" subtitle="And what it is not" />
      <BodyText>The Equality Act 2010 consolidated and replaced nine separate pieces of discrimination legislation in England, Scotland, and Wales. It sets out a single, consistent framework for protection against discrimination, harassment, and victimisation.</BodyText>
      <BodyText>It is not a policy document or a set of aspirations. It is the law. Breaching it carries real consequences: employment tribunal claims, financial penalties, reputational damage, and the personal harm caused to the people affected.</BodyText>
      <SectionLabel text="What the Act covers:" />
      <BulletList items={["Employment: recruitment, promotion, pay, redundancy, dismissal, and working conditions", "Services: access to goods, facilities, and services provided to the public", "Education: schools, colleges, and universities", "Public functions: the exercise of public powers by government bodies, police, and similar organisations"]} />
      <KeyReminder text="The Act applies whether discrimination is intentional or unintentional. Good intentions do not provide a legal defence. This is why practitioners need to understand it, not just believe in it." />
      <ReflectionBox prompt="Think about a decision you have been involved in recently at work. Does the Equality Act apply to it? Which aspect of the Act is most relevant?" />
      <MoveOnNote />
    </SlideShell>,

    // Slide 3: Nine protected characteristics
    <SlideShell key="s3">
      <SlideHeading title="The Nine Protected Characteristics" />
      <BodyText>The Equality Act protects people from discrimination based on nine characteristics. Understanding each one, and how it applies in your context, is the foundation of everything else.</BodyText>
      <BulletList items={["Age: protects people of any age, not only older workers. Ageism can operate in both directions", "Disability: a physical or mental impairment that has a substantial, long-term effect on the ability to carry out normal day-to-day activities", "Gender reassignment: protects trans people at any stage of transition, including those who have not undergone any medical procedures", "Marriage and civil partnership: protects against discrimination because someone is married or in a civil partnership (in employment only)", "Pregnancy and maternity: covers pregnancy, maternity leave, and the period after return", "Race: includes colour, nationality, and ethnic or national origin", "Religion or belief: covers religion, religious belief, philosophical belief, and lack of religion or belief", "Sex: protects both women and men", "Sexual orientation: covers lesbian, gay, bisexual, and heterosexual people"]} />
      <ReflectionBox prompt="Which of these characteristics is least often considered in your organisation's day-to-day decisions? Why might that be?" />
      <MoveOnNote />
    </SlideShell>,

    // Slide 4: Activity
    <SlideShell key="s4">
      <SlideHeading title="Activity: Spot the Characteristic" subtitle="Write down your answers before moving on" />
      <BodyText>For each scenario, write down which protected characteristic is most relevant. Some may involve more than one.</BodyText>
      <ActivityBox title="Scenarios">
        <BulletList items={[
          "A job advertisement states that applicants must be 'young and dynamic with fresh ideas.'",
          "A Muslim employee is told she cannot wear a headscarf because it does not fit the company dress code.",
          "A woman returns from maternity leave to find her role has been restructured and her responsibilities reduced.",
          "A trans man is repeatedly referred to using his previous name and pronouns by a colleague, despite corrections.",
          "An employee with depression is passed over for promotion because his manager assumes he cannot handle pressure.",
          "Two candidates perform equally well at interview. The hiring manager appoints the one whose name sounds more familiar to them.",
        ]} />
      </ActivityBox>
      <ReflectionBox subPrompts={["Which characteristic does each scenario relate to?", "In which cases might more than one characteristic be relevant?", "Which scenario is closest to something you have witnessed or been aware of in a workplace context?"]} />
      <MoveOnNote />
    </SlideShell>,

    // Slide 5: Direct vs indirect
    <SlideShell key="s5">
      <SlideHeading title="Direct and Indirect Discrimination" subtitle="The distinction that matters most in practice" />
      <SectionLabel text="Direct discrimination:" />
      <BodyText>Treating someone less favourably than others because of a protected characteristic. Example: not shortlisting a candidate because she is pregnant. Direct discrimination is almost never justifiable.</BodyText>
      <SectionLabel text="Indirect discrimination:" />
      <BodyText>Applying a rule, policy, or practice that appears neutral but puts people with a particular protected characteristic at a disadvantage, without objective justification. Example: requiring all staff to work on Fridays as a condition of promotion, which disadvantages observant Jewish or Muslim employees.</BodyText>
      <KeyReminder text="Indirect discrimination is the more common and less visible form. It often arises from policies that were never designed to discriminate but have a discriminatory effect in practice." />
      <SectionLabel text="Objective justification:" />
      <BodyText>Indirect discrimination can be justified if the rule or practice is a proportionate means of achieving a legitimate aim. The bar is high. Convenience, cost-saving, and tradition are not sufficient justifications. Business necessity, applied in the least discriminatory way possible, can be.</BodyText>
      <ReflectionBox prompt="Think of a policy or practice in your organisation. Could it place someone with a protected characteristic at a disadvantage? Is there an objective justification for it?" />
      <MoveOnNote />
    </SlideShell>,

    // Slide 6: Harassment and victimisation
    <SlideShell key="s6">
      <SlideHeading title="Harassment and Victimisation" subtitle="The two that get overlooked" />
      <SectionLabel text="Harassment:" />
      <BodyText>Unwanted conduct related to a protected characteristic that has the purpose or effect of violating a person's dignity, or creating an intimidating, hostile, degrading, humiliating, or offensive environment. The impact on the recipient matters, not only the intention of the perpetrator.</BodyText>
      <BulletList items={["Harassment does not have to be directed at the recipient: overhearing or witnessing offensive conduct can constitute harassment", "A single incident can constitute harassment if it is sufficiently serious", "Third-party harassment, such as by a client or customer, carries employer liability under certain circumstances"]} />
      <SectionLabel text="Victimisation:" />
      <BodyText>Treating someone less favourably because they have made a complaint, supported someone else's complaint, or are believed to have done so. This applies whether or not the original complaint was upheld.</BodyText>
      <KeyReminder text="Someone who raises a concern about discrimination and is then passed over for promotion, excluded from meetings, or treated coldly by colleagues may have a victimisation claim even if the original discrimination complaint was not upheld." />
      <ReflectionBox prompt="Has anyone in your organisation ever experienced what could be described as victimisation after raising a concern? What happened, and what should have happened?" />
      <MoveOnNote />
    </SlideShell>,

    // Slide 7: PSED
    <SlideShell key="s7">
      <SlideHeading title="The Public Sector Equality Duty" subtitle="What 'due regard' really means" />
      <BodyText>The Public Sector Equality Duty (PSED) applies to public bodies and organisations exercising public functions. It requires them to have due regard to three aims when carrying out their activities.</BodyText>
      <SectionLabel text="The three aims:" />
      <BulletList items={["Eliminate discrimination, harassment, victimisation and any other conduct prohibited by the Act", "Advance equality of opportunity between people who share a protected characteristic and those who do not", "Foster good relations between people who share a protected characteristic and those who do not"]} />
      <SectionLabel text="What 'due regard' means in practice:" />
      <BodyText>Due regard is not a box-ticking exercise. It requires a genuine, substantive engagement with equality issues before and during decision-making, not a retrospective justification for decisions already made.</BodyText>
      <BulletList items={["Equality impact assessments should inform decisions, not document them after the fact", "Consultation with affected communities is often required as part of due regard", "The weight given to equality issues must be proportionate to their relevance to the decision"]} />
      <KeyReminder text="Even if your organisation is not a public body, many of these principles represent good practice and align with legal obligations that apply to all employers under other sections of the Act." />
    </SlideShell>,

    // Slide 8: Positive action vs discrimination
    <SlideShell key="s8">
      <SlideHeading title="Positive Action vs Positive Discrimination" subtitle="The line practitioners must hold" />
      <BodyText>This is one of the most misunderstood areas of the Equality Act. Confusion leads to one of two errors: doing nothing when positive action would be lawful and beneficial, or doing too much and crossing into unlawful positive discrimination.</BodyText>
      <SectionLabel text="Positive action (lawful):" />
      <BodyText>Taking steps to help people with a protected characteristic to overcome disadvantage, participate in activities, or meet a particular need. This might include targeted outreach, mentoring programmes, or, in a tie-break situation, selecting a candidate from an underrepresented group when all else is genuinely equal.</BodyText>
      <SectionLabel text="Positive discrimination (unlawful):" />
      <BodyText>Selecting someone because of a protected characteristic regardless of comparative merit. Reserving roles for people with a particular characteristic. Applying a lower standard to candidates from underrepresented groups.</BodyText>
      <ActivityBox title="Think about this:">
        <BodyText>An organisation notices that its senior leadership team has no disabled members. It decides to advertise a new leadership role only to disabled candidates.</BodyText>
        <BodyText>Is this positive action or positive discrimination? Write down your reasoning before moving to the next slide.</BodyText>
      </ActivityBox>
      <MoveOnNote />
    </SlideShell>,

    // Slide 9: Where the Act applies
    <SlideShell key="s9">
      <SlideHeading title="When the Equality Act Applies" subtitle="The decisions it reaches" />
      <BodyText>The Equality Act applies across a broader range of decisions and situations than many practitioners realise. Working through the following checklist is a useful starting point before any significant decision involving people.</BodyText>
      <SectionLabel text="In employment, the Act applies to:" />
      <BulletList items={["Recruitment: job advertisements, shortlisting, interviewing, offers and rejections", "Pay and benefits: equal pay, bonuses, non-financial benefits", "Promotion, transfer, and training opportunities", "Performance management and disciplinary processes", "Redundancy selection criteria and processes", "Dismissal, including constructive dismissal"]} />
      <SectionLabel text="It also applies to:" />
      <BulletList items={["Contract workers, agency workers, and some self-employed people depending on the relationship", "Job applicants who have never been employed by the organisation", "Former employees, in relation to references and post-employment conduct"]} />
      <KeyReminder text="If in doubt whether the Act applies to a decision, assume it does. The cost of getting this wrong is significantly higher than the cost of taking equality considerations seriously when they turn out not to be legally required." />
    </SlideShell>,

    // Slide 10: Power of three
    <SlideShell key="s10">
      <SlideHeading title="The Power of Three" subtitle="Three questions before any significant people decision" />
      <BodyText>Before any significant decision involving people, train yourself to ask three questions. These are not a legal checklist. They are a habit of mind that builds equality considerations into the way you work.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "Could this put someone with a protected characteristic at a disadvantage?", detail: "Not just intentionally. Could the effect of this decision, policy, or practice fall more heavily on some people than others because of who they are?" },
          { n: "2", q: "Is there an objective justification?", detail: "If the answer to question one is yes, is there a legitimate aim that could not be achieved in a less discriminatory way? Can you articulate it clearly?" },
          { n: "3", q: "Would this withstand scrutiny?", detail: "If this decision were reviewed by a tribunal, an equality body, or reported in the press, would the reasoning hold? Would you be comfortable explaining it?" },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
      <ReflectionBox prompt="Apply these three questions to a real decision you are currently involved in or recently made. What do they reveal?" />
      <MoveOnNote />
    </SlideShell>,

    // Slide 11: Common mistakes
    <SlideShell key="s11">
      <SlideHeading title="Common Practitioner Mistakes" subtitle="And how to avoid them" />
      <BulletList items={[
        "Treating the Equality Act as a compliance exercise rather than a practice standard: the organisations that use it only to avoid tribunal claims are the ones most likely to face them. The organisations that use it to guide everyday decisions build cultures where discrimination is less likely to occur",
        "Confusing equality with sameness: treating everyone identically is not the same as treating everyone fairly. Fairness sometimes requires different treatment to achieve the same outcome",
        "Assuming good intentions are enough: the Act is concerned with impact, not intention. A policy can be discriminatory in effect regardless of whether it was designed that way",
        "Failing to document equality thinking: decisions made with equality in mind but not recorded are impossible to defend when challenged. A brief note of the equality considerations taken into account is good practice and good risk management",
        "Applying the Act only to the most visible protected characteristics: disability, race, and sex receive the most attention. Age, religion, sexual orientation, and gender reassignment are equally protected and equally likely to give rise to claims",
        "Treating reasonable adjustments as discretionary: the duty to make reasonable adjustments is a legal obligation, not a favour. Framing it as generosity undermines both the law and the dignity of the person asking",
      ]} />
    </SlideShell>,

    // Slide 12: Quiz
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

    // Slide 13: Takeaways
    <SlideShell key="s13">
      <SlideHeading title="Key Takeaways" subtitle="Understanding the Equality Act" />
      <BulletList items={[
        "The Equality Act 2010 is not a values statement: it is the law. Good intentions do not constitute a defence, and impact matters more than intention",
        "The nine protected characteristics are all equally protected: the ones that receive least attention in your organisation are often the ones most likely to give rise to a claim",
        "Indirect discrimination is the most common form and the least visible: a policy that applies to everyone can still be unlawful if it disproportionately disadvantages people with a protected characteristic without objective justification",
        "Positive action is lawful and sometimes necessary: the fear of crossing into positive discrimination should not prevent you from taking proportionate steps to address disadvantage",
        "Before any significant people decision, ask the three questions: could this disadvantage someone, is there a justification, and would this withstand scrutiny",
      ]} />
      <ReflectionBox subPrompts={["Which protected characteristic is most likely to be overlooked in your organisation?", "Is there a policy or practice in your workplace that might constitute indirect discrimination? What would you do with that observation?"]} />
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
