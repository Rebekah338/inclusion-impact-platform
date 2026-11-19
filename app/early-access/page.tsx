"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingLink } from "@/lib/booking";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import TrustStrip from "../components/TrustStrip";

// Early access list for the Impact Platform, open until the platform launches.
// Every "Get Early Access" button on the website points here; /waitlist and /sign-up redirect here too.

const MEMBER_GETS = [
  { image: "/images/early-access/learn.jpg", number: "40", title: "lessons and 28 expert videos", desc: "Across three learning pathways, at your own pace." },
  { image: "/images/early-access/apply.jpg", number: "45", title: "practical tools", desc: "Templates, toolkits, guides and checklists you can use the same day." },
  { image: "/images/early-access/make-the-case.jpg", number: "47", title: "research reports and case studies", desc: "Evidence you can take to leadership, so you are not making the case alone." },
  { image: "/images/early-access/inclusion-ai.jpg", number: "10", title: "Inclusion AI tools", desc: "Specialist tools for policy audits, business cases, fairer hiring and more." },
  { image: "/images/early-access/get-support.jpg", number: "", title: "Office hours with an inclusion expert", desc: "A real person to check your thinking with, on selected memberships, so you are not working it out alone." },
  { image: "/images/early-access/onboarding.jpg", number: "", title: "Onboarding for new starters", desc: "Inclusion Foundations for the people you hire, so inclusion starts from day one. Included with organisation memberships." },
];

const TIERS_FOR_YOU = [
  { name: "Individual", price: "£295 a year", desc: "the full resource library, all three learning pathways, templates and progress tracking." },
  { name: "Practitioner Plus", price: "£495 a year", desc: "everything in Individual, plus the Inclusion AI tools and a full inclusion health check and action plan." },
  { name: "Expert Track", price: "£1,800 a year", desc: "everything in Practitioner Plus, plus a monthly 1:1 with Rebekah all year. Limited places." },
];

const TIERS_FOR_ORGS = [
  { name: "Growing Teams", price: "£2,950 a year", size: "50 to 250 employees", desc: "10 full seats, Inclusion AI tools, expert sessions and onboarding for up to 50 new starters a year." },
  { name: "Established Organisations", price: "£5,500 a year", size: "250 to 1,000 employees", desc: "25 full seats and everything in Growing Teams." },
  { name: "Enterprise", price: "From £8,500", size: "1,000 or more employees", desc: "built around your organisation, by custom quote." },
];

const EARLY_ACCESS_POINTS = [
  { title: "The sooner you join, the sooner you are in", desc: "We are opening in small groups of 10, in the order people join the list." },
  { title: "We email you when it is your turn", desc: "No need to keep checking back; we will tell you as soon as your access is ready." },
  { title: "Free, with no commitment", desc: "Joining the list costs nothing and you are not signing up to pay for anything." },
];

const FAQS = [
  { q: "When does the Impact Platform go live?", a: "We launch in January 2027, when our first group of 10 members is onboarded. After that, we open in small groups of 10, in the order people join the list. We will email you as soon as it is your turn." },
  { q: "Is it free to join the list?", a: "Yes. Joining the list costs nothing and there is no commitment to buy." },
  { q: "Can my organisation join?", a: "Yes. Choose your organisation's size on the form, or book a free call and we will talk through what would work for you." },
  { q: "What if I am not sure which membership is right for me?", a: "You do not need to decide now. When it is your turn, we will help you choose, or you can reply to your confirmation email with any questions." },
];

const SIZES = [
  { value: "Just me", label: "Just me" },
  { value: "2 to 50 people", label: "An organisation of 2 to 50 people" },
  { value: "51 to 250 people", label: "An organisation of 51 to 250 people" },
  { value: "250 or more people", label: "An organisation of 250 or more people" },
];

// Membership buttons on the pricing page pass ?tier= so the right size is already chosen
const TIER_SIZE: Record<string, string> = {
  individual: "Just me",
  "practitioner-plus": "Just me",
  "expert-track": "Just me",
  "growing-teams": "51 to 250 people",
  established: "250 or more people",
  enterprise: "250 or more people",
};

const label = { fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" } as const;
const field = { width: "100%", padding: "0.7rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" } as const;

export default function EarlyAccessPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [tier, setTier] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tier") || "";
    if (TIER_SIZE[t]) {
      setTier(t);
      setSize(TIER_SIZE[t]);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/early-access-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, size, tier, newsletter, website: honey }),
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
            { value: "140+", label: "Platform resources" },
            { value: "10+", label: "Inclusion AI tools" },
            { value: "Award-winning", label: "Best EDI Consultancy 2026" },
            { value: "Groups of 10", label: "Welcomed in the order they join" },
          ]} />

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
                <div key={item.title} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FFFFFF 0%, #F7FBF7 55%, #EAF3EA 100%)", border: "1px solid rgba(44,74,49,0.16)", borderRadius: "18px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 30px rgba(26,50,32,0.10)" }}>
                  <div aria-hidden="true" style={{ height: "80px", backgroundImage: `url('${item.image}')`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
                  <div style={{ padding: "0.8rem 1.15rem 0.95rem" }}>
                  <div aria-hidden="true" style={{ width: "34px", height: "3px", borderRadius: "999px", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", marginBottom: "0.5rem" }} />
                  <p style={{ position: "relative", margin: "0 0 0.3rem", lineHeight: 1.15 }}>
                    {item.number && <><span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--forest)" }}>{item.number}</span>{" "}</>}
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--pine)" }}>{item.title}</span>
                  </p>
                  <p style={{ position: "relative", fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP OPTIONS */}
        <section style={{ position: "relative", overflow: "hidden", padding: "3.5rem 1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "-12px", backgroundImage: "url('/membership-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "blur(4px)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.88)" }} />
          <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <p style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#1E3624", background: "rgba(44,74,49,0.12)", border: "1px solid rgba(44,74,49,0.2)", borderRadius: "999px", padding: "0.35rem 1rem", margin: "0 0 1rem" }}>Membership options</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--deep-pine)", margin: 0, lineHeight: 1.15 }}>A membership for wherever you are.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[
                { heading: "For you", tiers: TIERS_FOR_YOU as { name: string; price: string; size?: string; desc: string }[] },
                { heading: "For your organisation", tiers: TIERS_FOR_ORGS as { name: string; price: string; size?: string; desc: string }[] },
              ].map((group) => (
                <div key={group.heading} style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: "var(--deep-pine)", margin: "0 0 0.6rem 0.25rem" }}>{group.heading}</h3>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", overflow: "hidden", boxShadow: "0 12px 40px rgba(26,50,32,0.16)" }}>
                  <div style={{ padding: "0.35rem 1.25rem 0.4rem" }}>
                    {group.tiers.map((t, idx) => (
                      <div key={t.name} style={{ padding: "0.55rem 0", borderTop: idx === 0 ? "none" : "1px solid var(--line)" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.1rem" }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--forest)" }}>{t.name}</span>
                          <span style={{ marginLeft: "auto", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: "var(--forest)", order: 3 }}>{t.price}</span>
                          {t.size ? <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.72rem", color: "#1E3624", background: "#E3F5E2", border: "1px solid rgba(107,143,113,0.35)", borderRadius: "999px", padding: "0.1rem 0.55rem" }}>{t.size}</span> : null}
                        </div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: 0, lineHeight: 1.5 }}>{t.desc.charAt(0).toUpperCase() + t.desc.slice(1)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontStyle: "italic", color: "var(--slate)", textAlign: "center", margin: "1.4rem 0 0" }}>Prices will be confirmed when the Impact Platform goes live.</p>
          </div>
        </section>

        {/* PROOF */}
        <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #2C4A31 0%, #1E3624 50%, #142A1A 100%)", padding: "4.5rem 1.5rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: "-140px", right: "-120px", width: "420px", height: "420px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }} />
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-180px", left: "-140px", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: "760px", height: "380px", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)" }} />
          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "18px", padding: "1.75rem 1.6rem", boxShadow: "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "1.6rem", right: "1.6rem", height: "2px", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)" }} />
              <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1, color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>&ldquo;&rdquo;</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: "0 0 1.25rem", fontStyle: "italic" }}>&ldquo;Having access to their library of content has been instrumental in expanding my own awareness, so that I can feed those insights back into training sessions and team upskilling.&rdquo;</p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--white)", margin: 0 }}>Tiona Knight</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", margin: "0.2rem 0 0" }}>EDI Lead, Mentivity</p>
            </div>
            <div style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "18px", padding: "1.75rem 1.6rem", boxShadow: "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "1.6rem", right: "1.6rem", height: "2px", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)" }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "3.25rem", lineHeight: 1, color: "var(--white)", marginBottom: "0.75rem" }}>93%</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.88)", margin: "0 0 1rem", maxWidth: "220px" }}>of those who have used our resources said they were &ldquo;very helpful in developing their inclusion knowledge.&rdquo;</p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0 }}>Survey of 60+ users, February 2026</p>
            </div>
            <div style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "18px", padding: "1.75rem 1.6rem", boxShadow: "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "1.6rem", right: "1.6rem", height: "2px", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)" }} />
              <div aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "0.85rem", boxShadow: "0 0 0 6px rgba(255,255,255,0.06)" }}>🏆</div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 0.4rem" }}>Corporate Vision</p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--white)", margin: "0 0 0.4rem", lineHeight: 1.2 }}>Best EDI Consultancy</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", margin: 0 }}>HR &amp; Employment Awards 2026 · London</p>
            </div>
          </div>
        </section>

        {/* JOIN */}
        <section id="join" style={{ background: "var(--mist)", padding: "5rem 1.5rem", scrollMarginTop: "80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "3rem", alignItems: "start" }} className="early-access-split">
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--pine)", marginBottom: "0.875rem" }}>What early access means</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--deep-pine)", margin: "0 0 1.75rem", lineHeight: 1.2 }}>Join the list today. Be first in when we go live.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {EARLY_ACCESS_POINTS.map((point) => (
                  <div key={point.title} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "var(--evergreen)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", marginTop: "0.1rem" }}>✓</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: "0 0 0.2rem" }}>{point.title}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginTop: "2.25rem", padding: "1.25rem", background: "var(--white)", borderRadius: "14px", border: "1px solid var(--line)" }}>
                <img src="/email/rebekah.jpg" alt="Rebekah Hayward" width={56} height={56} style={{ width: "56px", height: "56px", borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", margin: "0 0 0.6rem", lineHeight: 1.65, fontStyle: "italic" }}>&ldquo;I built the Impact Platform for the person carrying inclusion, often alone and often on top of the day job. I have seen how much difference the right tools, clear evidence and a real person beside you can make. I can&apos;t wait to welcome you in.&rdquo;</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", margin: 0 }}>Rebekah Hayward</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)", margin: "0.15rem 0 0" }}>Founder, The Inclusion Edit</p>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--white)", borderRadius: "18px", border: "2.5px solid var(--sage)", boxShadow: "0 6px 28px rgba(42,74,48,0.12)", padding: "2rem" }}>
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
                  <div>
                    <label htmlFor="ea-size" style={label}>Who is the membership for? <span style={{ color: "#B42318" }}>*</span></label>
                    <select id="ea-size" required value={size} onChange={(e) => setSize(e.target.value)} style={field}>
                      <option value="">Please select</option>
                      {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.55, cursor: "pointer" }}>
                    <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} style={{ marginTop: "0.2rem", accentColor: "var(--evergreen)", width: "16px", height: "16px", flexShrink: 0 }} />
                    <span>Also send me The Inclusion Edit newsletter: one practical inclusion idea each month. Unsubscribe at any time.</span>
                  </label>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)} style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                  <button type="submit" disabled={status === "sending"} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "var(--evergreen)", border: "none", padding: "1rem 2rem", borderRadius: "8px", cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.75 : 1, marginTop: "0.25rem" }}>
                    {status === "sending" ? "Adding you to the list..." : "Get Early Access"}
                  </button>
                  {error && <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#B42318", margin: 0, lineHeight: 1.5 }}>{error}</p>}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate)", margin: 0, lineHeight: 1.55 }}>
                    We will only use your details to tell you about the Impact Platform{newsletter ? " and send the newsletter" : ""}. See our <Link href="/privacy" style={{ color: "var(--evergreen)", fontWeight: 600 }}>Privacy Policy</Link>.
                  </p>
                </form>
              )}
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
      </main>
      <Footer />
      <style>{`@media (max-width: 760px) { .early-access-split { grid-template-columns: 1fr !important; } } .ea-faq-card { box-shadow: 0 4px 20px rgba(26,50,32,0.10); transition: box-shadow 0.2s ease, transform 0.2s ease; } .ea-faq-card:hover { box-shadow: 0 12px 40px rgba(26,50,32,0.16); transform: translateY(-2px); }`}</style>
    </div>
  );
}
