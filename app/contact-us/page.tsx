"use client";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
      <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }} >
  <Image src="/hero-contact.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
</div>
          
          {/* Logo top-right of hero */}
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Get in touch</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Let us talk.
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
            { icon: "in", label: "LinkedIn", sub: "Connect with us", href: "https://www.linkedin.com/company/the-inclusion-edit" },
            { icon: "✉", label: "Email", sub: "hello@theinclusionedit.com", href: "mailto:hello@theinclusionedit.com" },
            { icon: "📸", label: "Instagram", sub: "@theinclusionedit", href: "https://www.instagram.com/theinclusionedit" },
            { icon: "♪", label: "TikTok", sub: "@theinclusionedit", href: "https://www.tiktok.com/@theinclusionedit" },
            { icon: "🎙", label: "Podcast", sub: "Listen on Spotify", href: "https://open.spotify.com/show/theinclusionedit" },
          ].map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center", textDecoration: "none", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.15rem", color: "var(--sage-dark)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>{item.icon} {item.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", letterSpacing: "0.04em", marginTop: "0.2rem", textTransform: "uppercase" }}>{item.sub}</span>
            </a>
          ))}
        </div>
      </section>

        <section id="contact-form" style={{ padding: "5rem 1.5rem", maxWidth: "640px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>✓</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--charcoal)", marginBottom: "1rem" }}>Message received</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8 }}>Thank you for getting in touch. We will be back to you within two working days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[{ label: "First name", name: "firstName", type: "text" }, { label: "Last name", name: "lastName", type: "text" }].map((f) => (
                  <div key={f.name}>
                    <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                    <input required name={f.name} type={f.type} style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", boxSizing: "border-box" as const }} />
                  </div>
                ))}
              </div>
              {[{ label: "Email address", name: "email", type: "email" }, { label: "Organisation", name: "org", type: "text" }].map((f) => (
                <div key={f.name}>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                  <input required={f.name === "email"} name={f.name} type={f.type} style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", boxSizing: "border-box" as const }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", display: "block", marginBottom: "0.5rem" }}>What are you interested in?</label>
                <select name="interest" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", boxSizing: "border-box" as const }}>
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
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--charcoal)", display: "block", marginBottom: "0.5rem" }}>Tell us more</label>
                <textarea required name="message" rows={5} style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--white)", resize: "vertical", boxSizing: "border-box" as const }} />
              </div>
              <button type="submit" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", border: "none", padding: "0.875rem 2rem", borderRadius: "8px", cursor: "pointer" }}>Send message</button>
            </form>
          )}
        </section>
            <Footer />
    </main>
    </div>
  );
}
