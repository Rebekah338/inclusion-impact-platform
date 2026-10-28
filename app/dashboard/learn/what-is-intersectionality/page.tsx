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

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="What Is Intersectionality? A Practical Introduction" subtitle="Understanding Overlapping Identities and Systems of Power" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          "Intersectionality is not just about overlapping identities. It is about the overlapping systems of power that shape those identities." — Professor Kimberlé Crenshaw
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand the theory and practice of intersectionality, and how to apply it in workplace contexts to build more equitable systems and cultures.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Explain what intersectionality means and where it comes from",
        "Understand how privilege and power interact with intersecting identities",
        "Recognise how intersectionality shows up in recruitment, progression, and wellbeing",
        "Apply an intersectional lens to workplace systems and practices",
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
      <SlideHeading title="The Origin of Intersectionality" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide2-origin.jpg" alt="A person speaking at a podium to a large audience at a law and equality conference" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        The term intersectionality was coined by Professor Kimberlé Crenshaw in 1989. It emerged from critical race theory and was originally applied to the experiences of Black women, whose experiences were not adequately captured by either gender equality frameworks or race equality frameworks alone.
      </BodyText>

      <BodyText>
        Race alone did not tell the full story. Gender alone did not tell the full story. The combination of the two created a distinct set of experiences that existing frameworks had no language for.
      </BodyText>

      <SectionLabel text="Crenshaw's intersection metaphor:" />
      <BodyText>
        Crenshaw used the metaphor of a road intersection. When a car is hit at an intersection, it can be hit from multiple directions. When harm occurs at the intersection of race and gender, it requires analysis from multiple directions too: not just one.
      </BodyText>

      <SectionLabel text="Since 1989:" />
      <BodyText>
        Intersectionality has been expanded to encompass a much wider range of overlapping identities: class, disability, sexual orientation, religion, age, immigration status, and more.
      </BodyText>

      <KeyReminder text="Intersectionality is a framework for understanding complexity. It does not simplify people: it prevents us from oversimplifying them." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Moving Beyond Single Identities" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide3-beyond-single-identity.jpg" alt="Two women with different backgrounds sitting side by side in a workplace, each with a distinct expression" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        When we look at only one aspect of a person's identity, we miss the full picture of their experience. Single-identity analysis leads to single-identity solutions that leave many people behind.
      </BodyText>

      <SectionLabel text="An example:" />
      <BodyText>
        Consider two women, both working class, both carers. One is Indian British and lesbian. The other is White British and heterosexual. They share class and gender: but their experiences in the workplace are likely to be very different. The intersecting identities of race, sexuality, and class each add layers of structural disadvantage or advantage that cannot be separated or ranked.
      </BodyText>

      <SectionLabel text="What this means in practice:" />
      <BulletList items={[
        "Identities do not operate independently: they interact to create unique experiences of privilege and disadvantage",
        "The workplace assumption that 'we treat everyone the same' ignores the reality that people do not arrive in the same position",
        "The same treatment can produce very different outcomes depending on who is receiving it",
      ]} />

      <KeyReminder text="Treating everyone the same is not the same as treating everyone equitably. Equity requires understanding people's different starting points." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Understanding Privilege" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide4-privilege.jpg" alt="A person walking through an open door while others wait, illustrating unequal access" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Privilege is unearned advantage: things you do not have to think about because the system already works for you.
      </BodyText>

      <SectionLabel text="Key points about privilege:" />
      <BulletList items={[
        "Privilege does not mean your life is easy: it means that certain aspects of who you are do not create additional barriers",
        "Privilege is linked to multiple characteristics: race, class, gender, disability, religion, accent, education, citizenship status",
        "Most people with privilege do not notice it: this is part of what makes it privilege; it is invisible to those who have it and visible to those who do not",
        "Privilege is not fixed: someone can be privileged in some areas and marginalised in others simultaneously",
      ]} />

      <SectionLabel text="Why it matters:" />
      <BodyText>
        Understanding your own privilege is not about guilt: it is about developing the awareness to see what others navigate that you do not. That awareness is the foundation for building fairer systems.
      </BodyText>

      <KeyReminder text="Privilege is not about individual character. It is about how systems are designed to work more smoothly for some people than others." />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Power: Who Sets the Rules" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide5-power.jpg" alt="A board room table with one dominant voice while others sit back and listen" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Power is about who gets to set the rules, whose voices are heard in decisions, and whose knowledge and experience is treated as the default.
      </BodyText>

      <SectionLabel text="How power operates in organisations:" />
      <BulletList items={[
        "Those with more institutional power shape the norms that everyone else must adapt to",
        "In most organisations, the default norm has historically centred the experience of people who are white, male, non-disabled, heterosexual, and from middle or upper-class backgrounds",
        "This does not mean those individuals are individually powerful or harmful: it means the systems they operate within were built around them",
      ]} />

      <SectionLabel text="What intersectionality asks us to do:" />
      <BodyText>
        Examine power not just at the individual level but at the structural level: who designed these systems; whose needs were centred; whose were not. Power is also relational: the same person can have more power in one context and less in another.
      </BodyText>

      <KeyReminder text="The question is not whether power exists in your organisation. It does. The question is whether you are examining it honestly." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Where Intersectionality Shows Up at Work" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide6-workplace.jpg" alt="A diverse group of employees in a modern open plan office, some engaged and some less so" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Intersectionality is not an abstract idea. It has concrete implications for everyday workplace systems and experiences.
      </BodyText>

      <SectionLabel text="Recruitment:" />
      <BodyText>
        Who is in the pool; whose CV reads as "a good fit"; which networks are used to find candidates; who sits on panels.
      </BodyText>

      <SectionLabel text="Flexible working:" />
      <BodyText>
        Who feels able to request it; whose request is treated with suspicion; who has caregiving or religious observance needs that standard hours do not accommodate.
      </BodyText>

      <SectionLabel text="Pay and progression:" />
      <BodyText>
        Who is being sponsored for promotion; whose "potential" is recognised; who is being penalised for assertiveness and whose assertiveness is rewarded.
      </BodyText>

      <SectionLabel text="Wellbeing initiatives:" />
      <BodyText>
        Are they designed around the majority; do they account for the additional mental load carried by people from marginalised groups; is there support for those navigating racism, ableism, or other structural harms.
      </BodyText>

      <KeyReminder text="If your wellbeing programme, flexible working policy, or progression framework was designed without asking who it might not work for, it was probably designed for the majority." />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Case Study: Daniel" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
          👤 About Daniel:
        </p>
        <BodyText small>
          White British; male; gay; working class; no university degree. Sales Team Leader. Confident in his role and consistently hitting targets.
        </BodyText>
      </div>

      <SectionLabel text="His experience:" />
      <BodyText>
        In social settings, Daniel feels as though he is performing a character. The informal culture of the team centres on a version of masculinity, class, and heterosexual socialising that he does not recognise as his own.
      </BodyText>

      <BodyText>
        He does not raise it because he is aware that his race and gender give him advantages others do not have, and he does not want to appear to be complaining about a culture he is seen as part of.
      </BodyText>

      <SectionLabel text="The intersectional lens:" />
      <BodyText>
        Daniel's experience illustrates how sexual orientation and class intersect with other identities to create a hidden experience that does not appear in demographic data. He would be counted as part of the majority in many respects, but experiences significant exclusion in others.
      </BodyText>

      <SectionLabel text="What this means for organisations:" />
      <BodyText>
        Demographic data alone will not reveal Daniel's experience. Creating genuine inclusion requires qualitative listening alongside quantitative data.
      </BodyText>

      <KeyReminder text="Visible demographics are only part of the picture. Invisible identities require active listening: not just data collection." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Case Study: Helen" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
          👤 About Helen:
        </p>
        <BodyText small>
          Asian British; woman; chronic illness (not visible); first-generation professional; primary carer for her elderly parent. Senior Project Manager.
        </BodyText>
      </div>

      <SectionLabel text="Her experience:" />
      <BodyText>
        Helen has been passed over for promotion twice. The feedback each time has centred on "visibility" and "executive presence": neither reviewer connected the dots between her intersecting circumstances and her visibility patterns.
      </BodyText>

      <BodyText>
        She has a chronic illness that affects her energy unpredictably; she cares for her parent on two evenings per week; she did not go to university and is the first in her family to work at this level. She is aware that she does not always fit the unspoken image of what leadership looks like.
      </BodyText>

      <SectionLabel text="The intersectional lens:" />
      <BodyText>
        The feedback Helen receives is framed as objective but is shaped by assumptions about what leadership looks like. Those assumptions are not neutral: they were built from a template that excludes people like Helen.
      </BodyText>

      <SectionLabel text="What this means for organisations:" />
      <BodyText>
        Feedback that uses terms like "executive presence" or "visibility" without examining what those terms mean and who they centre is not objective: it is structurally encoded bias.
      </BodyText>

      <KeyReminder text="When the same capable person is passed over repeatedly, the answer is rarely that they are not good enough. The answer is usually that the system was not designed for them." />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Now that you have explored how intersectionality shows up in workplace systems, take a few minutes to apply these ideas to your own context.
      </BodyText>

      <ReflectionBox
        prompt="Think about your own organisation and the systems it uses."
        subPrompts={[
          "Where might invisible identities be creating experiences that your data does not capture?",
          "Think of one policy or practice: whose needs does it centre; whose might it inadvertently exclude?",
          "What is one question you could ask in your next team conversation to open up a more intersectional perspective?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Applying an Intersectional Lens: Practical Strategies" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide10-strategies.jpg" alt="A team reviewing data and process diagrams together with post-it notes on a whiteboard" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Ask better questions:" />
      <BodyText>
        Look at data across multiple characteristics together. Do not just ask how women are progressing: ask how disabled women of colour are progressing; how working-class first-generation professionals are faring alongside their peers. Single-category data masks the real picture.
      </BodyText>

      <SectionLabel text="Listen differently:" />
      <BodyText>
        Create psychological safety that accounts for the fact that it is not equally experienced. Those with the most to lose from speaking up often have the most important perspective to share.
      </BodyText>

      <SectionLabel text="Review your systems:" />
      <BodyText>
        Examine recruitment, progression, and wellbeing processes with the question: whose experience was this designed around; what would it need to look like to work for everyone.
      </BodyText>

      <SectionLabel text="Then act:" />
      <BodyText>
        Knowing is not enough. Intersectional awareness that does not translate into changes to systems and practices is just a more sophisticated version of inaction.
      </BodyText>

      <KeyReminder text="An intersectional approach is not a separate strategy to be added on top. It is a lens applied to every strategy you already have." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Things to Remember" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/what-is-intersectionality/slide11-remember.jpg" alt="A person sitting quietly in reflection, looking thoughtfully out of a window" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BulletList items={[
        "Visible and invisible identities: not everything that shapes someone's experience is apparent to others; some identities are chosen to be disclosed; some cannot be hidden",
        "Transitional identities: identities change over time; a diagnosis, a bereavement, a new family structure can shift someone's experience significantly; inclusion must account for change",
        "The same workplace can feel very different depending on who you are: what feels like a welcoming team culture to one person can feel isolating to another; both experiences are real",
        "Be honest about your own lens: the way you experience the organisation is shaped by your own intersecting identities; other people's reality may look very different from your vantage point",
        "Stay curious: intersectionality is not a test you pass; it is a habit of mind you develop over time",
        "Adapt systems, policies, and procedures: individual awareness is necessary but not sufficient; structural change is where impact happens",
      ]} />

      <KeyReminder text="Intersectionality asks you to resist the urge to generalise. Every person is a complete, complex individual and deserves to be treated as such." />
    </SlideShell>
  );
}

function Slide12() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <BodyText>
        Before you move to the quiz, here is a summary of the key points from this lesson.
      </BodyText>

      <SectionLabel text="What you have learned:" />
      <BulletList items={[
        "Intersectionality was coined by Professor Kimberlé Crenshaw in 1989 to describe how overlapping identities create distinct experiences that single-identity frameworks cannot capture",
        "Privilege and power are structural: not just individual; they shape the systems everyone operates within",
        "Intersectionality shows up concretely in recruitment, progression, flexible working, and wellbeing practices",
        "Data alone is not enough: organisations must combine quantitative data with qualitative listening to surface invisible experiences",
        "Intersectionality is not a separate strategy: it is a lens applied across everything",
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

function Slide13Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Who coined the term intersectionality, and in what year?",
      options: [
        { id: "a", text: "Angela Davis, 1972" },
        { id: "b", text: "bell hooks, 1984" },
        { id: "c", text: "Professor Kimberlé Crenshaw, 1989" },
        { id: "d", text: "Patricia Hill Collins, 1990" },
      ],
      correct: "c",
      explanation: "Professor Kimberlé Crenshaw coined the term intersectionality in 1989 in her work analysing how race and gender combined to create experiences that neither framework alone could capture, particularly for Black women.",
    },
    {
      q: "Which of the following best describes privilege in the context of intersectionality?",
      options: [
        { id: "a", text: "Having a high income or senior job title" },
        { id: "b", text: "Unearned advantage that means certain aspects of who you are do not create additional barriers" },
        { id: "c", text: "Being free from any form of disadvantage" },
        { id: "d", text: "A trait that belongs only to people in majority demographic groups" },
      ],
      correct: "b",
      explanation: "Privilege refers to unearned advantages conferred by systems that were designed around particular characteristics. It does not mean a person's life is without difficulty: it means that specific aspects of identity do not create additional structural barriers.",
    },
    {
      q: "What does the case study of Helen illustrate about feedback terms like 'executive presence'?",
      options: [
        { id: "a", text: "These terms are helpful because they are objective and evidence-based" },
        { id: "b", text: "Helen needs more development before she is ready for promotion" },
        { id: "c", text: "Feedback that uses undefined subjective terms can encode structural bias and disadvantage people whose identities were not used to design the leadership template" },
        { id: "d", text: "Promotion decisions should be based entirely on metrics rather than subjective assessment" },
      ],
      correct: "c",
      explanation: "Terms like 'executive presence' and 'visibility' are not neutral: they reflect an image of leadership built from a particular demographic template. When they are applied without examination, they systematically disadvantage people whose identities were not used to construct that template.",
    },
    {
      q: "An intersectional approach to data means...",
      options: [
        { id: "a", text: "Collecting demographic data for each protected characteristic separately" },
        { id: "b", text: "Focusing on the experiences of the most marginalised group only" },
        { id: "c", text: "Analysing data across multiple characteristics together to surface experiences that single-category data would miss" },
        { id: "d", text: "Replacing quantitative data with qualitative listening" },
      ],
      correct: "c",
      explanation: "Intersectional data analysis means looking at how characteristics interact: for example, how the progression rate of disabled women of colour compares to other groups. Single-category analysis can mask disparities that only become visible when identities are considered together.",
    },
  ];

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("what-is-intersectionality");
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
            You scored {questions.filter((q, i) => answers[i] === q.correct).length} out of {questions.length}
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
            Your result has been saved to your learning record.
          </p>
        </div>
      )}
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "The Origin of Intersectionality",
  "Moving Beyond Single Identities",
  "Understanding Privilege",
  "Power: Who Sets the Rules",
  "Where It Shows Up at Work",
  "Case Study: Daniel",
  "Case Study: Helen",
  "Time to Reflect",
  "Applying an Intersectional Lens",
  "Things to Remember",
  "Lesson Roundup",
  "Quiz",
];

export default function WhatIsIntersectionalityPage() {
  const [slide, setSlide] = useState(0);
  const [ttsActive, setTtsActive] = React.useState(false);
  const [quizScore, setQuizScore] = useState(0);

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
    <Slide12 key={11} />,
    <Slide13Quiz key={12} onComplete={handleQuizComplete} />,
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
