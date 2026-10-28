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

export default function BusinessCaseInclusionLesson() {
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
    { q: "What is the main limitation of citing research headlines such as 'diverse companies are 35% more likely to outperform' in a business case?", options: ["The research is unreliable and should not be quoted", "Correlation is not causation, the finding may reflect that successful companies have the resource to invest in inclusion, not that inclusion produced the success", "The finding only applies to very large organisations", "The research was conducted in the US and does not apply in the UK"], correct: 1 },
    { q: "Which of the five business levers is most relevant to an organisation experiencing difficulty attracting candidates from particular groups?", options: ["Risk and compliance", "Innovation and problem-solving", "Talent and retention", "Client and market insight"], correct: 2 },
    { q: "What is 'reputational and legal risk' as a business lever for inclusion?", options: ["The risk that competitors will use better inclusion practices to attract talent", "The risk of tribunal claims, regulatory action, or reputational damage from discriminatory practices or a failure to meet EDI obligations", "The risk that inclusion initiatives will be perceived negatively by existing staff", "The risk of public criticism from campaigning organisations"], correct: 1 },
    { q: "When building the business case for a specific audience, why does knowing who holds the most risk matter?", options: ["It determines which research to cite", "It identifies the person most likely to approve the budget", "It helps you frame the case in terms of what that individual or team stands to lose if nothing changes, making the cost of inaction concrete", "It tells you how technically sophisticated your language needs to be"], correct: 2 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("business-case-inclusion");
  }

  const slides = [
    <SlideShell key="s1">
      <SlideHeading title="Making the Business Case for Inclusion" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>You should not need a business case to treat people fairly. But you will often need one to get the resource, the leadership attention, and the sustained commitment that meaningful inclusion requires. Understanding how to make that case is a practitioner skill, not a compromise of your values.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Build a compelling, evidence-based business case for inclusion that speaks to your specific audience's priorities and concerns.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Explain why the business case for inclusion matters and what its limitations are", "Name the five main business levers and describe how to apply each one", "Frame the cost of inaction for a specific organisational context", "Structure a business case using the power of three questions", "Respond to the six most common objections you are likely to encounter"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    <SlideShell key="s2">
      <SlideHeading title="Why the Business Case Matters" subtitle="And what it cannot do" />
      <BodyText>The business case for inclusion serves a specific purpose: securing resource, leadership attention, and sustained commitment from people who make decisions on commercial grounds. It is not a substitute for the ethical case, and it is not a tool for persuading people to care about human dignity.</BodyText>
      <BodyText>Where the business case is most useful: when proposing a new initiative or programme; when defending existing resource against cuts; when seeking senior sponsorship; when influencing stakeholders who are not personally persuaded by the values argument.</BodyText>
      <SectionLabel text="The limitations to hold alongside the business case:" />
      <BulletList items={[
        "The business case is contingent: it works while inclusion is commercially advantageous. The values case is unconditional",
        "Over-reliance on the business case can lead to inclusion being treated as a commodity rather than a right",
        "The business case is strongest for organisations with the resources and appetite to act on it: it can inadvertently reinforce inequality between well-resourced and under-resourced organisations",
      ]} />
      <KeyReminder text="Know both arguments. Lead with the one your audience is most likely to hear. But never let the business case crowd out the ethical one entirely." />
    </SlideShell>,

    <SlideShell key="s3">
      <SlideHeading title="The Evidence Base" subtitle="What the research actually shows" />
      <BodyText>Decades of research from McKinsey, Deloitte, CIPD, and others point consistently in the same direction: diverse and inclusive organisations outperform their peers across a range of metrics. But using this evidence well requires understanding its nuances.</BodyText>
      <SectionLabel text="What the research shows:" />
      <BulletList items={[
        "McKinsey's Diversity Wins (2020): companies in the top quartile for gender diversity were 25% more likely to achieve above-average profitability; for ethnic diversity, 36%",
        "Deloitte: inclusive teams outperform their peers by 80% in team-based assessments",
        "CIPD: organisations with strong inclusion practices report higher employee engagement, lower absence, and better retention",
        "BCG: companies with above-average diversity on management teams report innovation revenue 19 percentage points higher than companies with below-average diversity on management teams",
      ]} />
      <SectionLabel text="How to use this evidence without overstating it:" />
      <BulletList items={[
        "These findings show correlation, not causation: healthy organisations invest in inclusion; that does not prove inclusion caused the performance",
        "Lead with the headline, acknowledge the nuance: 'Research consistently links greater diversity with better performance, though the relationship is complex'",
        "Pair the research with your own organisation's data wherever possible: internal evidence is more persuasive than external headlines",
      ]} />
    </SlideShell>,

    <SlideShell key="s4">
      <SlideHeading title="The Five Business Levers" subtitle="Where inclusion connects to what your organisation cares about" />
      <BodyText>Every organisation has priorities. The skill of making the business case is connecting inclusion to the ones that matter most to your audience. Five levers apply across most organisations.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", title: "Talent and retention", detail: "Inclusive organisations attract a wider talent pool, retain people for longer, and lose less to absence and disengagement. The cost of replacing a mid-level employee is typically 50 to 200 percent of their annual salary." },
          { n: "2", title: "Innovation and problem-solving", detail: "Diverse teams generate more varied perspectives, challenge assumptions more effectively, and are less susceptible to groupthink. The research on diverse teams and innovation is among the strongest in the field." },
          { n: "3", title: "Client and market insight", detail: "Teams that reflect their clients understand them better. Increasingly, clients and commissioners are asking for evidence of diversity and inclusion as part of procurement and tendering processes." },
          { n: "4", title: "Reputation and employer brand", detail: "How an organisation handles inclusion is increasingly visible. Glassdoor reviews, LinkedIn posts, and public reporting all shape reputation in ways that affect recruitment, client relationships, and stakeholder trust." },
          { n: "5", title: "Risk and compliance", detail: "Legal obligations under the Equality Act, public sector duties, and growing regulatory and reporting requirements represent real financial and reputational risk for organisations that do not take inclusion seriously." },
        ].map(({ n, title, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.1rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.2rem" }}>{title}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
    </SlideShell>,

    <SlideShell key="s5">
      <SlideHeading title="Activity: Match Initiative to Lever" subtitle="Write down your answers before moving on" />
      <BodyText>For each initiative or piece of evidence below, identify which of the five business levers it most directly supports. Some may connect to more than one.</BodyText>
      <ActivityBox title="Initiatives">
        <BulletList items={[
          "An analysis showing that women leave the organisation at twice the rate of men at mid-management level",
          "Data showing that your largest client has added diversity requirements to their supplier scorecard",
          "Evidence that your interview process disadvantages candidates from state school backgrounds",
          "A tribunal claim arising from a disability discrimination complaint that was not resolved internally",
          "Research showing that your product development team has a demographic profile significantly narrower than your customer base",
          "A survey showing that 40% of employees from ethnic minority backgrounds do not feel comfortable raising concerns with their line manager",
        ]} />
      </ActivityBox>
      <ReflectionBox prompt="Which lever is most persuasive in your organisation's current context? Which is most underused?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s6">
      <SlideHeading title="The Cost of Inaction" subtitle="Framing what doing nothing actually costs" />
      <BodyText>The business case often focuses on what investment in inclusion will gain. Equally powerful is the cost of inaction: what is the organisation already paying for the absence of inclusion, even if it has not yet named it?</BodyText>
      <SectionLabel text="Making the cost of inaction concrete:" />
      <BulletList items={[
        "Turnover: if a group is leaving at a higher rate, calculate the actual cost. Multiply leavers by the replacement cost for that level. Show the number.",
        "Absenteeism: if engagement data shows a gap between groups, link it to absence rates and then to cost",
        "Missed opportunity: if your team's demographics do not reflect your client base, frame what insight you may be missing in terms your audience can value",
        "Reputational damage already occurring: a Glassdoor review, a complaint that reached the press, a tender lost partly on EDI grounds",
        "Legal exposure: quantify the potential cost of an employment tribunal claim, including management time, legal fees, and the value of any potential settlement or award",
      ]} />
      <ReflectionBox subPrompts={["What is the most concrete cost of inaction in your organisation right now?", "Who in your organisation is currently bearing that cost? Do they know it?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s7">
      <SlideHeading title="Building the Case" subtitle="Structure and substance" />
      <BodyText>A business case for inclusion follows the same structure as any good business case: a clear problem statement, evidence, a proposed solution, expected outcomes, resource required, and how success will be measured.</BodyText>
      <SectionLabel text="A structure that works:" />
      <BulletList items={[
        "The problem: what specific disadvantage or gap are you addressing? Use data wherever possible",
        "The impact: what does this gap cost the organisation or its people, now and in the future?",
        "The proposed intervention: what specifically are you proposing, and why this rather than something else?",
        "The expected outcome: what will change as a result, and how will you know?",
        "The resource required: what will it cost in time, money, and leadership attention?",
        "The risk of not acting: what happens if you do nothing?",
      ]} />
      <KeyReminder text="A business case should be no longer than it needs to be to make the decision. Most decision-makers will read an executive summary; the detail is for due diligence, not for persuasion." />
    </SlideShell>,

    <SlideShell key="s8">
      <SlideHeading title="Knowing Your Audience" subtitle="Tailoring the case to who holds the decision" />
      <BodyText>The strongest business case in the world will not land if it is pitched to the wrong person or in the wrong terms. Understanding who your audience is, what they care about, and what they are responsible for is essential.</BodyText>
      <SectionLabel text="Audience-specific framing:" />
      <BulletList items={[
        "Finance and CFO: lead with cost, risk, and return on investment. Show the number. Be specific about resource requested and payback.",
        "HR Director: frame in terms of talent pipeline, retention, and employer brand. Connect to workforce planning.",
        "CEO and board: frame in terms of strategic risk, reputation, and long-term sustainability. Use external benchmarks and peer comparisons.",
        "Line managers: frame in terms of team performance, reduced friction, and easier conversations. Keep it practical.",
        "Clients and commissioners: frame in terms of shared values, better service, and contract requirements.",
      ]} />
      <ReflectionBox prompt="Think of a specific person or group you need to persuade on an inclusion issue. What do they care most about? Which business lever speaks most directly to their priorities?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s9">
      <SlideHeading title="The Power of Three" subtitle="Three questions before finalising any business case" />
      <BodyText>Before you present a business case for inclusion, test it against three questions. These are not a checklist: they are a lens for ensuring that the case you have built is specific enough to be persuasive rather than general enough to be dismissed.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "What is the specific cost of the problem?", detail: "Not 'diverse companies perform better.' What is the cost, in this organisation, of the specific problem you are addressing? A number is far more persuasive than a principle." },
          { n: "2", q: "Who holds the most risk if nothing changes?", detail: "Identify the person or team most exposed to the cost of inaction. Frame the case in terms of what they stand to lose. Risk gets attention in a way that opportunity sometimes does not." },
          { n: "3", q: "What does success look like in measurable terms?", detail: "A business case without a measurable outcome is a request for resource with no accountability. Define what you are aiming to change, by when, and how you will know." },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
      <ReflectionBox prompt="Apply these three questions to a business case you are currently building or have recently presented. What would you change?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s10">
      <SlideHeading title="Handling Objections" subtitle="The six you will encounter and how to respond" />
      <BulletList items={[
        "'We already have policies in place.' Response: policies set a floor, not a ceiling. The question is not whether we have them, but whether they are working. What does the data show?",
        "'We can't afford it right now.' Response: can we afford not to? What is the current cost of the problem we are not addressing? Some of the most impactful interventions cost little.",
        "'We should hire the best person regardless of background.' Response: agree entirely. The question is whether our current process reliably identifies the best person, or whether it favours the most familiar profile.",
        "'This is just ticking boxes.' Response: I understand that concern. What I'm proposing is not a reporting exercise: it is a change to how we do things, with specific outcomes we can measure.",
        "'Our workforce is already diverse.' Response: diversity in headcount is one measure. Inclusion is about whether people with different backgrounds thrive equally once they are here. What do the progression, pay, and experience data show?",
        "'This is not the right time.' Response: when would be? What would need to be true for this to become a priority? And what is the cost of each month we do not act?",
      ]} />
    </SlideShell>,

    <SlideShell key="s11">
      <SlideHeading title="Activity: Draft Your Opening" subtitle="Write before moving to the quiz" />
      <BodyText>The opening of a business case sets the frame for everything that follows. A strong opening names the problem, makes it concrete, and signals why the audience should care. A weak opening leads with abstract principles and loses the room before it begins.</BodyText>
      <ActivityBox title="Draft your opening paragraph">
        <BodyText>Think of a specific inclusion initiative or issue you are currently working on or interested in proposing. Draft an opening paragraph for a business case to your most important stakeholder.</BodyText>
        <BodyText>Your opening should: name the problem; show its cost or consequence; and tell the audience why they specifically should care about it.</BodyText>
        <BodyText>Write it now, before moving to the quiz. You can refine it after the lesson.</BodyText>
      </ActivityBox>
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
      <SlideHeading title="Key Takeaways" subtitle="Making the Business Case for Inclusion" />
      <BulletList items={[
        "The business case and the values case are complementary, not alternatives: use the business case to secure resource and attention; hold the values case as the foundation that does not depend on commercial conditions",
        "The five business levers are talent and retention, innovation, client and market insight, reputation, and risk and compliance: identify which lever speaks most powerfully to your specific audience",
        "The cost of inaction is often as persuasive as the benefit of action: make it concrete, put a number on it, and identify who bears it",
        "Before presenting any business case, test it against three questions: what is the specific cost, who holds the most risk, and what does measurable success look like?",
        "The six most common objections can be anticipated and answered: prepare for them rather than being caught off guard",
        "The opening of a business case is its most important sentence: name the problem, make it concrete, and tell the audience why they should care",
      ]} />
      <ReflectionBox subPrompts={["Which of the five business levers is currently unused in how your organisation talks about inclusion?", "What is the most important business case you need to make in the next six months? What is your opening sentence?"]} />
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
