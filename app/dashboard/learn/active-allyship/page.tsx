"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

type QuizAnswers = Record<number, string>;

function SlideShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
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

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Active Allyship: Moving from Intention to Impact" subtitle="From good intentions to real change" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Most people want to be good allies. But wanting to support others and actually doing it are two different things. This lesson is about closing that gap.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand what allyship really means, how to practise it in everyday workplace situations, and how to stay committed even when it feels uncomfortable.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Define allyship and explain how it differs from passive sympathy",
        "Identify at least four practical ways to act as an ally at work",
        "Describe how to respond constructively when you get it wrong",
        "Recognise allyship as a continuous practice rather than a fixed identity",
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
      <SlideHeading title="What Allyship Actually Means" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/active-allyship/slide2-colleagues-listening.jpg" alt="Two colleagues in a thoughtful conversation, one listening attentively to the other" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Allyship is an active, ongoing commitment to support and advocate for people from marginalised groups. It is not a badge you earn or a label you give yourself. It is something you demonstrate through your behaviour, day after day.
      </BodyText>

      <BodyText>
        The word "ally" is often treated as an identity: "I am an ally." But the people best placed to judge whether someone is an ally are those they are trying to support. Allyship is not self-declared; it is earned.
      </BodyText>

      <SectionLabel text="What allyship is not:" />
      <BulletList items={[
        "It is not speaking on behalf of others or drowning out their voices with your own",
        "It is not performing support publicly while doing nothing privately",
        "It is not treating one training session as enough",
        "It is not expecting praise or gratitude for doing what is simply the right thing",
      ]} />

      <KeyReminder text="Allyship is a verb, not a noun. You do not become an ally; you practise allyship." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Educate Yourself; Listen to Understand" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/active-allyship/slide3-reading-learning.jpg" alt="A person reading thoughtfully, representing self-directed learning" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Take responsibility for your own learning:" />
      <BodyText>
        Read books, articles, and research written by people from marginalised communities. Listen to podcasts and follow social media accounts that offer perspectives different from your own. Do not put the burden of educating you on the people you want to support. They are not obligated to explain their experiences to you.
      </BodyText>

      <SectionLabel text="Listen to understand; not to respond:" />
      <BodyText>
        When someone shares their experience of exclusion or discrimination, resist the urge to interrupt, explain, or offer solutions. Your role in that moment is not to fix or justify; it is to understand. Ask questions only to deepen your understanding, not to challenge or qualify what they are sharing.
      </BodyText>

      <BulletList items={[
        "Put your phone away and give them your full attention",
        "Resist the urge to say things like 'I know how you feel' or 'That happened to me too'",
        "If you do not understand, say so clearly: 'Thank you for sharing this. I want to understand better. Can you tell me more?'",
        "After the conversation, reflect on what you heard rather than immediately moving on",
      ]} />

      <KeyReminder text="You will not always agree with what you hear. But before you can be a useful ally, you have to truly understand the experiences you are responding to." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Use Inclusive Language; Speak Up and Step Up" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/active-allyship/slide4-speaking-up.jpg" alt="A person speaking up in a team meeting, others listening" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Language matters:" />
      <BodyText>
        The words we use shape the culture we create. Use people-first language unless someone has told you their preference. Use correct names and pronouns. Avoid gendered defaults, slurs, stereotypes, and terms rooted in racism, ableism, or other forms of discrimination, even if they have become colloquial.
      </BodyText>

      <SectionLabel text="Speak up when it matters:" />
      <BodyText>
        When you witness exclusion, bias, or discrimination, silence is not neutral. It signals that the behaviour is acceptable. Speaking up does not need to be confrontational. It can be calm, direct, and brief.
      </BodyText>

      <BulletList items={[
        "In the moment: 'I do not think that was meant the way it came across, but I want to flag it.'",
        "After the fact: 'I wanted to come back to what was said earlier. I was not comfortable with it and I wanted to say so.'",
        "Privately with the person affected: 'I saw what happened. I want you to know I did not think that was okay.'",
        "With a manager or HR if the behaviour continues or is serious",
      ]} />

      <KeyReminder text="You do not have to be perfect to speak up. You just have to be willing." />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Share Power; Amplify Voices" />

      <BodyText>
        One of the most powerful things an ally can do is use their own privilege and platform to open doors for others. This is not charity; it is equity in action.
      </BodyText>

      <SectionLabel text="Sharing power looks like this:" />
      <BulletList items={[
        "Recommending a colleague from an underrepresented group for a high-profile project, speaking opportunity, or promotion",
        "Inviting a colleague to a senior meeting they would not normally attend",
        "Crediting people for their ideas and contributions when others might overlook or absorb them",
        "Stepping back in conversations to create space for others to speak, rather than always taking the floor yourself",
      ]} />

      <SectionLabel text="Amplifying voices looks like this:" />
      <BulletList items={[
        "When a colleague from a marginalised group raises an idea in a meeting and it is overlooked, say: 'I thought what [name] said earlier was really important. Can we go back to that?'",
        "When someone's contribution is credited to someone else, name it clearly: 'I think that was actually [name]'s idea. [Name], do you want to speak to it?'",
        "When you share someone's work externally, attribute it clearly and fully",
      ]} />

      <KeyReminder text="Amplifying is not about taking over. It is about making sure the right voice is heard, clearly and correctly attributed." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Micro-affirmations and Supporting Accessibility" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/active-allyship/slide6-inclusive-workspace.jpg" alt="A welcoming, inclusive workspace with people collaborating in an accessible environment" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Micro-affirmations:" />
      <BodyText>
        Micro-affirmations are small, everyday acts of inclusion that signal to someone: you belong here, your work is valued, you are seen. They are the opposite of micro-aggressions, and they matter just as much.
      </BodyText>

      <BulletList items={[
        "Greeting a colleague warmly and using their name",
        "Acknowledging their expertise publicly: 'I know [name] has real insight on this'",
        "Checking in genuinely after a difficult meeting or event",
        "Making space for someone in a conversation where they might otherwise be talked over",
        "Noticing and naming good work: 'The report you wrote was really clear and well argued'",
      ]} />

      <SectionLabel text="Supporting accessibility:" />
      <BodyText>
        Allies think about whether meetings, events, and workspaces are accessible to everyone. They do not wait to be asked; they build accessibility in from the start and remain open to feedback when they have missed something.
      </BodyText>

      <BulletList items={[
        "Ask; do not assume: 'Is there anything I should know about the format of this meeting to make it work for everyone?'",
        "Consider physical accessibility, sensory needs, and cognitive load when planning events",
        "Share agendas and materials in advance so people can prepare",
        "Offer captions, note-takers, or recordings where possible",
      ]} />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Reflect, Be Accountable, and Create Safe Spaces" />

      <SectionLabel text="Reflect and be accountable:" />
      <BodyText>
        You will get things wrong. Every ally does. The question is not whether you will make mistakes; it is how you respond when you do.
      </BodyText>

      <BulletList items={[
        "When someone tells you something you said or did caused harm, resist the urge to defend yourself immediately",
        "A brief, genuine apology followed by a change in behaviour is far more meaningful than a lengthy defence of your intentions",
        "Do not make the other person manage your guilt or reassure you that you are still a good person",
        "Reflect privately on what happened and what you will do differently",
        "Return to the person if appropriate to acknowledge it again once you have had time to process",
      ]} />

      <SectionLabel text="Create safe spaces for others:" />
      <BodyText>
        Allies model the psychological safety they want others to experience. They shut down gossip, challenge put-downs, and make it normal to raise concerns.
      </BodyText>

      <BulletList items={[
        "Address exclusionary behaviour in team meetings and one-to-one conversations, not just in formal processes",
        "Respond calmly and without defensiveness when concerns are raised about culture or behaviour",
        "Check in with colleagues who seem to be struggling or being left out",
        "Be consistent: do not challenge behaviour only when it is directed at groups you personally identify with",
      ]} />

      <KeyReminder text="Safe spaces are not spaces where nothing difficult is said. They are spaces where people trust that what they say will be heard and taken seriously." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Commit to Continuous Action" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
          📋 A common pattern:
        </p>
        <BodyText>
          An organisation runs a diversity training session. People leave feeling motivated and committed to change. Six weeks later, things look much the same. This pattern is not inevitable; but it is common, and it happens because allyship was treated as an event rather than a practice.
        </BodyText>
      </div>

      <BodyText>
        Allyship is not a one-off training event or a statement you post on social media. It is a lifelong practice of attention, learning, and action. It requires ongoing effort, especially when the stakes feel low or the issue does not affect you directly.
      </BodyText>

      <SectionLabel text="What continuous commitment looks like in practice:" />
      <BulletList items={[
        "Scheduling time each month to read or listen to something that challenges your existing perspective",
        "Regularly checking in with colleagues from marginalised groups (not to ask them to educate you, but to genuinely ask how they are experiencing the workplace)",
        "Tracking your own behaviour over time: are you actually speaking up? Recommending people? Crediting contributions?",
        "Holding yourself accountable by sharing your commitments with a trusted colleague or mentor",
        "Revisiting this lesson and others in your learning record to refresh your thinking",
      ]} />

      <KeyReminder text="The discomfort of consistent allyship is far smaller than the harm of consistent inaction." />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Take a few minutes to think honestly about where you are in your allyship practice.
      </BodyText>

      <ReflectionBox
        prompt="Think about the last month at work."
        subPrompts={[
          "When did you have an opportunity to speak up or act as an ally? Did you take it? If not, what held you back?",
          "Whose voice have you amplified recently? Whose contributions have you made sure were seen and credited?",
          "What is one specific thing you can commit to doing differently in the next two weeks?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="What the Evidence Says" />

      <BodyText>
        Allyship is not just a moral argument; it is backed by a growing body of research on inclusion, belonging, and organisational performance.
      </BodyText>

      <SectionLabel text="Key findings from research and practice:" />
      <BulletList items={[
        "Employees who feel they have allies at work report significantly higher levels of psychological safety, engagement, and intention to stay",
        "Research by Catalyst (2019) found that 45% of employees regularly experience exclusion at work, and that inclusive leaders make a direct difference to that experience",
        "McKinsey's 'Diversity Wins' report (2020) found that companies in the top quartile for gender diversity are 25% more likely to achieve above-average profitability",
        "Studies consistently show that bystander intervention; speaking up when you witness bias or exclusion; is one of the most effective tools for changing workplace culture",
        "Allyship that is informal, everyday, and peer-led is often more effective than formal top-down diversity programmes alone",
      ]} />

      <SectionLabel text="Relevant frameworks:" />
      <BulletList items={[
        "Catalyst: Inclusive Leadership research and practitioner resources on allyship",
        "CIPD: Evidence-based guidance on inclusion, psychological safety, and leadership behaviour",
        "Project Include: Research and resources on building cultures of inclusion in teams and organisations",
      ]} />

      <KeyReminder text="The evidence is clear. Allyship is not a soft extra. It is a fundamental driver of the psychological safety and belonging that high-performing, inclusive teams are built on." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <BodyText>
        Before you move to the quiz, here is a summary of the key points from this lesson.
      </BodyText>

      <SectionLabel text="What you have learned:" />
      <BulletList items={[
        "Allyship is an ongoing, active practice; not a label, not a badge, and not a one-time act",
        "It requires self-education, listening to understand, and speaking up even when it is uncomfortable",
        "Sharing power and amplifying voices are two of the most tangible things an ally can do",
        "Micro-affirmations and everyday acts of inclusion matter as much as big gestures",
        "When you get it wrong, the right response is to apologise, reflect, and do better; not to defend yourself",
        "Commitment to allyship is continuous; it must be maintained over time, not just in moments of visibility",
      ]} />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.5rem 0 0 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          Up next:
        </p>
        <BodyText>
          A short four-question quiz to check your understanding. Answer all four questions and submit to mark this lesson as complete and save it to your learning record.
        </BodyText>
      </div>
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Allyship is best described as...",
      options: [
        { id: "a", text: "A badge or identity that you earn through attending diversity training" },
        { id: "b", text: "An ongoing, active practice of advocacy and support for people from marginalised groups" },
        { id: "c", text: "Speaking on behalf of marginalised people so they do not have to" },
        { id: "d", text: "Agreeing with everything people from marginalised groups say" },
      ],
      correct: "b",
      explanation: "Allyship is a verb, not a noun. It is demonstrated through consistent behaviour over time, not claimed through a single training session or public statement. The people best placed to judge whether someone is an ally are those they are trying to support.",
    },
    {
      q: "When someone shares a difficult experience of exclusion, the most helpful response is...",
      options: [
        { id: "a", text: "Quickly reassure them that it was probably unintentional" },
        { id: "b", text: "Share a similar experience you have had to show empathy" },
        { id: "c", text: "Listen without interrupting or defending, and seek to understand" },
        { id: "d", text: "Offer practical solutions to prevent it happening again" },
      ],
      correct: "c",
      explanation: "When someone shares an experience of exclusion, the first thing they need is to be heard and believed. Quickly reassuring them, sharing your own experience, or jumping to solutions can all minimise what they are sharing. Listening to understand is the foundation of effective allyship.",
    },
    {
      q: "Which of the following is an example of amplifying a colleague's voice?",
      options: [
        { id: "a", text: "Agreeing with their idea privately after the meeting" },
        { id: "b", text: "Forwarding their email to your manager without asking" },
        { id: "c", text: "Repeating their idea in a meeting and crediting it to them by name" },
        { id: "d", text: "Writing a glowing performance review for them at year end" },
      ],
      correct: "c",
      explanation: "Amplifying means making sure someone's contribution is heard and properly attributed in the moment. Repeating an idea and crediting it clearly is one of the simplest and most effective forms of allyship in a meeting setting.",
    },
    {
      q: "When you make a mistake as an ally, the right response is...",
      options: [
        { id: "a", text: "Defend your intentions at length so people know you meant well" },
        { id: "b", text: "Avoid the person until things feel normal again" },
        { id: "c", text: "Make a big public apology to show others you are committed to inclusion" },
        { id: "d", text: "Apologise, learn from it, and commit to doing better without making the other person manage your guilt" },
      ],
      correct: "d",
      explanation: "A genuine apology followed by changed behaviour is what matters. Lengthy defences of your intentions, avoiding the person, or making the moment about your own feelings all shift the burden back to the person who was affected. Accountability means owning the impact, not just the intention.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("active-allyship");
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
        "Allyship is an active, continuous practice; not a badge, a label, or a one-time commitment",
        "Educate yourself; do not rely on marginalised colleagues to teach you",
        "Listen to understand rather than to respond or fix",
        "Use your platform, power, and influence to open doors and amplify voices",
        "When you make a mistake, own it, apologise genuinely, and do better; without making it about yourself",
        "Consistent, everyday allyship; in meetings, in decisions, in language; matters more than grand gestures",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "What Allyship Actually Means",
  "Educate Yourself; Listen to Understand",
  "Use Inclusive Language; Speak Up and Step Up",
  "Share Power; Amplify Voices",
  "Micro-affirmations and Supporting Accessibility",
  "Reflect, Be Accountable, and Create Safe Spaces",
  "Commit to Continuous Action",
  "Time to Reflect",
  "What the Evidence Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function ActiveAllyshipPage() {
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
            <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--sage-dark)", borderRadius: "99px", transition: "width 0.3s" }} />
            </div>
          </div>
        </div>

        {/* Slide area */}
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
            <div style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "1.25rem", padding: "2.5rem 2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
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
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem",
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
