"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingLink } from "@/lib/booking";
import SiteNav from "@/components/SiteNav";
import HeroSideCard from "@/components/HeroSideCard";
import Footer from "../components/Footer";
import TrustStrip from "../components/TrustStrip";
import PlatformPreview from "@/components/PlatformPreview";
import Icon from "@/app/components/BrandIcon";

// Early access list for the Impact Platform, open until the platform launches.
// Every "Get Early Access" button on the website points here; /waitlist and /sign-up redirect here too.

const MEMBER_GETS = [
  { area: "learn", image: "/images/early-access/learn.jpg", number: "40", title: "lessons and 28 expert videos", desc: "Across three learning pathways, at your own pace." },
  { area: "apply", image: "/images/early-access/apply.jpg", number: "45", title: "practical tools", desc: "Templates, toolkits, guides and checklists you can use the same day." },
  { area: "case", image: "/images/early-access/make-the-case.jpg", number: "47", title: "research reports and case studies", desc: "Evidence you can take to leadership, so you are not making the case alone." },
  { area: "ai", image: "/images/early-access/inclusion-ai.jpg", number: "10", title: "Inclusion AI tools", desc: "Specialist tools for policy audits, business cases, fairer hiring and more." },
  { area: "support", image: "/images/early-access/get-support.jpg", number: "", title: "Office hours with an inclusion expert", desc: "A real person to check your thinking with: office hours on organisation memberships, and a monthly 1:1 with Rebekah on the Expert Track." },
  { area: "onboarding", image: "/images/early-access/onboarding.jpg", number: "", title: "Onboarding for new starters", desc: "Inclusion Foundations for the people you hire, so inclusion starts from day one. Included with organisation memberships." },
];

const TIERS_FOR_YOU = [
  { id: "individual", name: "Individual", price: "£345 a year", desc: "the full resource library, all three learning pathways, templates and progress tracking." },
  { id: "practitioner-plus", name: "Practitioner Plus", price: "£495 a year", desc: "everything in Individual, plus the Inclusion AI tools and a full inclusion health check and action plan." },
  { id: "expert-track", name: "Expert Track", price: "£1,800 a year", desc: "everything in Practitioner Plus, plus a monthly 1:1 with Rebekah all year. Limited places." },
];

const TIERS_FOR_ORGS = [
  { id: "small-teams", name: "Small Teams", price: "£1,750 a year", size: "5 full seats", desc: "everything in Practitioner Plus for 5 users, office hours with an inclusion expert and onboarding for up to 25 new starters a year." },
  { id: "growing-teams", name: "Growing Teams", price: "£2,950 a year", size: "10 full seats", desc: "everything in Small Teams for 10 users, with onboarding for up to 50 new starters a year." },
  { id: "established", name: "Established Teams", price: "£5,500 a year", size: "25 full seats", desc: "everything in Growing Teams for 25 users, with onboarding for up to 200 new starters a year." },
  { id: "enterprise", name: "Enterprise", price: "From £8,500", size: "50 or more full seats", desc: "everything in Established Teams for 50 or more users, built around your organisation, with unlimited new starter onboarding." },
];

const EARLY_ACCESS_POINTS = [
  { title: "The sooner you join, the sooner you are in", desc: "We are opening in small groups of 10, in the order people join the list." },
  { title: "We email you when it is your turn", desc: "No need to keep checking back; we will tell you as soon as your access is ready." },
  { title: "Free, with no commitment", desc: "Joining the list costs nothing and you are not signing up to pay for anything." },
];

const FAQS = [
  { q: "When does the Impact Platform go live?", a: "We launch in January 2027, when our first group of 10 members is onboarded. After that, we open in small groups of 10, in the order people join the list. We will email you as soon as it is your turn." },
  { q: "Is it free to join the list?", a: "Yes. Joining the list costs nothing and there is no commitment to buy." },
  { q: "Can my organisation join?", a: "Yes. Choose the number of seats on the form, or book a free call and we will talk through what would work for you." },
  { q: "What if I am not sure which membership is right for me?", a: "You do not need to decide now. When it is your turn, we will help you choose, or you can reply to your confirmation email with any questions." },
];

// One question: which membership are they interested in? Grouped so every answer also says individual or organisation
const CHOICES = [
  { group: "For me", who: "Just me", options: [
    { id: "individual", label: "Individual" },
    { id: "practitioner-plus", label: "Practitioner Plus" },
    { id: "expert-track", label: "Expert Track" },
    { id: "me-unsure", label: "Not sure yet" },
  ] },
  { group: "For my organisation", who: "My organisation", options: [
    { id: "small-teams", label: "5 seats" },
    { id: "growing-teams", label: "10 seats" },
    { id: "established", label: "25 seats" },
    { id: "enterprise", label: "50+ seats" },
    { id: "org-unsure", label: "Not sure yet" },
  ] },
];
const WHO: Record<string, string> = Object.fromEntries(CHOICES.flatMap((g) => g.options.map((o) => [o.id, g.who])));

const label = { fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" } as const;
const field = { width: "100%", padding: "0.7rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" } as const;

export default function EarlyAccessPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    // Membership buttons on the pricing pages pass ?tier= so their choice is already selected
    const t = new URLSearchParams(window.location.search).get("tier") || "";
    if (WHO[t]) setTier(t);
  }, []);

  // From the membership comparison: select that option, then take them back to the form
  function chooseFromCompare(id: string) {
    setTier(id);
    document.getElementById("ea-interest")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      const r = document.querySelector<HTMLInputElement>(`input[name="ea-interest"][value="${id}"]`);
      r?.focus({ preventScroll: true });
    }, 450);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/early-access-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, size: WHO[tier] || "", tier, newsletter, website: honey }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.ok) {
        setStatus("done");
        return;
      }
      setError(
        result.error === "invalid_email"
          ? "Please check your email address and try again."
          : result.error === "busy"
          ? "We have had a lot of sign ups today. Please try again tomorrow, or email info@theinclusionedit.com and we will add you."
          : "Something went wrong. Please try again, or email info@theinclusionedit.com and we will add you."
      );
    } catch {
      setError("Something went wrong. Please try again, or email info@theinclusionedit.com and we will add you.");
    }
    setStatus("idle");
  }

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main id="main-content">
        {/* HERO */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "560px", display: "flex", alignItems: "center" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/early-access-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "4.5rem 2rem 4rem" }}>
            <HeroSideCard kind="facts" eyebrow="Who it is for" title="This is for you if…" points={["You are carrying inclusion largely on your own", "You need evidence you can take to your leaders", "You have little time and even less budget"]} />
            <div style={{ maxWidth: "600px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem", backdropFilter: "blur(4px)" }}>Impact Platform: early access</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", color: "var(--white)", marginBottom: "1.25rem", lineHeight: 1.08 }}>
                Be first to join the <span style={{ color: "var(--hero-mint)" }}>Impact Platform.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Practical tools, evidence to take to your leaders and a real person beside you, so you are not carrying inclusion alone. We&apos;re welcoming members in small groups, in the order they join the list. Secure your place now and be one of the first inside.
              </p>
              <a href="#join" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--evergreen)", background: "var(--white)", padding: "0.9rem 1.9rem", borderRadius: "8px", textDecoration: "none" }}>Get Early Access</a>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", margin: "1rem 0 0" }}>Plus a free Inclusion Maturity Framework when you join the early access list.</p>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <TrustStrip items={[
            { value: "160", label: "Platform resources" },
            { value: "10", label: "Inclusion AI tools" },
            { value: "Award-winning", label: "Best EDI Consultancy 2026" },
            { value: "Groups of 10", label: "Welcomed in the order they join" },
          ]} />

        {/* JOIN */}
        <section id="join" style={{ background: "var(--mist)", padding: "5rem 1.5rem", scrollMarginTop: "80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "3rem", alignItems: "stretch" }} className="early-access-split">
            <div className="ea-left" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "var(--white)", borderRadius: "18px", border: "1.5px solid rgba(107,143,113,0.35)", boxShadow: "0 6px 28px rgba(42,74,48,0.12)", padding: "1.5rem", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                <span style={{ alignSelf: "flex-start", display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A5200", background: "rgba(201,168,76,0.14)", border: "1px solid rgba(201,168,76,0.45)", borderRadius: "999px", padding: "0.3rem 0.8rem", marginBottom: "1rem" }}>Free when you join</span>
                <img src="/images/early-access/maturity-framework-cover.jpg" alt="The Inclusion Maturity Framework, a free self-assessment from The Inclusion Edit: find out where your organisation sits today, from Unaware to Leading" width={1051} height={514} style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px", boxShadow: "0 6px 20px rgba(26,50,32,0.18)" }} />
                <div style={{ paddingTop: "1.25rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: "var(--forest)", margin: "0 0 0.5rem", lineHeight: 1.25 }}>The Inclusion Maturity Framework</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--slate)", margin: "0 0 0.85rem", lineHeight: 1.6 }}>A six page self-assessment, sent to your inbox the moment you join.</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      "See where your organisation sits today, from Unaware to Leading",
                      "Covers six areas: leadership, data, policy and process, culture, learning, and your impact beyond your own workforce",
                      "Leave with prioritised next steps to take to your leaders",
                      "About 45 minutes, and you can fill it in on screen",
                    ].map((t) => (
                      <li key={t} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.5 }}>
                        <span aria-hidden="true" style={{ color: "var(--evergreen)", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figure className="ea-founder" style={{ flex: 1, margin: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.8rem", background: "var(--white)", borderRadius: "18px", border: "1.5px solid rgba(107,143,113,0.35)", borderLeft: "4px solid var(--evergreen)", boxShadow: "0 6px 28px rgba(42,74,48,0.12)", padding: "1.15rem 1.35rem" }}>
                <blockquote style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>&ldquo;I built the Impact Platform for the person carrying inclusion, often alone and often on top of the day job. I have seen how much difference the right tools, clear evidence and a real person beside you can make. I can&apos;t wait to welcome you in.&rdquo;</blockquote>
                <figcaption style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
                  <img src="/email/rebekah.jpg" alt="" width={44} height={44} style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
                  <span>
                    <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--forest)" }}>Rebekah Hayward</span>
                    <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)" }}>Founder, The Inclusion Edit</span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="ea-formcard" style={{ background: "var(--white)", borderRadius: "18px", border: "2.5px solid var(--sage)", boxShadow: "0 6px 28px rgba(42,74,48,0.12)", padding: "2rem" }}>
              {status === "done" ? (
                <div role="status" style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
                  <span aria-hidden="true" style={{ display: "inline-flex", width: "52px", height: "52px", borderRadius: "50%", background: "var(--evergreen)", color: "var(--white)", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>✓</span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--charcoal)", margin: "0 0 0.75rem" }}>You&apos;re on the list.</h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--slate)", margin: 0, lineHeight: 1.7 }}>Check your inbox for a confirmation from us. If it has not arrived in a few minutes, look in your spam or promotions folder.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--charcoal)", margin: 0 }}>Join the early access list</h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--slate)", margin: "0 0 0.25rem", lineHeight: 1.6 }}>Join today and get the free Inclusion Maturity Framework straight away: see where your organisation is now and what to focus on next.</p>
                  <div>
                    <label htmlFor="ea-first" style={label}>First name <span style={{ color: "#B42318" }}>*</span></label>
                    <input id="ea-first" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={field} />
                  </div>
                  <div>
                    <label htmlFor="ea-email" style={label}>Email address <span style={{ color: "#B42318" }}>*</span></label>
                    <input id="ea-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
                  </div>
                  <fieldset id="ea-interest" style={{ border: "none", padding: 0, margin: 0, scrollMarginTop: "100px" }}>
                    <legend style={{ ...label, padding: 0 }}>Which membership are you interested in? <span style={{ color: "#B42318" }}>*</span></legend>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: "0 0 0.2rem", lineHeight: 1.5 }}>Not sure which is right? <a href="#memberships" style={{ color: "var(--evergreen)", fontWeight: 700 }}>Compare the memberships</a></p>
                    {CHOICES.map((g) => (
                      <div key={g.group} style={{ marginTop: "0.55rem" }}>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", margin: "0 0 0.4rem" }}>{g.group}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                          {g.options.map((o) => {
                            const on = tier === o.id;
                            return (
                              <label key={o.id} className="ea-chip" style={{ position: "relative", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", padding: "0.5rem 0.85rem", borderRadius: "999px", border: on ? "2px solid var(--evergreen)" : "1.5px solid rgba(0,0,0,0.18)", background: on ? "var(--pale-sage, #E3F5E2)" : "var(--white)", color: on ? "var(--evergreen)" : "var(--charcoal)", lineHeight: 1.2 }}>
                                <input type="radio" name="ea-interest" value={o.id} checked={on} onChange={() => setTier(o.id)} required style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} />
                                {on && <span aria-hidden="true" style={{ marginRight: "0.3rem" }}>&#10003;</span>}{o.label}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <style>{`.ea-chip:focus-within { outline: 3px solid var(--evergreen); outline-offset: 2px; }`}</style>
                  </fieldset>
                  <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.55, cursor: "pointer" }}>
                    <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} style={{ marginTop: "0.2rem", accentColor: "var(--evergreen)", width: "16px", height: "16px", flexShrink: 0 }} />
                    <span>Also send me The Inclusion Edit newsletter: one practical inclusion idea each month. Unsubscribe at any time.</span>
                  </label>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)} style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                  <button type="submit" disabled={status === "sending"} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "var(--evergreen)", border: "none", padding: "1rem 2rem", borderRadius: "8px", cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.75 : 1, marginTop: "0.25rem" }}>
                    {status === "sending" ? "Adding you to the list..." : "Get Early Access"}
                  </button>
                  <p style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: "-0.1rem 0 0", lineHeight: 1.45 }}><span aria-hidden="true" style={{ color: "var(--evergreen)", fontWeight: 700 }}>&#10003;</span><span><strong style={{ color: "var(--forest)" }}>93%</strong> of people who have used our resources found them very helpful.</span></p>
                  {error && <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#B42318", margin: 0, lineHeight: 1.5 }}>{error}</p>}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", margin: 0, lineHeight: 1.55 }}>
                    We will only use your details to tell you about the Impact Platform{newsletter ? " and send the newsletter" : ""}. See our <Link href="/privacy" style={{ color: "var(--evergreen)", fontWeight: 600 }}>Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div style={{ maxWidth: "1000px", margin: "3.5rem auto 0" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--pine)", marginBottom: "0.75rem", textAlign: "center" }}>What early access means</p>
            
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--deep-pine)", margin: "0 auto 2rem", textAlign: "center", lineHeight: 1.2 }}>Join the list today. Be first in when we go live.</h2>
            <div className="ea-points" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                {EARLY_ACCESS_POINTS.map((point) => (
                  <div key={point.title} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "14px", padding: "1.25rem" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "var(--evergreen)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", marginTop: "0.1rem" }}>✓</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: "0 0 0.2rem" }}>{point.title}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <style>{`@media (max-width: 820px) { .ea-points { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* PROOF */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 100%)", padding: "2.25rem 1.5rem 2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <p style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--white)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", margin: "0 0 0.7rem" }}>In their own words</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.35rem, 2.6vw, 1.75rem)", color: "var(--white)", margin: 0, lineHeight: 1.2 }}>What people say about our resources.</h2>
          </div>
          <div className="ea-proof" style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.35fr 1.35fr 1fr", gap: "1rem", alignItems: "stretch" }}>
            <figure style={{ margin: 0, background: "var(--white)", border: "1px solid rgba(107,143,113,0.28)", borderRadius: "14px", boxShadow: "0 8px 26px rgba(0,0,0,0.25)", padding: "1.1rem 1.25rem" }}>
              <blockquote style={{ margin: "0 0 0.6rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--charcoal)", fontStyle: "italic" }}>&ldquo;Having access to their library of content has been instrumental in expanding my own awareness, so that I can feed those insights back into training sessions and team upskilling.&rdquo;</blockquote>
              <figcaption style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--forest)" }}>Tiona Knight <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "var(--slate)" }}>EDI Lead, Mentivity</span></figcaption>
            </figure>
            <figure style={{ margin: 0, background: "var(--white)", border: "1px solid rgba(107,143,113,0.28)", borderRadius: "14px", boxShadow: "0 8px 26px rgba(0,0,0,0.25)", padding: "1.1rem 1.25rem" }}>
              <blockquote style={{ margin: "0 0 0.6rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--charcoal)", fontStyle: "italic" }}>&ldquo;I personally found the online materials on The Inclusion Edit&rsquo;s website helpful when creating ArtsEd resources and training programmes for both students and staff.&rdquo;</blockquote>
              <figcaption style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--forest)" }}>Adlyn Walton <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "var(--slate)" }}>Diversity, Equity, Inclusion and Belonging Partner, ArtsEd</span></figcaption>
            </figure>
            <div style={{ background: "var(--white)", border: "1px solid rgba(107,143,113,0.28)", borderRadius: "14px", boxShadow: "0 8px 26px rgba(0,0,0,0.25)", padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.1rem", lineHeight: 1, color: "var(--forest)", margin: "0 0 0.35rem" }}>93%</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.5, color: "var(--charcoal)", margin: "0 0 0.4rem" }}>of people who have used our resources found them very helpful.</p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", margin: 0 }}>Survey of 60+ users, February 2026</p>
            </div>
          </div>
          <style>{`@media (max-width: 860px) { .ea-proof { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* MEMBERSHIP OPTIONS */}
        <section id="memberships" style={{ scrollMarginTop: "80px", position: "relative", overflow: "hidden", padding: "3.5rem 1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "-12px", backgroundImage: "url('/membership-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "blur(4px)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.88)" }} />
          <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <p style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#1E3624", background: "rgba(44,74,49,0.12)", border: "1px solid rgba(44,74,49,0.2)", borderRadius: "999px", padding: "0.35rem 1rem", margin: "0 0 1rem" }}>Membership options</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--deep-pine)", margin: 0, lineHeight: 1.15 }}>A membership for wherever you are.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", margin: "0.6rem 0 0" }}>Tap a membership to choose it for your early access form.</p>
              <style>{`.ea-row:hover { background: rgba(227,245,226,0.6) !important; border-radius: 10px; } .ea-row:focus-visible { outline: 3px solid var(--evergreen); outline-offset: 2px; border-radius: 10px; }`}</style>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[
                { heading: "For you", tiers: TIERS_FOR_YOU as { id: string; name: string; price: string; size?: string; desc: string }[] },
                { heading: "For your organisation", tiers: TIERS_FOR_ORGS as { id: string; name: string; price: string; size?: string; desc: string }[] },
              ].map((group) => (
                <div key={group.heading} style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: "var(--deep-pine)", margin: "0 0 0.6rem 0.25rem" }}>{group.heading}</h3>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", overflow: "hidden", boxShadow: "0 12px 40px rgba(26,50,32,0.16)" }}>
                  <div style={{ padding: "0.35rem 1.25rem 0.4rem" }}>
                    {group.tiers.map((t, idx) => (
                      <button key={t.name} type="button" className="ea-row" onClick={() => chooseFromCompare(t.id)} aria-pressed={tier === t.id} aria-label={`${t.name}, ${t.price}. ${t.desc} Choose this membership and go back to the form.`} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", width: "100%", textAlign: "left", cursor: "pointer", font: "inherit", padding: "0.6rem 0.6rem", margin: "0 -0.6rem", boxSizing: "content-box", border: "none", borderTop: idx === 0 ? "none" : "1px solid var(--line)", borderRadius: tier === t.id ? "10px" : 0, background: tier === t.id ? "var(--pale-sage, #E3F5E2)" : "transparent" }}>
                        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: "0.1rem", width: "20px", height: "20px", borderRadius: "50%", boxSizing: "border-box", border: "2px solid var(--evergreen)", background: tier === t.id ? "var(--evergreen)" : "var(--white)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>{tier === t.id ? "\u2713" : ""}</span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.1rem" }}>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--forest)" }}>{t.name}</span>
                            <span style={{ marginLeft: "auto", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: "var(--forest)" }}>{t.price}</span>
                          </span>
                          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", lineHeight: 1.5 }}>{t.desc.charAt(0).toUpperCase() + t.desc.slice(1)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--slate)", textAlign: "center", margin: "1.4rem 0 0" }}>These are our launch prices. Join early access and your price stays the same for your first two renewals.</p>
          </div>
        </section>

        {/* WHAT MEMBERS GET */}
        <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", padding: "3.75rem 1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "720px", height: "420px", background: "radial-gradient(ellipse at center, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--pine)", marginBottom: "0.75rem" }}>Inside the Impact Platform</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--deep-pine)", margin: "0 0 0.6rem", lineHeight: 1.15 }}>Everything you need to move inclusion forward.</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--slate)", margin: "0 auto", lineHeight: 1.65, maxWidth: "580px" }}>Built for the person carrying inclusion, so you get time back, clear next steps and a case you can take upward.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.9rem" }}>
              {MEMBER_GETS.map((item) => (
                <button type="button" key={item.title} onClick={() => setPreview(item.area)} aria-label={`Preview ${item.number ? item.number + " " : ""}${item.title}`} className="ea-get" style={{ display: "block", width: "100%", padding: 0, font: "inherit", textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FFFFFF 0%, #F7FBF7 55%, #EAF3EA 100%)", border: "1px solid rgba(44,74,49,0.16)", borderRadius: "18px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 30px rgba(26,50,32,0.10)" }}>
                  <div aria-hidden="true" style={{ height: "80px", backgroundImage: `url('${item.image}')`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
                  <div style={{ padding: "0.8rem 1.15rem 0.95rem" }}>
                  <div aria-hidden="true" style={{ width: "34px", height: "3px", borderRadius: "999px", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", marginBottom: "0.5rem" }} />
                  <p style={{ position: "relative", margin: "0 0 0.3rem", lineHeight: 1.15 }}>
                    {item.number && <><span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--forest)" }}>{item.number}</span>{" "}</>}
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--pine)" }}>{item.title}</span>
                  </p>
                  <p style={{ position: "relative", fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", margin: "0 0 0.45rem", lineHeight: 1.5 }}>{item.desc}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.74rem", color: "var(--evergreen)" }}><Icon name="eye" size={14} /> Preview</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--white)", padding: "4.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--evergreen)", margin: "0 0 0.6rem", textAlign: "center" }}>Before you join</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)", color: "var(--deep-pine)", margin: "0 0 2rem", textAlign: "center" }}>Questions you might have</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "1.25rem" }}>
              {FAQS.map((f) => (
                <div key={f.q} className="ea-faq-card" style={{ background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", borderRadius: "18px", border: "1.5px solid rgba(107,143,113,0.35)", padding: "1.5rem 1.6rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div aria-hidden="true" style={{ flexShrink: 0, width: "34px", height: "34px", borderRadius: "50%", background: "var(--evergreen)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", boxShadow: "0 0 0 5px rgba(107,143,113,0.15)" }}>?</div>
                  <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>{f.q}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--slate)", margin: 0, lineHeight: 1.65 }}>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR LEADERS */}
        <section style={{ background: "var(--mist)", padding: "4.5rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", background: "linear-gradient(160deg, #1A3220 0%, #1E3624 100%)", borderRadius: "18px", padding: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>For leaders and decision makers</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--white)", marginBottom: "1rem", lineHeight: 1.2 }}>Thinking about membership for your whole organisation?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.975rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)", maxWidth: "680px", marginBottom: "1.75rem" }}>
              Organisation memberships give the people leading inclusion the tools, evidence and expert support to make progress you can report on. New starters also get Inclusion Foundations onboarding, so inclusion is part of joining your organisation from day one. Book a free call and we will talk through what would work for your organisation.
            </p>
            <a href={bookingLink("An organisation membership")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", background: "var(--white)", color: "var(--forest)" }}>Book a Call to Discuss Your Organisation<span className="a11y-sr"> (opens in a new tab)</span></a>
          </div>
        </section>
        <PlatformPreview area={preview} onClose={() => setPreview(null)} />
        <style>{`.ea-get { transition: transform 0.15s ease; } .ea-get:hover { transform: translateY(-2px); } .ea-get:focus-visible { outline: 3px solid var(--evergreen); outline-offset: 3px; }`}</style>
      </main>
      <Footer />
      <style>{`@media (max-width: 760px) { .early-access-split { grid-template-columns: 1fr !important; gap: 1rem !important; } .ea-left { display: contents !important; } .ea-formcard { order: 2; } .ea-founder { order: 3; } } .ea-faq-card { box-shadow: 0 4px 20px rgba(26,50,32,0.10); transition: box-shadow 0.2s ease, transform 0.2s ease; } .ea-faq-card:hover { box-shadow: 0 12px 40px rgba(26,50,32,0.16); transform: translateY(-2px); }`}</style>
    </div>
  );
}
