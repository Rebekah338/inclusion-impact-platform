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

export default function InclusiveEvents() {
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
    { q: "What is the purpose of involving an accessibility or lived experience advisory group in event planning?", options: ["To reduce the cost of accessibility adaptations", "To ensure people with lived experience shape the planning from the start", "To meet a legal minimum and avoid complaints", "To speed up the planning process"], correct: 1 },
    { q: "Why should event organisers avoid scheduling events on religious or cultural holidays?", options: ["Because those days are not allowed for business use", "Because venue costs are higher on those dates", "Because it signals that some attendees' identities and commitments are not valued", "Because attendance data is harder to collect on those days"], correct: 2 },
    { q: "What should an accessibility statement for an event include?", options: ["A summary of the event programme and speaker bios", "Details of physical access, BSL interpretation, dietary options, sensory needs, and who to contact for adjustments", "The venue's general health and safety policy", "A list of all registered attendees and their access needs"], correct: 1 },
    { q: "What does trauma-informed facilitation mean in the context of inclusive events?", options: ["Requiring all speakers to complete a mental health qualification", "Designing event content and facilitation to avoid retraumatising participants and to create psychological safety", "Removing all sensitive topics from the event agenda", "Providing counsellors on site throughout the event"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("inclusive-events");
  }

  const slides = [
        <div key="s1">
      <SlideHeading title="Plan Events Everyone Can Access" subtitle="Designing events that are genuinely inclusive from start to finish" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>An inclusive event is not one where everyone is allowed in. It is one where everyone can fully participate. Inclusion must be designed in from the start, not retrofitted at the end.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will give you the practical tools and frameworks to plan, deliver, and evaluate events that are genuinely accessible and inclusive at every stage: from purpose and co-design through to logistics, programme, and post-event learning.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why co-design with people of lived experience is essential to inclusive event planning",
        "Apply a checklist approach to physical and digital accessibility, scheduling, registration, and catering",
        "Design an inclusive programme with diverse speakers, trauma-informed facilitation, and accessible formats",
        "Brief suppliers and staff to deliver inclusive events on the day",
        "Evaluate events for inclusion and use data to continuously improve",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,
    <div key="s2"><SectionLabel text="Starting Point" /><SlideHeading title="Purpose, Equity, and Co-Design" /><BodyText>Inclusive events begin before the venue is booked or the programme is drafted. They begin with a commitment to centering equity in purpose and process.</BodyText><BulletList items={["Ask whose voices shaped the event and who will benefit from it", "Involve people with lived experience of disability, marginalisation, or underrepresentation in planning decisions", "Set explicit inclusion goals for the event rather than assuming accessibility happens by default", "Ensure your planning team reflects the diversity of the communities you want to reach"]} /><ReflectionBox prompt="When you have planned events in the past, who was in the room making decisions? Whose perspectives were missing?" /></div>,
    <div key="s3"><SectionLabel text="Co-Design" /><SlideHeading title="Working with an Advisory Group" /><BodyText>An accessibility or lived experience advisory group is one of the most effective tools available for inclusive event design. It brings in knowledge that organisers simply cannot generate on their own.</BodyText><BulletList items={["Recruit advisors with a range of disabilities, cultural backgrounds, caring responsibilities, and identities", "Involve them from the earliest stages of planning, not as a final check", "Pay or otherwise recognise their contribution appropriately", "Act on what they tell you; advisory input that is not implemented is performative"]} /><KeyReminder text="Co-design means people with lived experience shaping decisions, not just commenting on them after the fact." /></div>,
    <div key="s4"><SectionLabel text="Logistics" /><SlideHeading title="Timing, Budget, and Scheduling" /><BodyText>Practical logistics have an enormous impact on who can attend and engage. Getting them right requires intentional planning.</BodyText><BulletList items={["Check religious and cultural calendars before confirming event dates; avoid scheduling on significant observances", "Consider time of day for events: early morning and late evening events exclude carers and people with health conditions", "Allocate a dedicated accessibility budget rather than treating reasonable adjustments as an afterthought", "Offer flexible ticketing including free or reduced-price options to reduce socio-economic barriers to attendance"]} /><ReflectionBox prompt="Think about a recent event you planned or attended. Were there scheduling or cost factors that made it harder for some people to participate?" /></div>,
    <div key="s5"><SectionLabel text="Access" /><SlideHeading title="Physical and Digital Accessibility" /><BodyText>Whether your event is in person, online, or hybrid, access must be designed in from the start.</BodyText><BulletList items={["For in-person events: step-free access, accessible toilets, clear signage, a quiet room or sensory space, and good lighting and acoustics", "For online events: captioning, screen-reader-compatible platforms, and accessible slides and materials", "Offer BSL or other sign language interpretation and provide it prominently rather than in a corner or small window", "Test all accessibility features in advance rather than assuming they will work on the day"]} /><KeyReminder text="Accessibility is not an upgrade. It is a right. Build it in, not on." /></div>,
    <div key="s6"><SectionLabel text="Registration" /><SlideHeading title="Inclusive Registration and Communication" /><BodyText>Registration is the first moment attendees encounter your event, and it can signal inclusion or exclusion immediately.</BodyText><BulletList items={["Include an access needs question in every registration form, framed positively and without requiring disclosure of diagnosis or condition", "Offer registration in accessible formats and with support available for those who need it", "Send all pre-event communications in accessible formats: plain text, Word documents, or tagged PDFs", "Publish a clear accessibility statement covering physical access, digital access, dietary options, sensory considerations, and how to request adjustments"]} /><ReflectionBox prompt="What does your registration process currently ask about access needs? How easy is it for attendees to request adjustments?" /></div>,
    <div key="s7"><SectionLabel text="Programme" /><SlideHeading title="Building an Inclusive Programme" /><BodyText>The content and structure of your event communicates whose knowledge is valued and whose experience is centred.</BodyText><BulletList items={["Ensure speaker lineups reflect the diversity of your field and community; do not wait to be pitched by underrepresented groups", "Design sessions to include a variety of formats: presentations, panel discussions, small groups, and participatory activities", "Brief speakers on inclusive facilitation, accessibility expectations, and how to describe visual content for blind or visually impaired attendees", "Apply trauma-informed facilitation principles: warn attendees of potentially distressing content and offer alternatives"]} /><KeyReminder text="A programme full of people who look the same, think the same, and speak only to one another is not a diverse event." /></div>,
    <div key="s8"><SectionLabel text="Hospitality" /><SlideHeading title="Catering, Welfare, and Comfort" /><BodyText>The human experience of an event includes how people are fed, rested, and supported throughout the day.</BodyText><BulletList items={["Label all food clearly with allergens, dietary information, and preparation method", "Provide a range of dietary options including vegan, halal, kosher, and allergen-free choices as standard", "Create a designated quiet room or wellbeing space for people who need a break from noise and stimulation", "Offer gender-neutral toilets where possible and communicate their location in advance", "Make sure breaks are long enough to allow everyone to move, rest, eat, and use facilities without rushing"]} /><ReflectionBox prompt="Does your current event catering reflect the dietary needs of a truly diverse audience? What would you need to change?" /></div>,
    <div key="s9"><SectionLabel text="Supply Chain" /><SlideHeading title="Inclusive Suppliers and Marketing" /><BodyText>Inclusion extends to who you work with and how you promote your event.</BodyText><BulletList items={["Actively seek out suppliers and venues with strong accessibility and equality commitments", "Include diversity and inclusion questions in your supplier selection process", "Ensure event marketing uses inclusive and representative imagery and language", "Make sure promotional materials are accessible: alt text on images, accessible social media posts, and captions on video content", "Reach beyond your existing networks to promote the event to underrepresented communities"]} /><KeyReminder text="If your marketing only reaches the people who already come to events like yours, your event will only ever reflect what it has always been." /></div>,
    <div key="s10"><SectionLabel text="Day of Event" /><SlideHeading title="On-the-Day Logistics" /><BodyText>Even the best-planned events can fall short if on-the-day logistics are not carefully managed.</BodyText><BulletList items={["Brief all staff and volunteers on inclusion, accessibility, and how to respond to access requests on the day", "Designate a named contact for access needs who is easy to identify and approach", "Conduct an accessibility walkthrough of the venue before doors open", "Have a clear process for responding to access requests or concerns on the day without requiring attendees to navigate bureaucracy", "Consider a dedicated arrival time or priority access for attendees who need it"]} /><ReflectionBox prompt="What would an attendee with access needs experience arriving at your event? Walk through it in your mind from their perspective." /></div>,
    <div key="s11"><SectionLabel text="Learning" /><SlideHeading title="Evaluation and Continuous Improvement" /><BodyText>Inclusive events get better over time when you build evaluation into your process and act on what you learn.</BodyText><BulletList items={["Ask about inclusion and accessibility experiences in your post-event feedback; make the questions specific", "Gather feedback from attendees with a range of access needs, not only those who raise issues", "Review what worked and what did not, and build learning into future planning", "Share what you found with your team and with any advisors or community partners involved in the planning", "Set measurable inclusion goals for each event and track progress over time"]} /><KeyReminder text="Evaluation without action is just data collection. Use what you learn to change what you do." /></div>,
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
    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Plan Events Everyone Can Access" /><BulletList items={["Inclusive events require intentional planning at every stage, from purpose-setting to post-event evaluation", "Co-design with people who have lived experience is essential; consultation after decisions are made is not co-design", "Accessibility covers physical and digital access, communication, catering, scheduling, and content", "Supplier choices, marketing materials, and programme decisions all communicate whose presence is valued", "Continuous learning and improvement is the mark of an organisation genuinely committed to inclusive events"]} /><ReflectionBox prompt="What is the most significant change you could make to your next event to improve access and inclusion?" subPrompts={["Is there a group that rarely attends your events? What might be stopping them?", "Do you have a budget line for accessibility?", "Who would you involve in planning that you do not currently consult?"]} /><KeyReminder text="The most inclusive event you have ever run should be the least inclusive event you will ever run." /></div>,
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
