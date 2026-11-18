"use client";

// Shared finishing touches for the three interactive tools (Starting Point
// Finder, See What's Inside, Programme Finder): the reveal animation, the
// "preparing" shimmer, numbered step rows, the expert signature and the
// "Share With Your Leader" email.

import type { CSSProperties, ReactNode } from "react";

const font = { display: "var(--font-display)", heading: "var(--font-heading)", body: "var(--font-body)" };

export const TOOL_CSS = `
  @keyframes toolFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes toolShimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  .tool-reveal { opacity: 0; animation: toolFadeUp 0.45s ease forwards; }
  .tool-shimmer { background: linear-gradient(90deg, #E8F0E9 0%, #F7FBF7 40%, #E8F0E9 80%); background-size: 800px 100%; animation: toolShimmer 1.2s linear infinite; border-radius: 8px; }
  .tool-ghost:hover { background: #E3F5E2 !important; }
  .tool-chip-dark:hover { border-color: #E2C265 !important; background: rgba(255,255,255,0.14) !important; }
  @media (prefers-reduced-motion: reduce) { .tool-reveal { animation: none; opacity: 1; } .tool-shimmer { animation: none; } }
`;

/** Staggered fade in: wrap each block, passing its position in the order */
export function Reveal({ i = 0, children, style }: { i?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="tool-reveal" style={{ animationDelay: `${i * 90}ms`, ...style }}>
      {children}
    </div>
  );
}

/** A short "preparing" state shown for under half a second before results */
export function Preparing({ label, lines = 4 }: { label: string; lines?: number }) {
  return (
    <div role="status" aria-live="polite">
      <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.86rem", color: "var(--forest)", margin: "0 0 0.75rem" }}>{label}</p>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="tool-shimmer" style={{ height: "14px", width: `${92 - i * 9}%`, marginBottom: "0.6rem" }} />
      ))}
    </div>
  );
}

/** Split a step into a bold lead phrase and the rest, at the first colon or semicolon */
function splitLead(text: string): [string, string] {
  const m = text.match(/^(.{6,90}?)([:;])\s+(.*)$/);
  return m ? [m[1], m[3]] : ["", text];
}

/** Numbered rows with a green circle and a bold lead phrase */
export function NumberedSteps({ steps, startDelay = 0 }: { steps: string[]; startDelay?: number }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {steps.map((s, i) => {
        const [lead, rest] = splitLead(s);
        return (
          <li key={i} className="tool-reveal" style={{ animationDelay: `${(startDelay + i) * 90}ms`, display: "flex", gap: "0.85rem", alignItems: "flex-start", padding: "0.75rem 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
            <span aria-hidden="true" style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "var(--evergreen)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.heading, fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 0 0 4px rgba(107,143,113,0.15)" }}>{i + 1}</span>
            <span style={{ fontFamily: font.body, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink)" }}>
              {lead ? <><strong style={{ fontFamily: font.heading, fontWeight: 700, color: "var(--forest)" }}>{lead}.</strong> {rest.charAt(0).toUpperCase() + rest.slice(1)}</> : s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Tick rows for outcomes */
export function TickList({ items, startDelay = 0 }: { items: string[]; startDelay?: number }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((t, i) => (
        <li key={t} className="tool-reveal" style={{ animationDelay: `${(startDelay + i) * 90}ms`, display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.55rem 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
          <span aria-hidden="true" style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: "#E3F5E2", border: "1.5px solid var(--evergreen)", color: "var(--evergreen)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>✓</span>
          <span style={{ fontFamily: font.body, fontSize: "0.9rem", lineHeight: 1.55, color: "var(--ink)" }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Human, expert signature under each result */
export function ExpertSignature() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/email/rebekah.jpg" alt="" width={40} height={40} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 0 0 3px #E3F5E2" }} />
      <p style={{ margin: 0, fontFamily: font.body, fontSize: "0.8rem", lineHeight: 1.5, color: "var(--slate)" }}>
        <span style={{ fontFamily: font.heading, fontWeight: 700, color: "var(--forest)" }}>Created by Rebekah Hayward and The Inclusion Edit team</span>
        <br />
        Award-winning inclusion consultancy: Best EDI Consultancy, Corporate Vision HR &amp; Employment Awards 2026
      </p>
    </div>
  );
}

/** Opens a ready-written email the visitor can send to their leader */
export function ShareWithLeader({ subject, body }: { subject: string; body: string }) {
  const href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <a
      href={href}
      className="tool-ghost"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.7rem 1.2rem", borderRadius: "8px", background: "var(--white)", color: "var(--evergreen)", border: "2px solid var(--evergreen)", fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", minHeight: "44px", boxSizing: "border-box" }}
    >
      <span aria-hidden="true">✉</span> Share With Your Leader
    </a>
  );
}

export const SITE_URL = "https://theinclusionedit.com";

/** Anonymous count of what someone chose in a tool (no personal details) */
export function logToolEvent(tool: "starting-point-finder" | "see-whats-inside" | "programme-finder", event: "result" | "tailored" | "sharpened", choices: Record<string, string | boolean>) {
  try {
    fetch("/api/tool-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, event, choices }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* counting must never get in the way of the tool */
  }
}

/** Link to the contact form that carries what they told the tool, so Rebekah sees it with the enquiry */
export function contactWithContext(context: string, interest?: string) {
  const params = new URLSearchParams({ context: context.slice(0, 300) });
  if (interest) params.set("interest", interest);
  return `/contact-us?${params.toString()}`;
}
