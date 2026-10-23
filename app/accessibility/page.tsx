import Link from "next/link";
export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--white)", maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Link href="/" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>← Home</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "var(--charcoal)", margin: "1rem 0" }}>Accessibility Statement</h1>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal-mid)", lineHeight: 1.8 }}>
        The Impact Platform is committed to WCAG 2.1 AA accessibility standards. We provide text-to-speech on all module content, a dyslexia-friendly font option, keyboard navigation, screen reader compatible markup, and sufficient colour contrast throughout. If you experience any accessibility issues, please contact us at hello@theinclusionedit.com.
      </p>
    </div>
  );
}
