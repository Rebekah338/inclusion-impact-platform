"use client";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/contact-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          
          {/* Logo top-right of hero */}
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Get in touch</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Good thinking starts with a conversation.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                Whether you are interested in consultancy, training, bespoke resources or the platform, we would love to hear from you. Every conversation starts with listening.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="#contact-form" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Send us a message</Link>
                <Link href="/edi-consultancy-programmes" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Explore our services</Link>
              </div>
            </div>
          </div>
        </section>

      {/* Stats strip */}
      <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
          {[
            { label: "LinkedIn", sub: "Connect with us", href: "https://www.linkedin.com/company/the-inclusion-edit" },
            { label: "Email", sub: "info@theinclusionedit.com", href: "mailto:info@theinclusionedit.com" },
            { label: "Instagram", sub: "@theinclusionedit", href: "https://www.instagram.com/theinclusionedit" },
            { label: "TikTok", sub: "@theinclusionedit", href: "https://www.tiktok.com/@theinclusionedit" },
            { label: "Podcast", sub: "Listen on Spotify", href: "https://open.spotify.com/show/theinclusionedit" },
          ].map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center", textDecoration: "none", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", letterSpacing: "0.01em", lineHeight: 1.1 }}>{item.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", letterSpacing: "0.04em", marginTop: "0.2rem", textTransform: "uppercase" }}>{item.sub}</span>
            </a>
          ))}
        </div>
      </section>

        {/* BOOK A CALL */}
        <section style={{ background: "var(--sage-xlight)", padding: "2.5rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", borderRadius: "16px", padding: "2.5rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
              {/* Left: text */}
              <div style={{ flex: "1", minWidth: "260px" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1rem" }}>Book a call</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--white)", margin: "0 0 0.75rem", lineHeight: 1.15 }}>Book a curiosity call</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: 0 }}>Have questions about our Impact Platform, consultancy, training, or bespoke resources? Book a free 30-minute call and we will help you work out the best next step for your organisation.</p>
              </div>
              {/* Right: CTA */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                <a href="https://calendly.com/theinclusionedit" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "#1A3220", background: "var(--white)", padding: "0.9rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block", whiteSpace: "nowrap" }}>Book now</a>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>Free · 30 minutes · no obligation</span>
              </div>
            </div>
          </div>
        </section>


        {/* EVENTS */}
        <section style={{ background: "#e8f0e8", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.9rem" }}>Speaking and events</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.5rem", lineHeight: 1.15 }}>Bring The Inclusion Edit to your event</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.7, maxWidth: "580px" }}>We help event organisers create moments that move people: not just tick a box. Whether you need a keynote speaker, a panel voice, an exhibition presence, or a partner to co-host, we show up with substance.</p>
            </div>

            {/* Format cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
              {[
                {
                  title: "Keynote and panel",
                  detail: "We deliver talks and sit on panels for HR teams, education leads, people managers, and senior leaders ; drawing on lived experience, research, and practical frameworks.",
                  audiences: "Businesses; charities; education; public bodies",
                },
                {
                  title: "Exhibition and partnerships",
                  detail: "We exhibit at EDI, education, and HR events, and partner with other organisations to co-create event experiences that go beyond a stand and a leaflet.",
                  audiences: "Conferences; sector summits; trade events",
                },
                {
                  title: "Online events",
                  detail: "We host and co-host webinars, virtual roundtables, and online learning events ; helping you reach audiences across geographies with focused, engaging content.",
                  audiences: "Webinars; roundtables; virtual summits",
                },
              ].map((card) => (
                <div key={card.title} style={{ background: "var(--white)", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(0,0,0,0.65)", margin: 0, lineHeight: 1.65, flexGrow: 1 }}>{card.detail}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--sage-dark)", margin: 0, textTransform: "uppercase" }}>{card.audiences}</p>
                </div>
              ))}
            </div>

            {/* CTA nudge */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(0,0,0,0.55)", margin: 0, lineHeight: 1.7 }}>
              Interested in working with us at your event?{" "}
              <a href="https://calendly.com/theinclusionedit" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", fontWeight: 600, textDecoration: "underline" }}>Book a curiosity call</a>
              {" "}or use the form below to send us the details.
            </p>

          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact-form" style={{ position: "relative", padding: "2.5rem 1.5rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/contact-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,74,46,0.88)", zIndex: 1 }} />
          <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            {/* Section header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.9rem" }}>Send a message</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--white)", margin: "0 0 0.5rem", lineHeight: 1.15 }}>Prefer to inquire via message?</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.7 }}>Fill in the form below and we will get back to you within two working days.</p>
            </div>

            {/* Two columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", alignItems: "start" }}>

              {/* Left: form */}
              {submitted ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem", gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>✓</div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--charcoal)", marginBottom: "1rem" }}>Message received</h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8 }}>Thank you for getting in touch. We will be back to you within two working days.</p>
                </div>
              ) : (
                <>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {[{ label: "First name", name: "firstName", type: "text" }, { label: "Last name", name: "lastName", type: "text" }].map((f) => (
                        <div key={f.name}>
                          <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", display: "block", marginBottom: "0.3rem" }}>{f.label}</label>
                          <input required name={f.name} type={f.type} style={{ width: "100%", padding: "0.6rem 0.875rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.13)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "rgba(255,255,255,0.85)", boxSizing: "border-box" as const }} />
                        </div>
                      ))}
                    </div>
                    {[{ label: "Email address", name: "email", type: "email" }, { label: "Organisation", name: "org", type: "text" }].map((f) => (
                      <div key={f.name}>
                        <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", display: "block", marginBottom: "0.3rem" }}>{f.label}</label>
                        <input required={f.name === "email"} name={f.name} type={f.type} style={{ width: "100%", padding: "0.6rem 0.875rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.13)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "rgba(255,255,255,0.85)", boxSizing: "border-box" as const }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", display: "block", marginBottom: "0.3rem" }}>What are you interested in?</label>
                      <select name="interest" style={{ width: "100%", padding: "0.6rem 0.875rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.13)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "rgba(255,255,255,0.85)", boxSizing: "border-box" as const }}>
                        <option value="">Please select</option>
                        <option>Inclusion Consultancy</option>
                        <option>Inclusion Training</option>
                        <option>Bespoke Inclusion Resources</option>
                        <option>Impact Platform membership</option>
                        <option>Speaking or events</option>
                        <option>Something else</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", display: "block", marginBottom: "0.3rem" }}>Tell us more</label>
                      <textarea required name="message" rows={5} style={{ width: "100%", padding: "0.6rem 0.875rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.13)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "rgba(255,255,255,0.85)", resize: "vertical", boxSizing: "border-box" as const }} />
                    </div>
                    <button type="submit" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "#1A3220", border: "none", padding: "0.875rem 2rem", borderRadius: "8px", cursor: "pointer", alignSelf: "flex-start" }}>Send message</button>
                  </form>

                  {/* Right: what happens next */}
                  <div style={{ background: "#1A3220", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--white)", margin: "0 0 1.5rem" }}>What happens next</h3>
                    {[
                      { step: "1", title: "You send your message", detail: "Fill in the form and hit send. It comes directly to Rebekah and the team." },
                      { step: "2", title: "We review your enquiry", detail: "We read every message carefully and make sure the right person picks it up." },
                      { step: "3", title: "We get back to you", detail: "You will hear from us within two working days with a helpful, considered response." },
                    ].map((item) => (
                      <div key={item.step} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1A3220", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{item.step}</div>
                        <div>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", margin: "0 0 0.25rem" }}>{item.title}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>Prefer to talk? <a href="https://calendly.com/theinclusionedit" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, textDecoration: "underline" }}>Book a curiosity call</a> instead.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{ background: "var(--sage-xlight)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>Stay connected</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)", color: "var(--charcoal)", marginBottom: "0.65rem", lineHeight: 1.2 }}>Become part of The Inclusion Edit community</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>One inclusion concept, unpacked properly; practical tips you can use straight away. The kind of thinking we bring to organisations we work with; completely free.</p>
            <Link href="/subscribe" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Sign up to the newsletter →</Link>
          </div>
        </section>

            <Footer />
    </main>
    </div>
  );
}
