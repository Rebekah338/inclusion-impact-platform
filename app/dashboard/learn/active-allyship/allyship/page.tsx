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
      <SlideHeading title="Active Allyship in the Workplace" subtitle="Moving from Awareness to Action" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Allyship is not a label you give yourself. It is something you practise, repeatedly, in the moments that matter; particularly the ones where it would be easier to say nothing.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand what active allyship means in practice, why passive awareness is not enough, and how to respond effectively when you witness exclusion, bias, or harm in the workplace.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Explain what active allyship means and how it differs from passive support or performative gestures",
        "Identify common situations in the workplace that call for an ally to respond",
        "Apply practical techniques for speaking up, intervening, and supporting colleagues from marginalised groups",
        "Reflect on your own allyship practice and identify where you can be more consistent",
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
        <img src="/images/allyship/slide2-solidarity.jpg" alt="Two colleagues standing together in a shared moment of support and understanding" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Allyship means using your position, privilege, or influence to support and advocate for people from groups that face marginalisation or discrimination. It is not a fixed identity or a badge to be earned: it is a practice, a series of choices made over time.
      </BodyText>

      <BodyText>
        The word &ldquo;ally&rdquo; is sometimes used loosely to mean anyone who broadly agrees with the idea of equality. But agreeing in principle is not the same as acting in practice. Active allyship requires visibility; it happens in meetings, in corridors, in conversations, in decisions, and in moments of discomfort.
      </BodyText>

      <SectionLabel text="The difference between passive and active allyship:" />
      <BulletList items={[
        "Passive allyship: privately agreeing that discrimination is wrong; attending a diversity event; using inclusive language when it feels comfortable",
        "Active allyship: speaking up when you witness exclusion, even when it is awkward; amplifying marginalised voices in rooms where they are not heard; using your access to advocate for systemic change",
      ]} />

      <KeyReminder text="The impact of allyship is felt not in how you describe yourself but in what you do when no one is watching; and what you do when everyone is." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Why Allies Matter" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/allyship/slide3-group-meeting.jpg" alt="A diverse team in a workplace meeting, with one person clearly being listened to and supported" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        People from marginalised groups in the workplace often carry a significant emotional and cognitive load: managing their own work, navigating bias and exclusion, and deciding whether to speak up when something happens. Speaking up alone carries real risk. Allies share that load and reduce that risk.
      </BodyText>

      <BodyText>
        Research consistently shows that people from underrepresented groups are more likely to be interrupted, talked over, have their ideas attributed to someone else, or be excluded from informal networks where decisions are made. In many cases, having a visible ally in the room changes the dynamic immediately.
      </BodyText>

      <SectionLabel text="Why allyship from people with privilege matters:" />
      <BulletList items={[
        "People with social or organisational power are often listened to differently; their intervention carries weight",
        "Allies signal to others that the behaviour is not acceptable, reducing the social permission for it to continue",
        "Visible allyship tells marginalised colleagues that they are not alone and that others see what is happening",
        "Consistent allyship over time shifts team culture; one person&rsquo;s behaviour can shift group norms",
      ]} />

      <KeyReminder text="You do not need to be a senior leader or a diversity professional to be an effective ally. You need to be present, paying attention, and willing to act." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Common Situations That Call for an Ally" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/allyship/slide4-workplace-moment.jpg" alt="A workplace moment where one person appears overlooked while another looks on" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Allyship is not only needed in extreme situations. Many of the moments that matter most are subtle, everyday occurrences that are easy to miss or to rationalise away. Learning to recognise them is the first step.
      </BodyText>

      <SectionLabel text="Situations where allies are needed:" />
      <BulletList items={[
        "A colleague&rsquo;s idea is ignored in a meeting and then repeated and credited to someone else",
        "A microaggression is made: a comment that is dismissive of someone&rsquo;s identity, experience, or background",
        "Someone is interrupted or talked over, repeatedly and disproportionately",
        "A colleague is excluded from social events or informal networks that influence career opportunities",
        "Assumptions are made about someone&rsquo;s role, capability, or seniority based on their identity",
        "Someone faces pushback for raising a concern about discrimination or harassment",
        "A joke, comment, or image is shared that is demeaning to a particular group",
      ]} />

      <KeyReminder text="If you notice something and think &ldquo;should I say something?&rdquo;, that question itself is often the signal that something should be said." />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="How to Respond: Speaking Up in the Moment" />

      <BodyText>
        One of the most common barriers to allyship is not knowing what to say. Many people see something and want to act, but freeze because they are unsure of the right words or worry about making things worse. Here are practical techniques that work.
      </BodyText>

      <SectionLabel text="Techniques for in-the-moment responses:" />
      <BulletList items={[
        "Name what happened clearly and calmly: &ldquo;I want to go back to what was just said&rdquo; or &ldquo;I noticed Priya&rsquo;s point wasn&rsquo;t picked up; I think it is worth revisiting.&rdquo;",
        "Ask a question that invites reflection without escalating: &ldquo;What did you mean by that?&rdquo; or &ldquo;Can you say more about why you put it that way?&rdquo;",
        "Create a pause that disrupts the moment without confrontation: &ldquo;Let&rsquo;s hold on a second&rdquo; or &ldquo;Before we move on, I want to make sure we heard from everyone.&rdquo;",
        "Amplify and attribute: actively repeat and credit a marginalised colleague&rsquo;s contribution; &ldquo;Building on what Marcus said earlier...&rdquo;",
        "Use &lsquo;I&rsquo; statements to describe impact without attacking intent: &ldquo;I found that comment uncomfortable&rdquo; keeps the focus on the effect rather than the motive.",
      ]} />

      <SectionLabel text="When you miss the moment:" />
      <BodyText>
        You will not always respond in real time; and that is normal. Following up afterwards still matters. A private word with the affected colleague, or a later conversation with the person whose behaviour concerned you, can still be impactful and is often easier to do well.
      </BodyText>

      <KeyReminder text="Imperfect action is almost always better than perfect inaction. The goal is not a flawless intervention; it is showing up." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Supporting Colleagues After an Incident" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/allyship/slide6-one-to-one.jpg" alt="Two colleagues in a quiet one-to-one conversation, one listening attentively" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        When a colleague has experienced discrimination, a microaggression, or exclusion, your response after the fact matters as much as what you do in the moment. How you show up for someone privately can be the difference between them feeling isolated and feeling supported.
      </BodyText>

      <SectionLabel text="How to support a colleague after an incident:" />
      <BulletList items={[
        "Check in without assumption: &ldquo;I noticed what happened earlier and wanted to see how you are doing. You don&rsquo;t have to talk about it if you&rsquo;d rather not.&rdquo;",
        "Listen more than you speak. Resist the urge to reassure, explain the other person&rsquo;s intent, or minimise the experience.",
        "Validate without projecting: &ldquo;That sounds really frustrating&rdquo; rather than &ldquo;I would have been furious.&rdquo;",
        "Ask what they need from you: &ldquo;Is there anything I can do to help, whether now or if it happens again?&rdquo;",
        "Respect their agency. Do not escalate, report, or confront on their behalf without their knowledge and agreement.",
        "Follow up. A brief check-in the next day shows that your support was genuine and not just a reaction.",
      ]} />

      <KeyReminder text="Your job as an ally is not to fix the situation or decide how they should feel about it. It is to be present, to listen, and to follow their lead." />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Allyship and Accountability" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/allyship/slide7-accountability.jpg" alt="A person pausing thoughtfully in a workplace setting, reflecting on their own behaviour" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Active allyship also requires accountability: the willingness to examine your own behaviour honestly, to acknowledge when you have caused harm, and to change course without becoming defensive. No one practises perfect allyship. The question is how you respond when you fall short.
      </BodyText>

      <SectionLabel text="What accountability looks like in practice:" />
      <BulletList items={[
        "When someone tells you that something you said or did caused harm, listen without defending or explaining away your intent",
        "Acknowledge the impact: &ldquo;Thank you for telling me. I can see why that landed that way and I&rsquo;m sorry.&rdquo;",
        "Do not make the other person responsible for managing your emotional response to the feedback",
        "Commit to doing differently; not just once but as a pattern",
        "Seek out your own learning rather than waiting to be educated by the people most affected",
      ]} />

      <BodyText>
        Being called in or called out is an opportunity, not an attack. The way you handle it sends a signal to everyone watching about whether your stated commitment to inclusion is real.
      </BodyText>

      <KeyReminder text="Your intent does not determine the impact. Both things can be true: you did not mean to cause harm, and you did. Accepting both is what accountability looks like." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Performative vs Meaningful Allyship" />

      <BodyText>
        Not all allyship has equal impact. There is a meaningful difference between gestures that signal support and actions that create change. Understanding this distinction helps you direct your effort where it will matter most.
      </BodyText>

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
          📋 Consider the difference:
        </p>
        <BodyText>
          A manager shares a post on LinkedIn for Pride Month but does not challenge the homophobic comment made by a team member in a meeting that same week. A team lead announces they support neurodiversity but never adjusts their communication style, meeting formats, or deadlines when a team member asks for reasonable adjustments.
        </BodyText>
      </div>

      <SectionLabel text="Signals of performative allyship:" />
      <BulletList items={[
        "Support is expressed publicly but not backed by private or organisational action",
        "Gestures happen during visible awareness events but not in ordinary daily interactions",
        "The focus is on how the ally is perceived rather than on the needs of the people being supported",
        "Speaking up is contingent on whether it feels safe or comfortable to do so",
      ]} />

      <SectionLabel text="Markers of meaningful allyship:" />
      <BulletList items={[
        "Consistent behaviour across contexts; not just when it is visible or rewarded",
        "Willingness to accept discomfort; including the discomfort of challenging peers, managers, or team culture",
        "Centering the needs and agency of marginalised colleagues; not the ally&rsquo;s own sense of virtue",
        "Using systemic levers: recruitment decisions, promotion processes, resource allocation, policy input",
      ]} />

      <KeyReminder text="Performative allyship can actively harm people by creating the appearance of inclusion without the substance of it. Meaningful allyship requires skin in the game." />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Take a few minutes to think honestly about your own allyship practice. There are no right or wrong answers here; the value is in sitting with the questions.
      </BodyText>

      <ReflectionBox
        prompt="Think about the last few weeks at work."
        subPrompts={[
          "Can you think of a moment when you witnessed something that made you uncomfortable but you did not speak up? What held you back?",
          "Is there a colleague from a marginalised group whose contributions you could do more to amplify or support?",
          "What is one specific thing you could do differently this week to be a more active ally?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Allyship Across Different Identities" />

      <BodyText>
        Allyship is not a single, uniform practice. What it looks like; and what is needed; varies depending on the specific context, the identities involved, and the kind of harm or exclusion that is occurring. Effective allies pay attention to this variation rather than applying a one-size-fits-all approach.
      </BodyText>

      <SectionLabel text="Considerations across different dimensions of identity:" />
      <BulletList items={[
        "Race and ethnicity: be aware of the specific dynamics of racism in your organisation; do not conflate different groups or treat &ldquo;diversity&rdquo; as a single monolithic issue",
        "Gender: allyship for women, non-binary people, and trans colleagues may look different; listen to what people from each group say they need rather than assuming",
        "Disability and neurodiversity: allyship here often involves advocating for structural adjustments; reasonable accommodations, accessible formats, and flexible working arrangements",
        "LGBTQ+: visible solidarity matters, but so does challenging everyday homophobia and transphobia, which are often subtle and easy to overlook",
        "Socioeconomic background: this is an underacknowledged dimension; be aware of assumptions built into workplace culture about what is &ldquo;professional&rdquo; or &ldquo;normal&rdquo;",
      ]} />

      <BodyText>
        Intersectionality also matters. A Black woman, a disabled LGBTQ+ person, or a working-class person of colour may face compounding and overlapping forms of discrimination that are not captured by thinking about one identity at a time.
      </BodyText>

      <KeyReminder text="The most effective allies listen across contexts, learn from the people most affected, and adapt their approach accordingly; rather than assuming they already know what is needed." />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="What the Evidence Says" />

      <BodyText>
        Allyship is not just an ethical commitment; it has measurable impact on the experience and outcomes of people from marginalised groups. Here is a summary of what the evidence tells us.
      </BodyText>

      <SectionLabel text="Key findings from research and practice:" />
      <BulletList items={[
        "McKinsey research on inclusion consistently finds that employees who feel supported by allies report higher engagement, lower intention to leave, and greater psychological safety at work",
        "Studies on bystander intervention show that third-party witnesses who intervene in discriminatory incidents significantly reduce the negative psychological impact on targets",
        "Research on amplification; the practice of repeating and attributing marginalised colleagues&rsquo; contributions; shows it directly increases the visibility and influence of those colleagues in group settings",
        "CIPD data on workplace inclusion show that line managers are the single biggest influence on whether an employee experiences their workplace as inclusive or not; making manager-level allyship particularly impactful",
      ]} />

      <SectionLabel text="Relevant frameworks and guidance:" />
      <BulletList items={[
        "CIPD Inclusion at Work report: practical guidance on the conditions that support inclusion, including allyship behaviours from managers",
        "Equality Act 2010: the legal framework within which allyship behaviours operate, including protections against harassment and victimisation",
        "organisational frameworks such as the National Equality Standard (NES) provide benchmarks for inclusive leadership and culture that allyship supports",
      ]} />

      <KeyReminder text="Allyship is both the right thing to do and an evidence-based driver of inclusion, retention, and psychological safety in the workplace." />
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
        "Allyship is a practice, not a label: it is defined by what you do, not what you believe or how you identify",
        "Active allyship requires speaking up in the moment, supporting colleagues after incidents, and using systemic levers to drive change",
        "Common situations that call for allyship include being talked over, having ideas misattributed, microaggressions, and exclusion from informal networks",
        "Meaningful allyship is consistent, context-sensitive, and centred on the needs of marginalised colleagues; not on the ally&rsquo;s own comfort or reputation",
        "Accountability is part of allyship: being willing to hear feedback, acknowledge impact, and change course without defensiveness",
        "Allyship has measurable impact on inclusion, retention, and psychological safety in the workplace",
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
      q: "Which of the following best describes active allyship?",
      options: [
        { id: "a", text: "Agreeing with the principles of equality and diversity" },
        { id: "b", text: "Attending diversity events and using inclusive language when it feels comfortable" },
        { id: "c", text: "Speaking up when you witness exclusion, amplifying marginalised voices, and using your access to advocate for change" },
        { id: "d", text: "Identifying as an ally and making this known to your team" },
      ],
      correct: "c",
      explanation: "Active allyship requires visible, consistent action in the moments that matter; not just private agreement or performative gestures. It means speaking up, amplifying others, and using whatever access or influence you have to create change.",
    },
    {
      q: "A colleague whose idea was ignored in a meeting comes to you afterwards. What is the most appropriate response as an ally?",
      options: [
        { id: "a", text: "Tell them they should raise it again themselves next time" },
        { id: "b", text: "Reassure them that the other person probably did not mean anything by it" },
        { id: "c", text: "Listen, validate their experience, ask what they need, and respect their agency about next steps" },
        { id: "d", text: "Report the incident to HR on their behalf immediately" },
      ],
      correct: "c",
      explanation: "Supporting a colleague after an incident means listening, validating, and following their lead. Minimising the experience, acting without their consent, or redirecting responsibility back to them are not forms of allyship.",
    },
    {
      q: "What distinguishes performative allyship from meaningful allyship?",
      options: [
        { id: "a", text: "Performative allies do not attend diversity events; meaningful allies do" },
        { id: "b", text: "Meaningful allyship is consistent, context-sensitive, and centres the needs of marginalised people; performative allyship is visible but does not back actions with substance" },
        { id: "c", text: "Performative allyship is practised by managers; meaningful allyship is practised by everyone" },
        { id: "d", text: "Meaningful allyship only applies to protected characteristics under the Equality Act" },
      ],
      correct: "b",
      explanation: "Performative allyship signals support publicly without the substance of private or systemic action. Meaningful allyship is consistent across contexts, accepts discomfort, and centres the people it aims to support rather than the ally's own reputation.",
    },
    {
      q: "A colleague tells you that something you said caused them harm. As an ally, what is the most appropriate response?",
      options: [
        { id: "a", text: "Explain your intention clearly so they understand you meant no harm" },
        { id: "b", text: "Thank them for telling you, acknowledge the impact, and commit to doing differently" },
        { id: "c", text: "Apologise briefly and move on so as not to make it a bigger issue" },
        { id: "d", text: "Ask them to discuss it with HR so it is handled formally" },
      ],
      correct: "b",
      explanation: "Accountability means accepting feedback without defending your intent, acknowledging the impact, and committing to change. Intent does not determine impact, and explaining your intention when someone raises a concern often makes them feel worse, not better.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("allyship");
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

function Slide14({ score }: { score: number }) {
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
        "Allyship is a practice defined by action, not by identity or intent",
        "The most impactful allyship happens in everyday moments; not just in formal settings or visibility events",
        "Supporting a colleague means listening and following their lead, not taking over or minimising their experience",
        "Meaningful allyship requires consistency, accountability, and a willingness to act even when it is uncomfortable",
        "The impact of allyship is measurable: it reduces harm, increases psychological safety, and improves outcomes for marginalised colleagues",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "What Allyship Actually Means",
  "Why Allies Matter",
  "Common Situations That Call for an Ally",
  "How to Respond: Speaking Up in the Moment",
  "Supporting Colleagues After an Incident",
  "Allyship and Accountability",
  "Performative vs Meaningful Allyship",
  "Time to Reflect",
  "Allyship Across Different Identities",
  "What the Evidence Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function AllyshipPage() {
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
    <Slide12 key={11} />,
    <Slide13Quiz key={12} onComplete={handleQuizComplete} />,
    <Slide14 key={13} score={quizScore} />,
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
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
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
