import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "The Inclusion Business Case | The Inclusion Edit", description: "The evidence-based case for equity, diversity and inclusion as a strategic and commercial imperative for every organisation." };

export default function InclusionBusinessCase() {
  const pillars = [
    { icon: "📈", title: "Profitability and financial performance", body: "Diverse leadership drives stronger bottom-line results." },
    { icon: "💡", title: "Innovation and decision-making", body: "Diverse teams generate better ideas and fewer blind spots." },
    { icon: "🔄", title: "Retention and reducing turnover costs", body: "Inclusion keeps people; and saves the cost of losing them." },
    { icon: "🌟", title: "Talent attraction and workforce capability", body: "The best candidates choose employers with a genuine EDI track record." },
    { icon: "⚡", title: "Productivity and team performance", body: "Belonging and psychological safety drive day-to-day output." },
    { icon: "🛡️", title: "Reputation, risk and accountability", body: "Inclusion failures carry legal, financial and reputational consequences." },
    { icon: "🌍", title: "ESG and stakeholder expectations", body: "Investors, funders and commissioners expect evidence of EDI commitment." },
    { icon: "📣", title: "Customer reach and market growth", body: "Inclusive organisations understand and serve broader audiences." },
  ];

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
      <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-3-team-review.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          
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

        <section id="the-evidence" style={{ padding: "2.5rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>The evidence</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", margin: 0 }}>Six reasons inclusion makes business sense.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: "12px", padding: "1.25rem" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--charcoal)", lineHeight: 1.65, opacity: 0.8, margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS EVIDENCE */}
        <section style={{ background: "#1A3220", padding: "2.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>The numbers</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "var(--white)", margin: 0 }}>Evidence you can take into any room.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { stat: "36%", label: "More likely to outperform", source: "McKinsey, Diversity Wins (2020)" },
                { stat: "83%", label: "Of millennials more engaged in inclusive cultures", source: "Deloitte (2018)" },
                { stat: "87%", label: "Better decision-making in diverse teams", source: "Cloverpop / HBR (2017)" },
                { stat: "2×", label: "More likely to meet financial targets", source: "Deloitte (2020)" },
              ].map((s) => (
                <div key={s.stat} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "var(--white)", lineHeight: 1, marginBottom: "0.4rem" }}>{s.stat}</span>
                  <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "rgba(255,255,255,0.9)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>{s.source}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OBJECTIONS */}
        <section style={{ background: "var(--white)", padding: "4.5rem 1.5rem" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.08)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1rem" }}>Common pushbacks</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", margin: 0 }}>Heard these in the room?</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { q: "We can't afford to invest in EDI right now.", a: "The cost of not investing is higher: attrition, recruitment fees, discrimination claims and reputational damage all cost far more than a proactive inclusion strategy." },
                { q: "We're too small to need this.", a: "Inclusion matters at every size. EDI does not require a dedicated HR department; it requires intention and the right tools." },
                { q: "Our data doesn't show a problem.", a: "An absence of data is not evidence of inclusion. Pay gap analysis, recruitment funnel data and promotion rates often reveal patterns invisible to leadership." },
                { q: "We tried something before and it didn't work.", a: "One-off training rarely sticks. Real change requires strategy, leadership accountability and ongoing measurement; not a single workshop." },
              ].map((item, i, arr) => (
                <div key={item.q} style={{ padding: "1.25rem 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(74,99,71,0.15)" : "none" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", marginBottom: "0.35rem", margin: "0 0 0.35rem" }}>{item.q}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0, opacity: 0.8 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM TEASER */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
              <div>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>The Impact Platform</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--white)", lineHeight: 1.2, marginBottom: "1rem" }}>Go deeper with the full evidence library.</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: "1.75rem" }}>Platform members get access to structured learning, research and tools built specifically for people driving inclusion in their organisations.</p>
                <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "#1A3220", background: "var(--white)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Find out more</Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  { icon: "📚", title: "Research and evidence bank", desc: "Curated studies, reports and data points organised by theme; ready to cite." },
                  { icon: "💬", title: "Conversation guides", desc: "Structured prompts and frameworks for navigating difficult EDI conversations with confidence." },
                  { icon: "📋", title: "Editable templates and toolkits", desc: "Ready-to-adapt resources your organisation can put to use immediately." },
                  { icon: "🎓", title: "Structured learning modules", desc: "Self-paced courses that build knowledge and practical capability across your team." },
                ].map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1rem 1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: "0.1rem" }}>{f.icon}</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", margin: "0 0 0.25rem" }}>{f.title}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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

        <section style={{ background: "#1A3220", padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>Get support</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--white)", marginBottom: "0.75rem" }}>Need help getting buy-in internally?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: "1.75rem" }}>We work with EDI leads, HR teams and people managers to build a compelling case for inclusion investment. Whether you need data, a strategy or someone to help you make the argument; we can help.</p>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "#1A3220", background: "var(--white)", padding: "0.8rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Talk to us about your situation</Link>
          </div>
        </section>
            <Footer />
    </main>
    </div>
  );
}
