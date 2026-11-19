import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "../components/Footer";
import LegalHero from "./LegalHero";
import { POLICIES, CONTACT_EMAIL } from "@/lib/legal";

export const metadata = {
  title: "Policies and Legal | The Inclusion Edit",
  description: "Our privacy, cookie, website, membership, community, AI and accessibility policies, all in one place.",
};

export default function LegalHub() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main id="main-content">
        <LegalHero eyebrow="Policies and legal" title="Our Policies" intro="Everything about how we work, how we look after your information and the terms for using our website and the Impact Platform." />

        <section style={{ padding: "3.5rem 1.5rem 4.5rem", background: "linear-gradient(160deg, #FFFFFF 0%, #FDFAF5 60%, #FAF6EE 100%)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
            {POLICIES.map((p) => (
              <Link key={p.slug} href={`/legal/${p.slug}`} className="legal-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", border: "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", padding: "1.6rem 1.6rem 1.4rem", boxShadow: "0 1px 3px rgba(26,50,32,0.08)", transition: "box-shadow 0.2s, transform 0.2s" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--forest)", margin: "0 0 0.5rem" }}>{p.title}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#4B5B4E", lineHeight: 1.6, margin: "0 0 1.1rem", flex: 1 }}>{p.summary}</p>
                <span className="legal-card-action" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "#4A6347" }}>Read the {p.title}</span>
              </Link>
            ))}
          </div>
          <p style={{ maxWidth: "1100px", margin: "2.5rem auto 0", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#4B5B4E", lineHeight: 1.7 }}>
            Questions about any of our policies? Email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#4A6347", fontWeight: 700 }}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
        <style>{`.legal-card:hover{box-shadow:0 4px 20px rgba(26,50,32,0.12)!important;transform:translateY(-2px)} .legal-card:hover .legal-card-action{text-decoration:underline;text-underline-offset:3px} .legal-card:focus-visible{outline:3px solid #4A6347;outline-offset:3px}`}</style>
      </main>
      <Footer />
    </div>
  );
}
