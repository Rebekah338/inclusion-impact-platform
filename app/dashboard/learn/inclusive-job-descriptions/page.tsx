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
function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", margin: "1rem 0" }}>
      <div style={{ background: "#fff5f5", border: "1px solid #f5a0a0", borderRadius: "0.6rem", padding: "0.85rem 1rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, color: "#b94a4a", margin: "0 0 0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Avoid</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.5 }}>{before}</p>
      </div>
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-dark)", borderRadius: "0.6rem", padding: "0.85rem 1rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--sage-dark)", margin: "0 0 0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Use instead</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.5 }}>{after}</p>
      </div>
    </div>
  );
}

export default function InclusiveJobDescriptions() {
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
    { q: "Which of the following is an example of gender-coded language in a job description?", options: ["Relevant experience in a related field", "Seeking a sharp salesman for our aggressive team", "Must be able to manage competing priorities", "Applications from all backgrounds are welcome"], correct: 1 },
    { q: "Why should long lists of essential criteria be avoided in job descriptions?", options: ["Because they make the advert look too formal", "Because they can deter strong candidates from underrepresented groups who are less likely to apply unless they meet every requirement", "Because they are always inaccurate", "Because they increase the cost of advertising"], correct: 1 },
    { q: "What is the inclusive alternative to 'Must be a native English speaker'?", options: ["Must speak English as a first language", "Must be fluent in English", "Must be able to communicate effectively in English for work purposes", "Must have English as their primary language"], correct: 2 },
    { q: "What should a job description include to signal genuine commitment to inclusion?", options: ["A list of perks and benefits", "A statement welcoming applications from all backgrounds and mentioning reasonable adjustments", "The organisation's mission statement", "The salary band only if it is above market rate"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("inclusive-job-descriptions");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Write Job Descriptions That Include Everyone" subtitle="Removing barriers before candidates even apply" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>A job description is not just a list of tasks. It is a signal: about who this organisation is for, who is welcome to apply, and what kind of workplace this is. Most organisations lose diverse talent before the hiring process even begins, through language that quietly says "this role was not written with you in mind."</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to write and audit job descriptions that attract a wider, more diverse candidate pool by using inclusive, accessible language and removing unnecessary barriers.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Identify common language patterns in job descriptions that exclude candidates from underrepresented groups",
        "Replace gender-coded, ageist, ableist, and jargon-heavy language with inclusive alternatives",
        "Write criteria focused on skills and competencies rather than subjective traits or unnecessary requirements",
        "Signal commitment to inclusion and accessibility within the job description itself",
        "Apply a practical checklist to audit any existing job description for inclusive language",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Language Matters" /><SlideHeading title="The Cost of Exclusive Language" /><BodyText>Research consistently shows that job description language affects who applies. Candidates make rapid judgements about whether an organisation is likely to welcome them, and the language of a job advert is one of the first signals they read.</BodyText><BulletList items={["Gender-coded words such as 'aggressive', 'dominant', and 'ninja' reduce applications from women; words like 'nurturing' and 'supportive' reduce applications from men", "Ageist language such as 'young and energetic' or 'digital native' deters both older and younger candidates and may constitute indirect discrimination", "Jargon and internal terminology exclude strong candidates who are equally capable but unfamiliar with organisational language", "Long lists of essential criteria deter candidates from underrepresented groups, who are statistically less likely to apply unless they meet every requirement"]} /><KeyReminder text="Exclusive language does not just reduce diversity. It reduces the total quality of your applicant pool." /></div>,

    <div key="s3"><SectionLabel text="Gender-Coded Language" /><SlideHeading title="Removing Gender Bias" /><BodyText>Gender-coded language signals that a role is better suited to one gender, even when no such intention exists. The effect is measurable and well documented.</BodyText>
      <BeforeAfter before="Seeking a sharp salesman for our aggressive team." after="Seeking a sharp sales professional for our collaborative, results-driven team." />
      <BeforeAfter before="Must be a nurturing personality to fit our company culture." after="Must be a supportive team member with excellent interpersonal skills." />
      <BeforeAfter before="Must be confident and able to hold their own in meetings." after="Able to present ideas clearly and contribute constructively to discussions." />
      <ReflectionBox prompt="Pull up a job description your organisation uses. Can you spot any gender-coded words? What would you replace them with?" /></div>,

    <div key="s4"><SectionLabel text="Age and Experience" /><SlideHeading title="Removing Age Bias and Credential Barriers" /><BodyText>Age-coded language and unnecessary credential requirements exclude capable candidates and can constitute indirect discrimination under the Equality Act 2010.</BodyText>
      <BeforeAfter before="Looking for a young, energetic candidate to join our dynamic group." after="Seeking a motivated candidate with strong communication skills." />
      <BeforeAfter before="Must have a degree from a top university." after="Relevant experience, skills, or qualifications in a related field." />
      <BeforeAfter before="Must be a native English speaker." after="Must be able to communicate effectively in English for work purposes." />
      <KeyReminder text="Requiring a degree, specific graduation year, or a particular university is often a proxy for socioeconomic background rather than a genuine indicator of capability." /></div>,

    <div key="s5"><SectionLabel text="Ableist Language" /><SlideHeading title="Removing Ableist Language and Physical Assumptions" /><BodyText>Physical and availability requirements embedded in job descriptions can exclude disabled candidates and those with caring responsibilities, even when those requirements are not genuinely essential to the role.</BodyText>
      <BeforeAfter before="Must be able-bodied and cope well under pressure." after="Must be able to manage competing priorities, with reasonable adjustments available." />
      <BeforeAfter before="Must be willing to work long hours and be constantly available." after="This role may require flexibility at certain times; we encourage conversations about working patterns." />
      <BulletList items={["Only include physical or availability requirements that are genuinely essential to the role", "Where flexibility is possible, say so: it broadens your pool to carers, disabled candidates, and those with religious observance needs", "Reference reasonable adjustments explicitly so candidates know support is available throughout the process"]} /></div>,

    <div key="s6"><SectionLabel text="Jargon and Complexity" /><SlideHeading title="Plain Language and Clear Criteria" /><BodyText>Corporate jargon and inflated language make job descriptions harder to understand and create a culture signal that can deter strong candidates who do not see themselves reflected in that kind of language.</BodyText>
      <BeforeAfter before="You will spearhead operational leadership across the business unit." after="You will manage a small team and oversee day-to-day operations." />
      <BeforeAfter before="Must be a people person with a bubbly personality." after="Demonstrates the ability to communicate clearly and build effective working relationships." />
      <BulletList items={["Use plain English: describe the actual tasks and outcomes of the role", "Avoid vague, exaggerated, or intimidating language that creates an unwelcoming tone", "Focus on what someone will do and what they need to be able to do, not the personality type you imagine doing it"]} /></div>,

    <div key="s7"><SectionLabel text="Skills-Based Criteria" /><SlideHeading title="Focus on Skills, Not Assumptions" /><BodyText>One of the most impactful changes you can make is shifting from a list of desired personality traits or inferred characteristics to a clear, skills-based set of criteria.</BodyText><BulletList items={["Write criteria around observable skills and competencies: what does this person need to be able to do to perform in this role?", "Separate genuine essentials from desirable extras: most job descriptions inflate the essential list, which narrows the pool unnecessarily", "Avoid criteria that favour a particular type of background or experience without being genuinely relevant to the role", "Ask for each criterion: is this essential? How will we assess it? Could someone demonstrate it in a non-traditional way?"]} /><ReflectionBox prompt="Look at the essential criteria in one of your job descriptions. Which of them are genuinely essential, and which are preferences or assumptions in disguise?" /></div>,

    <div key="s8"><SectionLabel text="Signalling Inclusion" /><SlideHeading title="Welcoming All Candidates Explicitly" /><BodyText>Beyond removing exclusionary language, job descriptions should actively signal that the organisation welcomes candidates from all backgrounds. Passive non-discrimination is not enough.</BodyText><BulletList items={["Include an explicit welcome statement: 'We welcome applications from people of all backgrounds, identities, and experiences'", "Mention reasonable adjustments and how candidates can request them, rather than leaving it to candidates to guess whether support is available", "Highlight flexible working arrangements where they genuinely exist: this signals inclusion for disabled candidates, carers, and those with religious observance needs", "Avoid generic diversity statements that are not backed up by the rest of the advert's language"]} /><KeyReminder text="A diversity statement at the bottom of an advert full of exclusive language is not inclusion. It is contradiction." /></div>,

    <div key="s9"><SectionLabel text="Common Patterns" /><SlideHeading title="Six Patterns to Audit For" /><BodyText>When reviewing a job description for inclusive language, check for these six patterns:</BodyText><BulletList items={["Gender-coded words: assertive, aggressive, dominant, ninja, guru, nurturing, collaborative (in excess)", "Age-coded language: young, energetic, digital native, years of experience requirements that imply seniority age", "Ableist language: able-bodied, high energy, must be available at all times, physically demanding without justification", "Credential barriers: degree requirements, specific institutions, native speaker requirements not tied to role needs", "Cultural fit language: bubbly, people person, someone who fits in, must enjoy socialising with the team", "Jargon and inflation: spearhead, synergise, ninja, guru, evangelist, rockstar, warrior"]} /><ReflectionBox prompt="Which of these six patterns appears most often in your organisation's job descriptions? What would a systematic audit of your recruitment materials reveal?" /></div>,

    <div key="s10"><SectionLabel text="The Law" /><SlideHeading title="Legal Context: What You Must Know" /><BodyText>Inclusive job descriptions are not just good practice. Some forms of exclusive language may constitute indirect discrimination under the Equality Act 2010.</BodyText><BulletList items={["The Equality Act 2010 protects nine characteristics including age, sex, race, disability, religion, and sexual orientation", "Indirect discrimination occurs when a criterion, provision, or practice puts people with a protected characteristic at a disadvantage, even if that was not the intent", "A requirement for 'a degree from a top university' may constitute indirect class or race discrimination if it is not justified by the genuine needs of the role", "Physical requirements that are not genuinely essential can constitute indirect disability discrimination"]} /><KeyReminder text="You do not need to intend to discriminate for your job description to discriminate. The effect is what matters legally." /></div>,

    <div key="s11"><SectionLabel text="Quick Checklist" /><SlideHeading title="Practical Audit Checklist" /><BodyText>Use this checklist before publishing any job description:</BodyText><BulletList items={["Is all language gender-neutral throughout?", "Have I removed age-coded words and unnecessary experience year requirements?", "Are all physical and availability requirements genuinely essential to the role?", "Is the criteria list focused on skills and competencies rather than personality traits?", "Have I removed jargon and inflated language in favour of plain English?", "Does the advert include a genuine welcome statement and information about reasonable adjustments?", "Have I separated essential criteria from desirable ones?", "Would a strong candidate from an underrepresented background feel welcome reading this?"]} /><ReflectionBox prompt="When did your organisation last review its job description templates? Who was involved in that review, and whose perspective was missing?" /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Write Job Descriptions That Include Everyone" /><BulletList items={["Language in job descriptions signals who is welcome before a single application is submitted: get it right at the start", "Gender-coded, ageist, and ableist language reduces the diversity and quality of your applicant pool, often without the writer realising it", "Focus criteria on skills and competencies: if a requirement is not genuinely essential, remove it", "Include an explicit welcome statement, reference reasonable adjustments, and highlight flexibility where it genuinely exists", "Some forms of exclusive language may constitute indirect discrimination under the Equality Act 2010: legal compliance and inclusion are the same goal"]} /><ReflectionBox prompt="What is one change you will make to a job description in your organisation this week?" subPrompts={["Is there a criteria requirement that is a preference rather than a genuine essential?", "Does your template include a welcome statement and information about adjustments?", "When did you last audit your job description language as a team?"]} /><KeyReminder text="You cannot build a diverse team if the first thing diverse candidates read tells them this workplace was not designed with them in mind." /></div>,
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
