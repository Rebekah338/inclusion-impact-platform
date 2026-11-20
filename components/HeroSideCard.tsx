// A frosted card for the right side of website hero banners. Hidden below 1200px so phones and tablets keep a short hero.
// Place it as the first child of the hero's 1100px container (which must be position: relative).
import type { ReactNode } from "react";
import Icon from "@/app/components/BrandIcon";

type Base = { place?: "middle" | "top" | "bottom" };
type Props = Base & (
  | { kind: "award" }
  | { kind: "quote"; quote: string; name: string; role: string }
  | { kind: "stat"; stat: string; label: string; source: string }
  | { kind: "facts"; eyebrow: string; title: string; points: string[] }
  | { kind: "cta"; eyebrow: string; title: string; text: string; href: string; label: string; external?: boolean }
  | { kind: "awardQuote"; quote: string; name: string; role: string }
  | { kind: "qa"; eyebrow: string; items: { q: string; a: string }[] }
  | { kind: "steps"; eyebrow: string; title: string; steps: ReactNode[] }
  | { kind: "episode"; num: string; title: string; guest: string; href: string }
);

const shell = {
  background: "linear-gradient(135deg, rgba(26,50,32,0.55) 0%, rgba(26,50,32,0.38) 100%)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.35)",
  borderRadius: "18px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
  color: "var(--white)",
} as const;

const eyebrowStyle = { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: "0 0 0.5rem" } as const;

let currentPlace: "middle" | "top" | "bottom" = "middle";

function Wrap({ width, children, center }: { width: number; children: ReactNode; center?: boolean }) {
  const pos = currentPlace === "top" ? { top: "2.5rem" } : currentPlace === "bottom" ? { bottom: "5rem" } : { top: "50%", transform: "translateY(-50%)" };
  return (
    <aside className="hero-side-card" style={{ position: "absolute", right: "2rem", ...pos, zIndex: 4, width: `${width}px`, padding: "1.4rem 1.5rem", boxSizing: "border-box", textAlign: center ? "center" : "left", ...shell }}>
      {children}
      <style>{`.hero-side-card { display: block; } @media (max-width: 1199px) { .hero-side-card { display: none !important; } }`}</style>
    </aside>
  );
}

const smallLink = { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "#A8D4B0", textDecoration: "underline", textUnderlineOffset: "3px" } as const;

export default function HeroSideCard(props: Props) {
  currentPlace = props.place ?? "middle";
  if (props.kind === "awardQuote") {
    return (
      <Wrap width={300}>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", paddingBottom: "0.9rem", marginBottom: "0.9rem", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
          <div aria-hidden="true" style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #f5c842 0%, #e8a820 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(232,168,32,0.5)", fontSize: "1.15rem", lineHeight: 1 }}><Icon name="award" size={22} color="#1A3220" strokeWidth={2} /></div>
          <div>
            <p style={{ ...eyebrowStyle, margin: "0 0 0.2rem", color: "#f5c842" }}>Award winner</p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.15, margin: 0 }}>Best EDI Consultancy</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", margin: "0.15rem 0 0" }}>Corporate Vision HR &amp; Employment Awards 2026</p>
          </div>
        </div>
        <figure style={{ margin: 0 }}>
          <blockquote style={{ margin: "0 0 0.6rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.95)" }}>&ldquo;{props.quote}&rdquo;</blockquote>
          <figcaption>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem" }}>{props.name}</span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "rgba(255,255,255,0.7)" }}>{props.role}</span>
          </figcaption>
        </figure>
      </Wrap>
    );
  }
  if (props.kind === "qa") {
    return (
      <Wrap width={300}>
        <p style={eyebrowStyle}>{props.eyebrow}</p>
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {props.items.map((it) => (
            <div key={it.q}>
              <dt style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.86rem", margin: "0 0 0.15rem" }}>{it.q}</dt>
              <dd style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.84rem", lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>{it.a}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    );
  }
  if (props.kind === "steps") {
    return (
      <Wrap width={300}>
        <p style={eyebrowStyle}>{props.eyebrow}</p>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.2, margin: "0 0 0.85rem" }}>{props.title}</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {props.steps.map((st, i) => (
            <li key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}>
              <span aria-hidden="true" style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem" }}>{i + 1}</span>
              <span>{st}</span>
            </li>
          ))}
        </ol>
      </Wrap>
    );
  }
  if (props.kind === "episode") {
    return (
      <Wrap width={280}>
        <p style={eyebrowStyle}>Latest episode</p>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", color: "#E2C265", margin: "0 0 0.35rem" }}>EPISODE {props.num}</p>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.25, margin: "0 0 0.5rem" }}>{props.title}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", margin: "0 0 0.8rem" }}>With {props.guest}</p>
        <a href={props.href} style={smallLink}>Listen to this episode</a>
      </Wrap>
    );
  }
  if (props.kind === "award") {
    return (
      <Wrap width={230} center>
        <div aria-hidden="true" style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #f5c842 0%, #e8a820 100%)", margin: "0 auto 0.8rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(232,168,32,0.5)", fontSize: "1.25rem", lineHeight: 1 }}><Icon name="award" size={22} color="#1A3220" strokeWidth={2} /></div>
        <p style={{ ...eyebrowStyle, margin: "0 0 0.4rem" }}>Corporate Vision</p>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.15, margin: "0 0 0.4rem" }}>Best EDI Consultancy</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", margin: "0 0 0.75rem", lineHeight: 1.4 }}>HR &amp; Employment Awards 2026, London</p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "0.7rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#f5c842", margin: 0 }}>Award Winner</p>
        </div>
      </Wrap>
    );
  }
  if (props.kind === "quote") {
    return (
      <Wrap width={320}>
        <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", lineHeight: 0.8, color: "#E2C265", marginBottom: "0.4rem" }}>&ldquo;</div>
        <figure style={{ margin: 0 }}>
          <blockquote style={{ margin: "0 0 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.95)" }}>{props.quote}</blockquote>
          <figcaption>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem" }}>{props.name}</span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: "0.1rem" }}>{props.role}</span>
          </figcaption>
        </figure>
      </Wrap>
    );
  }
  if (props.kind === "stat") {
    return (
      <Wrap width={280}>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.6rem", lineHeight: 1, color: "#E2C265", margin: "0 0 0.5rem" }}>{props.stat}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.55, color: "rgba(255,255,255,0.95)", margin: "0 0 0.7rem" }}>{props.label}</p>
        <p style={{ ...eyebrowStyle, margin: 0, letterSpacing: "0.1em" }}>{props.source}</p>
      </Wrap>
    );
  }
  if (props.kind === "facts") {
    return (
      <Wrap width={290}>
        <p style={eyebrowStyle}>{props.eyebrow}</p>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.15, margin: "0 0 0.85rem" }}>{props.title}</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {props.points.map((p) => (
            <li key={p} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.86rem", lineHeight: 1.45, color: "rgba(255,255,255,0.92)" }}>
              <span aria-hidden="true" style={{ color: "#A8D4B0", fontWeight: 700 }}>&#10003;</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Wrap>
    );
  }
  return (
    <Wrap width={300}>
      <p style={eyebrowStyle}>{props.eyebrow}</p>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.2, margin: "0 0 0.5rem" }}>{props.title}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", lineHeight: 1.55, color: "rgba(255,255,255,0.88)", margin: "0 0 1rem" }}>{props.text}</p>
      <a href={props.href} {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", background: "var(--white)", padding: "0.7rem 1.1rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>
        {props.label}{props.external && <span className="a11y-sr"> (opens in a new tab)</span>}
      </a>
    </Wrap>
  );
}
