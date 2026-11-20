"use client";
import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { BOOKING_URL, bookingLink } from "@/lib/booking";
import TrustStrip from "../components/TrustStrip";
import Footer from "../components/Footer";

type FaqLink = { label: string; href: string; external?: boolean };
type Faq = { q: string; a: string; links?: FaqLink[] };
type FaqGroup = { id: string; pill: string; action: string; category: string; intro: string; questions: Faq[] };

const FAQS: FaqGroup[] = [
  {
    id: "impact-platform",
    pill: "The Impact Platform",
    action: "What it is and when it launches",
    category: "About the Impact Platform",
    intro: "What it is, who it is for and when you can join.",
    questions: [
      {
        q: "What is the Impact Platform?",
        a: "The Impact Platform is The Inclusion Edit's membership for the people leading inclusion and their organisations. Members get 40 lessons, 45 practical tools, Inclusion AI tools, expert videos, research and case studies, and real expert support, all in one place. It keeps growing, with new resources added every month, so you always have what you need to move from good intentions to real, measurable change. You will see what is new each time you log in.",
        links: [{ label: "Explore the Impact Platform", href: "/about-our-impact-platform" }],
      },
      {
        q: "When does the platform launch?",
        a: "We launch in January 2027, when our first group of 10 members is onboarded. After that, we open in small groups of 10, in the order people join the early access list, so everyone gets a proper welcome. Join the list and we will email you when it is your turn.",
        links: [{ label: "Join the Early Access List", href: "/early-access" }],
      },
      {
        q: "How is the Impact Platform different from just hiring an EDI consultant?",
        a: "Consultancy gives you expert input at a point in time. The Impact Platform gives your team the knowledge, tools and resources to keep building capability between those moments, and when you need expert support, we are right here. The two work well together: the platform for day-to-day capability building, and our consultancy for strategy, audits and bespoke delivery.",
        links: [{ label: "Book a Free Inclusion Call", href: BOOKING_URL, external: true }],
      },
      {
        q: "Who is the membership for?",
        a: "The platform is built for the people leading inclusion in their organisation: the person responsible for it, or carrying most of the work, whether it is in their job title or something they do alongside the day job. That includes inclusion leads and specialists, HR and People professionals, employee network and ERG leads, managers and senior leaders. Individual memberships are for one person. Organisation memberships give your team named full seats, plus onboarding for your new starters. You can share resources internally for training and development; external sharing or resale is not permitted.",
        links: [{ label: "Compare Memberships", href: "/pricing" }],
      },
      {
        q: "Is the platform available worldwide?",
        a: "Yes. We work with organisations worldwide, and we design all content to be relevant across jurisdictions. Any research, case study or legal guidance on the platform clearly states which jurisdiction it relates to, so you never have to guess. The platform is fully online, and the expert sessions and 1:1 calls in your membership take place by video call, so you can join from wherever you are.",
        links: [{ label: "Join the Early Access List", href: "/early-access" }],
      },
    ],
  },
  {
    id: "membership-and-pricing",
    pill: "Membership & Pricing",
    action: "Costs, payment and cancelling",
    category: "Membership and Pricing",
    intro: "What each membership includes, what it costs and how payment works.",
    questions: [
      {
        q: "What is included in my membership?",
        a: "It depends on your membership. Individual includes the full resource library, all lessons across the three pathways, templates and guides, progress tracking and the Inclusion Editors community, where members ask questions, share what works and learn from each other. Practitioner Plus adds the Inclusion AI tools, advanced resources and a full inclusion health check and action plan. The Expert Track adds a guaranteed monthly 1:1 with Rebekah all year. Organisation memberships include named full seats with everything in Practitioner Plus, office hours with an inclusion expert, completion reporting and certificates, and onboarding for new starters at no extra charge: up to 25 a year on Small Teams, 50 on Growing Teams, 200 on Established Teams and unlimited on Enterprise. You choose an organisation membership by how many people will use it, not by the size of your organisation.",
        links: [{ label: "Compare Memberships", href: "/pricing" }],
      },
      {
        q: "How much does membership cost?",
        a: "Individual membership is £345 a year or £34 a month, Practitioner Plus is £495 a year or £49 a month, and the Expert Track is £1,800 a year. Organisation memberships come in seat packs: Small Teams is £1,750 a year for 5 full seats, Growing Teams is £2,950 for 10, Established Teams is £5,500 for 25, and Enterprise starts from £8,500 for 50 or more. Organisation memberships are billed yearly, and new starters are included at no extra charge. Join through early access and your price stays the same for your first two renewals. See our pricing page for a full comparison of what is included at each level.",
        links: [{ label: "Compare Memberships", href: "/pricing" }],
      },
      {
        q: "How do I pay for my membership?",
        a: "Payments are taken securely through Stripe, which accepts payments from around the world. If you have any difficulty paying online, or your organisation prefers to pay by invoice, please get in touch and we will arrange an invoice for your membership.",
        links: [{ label: "Contact Us", href: "/contact-us" }],
      },
      {
        q: "Is there a free trial or taster?",
        a: "We do not currently offer a free trial. If you would like to see the platform before committing, book a free inclusion call and we will walk you through everything, answer your questions and help you decide whether it is the right fit. Or join the early access list to be first in when we open.",
        links: [
          { label: "Book a Free Inclusion Call", href: BOOKING_URL, external: true },
          { label: "Join the Early Access List", href: "/early-access" },
        ],
      },
      {
        q: "Can I cancel my membership?",
        a: "Yes. Membership is billed yearly, and you can cancel at the end of each year if you wish: just email us before your renewal date. You keep full access until the end of your current membership year.",
        links: [{ label: "Contact Us", href: "/contact-us" }],
      },
    ],
  },
  {
    id: "consultancy-and-training",
    pill: "Consultancy & Training",
    action: "How we work with you",
    category: "Our Consultancy and Training",
    intro: "How we work with organisations, wherever they are.",
    questions: [
      {
        q: "What consultancy services do you offer?",
        a: "We offer a full range of EDI consultancy including inclusion audits, strategy development, policy reviews, bespoke training and workshop design, and ongoing advisory support. All work is grounded in evidence, lived experience and practical implementation.",
        links: [{ label: "See Our Consultancy Programmes", href: "/edi-consultancy-programmes" }],
      },
      {
        q: "What makes your resources and training different?",
        a: "Everything we create comes from our team of EDI consultants, with over 40 years of combined experience in inclusion, a wide range of professional backgrounds, our own lived experience and our own research. When we work with you, we start by listening: we take the time to understand your organisation, your people and the challenges you face, then shape everything we deliver around them. Our training, consultancy and bespoke resources are tailored to your needs, so you get practical, evidence-based support that works in your context and gets you the best results. Where relevant, resources include supporting legislation guidance and industry standards to deepen your understanding.",
        links: [{ label: "Book a Free Inclusion Call", href: BOOKING_URL, external: true }],
      },
      {
        q: "Do you deliver training and consultancy worldwide?",
        a: "Yes. We work with organisations worldwide, and all of our training and consultancy can be delivered remotely by video call. In-person delivery is also available: get in touch to discuss your requirements and we will confirm availability. Pricing for in-person delivery is adjusted based on location and travel costs.",
        links: [{ label: "See Our Training", href: "/edi-training" }],
      },
      {
        q: "Do you speak at events?",
        a: "Yes. We deliver keynotes and sit on panels for HR and People teams, senior leaders, people managers and education leads, drawing on lived experience, research and practical experience. We also host and co-host webinars, virtual roundtables and online learning events, and partner with organisations on conferences and sector events.",
        links: [{ label: "See How We Can Support Your Event", href: "/contact-us#speaking-and-events" }],
      },
    ],
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((g) =>
    g.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

const FAQ_CSS = `
  .faq-q:hover .faq-q-text { color: #4A6347; }
  .faq-q:focus-visible, .faq-action:focus-visible, .faq-band-btn:focus-visible { outline: 3px solid #4A6347; outline-offset: 2px; border-radius: 8px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .faq-action { text-decoration: none; }
  .faq-action:hover { text-decoration: underline; text-underline-offset: 3px; }
  @media (max-width: 640px) { .faq-panel { padding: 1.75rem 1.25rem !important; } .faq-band { padding: 2rem 1.5rem !important; } }
`;

export default function FAQsPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(openKey === key ? null : key);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main id="main-content">
        <section style={{ position: "relative", minHeight: "440px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/question.jpg')", backgroundSize: "cover", backgroundPosition: "center 65%", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "3.5rem 2rem 3rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Frequently asked questions</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--white)", margin: "0 0 1.25rem", lineHeight: 1.1 }}>Got Questions? We Have Got Answers.</h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.8 }}>Everything you need to know about the Impact Platform, our membership, and our consultancy and training services. Can't find what you're looking for? Get in touch.</p>
            </div>
          </div>
        </section>

        <TrustStrip
          variant="links"
          ariaLabel="FAQ topics"
          items={[
            ...FAQS.map((g) => ({ value: g.pill, label: g.action, href: `#${g.id}` })),
            { value: "Still Have Questions?", label: "Contact us or book a call", href: "#still-have-questions" },
          ]}
        />

        <section id="faqs" style={{ padding: "3.5rem 2rem 5rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)", scrollMarginTop: "80px" }}>
          <style>{FAQ_CSS}</style>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {FAQS.map((section, si) => (
              <div key={section.id}>
                <div id={section.id} className="faq-panel" style={{ background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", border: "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", padding: "2.25rem 2.5rem", marginBottom: "2rem", boxShadow: "0 4px 20px rgba(26,50,32,0.08)", scrollMarginTop: "90px" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", color: "var(--forest)", margin: "0 0 0.4rem", lineHeight: 1.15 }}>{section.category}</h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#4B5B4E", margin: "0 0 1.5rem", lineHeight: 1.6 }}>{section.intro}</p>
                  {section.questions.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div key={key} style={{ borderTop: i === 0 ? "1px solid #CFDDD1" : "none", borderBottom: "1px solid #CFDDD1", background: isOpen ? "rgba(255,255,255,0.85)" : "transparent", borderRadius: isOpen ? "12px" : 0, transition: "background 0.2s" }}>
                        <button className="faq-q" onClick={() => toggle(key)} aria-expanded={isOpen} aria-controls={`${key}-answer`} id={`${key}-question`} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1.15rem 0.85rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                          <span className="faq-q-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: isOpen ? "#4A6347" : "var(--charcoal)", lineHeight: 1.4, transition: "color 0.2s" }}>{item.q}</span>
                          <span aria-hidden="true" style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: isOpen ? "var(--forest)" : "#FFFFFF", border: isOpen ? "none" : "1.5px solid rgba(107,143,113,0.45)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                              <path d="M2 4L6 8L10 4" stroke={isOpen ? "white" : "var(--sage-dark)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                        {isOpen && (
                          <div id={`${key}-answer`} role="region" aria-labelledby={`${key}-question`} style={{ padding: "0 0.85rem 1.25rem" }}>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "#4B5B4E", lineHeight: 1.8, margin: 0 }}>{item.a}</p>
                            {item.links && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", marginTop: "0.85rem" }}>
                                {item.links.map((l) =>
                                  l.external ? (
                                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="faq-action" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "#4A6347" }}>{l.label}<span className="sr-only"> (opens in a new tab)</span></a>
                                  ) : (
                                    <Link key={l.label} href={l.href} className="faq-action" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "#4A6347" }}>{l.label}</Link>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {si === 1 && (
                  <div className="faq-band" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", borderRadius: "18px", padding: "2.5rem 2.75rem", margin: "0.5rem 0 2.5rem", boxShadow: "0 6px 28px rgba(42,74,48,0.22)" }}>
                    <div aria-hidden="true" style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                    <p style={{ position: "relative", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#E2C265", margin: "0 0 0.75rem" }}>Your next step</p>
                    <h2 style={{ position: "relative", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3.2vw, 2rem)", color: "#FFFFFF", margin: "0 0 0.75rem", lineHeight: 1.15 }}>Ready to stop carrying inclusion alone?</h2>
                    <p style={{ position: "relative", fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.88)", margin: "0 0 1.75rem", lineHeight: 1.7, maxWidth: "560px" }}>Join the early access list to be first in when we launch, or book a free inclusion call to talk through what would help you most.</p>
                    <div style={{ position: "relative", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <Link href="/early-access" className="faq-band-btn" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#4A6347", background: "#FFFFFF", padding: "0.875rem 1.75rem", borderRadius: "8px", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>Join Early Access</Link>
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="faq-band-btn" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", padding: "0.875rem 1.75rem", borderRadius: "8px", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>Book a Free Inclusion Call<span className="sr-only"> (opens in a new tab)</span></a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="still-have-questions" style={{ scrollMarginTop: "80px", padding: "5rem 2rem", background: "linear-gradient(160deg, #E3EEE4 0%, #D6E6D8 55%, #C8DDCB 100%)" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(107,143,113,0.12)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>Still have questions?</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--forest)", margin: "0 0 1rem", lineHeight: 1.15 }}>Haven't found what you need?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--slate, #4B5B4E)", lineHeight: 1.8, margin: "0 0 2.5rem" }}>Send us a message and we will get back to you shortly. Or if you'd like to talk through whether the platform or our consultancy is right for your organisation, book a free inclusion call.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--forest)", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Send Us a Message</Link>
              <a href={bookingLink()} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--forest)", background: "transparent", padding: "0.875rem 1.875rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid var(--forest)", whiteSpace: "nowrap" }}>Book a Free Inclusion Call<span className="a11y-sr"> (opens in a new tab)</span></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
