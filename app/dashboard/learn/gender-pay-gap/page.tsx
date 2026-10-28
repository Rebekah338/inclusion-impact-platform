"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--charcoal)", margin: "0 0 0.4rem" }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0.75rem 0", paddingLeft: "1.25rem" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
      ))}
    </ul>
  );
}
function ReflectionBox({ prompt, subPrompts }: { prompt: string; subPrompts?: string[] }) {
  return (
    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>Reflect</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>{prompt}</p>
      {subPrompts && <ul style={{ margin: "0.6rem 0 0", paddingLeft: "1.25rem" }}>{subPrompts.map((s, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.3rem" }}>{s}</li>)}</ul>}
    </div>
  );
}
function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{ background: "var(--sage-light)", borderLeft: "4px solid var(--sage-dark)", borderRadius: "0.5rem", padding: "1rem 1.25rem", margin: "1.25rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", margin: 0, fontStyle: "italic" }}>{text}</p>
    </div>
  );
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.75rem" }}>{text}</p>;
}
function BodyText({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: small ? "0.9rem" : "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>{children}</p>;
}
function StepCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem", display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--sage-dark)", minWidth: "1.5rem" }}>{number}</span>
      <div>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.25rem" }}>{title}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.55, margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

export default function GenderPayGapLesson() {
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [ttsActive, setTtsActive] = useState(false);
  const total = 13;
  const progress = ((slide + 1) / total) * 100;

  useEffect(() => { return () => { window.speechSynthesis?.cancel(); }; }, []);

  function readSlide() {
    if (ttsActive) { window.speechSynthesis?.cancel(); setTtsActive(false); return; }
    const el = document.getElementById("slide-content-area");
    if (!el) return;
    const utt = new SpeechSynthesisUtterance(el.innerText || el.textContent || "");
    utt.onend = () => setTtsActive(false);
    setTtsActive(true);
    window.speechSynthesis?.speak(utt);
  }
  function goNext() { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(s => Math.min(s + 1, total - 1)); }
  function goPrev() { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(s => Math.max(s - 1, 0)); }

  const questions = [
    { q: "What does an intersectional approach to the gender pay gap add that a standard gender pay gap report does not?", options: ["It includes part-time workers in the calculation", "It analyses how race, disability, age, and other identities interact with gender to create compounding pay disparities", "It makes the report a legal requirement for all employers", "It replaces the need for a pay audit"], correct: 1 },
    { q: "Which of the following is an example of pay transparency culture?", options: ["Publishing pay ranges for all roles internally and externally", "Telling employees not to discuss their salaries with colleagues", "Publishing only the headline gender pay gap figure in the annual report", "Setting pay in line with competitor benchmarks"], correct: 0 },
    { q: "Why should exit interview data be included in a pay equity review?", options: ["Because it is a legal requirement under the Equality Act 2010", "Because patterns in who leaves and why can reveal whether marginalised employees face barriers to progression and fair pay that are not visible in workforce data alone", "Because exit interview data is always more accurate than survey data", "Because it reduces the need to conduct a full pay audit"], correct: 1 },
    { q: "What does it mean to link pay equity progress to leadership performance metrics?", options: ["It means executives receive a pay increase when the gender pay gap closes", "It means progress on closing pay disparities is assessed as part of how leaders are evaluated, creating accountability for results", "It means all managers must complete the pay audit themselves", "It means the pay gap figure is included in the annual report without further action"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("gender-pay-gap");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="The Gender Pay Gap: An Intersectional Approach" subtitle="Going beyond the headline figure" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>The gender pay gap is not a single number. The average gap between men and women tells you that a gap exists. It does not tell you which women are most affected, why, or what to do about it. A Black woman, a disabled woman, a woman over 50, and a woman returning from maternity leave may all sit inside the same headline average, each with a very different experience of how gender and pay interact with the rest of who they are. Closing the gap requires understanding it properly: and that means going intersectional.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to understand and apply an intersectional framework to gender pay gap analysis, moving beyond headline averages to identify where disparities are concentrated, why they exist, and what actions are most likely to close them.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why an intersectional approach to the gender pay gap produces more actionable insight than a single-axis analysis",
        "Describe the key steps in conducting an intersectional pay audit",
        "Identify the elements of a pay transparency culture and explain why it matters for closing gaps",
        "Apply accountability mechanisms that connect leadership performance to pay equity progress",
        "Reference the key legal frameworks and industry standards relevant to gender pay equity in the UK",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Intersectionality Changes Everything" /><SlideHeading title="The Limits of a Single Number" /><BodyText>UK gender pay gap reporting legislation requires organisations with 250 or more employees to publish a headline mean and median gender pay gap figure each year. This is a significant step forward in transparency. But it is only the beginning of what organisations need to understand to act effectively.</BodyText><BulletList items={["A headline gender pay gap averages across all employees. It can obscure the fact that Black women face a significantly larger gap than white women, or that disabled women face a larger gap than non-disabled women", "Intersectionality, a term developed by legal scholar Kimberlé Crenshaw, describes how overlapping systems of identity and disadvantage combine to create experiences that are not captured by looking at gender or race or disability alone", "An intersectional pay analysis might reveal: a small mean gender pay gap in a company where Black women are overwhelmingly concentrated in lower-paid roles while white women are well-represented at senior level", "Without intersectional data, interventions can close the headline gap for some groups while leaving the most disadvantaged employees further behind", "Organisations that lead with intersectionality close gaps faster and build more genuinely inclusive cultures"]} /><KeyReminder text="The headline figure tells you a gap exists. Intersectional analysis tells you where it lives, for whom, and why. The second is what action requires." /></div>,

    <div key="s3"><SectionLabel text="Step 1: Collect Pay Data" /><SlideHeading title="Conducting an Intersectional Pay Audit" />
      <StepCard number="1" title="Collate all pay data across all contract types" body="Include base salaries, bonuses, overtime, and benefits for all employees: permanent, fixed-term, part-time, and casual. Gaps often concentrate in contract types that are excluded from headline figures." />
      <StepCard number="2" title="Ensure anonymity and confidentiality" body="Employees must be able to trust that demographic data shared for pay analysis will not be used against them. GDPR compliance and data minimisation are essential." />
      <StepCard number="3" title="Order data across intersecting characteristics" body="Organise by gender, race and ethnicity, disability, sexual orientation, age, and contract type simultaneously. The goal is to see how these dimensions interact, not to examine each in isolation." />
      <StepCard number="4" title="Apply an intersectional lens to your findings" body="Ask: who is in leadership, who is in lower-paid roles, where are the biggest gaps, and which groups at the intersection of multiple characteristics face compounding disadvantage?" />
      <ReflectionBox prompt="Does your organisation currently collect enough demographic data to conduct this kind of audit? If not, what is missing and what would it take to collect it?" />
    </div>,

    <div key="s4"><SectionLabel text="Step 2: Act on What You Find" /><SlideHeading title="Closing Gaps: From Analysis to Action" /><BodyText>Data without action is surveillance. Once pay disparities are identified, the question becomes what to do about them with urgency and specificity.</BodyText><BulletList items={["Identify gaps and budget to close them by the next financial year: not aspirationally, but as a concrete commitment with a named budget", "Consider back pay for employees who have been underpaid relative to colleagues in comparable roles: this is rarely comfortable, and it is the right thing to do", "Audit starting salaries by intersecting characteristics: gaps often originate at the point of hire and compound over time", "Review bonus and overtime distribution: in many organisations, men in higher-paid roles receive disproportionate access to additional pay, widening the gap beyond base salary", "Examine benefits distribution: pension contributions, private healthcare, and other benefits may not be equally available to all contract types", "Appoint a pay equity lead or taskforce with responsibility for monitoring, analysing, and responding to pay gap trends across intersecting identities"]} /></div>,

    <div key="s5"><SectionLabel text="Step 3: Build Pay Transparency" /><SlideHeading title="What Pay Transparency Culture Looks Like" /><BodyText>Pay transparency is not the same as publishing every individual salary. It is about creating the conditions in which pay is understood, fair, and open to challenge when it is not.</BodyText><BulletList items={["Publish pay ranges for all roles, internally and externally: employees and candidates should not have to guess or negotiate blind", "Create safe spaces for staff to share their experiences and flag pay concerns: confidential channels, employee resource groups, and clear grievance processes all contribute", "Support employee resource groups that are funded and influential in policy-making: not a consultation exercise, but a genuine seat at the table", "Share annual pay equity reports internally and externally: where possible, break figures down by marginalised identities rather than publishing only the headline", "Encourage open conversations about pay and progression between all staff: secrecy about pay primarily protects employers, not employees", "Incorporate qualitative insights alongside the numbers: what employees say about pay fairness is data too"]} /><KeyReminder text="Organisations where pay is transparent and openly discussed are less likely to have large unexplained gaps, because there is nowhere for them to hide." /></div>,

    <div key="s6"><SectionLabel text="Step 4: Set Targets" /><SlideHeading title="Developing Targets and Tracking Progress" /><BodyText>Voluntary commitments without targets rarely close gaps. Effective pay equity strategies set specific, time-bound goals with named accountability.</BodyText><BulletList items={["Set goals and KPIs for reducing pay disparities across identity groups: not just the headline gender pay gap, but gaps by race, disability, and intersecting characteristics", "Offer mentoring and sponsorship programmes for underrepresented staff: sponsorship, which involves senior leaders actively advocating for individuals in rooms they are not in, is more effective than mentoring alone at closing progression gaps", "Ensure parental leave, flexible working, and pay transparency policies are inclusive and accessible to all: the motherhood penalty and the fatherhood bonus are real, measurable, and addressable through policy", "Review exit interview data for patterns by marginalised identities: if Black women or disabled employees leave at higher rates, that is evidence of a structural problem, not individual preference", "Conduct regular intersectional pay audits: annually at minimum, with a consistent methodology that allows year-on-year comparison"]} /></div>,

    <div key="s7"><SectionLabel text="Step 5: Embed Accountability" /><SlideHeading title="Holding Leadership Accountable" /><BodyText>Progress on pay equity requires that those with power are held responsible for delivering it. Without accountability mechanisms at leadership level, good intentions do not produce measurable change.</BodyText><BulletList items={["Engage board members and stakeholders in gender pay goals and commitments: pay equity is a governance issue, not just an HR one", "Link progress on pay equity to leadership performance metrics: if closing pay gaps is assessed as part of how leaders are evaluated, it becomes a priority that competes with others, rather than a nice-to-have", "Have leaders share and present report findings annually: public accountability to staff, investors, and the public creates pressure to act", "Hold executives and departments accountable for change: disparities in one part of an organisation should not be averaged away at organisational level without accountability for that team or leader", "Ensure grievance processes are equipped to handle discrimination concerns around pay and progression: employees must have a credible, safe route to challenge pay decisions they believe are discriminatory"]} /><ReflectionBox prompt="In your organisation, who is accountable for pay equity progress? Is that accountability formal and measured, or informal and assumed?" /></div>,

    <div key="s8"><SectionLabel text="Celebrating Progress" /><SlideHeading title="Recognising What Works" /><BodyText>Closing pay gaps is hard, sustained work. Acknowledging progress, recognising good practice, and learning from organisations that are getting it right helps build momentum and sustain commitment.</BodyText><BulletList items={["Celebrate milestones internally: when gaps narrow or targets are met, acknowledge the work that made it happen", "Share examples of good practice publicly: the organisations most cited for pay equity leadership are often those that share their methods, not just their results", "Benchmark against peers and sector leaders: if your gap is shrinking more slowly than comparable organisations, that is useful information", "Recognise the teams and individuals driving progress: pay equity is often unglamorous, detailed work. The people doing it deserve acknowledgement", "Continue to refine your approach: best practice in intersectional pay analysis is developing. What is considered rigorous today may be improved upon in two years. Stay current, stay curious"]} /></div>,

    <div key="s9"><SectionLabel text="Inclusive Policies" /><SlideHeading title="Embedding Equity in Policy" /><BodyText>Pay gaps are not only a product of individual decisions. They are embedded in policies that shape who gets what opportunity, recognition, and reward. Policy design is one of the most powerful levers for closing gaps at scale.</BodyText><BulletList items={["Audit maternity, paternity, and parental leave policies for fairness and inclusivity: enhanced maternity pay with no equivalent paternity provision reinforces gendered caring roles. Shared parental leave that is available but rarely used may need active promotion", "Provide equal access to benefits for part-time and contract workers: pro-rata access is not the same as equal access if the benefit is structured in ways that disadvantage part-time employees", "Ensure flexible working is genuinely available without penalty: informal norms that stigmatise part-time or remote work concentrate in the pay gap over time", "Review pay and grading structures for structural bias: broad pay bands with high managerial discretion are associated with larger gender and race pay gaps than transparent banded structures with clear criteria for progression"]} /></div>,

    <div key="s10"><SectionLabel text="The Data Picture" /><SlideHeading title="What UK Data Tells Us" /><BodyText>Understanding the scale and shape of the gender pay gap in the UK context helps organisations place their own data in context and identify where to focus effort.</BodyText><BulletList items={["The overall UK gender pay gap (median hourly earnings, full-time employees) has been narrowing but remains significant: women earn less than men in most sectors and at most seniority levels", "The ethnicity pay gap intersects substantially with the gender pay gap: Black, Pakistani, and Bangladeshi women face compounding disadvantage that does not appear in a gender-only analysis", "The disability pay gap adds a further layer: disabled women face lower average pay than both non-disabled women and disabled men in many sectors", "The age dimension reveals a motherhood penalty: women's pay typically stagnates or falls in the years following childbirth while men's pay continues to rise over the same period", "Contract type is a major driver: part-time work, disproportionately undertaken by women with caring responsibilities, is associated with lower hourly pay and fewer progression opportunities"]} /><KeyReminder text="The gender pay gap is not a mystery. It is produced by known, measurable structures. Intersectional analysis makes those structures visible so they can be changed." /></div>,

    <div key="s11"><SectionLabel text="The Legal Framework" /><SlideHeading title="Legal Frameworks and Standards" /><BodyText>Gender pay equity in the UK is supported by a range of legal requirements and voluntary frameworks that set minimum expectations and best practice standards.</BodyText><BulletList items={["The Equality Act 2010: prohibits pay discrimination on grounds of sex and other protected characteristics. The equal pay provisions require equal pay for equal work, work of equal value, or work rated as equivalent", "Gender Pay Gap Reporting Regulations 2017: require employers with 250 or more employees to publish specified gender pay gap data annually", "The Public Sector Equality Duty (PSED): requires public bodies to have due regard to equality, including pay equity, in all their functions", "Athena SWAN Charter: a framework recognising commitment to advancing gender equality in higher education and research", "WISE Gender Equity Framework: five pillars covering data, attraction, progression, retention, and engagement, designed to improve gender balance in STEM", "National Equality Standard (NES): sets requirements for evidencing inclusion practice including pay equity analysis for accreditation"]} /></div>,

    <div key="s12">
      <SectionLabel text="Check Your Understanding" /><SlideHeading title="Knowledge Check" />
      {!submitted ? (
        <div>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: "1.5rem" }}>
              <BodyText><strong>Question {qi + 1}:</strong> {q.q}</BodyText>
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.65rem 1rem", marginBottom: "0.4rem", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", background: answers[qi] === oi ? "var(--sage-light)" : "var(--white)", border: answers[qi] === oi ? "2px solid var(--sage-dark)" : "1.5px solid var(--gray-border)", color: "var(--charcoal)" }}>{opt}</button>
              ))}
            </div>
          ))}
          <button onClick={handleQuizSubmit} disabled={answers.some(a => a === null)} style={{ marginTop: "0.5rem", padding: "0.75rem 2rem", background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, opacity: answers.some(a => a === null) ? 0.5 : 1 }}>Submit Answers</button>
        </div>
      ) : (
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--sage-dark)", marginBottom: "1rem" }}>You scored {score} out of {questions.length}</p>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: answers[qi] === q.correct ? "var(--sage-xlight)" : "#fff5f5", border: `1px solid ${answers[qi] === q.correct ? "var(--sage-dark)" : "#f5a0a0"}` }}>
              <BodyText small><strong>Q{qi + 1}:</strong> {q.q}</BodyText>
              <BodyText small>Correct answer: <strong>{q.options[q.correct]}</strong></BodyText>
            </div>
          ))}
          <button onClick={goNext} style={{ marginTop: "0.5rem", padding: "0.75rem 2rem", background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600 }}>See Takeaways</button>
        </div>
      )}
    </div>,

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="The Gender Pay Gap: An Intersectional Approach" /><BulletList items={["The headline gender pay gap is a starting point, not a destination: intersectional analysis reveals where the gap is concentrated and for whom", "Pay gaps are produced by known, measurable structures: starting salaries, bonus distribution, contract types, progression rates, and parental leave policies all contribute", "Pay transparency is a gap-closing mechanism: organisations where pay is openly discussed are less able to sustain unjustified disparities", "Targets without accountability are aspirations: connecting leadership performance metrics to pay equity progress converts intention into action", "An intersectional pay audit examines race, disability, age, contract type, and other characteristics alongside gender: a gender-only analysis misses the compounding disadvantage faced by women with multiple marginalised identities"]} /><ReflectionBox prompt="What is the most significant gap in your organisation's approach to gender pay equity? Is it in data, transparency, targets, accountability, or policy?" subPrompts={["Do you know where your pay gaps are concentrated within your workforce, or only what the headline figure is?", "What would change if pay equity progress were formally included in how senior leaders are assessed?"]} /><KeyReminder text="Closing the gender pay gap is not complicated in principle: collect the right data, act on what you find, be transparent about progress, and hold leadership accountable. The challenge is the commitment to do all four, consistently, over time." /></div>,
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "1.25rem", padding: "2.5rem 2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", opacity: 0.6 }}>Slide {slide + 1} of {total}</span>
              <button onClick={readSlide} style={{ background: "none", border: "1px solid var(--gray-border)", borderRadius: "0.4rem", padding: "0.25rem 0.65rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)" }}>{ttsActive ? "⏹ Stop" : "🔊 Listen"}</button>
            </div>
            <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "2px" }}>
              <div style={{ height: "100%", background: "var(--sage-dark)", borderRadius: "2px", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>
          <div id="slide-content-area">{slides[slide]}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--gray-border)" }}>
            <button onClick={goPrev} disabled={slide === 0} style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", border: "1.5px solid var(--gray-border)", background: "var(--white)", cursor: slide === 0 ? "default" : "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: slide === 0 ? "var(--gray-border)" : "var(--charcoal)", opacity: slide === 0 ? 0.4 : 1 }}>← Previous</button>
            <div style={{ display: "flex", gap: "0.4rem" }}>{Array.from({ length: total }).map((_, i) => <button key={i} onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); setSlide(i); }} style={{ width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", background: i === slide ? "var(--sage-dark)" : "var(--gray-border)", padding: 0 }} />)}</div>
            {slide < total - 1 ? <button onClick={goNext} style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", border: "none", background: "var(--sage-dark)", color: "var(--white)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600 }}>Next →</button> : <Link href="/dashboard/learn" style={{ padding: "0.55rem 1.25rem", borderRadius: "0.5rem", background: "var(--sage-dark)", color: "var(--white)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600 }}>Done ✓</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
