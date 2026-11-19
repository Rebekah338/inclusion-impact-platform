"use client";

// Accessibility toolbar for the website: a button in the bottom right corner that opens a panel of
// display and reading preferences. Choices are saved on the visitor's device. It adds preferences on
// top of an accessible site; it never replaces the underlying fixes.

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Contrast = "standard" | "high" | "cream";
type Prefs = {
  size: 0 | 1 | 2;
  contrast: Contrast;
  dyslexia: boolean;
  spacing: boolean;
  underline: boolean;
  motion: boolean;
  guide: boolean;
};

const DEFAULTS: Prefs = { size: 0, contrast: "standard", dyslexia: false, spacing: false, underline: false, motion: false, guide: false };
const STORE_KEY = "tie-a11y";
const RATES = [0.75, 1, 1.25, 1.5];

// Pages that belong to the member platform have their own controls.
const HIDDEN_ON = ["/dashboard", "/onboarding", "/sign-in", "/sign-up"];

function readPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* storage unavailable */ }
  return DEFAULTS;
}

function applyPrefs(p: Prefs) {
  const c = document.documentElement.classList;
  c.toggle("a11y-size-1", p.size === 1);
  c.toggle("a11y-size-2", p.size === 2);
  c.toggle("a11y-contrast-high", p.contrast === "high");
  c.toggle("a11y-contrast-cream", p.contrast === "cream");
  c.toggle("a11y-dyslexia", p.dyslexia);
  c.toggle("a11y-spacing", p.spacing);
  c.toggle("a11y-underline", p.underline);
  c.toggle("a11y-motion", p.motion);
}

// The readable text of the page, in reading order, one block at a time.
function readableBlocks(): HTMLElement[] {
  const root = document.querySelector("main") || document.body;
  const all = Array.from(root.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, li, blockquote, figcaption, summary, dt, dd, [data-listen], .faq-q-text"));
  return all.filter((el) => {
    if (el.closest("[data-a11y-toolbar], [aria-hidden='true'], nav, script, style")) return false;
    // Skip a block whose text is already covered by a readable block inside it.
    if (el.querySelector("h1, h2, h3, h4, p, li, blockquote")) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    const style = window.getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") return false;
    return (el.innerText || "").trim().length > 1;
  });
}

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const gb = voices.filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("en-gb"));
  const pool = gb.length ? gb : voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const preferred = pool.find((v) => /natural|enhanced|premium|google uk english female|serena|kate|sonia|libby/i.test(v.name));
  return preferred || pool[0] || voices[0];
}

const font = { heading: "var(--font-heading)", display: "var(--font-display)", body: "var(--font-body)" };

export default function AccessibilityToolbar() {
  const pathname = usePathname() || "/";
  const hidden = HIDDEN_ON.some((p) => pathname.startsWith(p));

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [canSpeak, setCanSpeak] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rateIndex, setRateIndex] = useState(1);
  const [guideY, setGuideY] = useState<number | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const queue = useRef<HTMLElement[]>([]);
  const position = useRef(0);
  const runId = useRef(0);
  const rateRef = useRef(1);

  // Load saved choices once.
  useEffect(() => {
    const saved = readPrefs();
    setPrefs(saved);
    applyPrefs(saved);
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyPrefs(next);
      try { window.localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  const reset = () => {
    applyPrefs(DEFAULTS);
    setPrefs(DEFAULTS);
    try { window.localStorage.removeItem(STORE_KEY); } catch { /* storage unavailable */ }
  };

  // Close with Escape and return focus to the button.
  useEffect(() => {
    if (!open) return;
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  // Reading guide follows the pointer.
  useEffect(() => {
    if (!prefs.guide) { setGuideY(null); return; }
    const onMove = (e: PointerEvent) => setGuideY(e.clientY);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [prefs.guide]);

  // ---- Listen to this page ----
  const clearHighlight = () => document.querySelectorAll(".a11y-reading").forEach((el) => el.classList.remove("a11y-reading"));

  const stop = useCallback(() => {
    runId.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    clearHighlight();
    setSpeaking(false);
    setPaused(false);
  }, []);

  const speakFrom = useCallback((index: number, id: number) => {
    const blocks = queue.current;
    if (id !== runId.current) return;
    if (index >= blocks.length) { stop(); return; }
    position.current = index;
    const el = blocks[index];
    clearHighlight();
    el.classList.add("a11y-reading");
    el.scrollIntoView({ block: "center", behavior: prefs.motion ? "auto" : "smooth" });
    const u = new SpeechSynthesisUtterance((el.innerText || "").replace(/\s+/g, " ").trim());
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "en-GB";
    u.rate = rateRef.current;
    u.onend = () => speakFrom(index + 1, id);
    u.onerror = () => speakFrom(index + 1, id);
    window.speechSynthesis.speak(u);
  }, [prefs.motion, stop]);

  const listen = useCallback(() => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    queue.current = readableBlocks();
    runId.current += 1;
    setSpeaking(true);
    setPaused(false);
    setOpen(false);
    speakFrom(0, runId.current);
  }, [canSpeak, speakFrom]);

  const togglePause = () => {
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };

  const changeRate = () => {
    const next = (rateIndex + 1) % RATES.length;
    setRateIndex(next);
    rateRef.current = RATES[next];
    if (speaking) {
      // Restart the current block at the new speed.
      window.speechSynthesis.cancel();
      runId.current += 1;
      setPaused(false);
      speakFrom(position.current, runId.current);
    }
  };

  // Hero buttons elsewhere on the site can start listening with this event.
  useEffect(() => {
    const onListen = () => listen();
    window.addEventListener("tie:listen", onListen);
    return () => window.removeEventListener("tie:listen", onListen);
  }, [listen]);

  // Stop reading when the visitor moves to another page.
  useEffect(() => { stop(); }, [pathname, stop]);

  if (hidden || !ready) return null;

  const changedCount =
    (prefs.size ? 1 : 0) + (prefs.contrast !== "standard" ? 1 : 0) +
    [prefs.dyslexia, prefs.spacing, prefs.underline, prefs.motion, prefs.guide].filter(Boolean).length;

  const segButton = (label: string, active: boolean, onClick: () => void, extra?: React.CSSProperties, aria?: string) => (
    <button type="button" onClick={onClick} aria-pressed={active} aria-label={aria} className="a11y-seg"
      style={{ flex: 1, minHeight: "44px", borderRadius: "8px", border: `1.5px solid ${active ? "#4A6347" : "rgba(107,143,113,0.45)"}`, background: active ? "#4A6347" : "#FFFFFF", color: active ? "#FFFFFF" : "#1C1C1C", fontFamily: font.heading, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", padding: "0 0.4rem", ...extra }}>
      {label}
    </button>
  );

  const toggleRow = (key: "dyslexia" | "spacing" | "underline" | "motion" | "guide", title: string, hint: string) => {
    const on = prefs[key];
    return (
      <button type="button" role="switch" aria-checked={on} onClick={() => update({ [key]: !on } as Partial<Prefs>)} className="a11y-row"
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", minHeight: "52px", padding: "0.45rem 0", background: "none", border: "none", borderTop: "1px solid #CFDDD1", cursor: "pointer", textAlign: "left" }}>
        <span>
          <span style={{ display: "block", fontFamily: font.heading, fontWeight: 700, fontSize: "0.9rem", color: "#1C1C1C" }}>{title}</span>
          <span style={{ display: "block", fontFamily: font.body, fontSize: "0.8rem", color: "#4B5B4E", lineHeight: 1.45 }}>{hint}</span>
        </span>
        <span aria-hidden="true" style={{ position: "relative", width: "46px", height: "26px", borderRadius: "999px", background: on ? "#4A6347" : "#B9C9BC", flexShrink: 0, transition: "background 0.2s" }}>
          <span style={{ position: "absolute", top: "3px", left: on ? "23px" : "3px", width: "20px", height: "20px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "left 0.2s" }} />
        </span>
      </button>
    );
  };

  const label = (text: string, id: string) => (
    <p id={id} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4B5B4E", margin: "0 0 0.45rem" }}>{text}</p>
  );

  return (
    <div data-a11y-toolbar="" className="a11y-toolbar">
      {/* Reading guide */}
      {prefs.guide && guideY !== null && (
        <div aria-hidden="true" style={{ position: "fixed", left: 0, right: 0, top: guideY - 22, height: "44px", background: "rgba(141,191,135,0.16)", borderTop: "2px solid rgba(74,99,71,0.55)", borderBottom: "2px solid rgba(74,99,71,0.55)", pointerEvents: "none", zIndex: 9997 }} />
      )}

      {/* Soft cream tint over the whole page */}
      {prefs.contrast === "cream" && (
        <div aria-hidden="true" style={{ position: "fixed", inset: 0, background: "rgba(255,226,170,0.22)", mixBlendMode: "multiply", pointerEvents: "none", zIndex: 9996 }} />
      )}

      {/* Listening controls */}
      {speaking && (
        <div role="region" aria-label="Listening controls" style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: "20px", zIndex: 9999, display: "flex", alignItems: "center", gap: "0.5rem", background: "#1A3220", border: "1.5px solid rgba(226,194,101,0.55)", borderRadius: "999px", padding: "0.4rem 0.5rem 0.4rem 1.1rem", boxShadow: "0 6px 28px rgba(26,50,32,0.32)", maxWidth: "calc(100vw - 24px)" }}>
          <span aria-live="polite" style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.85rem", color: "#FFFFFF", whiteSpace: "nowrap" }}>{paused ? "Paused" : "Listening"}</span>
          <button type="button" onClick={togglePause} className="a11y-ctl" style={ctlStyle}>{paused ? "Resume" : "Pause"}</button>
          <button type="button" onClick={changeRate} className="a11y-ctl" style={ctlStyle} aria-label={`Reading speed ${RATES[rateIndex]} times. Change speed`}>{RATES[rateIndex]}×</button>
          <button type="button" onClick={stop} className="a11y-ctl" style={{ ...ctlStyle, background: "#FFFFFF", color: "#1A3220" }}>Stop</button>
        </div>
      )}

      {/* Panel */}
      {open && (
        <div ref={panelRef} id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-panel-title"
          style={{ position: "fixed", right: "20px", bottom: "86px", zIndex: 9999, width: "360px", maxWidth: "calc(100vw - 24px)", maxHeight: "calc(100vh - 110px)", overflowY: "auto", background: "#FFFFFF", borderRadius: "18px", border: "1px solid #DCE5DE", boxShadow: "0 12px 40px rgba(26,50,32,0.22)" }}>
          <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", padding: "1.1rem 1.25rem 1rem", borderRadius: "18px 18px 0 0" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: "-50px", right: "-50px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <p style={{ position: "relative", fontFamily: font.heading, fontWeight: 700, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#E2C265", margin: "0 0 0.3rem" }}>Accessibility</p>
            <h2 id="a11y-panel-title" ref={headingRef} tabIndex={-1} style={{ position: "relative", fontFamily: font.display, fontWeight: 800, fontSize: "1.3rem", color: "#FFFFFF", margin: 0, lineHeight: 1.15, outline: "none" }}>Make this site work for you</h2>
            <button type="button" onClick={() => { setOpen(false); buttonRef.current?.focus(); }} aria-label="Close accessibility settings" className="a11y-close"
              style={{ position: "absolute", top: "0.7rem", right: "0.7rem", width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.1)", color: "#FFFFFF", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}>×</button>
          </div>

          <div style={{ padding: "1rem 1.25rem 0.6rem", background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)" }}>
            {canSpeak && (
              <button type="button" onClick={listen} className="a11y-listen"
                style={{ width: "100%", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", background: "#4A6347", color: "#FFFFFF", border: "none", borderRadius: "8px", fontFamily: font.heading, fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", marginBottom: "1rem" }}>
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>
                Listen to This Page
              </button>
            )}

            {label("Text size", "a11y-size-label")}
            <div role="group" aria-labelledby="a11y-size-label" style={{ display: "flex", gap: "0.4rem", marginBottom: "0.9rem" }}>
              {segButton("A", prefs.size === 0, () => update({ size: 0 }), { fontSize: "0.85rem" }, "Standard text size")}
              {segButton("A", prefs.size === 1, () => update({ size: 1 }), { fontSize: "1.05rem" }, "Larger text")}
              {segButton("A", prefs.size === 2, () => update({ size: 2 }), { fontSize: "1.25rem" }, "Largest text")}
            </div>

            {label("Contrast", "a11y-contrast-label")}
            <div role="group" aria-labelledby="a11y-contrast-label" style={{ display: "flex", gap: "0.4rem", marginBottom: "0.9rem" }}>
              {segButton("Standard", prefs.contrast === "standard", () => update({ contrast: "standard" }))}
              {segButton("High", prefs.contrast === "high", () => update({ contrast: "high" }), undefined, "High contrast")}
              {segButton("Soft cream", prefs.contrast === "cream", () => update({ contrast: "cream" }), undefined, "Soft cream tint")}
            </div>

            {toggleRow("dyslexia", "Easy to read font", "A clearer font designed to make reading easier")}
            {toggleRow("spacing", "More line spacing", "Extra space between lines, words and paragraphs")}
            {toggleRow("underline", "Underline all links", "Makes every link easy to spot")}
            {toggleRow("motion", "Reduce motion", "Stops animations and smooth scrolling")}
            {toggleRow("guide", "Reading guide", "A soft band that follows your pointer")}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.35rem 1.1rem", padding: "0.75rem 1.25rem 0.9rem", borderTop: "1px solid #DCE5DE", borderRadius: "0 0 18px 18px" }}>
            <span style={{ flexBasis: "100%", fontFamily: font.body, fontSize: "0.8rem", color: "#4B5B4E" }}>Your choices are saved on this device.</span>
            <button type="button" onClick={reset} className="a11y-link" style={{ background: "none", border: "none", padding: "0.35rem 0", cursor: "pointer", fontFamily: font.heading, fontWeight: 700, fontSize: "0.85rem", color: "#4A6347", textDecoration: "underline", textUnderlineOffset: "3px" }}>Reset All</button>
            <a href="/legal/accessibility" className="a11y-link" style={{ padding: "0.35rem 0", fontFamily: font.heading, fontWeight: 700, fontSize: "0.85rem", color: "#4A6347", textDecoration: "underline", textUnderlineOffset: "3px" }}>Accessibility Statement</a>
          </div>
        </div>
      )}

      {/* The button */}
      <button ref={buttonRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="a11y-panel" className="a11y-button"
        style={{ position: "fixed", right: "20px", bottom: speaking ? "84px" : "20px", zIndex: 9998, display: "flex", alignItems: "center", gap: "0.55rem", background: "#1A3220", color: "#FFFFFF", border: "1.5px solid rgba(226,194,101,0.55)", borderRadius: "999px", padding: "0.55rem 1.1rem 0.55rem 0.6rem", minHeight: "48px", fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", boxShadow: "0 6px 28px rgba(26,50,32,0.32)", cursor: "pointer" }}>
        <span aria-hidden="true" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E2C265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4.5" r="2" /><path d="M4 8.5l8 1.5 8-1.5M12 10v5m0 0l-3.5 6M12 15l3.5 6" /></svg>
        </span>
        <span className="a11y-btn-text">Accessibility</span>
        {changedCount > 0 && (
          <span style={{ marginLeft: "0.15rem", minWidth: "20px", height: "20px", borderRadius: "999px", background: "#E2C265", color: "#1A3220", fontSize: "0.72rem", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 0.35rem" }}>
            {changedCount}<span className="a11y-sr"> settings on</span>
          </span>
        )}
      </button>
    </div>
  );
}

const ctlStyle: React.CSSProperties = {
  minHeight: "40px", minWidth: "44px", padding: "0 0.9rem", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
};
