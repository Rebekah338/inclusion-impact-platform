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
      <SlideHeading title="Communicating Inclusively: Language, Tone and Boundaries" subtitle="How the words we choose shape the spaces we create" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Language is not just a tool for conveying information. It is a signal. Every word choice tells people whether or not they belong here.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand how language and tone shape inclusion in practice, how to respond constructively when your communication causes harm, and how to handle situations where inclusive communication feels difficult or meets resistance.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Explain why inclusive communication matters beyond politeness",
        "Identify common language patterns that exclude or harm",
        "Respond constructively when told your language has caused harm",
        "Apply a framework for handling difficult communication boundaries",
        "Describe the conditions that build an inclusive communication culture across a team",
      ]} />

      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={[
        "Find a quiet space and allow around 15 minutes for this lesson",
        "Use headphones if you would like the content read aloud",
        "Keep a pen and paper nearby for the reflection prompts",
        "Complete the quiz at the end to mark this lesson as done and add it to your learning record.",
      ]} />
    </SlideShell>
  );
}

function Slide2() {
  return (
    <SlideShell>
      <SlideHeading title="Why Inclusive Communication Matters" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/communicating-inclusively/slide2-diverse-conversation.jpg" alt="A diverse group of colleagues engaged in thoughtful conversation around a table" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Inclusive communication is not simply about being polite or avoiding offence. It is about creating the psychological safety that allows people to contribute, raise concerns, ask questions, and be fully present at work. When communication is exclusionary, even unintentionally, it signals that some people are less valued than others.
      </BodyText>

      <SectionLabel text="The impact of exclusionary communication:" />
      <BulletList items={[
        "People from marginalised groups spend cognitive energy managing how they are perceived rather than doing their best work",
        "Mistakes go unreported because raising them feels unsafe",
        "Ideas from certain voices are heard less or credited less, even when the idea is the same",
        "Attrition rises among people who experience consistent exclusion, even when each individual incident seems minor",
        "Trust in leadership declines when communication models are inconsistent or dismissive",
      ]} />

      <KeyReminder text="The impact of your communication is not determined by your intent. It is determined by how it lands for the person receiving it. Both things matter; but intent does not cancel impact." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Language Choices: What They Signal" />

      <BodyText>
        Some of the most common forms of exclusionary language are so embedded in everyday speech that they pass unnoticed. That does not make them neutral. Understanding what they signal is the first step to changing them.
      </BodyText>

      <SectionLabel text="People-first and identity-first language:" />
      <BodyText>
        People-first language (a person with a disability) centres humanity before condition. Identity-first language (a disabled person) is often preferred within some communities as it affirms identity rather than distancing from it. The most respectful approach is to follow the preference of the individual or community you are speaking with.
      </BodyText>

      <SectionLabel text="Pronouns and gendered defaults:" />
      <BulletList items={[
        "Defaulting to 'he' for a professional role or 'she' for a caring role reflects assumptions about who belongs where",
        "Using gender-neutral language (they; the employee; your colleague) avoids those assumptions",
        "Asking about and using someone's stated pronouns is a basic act of respect, not a political position",
        "Getting it wrong occasionally and correcting yourself promptly is very different from refusing to try",
      ]} />

      <SectionLabel text="Loaded or exclusionary terms to be aware of:" />
      <BulletList items={[
        "Terms with racial or colonial history embedded in common metaphors (blacklisting, master copy, grandfathering)",
        "Colloquialisms that assume a shared cultural reference only some people have",
        "Ability-based metaphors that use disability as a shorthand for failure or confusion",
        "Gendered compliments that infantilise (girls in the office) or patronise (feisty; bossy; emotional)",
      ]} />

      <KeyReminder text="You do not need to know the history of every term before you can begin to change. What matters is a willingness to learn when it is pointed out." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Tone and Intent" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/communicating-inclusively/slide4-tone-meeting.jpg" alt="A team member speaking in a meeting with attentive, open colleagues listening" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Language and tone work together. You can use technically correct language in a tone that still excludes. Equally, warmth and genuine curiosity can sometimes bridge an imperfect word choice. Tone signals whether you see the person you are speaking with as fully human and equally valued.
      </BodyText>

      <SectionLabel text="Tone patterns that exclude:" />
      <BulletList items={[
        "Interrupting or speaking over certain voices while letting others finish",
        "Qualified praise that undermines: 'That is a great point; I am surprised you thought of that'",
        "Dismissive tone when someone raises a concern: 'You are being oversensitive' or 'That was not what I meant'",
        "Explaining something to someone in a condescending way based on an assumption about their knowledge",
        "Using humour that relies on group stereotypes, even when the intent is to bond",
      ]} />

      <SectionLabel text="Tone patterns that include:" />
      <BulletList items={[
        "Pausing to make space for quieter voices before moving on",
        "Naming and attributing ideas correctly: 'Building on what Priya said earlier...'",
        "Asking rather than assuming: 'How would you prefer I refer to this?'",
        "Receiving feedback about your tone with curiosity rather than defensiveness",
        "Modelling openness to being wrong in front of your team",
      ]} />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Micro-aggressions in Communication" />

      <BodyText>
        A micro-aggression is a brief, commonplace communication (verbal or non-verbal) that, whether intentional or not, signals a demeaning or negative message to someone from a marginalised group. The 'micro' refers to the individual incident, not the impact. Over time, accumulated micro-aggressions cause significant harm.
      </BodyText>

      <SectionLabel text="Common examples in workplace communication:" />
      <BulletList items={[
        "'Where are you really from?' (suggesting someone is not a genuine national of the country they named)",
        "Mispronouncing someone's name repeatedly without correcting yourself",
        "Addressing a mixed group of professionals as 'guys' or 'ladies and gentlemen' (excluding non-binary colleagues)",
        "Assuming a colleague from a particular background speaks on behalf of that entire group",
        "Crediting an idea to the wrong person after a marginalised colleague raised it first",
        "'You are so articulate' (implying it is surprising for someone of their background)",
        "Looking at a male colleague when responding to a question a female colleague asked",
      ]} />

      <KeyReminder text="The cumulative weight of micro-aggressions is significant. One comment might be easy to brush off. A hundred comments over a career creates a very different experience of work." />

      <SectionLabel text="What to do if you recognise you have used one:" />
      <BulletList items={[
        "Acknowledge it briefly and sincerely without over-explaining or centring your own discomfort",
        "Correct the behaviour going forward; do not promise to be perfect",
        "Do not ask the person harmed to reassure you that it is fine",
      ]} />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Receiving Feedback About Your Language" />

      <BodyText>
        Being told that something you said was harmful is one of the most important moments in your development as an inclusive communicator. How you respond in that moment shapes whether the person who told you will ever raise it again.
      </BodyText>

      <SectionLabel text="A framework for receiving feedback well:" />
      <BulletList items={[
        "Listen fully before you respond; do not interrupt or begin formulating your defence while the person is still speaking",
        "Thank the person for raising it; it often takes courage to do so",
        "Reflect briefly: 'I had not thought about it in that way before. That is helpful to know.'",
        "Avoid 'I did not mean it like that'; your intent does not change the impact",
        "Avoid 'I have never had a complaint before'; the absence of complaint is not evidence of absence of harm",
        "Make a visible, concrete change going forward; this is more meaningful than any apology",
        "Do not place the emotional labour of your learning entirely on the person who raised the concern",
      ]} />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          A useful phrase:
        </p>
        <BodyText italic>
          "Thank you for telling me. I am going to think about this and make sure I do it differently going forward."
        </BodyText>
        <BodyText small>
          Simple. Accountable. It does not demand reassurance from the person who raised the concern.
        </BodyText>
      </div>
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Setting Boundaries: A Framework for Difficult Moments" />

      <BodyText>
        Inclusive communication sometimes requires you to name something that is happening, set a clear boundary, or redirect a conversation that is causing harm. Below is a framework for navigating these moments.
      </BodyText>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem", margin: "1rem 0" }}>
        {/* GREEN */}
        <div style={{ background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: "0.75rem", padding: "1rem 1.25rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#2e7d32", fontSize: "0.95rem", margin: "0 0 0.5rem 0" }}>
            🟢 Green: clear and direct
          </p>
          <BodyText small>
            Use when the harm is clear and you have standing to name it. These responses are direct without being aggressive.
          </BodyText>
          <BulletList items={[
            '"I want to pause there; that comment could be harmful to some people in this team."',
            '"Can we use a different term? I find [term] more inclusive."',
            '"I noticed [name] was interrupted there; I would like to hear their point."',
          ]} />
        </div>

        {/* AMBER */}
        <div style={{ background: "#fff8e1", border: "1px solid #ff9800", borderRadius: "0.75rem", padding: "1rem 1.25rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#e65100", fontSize: "0.95rem", margin: "0 0 0.5rem 0" }}>
            🟡 Amber: use with care
          </p>
          <BodyText small>
            Use when you are less certain of the dynamic, want to invite reflection rather than correct directly, or the relationship needs careful handling.
          </BodyText>
          <BulletList items={[
            '"I am not sure I understood that quite right; can you say more about what you meant?"',
            '"That landed a bit differently for me; I wanted to flag it before we move on."',
            '"I find this topic needs a bit of care; can we think together about how to approach it?"',
          ]} />
        </div>

        {/* RED */}
        <div style={{ background: "#fdecea", border: "1px solid #f44336", borderRadius: "0.75rem", padding: "1rem 1.25rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#b71c1c", fontSize: "0.95rem", margin: "0 0 0.5rem 0" }}>
            🔴 Red: escalation
          </p>
          <BodyText small>
            Use when communication crosses into harassment, discrimination, or repeated harm that has not been addressed through direct conversation.
          </BodyText>
          <BulletList items={[
            "Document incidents with dates, exact words used, and any witnesses",
            "Report through your organisation's formal channels: HR, your manager, or a designated point of contact",
            "Seek support from a trusted colleague, union representative, or external body if internal channels have failed",
          ]} />
        </div>
      </div>
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Inclusive Written Communication" />

      <BodyText>
        Much of our communication at work now happens in writing: email, instant messaging, shared documents, and reports. Written communication lacks the tone cues of face-to-face conversation, which means exclusionary language can land harder and persist longer.
      </BodyText>

      <SectionLabel text="Principles for inclusive written communication:" />
      <BulletList items={[
        "Use gender-neutral language as default; 'they' as a singular pronoun is grammatically correct and widely accepted",
        "Avoid jargon and idioms that assume a shared cultural background; not everyone will understand them, and not everyone will feel comfortable asking",
        "Be direct and clear; convoluted or evasive language disadvantages those for whom English is an additional language",
        "Consider the accessibility of your format: use sufficient contrast, readable font sizes, and plain structure in documents shared widely",
        "When writing about groups of people, use the terms they use for themselves wherever possible",
        "Spell names correctly; check before you send",
        "Avoid performative inclusion: statements that frame your organisation as diverse without any evidence to support them",
      ]} />

      <SectionLabel text="In group messaging and channels:" />
      <BulletList items={[
        "Avoid sending messages that implicitly exclude certain people (social invitations through work channels during working hours to events that not everyone can attend)",
        "Read back your message before sending; ask yourself whether it could be read differently from how you intended",
        "If you realise you have sent something harmful, acknowledge it quickly and directly",
      ]} />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Take a few minutes to think honestly about your own communication habits and the communication culture in your organisation.
      </BodyText>

      <ReflectionBox
        prompt="Think about a recent interaction at work."
        subPrompts={[
          "Was there a moment where something you said (or did not say) may have landed differently from how you intended?",
          "Can you think of a phrase or pattern you use regularly that might benefit from review?",
          "What is one change you could make to your communication that would signal inclusion more clearly to others?",
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
        The relationship between language, belonging, and performance is well-documented. Here is what the evidence tells us.
      </BodyText>

      <SectionLabel text="Key findings:" />
      <BulletList items={[
        "Research by Google's Project Aristotle found that psychological safety; the sense that you can speak without fear of humiliation; is the strongest predictor of team performance. Language and tone are central to whether psychological safety exists.",
        "Studies on micro-aggressions in the workplace show that even low-level exclusionary communication has a measurable impact on mental health, job satisfaction, and intention to leave (Sue et al., 2007; Deloitte 2019)",
        "The Chartered Institute of Personnel and Development (CIPD) consistently finds that inclusive communication is one of the top factors employees cite when describing an inclusive workplace",
        "Research on gendered language in job adverts shows that masculine-coded language reduces applications from women and non-binary candidates, even when the role itself is not gendered",
        "Studies of pronoun use show that workplaces where employees can use their correct pronouns report significantly higher wellbeing scores among transgender and non-binary staff",
      ]} />

      <SectionLabel text="Relevant guidance:" />
      <BulletList items={[
        "Stonewall: guidance on LGBT-inclusive language in the workplace",
        "Scope: guidance on disability language and terminology",
        "Race Equality Matters: guidance on racially inclusive language",
        "CIPD: Inclusion and Diversity in the Workplace; a comprehensive evidence-based guide",
      ]} />

      <KeyReminder text="Inclusive communication is not about getting every word perfectly right every time. It is about a consistent commitment to learning, correcting, and doing better." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Building an Inclusive Communication Culture" />

      <BodyText>
        Individual behaviour matters; but a truly inclusive communication culture requires systemic conditions that make it the norm rather than the exception.
      </BodyText>

      <SectionLabel text="What leaders and managers can do:" />
      <BulletList items={[
        "Model inclusive language visibly and consistently; do not delegate this to HR or a diversity team",
        "Respond calmly and constructively when corrected; make it safe for your team to do the same",
        "Acknowledge your own mistakes openly; it normalises the learning process for everyone",
        "Call out exclusionary language and behaviour when you see it; silence signals acceptance",
        "Include communication norms explicitly in team agreements and induction processes",
      ]} />

      <SectionLabel text="What organisations can do:" />
      <BulletList items={[
        "Embed inclusive communication in leadership competency frameworks and appraisals",
        "Provide ongoing learning that goes beyond a one-off training event",
        "Create clear, trusted channels for raising language and communication concerns",
        "Review external communications (job adverts, client materials, website copy) regularly for inclusive language",
        "Celebrate and name examples of inclusive communication in practice, not just breaches of it",
      ]} />

      <KeyReminder text="Culture is built from the accumulated weight of small everyday choices. Inclusive communication becomes the norm when it is consistently modelled, gently corrected, and genuinely valued." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Inclusive communication is best described as...",
      options: [
        { id: "a", text: "Avoiding any language that anyone might find offensive" },
        { id: "b", text: "Choosing language and tone that acknowledges people's humanity and creates psychological safety" },
        { id: "c", text: "Using formal, professional language in all workplace communications" },
        { id: "d", text: "Checking every communication with HR before sending" },
      ],
      correct: "b",
      explanation: "Inclusive communication is not about the impossible goal of never causing offence. It is about consistently choosing language and tone that signals to people that they are valued and that it is safe to be present and contribute. Formality and HR sign-off are not the defining characteristics.",
    },
    {
      q: "When someone tells you that something you said was harmful, the most constructive response is...",
      options: [
        { id: "a", text: "Explain your intent clearly so they understand you did not mean to cause harm" },
        { id: "b", text: "Apologise and ask how you can make it up to them" },
        { id: "c", text: "Listen, thank them, reflect, and adjust your language going forward" },
        { id: "d", text: "Ask a third party whether they also found it harmful before responding" },
      ],
      correct: "c",
      explanation: "Explaining your intent (option A) centres your experience over theirs. Asking how to make it up to them (option B) can put emotional labour back onto the person who was harmed. Seeking a third-party verdict (option D) delays accountability. Listening, thanking, and adjusting is the most constructive and direct response.",
    },
    {
      q: "Which of the following is an example of a micro-aggression?",
      options: [
        { id: "a", text: "Asking a colleague to repeat themselves because the connection was bad on a video call" },
        { id: "b", text: "Using 'they' as a singular pronoun when referring to someone" },
        { id: "c", text: "Asking a colleague from an ethnic minority background where they are 'really' from" },
        { id: "d", text: "Using someone's preferred name even if you find it difficult to pronounce" },
      ],
      correct: "c",
      explanation: "Asking where someone is 'really' from implies that the country they named is not their true origin and that they do not truly belong. This is a classic example of a micro-aggression: a brief, commonplace communication that signals exclusion. Options A, B, and D are neutral or actively inclusive.",
    },
    {
      q: "Which of the following best supports an inclusive communication culture across a team?",
      options: [
        { id: "a", text: "A zero-tolerance policy for any language deemed offensive" },
        { id: "b", text: "A one-off team training session on inclusive language" },
        { id: "c", text: "Leaders who model inclusive language, respond calmly to being corrected, and acknowledge mistakes openly" },
        { id: "d", text: "An approved list of words that team members are permitted to use" },
      ],
      correct: "c",
      explanation: "Zero-tolerance policies and approved word lists create fear rather than learning. A single training session is insufficient on its own. What sustains an inclusive communication culture over time is visible leadership modelling: leaders who use inclusive language consistently, receive correction gracefully, and acknowledge their own errors in front of the team.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("communicating-inclusively");
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
        "Inclusive communication is not about perfection; it is about consistent commitment to learning and adjustment",
        "Intent does not cancel impact; both matter, but impact is what the other person experiences",
        "Micro-aggressions accumulate; what feels minor in isolation can be significant over time",
        "Receiving feedback about your language is an opportunity, not an attack",
        "A green/amber/red framework helps you navigate difficult communication moments with clarity",
        "Culture is built from the accumulated weight of small, everyday choices. Leaders set the tone.",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why Inclusive Communication Matters",
  "Language Choices: What They Signal",
  "Tone and Intent",
  "Micro-aggressions in Communication",
  "Receiving Feedback About Your Language",
  "Setting Boundaries: A Framework",
  "Inclusive Written Communication",
  "Time to Reflect",
  "What the Evidence Says",
  "Building an Inclusive Communication Culture",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function CommunicatingInclusivelyPage() {
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
