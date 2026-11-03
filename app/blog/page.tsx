import Footer from "../components/Footer";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Blog | The Inclusion Edit",
  description: "Insights, analysis and practical guidance on equity, diversity and inclusion; from The Inclusion Edit.",
};

export default function BlogPage() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
        {/* HERO */}
        <section style={{ background: "var(--sage-xlight)", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,138,92,0.12)", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.25rem" }}>Insights and ideas</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--charcoal)", margin: "0 0 1.25rem", lineHeight: 1.15 }}>The Inclusion Edit Blog</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal-mid)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>Practical thinking on equity, diversity and inclusion; for HR professionals, people managers, and leaders who want to do this well.</p>
          </div>
        </section>

        {/* COMING SOON */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "var(--sage-xlight)", borderRadius: "20px", padding: "3rem 2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--charcoal)", marginBottom: "1rem" }}>Articles coming soon</h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal-mid)", lineHeight: 1.7, marginBottom: "2rem" }}>We are building out our library of EDI insights, legislation updates, and practical guides. Sign up to be notified when new articles go live.</p>
            <a href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.85rem 2rem", borderRadius: "10px", textDecoration: "none" }}>Get notified</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
