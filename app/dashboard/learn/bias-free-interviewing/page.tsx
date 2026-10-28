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
function QuestionCard({ label, question, why }: { label: string; question: string; why: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", margin: "0 0 0.3rem" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 600, color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.45 }}>{question}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", opacity: 0.75, margin: 0, lineHeight: 1.5 }}>{why}</p>
    </div>
  );
}
function AvoidCard({ question, why }: { question: string; why: string }) {
  return (
    <div style={{ border: "1.5px solid #f5a0a0", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "0.75rem", background: "#fff5f5" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b94a4a", margin: "0 0 0.3rem" }}>Avoid</p>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 600, color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.45 }}>{question}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", opacity: 0.75, margin: 0, lineHeight: 1.5 }}>{why}</p>
    </div>
  );
}

export default function BiasFreeInterviewing() {
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
    { q: "Why should interviewers ask all candidates the same structured questions?", options: ["To make the interview feel more formal and professional", "To reduce the opportunity for bias by ensuring all candidates are assessed against the same criteria", "To speed up the interview process", "To ensure candidates cannot prepare their answers in advance"], correct: 1 },
    { q: "Which of the following questions is problematic under the Equality Act 2010?", options: ["Tell me about a time you managed a difficult stakeholder.", "Do you have any plans to start a family in the next few years?", "What would you do if a colleague raised a concern about workload?", "How do you approach learning a new skill quickly?"], correct: 1 },
    { q: "What is the purpose of sharing interview questions with candidates in advance?", options: ["To make the interview easier so more candidates pass", "To level the playing field so candidates who communicate differently can prepare equally", "To avoid having to score answers", "To remove the need for a panel"], correct: 1 },
    { q: "What does a structured, scored interview process help to prevent?", options: ["The interview taking too long", "Decisions being influenced by gut feeling, affinity bias, and subjective impressions", "Candidates asking follow-up questions", "The need to take notes"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("bias-free-interviewing");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Bias-Free Interviewing: Ask Better Questions" subtitle="Structured, fair assessment for every candidate" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>The interview is where bias does some of its most damaging work. Research shows that interviewers typically make decisions about candidates within the first few minutes, often based on factors entirely unrelated to capability. Structured interviewing is one of the most evidence-backed tools for making better, fairer hiring decisions.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to design and conduct structured interviews that assess candidates fairly, reduce the influence of bias, and comply with your legal obligations under the Equality Act 2010.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why unstructured interviews are a significant source of bias in hiring decisions",
        "Identify interview questions that are unlawful or likely to introduce bias",
        "Apply principles of structured interviewing including consistent questions, scoring, and panel diversity",
        "Select from a bank of inclusive, competency-based interview questions across key assessment areas",
        "Create conditions that allow all candidates to perform at their best during the interview process",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Bias Enters Interviews" /><SlideHeading title="The Problem with Unstructured Interviews" /><BodyText>Unstructured interviews — where interviewers ask different questions, follow different threads, and score candidates however they choose — are consistently shown to be poor predictors of job performance and highly susceptible to bias.</BodyText><BulletList items={["Affinity bias: favouring candidates who remind us of ourselves, our peers, or our idea of 'someone who fits'", "Halo and horn effects: one strong or weak answer colouring the impression of all other answers", "First impression bias: decisions made within the first two minutes and then confirmed rather than challenged", "Attribution bias: crediting candidate success to talent for some candidates and luck for others"]} /><KeyReminder text="The problem is not that interviewers are malicious. The problem is that the brain looks for shortcuts, and without structure, those shortcuts determine who gets hired." /></div>,

    <div key="s3"><SectionLabel text="The Legal Framework" /><SlideHeading title="What the Law Requires" /><BodyText>Interviewing is governed by the Equality Act 2010, which prohibits direct and indirect discrimination on the basis of protected characteristics including age, sex, race, disability, religion, sexual orientation, pregnancy and maternity, and others.</BodyText><BulletList items={["Direct discrimination: treating a candidate less favourably because of a protected characteristic (asking a woman about childcare plans; asking a candidate about their accent)", "Indirect discrimination: applying a provision or practice that disadvantages candidates with a protected characteristic and cannot be justified", "Pre-employment health questions: illegal under the Act, except in limited circumstances (assessing adjustments, monitoring diversity anonymously)", "The Worker Protection Act 2023 also strengthens employer obligations around harassment in the workplace, including the hiring process"]} /><ReflectionBox prompt="When did your organisation last review its interview question bank for legal compliance? Who reviewed it and was legal counsel involved?" /></div>,

    <div key="s4"><SectionLabel text="Questions to Avoid" /><SlideHeading title="Questions That Must Not Be Asked" />
      <AvoidCard question="Do you have children, or are you planning to?" why="Indirect sex discrimination; may also disadvantage candidates of certain religions or cultures. Irrelevant to ability to do the job." />
      <AvoidCard question="How old are you? When did you graduate?" why="Age discrimination. Graduation year is a proxy for age. Never relevant unless the role has a genuine occupational requirement linked to age." />
      <AvoidCard question="Where are you originally from? What is your first language?" why="Potential race and nationality discrimination. Asking about English fluency must be tied to a genuine role requirement." />
      <AvoidCard question="Do you have any health conditions or disabilities?" why="Unlawful under the Equality Act except in very specific circumstances. Adjustments should be offered proactively before asking about the need for them." />
    </div>,

    <div key="s5"><SectionLabel text="Principles of Structured Interviewing" /><SlideHeading title="The Four Pillars of a Fair Interview Process" /><BulletList items={["Same questions for all candidates: every candidate is asked the same core questions in the same order, removing the opportunity for interviewers to follow different threads based on their impressions", "Questions shared in advance: providing candidates with the interview questions beforehand levels the playing field for neurodivergent candidates, those who communicate differently, and those for whom English is not a first language", "Structured scoring: answers are assessed against pre-agreed criteria with a defined scoring rubric, making the decision based on evidence rather than impression", "Diverse panels: where possible, panels should include people from different backgrounds and with different perspectives; panel members score independently before discussion"]} /><KeyReminder text="Structure does not make interviews robotic. It makes them fair. Good interviewers bring warmth and curiosity to a structured process." /></div>,

    <div key="s6"><SectionLabel text="Question Bank: Role and Skills" /><SlideHeading title="Assessing Competency and Role Fit" />
      <QuestionCard label="Problem-solving" question="Can you describe a time when you had to solve a problem without having all the information you needed? What did you do?" why="Assesses analytical thinking and comfort with ambiguity. Allows candidates to draw on a wide range of experience." />
      <QuestionCard label="Skills application" question="Tell me about a piece of work you are proud of. What was your contribution and what did you learn from it?" why="Open enough for candidates from all backgrounds to engage with. Avoids privileging particular types of experience." />
      <QuestionCard label="Initiative" question="Describe a time when you identified an improvement to a process or way of working. How did you approach making that change?" why="Assesses proactivity without assuming corporate or formal organisational experience." />
    </div>,

    <div key="s7"><SectionLabel text="Question Bank: Teamwork and Communication" /><SlideHeading title="Assessing Collaboration and Communication" />
      <QuestionCard label="Teamwork" question="Tell me about a time you worked effectively as part of a team. What was your role and what made the collaboration work?" why="Allows candidates to reference any form of collective working, not just formal employment." />
      <QuestionCard label="Conflict" question="Describe a time when you and a colleague had different views on how to approach something. How did you handle it?" why="Assesses interpersonal skill and maturity without requiring hierarchical authority. Life experience counts." />
      <QuestionCard label="Communication" question="Tell me about a time when you had to communicate something complex to someone who was not familiar with the subject. How did you approach it?" why="Can be answered from any context. Values accessibility of communication over jargon or specialism." />
      <ReflectionBox prompt="Do your current interview questions allow candidates from non-traditional backgrounds to answer from their actual experience?" /></div>,

    <div key="s8"><SectionLabel text="Question Bank: EDI and Inclusive Practice" /><SlideHeading title="Assessing Commitment to Inclusion" />
      <QuestionCard label="EDI awareness" question="Can you give an example of a time when you worked with people from different backgrounds to your own? What did you learn from that experience?" why="Accessible across sectors and life experience. Assesses genuine openness rather than familiarity with terminology." />
      <QuestionCard label="Challenging bias" question="Tell me about a time when you noticed something at work that felt unfair or exclusionary. What did you do?" why="Assesses moral courage and practical inclusion. Allows honest, reflective answers rather than rehearsed EDI statements." />
      <QuestionCard label="Self-awareness" question="How do you make sure that your own assumptions or blind spots do not negatively affect the people you work with?" why="Invites candidates to demonstrate self-reflection and ongoing learning rather than claim to be bias-free." />
    </div>,

    <div key="s9"><SectionLabel text="Question Bank: Leadership and Growth" /><SlideHeading title="Assessing Leadership and Resilience" />
      <QuestionCard label="Leadership" question="Tell me about a time when you had to bring people together around a shared goal when not everyone was initially on board. What was your approach?" why="Does not assume formal management authority. Leadership can be peer-level, community-based, or informal." />
      <QuestionCard label="Resilience" question="Describe a time when something you worked on did not go as planned. How did you respond, and what did you take from the experience?" why="Assesses growth mindset and self-compassion without expecting candidates to pretend failures were secretly successes." />
      <QuestionCard label="Development" question="What kind of environment helps you to do your best work, and how do you seek that out when it is not naturally present?" why="Invites candidates to articulate their own needs honestly, and tests self-awareness and agency." />
    </div>,

    <div key="s10"><SectionLabel text="Accommodations and Accessibility" /><SlideHeading title="Creating Conditions to Perform" /><BodyText>A fair interview process does not just ask fair questions. It creates conditions in which all candidates can demonstrate their capability. Many candidates perform below their potential not because of ability but because of process design.</BodyText><BulletList items={["Offer accommodations proactively before asking candidates whether they need them: 'We want to make sure the interview works for you. Is there anything you would find helpful?'", "Provide questions in advance to all candidates, not only those who request this. It benefits everyone and particularly helps neurodivergent candidates and those for whom English is an additional language", "Offer flexibility in interview format: some candidates perform better in written tasks, presentations, or one-to-one conversations than in panel interviews", "Allow extra time for answers if requested, and make clear that brief pauses to think are not only acceptable but welcome"]} /><KeyReminder text="Accommodations are not special treatment. They are what is needed to give everyone an equal opportunity to show what they can do." /></div>,

    <div key="s11"><SectionLabel text="After the Interview" /><SlideHeading title="Scoring, Discussion, and Decision-Making" /><BodyText>The risk of bias does not end when the interview does. Post-interview discussion and scoring can amplify the very biases that structured questioning was designed to reduce.</BodyText><BulletList items={["Panel members should score independently before any group discussion: once someone articulates a view, others tend to converge toward it (anchoring bias)", "Scoring should be based on evidence from candidate answers, not on impressions of fit, energy, or personality", "Watch for language in post-interview discussion that signals bias: 'I just felt she was not quite right', 'He seemed a bit too quiet', 'She would not fit in with the team'", "Document the evidence for every decision: if a decision were challenged under the Equality Act, you need to be able to demonstrate it was made on lawful, objective criteria"]} /><ReflectionBox prompt="How are hiring decisions made in your organisation after interviews? Who makes the final call and on what basis?" /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Bias-Free Interviewing: Ask Better Questions" /><BulletList items={["Unstructured interviews are one of the most significant sources of bias in hiring: structure is not bureaucracy, it is fairness", "Several types of interview questions are unlawful under the Equality Act 2010: do not ask about family plans, age, health, nationality, or religion", "Sharing questions with candidates in advance, using consistent scoring, and rotating diverse panels all reduce the influence of bias", "Accommodations should be offered proactively: every candidate should have what they need to perform at their best", "Post-interview scoring must be based on evidence; document the basis for every hiring decision in case it is later challenged"]} /><ReflectionBox prompt="What is one change you will make to your interview process before your next hire?" subPrompts={["Do you have a consistent, scored question bank? If not, who should develop one?", "Do candidates receive questions in advance? If not, why not?", "How are post-interview decisions made and documented in your organisation?"]} /><KeyReminder text="A diverse hire from a biased process is not a success. The process is where fairness is built, not the outcome alone." /></div>,
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
