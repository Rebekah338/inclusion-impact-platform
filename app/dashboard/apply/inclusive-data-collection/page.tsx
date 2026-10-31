"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

// Step 2a: button-select questions
const PURPOSE_OPTIONS = [
  "To build or update an EDI strategy",
  "To meet a reporting or legal requirement",
  "To investigate a specific equity concern",
  "To understand our baseline for the first time",
  "To track progress against existing targets",
];

const ACCESS_OPTIONS = [
  "People team only, aggregated",
  "Senior leadership and People team",
  "Board and executive team",
  "Externally reported",
  "Not yet decided",
];

const DISCLOSURE_OPTIONS = [
  "Gender identity",
  "Race and ethnicity",
  "Disability and health",
  "Sexual orientation",
  "Religion or belief",
  "Age",
  "Socioeconomic background",
];

// Step 2b: free-text question
const FREE_TEXT_QUESTION = {
  id: "action",
  question: "What will you do with the data, and how will it lead to change?",
  placeholder: "e.g. Findings will be shared in an annual transparency report, inform our EDI strategy, and be presented to the board with named actions against each gap identified.",
};

const STEPS = [
  {
    id: "considerations",
    title: "Key Considerations Before You Begin",
    icon: "🧭",
    desc: "Before designing your survey or choosing your platform, pause and work through these five considerations. Getting clarity here shapes every decision that follows.",
    points: [
      "Purpose and use: what are you collecting data for, and how will it be used to drive inclusion? Be specific: vague purposes lead to vague data.",
      "Representation: are all groups, especially marginalised or underrepresented communities, included in the design process, not just as respondents?",
      "Privacy and trust: how will personal data be protected, how will confidentiality be maintained, and how will you communicate your intentions to participants?",
      "Intersectionality: are you capturing multiple, overlapping identities such as race, disability, gender, and age, rather than treating each in isolation?",
      "Avoiding harm: could the data collection process itself reinforce bias, tokenism, or stereotypes? Who has reviewed the design with this question in mind?",
    ],
    mistake: {
      label: "Common mistake: skipping the planning stage",
      desc: "Many organisations move straight to survey design without answering these five questions first. The result is data that is hard to act on, questions that feel invasive without context, and participation rates that fall because employees do not understand why the data is being collected. These considerations are not optional extras: they are the foundation.",
    },
  },
  {
    id: "objectives",
    title: "Define Clear Objectives",
    icon: "🎯",
    desc: "Be specific about what you want to understand and what decisions the data will inform. Vague objectives lead to data that cannot drive change.",
    points: [
      "Link data collection to a named outcome or equity question",
      "Identify who will use the data and when",
      "Be honest with participants about what the data will and will not be used for",
      "Avoid collecting data out of habit or because others do it: every data point must serve a purpose",
    ],
    mistake: {
      label: "Common mistake: collecting without a question",
      desc: "Many organisations collect diversity data because they feel they should, without a specific question to answer. This leads to low participation, unused data, and eroded trust. If you cannot name the decision this data will inform, delay the collection until you can.",
    },
  },
  {
    id: "design",
    title: "Design Inclusive Questions",
    icon: "✏️",
    desc: "How you ask matters as much as what you ask. Inclusive question design respects the complexity of identity.",
    points: [
      "Offer \"self-describe\" and \"prefer not to say\" options on every identity question",
      "Use current, community-informed language: check terminology with the communities you are asking about",
      "Avoid binary options on gender: include non-binary, genderqueer, and self-describe",
      "Ask about disability in a way that includes non-visible disabilities, chronic illness, and neurodivergence",
      "Separate out nationality, ethnicity, and country of birth as distinct questions",
      "Use pilot testing to identify questions that feel confusing, invasive, or poorly worded",
    ],
    mistake: {
      label: "Common mistake: binary gender questions",
      desc: "A question that offers only Male and Female excludes non-binary, gender-fluid, and intersex employees. This is not just a design flaw: it signals that the organisation does not recognise their existence. Always include at minimum: Male; Female; Non-binary; Prefer to self-describe; Prefer not to say.",
    },
  },
  {
    id: "accessibility",
    title: "Ensure Accessibility",
    icon: "♿",
    desc: "Your data collection method should not itself create barriers to participation.",
    points: [
      "Ensure digital surveys are screen-reader compatible and keyboard navigable",
      "Offer alternatives to online-only formats where needed",
      "Use plain English throughout and offer translation support where relevant",
      "Consider the time commitment: keep surveys as short as possible while still meaningful",
      "Make the survey mobile-friendly",
    ],
    mistake: {
      label: "Common mistake: digital-only access",
      desc: "An online survey with no paper alternative excludes employees with low digital literacy, those without work devices, or those who find screen-reader-incompatible formats unusable. Low response rates in specific teams or roles can indicate an access barrier rather than low willingness to disclose.",
    },
  },
  {
    id: "privacy",
    title: "Protect Privacy and Build Trust",
    icon: "🔒",
    desc: "Data collection will only generate useful insights if people trust the process. Trust is built through transparency and genuine anonymity.",
    points: [
      "Be explicit about what \"anonymous\" means in your context: who can see what",
      "Never report data in a way that could identify individuals, especially in small teams",
      "Store data securely and limit access to those who need it",
      "Tell people how long data will be retained",
      "Share what happened as a result of the data: close the feedback loop",
    ],
    mistake: {
      label: "Common mistake: misusing the word anonymous",
      desc: "Saying data is anonymous when individual responses are viewable by a line manager, or when team sizes are small enough to identify people from aggregated data, is misleading. In teams of under 10, even aggregated results can effectively identify individuals. Be specific about what anonymity means in practice and only report data at a group size where re-identification is genuinely not possible.",
    },
  },
  {
    id: "intersectional",
    title: "Collect Intersectional Data",
    icon: "⬡",
    desc: "Single-axis data misses the complexity of lived experience. Where possible, design your analysis to surface intersectional patterns.",
    points: [
      "Analyse data across multiple characteristics together, not just individually",
      "Look at pay, progression, and experience at the intersection of race and gender, for example",
      "Ensure your sample sizes are large enough to allow disaggregation without identifying individuals",
      "Acknowledge the limits of your data: what is not captured and why",
    ],
    mistake: {
      label: "Common mistake: single-axis reporting",
      desc: "Reporting gender data and ethnicity data separately can mask significant disparities. A pay gap analysis that shows women are paid equitably may obscure the fact that Black women are paid significantly less. Intersectional analysis requires larger sample sizes but reveals the reality that single-axis reporting hides.",
    },
  },
  {
    id: "action",
    title: "Use Data to Drive Action",
    icon: "📊",
    desc: "Data without action is just surveillance. Commit to using what you collect to make real changes.",
    points: [
      "Set out in advance what actions you will take based on different findings",
      "Report findings back to the people who provided the data",
      "Include data findings in your EDI strategy and board reporting",
      "Track change over time: collect data regularly enough to see trends",
      "Be honest when the data shows poor outcomes: transparency builds credibility",
    ],
    mistake: {
      label: "Common mistake: collecting without closing the loop",
      desc: "If employees complete a diversity survey and never hear the results, or hear results but see no action, participation rates fall sharply in future rounds. Employees are not obliged to provide data: they do so when they trust it will be used. Publish results and name what you are changing as a result, even when the findings are uncomfortable.",
    },
  },
  {
    id: "review",
    title: "Review and Iterate",
    icon: "🔄",
    desc: "Inclusive data collection is not a one-off task: it requires regular review to stay relevant, accurate, and trustworthy.",
    points: [
      "Review your question design annually against current guidance and community feedback",
      "Update terminology as language evolves",
      "Evaluate participation rates and investigate why people choose not to respond",
      "Seek feedback from staff networks and ERGs on the data collection process",
    ],
    mistake: {
      label: "Common mistake: treating data collection as a one-off",
      desc: "A single diversity survey gives you a snapshot, not a trend. Organisations that collect data once, act on it once, and then move on lose the ability to measure whether their actions worked. Build in a regular cadence: annually at minimum, or biannually for large-scale exercises. Track participation rates as well as results: falling participation is itself an important data point.",
    },
  },
];

const LEGAL_FRAMEWORKS = {
  statutory: [
    {
      name: "Equality Act 2010",
      tag: "UK Law",
      desc: "The foundational legislation that protects individuals from discrimination based on nine protected characteristics, including sex, race, disability, sexual orientation, and religion. It mandates equal treatment in employment and access to services. Data collection on protected characteristics must be justified, proportionate, and lawful under this framework.",
    },
    {
      name: "UK Data Protection Act 2018 and UK GDPR",
      tag: "UK Law",
      desc: "Governs how organisations handle personal data in the UK. Sensitive categories of data, including ethnicity, disability, religion, sexual orientation, and health, are classed as 'special category data' and require either explicit consent or a specific lawful basis under Schedule 1 to process. Individuals have rights to access, correct, and erase their data. Organisations must be transparent about how data is used.",
    },
    {
      name: "EU General Data Protection Regulation (GDPR)",
      tag: "EU",
      desc: "Sets strict rules for how organisations collect, store, and use personal data, especially sensitive information such as ethnicity, gender, and health. Ensures individuals have control over their data and requires organisations to be transparent, secure, and purposeful. Relevant for organisations operating across EU jurisdictions or with EU-based employees.",
    },
  ],
  standards: [
    {
      name: "Data Protection Impact Assessment (DPIA)",
      tag: "Required process",
      desc: "A structured process required by UK GDPR to identify and minimise privacy risks before launching new data processing that could significantly affect individuals' rights. Collecting sensitive equality data is likely to trigger a DPIA requirement. It helps organisations think through risk and accountability proactively, with real people in mind.",
    },
    {
      name: "NIST Privacy Framework",
      tag: "US/International",
      desc: "A voluntary, risk-based tool created by the US National Institute of Standards and Technology to help organisations identify and manage privacy risks. Flexible and adaptable across industries; useful for organisations building data systems that need to balance innovation with individual privacy protection.",
    },
    {
      name: "CIPD / Reed Inclusion at Work 2022",
      tag: "Benchmarking",
      desc: "Annual benchmarking of UK employer diversity and inclusion practice, covering what is working and where the gaps are. Useful for comparing your organisation's data practices against sector peers and identifying areas for improvement in data collection design and use.",
    },
  ],
  charters: [
    {
      name: "PAS 1948: BSI Code of Practice for Creating Inclusive Workplace Culture",
      tag: "BSI Standard",
      desc: "A free-to-download British Standards Institution standard guiding how to implement EDI frameworks in practice. Covers dimensions of diversity, inclusive design principles, recruitment and retention, and behaviour. Provides a structured approach to embedding inclusion across the employee lifecycle, including data collection practices.",
    },
    {
      name: "National Equality Standard (NES)",
      tag: "Accreditation",
      desc: "A business assessment and benchmarking scheme that helps organisations evaluate their EDI policies and practices in a structured way. Achieving NES accreditation requires evidencing inclusive data practices. Useful as a benchmark for assessing where your organisation sits and what good looks like.",
    },
  ],
};

// Lightweight reminder for bottom of page (4 key points linking to full tab)
const READINESS_QUESTIONS = [
  {
    id: "r1",
    question: "Has your organisation collected equality data before?",
    options: ["Yes, recently and regularly", "Yes, but not recently", "Once or twice, informally", "No, this would be a first"],
  },
  {
    id: "r2",
    question: "What is your primary reason for collecting now?",
    options: ["To build or update an EDI strategy", "To meet a reporting requirement", "To investigate a specific equity concern", "To understand our baseline for the first time"],
  },
];

type StepStatus = "yes" | "partially" | "not-yet" | null;

const stepStatusConfig: Record<NonNullable<StepStatus>, { label: string; bg: string; text: string; border: string }> = {
  yes: { label: "Done", bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
  partially: { label: "In progress", bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  "not-yet": { label: "Not yet", bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
};

export default function InclusiveDataCollection() {
  const [readinessAnswers, setReadinessAnswers] = useState<Record<string, string>>({});
  const [canStartGuide, setCanStartGuide] = useState(false);
  const [purposeSelected, setPurposeSelected] = useState<string[]>([]);
  const [accessSelected, setAccessSelected] = useState<string | null>(null);
  const [disclosureSelected, setDisclosureSelected] = useState<string[]>([]);
  const [actionText, setActionText] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>({});
  const [pageTab, setPageTab] = useState<"resource" | "legal">("resource");
  const [legalTab, setLegalTab] = useState<"statutory" | "standards" | "charters">("statutory");
  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const setStep = (id: string, s: StepStatus) =>
    setStepStatus((p) => ({ ...p, [id]: p[id] === s ? null : s }));
  const togglePurpose = (opt: string) =>
    setPurposeSelected((p) => p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]);
  const toggleDisclosure = (opt: string) =>
    setDisclosureSelected((p) => p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]);

  const planningComplete = purposeSelected.length > 0 && accessSelected && actionText.trim().length > 0;
  const readinessComplete = READINESS_QUESTIONS.every((q) => readinessAnswers[q.id]);

  const stepCounts = {
    yes: STEPS.filter((s) => stepStatus[s.id] === "yes").length,
    partially: STEPS.filter((s) => stepStatus[s.id] === "partially").length,
    "not-yet": STEPS.filter((s) => stepStatus[s.id] === "not-yet").length,
  };

  const generateRationale = () => {
    const lines: string[] = [];
    lines.push("DATA COLLECTION RATIONALE STATEMENT");
    lines.push("=".repeat(40));
    lines.push("");
    lines.push(`Generated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`);
    lines.push("");
    if (purposeSelected.length > 0) {
      lines.push("PURPOSE");
      lines.push(purposeSelected.join("; "));
      lines.push("");
    }
    if (accessSelected) {
      lines.push("DATA ACCESS");
      lines.push(accessSelected);
      lines.push("");
    }
    if (disclosureSelected.length > 0) {
      lines.push("DATA GROUPS THAT MAY FEEL LESS SAFE DISCLOSING");
      lines.push(disclosureSelected.join("; "));
      lines.push("");
    }
    if (actionText.trim()) {
      lines.push("HOW DATA WILL LEAD TO CHANGE");
      lines.push(actionText.trim());
      lines.push("");
    }
    lines.push("---");
    lines.push("This statement was generated using the Inclusion Edit Inclusive Data Collection tool.");
    lines.push("It should be reviewed and adapted before use in internal communications, DPIAs, or board papers.");
    return lines.join("\n");
  };

  const copyRationale = () => {
    navigator.clipboard.writeText(generateRationale()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Guide
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Data Collection
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          A step-by-step guide to collecting workforce diversity data ethically, legally, and in ways that build trust with employees.
        </p>
        {/* Topic tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {["Data and Evidence", "Inclusion Practices", "UK Law"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Page-level tab switcher */}
        <div style={{ display: "flex", gap: 4, borderBottom: "2px solid var(--gray-border)", marginBottom: 0 }}>
          {([
            { key: "resource", label: "Resource" },
            { key: "legal", label: "⚖️ Legal Guidance" },
          ] as const).map((tab) => (
            <button key={tab.key} onClick={() => setPageTab(tab.key)}
              style={{
                padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                border: "none", background: "none",
                color: pageTab === tab.key ? "var(--sage-dark)" : "#6b7280",
                borderBottom: pageTab === tab.key ? "3px solid var(--sage-dark)" : "3px solid transparent",
                marginBottom: "-2px",
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legal Guidance panel */}
      {pageTab === "legal" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 80px" }}>
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "20px 20px 0", background: "#EFF6FF", borderBottom: "1px solid #93C5FD" }}>
              <p style={{ fontSize: 13, color: "#1E3A5F", opacity: 0.8, margin: "0 0 16px" }}>
                The legal and professional landscape that governs inclusive data collection. Always seek advice specific to your organisation before designing a programme.
              </p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {([
                  { key: "statutory", label: "Legal Frameworks and Statutory Guidance" },
                  { key: "standards", label: "Industry Standards" },
                  { key: "charters", label: "Charters and Frameworks" },
                ] as const).map((tab) => (
                  <button key={tab.key} onClick={() => setLegalTab(tab.key)}
                    style={{
                      padding: "7px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                      border: "none", borderRadius: "8px 8px 0 0",
                      background: legalTab === tab.key ? "var(--white)" : "transparent",
                      color: legalTab === tab.key ? "#1E40AF" : "#1E3A5F",
                      opacity: legalTab === tab.key ? 1 : 0.65,
                      borderBottom: legalTab === tab.key ? "3px solid #3B82F6" : "3px solid transparent",
                      marginBottom: "-1px",
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
              {LEGAL_FRAMEWORKS[legalTab].map((item) => (
                <div key={item.name} style={{ borderBottom: "1px solid var(--gray-border)", paddingBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1E40AF", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>
                      {item.tag}
                    </span>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--charcoal)", margin: 0 }}>{item.name}</p>
                  </div>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                This guidance is for information only and does not constitute legal advice.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resource content */}
      {pageTab === "resource" && (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Readiness check */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "24px", marginBottom: 24 }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 8 }}>Step 1</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: "var(--charcoal)", marginBottom: 6 }}>Quick readiness check</h2>
          <p style={{ fontSize: 14, color: "#374151", marginBottom: 20, lineHeight: 1.6 }}>
            Two questions to help contextualise this guide for your situation. Work through the eight steps below, then return to Step 3 to put your plan together.
          </p>
          {READINESS_QUESTIONS.map((rq) => (
            <div key={rq.id} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", marginBottom: 10 }}>{rq.question}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {rq.options.map((opt) => (
                  <button key={opt} onClick={() => setReadinessAnswers((p) => ({ ...p, [rq.id]: opt }))}
                    style={{
                      padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                      border: readinessAnswers[rq.id] === opt ? "2px solid var(--sage-dark)" : "1px solid var(--gray-border)",
                      background: readinessAnswers[rq.id] === opt ? "var(--sage-xlight)" : "var(--white)",
                      color: readinessAnswers[rq.id] === opt ? "var(--sage-dark)" : "var(--charcoal)",
                      whiteSpace: "nowrap",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {readinessComplete && !canStartGuide && (
            <div style={{ background: "var(--sage-xlight)", border: "1px solid #c6dbc9", borderRadius: 10, padding: "14px 16px", marginTop: 8 }}>
              {readinessAnswers.r2 === "To understand our baseline for the first time" || readinessAnswers.r1 === "No, this would be a first" ? (
                <p style={{ fontSize: 14, color: "var(--sage-dark)", fontWeight: 600, margin: 0 }}>
                  Starting from scratch: work through all eight steps below carefully, then use the planning section at the end to set your intentions before you design your survey.
                </p>
              ) : (
                <p style={{ fontSize: 14, color: "var(--sage-dark)", fontWeight: 600, margin: 0 }}>
                  You have experience to build on. Use the steps below to audit and improve your existing approach, paying particular attention to steps 2 (question design) and 4 (privacy and trust). Then complete the planning section at the end.
                </p>
              )}
              <button onClick={() => setCanStartGuide(true)}
                style={{ marginTop: 12, padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", border: "none" }}>
                Continue to the guide
              </button>
            </div>
          )}
          {canStartGuide && (
            <p style={{ fontSize: 13, color: "var(--sage-dark)", fontWeight: 600, marginTop: 4 }}>✓ Readiness check complete</p>
          )}
        </div>

        {/* Step progress */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          {(["yes", "partially", "not-yet"] as const).map((s) => (
            <div key={s} style={{ background: stepStatusConfig[s].bg, border: `1px solid ${stepStatusConfig[s].border}`, borderRadius: 12, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: stepStatusConfig[s].text }}>{stepCounts[s]}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: stepStatusConfig[s].text }}>{stepStatusConfig[s].label}</div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 12 }}>Step 2</p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: "var(--charcoal)", marginBottom: 16 }}>
          Eight Steps to Inclusive Data Collection
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {STEPS.map((step, idx) => {
            const isOpen = expanded[step.id];
            const currentStatus = stepStatus[step.id];
            const statusCfg = currentStatus ? stepStatusConfig[currentStatus] : null;
            const leftBorderColor = statusCfg ? statusCfg.border : "var(--gray-border)";
            const cardBg = statusCfg ? statusCfg.bg : "var(--white)";
            return (
              <div key={step.id} style={{
                background: isOpen ? "var(--white)" : cardBg,
                border: `1px solid ${leftBorderColor}`,
                borderLeft: `4px solid ${statusCfg ? statusCfg.border : "var(--sage-dark)"}`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.15s",
              }}>
                {/* Card header — always visible */}
                <button onClick={() => toggleSection(step.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  {/* Step number badge */}
                  <span style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
                    background: statusCfg ? statusCfg.border : "var(--sage-dark)",
                    color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {statusCfg?.label === "Done ✓" ? "✓" : idx + 1}
                  </span>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--charcoal)", marginBottom: isOpen ? 0 : 3 }}>
                      {step.title}
                    </div>
                    {/* Preview line shown only when closed */}
                    {!isOpen && (
                      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                        {step.desc.split(".")[0]}.
                      </div>
                    )}
                    {currentStatus && (
                      <span style={{ display: "inline-block", marginTop: 4, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: statusCfg!.bg, color: statusCfg!.text, border: `1px solid ${statusCfg!.border}` }}>
                        {statusCfg!.label}
                      </span>
                    )}
                  </div>
                  <span style={{ color: "var(--sage-dark)", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                    <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.8, marginBottom: 16, lineHeight: 1.6 }}>{step.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                      {step.points.map((pt, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--charcoal)", lineHeight: 1.6, marginBottom: 8 }}>
                          <span style={{ marginTop: 8, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark)", display: "inline-block" }} />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {/* Common mistake callout */}
                    <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderLeft: "4px solid #D97706", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 16 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#92400E", margin: "0 0 6px" }}>⚠ {step.mistake.label}</p>
                      <p style={{ fontSize: 13, color: "#92400E", margin: 0, lineHeight: 1.6 }}>{step.mistake.desc}</p>
                    </div>

                    {/* Status toggles */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)", width: "100%", margin: "0 0 6px" }}>Have you completed this step?</p>
                      {(["yes", "partially", "not-yet"] as const).map((s) => (
                        <button key={s} onClick={() => setStep(step.id, s)}
                          style={{
                            padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                            background: currentStatus === s ? stepStatusConfig[s].bg : "transparent",
                            color: currentStatus === s ? stepStatusConfig[s].text : "var(--charcoal)",
                            border: `1px solid ${currentStatus === s ? stepStatusConfig[s].border : "var(--gray-border)"}`,
                          }}>
                          {stepStatusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Plan Your Approach */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "20px 20px 16px", background: "var(--sage-xlight)", borderBottom: "1px solid var(--gray-border)" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 6 }}>Step 3</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--charcoal)", margin: "0 0 4px" }}>
              Plan Your Approach
            </h2>
            <p style={{ fontSize: 13, color: "var(--charcoal)", opacity: 0.75, margin: 0 }}>
              Now you have worked through the guide: three things to agree before you design your data collection.
            </p>
          </div>
          <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Sub-step A: Purpose */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", fontSize: 13, fontWeight: 700, flexShrink: 0,
                  background: purposeSelected.length > 0 ? "var(--sage-dark)" : "var(--sage-xlight)",
                  color: purposeSelected.length > 0 ? "var(--white)" : "var(--sage-dark)",
                }}>A</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  What is the purpose of this data collection? <span style={{ fontWeight: 400, color: "#6b7280" }}>(select all that apply)</span>
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PURPOSE_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => togglePurpose(opt)}
                    style={{
                      padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                      border: purposeSelected.includes(opt) ? "2px solid var(--sage-dark)" : "1px solid var(--gray-border)",
                      background: purposeSelected.includes(opt) ? "var(--sage-xlight)" : "var(--white)",
                      color: purposeSelected.includes(opt) ? "var(--sage-dark)" : "var(--charcoal)",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-step B: Access + disclosure groups */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", fontSize: 13, fontWeight: 700, flexShrink: 0,
                  background: accessSelected ? "var(--sage-dark)" : "var(--sage-xlight)",
                  color: accessSelected ? "var(--white)" : "var(--sage-dark)",
                }}>B</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  Who will have access to the data?
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {ACCESS_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => setAccessSelected(accessSelected === opt ? null : opt)}
                    style={{
                      padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                      border: accessSelected === opt ? "2px solid var(--sage-dark)" : "1px solid var(--gray-border)",
                      background: accessSelected === opt ? "var(--sage-xlight)" : "var(--white)",
                      color: accessSelected === opt ? "var(--sage-dark)" : "var(--charcoal)",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)", margin: "0 0 8px" }}>
                Which groups may feel less safe disclosing? <span style={{ fontWeight: 400, color: "#6b7280" }}>(select all that apply)</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {DISCLOSURE_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => toggleDisclosure(opt)}
                    style={{
                      padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                      border: disclosureSelected.includes(opt) ? "2px solid var(--sage-dark)" : "1px solid var(--gray-border)",
                      background: disclosureSelected.includes(opt) ? "var(--sage-xlight)" : "var(--white)",
                      color: disclosureSelected.includes(opt) ? "var(--sage-dark)" : "var(--charcoal)",
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-step C: What will you do with the data */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", fontSize: 13, fontWeight: 700, flexShrink: 0,
                  background: actionText.trim().length > 0 ? "var(--sage-dark)" : "var(--sage-xlight)",
                  color: actionText.trim().length > 0 ? "var(--white)" : "var(--sage-dark)",
                }}>C</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  {FREE_TEXT_QUESTION.question}
                </p>
              </div>
              <textarea
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
                placeholder={FREE_TEXT_QUESTION.placeholder}
                rows={3}
                style={{ width: "100%", borderRadius: 8, border: "1px solid var(--gray-border)", fontSize: 13, padding: "10px 12px", resize: "none", color: "var(--charcoal)", background: "#fafafa", boxSizing: "border-box", lineHeight: 1.6, fontFamily: "var(--font-body)" }}
              />
            </div>
          </div>

          {/* Rationale generator */}
          <div style={{ borderTop: "1px solid var(--gray-border)" }}>
            <button onClick={() => setRationaleOpen((p) => !p)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer" }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  Generate your data collection rationale
                </p>
                <p style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.65, margin: "2px 0 0" }}>
                  {planningComplete ? "Ready to generate" : "Complete A, B and C above"} &middot; produces a statement for DPIAs, board papers, and staff comms
                </p>
              </div>
              <span style={{ color: "var(--sage-dark)", fontSize: 12 }}>{rationaleOpen ? "▲" : "▼"}</span>
            </button>
            {rationaleOpen && (
              <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                {!planningComplete ? (
                  <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.7, margin: 0 }}>
                    Complete sections A, B, and C above to generate your rationale statement.
                  </p>
                ) : (
                  <>
                    <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--charcoal)", background: "#fafafa", border: "1px solid var(--gray-border)", borderRadius: 8, padding: 16, marginBottom: 16, lineHeight: 1.7 }}>
                      {generateRationale()}
                    </pre>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={copyRationale}
                        style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", border: "none" }}>
                        {copied ? "Copied!" : "Copy to clipboard"}
                      </button>
                      <button onClick={() => window.print()}
                        style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "var(--white)", color: "var(--charcoal)", border: "1px solid var(--gray-border)" }}>
                        Print
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => window.print()} style={{ padding: "10px 28px", borderRadius: 24, fontSize: 14, fontWeight: 700, cursor: "pointer", background: "var(--sage-dark)", color: "var(--white)", border: "none" }}>
            Print Guide
          </button>
        </div>
      </div>
      )}

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Why data collection is central to EDI progress
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            You cannot manage what you do not measure. Collecting data on workforce diversity is a foundational step in any credible EDI strategy: it establishes a baseline, allows progress to be tracked, and makes it possible to identify where specific groups are being disproportionately affected by organisational processes. Without data, EDI work risks being driven by assumptions rather than evidence.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            At the same time, data collection in this space is not straightforward. Employees may be sceptical about how their data will be used, worried about confidentiality, or simply uncomfortable disclosing aspects of their identity to an employer. Poor data collection processes can damage trust rather than building it: mandatory questions, clunky categorisation, or visible gaps between data collected and action taken all undermine participation.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Ethical and effective data collection requires clear communication about purpose, genuine commitment to confidentiality, inclusive question design, and visible action in response to what the data shows. When employees can see that disclosure leads to improvement, participation increases: creating a virtuous cycle in which better data enables better decisions.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/dashboard/apply/making-policies-inclusive" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Making Policies More Inclusive</span>
            </Link>
            <Link href="/dashboard/apply/inclusive-leadership-self-assessment" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Self-Assessment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusive Leadership Self-Assessment</span>
            </Link>
            <Link href="/dashboard/apply/exit-interview-questions" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Reference Tool</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Exit Interview Questions</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
