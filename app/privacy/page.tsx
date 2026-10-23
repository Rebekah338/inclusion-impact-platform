import Link from "next/link";
export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--white)", maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Link href="/" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Home</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--charcoal)", margin: "1rem 0" }}>Privacy Policy</h1>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal-mid)", lineHeight: 1.8 }}>
        Your privacy policy goes here. The Inclusion Edit collects only the data needed to run your membership — your name, email, and learning progress. We do not sell your data. Full policy coming soon. Contact: hello@theinclusionedit.com
      </p>
    </div>
  );
}
