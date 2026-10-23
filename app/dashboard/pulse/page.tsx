"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: "role",
    question: "What best describes your role?",
    options: ["EDI / Diversity & Inclusion Lead", "HR Manager or Director", "People Manager / Team Leader", "Senior Leader / Executive", "Learning & Development", "Other / General interest"],
  },
  {
    id: "org-size",
    question: "What size is your organisation?",
    options: ["Just me / Freelance", "2–50 people", "51–250 people", "251–1000 people", "1000+ people"],
  },
  {
    id: "experience",
    question: "How would you describe your EDI experience?",
    options: ["New to EDI — just starting out", "Some experience — building my knowledge", "Experienced — looking to go deeper", "Senior practitioner — want cutting-edge thinking"],
  },
  {
    id: "priority",
    question: "What's your biggest EDI challenge right now?",
    options: ["Getting leadership buy-in", "Knowing where to start", "Building an evidence base / business case", "Embedding inclusion in day-to-day practice", "Improving recruitment and retention", "Understanding data and measuring impact"],
  },
  {
    id: "goal",
    question: "What do you most want to achieve in the next 3 months?",
    options: ["Launch or refresh an EDI strategy", "Upskill myself or my team", "Improve a specific policy or process", "Build confidence to lead on EDI", "Create a more inclusive culture"],
  },
];

const recommendations: Record<string, { module: string; id: string; reason: string }> = {
  "Getting leadership buy-in": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "You need evidence and narrative frameworks to take to senior stakeholders." },
  "Knowing where to start": { module: "Building an EDI Strategy", id: "edi-strategy", reason: "This gives you a clear framework to work from — wherever you are." },
  "Building an evidence base / business case": { module: "The ROI of Inclusion", id: "roi-inclusion", reason: "Start with the data and business case before anything else." },
  "Embedding inclusion in day-to-day practice": { module: "Psychological Safety", id: "psychological-safety", reason: "Creating the conditions for inclusion to thrive starts with psychological safety." },
  "Improving recruitment and retention": { module: "Inclusive Recruitment", id: "inclusive-recruitment", reason: "Bias in recruitment is one of the biggest barriers to inclusive organisations." },
  "Understanding data and measuring impact": { module: "Collecting & Using EDI Data", id: "edi-data", reason: "Good data is the foundation of credible EDI practice." },
};

export default function PulsePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const answered = Object.keys(answers).length;
  const rec = answers.priority ? recommendations[answers.priority] : null;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    }
  };

  if (submitted && rec) {
    return (
      <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Dashboard</Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--charcoal)", marginTop: "0.75rem" }}>Your Inclusion Pulse results</h1>
          </div>
        </div>
        <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
          <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem", background: "var(--cream)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>
              Where to start
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
              We recommend: {rec.module}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              {rec.reason}
            </p>
            <Link href={`/dashboard/learn/${rec.id}`} className="btn-primary">
              Start this module →
            </Link>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "1rem" }}>Your answers</div>
            {questions.map((q) => (
              <div key={q.id} style={{ padding: "0.625rem 0", borderBottom: "1px solid var(--gray-border)" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)", marginBottom: "0.2rem" }}>{q.question}</div>
                <div style={{ fontSize: "0.9rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)" }}>{answers[q.id]}</div>
              </div>
            ))}
            <button onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQ(0); }} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-soft)", background: "none", border: "none", cursor: "pointer" }}>
              Retake the Pulse
            </button>
          </div>
        </main>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Dashboard</Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--charcoal)", marginTop: "0.75rem", marginBottom: "0.25rem" }}>
            Inclusion Pulse
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>
            5 quick questions to find your best starting point on the platform.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {/* Progress */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)" }}>Question {currentQ + 1} of {questions.length}</span>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)" }}>{Math.round((answered / questions.length) * 100)}%</span>
          </div>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "1.5rem" }}>
            {q.question}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(q.id, opt)}
                style={{
                  background: answers[q.id] === opt ? "var(--sage-light)" : "var(--white)",
                  border: `2px solid ${answers[q.id] === opt ? "var(--sage)" : "var(--gray-border)"}`,
                  borderRadius: "8px",
                  padding: "0.875rem 1.25rem",
                  textAlign: "left",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--charcoal)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {currentQ > 0 && (
          <button onClick={() => setCurrentQ(currentQ - 1)} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--gray-soft)", background: "none", border: "none", cursor: "pointer" }}>
            ← Previous question
          </button>
        )}

        {answered === questions.length && (
          <button onClick={() => setSubmitted(true)} className="btn-primary" style={{ marginTop: "1.5rem", width: "100%", textAlign: "center" }}>
            See my recommendations →
          </button>
        )}
      </main>
    </div>
  );
}
