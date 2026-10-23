import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Back to dashboard</Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginTop: "0.75rem", marginBottom: "0.5rem" }}>Settings</h1>
        </div>
      </div>
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        <p>Settings coming soon.</p>
      </main>
    </div>
  );
}
