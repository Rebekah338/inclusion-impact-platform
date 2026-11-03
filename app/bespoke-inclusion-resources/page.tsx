import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Bespoke Inclusion Resources | The Inclusion Edit", description: "Custom-designed EDI toolkits, guides and frameworks created specifically for your organisation." };

export default function BespokeResources() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }} >
  <Image src="/bespoke-resources.jpg" alt="" fill style={{{ objectFit: "cover", objectPosition: "center 40%" }}} />
</div>
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Bespoke Inclusion Resources</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Resources built for your organisation; not someone else&apos;s.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                Off-the-shelf resources rarely drive real change. We create custom toolkits, guides and frameworks designed around your people, your sector, and the outcomes you are working towards.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Commission a resource</Link>
                <Link href="#what-we-create" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>What we create</Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0" }}>
            {[
              { icon: "✏️", label: "Fully bespoke", sub: "your brand · your voice" },
              { icon: "✅", label: "Ready to use", sub: "no adaptation needed" },
              { icon: "📄", label: "Any format", sub: "digital · print · facilitated" },
              { icon: "🏫", label: "Schools to boardrooms", sub: "every context covered" },
              { icon: "💚", label: "Built with care", sub: "reviewed for accuracy" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
                <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>{s.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHY BESPOKE */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--charcoal)", marginBottom: "1.5rem" }}>Why bespoke?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Generic inclusion resources rarely drive change because they are not designed with your people, your context or your challenges in mind. A resource that reflects your organisation&apos;s language, policies and culture is far more likely to be used; and far more likely to make a difference.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8 }}>
            We design resources that are clear, practical and visually compelling. Whether you need a one-page guide or a comprehensive organisational toolkit, we work with you at every step.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: "var(--sage-xlight)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>The process</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "0.75rem" }}>How it works</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, textAlign: "center", maxWidth: "560px", margin: "0 auto 3.5rem", lineHeight: 1.7 }}>Commissioning a bespoke resource is straightforward. Here is what to expect from start to finish.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[
                { step: "01", accent: "#C9A84C", title: "Discovery call", body: "We start with a conversation about your organisation, your audience and what you need the resource to do. No brief required; we will help you shape it." },
                { step: "02", accent: "#4a8a5c", title: "Scope and brief", body: "We turn that conversation into a clear scope: format, length, content areas, tone and timeline. You review and confirm before any work begins." },
                { step: "03", accent: "#4a6080", title: "Design and review", body: "We create a draft in your brand, language and voice. You give feedback; we refine. Most resources go through two rounds of review before final sign-off." },
                { step: "04", accent: "#1A3220", title: "Final delivery", body: "You receive your finished resource in the agreed format; print-ready, digitally accessible, or both; ready to use straight away." },
              ].map((s) => (
                <div key={s.step} style={{ borderRadius: "16px", overflow: "hidden", background: "var(--white)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ height: "5px", background: s.accent }} />
                  <div style={{ padding: "2rem" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: s.accent, opacity: 0.18, lineHeight: 1, marginBottom: "0.5rem" }}>{s.step}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{s.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE CREATE */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>What we create</span>
            <h2 id="what-we-create" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "3rem" }}>Resource types</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { title: "Inclusion Toolkits", desc: "Comprehensive, practical toolkits that give your teams everything they need to take action on inclusion; from self-assessments to step-by-step guides." },
                { title: "Policy Templates", desc: "EDI-informed policy templates tailored to your sector and legal context; ready to adapt and implement." },
                { title: "Manager Guides", desc: "Practical guides for people managers covering topics such as having inclusive conversations, supporting diverse teams, and responding to disclosures." },
                { title: "School and Education Resources", desc: "Bespoke resources for schools, MATs and education organisations; designed to embed inclusion across curriculum, culture and community." },
                { title: "Onboarding and Communication Materials", desc: "Inclusive onboarding packs, internal communication templates and staff-facing resources that reflect your commitment to EDI from day one." },
                { title: "Data and Reporting Frameworks", desc: "Frameworks to help your organisation collect, analyse and act on EDI data in a way that is ethical, meaningful and tied to measurable outcomes." },
              ].map((item) => (
                <div key={item.title} style={{ background: "var(--sage-xlight)", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(74,138,92,0.15)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.85 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#1A3220", padding: "5rem 1.5rem", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>Get started</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--white)", marginBottom: "1rem" }}>Commission a bespoke resource</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>Tell us what you need and we will design something that works for your organisation.</p>
          <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#1A3220", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none" }}>Get in touch</Link>
        </section>

        <Footer />
      </main>
    </div>
  );
}
