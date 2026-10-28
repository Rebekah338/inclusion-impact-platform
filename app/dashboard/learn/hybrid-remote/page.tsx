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

export default function HybridRemote() {
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
    { q: "Why is it important to record meetings or provide detailed notes for hybrid teams?", options: ["So managers can monitor attendance", "So employees who cannot attend live are not left behind", "To reduce the number of meetings held", "To replace one-to-one check-ins"], correct: 1 },
    { q: "Which of the following best supports inclusion in digital tools and platforms?", options: ["Using the most popular tools regardless of accessibility", "Choosing tools that support screen readers, multilingual use, and equitable participation", "Requiring everyone to use the same tool with no alternatives", "Prioritising speed of adoption over accessibility features"], correct: 1 },
    { q: "What does rotating meeting times help to achieve?", options: ["Ensures the same people lead every meeting", "Reduces the number of agenda items", "Shares visibility and opportunity across different time zones and schedules", "Makes meetings shorter for everyone"], correct: 2 },
    { q: "What is a key risk for remote employees compared to onsite colleagues?", options: ["They are more likely to overschedule themselves", "They may miss out on promotions, learning, and leadership visibility", "They have fewer communication tools available", "They work longer hours than in-office staff"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("hybrid-remote");
  }

  const slides = [
        <div key="s1">
      <SlideHeading title="Inclusion Across Distance: Hybrid and Remote Working" subtitle="Making flexible work truly equitable for everyone" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Hybrid and remote working opens doors for many people. But without intentional design, it can quietly exclude some employees while benefiting others. Flexible working is only inclusive if it removes barriers rather than creating new ones.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will give you the practical knowledge and confidence to build genuinely inclusive hybrid and remote working environments: from accessible technology and communication, to leadership, culture, policy, and measurement.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Identify the inclusion gaps that commonly arise in hybrid and remote settings",
        "Apply practical strategies for accessible digital tools, inclusive communication, and equitable meetings",
        "Describe what inclusive flexible working policies look like and who they need to protect",
        "Lead inclusively in online environments and support team belonging at a distance",
        "Measure participation and equity data to drive continuous improvement",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Why It Matters" /><SlideHeading title="The Inclusion Gap in Flexible Working" /><BodyText>Remote and hybrid working can benefit disabled employees, carers, neurodivergent people, and those with health conditions or faith commitments. But the same arrangements can also create or deepen inequalities if not managed carefully.</BodyText><BulletList items={["Remote employees can be overlooked for promotions and development opportunities", "Poor digital accessibility excludes employees with disabilities", "Time zone and caregiving differences affect who can participate", "Cultural and language differences are amplified in digital spaces"]} /><ReflectionBox prompt="Who in your team might face additional barriers in a hybrid or remote environment? What do you actually know about their experience?" /></div>,
    <div key="s3"><SectionLabel text="Accessibility" /><SlideHeading title="Digital Accessibility for All" /><BodyText>Inclusive remote working starts with the tools and technology people use every day.</BodyText><BulletList items={["Ensure all documents, slides, and resources are screen-reader friendly", "Caption all videos and provide transcripts", "Use clear, high-contrast fonts and accessible file formats", "Evaluate whether your collaboration platforms work across different devices and bandwidth levels", "Proactively offer assistive tools to employees with disabilities, neurodivergence, or mental health needs", "Provide alternative formats for training and resources to meet diverse learning needs"]} /><KeyReminder text="Accessibility is not an add-on. Design for it from the start." /></div>,
    <div key="s4"><SectionLabel text="Communication" /><SlideHeading title="Communicating Inclusively at a Distance" /><BodyText>How we communicate online shapes who feels informed, included, and able to contribute.</BodyText><BulletList items={["Use multiple channels to reach employees, recognising differences in digital literacy and comfort with technology", "Share agendas, meeting notes, and follow-ups in accessible formats", "Avoid idioms, slang, and culturally specific references that may confuse or exclude", "Encourage informal connections such as virtual coffee chats, peer networks, and mentoring to reduce isolation", "Be mindful of language and cultural differences in written and verbal communication"]} /><ReflectionBox prompt="Think about your team's main communication channels. Who might be least visible or least heard in those spaces?" /></div>,
    <div key="s5"><SectionLabel text="Meetings" /><SlideHeading title="Inclusive Meetings and Collaboration" /><BodyText>Meetings are where inclusion is most visibly won or lost in hybrid environments.</BodyText><BulletList items={["Schedule meetings with consideration for time zones, caregiving responsibilities, religious observances, and neurodivergent needs", "Record meetings or provide detailed notes for employees who cannot attend live", "Rotate meeting times to share visibility and opportunity for those working flexi-hours", "Use facilitation techniques that allow everyone to contribute: structured sharing, chat input, or breakout discussions", "Actively create space for diverse voices rather than defaulting to the loudest or most senior"]} /><KeyReminder text="If your meeting only works for people who can be on camera, present in one time zone, and free at a fixed time, it may be excluding people by design." /></div>,
    <div key="s6"><SectionLabel text="Flexibility and Wellbeing" /><SlideHeading title="Wellbeing and Flexible Working" /><BodyText>Genuinely inclusive flexibility goes beyond allowing people to work from home. It means designing work in a way that supports people's full lives.</BodyText><BulletList items={["Offer flexible working hours to accommodate caregiving, health conditions, faith practices, or neurodivergence", "Provide access to mental health and wellbeing support, including counselling and burnout prevention guidance", "Recognise digital fatigue and encourage regular breaks and no-meeting periods", "Set realistic workloads that do not punish people for working differently", "Ensure equitable access to promotions, learning, and leadership opportunities for fully remote workers"]} /><ReflectionBox prompt="Are the people in your team with caregiving responsibilities, health conditions, or faith commitments able to use flexible working without consequences to their career?" /></div>,
    <div key="s7"><SectionLabel text="Policy" /><SlideHeading title="Building Inclusive Remote Policies" /><BodyText>Policies set the baseline for inclusion. Without explicit commitments, flexibility defaults to benefiting those with the least constraints.</BodyText><BulletList items={["Embed inclusion explicitly in remote and hybrid work policies, addressing accessibility, equity, and cultural considerations", "Include religious and cultural observances, parental leave, gender transition support, and other EDI accommodations", "Make remote policies intersectional: recognise overlapping barriers such as gender, race, disability, caring responsibilities, and socio-economic status", "Establish clear reporting mechanisms for discrimination, bias, or exclusion that work for remote and hybrid employees"]} /><KeyReminder text="An inclusive policy names the people it is designed to protect. Vague policies protect no one." /></div>,
    <div key="s8"><SectionLabel text="Leadership" /><SlideHeading title="Leading Inclusively Online" /><BodyText>Managers and leaders set the tone for inclusion in hybrid and remote environments. What they model matters enormously.</BodyText><BulletList items={["Train managers to lead inclusively online and to recognise and celebrate diverse contributions in virtual meetings", "Use correct pronouns in emails and on digital platforms", "Respect cultural practices and religious observances in all online interactions", "Collect and act on digital feedback through surveys, one-to-one check-ins, and collaborative tools", "Implement changes based on what you learn about remote inclusion and engagement"]} /><ReflectionBox prompt="What does inclusive leadership look like in your digital interactions? Are you as intentional online as you would be in person?" /></div>,
    <div key="s9"><SectionLabel text="Technology" /><SlideHeading title="Choosing and Auditing Technology" /><BodyText>The tools an organisation chooses for remote working either include or exclude. Technology decisions are inclusion decisions.</BodyText><BulletList items={["Choose collaboration tools that support accessibility, multilingual use, and equitable participation", "Offer training on digital tools so no employee is left behind due to skill gaps or access issues", "Regularly audit technology for bias: AI-driven scheduling or evaluation tools may disadvantage certain groups", "Ensure platforms work across different devices and bandwidth levels, not just for those with the latest hardware"]} /><KeyReminder text="Technology that only works well for some of your workforce is not a neutral choice." /></div>,
    <div key="s10"><SectionLabel text="Culture" /><SlideHeading title="Team Culture and Belonging Online" /><BodyText>Belonging does not happen automatically in virtual spaces. It has to be built deliberately.</BodyText><BulletList items={["Create psychological safety online: encourage employees to share ideas, ask questions, and raise concerns without fear of judgment", "Celebrate diversity virtually in ways that are meaningful and non-tokenistic: recognise cultural events, holidays, and achievements", "Be mindful of intersectionality in remote settings: employees may face compounded barriers such as time zone differences, caregiving responsibilities, or accessibility challenges", "Avoid recreating office-based social norms online that may exclude remote workers"]} /><ReflectionBox prompt="Do all members of your team feel equally visible and valued? How would you know if someone felt excluded?" /></div>,
    <div key="s11"><SectionLabel text="Accountability" /><SlideHeading title="Measuring Inclusion and Impact" /><BodyText>Inclusion without measurement is intention without accountability. Organisations need data to know whether their efforts are working.</BodyText><BulletList items={["Track online participation: monitor engagement in virtual meetings, platforms, and project contributions across identity groups", "Assess remote equity: review promotions, pay, and access to learning and visibility for remote employees compared to onsite staff", "Conduct regular surveys asking about experiences of inclusion, accessibility, psychological safety, and wellbeing in hybrid and remote settings", "Use the data to make changes and report back to your teams on what you found and what you will do"]} /><KeyReminder text="If you are not measuring it, you cannot improve it." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Inclusion Across Distance" /><BulletList items={["Hybrid and remote working must be designed with inclusion in mind; flexibility alone does not guarantee equity", "Digital accessibility, inclusive communication, and equitable meeting practices are foundational", "Policies should explicitly name the barriers they address and the people they protect", "Leaders set the tone; inclusive behaviour online matters as much as in person", "Measure participation, equity, and wellbeing data across identity groups and act on what you find"]} /><ReflectionBox prompt="What is one change you could make this week to improve inclusion for remote or hybrid members of your team?" subPrompts={["Is there someone who is regularly less visible in meetings?", "Are your tools and resources accessible to everyone?", "Do your policies reflect the real diversity of your workforce?"]} /><KeyReminder text="Inclusion across distance is not just about technology. It is about culture, trust, and who gets to belong." /></div>,
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
