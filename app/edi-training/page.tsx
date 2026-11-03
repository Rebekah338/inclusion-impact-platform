import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Inclusion Training | The Inclusion Edit", description: "High-impact EDI training for teams, managers and leaders. Built around your context, your challenges and your goals." };

export default function Training() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }} >
  <Image src="/edi-training.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
</div>
          <div style={{ position: "absolute", top: "1.75rem", right: "2rem", zIndex: 3 }}>
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Inclusion Training</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Training that builds capability; not just awareness.
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

        {/* INTRO */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--charcoal)", marginBottom: "1.5rem" }}>Our approach to training</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Good EDI training does more than raise awareness. It builds capability; giving people the knowledge, language and practical skills to act differently. We design every training session from the ground up for your organisation, so the content reflects your sector, your culture and the specific challenges your teams face.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--charcoal)", lineHeight: 1.8 }}>
            Our training is available as half-day and full-day workshops, multi-session programmes, and ongoing learning journeys. We deliver in person, online and in a hybrid format.
          </p>
        </section>

        {/* THREE PILLARS */}
        <section style={{ background: "var(--sage-xlight)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>How we support you</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "3rem" }}>What makes our training different</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                {
                  accent: "#C9A84C",
                  title: "Research-led, practical learning",
                  body: "Our training is grounded in current research, evidence and lived experience; translating complex inclusion topics into practical learning that people can apply in their everyday roles. We bring together evidence, expertise and real-world examples to make the learning both credible and relevant.",
                },
                {
                  accent: "#4a8a5c",
                  title: "Interactive and thought-provoking",
                  body: "Through discussion, reflection, scenarios and interactive activities, we create space for people to question assumptions and explore what inclusion looks like in practice. Our sessions encourage curiosity, challenge thinking and give people the confidence to engage with conversations that can sometimes feel difficult.",
                },
                {
                  accent: "#4a6080",
                  title: "From insight to action",
                  body: "We help organisations move beyond good intentions by connecting learning to the systems, behaviours and decisions that shape people's experiences at work. Participants leave with practical ideas, greater awareness and a clearer understanding of what they can do differently.",
                },
              ].map((p) => (
                <div key={p.title} style={{ background: "var(--white)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ height: "5px", background: p.accent }} />
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.875rem" }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.75, opacity: 0.85 }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINING OFFER */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>What we cover</span>
            <h2 id="training-offer" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "0.75rem" }}>Specialist training areas</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", opacity: 0.75, textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.7 }}>We offer training across a wide range of EDI topics. If you don't see exactly what you need, we can design something just for you.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { title: "EDI Foundations", desc: "An accessible introduction to equity, diversity and inclusion for all staff; covering key concepts, the legal framework, and what inclusion looks like in practice." },
                { title: "Inclusive Leadership", desc: "For senior leaders and people managers; building the knowledge and confidence to lead with inclusion, address bias, and create psychologically safe teams." },
                { title: "Unconscious Bias and Allyship", desc: "Exploring how bias shows up in the workplace and what individuals can do to become active allies for their colleagues." },
                { title: "Anti-Racist Practice", desc: "A courageous, evidence-based programme on racism in the workplace; what it looks like, how to name it, and how to challenge it effectively." },
                { title: "Inclusive Recruitment", desc: "Practical training for hiring managers and HR teams on removing bias from every stage of the recruitment process." },
                { title: "Bespoke Programmes", desc: "We work with you to design a training programme built entirely around your organisation's context, data and goals." },
              ].map((item) => (
                <div key={item.title} style={{ background: "var(--sage-xlight)", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(74,138,92,0.15)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.7, opacity: 0.85 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--sage-xlight)", borderRadius: "16px", padding: "2rem 2.5rem", border: "1px solid rgba(74,138,92,0.15)", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.25rem", opacity: 0.9 }}>
                We offer training across a wide range of EDI topics. From specialised workshops to tailored training sessions, we cover many more areas beyond our standard list. Book a curiosity call to discuss your unique needs and explore how we can create a training programme that works perfectly for your organisation.
              </p>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Book a curiosity call</Link>
            </div>
          </div>
        </section>

        {/* TRAINING THAT FITS YOUR TEAM */}
        <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem", textAlign: "center" }}>Delivery</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--white)", textAlign: "center", marginBottom: "1.25rem" }}>Inclusion training that fits your team</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.8)", textAlign: "center", maxWidth: "640px", margin: "0 auto 3rem", lineHeight: 1.75 }}>
              Our training and workshops can be delivered online or in person; tailored to your schedule, accessibility needs and organisational setup. We are based in the UK, frequently spend time in Bermuda, and are available to travel worldwide to support organisations wherever they are.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {[
                { src: "/training-photo-1.jpg", alt: "Rebekah delivering an inclusion training session" },
                { src: "/training-photo-2.jpg", alt: "Rebekah presenting at a training event" },
                { src: "/training-photo-3.jpg", alt: "Rebekah facilitating an inclusion workshop" },
                { src: "/training-photo-4.jpg", alt: "Rebekah speaking at a training session" },
              ].map((photo) => (
                <div key={photo.src} style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "3/4" }}>
                  <Image src={photo.src} alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ position: "relative", padding: "5rem 1.5rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }} >
  <Image src="/team-meeting.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
</div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(232,238,230,0.93)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", textAlign: "center" }}>What people say</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "3rem" }}>Participant feedback</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[
                { quote: "Rebekah is a well-organised, methodical instructor; her approach is warm and friendly. The sequence of the session was clear and each section built on the last, with some great practical tips.", name: "Caroline Starling", org: "MSA" },
                { quote: "Rebekah demonstrated strong facilitation skills throughout the session. She created a safe and inclusive learning environment where participants felt comfortable sharing their perspectives. Her communication style was clear, respectful, and she maintained excellent energy and focus across all discussions.", name: "Portia Slater", org: "The Berkeley School" },
                { quote: "Rebekah is very knowledgeable on inclusion topics and good at explaining ideas and connecting to comments made by participants. Rebekah is always great at making participants feel comfortable.", name: "Nea Moore", org: "Saltus" },
              ].map((t) => (
                <div key={t.name} style={{ background: "var(--white)", borderRadius: "16px", padding: "2.25rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--sage-dark)", opacity: 0.35, lineHeight: 1, marginBottom: "1rem" }}>&ldquo;</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--charcoal)", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", marginBottom: "0.2rem" }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--charcoal)", opacity: 0.65 }}>{t.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#1A3220", padding: "5rem 1.5rem", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>Get started</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--white)", marginBottom: "1rem" }}>Ready to book training for your team?</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>Tell us about your team and your goals and we will design a training programme that fits.</p>
          <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#1A3220", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none" }}>Book a call</Link>
        </section>

        <Footer />
      </main>
    </div>
  );
}
