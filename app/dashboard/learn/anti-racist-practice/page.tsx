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

export default function AntiRacistPractice() {
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
    { q: "What is the key distinction between being non-racist and being anti-racist?", options: ["There is no real distinction: both describe the same commitment to equality", "Non-racism means avoiding racial slurs; anti-racism means challenging unconscious bias", "Anti-racism involves actively dismantling racist systems and practices, not just avoiding racist behaviour", "Non-racism is individual; anti-racism is only possible at a government or policy level"], correct: 2 },
    { q: "What is a microaggression?", options: ["An extreme form of overt racism", "A subtle, often unintentional communication or behaviour that conveys a negative message about a person's racial identity", "A policy that directly discriminates against people of colour", "A type of unconscious bias that only affects hiring decisions"], correct: 1 },
    { q: "Why is self-awareness central to anti-racist practice?", options: ["Because racism is entirely a personal failing that can be addressed through individual reflection", "Because understanding your own identity, privilege, and biases is necessary before you can recognise how they shape your actions and decisions", "Because self-awareness removes the need for structural change", "Because only people with high self-awareness experience racial bias"], correct: 1 },
    { q: "What does an equitable policy framework require beyond non-discrimination?", options: ["Treating all employees identically regardless of their circumstances", "Removing all special programmes or adjustments for any group", "Actively designing and auditing policies to account for the differential impact of race on outcomes", "Publishing a public diversity statement"], correct: 2 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("anti-racist-practice");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Anti-Racist Practice: a Practical Framework" subtitle="From awareness to active dismantling" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Being non-racist is not the same as being anti-racist. Non-racism describes the absence of overt discriminatory behaviour. Anti-racism describes an active commitment to identifying and dismantling the systems, practices, and beliefs that produce racial inequality. One is passive; the other requires ongoing work.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will give you a practical framework for anti-racist practice in the workplace: grounded in self-awareness, structural analysis, and actionable steps across communication, decision-making, policy, and culture.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain the difference between being non-racist and being anti-racist and why the distinction matters",
        "Describe the four types of racism and how they operate in organisational settings",
        "Apply self-awareness and critical reflection to your own identity, privilege, and practice",
        "Respond effectively to racism and microaggressions in workplace settings",
        "Design and audit equitable policies and systems using an anti-racist lens",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Foundations" /><SlideHeading title="What Is Anti-Racist Practice?" /><BodyText>Anti-racist practice is the active, ongoing work of identifying and dismantling the systems, structures, policies, and behaviours that produce racial inequality. It differs from non-racism in one important respect: it requires action, not just abstention.</BodyText><BulletList items={["Non-racism describes avoiding overtly racist behaviour; anti-racism describes challenging the conditions that enable racism to persist", "Anti-racist practice is a commitment that applies to individuals, teams, managers, and organisations", "It requires acknowledging that racism is not just about explicit prejudice but about systems that consistently produce unequal outcomes by race", "Anti-racist practice is not a destination: it is a continuous process of learning, reflection, and structural change"]} /><ReflectionBox prompt="How would you describe the difference between non-racism and anti-racism in your own words? Where does your organisation currently sit on that spectrum?" /></div>,
    <div key="s3"><SectionLabel text="Recognising Racism" /><SlideHeading title="Four Types of Racism at Work" /><BodyText>Racism operates in multiple registers, not just as individual acts of overt discrimination. Understanding the full range is essential for addressing it effectively.</BodyText><BulletList items={["Overt racism: explicit discriminatory behaviour, language, or decisions based on race", "Covert racism: subtle behaviours that are plausibly deniable but have a racially disparate impact, such as microaggressions or coded language", "Structural racism: policies and practices that produce racially unequal outcomes even without individual discriminatory intent", "Systemic racism: the interaction of structures across institutions (housing, education, employment, health) that compounds racial disadvantage over time"]} /><KeyReminder text="Most racism at work is not overt. Organisations that only respond to the most explicit incidents are missing most of the problem." /></div>,
    <div key="s4"><SectionLabel text="Self-Awareness" /><SlideHeading title="Building Self-Awareness as a Foundation" /><BodyText>Anti-racist practice begins with self-awareness: an honest examination of your own identity, the privileges you hold, and the biases that shape your decisions.</BodyText><BulletList items={["Understand your own racial identity and the power and privilege it carries in different contexts", "Recognise that unconscious bias is not a character flaw but a product of the same systems that produce structural racism", "Examine where your assumptions about competence, authority, and belonging come from", "Commit to ongoing learning rather than treating a single training as sufficient: anti-racist self-awareness is a practice, not a certificate"]} /><ReflectionBox prompt="What aspects of your own identity and privilege might be shaping your decisions at work? Where would examining those assumptions make a difference?" /></div>,
    <div key="s5"><SectionLabel text="Communication" /><SlideHeading title="Inclusive Anti-Racist Communication" /><BodyText>Language is one of the most immediate sites of anti-racist practice. The words and frames we use either challenge or reinforce racial hierarchies.</BodyText><BulletList items={["Use precise, respectful, and up-to-date language when discussing race, ethnicity, and identity: when in doubt, follow the preference of the communities you are talking about or with", "Avoid race-neutral language that obscures the racial dimension of an issue: naming race is not divisive, it is accurate", "Challenge coded language that signals racial bias without stating it explicitly, including in job adverts, performance reviews, and informal conversation", "Create communication environments where questions can be asked and mistakes acknowledged without the conversation shutting down"]} /><KeyReminder text="Choosing not to name race when race is relevant is not neutrality: it is a choice to leave structural inequity unnamed." /></div>,
    <div key="s6"><SectionLabel text="Responding to Racism" /><SlideHeading title="Responding to Racism and Microaggressions" /><BodyText>Knowing how to respond when racism or microaggressions occur is a practical skill. Many incidents go unchallenged not from indifference but from uncertainty about what to do.</BodyText><BulletList items={["Name what happened clearly and calmly, using specific language rather than generalisation", "Address impact rather than debating intent: the question is what happened, not what was meant", "Support the person affected first: ask what they need rather than deciding for them", "Follow up after the immediate moment: check in, document if appropriate, and ensure there are consequences for repeated behaviour"]} /><ReflectionBox prompt="What would you say if you witnessed a racial microaggression in a meeting? What gets in the way of responding?" /></div>,
    <div key="s7"><SectionLabel text="Decision-Making" /><SlideHeading title="Anti-Racist Decision-Making" /><BodyText>Anti-racist practice requires examining who benefits from our decisions and who is disadvantaged by them. This applies to every level, from hiring decisions to budget allocations.</BodyText><BulletList items={["Ask, before any significant decision: who benefits from this? Who might be harmed? Are those outcomes racially patterned?", "Use structured decision-making tools to reduce the influence of affinity bias and confirmation bias", "Diversify the voices in decision-making rooms so that racially inequitable proposals are more likely to be identified and challenged", "Review decisions and their outcomes over time to identify patterns rather than treating each decision as isolated"]} /><KeyReminder text="A decision that seems race-neutral can still be anti-racist practice if it actively examines whether race shapes who benefits or who is harmed." /></div>,
    <div key="s8"><SectionLabel text="Policy and Systems" /><SlideHeading title="Equitable Policies and Systems" /><BodyText>Many racially inequitable outcomes in organisations are not the result of individual prejudice but of policies that were designed without accounting for race.</BodyText><BulletList items={["Audit existing policies for racially disparate impacts including recruitment, pay, performance management, flexible working, and progression", "Redesign policies that consistently produce unequal outcomes by race, even if they appear neutral on their face", "Involve staff of colour in policy design and review, with proper support and recognition rather than treating it as an add-on to their existing role", "Set measurable goals for equitable policy outcomes and track progress publicly"]} /><ReflectionBox prompt="When did your organisation last audit a policy for racial equity? What did that process look like, and what changed as a result?" /></div>,
    <div key="s9"><SectionLabel text="Everyday Practice" /><SlideHeading title="Everyday Anti-Racist Actions" /><BodyText>Anti-racist practice is not only about formal programmes. It lives in the everyday: in how meetings are run, who gets credit, what is challenged, and what is let pass.</BodyText><BulletList items={["Amplify the contributions of colleagues of colour in meetings: name their idea, redirect credit that has been misattributed", "Speak up when a colleague makes a racially coded comment, even if you are not sure they meant harm", "Question whose perspective is being centred in team decisions and whose is absent", "Do your own learning and reflection rather than expecting colleagues of colour to educate you on request"]} /><KeyReminder text="Anti-racist practice in everyday life means choosing action over comfort when the moment asks for it, not only when it is easy or convenient." /></div>,
    <div key="s10"><SectionLabel text="Supporting Staff" /><SlideHeading title="Supporting Staff of Colour" /><BodyText>Staff of colour carry a disproportionate burden in racially inequitable organisations: both the experience of racism and often the expectation of leading the response to it. Both need to be addressed.</BodyText><BulletList items={["Provide specific, targeted support for staff of colour including mentoring, sponsorship, and development pathways", "Avoid placing the responsibility for anti-racist work on staff of colour: that is the responsibility of everyone, especially those with more power and privilege", "Create genuine psychological safety for staff of colour to raise concerns without fear of being labelled difficult, oversensitive, or unprofessional", "Monitor retention, promotion, and wellbeing outcomes for staff of colour and take action when patterns indicate systemic barriers"]} /><ReflectionBox prompt="What is your organisation doing to actively support the progression and wellbeing of staff of colour? Where are the gaps?" /></div>,
    <div key="s11"><SectionLabel text="Accountability" /><SlideHeading title="Learning, Unlearning, and Accountability" /><BodyText>Anti-racist practice requires a culture of continuous learning, accountability for harm, and genuine commitment to change. It is an ongoing practice, not a milestone.</BodyText><BulletList items={["Create structures for naming and learning from failures: when racist incidents or policies are identified, respond with accountability rather than defensiveness", "Invest in sustained anti-racist education across the organisation, not one-off training that treats the work as complete", "Build anti-racist goals into organisational strategy and hold senior leaders visibly accountable for progress", "Celebrate and document progress openly while continuing to name what remains to be done"]} /><KeyReminder text="Accountability for anti-racist practice means acknowledging where you have fallen short and recommitting to the work. Defensiveness ends the learning." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Anti-Racist Practice: a Practical Framework" /><BulletList items={["Anti-racism is active and ongoing: not just avoiding racist behaviour but working to dismantle the systems that produce racial inequality", "Racism operates as overt, covert, structural, and systemic: responding only to the most explicit incidents misses most of the problem", "Self-awareness is foundational: understanding your own identity, privilege, and biases is the starting point for anti-racist practice", "Respond to racism by naming impact rather than debating intent, and support the person affected first", "Equitable policies require active audit and redesign, not just a non-discrimination statement"]} /><ReflectionBox prompt="What is one action you will take this week as part of your anti-racist practice?" subPrompts={["Is there a policy in your area that has not been audited for racial impact?", "Where could you amplify or protect a colleague of colour this week?", "What are you still learning, and where are you still uncomfortable?"]} /><KeyReminder text="Anti-racist practice is not a project with an end date. It is a permanent commitment to learning, action, and accountability in the face of systems that were not designed with racial equity in mind." /></div>,
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
