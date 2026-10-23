import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";

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
      <PlatformNav />
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


        {/* SECTION HEADERS */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.5rem", marginTop: "2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📽️ CPD Training Videos
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>Structured, CPD-accredited training sessions — coming soon.</p>

        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.5rem", marginTop: "2.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          🎓 Masterclasses
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>Focused sessions with expert practitioners on specific EDI challenges.</p>

        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.5rem", marginTop: "2.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          ⚡ Nuggets & Snapshots
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>Short, actionable video takeaways — 5 to 10 minutes, designed to fit your week.</p>
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

        {/* SHARE AN INCLUSION CHALLENGE */}
        <section style={{ marginTop: "3rem", marginBottom: "1.5rem" }}>
          <div style={{
            borderRadius: "18px", padding: "2rem 2.25rem",
            background: "linear-gradient(135deg, #1E3624 0%, #2C4A31 100%)",
            boxShadow: "0 6px 28px rgba(30,54,36,0.2)",
          }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--white)", marginBottom: "0.4rem" }}>
              💬 Share an inclusion challenge
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Facing something tricky in your EDI work? Share it here and we&apos;ll address it through the platform — in content, resources, or our live sessions.
            </div>
            <a href="mailto:hello@theinclusionedit.com?subject=Inclusion%20Challenge"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", background: "var(--white)", color: "var(--sage-dark)", padding: "0.65rem 1.25rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
              Share your challenge →
            </a>
          </div>
        </section>

        {/* REQUEST A NEW RESOURCE */}
        <section style={{ marginBottom: "1.5rem" }}>
          <div style={{
            borderRadius: "18px", padding: "2rem 2.25rem",
            background: "linear-gradient(135deg, #2A4A30 0%, #3D6142 100%)",
            boxShadow: "0 6px 28px rgba(42,74,48,0.2)",
            display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--white)", marginBottom: "0.4rem" }}>
                💡 Request a new resource
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>
                Missing a video topic you need? Let us know and we&apos;ll prioritise it for the Watch library.
              </div>
            </div>
            <a href="mailto:hello@theinclusionedit.com?subject=Video%20Request"
              style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", background: "var(--white)", color: "var(--sage-dark)", padding: "0.65rem 1.25rem", borderRadius: "8px", textDecoration: "none" }}>
              Send a request →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
