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
      <SlideHeading title="Positive Action vs Positive Discrimination" subtitle="Know the Difference" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Taking action to create a fairer workplace is not the same as treating people unfairly. Understanding the difference is one of the most important things you can do as a leader or practitioner.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand the legal and practical distinction between positive action and positive discrimination, and give you the confidence to apply lawful positive action in your organisation.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Explain the difference between positive action and positive discrimination clearly and accurately",
        "Identify lawful examples of positive action and unlawful examples of positive discrimination in workplace contexts",
        "Apply the principles of positive action to recruitment, development, and progression in your own organisation",
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
      <SlideHeading title="Why This Distinction Matters" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/positive-action/slide2-workplace-diversity.jpg" alt="A diverse group of professionals collaborating in a modern workplace" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Many organisations want to address underrepresentation but hold back. They are worried about doing it wrong, crossing a legal line, or being accused of unfairness. This caution, however well intentioned, often results in paralysis: nothing changes, and inequalities persist.
      </BodyText>

      <BodyText>
        The law is actually clearer than most people think. There is an important and legally meaningful distinction between positive action (which is permitted and encouraged) and positive discrimination (which is generally unlawful). Organisations that do not understand this distinction often avoid action altogether, when in fact they have both the tools and the legal basis to act.
      </BodyText>

      <SectionLabel text="Why the distinction matters:" />
      <BulletList items={[
        "Positive discrimination is unlawful in the UK and exposes organisations to legal challenge and reputational risk",
        "But failing to take positive action leaves structural barriers in place and perpetuates inequality",
        "Understanding the line between the two allows organisations to act with confidence, legality, and genuine impact",
      ]} />

      <KeyReminder text="The Equality Act 2010 explicitly permits and encourages positive action. The question is not whether to act; it is how to act lawfully." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="What Is Positive Discrimination?" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/positive-action/slide3-legal-scales.jpg" alt="Scales of justice representing legal frameworks and fairness" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Positive discrimination means giving someone preferential treatment solely because of a protected characteristic, regardless of their merit, qualifications, or suitability for the role. It bypasses fairness rather than removing barriers to it.
      </BodyText>

      <SectionLabel text="Why it is unlawful:" />
      <BodyText>
        Positive discrimination is generally illegal under the Equality Act 2010. It creates unfairness in a different direction rather than eliminating it. It also carries significant legal and reputational risk for organisations, and can undermine trust among all employees.
      </BodyText>

      <SectionLabel text="Examples of positive discrimination in practice:" />
      <BulletList items={[
        "Automatically promoting someone because they are female, regardless of their experience or performance",
        "Hiring someone for a leadership role solely to meet an ethnic quota, without assessing suitability",
        "Giving a job to a candidate only because they have a disability, without regard to whether they are the strongest candidate",
        "Awarding bonuses or high-profile project assignments based solely on demographic characteristics rather than contribution",
      ]} />

      <KeyReminder text="There are very limited exceptions in law, for example certain provisions relating to political parties. However, these are narrow and do not apply to most workplace contexts." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="What Is Positive Action?" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/positive-action/slide4-open-door.jpg" alt="A door being opened wide, symbolising access and opportunity" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Positive action refers to measures taken to help underrepresented groups access opportunities and overcome barriers, without giving any unfair advantage to any individual. It is about levelling the playing field; not tipping it in the other direction.
      </BodyText>

      <SectionLabel text="The legal basis:" />
      <BodyText>
        Positive action is explicitly permitted under the Equality Act 2010, Sections 158 and 159. Section 158 allows organisations to take proportionate steps to help people who share a protected characteristic overcome disadvantage or increase their participation. Section 159 goes further by allowing employers, in limited circumstances, to prefer a candidate from an underrepresented group when two candidates are genuinely equally qualified.
      </BodyText>

      <SectionLabel text="Examples of positive action in practice:" />
      <BulletList items={[
        "Offering mentoring programmes specifically for women in leadership pipelines",
        "Providing additional leadership training for employees from underrepresented racial or ethnic groups",
        "Welcoming job applications from disabled candidates by sharing vacancies in disability-specific forums",
        "Running outreach sessions at diverse universities to engage with students from underrepresented backgrounds",
        "Creating apprenticeship programmes that target underrepresented groups",
        "Running unconscious bias training for managers making promotion decisions",
      ]} />

      <KeyReminder text="Positive action is about removing barriers and widening access; not about guaranteeing outcomes for any individual." />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Side by Side: The Key Differences" />

      <BodyText>
        Use this comparison to quickly identify which approach you are looking at in any given situation.
      </BodyText>

      <SectionLabel text="Positive discrimination (unlawful):" />
      <BulletList items={[
        "Generally illegal under the Equality Act 2010",
        "Gives preferential treatment based solely on a protected characteristic",
        "Bypasses merit and suitability entirely",
        "Creates significant legal and reputational risk",
        "Often undermines inclusion by making others feel unfairly treated",
        "Rarely structured; tends to be reactive and inconsistent",
        "Little or no monitoring of outcomes",
      ]} />

      <SectionLabel text="Positive action (lawful):" />
      <BulletList items={[
        "Explicitly permitted under the Equality Act 2010, Sections 158 and 159",
        "Removes barriers and supports underrepresented groups without bypassing merit",
        "Focuses on widening access and encouraging participation",
        "Evidence-based and proportionate; integrated into systems and processes",
        "Promotes belonging by making workplaces more accessible to everyone",
        "Outcomes are monitored to ensure effectiveness and fairness",
      ]} />

      <KeyReminder text="The simplest test: are you removing a barrier, or bypassing merit? If you are removing a barrier, you are likely on solid legal ground. If you are bypassing merit, you are likely not." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Positive Action in Recruitment" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/positive-action/slide6-recruitment.jpg" alt="A hiring manager reviewing applications from a diverse pool of candidates" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Recruitment is one of the most powerful opportunities to take lawful positive action. There are many steps you can take at every stage of the process that widen the pool without compromising on merit.
      </BodyText>

      <SectionLabel text="Lawful positive action at the recruitment stage:" />
      <BulletList items={[
        "Run targeted outreach to underrepresented communities; for example, advertising roles in disability forums, ethnically diverse networks, or LGBTQ+ professional groups",
        "Use inclusive and non-gendered language in job adverts to ensure the widest possible group of qualified candidates feels able to apply",
        "Partner with diverse universities, colleges, and community organisations to reach candidates who may not find your vacancies through standard channels",
        "Offer guaranteed interview schemes for disabled candidates who meet the minimum criteria",
        "Use structured, skills-based shortlisting criteria applied consistently to all applicants",
      ]} />

      <SectionLabel text="The tiebreaker provision (Section 159):" />
      <BodyText>
        Where two candidates are genuinely equally qualified and from equal merit assessments, you may choose the candidate from an underrepresented group. This is lawful under Section 159 of the Equality Act 2010. However, it must be used as a genuine last resort only; not as a routine tie-breaking tool; and only when candidates are truly equal in suitability.
      </BodyText>

      <KeyReminder text="You cannot lower the bar for any candidate. But you can and should widen the door to ensure the best candidates can reach the bar in the first place." />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Positive Action in Development and Progression" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/positive-action/slide7-mentoring.jpg" alt="A mentor and mentee having a focused one to one conversation" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Positive action does not stop at the point of hire. Some of the most impactful work happens inside the organisation: supporting people to grow, progress, and access opportunities they might otherwise be structurally excluded from.
      </BodyText>

      <SectionLabel text="What positive action in development looks like:" />
      <BulletList items={[
        "Mentoring and sponsorship programmes specifically designed for employees from underrepresented groups",
        "Targeted leadership development programmes that address barriers to progression",
        "Accessible training and development offerings; ensuring all formats and timings are usable by people with disabilities, caregiving responsibilities, or neurodiverse needs",
        "Flexible working arrangements that allow caregivers and others with additional responsibilities to access high-profile projects and visible opportunities",
        "Staff networks and employee resource groups (ERGs) that provide peer support, career guidance, and community",
        "Unconscious bias training for managers and decision-makers involved in promotion and performance review processes",
      ]} />

      <KeyReminder text="Positive action in development is about ensuring that the structures inside your organisation do not quietly undo the work you did to hire inclusively." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
          📋 The Scenario:
        </p>
        <BodyText>
          A senior leadership team has reviewed its workforce data and found that only 8% of its managers are from ethnic minority backgrounds, compared to 32% of its overall workforce. They recognise this gap and want to act. Three proposals are put forward. Before reading the analysis, think about which approach is lawful and which is not.
        </BodyText>
      </div>

      <SectionLabel text="Option A:" />
      <BodyText>
        The organisation sets a target that 30% of all management promotions in the next year must go to employees from ethnic minority backgrounds, regardless of the outcome of any performance or competency assessments.
      </BodyText>

      <SectionLabel text="Option B:" />
      <BodyText>
        The organisation creates a targeted leadership development programme open to employees from ethnic minority backgrounds, works with managers to identify and address structural barriers in the promotion process, and begins advertising all management vacancies in ethnically diverse professional networks.
      </BodyText>

      <SectionLabel text="Option C:" />
      <BodyText>
        The organisation updates its promotion criteria to include a new requirement for cultural competence, but does not define what this means, and leaves it to individual managers to apply subjectively.
      </BodyText>

      <SectionLabel text="The analysis:" />
      <BulletList items={[
        "Option A is positive discrimination. It sets a quota and bypasses merit entirely. This is unlawful under the Equality Act 2010.",
        "Option B is positive action. It removes structural barriers, widens access to development, and expands advertising reach without bypassing any individual candidate's merit. This is lawful and encouraged.",
        "Option C is problematic. An undefined, subjectively applied criterion could introduce a new form of bias rather than removing one. It is neither clearly positive action nor clearly unlawful; but it is likely to be ineffective and could create legal risk.",
      ]} />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        Now that you understand the distinction between positive action and positive discrimination, take a few minutes to apply it to your own context.
      </BodyText>

      <ReflectionBox
        prompt="Think about your own organisation or a workplace you know well."
        subPrompts={[
          "Where do you see underrepresentation? Which groups are missing from leadership, from certain teams, or from visible roles?",
          "What barriers might be contributing to that underrepresentation?",
          "What positive action could your organisation take lawfully to start addressing those barriers?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="What the Law Says" />

      <BodyText>
        The legal framework around positive action is more supportive than many people realise. Here is a summary of the key legislation and frameworks relevant to this area.
      </BodyText>

      <SectionLabel text="Equality Act 2010, Sections 158 and 159:" />
      <BodyText>
        Section 158 permits organisations to take proportionate positive action to help people who share a protected characteristic to overcome disadvantage, meet different needs, or increase participation in activities where they are underrepresented. Section 159 permits employers, in limited circumstances, to prefer a candidate from an underrepresented group where two candidates are genuinely equally qualified; but only as a last resort.
      </BodyText>

      <SectionLabel text="Public Sector Equality Duty (PSED):" />
      <BodyText>
        Public sector organisations are subject to the PSED, which requires them to have due regard to eliminating discrimination, advancing equality of opportunity, and fostering good relations between different groups. This goes beyond simply avoiding discrimination; it places a positive obligation to advance equality.
      </BodyText>

      <SectionLabel text="Worker Protection (Amendment of Equality Act 2010) Act 2023:" />
      <BodyText>
        In force from October 2023, this Act places a proactive duty on employers to prevent sexual harassment in the workplace; not merely to respond when it occurs.
      </BodyText>

      <SectionLabel text="Supporting frameworks:" />
      <BulletList items={[
        "CIPD Discrimination at Work Factsheet: practical guidance on how the Equality Act protects employees across hiring, training, and promotion",
        "National Equality Standard (NES): a framework helping organisations assess and benchmark their EDI performance",
        "UK Government Guidance on Positive Action in the Workplace: practical guidance for employers on using positive action lawfully",
      ]} />

      <KeyReminder text="If you work in the public sector, the Public Sector Equality Duty means you have a legal obligation to have due regard to advancing equality of opportunity; not just to avoid discrimination." />
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
        "The distinction between positive action and positive discrimination is clear in law",
        "Positive discrimination is unlawful in the UK and counterproductive: it bypasses merit and undermines trust",
        "Positive action is not only lawful but explicitly encouraged under the Equality Act 2010",
        "Positive action works best when it is systemic, evidence-based, and integrated into recruitment, development, and progression; not applied reactively or inconsistently",
        "Every organisation has the tools and the legal basis to take positive action; it does not require large budgets or complex programmes",
        "The simplest test: are you removing a barrier, or bypassing merit?",
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
      q: "Under the Equality Act 2010, positive action is...",
      options: [
        { id: "a", text: "Illegal in all circumstances" },
        { id: "b", text: "Permitted to help underrepresented groups access opportunities and overcome disadvantage" },
        { id: "c", text: "Only allowed in the public sector" },
        { id: "d", text: "The same as positive discrimination" },
      ],
      correct: "b",
      explanation: "Sections 158 and 159 of the Equality Act 2010 explicitly permit positive action to help underrepresented groups access opportunities and overcome disadvantage. It is available to all employers; not just public sector organisations.",
    },
    {
      q: "Which of the following is an example of positive discrimination?",
      options: [
        { id: "a", text: "Offering a mentoring programme for women in leadership" },
        { id: "b", text: "Advertising vacancies in disability-specific forums" },
        { id: "c", text: "Hiring someone solely because they are from an ethnic minority group, regardless of their suitability" },
        { id: "d", text: "Running unconscious bias training for all hiring managers" },
      ],
      correct: "c",
      explanation: "Positive discrimination means giving preferential treatment based solely on a protected characteristic, without regard to merit or suitability. This is unlawful in the UK. The other options are all lawful examples of positive action.",
    },
    {
      q: "The tiebreaker provision in the Equality Act (Section 159) allows employers to...",
      options: [
        { id: "a", text: "Always choose a candidate from an underrepresented group" },
        { id: "b", text: "Choose a candidate from an underrepresented group when two candidates are equally qualified, as a last resort" },
        { id: "c", text: "Set quotas for underrepresented groups in shortlisting" },
        { id: "d", text: "Ignore qualifications entirely for candidates from protected groups" },
      ],
      correct: "b",
      explanation: "Section 159 is narrow and specific. It only applies when candidates are genuinely equal in merit and suitability, and only as a last resort. It does not permit quotas or the removal of merit-based assessment.",
    },
    {
      q: "Which of the following best describes why organisations sometimes avoid taking positive action?",
      options: [
        { id: "a", text: "It is too expensive to implement" },
        { id: "b", text: "It is rarely effective in practice" },
        { id: "c", text: "Confusion between positive action and positive discrimination creates fear of acting unlawfully" },
        { id: "d", text: "The law does not support it" },
      ],
      correct: "c",
      explanation: "Research and practitioner evidence consistently shows that fear of crossing the line into positive discrimination stops many organisations from taking any action at all. Understanding the legal distinction clearly is the first step to acting with confidence.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("positive-action");
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
        "Positive discrimination is unlawful in the UK and counterproductive; it bypasses merit rather than removing barriers",
        "Positive action is explicitly permitted under the Equality Act 2010, Sections 158 and 159",
        "The distinction comes down to whether you are removing barriers or bypassing merit",
        "Positive action works best when it is systemic, evidence-based, and integrated into recruitment, development, and progression",
        "Every organisation has the tools and the legal basis to act; the question is whether they choose to",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why This Distinction Matters",
  "What Is Positive Discrimination?",
  "What Is Positive Action?",
  "Side by Side: The Key Differences",
  "Positive Action in Recruitment",
  "Positive Action in Development and Progression",
  "Real World Scenario",
  "Time to Reflect",
  "What the Law Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function PositiveActionVsDiscriminationPage() {
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
