"use client";

import Link from "next/link";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import Icon from "@/app/components/BrandIcon";

const NAV_TILES = [
  { label: "Consultancy", href: "/edi-consultancy-programmes", icon: "people" },
  { label: "Impact Platform", href: "/about-our-impact-platform", icon: "layers" },
  { label: "Training", href: "/edi-training", icon: "graduation" },
  { label: "Bespoke Resources", href: "/bespoke-inclusion-resources", icon: "wrench" },
  { label: "Podcast and Blog", href: "/podcast", icon: "megaphone" },
  { label: "Inclusion AI", href: "/about-our-impact-platform", icon: "sparkle" },
];

/* PLACEHOLDER TESTIMONIALS: Rebekah will replace these with real, attributed quotes before launch */
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

const PILLARS = [
  {
    icon: "award",
    title: "You gain confidence, not just knowledge.",
    body: "We make inclusion practical for real teams facing real challenges. Whether you are just beginning or strengthening work already under way, you leave with the clarity and tools to move forward, not just a certificate.",
  },
  {
    icon: "target",
    title: "You get clarity, not complexity.",
    body: "We turn complex EDI concepts into clear, practical steps, grounded in lived experience and research, so your team feels equipped rather than overwhelmed.",
  },
  {
    icon: "map",
    title: "You get support built for your context.",
    body: "Schools, charities, public bodies and corporate teams: every piece of our work is shaped around the people you serve and the organisation you are building.",
  },
];

const PLATFORM_FEATURES = [
  { icon: "book", title: "31 structured modules", desc: "Across three learning pathways: People and Culture, Systems and Processes, Leadership and Strategy." },
  { icon: "wrench", title: "50+ practical tools", desc: "Templates, frameworks, guides and checklists you can use the same day." },
  { icon: "video", title: "Video masterclasses", desc: "Deep dives, quick wins and expert sessions at your own pace. Coming soon." },
  { icon: "sparkle", title: "Inclusion AI", desc: "Specialist AI tools for inclusion work: policy audits, business cases, fairer hiring and more." },
];

const SERVICES = [
  {
    label: "Impact Platform",
    href: "/about-our-impact-platform",
    icon: "layers",
    image: "/images/card-impact-platform.jpg",
    heading: "A platform built for the people doing the real inclusion work.",
    body: "31 CPD-certified modules, 9 AI tools, evidence resources, office hours with an inclusion expert and a growing community of members. Everything you need to build lasting inclusion.",
    cta: "Explore the Platform",
  },
  {
    label: "EDI Consultancy",
    href: "/edi-consultancy-programmes",
    icon: "people",
    image: "/images/card-consultancy.jpg",
    heading: "Strategic inclusion support that goes deeper than a single session.",
    body: "We work alongside your organisation to audit, advise and build inclusion strategies grounded in your context and designed to last. From culture audits to policy reviews, we support the work behind the work.",
    cta: "Explore Consultancy",
  },
  {
    label: "EDI Training",
    href: "/edi-training",
    icon: "graduation",
    image: "/images/card-training.jpg",
    heading: "Training that moves teams from awareness to action.",
    body: "Workshops and programmes built around the challenges your teams actually face: unconscious bias, psychological safety, inclusive leadership or something bespoke. Practical, participatory and ready to use.",
    cta: "Explore Training",
  },
  {
    label: "Bespoke Resources",
    href: "/bespoke-inclusion-resources",
    icon: "wrench",
    image: "/images/card-bespoke.jpg",
    heading: "Custom tools and content built for your organisation.",
    body: "Need something that does not exist yet? We design toolkits, guides and e-learning modules tailored to your team, your language and your goals.",
    cta: "Find Out More",
  },
];

/* PLACEHOLDER FIGURES: confirm each number before launch (the AI tool count differs from the 9 listed on the platform) */
const STATS = [
  { number: "40+", label: "Years combined experience" },
  { number: "1,000+", label: "Practitioners reached" },
  { number: "100+", label: "Platform resources" },
  { number: "15+", label: "AI tools" },
  { number: "25+", label: "Organisations supported" },
];

const eyebrow: React.CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--evergreen)", margin: "0 0 0.85rem" };
const h2Style: React.CSSProperties = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)", color: "var(--ink)", lineHeight: 1.2, margin: "0 0 1rem" };
const bodyText: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 };
const primaryBtn: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", minHeight: "44px", boxSizing: "border-box", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.8rem 1.75rem", borderRadius: "var(--radius-sm)", textDecoration: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap" };
const secondaryBtn: React.CSSProperties = { ...primaryBtn, color: "var(--evergreen)", background: "var(--white)", border: "2px solid var(--evergreen)" };

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
  const [starterCTA1, setStarterCTA1] = useState({ label: "Explore Our Services", href: "/edi-consultancy-programmes" });
  const [starterResultText, setStarterResultText] = useState("");
  const [starterResourceLink, setStarterResourceLink] = useState({ label: "", href: "" });
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [starterResourceOpen, setStarterResourceOpen] = useState(false);
  const [stepsCopied, setStepsCopied] = useState(false);

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

    let cta = { label: "Explore Our Consultancy", href: "/edi-consultancy-programmes" };
    let resource = { label: "Explore Our Resources", href: "/bespoke-inclusion-resources" };

    const cl = challenge.toLowerCase();
    if (cl.includes("train") || cl.includes("stuck") || cl.includes("learn")) {
      cta = { label: "Explore Our Training", href: "/edi-training" };
      resource = { label: "Training resources", href: "/about-our-impact-platform" };
    } else if (cl.includes("resource") || cl.includes("material") || cl.includes("tool")) {
      cta = { label: "See Bespoke Resources", href: "/bespoke-inclusion-resources" };
      resource = { label: "Our resource library", href: "/about-our-impact-platform" };
    } else if (cl.includes("business case") || cl.includes("leadership") || cl.includes("board")) {
      cta = { label: "Read the Business Case", href: "/the-inclusion-business-case" };
      resource = { label: "Business case toolkit", href: "/about-our-impact-platform" };
    } else if (cl.includes("policy") || cl.includes("policies")) {
      cta = { label: "Talk to Us About Policy", href: "/contact-us" };
      resource = { label: "Policy writing guide", href: "/about-our-impact-platform" };
    } else if (cl.includes("strategy") || cl.includes("plan") || cl.includes("roadmap")) {
      cta = { label: "Explore Our Consultancy", href: "/edi-consultancy-programmes" };
      resource = { label: "EDI strategy toolkit", href: "/about-our-impact-platform" };
    } else if (cl.includes("data") || cl.includes("audit") || cl.includes("measure")) {
      cta = { label: "Talk to Us About Auditing", href: "/contact-us" };
      resource = { label: "EDI data and audit guide", href: "/about-our-impact-platform" };
    }

    let steps = "";
    if (cl.includes("policy") || cl.includes("policies")) {
      steps = `When working on inclusion policy, a strong foundation makes everything else easier. Here are five steps to get you started:

1. Review two or three example policies from organisations in your sector; look at structure, language and scope rather than copying content.
2. Gather your own organisational data first: demographics, pay gaps, recruitment and retention figures, exit interview themes. Your policy needs to reflect your actual context.
3. Consult your people before drafting; run listening sessions or a short survey to surface what staff need the policy to address.
4. Map your legal obligations: Equality Act 2010 requirements, any sector duties, and any commitments to clients or funders.
5. Draft in plain language with clear ownership: who is responsible for each commitment, how it will be monitored, and when it will be reviewed.

With those foundations in place, you are in a much stronger position to write a policy that lands.`;
    } else if (cl.includes("train") || cl.includes("stuck") || cl.includes("learn")) {
      steps = `When inclusion training is not sticking, the problem is rarely the training itself. Here are five steps to find out why:

1. Review what has already been delivered: the content, who attended, and what behaviour change was expected afterwards.
2. Find the gap between training and practice; ask managers what gets in the way of applying what they learned.
3. Check whether leaders model the behaviours the training asks of others; culture follows leaders, not slide decks.
4. Build in accountability: make inclusion commitments part of performance conversations, not a separate project.
5. Ask whether your training reflects your specific context; generic content rarely drives specific change.

Once you have that picture, the right next step becomes much clearer.`;
    } else if (cl.includes("business case") || cl.includes("leadership") || cl.includes("board")) {
      steps = `Making the business case for inclusion is one of the most important conversations you can have, and one you can win. Here are five steps:

1. Lead with evidence that speaks your leadership's language: retention costs, recruitment reach, performance and client expectations.
2. Benchmark against your sector: what are comparable organisations doing, and what outcomes are they reporting?
3. Show the cost of inaction: turnover costs, absence linked to belonging, and any reputational or regulatory risk.
4. Frame inclusion as a way to run the organisation better, not a compliance exercise.
5. Prepare for objections: know the two or three most likely pushbacks and have evidence-based answers ready.

A well-built business case does not just win the argument once; it creates the mandate for everything that follows.`;
    } else if (cl.includes("strategy") || cl.includes("plan") || cl.includes("roadmap")) {
      steps = `An inclusion strategy that drives change takes more than a document. Here are five steps to get it right:

1. Start with a diagnostic: understand where you are through data, listening and an honest review of current activity.
2. Define what success looks like in your context; vague aspirations do not drive accountability.
3. Set a few time-bound priorities; three commitments delivered well create more impact than ten that stall.
4. Build in governance: who owns each priority, what resources are allocated, and how progress will be reported.
5. Explain the strategy in ways that make it real for each audience; what it means for a team manager differs from what it means for the board.

A strategy is only as strong as the structure that supports it.`;
    } else if (cl.includes("data") || cl.includes("audit") || cl.includes("measure")) {
      steps = `Getting your data and measurement right is one of the most useful things you can do for inclusion. Here are five steps:

1. Start with what you already collect: HR data, engagement survey results, exit interview themes, recruitment data.
2. Find the gaps: which protected characteristics do you have data on, and what is missing?
3. Run a voluntary declaration exercise, explaining clearly why you are collecting data and how it will be used.
4. Analyse intersectionally where you can; averages can hide significant differences within groups.
5. Decide how you will report: to leadership, to external stakeholders, and to your own workforce.

Good data does not just tell you where you are; it gives you the mandate to act.`;
    } else {
      steps = `Wherever you are starting from, a few things make the biggest difference early on:

1. Get clear on your baseline: what do you know about where you are, and what evidence supports that picture?
2. Talk to your people before making decisions; the best inclusion strategies are built on listening, not assumption.
3. Choose one or two priorities rather than trying to do everything at once; focus creates momentum.
4. Map the time, budget and people you actually have; an ambitious plan with nothing behind it stalls quickly.
5. Find out what already exists that you could build on; you rarely need to start from scratch.

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
    setStepsCopied(false);
    setStarterResourceOpen(false);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStarterTyped(text); setStarterTyping(false); return; }
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setStarterTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setStarterTyping(false);
      }
    }, 14);
  }

  async function copySteps() {
    try { await navigator.clipboard.writeText(starterResultText); setStepsCopied(true); setTimeout(() => setStepsCopied(false), 2500); } catch { /* ignore */ }
  }

  const resetStarter = () => { setStarterSubmitted(false); setStarterTyped(""); setStarterQ1(""); setStarterQ2(""); setStarterQ3(""); setStarterQ4(""); setStepsCopied(false); setStarterResourceOpen(false); };
  const ready = !!(starterQ1 && starterQ2 && starterQ4);

  const choice = (selected: boolean): React.CSSProperties => ({ display: "inline-flex", alignItems: "center", gap: "0.4rem", minHeight: "44px", padding: "0.5rem 1rem", borderRadius: "999px", borderTop: `${selected ? 2 : 1.5}px solid ${selected ? "var(--evergreen)" : "var(--line)"}`, borderRight: `${selected ? 2 : 1.5}px solid ${selected ? "var(--evergreen)" : "var(--line)"}`, borderBottom: `${selected ? 2 : 1.5}px solid ${selected ? "var(--evergreen)" : "var(--line)"}`, borderLeft: `${selected ? 2 : 1.5}px solid ${selected ? "var(--evergreen)" : "var(--line)"}`, background: selected ? "var(--pale-sage)" : "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--ink)", cursor: "pointer" });
  const qLabel: React.CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)", minWidth: "230px" };

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO: full photo hero under the Forest overlay */}
        <section style={{ position: "relative", minHeight: "640px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/homepage-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 45%" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem 4.5rem", boxSizing: "border-box" }}>
            <div style={{ maxWidth: "580px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--white)", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "0.4rem 1rem", marginBottom: "1.5rem", backdropFilter: "blur(4px)" }}>Award-winning EDI consultancy and Impact Platform</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 4.25rem)", lineHeight: 1.05, margin: "0 0 1.25rem", letterSpacing: "-0.01em" }}>
                <span style={{ color: "var(--hero-cream)" }}>Capacity.<br />Capability.</span><br /><span style={{ color: "var(--hero-mint)" }}>Change.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--white)", lineHeight: 1.7, margin: "0 0 2rem" }}>
                We help organisations move from good intentions to lasting inclusion, through consultancy, training, bespoke resources and an Impact Platform built for the people doing the work.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ ...primaryBtn, color: "var(--evergreen)", background: "var(--white)" }}>Book a Free Inclusion Call</Link>
                <Link href="/about-our-impact-platform" style={{ ...primaryBtn, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}>Explore the Platform</Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <nav aria-label="What we offer" style={{ background: "var(--mist)", borderBottom: "1px solid var(--line)", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }} className="nav-tiles-grid">
            {NAV_TILES.map((tile) => {
              const on = activeTile === tile.label;
              return (
                <Link key={tile.label} href={tile.href}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.45rem", padding: "1.25rem 0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: on ? "var(--forest)" : "var(--evergreen)", textDecoration: "none", background: on ? "var(--pale-sage)" : "transparent", transition: "background 0.15s" }}
                  onMouseEnter={() => setActiveTile(tile.label)}
                  onMouseLeave={() => setActiveTile(null)}
                  onFocus={() => setActiveTile(tile.label)}
                  onBlur={() => setActiveTile(null)}
                >
                  <Icon name={tile.icon} size={22} color="var(--evergreen)" />
                  {tile.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* STARTING POINT FINDER: warm insight section (website only) */}
        <section aria-labelledby="finder-title" style={{ padding: "3rem 1.5rem", background: "var(--linen)" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--ink)", background: "var(--gold)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1rem" }}>Inclusion Starting Point Finder</span>
              <h2 id="finder-title" style={{ ...h2Style, fontSize: "clamp(1.5rem, 3vw, 2rem)", margin: "0 0 0.5rem" }}>
                Every organisation starts somewhere. <span style={{ color: "var(--gold-deep)" }}>Find your starting point.</span>
              </h2>
              <p style={{ ...bodyText, color: "var(--slate)" }}>Answer four quick questions and we will suggest practical first steps and where to go next.</p>
            </div>

            <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", borderTop: "3px solid var(--gold)", borderRight: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", borderLeft: "1.5px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: "1.75rem 2rem" }}>
              {!starterSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); if (ready) handleStarterSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <fieldset style={{ border: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <legend style={{ ...qLabel, float: "left", padding: 0 }}>Who is the support for?</legend>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {[{ label: "Myself", val: "Individual", icon: "people" }, { label: "My organisation or team", val: "Organisation", icon: "briefcase" }].map(({ label, val, icon }) => (
                        <button type="button" key={val} aria-pressed={starterQ1 === val} onClick={() => setStarterQ1(val)} style={choice(starterQ1 === val)}>
                          <Icon name={starterQ1 === val ? "check" : icon} size={15} color="var(--evergreen)" /> {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <label htmlFor="finder-sector" style={qLabel}>Your sector</label>
                    <select id="finder-sector" value={starterQ2} onChange={(e) => setStarterQ2(e.target.value)}
                      style={{ flex: 1, minWidth: "220px", minHeight: "44px", padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)", border: `1.5px solid ${starterQ2 ? "var(--evergreen)" : "var(--line)"}`, background: "var(--white)", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: starterQ2 ? "var(--ink)" : "var(--slate)", cursor: "pointer" }}
                    >
                      <option value="" disabled>Choose your sector</option>
                      {["Corporate or private sector", "Public sector", "Education", "Charity or third sector", "Healthcare", "Other"].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <fieldset style={{ border: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <legend style={{ ...qLabel, float: "left", padding: 0 }}>Where are you with inclusion?</legend>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {[{ label: "Just starting", icon: "target" }, { label: "In progress", icon: "trending" }, { label: "Want to go deeper", icon: "layers" }].map(({ label, icon }) => (
                        <button type="button" key={label} aria-pressed={starterQ4 === label} onClick={() => setStarterQ4(label)} style={choice(starterQ4 === label)}>
                          <Icon name={starterQ4 === label ? "check" : icon} size={15} color="var(--evergreen)" /> {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <label htmlFor="finder-need" style={qLabel}>I need help with <span style={{ fontWeight: 400, color: "var(--slate)" }}>(optional)</span></label>
                    <input id="finder-need" type="text" value={starterQ3} onChange={(e) => setStarterQ3(e.target.value)} placeholder="For example: building a strategy, making training stick, writing a policy"
                      style={{ flex: 1, minWidth: "220px", minHeight: "44px", padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--line)", background: "var(--white)", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)" }}
                    />
                  </div>

                  <div style={{ paddingTop: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                    <button type="submit" disabled={!ready} style={{ ...primaryBtn, background: ready ? "var(--evergreen)" : "var(--line)", color: ready ? "var(--white)" : "var(--slate)", cursor: ready ? "pointer" : "not-allowed" }}>
                      Find My Starting Point <Icon name="chevron" size={16} color={ready ? "var(--white)" : "var(--slate)"} />
                    </button>
                    {!ready && <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)" }}>Answer the first three questions to continue</span>}
                  </div>
                </form>
              ) : (
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--gold-deep)", marginBottom: "0.9rem" }}>
                    <Icon name="target" size={15} color="var(--gold-deep)" /> Your starting point
                  </span>
                  <div aria-live="polite" style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 1.35rem", whiteSpace: "pre-line" }}>
                    {starterTyped}
                    {starterTyping && <span aria-hidden="true" style={{ display: "inline-block", width: "2px", height: "1em", background: "var(--evergreen)", marginLeft: "2px", verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />}
                  </div>
                  {!starterTyping && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                        <Link href={starterCTA1.href} style={primaryBtn}>{starterCTA1.label} <Icon name="chevron" size={16} color="var(--white)" /></Link>
                        <Link href="/contact-us" style={secondaryBtn}>Book a Free Inclusion Call</Link>
                        {starterResourceLink.label && (
                          <div style={{ position: "relative" }}>
                            <button type="button" aria-expanded={starterResourceOpen} onClick={() => setStarterResourceOpen(v => !v)} style={{ ...secondaryBtn, borderColor: "var(--line)", color: "var(--ink)" }}>
                              <Icon name="lock" size={15} color="var(--evergreen)" /> {starterResourceLink.label}
                            </button>
                            {starterResourceOpen && (
                              <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", left: 0, zIndex: 10, background: "var(--white)", border: "1.5px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem 1.25rem", boxShadow: "var(--shadow-md)", minWidth: "260px", maxWidth: "320px" }}>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", margin: "0 0 0.6rem", lineHeight: 1.5 }}>This resource is part of the Impact Platform, available to members.</p>
                                <Link href="/about-our-impact-platform" onClick={() => setStarterResourceOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)", textDecoration: "none" }}>
                                  Explore Membership <Icon name="chevron" size={14} color="var(--evergreen)" />
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.85rem", display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
                        <button type="button" onClick={copySteps} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", minHeight: "44px", background: "none", border: "none", padding: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", cursor: "pointer" }}>
                          <Icon name={stepsCopied ? "check" : "copy"} size={16} color="var(--evergreen)" /> {stepsCopied ? "Steps Copied" : "Copy These Steps"}
                        </button>
                        <button type="button" onClick={resetStarter} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", minHeight: "44px", background: "none", border: "none", padding: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--slate)", cursor: "pointer" }}>
                          <Icon name="back" size={16} color="var(--slate)" /> Start Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WHY ORGANISATIONS COME TO US + FIGURES */}
        <section style={{ padding: "4rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ maxWidth: "680px", margin: "0 auto 2.25rem", textAlign: "center" }}>
              <p style={eyebrow}>Why organisations come to us</p>
              <h2 style={h2Style}>Most organisations want to be inclusive. <span style={{ color: "var(--evergreen)" }}>Few have the support to get there.</span></h2>
              <p style={bodyText}>
                The problem is rarely commitment. It is the lack of practical tools, a clear structure and sustained support to turn good intentions into lasting change. That is what we built The Inclusion Edit to provide.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem", textAlign: "center" }} className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} style={{ background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "var(--radius-md)", padding: "1.1rem 0.5rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.6vw, 2rem)", color: "var(--hero-cream)", margin: "0 0 0.2rem", fontVariantNumeric: "lining-nums" }}>{s.number}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, color: "var(--white)", letterSpacing: "0.02em", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ background: "var(--mist)", padding: "4.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
              <p style={eyebrow}>How we work with you</p>
              <h2 style={{ ...h2Style, margin: 0 }}>Four ways to build lasting inclusion.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }} className="services-grid">
              {SERVICES.map((s) => (
                <Link key={s.label} href={s.href} className="service-card" style={{ background: "var(--white)", borderRadius: "var(--radius-md)", borderTop: "1.5px solid var(--line)", borderRight: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", borderLeft: "1.5px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  <div style={{ position: "relative", width: "100%", height: "150px", flexShrink: 0, background: "var(--pale-sage)" }}>
                    <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--photo-tint)" }} />
                  </div>
                  <div style={{ padding: "1.25rem 1.35rem 1.35rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--evergreen)", margin: "0 0 0.6rem" }}><Icon name={s.icon} size={16} color="var(--evergreen)" /> {s.label}</p>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink)", lineHeight: 1.35, margin: "0 0 0.6rem" }}>{s.heading}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 1rem", flexGrow: 1 }}>{s.body}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)" }}>{s.cta} <Icon name="chevron" size={15} color="var(--evergreen)" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* VALUE PILLARS */}
        <section style={{ position: "relative", overflow: "hidden", padding: "4.5rem 1.5rem", background: "var(--forest)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(20,40,25,0.9)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
              <p style={{ ...eyebrow, color: "var(--hero-cream)" }}>What working with us gives you</p>
              <h2 style={{ ...h2Style, color: "var(--white)", margin: 0 }}>From knowledge to action to <span style={{ color: "var(--gold-light)" }}>measurable change.</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {PILLARS.map((p) => (
                <div key={p.title} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-lg)", padding: "1.6rem 1.75rem", backdropFilter: "blur(6px)" }}>
                  <span style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid var(--gold-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.9rem" }}><Icon name={p.icon} size={20} color="var(--gold-light)" /></span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.08rem", color: "var(--white)", lineHeight: 1.35, margin: "0 0 0.6rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--white)", lineHeight: 1.65, margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM SPOTLIGHT */}
        <section style={{ padding: "4.5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }} className="platform-split">
              <div>
                <p style={eyebrow}>The Impact Platform</p>
                <h2 style={h2Style}>The tools, learning and support to make inclusion part of everyday work.</h2>
                <p style={{ ...bodyText, marginBottom: "1.5rem" }}>
                  A digital learning and development space for inclusion practitioners and the organisations they serve: structured modules, practical tools, video masterclasses and specialist AI tools, all built around real inclusion work.
                </p>
                <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/about-our-impact-platform" style={primaryBtn}>Explore the Platform</Link>
                  <Link href="/pricing" style={secondaryBtn}>See Membership Options</Link>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {PLATFORM_FEATURES.map((f) => (
                  <div key={f.title} style={{ background: "var(--white)", borderRadius: "var(--radius-md)", padding: "1.25rem", borderTop: "4px solid var(--evergreen)", borderRight: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", borderLeft: "1.5px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                    <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--pale-sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.7rem" }}><Icon name={f.icon} size={19} color={f.icon === "sparkle" ? "var(--gold)" : "var(--evergreen)"} strokeWidth={f.icon === "sparkle" ? 2 : 1.75} /></span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)", margin: "0 0 0.35rem", lineHeight: 1.3 }}>{f.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        {(() => {
          const totalTestimonialSlides = Math.ceil(TESTIMONIALS.length / 3);
          const visibleTestimonials = TESTIMONIALS.slice(testimonialIdx * 3, testimonialIdx * 3 + 3);
          const arrow = (disabled: boolean): React.CSSProperties => ({ position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid var(--line)", background: "var(--white)", cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)", opacity: disabled ? 0.5 : 1 });
          return (
            <section style={{ padding: "4.5rem 1.5rem", position: "relative", overflow: "hidden", background: "var(--mist)" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(244,247,244,0.93)" }} />
              <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--evergreen)", border: "1.5px solid var(--evergreen)", background: "var(--white)", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1rem" }}>
                    Trusted across the UK, Bermuda and the US
                  </span>
                  <h2 style={{ ...h2Style, margin: 0 }}>What people say about working with us.</h2>
                </div>

                <div style={{ position: "relative" }}>
                  {totalTestimonialSlides > 1 && (
                    <button onClick={() => setTestimonialIdx((i) => Math.max(0, i - 1))} disabled={testimonialIdx === 0} aria-label="Previous testimonials" style={{ ...arrow(testimonialIdx === 0), left: "-1.5rem" }}>
                      <Icon name="back" size={18} color="var(--evergreen)" />
                    </button>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="testimonial-grid">
                    {visibleTestimonials.map((t, i) => (
                      <blockquote key={i} style={{ background: "var(--linen)", border: "1.5px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "1.6rem 1.75rem", margin: 0, display: "flex", flexDirection: "column", boxShadow: "var(--shadow-md)" }}>
                        <span aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", lineHeight: 0.8, color: "var(--gold)", marginBottom: "0.5rem" }}>&ldquo;</span>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "var(--ink)", lineHeight: 1.65, margin: "0 0 1.25rem", fontStyle: "italic", flexGrow: 1 }}>{t.quote}</p>
                        <footer>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", margin: "0 0 0.15rem" }}>{t.name}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: 0 }}>{t.org}</p>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  {totalTestimonialSlides > 1 && (
                    <button onClick={() => setTestimonialIdx((i) => Math.min(totalTestimonialSlides - 1, i + 1))} disabled={testimonialIdx === totalTestimonialSlides - 1} aria-label="Next testimonials" style={{ ...arrow(testimonialIdx === totalTestimonialSlides - 1), right: "-1.5rem" }}>
                      <Icon name="chevron" size={18} color="var(--evergreen)" />
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* FOUNDER */}
        <section style={{ padding: "4.5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "3.5rem", alignItems: "center" }} className="founder-split">
            <div>
              <p style={eyebrow}>Why our approach works</p>
              <h2 style={h2Style}>Inclusion expertise that moves organisations from intention to impact.</h2>
              <p style={{ ...bodyText, marginBottom: "0.9rem" }}>
                I&apos;m Rebekah, founder of The Inclusion Edit. That means practical, evidence-informed support from someone who has sat in the meetings, navigated the politics and knows what it takes to build inclusion that lasts. My work draws on lived experience as well as professional expertise, so it is grounded in the realities your people face, not just theory.
              </p>
              <p style={{ ...bodyText, marginBottom: "1.5rem" }}>
                I hold a Master&apos;s in Education: International Development and Social Justice, and a CMI Level 7 Qualification in Strategic Approaches to EDI. Across consultancy, training and the Impact Platform, everything we create is designed to give your organisation the clarity, confidence and tools to make inclusion stick.
              </p>
              <Link href="/about-us" style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--evergreen)", textDecoration: "none", minHeight: "44px" }}>About The Inclusion Edit <Icon name="chevron" size={16} color="var(--evergreen)" /></Link>
            </div>
            <div style={{ borderRadius: "var(--radius-lg)", aspectRatio: "4/5", overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}>
              <img src="/rebekah-hayward.jpg" alt="Rebekah Hayward, founder of The Inclusion Edit" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </div>
        </section>

        {/* CLOSING CALLS TO ACTION */}
        <section style={{ background: "var(--mist)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }} className="cta-split">
            {[
              { eyebrowText: "For organisations", title: "Ready to build inclusion that sticks?", body: "Book a free call to explore how consultancy, training or bespoke resources could work for you.", cta: "Book a Free Inclusion Call", href: "/contact-us", icon: "message" },
              { eyebrowText: "For individuals and teams", title: "Join the Impact Platform and start today.", body: "31 modules, 50+ practical tools and specialist AI tools for inclusion work.", cta: "Start Your Membership", href: "/pricing", icon: "layers" },
              { eyebrowText: "Stay in the loop", title: "Inclusion insights in your inbox.", body: "Practical tools, resources and EDI updates. No noise, no fluff.", cta: "Join the Newsletter", href: "mailto:info@theinclusionedit.com?subject=Please%20add%20me%20to%20the%20newsletter", icon: "bell" },
            ].map((c, i) => (
              <div key={c.title} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.6rem", borderTop: `6px solid ${i === 2 ? "var(--fern)" : "var(--evergreen)"}`, borderRight: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", borderLeft: "1.5px solid var(--line)", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
                <p style={{ ...eyebrow, display: "flex", alignItems: "center", gap: "0.4rem", margin: "0 0 0.6rem" }}><Icon name={c.icon} size={16} color="var(--evergreen)" /> {c.eyebrowText}</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "var(--ink)", lineHeight: 1.25, margin: "0 0 0.6rem" }}>{c.title}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 1.25rem", flexGrow: 1 }}>{c.body}</p>
                {c.href.startsWith("mailto:") ? (
                  <a href={c.href} style={{ ...secondaryBtn, alignSelf: "flex-start" }}>{c.cta}</a>
                ) : (
                  <Link href={c.href} style={{ ...primaryBtn, alignSelf: "flex-start" }}>{c.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer style={{ background: "var(--deep-pine, #1E3624)", padding: "1rem 1.5rem 0.75rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Top row: brand left, icons right */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>

            {/* Brand */}
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--white)", margin: "0 0 0.4rem" }}>The Inclusion Edit</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", margin: "0 0 0.75rem", letterSpacing: "0.04em" }}>Capacity. Capability. Change.</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", margin: 0, fontStyle: "italic", marginBottom: 0 }}>Recognised as an award-winning EDI consultancy by Corporate Vision</p>
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

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", margin: 0 }}>© 2026 The Inclusion Edit. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link href="/privacy" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Privacy Policy</Link>
            </div>
          </div>

        </div>
      </footer>

      <style>{`
        .service-card { transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; }
        .service-card:hover { box-shadow: var(--shadow-md) !important; transform: translateY(-2px); border-color: var(--evergreen) !important; }
        .service-card:focus-visible { outline: 3px solid var(--evergreen); outline-offset: 2px; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .service-card { transition: none; } .service-card:hover { transform: none; } }
        @media (max-width: 900px) {
          .nav-tiles-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
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
        }
      `}</style>
    </div>
  );
}
