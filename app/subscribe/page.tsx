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
        <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5.5rem 2rem 5rem" }}>
          <div style={{ maxWidth: "560px" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Newsletter</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", margin: "0 0 1.5rem", lineHeight: 1.08 }}>Inclusion insight worth making time for: straight to your inbox.</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.8, marginBottom: "2.25rem" }}>Get the inclusion thinking your organisation needs. Each edition, one concept unpacked properly, with practical tips you can use straight away. The kind of thinking we bring to organisations we work with; completely free.</p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
          {[
            { label: "100+", sub: "Subscribers and growing" },
            { label: "Free, always", sub: "No paywall, ever" },
            { label: "UK · Bermuda · US", sub: "Readers worldwide" },
            { label: "One concept", sub: "Per edition; properly unpacked" },
            { label: "Practical", sub: "Tips you can use straight away" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", letterSpacing: "0.01em", lineHeight: 1.1 }}>{item.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", letterSpacing: "0.04em", marginTop: "0.2rem", textTransform: "uppercase" }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section style={{ background: "var(--sage-xlight)", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.875rem" }}>What you will get</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.75rem", lineHeight: 1.15 }}>Everything you need to do inclusion better</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.7, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>Each edition is built around one idea; unpacked properly, with the evidence, the application and the honest take. Here is what lands in your inbox.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              {
                icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                label: "One inclusion concept, unpacked",
                detail: "Each edition we go deep on one idea; no surface-level takes, no jargon. Just clear, substantive thinking."
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                label: "How to apply it in your organisation",
                detail: "Practical steps you can actually use the week you read it; not theory, but action."
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                label: "Tips to shift your culture",
                detail: "Small, specific changes that move the needle on inclusion; for managers, HR professionals and EDI leads alike."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                label: "Honest takes on what works",
                detail: "What the evidence actually says; not what sounds good in a training room, but what creates real, lasting change."
              },
              {
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                label: "Podcast episodes and blogs",
                detail: "New content from For the Love of EDI and The Inclusion Edit blog; straight to you as soon as it goes live."
              },
              {
                icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                label: "Free resources and tools",
                detail: "Templates, guides and frameworks shared first with subscribers; practical tools you can put straight into practice."
              },
              {
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                label: "Events and opportunities",
                detail: "Webinars, workshops and ways to connect with the EDI community; subscriber access before anyone else."
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Built for people doing the work",
                detail: "Whether you are a lone EDI lead, a manager handed inclusion, or an HR professional seeking buy-in; this is for you."
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
      <section style={{ background: "var(--white)", padding: "2rem 1.5rem" }}>
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
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[{ label: "First name", name: "first", required: true }, { label: "Last name", name: "last", required: true }].map((f) => (
                    <div key={f.name}>
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>{f.label} {f.required && <span style={{ color: "#b91c1c" }}>*</span>}</label>
                      <input required={f.required} name={f.name} type="text" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Job title</label>
                  <input name="job" type="text" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Email address <span style={{ color: "#b91c1c" }}>*</span></label>
                  <input required name="email" type="email" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>Sector</label>
                    <select name="sector" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                      <option value="">Please select</option>
                      <option>Education</option>
                      <option>NHS / Health</option>
                      <option>Corporate</option>
                      <option>Charity / Third sector</option>
                      <option>Public sector</option>
                      <option>Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>I am a...</label>
                    <select name="role" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
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
                  <label style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--charcoal)", display: "block", marginBottom: "0.4rem" }}>How did you hear about us?</label>
                  <select name="source" style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid rgba(0,0,0,0.15)", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" as const }}>
                    <option value="">Please select</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Podcast</option>
                    <option>Word of mouth</option>
                    <option>Google search</option>
                    <option>AI search (ChatGPT, Claude, etc.)</option>
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
