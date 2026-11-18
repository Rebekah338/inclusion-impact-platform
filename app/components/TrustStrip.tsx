import Link from "next/link";

// One shared strip under the hero on every website page (standard: About Our Impact Platform, agreed 18 November 2026).
// Same height everywhere (128px), no emojis, values aligned along the top.
// Values in Playfair, Ink; labels in uppercase Raleway, Slate. variant "links" = clickable cards (homepage).
export type TrustItem = {
  value: string;
  label?: string;
  href?: string;
  external?: boolean;
  highlight?: boolean;
};

const isFigure = (v: string) => /^[\d£$+%.,×]+$/.test(v);
const LABEL = { fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.66rem", color: "#4B5B4E", textTransform: "uppercase" as const, letterSpacing: "0.07em", lineHeight: 1.35 };

export default function TrustStrip({ items, footnote, ariaLabel, variant }: { items: TrustItem[]; footnote?: string; ariaLabel?: string; variant?: "links" }) {
  const links = variant === "links";
  return (
    <section
      aria-label={ariaLabel}
      data-trust-strip=""
      style={{ minHeight: "128px", display: "flex", flexDirection: "column", justifyContent: "center", padding: links ? "1rem 1.5rem" : "0.9rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4", boxSizing: "border-box" }}
    >
      <style>{`
        .trust-link { transition: opacity 0.15s; } .trust-link:hover { opacity: 0.7; }
        .trust-link:focus-visible, .trust-card:focus-visible { outline: 3px solid #4A6347; outline-offset: 2px; }
        .trust-card .trust-action { text-decoration: underline transparent; text-underline-offset: 4px; text-decoration-thickness: 1.5px; transition: text-decoration-color 0.18s; }
        .trust-card:hover .trust-action { text-decoration-color: #4A6347; }
        @media (max-width: 760px) { .trust-cards { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />

      {links ? (
        <div className="trust-cards" style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: "0.75rem", position: "relative", zIndex: 3 }}>
          {items.map((s) => (
            <Link key={s.value} href={s.href || "#"} className="trust-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center", textDecoration: "none", padding: "0.6rem 0.4rem", borderRadius: "10px" }}>
              <span className="trust-title" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "var(--charcoal)", lineHeight: 1.15 }}>{s.value}</span>
              {s.label && <span className="trust-action" style={{ ...LABEL, color: "#4A6347", fontWeight: 700, marginTop: "0.35rem" }}>{s.label}</span>}
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem 1.25rem", position: "relative", zIndex: 3 }}>
          {items.map((s) => {
            const big = isFigure(s.value);
            const inner = s.highlight ? (
              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2.6rem", height: "2.6rem", borderRadius: "50%", border: "2px solid #A8741A", boxShadow: "0 0 10px rgba(201,168,76,0.45), 0 0 20px rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.12)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "#7A5200", lineHeight: 1 }}>{s.value}</span>
                </div>
                {s.label && <div style={LABEL}>{s.label}</div>}
              </div>
            ) : (
              <>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? "clamp(1.1rem, 2.2vw, 1.6rem)" : "clamp(1rem, 1.7vw, 1.3rem)", color: "var(--charcoal)", lineHeight: 1.1, marginBottom: "0.3rem", minHeight: big ? undefined : "1.6rem", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>{s.value}</div>
                {s.label && <div style={LABEL}>{s.label}</div>}
              </>
            );
            const box = { flex: "1 1 0", minWidth: "120px", padding: "0.4rem 0.25rem", textAlign: "center" as const, textDecoration: "none", display: "block" };
            if (s.href && s.external) return <a key={s.value} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="trust-link" style={box}>{inner}</a>;
            if (s.href) return <Link key={s.value} href={s.href} className="trust-link" style={box}>{inner}</Link>;
            return <div key={s.value} style={box}>{inner}</div>;
          })}
        </div>
      )}
      {footnote && (
        <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4B5B4E", margin: "0.4rem 0 0", position: "relative", zIndex: 3 }}>{footnote}</p>
      )}
    </section>
  );
}
