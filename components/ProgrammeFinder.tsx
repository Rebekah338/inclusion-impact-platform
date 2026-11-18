"use client";
import { useState, useEffect, useRef } from "react";

// Programme Finder (consultancy page).
// Staggered: one question gives an instant recommendation; two optional
// questions then sharpen it; the ask (book a call) comes last.
import Link from "next/link";
import { TOOL_CSS, Reveal, Preparing, TickList, ExpertSignature, ShareWithLeader, SITE_URL, logToolEvent, contactWithContext } from "@/components/ToolExtras";

type Result = {
  label: string;
  name: string;
  why: string;
  why2: string;
  outcomes: string[];
  timeline: string;
  ctaLabel: string;
  ctaHref: string;
};

function getResult(q1: string, q2: string, q3: string): Result {
  // B Corp path
  if (q2 === "bcorp") {
    return {
      label: "Recommended for you",
      name: "B Corp JEDI Assessment & Strategy",
      why: `Your focus on B Corp certification means you need more than good intentions: you need verified evidence, demographic data, and a multi-year action plan that assessors can follow.`,
      why2: `This programme is built specifically for organisations at your stage. It gives you the structure, the evidence base, and the strategic clarity to move through your assessment with confidence rather than scrambling to fill gaps at the last minute.`,
      outcomes: [
        "A verified, evidence-based JEDI submission that holds up to scrutiny",
        "Demographic data collected and analysed in a privacy-compliant way",
        "A multi-year action plan assessors can follow across Years 0, 3 and 5",
      ],
      timeline: "Typically 3 to 6 months",
      ctaLabel: "Book a B Corp JEDI call →",
      ctaHref: "/contact-us",
    };
  }

  // Legislation / compliance path
  if (q1 === "legislation") {
    return {
      label: "Recommended for you",
      name: "2027 Roadmap",
      why: `Legislation is moving fast, and the organisations that are ahead of it are the ones who built a plan before the pressure hit. That is exactly what the 2027 Roadmap is designed to do.`,
      why2: `It gives your leadership team a single, credible plan they own and can act on: with named actions, measurable KPIs, and confidence that your duties under current and incoming employment law are met. Your board gets the evidence; your staff get to be part of shaping it.`,
      outcomes: [
        "Confidence that your duties under current and incoming employment law are met",
        "A live roadmap with named actions, owners and measurable KPIs",
        "Six-month pulse data to show progress to your board and stakeholders",
      ],
      timeline: "Typically 3 to 4 months",
      ctaLabel: "Book a 2027 Roadmap call →",
      ctaHref: "/contact-us",
    };
  }

  // Multi-site / alignment path
  if (q2 === "multisite" || q3 === "alignment") {
    return {
      label: "Recommended for you",
      name: "Inclusive Leadership Programme",
      why: `When you have multiple sites or teams, the biggest risk is inconsistency: managers using different standards, staff having very different experiences depending on who they report to.`,
      why2: `The Inclusive Leadership Programme fixes that. It builds a shared language, shared tools and shared standards across every team and location: so inclusion is not dependent on one enthusiastic manager, but embedded into how your whole organisation operates.`,
      outcomes: [
        "Managers across every location using the same language, tools and standards",
        "A measurable shift in confidence: tracked before and after",
        "A branded toolkit that stays with your organisation after the programme ends",
      ],
      timeline: "Typically 4 to 6 months",
      ctaLabel: "Book an Inclusive Leadership call →",
      ctaHref: "/contact-us",
    };
  }

  // Culture / behaviour change path
  if (q1 === "culture" || q3 === "behaviour") {
    return {
      label: "Recommended for you",
      name: "Inclusive Leadership Programme",
      why: `Culture change does not happen through a policy document or a one-off training day. It happens when the people with the most influence; your managers and leaders; are equipped to show up differently every single day.`,
      why2: `The Inclusive Leadership Programme gives them the practical tools, the language and the confidence to do that. The shift it creates is measurable: we track confidence before and after, and you leave with a branded toolkit your organisation keeps long after the programme ends.`,
      outcomes: [
        "Practical tools for meetings, recruitment, feedback and conduct",
        "A measurable shift in confidence: tracked before and after",
        "A branded toolkit that stays with your organisation after the programme ends",
      ],
      timeline: "Typically 4 to 6 months",
      ctaLabel: "Book an Inclusive Leadership call →",
      ctaHref: "/contact-us",
    };
  }

  // Financial services
  if (q2 === "financial") {
    return {
      label: "Recommended for you",
      name: "Inclusive Leadership Programme",
      why: `Financial services organisations carry specific FCA responsibilities around inclusion that most generic training programmes simply do not address. You need something built for your context.`,
      why2: `The Inclusive Leadership Programme gives your managers clarity on their regulatory responsibilities alongside the practical tools to lead inclusively: so compliance and culture reinforce each other rather than sitting in separate boxes.`,
      outcomes: [
        "Managers clear on their FCA responsibilities and how inclusion connects to them",
        "Practical tools for meetings, recruitment, feedback and conduct",
        "A measurable shift in confidence: tracked before and after",
      ],
      timeline: "Typically 4 to 6 months",
      ctaLabel: "Book an Inclusive Leadership call →",
      ctaHref: "/contact-us",
    };
  }

  // Strategic planning / whole-org plan
  if (q1 === "strategic" || q3 === "plan") {
    return {
      label: "Recommended for you",
      name: "2027 Roadmap",
      why: `Strategic planning only works when the whole organisation is behind it; not just HR, not just the senior leadership team, but every layer of the business. The 2027 Roadmap is built around that principle.`,
      why2: `It starts with listening: staff voice shapes the plan, so the people most affected by your inclusion decisions are part of creating them. You end up with a live roadmap your leadership team owns, with real KPIs and a foundation that makes every year after easier.`,
      outcomes: [
        "A leadership team aligned behind a single, credible plan they own and can act on",
        "Clarity on where your inclusion gaps sit: in policy, practice, data or culture",
        "A foundation that makes every year after easier",
      ],
      timeline: "Typically 3 to 4 months",
      ctaLabel: "Book a 2027 Roadmap call →",
      ctaHref: "/contact-us",
    };
  }

  // Default
  return {
    label: "Let's find out together",
    name: "Discovery conversation",
    why: `Every organisation we work with is different, and the right starting point matters. Based on your answers, a short conversation would help us point you in exactly the right direction before recommending a specific programme.`,
    why2: `There is no obligation and no sales pitch. Just an honest conversation about where you are, what you are trying to achieve, and which of our programmes would actually move the needle for your organisation.`,
    outcomes: [
      "A clear sense of which programme fits your organisation",
      "Honest advice on scope, timeline and investment",
      "No obligation: just a useful conversation",
    ],
    timeline: "30 minutes",
    ctaLabel: "Book a discovery call →",
    ctaHref: "/contact-us",
  };
}

export default function ProgrammeFinder() {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [ready, setReady] = useState(false);
  const [changed, setChanged] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  // A brief "matching" moment, then the recommendation fades in
  function reveal() {
    if (timer.current) clearTimeout(timer.current);
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setPreparing(false); setReady(true); return; }
    setPreparing(true);
    timer.current = setTimeout(() => { setPreparing(false); setReady(true); }, 450);
  }

  function chooseDriver(val: string) {
    setQ1(val);
    const r = getResult(val, q2, q3);
    setResult(r);
    setChanged(false);
    reveal();
    logToolEvent("programme-finder", "result", { driver: label(DRIVERS, val), recommended: r.name });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  function sharpen(nextQ2: string, nextQ3: string) {
    setQ2(nextQ2);
    setQ3(nextQ3);
    const r = getResult(q1, nextQ2, nextQ3);
    const isNew = r.name !== result?.name || r.why !== result?.why;
    setResult(r);
    setChanged(isNew);
    if (isNew) reveal();
    logToolEvent("programme-finder", "sharpened", { driver: label(DRIVERS, q1), organisation: label(ORGS, nextQ2), success: label(SUCCESS, nextQ3), recommended: r.name });
  }

  const label = (list: { label: string; val: string }[], val: string) => list.find((x) => x.val === val)?.label || "";

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setQ1(""); setQ2(""); setQ3("");
    setResult(null);
    setPreparing(false);
    setReady(false);
    setChanged(false);
  }

  const font = { display: "var(--font-display)", heading: "var(--font-heading)", body: "var(--font-body)" };
  const goldEdge = "#A8741A";
  const warm = "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)";
  const darkChip = (selected: boolean): React.CSSProperties => ({
    fontFamily: font.heading, fontWeight: 600, fontSize: "0.84rem", color: selected ? "var(--forest)" : "var(--white)",
    background: selected ? "#E3F5E2" : "rgba(255,255,255,0.08)", border: `1.5px solid ${selected ? "#E3F5E2" : "rgba(226,194,101,0.6)"}`,
    borderRadius: "999px", padding: "0.5rem 1rem", cursor: "pointer", minHeight: "38px",
  });
  const chip = (selected: boolean): React.CSSProperties => ({
    fontFamily: font.heading, fontWeight: 600, fontSize: "0.84rem", color: "var(--forest)",
    background: selected ? "#E3F5E2" : warm, border: `1.5px solid ${selected ? "var(--evergreen)" : goldEdge}`,
    borderRadius: "999px", padding: "0.5rem 1rem", cursor: "pointer", minHeight: "38px",
  });

  const DRIVERS = [
    { label: "Legislation and legal duties", val: "legislation" },
    { label: "Strategic planning", val: "strategic" },
    { label: "Culture and behaviour change", val: "culture" },
    { label: "Not sure yet", val: "unsure" },
  ];
  const ORGS = [
    { label: "Single site", val: "single" },
    { label: "Multiple sites or teams", val: "multisite" },
    { label: "Pursuing B Corp certification", val: "bcorp" },
    { label: "Financial services", val: "financial" },
  ];
  const SUCCESS = [
    { label: "A plan the whole organisation owns", val: "plan" },
    { label: "Leadership and team alignment", val: "alignment" },
    { label: "Behaviour change that actually sticks", val: "behaviour" },
  ];

  return (
    <section style={{ padding: "2.85rem 1.5rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #F3E9DD 100%)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .pf-chip:hover { border-color: #7A5200 !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.18); }
        .pf-go { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .pf-go:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(26,50,32,0.45), 0 0 0 3px rgba(226,194,101,0.35), inset 0 1px 0 rgba(255,255,255,0.18); }
        @keyframes pfBlink { 50% { opacity: 0; } }
        ${TOOL_CSS}
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 55%, #142A1A 100%)", border: "1px solid rgba(226,194,101,0.25)", borderRadius: "18px", boxShadow: "0 20px 50px rgba(26,50,32,0.35)", overflow: "hidden", padding: "1.4rem 2rem 1.3rem" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-130px", right: "-100px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ display: "inline-block", fontFamily: font.heading, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#E2C265", background: "rgba(226,194,101,0.12)", border: "1px solid rgba(226,194,101,0.45)", borderRadius: "999px", padding: "0.3rem 0.85rem", marginBottom: "0.6rem" }}>
            Interactive Tool: Programme Finder
          </span>
          <h2 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 1.95rem)", color: "var(--white)", margin: "0 0 0.3rem", lineHeight: 1.15 }}>
            Three programmes. One right fit.<br />
            <span style={{ whiteSpace: "nowrap", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Find yours in 60 seconds.</span>
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.85)", margin: "0 auto", maxWidth: "760px", lineHeight: 1.5 }}>
            Answer one question for an instant recommendation, then sharpen it if you like.
          </p>
        </div>

        {/* Step 1: one question */}
        <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", textAlign: "center", margin: "0 0 0.6rem" }}>What is driving this work right now?</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
          {DRIVERS.map((d) => (
            <button key={d.val} type="button" className="tool-chip-dark" aria-pressed={q1 === d.val} onClick={() => chooseDriver(d.val)} style={darkChip(q1 === d.val)}>{d.label}</button>
          ))}
        </div>
        {!result && (
          <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.86rem", color: "var(--white)", textAlign: "center", margin: "0.9rem 0 0" }}>
            One tap for an instant recommendation. No details needed.
          </p>
        )}

        {/* Step 2: the recommendation, straight away */}
        {result && (
          <div ref={resultRef} aria-live="polite" style={{ marginTop: "1.25rem", background: "var(--white)", border: "1.5px solid rgba(107,143,113,0.3)", borderRadius: "14px", padding: "1.35rem 1.5rem", boxShadow: "0 4px 20px rgba(26,50,32,0.08)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--evergreen)" }}>{result.label}</span>
              {changed && (
                <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.7rem", color: "#7A5200", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(168,116,26,0.55)", borderRadius: "999px", padding: "0.15rem 0.6rem" }}>Updated for your answers</span>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <h3 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "1.45rem", color: "var(--deep-pine)", margin: 0, lineHeight: 1.2 }}>{result.name}</h3>
              <span style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.78rem", color: "var(--forest)", background: "#E3F5E2", borderRadius: "999px", padding: "0.2rem 0.75rem" }}>{result.timeline}</span>
            </div>
            {preparing ? (
              <Preparing label="Matching your programme..." lines={4} />
            ) : (
              <div key={result.name + result.why}>
                <Reveal i={0}><p style={{ fontFamily: font.body, fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 0.5rem" }}>{result.why}</p></Reveal>
                <Reveal i={1}><p style={{ fontFamily: font.body, fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 0.6rem" }}>{result.why2}</p></Reveal>
                <div style={{ marginBottom: "1rem" }}><TickList items={result.outcomes} startDelay={2} /></div>
              </div>
            )}
            {ready && (
              <Reveal i={5}>
                {/* Step 3: optional, sharper */}
                <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
                  <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.86rem", color: "var(--forest)", margin: "0 0 0.5rem" }}>Sharpen your recommendation (optional)</p>
                  <p style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", margin: "0 0 0.4rem" }}>How would you describe your organisation?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "0.7rem" }}>
                    {ORGS.map((o) => (
                      <button key={o.val} type="button" className="pf-chip" aria-pressed={q2 === o.val} onClick={() => sharpen(q2 === o.val ? "" : o.val, q3)} style={chip(q2 === o.val)}>{o.label}</button>
                    ))}
                  </div>
                  <p style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", margin: "0 0 0.4rem" }}>What does success look like for you?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {SUCCESS.map((o) => (
                      <button key={o.val} type="button" className="pf-chip" aria-pressed={q3 === o.val} onClick={() => sharpen(q2, q3 === o.val ? "" : o.val)} style={chip(q3 === o.val)}>{o.label}</button>
                    ))}
                  </div>
                </div>

                {/* Step 4: then the ask */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.9rem", marginTop: "1.1rem" }}>
                  <Link href={contactWithContext(
                    `Programme Finder: recommended ${result.name}; driving the work: ${label(DRIVERS, q1).toLowerCase() || "not given"}${q2 ? `; organisation: ${label(ORGS, q2).toLowerCase()}` : ""}${q3 ? `; success looks like: ${label(SUCCESS, q3).toLowerCase()}` : ""}`,
                    "Inclusion Consultancy"
                  )} className="pf-go" style={{ padding: "0.75rem 1.6rem", borderRadius: "10px", border: "1px solid rgba(226,194,101,0.35)", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 55%, #142A1A 100%)", color: "var(--white)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", boxShadow: "0 6px 20px rgba(26,50,32,0.35), inset 0 1px 0 rgba(255,255,255,0.14)" }}>
                    <span aria-hidden="true" style={{ color: "#E2C265", marginRight: "0.45rem" }}>✦</span>{result.ctaLabel.replace(/\s*→$/, "")}
                  </Link>
                  <ShareWithLeader
                    subject={`A programme we could consider: ${result.name}`}
                    body={`Hi,\n\nI used The Inclusion Edit's Programme Finder to look at where we could focus our inclusion work. It recommended the ${result.name} (${result.timeline.toLowerCase()}).\n\n${result.why}\n\nWhat it would give us:\n${result.outcomes.map((o) => `\u2022 ${o}`).join("\n")}\n\nI think this is worth a conversation. More detail here: ${SITE_URL}/edi-consultancy-programmes\n`}
                  />
                  <button type="button" onClick={reset} style={{ background: "none", border: "none", padding: 0, fontFamily: font.heading, fontWeight: 600, fontSize: "0.82rem", color: "var(--evergreen)", textDecoration: "underline", cursor: "pointer" }}>
                    Start again
                  </button>
                </div>
                <ExpertSignature />
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
