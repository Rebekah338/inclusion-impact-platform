"use client";

import { useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const ROLE_LEVELS = [
  "Entry level / Junior",
  "Mid-level",
  "Senior / Specialist",
  "Manager / Team lead",
  "Director / Head of",
  "Executive / C-suite",
];

const SECTORS = [
  "Private sector",
  "Public sector",
  "Third sector / Charity",
  "Education (schools)",
  "Education (higher education)",
  "Healthcare / NHS",
  "Financial services",
  "Legal",
  "Technology",
  "Hospitality and retail",
  "Other",
];

const FOCUS_CHIPS = [
  "Language and wording",
  "Requirements and qualifications",
  "Salary and benefits transparency",
  "Accessibility considerations",
  "Cultural fit language",
  "Not sure",
];

const SEVERITY_COLOURS: Record<string, { bg: string; text: string }> = {
  Critical: { bg: "#FEE2E2", text: "#B91C1C" },
  Recommended: { bg: "#FEF3C7", text: "#92400E" },
  Enhancement: { bg: "#DCFCE7", text: "#166534" },
};

interface Flag {
  category: string;
  original: string;
  issue: string;
  rewrite: string;
  severity: string;
}

interface MissingItem {
  item: string;
  why: string;
  suggestion: string;
}

interface Requirements {
  originalCount: number;
  revisedEssential: number;
  revisedDesirable: number;
  insight: string;
}

interface Result {
  score: string;
  positives: string;
  flags: Flag[];
  missing: MissingItem[];
  candidateLens: string;
  requirements: Requirements;
  rewrittenSpec: string;
}

export default function JDEquityCheckerPage() {
  const [roleLevel, setRoleLevel] = useState("");
  const [sector, setSector] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [jobSpec, setJobSpec] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [activeTab, setActiveTab] = useState<"report" | "rewritten">("report");

  const loadingSteps = [
    "Checking language and tone...",
    "Reviewing requirements and qualifications...",
    "Scanning for exclusionary assumptions...",
    "Checking what is missing...",
    "Writing candidate lens summary...",
    "Generating your rewritten spec...",
  ];

  const toggleFocus = (chip: string) => {
    setFocusAreas(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const getScoreColour = (scoreText: string) => {
    const num = parseInt(scoreText);
    if (num >= 8) return { bg: "#DCFCE7", border: "#86EFAC", text: "#166534", label: "Strong" };
    if (num >= 5) return { bg: "#FEF3C7", border: "#FCD34D", text: "#92400E", label: "Developing" };
    return { bg: "#FEE2E2", border: "#FCA5A5", text: "#B91C1C", label: "Needs Work" };
  };

  const handleSubmit = async () => {
    if (!sector || !jobSpec.trim()) {
      setError("Please select a sector and paste your job spec before running the check.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    setLoadingStep(0);
    setActiveTab("report");

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await fetch("/api/jd-equity-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleLevel, sector, focusAreas, jobSpec }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;
    const text = [
      `JOB SPEC EQUITY CHECK REPORT`,
      ``,
      `OVERALL SCORE`,
      result.score,
      ``,
      `WHAT THIS SPEC DOES WELL`,
      result.positives,
      ``,
      `FLAGS`,
      result.flags.map(f =>
        `[${f.severity}] ${f.category}\nOriginal: "${f.original}"\nIssue: ${f.issue}\nSuggested rewrite: ${f.rewrite}`
      ).join("\n\n"),
      ``,
      `WHAT IS MISSING`,
      result.missing.map(m =>
        `${m.item}\nWhy it matters: ${m.why}\nSuggested addition: ${m.suggestion}`
      ).join("\n\n"),
      ``,
      `CANDIDATE LENS`,
      result.candidateLens,
      ``,
      `REQUIREMENTS COUNT`,
      `Original: ${result.requirements.originalCount} requirements`,
      `Revised: ${result.requirements.revisedEssential} essential, ${result.requirements.revisedDesirable} desirable`,
      result.requirements.insight,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySpec = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.rewrittenSpec);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const scoreColours = result ? getScoreColour(result.score) : null;

  return (
    <>
      <PlatformNav />
      <div style={{ background: "var(--sage-xlight)", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 2rem 1.75rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                Inclusion AI
              </span>
              <span style={{ color: "var(--gray-soft)", fontSize: "0.78rem" }}>›</span>
              <span style={{ fontSize: "0.78rem", color: "var(--charcoal)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Job Spec Equity Check
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <span style={{ fontSize: "2.2rem" }}>💼</span>
              <div>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.9rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                  Job Spec Equity Check
                </h1>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-soft)", marginTop: "0.4rem", lineHeight: 1.6 }}>
                  Paste any job specification and receive a full equity review: flagged issues with rewrites, what is missing, a candidate perspective, and a complete revised spec ready to post.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem" }}>

          {/* Form */}
          {!result && (
            <div style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", border: "1px solid var(--gray-border)", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "1.5rem" }}>
                Tell us about this role
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "0.4rem" }}>
                    Role level <span style={{ color: "var(--gray-soft)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <select
                    value={roleLevel}
                    onChange={e => setRoleLevel(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", appearance: "none" }}
                  >
                    <option value="">Select level</option>
                    {ROLE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "0.4rem" }}>
                    Sector <span style={{ color: "#B91C1C", fontSize: "0.8rem" }}>required</span>
                  </label>
                  <select
                    value={sector}
                    onChange={e => setSector(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", appearance: "none" }}
                  >
                    <option value="">Select sector</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "0.6rem" }}>
                  What do you think this spec needs help with? <span style={{ color: "var(--gray-soft)", fontWeight: 400 }}>(select all that apply)</span>
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {FOCUS_CHIPS.map(chip => (
                    <button
                      key={chip}
                      onClick={() => toggleFocus(chip)}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "20px",
                        border: focusAreas.includes(chip) ? "2px solid #C9A84C" : "1.5px solid var(--gray-border)",
                        background: focusAreas.includes(chip) ? "#FAF5E9" : "var(--white)",
                        color: focusAreas.includes(chip) ? "#A8883C" : "var(--charcoal)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        fontWeight: focusAreas.includes(chip) ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "0.4rem" }}>
                  Paste your job spec here <span style={{ color: "#B91C1C", fontSize: "0.8rem" }}>required</span>
                </label>
                <textarea
                  value={jobSpec}
                  onChange={e => setJobSpec(e.target.value)}
                  placeholder="Paste the full job specification here, including all sections..."
                  rows={14}
                  style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.6, resize: "vertical", boxSizing: "border-box" }}
                />
                <div style={{ textAlign: "right", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", marginTop: "0.3rem" }}>
                  {jobSpec.trim().split(/\s+/).filter(Boolean).length} words
                </div>
              </div>

              {error && (
                <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#B91C1C" }}>
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: "10px", padding: "0.85rem 2rem", fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.15s ease" }}
              >
                Check this spec
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ background: "var(--white)", borderRadius: "16px", padding: "3rem 2rem", border: "1px solid var(--gray-border)", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", border: "4px solid var(--gray-border)", borderTopColor: "#C9A84C", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1.5rem" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", fontWeight: 500, marginBottom: "0.5rem" }}>
                {loadingSteps[loadingStep]}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>
                This usually takes 20 to 30 seconds
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Results */}
          {result && (
            <div>
              {/* Score banner */}
              <div style={{ background: scoreColours!.bg, border: `1.5px solid ${scoreColours!.border}`, borderRadius: "16px", padding: "1.5rem 2rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 800, color: scoreColours!.text }}>
                    {result.score.split(":")[0]}
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: scoreColours!.text, marginLeft: "0.5rem" }}>/ 10</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: scoreColours!.text, marginTop: "0.3rem", lineHeight: 1.5 }}>
                    {result.score.includes(":") ? result.score.split(":").slice(1).join(":").trim() : ""}
                  </p>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: scoreColours!.text, background: "rgba(255,255,255,0.6)", padding: "0.4rem 1rem", borderRadius: "20px" }}>
                  {scoreColours!.label}
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {(["report", "rewritten"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "0.55rem 1.25rem",
                      borderRadius: "8px",
                      border: activeTab === tab ? "2px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
                      background: activeTab === tab ? "var(--sage-dark)" : "var(--white)",
                      color: activeTab === tab ? "var(--white)" : "var(--charcoal)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {tab === "report" ? "Audit Report" : "Revised Spec"}
                  </button>
                ))}
                <button
                  onClick={() => { setResult(null); setJobSpec(""); setSector(""); setRoleLevel(""); setFocusAreas([]); }}
                  style={{ marginLeft: "auto", padding: "0.55rem 1.25rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", background: "var(--white)", color: "var(--gray-soft)", fontFamily: "var(--font-body)", fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Check another spec
                </button>
              </div>

              {activeTab === "report" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                  {/* Positives */}
                  <div style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      ✓ What this spec does well
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--charcoal)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                      {result.positives}
                    </p>
                  </div>

                  {/* Flags */}
                  {result.flags.length > 0 && (
                    <div style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "1rem" }}>
                        Issues found ({result.flags.length})
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {result.flags.map((flag, i) => {
                          const sev = SEVERITY_COLOURS[flag.severity] || SEVERITY_COLOURS["Enhancement"];
                          return (
                            <div key={i} style={{ borderRadius: "10px", border: "1px solid var(--gray-border)", overflow: "hidden" }}>
                              <div style={{ padding: "0.6rem 1rem", background: "var(--sage-xlight)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--charcoal)" }}>{flag.category}</span>
                                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.65rem", borderRadius: "20px", background: sev.bg, color: sev.text }}>
                                  {flag.severity}
                                </span>
                              </div>
                              <div style={{ padding: "1rem" }}>
                                <div style={{ background: "#FEF3C7", borderLeft: "3px solid #F59E0B", padding: "0.5rem 0.75rem", borderRadius: "0 6px 6px 0", marginBottom: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#78350F", fontStyle: "italic" }}>
                                  "{flag.original}"
                                </div>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{flag.issue}</p>
                                <div style={{ background: "#F0FDF4", borderLeft: "3px solid #86EFAC", padding: "0.5rem 0.75rem", borderRadius: "0 6px 6px 0", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#166534" }}>
                                  <span style={{ fontWeight: 600 }}>Suggested rewrite: </span>{flag.rewrite}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Missing */}
                  {result.missing.length > 0 && (
                    <div style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "1rem" }}>
                        What is missing ({result.missing.length})
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {result.missing.map((m, i) => (
                          <div key={i} style={{ borderRadius: "10px", border: "1px solid var(--gray-border)", padding: "1rem" }}>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.3rem" }}>{m.item}</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--gray-soft)", lineHeight: 1.6, marginBottom: "0.6rem" }}>{m.why}</p>
                            <div style={{ background: "#F0FDF4", borderLeft: "3px solid #86EFAC", padding: "0.5rem 0.75rem", borderRadius: "0 6px 6px 0", fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "#166534" }}>
                              <span style={{ fontWeight: 600 }}>Suggested addition: </span>{m.suggestion}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Candidate lens */}
                  <div style={{ background: "#FAF5E9", borderRadius: "12px", padding: "1.5rem", border: "1.5px solid rgba(201,168,76,0.4)" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#A8883C", marginBottom: "0.75rem" }}>
                      👁 Candidate perspective
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--charcoal)", lineHeight: 1.7, fontStyle: "italic" }}>
                      "{result.candidateLens}"
                    </p>
                  </div>

                  {/* Requirements count */}
                  <div style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "1rem" }}>
                      Requirements: before and after
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ background: "#FEE2E2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "#B91C1C" }}>{result.requirements.originalCount}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#B91C1C", fontWeight: 600 }}>Original requirements</div>
                      </div>
                      <div style={{ background: "#DCFCE7", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "#166534" }}>
                          {result.requirements.revisedEssential + result.requirements.revisedDesirable}
                        </div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#166534", fontWeight: 600 }}>
                          {result.requirements.revisedEssential} essential · {result.requirements.revisedDesirable} desirable
                        </div>
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.6, background: "var(--sage-xlight)", padding: "0.75rem 1rem", borderRadius: "8px" }}>
                      {result.requirements.insight}
                    </p>
                  </div>

                  {/* Copy report button */}
                  <button
                    onClick={copyReport}
                    style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "10px", padding: "0.75rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "var(--charcoal)", cursor: "pointer" }}
                  >
                    {copied ? "✓ Copied" : "Copy full report"}
                  </button>
                </div>
              )}

              {activeTab === "rewritten" && (
                <div style={{ background: "var(--white)", borderRadius: "12px", padding: "1.75rem", border: "1px solid var(--gray-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)" }}>
                      Revised job specification
                    </h3>
                    <button
                      onClick={copySpec}
                      style={{ background: "#C9A84C", border: "none", borderRadius: "8px", padding: "0.55rem 1.25rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--white)", cursor: "pointer" }}
                    >
                      {copiedSpec ? "✓ Copied" : "Copy revised spec"}
                    </button>
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--charcoal)", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "var(--sage-xlight)", padding: "1.5rem", borderRadius: "10px" }}>
                    {result.rewrittenSpec}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomBanner />
    </>
  );
}
