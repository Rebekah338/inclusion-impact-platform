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
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)", background: "rgba(0,0,0,0.08)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>The numbers</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "var(--white)", margin: 0 }}>Evidence you can take into any room.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
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

        {/* MYTHS */}
        <section style={{ background: "var(--white)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: "1.1rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.08)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>Myth busting</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", margin: "0 0 0.75rem" }}>The myths that are costing your organisation money</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", opacity: 0.7, lineHeight: 1.7, maxWidth: "580px", margin: "0 auto" }}>These are the objections we hear most often. Here is what the evidence actually shows.</p>
            </div>

            {/* Column header chips */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem", padding: "0 0.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.5, fontFamily: "var(--font-heading)" }}>✕</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--charcoal)", background: "rgba(44,44,44,0.07)", borderRadius: "999px", padding: "0.3rem 0.9rem" }}>The Myth</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>✓</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--white)", background: "var(--sage-dark)", borderRadius: "999px", padding: "0.3rem 0.9rem" }}>The Reality</span>
              </div>
            </div>

            {/* Table rows */}
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 24px rgba(26,50,32,0.08), 0 1px 4px rgba(26,50,32,0.06)", border: "1.5px solid rgba(26,50,32,0.32)" }}>
              {[
                {
                  myth: "We can't afford to invest in EDI right now.",
                  reality: "The cost of not investing is higher. Attrition, recruitment fees, discrimination claims and reputational damage all cost far more than a proactive inclusion strategy.",
                },
                {
                  myth: "We're too small to need this.",
                  reality: "Inclusion matters at every size. EDI does not require a dedicated HR department; it requires intention and the right tools.",
                },
                {
                  myth: "Our data doesn't show a problem.",
                  reality: "An absence of data is not evidence of inclusion. Pay gap analysis, recruitment funnel data and promotion rates often reveal patterns invisible to leadership.",
                },
                {
                  myth: "We tried something before and it didn't work.",
                  reality: "Real change requires a well-thought-out strategy, leadership accountability, training that is revisited over time, and ongoing measurement. A single workshop is a starting point; not a destination.",
                },
              ].map((row, i, arr) => (
                <div key={row.myth} style={{ display: "grid", gridTemplateColumns: "2fr 3fr", borderBottom: i < arr.length - 1 ? "1px solid rgba(26,50,32,0.14)" : "none" }}>
                  <div style={{ padding: "1rem 1.4rem", borderRight: "1.5px solid rgba(26,50,32,0.14)", background: i % 2 === 0 ? "rgba(248,247,244,0.9)" : "rgba(244,243,240,0.7)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ fontSize: "0.8rem", marginTop: "0.2rem", opacity: 0.4, flexShrink: 0, fontWeight: 700, fontFamily: "var(--font-heading)" }}>✕</span>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.65, margin: 0, opacity: 0.75 }}>{row.myth}</p>
                    </div>
                  </div>
                  <div style={{ padding: "1rem 1.4rem", background: i % 2 === 0 ? "rgba(74,99,71,0.04)" : "rgba(74,99,71,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ fontSize: "0.85rem", marginTop: "0.1rem", color: "#1A3220", flexShrink: 0, fontWeight: 700 }}>✓</span>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#1A3220", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{row.reality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing line */}
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", textAlign: "center", marginTop: "1.4rem", lineHeight: 1.7 }}>
              The question is not whether your organisation can afford to invest in inclusion.<br />
              <span style={{ color: "#1A3220" }}>The question is whether it can afford not to.</span>
            </p>

          </div>
        </section>

        {/* RESEARCH AND DATA STRIP */}
        <section style={{ position: "relative", padding: "4rem 1.5rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-3-team-review.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0, filter: "blur(3px)", transform: "scale(1.04)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,252,245,0.82)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>Featured evidence</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", margin: "0 0 0.6rem" }}>Research and data</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", fontWeight: 600, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>Real evidence. Real organisations. Click any card to read the original source.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { stat: "42% lower", statLabel: "staff turnover when organisations score highest for inclusion", title: "ENEI TIDE Benchmarking", source: "Employers Network for Equality and Inclusion, 2023", tags: ["Retention", "Culture", "Benchmarking"], url: "https://www.enei.org.uk/resources/tide/" },
                { stat: "19 points", statLabel: "higher innovation revenue in companies with diverse management teams", title: "How Diverse Leadership Teams Boost Innovation", source: "Boston Consulting Group, 2018", tags: ["Innovation", "Leadership", "Revenue"], url: "https://www.bcg.com/publications/2018/how-diverse-leadership-teams-boost-innovation" },
                { stat: "8x more", statLabel: "likely to achieve better business outcomes in genuinely inclusive cultures", title: "The Diversity and Inclusion Revolution", source: "Deloitte Insights, 2018", tags: ["Performance", "Culture", "Leadership"], url: "https://www.deloitte.com/content/dam/assets-shared/legacy/docs/insights/2022/DI_Diversity-and-inclusion-revolution.pdf" },
              ].map((r) => (
                <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", background: "var(--white)", borderRadius: "14px", padding: "1.5rem 1.4rem", border: "1.5px solid rgba(74,99,71,0.15)", transition: "box-shadow 0.15s" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", color: "#1A3220", lineHeight: 1, marginBottom: "0.3rem" }}>{r.stat}</span>
                  <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", opacity: 0.7, marginBottom: "1rem", lineHeight: 1.5 }}>{r.statLabel}</span>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.3rem", lineHeight: 1.4 }}>{r.title}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(0,0,0,0.6)", margin: "0 0 0.9rem", lineHeight: 1.5 }}>{r.source}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {r.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>{tag}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--sage-dark)", margin: 0 }}>Read the research →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES STRIP */}
        <section style={{ background: "var(--sage-xlight)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", margin: "0 0 0.6rem" }}>Case studies</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", fontWeight: 600, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>Real organisations. Real outcomes. Click any card to read the full case study.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { stat: "2x higher", statLabel: "net income growth in companies leading on disability inclusion", title: "Accenture: The Disability Inclusion Advantage", source: "Accenture, 2018", tags: ["Disability inclusion", "Financial performance", "Leadership"], url: "https://newsroom.accenture.com/news/2018/companies-leading-in-disability-inclusion-have-outperformed-peers-accenture-research-finds" },
                { stat: "40%", statLabel: "more innovations generated by neurodiverse teams", title: "SAP: Autism at Work Programme", source: "SAP programme data, via Dynseo", tags: ["Neurodiversity", "Innovation", "Retention"], url: "https://www.dynseo.com/en/roi-of-neurodiversity-in-business-studies-from-jpmorgan-sap-microsoft-and-2026-figures/" },
                { stat: "US$19bn", statLabel: "projected annual saving in talent costs", title: "Vodafone: Global Maternity Policy", source: "Vodafone, 2015", tags: ["Flexible working", "Retention", "Gender"], url: "https://www.cnbc.com/2015/03/10/vodafone-launches-new-policy-for-working-moms.html" },
              ].map((cs) => (
                <a key={cs.title} href={cs.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", background: "var(--white)", borderRadius: "14px", padding: "1.5rem 1.4rem", border: "1.5px solid rgba(74,99,71,0.15)" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.9rem", color: "#1A3220", lineHeight: 1 }}>{cs.stat}</span>
                  <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "rgba(0,0,0,0.6)", marginTop: "0.2rem", marginBottom: "1rem" }}>{cs.statLabel}</span>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.3rem", lineHeight: 1.4 }}>{cs.title}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(0,0,0,0.55)", margin: "0 0 0.9rem", lineHeight: 1.5 }}>{cs.source}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {cs.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>{tag}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "#1A3220", margin: 0 }}>Read the case study →</p>
                </a>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontStyle: "italic", color: "rgba(0,0,0,0.5)", textAlign: "center", margin: 0 }}>Platform members get deeper analysis, key quotes and planning tools for every piece of evidence above: and more.</p>
          </div>
        </section>

        {/* COMBINED CTA */}
        <section style={{ background: "var(--sage-xlight)", padding: "4rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--charcoal)", marginBottom: "0.75rem" }}>Ready to build your case?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", opacity: 0.75, lineHeight: 1.75, marginBottom: "2rem" }}>Whether you want the evidence at your fingertips or someone to guide the conversation: we have got you.</p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>Inside the Inclusion Impact Platform</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
              {[
                { stat: "27", label: "Pieces of research and data" },
                { stat: "20", label: "Case studies" },
                { stat: "3", label: "AI evidence building tools" },
                { stat: "10+", label: "Templates and resources" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center", background: "rgba(74,99,71,0.08)", borderRadius: "10px", padding: "1rem 0.75rem" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#1A3220", lineHeight: 1, marginBottom: "0.3rem" }}>{s.stat}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.72rem", color: "rgba(0,0,0,0.55)", lineHeight: 1.4 }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", background: "#1A3220", padding: "0.8rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Explore the platform</Link>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "#1A3220", background: "transparent", padding: "0.8rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block", border: "1.5px solid #1A3220" }}>Talk to us about your situation</Link>
            </div>
          </div>
        </section>
            <Footer />
    </main>
    </div>
  );
}
