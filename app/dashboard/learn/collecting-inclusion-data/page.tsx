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
function PrincipleCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.2rem" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>{title}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  );
}
function DoCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div style={{ border: `1.5px solid ${good ? "var(--sage-dark)" : "#f5a0a0"}`, borderRadius: "0.75rem", padding: "0.9rem 1.1rem", flex: 1 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: good ? "var(--sage-dark)" : "#c0392b", margin: "0 0 0.5rem" }}>{title}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{items.map((item, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", marginBottom: "0.35rem", lineHeight: 1.5 }}>{item}</li>)}</ul>
    </div>
  );
}

export default function CollectingInclusionDataLesson() {
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
    { q: "Why is it important to define clear objectives before collecting inclusion data?", options: ["So that employees know how much time the survey will take", "Without clear objectives, data collection risks becoming a compliance exercise rather than a tool for meaningful change", "To determine which software platform to use", "So that legal can approve the questions in advance"], correct: 1 },
    { q: "What is intersectional data collection and why does it matter?", options: ["Collecting data at different times of year to identify seasonal patterns", "Disaggregating data by multiple demographic characteristics simultaneously to understand how overlapping identities shape experience", "Asking questions about multiple departments in the same survey", "Collecting both qualitative and quantitative data in the same instrument"], correct: 1 },
    { q: "Which legislation governs how UK organisations must handle personal data, including demographic data?", options: ["The Equality Act 2010 and the Employment Rights Act 1996", "UK GDPR and the Data Protection Act 2018", "The Public Sector Equality Duty and the Human Rights Act 1998", "The Worker Protection Act 2023 and the Health and Safety at Work Act 1974"], correct: 1 },
    { q: "What is the most common reason inclusion data collection fails to drive change?", options: ["Surveys are too long and employees do not complete them", "The data is collected but not acted on, or findings are not shared with those who provided them", "The questions are not statistically validated", "HR does not have sufficient budget to analyse the data"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("collecting-inclusion-data");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Collecting Inclusion Data That Drives Decisions" subtitle="From numbers to meaningful change" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>You cannot manage what you do not measure. But in inclusion work, the reverse is also true: measuring without acting is corrosive. Employees who share data about their identity and experience are making an act of trust. If that data disappears into a spreadsheet and nothing changes, that trust is broken, often permanently. This lesson is about collecting inclusion data in ways that are ethical, accessible, and genuinely connected to action.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to design and implement ethical, accessible inclusion data collection that produces insights you can act on, while meeting your legal obligations under UK data protection law and earning the trust of the employees who share their data with you.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain the purpose and value of collecting inclusion data and why ethical design matters",
        "Design inclusive survey questions that avoid forced categorisation and capture intersectional experience",
        "Apply UK data protection obligations (UK GDPR and Data Protection Act 2018) to demographic data collection",
        "Plan for accessibility and representation at every stage of the data collection process",
        "Use inclusion data to drive tangible change rather than compliance reporting",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Data Matters" /><SlideHeading title="The Case for Collecting Inclusion Data" /><BodyText>Organisations that do not collect inclusion data are making decisions about the experiences of their employees based on assumption. Those decisions reflect the default: the experience of the majority, or of those whose voices are heard most readily.</BodyText><BulletList items={["Inclusion data tells you whether your policies, culture, and practices are working for all employees or only for some", "It allows you to identify disparities: in pay, in progression, in access to development, in experience of harassment or exclusion", "It provides a baseline against which to measure whether your inclusion initiatives are having the effect you intend", "It signals to employees that their experience matters, that you are serious about inclusion, and that you intend to be held accountable to evidence rather than good intentions", "The Equality Act 2010 and the Public Sector Equality Duty create legal frameworks within which data collection and analysis are expected tools for demonstrating compliance and progress"]} /><KeyReminder text="Data collection is not an HR administrative task. It is a commitment to let employee experience, rather than managerial assumption, guide inclusion decisions." /></div>,

    <div key="s3"><SectionLabel text="Key Considerations" /><SlideHeading title="Before You Collect: Five Key Questions" />
      <PrincipleCard label="1. Purpose" title="Why are you collecting this data?" body="Be specific. Are you tracking pay gaps by demographic? Measuring whether disabled employees feel included? Identifying barriers to progression for particular groups? Without a clear purpose, data collection produces numbers without insight." />
      <PrincipleCard label="2. Representation" title="Whose data are you collecting, and who is missing?" body="If your survey reaches some groups more than others, your data will reflect those groups. Consider who is less likely to respond and why, and design to close those gaps rather than accept them." />
      <PrincipleCard label="3. Privacy" title="How will this data be stored, accessed, and protected?" body="Demographic data is personal data under UK GDPR. Employees must understand what data is collected, why, how it is stored, who can access it, and how long it is retained. Anonymisation and aggregation are essential for sensitive categories." />
      <PrincipleCard label="4. Intersectionality" title="Are you capturing how identities overlap?" body="A woman who is also disabled and from a minority ethnic background may experience the workplace very differently from a white disabled woman. Disaggregated intersectional data reveals gaps that single-axis analysis will miss." />
      <PrincipleCard label="5. Avoiding harm" title="Could this data be used in ways that harm those who shared it?" body="Consider the risks: could individual employees be identified from small-sample data? Could findings be used to justify reducing resource rather than increasing it?" />
    </div>,

    <div key="s4"><SectionLabel text="Designing Questions" /><SlideHeading title="How to Design Inclusive Survey Questions" /><BodyText>The way you ask questions shapes the data you get and the signal you send to those answering them. Poor question design produces inaccurate data and tells employees that their experience does not fit the categories your organisation recognises.</BodyText><div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}><DoCard title="Design that includes" items={["Offer open-ended options alongside fixed categories: 'prefer to self-describe' or a free-text box", "Use language that reflects how people describe their own identity rather than administrative or legal categories alone", "Allow 'prefer not to say' as a genuine option, not a hidden catch-all", "Pilot questions with people from the groups they describe before launch", "Keep questions focused on experience rather than identity where possible"]} good={true} /><DoCard title="Design that excludes" items={["Binary gender options with no other choice", "Race and ethnicity categories that do not reflect the diversity of your workforce", "Disability questions that assume a specific kind of impairment", "Questions that conflate nationality and ethnicity", "Survey formats that are not accessible to employees with visual, cognitive, or motor impairments"]} good={false} /></div></div>,

    <div key="s5"><SectionLabel text="Accessibility" /><SlideHeading title="Making Data Collection Accessible" /><BodyText>A survey that not everyone can complete does not produce data about everyone. Accessibility must be designed in from the start, not added as an afterthought.</BodyText><BulletList items={["Offer multiple formats: an online survey, a paper version, and a telephone or in-person option for employees who need them", "Ensure digital surveys meet WCAG 2.1 AA accessibility standards: keyboard navigable, screen-reader compatible, sufficient colour contrast, and no time-limiting", "Provide translation support or translated versions for employees whose first language is not English", "Test the survey with a representative sample of employees before launch: include people with disabilities, people from different language backgrounds, and people at different levels of digital confidence", "Ensure the survey can be completed in work time: a survey employees are expected to fill in at home or in their own time excludes those with caring responsibilities or multiple jobs"]} /><ReflectionBox prompt="Who in your workforce is least likely to complete your current surveys? What would need to change for them to be included?" /></div>,

    <div key="s6"><SectionLabel text="Privacy and the Law" /><SlideHeading title="Data Protection and Inclusion Data" /><BodyText>Demographic data about protected characteristics is special category data under UK GDPR and the Data Protection Act 2018. This places additional obligations on the organisations that collect it.</BodyText><BulletList items={["You must have a lawful basis for processing special category data. For workplace inclusion data, this is most often explicit consent or the substantial public interest condition (Schedule 1, DPA 2018)", "You must conduct a Data Protection Impact Assessment (DPIA) before collecting special category demographic data at scale", "Employees must be told: what data is collected, why, how long it is kept, who can access it, and what their rights are", "Data must be stored securely and access limited to those who need it for legitimate purposes", "Individual-level demographic data should not be shared in reports: aggregate and anonymise, and suppress results where group sizes are small enough to risk identification (generally fewer than five respondents in a category)"]} /><KeyReminder text="Data protection is not a barrier to inclusion work. It is a framework for doing it ethically and with the trust of the people whose data you are collecting." /></div>,

    <div key="s7"><SectionLabel text="Intersectional Data" /><SlideHeading title="Collecting and Using Intersectional Data" /><BodyText>Most organisations collect demographic data in silos: gender data in one field, ethnicity in another, disability status in a third. This produces averages that hide the experiences of people whose identities intersect in ways that shape their experience distinctively.</BodyText><BulletList items={["Intersectional analysis means disaggregating data by multiple characteristics simultaneously: examining the experience of women of colour separately from the experience of white women and men of colour", "A gender pay gap analysis that does not account for ethnicity may show a gap has closed among women while the experience of Black and minority ethnic women has worsened", "Intersectional data requires larger sample sizes to be meaningful: it is more complex, but the insight it produces is significantly more actionable", "Where sample sizes are too small for intersectional statistical analysis, qualitative data (focus groups, interviews, open-text responses) can fill the gap", "The NIST Privacy Framework and PAS 1948 both support intersectional approaches to workforce data as best practice"]} /><ReflectionBox prompt="Does your current data collection allow you to understand the experience of people with overlapping characteristics? What would you need to change to make that possible?" /></div>,

    <div key="s8"><SectionLabel text="Driving Action" /><SlideHeading title="From Data to Decisions" /><BodyText>The most common reason inclusion data collection fails is not poor data: it is the gap between data and action. Employees fill in a survey, see nothing change, and conclude that the organisation is not serious about inclusion. The next survey sees a lower response rate. The cycle repeats.</BodyText><BulletList items={["Before you collect data, decide how you will use it: what decisions will this data inform, and who has authority to act on those decisions?", "Share findings with those who provided the data: employees who gave their time and shared personal information have a right to know what you found", "Be transparent about what the data shows, including findings that are uncomfortable. Positive-framing findings while downplaying problems destroys credibility", "Commit to specific actions based on the data, with timelines and named owners", "Review progress against those commitments in your next data collection cycle: close the loop"]} /><KeyReminder text="Data without action is surveillance. Action without data is guesswork. The goal is both: evidence-based decisions that lead to measurable change." /></div>,

    <div key="s9"><SectionLabel text="Communication" /><SlideHeading title="Communicating About Your Data" /><BodyText>How you communicate before, during, and after data collection is as important as the data itself. Communication builds or destroys the trust that determines whether employees share their data honestly.</BodyText><BulletList items={["Before collection: explain why you are collecting the data, what it will be used for, who will see it, and how it will be protected. Be specific and honest", "During collection: be clear about the voluntary nature of participation and make the 'prefer not to say' option visible and easy to use without stigma", "After collection: share what you found within a reasonable timeframe. Six months after a survey closes is too long; employees will have forgotten they participated", "When sharing findings: present them honestly, acknowledge gaps, and commit to action. A report that only highlights positives will not be trusted", "If you cannot take action on something the data reveals: say so, and say why. Silence is worse than an honest explanation of constraints"]} /></div>,

    <div key="s10"><SectionLabel text="Review and Iteration" /><SlideHeading title="Reviewing and Improving Your Approach" /><BodyText>Inclusion data collection is not a one-off project. It is an ongoing practice that should itself be reviewed and improved over time.</BodyText><BulletList items={["After each data collection cycle, evaluate: What did you find? What did you do with it? What changed? What was the response rate, and who is still not responding?", "Involve employees in reviewing the process: employee networks and representative groups can give you direct feedback on whether the survey questions felt relevant, the format was accessible, and the communication was clear and trustworthy", "Update your questions as the conversation around identity evolves: terminology, categories, and best practice change. A survey designed in 2019 may not reflect how employees describe themselves in 2025", "Review your legal basis and DPIA annually: data protection law and ICO guidance develop, and your purposes may change", "Track trends over time: year-on-year data is significantly more powerful than a one-year snapshot. Establish a consistent methodology so results are comparable"]} /><ReflectionBox prompt="If you reviewed your last inclusion survey with a small group of employees who had completed it, what do you think they would tell you?" /></div>,

    <div key="s11"><SectionLabel text="The Legal Framework" /><SlideHeading title="Standards and Legal Obligations" /><BodyText>Several legal frameworks and standards govern or inform how organisations should collect and use inclusion data in the UK.</BodyText><BulletList items={["UK GDPR and the Data Protection Act 2018: govern the collection, storage, and use of personal data including special category demographic data. DPIA required for large-scale special category processing", "The Equality Act 2010: the foundation for understanding which characteristics require data collection and analysis, and the framework within which disparities identified by data may constitute unlawful discrimination", "The Public Sector Equality Duty (PSED): requires public bodies to publish equality information and equality objectives, with inclusion data as the evidential basis", "PAS 1948 (BSI Code of Practice for Inclusive Workplaces): includes guidance on data collection as part of a systematic approach to workplace inclusion", "NES (National Equality Standard): sets requirements for evidencing inclusion practice, including data collection and analysis, for organisations seeking accreditation", "BS ISO 30415:2021: the international standard for diversity and inclusion in human resource management, which includes data collection as a core practice"]} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Collecting Inclusion Data That Drives Decisions" /><BulletList items={["Data collection is an act of trust: employees who share their identity and experience are trusting you to use it well. Failing to act on data breaks that trust, sometimes permanently", "Define your purpose before you collect: what decisions will this data inform, and who has the authority to act on those decisions?", "Design for inclusion at every stage: questions, formats, accessibility, and communication must all be designed to reach those who are least visible in your existing data", "Demographic data is special category data under UK GDPR: DPIA, lawful basis, anonymisation, and access controls are legal requirements, not optional extras", "Intersectional data reveals what single-axis data hides: overlapping identities produce overlapping disadvantages that aggregate averages will not show", "Close the loop: share findings honestly, commit to specific actions, and report back on progress. Data without action is surveillance; action without data is guesswork"]} /><ReflectionBox prompt="What is one thing your organisation currently measures about inclusion? What is one thing it does not measure that, if it did, would change how you make decisions?" subPrompts={["Who is currently missing from your data because of how it is collected?", "What would you do differently if you knew that the people who most need to be counted are the least likely to complete your current survey?"]} /><KeyReminder text="Collecting inclusion data well is itself an inclusion practice. The way you ask, who you reach, and what you do with what you learn all signal whether inclusion is something you measure for compliance or something you are genuinely committed to." /></div>,
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
