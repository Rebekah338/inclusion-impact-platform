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
function BodyText({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: small ? "0.9rem" : "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>{children}</p>;
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.75rem" }}>{text}</p>;
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
function PromptCard({ prompt, examples }: { prompt: string; examples: string[] }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>{prompt}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{examples.map((e, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", fontStyle: "italic", marginBottom: "0.3rem", lineHeight: 1.5 }}>{e}</li>)}</ul>
    </div>
  );
}

export default function StakeholderEngagementLesson() {
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
    { q: "Why should values alignment be explored at the start of a client or stakeholder relationship rather than assumed?", options: ["Because it is a legal requirement under the Equality Act 2010", "Because values misalignment only becomes visible under pressure, and discovering it mid-project is far more costly than surfacing it at the outset", "Because it makes the briefing document easier to write", "Because it ensures the client's budget expectations are realistic"], correct: 1 },
    { q: "What is the purpose of agreeing escalation routes early in a stakeholder relationship?", options: ["To satisfy internal HR reporting requirements", "To ensure that when concerns are raised, there is a clear, agreed process for addressing them rather than ambiguity about who is responsible and how quickly action should follow", "To give the most senior person final veto on all decisions", "To reduce the number of meetings needed during delivery"], correct: 1 },
    { q: "What does meaningful consultation with affected communities require, beyond simply asking for input?", options: ["That feedback is collected anonymously at all times", "That input is collected before the project begins", "That consultation happens at the right moment, that communities are told how their feedback will be used, and that insights genuinely influence decisions rather than being noted and set aside", "That at least three community representatives are present at every meeting"], correct: 2 },
    { q: "Why is it important to map informal influencers as well as formal decision-makers during stakeholder analysis?", options: ["Because informal influencers are often more senior than formal decision-makers", "Because people with informal influence can shape decisions, raise or suppress concerns, and carry reputational risk even when they have no official authority, and leaving them unmapped creates blind spots", "Because contracts can only be signed by informal influencers in some jurisdictions", "Because mapping informal influencers satisfies the PSED reporting requirement"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("stakeholder-engagement");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Inclusive Stakeholder Engagement" subtitle="Values-led briefing and onboarding for confident, ethical partnerships" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>The way you begin a client or stakeholder relationship determines almost everything that follows. When inclusion, values, and accountability are surfaced early, they become part of how the partnership works. When they are left until a problem forces them onto the agenda, they become sources of conflict and reputational risk. Inclusive onboarding and briefing is not additional process; it is better process.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to conduct inclusive, values-led client and stakeholder onboarding and briefing that surfaces inclusion risks early, sets clear expectations, and creates the foundation for ethical, accountable partnerships.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why values alignment must be explored early and how to do it in practice",
        "Set expectations around accessibility, representation, and inclusive delivery from the outset",
        "Map decision-makers and informal influencers to understand where accountability lies",
        "Agree escalation routes and review processes before they are needed",
        "Identify and name reputational, ethical, and inclusion risks at the briefing stage",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Values Alignment" /><SlideHeading title="Why Values Alignment Comes First" /><BodyText>Values misalignment is rarely visible on day one. It shows up under pressure: when deadlines tighten, when feedback is difficult, when an inclusion concern is raised and the response reveals whether commitments are real or rhetorical. Surfacing alignment early is not idealistic; it is risk management.</BodyText><BulletList items={["Understand how the client defines responsible, ethical, or inclusive practice: their language matters. What they mean by inclusion shapes every expectation that follows", "Identify any stated organisational values and explore whether they guide real decisions or sit in a document that no one references under pressure", "Probe what happens when values and speed come into tension: this is where misalignment most often becomes visible", "Be honest about your own non-negotiables: inclusive engagement works both ways. A values-led practitioner should be clear about the principles they bring to the relationship, not only the ones they expect from others"]} /><ReflectionBox prompt="Think of a time you entered a client or stakeholder relationship without explicitly checking values alignment. At what point did misalignment become apparent, and what would earlier conversation have changed?" /></div>,

    <div key="s3"><SectionLabel text="Values Alignment" /><SlideHeading title="Conversation Prompts: Values" subtitle="Questions to open values conversations with clients and stakeholders" /><BodyText>Use these prompts as a guide, not a script. The goal is to hear how your client answers, not to collect a checkbox response. A confident, specific answer and a vague one both tell you something important.</BodyText><PromptCard prompt="Opening the values conversation" examples={['"Are there any principles you expect partners to uphold?"', '"How do you typically respond when risks or concerns are raised?"', '"What does doing the right thing look like for you under pressure?"']} /><PromptCard prompt="Testing how values show up in practice" examples={['"Can you give me an example of a time your values guided a difficult decision?"', '"When speed and care come into tension, what does your organisation usually prioritise?"', '"How do you want me to raise it if I believe something is not aligned with your stated values?"']} /><KeyReminder text="The most revealing answers often come not from what clients say their values are, but from how they respond when asked what they do when holding those values becomes inconvenient." /></div>,

    <div key="s4"><SectionLabel text="Accessibility and Representation" /><SlideHeading title="Setting Expectations on Accessibility and Representation" /><BodyText>Inclusive delivery does not happen by default. It requires explicit conversation about who needs to access what you are creating, and what it means for the design, budget, and timeline of the work.</BodyText><BulletList items={["Agree accessibility standards for digital, physical, and communication outputs at the briefing stage: retrofitting accessibility is more expensive and less effective than designing for it from the start", "Establish representation expectations in content, products, or services: whose voices, images, and experiences are expected to be reflected, and in what way", "Be honest about budget and time requirements for inclusive delivery: accessible and representative work requires resource. Naming this early prevents it being cut as a luxury when costs are reviewed", "Identify the audiences that must not be excluded and why: this is often the sharpest way to surface where accessibility investment is genuinely needed"]} /><ReflectionBox prompt="In your most recent piece of work for a client or stakeholder, what accessibility and representation expectations were discussed at the outset? What was left unaddressed until later?" /></div>,

    <div key="s5"><SectionLabel text="Accessibility and Representation" /><SlideHeading title="Conversation Prompts: Accessibility and Representation" /><BodyText>These questions are designed to surface assumptions, not to audit your client. The best outcome is a shared understanding of what inclusive delivery requires before the work begins.</BodyText><PromptCard prompt="Identifying who needs to access the work" examples={['"Who needs to be able to access this, and how?"', '"Are there any audiences you are particularly keen not to exclude?"', '"What accessibility considerations should we plan for from the start?"']} /><PromptCard prompt="Representation in content and outputs" examples={['"Whose voices or perspectives should be reflected in this work?"', '"Are there communities whose experiences are central to what you are trying to achieve?"', '"How will we know if the representation in this work is accurate and respectful?"']} /></div>,

    <div key="s6"><SectionLabel text="Decision-Making" /><SlideHeading title="Mapping Decision-Makers and Influencers" /><BodyText>In any organisation, the people who sign things off and the people who shape decisions are rarely the same. Inclusive stakeholder engagement requires mapping both, because informal influence is where inclusion concerns are often raised, stalled, or quietly dropped.</BodyText><BulletList items={["Identify formal decision-makers: who ultimately signs this off and what authority they hold", "Map informal influencers: who shapes thinking, advises on decisions, or holds relationships that affect outcomes, even without a formal title or sign-off role", "Understand veto power: who can pause, redirect, or block the work, and on what grounds", "Identify who carries reputational risk: inclusion failures rarely affect decision-makers in isolation. Understanding who is exposed if things go wrong shapes how concerns should be raised and addressed"]} /><PromptCard prompt="Mapping the decision-making landscape" examples={['"Who ultimately signs this off?"', '"Who else influences the final decision, even informally?"', '"Who should be involved if risks or concerns are identified mid-project?"']} /></div>,

    <div key="s7"><SectionLabel text="Decision-Making" /><SlideHeading title="Why Informal Influence Matters for Inclusion" /><BodyText>Formal decision-making structures often overstate clarity and understate complexity. In practice, inclusion concerns are shaped, filtered, and sometimes silenced before they reach the people with formal authority.</BodyText><BulletList items={["Gatekeepers may filter out concerns before they reach decision-makers: understanding who controls access to decision-making power is as important as knowing who has it", "Informal influencers often reflect the dominant culture of an organisation: mapping them reveals whose perspective is structurally privileged in decision-making", "Reputational risk is distributed unevenly: those least powerful in a hierarchy often bear the most reputational risk when inclusion failures occur, while those with the most formal authority are most insulated from consequences", "Knowing who carries informal influence allows you to build relationships with allies, not only with authority figures"]} /><ReflectionBox prompt="In a client or stakeholder relationship you have held, who were the informal influencers that shaped the work? Were they part of the formal conversations, or were their views mediated by others?" /></div>,

    <div key="s8"><SectionLabel text="Escalation and Accountability" /><SlideHeading title="Agreeing Escalation Routes" /><BodyText>Escalation routes should be agreed before they are needed. When a concern arises mid-project, the worst moment to discover there is no agreed process for raising it is when the concern is live and time-sensitive.</BodyText><BulletList items={["Establish who concerns should go to and at what level: not every concern needs to reach the most senior person; having a proportionate escalation structure prevents both under-reaction and escalation fatigue", "Agree how quickly issues need to be addressed: a concern about a harmful output requires a different response time to a concern about a communication preference", "Clarify what happens if there is disagreement about how a concern is characterised or resolved: this is the point at which values alignment matters most", "Name who has final accountability for inclusion-related decisions: this is not always the most senior person. Explicit accountability is clearer than assumed accountability"]} /><PromptCard prompt="Establishing escalation and accountability" examples={['"If we flag a concern, who should it go to?"', '"What does a pause or review process look like for this project?"', '"Who has final accountability for decisions that affect inclusion?"']} /></div>,

    <div key="s9"><SectionLabel text="Escalation and Accountability" /><SlideHeading title="Accountability, Review, and Exit" /><BodyText>Accountability is not a single conversation at the start of a relationship. It needs to be revisited as the work evolves, and it needs to include a clear understanding of what happens if the relationship no longer serves the inclusion goals that started it.</BodyText><BulletList items={["Agree who is accountable if inclusion concerns are upheld or ignored: accountability for inaction is as important as accountability for harm", "Establish how decisions will be reviewed if new risks emerge: inclusion risks are not static, and a framework agreed at the outset needs to be revisited as context changes", "Name what a respectful exit looks like if values misalignment becomes significant: an exit clause protects both parties and makes clear that inclusion commitments are not simply aspirational"]} /><PromptCard prompt="Agreeing accountability and exit" examples={['"If new inclusion risks emerge mid-project, how would we want to handle them?"', '"How do we want to respond if public or community feedback raises concerns we had not anticipated?"', '"What does a respectful exit look like if alignment breaks down?"']} /><KeyReminder text="The ability to exit a relationship that compromises your inclusion values is not a sign of conflict; it is a sign of professional integrity. Name it early." /></div>,

    <div key="s10"><SectionLabel text="Consultation" /><SlideHeading title="Meaningful Consultation with Affected Communities" /><BodyText>Consultation that happens too late, or whose results are noted but not acted on, is not meaningful engagement. It is the performance of engagement, and communities with experience of being consulted and then ignored will recognise it immediately.</BodyText><BulletList items={["Establish whether lived experience input is expected as part of the work: this should be a question, not an assumption in either direction", "Agree when consultation should happen: early consultation that shapes the work is fundamentally different from late-stage consultation that validates decisions already made", "Be explicit about how feedback will be used: communities should know in advance how their input will influence decisions and what will happen to it if the work does not proceed as planned", "Do not treat consultation as a box to tick: meaningful involvement requires time, resource, genuine influence over outcomes, and a relationship of respect that extends beyond the period of the project"]} /><PromptCard prompt="Designing meaningful consultation" examples={['"Are there communities or users we should consult as part of this work?"', '"How will insights from consultation influence the decisions we make?"', '"What does meaningful involvement look like for the communities you are expecting to engage?"']} /></div>,

    <div key="s11"><SectionLabel text="Risk" /><SlideHeading title="Identifying Reputational and Ethical Risks" /><BodyText>Reputational and ethical risks are most usefully addressed at the briefing stage, when they can shape the design of the work. Surfacing them mid-project or after delivery is more difficult, more expensive, and more damaging.</BodyText><BulletList items={["Known sensitivities or past controversies: organisations carry histories that affect how their work will be received. Understanding these before starting the work is essential to designing it appropriately", "Public-facing risks: some work creates public exposure that the client may not have fully considered. The inclusion implications of that exposure are part of the briefing conversation", "Regulatory and ethical considerations: PSED requirements, sector-specific standards, and ethical codes that apply to the work should be named and understood by both parties from the outset", "The intersection of reputational and inclusion risk: inclusion failures are increasingly high-profile. A briefing process that treats inclusion as separate from reputational risk is not meeting the moment"]} /><PromptCard prompt="Naming risks at the outset" examples={['"Are there any sensitivities we should be aware of before we begin?"', '"How would you want to handle public criticism if the work is challenged?"', '"Where do you see the biggest reputational or ethical risks in this project?"']} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Inclusive Stakeholder Engagement" /><BulletList items={["Values alignment must be explored, not assumed: the right time to discover misalignment is at the outset, not under pressure mid-project when the cost of addressing it is highest", "Accessibility and representation are delivery requirements, not optional additions: naming them at briefing stage makes them part of the design rather than a retrofit", "Formal decision-makers and informal influencers are both part of the map: understanding where decisions are actually shaped gives you the context you need to raise concerns effectively", "Escalation routes and accountability structures should be agreed before they are needed: a concern raised without a process for addressing it is a concern that is likely to be absorbed rather than resolved", "Meaningful consultation requires genuine influence over outcomes: communities that are asked for input and then disregarded are not partners; they are props"]} /><ReflectionBox prompt="Review your current client or stakeholder relationships. Which of the seven areas covered in this lesson has had the least explicit attention? What would you do differently at the next onboarding or briefing?" subPrompts={["Values alignment", "Accessibility and representation", "Decision-maker mapping", "Escalation routes", "Accountability and exit boundaries", "Consultation expectations", "Reputational and ethical risk"]} /><KeyReminder text="Inclusive stakeholder engagement is not a checklist run through once. It is a way of holding the relationship: attentive, honest, and willing to name what others might prefer to leave unspoken." /></div>,
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
