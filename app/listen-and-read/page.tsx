import Footer from "../components/Footer";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Listen & Read | The Inclusion Edit",
  description: "Podcast episodes and blog articles on equity, diversity and inclusion; from The Inclusion Edit.",
};

const blogs = [
  {
    title: "Why inclusion training fails: and what to do instead",
    date: "October 2024",
    excerpt: "Most inclusion training ticks a box and changes nothing. Here is what the evidence says about what actually works.",
    tag: "Training",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
  {
    title: "The business case for inclusion: beyond the stats",
    date: "September 2024",
    excerpt: "Everyone quotes the McKinsey report. Here is how to make the case in a way that actually lands with your leadership team.",
    tag: "Leadership",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
  {
    title: "What does psychological safety actually mean at work?",
    date: "August 2024",
    excerpt: "The term gets used a lot. This is what it means in practice and how you build it in teams that are under pressure.",
    tag: "Culture",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
  {
    title: "EDI legislation update: what UK employers need to know",
    date: "July 2024",
    excerpt: "A plain-English guide to the latest changes and what they mean for your organisation's policies and practices.",
    tag: "Legislation",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
  {
    title: "Five questions to ask before you commission an EDI audit",
    date: "June 2024",
    excerpt: "Not all EDI audits are equal. These questions will help you commission one that leads to real change rather than a report that sits on a shelf.",
    tag: "Consultancy",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
  {
    title: "Inclusion in Bermuda: the context UK organisations often miss",
    date: "May 2024",
    excerpt: "Working across the UK and Bermuda has shown us how much context shapes inclusion work. Here is what transfers and what does not.",
    tag: "Global",
    href: "https://www.linkedin.com/company/the-inclusion-edit",
  },
];

const tagColours: Record<string, string> = {
  Training: "#e8f0e8",
  Leadership: "#f0ede8",
  Culture: "#e8eef0",
  Legislation: "#f0e8e8",
  Consultancy: "#eee8f0",
  Global: "#e8f0ec",
};

export default function ListenAndReadPage() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/listen%20and%20read%201.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Podcast and blog</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.25rem" }}>
                Listen &amp; Read
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Honest conversations, practical thinking and real insight on equity, diversity and inclusion; from The Inclusion Edit.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <a href="#podcast" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Listen to the podcast</a>
                <a href="#blogs" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Read the blog</a>
              </div>
            </div>
          </div>
        </section>

        {/* PODCAST */}
        <section id="podcast" style={{ background: "var(--white)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>The podcast</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Honest conversations about inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: "0 0 1.75rem", lineHeight: 1.7 }}>Real talk with practitioners, leaders and thinkers doing the work; not just talking about it. Available on Spotify.</p>
            </div>
            {/* Spotify embed */}
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <iframe
                src="https://open.spotify.com/embed/show/theinclusionedit?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: "block" }}
              />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(0,0,0,0.45)", marginTop: "1rem", textAlign: "center" }}>
              Listen directly above or{" "}
              <a href="https://open.spotify.com/show/theinclusionedit" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", fontWeight: 600 }}>open in Spotify</a>.
              {" "}Want to be a guest?{" "}
              <Link href="/contact-us" style={{ color: "var(--sage-dark)", fontWeight: 600 }}>Get in touch</Link>.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
        </div>

        {/* BLOG */}
        <section id="blogs" style={{ background: "var(--white)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>The blog</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Practical thinking on inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.7 }}>Articles for HR professionals, people managers and leaders who want to do this well. Full articles on LinkedIn.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {blogs.map((post) => (
                <a key={post.title} href={post.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "var(--white)", border: "1px solid rgba(0,0,0,0.09)", borderRadius: "12px", padding: "1.5rem", textDecoration: "none", transition: "box-shadow 0.15s" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", background: tagColours[post.tag] || "var(--sage-xlight)", borderRadius: "4px", padding: "0.2rem 0.6rem", marginBottom: "0.75rem", alignSelf: "flex-start" }}>{post.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", margin: "0 0 0.5rem", lineHeight: 1.35, flexGrow: 1 }}>{post.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(0,0,0,0.6)", margin: "0 0 1rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(0,0,0,0.4)" }}>{post.date}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--sage-dark)" }}>Read on LinkedIn →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--sage-dark)", padding: "3.5rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "540px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--white)", marginBottom: "0.75rem" }}>Stay in the loop</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: "1.75rem" }}>Sign up to our newsletter and be the first to hear about new episodes, articles and resources.</p>
            <Link href="/subscribe" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Sign up</Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
