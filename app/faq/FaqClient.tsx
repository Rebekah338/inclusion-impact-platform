"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";

export default function FaqClient({ grouped }: { grouped: { category: string; items: any[] }[] }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main>
        <section style={{ background: "var(--sage-dark)", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-light)", marginBottom: "1rem" }}>Got questions?</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--white)", lineHeight: 1.1, marginBottom: "1.25rem" }}>We have answers.</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75 }}>Everything you need to know about working with The Inclusion Edit; from consultancy and training to the Impact Platform.</p>
          </div>
        </section>

        <section style={{ padding: "4rem 1.5rem", background: "var(--white)" }}>
          <div style={{ maxWidth: "740px", margin: "0 auto" }}>
            {grouped.map((group) => (
              <div key={group.category} style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "2px solid var(--sage-xlight)" }}>{group.category}</h2>
                {group.items.map((item) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div key={item.id} style={{ borderBottom: "1px solid var(--gray-border)" }}>
                      <button onClick={() => setOpenItem(isOpen ? null : item.id)}
                        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.4 }}>{item.question}</span>
                        <span style={{ fontSize: "1.25rem", color: "var(--sage-dark)", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                      </button>
                      {isOpen && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.8, opacity: 0.8, paddingBottom: "1.25rem", margin: 0 }}>{item.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--sage-dark)", padding: "4rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "540px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--white)", marginBottom: "1rem" }}>Still have a question?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: "2rem" }}>We would love to hear from you. Get in touch and we will get back to you as soon as possible.</p>
            <Link href="/contact-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>Get in touch</Link>
          </div>
        </section>
      </main>
          <Footer />
    </div>
  );
}
