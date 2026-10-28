"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--charcoal)", margin: "0 0 0.4rem" }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0.75rem 0", paddingLeft: "1.25rem" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
      ))}
    </ul>
  );
}
function ReflectionBox({ prompt, subPrompts }: { prompt: string; subPrompts?: string[] }) {
  return (
    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>Reflect</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>{prompt}</p>
      {subPrompts && <ul style={{ margin: "0.6rem 0 0", paddingLeft: "1.25rem" }}>{subPrompts.map((s, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.3rem" }}>{s}</li>)}</ul>}
    </div>
  );
}
function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{ background: "var(--sage-light)", borderLeft: "4px solid var(--sage-dark)", borderRadius: "0.5rem", padding: "1rem 1.25rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", margin: 0, fontStyle: "italic" }}>{text}</p>
    </div>
  );
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.75rem" }}>{text}</p>;
}
function BodyText({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: small ? "0.9rem" : "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>{children}</p>;
}
function TipCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem", display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--sage-dark)", minWidth: "1.4rem" }}>{number}</span>
      <div>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.25rem" }}>{title}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.55, margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

export default function PolicyAuditLesson() {
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [ttsActive, setTtsActive] = useState(false);
  const total = 13;
  const progress = ((slide + 1) / total) * 100;

  useEffect(() => { return () => { window.speechSynthesis?.cancel(); }; }, []);

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
    { q: "What is the difference between equity-focused and equality-focused policy design?", options: ["Equality-focused policies are always more legally compliant", "Equity-focused policies recognise systemic barriers and tailor support to individual needs; equality-focused policies treat everyone the same regardless of context", "Equity-focused policies apply only to public sector organisations", "There is no meaningful difference in practice"], correct: 1 },
    { q: "Why should employees be involved in the policy development process?", options: ["So the policy can be approved more quickly by HR", "Because involving diverse teams ensures the policy addresses real challenges and increases ownership and commitment", "Because it is a legal requirement under the Equality Act 2010", "So that managers do not have to take responsibility for policy decisions"], correct: 1 },
    { q: "What does it mean to embed accountability into a policy?", options: ["Ensuring all staff read the policy once a year", "Defining who is responsible for enforcing the policy and including clear consequences for non-compliance", "Making the policy available on the intranet", "Having the CEO sign the policy"], correct: 1 },
    { q: "Why should policies be communicated in multiple formats?", options: ["To meet a legal requirement to translate all documents", "To ensure all employees, including those with disabilities and those who access information differently, are genuinely able to engage with the policy", "To reduce the need for manager training", "To increase the word count of the policy"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("policy-audit");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Inclusion-Ready Policies: A Practical Audit" subtitle="From paper commitments to lived experience" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Most organisations have policies. Far fewer have policies that actually work: that are written in plain language, that reflect the real experiences of all staff, that are acted on consistently, and that are reviewed as the world changes. A policy that exists but is not understood, implemented, or enforced is not a policy. It is a document. This lesson is about closing that gap.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to audit existing workplace policies for inclusion and to design or redesign policies that embed equity, are accessible to all staff, and are genuinely implemented rather than filed and forgotten.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Distinguish between equality-focused and equity-focused policy design",
        "Apply 14 practical principles for making policies more inclusive across language, design, accountability, and communication",
        "Identify the most common gaps between policy on paper and policy in practice",
        "Involve employees meaningfully in policy development and review",
        "Apply a practical audit framework to any existing workplace policy",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Policy Matters" /><SlideHeading title="The Gap Between Policy and Practice" /><BodyText>Policies set out the rules, rights, and responsibilities that govern how an organisation treats its people. When they are well designed and consistently implemented, they protect employees, build trust, and create the conditions for inclusion. When they are not, they create a credibility gap that actively undermines inclusion efforts.</BodyText><BulletList items={["A zero-tolerance harassment policy that is never enforced is not protective: it is a signal that the organisation does not mean what it says", "A flexible working policy that exists in theory but is informally penalised in practice is not inclusive: it excludes the people who most need it", "Policies written in jargon or legalese that most staff cannot meaningfully understand do not deliver the rights they describe", "The legal framework: the Equality Act 2010, the Public Sector Equality Duty, and the Worker Protection (Amendment of Equality Act) Act 2023 all create obligations that policies must reflect and deliver"]} /><KeyReminder text="A policy is only as good as its implementation. Paper inclusion is not inclusion." /></div>,

    <div key="s3"><SectionLabel text="Principles 1 to 3" /><SlideHeading title="Language, Equity, and Intersectionality" />
      <TipCard number="1" title="Use clear, accessible language" body="Avoid jargon and acronyms. Policies written in plain language ensure that everyone can understand their rights and responsibilities. If only those with a law degree can parse a policy, it is not delivering inclusion." />
      <TipCard number="2" title="Centre equity, not just equality" body="Provide resources, support, and opportunities tailored to individual needs. Equity-focused policies recognise systemic barriers and actively work to level the playing field. Treating everyone identically regardless of their starting point is not fairness." />
      <TipCard number="3" title="Include intersectional perspectives" body="Consider overlapping identities: race, gender, disability, class, sexuality, and more. Policies that address one dimension of identity at a time miss the complexity of lived experience and create one-size-fits-all solutions that fit no one well." />
      <ReflectionBox prompt="Take a policy your organisation uses. Could a new employee with no prior knowledge of the organisation understand their rights and responsibilities from reading it?" /></div>,

    <div key="s4"><SectionLabel text="Principles 4 to 6" /><SlideHeading title="Engagement, Barriers, and Action" />
      <TipCard number="4" title="Engage employees in policy development" body="Co-create policies with diverse teams or employee networks. Involving staff in policy design ensures the policy addresses real challenges, increases ownership, and surfaces barriers that those writing the policy from the top may never have experienced." />
      <TipCard number="5" title="Address structural barriers" body="Focus on systemic issues such as access, workload distribution, and structural bias rather than individual behaviour alone. Policies that treat inclusion as a personal responsibility without addressing structural conditions produce polite compliance, not change." />
      <TipCard number="6" title="Make policies actionable" body="Include specific actions, responsibilities, and measurable outcomes. A policy that states a value without describing what it looks like in practice leaves implementation entirely to individual managers, which guarantees inconsistency." />
    </div>,

    <div key="s5"><SectionLabel text="Principles 7 to 9" /><SlideHeading title="Reporting, Review, and Accessibility" />
      <TipCard number="7" title="Provide clear reporting and support mechanisms" body="Explain how to safely raise concerns and what support is available. Employees who cannot see a clear, safe route for raising concerns will not use one, even when they need to. Accessible reporting structures are central to psychological safety." />
      <TipCard number="8" title="Ensure accessibility for all" body="Consider physical, digital, and communication accessibility. Policies should be available in formats that work for employees with disabilities, those who speak English as an additional language, and those who access information differently." />
      <TipCard number="9" title="Review and update regularly" body="Conduct annual reviews to keep policies relevant. Legislation changes, best practice evolves, and organisational priorities shift. A policy written five years ago and not reviewed since is very likely to be out of date in ways that create both legal and cultural risk." />
      <ReflectionBox prompt="When did each of your core policies last have a substantive review? Who was involved, and were employees from different backgrounds and levels included?" /></div>,

    <div key="s6"><SectionLabel text="Principles 10 to 12" /><SlideHeading title="Accountability, Accessibility, and Communication" />
      <TipCard number="10" title="Embed accountability" body="Define who is responsible for enforcing the policy and include consequences for non-compliance. Without named accountability and consistent enforcement, policies are suggestions. Clear accountability ensures policies are taken seriously at every level of the organisation." />
      <TipCard number="11" title="Link policies to culture and practice" body="Policies should reinforce your organisation's culture and values. A policy that contradicts lived experience undermines trust in both the policy and the stated values. Embedding policies into daily practice encourages staff to live the values rather than simply be aware of them." />
      <TipCard number="12" title="Communicate clearly and often" body="Share policies in multiple formats: emails, intranet, workshops, team meetings. One-off communication at launch does not sustain awareness. Employees should be able to locate and understand a policy without searching or asking a colleague." />
    </div>,

    <div key="s7"><SectionLabel text="Principles 13 and 14" /><SlideHeading title="Psychological Safety and Measuring Impact" />
      <TipCard number="13" title="Promote psychological safety" body="Ensure policies create environments where staff feel safe to speak up and challenge bias. A harassment policy that staff do not trust to protect them does not promote psychological safety, regardless of its wording. The policy design and the culture around its enforcement both matter." />
      <TipCard number="14" title="Measure impact" body="Collect and analyse data to see how policies affect employees across identity groups. A policy's impact on different demographic groups may differ significantly from its intended effect. Measuring impact by demographic allows organisations to identify gaps, celebrate successes, and refine policies based on evidence rather than assumption." />
      <KeyReminder text="Fourteen principles sounds like a lot. The test for each one is simple: does this policy work for the people it is meant to protect, or only for the people who were assumed when writing it?" /></div>,

    <div key="s8"><SectionLabel text="The Audit Framework" /><SlideHeading title="Auditing Your Policies for Inclusion" /><BodyText>Use this framework when reviewing any existing policy. Each question corresponds to one or more of the 14 principles covered in this lesson.</BodyText><BulletList items={["Language: Is this policy written in plain English, free of jargon and unexplained acronyms?", "Equity: Does this policy recognise that different employees may need different forms of support?", "Intersectionality: Does this policy account for employees whose experience sits at the intersection of multiple characteristics?", "Engagement: Were employees with lived experience of the issues this policy addresses involved in writing or reviewing it?", "Structural barriers: Does this policy address the systems and structures that create the problem, not just the individual behaviour?", "Actionability: Does this policy describe what it looks like in practice, not just what the organisation believes?", "Reporting: Is there a clear, safe, and accessible route for raising concerns under this policy?"]} /></div>,

    <div key="s9"><SectionLabel text="The Audit Framework Continued" /><SlideHeading title="Auditing Your Policies: Further Questions" /><BulletList items={["Accessibility: Is this policy available in formats that work for all employees, including those with disabilities or language needs?", "Review: Does this policy have a scheduled review date and a named reviewer?", "Accountability: Does this policy name who is responsible for enforcement and what happens when it is not followed?", "Culture link: Does the lived culture of the organisation reflect what this policy describes?", "Communication: Do all employees know this policy exists and know how to find and understand it?", "Psychological safety: Would an employee in a difficult situation trust this policy to protect them?", "Measurement: Is there a plan to collect data on how this policy is working and for whom?"]} /><ReflectionBox prompt="Choose one policy in your organisation. Work through these 14 questions. Where are the gaps?" /></div>,

    <div key="s10"><SectionLabel text="Common Failures" /><SlideHeading title="The Most Common Policy Inclusion Failures" /><BodyText>In practice, the same gaps appear repeatedly when policies are audited for inclusion. Understanding the most common failures helps you prioritise your audit and redesign effort.</BodyText><BulletList items={["Language that excludes: policies written in complex legal language that most staff cannot interpret in relation to their own situation", "Equality without equity: policies that treat everyone identically regardless of their circumstances, producing formally equal but substantively unequal outcomes", "No engagement: policies written entirely by HR or legal teams with no input from the employees they govern", "Accountability gaps: policies that describe desired behaviour without naming who enforces it or what happens when it is not followed", "Enforcement inconsistency: the same policy applied differently depending on team, manager, or seniority of the person involved", "Communication failure: policies that staff cannot locate, have never been told about, or have only ever encountered as a onboarding form to sign"]} /></div>,

    <div key="s11"><SectionLabel text="The Legal Framework" /><SlideHeading title="Policies and the Law" /><BodyText>Inclusive policy design is not only good practice. Several legal frameworks create obligations that policies must reflect and deliver.</BodyText><BulletList items={["The Equality Act 2010: the foundational legislation protecting nine characteristics from discrimination. Policies must not directly or indirectly discriminate, and must support the duty to make reasonable adjustments for disabled employees", "The Public Sector Equality Duty (PSED): public bodies must have due regard to eliminating discrimination, advancing equality, and fostering good relations. Policies are a key mechanism for discharging this duty", "The Worker Protection (Amendment of Equality Act 2010) Act 2023: imposes a proactive duty on employers to prevent sexual harassment, which must be embedded in policy and supported by training and clear reporting routes", "Relevant standards: PAS 1948 (BSI Code of Practice for inclusive workplaces) and BS ISO 30415:2021 (international human resource management standard for diversity and inclusion) provide frameworks for embedding inclusive policy design"]} /><KeyReminder text="Legal compliance is the floor, not the ceiling. The question is not only whether a policy is lawful, but whether it actually works for the people it is meant to serve." /></div>,

    <div key="s12">
      <SectionLabel text="Check Your Understanding" /><SlideHeading title="Knowledge Check" />
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
    </div>,

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Inclusion-Ready Policies: A Practical Audit" /><BulletList items={["A policy that exists but is not understood, implemented, or enforced is not inclusion: it is a document", "Equity-focused policy design recognises that people have different starting points and need different forms of support to access the same outcomes", "Employee involvement in policy design is not optional: those with lived experience of the issues a policy governs must help shape it", "Accountability must be named: who enforces the policy, and what happens when it is not followed, determines whether it is real", "Legal compliance is the floor: the Equality Act 2010, PSED, and the Worker Protection Act 2023 set minimum obligations, not best practice"]} /><ReflectionBox prompt="Which of your organisation's policies most urgently needs an inclusion audit? Who would you involve, and what would you do with the findings?" subPrompts={["Is there a policy your staff know exists but do not understand?", "Is there a policy that is applied differently depending on the team or manager?", "Is there a policy that was last reviewed before 2023, when the Worker Protection Act came into force?"]} /><KeyReminder text="Policies set the rules of the game. Inclusive policies set rules that work for everyone, not only for those who were assumed when the rules were written." /></div>,
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
