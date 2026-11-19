// Short Forest green hero shared by the Legal hub and each policy page.
export default function LegalHero({ eyebrow, title, intro, updated }: { eyebrow: string; title: string; intro?: string; updated?: string }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 60%, #1A3220 100%)", padding: "3.25rem 1.5rem 3rem" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-90px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "0.4rem 1rem", marginBottom: "1.25rem" }}>{eyebrow}</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F0E6C8", margin: "0 0 0.75rem", lineHeight: 1.1 }}>{title}</h1>
        {intro && <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.7, maxWidth: "640px", margin: 0 }}>{intro}</p>}
        {updated && <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", margin: intro ? "1rem 0 0" : 0 }}>Last updated: {updated}</p>}
      </div>
    </section>
  );
}
