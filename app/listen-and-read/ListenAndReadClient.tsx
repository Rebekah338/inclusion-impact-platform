"use client";

import { useState, useRef } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const episodes = [
  {
    num: "01",
    title: "Who We Are: The Power of Identity, Culture and Experience",
    guest: "Jasmine Fluker",
    img: "/podcast-ep01.png",
    episodeId: "0w3t9zJ4Epus7De7f2qaEL",
  },
  {
    num: "02",
    title: "Rest as Resistance: Addressing Women of Colour's Mental Health in the Workplace",
    guest: "Rachel Woodley",
    img: "/podcast-ep02.png",
    episodeId: "1Ao9VHC2nZNTlovV0aFR7F",
  },
  {
    num: "03",
    title: "To Be Audacious: Women of Colour Moving Through Systems That Were Built Against Us",
    guest: "Mikaela Ian",
    img: "/podcast-ep03.png",
    episodeId: "2EtDVK3bk2Pe0DZ5KLEs0Q",
  },
  {
    num: "04",
    title: "Inclusive Leadership and Accountability: Beyond Guilt and Fragility",
    guest: "Audrey Pantelis",
    img: "/podcast-ep04.png",
    episodeId: "4FzxntJ6f6ETuJOcDCN6bW",
  },
  {
    num: "05",
    title: "Listening to the Often Unheard: Introversion, Intersectionality and Inclusion",
    guest: "Richard Etienne",
    img: "/podcast-ep05.png",
    episodeId: "10V3WmyfGoOXyYjGAwPKjv",
  },
  {
    num: "06",
    title: "Beyond Diversity: Uprooting Anti-Blackness in Our Systems",
    guest: "Vanity Jenkins",
    img: "/podcast-ep06.png",
    episodeId: "3qvYKEi9PzSneZLvO90JWz",
  },
  {
    num: "07",
    title: "The Business Case for Inclusion: Leading with Courage and Compassion",
    guest: "Aggie Mutuma",
    img: "/podcast-ep07.jpg",
    episodeId: "3N9ln1rl5mcyRpA0ftVxNR",
  },
];

const blogs = [
  {
    title: "EDI matters more than ever, and that\'s why it\'s under attack",
    date: "April 2025",
    excerpt: "From US elections to corporate backpedalling, EDI is under fire. But the coordinated effort to dismantle it tells you everything: it works, it challenges power, and that makes some people very uncomfortable.",
    tag: "EDI & Politics",
    href: "https://www.theinclusionedit.com/post/equity-diversity-inclusion-edi-matters-more-than-ever-that-s-why-it-s-under-attack-part-1",
  },
  {
    title: "Autism Acceptance Month: why intersectionality matters",
    date: "April 2025",
    excerpt: "Black children are 2.6 times more likely to be misdiagnosed before receiving an autism diagnosis. Celebrating autism while ignoring racism and ableism isn\'t real acceptance; here are three workplace edits to change that.",
    tag: "Neurodiversity",
    href: "https://www.theinclusionedit.com/post/autism-acceptance-month-why-intersectionality-matters-pt-1",
  },
  {
    title: "Why your inclusion training isn\'t working; and what to do about it",
    date: "2025",
    excerpt: "Training alone will not change your culture. When the session ends and people go back to their desks, the conditions that created the problem remain unchanged. Here is what embedding inclusion actually looks like.",
    tag: "Training",
    href: "https://www.theinclusionedit.com/blog",
  },
  {
    title: "Inclusion isn\'t failing; it\'s under-resourced",
    date: "2025",
    excerpt: "Intent makes people try, but good intentions without structure are useless. Lean teams stretched across HR, compliance, and inclusion need frameworks and tools; not just hope and heroics.",
    tag: "Strategy",
    href: "https://www.theinclusionedit.com/blog",
  },
  {
    title: "Myth-busting: positive discrimination vs positive action",
    date: "February 2025",
    excerpt: "Confusing the two can land your business in hot water fast. Positive discrimination is legally risky and rarely sustainable; positive action removes barriers and creates equitable opportunities that actually stick.",
    tag: "Law & Practice",
    href: "https://www.theinclusionedit.com/blog",
  },
  {
    title: "Psychological safety: the foundation your inclusion strategy is missing",
    date: "2025",
    excerpt: "You\'ve updated policies, run training, and put values on the wall. And yet people still aren\'t speaking up. Psychological safety is the missing piece; and it is not the same as making everyone comfortable.",
    tag: "Leadership",
    href: "https://www.theinclusionedit.com/blog",
  },
];

const tagColours: Record<string, string> = {
  "EDI & Politics": "#f0e8e8",
  Neurodiversity: "#e8eef0",
  Training: "#e8f0e8",
  Strategy: "#f0ede8",
  "Law & Practice": "#eee8f0",
  Leadership: "#e8f0ec",
};

export default function ListenAndReadClient() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const activeEpisode = episodes[activeIndex];

  const scrollStrip = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const cardWidth = stripRef.current.scrollWidth / episodes.length;
    stripRef.current.scrollBy({ left: direction === "right" ? cardWidth * 2 : -cardWidth * 2, behavior: "smooth" });
  };

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

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
            {[
              { label: "Honest", sub: "Conversations, no jargon" },
              { label: "UK · Bermuda · US", sub: "Listeners worldwide" },
              { label: "100+", sub: "Newsletter subscribers" },
              { label: "Spotify", sub: "Free to listen" },
              { label: "LinkedIn", sub: "New articles monthly" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", letterSpacing: "0.01em", lineHeight: 1.1 }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", letterSpacing: "0.04em", marginTop: "0.2rem", textTransform: "uppercase" }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PODCAST — tighter padding */}
        <section id="podcast" style={{ background: "var(--white)", padding: "2.5rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Section header — compact */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.5rem" }}>The podcast</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.35rem" }}>Honest conversations about inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>Real talk with practitioners, leaders and thinkers doing the work; not just talking about it. Available on Spotify.</p>
            </div>

            {/* SPOTIFY PLAYER in dark green branded frame */}
            <div style={{ background: "var(--forest)", borderRadius: "16px", padding: "1.25rem", boxShadow: "0 6px 32px rgba(26,50,32,0.18)" }}>
              {/* Now playing label */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#6dbf7e", boxShadow: "0 0 6px #6dbf7e" }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>Now playing</span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                  Episode {activeEpisode.num} of {episodes.length}
                </span>
              </div>
              <div style={{ marginBottom: "0.75rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", margin: "0 0 0.2rem", lineHeight: 1.35 }}>{activeEpisode.title}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>with {activeEpisode.guest}</p>
              </div>
              {/* Spotify embed */}
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <iframe
                  key={activeEpisode.episodeId}
                  src={`https://open.spotify.com/embed/episode/${activeEpisode.episodeId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ display: "block" }}
                />
              </div>
            </div>

            {/* EPISODE STRIP */}
            <div style={{ marginTop: "0.875rem", background: "var(--forest)", borderRadius: "14px", padding: "0.875rem 1rem 0.75rem" }}>
              {/* Strip header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>All episodes — tap to switch</span>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    onClick={() => scrollStrip("left")}
                    aria-label="Scroll left"
                    style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", transition: "background 0.15s" }}
                  >‹</button>
                  <button
                    onClick={() => scrollStrip("right")}
                    aria-label="Scroll right"
                    style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", transition: "background 0.15s" }}
                  >›</button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                ref={stripRef}
                style={{ display: "flex", overflowX: "auto", gap: "0.6rem", paddingBottom: "0.65rem", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {episodes.map((ep, i) => (
                  <button
                    key={ep.num}
                    onClick={() => setActiveIndex(i)}
                    className="episode-strip-card"
                    title={`Ep ${ep.num}: ${ep.title} with ${ep.guest}`}
                    style={{
                      padding: 0,
                      border: activeIndex === i ? "2.5px solid var(--white)" : "2.5px solid rgba(255,255,255,0.15)",
                      flex: "0 0 calc(25% - 0.45rem)",
                      scrollSnapAlign: "start",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: activeIndex === i ? "0 0 0 3px rgba(255,255,255,0.15)" : "none",
                      display: "block",
                      cursor: "pointer",
                      background: "none",
                      opacity: activeIndex === i ? 1 : 0.65,
                      transition: "opacity 0.15s, border 0.15s",
                    }}
                  >
                    <img
                      src={ep.img}
                      alt={`Episode ${ep.num}: ${ep.title}`}
                      style={{ width: "100%", display: "block", aspectRatio: "1 / 1", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>

              {/* Dot-pill progress */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                {episodes.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: activeIndex === i ? "18px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: activeIndex === i ? "var(--white)" : "rgba(255,255,255,0.3)",
                      transition: "width 0.2s, background 0.2s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Footer note — no guest CTA */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(0,0,0,0.45)", marginTop: "0.875rem", textAlign: "center" }}>
              Listen directly above or{" "}
              <a href="https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", fontWeight: 600 }}>open in Spotify</a>.
            </p>
          </div>
        </section>

        {/* BLOG — image background, low opacity */}
        <section id="blogs" style={{ position: "relative", padding: "2.5rem 1.5rem 3rem", overflow: "hidden" }}>
          {/* Background image at low opacity */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,244,0.92)", zIndex: 1 }} />

          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.5rem" }}>The blog</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.35rem" }}>Practical thinking on inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>Articles for HR professionals, people managers and leaders who want to do this well. Full articles on LinkedIn.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {blogs.map((post) => (
                <a key={post.title} href={post.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", padding: "1.25rem", textDecoration: "none", transition: "box-shadow 0.15s", backdropFilter: "blur(4px)" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", background: tagColours[post.tag] || "var(--sage-xlight)", borderRadius: "4px", padding: "0.2rem 0.6rem", marginBottom: "0.65rem", alignSelf: "flex-start" }}>{post.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.35, flexGrow: 1 }}>{post.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(0,0,0,0.6)", margin: "0 0 0.875rem", lineHeight: 1.55 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "rgba(0,0,0,0.4)" }}>{post.date}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.76rem", color: "var(--sage-dark)" }}>Read on LinkedIn →</span>
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
