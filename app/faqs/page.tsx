"use client";
import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";

const FAQS = [
  {
    category: "About the Impact Platform",
    questions: [
      {
        q: "What is the Impact Platform?",
        a: "The Impact Platform is The Inclusion Edit's membership hub for organisations that want to build genuine inclusion capability. Members get access to a growing library of practical, research-informed learning modules, Inclusion AI tools, bespoke resources, and expert consultancy content; everything you need to move from good intentions to real, measurable change.",
      },
      {
        q: "How is the Impact Platform different from just hiring an EDI consultant?",
        a: "Consultancy gives you expert input at a point in time. The Impact Platform gives your team the knowledge, tools and resources to keep building capability between those moments; and when you need expert support, we are right here. Many of our members use both: the platform for day-to-day capability building and our consultancy for strategy, audits and bespoke delivery.",
      },
      {
        q: "Who is the membership for?",
        a: "The platform is designed for anyone leading or supporting equity, diversity and inclusion work: HR and People professionals, inclusion leads, managers, senior leadership teams and small to mid-sized businesses. Your membership covers organisational use, so you can share resources internally for training and development. External sharing or resale is not permitted.",
      },
      {
        q: "Is the platform available outside the UK?",
        a: "Yes. Everything we offer is available worldwide. Our members are based across the UK, Bermuda and the US, and we design all content to be relevant across jurisdictions. Training and consultancy sessions can be delivered virtually or in person; pricing for in-person delivery is adjusted based on location and travel costs.",
      },
    ],
  },
  {
    category: "Membership and pricing",
    questions: [
      {
        q: "What is included in my membership?",
        a: "Every membership tier includes full access to all platform learning modules, Inclusion AI tools, our practical resource library, priority invites to workshops and live sessions, and discounts on consultancy and bespoke training. Growing Teams and Established Organisations memberships also include unlimited new starter onboarding access and a dedicated onboarding session with our team.",
      },
      {
        q: "How much does membership cost?",
        a: "Membership starts at \u00a3249 per year for Individual Practitioners. Growing Teams membership is \u00a32,400 per year; Established Organisations is \u00a34,800 per year. All tiers are annual, with no per-seat charges. See our pricing page for a full comparison of what is included at each level.",
      },
      {
        q: "Is there a free trial or taster?",
        a: "We do not currently offer a self-serve free trial. If you would like to see the platform before committing, book a free curiosity call and we will walk you through everything, answer your questions and help you decide whether it is the right fit for your organisation.",
      },
      {
        q: "Can I cancel my membership?",
        a: "Yes. Membership renews annually, but you can cancel at any time before your next renewal date by emailing us. We require three working days to process your cancellation request. Once cancelled, you keep full access until the end of your current membership period.",
      },
      {
        q: "How often is new content added?",
        a: "New modules, tools and resources are added regularly throughout the year so your membership always stays fresh, relevant and valuable. Members are notified when new content goes live.",
      },
    ],
  },
  {
    category: "Our consultancy and training",
    questions: [
      {
        q: "What consultancy services do you offer?",
        a: "We offer a full range of EDI consultancy including inclusion audits, strategy development, policy reviews, bespoke training and workshop design, and ongoing advisory support. All work is grounded in evidence, lived experience and practical implementation; we do not do tick-box EDI.",
      },
      {
        q: "What makes your resources and training different?",
        a: "Everything we create comes from an experienced EDI consultant with a background in education, social justice and research. Our content is practical, evidence-based and designed for real organisational contexts; not generic frameworks or surface-level checklists. Where relevant, resources include supporting legislation guidance and industry standards to deepen your understanding.",
      },
      {
        q: "Can training and consultancy be delivered remotely?",
        a: "Yes. All of our training and consultancy can be delivered fully remotely via video call. In-person delivery is also available; please get in touch to discuss your requirements and we will confirm availability and any associated travel costs.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(openKey === key ? null : key);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
        <section style={{ position: "relative", minHeight: "480px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/contact hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5.5rem 2rem 5rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Frequently asked questions</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)", color: "var(--white)", margin: "0 0 1.5rem", lineHeight: 1.08 }}>Got questions? We have got answers.</h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.8, marginBottom: "2.25rem" }}>Everything you need to know about the Impact Platform, our membership, and our consultancy and training services. Can't find what you're looking for? Get in touch.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="#faqs" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Browse questions</Link>
                <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Contact us</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" style={{ padding: "5rem 2rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {FAQS.map((section) => (
              <div key={section.category} style={{ marginBottom: "3.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", color: "var(--forest)", margin: "0 0 1.5rem", lineHeight: 1.15 }}>{section.category}</h2>
                {section.questions.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} style={{ borderTop: i === 0 ? "1px solid var(--line, #DCE5DE)" : "none", borderBottom: "1px solid var(--line, #DCE5DE)" }}>
                      <button onClick={() => toggle(key)} aria-expanded={isOpen} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.4 }}>{item.q}</span>
                        <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: isOpen ? "var(--forest)" : "var(--sage-xlight, #E8F0E9)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                            <path d="M2 4L6 8L10 4" stroke={isOpen ? "white" : "var(--sage-dark)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div style={{ paddingBottom: "1.25rem" }}>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--slate, #4B5B4E)", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "5rem 2rem", background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(107,143,113,0.12)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>Still have questions?</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--forest)", margin: "0 0 1rem", lineHeight: 1.15 }}>Haven't found what you need?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--slate, #4B5B4E)", lineHeight: 1.8, margin: "0 0 2.5rem" }}>Send us a message and we will get back to you shortly. Or if you'd like to talk through whether the platform or our consultancy is right for your organisation, book a free curiosity call.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--forest)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Send us a message</Link>
              <Link href="/contact-us#book-a-call" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--forest)", background: "transparent", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid var(--forest)", whiteSpace: "nowrap" }}>Book a curiosity call</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
