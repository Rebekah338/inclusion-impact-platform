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
function BodyText({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: small ? "0.9rem" : "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>{children}</p>;
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.75rem" }}>{text}</p>;
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
function QuestionCard({ question, example }: { question: string; example: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "0.85rem" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.97rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>{question}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", opacity: 0.8, margin: 0, fontStyle: "italic" }}>Example: {example}</p>
    </div>
  );
}

export default function LeadershipReflectionLesson() {
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
    { q: "An inclusive leader notices that the same three people always speak first in team meetings. What is the most inclusive response?", options: ["Rotate the order in which people contribute so everyone gets an early turn", "Let the pattern continue as it reflects who has the most to say", "Remind the team to be quieter and let others speak", "Hold a separate meeting for the quieter team members"], correct: 0 },
    { q: "A leader says: 'I treat everyone the same, regardless of their background.' What does an inclusive leadership perspective say about this approach?", options: ["It is ideal: consistency demonstrates fairness", "It misunderstands inclusion: treating everyone identically ignores different starting points, needs, and barriers", "It meets the legal standard of non-discrimination", "It is sufficient as long as the leader follows HR policy"], correct: 1 },
    { q: "What does psychological safety mean in an inclusive leadership context?", options: ["Ensuring employees have access to mental health support services", "An environment where people can speak up, ask questions, and share dissenting views without fear of punishment or humiliation", "Keeping difficult conversations out of team meetings to protect people", "Guaranteeing that no one will disagree with decisions"], correct: 1 },
    { q: "A leader gathers feedback from underrepresented staff and finds the same theme in multiple responses. What is the next inclusive step?", options: ["File the feedback with HR and move on", "Share the theme with the team and make visible changes, explaining what has been implemented and why", "Discuss only with senior leadership before deciding whether to act", "Wait for the next annual survey before acting to see if the pattern continues"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("leadership-reflection");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Inclusive Leadership: A Structured Reflection Programme" subtitle="Examining your practice through the lens of equity" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Inclusive leadership is not a personality type or a set of innate qualities. It is a practice: deliberate, ongoing, and built from honest reflection. The question is not whether you believe in inclusion, but whether your daily decisions, your communication, your allocation of opportunity, and your response to exclusionary behaviour actually match that belief. This programme gives you structured questions and concrete examples to find out.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to reflect honestly and systematically on your leadership practice, identify where your behaviour does and does not yet align with inclusive leadership principles, and develop concrete next steps for each area of your practice.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Use a structured set of reflection questions to audit your own inclusive leadership practice",
        "Identify specific behaviours that do and do not support equity and inclusion in your team",
        "Describe the connection between self-awareness, privilege, and leadership decision-making",
        "Apply practical examples of inclusive leadership to your own context",
        "Develop a personal action plan for strengthening your inclusive leadership practice",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Self-Awareness" /><SlideHeading title="Identity, Privilege, and Decision-Making" /><BodyText>Inclusive leadership begins with self-awareness. A leader who does not examine how their own identity, privilege, and unconscious biases shape their decisions will consistently reproduce the same patterns, however well-intentioned they are.</BodyText><QuestionCard question="Am I aware of how my own identity, privilege, or biases influence my decisions?" example="Before choosing someone for a project, I ask myself whether I am selecting them based on familiarity or actual suitability." /><BulletList items={["Privilege operates invisibly: it is not about conscious prejudice but about the ways our backgrounds shape what feels normal, fair, and obvious to us", "Affinity bias is one of the most common leadership blind spots: we favour people who remind us of ourselves in background, communication style, or approach", "Regular reflection is not a one-off exercise: the situations change and the biases can shift, so structured self-examination needs to be ongoing", "Asking for feedback from people whose experiences differ from yours is one of the most reliable ways to surface blind spots you cannot see from your own perspective"]} /><ReflectionBox prompt="Think about a recent decision you made about a team member: a project assignment, a promotion recommendation, or a piece of feedback. How did your own identity and background shape that decision?" /></div>,

    <div key="s3"><SectionLabel text="Actions and Accountability" /><SlideHeading title="Do Your Actions Match Your Commitment?" /><BodyText>A stated commitment to inclusion means nothing if it does not show up in daily behaviour. The gap between values and practice is where most inclusive leadership development work needs to happen.</BodyText><QuestionCard question="Do my actions match my stated commitment to equity and inclusion?" example="I review workloads and opportunities to ensure diverse staff are not being overlooked or overburdened." /><BulletList items={["Burden asymmetry is a common and overlooked issue: underrepresented employees are often asked to take on additional diversity work such as leading affinity groups, educating colleagues, or representing their group in meetings, on top of their core role. This is a form of inequity, not inclusion", "Opportunity distribution is a direct measure of commitment: who gets stretch assignments, high-visibility projects, and mentoring access? If the answer is always similar people, that pattern reflects real practice", "Visible action after gathering feedback is a critical accountability step: staff disengage quickly when their input produces no visible change", "Action accountability means leaders track and review their own patterns, not just their intentions"]} /><ReflectionBox prompt="Think about the last month. Which staff members received the most opportunities, recognition, and support from you? Who received the least? Is there a pattern?" /></div>,

    <div key="s4"><SectionLabel text="Communication" /><SlideHeading title="Adapting Communication to Meet Different Needs" /><BodyText>Inclusive communication is not about saying the right things. It is about adjusting how you communicate to make it genuinely accessible and effective for the range of people in your team.</BodyText><QuestionCard question="Have I adapted my communication style to meet the needs of different team members?" example="I offer information in multiple formats, written, verbal, and visual, to support neurodiverse staff and different learning preferences." /><BulletList items={["One-format communication creates a structural barrier: verbal-only briefings, jargon-heavy documents, and rapid verbal feedback all exclude different groups of employees", "Checking for understanding is not the same as asking whether people understand: questions like 'does that make sense?' are almost always answered with yes. Ask how something landed instead", "Processing time differs: putting people on the spot in meetings is not an accurate measure of their thinking. Create space for contributions before, during, and after meetings", "Language matters: use clear, jargon-free, culturally sensitive language. Idioms, acronyms, and assumed knowledge create barriers for staff new to a role, a culture, or a language"]} /><ReflectionBox prompt="How do you share important information with your team? Which team members tend to respond well, and which seem less engaged or uncertain? What might that tell you about your communication approach?" /></div>,

    <div key="s5"><SectionLabel text="Removing Barriers" /><SlideHeading title="Active Barrier Removal" /><BodyText>Inclusive leaders do not ask employees to adapt to existing systems. They examine those systems and remove the barriers within them. This requires a different question: not 'why isn't this person adapting?' but 'what is this system failing to provide?'</BodyText><QuestionCard question="Do I actively remove barriers rather than expecting employees to fit in to existing systems?" example="When a staff member discloses a need, I explore adjustments immediately, rather than encouraging the staff member to make changes." /><BulletList items={["The 'fit in' model places the burden of adaptation on the employee: the message is that the system is correct and the person needs to change to match it. Inclusive leadership reverses this", "Reasonable adjustments should be explored proactively: a leader who waits for a formal disclosure or HR process before acting is creating an avoidable barrier", "Universal design reduces the need for individual adjustment: if systems, processes, and environments are designed from the start for the widest range of users, fewer individual exceptions are needed", "Psychological safety is the prerequisite for disclosure: employees will not tell you what they need if they do not trust that doing so is safe. Your response to one request sets the tone for all future ones"]} /><KeyReminder text="An employee who does not ask for adjustments has not necessarily confirmed that the system works for them. They may simply have decided not to ask." /></div>,

    <div key="s6"><SectionLabel text="Opportunity and Transparency" /><SlideHeading title="Fair Allocation of Opportunities and Recognition" /><BodyText>How opportunities, recognition, and progression pathways are allocated is one of the clearest indicators of an organisation's actual inclusion culture, as distinct from its stated values.</BodyText><QuestionCard question="Am I transparent and fair in how I allocate opportunities, recognition, and progression pathways?" example="I use clear criteria and salary transparency for promotions and openly share them so everyone knows what success looks like." /><BulletList items={["Informal opportunity allocation is a primary driver of inequality: when opportunities depend on who a manager thinks of first, the same people consistently benefit. Structured, criteria-based allocation reduces this", "Sponsorship and mentoring access is unequally distributed in most organisations: research consistently shows that informal networks advantage those who already share characteristics with senior leaders", "Recognition bias affects performance management: ensure your praise and formal recognition reach across the team and are not concentrated on employees who most closely match your own style", "Transparency is protective: clear criteria for promotion, public sharing of opportunity processes, and explanation of decisions all reduce the scope for bias to operate unchallenged"]} /><ReflectionBox prompt="Think about who in your team has received formal recognition, mentoring access, or stretch assignments in the last six months. Is there a pattern? What would you change?" /></div>,

    <div key="s7"><SectionLabel text="Responding to Exclusion" /><SlideHeading title="Addressing Microaggressions and Exclusionary Behaviour" /><BodyText>The way a leader responds when exclusionary behaviour occurs is one of the most significant signals they send about the culture of their team. Silence communicates permission.</BodyText><QuestionCard question="Do I respond appropriately when exclusionary behaviour or microaggressions occur?" example="I address the situation promptly, name what happened, and support the affected person rather than staying silent." /><BulletList items={["Microaggressions cause cumulative harm: individually small comments or behaviours can seem minor to the person doing them while being significant to the person on the receiving end. The pattern matters more than any single incident", "Bystander silence is interpreted as agreement: when a leader witnesses exclusionary behaviour and says nothing, the message received by everyone in the room is that this behaviour is acceptable", "Responding in the moment does not mean confrontation: a calm, direct acknowledgement such as 'I want to come back to what was just said' is more effective than silence and less disruptive than an argument", "Following up with the affected person is part of the response: after an incident, check in privately to acknowledge what happened and ask what support would be helpful"]} /><ReflectionBox prompt="Think about the last time you witnessed or heard about exclusionary behaviour in your team or organisation. What did you do? What would you do differently now?" /></div>,

    <div key="s8"><SectionLabel text="Psychological Safety" /><SlideHeading title="Building an Environment Where People Can Speak Up" /><BodyText>Psychological safety is the most researched predictor of team performance and one of the most difficult things to build and maintain. It requires consistent, visible behaviour from leaders over time.</BodyText><QuestionCard question="Have I built psychological safety so staff feel comfortable speaking up or offering dissenting views?" example="I thank people for raising concerns and avoid penalising honest feedback." /><BulletList items={["Psychological safety is not comfort: it does not mean everyone always agrees or that difficult feedback is absent. It means people can speak the truth without fear of humiliation or retaliation", "Leader response to challenge sets the cultural standard: if the first person to push back in a meeting is shut down or dismissed, no one else will try. If they are thanked and engaged with seriously, others will follow", "Failure and error handling signals safety: teams where mistakes are treated as learning opportunities are more likely to surface problems early. Teams where mistakes are punished hide problems until they become crises", "Consistency matters: psychological safety cannot coexist with unpredictable responses. Staff need to be able to predict that speaking up will be received the same way regardless of the day or context"]} /><KeyReminder text="Psychological safety is not built in a single conversation. It is built or eroded by every response to every question, challenge, and error over time." /></div>,

    <div key="s9"><SectionLabel text="Continuous Learning" /><SlideHeading title="Commitment to Learning and Development" /><BodyText>Inclusive leadership is not a destination. It is a direction of travel. Leaders who treat their learning about inclusion as complete are already falling behind the knowledge and lived experience of the people they lead.</BodyText><QuestionCard question="Am I continuously learning about inclusion, equity, intersectionality, and diverse lived experiences?" example="I attend training, read widely, and reflect on how structural inequities show up in the workplace." /><BulletList items={["Intersectionality is not optional: understanding how race, gender, disability, class, age, and other identities interact and compound is essential to understanding the real experiences of your team members", "Learning cannot all come from your team: asking underrepresented employees to educate you places an unfair burden on them. Seek out training, reading, and communities of practice", "Action is the measure of learning: the value of any training or reading is in how it changes practice. After every learning opportunity, identify one specific thing you will do differently", "Structural inequity is part of the context: individual behaviours operate within systems. Understanding how historical and structural inequities shape the present is part of the knowledge base for inclusive leadership"]} /><ReflectionBox prompt="What was the last thing you learned about inclusion, equity, or the lived experience of a group underrepresented in your workplace? How did it change your practice?" /></div>,

    <div key="s10"><SectionLabel text="Everyday Behaviour" /><SlideHeading title="Modelling Inclusive Behaviour Daily" /><BodyText>The most powerful signal an inclusive leader sends is through routine, everyday behaviour: how they refer to people, whose contributions they acknowledge, who they make eye contact with, whose names they learn and use correctly.</BodyText><QuestionCard question="Do I model inclusive behaviour in everyday interactions?" example="I honour how people choose to identify, treat everyone with dignity, and show consistent allyship through my words and actions." /><BulletList items={["Allyship is a verb, not a noun: it describes ongoing action in support of those with less power, not a fixed identity or belief. It requires showing up even when it is inconvenient", "Naming and identity: using people's correct names, pronouns, and identifiers is a basic act of respect and a visible signal of the culture you are building", "Dignity as default: treating every person with consistent dignity, regardless of seniority, status, or how much their work directly affects yours, models the standard you expect from your team", "Consistency signals integrity: inclusive behaviour that is present in high-stakes situations but absent in casual settings is read as performance. Consistency in small everyday moments is what builds trust"]} /><ReflectionBox prompt="What does your everyday behaviour communicate about your values? Think about your language in informal settings, how you respond to interruptions, and whose contributions you visibly acknowledge." /></div>,

    <div key="s11"><SectionLabel text="Flexibility and Feedback" /><SlideHeading title="Recognising Different Starting Points and Seeking Feedback" /><BodyText>Two of the most practical inclusive leadership competencies are flexibility in responding to different needs and a genuine openness to feedback from the people most affected by your decisions.</BodyText>
      <QuestionCard question="Do I recognise when different employees have different starting points, needs, or barriers, and respond with flexibility?" example="I offer flexible hours or workload adjustments during flare-ups, caring responsibilities, or sensory overwhelm." />
      <QuestionCard question="Do I seek feedback from employees, especially underrepresented groups, and act on it?" example="After gathering insights, I make visible changes and explain what has been implemented and why." />
      <BulletList items={["Equity means meeting people where they are: two employees with the same role may have very different circumstances. A leader who applies identical treatment regardless of context is not being fair; they are ignoring relevant differences", "Feedback from underrepresented employees is the highest-value data a leader has about the actual experience of inclusion in their team: it is specific, lived, and usually underreported", "Acting visibly on feedback closes the loop: employees who see that their input changed something are more likely to share again. Employees who see their feedback ignored stop sharing"]} />
    </div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Inclusive Leadership: A Structured Reflection Programme" /><BulletList items={["Inclusive leadership is a practice, not a personality type: it is built through deliberate reflection, honest examination of behaviour, and a willingness to change what is not working", "The gap between stated values and actual behaviour is where the work happens: most leaders believe in inclusion; fewer have examined whether their daily decisions reflect that belief", "Self-awareness is the foundation: understanding how your own identity, privilege, and biases shape your decisions is the prerequisite for all other inclusive leadership development", "Psychological safety is built or eroded by every response to every question and challenge over time: consistency matters more than any single high-stakes moment", "Acting on feedback closes the loop: visible change in response to employee input is the most powerful signal that inclusion is real and not performative"]} /><ReflectionBox prompt="Take one question from this lesson that you found most challenging to answer honestly. Write down one specific change you will make to your practice in the next two weeks." /><KeyReminder text="The most important outcome of a reflection programme is not awareness. It is action. Knowledge without changed behaviour is not inclusive leadership." /></div>,
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
