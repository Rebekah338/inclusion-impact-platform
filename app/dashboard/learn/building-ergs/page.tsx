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
function BodyText({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: small ? "0.9rem" : "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>{children}</p>;
}
function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.75rem" }}>{text}</p>;
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
function CheckCard({ category, items }: { category: string; items: string[] }) {
  return (
    <div style={{ border: "1.5px solid var(--gray-border)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem", marginBottom: "0.75rem" }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.92rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>{category}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>{items.map((item, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", marginBottom: "0.3rem", lineHeight: 1.5 }}>{item}</li>)}</ul>
    </div>
  );
}

export default function BuildingERGsLesson() {
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
    { q: "Why should ERG participation be voluntary?", options: ["To reduce the cost to the organisation", "Because legal frameworks require voluntary structures", "To ensure that membership reflects genuine interest rather than obligation based on identity", "To make it easier for HR to manage participation records"], correct: 2 },
    { q: "What is a key risk of ERGs that are not connected to wider organisational equity goals?", options: ["They may be too popular and difficult to manage", "They become siloed spaces that do not influence systemic change and can create the impression of inclusion without the substance", "They are harder to report on in annual diversity statistics", "They require more budget allocation than connected ERGs"], correct: 1 },
    { q: "Why is it important to recognise ERG leadership as work rather than volunteerism?", options: ["It is required by the Worker Protection Act 2023", "Because ERG leaders are often from marginalised groups who are already navigating additional barriers; unrecognised labour compounds that inequity and drives burnout", "Because it makes ERGs easier to dissolve if they are underperforming", "To ensure ERG budgets are tracked in departmental accounts"], correct: 1 },
    { q: "What does it mean to amplify voices within ERGs without pressure to share trauma?", options: ["Ensuring all ERG sessions are recorded for the wider organisation", "Creating space for members to share their experiences, while making it clear that no one is obligated to explain, justify, or perform their identity for others", "Inviting ERG members to speak at all-staff events about their personal experiences", "Removing difficult topics from ERG agendas to protect members"], correct: 1 },
  ];

  function handleQuizSubmit() {
    let s = 0;
    answers.forEach((a, i) => { if (a === questions[i].correct) s++; });
    setScore(s); setSubmitted(true); markCompleted("building-ergs");
  }

  const slides = [
    <div key="s1">
      <SlideHeading title="Building ERGs That Work" subtitle="Foundations, governance, and practice for effective employee resource groups" />
      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>Opening thought:</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>At their best, Employee Resource Groups are one of the most powerful tools an organisation has for building genuine inclusion: they create communities of belonging, surface underrepresented perspectives, and connect lived experience to organisational strategy. At their worst, they become places where marginalised employees are overburdened with unpaid advocacy work, where the organisation claims credit for diversity it did not create, and where tokenism is dressed as progress. The difference lies entirely in how ERGs are designed, resourced, and connected to real power.</p>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "0 0 0.5rem" }}>🎯 Learning Objective:</p>
      <BodyText>This lesson will equip you to design, establish, or review an ERG that is genuinely inclusive, properly resourced, connected to organisational strategy, and built on equity principles rather than representation optics.</BodyText>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📖 Learning Outcomes: by the end of this lesson you will be able to:</p>
      <BulletList items={[
        "Describe the foundations and purpose of an effective ERG and distinguish it from a tick-box initiative",
        "Identify the key governance and leadership structures that make ERGs sustainable and equitable",
        "Apply principles of accessibility, psychological safety, and intersectionality to ERG design",
        "Explain how to resource ERGs appropriately, including compensation, budget, and leadership recognition",
        "Describe how to measure ERG impact and connect it to organisational equity goals",
      ]} />
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", margin: "1rem 0 0.5rem" }}>📋 Guidelines:</p>
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </div>,

    <div key="s2"><SectionLabel text="Foundations" /><SlideHeading title="Purpose and Foundations" /><BodyText>An ERG without a clear purpose is an event calendar, not a change mechanism. Before anything else, the purpose must be defined and connected to real organisational power.</BodyText><BulletList items={["A clear mission goes beyond representation: the most effective ERGs have explicit aims around advocacy, education, and systemic change, not just community or social connection", "ERGs must be connected to wider organisational equity and inclusion goals: an ERG that exists in isolation from strategy, policy, and leadership does not produce systemic change. It produces a feeling of inclusion while the systems remain unchanged", "The ERG should have genuine influence: this means real channels to leadership, a route for recommendations to reach decision-makers, and visible evidence that ERG input has shaped policy", "Participation should be voluntary: no employee should feel obligated to join an ERG based on their identity. An ERG whose membership is drawn by identity pressure rather than genuine interest quickly becomes a space where marginalised employees perform their identities for the organisation's benefit"]} /><ReflectionBox prompt="Does your organisation have ERGs? If so, what is their stated purpose? Do they have a genuine channel to leadership, or do they operate in isolation from strategic decisions?" /></div>,

    <div key="s3"><SectionLabel text="Membership" /><SlideHeading title="Membership and Belonging" /><BodyText>Who can join, how they join, and how they are made to feel once they are there are all decisions that determine whether an ERG produces genuine belonging or another layer of exclusion.</BodyText><BulletList items={["All members should feel welcome, particularly those with intersectional identities: an LGBTQ+ ERG that is unwelcoming to Black LGBTQ+ members has reproduced the same dynamics it exists to challenge", "Provide anonymous joining options: some employees are not out, not yet ready to disclose a disability, or concerned about how membership would affect their career. Anonymous joining options remove a significant barrier", "Compensation for time and work should be explicit: ERG members, especially those whose work contributes to organisational equity strategy, should be formally recognised and compensated. The expectation of free labour from marginalised employees is a form of structural inequity", "Create psychological safety through clear community agreements: agreements on confidentiality, respect, and boundaries give members the confidence to engage honestly rather than guardedly"]} /><KeyReminder text="An ERG is not a gift the organisation gives to underrepresented staff. It is a structure that, if well designed, gives underrepresented staff genuine influence over the organisation that affects their working lives." /></div>,

    <div key="s4"><SectionLabel text="Governance" /><SlideHeading title="Leadership and Governance" /><BodyText>ERG leadership is not a voluntary side project. It is organisational work that shapes culture and policy, and it needs to be designed and recognised as such.</BodyText><CheckCard category="Leadership structure" items={["Avoid overburdening one person, especially from a marginalised group: rotate roles and distribute responsibilities across a leadership team", "Formally recognise leaders by writing the ERG role into job descriptions and performance reviews: this makes the contribution visible and countable", "Recognise ERG leadership as work, not volunteerism: provide compensation, stipends, or workload adjustments to make it sustainable", "ERG leaders should have a senior leader advocate with genuine influence: not a symbolic sponsor but someone who actively champions the ERG's recommendations to decision-makers"]} /><BulletList items={["Governance documents provide structure and continuity: a clear terms of reference, role definitions, and decision-making process means the ERG can continue across leadership transitions", "Put in place safe reporting channels: ERG members should know how to escalate concerns without fear of retaliation or damage to their professional standing", "Allies should actively take responsibility for their own learning and not rely on ERG members to educate them: this is a governance principle as much as a cultural one"]} /></div>,

    <div key="s5"><SectionLabel text="Meetings and Events" /><SlideHeading title="Running Accessible and Effective Meetings" /><BodyText>The design of ERG meetings and events signals the organisation's real commitment to inclusion. Inaccessible meetings reproduce the same barriers the ERG exists to address.</BodyText><BulletList items={["Prioritise accessibility as a default, not an afterthought: use captions, sign language interpreters, hybrid options, accessible venues, and sensory-friendly design as standard", "Rotate meeting times to suit different time zones, caring responsibilities, and personal circumstances: a meeting that is always at 6pm excludes parents; one that is always during core hours excludes part-time and shift workers", "Have a variety of meeting formats: workshops, social events, and focused discussions serve different purposes and make the ERG accessible to members with different preferences and capacities", "Support intersectional collaboration by facilitating joint sessions across ERGs: single-issue siloed ERGs miss the compounding experiences of members with multiple marginalised identities", "Ensure events are educational and not reduced to stereotypes or appropriation: celebrating a cultural moment in ways that reduce a community's culture to surface-level performance is not inclusion"]} /><ReflectionBox prompt="Think about the accessibility of meetings in your current ERG or the ERGs you are aware of. What barriers exist? Who is systematically excluded by current timing, format, or location?" /></div>,

    <div key="s6"><SectionLabel text="Communication" /><SlideHeading title="Communications and Visibility" /><BodyText>How an ERG communicates internally and externally shapes both member engagement and the organisation's broader understanding of what the ERG does and why it matters.</BodyText><BulletList items={["Use multiple communication channels: email, intranet, messaging platforms, and physical notices reach different staff. A single channel approach excludes everyone outside it", "Use clear, inclusive, jargon-free language that does not assume prior knowledge: not everyone who joins or considers joining an ERG has existing literacy in inclusion terminology", "Share ERG goals, actions, and wins with the wider organisation: transparency about what the ERG is doing and achieving builds understanding, credibility, and support", "Amplify voices within ERGs without pressure to share trauma: create space for members to share experiences without requiring them to justify or perform their identity for an external audience", "Ensure transparency about how ERG input is used: members who see that their contributions shaped a policy or decision are more likely to continue contributing. Members who see their input disappear without trace disengage"]} /></div>,

    <div key="s7"><SectionLabel text="Resourcing" /><SlideHeading title="Support and Resourcing" /><BodyText>The resources an organisation allocates to ERGs are a direct expression of how seriously it takes them. Underfunded ERGs produce underpowered change.</BodyText><BulletList items={["Ensure dedicated budget allocation: ERGs need funding for events, training, guest speakers, and accessibility provisions. An ERG expected to run on good will and free time is being set up to fail", "Train ERG leaders: equip them in facilitation skills, trauma-informed approaches, advocacy, and conflict resolution. Leadership training is not a luxury; it is what makes ERG leadership sustainable", "Ensure multiple staff support scheduling and communications: when one person carries all administrative functions, burnout is inevitable and continuity is at risk", "Promote financial equity: all ERG events should be free to attend and should not require personal expenditure on travel, food, or materials. Costs borne by members create a barrier that disproportionately affects those with least financial flexibility", "Build rest into the design: members from marginalised groups may carry heavier emotional loads. ERG structures should build in space rather than expect constant output"]} /></div>,

    <div key="s8"><SectionLabel text="Inclusion Practices" /><SlideHeading title="Inclusion and Equity Within the ERG" /><BodyText>An ERG that reproduces exclusionary dynamics within its own structure is undermining its purpose. Inclusive design applies inside the group as much as outside it.</BodyText><BulletList items={["Support anonymous involvement: members who are not out, not ready to disclose, or concerned about the professional implications of visible ERG membership need low-visibility participation options", "Incorporate regular anti-bias audits: check that the ERG itself is not replicating exclusionary dynamics in its leadership, communications, or event design", "Always acknowledge multiple identities and intersectionality: ensure the ERG does not operate as if all its members share a single, homogeneous experience", "Explicitly prohibit discrimination, tokenism, and appropriation within the ERG: state these expectations clearly in community agreements and enforce them", "Respect lived experience: ERGs should not become spaces where marginalised staff are expected to explain their experiences repeatedly for the benefit of others"]} /><ReflectionBox prompt="If you have access to an existing ERG, how does it handle intersectionality within its membership? Does it have explicit anti-discrimination norms? Are these enforced?" /></div>,

    <div key="s9"><SectionLabel text="Impact" /><SlideHeading title="Impact Measurement and Long-Term Sustainability" /><BodyText>ERGs that cannot demonstrate their impact lose funding, credibility, and eventually members. Impact measurement should be built in from the start, not added as an afterthought when the ERG is asked to justify its existence.</BodyText><CheckCard category="Impact and measurement" items={["Track participation: measure numbers and community identities over time to identify who is and is not joining", "Impact reporting: highlight ERG influence on policy changes, recruitment outcomes, and workplace culture to give the ERG's work visible weight", "Review unintended consequences: check regularly whether ERGs are reinforcing silos, overburdening marginalised staff, or creating 'otherness' through their very existence"]} /><CheckCard category="Long-term sustainability" items={["Archive knowledge: document ERG activities, guides, and resources so they are not lost when leadership changes", "ERG work should be a recognised pipeline for promotion and leadership: the skills developed are genuine leadership competencies", "ERG leaders should engage in ongoing education about inclusion, power, and equity: leadership development is a continuous need", "Put in place regular feedback loops to check if the ERG is safe, effective, and inclusive: the ERG serves its members; their assessment of whether it is working should drive its direction"]} /></div>,

    <div key="s10"><SectionLabel text="Common Risks" /><SlideHeading title="What Makes ERGs Fail" /><BodyText>Understanding the most common reasons ERGs fail to produce genuine inclusion helps leaders design better from the start and course-correct when they identify these patterns.</BodyText><BulletList items={["Tokenism: using ERG membership statistics or existence to claim inclusion without doing the systemic work is one of the most common and damaging patterns. It builds cynicism among the people the organisation most needs to trust it", "Overburdening marginalised staff: when ERGs rely entirely on the unpaid extra labour of underrepresented employees, they compound the inequity they claim to address. This is both unethical and unsustainable", "Siloing: ERGs that operate in isolation from strategy, HR, and leadership produce no systemic change. Community without influence is not inclusion", "Trauma performance: creating implicit expectations that members share difficult personal experiences to educate colleagues or leadership is harmful. Marginalised employees are not resources for the majority's learning", "Ally passivity: when allies join ERGs and expect to be educated by marginalised members rather than taking responsibility for their own learning, the burden of the group falls on those who already carry the most"]} /><KeyReminder text="An ERG that exists to make the organisation look inclusive without giving underrepresented employees genuine influence is worse than no ERG. It provides cover for inaction while extracting labour from those with the least power." /></div>,

    <div key="s11"><SectionLabel text="Legal Framework" /><SlideHeading title="Legal and Standards Framework" /><BodyText>ERGs operate within a legal and professional framework that provides both the mandate and the minimum standard for inclusive practice.</BodyText><BulletList items={["Equality Act 2010: protects individuals from discrimination based on protected characteristics. ERG design must not inadvertently discriminate and should actively support the organisation's equitable treatment of all staff", "Public Sector Equality Duty (PSED): public sector organisations must have due regard to advancing equality. ERGs can be a mechanism for evidencing that due regard", "Worker Protection (Amendment of Equality Act 2010) Act 2023: imposes a proactive duty on employers to prevent sexual harassment. ERGs can support this duty by creating informed, engaged, and empowered staff communities", "PAS 1948 and BS ISO 30415:2021: professional standards for inclusive workplace culture that cover how ERGs and affinity networks should be structured and supported", "CIPD guidance on building inclusive workplaces: research-based recommendations for what makes workplace inclusion effective, including the role of ERGs in culture and leadership"]} /></div>,

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

    <div key="s13"><SectionLabel text="Takeaways" /><SlideHeading title="Key Takeaways" subtitle="Building ERGs That Work" /><BulletList items={["An ERG without genuine influence is not inclusion: it is a space that creates the appearance of belonging while the systems that produce inequity remain unchanged", "Voluntary, compensated, and formally recognised participation is the baseline: unpaid, obligatory, or invisible ERG work reproduces the inequities it claims to address", "Intersectionality must be designed in from the start: ERGs that treat their members as a homogeneous group miss the most important dynamics and exclude those with multiple marginalised identities", "Allies are responsible for their own learning: ERG members are not a free educational resource. A well-designed ERG makes this explicit and enforces it", "Impact measurement closes the accountability loop: ERGs that cannot demonstrate their influence on policy, culture, and progression lose credibility and eventually funding"]} /><ReflectionBox prompt="If you were designing an ERG from scratch tomorrow, what would you do differently from the ERGs you have seen or experienced? What would you prioritise first?" subPrompts={["What would the purpose statement say?", "How would you compensate and recognise leaders?", "What would success look like at six months?"]} /><KeyReminder text="The most effective ERGs are not supplementary to inclusion strategy. They are part of the infrastructure through which inclusion becomes real and measurable." /></div>,
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
