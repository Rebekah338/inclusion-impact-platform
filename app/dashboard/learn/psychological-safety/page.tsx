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
function MoveOnNote3() {
  return <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>Once you have written down your answers to these three questions, you can move to the next slide.</p>;
}
function ActivityBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--white)", border: "2px solid var(--sage-dark)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "0.95rem", margin: "0 0 0.75rem 0" }}>✍️ {title}</p>
      {children}
    </div>
  );
}

export default function PsychologicalSafetyLesson() {
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
    { q: "How did Amy Edmondson define psychological safety?", options: ["The belief that you will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes", "A team culture where everyone agrees with the leader's decisions", "The absence of conflict in a team", "A performance standard where mistakes are not tolerated"], correct: 0 },
    { q: "What is 'the silence tax'?", options: ["The cost of running meetings where no one contributes", "The accumulated cost to an organisation of information, concerns, and ideas that are never shared because people do not feel safe to speak", "A model for calculating the financial impact of employee turnover", "The proportion of meeting time taken up by one or two voices"], correct: 1 },
    { q: "Which of these leader behaviours is most likely to build psychological safety?", options: ["Maintaining certainty and clear answers so the team feels directed", "Thanking a team member for raising a concern, even when the concern turns out to be unfounded", "Keeping performance issues private to avoid embarrassing individuals in front of the team", "Ensuring positive feedback outweighs negative feedback by a ratio of at least five to one"], correct: 1 },
    { q: "In Edmondson's four stages model, at which stage do team members begin to challenge the status quo and question assumptions?", options: ["Inclusion safety", "Learner safety", "Contributor safety", "Challenger safety"], correct: 3 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("psychological-safety");
  }

  const slides = [
    <SlideShell key="s1">
      <SlideHeading title="Psychological Safety" subtitle="What leaders need to create it" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>💭 Opening thought:</p>
        <BodyText italic>Psychological safety is not about being nice. It is not about avoiding difficult conversations or protecting people from challenge. It is about whether people believe they can speak up without it costing them something. That belief, or its absence, shapes everything that follows.</BodyText>
      </div>
      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>Understand what psychological safety is, why it matters for inclusion and performance, and what specific behaviours leaders can develop to create it in their teams.</BodyText>
      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={["Define psychological safety using Edmondson's research", "Describe the four stages of psychological safety and what each requires from leaders", "Identify the behaviours that damage psychological safety and those that build it", "Explain the concept of the silence tax and its cost to organisations", "Name three daily practices that strengthen psychological safety over time"]} />
      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={["Find a quiet space and give yourself around 15 minutes", "Use headphones if you would like the lesson read aloud", "Have a pen and paper ready: there are reflection prompts throughout", "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard."]} />
    </SlideShell>,

    <SlideShell key="s2">
      <SlideHeading title="The Definition" subtitle="What Edmondson's research showed" />
      <BodyText>The concept of psychological safety was developed by Harvard Business School professor Amy Edmondson, who first identified it while studying medication errors in hospital teams. She expected high-performing teams to make fewer errors. Instead, they reported more. The reason: they felt safe enough to talk about mistakes.</BodyText>
      <BodyText>Edmondson defined psychological safety as the belief that you will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes.</BodyText>
      <KeyReminder text="This is a team-level construct, not an individual personality trait. It describes the shared climate of a team, shaped primarily by how the leader behaves." />
      <SectionLabel text="Why it matters for inclusion specifically:" />
      <BodyText>People from underrepresented groups often carry an additional tax on speaking up: the risk that their contribution will be dismissed, attributed to identity rather than insight, or used as evidence of confirmation bias. Psychological safety cannot solve systemic discrimination, but its absence makes inclusion impossible in practice.</BodyText>
      <ReflectionBox prompt="Think of a team or environment where you felt genuinely safe to speak up. What made that possible? What did the leader do or not do?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s3">
      <SlideHeading title="Activity: Which Environment?" subtitle="Write down your answers before moving on" />
      <ActivityBox title="Two scenarios">
        <SectionLabel text="Team A:" />
        <BodyText>A team is working on a complex project. The leader is experienced and confident. In meetings, they tend to speak first, sharing their view before asking for input. When team members raise concerns, the leader tends to redirect quickly to solutions. The team has learned over time that the quickest route to a good meeting is to align with the leader's view early.</BodyText>
        <SectionLabel text="Team B:" />
        <BodyText>A different team is working on a similar project. The leader consistently asks questions before offering opinions. When a junior team member raises a concern about a risk the leader had not considered, the leader says: "That's exactly the kind of thing I need to hear. Let's talk through it." When the leader makes a decision that later turns out to be wrong, they say so directly in the next team meeting.</BodyText>
      </ActivityBox>
      <ReflectionBox subPrompts={[
        "In which team would you be more likely to speak up if you spotted a serious problem?",
        "Which team is more likely to catch errors before they become costly?",
        "Which leadership style is harder to sustain and why?",
      ]} />
      <MoveOnNote3 />
    </SlideShell>,

    <SlideShell key="s4">
      <SlideHeading title="The Four Stages" subtitle="Edmondson's model of psychological safety" />
      <BodyText>Timothy Clark's extension of Edmondson's work describes four stages of psychological safety that build on each other. Each stage requires something specific from leaders.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", title: "Inclusion safety", detail: "People feel safe to belong, to be themselves without hiding parts of their identity. Leaders create this by welcoming difference, learning names correctly, and not requiring people to conform to a dominant group norm." },
          { n: "2", title: "Learner safety", detail: "People feel safe to ask questions, admit they don't know something, and make mistakes without fear of ridicule. Leaders create this by modelling curiosity and not punishing honest errors." },
          { n: "3", title: "Contributor safety", detail: "People feel safe to do their job, to apply their expertise, and to offer their best work without being micromanaged or dismissed. Leaders create this by giving genuine autonomy and acknowledging contributions." },
          { n: "4", title: "Challenger safety", detail: "People feel safe to challenge the status quo: to question assumptions, flag risks, and disagree with decisions. This is the hardest stage to reach and the most valuable for innovation and risk management." },
        ].map(({ n, title, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.2rem" }}>{title}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
    </SlideShell>,

    <SlideShell key="s5">
      <SlideHeading title="What Destroys Psychological Safety" subtitle="The behaviours that close people down" />
      <BodyText>Psychological safety is asymmetric: it takes time and consistent behaviour to build, and can be damaged by a single incident. Research identifies several categories of leader behaviour that most reliably destroy it.</BodyText>
      <BulletList items={[
        "Responding to questions or concerns with impatience, dismissal, or embarrassment: saying 'we covered that already' or sighing when someone raises a concern",
        "Punishing bad news: shooting the messenger, visibly disliking updates that create work, or using problems raised in good faith as performance evidence",
        "Attributing contributions to identity: 'of course you'd think that, you're from a marketing background' or 'that's a very X perspective'",
        "Inconsistent reactions: being warm when things go well and cold when they don't, so people cannot predict how speaking up will land",
        "Public humiliation: correcting, dismissing, or overruling someone in front of their peers in a way that makes others decide the risk is not worth it",
        "Silence as a response: when leaders do not respond to something raised, people quickly learn that raising things changes nothing",
      ]} />
      <ReflectionBox prompt="Have you observed any of these behaviours in a team you are part of or have worked with? What effect did they have on how people engaged?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s6">
      <SlideHeading title="The Silence Tax" subtitle="The cost of what is never said" />
      <BodyText>The silence tax is the accumulated cost to an organisation of the information, concerns, and ideas that are never shared because people do not feel safe to speak. It is invisible until it is not.</BodyText>
      <SectionLabel text="What the silence tax looks like in practice:" />
      <BulletList items={[
        "A risk is identified by a junior team member who does not feel safe to raise it with the decision-maker. The project proceeds. The risk materialises.",
        "A more effective approach to a client problem is obvious to three people in the room. None of them say anything because the last person who pushed back was visibly frustrated by the response.",
        "An EDI initiative is designed without input from the people it is intended to support, because those people have learned that their input is gathered but rarely acted on.",
        "A team produces mediocre work because the person with the best idea decided not to share it after their last suggestion was dismissed in front of the group.",
      ]} />
      <KeyReminder text="The silence tax is a direct measure of how much value an organisation is leaving behind because of its leadership culture. It never shows up on a balance sheet, but it shows up in every performance review, retention figure, and incident report." />
    </SlideShell>,

    <SlideShell key="s7">
      <SlideHeading title="Responding to Bad News" subtitle="The moment that matters most" />
      <BodyText>The most important moment for psychological safety is not when everything is going well. It is when someone brings bad news, raises an uncomfortable concern, or makes a mistake. How a leader responds in that moment tells everyone watching what the real rules are.</BodyText>
      <SectionLabel text="Responding well:" />
      <BulletList items={[
        "Thank the person for raising it: 'I'm glad you told me this. This is exactly what I need to know.'",
        "Separate the message from the messenger: the fact that someone delivered a problem to you is not the problem",
        "Stay curious: ask what else might be relevant, what they would recommend, what they need from you",
        "Follow up: show that what was raised had an effect. People need to see that speaking up changes things",
      ]} />
      <SectionLabel text="Responding badly:" />
      <BulletList items={[
        "Asking why it wasn't raised sooner, before acknowledging the importance of it being raised now",
        "Immediately asking who is at fault, rather than understanding the situation first",
        "Becoming visibly frustrated or stressed in a way that makes the person feel responsible for your reaction",
        "Moving on without comment, leaving the person unsure whether what they said registered",
      ]} />
    </SlideShell>,

    <SlideShell key="s8">
      <SlideHeading title="Disagreement as Data" subtitle="Making challenge productive" />
      <BodyText>In psychologically safe teams, disagreement is not a problem to be managed: it is information to be used. The goal is not consensus; it is good decisions. That requires genuinely hearing perspectives that conflict with the prevailing view.</BodyText>
      <SectionLabel text="Practices that make disagreement productive:" />
      <BulletList items={[
        "Ask for counterarguments explicitly: 'Before we decide, I want to hear what could go wrong with this approach.'",
        "Assign devil's advocate roles in discussions so that challenge is normalised rather than personalised",
        "Acknowledge when someone's pushback changed your thinking: 'I was going to go in a different direction but what you said made me reconsider.'",
        "Separate idea quality from source: evaluate the argument, not the person making it",
        "Distinguish between productive disagreement (about decisions and approaches) and destructive conflict (about people and motives), and name the distinction explicitly",
      ]} />
      <ReflectionBox subPrompts={["In the last month, has anyone in your team changed your mind? If not, what might that signal?", "What is the most recent decision you made that benefited from hearing a dissenting view?"]} />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s9">
      <SlideHeading title="The Power of Three" subtitle="Daily habits that build safety over time" />
      <BodyText>Psychological safety is not created by a training programme or a culture initiative. It is built through repeated small actions, day after day, that teach people what the real norms are. Three daily habits, practised consistently, make more difference than any single gesture.</BodyText>
      <div style={{ margin: "1.5rem 0" }}>
        {[
          { n: "1", q: "Did I thank someone for raising a problem?", detail: "Not thank them for solving it. Thank them for raising it. This is the single most powerful signal that speaking up is safe. It works even when the concern turns out to be unfounded." },
          { n: "2", q: "Did I change my mind and say so?", detail: "When a leader visibly updates their view in response to information from the team, they teach the team that their input has real effect. They also model intellectual humility, which makes it safer for others to admit they don't know." },
          { n: "3", q: "Did I model not knowing the answer?", detail: "When a leader says 'I don't know, what do you think?' they give permission for uncertainty. In high-performing teams, not knowing is the starting point for learning. In low-safety teams, it is something to hide." },
        ].map(({ n, q, detail }) => (
          <div key={n} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>{n}</div>
            <div><p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.3rem" }}>{q}</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{detail}</p></div>
          </div>
        ))}
      </div>
    </SlideShell>,

    <SlideShell key="s10">
      <SlideHeading title="Measuring Psychological Safety" subtitle="How to know what you are actually creating" />
      <BodyText>Psychological safety can be measured, and measuring it is essential if you want to develop it deliberately. Edmondson's original seven-item scale remains the most widely validated tool.</BodyText>
      <SectionLabel text="Edmondson's seven items:" />
      <BulletList items={[
        "If you make a mistake on this team, it is often held against you",
        "Members of this team are able to bring up problems and tough issues",
        "People on this team sometimes reject others for being different",
        "It is safe to take a risk on this team",
        "It is difficult to ask other members of this team for help",
        "No one on this team would deliberately act in a way that undermines my efforts",
        "Working with members of this team, my unique skills and talents are valued and used",
      ]} />
      <KeyReminder text="Measuring psychological safety in a team without a genuine commitment to acting on what you find can itself damage trust. Only measure if you intend to share the results and respond to them." />
      <ReflectionBox prompt="How would your team score on Edmondson's seven items today? Which item would you be most concerned about?" />
      <MoveOnNote />
    </SlideShell>,

    <SlideShell key="s11">
      <SlideHeading title="Activity: Rate and Act" subtitle="Write down your answers before moving on" />
      <BodyText>For each of the four stages of psychological safety, rate your current team or working environment on a scale of one to five, where one is very low and five is very high. Then write one action you could take in the next week to strengthen each stage.</BodyText>
      <ActivityBox title="Stage-by-stage review">
        <BulletList items={[
          "Inclusion safety: do people feel they can be themselves in this team? Rating: _ /5. One action: ...",
          "Learner safety: do people feel comfortable asking questions and making mistakes? Rating: _ /5. One action: ...",
          "Contributor safety: do people feel genuinely valued for their expertise and contribution? Rating: _ /5. One action: ...",
          "Challenger safety: do people feel safe to question assumptions and push back on decisions? Rating: _ /5. One action: ...",
        ]} />
      </ActivityBox>
      <ReflectionBox prompt="Which stage has the lowest score in your team? What is the single most important thing you could do to raise it?" />
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
      <SlideHeading title="Key Takeaways" subtitle="Psychological Safety" />
      <BulletList items={[
        "Psychological safety is the belief that you will not be punished for speaking up. It is a team climate, shaped by leaders, not a personality trait",
        "The four stages move from belonging (inclusion safety) through learning and contributing to the most valuable stage: the freedom to challenge (challenger safety)",
        "Psychological safety is not about avoiding difficulty: it is about creating the conditions for honest, productive engagement with difficulty",
        "The silence tax is real: every organisation pays a cost in lost ideas, unraised risks, and unconsidered perspectives because people chose not to speak",
        "Psychological safety is built in small, repeated moments: thanking people for raising problems, modelling not knowing, and changing your mind visibly",
        "Measure it if you intend to act on what you find. The act of measuring without response can itself reduce trust",
      ]} />
      <ReflectionBox subPrompts={["What is the most common reason people in your team stay silent when they should speak up?", "Which of the three daily habits would have the most impact in your context? What would it take to practise it consistently?"]} />
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
