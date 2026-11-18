"use client";

// See What's Inside for You (About the Platform page).
// One question, instant matches, then an optional ask: the visitor chooses one
// research report, case study or resource to have emailed; lessons, videos and
// Inclusion AI tools stay members only and are saved for their dashboard.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TOOL_CSS, ExpertSignature, ShareWithLeader, SITE_URL, logToolEvent } from "@/components/ToolExtras";

type Card = {
  kind: "lesson" | "video" | "ai" | "research" | "case" | "resource";
  id: string;
  title: string;
  desc: string;
  meta: string;
  takeaway: string;
  sendable: boolean;
};

// Example challenges typed into the empty search box, so it reads as a live tool
const EXAMPLES = [
  "getting my leaders on board",
  "our first pay gap report",
  "fairer hiring",
  "making a policy inclusive",
  "psychological safety in my team",
];

const TOPICS = ["Business case", "Recruitment", "Pay gap", "Policy", "Leadership buy-in", "Psychological safety"];

const KIND: Record<Card["kind"], { label: string; icon: string; locked: string }> = {
  research: { label: "Research", icon: "📊", locked: "" },
  case: { label: "Case study", icon: "🏢", locked: "" },
  resource: { label: "Resource", icon: "📄", locked: "" },
  lesson: { label: "Lesson", icon: "🎓", locked: "Saved to your dashboard when you join." },
  video: { label: "Video", icon: "🎬", locked: "Saved to your dashboard when you join." },
  ai: { label: "Inclusion AI tool", icon: "✨", locked: "Saved to your dashboard when you join." },
};

const font = {
  display: "var(--font-display)",
  heading: "var(--font-heading)",
  body: "var(--font-body)",
};

export default function SeeWhatsInside() {
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState("");
  const [cards, setCards] = useState<Card[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chosen, setChosen] = useState<Card | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState(EXAMPLES[0]);

  // Type each example out letter by letter, pause, then move to the next.
  // Stays still for anyone who prefers reduced motion.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let chars = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = EXAMPLES[i];
      chars += 1;
      setExample(full.slice(0, chars));
      if (chars < full.length) {
        timer = setTimeout(tick, 55);
      } else {
        timer = setTimeout(() => {
          i = (i + 1) % EXAMPLES.length;
          chars = 0;
          tick();
        }, 2200);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  const search = async (q: string) => {
    const text = q.trim();
    if (text.length < 2 || loading) return;
    setLoading(true);
    setError("");
    setChosen(null);
    setSent(false);
    try {
      // Keep the "preparing" moment for at least 450ms so results feel considered
      const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const [res] = await Promise.all([
        fetch("/api/inside-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: text }),
        }),
        new Promise((r) => setTimeout(r, reduce ? 0 : 450)),
      ]);
      const data = await res.json();
      if (!data.ok) throw new Error();
      setCards(data.cards);
      setAsked(text);
      logToolEvent("see-whats-inside", "result", TOPICS.includes(text) ? { topic: text } : { query: text });
    } catch {
      setError("Something went wrong finding your starting points. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const choose = (c: Card) => {
    setChosen(c);
    setSendError("");
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  const send = async () => {
    if (!chosen || !cards || sending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSendError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/inside-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          newsletter,
          website,
          query: asked,
          chosen: { kind: chosen.kind, id: chosen.id },
          matches: cards.map((c) => ({ kind: c.kind, id: c.id })),
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!data.ok) throw new Error();
      setSent(true);
    } catch {
      setSendError("Sorry, we couldn't send that just now. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setCards(null);
    setChosen(null);
    setSent(false);
    setQuery("");
  };

  return (
    <section style={{ padding: "2.85rem 1.5rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #F3E9DD 100%)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .swi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        @media (max-width: 1000px) { .swi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .swi-grid { grid-template-columns: 1fr; } .swi-ask { flex-direction: column; } .swi-fields { flex-direction: column; } }
        .swi-go { transition: transform 0.15s ease, box-shadow 0.2s ease; } .swi-go:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(26,50,32,0.45), 0 0 0 3px rgba(226,194,101,0.35), inset 0 1px 0 rgba(255,255,255,0.18); } .swi-card { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .swi-card:hover { box-shadow: 0 12px 40px rgba(26,50,32,0.16); transform: translateY(-2px); }
        .swi-chip:hover { border-color: #7A5200 !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.18); }
        .swi-input:focus { border-color: #7A5200 !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.18); }
        ${TOOL_CSS}
      `}</style>
      
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Tool panel */}
        <div style={{ maxWidth: "960px", margin: "0 auto", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 55%, #142A1A 100%)", border: "1px solid rgba(226,194,101,0.25)", borderRadius: "18px", boxShadow: "0 20px 50px rgba(26,50,32,0.35)", position: "relative", overflow: "hidden", padding: "1.4rem 2rem 1.15rem" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-130px", right: "-100px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ display: "inline-block", fontFamily: font.heading, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#E2C265", background: "rgba(226,194,101,0.12)", border: "1px solid rgba(226,194,101,0.45)", borderRadius: "999px", padding: "0.3rem 0.85rem", marginBottom: "0.6rem" }}>
            Interactive Tool: See What&rsquo;s Inside
          </span>
          <h2 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2rem)", color: "var(--white)", margin: "0 0 0.3rem", lineHeight: 1.15 }}>
            What&rsquo;s on your desk{" "}
            <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>right now?</span>
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.85)", margin: "0 auto", maxWidth: "800px", lineHeight: 1.5 }}>
            Tell us what you&rsquo;re working on and we&rsquo;ll show you four places to start inside the Impact Platform.
          </p>
        </div>

        {/* Ask */}
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <form
            className="swi-ask"
            onSubmit={(e) => { e.preventDefault(); search(query); }}
            style={{ display: "flex", gap: "0.5rem", marginBottom: "0.85rem", padding: "0.4rem", borderRadius: "14px", background: "var(--white)", border: "1.5px solid #E2C265", boxShadow: "0 0 0 4px rgba(226,194,101,0.14), 0 10px 30px rgba(0,0,0,0.25)" }}
          >
            <label htmlFor="swi-query" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>What are you working on?</label>
            <input
              id="swi-query"
              className="swi-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`For example: ${example}`}
              style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid transparent", fontFamily: font.body, fontSize: "1rem", color: "var(--ink)", outline: "none", background: "transparent" }}
            />
            <button
              type="submit"
              disabled={query.trim().length < 2 || loading}
              className="swi-go" style={{ padding: "0.75rem 1.6rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.35)", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", color: "#1A3220", fontFamily: font.heading, fontWeight: 700, fontSize: "0.95rem", cursor: query.trim().length < 2 || loading ? "default" : "pointer", whiteSpace: "nowrap", minHeight: "44px", boxShadow: "0 6px 20px rgba(26,50,32,0.35), inset 0 1px 0 rgba(255,255,255,0.14)" }}
            >
              {loading ? "Finding..." : <><span aria-hidden="true" style={{ marginRight: "0.45rem" }}>✦</span>Show Me What’s Inside</>}
            </button>
          </form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", marginRight: "0.25rem" }}>Or choose a topic:</span>
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                className="tool-chip-dark"
                onClick={() => { setQuery(t); search(t); }}
                style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.8rem", color: asked === t ? "var(--forest)" : "var(--white)", background: asked === t ? "#E3F5E2" : "rgba(255,255,255,0.08)", border: `1.5px solid ${asked === t ? "#E3F5E2" : "rgba(226,194,101,0.6)"}`, borderRadius: "999px", padding: "0.45rem 0.95rem", cursor: "pointer", minHeight: "36px" }}
              >
                {t}
              </button>
            ))}
          </div>
        <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.86rem", color: "var(--white)", textAlign: "center", margin: "0.85rem 0 0" }}>
          You&rsquo;ll get four starting points matched to you, and one to keep free.
        </p>
        <p style={{ fontFamily: font.body, fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", textAlign: "center", margin: "0.3rem 0 0", opacity: 0.85 }}>
          Searches 40 lessons, 45 practical tools, 47 research reports and case studies, 28 videos and 10 Inclusion AI tools.
        </p>
        {error && <p role="alert" style={{ fontFamily: font.body, fontSize: "0.9rem", color: "#B42318", textAlign: "center", margin: "1rem 0 0" }}>{error}</p>}
        </div>

        {/* Preparing */}
        {loading && (
          <div role="status" aria-live="polite" style={{ maxWidth: "960px", margin: "1.5rem auto 0" }}>
            <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.95rem", color: "var(--forest)", textAlign: "center", margin: "0 0 1.25rem" }}>Finding your starting points...</p>
            <div className="swi-grid">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ background: "var(--white)", border: "1.5px solid rgba(107,143,113,0.3)", borderRadius: "18px", padding: "1.25rem 1.2rem", height: "230px", boxSizing: "border-box" }}>
                  <div className="tool-shimmer" style={{ height: "10px", width: "45%", marginBottom: "1rem" }} />
                  <div className="tool-shimmer" style={{ height: "16px", width: "85%", marginBottom: "0.6rem" }} />
                  <div className="tool-shimmer" style={{ height: "12px", width: "40%", marginBottom: "1.2rem" }} />
                  <div className="tool-shimmer" style={{ height: "10px", width: "95%", marginBottom: "0.5rem" }} />
                  <div className="tool-shimmer" style={{ height: "10px", width: "80%", marginBottom: "0.5rem" }} />
                  <div className="tool-shimmer" style={{ height: "10px", width: "65%" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {cards && !loading && (
          <div aria-live="polite" style={{ maxWidth: "960px", margin: "1.5rem auto 0" }}>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--forest)", textAlign: "center", margin: "0 auto 1.5rem", maxWidth: "720px", lineHeight: 1.6 }}>
              Here are four places to start. Choose one to have sent to you now, and we&rsquo;ll save the rest to your dashboard for when you become a member.
            </p>
            <div className="swi-grid">
              {cards.map((c, idx) => {
                const k = KIND[c.kind];
                const isChosen = chosen?.kind === c.kind && chosen?.id === c.id;
                return (
                  <div key={`${c.kind}-${c.id}`} className="tool-reveal" style={{ animationDelay: `${idx * 90}ms`, display: "flex" }}>
                  <div
                    className="swi-card"
                    style={{ flex: 1, display: "flex", flexDirection: "column", background: c.sendable ? "var(--white)" : "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", border: isChosen ? "2px solid var(--evergreen)" : "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", padding: "1.25rem 1.2rem", boxShadow: "0 4px 20px rgba(26,50,32,0.10)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--evergreen)" }}>
                        <span aria-hidden="true">{k.icon}</span>&nbsp; {k.label}
                      </span>
                      {!c.sendable && (
                        <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.68rem", color: "var(--forest)", background: "var(--white)", border: "1px solid rgba(107,143,113,0.35)", borderRadius: "999px", padding: "0.15rem 0.55rem", whiteSpace: "nowrap" }}>
                          <span aria-hidden="true">🔒</span> Members Only
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "1rem", lineHeight: 1.35, color: "var(--forest)", margin: "0 0 0.35rem" }}>{c.title}</h3>
                    <p style={{ fontFamily: font.body, fontSize: "0.78rem", color: "var(--slate)", margin: "0 0 0.6rem" }}>{c.meta}</p>
                    <p style={{ fontFamily: font.body, fontSize: "0.86rem", color: "var(--ink)", lineHeight: 1.55, margin: "0 0 1rem", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {c.takeaway || c.desc}
                    </p>
                    <div style={{ marginTop: "auto" }}>
                      {c.sendable ? (
                        <button
                          type="button"
                          onClick={() => choose(c)}
                          aria-pressed={isChosen}
                          style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "8px", border: "2px solid var(--evergreen)", background: isChosen ? "var(--evergreen)" : "var(--white)", color: isChosen ? "var(--white)" : "var(--evergreen)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", minHeight: "44px" }}
                        >
                          {isChosen ? "✓ Chosen" : "Choose This One"}
                        </button>
                      ) : (
                        <p style={{ fontFamily: font.body, fontSize: "0.82rem", fontStyle: "italic", color: "var(--slate)", margin: 0, padding: "0.6rem 0", textAlign: "center" }}>{k.locked}</p>
                      )}
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>

            {/* Send */}
            {chosen && (
              <div ref={formRef} style={{ maxWidth: "640px", margin: "1.75rem auto 0", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "18px", padding: "1.6rem 1.75rem", boxShadow: "0 0 0 3px rgba(201,168,76,0.10), 0 12px 40px rgba(26,50,32,0.12)" }}>
                {sent ? (
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "1.5rem", color: "var(--deep-pine)", margin: "0 0 0.5rem" }}>On its way.</h3>
                    <p style={{ fontFamily: font.body, fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
                      Check your inbox for {chosen.title}. Your other three starting points are saved and will be waiting on your dashboard when you become a member.
                    </p>
                    <Link href="/early-access" style={{ display: "inline-block", padding: "0.85rem 1.75rem", borderRadius: "8px", background: "var(--evergreen)", color: "var(--white)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                      Get Early Access
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); send(); }}>
                    <h3 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "1.4rem", color: "var(--deep-pine)", margin: "0 0 0.4rem" }}>Where shall we send it?</h3>
                    <p style={{ fontFamily: font.body, fontSize: "0.92rem", color: "var(--slate)", lineHeight: 1.6, margin: "0 0 1.1rem" }}>
                      We&rsquo;ll email you {chosen.title} now, and save your other starting points to your dashboard for when you join.
                    </p>
                    <div className="swi-fields" style={{ display: "flex", gap: "0.6rem", marginBottom: "0.8rem" }}>
                      <label style={{ flex: 1 }}>
                        <span style={{ display: "block", fontFamily: font.heading, fontWeight: 600, fontSize: "0.8rem", color: "var(--forest)", marginBottom: "0.3rem" }}>First name</span>
                        <input className="swi-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" style={{ width: "100%", boxSizing: "border-box", padding: "0.75rem 0.9rem", borderRadius: "8px", border: "1.5px solid #6B8F71", fontFamily: font.body, fontSize: "0.92rem", outline: "none", background: "var(--white)" }} />
                      </label>
                      <label style={{ flex: 1.4 }}>
                        <span style={{ display: "block", fontFamily: font.heading, fontWeight: 600, fontSize: "0.8rem", color: "var(--forest)", marginBottom: "0.3rem" }}>Email</span>
                        <input className="swi-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={{ width: "100%", boxSizing: "border-box", padding: "0.75rem 0.9rem", borderRadius: "8px", border: "1.5px solid #6B8F71", fontFamily: font.body, fontSize: "0.92rem", outline: "none", background: "var(--white)" }} />
                      </label>
                    </div>
                    <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: font.body, fontSize: "0.88rem", color: "var(--ink)", marginBottom: "1.1rem", cursor: "pointer" }}>
                      <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} style={{ width: 18, height: 18, accentColor: "var(--evergreen)" }} />
                      Send me the monthly newsletter too
                    </label>
                    <button type="submit" disabled={sending} style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "8px", border: "none", background: "var(--evergreen)", color: "var(--white)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.95rem", cursor: sending ? "default" : "pointer", minHeight: "44px" }}>
                      {sending ? "Sending..." : "Send It to Me"}
                    </button>
                    {sendError && <p role="alert" style={{ fontFamily: font.body, fontSize: "0.88rem", color: "#B42318", margin: "0.75rem 0 0" }}>{sendError}</p>}
                  </form>
                )}
              </div>
            )}

            <div className="tool-reveal" style={{ animationDelay: "400ms", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.9rem", marginTop: "1.25rem", background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", borderRadius: "14px", padding: "0.4rem 1.25rem 0.9rem", boxShadow: "0 4px 20px rgba(26,50,32,0.10)", border: "1.5px solid rgba(107,143,113,0.3)" }}>
              <div style={{ flex: "1 1 420px" }}><ExpertSignature /></div>
              <div style={{ paddingTop: "0.75rem", flexShrink: 0 }}>
                <ShareWithLeader
                  subject="Where we could start with our inclusion work"
                  body={`Hi,\n\nI used The Inclusion Edit's See What's Inside tool to look at "${asked}". It matched four places we could start inside their Impact Platform:\n\n${cards.map((c) => `\u2022 ${KIND[c.kind].label}: ${c.title}`).join("\n")}\n\nI think this is worth a look. You can try it here: ${SITE_URL}/about-our-impact-platform\n`}
                />
              </div>
            </div>

            <p style={{ textAlign: "center", margin: "1.5rem 0 0" }}>
              <button type="button" onClick={reset} style={{ background: "none", border: "none", fontFamily: font.heading, fontWeight: 600, fontSize: "0.85rem", color: "var(--evergreen)", textDecoration: "underline", cursor: "pointer" }}>
                Search again
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
