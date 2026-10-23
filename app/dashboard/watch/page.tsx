import Link from "next/link";

const upcomingVideos = [
  { title: "What is EDI and Why Does It Matter?", duration: "~25 min", topic: "Foundations" },
  { title: "Leading with Inclusion: A Framework for Managers", duration: "~30 min", topic: "Leadership" },
  { title: "Understanding Intersectionality", duration: "~20 min", topic: "Theory into Practice" },
  { title: "How to Build an EDI Strategy from Scratch", duration: "~35 min", topic: "Strategy" },
  { title: "Psychological Safety in Teams", duration: "~25 min", topic: "People & Culture" },
  { title: "Making the Business Case for EDI", duration: "~30 min", topic: "ROI & Evidence" },
  { title: "Inclusive Recruitment — Common Mistakes", duration: "~20 min", topic: "Systems" },
  { title: "Anti-Racism at Work: Moving Beyond Awareness", duration: "~40 min", topic: "Anti-Racism" },
  { title: "Disability Inclusion in Practice", duration: "~25 min", topic: "Disability" },
  { title: "EDI Data — Collecting, Using, and Communicating It", duration: "~30 min", topic: "Data & Insight" },
];

export default function WatchPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>
            ← Back to dashboard
          </Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
            Watch
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>
            Expert-led masterclasses on inclusive practice — coming soon.
          </p>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {/* Coming soon banner */}
        <div style={{ background: "var(--cream)", border: "1.5px solid var(--sand)", borderRadius: "12px", padding: "2rem", marginBottom: "2.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }} aria-hidden="true">🎬</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            Masterclasses launching soon
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto" }}>
            10 expert-led video masterclasses are in production. Members will be notified as soon as they&apos;re available.
          </p>
        </div>

        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          What&apos;s coming
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {upcomingVideos.map((v, i) => (
            <div key={i} className="card" style={{ opacity: 0.7 }}>
              <div style={{ background: "var(--sage-xlight)", borderRadius: "8px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", position: "relative" }}>
                <span style={{ fontSize: "2rem" }} aria-hidden="true">🎥</span>
                <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }} className="badge badge-cream">Coming soon</span>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>
                {v.title}
              </div>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>{v.duration}</span>
                <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{v.topic}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
