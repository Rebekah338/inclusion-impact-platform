"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

type QuizAnswers = Record<number, string>;

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

function ReflectionBox({ prompt, subPrompts }: { prompt?: string; subPrompts?: string[] }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", borderLeft: "4px solid var(--sage-dark)",
      borderRadius: "0 0.5rem 0.5rem 0", padding: "1rem 1.25rem", margin: "1.5rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
        💭 Reflect (write down on your paper):
      </p>
      {prompt && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.25rem 0" }}>
          {prompt}
        </p>
      )}
      {subPrompts && subPrompts.map((sp, i) => (
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

function BodyText({ children, italic, small }: { children: React.ReactNode; italic?: boolean; small?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)", color: "var(--charcoal)",
      fontSize: small ? "0.9rem" : "1rem", lineHeight: 1.75,
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

function ExampleBox({ label, text }: { label: string; text: string }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
      borderRadius: "0.75rem", padding: "1rem 1.25rem", margin: "1rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.85rem", margin: "0 0 0.4rem 0" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0, fontStyle: "italic" }}>
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Speaking Up: Challenging Exclusionary Behaviour at Work" subtitle="From Awareness to Action" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Most people who witness exclusionary behaviour at work do nothing. Not because they do not care, but because they do not know what to say. This lesson gives you the tools to act with confidence, compassion, and care.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson equips you with the practical skills to recognise, respond to, and report exclusionary behaviour at work; whether you are the person affected, a colleague who witnesses it, or a manager responsible for the team culture.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Assess when, where, and how to challenge exclusionary behaviour safely and constructively",
        "Use clear, non-escalatory language to name and address non-inclusive comments or actions",
        "Support colleagues who have been affected by exclusionary behaviour",
        "Know when and how to document and report persistent or serious behaviour",
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
      <SlideHeading title="Why People Stay Silent" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/speaking-up/slide2-bystander.jpg" alt="A person observing a workplace conversation with concern" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        When exclusionary behaviour happens at work; a dismissive comment, a microaggression, a pattern of someone being talked over or left out; most bystanders freeze. Understanding why this happens is the first step to changing it.
      </BodyText>

      <SectionLabel text="Common reasons people do not speak up:" />
      <BulletList items={[
        "Uncertainty about whether the behaviour was actually problematic or if they misread it",
        "Fear of making things worse or causing conflict in the team",
        "Worry about being seen as oversensitive, self-righteous, or a troublemaker",
        "Not knowing what to say or how to say it constructively",
        "Concern about their own position or relationship with the person involved",
        "Assuming someone else will say something, or that it is HR's job",
      ]} />

      <KeyReminder text="Silence is not neutral. When exclusionary behaviour goes unchallenged, it signals to everyone in the room that the behaviour is acceptable. Speaking up; even imperfectly; changes that signal." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Step 1: Assess Safety, Setting, and Timing" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/speaking-up/slide3-assess.jpg" alt="A person pausing thoughtfully before responding in a workplace situation" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Before responding, take a moment to assess the situation. Challenging behaviour does not always have to happen in the moment; sometimes a brief pause, or waiting for a better time, leads to a more constructive outcome.
      </BodyText>

      <SectionLabel text="Questions to ask yourself:" />
      <BulletList items={[
        "Is this the right moment? Is there space for a real conversation, or would it be better to address it privately afterwards?",
        "Who is affected, and what do they need right now? Sometimes a person wants to be supported; not necessarily to have the incident escalated in public.",
        "What is the power dynamic? Challenging a peer is different from challenging a manager or senior leader.",
        "Am I the right person to respond here? If the comment targeted someone else, it may be worth checking what they would find most helpful.",
        "What is my intention? The goal is to address the behaviour; not to humiliate or win an argument.",
      ]} />

      <KeyReminder text="Timing matters. A quiet word afterwards can be just as effective as an immediate challenge; sometimes more so. The important thing is that the behaviour does not go unaddressed." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Step 2: Using Constructive Language" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/speaking-up/slide4-language.jpg" alt="Two colleagues having a calm and constructive one to one conversation" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        The language you use when challenging exclusionary behaviour makes a significant difference to how the message lands. The goal is to name the impact without attacking the person; to address the behaviour without creating defensiveness that shuts down the conversation.
      </BodyText>

      <SectionLabel text="Principles for constructive challenge:" />
      <BulletList items={[
        "Name the behaviour; not the person: focus on what was said or done, not who the person is",
        "Describe the impact: explain what effect the comment or action has, rather than making accusations",
        "Use first-person language where possible: 'I noticed' or 'I felt' rather than 'you always'",
        "Keep a calm, even tone: this signals you are serious, not escalating",
        "Give the person a way to respond constructively; not a corner to defend themselves from",
      ]} />

      <ExampleBox
        label="💬 Example phrase:"
        text="That comment wasn't okay. We work in a team that values everyone here, and that language doesn't reflect that."
      />

      <ExampleBox
        label="💬 Another approach:"
        text="I want to pick up on what was said earlier. I'm not sure it landed the way it was intended, but I think it's worth a quick conversation."
      />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Step 3: Digging Deeper" />

      <BodyText>
        Sometimes the most effective response to an exclusionary comment is not a statement but a question. Asking someone to explain their thinking invites reflection without accusation; it creates space for the person to hear themselves and reconsider.
      </BodyText>

      <SectionLabel text="Why questions work:" />
      <BulletList items={[
        "They avoid the defensiveness that can come with a direct challenge",
        "They put responsibility on the person who made the comment to examine and articulate their own thinking",
        "They open rather than close the conversation",
        "They can reveal whether the behaviour was thoughtless rather than deliberate, which shapes how you respond next",
      ]} />

      <SectionLabel text="Useful open questions:" />
      <BulletList items={[
        "\"What did you mean by that?\"",
        "\"Can you say more about what you meant?\"",
        "\"I want to understand what you were going for there.\"",
        "\"Do you think that comment might land differently for some people in the room?\"",
        "\"How would you feel if that was said about you or someone you care about?\"",
      ]} />

      <KeyReminder text="Genuine curiosity is not the same as passive-aggressiveness. Ask questions with real openness; not as a trap. The goal is reflection, not shame." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Step 4: Acknowledging Emotions and Checking In" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/speaking-up/slide6-checkin.jpg" alt="A colleague checking in with empathy and genuine concern" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Exclusionary behaviour has an emotional impact. For the person targeted, even a seemingly small comment can feel isolating and exhausting; particularly if it happens repeatedly. After an incident, checking in with that person privately is often one of the most valuable things you can do.
      </BodyText>

      <SectionLabel text="When checking in with someone who has been affected:" />
      <BulletList items={[
        "Choose a private moment; not in front of others or immediately after the incident in public",
        "Lead with care, not analysis: 'I wanted to check in on how you're doing' rather than 'I thought what happened was terrible'",
        "Ask what they need, rather than deciding for them: 'Is there anything that would be helpful from me?'",
        "Acknowledge what happened without minimising it: avoid phrases like 'I'm sure they didn't mean it' or 'it could have been worse'",
        "Respect their response: they may want support, or they may want to move on. Follow their lead.",
      ]} />

      <ExampleBox
        label="💬 Example:"
        text="I wanted to check in privately. I noticed what was said earlier and I didn't want to leave it without seeing how you're feeling. Is there anything I can do to help?"
      />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Step 5: Restorative Approaches" />

      <BodyText>
        When exclusionary behaviour causes harm, addressing it is not just about stopping the behaviour. It is also about repairing the damage done to trust, relationships, and belonging. Restorative approaches focus on accountability and repair; not just punishment or process.
      </BodyText>

      <SectionLabel text="What a restorative approach looks like:" />
      <BulletList items={[
        "Creating space for the person who caused harm to understand the impact of their behaviour",
        "Giving the person who was harmed an opportunity to express what they need; and to have that need taken seriously",
        "Working towards a shared understanding and, where appropriate, a genuine apology",
        "Identifying what needs to change to prevent recurrence; whether that is behaviour, understanding, or team culture",
      ]} />

      <SectionLabel text="When restorative approaches work best:" />
      <BulletList items={[
        "When the behaviour is likely to have been thoughtless rather than malicious",
        "When both parties are willing to engage in good faith",
        "When the relationship; team, working, or professional; is worth preserving",
        "When a formal process would be disproportionate to the incident",
      ]} />

      <KeyReminder text="Restoration is not about minimising what happened. It is about enabling genuine accountability and, where possible, healing; rather than simply moving on without resolution." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Step 6: Documenting What Happened" />

      <BodyText>
        If exclusionary behaviour is persistent, serious, or likely to be subject to a formal process, clear and accurate documentation is essential. Documentation protects everyone involved and ensures that patterns of behaviour are visible; not just isolated incidents.
      </BodyText>

      <SectionLabel text="What to document:" />
      <BulletList items={[
        "The date, time, and location of the incident",
        "Exactly what was said or done, as accurately as possible; use direct quotes where you can",
        "Who was present and who witnessed the incident",
        "How the person targeted responded, and how they appeared to be affected",
        "Any immediate response that was given; including your own, if you challenged the behaviour",
        "Any previous similar incidents involving the same person or pattern of behaviour",
      ]} />

      <SectionLabel text="How to document:" />
      <BulletList items={[
        "Write it down as soon as possible, while details are fresh",
        "Be factual and specific: describe behaviour, not character",
        "Keep your documentation somewhere secure and private",
        "Do not share it more widely than necessary; treat it with the same care you would want applied to your own information",
      ]} />

      <KeyReminder text="Good documentation is factual, specific, and contemporaneous. Phrases like 'he always does this' or 'she is difficult' are not helpful; 'on 14 October, he said...' is." />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Step 7: Reporting Through the Right Channels" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/speaking-up/slide9-reporting.jpg" alt="A person meeting with a trusted manager or HR professional to report a concern" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Not every incident needs to be formally reported. But when behaviour is serious, persistent, or has caused significant harm, knowing how to use formal processes is important. The right channel depends on what happened and your organisation's structure.
      </BodyText>

      <SectionLabel text="Possible reporting routes:" />
      <BulletList items={[
        "Your line manager: appropriate for lower-level concerns or as a first step where the manager is not the subject of the complaint",
        "HR or People team: for concerns that are more serious, persistent, or where your manager is involved",
        "An inclusion lead, EDI officer, or named champion: where your organisation has one",
        "A formal grievance process: for incidents that constitute discrimination, harassment, or victimisation under the Equality Act 2010",
        "An anonymous reporting line: where your organisation provides one; useful where there is fear of reprisal",
      ]} />

      <SectionLabel text="What to expect from a good reporting process:" />
      <BulletList items={[
        "Confidentiality; as far as is practicable",
        "A clear acknowledgement that your report has been received",
        "A transparent process and timeline",
        "Protection from retaliation for making a report in good faith",
      ]} />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Step 8: Reflecting After the Fact" />

      <BodyText>
        Challenging exclusionary behaviour is emotionally as well as practically demanding. After an incident; whether you were the person targeted, a bystander who spoke up, or a manager who had to address it; reflection is a valuable part of the process.
      </BodyText>

      <SectionLabel text="Questions for individual reflection:" />
      <BulletList items={[
        "How did I respond, and was it what I intended?",
        "What would I do differently if this happened again?",
        "What did I notice about my own feelings; discomfort, hesitation, or energy; in the moment?",
        "What does this incident tell me about the culture in my team or organisation?",
        "What, if anything, do I want to do next?",
      ]} />

      <SectionLabel text="Questions for managers and leaders:" />
      <BulletList items={[
        "Did I address this clearly enough, and was my message understood?",
        "Have I followed up with everyone who was affected?",
        "What does this incident suggest about training, communication, or culture needs in my team?",
        "What systemic changes, if any, would reduce the likelihood of this happening again?",
      ]} />

      <KeyReminder text="Reflection is not self-punishment. It is a professional skill that builds your capacity to respond better over time; for yourself and for others." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Think about a situation where you witnessed or experienced exclusionary behaviour at work; or imagine one that could plausibly happen in your context.
      </BodyText>

      <ReflectionBox
        subPrompts={[
          "What happened, and what was your response at the time?",
          "Looking back; or imagining the scenario; what would you do differently using what you have learned in this lesson?",
          "Which of the 8 steps feels most challenging for you personally, and why?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "When is it appropriate to delay challenging exclusionary behaviour rather than responding immediately?",
      options: [
        { id: "a", text: "It is never appropriate to delay; you must always challenge in the moment" },
        { id: "b", text: "When doing so would create a better opportunity for a genuine conversation; for example, addressing it privately afterwards" },
        { id: "c", text: "When you are not sure whether the behaviour was actually a problem" },
        { id: "d", text: "When the person who caused harm is more senior than you" },
      ],
      correct: "b",
      explanation: "Timing matters in how effective a challenge is. A private conversation after the event can be just as powerful as an immediate response, and sometimes more so. The key is that the behaviour is not left unaddressed entirely.",
    },
    {
      q: "Which of the following best describes constructive language when challenging exclusionary behaviour?",
      options: [
        { id: "a", text: "Naming the person's character flaws so they understand the seriousness of their behaviour" },
        { id: "b", text: "Focusing on the impact of the specific behaviour rather than attacking the person's identity or intentions" },
        { id: "c", text: "Using strong language to make clear how unacceptable the behaviour was" },
        { id: "d", text: "Keeping your response vague so as not to embarrass anyone" },
      ],
      correct: "b",
      explanation: "Effective challenge names the behaviour and its impact, using first-person framing where possible. Attacking the person creates defensiveness that shuts down the conversation. Vagueness fails to make the message clear.",
    },
    {
      q: "What is the most important thing to do when checking in with a colleague who has experienced exclusionary behaviour?",
      options: [
        { id: "a", text: "Tell them exactly what you think about the person who caused harm" },
        { id: "b", text: "Immediately escalate on their behalf to HR" },
        { id: "c", text: "Ask what they need and follow their lead; rather than deciding for them what should happen" },
        { id: "d", text: "Reassure them that the person probably did not mean any harm" },
      ],
      correct: "c",
      explanation: "The person who was affected knows best what they need. Checking in is about providing support, not taking control. Minimising the behaviour ('they probably didn't mean it') is unhelpful and can leave the person feeling unsupported.",
    },
    {
      q: "Why is factual, specific documentation important when reporting exclusionary behaviour?",
      options: [
        { id: "a", text: "It makes the process faster for HR" },
        { id: "b", text: "Specific, dated documentation creates a clear factual record that supports a fair and thorough investigation" },
        { id: "c", text: "It shows that the person reporting is taking the matter seriously" },
        { id: "d", text: "It is a legal requirement in all cases" },
      ],
      correct: "b",
      explanation: "Good documentation captures what was said or done, when, where, and who was present. This creates a factual record that supports a fair process for everyone. Vague or characterising language ('he is always difficult') is less useful than specific, dated accounts.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("speaking-up");
    onComplete(finalScore);
  };

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

      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" as const }}>
        <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          {score} / 4
        </p>
      </div>

      <SectionLabel text="Your takeaways from this lesson:" />
      <BulletList items={[
        "Silence in the face of exclusionary behaviour is not neutral; it signals permission",
        "Effective challenge is constructive and specific: focus on the behaviour and its impact, not the person's character",
        "Timing matters: a private follow-up conversation can be as effective as an immediate challenge",
        "Checking in with the person affected is one of the most important forms of support you can offer",
        "Good documentation is factual, specific, and timely; and is essential if the behaviour requires formal action",
        "Reflection after an incident is a professional skill that builds your capacity to act with greater confidence over time",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why People Stay Silent",
  "Step 1: Assess Safety, Setting, and Timing",
  "Step 2: Using Constructive Language",
  "Step 3: Digging Deeper",
  "Step 4: Acknowledging Emotions and Checking In",
  "Step 5: Restorative Approaches",
  "Step 6: Documenting What Happened",
  "Step 7: Reporting Through the Right Channels",
  "Step 8: Reflecting After the Fact",
  "Time to Reflect",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function SpeakingUpPage() {
  const [slide, setSlide] = useState(0);
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
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{
          background: "var(--white)",
          border: "1.5px solid var(--gray-border)",
          borderRadius: "1.25rem",
          padding: "2.5rem 2rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          {/* Progress bar */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", opacity: 0.6 }}>
                Slide {slide + 1} of {total}
              </span>
              <button
                onClick={readSlide}
                style={{
                  background: "none", border: "1px solid var(--gray-border)", borderRadius: "0.4rem",
                  padding: "0.3rem 0.7rem", cursor: "pointer", fontFamily: "var(--font-body)",
                  fontSize: "0.8rem", color: ttsActive ? "var(--sage-dark)" : "var(--charcoal)",
                }}
              >
                {ttsActive ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
            <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "2px" }}>
              <div style={{
                height: "100%", background: "var(--sage-dark)", borderRadius: "2px",
                width: `${progress}%`, transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          {/* Slide content */}
          <div id="slide-content-area">
            {slides[slide]}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--gray-border)" }}>
            <button
              onClick={goPrev}
              disabled={slide === 0}
              style={{
                background: "none", border: "1px solid var(--gray-border)", borderRadius: "0.5rem",
                padding: "0.6rem 1.25rem", cursor: slide === 0 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: slide === 0 ? 0.35 : 1,
              }}
            >
              ← Previous
            </button>

            {/* Dot navigation */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(i); }}
                  style={{
                    width: "8px", height: "8px", borderRadius: "50%", border: "none",
                    cursor: "pointer", padding: 0,
                    background: i === slide ? "var(--sage-dark)" : "var(--gray-border)",
                  }}
                />
              ))}
            </div>

            {slide < total - 1 ? (
              <button
                onClick={goNext}
                style={{
                  background: "var(--sage-dark)", color: "var(--white)", border: "none",
                  borderRadius: "0.5rem", padding: "0.6rem 1.25rem", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontWeight: 600,
                }}
              >
                Next →
              </button>
            ) : (
              <Link href="/dashboard/learn" style={{
                background: "var(--sage-dark)", color: "var(--white)", border: "none",
                borderRadius: "0.5rem", padding: "0.6rem 1.25rem",
                fontFamily: "var(--font-body)", fontWeight: 600, textDecoration: "none",
              }}>
                Done ✓
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
