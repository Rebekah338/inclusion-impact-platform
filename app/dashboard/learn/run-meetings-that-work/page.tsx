"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

type QuizAnswers = Record<number, string>;

function ImagePlaceholder({ description, src }: { description: string; src?: string }) {
  if (src) {
    return (
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={description} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px dashed var(--sage-light)",
      borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" as const,
      color: "var(--sage-dark)", fontSize: "0.85rem", fontStyle: "italic",
      fontFamily: "var(--font-body)", marginBottom: "1.5rem",
    }}>
      {description}
    </div>
  );
}

function SlideShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
      {children}
    </div>
  );
}

function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, margin: 0 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.6, fontSize: "1rem", marginTop: "0.35rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ReflectionBox({ subPrompts }: { subPrompts: string[] }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", borderLeft: "4px solid var(--sage-dark)",
      borderRadius: "0 0.5rem 0.5rem 0", padding: "1rem 1.25rem", margin: "1.5rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
        💭 Reflect (write down on your paper):
      </p>
      {subPrompts.map((sp, i) => (
        <p key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.4rem 0" }}>
          ✏️ {sp}
        </p>
      ))}
    </div>
  );
}

function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
      borderRadius: "0.5rem", padding: "0.9rem 1.1rem", margin: "1.25rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
        📌 {text}
      </p>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "1rem", margin: "1.25rem 0 0.4rem 0" }}>
      {text}
    </p>
  );
}

function BodyText({ children, italic }: { children: React.ReactNode; italic?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)", color: "var(--charcoal)",
      fontSize: "1rem", lineHeight: 1.75,
      fontStyle: italic ? "italic" : "normal", margin: "0.6rem 0",
    }}>
      {children}
    </p>
  );
}

function MoveOnNote() {
  return (
    <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>
      Once you have written down your answers, you can move to the next slide.
    </p>
  );
}

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Run Meetings That Work for Everyone" subtitle="Accessible and Inclusive Meetings" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          A meeting that only works for some people is not a meeting that works. If your most important ideas only ever come from the same voices, you are not running a meeting: you are running a monologue with an audience.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you run meetings that are genuinely accessible, equitable, and productive for every person in the room, regardless of communication style, disability, neurodivergence, or working pattern.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Identify the barriers that prevent people from fully participating in meetings",
        "Apply practical changes to how you plan, structure, and facilitate meetings",
        "Recognise whose voices are consistently heard or consistently missing, and understand why",
        "Create meetings that people can actually prepare for, participate in, and contribute to equally",
      ]} />

      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </SlideShell>
  );
}

function Slide2() {
  return (
    <SlideShell>
      <SlideHeading title="Why Inclusive Meetings Matter" />
      <ImagePlaceholder description="A diverse group of colleagues in a meeting room, some on screen via video call" />

      <BodyText>
        Meetings are where decisions get made, ideas get heard, and culture gets shaped. They are also one of the places where exclusion is most likely to happen without anyone noticing.
      </BodyText>

      <SectionLabel text="The reality:" />
      <BulletList items={[
        "Research consistently shows that in mixed groups, men speak more than women, and senior people speak more than junior people, regardless of who has the most relevant knowledge",
        "Neurodiverse people, people with hearing loss, and people joining remotely are often structurally disadvantaged in standard meeting formats",
        "Interruption patterns are not random: studies show that women and people from ethnic minority backgrounds are interrupted more frequently in professional settings",
        "When meetings do not circulate agendas in advance, they systematically disadvantage people who need preparation time to contribute confidently",
      ]} />

      <SectionLabel text="The opportunity:" />
      <BodyText>
        When meetings are designed to be inclusive, organisations make better decisions, surface more ideas, and create cultures where everyone feels their contribution matters. Inclusive meetings are not just fairer: they are smarter.
      </BodyText>

      <KeyReminder text="Who speaks in your meetings is a data point. If it is always the same people, your meeting design is doing the selecting, not ability or knowledge." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Scheduling and Invitations" />
      <ImagePlaceholder description="A calendar app showing a meeting invitation with clear details and an agenda attached" />

      <SectionLabel text="Scheduling with everyone in mind:" />
      <BulletList items={[
        "Avoid early mornings, late afternoons, and Friday afternoons where possible: these times disproportionately affect people with caring responsibilities, those managing energy-limited conditions, or those who observe religious practices",
        "Give adequate notice: at least 48 hours for routine meetings, more for complex or sensitive topics",
        "Check whether the meeting is actually necessary: consider whether the same outcome could be achieved asynchronously through a shared document or recorded update",
        "Limit meeting length: long meetings without breaks are inaccessible for many people. Build in breaks for meetings over 60 minutes.",
      ]} />

      <SectionLabel text="Accessible invitations:" />
      <BulletList items={[
        "Send a clear agenda in advance with timings for each item: this allows people to prepare and reduces the cognitive load of the meeting itself",
        "State the purpose of the meeting, what decisions will be made, and what people need to bring or review in advance",
        "Confirm the format: will it be in person, hybrid, or online? Will it be recorded? Will captions be available?",
        "Ask about access needs in advance: do not wait to be asked. Make this a standard part of your meeting invitation.",
      ]} />

      <KeyReminder text="An agenda is not a formality. It is an access tool. Without it, only people who are comfortable in unstructured environments can participate fully." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Meeting Materials" />
      <ImagePlaceholder description="A person reviewing a clearly formatted meeting document on a tablet" />

      <BodyText>
        The materials you share before, during, and after a meeting shape whether everyone can participate equally. Inaccessible materials exclude people before the meeting has even started.
      </BodyText>

      <SectionLabel text="Before the meeting:" />
      <BulletList items={[
        "Share all materials at least 24 hours in advance wherever possible",
        "Use plain, accessible formatting: clear headings, sufficient white space, readable fonts at a minimum 12pt, and good colour contrast",
        "Avoid using colour alone to convey meaning: some people cannot distinguish certain colours",
        "Provide documents in accessible formats: PDF with tagged headings, Word documents with accessible structure, or HTML where possible",
        "If materials include complex data or charts, include a written description of the key findings",
      ]} />

      <SectionLabel text="During and after the meeting:" />
      <BulletList items={[
        "Share slides or documents on screen in real time so remote participants can follow along",
        "Send minutes or a written summary after the meeting: do not assume everyone absorbed information the same way in real time",
        "Include a clear record of decisions made and actions assigned, with owners and deadlines",
        "Allow time after the meeting for people to review and respond before decisions are finalised",
      ]} />

      <ReflectionBox subPrompts={[
        "How much notice do the people in your team typically get before a meeting?",
        "Are your meeting materials accessible to someone joining by screen reader or with low vision?",
      ]} />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Technology and Online Meetings" />
      <ImagePlaceholder description="A laptop screen showing a video call with captions enabled and multiple participants" />

      <BodyText>
        Online and hybrid meetings introduce additional barriers that disproportionately affect people with disabilities, those with unstable internet access, and those who are less familiar with the technology. Accessible technology choices reduce these barriers significantly.
      </BodyText>

      <SectionLabel text="Before and during online meetings:" />
      <BulletList items={[
        "Enable live captions as standard for all online meetings: this supports people who are deaf or hard of hearing, non-native English speakers, and people in noisy environments",
        "Test your technology before the meeting and share clear joining instructions in advance",
        "Ensure microphones and speakers are working: poor audio quality is a significant accessibility barrier",
        "Use a platform that supports screen reader access and keyboard navigation where possible",
        "Record meetings when appropriate and with consent: not everyone can attend live, and a recording extends access",
      ]} />

      <SectionLabel text="Hybrid meetings:" />
      <BulletList items={[
        "Hybrid meetings require active facilitation to ensure remote participants are not treated as second-class attendees",
        "Use a camera that shows the whole room or rotate the view: remote participants should be able to see who is speaking",
        "Ensure remote participants can see any documents, whiteboards, or slides being used in the room",
        "Direct questions explicitly to remote participants: they cannot interrupt naturally and are easily overlooked",
      ]} />

      <KeyReminder text="If remote participants are regularly the last to speak, the last to be asked, or the first to drop off, your hybrid setup is not working for everyone." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Facilitation: Who Gets Heard" />
      <ImagePlaceholder description="A facilitator actively drawing out quieter voices around a meeting table" />

      <BodyText>
        Who speaks in a meeting is not accidental. It is shaped by power, confidence, communication style, and the design of the meeting itself. A skilled facilitator creates the conditions for more equitable participation.
      </BodyText>

      <SectionLabel text="Practical facilitation techniques:" />
      <BulletList items={[
        "Use a round: go around the group so everyone has the opportunity to speak without needing to interrupt or compete",
        "Use written contributions: ask people to write their ideas before sharing them verbally, or use chat functions in online meetings. This gives processing time and equalises contribution.",
        "Name and address interruptions: if someone is interrupted, bring them back into the conversation. Do not let interruptions pass unnoticed.",
        "Watch for dominance patterns: if the same people are always speaking, actively and warmly invite others. Do not wait for quieter people to push their way in.",
        "Avoid calling on people unexpectedly: give people warning if you will be asking them to contribute so they can prepare",
        "Avoid back-channelling or side conversations in hybrid or in-person settings: they exclude others and undermine the meeting",
      ]} />

      <SectionLabel text="After the meeting:" />
      <BulletList items={[
        "Reflect on who spoke and who did not: was this the same pattern as last time?",
        "Offer alternative channels for people who find it hard to contribute verbally: written follow-up, a shared document, or a one-to-one conversation",
      ]} />

      <KeyReminder text="Silence in a meeting is not always agreement. Sometimes it is exclusion." />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Accessibility in the Room" />
      <ImagePlaceholder description="An accessible meeting room with good lighting, clear sightlines, and hearing loop signage" />

      <SectionLabel text="Physical environment:" />
      <BulletList items={[
        "Ensure the meeting room is physically accessible: step-free access, accessible toilets nearby, adequate space for wheelchair users",
        "Check the hearing loop is working if your venue has one, and say so at the start of the meeting",
        "Ensure good lighting so that people who lip-read can do so effectively",
        "Avoid noisy environments or background music that can make it hard for people with hearing loss or auditory processing differences",
        "Allow people to sit where they need to: do not insist on fixed seating arrangements that do not work for everyone",
      ]} />

      <SectionLabel text="Communication and sensory needs:" />
      <BulletList items={[
        "Ask whether anyone needs an interpreter or communication support before the meeting",
        "Speak clearly and at a moderate pace: do not rush, trail off, or speak with your back to the room",
        "Avoid idioms, acronyms, and jargon without explanation: these create unnecessary barriers for people with language processing differences or those new to the organisation",
        "Allow people to take notes, record on their own device, or use assistive technology without comment or restriction",
        "Offer breaks for longer meetings and allow people to step out without explanation: this is essential for many people managing health conditions or neurodivergence",
      ]} />

      <ReflectionBox subPrompts={[
        "When did you last check that your usual meeting spaces are physically accessible?",
        "Are there people in your team who consistently seem disengaged in meetings? Could accessibility be a factor?",
      ]} />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" />
      <ImagePlaceholder description="A hybrid meeting where the facilitator is on screen and some participants are in the room" />

      <SectionLabel text="The Scenario:" />
      <BodyText>
        A team holds a weekly all-hands meeting every Monday at 8:30am. The meeting has no agenda. It typically runs for 90 minutes without a break. One member of the team works compressed hours and does not work Mondays. Two others join remotely but their audio is often poor. A team member who joined three months ago has never spoken in the meeting. The manager always opens with the same question: any updates?
      </BodyText>

      <ReflectionBox subPrompts={[
        "Who is this meeting designed for, and who is it designed against?",
        "What three specific changes would make this meeting more accessible and more equitable?",
        "What might the team member who has never spoken be experiencing? What assumptions might the manager be making?",
      ]} />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Your Turn" subtitle="Activity Slide" />
      <ImagePlaceholder description="An open notebook with a hand holding a pen, ready to write" />

      <BodyText>
        Take 15 minutes. Think about a recurring meeting you attend or run.
      </BodyText>

      <BulletList items={[
        "Does everyone in the meeting receive the agenda in advance? If not, who is most disadvantaged by this?",
        "In the last three meetings, whose voices were heard most and whose were heard least? Is this pattern consistent?",
        "Are there people who consistently join remotely? How would they describe their experience of participating?",
        "What is one change you could make to your next meeting that would make it more accessible for at least one person?",
      ]} />

      <KeyReminder text="You do not need to redesign every meeting at once. Start with one change. Then another. Inclusive meetings are built incrementally." />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="What the Research Says" />
      <ImagePlaceholder description="Research documents and charts on a desk" />

      <SectionLabel text="Participation and power in meetings:" />
      <BulletList items={[
        "Studies show that in mixed-gender groups, men speak on average 75% more than women, even when women are equally or more qualified to speak on the topic (Harvard Business Review)",
        "Research by Brigham Young University found that women spoke 25% less than men in decision-making groups, but this disparity largely disappeared when explicit turn-taking rules were introduced",
        "A study in the Journal of Applied Psychology found that the more diverse a team, the more likely it was to outperform homogeneous teams, but only when team members felt psychologically safe to speak",
        "Interruption research consistently shows that women and people from ethnic minority groups are interrupted more frequently in professional settings, with compounding effects on confidence and contribution over time",
      ]} />

      <SectionLabel text="Neurodivergence and meetings:" />
      <BulletList items={[
        "Approximately 15 to 20% of the population is neurodivergent, including people with ADHD, autism, dyslexia, and other conditions that affect how they process information and participate in group settings (ACAS, 2023)",
        "Many standard meeting formats, including long meetings without agendas or structure, are particularly difficult for people with ADHD or autism",
        "Advance agendas, structured formats, and written contribution options make a measurable difference to neurodivergent participation",
      ]} />

      <SectionLabel text="The cost of inaccessible meetings:" />
      <BulletList items={[
        "Research estimates that UK organisations lose up to 31 billion pounds per year in productivity due to poorly run meetings (Atlassian)",
        "Meetings where the same voices dominate consistently produce lower-quality decisions than meetings with broader participation (McKinsey)",
      ]} />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <SectionLabel text="Key points from this lesson:" />
      <BulletList items={[
        "Who speaks in meetings is shaped by design, not just personality: inclusive facilitation changes participation patterns",
        "Agendas, advance materials, and clear structure are access tools, not optional extras",
        "Hybrid meetings require active design to prevent remote participants from being structurally disadvantaged",
        "Live captions, recorded meetings, and written contribution options significantly extend access",
        "Silence in a meeting is not always agreement: it may indicate exclusion, anxiety, or inaccessibility",
        "Inclusive meetings are more productive: better participation leads to better decisions",
      ]} />

      <SectionLabel text="Key Terms:" />
      <BulletList items={[
        "Structured facilitation: a meeting approach in which explicit techniques are used to manage participation, ensure equitable speaking time, and draw out quieter voices",
        "Psychological safety: the shared belief that team members can speak up, share ideas, and raise concerns without fear of embarrassment or punishment",
        "Asynchronous alternatives: ways of achieving meeting outcomes without a live meeting, such as shared documents, recorded updates, or collaborative comment threads",
      ]} />

      <KeyReminder text="An inclusive meeting is not a longer or more complicated meeting. It is a meeting that was designed with everyone in it." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Why are agendas described as an access tool rather than just a formality?",
      options: [
        { id: "a", text: "They make meetings look more professional and organised" },
        { id: "b", text: "They allow people to prepare, reducing cognitive load and enabling more equitable participation" },
        { id: "c", text: "They are required by employment law for formal meetings" },
        { id: "d", text: "They help the chair keep the meeting to time" },
      ],
      correct: "b",
      explanation: "Agendas allow people to prepare in advance, which is essential for many people including those who are neurodiverse, anxious, or less confident in unstructured settings. Without an agenda, only people comfortable with spontaneous contribution can participate fully.",
    },
    {
      q: "In a hybrid meeting, what is one of the most important things a facilitator can do?",
      options: [
        { id: "a", text: "Keep the meeting short so remote participants stay focused" },
        { id: "b", text: "Actively direct questions to remote participants and ensure they can see and hear everything" },
        { id: "c", text: "Encourage remote participants to turn their cameras on at all times" },
        { id: "d", text: "Ask remote participants to wait until the in-room discussion is finished before contributing" },
      ],
      correct: "b",
      explanation: "Remote participants cannot naturally interrupt or join the conversation. Without active facilitation, they are structurally disadvantaged. A good facilitator ensures remote participants can see materials, are explicitly invited to contribute, and are treated as equal participants.",
    },
    {
      q: "Research shows that in mixed-gender groups, men speak approximately how much more than women on average?",
      options: [
        { id: "a", text: "10% more" },
        { id: "b", text: "25% more" },
        { id: "c", text: "75% more" },
        { id: "d", text: "There is no consistent difference" },
      ],
      correct: "c",
      explanation: "Studies have found that in mixed-gender groups, men speak on average 75% more than women, even when women are equally or more qualified to contribute. This is a structural pattern, not a matter of individual confidence or capability.",
    },
    {
      q: "Which of the following best describes psychological safety in the context of meetings?",
      options: [
        { id: "a", text: "Ensuring the meeting room has the correct fire safety signage" },
        { id: "b", text: "The belief that team members can speak up and share ideas without fear of embarrassment or punishment" },
        { id: "c", text: "A policy that prevents personal criticism in meetings" },
        { id: "d", text: "The use of anonymous feedback tools so people can share views without being identified" },
      ],
      correct: "b",
      explanation: "Psychological safety is the shared belief that it is safe to take interpersonal risks in a team setting. Research shows it is one of the strongest predictors of team performance and is essential for inclusive participation in meetings.",
    },
  ];

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("run-meetings-that-work");
    onComplete(finalScore);
  };

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  return (
    <SlideShell>
      <SlideHeading title="Quiz" subtitle="Test what you have learned" />
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: "1.75rem", padding: "1.25rem", background: "var(--sage-xlight)", borderRadius: "0.75rem", border: "1px solid var(--sage-light)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.75rem 0" }}>
            {qi + 1}. {q.q}
          </p>
          {q.options.map((opt) => {
            const chosen = answers[qi] === opt.id;
            const isCorrect = opt.id === q.correct;
            let bg = "var(--white)";
            let border = "1px solid var(--gray-border)";
            if (submitted && chosen && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            else if (submitted && chosen && !isCorrect) { bg = "#f8d7da"; border = "1px solid #dc3545"; }
            else if (submitted && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            return (
              <label key={opt.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: submitted ? "default" : "pointer", background: bg, border, borderRadius: "0.4rem", padding: "0.6rem 0.75rem", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  name={`q${qi}`}
                  value={opt.id}
                  checked={chosen}
                  disabled={submitted}
                  onChange={() => setAnswers({ ...answers, [qi]: opt.id })}
                  style={{ marginTop: "0.15rem", flexShrink: 0 }}
                />
                <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem" }}>{opt.text}</span>
              </label>
            );
          })}
          {submitted && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.875rem", margin: "0.5rem 0 0 0", fontStyle: "italic" }}>
              {q.explanation}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          style={{
            background: Object.keys(answers).length < questions.length ? "var(--sage-light)" : "var(--sage-dark)",
            color: "var(--white)", border: "none", borderRadius: "0.5rem",
            padding: "0.75rem 2rem", fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "1rem", cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer",
          }}
        >
          Submit answers
        </button>
      )}
      {submitted && (
        <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "0.5rem", textAlign: "center" as const }}>
          <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
            You scored {score} out of {questions.length}
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
            Your result has been saved to your learning record.
          </p>
        </div>
      )}
    </SlideShell>
  );
}

function Slide13({ score }: { score: number }) {
  return (
    <SlideShell>
      <SlideHeading title="How You Did and Your Takeaways" />
      <ImagePlaceholder description="A sealed envelope with The Inclusion Edit stamp on the back" />

      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" as const }}>
        <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          {score} / 4
        </p>
      </div>

      <SectionLabel text="Your takeaways from this lesson:" />
      <BulletList items={[
        "Inclusive meetings are not about being nice: they are about being effective. Better participation leads to better decisions.",
        "Who speaks in your meetings is a design outcome, not a personality outcome: change the design, change the pattern",
        "Agendas, captions, written contributions, and breaks are not accommodations for a minority: they benefit everyone",
        "Hybrid meetings require active facilitation: remote participants will not automatically be equal without effort",
        "Silence is data: if the same people are always quiet, ask why rather than assuming it is their choice",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why Inclusive Meetings Matter",
  "Scheduling and Invitations",
  "Meeting Materials",
  "Technology and Online Meetings",
  "Facilitation: Who Gets Heard",
  "Accessibility in the Room",
  "Real World Scenario",
  "Your Turn",
  "What the Research Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function RunMeetingsThatWorkPage() {
  const [slide, setSlide] = useState(0);

  // Text-to-speech
  const [ttsActive, setTtsActive] = React.useState(false);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setTtsActive(false);
  };

  const readSlide = () => {
    if (ttsActive) { stopSpeech(); return; }
    const el = document.getElementById("slide-content-area");
    if (!el) return;
    const text = el.innerText || el.textContent || "";
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.onend = () => setTtsActive(false);
    utt.onerror = () => setTtsActive(false);
    setTtsActive(true);
    window.speechSynthesis.speak(utt);
  };

  // Stop speech when slide changes
  React.useEffect(() => { stopSpeech(); }, [slide]);

  const [quizScore, setQuizScore] = useState(0);
  const totalSlides = SLIDE_TITLES.length;

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const goNext = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.min(s + 1, totalSlides - 1));
  };
  const goPrev = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.max(s - 1, 0));
  };

  const slides = [
    <Slide1 key={0} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
    <Slide4 key={3} />,
    <Slide5 key={4} />,
    <Slide6 key={5} />,
    <Slide7 key={6} />,
    <Slide8 key={7} />,
    <Slide9 key={8} />,
    <Slide10 key={9} />,
    <Slide11 key={10} />,
    <Slide12Quiz key={11} onComplete={handleQuizComplete} />,
    <Slide13 key={12} score={quizScore} />,
  ];

  const total = SLIDE_TITLES.length;
  const progress = ((slide + 1) / total) * 100;

  return (
    <>
      <PlatformNav />
      <main style={{
        minHeight: "100vh",
        background: "var(--white)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}>
        {/* Progress bar */}
        <div style={{ position: "sticky", top: "3.5rem", zIndex: 10, background: "var(--white)", borderBottom: "1px solid var(--gray-border)", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.8rem" }}>
                Slide {slide + 1} of {total}
              </span>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.5, fontSize: "0.8rem" }}>
                {SLIDE_TITLES[slide]}
              </span>
            </div>
            <div style={{ background: "var(--gray-border)", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: "var(--sage-dark)",
                borderRadius: "99px",
                transition: "width 0.35s ease",
              }} />
            </div>
          </div>
        </div>

        {/* Slide content */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{
            background: "var(--white)",
            border: "1.5px solid var(--gray-border)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>

            {/* TTS button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
              <button
                onClick={readSlide}
                title={ttsActive ? "Stop reading" : "Read slide aloud"}
                style={{
                  background: ttsActive ? "var(--sage-dark)" : "none",
                  border: "1.5px solid var(--sage-dark)",
                  borderRadius: "99px",
                  padding: "0.35rem 0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  color: ttsActive ? "var(--white)" : "var(--sage-dark)",
                  transition: "all 0.2s",
                }}
              >
                {ttsActive ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
            <div id="slide-content-area">
            {slides[slide]}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "var(--white)", borderTop: "1.5px solid var(--gray-border)",
          padding: "0.75rem 1rem",
          zIndex: 20,
        }}>
          <div style={{
            maxWidth: "680px", margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <button
              onClick={goPrev}
              disabled={slide === 0}
              style={{
                background: "none", border: "1px solid var(--gray-border)",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: slide === 0 ? "var(--gray-border)" : "var(--charcoal)",
                cursor: slide === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {SLIDE_TITLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlide(i); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  style={{
                    width: i === slide ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "99px",
                    background: i === slide ? "var(--sage-dark)" : "var(--gray-border)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            {slide < total - 1 ? (
              <button
                onClick={goNext}
                style={{
                  background: "var(--sage-dark)", border: "none",
                  borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--white)", cursor: "pointer",
                }}
              >
                Next →
              </button>
            ) : (
              <Link href="/dashboard/learn" style={{
                background: "var(--sage-dark)", border: "none",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: "var(--white)", textDecoration: "none",
              }}>
                Finish lesson
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
