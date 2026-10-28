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
      <SlideHeading title="Sustaining Your Inclusion Practice: Managing EDI Fatigue" subtitle="Keeping the work going when it feels hard" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          EDI fatigue is not a sign of failure. It is a sign that people care enough about the work to feel it when it is not working. The challenge is to channel that feeling into better approaches, not abandonment.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand what EDI fatigue is, why it happens, and what practical steps you and your organisation can take to sustain an inclusive practice over the long term.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Recognise the signs of EDI fatigue in yourself and your organisation",
        "Identify the structural and cultural conditions that cause it",
        "Apply at least three practical strategies to sustain inclusion efforts over time",
        "Articulate the difference between performative EDI and embedded, sustainable inclusion",
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
      <SlideHeading title="What Is EDI Fatigue?" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/managing-edi-fatigue/slide2-tired-professional.jpg" alt="A professional looking thoughtfully tired at their desk, representing the emotional weight of sustained EDI work" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        EDI fatigue is the exhaustion, cynicism, and disengagement that can develop when people feel that inclusion efforts are performative, burdensome, or disconnected from real change. It affects people across the spectrum: those doing the most intensive diversity work, those who feel targeted by it, and those who simply feel overwhelmed by the pace of change.
      </BodyText>

      <SectionLabel text="Common signs of EDI fatigue:" />
      <BulletList items={[
        "Declining attendance at EDI events or training that was previously well-attended",
        "Cynicism about new initiatives: 'Another strategy. Another consultant. Nothing ever changes.'",
        "Resistance or backlash from staff who feel unfairly burdened or targeted",
        "Those from marginalised groups feeling exhausted by being asked to represent, advise, or educate others",
        "Leaders losing momentum or deprioritising EDI under commercial or operational pressure",
      ]} />

      <KeyReminder text="EDI fatigue is not a sign that inclusion is the wrong goal. It is usually a sign that the approach needs to change." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Recognise It; Then Rotate Responsibility" />

      <SectionLabel text="Step one: name the fatigue:" />
      <BodyText>
        Naming EDI fatigue openly, rather than pushing through it or pretending it does not exist, is the first and most important step. When organisations acknowledge that their current approach is not sustainable, they create space to do something different. Silence about fatigue tends to make it worse.
      </BodyText>

      <BulletList items={[
        "Survey staff regularly about how they experience EDI efforts in the organisation",
        "Create space in team meetings or listening sessions to discuss honestly what is and is not working",
        "Be willing to hear that your current approach is causing harm, not just missing the mark",
      ]} />

      <SectionLabel text="Step two: rotate responsibility:" />
      <BodyText>
        When EDI work always falls to the same people (often those from marginalised groups), it becomes an unpaid tax on their time and emotional labour. Distributing responsibility changes that. It signals that inclusion is everyone's work, not a specialism delegated to a few.
      </BodyText>

      <BulletList items={[
        "Ensure EDI responsibilities are recognised formally in workloads and appraisals",
        "Rotate who leads inclusion initiatives, facilitates conversations, and represents the organisation externally",
        "Resource EDI work properly: time, budget, and support, not just goodwill",
        "Avoid always defaulting to the same individuals simply because they are from the groups being discussed",
      ]} />

      <KeyReminder text="EDI work is not a side responsibility for a few willing volunteers. It is core work that requires proper recognition and fair distribution." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Celebrate Wins; Communicate Transparently" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/managing-edi-fatigue/slide4-team-celebrating.jpg" alt="A team celebrating a milestone together in a modern workspace" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Celebrate measurable progress:" />
      <BodyText>
        Progress can feel invisible when the focus is always on how far there is still to go. Making wins visible builds momentum, sustains motivation, and demonstrates that the work is having an impact.
      </BodyText>

      <BulletList items={[
        "Document and share specific, concrete achievements: a diverse hire, a policy change, an accessibility improvement",
        "Acknowledge individuals and teams who have contributed to inclusion goals in appraisals and team meetings",
        "Use data to show progress over time, even when the numbers are still imperfect",
        "Be specific: 'We increased representation of disabled employees in our leadership pipeline by 12% this year' is more sustaining than 'We are making progress'",
      ]} />

      <SectionLabel text="Communicate honestly and consistently:" />
      <BodyText>
        People disengage when they do not understand what the organisation is doing on EDI or why. Regular, honest communication about goals, progress, and challenges builds credibility and shared ownership.
      </BodyText>

      <BulletList items={[
        "Share progress updates at least quarterly, not just annually",
        "Be honest about what has not gone well and what you are changing as a result",
        "Make the business case visible: inclusion is a strategic priority, not just a values statement",
      ]} />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Address Backlash; Engage Stakeholders Meaningfully" />

      <SectionLabel text="Address backlash directly:" />
      <BodyText>
        Unaddressed resistance and backlash drain everyone's energy. When colleagues express frustration or scepticism about EDI, engaging with it honestly (rather than dismissing or punishing it) tends to be far more effective at sustaining cultural change.
      </BodyText>

      <BulletList items={[
        "Understand the concern before you respond: 'Can you tell me more about what is driving that for you?'",
        "Respond with evidence, not just values: share data, research, and case studies that demonstrate why this work matters",
        "Hold the line on values clearly: 'I understand this feels uncomfortable. We are committed to this direction.'",
        "Distinguish between legitimate feedback that can improve the approach and opposition that needs to be named and addressed directly",
      ]} />

      <SectionLabel text="Engage stakeholders meaningfully:" />
      <BodyText>
        Token consultation leads to disengagement. People who feel involved in shaping inclusion strategy are far more likely to sustain it.
      </BodyText>

      <BulletList items={[
        "Co-design initiatives with the communities they are intended to benefit, not just announce them to those communities",
        "Ask employees what would make the biggest difference to their experience and build that into your planning",
        "Report back on what you heard and what changed as a result of listening",
        "Avoid consultation fatigue: only ask if you intend to act on the feedback",
      ]} />

      <KeyReminder text="Consultation without action builds more cynicism than never asking. Only ask if you intend to do something with what you hear." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Create Safe Spaces; Make Impact Visible" />

      <SectionLabel text="Create genuine spaces for honest conversation:" />
      <BodyText>
        Employees need spaces to speak honestly about their experiences without fear of judgment or retaliation. Without those spaces, the problems organisations most need to know about remain invisible.
      </BodyText>

      <BulletList items={[
        "Run listening circles or focus groups with clear ground rules and a commitment to confidentiality",
        "Use pulse surveys regularly to capture how people are feeling, and share anonymised findings back",
        "Create channels for feedback that are genuinely separate from line management wherever possible",
        "Respond to what you hear; even if the answer is 'we cannot change this right now, and here is why'",
      ]} />

      <SectionLabel text="Make impact visible:" />
      <BodyText>
        Abstract commitments to inclusion exhaust people. Concrete data, real stories, and visible changes show that the work is making a difference.
      </BodyText>

      <BulletList items={[
        "Share a regular 'what changed' update: decisions made, policies amended, behaviours addressed",
        "Use case studies and testimonials (with consent) to make the human impact real",
        "Present data visually and clearly: progress against targets, demographic shifts, engagement scores by group",
        "Name and acknowledge systemic barriers you are actively working to remove, rather than waiting until they are fully resolved",
      ]} />

      <KeyReminder text="Visibility sustains belief that the work is worth doing. When people cannot see progress, they stop believing in the effort." />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Support Wellbeing; Equip People with Tools" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/managing-edi-fatigue/slide7-wellbeing-support.jpg" alt="Two colleagues having a supportive one to one conversation in a calm workplace setting" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Support the wellbeing of those doing the most intensive work:" />
      <BodyText>
        For those carrying the heaviest EDI load (often people from marginalised groups, dedicated EDI practitioners, and allies who regularly speak up), emotional wellbeing support is not a nice-to-have. It is essential.
      </BodyText>

      <BulletList items={[
        "Ensure access to employee assistance programmes and peer support networks",
        "Make flexible working genuinely available, especially around intensive events or consultations",
        "Check in with individuals regularly rather than waiting for them to raise concerns",
        "Acknowledge the emotional labour explicitly: 'I know this is a lot to carry. What support would help?'",
      ]} />

      <SectionLabel text="Equip people with the tools they need:" />
      <BodyText>
        EDI fatigue often comes from being expected to do inclusion work without adequate training, time, or support. People who feel equipped rather than overwhelmed are far more likely to sustain their commitment.
      </BodyText>

      <BulletList items={[
        "Provide practical frameworks: what to say when you witness bias, how to run an inclusive meeting, how to give inclusive feedback",
        "Make learning resources accessible and self-paced, not just mandatory and scheduled",
        "Build skills incrementally so people develop confidence over time, rather than feeling immediately overwhelmed",
        "Treat this learning platform as one part of a joined-up approach, not a standalone solution",
      ]} />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="From Performative to Embedded" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          📋 A useful distinction:
        </p>
        <BodyText>
          Performative EDI is what happens when organisations respond to external pressure with visible gestures: a statement, a logo, an event. It is not nothing; but it is rarely sustaining. Embedded EDI is what happens when inclusion is integrated into the everyday systems, decisions, and culture of the organisation. It does not depend on one person, one team, or one event to survive.
        </BodyText>
      </div>

      <SectionLabel text="What embedded EDI looks like in practice:" />
      <BulletList items={[
        "Inclusion criteria are built into recruitment, promotion, and procurement decisions as standard",
        "Data on representation, pay gaps, and employee experience is reviewed regularly and acted upon",
        "Leaders are held accountable for inclusion outcomes in the same way they are held accountable for financial results",
        "EDI is a standing agenda item in leadership meetings, not a separate annual event",
        "Mistakes are addressed quickly and transparently rather than managed quietly",
      ]} />

      <KeyReminder text="The question to ask is not 'are we doing EDI?' It is 'is EDI embedded in how we do everything?'" />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Take a few minutes to think honestly about the sustainability of inclusion efforts in your own context.
      </BodyText>

      <ReflectionBox
        prompt="Think about your own organisation or team."
        subPrompts={[
          "Where do you see signs of EDI fatigue? What is driving it?",
          "Whose shoulders does most of the inclusion work fall on? Is that sustainable?",
          "What is one change your organisation could make to move from performative to embedded EDI?",
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
        The challenge of sustaining EDI efforts over time is well-documented. Here is what the research and leading frameworks tell us.
      </BodyText>

      <SectionLabel text="Key findings:" />
      <BulletList items={[
        "Research by Deloitte and Catalyst consistently shows that employees who experience inclusion as embedded in culture are significantly more engaged and less likely to leave",
        "McKinsey's research highlights that organisations where inclusion is integrated into leadership accountability and talent systems outperform those where it is treated as a separate initiative",
        "CIPD research (2023) found that EDI practitioners frequently report burnout and isolation, particularly in organisations where the work is under-resourced and poorly distributed",
        "Studies of diversity fatigue in the US and UK show that resistance to EDI is often rooted not in opposition to equality, but in a sense that the approach is unfair, unclear, or ineffective",
        "The most sustainable inclusion cultures are those where leadership models the behaviour, data drives the strategy, and all employees feel a stake in the outcome",
      ]} />

      <SectionLabel text="Relevant frameworks:" />
      <BulletList items={[
        "CIPD: Inclusion and Diversity in the Workplace guide; evidence-based and practical",
        "Catalyst: research on inclusive leadership and sustainable culture change",
        "Race Equality Matters: practical guidance on addressing racial inequality and sustaining commitment",
        "Business in the Community (BITC): frameworks for embedding EDI in business strategy and leadership",
      ]} />

      <KeyReminder text="Sustainability is not about maintaining energy indefinitely. It is about building systems, structures, and cultures so that inclusion does not depend on any one person's effort to survive." />
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
        "EDI fatigue is real, widely reported, and a sign that the approach needs to change, not that the goal should be abandoned",
        "Naming the fatigue, distributing responsibility fairly, and resourcing the work properly are essential first steps",
        "Celebrating wins and communicating honestly and consistently sustains motivation and builds credibility",
        "Addressing backlash directly; with evidence and values held together; is more effective than ignoring or suppressing it",
        "Safe spaces, visible impact, wellbeing support, and practical tools all help people stay engaged over the long term",
        "The shift from performative to embedded EDI is what makes inclusion sustainable",
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
      q: "EDI fatigue is best described as...",
      options: [
        { id: "a", text: "Tiredness from attending too many diversity training sessions" },
        { id: "b", text: "A problem that only affects people from marginalised groups" },
        { id: "c", text: "Exhaustion and disengagement that sets in when inclusion efforts feel performative, burdensome, or disconnected from real change" },
        { id: "d", text: "An inevitable outcome of any long-term diversity programme" },
      ],
      correct: "c",
      explanation: "EDI fatigue is not simply about too much training. It reflects a wider experience of disillusionment when EDI work feels hollow, burdensome, or ineffective. It can affect anyone in an organisation, not just those from marginalised groups, and it is not inevitable if the approach is well-designed and genuinely embedded.",
    },
    {
      q: "Which of the following most directly addresses the risk of EDI work falling disproportionately on marginalised employees?",
      options: [
        { id: "a", text: "Creating a dedicated team of volunteers to lead all EDI initiatives" },
        { id: "b", text: "Thanking those who carry the most EDI responsibility in team meetings" },
        { id: "c", text: "Distributing EDI responsibility widely, resourcing it properly, and recognising it in workloads and appraisals" },
        { id: "d", text: "Making EDI responsibilities optional so nobody feels pressured" },
      ],
      correct: "c",
      explanation: "The most effective way to address unequal distribution of EDI work is to build it into structures: make it formally recognised, fairly distributed, and properly resourced. Thanking individuals without changing the system does not address the underlying burden, and making EDI optional often concentrates it further among the most committed.",
    },
    {
      q: "What is the most effective way to address backlash or scepticism about EDI?",
      options: [
        { id: "a", text: "Ignore it and focus on the people who are engaged" },
        { id: "b", text: "Discipline those who express resistance" },
        { id: "c", text: "Engage honestly with the concern, respond with evidence, and hold the line on values" },
        { id: "d", text: "Hold a mandatory sensitivity training session for those who push back" },
      ],
      correct: "c",
      explanation: "Backlash that is dismissed or punished tends to go underground rather than go away. Engaging honestly, understanding the concern, and responding with both evidence and a clear articulation of organisational values is far more effective at building lasting cultural change.",
    },
    {
      q: "Which of the following best sustains long-term commitment to EDI?",
      options: [
        { id: "a", text: "Sending quarterly email updates about the EDI strategy" },
        { id: "b", text: "Running annual surveys and sharing the results" },
        { id: "c", text: "Making progress visible through concrete data, real stories, and documented change" },
        { id: "d", text: "Increasing the EDI budget year on year" },
      ],
      correct: "c",
      explanation: "What sustains commitment is visible, concrete evidence that the work is making a real difference. Abstract strategies, infrequent updates, and budget increases without visible outcomes all fail to create the sense of progress and impact that keeps people engaged over time.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("managing-edi-fatigue");
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
        "EDI fatigue is a signal that the approach needs to change, not that the goal should be abandoned",
        "Naming it openly is the first step; silence makes it worse",
        "Distributing responsibility fairly and resourcing it properly is essential to sustainability",
        "Visible progress, honest communication, and meaningful stakeholder engagement build lasting commitment",
        "Embedded EDI; integrated into systems, decisions, and culture; is what outlasts any individual or initiative",
        "The wellbeing of those doing the most intensive work must be actively supported",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "What Is EDI Fatigue?",
  "Recognise It; Then Rotate Responsibility",
  "Celebrate Wins; Communicate Transparently",
  "Address Backlash; Engage Stakeholders Meaningfully",
  "Create Safe Spaces; Make Impact Visible",
  "Support Wellbeing; Equip People with Tools",
  "From Performative to Embedded",
  "Time to Reflect",
  "What the Evidence Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function ManagingEdiFatiguePage() {
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
