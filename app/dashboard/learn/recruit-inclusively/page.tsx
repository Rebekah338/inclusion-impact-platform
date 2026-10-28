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
      <SlideHeading title="Recruit Inclusively" subtitle="Your Quick-Start Checklist" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Every hiring decision is a chance to either widen or narrow the door. Inclusive recruitment is not about lowering the bar. It is about making sure the bar is visible, fair, and equally reachable for everyone.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson gives you a practical, step-by-step checklist to make your recruitment process fairer, more accessible, and more likely to attract the best talent from the widest possible pool.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Identify the key stages of inclusive recruitment and what each one requires",
        "Apply practical changes to your job specifications, advertising, and interview processes",
        "Recognise where bias most commonly enters recruitment decisions and how to reduce it",
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
      <SlideHeading title="Why Inclusive Recruitment Matters" />
      <img src="/images/recruit-inclusively/slide1-candidates-waiting.jpg" alt="A diverse group of candidates waiting for interviews in a professional setting" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <BodyText>
        Recruitment is one of the most consequential processes in any organisation. Every decision you make at every stage either opens up opportunity or closes it down. And yet research consistently shows that bias enters the process far earlier and far more deeply than most organisations realise.
      </BodyText>

      <SectionLabel text="The reality:" />
      <BulletList items={[
        "Candidates with white-sounding names are 74% more likely to be called for interview than those with ethnic minority-sounding names, with identical CVs (Equality and Human Rights Commission)",
        "Women are less likely to apply for roles where the job specification uses words like assertive, competitive, or dominant",
        "Disabled candidates, candidates from lower socioeconomic backgrounds, and older workers all face structural barriers before they even reach the interview stage",
      ]} />

      <SectionLabel text="The opportunity:" />
      <BodyText>
        Organisations with inclusive recruitment practices access a wider talent pool, make better hiring decisions, and build teams with the diverse perspectives that drive innovation and better outcomes.
      </BodyText>

      <KeyReminder text="Inclusive recruitment is not about positive discrimination; it is about removing the barriers that stop the best people from getting through. We call this positive action." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Company Messaging and Job Specifications" />
      <img src="/images/recruit-inclusively/slide2-careers-page.jpg" alt="A person browsing a careers page on a laptop" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <SectionLabel text="Your public presence:" />
      <BodyText>
        Before a candidate even reads your job specification, they are already forming an impression of your organisation. Your website, social media, and public messaging all signal whether people like them belong there.
      </BodyText>
      <BulletList items={[
        "Ensure your website and public messaging clearly reflect your commitment to equity, diversity, and inclusion",
        "Use inclusive language that is welcoming to people from all backgrounds",
        "Ensure your imagery authentically represents the diversity of people working within your organisation. Imagery should reflect your actual workforce; avoid using diverse imagery that does not genuinely reflect who you are as an employer",
        "Highlight your values, EDI commitments, staff networks, accessibility provisions, and inclusive benefits such as flexible working and reasonable adjustments",
        "Make your careers page clear, accessible, and transparent",
      ]} />

      <SectionLabel text="Writing an inclusive job specification:" />
      <BulletList items={[
        "Use plain language and avoid sector jargon or technical terminology where possible",
        "Avoid gendered or ableist language: use gender-neutral pronouns and plain professional language",
        "Replace \"must\" or \"essential\" with \"should\" or \"desirable\": research shows that mandatory language deters women and underrepresented groups from applying unless they meet 100% of the criteria, even when employers would consider candidates who meet most requirements",
        "Ensure the font, colours, and spacing are accessible for neurodiverse readers",
        "Make the job specification downloadable for those who prefer to view it on another platform or in print",
      ]} />

      <KeyReminder text="The words you use in a job specification tell people whether or not they are welcome before they have ever spoken to you." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Where You Advertise" />
      <img src="/images/recruit-inclusively/slide3-job-platforms.jpg" alt="A jobs wanted newspaper showing multiple job listings" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <BodyText>
        If you only advertise in the same places you have always used, you will only ever reach the same people. Inclusive recruitment requires intentional effort to go beyond your usual channels.
      </BodyText>

      <SectionLabel text="Widen your advertising pools:" />
      <BulletList items={[
        "Advertise roles across a wide range of job platforms as a continuous and intentional effort",
        "Target diverse networks by using job platforms that specifically attract underrepresented communities",
        "Advertise across multiple platforms to reach candidates from different ages, backgrounds, and levels of digital access. Consider newspaper websites, social media channels, sector-specific job boards, specialist talent pools, and professional networks",
        "Include non-discriminatory platforms such as free or open-access job sites, so opportunities are not limited to those who can afford paid memberships",
      ]} />

      <ReflectionBox
        subPrompts={[
          "Where do you currently advertise your roles?",
          "Are there communities or groups who are unlikely to see your vacancies through your current channels?",
          "What is one new platform or network you could add to your next recruitment campaign?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="The Application Process" />
      <img src="/images/recruit-inclusively/slide4-application-form.jpg" alt="Hands completing an application form" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <BodyText>
        Even if a candidate finds your role and wants to apply, a poorly designed application process can exclude them before they have had the chance to demonstrate their ability. Accessibility at the application stage matters.
      </BodyText>

      <SectionLabel text="Making the application accessible:" />
      <BulletList items={[
        "Ensure the application is screen-reader friendly with clear instructions and accessible formatting",
        "Allow alternative ways to demonstrate competence; utilise portfolios, recorded video or audio responses, and other forms of evidence where appropriate",
        "Offer extra time or adjustments where needed",
        "Avoid requiring unnecessary personal information that could trigger bias; such as a photo or marital status",
      ]} />

      <SectionLabel text="CV sifting: reducing bias at the sift:" />
      <BulletList items={[
        "Use blind or semi-blind screening: remove identifying information such as names, addresses, dates of birth, photos, school names, and hobbies, as these can signal personal information that may trigger bias",
        "Use a diverse panel to review applications: have at least two reviewers independently score CVs, then compare results and discuss discrepancies",
        "Apply skills-based scoring criteria to reduce bias: score each CV against the same standards and avoid adding personal preferences or unannounced criteria",
        "Avoid penalising career gaps: these may reflect caregiving, disability, illness, or redundancy. Get the facts, not the assumptions.",
      ]} />

      <KeyReminder text="Bias does not wait for the interview. It enters at the application sift stage, often invisibly. Structured processes are your protection." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" />
      <img src="/images/recruit-inclusively/slide5-candidates-outside.jpg" alt="A diverse group of professionals in a meeting discussion" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <SectionLabel text="The Scenario:" />
      <BodyText>
        A hiring manager is reviewing two shortlisted CVs. Both candidates meet all of the criteria. One attended a Russell Group university. The other attended a less well-known institution but has more directly relevant work experience. The hiring manager instinctively leans toward the Russell Group candidate: they just seem more polished.
      </BodyText>

      <ReflectionBox
        subPrompts={[
          "What might be driving the hiring manager's instinct here?",
          "What does polished actually mean in this context, and how might it be influenced by bias?",
          "How would a structured, evidence-based scoring process change this decision?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Interview and Assessment" />
      <img src="/images/recruit-inclusively/slide6-interview-panel.jpg" alt="A structured interview panel with diverse panellists" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <SectionLabel text="Before the interview:" />
      <BulletList items={[
        "Offer interview questions or themes in advance to reduce cognitive load and support neurodiverse or anxious candidates",
        "Ask all candidates about access needs (format, environment, technology, timing, processing needs) before the interview begins",
        "Ensure interview panels are diverse in gender, ethnicity, age, background, and seniority",
        "Ensure all panel members are trained in understanding bias and how to score consistently",
      ]} />

      <SectionLabel text="During the interview:" />
      <BulletList items={[
        "Use structured interviews with clear scoring rubrics so every candidate is assessed consistently and transparently",
        "Ask all candidates the same core questions in the same order",
        "Include varied assessment methods: written tasks, practical exercises, scenario-based questions, or portfolio review to allow candidates with different strengths to demonstrate their ability fairly",
        "Avoid small talk or informal conversation that can reintroduce bias before the formal assessment begins",
      ]} />

      <KeyReminder text="A structured interview is not less personal. It is fairer. Every candidate deserves an equitable opportunity to demonstrate what they can do." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Decision-Making and Offer" />
      <img src="/images/recruit-inclusively/slide8-decision-meeting.jpg" alt="A diverse group in a structured interview or decision-making meeting" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <SectionLabel text="Making the decision:" />
      <BulletList items={[
        "Evaluate every applicant against the same clearly defined skills, experience, and competency requirements",
        "Avoid decisions based on personal preferences or gut feeling",
        "Avoid subjective comparisons: focus on objective measures of potential and performance rather than cultural fit or familiarity",
        "Monitor shortlisting and hiring outcomes: track who is shortlisted and hired, analysing patterns and disparities across identities to identify any biases",
        "Document all decisions: keep clear, detailed records of the rationale behind each hiring decision to ensure accountability and transparency",
      ]} />

      <SectionLabel text="The offer and onboarding:" />
      <BulletList items={[
        "Provide clear, accessible information: use plain language and accessible formats in offer letters and contracts",
        "Ask about access needs early and check for any adjustments or preferred communication styles",
        "Design an inclusive onboarding process with activities, training, and mentorship that fosters belonging and helps new team members feel welcomed and valued from day one",
      ]} />

      <ReflectionBox
        subPrompts={[
          "Think about a recent hiring decision in your organisation. Was the rationale documented and evidence-based?",
          "Are there patterns in who gets shortlisted or hired that have never been examined?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Your Turn" subtitle="Activity Slide" />
      <img src="/images/recruit-inclusively/slide9-notebook.jpg" alt="A hand holding a pencil ready to write in a notebook" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <BodyText>
        ✏️ Have your pen and paper ready.
      </BodyText>
      <BodyText>
        Think about the recruitment process in your own organisation. Answer the following questions honestly. There are no right or wrong answers.
      </BodyText>

      <BulletList items={[
        "At which stage of your current recruitment process is bias most likely to enter? What is the evidence for that?",
        "Does your organisation advertise roles in ways that could be excluding certain communities? Where are the gaps?",
        "Are your interview panels consistently diverse? If not, what would it take to change that?",
        "What is one change you could recommend or make to your recruitment process this month?",
      ]} />

      <KeyReminder text="Inclusive recruitment: a fair, structured, and accessible process that gives every candidate an equitable opportunity to demonstrate their ability." />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="What the Research Says" />
      <img src="/images/recruit-inclusively/slide10-research-documents.jpg" alt="A person reviewing research documents at a desk" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />

      <SectionLabel text="The impact of bias in recruitment:" />
      <BulletList items={[
        "Candidates with white-sounding names are 74% more likely to be called for interview than those with ethnic minority-sounding names, with identical CVs (Equality and Human Rights Commission)",
        "Research shows that women are less likely to apply for roles where the job specification uses language associated with masculine traits",
        "Disabled candidates report that many standard application processes create barriers before they even reach the interview stage (Scope, 2023)",
        "Candidates from lower socioeconomic backgrounds are disadvantaged by name-blind processes that still retain school and university information (Social Mobility Commission)",
      ]} />

      <SectionLabel text="The legal framework:" />
      <BulletList items={[
        "The Equality Act 2010 protects individuals from discrimination based on protected characteristics at every stage of the recruitment process",
        "The Public Sector Equality Duty requires public bodies to have due regard to eliminating discrimination and advancing equality",
        "The Worker Protection (Amendment of Equality Act 2010) Act 2023 places a proactive duty on employers to prevent harassment in the workplace, including during recruitment",
      ]} />

      <SectionLabel text="The business case:" />
      <BulletList items={[
        "McKinsey research found that companies in the top quartile for ethnic diversity are 36% more likely to achieve above-average profitability",
        "Harvard Business Review found that diverse teams make better decisions 87% of the time compared to individuals",
        "Organisations with structured, inclusive hiring processes report higher employee retention and lower time-to-hire",
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
        "Inclusive recruitment is not about lowering the bar: it is about making the bar visible and equally reachable for everyone",
        "Bias enters the recruitment process at every stage, from the job specification to the final decision",
        "Structured processes, diverse panels, and evidence-based decision-making are your most powerful tools",
        "Advertising in the same places will always reach the same people: intentional effort to reach wider communities is essential",
        "Documentation and monitoring are not bureaucracy: they are accountability",
        "Inclusive onboarding is part of the recruitment process: belonging starts before day one",
      ]} />

      <SectionLabel text="Key Terms:" />
      <BulletList items={[
        "Blind screening: removing identifying information from applications to reduce the influence of bias on the sifting process",
        "Structured interview: an interview format in which all candidates are asked the same questions in the same order and scored against consistent criteria",
        "Protected characteristics: the nine characteristics protected under the Equality Act 2010, including age, disability, race, religion, sex, and sexual orientation",
      ]} />

      <KeyReminder text="Every stage of your recruitment process is a choice about who gets in. Make those choices consciously and fairly." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Which of the following best describes why the word “must” should be avoided in job specifications?",
      options: [
        { id: "a", text: "It sounds too formal and puts candidates off" },
        { id: "b", text: "Research shows it makes women and underrepresented groups less likely to apply unless they meet 100% of the criteria" },
        { id: "c", text: "It is not grammatically correct in a professional document" },
        { id: "d", text: "It reduces the number of applications and makes shortlisting harder" },
      ],
      correct: "b",
      explanation: "Research consistently shows that the word must or essential deters women and candidates from underrepresented groups from applying unless they meet every single criterion, even when employers would consider candidates who meet most of them.",
    },
    {
      q: "What is the main purpose of blind or semi-blind CV screening?",
      options: [
        { id: "a", text: "To speed up the shortlisting process" },
        { id: "b", text: "To remove identifying information that could trigger unconscious bias" },
        { id: "c", text: "To reduce the number of applications received" },
        { id: "d", text: "To comply with GDPR data protection requirements" },
      ],
      correct: "b",
      explanation: "Blind screening removes information such as names, addresses, photos, and school names that can trigger bias. The goal is to ensure applications are assessed on skills, experience, and competence rather than on factors unrelated to the role.",
    },
    {
      q: "Which of the following is the best approach to interview panels?",
      options: [
        { id: "a", text: "Use the most senior people available regardless of their background" },
        { id: "b", text: "Keep panels small to make decision-making faster" },
        { id: "c", text: "Ensure panels are diverse in gender, ethnicity, age, background, and seniority, and trained in bias awareness" },
        { id: "d", text: "Use the same panel for all roles to ensure consistency" },
      ],
      correct: "c",
      explanation: "Diverse and trained interview panels reduce the risk of groupthink and help ensure candidates are assessed fairly. A panel that reflects a range of perspectives is more likely to evaluate candidates objectively.",
    },
    {
      q: "Why should career gaps not automatically be penalised during CV sifting?",
      options: [
        { id: "a", text: "Because they are very common and therefore insignificant" },
        { id: "b", text: "Because they may reflect caregiving, disability, illness, or redundancy, and penalising them without evidence introduces bias" },
        { id: "c", text: "Because they are protected under the Equality Act 2010" },
        { id: "d", text: "Because candidates with gaps often perform better in interviews" },
      ],
      correct: "b",
      explanation: "Career gaps often reflect circumstances outside a candidate's control: caring responsibilities, ill health, redundancy, or other personal situations. Making assumptions about what a gap means introduces bias and can disadvantage candidates from already marginalised groups.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("recruit-inclusively");
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
        "Inclusive recruitment is a process, not a gesture: every stage requires intentional design",
        "Bias enters early: the job specification, the advertising channels, and the CV sift are all high-risk moments",
        "Structured, evidence-based processes protect both candidates and your organisation",
        "Diverse panels and consistent scoring rubrics are not optional extras: they are best practice",
        "Inclusive onboarding is part of the recruitment journey: the welcome matters as much as the hire",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why Inclusive Recruitment Matters",
  "Company Messaging and Job Specifications",
  "Where You Advertise",
  "The Application Process",
  "Real World Scenario",
  "Interview and Assessment",
  "Decision-Making and Offer",
  "Your Turn",
  "What the Research Says",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function RecruitInclusivelyPage() {
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
