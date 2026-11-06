import Footer from "../components/Footer";
import Link from "next/link";
export default function PrivacyPage() {
  return (
    <>
    <div className="min-h-screen" style={{ background: "var(--white)", maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Link href="/" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Home</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--charcoal)", margin: "1rem 0" }}>Privacy Policy</h1>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal-mid)", lineHeight: 1.8 }}>
        The Inclusion Edit collects only the data necessary to provide our services. We do not sell your data to third parties. All personal data is stored securely and in line with UK GDPR. For full details or to exercise your rights, contact us at info@theinclusionedit.com.
      </p>
    </div>
    <Footer />
    </>
  );
}
