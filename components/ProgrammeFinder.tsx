"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  // Typing effect state
  const [typed, setTyped] = useState("");
  const [typed2, setTyped2] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  const [showOutcomes, setShowOutcomes] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const canSubmit = !!q1 && !!q2 && !!q3;

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function handleSubmit() {
    const r = getResult(q1, q2, q3);
    setResult(r);
    setSubmitted(true);
    setTyped("");
    setTyped2("");
    setShowOutcomes(false);
    setIsTyping(true);
    setIsTyping2(false);
    clearTimeouts();

    // Type first why sentence
    let i = 0;
    const speed = 18;
    function typeChar() {
      if (i < r.why.length) {
        const idx = i;
        const t = setTimeout(() => {
          setTyped(r.why.slice(0, idx + 1));
          i++;
          typeChar();
        }, speed);
        timeoutsRef.current.push(t);
        i++;
      } else {
        // Pause then type second sentence
        setIsTyping(false);
        const pause = setTimeout(() => {
          setIsTyping2(true);
          let j = 0;
          function typeChar2() {
            if (j < r.why2.length) {
              const jdx = j;
              const t2 = setTimeout(() => {
                setTyped2(r.why2.slice(0, jdx + 1));
                j++;
                typeChar2();
              }, speed);
              timeoutsRef.current.push(t2);
              j++;
            } else {
              setIsTyping2(false);
              const showT = setTimeout(() => setShowOutcomes(true), 200);
              timeoutsRef.current.push(showT);
            }
          }
          typeChar2();
        }, 400);
        timeoutsRef.current.push(pause);
      }
    }
    typeChar();
  }

  function handleReset() {
    clearTimeouts();
    setQ1(""); setQ2(""); setQ3("");
    setSubmitted(false);
    setResult(null);
    setTyped(""); setTyped2("");
    setIsTyping(false); setIsTyping2(false);
    setShowOutcomes(false);
  }

  useEffect(() => () => clearTimeouts(), []);

  return (
    <section style={{ padding: "1.75rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "700px", height: "350px", background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.05) 45%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "0.75rem" }}>Inclusion AI: Programme Finder</span>

        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)", color: "var(--charcoal)", margin: "0 0 0.25rem", lineHeight: 1.1 }}>
          Not sure where to start?<br />
          <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #A8741A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Find your programme in 60 seconds.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6b5a3a", margin: "0 0 1.1rem", lineHeight: 1.5 }}>Answer three questions and we will recommend the right starting point for your organisation.</p>

        {!submitted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", textAlign: "left" }}>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", minWidth: "200px", flexShrink: 0 }}>What is driving this work right now?</span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "📋 Legislation and legal duties", val: "legislation" },
                  { label: "🧭 Strategic planning", val: "strategic" },
                  { label: "🌱 Culture and behaviour change", val: "culture" },
                  { label: "🤷 Not sure yet", val: "unsure" },
                ].map(({ label, val }) => (
                  <button key={val} onClick={() => setQ1(val)}
                    style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: `1.5px solid ${q1 === val ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: q1 === val ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.83rem", color: q1 === val ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: q1 === val ? "none" : "0 0 0 3px rgba(201,168,76,0.12)" }}
                  >{label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", minWidth: "200px", flexShrink: 0 }}>How would you describe your organisation?</span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "🏢 Single site", val: "single" },
                  { label: "🏙 Multiple sites or teams", val: "multisite" },
                  { label: "🌱 Pursuing B Corp certification", val: "bcorp" },
                  { label: "💼 Financial services", val: "financial" },
                ].map(({ label, val }) => (
                  <button key={val} onClick={() => setQ2(val)}
                    style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: `1.5px solid ${q2 === val ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: q2 === val ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.83rem", color: q2 === val ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: q2 === val ? "none" : "0 0 0 3px rgba(201,168,76,0.12)" }}
                  >{label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", minWidth: "200px", flexShrink: 0 }}>What does success look like for you?</span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "📐 A plan the whole organisation owns", val: "plan" },
                  { label: "🤝 Leadership and team alignment", val: "alignment" },
                  { label: "🌱 Behaviour change that actually sticks", val: "behaviour" },
                ].map(({ label, val }) => (
                  <button key={val} onClick={() => setQ3(val)}
                    style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: `1.5px solid ${q3 === val ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: q3 === val ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.83rem", color: q3 === val ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: q3 === val ? "none" : "0 0 0 3px rgba(201,168,76,0.12)" }}
                  >{label}</button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: "0.2rem", display: "flex", justifyContent: "center" }}>
              <button onClick={handleSubmit} disabled={!canSubmit}
                style={{ padding: "0.75rem 2.25rem", borderRadius: "12px", background: !canSubmit ? "linear-gradient(160deg, #FDFAF5 0%, #FAF6EE 100%)" : "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", border: `1.5px solid ${!canSubmit ? "rgba(201,168,76,0.3)" : "#C9A84C"}`, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: !canSubmit ? "#9a8060" : "var(--charcoal)", cursor: !canSubmit ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: !canSubmit ? "none" : "0 0 0 3px rgba(201,168,76,0.25), 0 0 20px rgba(201,168,76,0.35), 0 4px 16px rgba(201,168,76,0.2)" }}
              >Find my programme →</button>
            </div>
          </div>
        ) : result && (
          <div style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "16px", padding: "1.75rem", boxShadow: "0 0 0 3px rgba(201,168,76,0.12), 0 0 18px 4px rgba(201,168,76,0.13), 0 4px 20px rgba(0,0,0,0.06)", textAlign: "left", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1rem" }}>{result.label}</span>

              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)", color: "var(--charcoal)", margin: "0 0 0.6rem", lineHeight: 1.15 }}>{result.name}</h3>

              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, color: "var(--sage-dark)", background: "var(--sage-xlight)", borderRadius: "999px", padding: "0.25rem 0.875rem", marginBottom: "1.1rem" }}>{result.timeline}</span>

              {/* Typing area */}
              <div style={{ minHeight: "4rem", marginBottom: "0.75rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#4a3a20", lineHeight: 1.75, margin: "0 0 0.6rem" }}>
                  {typed}
                  {isTyping && <span style={{ display: "inline-block", width: "2px", height: "1em", background: "#C9A84C", marginLeft: "2px", verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />}
                </p>
                {typed2 && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#4a3a20", lineHeight: 1.75, margin: 0 }}>
                    {typed2}
                    {isTyping2 && <span style={{ display: "inline-block", width: "2px", height: "1em", background: "#C9A84C", marginLeft: "2px", verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />}
                  </p>
                )}
              </div>

              {/* Outcomes + CTAs fade in after typing */}
              <div style={{ transition: "opacity 0.4s, transform 0.4s", opacity: showOutcomes ? 1 : 0, transform: showOutcomes ? "translateY(0)" : "translateY(8px)", pointerEvents: showOutcomes ? "auto" : "none" }}>
                <ul style={{ margin: "0 0 1.5rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {result.outcomes.map((o, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--charcoal)", lineHeight: 1.55 }}>
                      <span style={{ color: "#C9A84C", fontWeight: 700, flexShrink: 0, marginTop: "0.05rem" }}>✓</span>
                      {o}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                  <Link href={result.ctaHref}
                    style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", background: "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(42,74,48,0.25)" }}
                  >{result.ctaLabel}</Link>
                  <button onClick={handleReset}
                    style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#8B6914", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >Start again</button>
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#9a8060", margin: "1rem 0 0", lineHeight: 1.5 }}>
                  Not quite right? <Link href="/contact-us" style={{ color: "#7A5200", textDecoration: "underline", textUnderlineOffset: "3px" }}>Want to talk it through first?</Link> We are happy to help you find the right fit before you commit to anything.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </section>
  );
}
