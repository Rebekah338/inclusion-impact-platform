"use client";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import Icon from "@/app/components/BrandIcon";
import HeroSideCard from "@/components/HeroSideCard";
import Footer from "../components/Footer";
import TrustStrip from "../components/TrustStrip";

export default function SubscribePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.ok) {
        setSubmitted(true);
      } else if (result.error === "invalid_email") {
        setError("Please check your email address and try again.");
      } else if (result.error === "compliance") {
        setError("This email address unsubscribed in the past, so we cannot add it again from here. Email info@theinclusionedit.com and we will add you back.");
      } else {
        setError("Something went wrong. Please try again, or email info@theinclusionedit.com and we will add you.");
      }
    } catch {
      setError("Something went wrong. Please try again, or email info@theinclusionedit.com and we will add you.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main id="main-content">
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "440px", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/newsletter 1.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "2.25rem 2rem" }}>
            <HeroSideCard kind="facts" eyebrow="Why it is worth your inbox" title="Not another inbox filler." points={["The evidence and the honest take, not just the headlines", "One focused idea, not a wall of links", "Your email is only used to send you the newsletter"]} />
          <div style={{ maxWidth: "640px" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Newsletter</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--white)", marginBottom: "1.25rem", lineHeight: 1.1 }}>Inclusion Insight Worth Making Time For: Straight to Your Inbox.</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "680px" }}>Get the inclusion thinking you need, at work and beyond it. Each month, one inclusion idea unpacked properly, with practical tips you can use straight away.</p>
            <a href="#sign-up" style={{ display: "inline-block", lineHeight: 1.4, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Sign Me Up</a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <TrustStrip items={[
            { value: "100+", label: "Subscribers and growing" },
            { value: "Free, always", label: "No paywall, ever" },
            { value: "Worldwide", label: "readers and listeners" },
            { value: "One idea", label: "each month, properly unpacked" },
            { value: "Practical", label: "Tips you can use straight away" },
          ]} />

      {/* What you get */}
      <section style={{ background: "var(--sage-xlight)", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.875rem" }}>What you will get</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.75rem", lineHeight: 1.15 }}>Everything you need to do inclusion better</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.7, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>Each edition is built around one idea, unpacked properly, with the evidence, the application and the honest take. Here is what lands in your inbox.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              {
                icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                label: "One inclusion concept, unpacked",
                detail: "Each edition we go deep on one idea: no surface-level takes, just clear, substantive thinking."
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                label: "How to apply it where you work",
                detail: "Practical steps and small, specific changes you can use the week you read it: for managers, HR professionals and EDI leads alike."
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                label: "Inclusion beyond the workplace",
                detail: "Every idea shows up outside work too. Each edition looks at what is happening in the world, and how to show up for it in your everyday life."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                label: "Honest takes on what works",
                detail: "What the evidence actually says, not what sounds good in a training room, but what creates real, lasting change."
              },
              {
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                label: "Podcast episodes and blogs",
                detail: "New content from For the Love of EDI and The Inclusion Edit blog, straight to you as soon as it goes live."
              },
              {
                icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                label: "Free resources and tools",
                detail: "Templates, guides and frameworks shared with subscribers first: practical tools you can put straight into practice."
              },
              {
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                label: "Events and opportunities",
                detail: "Webinars, workshops and ways to connect with the EDI community: subscribers hear first."
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Built for people doing the work",
                detail: "Whether you are the only EDI lead in your organisation, a manager handed inclusion, an HR professional making the case upward, or someone who simply cares about a fairer world, this is for you."
              },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", border: "2px solid rgba(44,74,49,0.22)", boxShadow: "0 4px 20px rgba(26,50,32,0.10)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(74,99,71,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dark)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.35rem", lineHeight: 1.3 }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="sign-up" style={{ background: "var(--white)", padding: "2rem 1.5rem", scrollMarginTop: "90px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <span style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--evergreen)" }}><Icon name="check" size={40} strokeWidth={2} /></span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--charcoal)", margin: "0 0 0.75rem" }}>You&apos;re signed up</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(0,0,0,0.6)", margin: 0 }}>Thank you for joining. Keep an eye on your inbox for a welcome email with a free resource to get you started. If it doesn&apos;t arrive, check your spam or promotions folder.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--charcoal)", margin: "0 0 1.75rem", textAlign: "center" }}>Sign up</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[{ label: "First name", name: "first", required: true }, { label: "Last name", name: "last", required: true }].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`sub-${f.name}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>{f.label} {f.required && <span style={{ color: "#b91c1c" }}>*</span>}</label>
                      <input id={`sub-${f.name}`} required={f.required} name={f.name} type="text" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="sub-job" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Job title</label>
                  <input id="sub-job" name="job" type="text" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label htmlFor="sub-email" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Email address <span style={{ color: "#b91c1c" }}>*</span></label>
                  <input id="sub-email" required name="email" type="email" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="sub-sector" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Sector</label>
                    <select id="sub-sector" name="sector" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                      <option value="">Please select</option>
                      <option>Corporate</option>
                      <option>Public sector</option>
                      <option>NHS / Health</option>
                      <option>Charity / Third sector</option>
                      <option>Education</option>
                      <option>Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sub-role" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>I am a...</label>
                    <select id="sub-role" name="role" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                      <option value="">Please select</option>
                      <option>EDI Lead</option>
                      <option>HR / People professional</option>
                      <option>Manager or leader</option>
                      <option>Consultant</option>
                      <option>Educator</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="sub-source" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>How did you hear about us?</label>
                  <select id="sub-source" name="source" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                    <option value="">Please select</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Podcast</option>
                    <option>A client or colleague</option>
                    <option>Event or webinar</option>
                    <option>Search</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "#1A3220", border: "none", padding: "1rem 2rem", borderRadius: "8px", cursor: sending ? "wait" : "pointer", marginTop: "0.5rem", opacity: sending ? 0.75 : 1 }} disabled={sending}>{sending ? "Signing you up..." : "Sign Me Up"}</button>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: 0, textAlign: "center", lineHeight: 1.5 }}>One email a month. Free, and you can unsubscribe at any time.</p>
                {error && <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#B42318", margin: 0, textAlign: "center", lineHeight: 1.5 }}>{error}</p>}
              </form>
            </>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
