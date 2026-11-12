import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Inclusion Training | The Inclusion Edit", description: "High-impact EDI training for teams, managers and leaders. Built around your context, your challenges and your goals." };

export default function Training() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/edi-training-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Inclusion Training</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Training That Builds Capability; Not Just Awareness.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
                We design and deliver high-impact inclusion training for teams, managers and leaders; built around your context, your challenges, and the change you want to see.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Enquire about training</Link>
                <Link href="#training-offer" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>See our training offer</Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(105deg, rgba(107,143,113,0.18) 0%, rgba(107,143,113,0.10) 50%, rgba(107,143,113,0.18) 100%)", backgroundColor: "#f4f7f4" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 35%, rgba(201,168,76,0.18) 55%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0", position: "relative", zIndex: 3 }}>
            {[

              { icon: "🎓", label: "Competency-based", sub: "design" },

              { icon: "📜", label: "CPD-aligned", sub: "professional development" },

              { icon: "🧠", label: "Built for retention", sub: "not just the day" },

              { icon: "🎯", label: "Bespoke delivery", sub: "to your context" },

              { icon: "📈", label: "Measurable", sub: "behaviour change" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
                <span style={{ fontSize: "1.25rem", lineHeight: 1, marginBottom: "0.3rem" }}>{s.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage-dark)", lineHeight: 1.2 }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a6a4a", letterSpacing: "0.03em", marginTop: "0.15rem" }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* OUR APPROACH */}
        <section style={{ background: "linear-gradient(135deg, #1A3220 0%, #2C4A31 60%, #2E5235 100%)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "2rem" }}>Our approach to training</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "stretch" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "var(--white)", marginBottom: "1.25rem", lineHeight: 1.25 }}>Training that builds capability; not just awareness</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85, margin: 0 }}>
                  Good EDI training does more than tick a box. It gives people the knowledge, language and practical skills to act differently. We design every training session from the ground up for your organisation; so the content reflects your sector, your culture and the specific challenges your teams face.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.10)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.18)", padding: "2rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>How we deliver</span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85, margin: 0 }}>
                  Our training is available as half-day and full-day workshops, multi-session programmes, and ongoing learning journeys. We deliver in person, online and in a hybrid format; flexing around your teams, your calendar and your goals. Every session is facilitated by Rebekah, bringing consistency, depth and a warm, engaging style your people will respond to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THREE PILLARS */}
        <section style={{ background: "var(--sage-xlight)", padding: "2.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem", textAlign: "center" }}>How we support you</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "1.75rem" }}>What makes our training different</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>

              {[
  
              {
                  accent: "#a8d5b5",
                  title: "Research-led, practical learning",
                  body: "Our training is grounded in current research, evidence and lived experience; translating complex inclusion topics into practical learning that people can apply in their everyday roles. We bring together evidence, expertise and real-world examples to make the learning both credible and relevant.",
                },
  
              {
                  accent: "#4a8a5c",
                  title: "Interactive and thought-provoking",
                  body: "Through discussion, reflection, scenarios and interactive activities, we create space for people to question assumptions and explore what inclusion looks like in practice. Our sessions encourage curiosity, challenge thinking and give people the confidence to engage with conversations that can sometimes feel difficult.",
                },
  
              {
                  accent: "#1A3220",
                  title: "From insight to action",
                  body: "We help organisations move beyond good intentions by connecting learning to the systems, behaviours and decisions that shape people's experiences at work. Participants leave with practical ideas, greater awareness and a clearer understanding of what they can do differently.",
                },
              ].map((p) => (
                <div key={p.title} style={{ background: "var(--white)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ height: "5px", background: p.accent }} />
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.85 }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINING OFFER */}
        <section style={{
          padding: "3rem 1.5rem",
          position: "relative",
          overflow: "hidden",
          background: "#f5f8f5",
        }}>
          {/* photo background */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: "url('/edi-training.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.65,
            filter: "blur(3px) grayscale(20%)",
            pointerEvents: "none",
          }} />
          {/* light overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            background: "rgba(245,248,245,0.60)",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem", textAlign: "center" }}>What we cover</span>
            <h2 id="training-offer" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "0.5rem" }}>Specialist training areas</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", textAlign: "center", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>We offer training across a wide range of EDI topics. If you don't see what you need, we can design something just for you.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>

              {[
  
              { title: "Building an Inclusive Workplace", bullets: ["Build a shared language and culture of inclusion across your whole organisation", "Identify where exclusion is happening and know how to address it", "Give every person the confidence to act inclusively every day"] },
  
              { title: "Managing Across Difference", bullets: ["Lead people with different backgrounds, identities and working styles with confidence", "Build the cultural competence to adapt your approach for every individual", "Have better, braver conversations across difference"] },
  
              { title: "From Bias to Belonging", bullets: ["Recognise how bias shapes decisions, hiring and culture", "Learn to be an active ally and upstander", "Build a workplace where everyone genuinely belongs"] },
  
              { title: "Creating an Anti-Racist Organisation", bullets: ["Name and understand racism in its overt and systemic forms", "Give your team the language and confidence to address it", "Move from good intentions to accountable anti-racist action"] },
  
              { title: "Challenging Sexism and Creating Gender-Equitable Workplaces", bullets: ["Understand how sexism and misogyny show up at work", "Meet your legal duty under the Worker Protection Act 2023", "Give staff the tools to recognise, challenge and change harmful behaviour"] },
  
              { title: "Hire Without Bias: Inclusive Recruitment Practice", bullets: ["Attract a wider, more diverse pool of candidates", "Remove the bias baked into job descriptions and interviews", "Improve retention by getting inclusion right from day one"] },

              ].map((item) => (
                <div key={item.title} style={{ background: "var(--white)", borderRadius: "14px", padding: "1.1rem 1.5rem 1.5rem", border: "2px solid rgba(74,138,92,0.35)", boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
      
              {item.bullets.map((b) => (
                      <li key={b} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", lineHeight: 1.65, opacity: 0.8, marginBottom: "0.25rem" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* BESPOKE TRAINING */}
            <div style={{ background: "var(--white)", borderRadius: "14px", border: "2px solid rgba(74,138,92,0.35)", boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)", maxWidth: "900px", margin: "0 auto", textAlign: "center", marginBottom: "0", overflow: "hidden" }}>
              <div style={{ height: "5px", background: "var(--sage-dark)" }} />
              <div style={{ padding: "1.5rem 2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.4rem" }}>Need something built for you?</p>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem", lineHeight: 1.3 }}>We design bespoke training around your organisation</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.65, marginBottom: "0.875rem", opacity: 0.85 }}>We build training around your context, your data, and your people; on any topic, for any audience, at any scale.</p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)", marginBottom: "0.6rem" }}>Topics we can build around:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "0.75rem" }}>
  
              {["Allyship", "Racial literacy", "LGBTQ+ inclusion", "Psychological safety", "Intersectionality", "Inclusive leadership", "Neurodivergence at work", "Disability inclusion", "Micro-aggressions", "Gender equality", "Power and privilege", "Inclusive language", "EDI legal requirements"].map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--sage-dark)", background: "rgba(74,138,92,0.1)", border: "1px solid rgba(74,138,92,0.25)", borderRadius: "999px", padding: "0.3rem 0.85rem", whiteSpace: "nowrap" }}>{t}</span>
                ))}
              </div>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Request a training quote</Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRAINING THAT FITS YOUR TEAM */}
        <section style={{ background: "var(--white)", padding: "3rem 1.5rem 2.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>Delivery</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--sage-dark)", textAlign: "center", marginBottom: "0.75rem" }}>Inclusion training that fits your team</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--sage-dark)", textAlign: "center", maxWidth: "780px", margin: "0 auto 1.75rem", lineHeight: 1.75 }}>
              Our training and workshops can be delivered online or in person; tailored to your schedule, accessibility needs and organisational setup. We are based in the UK, frequently spend time in Bermuda, and are available to travel worldwide to support organisations wherever they are.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>

              {[
  
              { src: "/rebekah-training-4.jpg", alt: "Rebekah facilitating an inclusion workshop", pos: "top center" },
              { src: "/rebekah-training-1.jpg", alt: "Rebekah delivering an inclusion training session", pos: "top center" },
              { src: "/rebekah-training-2.jpg", alt: "Rebekah speaking at a training session", pos: "top center" },
              { src: "/rebekah-training-3.jpg", alt: "Rebekah presenting at a training event", pos: "top center" },
              ].map((photo) => (
                <div key={photo.src} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.13)", position: "relative" }}>
                  <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: photo.pos, display: "block" }} />
                  {/* Green brand tint */}
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(26,50,32,0.10)", pointerEvents: "none" }} />
                  {/* Vignette */}
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(0,0,0,0.38) 100%)", pointerEvents: "none" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ position: "relative", padding: "2.5rem 1.5rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.93)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem", textAlign: "center" }}>What people say</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "1.5rem" }}>Participant feedback</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {[
              { quote: "Rebekah is a well-organised, methodical instructor; her approach is warm and friendly. The sequence of the session was clear and each section built on the last, with some great practical tips.", role: "Training participant, charity sector" },
              { quote: "Rebekah demonstrated strong facilitation skills throughout the session. She created a safe and inclusive learning environment where participants felt comfortable sharing their perspectives. Her communication style was clear, respectful, and she maintained excellent energy and focus across all discussions.", role: "EDI lead, independent school" },
              { quote: "Rebekah is very knowledgeable on inclusion topics and good at explaining ideas and connecting to comments made by participants. Rebekah is always great at making participants feel comfortable.", role: "People manager, education sector" },
              ].map((t) => (
                <div key={t.role} style={{ background: "var(--white)", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--sage-dark)", opacity: 0.35, lineHeight: 1, marginBottom: "0.5rem" }}>&ldquo;</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.7, marginBottom: "0.875rem", fontStyle: "italic" }}>{t.quote}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)" }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#1A3220", padding: "3rem 1.5rem", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>Get started</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: "var(--white)", marginBottom: "0.75rem" }}>Ready to book training for your team?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", maxWidth: "500px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>Tell us about your team and your goals and we will design a training programme that fits.</p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#1A3220", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Book a call</Link>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>Request a training quote</Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
