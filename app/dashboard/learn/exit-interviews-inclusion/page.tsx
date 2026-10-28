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

export default function ExitInterviewsInclusion() {
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
    { q: "Why should exit interview data be analysed by demographic group rather than in aggregate only?", options: ["Because individual respondents should be identifiable", "Because patterns of departure may differ significantly by identity, revealing inequalities that aggregate data masks", "Because it is a legal requirement under the Equality Act", "Because it speeds up the analysis process"], correct: 1 },
    { q: "What is the main risk of line managers conducting their own team members' exit interviews?", options: ["The interview takes too long", "Departing employees are unlikely to be honest about interpersonal or managerial issues", "The manager may forget to take notes", "Exit interviews should only be conducted by HR"], correct: 1 },
    { q: "What does it mean to 'close the loop' on exit interview data?", options: ["Deleting interview records after a set period", "Informing staff what changes were made as a result of the feedback the organisation received", "Ensuring exit interviews are anonymous", "Conducting a follow-up interview six months after departure"], correct: 1 },
    { q: "Which of the following exit interview questions is specifically designed to surface inclusion data?", options: ["What is your main reason for leaving?", "Would you recommend this organisation to a friend?", "Did you feel your identity was respected here, and if not, can you say more about that?", "What advice would you give to your successor?"], correct: 2 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("exit-interviews-inclusion");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Exit Interviews That Surface Inclusion Data" subtitle="Learning from leavers to build a fairer workplace" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>When people leave an organisation, they often know exactly why. And they often know things the organisation does not: where inclusion breaks down, who gets overlooked, what goes unsaid in meetings. Exit interviews are one of the few moments when people may say those things honestly, if the conditions are right. Most organisations waste this opportunity. This lesson will help you not to.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to design and use exit interviews as a tool for surfacing inclusion data: understanding who leaves, why they leave, and what the organisation should change as a result.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why exit interview data is a valuable and often underused source of inclusion intelligence",
        "Identify the conditions under which departing employees are most likely to give honest, useful feedback",
        "Select and apply inclusion-focused exit interview questions across key areas of organisational experience",
        "Analyse exit data by demographic group to identify patterns of inequitable experience",
        "Close the loop by translating exit data into visible, communicated organisational change",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="The Value of Exit Data" /><SlideHeading title="Why Exit Interviews Matter for Inclusion" /><BodyText>Staff turnover is expensive. Research estimates the cost of replacing an employee at between 50% and 200% of their annual salary, accounting for recruitment, onboarding, lost productivity, and the impact on team morale. But beyond cost, who leaves tells you something important about the organisation's culture.</BodyText><BulletList items={["If people from particular groups leave at higher rates, that is evidence of an inequitable culture, not coincidence", "Voluntary departure often reflects accumulated experience rather than a single event: the exit interview can surface what was not said during employment", "Leavers have less to lose from honesty than current employees: they can give feedback that colleagues still in post may not feel safe to give", "Exit data, analysed over time and by demographic group, can reveal systemic patterns that pulse surveys and engagement data miss"]} /><KeyReminder text="The organisation that treats exit interviews as an admin box to tick is throwing away its most honest feedback." /></div>,

    <div key="s3"><SectionLabel text="Creating Conditions for Honesty" /><SlideHeading title="How to Get Useful Exit Interview Data" /><BodyText>The quality of exit interview data depends almost entirely on the conditions in which it is gathered. Most exit interviews fail to surface meaningful inclusion data not because the questions are wrong but because the environment is wrong.</BodyText><BulletList items={["The interview should never be conducted by the leaver's direct line manager: this is the person most likely to be part of the reason for leaving, and the dynamic makes honesty almost impossible", "Offer a choice of format: some leavers will be more honest in writing (an anonymous online survey) than in a conversation; offer both", "Explain how the data will be used and who will see it: anonymisation or aggregation of responses makes candour more likely", "Conduct the interview in the final two weeks of employment, not on the last day: on the last day, most people default to pleasantries"]} /><ReflectionBox prompt="Who currently conducts exit interviews in your organisation? How likely is a departing employee to be candid with that person?" /></div>,

    <div key="s4"><SectionLabel text="Question Bank: General Experience" /><SlideHeading title="Opening and Experience Questions" />
      <QuestionCard label="Overall experience" question="How would you describe your overall experience of working here? What were the high points, and what was most difficult?" why="Open and non-leading. Allows the leaver to frame their own narrative without being guided toward particular themes." />
      <QuestionCard label="Belonging" question="To what extent did you feel a sense of belonging at this organisation? Did that change over time?" why="Targets inclusion directly without requiring the leaver to use EDI terminology. Belonging is a felt sense that people can describe in their own words." />
      <QuestionCard label="Values alignment" question="Were the organisation's stated values reflected in how people were treated day to day? Can you give an example?" why="Surfaces gaps between espoused values and lived experience, which is one of the most common drivers of attrition among employees from underrepresented groups." />
    </div>,

    <div key="s5"><SectionLabel text="Question Bank: Identity and Inclusion" /><SlideHeading title="Questions That Surface Inclusion Data Directly" />
      <QuestionCard label="Identity" question="Did you feel that your identity, background, or personal characteristics were respected here? If there were times when they were not, would you be willing to share more?" why="Explicitly invites disclosure around protected characteristics without requiring the leaver to volunteer it unprompted. The optional framing reduces pressure." />
      <QuestionCard label="Belonging signals" question="Were there moments when you felt excluded, overlooked, or that you had to work harder than colleagues to be heard or to progress?" why="Targets the specific experiences of underrepresented employees without asking them to attribute those experiences to discrimination directly." />
      <QuestionCard label="Recommendation" question="Would you recommend this organisation as a place to work to someone from a similar background to you? Why or why not?" why="This formulation captures the inclusion experience more precisely than a general recommendation question. A person may recommend the organisation to some candidates but not others based on their own lived experience here." />
    </div>,

    <div key="s6"><SectionLabel text="Question Bank: Leadership and Management" /><SlideHeading title="Questions About Management and Leadership" />
      <QuestionCard label="Manager inclusion" question="Did your manager make you feel valued and included? Were there things they did well, or things you wish had been different?" why="Managerial behaviour is one of the strongest predictors of inclusion and attrition. This question generates actionable data about specific managers and management practice." />
      <QuestionCard label="Fairness" question="Did you feel that people in your team were treated consistently and fairly, regardless of their background or personal characteristics?" why="Allows leavers to surface inequality in task allocation, recognition, and workload without being asked to make legal claims." />
      <QuestionCard label="Speaking up" question="If you raised a concern or a different point of view, did you feel it was taken seriously? Were there times when you held back from speaking up?" why="Psychological safety data. High-quality inclusion data often comes from leavers who felt unable to speak up while employed." />
    </div>,

    <div key="s7"><SectionLabel text="Question Bank: Development and Progression" /><SlideHeading title="Questions About Opportunity and Progression" />
      <QuestionCard label="Development access" question="Did you have fair access to training, development, and opportunities to grow in your role? Were there things that were not available to you that you wanted?" why="Access to development is frequently inequitably distributed. This question surfaces both unmet need and perceived fairness." />
      <QuestionCard label="Progression" question="Did you feel you had a realistic path to progress in this organisation? If not, what stood in the way?" why="Progression barriers are a major driver of departure among underrepresented employees. This question surfaces structural and cultural barriers." />
      <QuestionCard label="Sponsorship" question="Did you have advocates within the organisation who championed your work and helped you access opportunities?" why="Sponsorship is distributed unequally across most organisations, often flowing through existing networks that exclude people from underrepresented groups." />
      <ReflectionBox prompt="Does your organisation track who accesses development opportunities and who is promoted, by demographic group? What does that data show?" /></div>,

    <div key="s8"><SectionLabel text="Question Bank: Policies and Culture" /><SlideHeading title="Questions About Policies, Support, and Culture" />
      <QuestionCard label="Policies" question="Were organisational policies, such as flexible working, parental leave, or reasonable adjustments, easy to access and use in practice?" why="There is often a gap between policy on paper and policy in practice. This question surfaces whether inclusive policies are operationally functional." />
      <QuestionCard label="Reporting" question="If you witnessed or experienced something at work that felt unfair or wrong, did you feel confident reporting it? What happened or what stopped you?" why="Captures data on psychological safety and the effectiveness of reporting mechanisms, which are central to an inclusive culture." />
      <QuestionCard label="Culture" question="How would you describe the culture here to someone considering joining? Is there anything about the culture you think the organisation should know?" why="Invites an honest culture assessment with explicit permission to say difficult things." />
    </div>,

    <div key="s9"><SectionLabel text="Analysing Exit Data" /><SlideHeading title="Turning Data Into Insight" /><BodyText>Collecting exit interviews is not enough. The value is in analysis. And the analysis must be inclusion-aware, not just aggregate.</BodyText><BulletList items={["Aggregate data can mask inequality: an overall positive exit survey score may conceal significantly worse experiences for employees from particular groups", "Analyse departure rates and exit themes by demographic group: gender, ethnicity, age, disability, and length of service at minimum", "Look for patterns over time: is the same department, manager, or team consistently associated with higher departure rates from underrepresented groups?", "Use thematic analysis to identify recurring language in exit interview responses: phrases that appear repeatedly often signal systemic issues that individual line managers or HR partners are not connecting across cases"]} /><KeyReminder text="If your exit data looks the same for everyone, your questions or your conditions are probably not good enough to surface the real picture." /></div>,

    <div key="s10"><SectionLabel text="Using the Data" /><SlideHeading title="Closing the Loop: From Data to Change" /><BodyText>Exit interview data loses most of its value if it is filed and not acted on. Closing the loop means translating what you hear into visible change, and communicating that change to staff.</BodyText><BulletList items={["Report exit themes and any demographic patterns to senior leadership and relevant governance bodies, such as an EDI committee or the board", "Identify the one or two changes that exit data most strongly supports and make those changes visible: 'We heard from people who left that X was a barrier; here is what we have done'", "Where exit data points to a specific manager or team, that must be addressed directly rather than averaged away in aggregate reporting", "Share what you have learned with current staff: transparency about what leavers said and what the organisation is doing about it builds trust"]} /><ReflectionBox prompt="Does your organisation currently report exit interview data to the board or a governance body? If so, does that report include demographic analysis?" /></div>,

    <div key="s11"><SectionLabel text="Design Principles" /><SlideHeading title="Designing a Better Exit Interview Process" /><BulletList items={["Offer both a conversation and an anonymous written option: different people are more candid in different formats", "Conduct interviews in the last two weeks, not the last day or after departure", "Ensure the interviewer is not the leaver's line manager and has no direct interest in the leaver's reasons for going", "Include at least three to four questions specifically designed to surface inclusion data, not just general satisfaction", "Store and code responses consistently so they can be analysed over time and across groups", "Set a cadence for reviewing exit data: quarterly is a minimum for organisations of any size", "Report back to staff annually on what exit data has told the organisation and what has changed as a result"]} /><KeyReminder text="An exit interview process that makes it easy for people to say nothing difficult will tell you nothing useful." /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Exit Interviews That Surface Inclusion Data" /><BulletList items={["Exit interviews are one of the most underused sources of inclusion intelligence available to organisations: the people leaving often know exactly what needs to change", "Honesty depends on conditions: never use the leaver's own manager; offer anonymous formats; explain how data will be used", "Generic exit questions rarely surface inclusion data: include specific questions about belonging, identity, fairness, and progression", "Aggregate data masks inequality: always analyse exit themes by demographic group to identify who is leaving and why", "Data is only useful if it leads to visible change: close the loop by reporting what you heard and communicating what the organisation has done differently"]} /><ReflectionBox prompt="What would your organisation's exit interview data tell you if you analysed it by demographic group?" subPrompts={["Do you currently have that data in a form that allows this analysis?", "Who would you share the findings with, and who would be responsible for acting on them?", "What is one change you would commit to making to your exit interview process?"]} /><KeyReminder text="People leave workplaces that do not include them. Exit interviews are your chance to hear that before it becomes your reputation." /></div>,
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
