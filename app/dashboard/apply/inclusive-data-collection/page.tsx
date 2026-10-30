"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const PRE_COLLECTION_QUESTIONS = [
  {
    id: "q1",
    question: "What is the specific purpose of collecting this data?",
    placeholder: "e.g. To understand the diversity of our workforce and identify equity gaps in recruitment and progression.",
  },
  {
    id: "q2",
    question: "Who will have access to the data and how will it be stored securely?",
    placeholder: "e.g. The People team will hold aggregated data. Individual responses will not be identifiable and will be stored in a password-protected system.",
  },
  {
    id: "q3",
    question: "Is consent freely given, or does power dynamics risk making it feel compulsory?",
    placeholder: "e.g. Participation will be voluntary and anonymous. Staff can opt out without any impact on their role.",
  },
  {
    id: "q4",
    question: "What will you do with the data? How will it lead to change?",
    placeholder: "e.g. The data will inform our EDI strategy, be reported to the board, and shared in our annual transparency report.",
  },
  {
    id: "q5",
    question: "Have you considered who might not feel safe to disclose and why?",
    placeholder: "e.g. We recognise that some staff may not feel comfortable disclosing gender identity, disability, or ethnicity. We will offer a \'prefer not to say\' option throughout.",
  },
];

const STEPS = [
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
  },
];

const LEGAL_FRAMEWORKS = [
  { name: "Equality Act 2010", desc: "Protects nine protected characteristics in employment and service delivery. Collecting data on protected characteristics must be justified, proportionate, and lawful." },
  { name: "UK GDPR", desc: "Special category data (including race, disability, health, sexual orientation, and religion) requires explicit consent or another lawful basis. Data subjects have rights including access, correction, and erasure." },
  { name: "Data Protection Act 2018", desc: "Sets out how special category data may be processed in the UK context, including processing for equality monitoring under Schedule 1, Part 2." },
  { name: "Data Protection Impact Assessment (DPIA)", desc: "Required for processing that is likely to result in high risk to individuals. Collecting sensitive equality data may trigger a DPIA requirement." },
];

export default function InclusiveDataCollection() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [legalOpen, setLegalOpen] = useState(false);

  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const answeredCount = PRE_COLLECTION_QUESTIONS.filter((q) => (answers[q.id] || "").trim().length > 0).length;

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Data and Evidence", "Inclusion Practices", "UK Law"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/dashboard/apply" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>
            ← Back to Apply
          </Link>
          <h1 className="text-3xl font-bold mt-3 mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
            Inclusive Data Collection
          </h1>
          <p className="text-base" style={{ color: "var(--charcoal)", opacity: 0.75 }}>
            A guide to collecting equality data ethically, inclusively, and in a way that drives genuine change.
          </p>
        </div>

        {/* Pre-collection questions */}
        <div className="rounded-xl border overflow-hidden mb-6" style={{ background: "var(--white)", borderColor: "var(--gray-border)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--gray-border)", background: "var(--sage-xlight)" }}>
            <h2 className="font-semibold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
              Before You Begin: Five Questions to Answer
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--charcoal)", opacity: 0.75 }}>
              Answer these before designing your data collection. {answeredCount} of {PRE_COLLECTION_QUESTIONS.length} answered.
            </p>
          </div>
          <div className="p-5 space-y-5">
            {PRE_COLLECTION_QUESTIONS.map((q, i) => (
              <div key={q.id}>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold mr-2"
                    style={{ background: (answers[q.id] || "").trim() ? "var(--sage-dark)" : "var(--sage-xlight)", color: (answers[q.id] || "").trim() ? "var(--white)" : "var(--sage-dark)" }}>
                    {i + 1}
                  </span>
                  {q.question}
                </label>
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                  placeholder={q.placeholder}
                  rows={3}
                  className="w-full rounded-lg border text-sm p-3 resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--gray-border)", color: "var(--charcoal)", background: "var(--gray-soft)", focusRingColor: "var(--sage-dark)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
          Seven Steps to Inclusive Data Collection
        </h2>
        <div className="space-y-3 mb-8">
          {STEPS.map((step, idx) => {
            const isOpen = expanded[step.id];
            return (
              <div key={step.id} className="rounded-xl border overflow-hidden" style={{ background: "var(--white)", borderColor: "var(--gray-border)" }}>
                <button onClick={() => toggleSection(step.id)} className="w-full flex items-center gap-3 px-5 py-4 text-left">
                  <span className="text-xl shrink-0">{step.icon}</span>
                  <div className="flex-1">
                    <span className="font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
                      Step {idx + 1}: {step.title}
                    </span>
                  </div>
                  <span style={{ color: "var(--sage-dark)" }}>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm mb-4" style={{ color: "var(--charcoal)", opacity: 0.8 }}>{step.desc}</p>
                    <ul className="space-y-2">
                      {step.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--charcoal)" }}>
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--sage-dark)" }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legal framework callout */}
        <div className="rounded-xl border overflow-hidden mb-8" style={{ borderColor: "#93C5FD", background: "#EFF6FF" }}>
          <button onClick={() => setLegalOpen((p) => !p)} className="w-full flex items-center justify-between px-5 py-4 text-left">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚖️</span>
              <span className="font-semibold text-base" style={{ color: "#1E3A5F", fontFamily: "var(--font-heading)" }}>
                UK Legal Framework
              </span>
            </div>
            <span style={{ color: "#1E3A5F" }}>{legalOpen ? "▲" : "▼"}</span>
          </button>
          {legalOpen && (
            <div className="px-5 pb-5 space-y-4">
              {LEGAL_FRAMEWORKS.map((lf) => (
                <div key={lf.name}>
                  <p className="font-semibold text-sm" style={{ color: "#1E3A5F" }}>{lf.name}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#1E3A5F", opacity: 0.85 }}>{lf.desc}</p>
                </div>
              ))}
              <p className="text-xs mt-2" style={{ color: "#1E3A5F", opacity: 0.7 }}>
                Always seek legal advice specific to your organisation when designing a data collection programme.
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button onClick={() => window.print()} className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ background: "var(--sage-dark)", color: "var(--white)" }}>
            Print Guide
          </button>
        </div>
      </main>

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
              <Link key="making-policies-inclusive" href={`/dashboard/apply/making-policies-inclusive`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Making Policies More Inclusive
                </span>
              </Link>
              <Link key="inclusive-leadership-self-assessment" href={`/dashboard/apply/inclusive-leadership-self-assessment`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Self-Assessment
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Leadership Self-Assessment
                </span>
              </Link>
              <Link key="exit-interview-questions" href={`/dashboard/apply/exit-interview-questions`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Exit Interview Questions
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
