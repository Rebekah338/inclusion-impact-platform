import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import ProgrammeFinder from "@/components/ProgrammeFinder";

export const metadata = { title: "Inclusion Consultancy | The Inclusion Edit", description: "Bespoke EDI consultancy programmes for schools, businesses and organisations. Audit, advise and embed equity, diversity and inclusion." };

export default function Consultancy() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-7-diverse-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Inclusion Consultancy</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                EDI Consultancy That Creates Lasting Change.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                We partner with organisations to design and deliver bespoke consultancy programmes that audit where you are, advise on where to go, and embed the changes that matter.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Enquire now</Link>
                <Link href="/the-inclusion-business-case" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Explore our approach</Link>
              </div>
            </div>
          </div>
        </section>

      {/* STATS STRIP */}
      <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>🎯</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Bespoke</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>to every organisation</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>🌍</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>3 jurisdictions</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>UK · Bermuda · US</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>📋</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>12+ projects</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>research directed</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>💡</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Strategic</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>not tick-box</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>🌱</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>Lasting change</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>built in from day one</span>
          </div>
        </div>
      </section>

      <ProgrammeFinder />

      {/* FLAGSHIP PROGRAMMES */}
      <section style={{ position: "relative", padding: "4rem 1.5rem 5rem", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-7-diverse-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.93)", backdropFilter: "blur(2px)", zIndex: 1 }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(40,60,45,0.7)", background: "rgba(40,60,45,0.08)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>Our programmes</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--charcoal)", margin: 0 }}>Three flagship programmes; one clear goal</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* PROGRAMME 1: 2027 Roadmap */}
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)", background: "#ffffff", borderTop: "5px solid #C9A84C", border: "1px solid rgba(201,168,76,0.3)", borderTopWidth: "5px" }}>
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-6-strategy.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", letterSpacing: "0", textTransform: "none", color: "var(--white)", marginBottom: "0.35rem" }}>2027 Inclusion &amp; Culture Roadmap</span>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.4, fontStyle: "italic" }}>Turn good intentions into a clear, measurable plan.</h3>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "0.25rem 0.75rem", whiteSpace: "nowrap", flexShrink: 0 }}>10–12 weeks</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem 0" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.65, marginBottom: "1rem" }}>
                  2027 brings new expectations for employers: from preventing sexual harassment to pay gap and menopause action plans. This programme gives you a clear picture of where you are now, where you want to be, and exactly how you will get there; with your legal duties built in from the start.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ padding: "1rem 1.4rem", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What&#39;s included</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>An inclusion and culture audit of your policies, processes and practices</li>
                    <li>Staff voice: a baseline pulse survey and focus groups</li>
                    <li>A review of your people data to show where outcomes differ between groups</li>
                    <li>Readiness review: sexual harassment duty; gender pay gap; ethnicity and disability pay gap reporting</li>
                    <li>Leadership workshops to agree priorities, ownership and KPIs</li>
                    <li>A tailored 2027 roadmap with clear actions, owners and measures of success</li>
                    <li>A follow-up pulse survey at six months to show your progress</li>
                  </ul>
                </div>
                <div style={{ padding: "1rem 1.4rem" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What you&#39;ll walk away with</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>A leadership team aligned behind a single, credible plan they own and can act on</li>
                    <li>Clarity on where your inclusion gaps sit: in policy, practice, data or culture</li>
                    <li>Confidence that your duties under current and incoming employment law are met</li>
                    <li>A live roadmap with named actions, owners and measurable KPIs</li>
                    <li>Staff who feel heard; because their voice shaped the plan</li>
                    <li>Six-month pulse data to show progress to your board and stakeholders</li>
                    <li>A foundation that makes every year after easier</li>
                  </ul>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem" }}>
                <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>Book a 2027 planning call →</Link>
              </div>
            </div>

            {/* PROGRAMME 2: Inclusive Leadership */}
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)", background: "#ffffff", borderTop: "5px solid #4a8a5c", border: "1px solid rgba(74,138,92,0.3)", borderTopWidth: "5px" }}>
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-5-team-presentation.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", letterSpacing: "0", textTransform: "none", color: "var(--white)", marginBottom: "0.35rem" }}>Inclusive Leadership Programme</span>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.4, fontStyle: "italic" }}>One consistent standard of inclusion across every site.</h3>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "0.25rem 0.75rem", whiteSpace: "nowrap", flexShrink: 0 }}>6–12 weeks</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem 0" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.65, marginBottom: "1rem" }}>
                  For organisations with teams across sites, regions or time zones. Inclusion depends on managers: when your people are spread across locations, consistency matters. This programme gives every manager the same confidence, language and tools; wherever they work.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ padding: "1rem 1.4rem", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What&#39;s included</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>A live roadshow or webinar series delivered across your locations and time zones</li>
                    <li>Content tailored to your sector, culture and current priorities</li>
                    <li>Practical tools for inclusive meetings, recruitment, feedback and handling conduct concerns</li>
                    <li>A branded manager toolkit your leaders can use day to day</li>
                    <li>A confidence survey before and after; plus an impact report at the end</li>
                    <li style={{ listStyle: "none", marginTop: "0.75rem", paddingLeft: 0 }}><span style={{ fontWeight: 700, color: "var(--charcoal)" }}>Optional add-on:</span> train-the-trainer to equip your own people to keep delivering the programme</li>
                    <li style={{ listStyle: "none", marginTop: "0.5rem", paddingLeft: 0 }}><span style={{ fontWeight: 700, color: "var(--charcoal)" }}>Financial services edition:</span> covers FCA rules on non-financial misconduct, including bullying and harassment from September 2026</li>
                  </ul>
                </div>
                <div style={{ padding: "1rem 1.4rem" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What you&#39;ll walk away with</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>Managers across every location using the same language, tools and standards</li>
                    <li>A measurable shift in confidence: tracked before and after</li>
                    <li>Practical tools for meetings, recruitment, feedback and conduct</li>
                    <li>A branded toolkit that stays with your organisation after the programme ends</li>
                    <li>An impact report to share with your board and senior stakeholders</li>
                    <li>For financial services: managers clear on their FCA responsibilities</li>
                    <li>Optional: internal capability to keep the programme growing</li>
                  </ul>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem" }}>
                <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>Book an inclusive leadership enquiry call →</Link>
              </div>
            </div>

            {/* PROGRAMME 3: B Corp JEDI */}
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)", background: "#ffffff", borderTop: "5px solid #4a6080", border: "1px solid rgba(74,96,128,0.3)", borderTopWidth: "5px" }}>
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/watch-2-collaboration.jpg')", backgroundSize: "cover", backgroundPosition: "center 35%" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", letterSpacing: "0", textTransform: "none", color: "var(--white)", marginBottom: "0.35rem" }}>B Corp JEDI Readiness</span>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.4, fontStyle: "italic" }}>Meet the JEDI standard with evidence that stands up to verification.</h3>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "0.25rem 0.75rem", whiteSpace: "nowrap", flexShrink: 0 }}>6–8 weeks</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem 0" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.65, marginBottom: "1rem" }}>
                  For businesses certifying or recertifying against B Lab&#39;s new standards. Under B Lab&#39;s new standards, Justice, Equity, Diversity and Inclusion (JEDI) is a mandatory, pass or fail topic. It asks for real data and real action; not just a policy. We help you meet it with evidence that stands up to verification.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ padding: "1rem 1.4rem", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What&#39;s included</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>Privacy-compliant demographic data collection and analysis</li>
                    <li>A leadership workshop to choose the right JEDI actions for your size from B Lab&#39;s menu</li>
                    <li>Practical support putting those actions in place</li>
                    <li>A JEDI action plan covering Years 0, 3 and 5</li>
                    <li>An evidence pack and a mock review of the JEDI topic</li>
                  </ul>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.65)", lineHeight: 1.6, marginTop: "1rem", marginBottom: 0 }}>
                    Recertifying in 2027? There are no extensions for 2027 recertification dates; now is the time to prepare.
                  </p>
                </div>
                <div style={{ padding: "1rem 1.4rem" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,40,30,0.55)", marginBottom: "0.5rem" }}>What you&#39;ll walk away with</p>
                  <ul style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(30,40,30,0.82)", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                    <li>A verified, evidence-based JEDI submission; not a policy that raises more questions than it answers</li>
                    <li>Demographic data collected and analysed in a privacy-compliant, usable way</li>
                    <li>Leadership clarity on which JEDI actions are right for your size and stage</li>
                    <li>A multi-year action plan assessors can follow across Years 0, 3 and 5</li>
                    <li>An evidence pack and mock review so you know exactly where you stand</li>
                  </ul>
                </div>
              </div>
              <div style={{ padding: "1.25rem 2rem" }}>
                <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none" }}>Book a B Corp JEDI call →</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TAILOR + BUILD FROM SCRATCH */}
      <section style={{ background: "var(--white)", padding: "1.75rem 1.5rem" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", color: "var(--charcoal)", marginBottom: "0.4rem" }}>Not a one-size-fits-all approach</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", opacity: 0.7, maxWidth: "560px", margin: "0 auto" }}>Every organisation is different. We build around you.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>

            <div style={{ background: "var(--sage-xlight)", borderRadius: "14px", padding: "1.1rem 1.4rem", border: "1px solid rgba(107,143,113,0.2)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", background: "var(--sage-dark)", marginBottom: "0.875rem" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Tailor any programme to your organisation</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", opacity: 0.8, lineHeight: 1.7, marginBottom: "0.75rem" }}>
                See a programme that is almost right, but not quite? We adapt any of our existing programmes to reflect your sector, culture, team makeup and current priorities. The framework is proven; the content becomes yours.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "var(--charcoal)", opacity: 0.65, lineHeight: 1.65, marginBottom: "1rem" }}>
                You can also add bespoke inclusion resources or fully branded e-learning modules to any programme: guides, toolkits and learning content designed in your look and your language.
              </p>
              <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.7rem 1.4rem", borderRadius: "8px", textDecoration: "none" }}>Tell us what you need →</Link>
            </div>

            <div style={{ background: "#1A3220", borderRadius: "14px", padding: "1.1rem 1.4rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.15)", marginBottom: "0.875rem" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--white)", marginBottom: "0.5rem" }}>Build a programme from scratch</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                None of our existing programmes quite fit? No problem. We design consultancy programmes from the ground up; shaped entirely around your organisation&#39;s specific challenges, goals and context.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "1rem" }}>
                Whether you need a single focused intervention or a multi-strand programme spanning months, we scope it together and build exactly what will make a difference for your people.
              </p>
              <Link href="/contact-us" style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "#1A3220", background: "var(--white)", padding: "0.7rem 1.4rem", borderRadius: "8px", textDecoration: "none" }}>Start the conversation →</Link>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS STRIP */}
      <section style={{ background: "var(--sage-xlight)", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(107,143,113,0.15)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>What clients say</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { quote: "Rebekah is a well-organised, methodical instructor; her approach is warm and friendly. The sequence of the session was clear and each section built on the last; with some great practical tips.", name: "", org: "Project Free" },
              { quote: "Rebekah demonstrated strong facilitation skills throughout the session. She created a safe and inclusive learning environment where participants felt comfortable sharing their perspectives. Her communication style was clear, respectful, and she maintained excellent energy and focus across all discussions.", name: "", org: "Network Plus" },
              { quote: "Rebekah is very knowledgeable on inclusion topics and good at explaining ideas and connecting to comments made by participants. Rebekah is always great at making participants feel comfortable.", name: "", org: "Hospice UK" },
            ].map((t) => (
              <div key={t.org} style={{ background: "var(--white)", borderRadius: "16px", padding: "1.75rem", border: "1px solid var(--gray-border)", boxShadow: "0 4px 16px rgba(20,50,25,0.07)" }}>
                <span style={{ fontSize: "1.75rem", color: "var(--sage)", display: "block", marginBottom: "0.75rem", lineHeight: 1 }}>&ldquo;</span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem", opacity: 0.85, fontStyle: "italic" }}>{t.quote}</p>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--sage-dark)", margin: 0 }}><span style={{ fontWeight: 400, color: "var(--charcoal)", opacity: 0.6 }}>{t.org}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--white)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)", color: "var(--charcoal)", marginBottom: "0.6rem" }}>Ready to build something that lasts?</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, maxWidth: "500px", margin: "0 auto 2rem" }}>Every engagement starts with a conversation. Tell us about your organisation and we will come back with how we can help.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none" }}>Start the conversation</Link>
          <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", border: "2px solid var(--sage-dark)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", background: "transparent" }}>Explore the platform</Link>
        </div>
      </section>

      <Footer />
    </main>
    </div>
  );
}
