"use client";
import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";

export default function SubscribePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/newsletter 1.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", padding: "0.35rem 1rem", borderRadius: "20px", marginBottom: "1.25rem" }}>Newsletter</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 2.75rem)", color: "var(--white)", margin: "0 0 1rem", lineHeight: 1.1 }}>Become part of The Inclusion Edit community</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.7 }}>Get the inclusion thinking your organisation needs, straight to your inbox. Each edition, one concept unpacked properly, with practical tips you can use straight away. The kind of thinking we bring to organisations we work with; completely free.</p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ padding: "0.6rem 1.5rem", background: "var(--sage-xlight)", borderBottom: "1px solid rgba(74,99,71,0.12)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          {[
            { label: "100+", sub: "Subscribers and growing" },
            { label: "Free, always", sub: "No paywall, ever" },
            { label: "UK · Bermuda · US", sub: "Readers worldwide" },
            { label: "One concept", sub: "Per edition; properly unpacked" },
            { label: "Practical", sub: "Tips you can use straight away" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)" }}>{item.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section style={{ background: "var(--sage-xlight)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--charcoal)", marginBottom: "1.25rem", textAlign: "center" }}>What you will get</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {[
              { emoji: "🎙️", label: "Podcast episodes", detail: "New episodes straight to your inbox as soon as they go live" },
              { emoji: "📖", label: "Blogs and insights", detail: "Practical EDI thinking you can use with your team right away" },
              { emoji: "🎁", label: "Free resources", detail: "Templates, tools and guides shared first with the community" },
              { emoji: "📅", label: "Events and opportunities", detail: "Webinars, workshops and ways to connect with the EDI community" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--white)", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>{item.emoji}</span>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>{item.label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "var(--white)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🎉</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--charcoal)", margin: "0 0 0.75rem" }}>You are signed up</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(0,0,0,0.6)", margin: 0 }}>Welcome to The Inclusion Edit community. Look out for our next update in your inbox.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--charcoal)", margin: "0 0 1.75rem", textAlign: "center" }}>Sign up</h2>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[{ label: "First name", name: "first", required: true }, { label: "Last name", name: "last", required: true }].map((f) => (
                    <div key={f.name}>
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>{f.label} {f.required && <span style={{ color: "#b91c1c" }}>*</span>}</label>
                      <input required={f.required} name={f.name} type="text" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Job title</label>
                  <input name="job" type="text" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Email address <span style={{ color: "#b91c1c" }}>*</span></label>
                  <input required name="email" type="email" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>How did you hear about us?</label>
                  <select name="source" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                    <option value="">Please select</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Podcast</option>
                    <option>Word of mouth</option>
                    <option>Google search</option>
                    <option>An event</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)", background: "#1A3220", border: "none", padding: "1rem 2rem", borderRadius: "8px", cursor: "pointer", marginTop: "0.5rem" }}>Sign up</button>
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
