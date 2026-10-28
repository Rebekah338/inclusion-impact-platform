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

export default function FaithCultureWork() {
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
    { q: "Under the Equality Act 2010, which of the following is a protected characteristic?", options: ["Nationality only", "Political opinion", "Religion or belief", "Job title"], correct: 2 },
    { q: "Which of the following is an example of a reasonable adjustment for an employee observing Ramadan?", options: ["Requiring the employee to work longer hours to make up for reduced productivity", "Offering flexible start and finish times or adjusted break patterns during the fasting period", "Asking the employee to take annual leave for the entire month", "Scheduling all important meetings during Ramadan to test the employee's commitment"], correct: 1 },
    { q: "What does equal respect for all faiths and beliefs mean in practice?", options: ["Treating all religious observances as equally valid and making reasonable adjustments for everyone", "Providing adjustments only for majority religions", "Banning all religious expression in the workplace", "Allowing employees to self-select whether inclusion policies apply to them"], correct: 0 },
    { q: "Why is intersectionality important when considering faith and culture at work?", options: ["It allows employers to group employees by religion for administrative purposes", "It reminds us that employees hold multiple identities that can interact to create compounded experiences of inclusion or exclusion", "It means only one characteristic can be protected at a time", "It makes it easier to design a single policy for all employees"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("faith-culture-work");
  }

  const slides = [
        <div key="s1">
      <SlideHeading title="Faith, Culture, and Work: What Leaders Must Know" subtitle="Supporting religious and cultural diversity with confidence and care" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Faith and cultural identity are not private matters to be left at the door. They are part of who your employees are. Leaders who engage with this thoughtfully build workplaces where everyone can bring their whole self.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will give you the legal knowledge, practical tools, and leadership confidence to support employees with faith and cultural identities at work: from reasonable adjustments and leave, to prayer spaces, dress codes, catering, and intersectionality.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Summarise the key protections for religion or belief under the Equality Act 2010",
        "Apply a reasonable adjustment approach to prayer, fasting, dress, leave, and dietary needs",
        "Explain what equal respect for all faiths and beliefs means in practice",
        "Support managers to handle faith and culture-related requests consistently and confidently",
        "Recognise how intersectionality shapes employees' experiences of faith and culture at work",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Legal Framework" /><SlideHeading title="The Legal Landscape" /><BodyText>Religion or belief is one of nine protected characteristics under the Equality Act 2010 in the UK. This protection extends to religion, non-religion, and philosophical belief, covering a wide range of worldviews.</BodyText><BulletList items={["Employers must not discriminate directly or indirectly on the grounds of religion or belief", "This includes recruitment, promotion, training, pay, and treatment at work", "Harassment on grounds of religion or belief is unlawful", "Employers are required to make reasonable adjustments to remove disadvantage for employees with protected characteristics", "Belief does not have to be a mainstream religion to qualify for protection under the Act"]} /><ReflectionBox prompt="How confident are you that your organisation's current policies and practices are compliant with the Equality Act on religion or belief?" /></div>,
    <div key="s3"><SectionLabel text="Working Patterns" /><SlideHeading title="Flexible Working and Religious Observance" /><BodyText>Many faith traditions include regular observances that require time, space, or changed working patterns. Leaders need to approach these with practical generosity, not reluctant compliance.</BodyText><BulletList items={["Friday prayers for Muslims; Saturday for Seventh-day Adventists; Sunday for many Christians: many observances fall on regular working days", "Daily prayer times may require short breaks during the working day", "Religious observances vary in how strictly they are practised; avoid making assumptions based on someone's background", "Where a pattern of work creates a barrier to religious practice, explore flexible options proactively before the employee has to ask repeatedly"]} /><KeyReminder text="Flexibility is not a special favour. It is part of genuinely including people in your workforce." /></div>,
    <div key="s4"><SectionLabel text="Leave" /><SlideHeading title="Religious Holidays and Leave" /><BodyText>Many employees will have important religious or cultural festivals that fall outside standard public holidays.</BodyText><BulletList items={["Eid al-Fitr and Eid al-Adha for Muslims; Diwali for Hindus and Sikhs; Rosh Hashanah and Yom Kippur for Jewish employees; Vaisakhi; Holi; Chinese New Year: many significant observances are not covered by the UK public holiday calendar", "Offer a policy that allows employees to swap public holidays for their own significant dates where operationally possible", "Avoid requiring employees to use annual leave for religious festivals while Christian-based public holidays are built into contracts", "Check religious calendars in advance when scheduling major events, deadlines, or away days"]} /><ReflectionBox prompt="Does your organisation's leave policy reflect the diversity of religious and cultural observances in your workforce?" /></div>,
    <div key="s5"><SectionLabel text="Prayer Spaces" /><SlideHeading title="Prayer and Meditation Spaces" /><BodyText>For many employees, having a space to pray during the working day is not a preference: it is a religious obligation.</BodyText><BulletList items={["Provide a quiet, private room that can be used for prayer, meditation, or reflection", "The room does not need to be permanently dedicated to this purpose; a bookable space with a no-shoes policy and appropriate orientation can work", "Ensure the space is clean, private, and treated with respect by all staff", "Consider storage for prayer mats and other items if this is practical", "Avoid locating prayer spaces in noisy, insecure, or stigmatised areas of the building"]} /><KeyReminder text="A prayer space communicates to employees that their faith identity is taken seriously and respected." /></div>,
    <div key="s6"><SectionLabel text="Dress Codes" /><SlideHeading title="Dress Codes and Religious Expression" /><BodyText>Dress codes that conflict with religious requirements can amount to indirect discrimination unless they can be objectively justified.</BodyText><BulletList items={["Review your dress code for any requirements that could disadvantage employees of particular faiths: restrictions on head coverings, face coverings, visible jewellery, or beards", "Distinguish between requirements that relate to genuine safety or hygiene needs and those that are simply conventional preferences", "Allow reasonable adjustments to dress codes for religious expression unless there is a strong business case against it", "Engage with employees before implementing dress codes that may affect religious expression"]} /><ReflectionBox prompt="Does your dress code treat all employees equitably regardless of their religious or cultural background? How do you know?" /></div>,
    <div key="s7"><SectionLabel text="Hospitality" /><SlideHeading title="Food, Drink, and Hospitality" /><BodyText>Food and drink are central to workplace culture: team lunches, celebrations, client hospitality, and training events all involve eating. Getting this right matters for inclusion.</BodyText><BulletList items={["Provide halal, kosher, vegetarian, and vegan options as a standard part of all catering", "Label food clearly with dietary and preparation information so employees do not have to ask repeatedly", "Do not centre alcohol in workplace social events; include non-alcoholic options as prominently as alcoholic ones", "Be mindful of fasting periods such as Ramadan or Lent when scheduling lunch meetings or catered events", "Avoid creating a culture where employees feel pressured to explain or justify their dietary requirements"]} /><KeyReminder text="Inclusive catering is one of the simplest and most visible ways to signal that diverse employees belong." /></div>,
    <div key="s8"><SectionLabel text="Scheduling" /><SlideHeading title="Workload Scheduling and Ramadan" /><BodyText>Ramadan is a month-long period of fasting observed by Muslim employees from dawn to sunset. It requires thoughtful management.</BodyText><BulletList items={["Offer flexible start and finish times or adjusted break patterns so employees can eat before dawn and after sunset", "Avoid scheduling high-pressure deadlines or travel demands during Ramadan without discussion", "Recognise that fasting can affect energy levels and concentration, particularly in the final days", "Do not make assumptions about whether individual employees observe Ramadan or how strictly", "Treat requests for Ramadan adjustments with the same professionalism as requests for any other reasonable adjustment"]} /><ReflectionBox prompt="Have you ever discussed Ramadan or other fasting periods with Muslim employees in your team? What would help you feel more confident doing so?" /></div>,
    <div key="s9"><SectionLabel text="Management" /><SlideHeading title="Manager Guidance and Confidence" /><BodyText>Managers are the key to whether inclusion policies are experienced as real by employees. Training and support matter enormously.</BodyText><BulletList items={["Train managers to handle requests related to faith and culture with confidence, consistency, and respect", "Provide clear guidance on what constitutes a reasonable adjustment and how to respond to requests", "Encourage managers to have open, non-judgmental conversations with employees about faith or cultural needs rather than waiting for formal requests", "Ensure managers understand their legal obligations and the risk of discrimination through mismanagement of requests", "Create a culture where employees feel safe disclosing faith or cultural needs without fearing negative consequences"]} /><KeyReminder text="A manager who handles faith-related requests poorly or inconsistently can undo years of organisational inclusion work." /></div>,
    <div key="s10"><SectionLabel text="Leadership" /><SlideHeading title="Leadership and Organisational Action" /><BodyText>Genuine inclusion of faith and culture requires more than individual manager competence. It requires organisational commitment and leadership accountability.</BodyText><BulletList items={["Ensure senior leaders visibly support inclusion of faith and cultural diversity, not just as a statement but through their decisions and behaviour", "Review all policies through the lens of faith and cultural inclusion: HR, leave, facilities, events, and communications", "Establish or support a multifaith employee network or advisory group", "Set measurable inclusion goals related to faith and culture and report on progress", "Listen to employees with faith or cultural identities about what would make the greatest difference and act on what you hear"]} /><ReflectionBox prompt="What signals does your organisation currently send about whether faith and culture are valued? What would you want to change?" /></div>,
    <div key="s11"><SectionLabel text="Complexity" /><SlideHeading title="Intersectionality and Nuance" /><BodyText>Faith and cultural identity do not exist in isolation. They intersect with race, ethnicity, gender, disability, socio-economic background, and many other dimensions of identity.</BodyText><BulletList items={["A Muslim woman may face discrimination on grounds of both gender and religion simultaneously; these experiences cannot always be separated", "A Black Christian employee may experience different barriers than a white employee of the same faith", "Cultural identity includes heritage, language, customs, and values that may not be defined by religion alone", "Avoid making assumptions about what faith or culture means for any individual employee", "Intersectional thinking leads to more nuanced and effective inclusion practice than single-axis thinking"]} /><KeyReminder text="Every employee is the whole person in front of you, not a single protected characteristic to be managed." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Faith, Culture, and Work" /><BulletList items={["Religion or belief is a protected characteristic under the Equality Act 2010; employers have clear legal obligations", "Reasonable adjustments for prayer, fasting, dress, leave, and dietary needs are required and achievable", "Equal respect means adjustments are available to all faiths and beliefs, not just majority religions", "Managers are the frontline of inclusion; they need training, guidance, and support to respond well", "Intersectionality reminds us that faith and culture interact with other dimensions of identity to create complex lived experiences"]} /><ReflectionBox prompt="What is one concrete action you will take in the next month to better support faith and cultural inclusion in your team or organisation?" subPrompts={["Is there a policy that needs reviewing?", "Is there a conversation you have been avoiding?", "Is there a space or resource that could make a meaningful difference to employees in your team?"]} /><KeyReminder text="Leaders who understand faith and culture at work do not just avoid discrimination. They build workplaces where everyone can bring their whole self." /></div>,
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
