"use client";

// Starting Point Finder (homepage).
// Staggered so people get value before we ask for anything:
// 1. One question: what do you need help with (a button, or their own words)
// 2. Their five practical steps appear straight away
// 3. Optional: sector and stage, to make the steps more personal
// 4. Then the email ask: the steps plus a free resource, sent through /api/finder-signup

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FINDER_STEPS, SECTOR_PHRASE, STAGE_LABEL } from "@/lib/finder-content";
import { TOOL_CSS, Reveal, Preparing, NumberedSteps, ExpertSignature, ShareWithLeader, SITE_URL, logToolEvent, contactWithContext } from "@/components/ToolExtras";

type Route = "policy" | "training" | "business-case" | "strategy" | "data" | "general";

const NEEDS: { label: string; route: Route }[] = [
  { label: "Writing a policy", route: "policy" },
  { label: "Training that sticks", route: "training" },
  { label: "Making the business case", route: "business-case" },
  { label: "Building a strategy", route: "strategy" },
  { label: "Using data", route: "data" },
  { label: "Not sure yet", route: "general" },
];

// Sector order: corporate first, then public bodies, charities and schools
const SECTORS = ["Corporate or private sector", "Public sector", "Charity or third sector", "Education", "Healthcare", "Other"];
const STAGES = ["Just starting", "In progress", "Want to go deeper"];

// A short note under the steps that changes with the stage they choose
const STAGE_TIP: Record<string, string> = {
  "Just starting": "As you are just starting, focus on the first two steps this month. The rest will be easier once those are in place.",
  "In progress": "As you already have work under way, pick the step you have not done yet and give it your full attention this month.",
  "Want to go deeper": "As you are ready to go deeper, use these steps to stretch what you already do, and consider outside support to move faster.",
};

const RESOURCE_NAME: Record<Route, string> = {
  policy: "Making Policies Inclusive",
  training: "the Inclusive Leadership Self-Assessment",
  "business-case": "Talking to Sceptical Stakeholders",
  strategy: "the 30/60/90 Day Action Planner",
  data: "the Inclusive Data Collection guide",
  general: "the Inclusion Maturity Framework",
};

const NEXT_STEP: Record<Route, { cta: { label: string; href: string }; locked: string }> = {
  policy: { cta: { label: "Talk to Us About Policy", href: "/contact-us" }, locked: "Policy writing guide" },
  training: { cta: { label: "Explore Our Training", href: "/edi-training" }, locked: "Training resources" },
  "business-case": { cta: { label: "Read the Business Case", href: "/the-inclusion-business-case" }, locked: "Business case toolkit" },
  strategy: { cta: { label: "Explore Our Consultancy", href: "/edi-consultancy-programmes" }, locked: "Inclusion strategy toolkit" },
  data: { cta: { label: "Talk to Us About Data", href: "/contact-us" }, locked: "Data and audit guide" },
  general: { cta: { label: "Explore Our Consultancy", href: "/edi-consultancy-programmes" }, locked: "Resource library" },
};

// Their own words are matched to a route; nothing they type is shown back or emailed
function routeFromText(text: string): Route {
  const t = text.toLowerCase();
  if (t.includes("policy") || t.includes("policies")) return "policy";
  if (t.includes("train") || t.includes("stuck") || t.includes("learn")) return "training";
  if (t.includes("business case") || t.includes("leadership") || t.includes("board") || t.includes("buy-in") || t.includes("buy in")) return "business-case";
  if (t.includes("strategy") || t.includes("plan") || t.includes("roadmap")) return "strategy";
  if (t.includes("data") || t.includes("audit") || t.includes("measure") || t.includes("survey") || t.includes("pay gap")) return "data";
  return "general";
}

const font = { display: "var(--font-display)", heading: "var(--font-heading)", body: "var(--font-body)" };
const goldEdge = "#A8741A";
const warm = "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)";

// dark: buttons sitting on the dark green panel; otherwise on the white results card
function chip(selected: boolean, dark = false): React.CSSProperties {
  if (dark) {
    return {
      fontFamily: font.heading, fontWeight: 600, fontSize: "0.82rem", color: selected ? "var(--forest)" : "var(--white)",
      background: selected ? "#E3F5E2" : "rgba(255,255,255,0.08)", border: `1.5px solid ${selected ? "#E3F5E2" : "rgba(226,194,101,0.6)"}`,
      borderRadius: "999px", padding: "0.45rem 0.95rem", cursor: "pointer", minHeight: "36px",
    };
  }
  return {
    fontFamily: font.heading, fontWeight: 600, fontSize: "0.82rem", color: "var(--forest)",
    background: selected ? "#E3F5E2" : warm, border: `1.5px solid ${selected ? "var(--evergreen)" : goldEdge}`,
    borderRadius: "999px", padding: "0.45rem 0.95rem", cursor: "pointer", minHeight: "36px",
  };
}

export default function StartingPointFinder() {
  const [route, setRoute] = useState<Route | null>(null);
  const [need, setNeed] = useState("");
  const [preparing, setPreparing] = useState(false);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [lockedOpen, setLockedOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tailorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  // A brief "preparing" moment, then the steps fade in one after another
  const show = (r: Route, typedOwnWords = false) => {
    if (timer.current) clearTimeout(timer.current);
    logToolEvent("starting-point-finder", "result", { need: NEEDS.find((n) => n.route === r)?.label || r, typed: typedOwnWords });
    setRoute(r);
    setSent(false);
    setError("");
    setLockedOpen(false);
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    setPreparing(!reduce);
    if (!reduce) timer.current = setTimeout(() => setPreparing(false), 450);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  };

  // Sector and stage taps: update the steps and count the choice (anonymously)
  const tailor = (nextSector: string, nextStage: string) => {
    setSector(nextSector);
    setStage(nextStage);
    // Wait until they stop tapping, so two taps count as one tailoring
    if (tailorTimer.current) clearTimeout(tailorTimer.current);
    if (route && (nextSector || nextStage)) {
      tailorTimer.current = setTimeout(() => {
        logToolEvent("starting-point-finder", "tailored", { need: NEEDS.find((n) => n.route === route)?.label || route, sector: nextSector, stage: nextStage });
      }, 2500);
    }
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setRoute(null);
    setNeed("");
    setPreparing(false);
    setSector("");
    setStage("");
    setEmail("");
    setSent(false);
    setError("");
  };

  const sendEmail = async () => {
    if (!route || sending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please check your email address and try again.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/finder-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, route, sector, stage, who: "", need, newsletter, website: honey }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error === "invalid_email"
            ? "Please check your email address and try again."
            : data.error === "busy"
            ? "We have had a lot of requests today. Please try again tomorrow, or email info@theinclusionedit.com."
            : "Sorry, we could not send your steps just now. Please try again, or email info@theinclusionedit.com."
        );
      }
    } catch {
      setError("Sorry, we could not send your steps just now. Please try again, or email info@theinclusionedit.com.");
    }
    setSending(false);
  };

  const lines = route ? FINDER_STEPS[route].split("\n").map((l) => l.trim()).filter(Boolean) : [];
  const intro = (lines[0] || "").replace(/\s*Here are five steps[^.:]*[.:]$/, "");
  const steps = lines.filter((l) => /^\d\.\s/.test(l)).map((l) => l.replace(/^\d\.\s/, ""));
  const closing = lines.length > 1 && !/^\d\.\s/.test(lines[lines.length - 1]) ? lines[lines.length - 1] : "";
  const needLabel = route ? (NEEDS.find((n) => n.route === route)?.label || "our inclusion work") : "";
  const shareSubject = "Five practical inclusion steps we could take";
  const shareBody = route
    ? `Hi,\n\nI used The Inclusion Edit's Starting Point Finder to look at where we could start with ${route === "general" ? "our inclusion work" : needLabel.toLowerCase()}. It suggested five practical steps:\n\n${steps.map((st, i) => `${i + 1}. ${st}`).join("\n")}\n\n${closing}\n\nI think these are worth a conversation. You can try the tool here: ${SITE_URL}\n`
    : "";

  const tailored =
    sector || stage
      ? `Tailored for you: ${sector ? `working ${SECTOR_PHRASE[sector] || "in your sector"}` : ""}${sector && stage ? ", " : ""}${stage ? STAGE_LABEL[stage] : ""}. That is a common place to be, and these steps work from there.`
      : "";

  return (
    <section style={{ padding: "2.85rem 1.5rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #F3E9DD 100%)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .spf-chip:hover { border-color: #7A5200 !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.18); }
        .spf-input:focus { border-color: #7A5200 !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.18); }
        .spf-go { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .spf-go:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(26,50,32,0.45), 0 0 0 3px rgba(226,194,101,0.35), inset 0 1px 0 rgba(255,255,255,0.18); }
        @media (max-width: 640px) { .spf-ask { flex-direction: column; } }
        @keyframes spfBlink { 50% { opacity: 0; } }
        ${TOOL_CSS}
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 55%, #142A1A 100%)", border: "1px solid rgba(226,194,101,0.25)", borderRadius: "18px", boxShadow: "0 20px 50px rgba(26,50,32,0.35)", overflow: "hidden", padding: "1.4rem 2rem 1.3rem" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-130px", right: "-100px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ display: "inline-block", fontFamily: font.heading, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#E2C265", background: "rgba(226,194,101,0.12)", border: "1px solid rgba(226,194,101,0.45)", borderRadius: "999px", padding: "0.3rem 0.85rem", marginBottom: "0.6rem" }}>
            Interactive Tool: Starting Point Finder
          </span>
          <h2 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 1.95rem)", color: "var(--white)", margin: "0 0 0.3rem", lineHeight: 1.15 }}>
            Wherever you are with inclusion, there&rsquo;s a next step.<br />
            <span style={{ whiteSpace: "nowrap", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Find yours.</span>
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.85)", margin: "0 auto", maxWidth: "760px", lineHeight: 1.5 }}>
            Choose what you need help with and get five practical steps you can act on this week.
          </p>
        </div>

        {/* Step 1: one question */}
        <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", textAlign: "center", margin: "0 0 0.6rem" }}>What do you need help with?</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "0.9rem" }}>
          {NEEDS.map((n) => (
            <button key={n.route} type="button" className="tool-chip-dark" onClick={() => { setNeed(""); show(n.route); }} aria-pressed={route === n.route && !need} style={chip(route === n.route && !need, true)}>
              {n.label}
            </button>
          ))}
        </div>
        <form
          className="spf-ask"
          onSubmit={(e) => { e.preventDefault(); if (need.trim().length > 1) show(routeFromText(need), true); }}
          style={{ display: "flex", gap: "0.5rem", maxWidth: "780px", margin: "0 auto", padding: "0.4rem", borderRadius: "14px", background: "var(--white)", border: "1.5px solid #E2C265", boxShadow: "0 0 0 4px rgba(226,194,101,0.14), 0 10px 30px rgba(0,0,0,0.25)" }}
        >
          <label htmlFor="spf-need" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Or describe it in your own words</label>
          <input
            id="spf-need"
            className="spf-input"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="Or describe it in your own words, for example: making training stick"
            style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid transparent", fontFamily: font.body, fontSize: "0.98rem", color: "var(--ink)", outline: "none", background: "transparent" }}
          />
          <button
            type="submit"
            className="spf-go"
            disabled={need.trim().length < 2}
            style={{ padding: "0.75rem 1.6rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.35)", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", color: "#1A3220", fontFamily: font.heading, fontWeight: 700, fontSize: "0.95rem", cursor: need.trim().length < 2 ? "default" : "pointer", whiteSpace: "nowrap", minHeight: "44px", boxShadow: "0 6px 20px rgba(26,50,32,0.35), inset 0 1px 0 rgba(255,255,255,0.14)" }}
          >
            <span aria-hidden="true" style={{ marginRight: "0.45rem" }}>✦</span>Find My Starting Point
          </button>
        </form>
        {!route && (
          <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.86rem", color: "var(--white)", textAlign: "center", margin: "0.85rem 0 0" }}>
            Free, instant, and no details needed to see your steps.
          </p>
        )}

        {/* Step 2: the steps, straight away */}
        {route && (
          <div ref={resultRef} aria-live="polite" style={{ marginTop: "1.25rem", background: "var(--white)", border: "1.5px solid rgba(107,143,113,0.3)", borderRadius: "14px", padding: "1.35rem 1.5rem", boxShadow: "0 4px 20px rgba(26,50,32,0.08)" }}>
            <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--evergreen)", margin: "0 0 0.6rem" }}>Your five steps</p>
            {tailored && (
              <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--forest)", fontWeight: 600, margin: "0 0 0.6rem", lineHeight: 1.55 }}>{tailored}</p>
            )}
            {preparing ? (
              <Preparing label="Preparing your steps..." lines={5} />
            ) : (
              <>
                {intro && <Reveal i={0}><p style={{ fontFamily: font.body, fontSize: "0.92rem", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 0.4rem" }}>{intro}</p></Reveal>}
                <NumberedSteps steps={steps} startDelay={1} />
                {stage && STAGE_TIP[stage] && (
                  <div key={stage} className="tool-reveal" style={{ marginTop: "0.75rem", padding: "0.75rem 0.95rem", borderRadius: "10px", background: "#E3F5E2", borderLeft: "4px solid var(--evergreen)" }}>
                    <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--evergreen)", margin: "0 0 0.25rem" }}>Where to begin</p>
                    <p style={{ fontFamily: font.body, fontSize: "0.9rem", lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>{STAGE_TIP[stage]}</p>
                  </div>
                )}
                {closing && <Reveal i={steps.length + 1}><p style={{ fontFamily: font.body, fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--slate)", margin: "0.4rem 0 0" }}>{closing}</p></Reveal>}
              </>
            )}

            {!preparing && (
              <Reveal i={steps.length + 2}>
                {/* Step 3: optional, more personal */}
                <div style={{ marginTop: "1.1rem", paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
                  <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.86rem", color: "var(--forest)", margin: "0 0 0.5rem" }}>Want these more tailored? Two quick taps (optional).</p>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", minWidth: "60px" }}>Sector</span>
                    {SECTORS.map((s) => (
                      <button key={s} type="button" className="spf-chip" aria-pressed={sector === s} onClick={() => tailor(sector === s ? "" : s, stage)} style={chip(sector === s)}>{s}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem" }}>
                    <span style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", minWidth: "60px" }}>Stage</span>
                    {STAGES.map((s) => (
                      <button key={s} type="button" className="spf-chip" aria-pressed={stage === s} onClick={() => tailor(sector, stage === s ? "" : s)} style={chip(stage === s)}>{s}</button>
                    ))}
                  </div>
                  {(sector || stage) && (
                    <p key={sector + stage} className="tool-reveal" role="status" style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.86rem", color: "var(--evergreen)", margin: "0.7rem 0 0" }}>
                      ✓ Tailored for {[sector ? (SECTOR_PHRASE[sector] || "your sector").replace(/^in (the )?/, "") : "", stage ? STAGE_LABEL[stage] : ""].filter(Boolean).join(", ")}.
                    </p>
                  )}
                </div>

                {/* Next steps */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.1rem" }}>
                  <Link href={NEXT_STEP[route].cta.href} style={{ padding: "0.7rem 1.4rem", borderRadius: "8px", background: "var(--evergreen)", color: "var(--white)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                    {NEXT_STEP[route].cta.label}
                  </Link>
                  <Link href={contactWithContext(
                    `Starting Point Finder: ${(NEEDS.find((n) => n.route === route)?.label || "Not sure yet").toLowerCase()}${sector ? `; ${sector.toLowerCase()}` : ""}${stage ? `; ${stage.toLowerCase()}` : ""}${need.trim() ? `; in their words: "${need.trim().slice(0, 120)}"` : ""}`,
                    route === "training" ? "Inclusion Training" : "Inclusion Consultancy"
                  )} style={{ padding: "0.7rem 1.4rem", borderRadius: "8px", background: "var(--white)", color: "var(--evergreen)", border: "2px solid var(--evergreen)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                    Book a Free Inclusion Call
                  </Link>
                  <div style={{ position: "relative" }}>
                    <button type="button" onClick={() => setLockedOpen((v) => !v)} aria-expanded={lockedOpen} style={{ padding: "0.7rem 1.2rem", borderRadius: "8px", background: warm, color: "#7A5200", border: `1.5px solid ${goldEdge}`, fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
                      <span aria-hidden="true">🔒</span> {NEXT_STEP[route].locked}
                    </button>
                    {lockedOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", left: 0, zIndex: 10, width: "280px", background: warm, border: `1.5px solid ${goldEdge}`, borderRadius: "12px", padding: "0.9rem 1.1rem", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}>
                        <p style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--ink)", margin: "0 0 0.6rem", lineHeight: 1.5 }}>This is part of the Impact Platform, ready to use the day you join.</p>
                        <Link href="/early-access" style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.82rem", color: "var(--evergreen)" }}>Get Early Access</Link>
                      </div>
                    )}
                  </div>
                  <ShareWithLeader subject={shareSubject} body={shareBody} />
                </div>

                {/* Step 4: then the email ask */}
                <div style={{ marginTop: "1.1rem", padding: "1rem 1.1rem", borderRadius: "12px", background: warm, border: "1px solid rgba(201,168,76,0.3)" }}>
                  {!sent ? (
                    <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
                      <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.9rem", color: "var(--forest)", margin: "0 0 0.5rem" }}>
                        Want these steps in your inbox? We&rsquo;ll send them with a free copy of {RESOURCE_NAME[route]}.
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <label htmlFor="spf-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Email address</label>
                        <input id="spf-email" className="spf-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" autoComplete="email"
                          style={{ flex: 1, minWidth: "220px", padding: "0.7rem 0.9rem", borderRadius: "8px", border: `1.5px solid ${goldEdge}`, background: "var(--white)", fontFamily: font.body, fontSize: "0.9rem", outline: "none" }} />
                        <button type="submit" disabled={sending} className="spf-go" style={{ padding: "0.7rem 1.4rem", borderRadius: "8px", border: "1px solid rgba(226,194,101,0.35)", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 55%, #142A1A 100%)", color: "var(--white)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.9rem", cursor: sending ? "default" : "pointer", minHeight: "44px" }}>
                          {sending ? "Sending..." : "Email Me These Steps"}
                        </button>
                      </div>
                      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)} name="website" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontFamily: font.body, fontSize: "0.8rem", color: "var(--slate)", lineHeight: 1.5, marginTop: "0.6rem", cursor: "pointer" }}>
                        <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} style={{ marginTop: "0.15rem", accentColor: "var(--evergreen)", width: "1rem", height: "1rem", flexShrink: 0 }} />
                        <span>Also send me The Inclusion Edit newsletter: one practical inclusion idea per edition. Unsubscribe at any time. <Link href="/privacy" style={{ color: "var(--evergreen)" }}>Privacy Policy</Link></span>
                      </label>
                      {error && <p role="alert" style={{ fontFamily: font.body, fontSize: "0.82rem", color: "#B42318", margin: "0.5rem 0 0" }}>{error}</p>}
                    </form>
                  ) : (
                    <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--forest)", margin: 0 }}>
                      ✓ On its way to your inbox. If it has not arrived in a few minutes, check your spam or promotions folder.
                    </p>
                  )}
                </div>

                <ExpertSignature />

                <p style={{ margin: "0.9rem 0 0" }}>
                  <button type="button" onClick={reset} style={{ background: "none", border: "none", padding: 0, fontFamily: font.heading, fontWeight: 600, fontSize: "0.82rem", color: "var(--evergreen)", textDecoration: "underline", cursor: "pointer" }}>
                    Start again
                  </button>
                </p>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
