import Link from "next/link";

export default function SavedPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Back to dashboard</Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginTop: "0.75rem", marginBottom: "0.5rem" }}>Saved</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>Resources and module summaries you&apos;ve bookmarked.</p>
        </div>
      </div>
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        <div className="card" style={{ textAlign: "center", padding: "3rem", background: "var(--cream)", border: "1px dashed var(--gray-border)" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }} aria-hidden="true">🔖</div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", margin: "0 0 1rem 0" }}>
            Nothing saved yet. As you work through modules and tools, bookmark things to find them here.
          </p>
          <Link href="/dashboard/learn" className="btn-primary" style={{ fontSize: "0.875rem" }}>
            Start learning →
          </Link>
        </div>
      </main>
    </div>
  );
}
