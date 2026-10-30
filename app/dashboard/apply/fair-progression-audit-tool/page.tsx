"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Step = "prepare" | "gather" | "audit" | "interpret" | "act";

const STEPS: { key: Step; label: string; icon: string; tagline: string }[] = [
  { key: "prepare",   label: "1. Prepare",     icon: "📋", tagline: "Set scope, define terms, assemble the team" },
  { key: "gather",    label: "2. Gather data",  icon: "📊", tagline: "What to collect and where to find it" },
  { key: "audit",     label: "3. Run the audit",icon: "🔍", tagline: "The questions to ask of your data" },
  { key: "interpret", label: "4. Interpret",    icon: "💡", tagline: "What findings mean and common explanations" },
  { key: "act",       label: "5. Act",          icon: "🎯", tagline: "Turning findings into change" },
];

type CheckItem = { id: string; text: string; detail?: string };
type StepContent = { heading: string; intro: string; checks: CheckItem[] };

const STEP_CONTENT: Record<Step, StepContent> = {
  prepare: {
    heading: "Prepare your audit",
    intro: "A fair progression audit is only as good as its scope. Before you collect a single data point, be clear about what you are auditing, who is included, what time period you are examining, and who needs to be involved.",
    checks: [
      { id: "p1", text: "Define the time period", detail: "Typically 3 years of promotion and progression data. Shorter periods may produce too few events to be meaningful; longer periods may include policy changes that make comparison difficult." },
      { id: "p2", text: "Define what counts as progression", detail: "Promotion to a higher grade is the most visible form. Also consider: movement within a pay band, access to development opportunities, secondment or project leadership, performance rating distribution, and access to bonus." },
      { id: "p3", text: "List the population groups you will analyse", detail: "At minimum: gender, ethnicity (at the most granular level your data allows), disability status, age. If you have data on socioeconomic background or caring responsibilities, include those too." },
      { id: "p4", text: "Identify your reference group", detail: "Usually: white non-disabled men in the same grade or role family. This is not because that group is the norm, but because it is typically the group with the highest progression rates and provides the clearest benchmark for identifying gaps." },
      { id: "p5", text: "Assemble your audit team", detail: "Include HR data, line management representation, a senior sponsor, and at least one person with lived experience of navigating progression as someone from an underrepresented group. Their qualitative insight into what the data means is not optional." },
      { id: "p6", text: "Agree a minimum cell size", detail: "Typically n = 10. Below this, individual identification becomes possible; above this, patterns are usually meaningful. Agree in advance that you will flag small cell sizes as 'insufficient data' rather than suppressing them from discussion." },
    ],
  },
  gather: {
    heading: "Gather your data",
    intro: "Progression data sits across multiple HR systems. You will likely need to pull from your HRIS, your performance management system, your learning and development records, and your recruitment and promotion records. This section tells you what to look for in each.",
    checks: [
      { id: "g1", text: "Pull promotion records", detail: "For each promotion in the period: employee ID (anonymised), date, from grade, to grade, role family, demographic characteristics. This is your primary dataset." },
      { id: "g2", text: "Calculate progression rates by group", detail: "Number promoted as a proportion of those eligible (defined as: in role for minimum eligibility period). Do this for each demographic group separately." },
      { id: "g3", text: "Pull performance rating distributions", detail: "Ratings often gate progression. If certain groups receive lower ratings consistently, that will suppress their promotion rates even if the promotion process itself is fair. Analyse rating distributions by group before you analyse promotion rates." },
      { id: "g4", text: "Pull access to development", detail: "Participation in formal development programmes, high-potential schemes, mentoring, sponsorship, stretch projects, and secondments. Disaggregate by group." },
      { id: "g5", text: "Pull leaver data", detail: "Who is leaving, at what grade, and from which groups? High attrition among specific groups at specific grades often signals a progression barrier: if people leave instead of progressing, the promotion rate understates the pipeline loss." },
      { id: "g6", text: "Pull starting grade and salary data", detail: "People who enter at a lower grade or lower point in a pay band face a structural disadvantage in progression. Check whether certain groups are systematically offered lower starting points." },
      { id: "g7", text: "Record data coverage", detail: "Note what proportion of each characteristic is declared in your data. Gaps in coverage should be reported alongside findings: 'we analysed the 65% of our workforce for whom ethnicity data is available.'" },
    ],
  },
  audit: {
    heading: "Run the audit",
    intro: "These are the questions to ask of your data, in order. Work through them systematically. For each finding, note the size of the gap, whether it is statistically meaningful at your sample size, and whether it is better, worse, or the same as last year.",
    checks: [
      { id: "a1", text: "What is the overall promotion rate, by group?", detail: "For each demographic group, calculate: number promoted divided by number eligible. Compare to your reference group. A gap of 5 percentage points or more is typically significant, though this depends on your sample size." },
      { id: "a2", text: "Does the gap differ by grade?", detail: "Gaps are often larger at senior levels than junior ones. Map the gap at each grade band: this tells you where the progression pipeline breaks down. A gap that only appears at Director level and above is a different problem from one that starts at first promotion." },
      { id: "a3", text: "Are performance ratings distributed equitably?", detail: "If certain groups receive systematically lower ratings, the progression process may appear fair while the bias is entering upstream. Test whether rating distributions differ by group within the same role family and grade." },
      { id: "a4", text: "Do certain groups have lower access to development?", detail: "Participation in high-potential programmes, stretch projects, and visible leadership opportunities predicts promotion. If access is unequal, the promotion funnel is biased at the input stage." },
      { id: "a5", text: "Are certain groups leaving rather than progressing?", detail: "Map leaver data against the grade at which people from different groups typically exit. If Black women disproportionately leave at Band 4, and Band 4 to Band 5 is a known bottleneck, the progression barrier is probably driving attrition." },
      { id: "a6", text: "Are there intersectional gaps hidden in single-axis analysis?", detail: "A gender gap and an ethnicity gap may not add up straightforwardly. Disabled women of colour may face a compounding disadvantage that neither the gender analysis nor the ethnicity analysis reveals. Cross-tabulate where your sample sizes allow." },
      { id: "a7", text: "Has the gap changed year on year?", detail: "Compare to previous audits. A narrowing gap suggests your interventions are working. A stable or widening gap suggests they are not." },
    ],
  },
  interpret: {
    heading: "Interpret your findings",
    intro: "Data tells you that a gap exists. It does not always tell you why. Use this section to test common explanations against your data and avoid the interpretive traps that allow organisations to explain away findings rather than act on them.",
    checks: [
      { id: "i1", text: "Test the 'pipeline' explanation", detail: "Many organisations attribute progression gaps to a thin pipeline of underrepresented candidates at junior grades. Test this: is the pipeline thin? Or are people from underrepresented groups entering at junior grades but leaving or stalling before they reach senior ones? These are different problems with different solutions." },
      { id: "i2", text: "Test the 'merit' explanation", detail: "Gaps are sometimes attributed to differential performance rather than differential process. But performance ratings are themselves subject to bias. If rating distributions differ by group, and ratings gate progression, the merit explanation becomes circular: the gap exists because ratings are lower, and ratings are lower because of bias." },
      { id: "i3", text: "Test the 'choice' explanation", detail: "Some people from underrepresented groups do not apply for promotion when eligible. This is often interpreted as preference. But research consistently shows that underrepresented groups self-select out of progression processes when those processes feel opaque, when role models are absent, or when previous attempts have been unsuccessful. 'Not applying' is a signal about the environment, not just about the individual." },
      { id: "i4", text: "Look for process failure points", detail: "Examine: who nominates people for promotion? Who decides? Who moderates decisions? Who can appeal? Gaps often cluster at specific process steps. If nomination rates are equal but success rates differ, the gap is in the selection process. If nomination rates differ, the gap is upstream." },
      { id: "i5", text: "Gather qualitative insight", detail: "Quantitative data tells you where gaps are. Qualitative data tells you why. Run focus groups with employees who have not progressed at the expected rate, and with managers involved in progression decisions. Ask: what made the difference? What got in the way? What would have helped?" },
    ],
  },
  act: {
    heading: "Act on what you find",
    intro: "The purpose of a fair progression audit is not to produce a report. It is to change what happens. Use this section to build an action plan that is specific, owner-allocated, and time-bound.",
    checks: [
      { id: "ac1", text: "Match actions to findings", detail: "Actions should address the specific drivers identified in your audit, not generic good-practice interventions. If the gap is in nomination rates, the action is about who nominates and how. If the gap is in panel decision-making, the action is about panel composition and structured criteria." },
      { id: "ac2", text: "Set a target", detail: "What would success look like? Set a specific, measurable target for each gap you identified: 'reduce the promotion gap between white and Black women from 12 percentage points to 6 percentage points within 2 years.' Targets without specifics are aspirations." },
      { id: "ac3", text: "Name an owner", detail: "Every action needs a named individual who is accountable for it: not a team, not a function, a person. That person's accountability should be visible in their own performance review." },
      { id: "ac4", text: "Structure the promotion process", detail: "The highest-impact intervention for reducing progression gaps is a structured, criteria-based promotion process with diverse panels. Implement: written criteria applied consistently across all candidates; structured scoring; panel composition requirements; and a moderation step where panels justify decisions against criteria." },
      { id: "ac5", text: "Address sponsorship gaps", detail: "Underrepresented employees often have mentors but not sponsors: people with power who advocate for them in rooms they are not in. Targeted sponsorship programmes for underrepresented employees at the grade just below the identified bottleneck have strong evidence of effectiveness." },
      { id: "ac6", text: "Close the loop with employees", detail: "Communicate findings and actions to the workforce, including to those who participated in focus groups or data collection. Trust that the process will lead to change is built by demonstrating that it already has. An audit that produces a confidential report seen only by the board is an audit that changes nothing." },
      { id: "ac7", text: "Schedule the next audit", detail: "A fair progression audit should run annually or biennially. The value is in the trend, not a single snapshot. Schedule the next one before you close this one." },
    ],
  },
};

export default function FairProgressionAuditToolPage() {
  const [activeStep, setActiveStep] = useState<Step>("prepare");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  const stepData = STEP_CONTENT[activeStep];
  const stepChecks = stepData.checks;
  const checkedCount = stepChecks.filter((c) => checkedItems.has(c.id)).length;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.35rem",
    padding: "0.45rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* Breadcrumb */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Fair Progression Audit Tool</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🔍</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Tool
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Fair Progression Audit Tool
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            A step-by-step audit process for identifying where progression gaps exist in your organisation, what is driving them, and what to do about it. Work through each stage and check off actions as you go.
          </p>

          {/* Step tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "0.25rem" }}>
            {STEPS.map((s) => (
              <button key={s.key} onClick={() => { setActiveStep(s.key); setExpanded(null); }} style={chipStyle(activeStep === s.key)}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {/* Step heading + progress */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: "var(--charcoal)", margin: "0 0 0.35rem" }}>{stepData.heading}</h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0, maxWidth: "560px" }}>{stepData.intro}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "var(--sage-dark)" }}>{checkedCount}/{stepChecks.length}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>completed</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {stepChecks.map((item) => {
            const isChecked = checkedItems.has(item.id);
            const isOpen = expanded === item.id;
            return (
              <div key={item.id} className="card" style={{ padding: 0, overflow: "hidden", border: isChecked ? "1.5px solid var(--sage-light)" : undefined, background: isChecked ? "#f8fdfb" : undefined }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.9rem 1.1rem" }}>
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(item.id)}
                    style={{ flexShrink: 0, width: "1.25rem", height: "1.25rem", borderRadius: "4px", border: isChecked ? "2px solid var(--sage-dark)" : "2px solid var(--gray-border)", background: isChecked ? "var(--sage-dark)" : "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--white)", fontSize: "0.75rem", marginTop: "0.1rem" }}
                    aria-label={isChecked ? "Mark incomplete" : "Mark complete"}
                  >
                    {isChecked && "✓"}
                  </button>
                  {/* Text + expand */}
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      style={{ background: "none", border: "none", cursor: item.detail ? "pointer" : "default", textAlign: "left", padding: 0, width: "100%" }}
                    >
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: isChecked ? "var(--sage-dark)" : "var(--charcoal)", textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.7 : 1 }}>{item.text}</span>
                      {item.detail && (
                        <span style={{ marginLeft: "0.5rem", color: "var(--gray-soft)", fontSize: "0.75rem" }}>{isOpen ? "▲" : "▼"}</span>
                      )}
                    </button>
                    {item.detail && isOpen && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: "0.5rem 0 0" }}>{item.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem", flexWrap: "wrap" }}>
          {STEPS.indexOf(STEPS.find((s) => s.key === activeStep)!) > 0 && (
            <button
              onClick={() => { const idx = STEPS.findIndex((s) => s.key === activeStep); setActiveStep(STEPS[idx - 1].key); setExpanded(null); }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "10px", padding: "0.65rem 1.25rem", cursor: "pointer" }}
            >
              ← Previous step
            </button>
          )}
          {STEPS.indexOf(STEPS.find((s) => s.key === activeStep)!) < STEPS.length - 1 && (
            <button
              onClick={() => { const idx = STEPS.findIndex((s) => s.key === activeStep); setActiveStep(STEPS[idx + 1].key); setExpanded(null); }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", border: "1.5px solid var(--sage-dark)", borderRadius: "10px", padding: "0.65rem 1.25rem", cursor: "pointer", marginLeft: "auto" }}
            >
              Next step →
            </button>
          )}
        </div>

        {/* About */}
        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>About this tool</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            This tool supports internal audit processes. It is not a substitute for legal advice on equal pay or discrimination law. If your audit reveals potential equal pay issues, seek specialist HR or legal counsel before publishing findings externally. Your progress is not saved when you leave this page.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
