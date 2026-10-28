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

export default function GenderEquitableWorkplaces() {
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
    { q: "What is the difference between sexism and misogyny in the workplace?", options: ["They are the same thing and can be used interchangeably", "Sexism describes systemic structures and norms; misogyny refers to the active enforcement of those norms through hostility or punishment", "Misogyny only affects women in senior roles", "Sexism is always intentional; misogyny is always unintentional"], correct: 1 },
    { q: "What does 'shifting from intent to impact' mean in practice?", options: ["Focusing only on what was meant rather than what happened", "Investigating the motivation behind every incident before deciding how to respond", "Recognising that the harm caused by a behaviour matters regardless of whether it was intended", "Assuming that all harmful behaviour is deliberate"], correct: 2 },
    { q: "Why is psychological safety essential for gender equity work?", options: ["Because it encourages everyone to be competitive", "Because it creates conditions where people can raise concerns without fear of retaliation", "Because it removes the need for formal reporting routes", "Because it prevents women from needing to ask for support"], correct: 1 },
    { q: "Which of the following is an example of gendered power dynamics at work?", options: ["Rotating note-taking and administrative tasks so they do not consistently fall to women", "Assigning stretch projects based on performance ratings", "Requiring all employees to attend mandatory training", "Using structured interviews for all candidates"], correct: 0 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("gender-equitable-workplaces");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Creating Gender-Equitable Workplaces" subtitle="Moving beyond policy to practice" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Gender inequity at work is not a pipeline problem. Women are not absent from organisations because they lack ambition or capability. They are pushed out, passed over, and penalised by structures and cultures that were built around someone else. Creating gender-equitable workplaces means changing those structures, not asking women to work around them.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to understand and address sexism and misogyny at work: through clear standards, structural change, inclusive culture, accountability, and a commitment to psychological safety.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain the difference between sexism and misogyny and how both operate in workplace culture",
        "Describe what shifting from intent to impact means and why it matters for gender equity",
        "Identify gendered power dynamics and practical strategies to disrupt them",
        "Apply an intersectional lens to gender equity work so that the most marginalised women are not left behind",
        "Build manager capability and accountability frameworks that sustain progress over time",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Understanding the Problem" /><SlideHeading title="Sexism, Misogyny, and the Workplace" /><BodyText>Sexism and misogyny are related but distinct. Sexism describes the systemic structures, norms, and assumptions that disadvantage women, while misogyny refers to the active enforcement of those norms through hostility, punishment, or exclusion when women challenge them.</BodyText><BulletList items={["Both operate in workplaces, often without being named as such", "Everyday sexism includes unconscious bias, patronising behaviour, and gendered assumptions about who leads and who supports", "Misogyny shows up when women who do speak up, push back, or step into authority are penalised for it", "Naming both accurately allows organisations to move beyond awareness and take structural action"]} /><ReflectionBox prompt="Where have you seen sexism or misogyny at work? Has it been named as such, or has it been treated as individual behaviour or cultural quirk?" /></div>,
    <div key="s3"><SectionLabel text="Behavioural Standards" /><SlideHeading title="Setting Clear Expectations" /><BodyText>Gender equity requires explicit behavioural standards, not vague appeals to values. People need to know what is acceptable, what is not, and what will happen when expectations are not met.</BodyText><BulletList items={["Name sexist and misogynistic behaviours explicitly in codes of conduct, policies, and leadership communication rather than relying on euphemism", "Set expectations that apply to everyone regardless of seniority: gender-based harm from a senior leader is not more acceptable than from a junior employee", "Ensure consequences are proportionate, consistent, and visible enough to signal that standards are real", "Review policies regularly to check that the language reflects the full range of gendered harms rather than only the most overt"]} /><KeyReminder text="If your code of conduct only covers the most extreme behaviours, it leaves everyday sexism entirely unchecked." /></div>,
    <div key="s4"><SectionLabel text="Intent Versus Impact" /><SlideHeading title="Shifting from Intent to Impact" /><BodyText>One of the most important shifts in gender equity work is moving from asking what someone meant to understanding what happened. Intent matters for learning and accountability, but it does not determine the harm caused.</BodyText><BulletList items={["Train managers and staff to focus on the impact of behaviour rather than the motivation behind it", "Use impact-centred language in complaints and disciplinary processes: what happened to the person, not what the other person intended", "Avoid making the person harmed responsible for proving malicious intent before their experience is taken seriously", "Create space for people to raise concerns about impact without fear that they will be accused of misinterpreting someone's good intentions"]} /><ReflectionBox prompt="When you have seen concerns about sexism raised at work, has the response focused on impact or on defending the person accused? What was the effect of that?" /></div>,
    <div key="s5"><SectionLabel text="Power Dynamics" /><SlideHeading title="Disrupting Gendered Power" /><BodyText>Gendered power dynamics are embedded in who gets heard, who gets opportunities, and who gets to define the culture. They often persist invisibly in everyday practices.</BodyText><BulletList items={["Rotate administrative tasks such as note-taking, meeting coordination, and office social planning so they do not consistently fall to women", "Ensure stretch assignments, high-visibility projects, and speaking opportunities are distributed equitably rather than defaulting to the most confident voices", "Interrupt patterns in meetings where contributions from women are talked over, credited to someone else, or treated as less authoritative", "Model and expect active listening across gender in team and leadership settings"]} /><KeyReminder text="If the same people always take the notes and the same people always take the floor, your culture has a power problem regardless of your policies." /></div>,
    <div key="s6"><SectionLabel text="Reporting" /><SlideHeading title="Strengthening Reporting and Response" /><BodyText>Reporting processes for gender-based harm are often the weakest link in an organisation's approach. Underreporting is the norm, not the exception, and the reasons for it are well-documented.</BodyText><BulletList items={["Provide multiple reporting routes including anonymous options and routes that bypass the direct line manager", "Train those who receive disclosures to respond with belief, care, and clarity about next steps", "Commit to consistent, transparent follow-through on every concern raised", "Regularly audit reporting outcomes by gender to identify patterns and check that responses are appropriate"]} /><ReflectionBox prompt="Do staff in your organisation know how to raise a concern about gender-based harm? Do they believe it would be taken seriously if they did?" /></div>,
    <div key="s7"><SectionLabel text="Resources and Resourcing" /><SlideHeading title="Resourcing the Work Properly" /><BodyText>Gender equity work requires dedicated resource. When it is treated as an add-on or left to individuals alongside their existing roles, it signals that the organisation is not serious.</BodyText><BulletList items={["Allocate dedicated budget and staff time for gender equity programmes, training, and review processes", "Avoid placing the entire burden of gender equity work on women, especially those from already-marginalised groups", "Support employee resource groups and networks with actual resource rather than just recognition", "Build gender equity goals into business planning cycles so they are funded rather than aspirational"]} /><KeyReminder text="Unfunded commitments are not commitments: they are statements of intent that leave the most affected people to do the work themselves." /></div>,
    <div key="s8"><SectionLabel text="Everyday Behaviour" /><SlideHeading title="Addressing Everyday Sexism" /><BodyText>Everyday sexism is often dismissed as minor, but it creates the cultural conditions in which more serious harm becomes possible or normalised.</BodyText><BulletList items={["Name and challenge small moments: comments about appearance, assumptions about roles, jokes that rely on gender stereotypes", "Build a culture where bystander intervention is expected and normalised rather than exceptional", "Equip all staff with language and confidence to name what they see without waiting for someone more senior to act", "Recognise that repeated small incidents accumulate into patterns that are experienced as harassment or exclusion by those on the receiving end"]} /><ReflectionBox prompt="When was the last time you witnessed an everyday sexist comment or interaction? What happened? What could have happened differently?" /></div>,
    <div key="s9"><SectionLabel text="Manager Capability" /><SlideHeading title="Building Manager Capability" /><BodyText>Managers are where gender equity policy either comes to life or gets quietly abandoned. Their capability, confidence, and accountability are critical.</BodyText><BulletList items={["Give managers specific training on recognising and responding to gender-based harm, not just general equality training", "Include gender equity as a measurable expectation in manager performance frameworks, not a nice-to-have", "Provide coaching, peer support, and accessible guidance so managers can handle difficult situations without avoiding them", "Hold managers accountable for patterns within their teams: high rates of attrition or low rates of reporting can both signal a problem"]} /><KeyReminder text="A manager who avoids difficult conversations about gender is not neutral: they are reinforcing whatever culture already exists." /></div>,
    <div key="s10"><SectionLabel text="Accountability" /><SlideHeading title="Accountability in Performance Systems" /><BodyText>Accountability for gender equity needs to live in performance systems, not just culture statements. Without it, progress depends entirely on individual goodwill.</BodyText><BulletList items={["Set measurable gender equity goals at team, leadership, and organisational level", "Build gender equity metrics into appraisals for managers and senior leaders", "Review pay, promotion, and attrition data by gender and take action on gaps", "Report publicly on progress including where targets have not been met and what is being done about it"]} /><ReflectionBox prompt="Is gender equity a formal accountability measure in your organisation, or is it largely voluntary? What would change if it were measured and reported?" /></div>,
    <div key="s11"><SectionLabel text="Intersectionality" /><SlideHeading title="Intersectionality and Compounding Barriers" /><BodyText>Gender inequity does not affect all women equally. An intersectional approach recognises that gender interacts with race, disability, class, sexuality, and other dimensions of identity to create compounded and distinct experiences of exclusion.</BodyText><BulletList items={["Disaggregate gender data by race, disability, and other characteristics to identify where the most marginalised women face the greatest barriers", "Avoid solutions that only reflect the experiences of white, non-disabled, middle-class women", "Involve women with the most intersectional experience of exclusion in the design of gender equity programmes, with proper support and recognition", "Review whether policies intended to support women may inadvertently disadvantage those with multiple marginalised identities"]} /><KeyReminder text="A gender equity strategy that does not account for race, disability, and class will protect the most privileged women while leaving others behind." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Creating Gender-Equitable Workplaces" /><BulletList items={["Sexism describes systemic structures; misogyny is the active enforcement of those structures. Both need to be named and addressed", "Shift from intent to impact: what happened matters regardless of what was meant", "Disrupt gendered power by auditing who speaks, who is heard, who takes the admin, and who gets the opportunities", "Accountability belongs in performance systems, not just culture statements: measure, report, and act on gender equity data", "Intersectionality is not optional: a strategy that does not account for race, disability, and class will leave the most marginalised women behind"]} /><ReflectionBox prompt="What is one structural change you could advocate for or make this week to address gender inequity in your team or organisation?" subPrompts={["Is there a gendered power dynamic in your team that goes unchallenged?", "Do your reporting routes work for the people most likely to need them?", "Who carries the invisible labour of inclusion in your workplace?"]} /><KeyReminder text="Gender-equitable workplaces are not built by good intentions. They are built by clear standards, structural change, accountability, and the willingness to keep going when it is uncomfortable." /></div>,
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
