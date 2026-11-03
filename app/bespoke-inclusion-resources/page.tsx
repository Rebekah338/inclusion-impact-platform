import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Bespoke Inclusion Resources | The Inclusion Edit", description: "Custom-designed EDI toolkits, guides and frameworks created specifically for your organisation." };

export default function BespokeResources() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/bespoke-resources.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
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
        <section style={{ padding: "3rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(107,143,113,0.12)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>Why bespoke?</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "var(--charcoal)", lineHeight: 1.2, marginBottom: "0.875rem" }}>Built specifically for your team</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.8, opacity: 0.75 }}>
                Bespoke resources speak directly to your people; your sector, your policies, your culture. When something is made for your organisation, it lands differently.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Built around your context", detail: "Designed from the ground up for your organisation, sector and people; so it fits from the very first page." },
                { label: "Reflects your language and culture", detail: "Your policies, your tone, your brand. The resource feels like it came from inside your organisation; because it did." },
                { label: "Tied to your goals from the start", detail: "Because we build around your objectives, every element of the resource is working toward the outcomes you actually want to achieve." },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: "0.2rem", width: "20px", height: "20px", borderRadius: "50%", background: "var(--sage-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.2rem" }}>{r.label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.65, opacity: 0.72, margin: 0 }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", padding: "3.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>The process</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--white)", margin: 0 }}>How it works</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { step: "01", accent: "#4a8a5c", title: "Discovery call", body: "We start with a conversation about your organisation, your audience and what you need the resource to do. No brief required; we will help you shape it." },
                { step: "02", accent: "#4a8a5c", title: "Scope and brief", body: "We turn that conversation into a clear scope: format, length, content areas, tone and timeline. You review and confirm before any work begins." },
                { step: "03", accent: "#4a8a5c", title: "Design and review", body: "We create a draft in your brand, language and voice. You give feedback; we refine. Most resources go through two rounds of review before final sign-off." },
                { step: "04", accent: "#4a8a5c", title: "Final delivery", body: "You receive your finished resource in the agreed format; print-ready, digitally accessible, or both; ready to use straight away." },
              ].map((s) => (
                <div key={s.step} style={{ borderRadius: "12px", overflow: "hidden", background: "var(--white)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "1.6rem 1.5rem" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#2C4A31", opacity: 0.45, lineHeight: 1, marginBottom: "0.5rem" }}>{s.step}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>{s.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.8, margin: 0 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE CREATE */}
        <section style={{ padding: "2.5rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem", textAlign: "center" }}>What we create</span>
            <h2 id="what-we-create" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "1.75rem" }}>Resource types</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {[
                { title: "Inclusion Toolkits", desc: "Comprehensive, practical toolkits that give your teams everything they need to take action on inclusion; from self-assessments to step-by-step guides." },
                { title: "Policy Templates", desc: "EDI-informed policy templates tailored to your sector and legal context; ready to adapt and implement." },
                { title: "Manager Guides", desc: "Practical guides for people managers covering topics such as having inclusive conversations, supporting diverse teams, and responding to disclosures." },
                { title: "School and Education Resources", desc: "Bespoke resources for schools, MATs and education organisations; designed to embed inclusion across curriculum, culture and community." },
                { title: "Onboarding and Communication Materials", desc: "Inclusive onboarding packs, internal communication templates and staff-facing resources that reflect your commitment to EDI from day one." },
                { title: "Data and Reporting Frameworks", desc: "Frameworks to help your organisation collect, analyse and act on EDI data in a way that is ethical, meaningful and tied to measurable outcomes." },
              ].map((item) => (
                <div key={item.title} style={{ background: "var(--sage-xlight)", borderRadius: "14px", padding: "1.35rem 1.5rem", border: "1px solid rgba(74,138,92,0.15)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.65, opacity: 0.85 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <div style={{ background: "var(--white)", borderRadius: "14px", border: "2px solid rgba(74,138,92,0.35)", boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)", maxWidth: "900px", margin: "0 auto", textAlign: "center", overflow: "hidden" }}>
                <div style={{ height: "5px", background: "var(--sage-dark)" }} />
                <div style={{ padding: "1.5rem 2rem" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.4rem" }}>Need something different?</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem", lineHeight: 1.3 }}>We can create any resource your organisation needs</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", opacity: 0.7, maxWidth: "560px", margin: "0 auto 0.75rem", lineHeight: 1.65 }}>From surveys to action plan templates; we build around your brief. Tell us what you need and we will design something that works.</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)", marginBottom: "0.6rem" }}>We also create:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
                    {[
                      "Staff Surveys and Pulse Checks",
                      "EDI Action Plan Templates",
                      "Accessible Communication Guides",
                      "Recruitment and Selection Guidance",
                      "Training Pre-reads and Companion Guides",
                      "Governor and Trustee Briefings",
                      "Celebration and Awareness Day Packs",
                      "Induction and Welcome Packs",
                    ].map((label) => (
                      <span key={label} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--sage-dark)", background: "rgba(74,138,92,0.1)", border: "1px solid rgba(74,138,92,0.25)", borderRadius: "999px", padding: "0.3rem 0.85rem", whiteSpace: "nowrap" }}>{label}</span>
                    ))}
                  </div>
                  <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Commission a bespoke resource</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section style={{ position: "relative", padding: "3.5rem 1.5rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/bespoke-resources.jpg)", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,50,32,0.92) 0%, rgba(44,74,49,0.88) 60%, rgba(46,82,53,0.82) 100%)", zIndex: 1 }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem", textAlign: "center" }}>Our work</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", color: "var(--white)", textAlign: "center", marginBottom: "0.5rem" }}>Resources we have created</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", textAlign: "center", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: 1.7 }}>Bespoke resources designed and built for real organisations; each one made from scratch for their context, people and goals.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { org: "Hospice UK", tag: "Toolkit", title: "Compassionate and Inclusive Workplaces Toolkit" },
                { org: "Hospice UK", tag: "Manager Guide", title: "Identity and Inclusion Guide for Managers" },
                { org: "Black Inclusion Week", tag: "Audit Tool", title: "Black Inclusion Curriculum Audit" },
                { org: "Project Free", tag: "Curriculum Resource", title: "Windrush Curriculum Map" },
                { org: "Black Inclusion Week", tag: "Toolkit", title: "Black Inclusion Intervention Toolkit" },
                { org: "Black Inclusion Week", tag: "Guide", title: "From Allyship to Accountability: A Guide for Workplaces" },
                { org: "Network Plus", tag: "Guide", title: "Understanding Intersectionality: A Conversation Guide" },
                { org: "Project Free", tag: "Curriculum Resource", title: "Inclusive Curriculum Guidance" },
              ].map((p) => (
                <div key={p.title} style={{ background: "var(--sage-xlight)", borderRadius: "14px", padding: "1.35rem 1.5rem", border: "1px solid rgba(74,138,92,0.15)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--white)", background: "var(--sage-dark)", borderRadius: "999px", padding: "0.2rem 0.7rem" }}>{p.tag}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)", opacity: 0.75 }}>{p.org}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.4 }}>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#1A3220", padding: "2.5rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>Get started</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--white)", marginBottom: "0.75rem" }}>Commission a bespoke resource</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", maxWidth: "420px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>Tell us what you need and we will design something that works for your organisation.</p>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#1A3220", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none" }}>Get in touch</Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
