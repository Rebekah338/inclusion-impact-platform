import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "The Inclusion Business Case | The Inclusion Edit", description: "The evidence-based case for equity, diversity and inclusion as a strategic and commercial imperative for every organisation." };

export default function InclusionBusinessCase() {
  const pillars = [
    { icon: "📈", title: "Performance and innovation", body: "Diverse teams consistently outperform homogeneous ones on complex problem-solving and creative tasks. McKinsey research shows companies in the top quartile for ethnic diversity are 36% more likely to achieve above-average profitability." },
    { icon: "🎯", title: "Talent attraction and retention", body: "Candidates increasingly choose employers based on their EDI track record. Organisations that cannot demonstrate genuine commitment to inclusion face a shrinking talent pool and higher attrition costs." },
    { icon: "⚖️", title: "Legal and reputational risk", body: "The Equality Act 2010 places clear legal duties on organisations. Beyond compliance, reputational damage from inclusion failures can be significant and lasting; particularly in an era of heightened public scrutiny." },
    { icon: "🤝", title: "Employee wellbeing and engagement", body: "Inclusion is a direct driver of psychological safety, engagement and wellbeing at work. Employees who feel included are more productive, more loyal and more likely to recommend their employer." },
    { icon: "🏫", title: "Community and social impact", body: "For schools, charities and public sector bodies, inclusion is also a social responsibility. Organisations that reflect and serve their communities build deeper trust and wider impact." },
    { icon: "🌍", title: "ESG and stakeholder expectations", body: "Investors, funders and commissioners increasingly require evidence of EDI commitment as part of ESG frameworks. The business case is no longer optional; it is expected." },
  ];

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
      <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }} >
  <Image src="/hero-business-case.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
</div>
          
          {/* Logo top-right of hero */}
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Why inclusion matters</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Inclusion is not a nice-to-have. It is a business imperative.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                The evidence is clear: organisations that invest in genuine equity, diversity and inclusion perform better on every measure that matters; from profitability and retention to wellbeing and trust.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Talk to us</Link>
                <Link href="#the-evidence" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>See the evidence</Link>
              </div>
            </div>
          </div>
        </section>

      {/* Stats strip */}
      <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>📊</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>The evidence</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>is clear</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>💼</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Retention</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>inclusion reduces turnover</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>💡</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Innovation</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>diverse teams outperform</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>👁</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Reputation</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>clients and talent are watching</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>⚖️</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Legal duty</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>it's not optional</span>
          </div>
        </div>
      </section>

        <section id="the-evidence" style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem", textAlign: "center" }}>The evidence</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", marginBottom: "1rem", textAlign: "center" }}>Six reasons inclusion makes business sense.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.75, maxWidth: "600px", margin: "0 auto 3rem", textAlign: "center", opacity: 0.75 }}>From commercial performance to legal risk, the case for inclusion spans every part of an organisation.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: "16px", padding: "1.75rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "var(--sage-xlight)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", marginBottom: "1.25rem" }}>The question is not whether to invest in inclusion.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8, marginBottom: "0.75rem", opacity: 0.85 }}>The question is whether your investment is driving real change; or staying at the surface.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8, opacity: 0.85 }}>We help organisations move from intention to impact: with honest assessment, a clear strategy and the support to see it through.</p>
          </div>
        </section>

        <section style={{ padding: "5rem 1.5rem", maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)", marginBottom: "2.5rem", textAlign: "center" }}>Ready to build the case internally?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              { title: "EDI Consultancy", desc: "A full strategic engagement to assess where you are and build a plan that creates lasting change.", href: "/edi-consultancy-programmes" },
              { title: "EDI Training", desc: "Programmes that equip your people; from senior leaders to all-staff; to understand and embed inclusion.", href: "/edi-training" },
              { title: "Bespoke Resources", desc: "Materials built for your organisation: toolkits, guides, frameworks and more.", href: "/bespoke-inclusion-resources" },
              { title: "The Impact Platform", desc: "Structured digital learning for individuals and teams who want to go deeper on inclusion.", href: "/about-our-impact-platform" },
            ].map((item) => (
              <Link key={item.title} href={item.href} style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: "16px", padding: "1.75rem", textDecoration: "none", display: "block" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.6rem" }}>{item.title} →</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--charcoal)", padding: "4rem 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--white)", marginBottom: "1rem" }}>Let us help you build the case.</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.8)", maxWidth: "460px", margin: "0 auto 2rem" }}>Whether you are starting from scratch or strengthening an existing approach; we are here to help.</p>
          <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", background: "var(--white)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none" }}>Get in touch</Link>
        </section>
            <Footer />
    </main>
    </div>
  );
}
