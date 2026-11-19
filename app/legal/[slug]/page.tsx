import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import Footer from "../../components/Footer";
import LegalHero from "../LegalHero";
import { POLICIES, getPolicy, CONTACT_EMAIL, type Block } from "@/lib/legal";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPolicy(slug);
  return p ? { title: `${p.title} | The Inclusion Edit`, description: p.summary } : {};
}

function renderBlock(b: Block, i: number) {
  if (typeof b === "string") {
    return <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#1C1C1C", lineHeight: 1.8, margin: "0 0 1rem" }}>{b}</p>;
  }
  return (
    <ul key={i} style={{ margin: "0 0 1.1rem", paddingLeft: "1.25rem" }}>
      {b.list.map((item) => <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#1C1C1C", lineHeight: 1.75, marginBottom: "0.45rem" }}>{item}</li>)}
    </ul>
  );
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />
      <main id="main-content">
        <LegalHero eyebrow="Policies and legal" title={policy.title} updated={policy.updated} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 4.5rem" }}>
          <nav aria-label="Breadcrumb" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1.75rem" }}>
            <Link href="/legal" style={{ color: "#4A6347" }}>All policies</Link>
            <span aria-hidden="true" style={{ color: "#4B5B4E", margin: "0 0.5rem" }}>/</span>
            <span aria-current="page" style={{ color: "#4B5B4E" }}>{policy.title}</span>
          </nav>

          <div className="legal-layout" style={{ display: "grid", gridTemplateColumns: "240px minmax(0, 1fr)", gap: "3rem", alignItems: "start" }}>
            <nav aria-label="On this page" className="legal-contents" style={{ position: "sticky", top: "96px" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#4B5B4E", margin: "0 0 0.75rem" }}>On this page</p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, borderLeft: "2px solid #DCE5DE" }}>
                {policy.sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="legal-toc" style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.88rem", color: "#4A6347", textDecoration: "none", padding: "0.4rem 0 0.4rem 0.9rem", lineHeight: 1.4 }}>{s.heading}</a></li>
                ))}
              </ol>
            </nav>

            <article style={{ maxWidth: "720px" }}>
              <div style={{ background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 55%, #E2EFE2 100%)", border: "1.5px solid rgba(107,143,113,0.35)", borderRadius: "18px", padding: "1.5rem 1.6rem 1.25rem", marginBottom: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--forest)", margin: "0 0 0.75rem" }}>At a glance</h2>
                <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                  {policy.glance.map((g) => <li key={g} style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "#1C1C1C", lineHeight: 1.7, marginBottom: "0.4rem" }}>{g}</li>)}
                </ul>
              </div>

              {policy.sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} style={{ scrollMarginTop: "96px", marginBottom: "2.25rem" }}>
                  <h2 id={`${s.id}-h`} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--forest)", margin: "0 0 0.9rem", lineHeight: 1.2 }}>{s.heading}</h2>
                  {s.body.map(renderBlock)}
                </section>
              ))}

              <div style={{ borderTop: "1px solid #DCE5DE", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#4B5B4E", margin: 0 }}>Questions? Email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#4A6347", fontWeight: 700 }}>{CONTACT_EMAIL}</a></p>
                <Link href="/legal" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#4A6347" }}>See All Policies</Link>
              </div>
            </article>
          </div>
        </div>
        <style>{`
          .legal-toc:hover { text-decoration: underline; text-underline-offset: 3px; }
          @media (max-width: 860px) {
            .legal-layout { grid-template-columns: minmax(0, 1fr) !important; gap: 1.5rem !important; }
            .legal-contents { position: static !important; }
          }
          @media print { .legal-contents, header, footer, .a11y-toolbar { display: none !important; } }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
