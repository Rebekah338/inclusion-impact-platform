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

export default function AgeInclusiveWorkplaces() {
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
    { q: "Ageism in the workplace affects which group of employees?", options: ["Only employees over 50", "Only employees under 30", "Both younger and older employees", "Only employees approaching retirement"], correct: 2 },
    { q: "Which of the following is an example of age-coded language in a job advertisement?", options: ["Strong communication skills required", "Experience with data analysis essential", "Seeking a young and energetic team player", "Ability to manage competing priorities"], correct: 2 },
    { q: "What does reverse mentoring involve?", options: ["Senior staff mentoring new employees on company culture", "Younger or less experienced employees sharing knowledge with more senior colleagues", "Managers providing feedback on team performance", "A structured programme for employees returning from career breaks"], correct: 1 },
    { q: "Why is intersectionality important when addressing ageism?", options: ["Because age is the only protected characteristic that matters in this context", "Because ageism compounds with other characteristics such as race, gender, and disability to create multiple barriers", "Because intersectionality only applies to gender and race", "Because older employees are always more disadvantaged than younger ones"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("age-inclusive-workplaces");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Age-Inclusive Workplaces: Recognising and Addressing Ageism" subtitle="Valuing talent at every stage of a career" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Ageism is one of the most normalised forms of discrimination in working life. Jokes about being too old or too young, assumptions about ambition or adaptability, and policies that quietly advantage certain career stages are all part of the same problem. Age-inclusive workplaces recognise talent regardless of when someone was born.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will give you the practical knowledge and tools to recognise, challenge, and address ageism at work: across recruitment, development, performance management, culture, and measurement.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain what ageism is and how it affects both younger and older employees",
        "Identify age-coded language and bias in recruitment, development, and performance processes",
        "Apply practical strategies to build age-inclusive culture, leadership, and policy",
        "Describe what intersectional ageism looks like and why it requires a compounded response",
        "Use data and accountability frameworks to measure and improve age inclusion",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Understanding Ageism" /><SlideHeading title="What Is Ageism and Why Does It Matter?" /><BodyText>Ageism is discrimination, prejudice, or stereotyping based on a person's age. Unlike many other forms of bias, it is widely normalised in workplace culture: age-based jokes are often laughed off, assumptions about older workers' adaptability go unchallenged, and younger employees' authority is routinely undermined.</BodyText><BulletList items={["Ageism affects both younger and older employees, though in different ways and with different consequences", "Age stereotypes shape expectations, opportunity, and credibility in ways that are rarely named or examined", "Ageism compounds with other identities: a Black woman in her 50s or a young disabled man may face qualitatively different barriers than those facing age alone", "Recognising ageism as systemic, not just individual bias, is the foundation of addressing it effectively"]} /><ReflectionBox prompt="Where have you seen ageism show up at work? Has it been named as such, or has it passed as normal?" /></div>,
    <div key="s3"><SectionLabel text="Recruitment" /><SlideHeading title="Age Bias in Recruitment and Job Design" /><BodyText>Recruitment is one of the places ageism is most embedded. Language, criteria, and processes can all quietly screen out candidates based on age.</BodyText><BulletList items={["Audit job adverts and role descriptions to remove age-coded language such as 'young and energetic' or 'digital native'", "Base selection criteria on skills, outcomes, and relevant experience rather than assumptions about what someone of a certain age can do", "Use structured shortlisting and scoring frameworks to reduce unconscious age bias in sifting and interviewing", "Include diverse interview panels across age and background and track recruitment outcomes by age group to identify where bias may be operating"]} /><KeyReminder text="If your job advert only appeals to one generation, you are narrowing your talent pool before candidates even apply." /></div>,
    <div key="s4"><SectionLabel text="Career Development" /><SlideHeading title="Equal Access to Growth and Opportunity" /><BodyText>Development opportunities are not always distributed equitably across age groups. Older employees may be passed over for training, and younger employees may be denied stretch assignments or leadership pathways.</BodyText><BulletList items={["Ensure equal access to learning, mentoring, and stretch assignments across all age groups without assumptions about who wants or needs development", "Avoid the assumption that older staff have nothing left to learn, or that younger staff lack the ambition or readiness to lead", "Track participation in training and promotion opportunities by age to identify where access is unequal", "Implement reverse mentoring and cross-generational coaching to break down age-based assumptions and build mutual respect"]} /><ReflectionBox prompt="In your organisation, who gets access to the most interesting development opportunities? Is age a factor, even implicitly?" /></div>,
    <div key="s5"><SectionLabel text="Performance Management" /><SlideHeading title="Fair Feedback Across the Career Span" /><BodyText>Performance management processes often contain subtle age bias that goes unexamined. The language used in appraisals and the standards applied to different employees can reflect age-based assumptions rather than measurable outcomes.</BodyText><BulletList items={["Base feedback and appraisals on measurable outcomes, not age-based assumptions about energy, ambition, or adaptability", "Avoid applying different standards to risk-taking, assertiveness, or ambition based on how old someone is", "Challenge language in performance reviews that reflects age bias: phrases like 'needs to mature' or 'lacks energy' are often age-coded rather than performance-based", "Review performance feedback across teams to identify inconsistencies and ensure fair, transparent outcomes for all age groups"]} /><KeyReminder text="If your feedback describes personality traits rather than observable outcomes, it is at risk of age bias." /></div>,
    <div key="s6"><SectionLabel text="Leadership" /><SlideHeading title="Age Diversity in Leadership and Decision-Making" /><BodyText>Leadership teams that lack age diversity miss out on the full range of perspectives, experiences, and approaches that different career stages bring.</BodyText><BulletList items={["Review leadership and decision-making teams for age diversity and set goals to address gaps", "Sponsor talent across all age groups to create equitable access to positions of influence and visibility", "Challenge assumptions that older staff are less adaptable to change or that younger staff are too inexperienced to lead", "Design leadership development pathways that draw on talent across all career stages rather than defaulting to a narrow profile"]} /><ReflectionBox prompt="Who tends to be promoted into leadership in your organisation? What implicit assumptions about age and readiness might be shaping those decisions?" /></div>,
    <div key="s7"><SectionLabel text="Culture and Language" /><SlideHeading title="Everyday Language and Culture" /><BodyText>Age discrimination does not only happen in formal processes. It lives in the everyday language and culture of teams and organisations.</BodyText><BulletList items={["Address jokes, stereotypes, and assumptions about age in meetings and informal spaces: name them as harmful, not harmless", "Encourage mutual respect and intergenerational learning rather than tolerating generational division or mockery", "Equip managers and staff with the language and confidence to challenge ageist behaviour in the moment", "Introduce cultural norms and behavioural standards that explicitly prohibit ageist language and hold people accountable"]} /><KeyReminder text="Ageist jokes are not harmless banter. They set the cultural conditions for more serious discrimination." /></div>,
    <div key="s8"><SectionLabel text="Flexible Working" /><SlideHeading title="Flexible Working and Life Stage Transitions" /><BodyText>Different age groups have different relationships with flexible working, and the assumptions made about those relationships can themselves be a form of ageism.</BodyText><BulletList items={["Provide flexible working options without making age-based assumptions about who needs them: an older employee is not automatically slow or disengaged, and a younger employee is not automatically uncommitted", "Recognise that life stage transitions including career breaks, caring responsibilities, health changes, and phased retirement affect employees across the age range, not only at particular points", "Monitor the impact of flexible working policies on career progression across age groups to ensure flexibility does not become a career penalty", "Build flexibility into policies for everyone and track uptake by age to identify any unintended patterns"]} /><ReflectionBox prompt="Does your flexible working policy work equally well for employees at all life stages? What assumptions are built into it?" /></div>,
    <div key="s9"><SectionLabel text="Intersectionality" /><SlideHeading title="Intersectionality and Compounding Bias" /><BodyText>Ageism rarely operates in isolation. For many employees, age intersects with other dimensions of identity to create compounded and qualitatively different experiences of exclusion.</BodyText><BulletList items={["Understand how ageism intersects with gender, race, disability, sexuality, and class to create barriers that are more than the sum of their parts", "Avoid solutions that only reflect the experiences of the most advantaged age groups: an older white man and an older Black woman may face very different challenges in the same organisation", "Involve people who are most impacted when shaping responses to ageism, without placing extra pressure or responsibility on them to fix it", "Review age-related complaints and progression data alongside other characteristics to identify where people face multiple and compounding barriers"]} /><KeyReminder text="An age inclusion strategy that does not account for intersectionality will leave the most marginalised employees behind." /></div>,
    <div key="s10"><SectionLabel text="Manager Capability" /><SlideHeading title="Building Manager Capability and Accountability" /><BodyText>Managers are where age inclusion policy is either enacted or undermined. Their capability and accountability matters enormously.</BodyText><BulletList items={["Support managers to spot and challenge age-based assumptions in real time, not just in formal processes", "Make age inclusion a clear part of leadership expectations and build it into performance goals", "Give managers tools and support to handle difficult conversations confidently: guidance frameworks, scripts, and coaching", "Build age inclusion into manager goals and performance measures so it is recognised as professional expectation, not optional goodwill"]} /><ReflectionBox prompt="How confident are your managers in naming and challenging age bias? What support would make the biggest difference?" /></div>,
    <div key="s11"><SectionLabel text="Accountability" /><SlideHeading title="Reporting, Measurement, and Continuous Progress" /><BodyText>Age inclusion without measurement is good intention without accountability. Organisations need data and clear reporting processes to know whether things are actually changing.</BodyText><BulletList items={["Provide multiple safe routes for raising concerns about ageism: via line managers, anonymous reporting, or formal HR channels", "Respond to complaints based on impact rather than intent: the harm done matters regardless of what was meant", "Track recruitment, pay, progression, attrition, and engagement by age and review for inequities", "Use data to inform continuous improvement rather than to defend current practice and share progress and lessons learned across the organisation to build trust and accountability"]} /><KeyReminder text="Regularly communicating reporting options, acting on what you hear, and sharing what changed are the marks of an organisation that takes age inclusion seriously." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Age-Inclusive Workplaces" /><BulletList items={["Ageism affects both younger and older employees and is one of the most normalised forms of workplace discrimination", "Age bias lives in recruitment language, performance feedback, development access, and everyday culture: audit all of them", "Reverse mentoring and cross-generational programmes build mutual respect and break down age-based assumptions", "Intersectionality matters: ageism compounds with race, gender, disability, and other characteristics to create multiple barriers", "Measure recruitment, progression, pay, and attrition by age; use data to drive improvement, not to defend the status quo"]} /><ReflectionBox prompt="What is one change you could make this week to challenge age bias in your team or organisation?" subPrompts={["Is there age-coded language in your job adverts or performance processes?", "Do all age groups have equal access to development and stretch opportunities?", "When did you last hear an age-based comment go unchallenged?"]} /><KeyReminder text="Age-inclusive workplaces do not happen by default. They are built deliberately, one policy, one conversation, and one decision at a time." /></div>,
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
