import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "About Us | The Inclusion Edit", description: "We are an award-winning EDI consultancy and learning platform helping organisations build capacity, capability and lasting change." };

export default function AboutUs() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/about-page.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>About The Inclusion Edit</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Capacity.<br />Capability.<br />Change.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                We are an award-winning EDI consultancy and learning platform helping organisations across the UK, Bermuda and beyond build genuinely inclusive cultures.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Work with us</Link>
                <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Explore the platform</Link>
              </div>
            </div>
          </div>
          {/* Award badge — bottom right of hero */}
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem", zIndex: 4, background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "16px", padding: "1.25rem 1.5rem", textAlign: "center", maxWidth: "200px", boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #f5c842 0%, #e8a820 100%)", margin: "0 auto 0.75rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(232,168,32,0.5)", fontSize: "1.1rem", lineHeight: 1 }}>🏆</div>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 0.35rem" }}>Corporate Vision</p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: "var(--white)", lineHeight: 1.15, margin: "0 0 0.35rem" }}>Best EDI Consultancy</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(255,255,255,0.55)", margin: "0 0 0.6rem", lineHeight: 1.4 }}>HR &amp; Employment Awards 2026 · London</p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "0.6rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#f5c842", margin: 0 }}>Award Winner</p>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
            {[
              { icon: "🏆", label: "Award-winning", sub: "EDI consultancy" },
              { icon: "🌍", label: "3 jurisdictions", sub: "UK · Bermuda · US" },
              { icon: "📊", label: "Research-led", sub: "evidence-based practice" },
              { icon: "🌱", label: "Capacity", sub: "built to last" },
              { icon: "🎓", label: "Capability", sub: "not just awareness" },
              { icon: "✨", label: "Change", sub: "measurable outcomes" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
                <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>{s.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION + VISION */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "stretch" }}>
            {/* Mission: left side */}
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>Our mission</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85, margin: 0 }}>
                The Inclusion Edit exists to empower organisations worldwide to build meaningful, sustainable and exceptional EDI practice. We work with schools, businesses and organisations to build the knowledge, tools and confidence they need to create real, lasting change; through education via our accessible resources, alongside tailored consultancy and strategic training.
              </p>
            </div>
            {/* Vision: right side inset box */}
            <div style={{ background: "rgba(255,255,255,0.10)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.18)", padding: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>Our vision</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85, margin: 0 }}>
                We aspire to create a global community where diverse, equitable and inclusive environments are standard. Where people feel supported, informed and inspired to make inclusion part of everyday practice; fostering learning, amplifying lived experiences and breaking down barriers so everyone feels valued, represented and able to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDING STORY */}
        <section style={{ background: "var(--sage-xlight)", padding: "2.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3.5rem", alignItems: "center" }}>
            <div style={{ maxWidth: "640px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--white)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>Our founding story</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.2 }}>Built from lived experience and purpose.</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "0.75rem", opacity: 0.85 }}>
                As a Mixed Black, Indo-Caribbean and White woman living with Crohn&apos;s disease, questions of belonging, visibility and inclusion have always been deeply personal to me; not abstract concepts, but lived experience. From a young age, I became curious about what true inclusion really looks like, and quickly understood that equity is essential if we want justice for the richness of human diversity.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "0.75rem", opacity: 0.85 }}>
                That curiosity became a commitment. I built my academic and professional journey around it; completing a Master&apos;s in Education: International Development and Social Justice, alongside a CMI Level 7 qualification in Strategic Approaches to Equity, Diversity and Inclusion. Combined with years of hands-on EDI practice and primary school teaching, this has shaped both my thinking and my purpose.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "0.75rem", opacity: 0.85 }}>
                That purpose is simple: to make inclusion practical, actionable and meaningful; not just something organisations talk about, but something they embed and live. The Inclusion Edit is the embodiment of that journey. Through training, consultancy and practical resources, I help organisations move from intention to impact; building workplaces and communities where everyone can truly belong.
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", margin: 0 }}>Rebekah Hayward, Founder</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
              <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", border: "4px solid var(--white)", boxShadow: "0 12px 48px rgba(42,74,48,0.45), 0 4px 20px rgba(42,74,48,0.25), 0 0 60px rgba(107,143,113,0.2)" }}>
                <img src="/rebekah-hayward.jpg" alt="Rebekah Hayward" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", textAlign: "center", margin: 0 }}>Rebekah Hayward</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#4a6a4a", textAlign: "center", margin: 0 }}>Founder, The Inclusion Edit</p>
            </div>
          </div>
        </section>

        {/* OUR VALUES */}
        <section style={{ position: "relative", overflow: "hidden", padding: "2.5rem 1.5rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "var(--sage-xlight)", zIndex: 0 }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/about-page.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18, zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--white)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>Our values</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--charcoal)", margin: 0 }}>What drives everything we do</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "💡", label: "Innovation", text: "The world is changing fast, and so are EDI challenges. We offer practical, up-to-date support that helps organisations stay inclusive, relevant and ahead of the curve." },
                { icon: "📚", label: "Education", text: "We help you build and grow your EDI knowledge with practical, ongoing learning. Our focus is real progress; giving you the tools and confidence to embed inclusion into everyday practice." },
                { icon: "🎯", label: "Integrity", text: "We work with honesty, transparency and accountability. Our advice is evidence-based, up to date and grounded in best EDI practice you can trust." },
                { icon: "✏️", label: "Creativity", text: "We make EDI engaging, accessible and easy to understand. We bring fresh, creative ways to share insights and are always exploring new ideas and collaborations." },
              ].map((v) => (
                <div key={v.label} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "18px", padding: "2rem", boxShadow: "0 6px 28px rgba(42,74,48,0.22)" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--sage-xlight)", marginBottom: "0.75rem" }}>{v.label}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, margin: 0 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section style={{ padding: "2rem 1.5rem", background: "var(--sage-xlight)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--white)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>Our team</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--charcoal)", margin: 0 }}>The people behind the work</h2>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", marginTop: "1.25rem", textAlign: "left" }}>Consultants &amp; Contributors</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                { name: "Rahim Hassanali", role: "Associate Consultant", img: "/team-rahim.jpg", linkedin: "#", bio: "Senior social impact leader and EDI consultant with over 20 years of experience. He supports organisations to strengthen strategy, culture and practice; turning inclusion from intention into impact." },
                { name: "Jason Miles-Summers", role: "Associate Consultant", img: "/team-jason.jpg", linkedin: "#", bio: "Award-winning EDI consultant with over 15 years helping organisations build inclusive, high-performing cultures. Known for translating strategy into practical, meaningful action." },
                { name: "Patrice Blackstock", role: "Associate Consultant", img: "/team-patrice.jpg", linkedin: "#", bio: "Qualified trainer and inclusion consultant specialising in neuroinclusion. She develops practical policies rooted in lived experience to drive fairer, more inclusive outcomes." },
                { name: "Osakpolor Orumwense", role: "Creative Contributor", img: "/team-osa.jpg", linkedin: "#", bio: "Content creator and community builder with experience in podcast production and social media. She brings creative strategy and audience insight to everything The Inclusion Edit produces." },
              ].map((person) => (
                <div key={person.name} style={{ background: "var(--white)", borderRadius: "16px", border: "1.5px solid rgba(107,143,113,0.3)", overflow: "hidden", boxShadow: "0 4px 16px rgba(42,74,48,0.08), 0 1px 4px rgba(42,74,48,0.06)", display: "flex", flexDirection: "column", alignItems: "center", padding: "1.25rem 1.25rem 1.25rem", textAlign: "center" }}>
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "0.4rem", border: "3px solid var(--sage-xlight)", boxShadow: "0 4px 16px rgba(42,74,48,0.1)" }}>
                    <img src={person.img} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--charcoal)", marginBottom: "0.15rem" }}>{person.name}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{person.role}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{person.bio}</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "5px", background: "var(--charcoal)", marginTop: "0.75rem", flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "left" }}>Advisory Board</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {[
                { name: "Elizabeth Vincent", role: "Product & Digital Platform Development", img: "/team-elizabeth.jpg", linkedin: "#", bio: "Commercial strategy and operations leader with a decade of experience scaling technology businesses; bringing a sharp focus on inclusive workplace culture and digital learning." },
                { name: "Rioh Burke", role: "Commercial & Business Strategy", img: "/team-rioh.jpg", linkedin: "#", bio: "Strategy Director specialising in enterprise strategy, operating model design and large-scale transformation. A recognised voice on equity, diversity and inclusion." },
                { name: "Tracy Bortier", role: "Partnerships & Collaborations", img: "/team-tracy.jpg", linkedin: "#", bio: "Strategic leader specialising in cross-sector partnerships that drive sustainable growth. She helps organisations turn values into action and scale with integrity." },
              ].map((person) => (
                <div key={person.name} style={{ background: "var(--white)", borderRadius: "16px", border: "1.5px solid rgba(107,143,113,0.3)", overflow: "hidden", boxShadow: "0 4px 16px rgba(42,74,48,0.08), 0 1px 4px rgba(42,74,48,0.06)", display: "flex", flexDirection: "column", alignItems: "center", padding: "1.25rem 1.25rem 1.25rem", textAlign: "center" }}>
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "0.4rem", border: "3px solid var(--sage-xlight)", boxShadow: "0 4px 16px rgba(42,74,48,0.1)" }}>
                    <img src={person.img} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--charcoal)", marginBottom: "0.15rem" }}>{person.name}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.7rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{person.role}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{person.bio}</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "5px", background: "var(--charcoal)", marginTop: "0.75rem", flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE STAND FOR */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", padding: "3.5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>What we stand for</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--white)", margin: 0 }}>Our principles in practice</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "📊", label: "Evidence-led", text: "Everything we do is grounded in research and data. We help organisations build an evidence base that makes the case for inclusion and tracks real progress." },
                { icon: "🔧", label: "Practical", text: "We translate complex EDI concepts into clear, actionable tools and frameworks that people can use immediately in their day-to-day work." },
                { icon: "💬", label: "Honest", text: "We tell organisations the truth about where they are; not just what they want to hear. Genuine progress requires honest conversation." },
                { icon: "🌐", label: "Intersectional", text: "We understand that people hold multiple identities and that inclusion work must reflect the full complexity of human experience." },
              ].map((v) => (
                <div key={v.label} style={{ borderRadius: "20px", border: "2px solid rgba(255,255,255,0.15)", overflow: "hidden", boxShadow: "0 16px 48px rgba(10,30,15,0.35), 0 4px 14px rgba(10,30,15,0.2)", background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.07) 100%)" }}>
                  <div style={{ padding: "2rem", height: "100%", boxSizing: "border-box" }}>
                    <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{v.icon}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--white)", marginBottom: "0.75rem" }}>{v.label}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: 0 }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section style={{ background: "var(--white)", padding: "4rem 1.5rem 4.5rem", position: "relative", overflow: "hidden" }}>
          {/* Photo background with heavy blur + gradient wash */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/about-page.jpg')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(8px)", transform: "scale(1.05)", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.80) 50%, rgba(255,255,255,0.88) 100%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "var(--sage-xlight)", borderRadius: "999px", padding: "0.35rem 1rem", flexShrink: 0 }}>What we do</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "var(--charcoal)", margin: 0 }}>Four ways we build lasting inclusion</h2>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, margin: 0 }}>Every strand is designed to meet organisations wherever they are on their inclusion journey.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "💡", title: "Impact Platform", desc: "A membership hub with 31 CPD modules, AI tools and evidence resources; available anytime, anywhere.", href: "/about-our-impact-platform", cta: "Explore the platform" },
                { icon: "🤝", title: "Inclusion Consultancy", desc: "Bespoke consultancy programmes designed to audit, advise and embed equity, diversity and inclusion at every level of your organisation.", href: "/edi-consultancy-programmes", cta: "Explore consultancy" },
                { icon: "🎓", title: "Inclusion Training", desc: "High-impact training for teams, managers and leaders; built around your context, your challenges and your goals.", href: "/edi-training", cta: "Explore training" },
                { icon: "✏️", title: "Bespoke Resources", desc: "Custom-designed inclusion resources: toolkits, guides and frameworks created specifically for your organisation.", href: "/bespoke-inclusion-resources", cta: "Find out more" },
              ].map((item) => (
                <div key={item.href} style={{ background: "linear-gradient(160deg, #f7fbf7 0%, #eef6ee 55%, #e2efe2 100%)", borderRadius: "18px", border: "1.5px solid rgba(107,143,113,0.35)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 16px 48px rgba(20,50,25,0.28), 0 4px 14px rgba(20,50,25,0.16)" }}>
                  <div style={{ padding: "2.1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "1rem" }}>{item.icon}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.4, marginBottom: "0.75rem" }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.8, margin: "0 0 1.5rem", flexGrow: 1 }}>{item.desc}</p>
                    <Link href={item.href} style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--sage-dark)", textDecoration: "none", alignSelf: "flex-start" }}>{item.cta} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--white)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)", color: "var(--charcoal)", marginBottom: "0.6rem", whiteSpace: "nowrap" }}>Ready to build a more inclusive organisation?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.7, whiteSpace: "nowrap", marginTop: 0, marginRight: "auto", marginBottom: "2rem", marginLeft: "auto" }}>Whether you are just getting started or looking to go deeper; we will meet you where you are and help you make lasting change.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none" }}>Get in touch</Link>
            <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "transparent", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", border: "2px solid var(--sage-dark)" }}>Explore the platform</Link>
          </div>
        </section>

            <Footer />
    </main>
    </div>
  );
}
