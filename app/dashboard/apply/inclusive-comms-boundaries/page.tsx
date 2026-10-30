"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const GREEN_PHRASES = [
  "I am committed to this conversation, but I need us to speak respectfully to one another.",
  "I want us both to feel heard. Can we lower the intensity a little?",
  "I hear you, but the tone is making it difficult to engage. Can we reset?",
  "I want to understand your point, but I cannot do that when voices are raised.",
  "I am happy to continue, but only if we can speak calmly.",
  "I can see this is important to you. Can we take a breath and continue more constructively?",
  "I do not feel respected by how this is being communicated. Can we change the tone?",
  "This feels dismissive. I would appreciate a more considerate approach.",
  "I want to hear your perspective, but I need us to speak respectfully.",
  "I want this to be a two-way conversation. Can we make space for both of our voices?",
  "I am feeling talked over. Can we take turns so we both have space?",
];

const AMBER_PHRASES = [
  "I want this to be a safe and respectful conversation for both of us.",
  "I am setting a boundary here: I will not continue while being spoken to disrespectfully.",
  "Let us refocus: how can we move forward in a way that honours each other?",
];

const RED_PHRASES = [
  "I am going to pause this conversation; we can continue later in a better tone.",
  "I want this to be productive, so I am stepping away for now.",
];

const SCENARIOS = [
  { text: "A colleague repeatedly talks over you in a team meeting.", answer: "green", hint: "You want to stay in the conversation but need the dynamic to shift." },
  { text: "Someone raises their voice at you during a disagreement.", answer: "green", hint: "You can address the tone while staying present." },
  { text: "A manager dismisses your idea without hearing you out, again.", answer: "amber", hint: "You need to reset expectations more firmly." },
  { text: "A conversation becomes hostile and you feel unsafe continuing.", answer: "red", hint: "Your wellbeing comes first. It is okay to step away." },
];

export default function InclusiveCommsBoundaries() {
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"phrases" | "favourites" | "practice">("phrases");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const toggleSave = (phrase: string) => {
    setSaved(prev => prev.includes(phrase) ? prev.filter(p => p !== phrase) : [...prev, phrase]);
  };

  const nextScenario = () => {
    setScenarioIndex(i => (i + 1) % SCENARIOS.length);
    setScenarioAnswer(null);
  };

  const PhraseCard = ({ phrase, color, border, bg }: { phrase: string; color: string; border: string; bg: string }) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "0.875rem 1rem", marginBottom: "0.625rem" }}>
      <p style={{ flex: 1, margin: 0, color: "var(--charcoal)", lineHeight: 1.6, fontSize: "0.9375rem" }}>{phrase}</p>
      <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
        <button onClick={() => toggleSave(phrase)} title={saved.includes(phrase) ? "Remove from saved" : "Save phrase"} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}>
          {saved.includes(phrase) ? "❤️" : "🤍"}
        </button>
        <button onClick={() => handleCopy(phrase)} style={{ background: color, color: "var(--white)", border: "none", borderRadius: 7, padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          {copied === phrase ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/dashboard/apply" style={{ color: "var(--sage-dark)", fontSize: "0.875rem", textDecoration: "none" }}>
            Back to Resources
          </Link>
          <div style={{ marginTop: "1rem", background: "var(--sage-dark)", borderRadius: 16, padding: "2rem", color: "var(--white)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.5rem" }}>
              Communication Tool
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, margin: "0 0 0.75rem" }}>
              Inclusive Communication: Setting Boundaries with Care
            </h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              Creating inclusive spaces requires communication that centres respect, clarity, and emotional safety. Use these phrases when someone speaks to you in a dismissive or harmful way: in professional settings, community spaces, or everyday interactions.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[
            { color: "#22c55e", label: "Green: State expectations", textColor: "#166534" },
            { color: "#f59e0b", label: "Amber: Reassert boundaries", textColor: "#92400e" },
            { color: "#ef4444", label: "Red: Step away", textColor: "#991b1b" },
          ].map(({ color, label, textColor }) => (
            <div key={color} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: textColor, fontWeight: 600 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: color, flexShrink: 0 }} />
              {label}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--white)", borderRadius: 12, padding: "0.375rem", border: "1px solid var(--gray-border)" }}>
          {(["phrases", "favourites", "practice"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "0.625rem", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", background: activeTab === tab ? "var(--sage-dark)" : "transparent", color: activeTab === tab ? "var(--white)" : "var(--charcoal)", transition: "all 0.15s" }}>
              {tab === "phrases" ? "All Phrases" : tab === "favourites" ? `Saved (${saved.length})` : "Practice Mode"}
            </button>
          ))}
        </div>

        {activeTab === "phrases" && (
          <>
            <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", border: "2px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                <div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, margin: 0, color: "#166534" }}>Green Boundaries</h2>
                  <p style={{ fontSize: "0.8rem", color: "#166534", margin: 0, opacity: 0.8 }}>Stating your intentions and expectations</p>
                </div>
              </div>
              {GREEN_PHRASES.map(phrase => <PhraseCard key={phrase} phrase={phrase} color="#166534" border="#bbf7d0" bg="#f0fdf4" />)}
            </div>
            <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", border: "2px solid #fde68a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                <div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, margin: 0, color: "#92400e" }}>Amber Boundaries</h2>
                  <p style={{ fontSize: "0.8rem", color: "#92400e", margin: 0, opacity: 0.8 }}>Re-establishing expectations</p>
                </div>
              </div>
              {AMBER_PHRASES.map(phrase => <PhraseCard key={phrase} phrase={phrase} color="#92400e" border="#fde68a" bg="#fffbeb" />)}
            </div>
            <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", border: "2px solid #fecaca" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
                <div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, margin: 0, color: "#991b1b" }}>Red Boundaries</h2>
                  <p style={{ fontSize: "0.8rem", color: "#991b1b", margin: 0, opacity: 0.8 }}>Pausing or stepping away</p>
                </div>
              </div>
              {RED_PHRASES.map(phrase => <PhraseCard key={phrase} phrase={phrase} color="#991b1b" border="#fecaca" bg="#fff1f2" />)}
            </div>
          </>
        )}

        {activeTab === "favourites" && (
          <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
            {saved.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--charcoal)", opacity: 0.6 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🤍</div>
                <p style={{ margin: 0 }}>No saved phrases yet. Click the heart icon on any phrase to save it here.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 1rem" }}>Your Saved Phrases ({saved.length})</h3>
                {saved.map(phrase => (
                  <div key={phrase} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "var(--sage-xlight)", borderRadius: 10, padding: "0.875rem 1rem", marginBottom: "0.625rem" }}>
                    <p style={{ flex: 1, margin: 0, color: "var(--charcoal)", lineHeight: 1.6, fontSize: "0.9375rem" }}>{phrase}</p>
                    <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
                      <button onClick={() => toggleSave(phrase)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>❤️</button>
                      <button onClick={() => handleCopy(phrase)} style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 7, padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                        {copied === phrase ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => handleCopy(saved.join("

"))} style={{ marginTop: "0.75rem", background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 10, padding: "0.75rem 1.5rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}>
                  Copy All Saved Phrases
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "practice" && (
          <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Practice Mode</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--charcoal)", opacity: 0.7, margin: "0 0 1.5rem" }}>Read the scenario and decide which boundary level fits best.</p>
            <div style={{ background: "var(--sage-xlight)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>
                Scenario {scenarioIndex + 1} of {SCENARIOS.length}
              </div>
              <p style={{ margin: 0, color: "var(--charcoal)", fontWeight: 500, lineHeight: 1.6, fontSize: "1rem" }}>{SCENARIOS[scenarioIndex].text}</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
              {["green", "amber", "red"].map(level => (
                <button key={level} onClick={() => setScenarioAnswer(level)} style={{ flex: 1, padding: "0.75rem", borderRadius: 10, border: "2px solid", borderColor: scenarioAnswer === level ? (level === "green" ? "#22c55e" : level === "amber" ? "#f59e0b" : "#ef4444") : "var(--gray-border)", background: scenarioAnswer === level ? (level === "green" ? "#f0fdf4" : level === "amber" ? "#fffbeb" : "#fff1f2") : "var(--white)", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", color: level === "green" ? "#166534" : level === "amber" ? "#92400e" : "#991b1b" }}>
                  {level.charAt(0).toUpperCase() + level.slice(1)} Boundary
                </button>
              ))}
            </div>
            {scenarioAnswer && (
              <div style={{ borderRadius: 10, padding: "1rem", background: scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#f0fdf4" : "#fff1f2", border: `1px solid ${scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#bbf7d0" : "#fecaca"}`, marginBottom: "1rem" }}>
                <p style={{ margin: 0, fontWeight: 600, color: scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#166534" : "#991b1b" }}>
                  {scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "Great choice! " : `The best match is a ${SCENARIOS[scenarioIndex].answer} boundary. `}
                  {SCENARIOS[scenarioIndex].hint}
                </p>
              </div>
            )}
            <button onClick={nextScenario} style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 10, padding: "0.75rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
              Next Scenario
            </button>
          </div>
        )}
      </div>
      <BottomBanner />
    </div>
  );
}
