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
function StepCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "0.9rem", alignItems: "flex-start" }}>
      <div style={{ minWidth: "2rem", height: "2rem", background: "var(--sage-dark)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "var(--white)" }}>{number}</span>
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>{title}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.55 }}>{body}</p>
      </div>
    </div>
  );
}

export default function DecideInclusivelyLesson() {
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
    { q: "What is the first step in the inclusive decision-making framework?", options: ["Gather diverse perspectives from stakeholders", "Define the decision context: clarify the objective, identify stakeholders, and assess impact", "Co-create options with a diverse group", "Communicate the decision transparently"], correct: 1 },
    { q: "Why is intersectionality important in inclusive decision-making?", options: ["It ensures legal compliance with the Equality Act 2010", "It recognises that individuals may experience overlapping forms of disadvantage or privilege that compound each other's effects", "It simplifies stakeholder mapping by grouping people into categories", "It is a method for calculating the financial impact of decisions"], correct: 1 },
    { q: "A leader makes a decision and sends a single all-staff email explaining what was decided. What is missing from this process?", options: ["A formal legal impact assessment", "A channel for employees to ask questions, raise concerns, and provide feedback after the decision is communicated", "A separate email to senior leadership", "A detailed financial justification"], correct: 1 },
    { q: "What is the purpose of monitoring and adjusting after an inclusive decision has been implemented?", options: ["To demonstrate compliance with diversity reporting requirements", "To catch and address unintended disparities or barriers that the original decision did not anticipate", "To justify the original decision to those who disagreed", "To prepare for the next budget cycle"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("decide-inclusively");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Decide Inclusively: A Framework for Leaders" subtitle="Making decisions that are equitable, transparent, and informed" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Every decision a leader makes is a moment of inclusion or exclusion. The decision itself matters, but so does the process: who was consulted, whose data was used, whose impact was considered, how the rationale was communicated, and whether there was a genuine channel for challenge. An organisation that makes good decisions through a poor process is building a culture of distrust. One that makes imperfect decisions through a genuinely inclusive process builds accountability, trust, and continuous improvement.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you with a seven-stage inclusive decision-making framework and the skills to apply it, from defining context and gathering perspectives to co-creating options, communicating transparently, monitoring outcomes, and embedding inclusive practice into your organisation's culture.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Apply the seven stages of the inclusive decision-making framework to a real or hypothetical decision",
        "Identify who is affected by decisions and how to ensure their perspectives are meaningfully included",
        "Describe how to analyse data and feedback equitably, including through an intersectional lens",
        "Explain the components of transparent communication about decisions",
        "Apply monitoring and adjustment processes to assess the equity impact of decisions over time",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="The Framework" /><SlideHeading title="An Overview of the Seven Stages" /><BodyText>Inclusive decision-making is a structured process, not a set of good intentions. The framework has seven stages, each building on the last. This lesson covers each stage in depth.</BodyText>
      <StepCard number="1" title="Define the decision context" body="Clarify the objective, identify stakeholders, and assess potential impact on different groups before any other step." />
      <StepCard number="2" title="Gather diverse perspectives" body="Actively seek input from a wide range of voices through multiple accessible channels." />
      <StepCard number="3" title="Analyse data and feedback equitably" body="Look for patterns and disparities, apply an intersectional lens, and challenge assumptions." />
      <StepCard number="4" title="Co-create options" body="Develop solutions collaboratively with a diverse group and evaluate each through an equity lens." />
      <StepCard number="5" title="Make transparent decisions" body="Document rationale, communicate openly, and provide channels for feedback." />
      <StepCard number="6" title="Implement and monitor" body="Track outcomes, adjust as needed, and report progress." />
      <StepCard number="7" title="Build a culture of inclusive decision-making" body="Train leaders, embed in policy, and celebrate strong practice." />
    </div>,

    <div key="s3"><SectionLabel text="Stage 1" /><SlideHeading title="Define the Decision Context" /><BodyText>Before consulting anyone or generating options, clarity about the decision itself is essential. Decisions made without a clear purpose are shaped by defaults and assumptions rather than deliberate choice.</BodyText><BulletList items={["Clarify the decision: what is the objective and why is this decision needed now? Vague decision framing leads to vague solutions", "Identify stakeholders: who will be directly affected by this decision? Who will be indirectly affected? Include employees across levels, departments, and identities, not only senior or majority stakeholders", "Assess potential impact: consider the likely outcomes for different groups, particularly those historically marginalised or underrepresented. Impact assessment at this stage is not about having all the answers; it is about asking the right questions early", "Name your assumptions: before you begin gathering perspectives, name the assumptions you are already making about the decision. These are the first place to look for bias"]} /><ReflectionBox prompt="Think about a recent decision in your organisation. Was the objective clearly defined before the process began? Who was identified as a stakeholder, and who was missed?" /></div>,

    <div key="s4"><SectionLabel text="Stage 2" /><SlideHeading title="Gather Diverse Perspectives" /><BodyText>Perspectives that are not sought are not included. Active outreach to a range of voices is not optional in an inclusive process; it is the core of what makes the process different.</BodyText><BulletList items={["Engage stakeholders proactively: do not wait for people to come forward. Invite input from a wide range of voices, ensuring representation from diverse backgrounds including race, gender, disability, seniority, and contract type", "Use multiple channels: a single method of consultation excludes everyone who cannot access that method. Surveys, focus groups, workshops, and one-to-one discussions capture varied viewpoints and suit different communication preferences", "Ensure accessibility: information and participation methods must be accessible to all. Consider language, format, timing, and location. A consultation meeting held at 5pm on a Friday will not capture caregivers or those with health conditions", "Create safety for input: people will not share honest perspectives if they do not trust that doing so is safe. Anonymity options and clear assurances about how input will be used increase participation quality"]} /><KeyReminder text="Diverse perspectives are not a courtesy. They contain the information you cannot access from where you sit. The absence of certain voices from a consultation does not mean those people have nothing relevant to say." /></div>,

    <div key="s5"><SectionLabel text="Stage 3" /><SlideHeading title="Analyse Data and Feedback Equitably" /><BodyText>The quality of a decision is only as good as the quality of the analysis that informs it. Equitable analysis means actively looking for what you might not want to find.</BodyText><BulletList items={["Identify patterns and disparities: look for trends in feedback and data that may indicate unequal experiences or systemic barriers. A theme that appears in the responses of one demographic group and not others is significant data, not noise", "Consider intersectionality: individuals experience multiple overlapping identities, and the combination matters. A woman of colour in a junior role does not experience gender, race, and seniority as separate factors; they interact. Analysis that treats these dimensions separately misses the most important effects", "Challenge assumptions: ensure that personal biases or organisational norms do not dominate the interpretation of data. Ask yourself what the data would mean if you had no prior view of the question", "Include qualitative data: numbers tell part of the story. Quotes, stories, and described experiences capture what statistics cannot and often point to the mechanisms behind the numbers"]} /><ReflectionBox prompt="In your organisation, how is data about employee experience currently analysed? Is intersectionality applied? Who interprets the data and whose perspectives inform that interpretation?" /></div>,

    <div key="s6"><SectionLabel text="Stage 4" /><SlideHeading title="Co-Creating Options" /><BodyText>Options developed without the people they affect are more likely to contain the same blind spots as the problem they are designed to solve. Co-creation is not consultation; it is collaborative development.</BodyText><BulletList items={["Take a collaborative approach: develop potential solutions with input from a diverse group of stakeholders. This is distinct from presenting options and asking for feedback; co-creation involves people in the design of the options themselves", "Evaluate equity impact: for each option, assess how it supports fair opportunities and outcomes for all groups. Ask explicitly: does this option remove a barrier or create one? Does it benefit some groups at the expense of others?", "Prioritise fairness over majority preference: the most popular option is not always the most equitable one. Majority preferences often reflect the interests of the most represented group, which may not be the most affected group", "Be transparent about constraints: co-creation works best when stakeholders understand what is within scope and what is not. Hidden constraints that emerge after the process undermine trust in the whole approach"]} /></div>,

    <div key="s7"><SectionLabel text="Stage 5" /><SlideHeading title="Making Transparent Decisions" /><BodyText>How a decision is communicated is as important as the decision itself. Transparency builds trust, reduces rumour and speculation, and creates the conditions for genuine accountability.</BodyText><BulletList items={["Document the rationale: clearly outline how the decision was made, whose input was considered, and how equity was prioritised. This documentation serves both accountability and organisational learning", "Communicate openly: share the decision, the reasoning behind it, and its anticipated impacts with all stakeholders. Not just what was decided, but why, and what will happen next", "Acknowledge trade-offs honestly: most decisions involve trade-offs. A leader who communicates only the benefits of a decision is withholding information. Stakeholders who understand the trade-offs are better able to engage constructively with the outcome", "Provide channels for feedback after the decision: employees need to be able to ask questions, raise concerns, and flag issues they notice in implementation. A one-way communication with no response channel is not transparency; it is announcement"]} /><ReflectionBox prompt="Think about how decisions are typically communicated in your organisation. What information is included? What is left out? Who is able to ask questions or raise concerns?" /></div>,

    <div key="s8"><SectionLabel text="Stage 6" /><SlideHeading title="Implement and Monitor" /><BodyText>Implementation without monitoring assumes the decision worked as intended. Monitoring assumes it may not have, and builds in the capacity to respond.</BodyText><BulletList items={["Track outcomes across different groups: measure how the decision affects different groups and look specifically for unintended disparities or new barriers. Aggregate-level data hides group-level effects", "Adjust as needed: be willing to revisit and modify decisions based on feedback and observed outcomes. A decision that cannot be adjusted is not an inclusive decision; it is a fixed position dressed as a process", "Report progress internally: share results with staff to maintain accountability and build trust. Employees who see that outcomes are monitored and acted upon trust the process more than those who never hear what happened after a decision was made", "Set a review timeline at the point of decision: do not wait for problems to become visible before reviewing. Build in a structured review at three months, six months, or whatever interval is appropriate to the decision"]} /><KeyReminder text="Monitoring is not a sign that you got the decision wrong. It is a sign that you are taking responsibility for its effects." /></div>,

    <div key="s9"><SectionLabel text="Stage 7" /><SlideHeading title="Building a Culture of Inclusive Decision-Making" /><BodyText>Individual inclusive decisions are valuable. A culture of inclusive decision-making is transformative. Culture is built when the process is normalised, rewarded, and embedded rather than remaining exceptional.</BodyText><BulletList items={["Train leaders and managers: equip them with the skills to make decisions inclusively and to recognise where bias is entering their process. Training on its own is not sufficient, but it is necessary", "Embed in policies and procedures: inclusive decision-making should be a standard practice described in governance documents, not an ad hoc approach dependent on individual leaders' commitment", "Celebrate and recognise strong practice: acknowledge teams and leaders who demonstrate inclusive decision-making. Positive reinforcement shapes culture more reliably than sanction alone", "Review your own process: use the framework as a reflective tool for existing processes as well as new ones. Where in your current decision-making are diverse perspectives absent? Where is monitoring weak?"]} /><ReflectionBox prompt="Think about a decision-making process in your organisation. Which of the seven stages is currently weakest? What would need to change to strengthen it?" /></div>,

    <div key="s10"><SectionLabel text="Barriers to Inclusive Decisions" /><SlideHeading title="What Gets in the Way" /><BodyText>Understanding the common barriers to inclusive decision-making helps leaders identify where their own processes are most at risk.</BodyText><BulletList items={["Time pressure: decisions made quickly under pressure default to familiar patterns and existing power structures. Where speed is unavoidable, identify the most important stage to preserve and protect it", "Groupthink: when a group is homogeneous in background or perspective, it reaches consensus quickly and misses the blind spots that diverse input would surface. The comfort of agreement is not a reliable signal of quality", "Authority bias: input from senior stakeholders is weighted more heavily than input from junior or underrepresented ones, regardless of its relevance. Structured processes that anonymise or equalise input reduce this", "Anchoring: the first option generated, the first figure cited, or the first framing of the problem anchors all subsequent thinking. Inclusive decision-making requires actively challenging early framings before they harden", "Silo thinking: decisions made by one team without reference to those affected by them in other departments, levels, or communities are rarely inclusive. Cross-functional stakeholder mapping is part of Stage 1 for this reason"]} /></div>,

    <div key="s11"><SectionLabel text="The Legal Context" /><SlideHeading title="Legal and Standards Framework" /><BodyText>Inclusive decision-making is not only best practice. It is supported and in some contexts required by a range of legal frameworks and professional standards.</BodyText><BulletList items={["Equality Act 2010: requires that decisions do not unlawfully discriminate against people on the basis of protected characteristics. Impact assessment before decisions helps organisations identify and address potential discrimination in advance", "Public Sector Equality Duty (PSED): public bodies must have due regard to eliminating discrimination, advancing equality, and fostering good relations. This is a process duty: it requires evidence of equitable consideration, not only equitable outcomes", "EHRC Guidance: the Equality and Human Rights Commission's guidance for employers sets out practical obligations for decision-making processes related to recruitment, promotion, and policy", "PAS 1948 and BS ISO 30415:2021: professional standards frameworks for inclusive workplace practice that include guidance on embedding inclusion into decision-making at all levels", "Inclusion at Work Panel Report (GOV.UK, 2024): evidence-based recommendations for good D and I practice in UK workplaces, including the importance of structured and accountable decision-making processes"]} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Decide Inclusively: A Framework for Leaders" /><BulletList items={["Inclusive decision-making is a seven-stage process: define context, gather perspectives, analyse equitably, co-create options, communicate transparently, monitor, and build culture", "The process is as important as the outcome: an equitable decision made through an exclusive process builds the wrong culture, even if the outcome is right", "Intersectionality belongs in the analysis: treating gender, race, disability, and seniority as separate variables misses the compounding effects that affect the people with the least power", "Transparency is not just communication: it includes rationale, trade-offs, channels for challenge, and follow-up on what was heard", "Monitoring assumes imperfection: decisions made without a review process assume they worked. Inclusive decisions build in adjustment from the start"]} /><ReflectionBox prompt="Choose one decision that will be made in your organisation in the next month. Which of the seven stages will you apply? Where is the biggest gap in the current process?" /><KeyReminder text="A decision-making process that excludes those most affected by the decision is not neutral. It is a choice to centre some interests over others. The framework makes a different choice." /></div>,
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
