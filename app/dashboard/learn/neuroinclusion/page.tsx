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
function StrategyCard({ area, items }: { area: string; items: string[] }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--sage-dark)", margin: "0 0 0.4rem" }}>{area}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{items.map((item, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", marginBottom: "0.3rem", lineHeight: 1.5 }}>{item}</li>)}</ul>
    </div>
  );
}

export default function NeuroinclustionLesson() {
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
    { q: "What does neurodiversity mean?", options: ["The presence of employees with diagnosed neurological conditions in an organisation", "The natural variation in how human brains are wired, encompassing the full range of cognitive styles and abilities", "A term used only in medical and educational settings to describe learning disabilities", "A legal category under the Equality Act 2010 that requires specific adjustments"], correct: 1 },
    { q: "Why should support plans for neurodivergent employees be co-created with the employee rather than designed by managers?", options: ["Because managers do not have the authority to approve adjustments without HR involvement", "Because neurodivergent employees are the experts on their own needs, and what works for one person with ADHD may not work for another", "Because the Equality Act 2010 requires employee sign-off on all reasonable adjustment plans", "Because co-creation is faster than developing plans independently"], correct: 1 },
    { q: "Which of the following is an example of an inclusive communication practice for neurodivergent employees?", options: ["Always asking people to contribute in open group discussion to ensure equal participation", "Sharing agendas in advance, using clear concise instructions in writing and verbally, and summarising key points after meetings", "Removing structured meeting formats to allow more spontaneous discussion", "Sending a single written summary instead of holding any verbal meetings"], correct: 1 },
    { q: "What is the risk of addressing neurodivergent needs only at the individual level, without building a neuroinclusive culture?", options: ["It is more expensive than a culture-wide approach", "Individual adjustments are helpful but leave in place a default environment that creates barriers: neuroinclusion requires systemic change, not only individual accommodation", "It is not legally compliant", "Individual approaches always work better than culture-level approaches"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("neuroinclusion");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Neuroinclusion at Work: What Leaders Need to Know" subtitle="Building environments where all brains can thrive" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Estimates suggest that around 15 to 20 percent of people are neurodivergent, though many are undiagnosed. That means in any team of ten, one or two people are likely to experience the world, process information, and work in ways that differ significantly from what most workplaces are designed for. Most workplaces are built around neurotypical assumptions: that everyone works best in open-plan offices, learns well from verbal-only instruction, performs under time pressure, and thrives in fast-paced social environments. Neuroinclusion challenges those assumptions and builds something better for everyone.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to understand neurodiversity, recognise the practical implications of neuroinclusion at work, and apply a range of strategies across working conditions, communication, environment, and culture that help all employees bring their best.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain the concept of neurodiversity and describe the range of conditions it includes",
        "Identify the most common workplace barriers faced by neurodivergent employees and describe how to address them",
        "Apply practical strategies across flexible working, communication, environment, technology, and culture to support neurodivergent employees",
        "Co-create personalised support plans with employees in ways that respect autonomy and confidentiality",
        "Describe the elements of a neuroinclusive hiring and onboarding process",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Foundations" /><SlideHeading title="What Is Neurodiversity?" /><BodyText>Neurodiversity is the recognition that human brains are naturally varied in how they are wired and how they function. Rather than treating neurological difference as deficit, a neurodiversity framework recognises cognitive variation as a natural feature of human populations.</BodyText><BulletList items={["Neurodivergent describes people whose brains function differently from what is considered typical: this includes autism, ADHD, dyslexia, dyspraxia, dyscalculia, Tourette syndrome, and other conditions", "Neurotypical describes people whose brain function aligns with prevailing social norms: not superior, just the design standard most workplaces have been built around", "Many neurodivergent people have significant strengths: pattern recognition, creative thinking, intense focus, attention to detail, and the ability to make connections others miss are frequently associated with neurodivergent cognitive styles", "Neurodivergence is a spectrum: two people with the same diagnosis may experience very different strengths and challenges. The label is a starting point, not a description of the individual", "Many neurodivergent employees are undiagnosed: designing for neuroinclusion means designing for the range of cognitive styles in your team, not only for those with formal diagnoses"]} /><KeyReminder text="Neuroinclusion is not about managing deficits. It is about designing environments that work for a wider range of brains, and in doing so, improving conditions for everyone." /></div>,

    <div key="s3"><SectionLabel text="Flexible Working" /><SlideHeading title="Creating Flexible Working Conditions" /><BodyText>Many of the barriers neurodivergent employees face are rooted in rigid working structures that assume all people concentrate, communicate, and produce their best work in the same way at the same time.</BodyText>
      <StrategyCard area="Scheduling flexibility" items={["Offer flexible hours, hybrid or remote options, or adjusted schedules: commuting in rush hour, working in open offices, and strict 9-to-5 structures present barriers for many neurodivergent employees", "Allow movement breaks, quiet time, and sensory regulation breaks without stigma: the need to move, decompress, or regulate sensory input is not poor performance; it is self-management", "Provide choice in work location including quiet zones, low-light areas, and private spaces: environmental control is a productivity tool, not a perk"]} />
      <StrategyCard area="Workload and expectations" items={["Break large tasks into manageable steps with clear milestones: open-ended tasks without structure are a significant barrier for many people with ADHD or autism", "Use project management tools that support structure and organisation: shared task lists, clear priorities, and written records of decisions reduce cognitive load", "Avoid sudden changes without explanation: predictability is not rigidity; for many neurodivergent employees it is the foundation of being able to function well", "Provide clarity on priorities so staff know what is urgent versus non-urgent: ambiguity about importance is a source of significant anxiety and inefficiency"]} />
    </div>,

    <div key="s4"><SectionLabel text="The Environment" /><SlideHeading title="Adapting the Physical Environment" /><BodyText>Open-plan offices, fluorescent lighting, and noisy shared spaces were not designed with neurodivergent employees in mind. Making adjustments to the physical environment reduces sensory barriers that significantly affect the ability to focus and perform.</BodyText><BulletList items={["Reduce sensory overload: harsh lighting, loud spaces, and strong smells are significant barriers for employees who are sensitive to sensory input. This includes people with autism and many people with ADHD", "Provide noise-cancelling headphones, desk dividers, or low-stimulation areas: these should be available as workplace tools, not special accommodations requiring justification", "Ensure seating and workspace layouts can be adjusted to individual needs: one-size-fits-all desk arrangements do not work for everyone", "Consider environmental adjustments before you receive a request for them: a proactive audit of your workplace environment sends a clearer signal about your commitment to inclusion than reactive adjustment alone", "Extend environmental thinking to remote and hybrid work: the home office also has sensory considerations, and remote workers benefit from guidance and support in creating an environment that works for their cognitive style"]} /><ReflectionBox prompt="Think about the physical environment your team works in. What sensory or structural barriers might be present that you have not explicitly noticed or addressed?" /></div>,

    <div key="s5"><SectionLabel text="Communication" /><SlideHeading title="Improving Communication Practices" /><BodyText>Many neurodivergent employees experience communication barriers in standard workplace settings: verbal-only instruction, fast-paced meetings, and an expectation to think and respond quickly all present challenges that inclusive communication practices can address.</BodyText><BulletList items={["Use clear, concise instructions in both written and verbal form: vague or implied expectations are harder to navigate for many neurodivergent employees", "Provide information in multiple formats: visual guides, step-by-step written instructions, and recorded summaries support different processing styles", "Allow extra processing time and avoid putting people on the spot in meetings: calling on people unexpectedly creates anxiety and does not produce the most considered contributions", "Share agendas in advance: knowing what will be discussed and in what order allows preparation and reduces the anxiety of unpredictability", "Summarise key points and actions in writing after meetings: verbal-only communication leaves many neurodivergent employees with uncertainty about what was decided and what is expected of them", "Confirm understanding by asking how something landed, not just whether it was understood: 'Does that make sense?' is answered by 'yes' regardless of whether it does"]} /></div>,

    <div key="s6"><SectionLabel text="Technology" /><SlideHeading title="Supportive Technology and Tools" /><BodyText>Technology offers a significant range of tools that can remove barriers for neurodivergent employees. Making these tools available, normalised, and actively supported rather than individual accommodations requires specific request produces a more inclusive environment.</BodyText><BulletList items={["Speech-to-text and text-to-speech software: support employees who find writing difficult or who process spoken information better than written, or vice versa", "Mind-mapping tools for planning ideas: many neurodivergent thinkers are non-linear; mind-mapping supports idea generation and planning in ways that linear lists do not", "Timers, reminders, and digital organisers: time management and task-switching are common challenges for people with ADHD. Structured digital support tools reduce the cognitive load of self-organisation", "Dyslexia-friendly fonts and colour overlays: small formatting changes can significantly reduce the effort required to read and process text for employees with dyslexia", "Project management and task-tracking platforms: clear visual representation of tasks, priorities, and deadlines reduces ambiguity and supports self-management"]} /><KeyReminder text="The best technology tools for neurodivergent employees are often also the best tools for everyone. Universal design benefits the whole team." /></div>,

    <div key="s7"><SectionLabel text="Co-Creating Support" /><SlideHeading title="Personalised Support Plans" /><BodyText>Neurodivergent employees are the experts on their own needs. Support plans that are imposed rather than co-created are less effective, less trusted, and more likely to miss what actually matters to the individual.</BodyText><BulletList items={["Develop personalised support plans collaboratively: start with open questions ('What do you need to work at your best?') rather than a predetermined menu of adjustments", "Review adjustments regularly: needs can evolve over time as roles change, conditions fluctuate, or the employee develops new strategies. An annual review at minimum, with an open-door policy for changes in between", "Ensure confidentiality and autonomy in decision-making: the employee decides what information is shared, with whom, and when. Their condition, diagnosis, or support plan is not for disclosure without their explicit consent", "Provide access to occupational health, coaching, or employee assistance programme services: external support from specialists complements what a line manager can provide", "Offer mentoring or buddy systems: a neurodivergent employee who is new to a role or organisation benefits from a trusted peer who can help them navigate informal expectations as well as formal processes"]} /><ReflectionBox prompt="How are support conversations currently initiated in your team? Is it the manager who asks, the employee who requests, or neither? What would a more proactive approach look like?" /></div>,

    <div key="s8"><SectionLabel text="Support Systems" /><SlideHeading title="Strengthening Support Around the Individual" /><BodyText>Individual adjustments are necessary but not sufficient. The conditions that surround a neurodivergent employee, including the behaviour of their colleagues, the culture of the team, and the quality of regular support, matter as much as formal adjustments.</BodyText><BulletList items={["Provide regular 1:1 check-ins focusing on wellbeing and workload, not just performance: a question like 'How are you finding things this week?' creates space that a performance review does not", "Normalise adjustments by making them available to everyone: when noise-cancelling headphones, flexible hours, and structured agendas are team norms rather than individual accommodations, neurodivergent employees are less conspicuous and more included", "Train all staff in neurodiversity awareness, not just managers: a team that understands neurodiversity is less likely to misread neurodivergent behaviour as rudeness, aloofness, or poor performance", "Avoid stereotypes and deficit-based language: 'They can't help it' and 'They're not great with people' are deficit framings. 'They process things differently' and 'They work best with written briefs' are accurate and non-stigmatising", "Encourage understanding and non-judgemental communication throughout the team: neurodivergent employees are more likely to thrive in teams where difference is met with curiosity rather than compliance pressure"]} /></div>,

    <div key="s9"><SectionLabel text="Psychological Safety" /><SlideHeading title="Protecting Psychological Safety" /><BodyText>Psychological safety, the sense that one can speak, question, and be oneself without fear of negative consequence, is foundational for neurodivergent employees. Many have spent years masking their neurodivergence to fit in, at significant personal cost.</BodyText><BulletList items={["Provide safe spaces for disclosure but never pressure disclosure: an employee who chooses not to disclose their neurodivergence has every right to that privacy. Safe disclosure environments are built by visible acceptance and support, not by asking people to identify themselves", "Challenge microaggressions and ableist assumptions: comments about social awkwardness, attention to detail, or unusual behaviour that are framed as character flaws rather than cognitive differences cause significant harm", "Foster a culture where mistakes are learning opportunities, not punishable: fear of making mistakes has an outsized effect on neurodivergent employees, many of whom already spend significant energy managing the gap between their internal experience and external expectations", "Ask 'What do you need to work at your best?' as a standard question for all employees: normalising this question removes the stigma of it being asked only when problems arise", "Model imperfection and flexibility at leadership level: leaders who admit uncertainty, change their approach, and ask for support signal that it is safe for others to do the same"]} /></div>,

    <div key="s10"><SectionLabel text="Hiring and Onboarding" /><SlideHeading title="Neuroinclusive Hiring and Onboarding" /><BodyText>Many neurodivergent people are filtered out of recruitment processes that are designed to assess confidence and social fluency rather than actual capability. Inclusive hiring adjusts the process to assess the skills the role actually requires.</BodyText><BulletList items={["Provide interview questions in advance: this is a reasonable adjustment that allows neurodivergent candidates to demonstrate their knowledge rather than their ability to respond under pressure", "Offer alternative application formats: a timed online test, a panel interview, and a traditional written application all assess different things. Flexible formats identify talent the standard process misses", "Avoid panel-heavy or rapid-fire interview formats: these environments significantly disadvantage neurodivergent candidates, particularly those with social anxiety, ADHD, or autism, without measuring anything relevant to most roles", "Give structured, predictable onboarding with clear expectations: the first weeks in a new role are intense for anyone; for neurodivergent employees, explicit structure, written guidance, and a named person to ask for help can make the difference between staying and leaving", "Review your job descriptions: requirements for 'excellent communication skills', 'strong team player', and 'ability to multitask' may inadvertently screen out neurodivergent candidates who would excel in the role if assessed on relevant skills"]} /></div>,

    <div key="s11"><SectionLabel text="Neuroinclusive Culture" /><SlideHeading title="Building a Neuroinclusive Culture" /><BodyText>Individual adjustments, however well-designed, sit inside a culture. A neuroinclusive culture is one where difference in cognitive style is understood, respected, and actively accommodated as a feature of the team rather than a problem to be managed.</BodyText><BulletList items={["Treat neuroinclusion as a leadership responsibility, not an HR task: the way a manager responds to neurodivergent behaviour, requests for adjustment, and disclosure sets the cultural standard for the team", "Share knowledge: neurodiversity awareness training for all staff builds shared understanding that reduces the isolation and misunderstanding experienced by many neurodivergent employees", "Celebrate cognitive diversity as a genuine strength: different ways of processing information, seeing problems, and approaching tasks are valuable. Organisations that harness neurodivergent strengths outperform those that simply accommodate neurodivergent needs", "Connect with employee resource groups or neurodiversity networks: external networks and internal groups provide peer support, specialist knowledge, and a route for neurodivergent employees to influence practice", "Review progress: are neurodivergent employees joining and staying at the same rates as neurotypical employees? Are they reaching senior roles? Are adjustments in place being reviewed and working? Use data to drive improvement"]} /><ReflectionBox prompt="In your team's culture, how is cognitive difference currently treated: as a problem, a curiosity, or a strength? What would need to change for it to be the last of these?" /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Neuroinclusion at Work: What Leaders Need to Know" /><BulletList items={["Neurodiversity describes natural variation in how brains work: it is not a deficit category, and neurodivergent employees bring genuine strengths alongside their challenges", "Around 15 to 20 percent of people are neurodivergent, many undiagnosed: designing for neuroinclusion means designing for the range of cognitive styles in your team, not only for those with formal diagnoses", "The most effective adjustments are co-created: ask 'What do you need to work at your best?' rather than imposing a predetermined support plan", "Environment, communication, and workload structure are the three levers leaders have the most control over: flexible hours, written instruction, sensory-reduced spaces, clear priorities, and advance agendas all reduce barriers without requiring formal diagnosis", "Psychological safety is foundational: many neurodivergent employees have spent years masking. A culture where difference is met with curiosity and adjustments are normalised makes it safer to stop"]} /><ReflectionBox prompt="What is one practice you will change or introduce in your team as a result of this lesson?" subPrompts={["Is there someone in your team whose working style you have been misreading rather than adapting to?", "Are there communication or environmental barriers in your team that a neuroinclusive lens would identify?", "What would it look like to make neuroinclusion a team norm rather than an individual accommodation?"]} /><KeyReminder text="Neuroinclusion is not accommodation for the few. It is better design for everyone. A workplace built for the widest range of brains produces better thinking, higher retention, and a more genuinely inclusive culture." /></div>,
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
