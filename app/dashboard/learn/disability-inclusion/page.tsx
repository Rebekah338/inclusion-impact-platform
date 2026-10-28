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
function ReflectionCard({ statement, example }: { statement: string; example: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>{statement}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", opacity: 0.8, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>{example}</p>
    </div>
  );
}

export default function DisabilityInclusionLesson() {
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
    { q: "What does the social model of disability say about the source of disabled people's disadvantage?", options: ["That disability is caused by individual medical conditions which prevent participation", "That disadvantage arises from barriers in the environment, attitudes, and systems rather than from impairment itself", "That disabled employees need more support than other employees in all situations", "That organisations are only responsible for physical access barriers"], correct: 1 },
    { q: "Why is it important not to assume what a physically disabled colleague can or cannot do?", options: ["Because making assumptions is always illegal under the Equality Act 2010", "Because physical disabilities are often invisible or fluctuating, and assumptions about capacity may be wrong and may lead to exclusion from opportunities", "Because it is better to ask about every task regardless of whether accessibility is relevant", "Because disabled employees are protected from all performance management"], correct: 1 },
    { q: "Which of the following is an example of a reasonable adjustment for an employee with a physical disability?", options: ["Removing all physical tasks from the role permanently without consultation", "Approving remote or hybrid working to reduce pain, fatigue, or travel barriers", "Reassigning the employee to a different role without their agreement", "Informing the whole team about the employee's condition so they can provide support"], correct: 1 },
    { q: "What does it mean to review adjustments regularly?", options: ["It means conducting a formal medical review every six months", "It means checking in with the employee when roles or workloads change to confirm that existing support still meets their needs", "It means reducing adjustments over time as employees become more confident", "It means asking employees to re-apply for adjustments each year"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("disability-inclusion");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Disability Inclusion: Best Practice for Leaders" subtitle="From compliance to genuine inclusion" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Around one in five people in the UK are disabled. In most workplaces, disabled employees are underrepresented, underpaid, and more likely to leave than their non-disabled colleagues. This is not because disabled people are less capable. It is because most workplaces were not designed with them in mind, and most leaders have not been equipped to change that. This lesson is about giving you the knowledge and tools to do better, starting with the beliefs and behaviours that make the most practical difference.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you with the knowledge, language, and practical frameworks to support physically disabled employees effectively, make reasonable adjustments confidently, and create an environment where disability is neither a barrier nor a source of disadvantage.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain the difference between the medical and social models of disability and why the distinction matters for leaders",
        "Describe the range of ways physical disabilities can manifest, including visible, invisible, and fluctuating conditions",
        "Apply best practice principles for making, reviewing, and managing reasonable adjustments",
        "Identify and address ableist language and assumptions in your team and workplace",
        "Ensure physically disabled colleagues have equal access to development, progression, and opportunity",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Foundations" /><SlideHeading title="Models of Disability: Why Language Matters" /><BodyText>How we understand disability shapes how we respond to it. Two models dominate how organisations think about disability at work, and they lead to very different practices.</BodyText><BulletList items={["The medical model of disability locates the problem in the individual: disability is something a person has, a condition that limits what they can do. The response is treatment, accommodation, or adjustment to manage around the limitation", "The social model of disability locates the problem in the environment: disability is the result of barriers created by the way society and workplaces are designed. A wheelchair user is not disabled by their wheelchair; they are disabled by stairs", "In practice, both models are relevant: some impairments genuinely limit function, and medical support matters. But the social model is more useful for leaders, because it focuses attention on what they can change: the barriers in their team, systems, and culture", "The social model shifts the question from 'what is wrong with this person?' to 'what is wrong with our environment?' That shift produces different and better responses"]} /><KeyReminder text="If you focus only on what an individual cannot do, you will miss most of what you could change. The environment, the systems, and the culture are where your influence lies." /></div>,

    <div key="s3"><SectionLabel text="Understanding Physical Disability" /><SlideHeading title="Physical Disabilities: What Leaders Need to Know" /><BodyText>Physical disabilities affect the body's movement, stamina, dexterity, or senses. Understanding their diversity helps leaders avoid the most common source of exclusion: the wrong assumption.</BodyText><BulletList items={["Physical disabilities can be visible or invisible: a wheelchair is visible; chronic pain, fatigue conditions such as ME or fibromyalgia, and many other physical impairments are not", "Physical disabilities can fluctuate: an employee may have high-capacity days and low-capacity days within the same week. A good day is not evidence that support is no longer needed", "Physical disabilities can be acquired at any point in life: an employee who had no disability when hired may develop one. Adjustments should be reviewed when circumstances change, not only at the point of disclosure", "Intersectionality matters: physical disability intersects with gender, race, age, and caring responsibilities in ways that can compound disadvantage. A Black disabled woman may face disbelief about her condition as well as the physical barriers themselves", "The definition of disability under the Equality Act 2010 is broad: a physical or mental impairment that has a substantial and long-term adverse effect on the ability to carry out normal day-to-day activities"]} /></div>,

    <div key="s4"><SectionLabel text="Reasonable Adjustments" /><SlideHeading title="Making and Managing Reasonable Adjustments" />
      <ReflectionCard statement="Have a clear, consistent process for applying reasonable adjustments" example="Respond promptly to adjustment requests. A request left pending for weeks sends a clear message about how seriously disability inclusion is taken." />
      <ReflectionCard statement="Ask what is needed, rather than assuming" example="Ask what access or adjustments are needed for travel or events rather than excluding someone by default, or making arrangements without consultation." />
      <ReflectionCard statement="Support flexible working as a legitimate accessibility need" example="Approve remote or hybrid working to reduce pain, fatigue, or travel barriers. Flexibility is not a favour; it is often what makes a role sustainable for a disabled employee." />
      <ReflectionCard statement="Adapt workload expectations during illness, recovery, or flare-ups" example="Adjust deadlines or redistribute tasks rather than penalising disability-related absence. Consistent application of attendance policies without adjustment may constitute indirect discrimination." />
      <ReflectionCard statement="Review adjustments regularly" example="Touch base with employees when roles or workloads change rather than assuming existing support still works. Adjustments made two years ago may no longer fit the current role." />
    </div>,

    <div key="s5"><SectionLabel text="The Physical Environment" /><SlideHeading title="Accessibility by Design, Not as Afterthought" /><BodyText>Physical accessibility should be a default design consideration, not something triggered only by a disclosure or a complaint. Leaders who think proactively about access create environments where disabled employees do not have to choose between their needs and their inclusion.</BodyText><BulletList items={["Check step-free access, seating, and toilet facilities before confirming meeting rooms or venues: do not wait for a disabled employee to flag an access problem to start asking these questions", "Consider accessibility when planning off-sites, events, or social activities: avoid activities that require prolonged standing, physical exertion, or travel without accessible alternatives", "Recognise that stamina and energy levels can vary: build in breaks and avoid scheduling long meetings without rest periods, especially for employees managing fatigue-related conditions", "Ensure digital tools and systems are usable for people with physical access needs: test with adaptive keyboards, voice-to-text tools, and other accessible software rather than assuming the standard setup works for everyone", "Address access issues proactively: if you notice a barrier, act on it. Do not wait for the person most affected to raise it"]} /><ReflectionBox prompt="Think about your team's regular meetings and activities. Have you explicitly checked that they are accessible? Who might be finding them harder than they appear?" /></div>,

    <div key="s6"><SectionLabel text="Confidentiality and Trust" /><SlideHeading title="Handling Disability Information with Care" /><BodyText>Disclosure is an act of trust. How a leader handles disability-related information signals whether that trust is warranted, and directly shapes whether other disabled employees in the team choose to disclose in future.</BodyText><BulletList items={["Protect confidentiality: share information about an employee's condition only on a need-to-know basis. Discussing someone's disability without their consent is both a breach of trust and potentially unlawful under GDPR", "Do not pressure disclosure: an employee is not required to disclose a disability to access adjustments, though disclosure makes the process clearer. Create an environment where disclosure feels safe, without making it feel obligatory", "Believe what employees tell you about their condition: scepticism about invisible or fluctuating conditions is a common and damaging form of ableism. A policy of believing disabled employees unless there is specific evidence to the contrary is good practice", "Separate the condition from the performance: if performance issues arise, address them with appropriate adjustment in place before attributing them to disability-related absence or limitation. Consult HR and occupational health early", "Store disability-related records securely and in line with data protection law: demographic and health data are special category data under UK GDPR"]} /></div>,

    <div key="s7"><SectionLabel text="Development and Progression" /><SlideHeading title="Equal Access to Opportunity" /><BodyText>One of the most persistent and damaging forms of disability discrimination is not hostility but exclusion from opportunity: the stretch project not offered, the development conversation not had, the promotion not considered, because a manager assumed the disabled employee would not want or could not manage it.</BodyText><BulletList items={["Do not exclude physically disabled employees from stretch projects because of assumptions about capacity or travel: ask, do not assume", "Ensure physically disabled employees have the same access to training, development, and networking as their colleagues: if an event is inaccessible, make it accessible, or find an equivalent accessible alternative", "Review your mentoring and sponsorship programmes: disabled employees are often excluded from informal sponsorship networks that support progression for those already connected", "Check your data: if disabled employees are underrepresented in senior roles, promoted less often, or leaving at higher rates than non-disabled colleagues, that is evidence of a structural problem that requires investigation", "Challenge the assumption that someone has 'enough on their plate': disabled employees, like all employees, have career ambitions. The decision about what they can take on is theirs to make, not yours"]} /><ReflectionBox prompt="Think about the last three development opportunities you offered or supported in your team. Were disabled colleagues equally considered? If not, what got in the way?" /></div>,

    <div key="s8"><SectionLabel text="Language and Culture" /><SlideHeading title="Addressing Ableism in Your Team" /><BodyText>Ableism is the set of beliefs and practices that treat disabled people as less capable, less valuable, or less deserving of full participation. It manifests in language, in assumptions, and in the design of systems and environments.</BodyText><BulletList items={["Challenge ableist language and comments that frame accessibility as 'special treatment' or inconvenience: phrases like 'we can't accommodate everyone' or 'it's not that hard' are signals of a culture that places the burden of accessibility on disabled individuals", "Address microaggressions: comments about an employee being 'so brave', expressing surprise at their competence, or suggesting they should be grateful for adjustments all cause harm", "Normalise adjustments: when adjustments are treated as exceptional, disabled employees are marked as different. When flexible working, ergonomic equipment, and rest breaks are available to everyone, disabled employees are less conspicuous and more included", "Encourage your team to speak up when they notice access issues: accessibility is a team responsibility, not the job of the disabled employee or the HR department alone", "Model the behaviour: how you talk about disability, how you respond to requests for adjustments, and whether you ask about access without being prompted all set the standard for your team"]} /></div>,

    <div key="s9"><SectionLabel text="Intersectionality" /><SlideHeading title="Physical Disability and Intersecting Identities" /><BodyText>Physical disability does not exist in isolation. Its interaction with other aspects of identity shapes the barriers a person faces and the support they may need.</BodyText><BulletList items={["Disabled women face a compounding disadvantage: the disability pay gap is larger for women than for men, and disabled women are more likely to be in part-time or lower-paid roles", "Disabled employees from minority ethnic backgrounds may face additional barriers including cultural stigma around disability disclosure, scepticism about their condition, and lower access to occupational health support", "Caring responsibilities often intersect with disability: a disabled employee who is also a carer faces a double flexibility demand. Standard assumptions about availability may not apply", "Age and disability frequently intersect: older workers are more likely to acquire disabilities, and ageist assumptions can compound ableist ones in decisions about development and progression", "An intersectional lens asks: is this employee facing barriers related to disability alone, or is disability interacting with other aspects of who they are in ways that amplify disadvantage? The answer shapes what support is needed"]} /></div>,

    <div key="s10"><SectionLabel text="Legal Framework" /><SlideHeading title="Your Legal Responsibilities" /><BodyText>Disability inclusion is not only good practice. Leaders have legal responsibilities under UK law that apply to every team, regardless of size or sector.</BodyText><BulletList items={["The Equality Act 2010 defines disability broadly and prohibits direct discrimination, indirect discrimination, harassment, and victimisation on grounds of disability", "The duty to make reasonable adjustments: employers are legally required to make reasonable adjustments to remove substantial disadvantage for disabled employees. Reasonableness takes into account cost, practicality, and the size of the organisation", "The definition of 'substantial and long-term': an impairment that has a substantial and long-term adverse effect on day-to-day activities is covered, regardless of diagnosis. Some conditions are automatically covered: cancer, HIV, and multiple sclerosis from the point of diagnosis", "Medical evidence: you can request medical evidence to support an adjustment request, but you cannot use the absence of a formal diagnosis as grounds to refuse support when an employee is clearly experiencing difficulty", "Disability-related absence: applying attendance management policies without regard to disability may constitute indirect discrimination or failure to make reasonable adjustments. Consult HR and occupational health before taking disciplinary action related to disability-related absence"]} /><KeyReminder text="Your legal duty is to make reasonable adjustments. The test is whether an adjustment is reasonable given the circumstances, not whether it is convenient or straightforward." /></div>,

    <div key="s11"><SectionLabel text="Continuous Improvement" /><SlideHeading title="Disability Inclusion as Ongoing Practice" /><BodyText>Disability inclusion is not a project with a start and end date. It is a commitment to continuous improvement, sustained by the habits of regular review, active listening, and visible action.</BodyText><BulletList items={["Seek out guidance and resources to improve physical accessibility: review feedback from physically disabled employees and take visible action over time. Attendance at training, use of resources, and external accreditation all signal commitment", "Take responsibility for accessibility rather than placing the burden on disabled employees: the responsibility to identify barriers and act on them lies with the leader, not with the person experiencing them", "Encourage colleagues to be allies for accessibility: ask teams to flag access issues when booking spaces or organising events and to speak up when they encounter ableist language or behaviour", "Stay current: best practice in disability inclusion develops. The definition of accessibility, the range of available adjustments, and the legal landscape all evolve. A commitment to learning is itself an inclusion practice", "Celebrate progress and acknowledge gaps honestly: an organisation that only reports its successes is not building trust with disabled employees. Honest acknowledgement of what is not yet working, with a plan to improve it, is more credible and more effective"]} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Disability Inclusion: Best Practice for Leaders" /><BulletList items={["Physical disabilities can be visible, invisible, or fluctuating: assumptions about what a colleague can or cannot do are a primary source of exclusion", "The social model shifts focus from individual limitation to environmental barrier: your role as a leader is to remove barriers, not to manage around individual deficits", "Reasonable adjustments are a legal requirement and a daily practice: from flexible working to accessible venues to adapted workloads, the obligation to adjust is ongoing and proactive", "Confidentiality, belief, and the absence of pressure to disclose are the foundations of a disclosure-safe culture: how you respond to the first disclosure you hear shapes whether others feel safe to follow", "Development and progression must be offered equally: exclusion from opportunity is often more damaging than physical barriers, and it is less visible"]} /><ReflectionBox prompt="What is one thing you will do differently as a result of this lesson?" subPrompts={["Is there a colleague whose needs you may have assumed rather than asked about?", "Is there an access barrier in your regular environment that you have not yet acted on?", "Have you ever excluded someone from an opportunity because of an assumption about their capacity?"]} /><KeyReminder text="Disability inclusion is not about doing something extra for disabled employees. It is about removing the extra barriers that currently exist and creating a workplace that works for everyone." /></div>,
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
