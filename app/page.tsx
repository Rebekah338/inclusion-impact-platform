"use client";

import Link from "next/link";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";

const NAV_TILES = [
  { label: "Consultancy", href: "/edi-consultancy-programmes", icon: "🤝" },
  { label: "Impact Platform", href: "/about-our-impact-platform", icon: "💡" },
  { label: "Training", href: "/edi-training", icon: "🎓" },
  { label: "Bespoke Resources", href: "/bespoke-inclusion-resources", icon: "✏️" },
  { label: "Podcast and Blog", href: "/podcast", icon: "🎙" },
  { label: "Inclusion AI", href: "/about-our-impact-platform#ai", icon: "✨" },
];

const TESTIMONIALS = [
  {
    quote: "Rebekah was an excellent facilitator. She created a welcoming environment that encouraged honest reflection and meaningful discussion. Her approach was both professional and personal; she encouraged us to think deeply without judgment, which made it easier to be honest about where we are and where we can grow.",
    name: "EDI Lead",
    org: "Higher Education",
  },
  {
    quote: "The Inclusion Edit gave us a clear framework and the practical tools to actually use it. It didn't feel like a tick-box exercise; it felt like real, supported change. We came away knowing exactly what to do next.",
    name: "HR Director",
    org: "Mid-size UK charity",
  },
  {
    quote: "Working with The Inclusion Edit changed how we think about inclusion entirely. It was the first time a consultant had come in and made the work feel genuinely achievable rather than overwhelming. The team left energised and with a real plan.",
    name: "People & Culture Lead",
    org: "International professional services firm",
  },
];

const LOGOS = ["Network Plus", "Hospice UK", "Project Free", "The Berkeley School"];

const PILLARS = [
  {
    title: "You gain confidence, not just knowledge.",
    body: "We make inclusion practical for real teams facing real challenges. Whether you are just beginning or strengthening work already under way, you leave with the clarity and tools to move forward, not just a certificate.",
  },
  {
    title: "You get clarity, not complexity.",
    body: "We turn complex EDI concepts into clear, practical steps, grounded in lived experience and research, so your team feels equipped rather than overwhelmed.",
  },
  {
    title: "You get support built for your context.",
    body: "Schools, charities, public bodies and corporate teams: every piece of our work is shaped around the people you serve and the organisation you are building.",
  },
];

const PLATFORM_FEATURES = [
  { icon: "📚", title: "31 structured modules", desc: "Across three learning pathways: People and Culture, Systems and Processes, Leadership and Strategy." },
  { icon: "🛠", title: "50+ practical tools", desc: "Templates, frameworks, guides and checklists you can use the same day." },
  { icon: "🎬", title: "Video masterclasses", desc: "Deep dives, quick wins and expert sessions at your own pace. Coming soon." },
  { icon: "✨", title: "Inclusion AI", desc: "Specialist AI tools for inclusion work: policy audits, business cases, fairer hiring and more." },
];

const SERVICES = [
  {
    label: "Impact Platform",
    href: "/about-our-impact-platform",
    icon: "💡",
    image: "/images/card-impact-platform.jpg",
    heading: "A platform built for the people doing the real inclusion work.",
    body: "31 CPD-certified modules, 9 AI tools, evidence resources, office hours with an inclusion expert and a growing community of members. Everything you need to build lasting inclusion.",
    cta: "Explore the Platform",
  },
  {
    label: "EDI Consultancy",
    href: "/edi-consultancy-programmes",
    icon: "🤝",
    image: "/images/card-consultancy.jpg",
    heading: "Strategic inclusion support that goes deeper than a single session.",
    body: "We work alongside your organisation to audit, advise and build inclusion strategies grounded in your context and designed to last. From culture audits to policy reviews, we support the work behind the work.",
    cta: "Explore Consultancy",
  },
  {
    label: "EDI Training",
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
    cta: "Find Out More",
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
  { number: "1,000+", label: "Practitioners reached" },
  { number: "100+", label: "Platform resources" },
  { number: "15+", label: "AI tools" },
  { number: "25+", label: "Organisations supported" },
];

export default function Home() {
  const [activeTile, setActiveTile] = useState<string | null>(null);
  // Inclusion starting point finder
  const [starterQ1, setStarterQ1] = useState("");
  const [starterQ2, setStarterQ2] = useState("");
  const [starterQ3, setStarterQ3] = useState("");
  const [starterQ4, setStarterQ4] = useState("");
  const [starterSubmitted, setStarterSubmitted] = useState(false);
  const [starterTyped, setStarterTyped] = useState("");
  const [starterTyping, setStarterTyping] = useState(false);
  const [starterCTA1, setStarterCTA1] = useState({ label: "Explore our services →", href: "/edi-consultancy-programmes" });
  const [starterEmail, setStarterEmail] = useState("");
  const [starterEmailSent, setStarterEmailSent] = useState(false);
  const [starterEmailSending, setStarterEmailSending] = useState(false);
  const [starterResultText, setStarterResultText] = useState("");
  const [starterResourceLink, setStarterResourceLink] = useState({ label: "", href: "" });
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [starterResourceOpen, setStarterResourceOpen] = useState(false);

  function getStarterOutput(q1: string, q2: string, q3: string, q4: string): { text: string; cta: { label: string; href: string }; resource: { label: string; href: string } } {
    const who = q1 === "Individual" ? "You are working on this as an individual" : "You are approaching this as an organisation or team";
    const sector = q2 ? q2.toLowerCase() : "your sector";
    const challenge = q3 ? q3.trim() : "";
    const stage = q4;

    const stageLabel: Record<string, string> = {
      "Just starting": "just starting out",
      "In progress": "already under way",
      "Want to go deeper": "ready to go deeper",
    };
    const stageText = stageLabel[stage] || "at an early stage";

    // Default CTA and resource
    let cta = { label: "Explore our consultancy →", href: "/edi-consultancy-programmes" };
    let resource = { label: "Explore our resources →", href: "/bespoke-inclusion-resources" };

    // Keyword routing for CTA
    const cl = challenge.toLowerCase();
    if (cl.includes("train") || cl.includes("stuck") || cl.includes("learn")) {
      cta = { label: "Explore our training →", href: "/edi-training" };
      resource = { label: "Browse training resources 🔒", href: "/about-our-impact-platform" };
    } else if (cl.includes("resource") || cl.includes("material") || cl.includes("tool")) {
      cta = { label: "See bespoke resources →", href: "/bespoke-inclusion-resources" };
      resource = { label: "Browse our resource library 🔒", href: "/about-our-impact-platform" };
    } else if (cl.includes("business case") || cl.includes("leadership") || cl.includes("board")) {
      cta = { label: "Read the business case →", href: "/the-inclusion-business-case" };
      resource = { label: "Business case toolkit 🔒", href: "/about-our-impact-platform" };
    } else if (cl.includes("policy") || cl.includes("policies")) {
      cta = { label: "Talk to us about policy →", href: "/contact-us" };
      resource = { label: "Policy writing guide 🔒", href: "/about-our-impact-platform" };
    } else if (cl.includes("strategy") || cl.includes("plan") || cl.includes("roadmap")) {
      cta = { label: "Explore our consultancy →", href: "/edi-consultancy-programmes" };
      resource = { label: "EDI strategy toolkit 🔒", href: "/about-our-impact-platform" };
    } else if (cl.includes("data") || cl.includes("audit") || cl.includes("measure")) {
      cta = { label: "Talk to us about auditing →", href: "/contact-us" };
      resource = { label: "EDI data and audit guide 🔒", href: "/about-our-impact-platform" };
    }

    // Build steps based on challenge keyword
    let steps = "";
    if (cl.includes("policy") || cl.includes("policies")) {
      steps = `When working on inclusion policy, a strong foundation makes everything else easier. Here are five steps to get you started:

1. Review two or three example policies from organisations in your sector; look at structure, language and scope rather than copying content.
2. Gather your own organisational data first: demographics, pay gaps, recruitment and retention figures, exit interview themes. Your policy needs to reflect your actual context.
3. Consult with your people before drafting; run listening sessions or a short survey to surface what staff actually need the policy to address.
4. Map your legal obligations: Equality Act 2010 requirements, any sector-specific duties, and any contractual commitments to clients or funders.
5. Draft in plain language with clear ownership: who is responsible for each commitment, how it will be monitored, and when it will be reviewed.

Once you have those foundations, you are in a much stronger position to build a policy that actually lands.`;
    } else if (cl.includes("train") || cl.includes("stuck") || cl.includes("learn")) {
      steps = `When inclusion training is not sticking, the problem is rarely the training itself. Here are five steps to diagnose and fix it:

1. Audit what has already been delivered: what was the content, who attended, and what behaviour change was expected afterwards?
2. Identify the gap between training and practice; talk to managers and ask what gets in the way of applying what they learned.
3. Check whether leadership models the behaviours the training asks of others; culture follows leaders, not slide decks.
4. Build in accountability: make inclusion commitments part of performance conversations, not a separate project.
5. Consider whether your training content reflects your specific context; generic content rarely drives specific change.

Once you have that picture, the right next step becomes much clearer.`;
    } else if (cl.includes("business case") || cl.includes("leadership") || cl.includes("board")) {
      steps = `Making the business case for inclusion is one of the most important and most winnable conversations you can have. Here are five steps:

1. Lead with data that speaks your leadership's language: financial performance, staff retention costs, recruitment reach, client expectations.
2. Benchmark against your sector: what are comparable organisations doing and what outcomes are they reporting?
3. Quantify the cost of inaction: calculate turnover costs, absence rates linked to belonging, and any reputational or regulatory risk.
4. Frame inclusion as a business enabler, not a compliance requirement; use the language of opportunity, not obligation.
5. Prepare for objections: know the two or three most likely pushbacks and have evidence-based responses ready.

A well-constructed business case does not just win the argument once; it creates the mandate for everything that follows.`;
    } else if (cl.includes("strategy") || cl.includes("plan") || cl.includes("roadmap")) {
      steps = `Building an inclusion strategy that actually drives change takes more than a document. Here are five steps to get it right:

1. Start with a diagnostic: before setting priorities, understand where you actually are through data, listening and an honest audit of current activity.
2. Define what success looks like in your context; vague aspirations do not drive accountability.
3. Set time-bound priorities rather than trying to tackle everything; three well-executed commitments create more impact than ten aspirational ones.
4. Build in governance: who owns each priority, what resources are allocated, and how will progress be reported?
5. Communicate the strategy in a way that makes it real for different audiences; what it means for a team manager is different from what it means for a board member.

A strategy is only as strong as the infrastructure that supports it.`;
    } else if (cl.includes("data") || cl.includes("audit") || cl.includes("measure")) {
      steps = `Getting your data and measurement right is one of the highest-leverage things you can do for inclusion. Here are five steps:

1. Start with what you already collect: HR data, engagement survey results, exit interview themes, recruitment funnel data.
2. Identify the gaps: what protected characteristics do you have data on, and what are you missing entirely?
3. Run a voluntary declaration exercise with clear communication about why you are collecting data and how it will be used.
4. Analyse intersectionally where possible; averages can hide significant disparities within groups.
5. Decide how you will report: internally to leadership, externally to stakeholders, and to your own workforce.

Good data does not just tell you where you are; it gives you the mandate to act.`;
    } else {
      steps = `Wherever you are starting from, a few things make the biggest difference early on:

1. Get clear on your current baseline: what do you know about where you are, and what data or evidence do you have to support that picture?
2. Talk to your people before making decisions; the best inclusion strategies are built from listening, not assumption.
3. Identify one or two priorities rather than trying to do everything at once; focus creates momentum.
4. Map what resources, time and budget are actually available; an ambitious plan with no resource behind it stalls quickly.
5. Find out what already exists in your organisation that could be built on; you rarely need to start from scratch.

Starting well sets the tone for everything that follows.`;
    }

    const opener = `${who}, working in the ${sector}, and you are ${stageText}. That is a common place to be.

${steps}

This is exactly the kind of work The Inclusion Edit supports. The right starting point depends on your context, and a short conversation can help you find it. You do not need to have it all worked out before you get in touch; the earlier, the better.`;

    return { text: opener, cta, resource };
  }

  function handleStarterSubmit() {
    const { text, cta, resource } = getStarterOutput(starterQ1, starterQ2, starterQ3, starterQ4);
    setStarterCTA1(cta);
    setStarterResourceLink(resource);
    setStarterResultText(text);
    setStarterSubmitted(true);
    setStarterTyping(true);
    setStarterTyped("");
    setStarterEmail("");
    setStarterEmailSent(false);
    setStarterResourceOpen(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStarterTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setStarterTyping(false);
      }
    }, 18);
  }

  async function handleStarterEmail() {
    if (!starterEmail || starterEmailSending) return;
    setStarterEmailSending(true);
    // BEFORE LAUNCH: connect this to the mailing tool so the steps are emailed and the address is captured
    await new Promise(r => setTimeout(r, 900));
    setStarterEmailSent(true);
    setStarterEmailSending(false);
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
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          {/* Content: left aligned */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5.5rem 2rem 5rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Award-winning EDI consultancy and learning platform</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                <span style={{ color: "#F0E6C8" }}>Your culture is</span><br />
                <span style={{ color: "#A8D4B0" }}>your competitive edge.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                We help organisations move from good intentions to lasting inclusion, through consultancy, training, bespoke resources and an Impact Platform built for the people doing the work.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Book a Free Inclusion Call</Link>
                <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Explore the Platform</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── NAV TILES ── */}
        <section style={{ padding: "0.6rem 1.5rem 0", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          {/* gold shimmer sweep */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", position: "relative", zIndex: 3 }} className="nav-tiles-grid">
            {NAV_TILES.map((tile) => (
              <Link key={tile.href} href={tile.href}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1.35rem 0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: activeTile === tile.label ? "var(--sage-dark)" : "#3a5a3a", textDecoration: "none", transition: "color 0.15s, background 0.15s", background: activeTile === tile.label ? "rgba(107,143,113,0.12)" : "transparent", textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}
                onMouseEnter={() => setActiveTile(tile.label)}
                onMouseLeave={() => setActiveTile(null)}
              >
                <span style={{ fontSize: "1.25rem", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>{tile.icon}</span>
                {tile.label}
              </Link>
            ))}
          </div>
        </section>

                                                {/* ── INCLUSION STARTING POINT FINDER ── */}
        <section style={{ padding: "2.5rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)" }}>
          {/* Radial gold glow behind heading */}
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "700px", height: "350px", background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.05) 45%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>

            {/* Label chip */}
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.1rem" }}>Inclusion Starting Point Finder</span>

            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.85rem)", color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.1 }}>
              Every organisation starts somewhere.<br />
              <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 50%, #A8741A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Find your starting point.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6b5a3a", margin: "0 0 1.5rem", lineHeight: 1.5 }}>Answer four quick questions and we will suggest practical first steps and where to go next.</p>

            {!starterSubmitted ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", textAlign: "left" }}>

                {/* Q1 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", whiteSpace: "nowrap", minWidth: "220px" }}>Who is the support for?</span>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {[{ label: "👤 Myself", val: "Individual" }, { label: "🏢 My organisation or team", val: "Organisation" }].map(({ label, val }) => (
                      <button key={val} onClick={() => setStarterQ1(val)}
                        style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: `1.5px solid ${starterQ1 === val ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: starterQ1 === val ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.83rem", color: starterQ1 === val ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: starterQ1 === val ? "none" : "0 0 0 3px rgba(201,168,76,0.12)" }}
                      >{label}</button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", whiteSpace: "nowrap", minWidth: "110px" }}>Sector</span>
                  <select value={starterQ2} onChange={(e) => setStarterQ2(e.target.value)}
                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: "10px", border: `1.5px solid ${starterQ2 ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-body)", fontSize: "0.83rem", color: starterQ2 ? "var(--sage-dark)" : "#9a8060", cursor: "pointer", minWidth: "200px", outline: "none", boxShadow: "0 0 0 3px rgba(201,168,76,0.12)" }}
                  >
                    <option value="" disabled>Choose your sector</option>
                    {["Corporate or private sector", "Public sector", "Education", "Charity or third sector", "Healthcare", "Other"].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Q3 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", whiteSpace: "nowrap", minWidth: "220px" }}>Where are you with inclusion?</span>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {[{ label: "🌱 Just starting", val: "Just starting" }, { label: "⚙️ In progress", val: "In progress" }, { label: "🚀 Want to go deeper", val: "Want to go deeper" }].map(({ label, val }) => (
                      <button key={val} onClick={() => setStarterQ4(val)}
                        style={{ padding: "0.4rem 0.875rem", borderRadius: "999px", border: `1.5px solid ${starterQ4 === val ? "var(--sage-dark)" : "rgba(201,168,76,0.45)"}`, background: starterQ4 === val ? "var(--sage-xlight)" : "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: starterQ4 === val ? "var(--sage-dark)" : "#7A5200", cursor: "pointer", transition: "all 0.15s", boxShadow: starterQ4 === val ? "none" : "0 0 0 2px rgba(201,168,76,0.12)" }}
                      >{label}</button>
                    ))}
                  </div>
                </div>

                {/* Q4 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", whiteSpace: "nowrap", minWidth: "110px" }}>I need help with</span>
                  <input type="text" value={starterQ3} onChange={(e) => setStarterQ3(e.target.value)} placeholder="For example: building a strategy, making training stick, writing a policy"
                    style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: "10px", border: "1.5px solid rgba(201,168,76,0.45)", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "var(--charcoal)", outline: "none", minWidth: "200px", transition: "border-color 0.15s, box-shadow 0.15s" }}
                    onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.18), 0 0 12px rgba(201,168,76,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.45)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Submit */}
                <div style={{ paddingTop: "0.4rem", display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleStarterSubmit}
                    disabled={!starterQ1 || !starterQ2 || !starterQ4}
                    style={{ padding: "0.75rem 2.25rem", borderRadius: "12px", background: (!starterQ1 || !starterQ2 || !starterQ4) ? "linear-gradient(160deg, #FDFAF5 0%, #FAF6EE 100%)" : "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", border: `1.5px solid ${(!starterQ1 || !starterQ2 || !starterQ4) ? "rgba(201,168,76,0.3)" : "#C9A84C"}`, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: (!starterQ1 || !starterQ2 || !starterQ4) ? "#9a8060" : "var(--charcoal)", cursor: (!starterQ1 || !starterQ2 || !starterQ4) ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: (!starterQ1 || !starterQ2 || !starterQ4) ? "none" : "0 0 0 3px rgba(201,168,76,0.25), 0 0 20px rgba(201,168,76,0.35), 0 4px 16px rgba(201,168,76,0.2)" }}
                  >Find My Starting Point →</button>
                </div>

              </div>
            ) : (
              <div style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 50%, #FAF6EE 100%)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "16px", padding: "1.75rem", boxShadow: "0 0 0 3px rgba(201,168,76,0.12), 0 0 18px 4px rgba(201,168,76,0.13), 0 4px 20px rgba(0,0,0,0.06)", textAlign: "left", position: "relative", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#8B6914", background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.4)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1rem" }}>Your inclusion starting point</span>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.65, color: "var(--charcoal)", margin: "0 0 1.35rem" }}>
                    {starterTyped}
                    {starterTyping && <span style={{ display: "inline-block", width: "2px", height: "1em", background: "#C9A84C", marginLeft: "2px", verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />}
                  </div>
                  {!starterTyping && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                      {/* Primary CTAs */}
                      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                        <Link href={starterCTA1.href} style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", background: "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(42,74,48,0.25)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >{starterCTA1.label}</Link>
                        <Link href="/contact-us" style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", background: "rgba(255,255,255,0.7)", color: "var(--sage-dark)", border: "1.5px solid rgba(42,74,48,0.35)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >Book a Free Inclusion Call →</Link>
                        {starterResourceLink.label && (
                          <div style={{ position: "relative" }}>
                            <button onClick={() => setStarterResourceOpen(v => !v)}
                              style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", color: "#7A5200", border: "1.5px solid rgba(201,168,76,0.45)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 0 0 3px rgba(201,168,76,0.12)" }}
                            >{starterResourceLink.label}</button>
                            {starterResourceOpen && (
                              <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", left: 0, zIndex: 10, background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", border: "1.5px solid rgba(201,168,76,0.45)", borderRadius: "12px", padding: "1rem 1.25rem", boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 0 0 3px rgba(201,168,76,0.12)", minWidth: "260px", maxWidth: "320px" }}>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--charcoal)", margin: "0 0 0.6rem", lineHeight: 1.5 }}>🔒 This resource is available exclusively to Impact Platform members.</p>
                                <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", textDecoration: "none", borderBottom: "1px solid var(--sage-dark)" }}
                                  onClick={() => setStarterResourceOpen(false)}
                                >Become an Impact Platform member →</Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Email capture */}
                      <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                        {!starterEmailSent ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "#6b5a3a" }}>Want to save these steps? We'll email them to you.</span>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                              <input type="email" value={starterEmail} onChange={(e) => setStarterEmail(e.target.value)} placeholder="Your email address"
                                style={{ flex: 1, minWidth: "200px", padding: "0.5rem 1rem", borderRadius: "10px", border: "1.5px solid rgba(201,168,76,0.45)", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "var(--charcoal)", outline: "none" }}
                                onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.18)"; }}
                                onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.45)"; e.target.style.boxShadow = "none"; }}
                              />
                              <button onClick={handleStarterEmail} disabled={!starterEmail || starterEmailSending}
                                style={{ padding: "0.5rem 1.25rem", borderRadius: "10px", background: (!starterEmail || starterEmailSending) ? "rgba(201,168,76,0.15)" : "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", border: "1.5px solid rgba(201,168,76,0.45)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.83rem", color: (!starterEmail || starterEmailSending) ? "#9a8060" : "var(--charcoal)", cursor: (!starterEmail || starterEmailSending) ? "not-allowed" : "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                              >{starterEmailSending ? "Sending..." : "Email me these steps →"}</button>
                            </div>
                          </div>
                        ) : (
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "var(--sage-dark)", margin: 0 }}>✓ On its way to your inbox.</p>
                        )}
                      </div>

                      <button onClick={() => { setStarterSubmitted(false); setStarterTyped(""); setStarterQ1(""); setStarterQ2(""); setStarterQ3(""); setStarterQ4(""); setStarterEmail(""); setStarterEmailSent(false); setStarterResourceOpen(false); }}
                        style={{ alignSelf: "flex-start", background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#9a8060", cursor: "pointer", padding: "0.15rem 0", textDecoration: "underline" }}
                      >Start again</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

{/* ── POSITIONING + STATS (combined, photo-background) ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "2.5rem 1.5rem" }}>
          {/* Photo layer */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
          {/* Sage overlay */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232, 238, 230, 0.93)", backdropFilter: "blur(2px)", zIndex: 1 }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Text */}
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>Why organisations come to us</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.25rem, 2.8vw, 1.85rem)", color: "var(--charcoal)", lineHeight: 1.5, marginBottom: "1rem" }}>
                <span style={{ display: "block", whiteSpace: "nowrap" }}>Most organisations want to be inclusive.</span>
                <span style={{ display: "block", whiteSpace: "nowrap" }}>Few have the support to get there.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, margin: 0 }}>
                The problem is rarely commitment. It is the lack of practical tools, a clear structure and sustained support to turn good intentions into lasting change. That is what we built The Inclusion Edit to provide.
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
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "1.25rem" }}>The tools, learning and support to make inclusion part of everyday work.</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, marginBottom: "1.5rem" }}>
                  A digital learning and development space for inclusion practitioners and the organisations they serve: structured modules, practical tools, video masterclasses and specialist AI tools, all built around real inclusion work.
                </p>
                <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>Explore the Platform</Link>
                  <Link href="/pricing" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--sage-dark)", background: "transparent", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid var(--sage-dark)" }}>See Membership Options</Link>
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
                    Trusted across the UK, Bermuda and the US
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
                    style={{ position: "absolute", left: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: testimonialIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: testimonialIdx === 0 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
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
                    style={{ position: "absolute", right: "-1.75rem", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1.5px solid rgba(42,74,48,0.25)", background: "var(--white)", cursor: testimonialIdx === totalTestimonialSlides - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: testimonialIdx === totalTestimonialSlides - 1 ? "rgba(42,74,48,0.2)" : "var(--sage-dark)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.15s" }}
                  >&#8250;</button>
                </div>

                {/* Dot indicators */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {Array.from({ length: totalTestimonialSlides }).map((_, i) => (
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
                I&apos;m Rebekah, founder of The Inclusion Edit. That means practical, evidence-informed support from someone who has sat in the meetings, navigated the politics and knows what it takes to build inclusion that lasts. My work draws on lived experience as well as professional expertise, so it is grounded in the realities your people face, not just theory.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, marginBottom: "1.5rem" }}>
                I hold a Master&apos;s in Education: International Development and Social Justice, and a CMI Level 7 Qualification in Strategic Approaches to EDI. Across consultancy, training and the Impact Platform, everything we create is designed to give your organisation the clarity, confidence and tools to make inclusion stick.
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
            <div style={{ background: "var(--white)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center", border: "2.5px solid var(--sage)" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>For organisations</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Ready to build inclusion that sticks?</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.75, marginBottom: "1.25rem" }}>Book a free call to explore how consultancy, training or bespoke resources could work for you.</p>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.8rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Book a Free Inclusion Call</Link>
            </div>
            <div style={{ background: "var(--white)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center", border: "2.5px solid var(--sage)" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>For individuals and teams</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Join the Impact Platform and start today.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.75, marginBottom: "1.25rem" }}>31 modules, 50+ practical tools and specialist AI tools for inclusion work.</p>
              <Link href="/pricing" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.8rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Start Your Membership</Link>
            </div>
            <div style={{ background: "var(--sage-xlight)", border: "2.5px solid var(--sage)", borderRadius: "20px", padding: "1.25rem 1.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.875rem" }}>Stay in the loop</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--charcoal)", lineHeight: 1.25, marginBottom: "1rem" }}>Get inclusion insights straight to your inbox.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.7, marginBottom: "1.25rem" }}>One inclusion concept per edition, unpacked properly; practical tips you can use straight away. Completely free.</p>
              <a href="mailto:info@theinclusionedit.com?subject=Please%20add%20me%20to%20the%20newsletter" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", background: "var(--sage-light)", padding: "0.8rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Join the Newsletter</a>
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
              <a href="https://open.spotify.com/show/theinclusionedit" target="_blank" rel="noopener noreferrer" aria-label="Podcast on Spotify" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.15s" }}
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
