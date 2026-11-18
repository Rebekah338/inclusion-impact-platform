"use client";

import Link from "next/link";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import StartingPointFinder from "@/components/StartingPointFinder";
import TrustStrip from "./components/TrustStrip";

const NAV_TILES = [
  { label: "Consultancy", href: "/edi-consultancy-programmes", icon: "", sub: "See our programmes" },
  { label: "Impact Platform", href: "/about-our-impact-platform", icon: "", sub: "Join early access" },
  { label: "Training", href: "/edi-training", icon: "", sub: "Book training" },
  { label: "Bespoke Resources", href: "/bespoke-inclusion-resources", icon: "", sub: "Commission a resource" },
  { label: "Podcast and Blog", href: "/podcast", icon: "", sub: "Listen and read" },
  { label: "Inclusion AI", href: "/about-our-impact-platform#ai", icon: "", sub: "Explore the tools" },
];

const TESTIMONIALS = [
  {
    quote: "Thanks to The Inclusion Edit’s EDI Hub, I’m navigating EDI with more intention, bandwidth and knowledge. Their library has saved me a tremendous amount of time, and I feed what I learn back into training and team upskilling. They’re super communicative, responsive and clearly passionate, which shines through in the quality of their resources.",
    name: "Tiona Knight",
    org: "EDI Lead, Mentivity",
  },
  {
    quote: "I’d definitely recommend this inclusion training with Rebekah. There was so much valuable information, shared in a way that was relatable and easy to understand. Our team came away with practical ideas we could put into practice straight away.",
    name: "Corinne Wolstenholme",
    org: "Network Plus",
  },
  {
    quote: "Rebekah was an excellent facilitator. She created a welcoming environment that encouraged honest reflection and meaningful discussion. Her approach was both professional and personal: she encouraged us to think deeply without judgement, which made it easier to be honest about where we are and where we can grow.",
    name: "Kerryann Wynter",
    org: "The Berkeley School",
  },
];

const LOGOS = ["Network Plus", "Hospice UK", "Project Free", "The Berkeley School"];

const PILLARS = [
  {
    title: "You get time back, not more to do.",
    body: "Ready-to-use tools, templates and an inclusion expert to check your thinking with, so you can move the work forward this week instead of starting every piece from scratch.",
  },
  {
    title: "You get clarity, not complexity.",
    body: "We turn complex inclusion ideas into clear, practical steps, grounded in lived experience and research, so you and your team feel equipped rather than overwhelmed.",
  },
  {
    title: "You get backup, and a case to take upward.",
    body: "Evidence and business cases your leaders will recognise, shaped around your sector, whether that's a corporate team, public body, charity or school. You are not making the case alone.",
  },
];

const PLATFORM_FEATURES = [
  { icon: "📚", title: "40 lessons", desc: "Across three learning pathways: People and Culture, Systems and Processes, Leadership and Strategy." },
  { icon: "🛠", title: "45 practical tools", desc: "Templates, toolkits, guides and checklists you can use the same day, plus 47 research reports and case studies to take to leadership." },
  { icon: "🎬", title: "28 expert videos", desc: "Deep dives, quick wins and expert sessions at your own pace." },
  { icon: "✨", title: "10 Inclusion AI tools", desc: "Specialist AI tools for inclusion work: policy audits, business cases, fairer hiring and more." },
];

const SERVICES = [
  {
    label: "Impact Platform",
    href: "/about-our-impact-platform",
    icon: "💡",
    image: "/images/card-impact-platform.jpg",
    heading: "Built for people leading inclusion, so you're not carrying it alone.",
    body: "40 lessons, 10 specialist AI tools, evidence you can take to leadership, office hours with an inclusion expert, and room to bring your team in when you're ready.",
    cta: "Explore the Platform",
  },
  {
    label: "Inclusion Consultancy",
    href: "/edi-consultancy-programmes",
    icon: "🤝",
    image: "/images/card-consultancy.jpg",
    heading: "Strategic inclusion support that goes deeper than a single session.",
    body: "We work alongside your organisation to audit, advise and build inclusion strategies grounded in your context and designed to last. From culture audits to policy reviews, we support the work behind the work.",
    cta: "Explore Consultancy",
  },
  {
    label: "Inclusion Training",
    href: "/edi-training",
    icon: "🎓",
    image: "/images/card-training.jpg",
    heading: "Training that moves teams from awareness to action.",
    body: "Workshops and programmes built around the challenges your teams actually face: unconscious bias, psychological safety, inclusive leadership or something bespoke. Practical, participatory and ready to use.",
    cta: "Explore Training",
  },
  {
    label: "Bespoke Resources",
    href: "/bespoke-inclusion-resources",
    icon: "✏️",
    image: "/images/card-bespoke.jpg",
    heading: "Custom tools and content built for your organisation.",
    body: "Need something that does not exist yet? We design toolkits, guides and e-learning modules tailored to your team, your language and your goals.",
    cta: "See What We Can Build",
  },
];

const WHO_WE_WORK_WITH = [
  { icon: "🏫", label: "Schools and MATs" },
  { icon: "🏥", label: "NHS and healthcare" },
  { icon: "🏛", label: "Public sector bodies" },
  { icon: "💼", label: "Corporate organisations" },
  { icon: "❤️", label: "Charities and nonprofits" },
  { icon: "🎓", label: "Universities and HE" },
];

const STATS = [
  { number: "40+", label: "Years combined experience" },
  { number: "1,000+", label: "People reached" },
  { number: "140+", label: "Platform resources" },
  { number: "10+", label: "AI tools" },
  { number: "25+", label: "Organisations supported" },
];


export default function Home() {
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [nlEmail, setNlEmail] = useState("");
  const [nlHoney, setNlHoney] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "done">("idle");
  const [nlError, setNlError] = useState("");

  async function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nlStatus === "sending") return;
    setNlError("");
    setNlStatus("sending");
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, origin: "homepage", website: nlHoney }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.ok) {
        setNlStatus("done");
        return;
      }
      setNlError(
        result.error === "invalid_email"
          ? "Please check your email address and try again."
          : result.error === "compliance"
          ? "This email unsubscribed in the past. Email info@theinclusionedit.com and we will add you back."
          : "Something went wrong. Please try again, or email info@theinclusionedit.com."
      );
    } catch {
      setNlError("Something went wrong. Please try again, or email info@theinclusionedit.com.");
    }
    setNlStatus("idle");
  }

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* ── HERO ── */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          {/* Deep green gradient base */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          {/* Hero photo */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/homepage-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 45%", zIndex: 1 }} />
          {/* Left-to-right dark gradient overlay — glossy effect */}
          
          {/* Logo top-right of hero */}
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          {/* Content: left aligned */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5.5rem 2rem 5rem" }}>
            <div style={{ maxWidth: "820px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Award-winning inclusion consultancy and learning platform</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3rem, 5.5vw, 5rem)", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: "760px" }}>
                <span style={{ color: "#F0E6C8" }}>Your Culture Is</span><br />
                <span style={{ color: "#A8D4B0" }}>Your Competitive<br />Edge.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                Building that culture often falls to one person, without the team, time or budget it needs. If that&apos;s you, you&apos;re not meant to do it alone: we give you practical tools, evidence to take to your leaders and a real person beside you.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/early-access" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Get Early Access</Link>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Book a Free Inclusion Call</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── NAV TILES ── */}
        <TrustStrip variant="links" ariaLabel="Explore The Inclusion Edit" items={NAV_TILES.map((t) => ({ value: t.label, label: t.sub, href: t.href }))} />

        {/* ── INCLUSION STARTING POINT FINDER ── */}
        <StartingPointFinder />

{/* ── POSITIONING + STATS (combined, photo-background) ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "2.5rem 1.5rem" }}>
          {/* Photo layer */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
          {/* Sage overlay */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232, 238, 230, 0.93)", backdropFilter: "blur(2px)", zIndex: 1 }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Text */}
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>Why people carrying inclusion come to us</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.25rem, 2.8vw, 1.85rem)", color: "var(--charcoal)", lineHeight: 1.5, marginBottom: "1rem" }}>
                <span style={{ display: "block", whiteSpace: "nowrap" }}>Most organisations want inclusion.</span>
                <span style={{ display: "block", whiteSpace: "nowrap" }}>Few give it the capacity it needs.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, margin: 0 }}>
                The problem is rarely commitment. It is one person, or a very small team, asked to carry it without the time, tools, budget or backing it needs. We built The Inclusion Edit to give you that capacity.
              </p>
            </div>

            {/* Stats row — 5 columns */}
            <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.6rem", textAlign: "center" }} className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} style={{ background: "rgba(42,74,48,0.88)", borderRadius: "10px", padding: "0.9rem 0.4rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--white)", margin: "0 0 0.2rem" }}>{s.number}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600, color: "var(--sage-light)", letterSpacing: "0.04em", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ background: "var(--white)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem", textAlign: "center" }}>How we work with you</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", marginBottom: "3rem", textAlign: "center" }}>Four ways to build lasting inclusion.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }} className="services-grid">
              {SERVICES.map((s) => (
                <div key={s.label} style={{ background: "var(--white)", borderRadius: "16px", border: "1.5px solid rgba(107,143,113,0.3)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 4px 16px rgba(42,74,48,0.08), 0 1px 4px rgba(42,74,48,0.06)" }}>
                  <div style={{ width: "100%", height: "160px", overflow: "hidden", flexShrink: 0, background: "linear-gradient(160deg, #c8dbc9 0%, #a8c4aa 100%)" }}>
                    {s.image && <img src={s.image} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                  </div>
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1, background: "linear-gradient(160deg, #f7fbf7 0%, #eef6ee 60%, #e4f0e4 100%)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>{s.label}</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.4, marginBottom: "0.875rem" }}>{s.heading}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8, margin: "0 0 1.5rem", flexGrow: 1 }}>{s.body}</p>
                  <Link href={s.href} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", textDecoration: "none", alignSelf: "flex-start" }}>{s.cta} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUE PILLARS ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "5rem 1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.82)", backdropFilter: "blur(4px)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "980px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C4A31", marginBottom: "1rem", textAlign: "center" }}>What working with us gives you</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1E3624", marginBottom: "3rem", textAlign: "center" }}>From knowledge to action to measurable change.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {PILLARS.map((p) => (
                <div key={p.title} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "18px", padding: "2rem", boxShadow: "0 6px 28px rgba(42,74,48,0.22)" }}>
                  <div aria-hidden="true" style={{ position: "absolute", top: "-15px", right: "-15px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--white)", lineHeight: 1.4, marginBottom: "0.875rem", position: "relative" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.8, margin: 0, position: "relative" }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── PLATFORM SPOTLIGHT ── */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="platform-split">
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>The Impact Platform</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "1.25rem" }}>The tools, learning and expert support to make inclusion part of everyday work.</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, marginBottom: "1.5rem" }}>
                  A digital learning and development space for inclusion practitioners and the organisations they serve: structured modules, practical tools, video masterclasses and specialist AI tools, all built around real inclusion work.
                </p>
                <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>Explore the Platform</Link>
                  <Link href="/early-access" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--sage-dark)", background: "transparent", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid var(--sage-dark)" }}>Get Early Access</Link>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {PLATFORM_FEATURES.map((f) => (
                  <div key={f.title} style={{ background: "var(--sage-xlight)", borderRadius: "14px", padding: "1.5rem", border: "1px solid var(--gray-border)" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{f.icon}</div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", marginBottom: "0.5rem", lineHeight: 1.3 }}>{f.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--charcoal)", lineHeight: 1.65, opacity: 0.75, margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        {(() => {
          const totalTestimonialSlides = Math.ceil(TESTIMONIALS.length / 3);
          const visibleTestimonials = TESTIMONIALS.slice(testimonialIdx * 3, testimonialIdx * 3 + 3);
          return (
            <section style={{ padding: "4.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} aria-hidden="true" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(232, 238, 230, 0.93)", backdropFilter: "blur(2px)", zIndex: 1 }} aria-hidden="true" />

              <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#1E3624", background: "rgba(44,74,49,0.12)", border: "1px solid rgba(44,74,49,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.25rem" }}>
                    Trusted by organisations worldwide
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--charcoal)", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
                    What people say about working with us.
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--charcoal)", opacity: 0.65, maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
                    Real words from the people and organisations we&apos;ve worked with.
                  </p>
                </div>

                {/* Carousel */}
                <div style={{ position: "relative" }}>
                  {/* Prev button */}
                  <button
                    onClick={() => setTestimonialIdx((i) => Math.max(0, i - 1))}
                    disabled={testimonialIdx === 0}
                    aria-label="Previous testimonials"
                    style={{ position: "absolute", left: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: testimonialIdx === 0 ? "default" : "pointer", display: totalTestimonialSlides > 1 ? "flex" : "none", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: testimonialIdx === 0 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                  >&#8249;</button>

                  {/* Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }} className="testimonial-grid">
                    {visibleTestimonials.map((t, i) => (
                      <blockquote
                        key={i}
                        style={{ position: "relative", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)", border: "1px solid rgba(44,74,49,0.3)", borderRadius: "16px", padding: "1.75rem", margin: 0, display: "flex", flexDirection: "column", boxSizing: "border-box", boxShadow: "0 0 0 3px rgba(44,74,49,0.1), 0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}
                      >
                        {/* Decorative gold circle orbs */}
                        <svg aria-hidden="true" style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", opacity: 0.18, pointerEvents: "none" }} viewBox="0 0 160 160" fill="none">
                          <circle cx="80" cy="80" r="70" stroke="#3D6142" strokeWidth="1.5"/>
                          <circle cx="80" cy="80" r="50" stroke="#3D6142" strokeWidth="1"/>
                          <circle cx="80" cy="80" r="30" stroke="#3D6142" strokeWidth="0.75"/>
                        </svg>
                        <svg aria-hidden="true" style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "120px", height: "120px", opacity: 0.10, pointerEvents: "none" }} viewBox="0 0 120 120" fill="none">
                          <circle cx="60" cy="60" r="55" stroke="#3D6142" strokeWidth="1.5"/>
                          <circle cx="60" cy="60" r="38" stroke="#3D6142" strokeWidth="1"/>
                        </svg>
                        {/* Quote mark */}
                        <div aria-hidden="true" style={{ position: "relative", zIndex: 1, fontFamily: "Georgia, serif", fontSize: "3rem", lineHeight: 1, color: "rgba(44,74,49,0.25)", marginBottom: "0.25rem", marginTop: "-0.25rem" }}>&ldquo;</div>
                        <p style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic", opacity: 0.85, flexGrow: 1 }}>
                          {t.quote}
                        </p>
                        <footer style={{ position: "relative", zIndex: 1 }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", margin: "0 0 0.2rem" }}>{t.name}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--charcoal)", opacity: 0.5, margin: 0 }}>{t.org}</p>
                        </footer>
                      </blockquote>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => setTestimonialIdx((i) => Math.min(totalTestimonialSlides - 1, i + 1))}
                    disabled={testimonialIdx === totalTestimonialSlides - 1}
                    aria-label="Next testimonials"
                    style={{ position: "absolute", right: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: testimonialIdx === totalTestimonialSlides - 1 ? "default" : "pointer", display: totalTestimonialSlides > 1 ? "flex" : "none", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: testimonialIdx === totalTestimonialSlides - 1 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                  >&#8250;</button>
                </div>

                {/* Dot indicators */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {totalTestimonialSlides > 1 && Array.from({ length: totalTestimonialSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      aria-label={`Go to testimonial slide ${i + 1}`}
                      style={{ width: i === testimonialIdx ? "1.5rem" : "0.5rem", height: "0.5rem", borderRadius: "999px", border: "none", background: i === testimonialIdx ? "#2C4A31" : "rgba(42,74,48,0.2)", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── FOUNDER ── */}
        <section style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "center" }} className="founder-split">
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>Why our approach works</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "1.25rem" }}>Inclusion expertise that moves organisations from intention to impact.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, marginBottom: "0.75rem" }}>
                I&apos;m Rebekah, founder of The Inclusion Edit. You get practical, evidence-informed support from someone who has sat in the meetings, navigated the politics and knows what it takes to build inclusion that lasts. My work draws on lived experience as well as professional expertise, so it is grounded in the realities your people face, not just theory.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, marginBottom: "1.5rem" }}>
                I hold a Master&apos;s in Education: International Development and Social Justice, and a CMI Level 7 Qualification in Strategic Approaches to EDI. Across consultancy, training and the Impact Platform, everything we create is designed to give you the time, tools and backing to make inclusion stick.
              </p>
              <Link href="/about-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--sage-dark)", textDecoration: "none" }}>About The Inclusion Edit →</Link>
            </div>
            <div style={{ borderRadius: "20px", aspectRatio: "4/5", overflow: "hidden", border: "1px solid var(--gray-border)" }}>
              <img src="/rebekah-hayward.jpg" alt="Rebekah Hayward, Founder of The Inclusion Edit" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </div>
        </section>

        {/* ── DUAL CTA ── */}
        <section style={{ background: "linear-gradient(135deg, #f0f5f0 0%, #e8f0e9 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }} className="cta-split">
            <div style={{ background: "var(--white)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center", border: "2.5px solid var(--sage)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>For leaders and organisations</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Ready to build inclusion that sticks?</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.75, marginBottom: "1.25rem" , flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>Book a free 30 minute call to talk through what your organisation needs, whether that&apos;s consultancy, training or bespoke resources.</p>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.8rem 1rem", borderRadius: "8px", textDecoration: "none", display: "block", width: "100%", boxSizing: "border-box", marginTop: "auto" }}>Book a Free Inclusion Call</Link>
            </div>
            <div style={{ background: "var(--white)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center", border: "2.5px solid var(--sage)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>For individuals and teams</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Be first to join the Impact Platform.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.75, marginBottom: "1.25rem" , flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>40 lessons, 45 practical tools, 47 research reports and case studies, and 10 Inclusion AI tools.</p>
              <Link href="/early-access" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.8rem 1rem", borderRadius: "8px", textDecoration: "none", display: "block", width: "100%", boxSizing: "border-box", marginTop: "auto" }}>Get Early Access</Link>
            </div>
            <div style={{ background: "var(--sage-xlight)", border: "2.5px solid var(--sage)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>Stay in the loop</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Get inclusion insights straight to your inbox.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.7, marginBottom: "1.25rem" , flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>One practical inclusion idea per edition, with tips you can use straight away. Free, and you can unsubscribe at any time.</p>
              {nlStatus === "done" ? (
                <p role="status" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--sage-dark)", margin: 0, marginTop: "auto", padding: "0.8rem 0" }}>✓ You&apos;re on the list. Look out for the next edition.</p>
              ) : (
                <form onSubmit={handleNewsletter} style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <label htmlFor="home-newsletter-email" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>Email address</label>
                  <input id="home-newsletter-email" type="email" required autoComplete="email" placeholder="Your email address" value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", border: "1.5px solid var(--sage)", borderRadius: "8px", padding: "0.75rem 1rem", width: "100%", boxSizing: "border-box", textAlign: "center" }} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={nlHoney} onChange={(e) => setNlHoney(e.target.value)} style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                  <button type="submit" disabled={nlStatus === "sending"} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", background: "var(--sage-light)", padding: "0.8rem 1rem", borderRadius: "8px", textDecoration: "none", display: "block", width: "100%", boxSizing: "border-box", border: "none", cursor: nlStatus === "sending" ? "wait" : "pointer", opacity: nlStatus === "sending" ? 0.75 : 1 }}>{nlStatus === "sending" ? "Subscribing..." : "Subscribe"}</button>
                  {nlError && <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#B42318", margin: 0, lineHeight: 1.5 }}>{nlError}</p>}
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <footer style={{ background: "#2d3d2f", padding: "1rem 1.5rem 0.75rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Top row: brand left, icons right */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>

            {/* Brand */}
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--white)", margin: "0 0 0.4rem" }}>The Inclusion Edit</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", margin: "0 0 0.75rem", letterSpacing: "0.04em" }}>Capacity. Capability. Change.</p>
            </div>

            {/* Social icons + email */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/the-inclusion-edit" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/theinclusionedit" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>

              {/* Spotify podcast */}
              <a href="https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM" target="_blank" rel="noopener noreferrer" aria-label="Podcast on Spotify" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@theinclusionedit" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>

              {/* Email */}
              <a href="mailto:info@theinclusionedit.com" aria-label="Email us" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>

            </div>
          </div>

          {/* Award + newsletter row */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", margin: 0, fontStyle: "italic" }}>Recognised as an award-winning EDI consultancy by Corporate Vision</p>
            <a href="/subscribe" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", marginRight: "2rem" }}>Sign up to our newsletter</a>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", margin: 0 }}>© 2026 The Inclusion Edit. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link href="/privacy" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacy Policy</Link>
            </div>
          </div>

        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .nav-tiles-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sector-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .platform-split { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .founder-split { grid-template-columns: 1fr !important; }
          .founder-split > div:last-child { display: none !important; }
          .cta-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .nav-tiles-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .sector-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
