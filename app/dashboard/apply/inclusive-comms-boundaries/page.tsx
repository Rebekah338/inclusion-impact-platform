"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Comfort = "not-ready" | "getting-there" | "can-use";

const COMFORT_OPTIONS: { value: Comfort; label: string; short: string; color: string; bg: string; border: string }[] = [
  { value: "not-ready",     label: "Not ready",     short: "Not ready",     color: "#991b1b", bg: "#fff1f2", border: "#fecaca" },
  { value: "getting-there", label: "Getting there", short: "Getting there", color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
  { value: "can-use",       label: "I can use this", short: "Can use",      color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
];

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

const ALL_PHRASES = [
  ...GREEN_PHRASES.map(p => ({ phrase: p, level: "green" as const })),
  ...AMBER_PHRASES.map(p => ({ phrase: p, level: "amber" as const })),
  ...RED_PHRASES.map(p => ({ phrase: p, level: "red" as const })),
];

const LEVEL_META = {
  green: { label: "Green Boundaries", sub: "Stating your intentions and expectations", dot: "#22c55e", color: "#166534", border: "#bbf7d0", bg: "#f0fdf4", cardBorder: "2px solid #bbf7d0" },
  amber: { label: "Amber Boundaries", sub: "Re-establishing expectations",             dot: "#f59e0b", color: "#92400e", border: "#fde68a", bg: "#fffbeb", cardBorder: "2px solid #fde68a" },
  red:   { label: "Red Boundaries",   sub: "Pausing or stepping away",                dot: "#ef4444", color: "#991b1b", border: "#fecaca", bg: "#fff1f2", cardBorder: "2px solid #fecaca" },
};

const SCENARIOS = [
  { text: "A colleague repeatedly talks over you in a team meeting.", answer: "green", hint: "You want to stay in the conversation but need the dynamic to shift." },
  { text: "Someone raises their voice at you during a disagreement.", answer: "green", hint: "You can address the tone while staying present." },
  { text: "A manager dismisses your idea without hearing you out, again.", answer: "amber", hint: "You need to reset expectations more firmly." },
  { text: "A conversation becomes hostile and you feel unsafe continuing.", answer: "red", hint: "Your wellbeing comes first. It is okay to step away." },
];

export default function InclusiveCommsBoundaries() {
  const [copied, setCopied] = useState<string | null>(null);
  const [comfort, setComfort] = useState<Record<string, Comfort>>({});
  const [activeTab, setActiveTab] = useState<"phrases" | "progress" | "practice">("phrases");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const setRating = (phrase: string, val: Comfort) => {
    setComfort(prev => prev[phrase] === val ? { ...prev, [phrase]: undefined as any } : { ...prev, [phrase]: val });
  };

  const ratedCount = Object.values(comfort).filter(Boolean).length;
  const canUseCount = Object.values(comfort).filter(v => v === "can-use").length;
  const gettingThereCount = Object.values(comfort).filter(v => v === "getting-there").length;
  const notReadyCount = Object.values(comfort).filter(v => v === "not-ready").length;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const lines: string[] = [
      "INCLUSIVE COMMUNICATIONS AND BOUNDARIES",
      "The Inclusion Edit",
      "",
      "GREEN BOUNDARIES: Stating your intentions and expectations",
      ...GREEN_PHRASES.map((p, i) => `${i + 1}. ${p}`),
      "",
      "AMBER BOUNDARIES: Re-establishing expectations",
      ...AMBER_PHRASES.map((p, i) => `${i + 1}. ${p}`),
      "",
      "RED BOUNDARIES: Pausing or stepping away",
      ...RED_PHRASES.map((p, i) => `${i + 1}. ${p}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inclusive-comms-boundaries.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const nextScenario = () => {
    setScenarioIndex(i => (i + 1) % SCENARIOS.length);
    setScenarioAnswer(null);
  };

  const PhraseCard = ({ phrase, level }: { phrase: string; level: "green" | "amber" | "red" }) => {
    const meta = LEVEL_META[level];
    const rating = comfort[phrase];
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.875rem" }}>
          <p style={{ flex: 1, margin: 0, color: "var(--charcoal)", lineHeight: 1.65, fontSize: "0.9375rem" }}>{phrase}</p>
          <button onClick={() => handleCopy(phrase)} style={{ flexShrink: 0, background: meta.color, color: "#fff", border: "none", borderRadius: 7, padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            {copied === phrase ? "Copied!" : "Copy"}
          </button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginRight: 4, alignSelf: "center" }}>My comfort:</span>
          {COMFORT_OPTIONS.map(opt => {
            const active = rating === opt.value;
            return (
              <button key={opt.value} onClick={() => setRating(phrase, opt.value)} style={{
                fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20, cursor: "pointer",
                border: `1.5px solid ${active ? opt.color : "#d1d5db"}`,
                background: active ? opt.bg : "#f9fafb",
                color: active ? opt.color : "#6b7280",
                transition: "all 0.15s"
              }}>{opt.short}</button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Communications and Boundaries
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          A practical toolkit for communicating inclusively at work: language that welcomes, boundaries that protect, and ready-to-use phrases for when you need them. Rate each phrase for how comfortable you feel using it to track your own development.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Communication", "Inclusion Practices", "Language"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>

        {/* Key */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {(["green", "amber", "red"] as const).map(level => {
            const m = LEVEL_META[level];
            return (
              <div key={level} style={{ display: "flex", alignItems: "center", gap: 8, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.label.split(" ")[0]}</span>
                  <span style={{ fontSize: 12, color: m.color, opacity: 0.8 }}> &mdash; {m.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "#fff", borderRadius: 12, padding: "0.375rem", border: "1px solid #e5e7eb" }}>
          {(["phrases", "progress", "practice"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "0.625rem", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", background: activeTab === tab ? "var(--sage-dark)" : "transparent", color: activeTab === tab ? "#fff" : "var(--charcoal)", transition: "all 0.15s" }}>
              {tab === "phrases" ? "All Phrases" : tab === "progress" ? `My Progress${ratedCount > 0 ? ` (${ratedCount})` : ""}` : "Practice Mode"}
            </button>
          ))}
        </div>

        {/* All Phrases */}
        {activeTab === "phrases" && (
          <>
            {(["green", "amber", "red"] as const).map(level => {
              const meta = LEVEL_META[level];
              const phrases = level === "green" ? GREEN_PHRASES : level === "amber" ? AMBER_PHRASES : RED_PHRASES;
              return (
                <div key={level} style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", border: meta.cardBorder }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: meta.dot, flexShrink: 0 }} />
                    <div>
                      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, margin: 0, color: meta.color }}>{meta.label}</h2>
                      <p style={{ fontSize: "0.8rem", color: meta.color, margin: 0, opacity: 0.8 }}>{meta.sub}</p>
                    </div>
                  </div>
                  {phrases.map(phrase => <PhraseCard key={phrase} phrase={phrase} level={level} />)}
                </div>
              );
            })}
          </>
        )}

        {/* My Progress */}
        {activeTab === "progress" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid #e5e7eb" }}>
            {ratedCount === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--charcoal)", opacity: 0.6 }}>
                <p style={{ fontSize: "2rem", marginBottom: 8 }}>📊</p>
                <p style={{ margin: 0 }}>Rate phrases in the All Phrases tab and your progress will appear here.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 1.25rem" }}>Your Comfort Ratings</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
                  {[
                    { label: "I can use this", count: canUseCount, color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
                    { label: "Getting there", count: gettingThereCount, color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
                    { label: "Not ready", count: notReadyCount, color: "#991b1b", bg: "#fff1f2", border: "#fecaca" },
                  ].map(s => (
                    <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.count}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                    <span>{ratedCount} of {ALL_PHRASES.length} phrases rated</span>
                    <span>{Math.round((canUseCount / ALL_PHRASES.length) * 100)}% ready to use</span>
                  </div>
                  <div style={{ background: "#e5e7eb", borderRadius: 8, height: 8, overflow: "hidden" }}>
                    <div style={{ background: "var(--sage-dark)", height: "100%", width: `${(canUseCount / ALL_PHRASES.length) * 100}%`, transition: "width 0.3s" }} />
                  </div>
                </div>
                <div style={{ marginTop: 24 }}>
                  {(["not-ready", "getting-there", "can-use"] as Comfort[]).map(level => {
                    const rated = ALL_PHRASES.filter(({ phrase }) => comfort[phrase] === level);
                    if (rated.length === 0) return null;
                    const opt = COMFORT_OPTIONS.find(o => o.value === level)!;
                    return (
                      <div key={level} style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: opt.color, marginBottom: 8 }}>{opt.label} ({rated.length})</p>
                        {rated.map(({ phrase }) => (
                          <div key={phrase} style={{ background: opt.bg, border: `1px solid ${opt.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 6, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                            <p style={{ fontSize: 14, margin: 0, color: "var(--charcoal)", lineHeight: 1.55, flex: 1 }}>{phrase}</p>
                            <button onClick={() => handleCopy(phrase)} style={{ flexShrink: 0, background: opt.color, color: "#fff", border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                              {copied === phrase ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Practice Mode */}
        {activeTab === "practice" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Practice Mode</h3>
            <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0 0 1.5rem" }}>Read the scenario and decide which boundary level fits best.</p>
            <div style={{ background: "var(--sage-xlight)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>
                Scenario {scenarioIndex + 1} of {SCENARIOS.length}
              </div>
              <p style={{ margin: 0, color: "var(--charcoal)", fontWeight: 500, lineHeight: 1.6, fontSize: "1rem" }}>{SCENARIOS[scenarioIndex].text}</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
              {["green", "amber", "red"].map(level => {
                const m = LEVEL_META[level as keyof typeof LEVEL_META];
                const active = scenarioAnswer === level;
                return (
                  <button key={level} onClick={() => setScenarioAnswer(level)} style={{ flex: 1, padding: "0.75rem", borderRadius: 10, border: `2px solid ${active ? m.dot : "#e5e7eb"}`, background: active ? m.bg : "#fff", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", color: m.color, transition: "all 0.15s" }}>
                    {level.charAt(0).toUpperCase() + level.slice(1)} Boundary
                  </button>
                );
              })}
            </div>
            {scenarioAnswer && (
              <div style={{ borderRadius: 10, padding: "1rem", background: scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#f0fdf4" : "#fff1f2", border: `1px solid ${scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#bbf7d0" : "#fecaca"}`, marginBottom: "1rem" }}>
                <p style={{ margin: 0, fontWeight: 600, color: scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "#166534" : "#991b1b" }}>
                  {scenarioAnswer === SCENARIOS[scenarioIndex].answer ? "Great choice. " : `The best match is a ${SCENARIOS[scenarioIndex].answer} boundary. `}
                  {SCENARIOS[scenarioIndex].hint}
                </p>
              </div>
            )}
            <button onClick={nextScenario} style={{ background: "var(--sage-dark)", color: "#fff", border: "none", borderRadius: 10, padding: "0.75rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
              Next Scenario
            </button>
          </div>
        )}
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why inclusive communication is a leadership practice</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The way we communicate at work shapes who feels welcome and who does not. Inclusive communication is not about policing language or walking on eggshells: it is about choosing words and approaches that respect people's dignity, acknowledge their identity, and create space for genuine participation. Done well, it makes teams more effective and workplaces more humane.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Language norms in professional environments have historically reflected the dominant group's preferences and assumptions. Jargon that assumes a particular educational background, humour that relies on shared cultural references, or communication styles that expect everyone to self-promote in the same way all create subtle barriers for people who were not in the room when those norms were set.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Boundaries are part of inclusive communication too. When people are able to name their needs, push back on language that does not sit right, or opt out of interactions that feel harmful, they are exercising the kind of agency that makes inclusion sustainable rather than performative. Supporting boundaries is not just about protecting individuals: it is about building a culture where everyone can do their best work.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { slug: "micro-affirmation-examples", format: "Reference Tool", title: "Micro-Affirmation Examples" },
              { slug: "mitigating-sexism-misogyny", format: "Guide", title: "Mitigating Sexism and Misogyny" },
              { slug: "making-policies-inclusive", format: "Checklist", title: "Making Policies Inclusive" },
            ].map(r => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Save / Print bar */}
      <div style={{ background: "var(--charcoal)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", fontSize: 16 }}>Save or print this resource</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Download all phrases as a text file, or print as a PDF from your browser.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleDownload} style={{ background: "#fff", color: "var(--charcoal)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Download phrases (.txt)
            </button>
            <button onClick={handlePrint} style={{ background: "var(--sage-dark)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Print as PDF
            </button>
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
