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
function StrategyCard({ number, title, body, example }: { number: string; title: string; body: string; example: string }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "0.85rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--sage-dark)", minWidth: "1.5rem" }}>{number}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--charcoal)", margin: "0 0 0.35rem", lineHeight: 1.4 }}>{title}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.55, margin: "0 0 0.35rem" }}>{body}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--sage-dark)", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>Example: {example}</p>
        </div>
      </div>
    </div>
  );
}

export default function RetentionLesson() {
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
    { q: "What does equitable access to leadership development require, beyond simply making programmes available to all?", options: ["Promoting everyone at the same rate regardless of performance", "Actively tracking who is accessing development and sponsoring underrepresented employees into opportunities", "Removing all leadership programmes to avoid bias", "Letting employees self-select into any programme they choose"], correct: 1 },
    { q: "Which of the following best describes psychological safety in the workplace?", options: ["Employees feeling they will never be criticised for any reason", "Employees feeling safe to speak up, share ideas, and take risks without fear of retribution", "A formal HR policy on workplace conduct", "A workplace where all conflict is avoided"], correct: 1 },
    { q: "Why should recognition and reward systems be made transparent?", options: ["To make it easier to give the same award to everyone", "To ensure all achievements are acknowledged consistently regardless of who the employee is or who their manager is", "To reduce the number of employees eligible for recognition", "To make the process faster and less administrative"], correct: 1 },
    { q: "Why is retention data most useful when broken down by demographic group?", options: ["Because demographic data is always more accurate than aggregate data", "Because overall retention rates can mask significantly higher departure rates from particular groups, which points to an inequitable culture", "Because it is a legal requirement to report retention by demographic", "Because individual managers prefer to see data broken down this way"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("retention");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Retention That Works: Keeping an Inclusive Workforce" subtitle="Building the conditions where diverse talent chooses to stay" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>Hiring for diversity and then losing people because the culture does not include them is one of the most common and costly failures in EDI work. Retention is where inclusion is tested every single day: in who gets recognised, who gets developed, who feels safe to speak up, and who gets to lead. This lesson is about building the conditions where everyone can stay and thrive, not just the people who already feel at home.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you with seven evidence-based retention strategies that build a workplace where all employees, including those from underrepresented groups, feel valued and choose to stay.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Explain why inclusive retention requires more than competitive salaries and standard benefits",
        "Apply seven practical strategies for building psychological safety, equitable development, and fair recognition",
        "Identify where retention barriers are most likely to affect employees from underrepresented groups",
        "Design systems for gathering and acting on employee feedback in a way that builds trust",
        "Recognise the link between retention data and inclusion: who leaves, and why, is organisational intelligence",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Why Retention Matters for Inclusion" /><SlideHeading title="The Cost of Losing Diverse Talent" /><BodyText>Inclusion efforts that focus only on recruitment miss the point. Organisations that hire diverse teams but have not built an inclusive culture will lose that talent, often within two to three years, and will struggle to understand why.</BodyText><BulletList items={["Research estimates the cost of replacing an employee at between 50% and 200% of annual salary, accounting for recruitment, onboarding, lost productivity, and team disruption", "Employees from underrepresented groups often leave because of accumulated experiences of being excluded, overlooked, or unsupported, rather than because of a single event", "The organisation that retains its diverse talent builds institutional knowledge, psychological safety, and a reputation that attracts more diverse candidates", "Retention is a signal: if certain groups leave at higher rates, that is evidence of an inequitable culture, not coincidence"]} /><KeyReminder text="Recruiting for diversity without retaining it is a leaking bucket. Inclusion is the thing that keeps people in." /></div>,

    <div key="s3"><SectionLabel text="Strategy 1" /><SlideHeading title="Build Psychological Safety" /><BodyText>Psychological safety is the belief that you can speak up, share ideas, disagree, or make a mistake without being punished or humiliated. It is one of the strongest predictors of team performance and individual retention, and one of the most inequitably distributed experiences in most organisations.</BodyText><BulletList items={["Employees from underrepresented groups consistently report lower psychological safety than their peers: they speak up less, hold back ideas more often, and are more likely to leave when this is unaddressed", "Psychological safety is built through behaviour, not policy: leaders who model vulnerability, invite challenge, and respond constructively to dissent create it; those who dismiss, ignore, or punish it destroy it", "Structural changes help: rotating who leads discussions, offering multiple contribution formats, and building in asynchronous input so all communication styles are valued"]} /><ReflectionBox prompt="Does everyone in your team feel equally safe to speak up, disagree, or raise concerns? How do you know?" /></div>,

    <div key="s4"><SectionLabel text="Strategy 2" /><SlideHeading title="Offer Equitable Leadership Opportunities" /><BodyText>Access to development, mentorship, sponsorship, and progression is not equally distributed in most organisations. It tends to flow through existing networks, which often exclude people from underrepresented groups.</BodyText>
      <StrategyCard number="" title="What equitable access looks like in practice:" body="Tracking who is accessing development programmes, who is being promoted, and who is being assigned high-visibility projects, then actively intervening where patterns show inequity." example="Pair emerging leaders from underrepresented groups with senior mentors who can advocate for them in succession conversations. Rotate project leads to ensure stretch opportunities are distributed fairly rather than defaulting to the usual names." />
      <BulletList items={["Sponsorship is not the same as mentorship: a mentor advises, a sponsor advocates. Employees from underrepresented groups often have mentors but lack sponsors, which limits their progression", "Without deliberate monitoring, high-visibility opportunities cluster around people who already feel confident claiming them, which tends to exclude those who feel less psychologically safe"]} /></div>,

    <div key="s5"><SectionLabel text="Strategy 3" /><SlideHeading title="Foster an Inclusive Culture" /><BodyText>Culture is not a value on a website. It is the accumulated experience of everyone who works somewhere: whether they feel seen, whether their contributions are acknowledged, whether they can be themselves at work without it costing them professionally.</BodyText><BulletList items={["Embed inclusion into everyday practices rather than reserving it for dedicated training days or awareness months: how meetings are run, how decisions are made, how conflict is handled", "Celebrate diverse perspectives explicitly: when different viewpoints shape a decision, say so. When someone raises an uncomfortable truth that turns out to be right, acknowledge it", "Watch for the subtle signals that communicate who this workplace is really for: whose names are pronounced correctly, whose cultural events are recognised, who is asked to represent the team on visible projects"]} /><ReflectionBox prompt="Think about the daily experience of working in your team or organisation. Who would feel most comfortable there, and why? Who might not, and why?" /></div>,

    <div key="s6"><SectionLabel text="Strategy 4" /><SlideHeading title="Provide Professional Growth and Development" /><BodyText>Investment in individual growth is one of the strongest drivers of retention across all employee groups. When it is equitably provided, it also signals that the organisation sees a future for the person and values their contribution.</BodyText><BulletList items={["Personalised development matters: a one-size-fits-all training programme misses what individual employees actually need to grow. Work with employees to identify their goals, strengths, and preferred learning styles", "Options matter as much as access: shadowing, short courses, stretch projects, coaching, and peer learning all serve different people differently. Offering only one format excludes those for whom it does not work", "Development conversations should happen regularly, not only at annual review: by the time a leaver cites lack of development opportunity, the organisation has usually been signalling indifference to their growth for months"]} /><KeyReminder text="People do not leave organisations that are visibly investing in their future. They leave organisations that have stopped noticing them." /></div>,

    <div key="s7"><SectionLabel text="Strategy 5" /><SlideHeading title="Support Work-Life Balance and Flexibility" /><BodyText>Flexible working is an inclusion issue, not just a wellbeing benefit. Employees with disabilities, caring responsibilities, religious observance needs, or health conditions are disproportionately affected by inflexible working arrangements, and disproportionately likely to leave when those arrangements cannot be accommodated.</BodyText><BulletList items={["Flexible working should be a genuine offer, not a theoretical one: cultures that informally penalise those who use flexibility (by excluding them from visibility, development, or recognition) negate the policy", "Accommodations for parents, carers, disabled employees, and those with long-term health conditions should be offered proactively and reviewed regularly, not granted once and forgotten", "Burnout disproportionately affects employees who already carry additional invisible loads at work: the emotional labour of navigating exclusion, the tax of being a visible minority, the weight of representing a whole community"]} /><ReflectionBox prompt="Are flexible working arrangements genuinely available to everyone in your team? Do those who use them experience any informal penalties?" /></div>,

    <div key="s8"><SectionLabel text="Strategy 6" /><SlideHeading title="Recognise and Reward Contributions Fairly" /><BodyText>Recognition is one of the most inequitably distributed aspects of organisational life. Research consistently shows that employees from underrepresented groups receive less credit for their contributions, are more likely to see their ideas attributed to others, and are recognised less frequently by the kind of visibility that drives career progression.</BodyText><BulletList items={["Transparent recognition frameworks reduce the scope for personal preference and unconscious bias: when managers must document the criteria used to nominate employees for awards or advancement, it creates accountability", "Standardised processes do not mean bureaucratic ones: the point is that the basis for recognition is visible, consistent, and contestable, not that it requires excessive paperwork", "Watch for patterns: if the same people are consistently nominated for awards, if the same team is always celebrated, if recognition clusters around particular demographics, that is data"]} /><KeyReminder text="When the same people are always recognised, it is rarely because they are always the most deserving. It is usually because the system is not designed to see everyone." /></div>,

    <div key="s9"><SectionLabel text="Strategy 7" /><SlideHeading title="Act on Feedback and Engagement Surveys" /><BodyText>Gathering employee feedback is not the same as using it. Many organisations run annual engagement surveys, produce a slide deck of findings, and then make no visible changes. This is worse than not asking, because it demonstrates that the organisation does not consider employees' experiences worth acting on.</BodyText><BulletList items={["Act on at least one or two findings from every survey cycle and communicate what changed: 'We heard X from our engagement survey; here is what we did'", "Follow up surveys with focus groups to understand the texture of what the data is showing: numbers tell you what, conversations tell you why", "Analyse engagement data by demographic group, not just in aggregate: overall satisfaction scores can mask significant disparities in experience between groups"]} /><ReflectionBox prompt="When did your organisation last run an engagement survey? What changed as a result, and did you tell staff what changed?" /></div>,

    <div key="s10"><SectionLabel text="Retention Data" /><SlideHeading title="Using Retention Data as Inclusion Intelligence" /><BodyText>Retention data is one of the most powerful and most underused sources of inclusion intelligence available to organisations. Who stays, who leaves, and who progresses tells you more about your culture than almost any other metric.</BodyText><BulletList items={["Track attrition by demographic group: overall retention rates can look healthy while concealing significantly higher departure rates from women, employees of colour, disabled employees, or other groups", "Track time-to-attrition: employees from underrepresented groups who leave often do so earlier in their tenure, signalling that the onboarding period and early experience are where inclusion is failing", "Correlate retention data with engagement survey scores, exit interview themes, and development access: patterns across multiple data sources tell a far more reliable story than any single metric", "Report retention data to leadership and governance bodies with demographic disaggregation: if the board only sees the overall number, they cannot see the problem"]} /></div>,

    <div key="s11"><SectionLabel text="Putting It Together" /><SlideHeading title="Designing an Inclusive Retention Strategy" /><BodyText>The seven strategies in this lesson are most powerful when they work together as a system rather than as separate interventions. Psychological safety enables people to flag development needs. Equitable development feeds fair recognition. Acting on feedback builds the trust that makes people stay.</BodyText><BulletList items={["Start with a retention audit: who is leaving, when, from which teams, and from which demographic groups? Let the data tell you where to prioritise", "Identify the one or two drivers of departure that appear most strongly in your exit data and focus there first: scattered interventions across all seven strategies simultaneously is less effective than sustained focus on the highest-impact areas", "Involve employees in designing retention initiatives: the people most affected by gaps in inclusion have the clearest view of what is missing and what would help", "Review retention strategy annually alongside exit interview data, engagement survey results, and demographic attrition rates"]} /><ReflectionBox prompt="Which of the seven retention strategies is most underdeveloped in your organisation right now? What would it take to strengthen it?" subPrompts={["Psychological safety; equitable development; inclusive culture; professional growth; flexibility; recognition; acting on feedback"]} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Retention That Works: Keeping an Inclusive Workforce" /><BulletList items={["Inclusive retention requires more than competitive pay: it requires psychological safety, equitable development, flexible working, fair recognition, and a culture where everyone can see a future for themselves", "Retention barriers disproportionately affect employees from underrepresented groups: the same culture that feels comfortable to some feels exclusionary to others", "Sponsorship, not just mentorship, is what moves underrepresented employees into leadership: advocates who speak for them when they are not in the room", "Employee feedback is only useful if it leads to visible change: tell people what you did with what they said", "Retention data disaggregated by demographic group is one of the most powerful tools for identifying where inclusion is failing"]} /><ReflectionBox prompt="What is the one retention strategy you will commit to strengthening in the next 90 days?" subPrompts={["What data do you have that tells you where retention is weakest in your organisation?", "Who else needs to be involved in designing a response?", "How will you measure whether the change has made a difference?"]} /><KeyReminder text="The goal is not to make people grateful they were hired. It is to build a workplace where everyone can do their best work and see their future." /></div>,
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
