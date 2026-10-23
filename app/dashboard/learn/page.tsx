import Link from "next/link";

const pathways = [
  {
    id: "people-culture",
    title: "People & Culture",
    color: "var(--sage)",
    bg: "var(--sage-light)",
    icon: "🤝",
    modules: [
      { id: "psychological-safety", title: "Psychological Safety", duration: "45 min", cpd: "0.75 hrs" },
      { id: "belonging", title: "Belonging at Work", duration: "50 min", cpd: "0.75 hrs" },
      { id: "allyship", title: "Active Allyship", duration: "40 min", cpd: "0.75 hrs" },
      { id: "microaggressions", title: "Microaggressions & Micro-affirmations", duration: "55 min", cpd: "1 hr" },
      { id: "power-privilege", title: "Power & Privilege", duration: "60 min", cpd: "1 hr" },
      { id: "unconscious-bias", title: "Unconscious Bias", duration: "50 min", cpd: "0.75 hrs" },
      { id: "inclusive-language", title: "Inclusive Language", duration: "40 min", cpd: "0.75 hrs" },
      { id: "cultural-competence", title: "Cultural Competence", duration: "55 min", cpd: "1 hr" },
    ],
  },
  {
    id: "systems-processes",
    title: "Systems & Processes",
    color: "#7b6fa0",
    bg: "#f0eef8",
    icon: "⚙️",
    modules: [
      { id: "inclusive-recruitment", title: "Inclusive Recruitment", duration: "60 min", cpd: "1 hr" },
      { id: "pay-gap-reporting", title: "Pay Gap Reporting & Analysis", duration: "55 min", cpd: "1 hr" },
      { id: "edi-data", title: "Collecting & Using EDI Data", duration: "50 min", cpd: "0.75 hrs" },
      { id: "policy-audit", title: "Policy Auditing for Inclusion", duration: "45 min", cpd: "0.75 hrs" },
      { id: "reasonable-adjustments", title: "Reasonable Adjustments", duration: "50 min", cpd: "0.75 hrs" },
      { id: "complaints-process", title: "Inclusive Complaints Processes", duration: "45 min", cpd: "0.75 hrs" },
      { id: "supplier-diversity", title: "Supplier Diversity", duration: "40 min", cpd: "0.75 hrs" },
      { id: "equality-impact", title: "Equality Impact Assessments", duration: "55 min", cpd: "1 hr" },
      { id: "menopause-policy", title: "Menopause & Workplace Policy", duration: "45 min", cpd: "0.75 hrs" },
      { id: "neuroinclusivity", title: "Neuroinclusion in Practice", duration: "50 min", cpd: "0.75 hrs" },
    ],
  },
  {
    id: "leadership-strategy",
    title: "Leadership & Strategy",
    color: "#b07d4a",
    bg: "#fdf3e8",
    icon: "🎯",
    modules: [
      { id: "edi-strategy", title: "Building an EDI Strategy", duration: "70 min", cpd: "1.25 hrs" },
      { id: "stakeholder-engagement", title: "Stakeholder Engagement for EDI", duration: "55 min", cpd: "1 hr" },
      { id: "roi-inclusion", title: "The ROI of Inclusion", duration: "60 min", cpd: "1 hr" },
      { id: "board-accountability", title: "Board-Level Accountability", duration: "50 min", cpd: "0.75 hrs" },
      { id: "intersectionality", title: "Intersectionality in Practice", duration: "65 min", cpd: "1 hr" },
      { id: "edi-governance", title: "EDI Governance Frameworks", duration: "55 min", cpd: "1 hr" },
      { id: "anti-racism", title: "Anti-Racism in Organisations", duration: "70 min", cpd: "1.25 hrs" },
      { id: "change-management", title: "Change Management for Inclusion", duration: "60 min", cpd: "1 hr" },
      { id: "measuring-impact", title: "Measuring Inclusion Impact", duration: "55 min", cpd: "1 hr" },
      { id: "psychological-contract", title: "The Psychological Contract", duration: "50 min", cpd: "0.75 hrs" },
      { id: "edi-communications", title: "Communicating EDI Internally", duration: "45 min", cpd: "0.75 hrs" },
      { id: "resilience-wellbeing", title: "EDI & Workplace Wellbeing", duration: "50 min", cpd: "0.75 hrs" },
      { id: "global-edi", title: "Global EDI — Cross-Cultural Contexts", duration: "65 min", cpd: "1 hr" },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>
            ← Back to dashboard
          </Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
            Learn
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>
            31 CPD-accredited modules across three learning pathways. Complete each module to earn your certificate.
          </p>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {pathways.map((pathway) => (
          <section key={pathway.id} style={{ marginBottom: "3rem" }} aria-labelledby={`pathway-${pathway.id}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "1rem 1.25rem", background: pathway.bg, borderRadius: "10px" }}>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">{pathway.icon}</span>
              <div>
                <h2 id={`pathway-${pathway.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", margin: 0 }}>
                  {pathway.title}
                </h2>
                <span style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                  {pathway.modules.length} modules
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {pathway.modules.map((mod, idx) => (
                <Link key={mod.id} href={`/dashboard/learn/${mod.id}`} className="card" style={{ textDecoration: "none", display: "block", position: "relative" }}>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "28px", height: "28px", borderRadius: "50%", background: "var(--gray-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--gray-soft)" }} aria-hidden="true">
                    {idx + 1}
                  </div>
                  <div style={{ paddingRight: "2rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                      {mod.title}
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>⏱ {mod.duration}</span>
                      <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{mod.cpd} CPD</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.875rem" }}>
                    <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "0%" }} /></div>
                  </div>
                  <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: pathway.color }}>
                    Start module →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
