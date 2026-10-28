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
      <SlideHeading title="Building an Inclusive Workplace Culture" subtitle="Strategies for Lasting Change" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          Inclusion does not happen by accident. It is built deliberately, one decision, one conversation, and one system at a time. The organisations that get it right are not those with the most ambitious statements; they are the ones that take consistent, practical action.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson introduces 14 evidence-based strategies for building a genuinely inclusive workplace culture, moving beyond intention to practical implementation at every level of an organisation.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Identify the key strategies that create and sustain inclusive workplace cultures",
        "Understand how inclusion operates at the levels of leadership, systems, teams, and individuals",
        "Apply at least two strategies directly to your own organisation or team context",
      ]} />

      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={[
        "Find a quiet space and give yourself around 15 to 20 minutes",
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
      <SlideHeading title="Why Workplace Culture Matters" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide2-inclusive-team.jpg" alt="A diverse team working together in a welcoming office environment" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Culture is the sum of everything an organisation does, says, allows, and ignores. It is experienced differently by different people, and those differences often fall along lines of race, gender, disability, sexuality, and other protected characteristics. A culture that does not actively work to be inclusive will, by default, reproduce the inequalities already present in society.
      </BodyText>

      <SectionLabel text="What the evidence tells us:" />
      <BulletList items={[
        "Organisations with inclusive cultures are significantly more likely to outperform their peers on innovation and decision-making",
        "Employees who feel included are more engaged, more productive, and less likely to leave",
        "Exclusion is costly: it shows up in turnover, absenteeism, underperformance, and reputational damage",
        "Diverse teams only realise their potential when inclusion accompanies diversity; diversity without inclusion is tokenism",
      ]} />

      <KeyReminder text="Inclusion is not a soft value. It is a practical, measurable driver of organisational performance and individual wellbeing." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 1 and 2: Leadership and Accountability" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide3-leadership.jpg" alt="A leader engaging their team with openness and trust" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 1: Visible, committed leadership" />
      <BodyText>
        Inclusion starts at the top. Leaders must do more than sign off on an EDI strategy; they must model inclusive behaviour, speak openly about inclusion as a priority, and hold themselves to the same standards they expect from others. When leaders are visibly committed, the rest of the organisation takes the agenda seriously.
      </BodyText>
      <BulletList items={[
        "Senior leaders should communicate regularly about why inclusion matters to the organisation",
        "Leaders should actively listen to underrepresented employees, not just to HR or EDI teams",
        "Visible allyship from leadership signals safety to the whole organisation",
      ]} />

      <SectionLabel text="Strategy 2: Clear accountability structures" />
      <BodyText>
        Inclusion without accountability becomes aspiration without progress. Organisations need clear ownership, measurable targets, and regular reporting against them.
      </BodyText>
      <BulletList items={[
        "Assign named responsibility for inclusion outcomes at board and senior leadership level",
        "Set specific, time-bound inclusion targets and report progress publicly where possible",
        "Include inclusion-related objectives in performance reviews for managers and leaders",
        "Ensure accountability is distributed across the organisation; not siloed in an EDI team",
      ]} />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 3 and 4: Data and Listening" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide4-data-listening.jpg" alt="People reviewing data and listening in a collaborative meeting" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 3: Collect and use workforce data" />
      <BodyText>
        You cannot address what you do not measure. Workforce data helps organisations understand where underrepresentation exists, where people are leaving, and where pay gaps or progression disparities emerge.
      </BodyText>
      <BulletList items={[
        "Collect diversity data voluntarily and anonymously, with clear communication about how it will be used",
        "Disaggregate data by protected characteristic to identify where specific groups face barriers",
        "Use data not just to report but to act; connect findings to specific interventions",
        "Be transparent with staff about what the data shows and what you are doing in response",
      ]} />

      <SectionLabel text="Strategy 4: Create genuine listening channels" />
      <BodyText>
        Data tells you the what; listening tells you the why. Organisations need structured ways to hear from employees across all levels, particularly those from underrepresented groups.
      </BodyText>
      <BulletList items={[
        "Run regular, anonymous surveys on inclusion and belonging; and act on the results",
        "Hold focus groups and listening sessions with employee networks and underrepresented groups",
        "Create psychological safety so people feel able to raise concerns without fear of reprisal",
        "Close the feedback loop: always communicate what you heard and what you are doing about it",
      ]} />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 5 and 6: Recruitment and Onboarding" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide5-recruitment.jpg" alt="A welcoming recruitment and onboarding process with diverse candidates" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 5: Embed inclusion in recruitment" />
      <BodyText>
        The pipeline into an organisation shapes everything that follows. Inclusive recruitment practices widen the talent pool and reduce the structural barriers that stop talented people from even applying.
      </BodyText>
      <BulletList items={[
        "Use inclusive, non-gendered language in all job adverts and role descriptions",
        "Advertise in diverse networks and community organisations, not just mainstream job boards",
        "Remove unnecessary degree requirements and other credential barriers where possible",
        "Use structured, skills-based interviews to reduce bias in assessment",
        "Ensure interview panels reflect diversity where possible",
      ]} />

      <SectionLabel text="Strategy 6: Design an inclusive onboarding experience" />
      <BodyText>
        First impressions shape long-term belonging. The onboarding experience communicates whether an organisation's commitment to inclusion is real or performative.
      </BodyText>
      <BulletList items={[
        "Include inclusion and EDI as core elements of induction; not an optional bolt-on",
        "Introduce new starters to employee networks and peer support communities early",
        "Provide accessible materials and consider different learning styles and access needs",
        "Assign mentors or buddies from day one, drawn from diverse groups",
      ]} />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 7 and 8: Development and Progression" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide6-progression.jpg" alt="Employees from diverse backgrounds accessing training and development opportunities" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 7: Remove barriers to development" />
      <BodyText>
        Structural barriers inside organisations often prevent talented people from progressing, even after they have been recruited. These barriers are frequently invisible to those who do not face them.
      </BodyText>
      <BulletList items={[
        "Audit who accesses development opportunities: training, mentoring, sponsorship, stretch assignments",
        "Make development resources and opportunities explicitly accessible to all; not dependent on self-nomination or manager advocacy alone",
        "Offer targeted development programmes for underrepresented groups where evidence shows they are needed",
        "Review promotion criteria for unconscious bias and ensure they are applied consistently",
      ]} />

      <SectionLabel text="Strategy 8: Sponsorship and mentoring programmes" />
      <BodyText>
        Mentoring offers guidance; sponsorship opens doors. Both are powerful tools for supporting underrepresented employees to develop and progress.
      </BodyText>
      <BulletList items={[
        "Design structured mentoring programmes that connect underrepresented employees with experienced colleagues",
        "Train sponsors to actively advocate for their mentees in rooms where decisions are made",
        "Monitor the outcomes of programmes and adjust based on what is actually working",
        "Encourage senior leaders to sponsor employees from groups they do not belong to",
      ]} />
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 9 and 10: Pay, Policies, and Flexibility" />

      <SectionLabel text="Strategy 9: Conduct and act on pay gap analysis" />
      <BodyText>
        Pay gaps reveal structural inequality. Gender pay gap reporting is mandatory for larger UK employers, but organisations should go further, examining ethnicity, disability, and other dimensions of pay disparity.
      </BodyText>
      <BulletList items={[
        "Analyse pay data by gender, ethnicity, disability status, and other relevant characteristics",
        "Publish results transparently and outline concrete steps to address disparities",
        "Audit bonus and reward systems for hidden bias in how discretionary pay is awarded",
        "Review job levelling and grading structures to ensure they do not embed historical inequalities",
      ]} />

      <SectionLabel text="Strategy 10: Review policies for inclusion" />
      <BodyText>
        Policies that appear neutral often have disproportionate impact on particular groups. Regular policy review through an inclusion lens is essential.
      </BodyText>
      <BulletList items={[
        "Review flexible working, parental leave, and caring leave policies to ensure they are accessible and equitable",
        "Assess whether performance management processes treat people fairly across different groups",
        "Ensure reasonable adjustment processes for disabled employees are straightforward and consistently applied",
        "Make all policies easy to find, written in plain English, and regularly updated",
      ]} />

      <KeyReminder text="Policies communicate what an organisation values. A generous flexible working policy that is never actually approved for certain groups communicates something very different from the written text." />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 11 and 12: Education and Employee Networks" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide8-learning.jpg" alt="Employees engaged in inclusive learning and network community activities" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 11: Invest in ongoing inclusion education" />
      <BodyText>
        One-off training rarely changes behaviour. Effective inclusion education is ongoing, embedded in everyday practice, and applies to everyone across all levels of the organisation.
      </BodyText>
      <BulletList items={[
        "Deliver inclusive leadership training for all managers; not just those in senior roles",
        "Provide role-specific inclusion education: HR, recruitment, L&D, and communications teams all need tailored content",
        "Use a blended approach: workshops, self-directed learning, peer learning, and on-the-job practice",
        "Evaluate training impact through behaviour change; not just satisfaction scores",
      ]} />

      <SectionLabel text="Strategy 12: Support and resource employee networks" />
      <BodyText>
        Employee networks and resource groups provide community, peer support, and a structured voice for underrepresented employees. When properly resourced, they are a significant driver of inclusion.
      </BodyText>
      <BulletList items={[
        "Fund networks with a dedicated budget and give them protected time during working hours",
        "Connect networks directly to senior leaders and decision-making processes",
        "Involve networks in policy review, recruitment campaigns, and organisational communications",
        "Recognise and reward network leaders for the work they contribute to the organisation",
      ]} />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Strategies 13 and 14: Culture and Inclusion Everyday" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/building-inclusive-workplace/slide9-everyday.jpg" alt="Colleagues in everyday work interactions that reflect mutual respect and inclusion" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Strategy 13: Address exclusionary behaviour consistently" />
      <BodyText>
        Inclusion is undermined by the behaviours that go unchallenged. Microaggressions, banter that excludes, and patterns of interruption or dismissal in meetings all erode belonging. Organisations must have the confidence and the tools to address these consistently.
      </BodyText>
      <BulletList items={[
        "Develop clear, shared language for naming and addressing exclusionary behaviour",
        "Equip managers and team members with skills to challenge non-inclusive behaviour constructively",
        "Ensure disciplinary processes treat exclusionary behaviour as seriously as other forms of misconduct",
        "Create peer accountability so inclusion is everyone's responsibility; not just HR's",
      ]} />

      <SectionLabel text="Strategy 14: Celebrate and embed inclusive culture" />
      <BodyText>
        Inclusive cultures do not just manage problems; they actively celebrate difference and build belonging as a positive experience.
      </BodyText>
      <BulletList items={[
        "Mark cultural and religious observances across all groups; not only the dominant majority",
        "Celebrate achievements and milestones for all employee communities",
        "Make belonging visible in communications, imagery, and internal storytelling",
        "Create spaces; physical and psychological; where people can bring their whole selves to work",
      ]} />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Time to Reflect" />

      <BodyText>
        You have now covered all 14 strategies. Take a moment to apply them to your own context before moving to the quiz.
      </BodyText>

      <ReflectionBox
        prompt="Think about your own organisation or a workplace you know well."
        subPrompts={[
          "Which of the 14 strategies does your organisation currently do well?",
          "Which area is most underdeveloped or missing entirely?",
          "What is one concrete action you could take in the next month to move forward on that gap?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="The 14 Strategies at a Glance" />

      <BodyText>
        Here is a summary of all 14 strategies covered in this lesson.
      </BodyText>

      <BulletList items={[
        "Strategy 1: Visible, committed leadership",
        "Strategy 2: Clear accountability structures",
        "Strategy 3: Collect and use workforce data",
        "Strategy 4: Create genuine listening channels",
        "Strategy 5: Embed inclusion in recruitment",
        "Strategy 6: Design an inclusive onboarding experience",
        "Strategy 7: Remove barriers to development",
        "Strategy 8: Sponsorship and mentoring programmes",
        "Strategy 9: Conduct and act on pay gap analysis",
        "Strategy 10: Review policies for inclusion",
        "Strategy 11: Invest in ongoing inclusion education",
        "Strategy 12: Support and resource employee networks",
        "Strategy 13: Address exclusionary behaviour consistently",
        "Strategy 14: Celebrate and embed inclusive culture",
      ]} />

      <KeyReminder text="The most effective organisations do not cherry-pick from this list. They work across all dimensions; leadership, systems, development, culture; because inclusion requires a joined-up approach." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "Which of the following best describes why diversity without inclusion is insufficient?",
      options: [
        { id: "a", text: "Diversity is only relevant in large organisations" },
        { id: "b", text: "Diverse teams only realise their potential when inclusion accompanies diversity; diversity without inclusion is tokenism" },
        { id: "c", text: "Inclusion is a separate programme that runs after diversity targets are met" },
        { id: "d", text: "Diversity and inclusion are essentially the same thing" },
      ],
      correct: "b",
      explanation: "Research consistently shows that diverse teams underperform when inclusion is absent. Bringing people together is not enough; the environment must allow every person to contribute fully. Without inclusion, diversity becomes tokenism.",
    },
    {
      q: "Why is closing the feedback loop important when running listening channels?",
      options: [
        { id: "a", text: "It is a legal requirement under the Equality Act" },
        { id: "b", text: "It ensures employees know their input was heard and that action followed; building trust and encouraging future engagement" },
        { id: "c", text: "It prevents employees from raising the same issues twice" },
        { id: "d", text: "It is mainly useful for HR reporting purposes" },
      ],
      correct: "b",
      explanation: "When organisations collect feedback but never communicate what they heard or did in response, employees stop engaging. Closing the feedback loop is essential for maintaining trust and demonstrating that listening has genuine value.",
    },
    {
      q: "What is the key distinction between mentoring and sponsorship in the context of inclusion?",
      options: [
        { id: "a", text: "Mentoring is for junior employees only; sponsorship is for senior staff" },
        { id: "b", text: "Mentoring offers guidance and support; sponsorship involves actively advocating for someone in decision-making spaces" },
        { id: "c", text: "Sponsorship is informal; mentoring is structured" },
        { id: "d", text: "They are the same thing with different names" },
      ],
      correct: "b",
      explanation: "Mentoring and sponsorship are complementary but distinct. Mentors guide and advise; sponsors use their influence and access to open doors and advocate for their mentees where decisions are made. Both are valuable, but sponsorship has the greater impact on progression.",
    },
    {
      q: "Which of the following is an example of inclusion in everyday culture?",
      options: [
        { id: "a", text: "Publishing a diversity statement on the company website" },
        { id: "b", text: "Celebrating cultural and religious observances across all employee communities; not only those of the majority" },
        { id: "c", text: "Running one inclusion workshop per year" },
        { id: "d", text: "Having an EDI team responsible for all inclusion work" },
      ],
      correct: "b",
      explanation: "Inclusion in everyday culture means embedding belonging into the lived experience of work; through how events, stories, and achievements are acknowledged across all groups. A once-a-year workshop or a website statement does not create a culture.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("building-inclusive-workplace");
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
        "Inclusion is built through consistent, practical action across leadership, systems, development, and culture",
        "Data and listening work together: data shows where the gaps are; listening explains why they exist",
        "Recruitment and onboarding set the foundation for belonging; inclusion cannot be retrofitted later",
        "Development systems must be audited to ensure opportunity is genuinely equitable; not just nominally available",
        "Everyday culture; how exclusion is addressed and how difference is celebrated; determines whether inclusion is real",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why Workplace Culture Matters",
  "Strategies 1 and 2: Leadership and Accountability",
  "Strategies 3 and 4: Data and Listening",
  "Strategies 5 and 6: Recruitment and Onboarding",
  "Strategies 7 and 8: Development and Progression",
  "Strategies 9 and 10: Pay, Policies, and Flexibility",
  "Strategies 11 and 12: Education and Employee Networks",
  "Strategies 13 and 14: Culture and Inclusion Everyday",
  "Time to Reflect",
  "The 14 Strategies at a Glance",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function BuildingInclusiveWorkplacePage() {
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
