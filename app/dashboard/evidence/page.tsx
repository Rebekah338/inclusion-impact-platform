"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const RESEARCH_REPORTS = [
  {
    id: "mckinsey-diversity-wins",
    icon: "📊",
    title: "McKinsey Diversity Wins Report",
    year: "2023",
    source: "McKinsey and Company",
    desc: "Companies in the top quartile for gender diversity are 25% more likely to have above-average profitability. The data on ethnic and cultural diversity is even stronger.",
    tags: ["data", "business case", "diversity", "profitability"],
    type: "Research Report",
    url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters",
    about: "McKinsey's Diversity Wins report analysed data from more than 1,000 large companies across 15 countries. It set out to examine the relationship between leadership diversity and financial performance, moving beyond earlier correlation findings to look at what inclusion actually requires and what most organisations still get wrong.",
    findings: [
      "Companies in the top quartile for gender diversity on executive teams are 25% more likely to achieve above-average profitability than peer companies.",
      "Companies in the top quartile for ethnic and cultural diversity outperform those in the bottom quartile by 36% in profitability.",
      "Despite progress, only 1 in 20 companies globally has closed the representation gap at senior leadership level.",
      "Inclusion has a stronger direct link to financial performance than diversity representation alone. Diverse teams without inclusive cultures do not outperform.",
      "The most common barriers to inclusion are microaggressions, lack of sponsorship, and bias in performance reviews — not pipeline shortages.",
    ],
    leadership: [
      "Your organisation is statistically leaving profitability on the table if you are not in the top quartile for leadership diversity. Use this figure directly in budget conversations.",
      "Ethnic and cultural diversity at leadership level produces a 36% profitability premium. If your board lacks this diversity, ask what the cost of inaction is in financial terms.",
      "Representation targets without inclusion programmes deliver nothing. Use this to justify investment in culture alongside recruitment.",
      "If your organisation has a diverse workforce but senior leadership remains homogeneous, the research shows you are not yet converting diversity into performance.",
      "Microaggressions and bias in performance reviews are the top barriers identified. Tackle these specifically — not just representation numbers — to see financial return.",
    ],
    quotes: [
      { text: "Inclusion is not a soft concept. It is a measurable business performance lever.", attr: "McKinsey Diversity Wins, 2023" },
      { text: "The most diverse companies are now more likely than ever to outperform less diverse peers on profitability.", attr: "McKinsey Diversity Wins, 2023" },
    ],
    related: ["deloitte-millennial-survey", "stonewall-equality-index"],
  },
  {
    id: "deloitte-millennial-survey",
    icon: "💡",
    title: "Deloitte Millennial Survey: Inclusion at Work",
    year: "2022",
    source: "Deloitte",
    desc: "76% of respondents consider diversity and inclusion important when evaluating prospective employers. A key driver for attraction and retention.",
    tags: ["talent", "retention", "millennial", "attraction"],
    type: "Research Report",
    url: "https://www.deloitte.com/global/en/issues/work/content/genzmillennialsurvey.html",
    about: "Deloitte surveyed more than 23,000 millennials and Gen Z workers across 46 countries to understand what they look for in employers and what drives their loyalty, wellbeing and performance at work. Inclusion and belonging emerged as central to every dimension of the employment experience.",
    findings: [
      "76% of respondents said a diverse and inclusive workplace was an important factor when choosing an employer.",
      "Millennials who feel their workplace is highly inclusive are 1.8 times more likely to feel highly engaged.",
      "Nearly half of respondents said they had left a previous employer partly due to a lack of inclusion or belonging.",
      "Gen Z workers are more likely to speak out about discrimination than any previous generation and expect employers to act.",
      "Organisations with strong inclusion records report significantly lower voluntary turnover than those without.",
    ],
    leadership: [
      "If you are struggling to attract early-career talent, your inclusion record is likely a factor. Three in four candidates are checking for it.",
      "Engagement levels are nearly double in inclusive workplaces. Use this to frame inclusion as a productivity and performance investment.",
      "Nearly half of your leavers may have left partly because they did not feel included. Calculate your cost of turnover and apply inclusion as a retention strategy.",
      "Gen Z workers will hold organisations to account publicly if they feel inclusion is performative. The reputational risk of inaction is growing.",
      "Inclusion is now a baseline expectation for new entrants to the workforce, not a differentiator. Falling behind is a competitive risk.",
    ],
    quotes: [
      { text: "For millennials and Gen Z, diversity and inclusion is table stakes. It is the starting point, not the bonus.", attr: "Deloitte Millennial Survey, 2022" },
      { text: "Organisations that fail to demonstrate genuine inclusion are losing talent to those that do.", attr: "Deloitte Millennial Survey, 2022" },
    ],
    related: ["mckinsey-diversity-wins", "gender-pay-gap"],
  },
  {
    id: "gender-pay-gap",
    icon: "📈",
    title: "Gender Pay Gap Evidence Base",
    year: "2023",
    source: "CIPD and Fawcett Society",
    desc: "Comprehensive look at the UK gender pay gap drivers, sector breakdowns, and interventions with the strongest evidence base.",
    tags: ["gender pay gap", "UK", "data", "pay equity"],
    type: "Data Report",
    url: "https://www.fawcettsociety.org.uk/",
    about: "This joint report from the CIPD and the Fawcett Society draws on UK employer data, academic evidence, and policy analysis to map what is actually driving the gender pay gap in different sectors and what interventions have the strongest evidence base for closing it. It is one of the most practically useful evidence resources for UK employers.",
    findings: [
      "The UK median gender pay gap stands at 14.9% in favour of men, but rises to 35% or more in some sectors including financial services.",
      "Occupational segregation accounts for the largest share of the gap: women are disproportionately concentrated in lower-paid roles and sectors.",
      "Flexible working policies that apply equally to men and women reduce the gap more than women-only interventions.",
      "Organisations that publish narrative pay gap reports alongside their statutory data close the gap faster than those that publish numbers alone.",
      "Sponsorship programmes for women at middle-management level have stronger evidence behind them than mentoring programmes alone.",
    ],
    leadership: [
      "Your statutory gender pay gap report is the floor, not the ceiling. Use this research to show leadership what a meaningful response looks like.",
      "The financial services gap of 35%+ is a reputational and legal risk. Early action is significantly cheaper than late remediation.",
      "Flexible working for all, not just women, is one of the highest-impact interventions. Frame this as a workforce design question, not a diversity programme.",
      "Narrative reporting signals accountability. Organisations that explain what they are doing and why close the gap faster. Use this to make the case for a fuller report.",
      "Mentoring alone does not move the needle. Sponsorship and structural change do. Use this evidence to redirect investment.",
    ],
    quotes: [
      { text: "The gender pay gap is not a pipeline problem. It is a structural problem that requires structural solutions.", attr: "Fawcett Society, 2023" },
      { text: "Publishing a number without a narrative is compliance without commitment.", attr: "CIPD Gender Pay Gap Report, 2023" },
    ],
    related: ["mckinsey-diversity-wins", "parker-review"],
  },
  {
    id: "parker-review",
    icon: "🌍",
    title: "Parker Review: Ethnic Diversity in Boardrooms",
    year: "2022",
    source: "Parker Review Committee",
    desc: "Annual tracking of ethnic representation in FTSE 100 and 250 boardrooms with targets, progress, and sector comparison.",
    tags: ["ethnicity", "leadership", "board", "FTSE"],
    type: "Data Report",
    url: "https://parkerreview.co.uk/",
    about: "The Parker Review is an annual government-commissioned report tracking ethnic diversity on the boards of FTSE 100 and FTSE 250 companies. It sets targets, measures progress, and provides sector-level breakdowns. It is the primary evidence base for conversations about ethnic representation at the most senior levels of UK business.",
    findings: [
      "As of 2022, 96% of FTSE 100 companies had met the target of at least one director from an ethnic minority background, up from 74% in 2020.",
      "Progress in the FTSE 250 is significantly slower, with 44% of companies yet to meet the one director target.",
      "Only 16 of the FTSE 100 companies have ethnic minority representation at Chair or CEO level.",
      "The technology and financial services sectors show the highest representation; retail and consumer goods lag behind.",
      "Voluntary targets have driven faster progress than mandatory reporting alone, but the pipeline into the boardroom remains narrow.",
    ],
    leadership: [
      "FTSE 100 progress is visible and tracked publicly. If your sector is lagging, that is a reputational risk as much as an EDI one.",
      "One director is a starting point, not a destination. Use this report to challenge the board on what representation looks like at Chair and CEO level.",
      "Voluntary targets have outperformed mandatory reporting in driving change. Propose internal targets with public accountability.",
      "The pipeline into the boardroom is the real problem. Use this to make the case for investment in development and succession planning for diverse talent.",
      "Sector comparison data gives you a benchmark. If your sector peers are ahead, your organisation is at a competitive disadvantage in talent markets.",
    ],
    quotes: [
      { text: "Having one person from an ethnic minority background on a board is progress. Having none is no longer acceptable.", attr: "Parker Review, 2022" },
      { text: "Targets without accountability are intentions. Accountability without targets is motion without direction.", attr: "Parker Review Committee, 2022" },
    ],
    related: ["mckinsey-diversity-wins", "deloitte-millennial-survey"],
  },
  {
    id: "neurodiversity-work",
    icon: "🧠",
    title: "Neurodiversity at Work: Business Benefits",
    year: "2023",
    source: "ACAS and British Dyslexia Association",
    desc: "Evidence review on the performance and innovation benefits of building neurodiverse teams, with practical employer guidance.",
    tags: ["neurodiversity", "disability", "inclusion", "innovation"],
    type: "Research Summary",
    url: "https://www.acas.org.uk/neurodiversity-at-work",
    about: "This evidence review draws together research from neuroscience, occupational psychology, and employer practice to examine the business benefits of neurodiverse teams. It covers what neurodiversity is, what barriers neurodiverse employees face, and what adjustments and practices generate the strongest outcomes for both individuals and organisations.",
    findings: [
      "Neurodiverse employees are significantly over-represented in roles requiring pattern recognition, systems thinking, and creative problem-solving.",
      "Companies that actively support neurodiversity report higher innovation output and broader cognitive diversity in decision-making.",
      "Up to 20% of the workforce may be neurodivergent, making this one of the largest underserved talent groups in most organisations.",
      "The most common barrier is disclosure: 50% of neurodiverse employees do not disclose at work due to fear of stigma or disadvantage.",
      "Reasonable adjustments for neurodiverse employees cost on average less than £75 and often benefit the wider workforce.",
    ],
    leadership: [
      "One in five of your employees may be neurodivergent and not disclosing. The question is not whether you have neurodiverse employees but whether they feel safe enough to tell you.",
      "If innovation is a business priority, neurodiverse thinking styles are a competitive asset. Frame inclusion as a capability investment.",
      "The average cost of a reasonable adjustment is under £75. The cost of losing a skilled employee who does not feel supported is many times higher.",
      "Non-disclosure due to stigma is a leadership culture problem. Address it directly rather than assuming disclosure rates reflect the true proportion of neurodiverse employees.",
      "Practices that support neurodiverse employees — clear communication, flexibility, written instructions — improve performance for the whole workforce.",
    ],
    quotes: [
      { text: "Neurodiversity is not a problem to be managed. It is a capability to be unlocked.", attr: "British Dyslexia Association, 2023" },
      { text: "The organisations that will win the talent war in the next decade are those that design for difference, not despite it.", attr: "ACAS Neurodiversity at Work, 2023" },
    ],
    related: ["deloitte-millennial-survey", "stonewall-equality-index"],
  },
  {
    id: "stonewall-equality-index",
    icon: "🏳️‍🌈",
    title: "Stonewall Workplace Equality Index 2023",
    year: "2023",
    source: "Stonewall",
    desc: "Findings from 300+ employers on LGBTQ+ inclusion at work and what drives belonging, performance, and retention.",
    tags: ["LGBTQ+", "belonging", "measurement", "retention"],
    type: "Index Report",
    url: "https://www.stonewall.org.uk/workplace-equality-index",
    about: "The Stonewall Workplace Equality Index draws on submissions from more than 300 employers and surveys of LGBTQ+ employees to track the state of LGBTQ+ inclusion in UK workplaces. It provides sector benchmarks, employer rankings, and detailed evidence on what drives — and what undermines — genuine inclusion for LGBTQ+ people at work.",
    findings: [
      "Only 30% of LGBTQ+ employees are fully out to all colleagues, rising to 60% in the top-ranked employers.",
      "LGBTQ+ employees in inclusive workplaces are twice as likely to feel able to bring their full selves to work and significantly more likely to stay.",
      "Trans employees report the highest levels of exclusion, with 1 in 3 having hidden or disguised their identity at work in the past year.",
      "Visible LGBTQ+ role models at senior level are the single strongest predictor of inclusion climate for LGBTQ+ employees.",
      "Employers in the top quartile of the index have 40% lower LGBTQ+ specific voluntary turnover than those in the bottom quartile.",
    ],
    leadership: [
      "If LGBTQ+ employees are not out at work, your inclusion data is incomplete. Low disclosure is a signal about psychological safety, not about your workforce composition.",
      "A 40% reduction in LGBTQ+ specific turnover in inclusive employers translates directly into recruitment and onboarding cost savings. Quantify this for your CFO.",
      "Visible senior role models are the highest-impact, lowest-cost intervention available. Ask who at leadership level is out and visible, and whether that is by choice or by climate.",
      "Trans inclusion is the area of greatest unmet need. A separate, specific trans inclusion policy signals commitment beyond generic statements.",
      "Index benchmarking allows you to compare your progress against sector peers. Use this to create urgency with leadership by showing where you rank relative to competitors.",
    ],
    quotes: [
      { text: "Inclusion is not about tolerance. It is about belonging. And belonging shows up in your retention data whether you are measuring it or not.", attr: "Stonewall Workplace Equality Index, 2023" },
      { text: "The gap between the best employers and the rest on LGBTQ+ inclusion is widening, not narrowing.", attr: "Stonewall, 2023" },
    ],
    related: ["neurodiversity-work", "deloitte-millennial-survey"],
  },
];

const CASE_STUDIES = [
  {
    org: "NHS Trust",
    sector: "Healthcare",
    title: "Building Psychological Safety Across Clinical Teams",
    outcome: "37% reduction in staff turnover over 18 months following EDI strategy implementation.",
    tags: ["psychological safety", "retention", "healthcare"],
  },
  {
    org: "Tech company (anonymised)",
    sector: "Technology",
    title: "Closing the Gender Pay Gap Through Structural Change",
    outcome: "Gap reduced from 18% to 9% in two years through targeted sponsorship and flexible working reform.",
    tags: ["gender pay gap", "sponsorship", "flexible working"],
  },
  {
    org: "Local Authority",
    sector: "Public Sector",
    title: "Disability Inclusion and Reasonable Adjustments at Scale",
    outcome: "Disclosure rate increased from 12% to 31% following introduction of Disability Confident Champion programme.",
    tags: ["disability", "disclosure", "reasonable adjustments"],
  },
];

const DOWNLOADS = [
  {
    icon: "📋",
    title: "Business Case for Inclusion: Template",
    type: "Word document",
    desc: "A structured template for building a board-ready business case for your EDI strategy, with prompts, data placeholders and example language.",
    free: true,
  },
  {
    icon: "📊",
    title: "EDI Data Dashboard Template",
    type: "Excel spreadsheet",
    desc: "Track and visualise your key EDI metrics across recruitment, retention, pay, progression and engagement in one place.",
    free: false,
  },
  {
    icon: "✅",
    title: "Inclusion Audit Checklist",
    type: "PDF",
    desc: "A 60-point checklist for auditing inclusion across seven organisational areas, with a scoring framework and priority matrix.",
    free: true,
  },
  {
    icon: "📝",
    title: "EDI Strategy One-Pager Template",
    type: "Word document",
    desc: "A one-page summary template for communicating your EDI strategy to senior stakeholders, with guided prompts.",
    free: false,
  },
];

const SECTORS = [
  "Healthcare", "Education", "Financial Services", "Technology",
  "Public Sector", "Charity and Third Sector", "Retail and Consumer",
  "Professional Services", "Creative Industries", "Manufacturing",
];

const ORG_SIZES = [
  "Under 50 employees", "50 to 250 employees",
  "250 to 1,000 employees", "Over 1,000 employees",
];

const MAIN_CHALLENGES = [
  "Making the case for EDI budget",
  "Improving retention and reducing turnover",
  "Preparing for a board or trustee review",
  "Responding to a specific incident or complaint",
  "Building our first EDI strategy",
];

const PITCH_TARGETS = [
  "CEO or Executive Team",
  "CFO or Finance Director",
  "HR Director or People Team",
  "Board of Trustees or Non-Executives",
  "Line Managers",
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */

type Tab = "research" | "evidence-builder" | "cases" | "downloads";

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("research");
  const [search, setSearch] = useState("");

  // Research brief state
  const [activeBrief, setActiveBrief] = useState<string | null>(null);
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [tailorSector, setTailorSector] = useState("");
  const [tailorSize, setTailorSize] = useState("");
  const [tailorChallenge, setTailorChallenge] = useState("");
  const [tailoredOutput, setTailoredOutput] = useState("");
  const [tailorLoading, setTailorLoading] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  // Evidence builder state
  const [ebArgument, setEbArgument] = useState("");
  const [ebSector, setEbSector] = useState("");
  const [ebSize, setEbSize] = useState("");
  const [ebPitchTarget, setEbPitchTarget] = useState("");
  const [ebOutput, setEbOutput] = useState("");
  const [ebLoading, setEbLoading] = useState(false);

  const currentBrief = RESEARCH_REPORTS.find((r) => r.id === activeBrief) ?? null;
  const relatedBriefs = currentBrief
    ? currentBrief.related.map((id) => RESEARCH_REPORTS.find((r) => r.id === id)).filter(Boolean)
    : [];

  const filteredResearch = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return RESEARCH_REPORTS;
    return RESEARCH_REPORTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredCases = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return CASE_STUDIES;
    return CASE_STUDIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.outcome.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredDownloads = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return DOWNLOADS;
    return DOWNLOADS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q)
    );
  }, [search]);

  function handleTailor() {
    if (!tailorSector || !tailorSize) return;
    setTailorLoading(true);
    setTailoredOutput("");
    setTimeout(() => {
      const brief = currentBrief!;
      const challengeText = tailorChallenge ? ` Your stated challenge is: ${tailorChallenge.toLowerCase()}.` : "";
      const output = `For a ${tailorSize.toLowerCase()} organisation in the ${tailorSector} sector, the ${brief.title} offers particularly relevant evidence.${challengeText} The finding that ${brief.findings[0].toLowerCase()} translates directly into your context: in ${tailorSector}, where talent competition and retention pressures are significant, this data provides a quantified argument for investment in inclusion. Specifically, you can point to the ${brief.findings[1].toLowerCase()} as evidence that the financial case is not theoretical. We recommend opening your board presentation with the headline statistic, contextualising it to your sector, and following with the three actions most relevant to your current priorities from the "Take this to your leadership" section of this brief.`;
      setTailoredOutput(output);
      setTailorLoading(false);
    }, 1800);
  }

  function handleEvidenceBuilder() {
    if (!ebArgument || !ebSector || !ebPitchTarget) return;
    setEbLoading(true);
    setEbOutput("");
    setTimeout(() => {
      const relevant = RESEARCH_REPORTS.filter(
        (r) =>
          r.tags.some((t) =>
            ebArgument.toLowerCase().includes(t.toLowerCase())
          ) || Math.random() > 0.4
      ).slice(0, 3);
      const output = `Business Case Argument: ${ebArgument}\n\nFor a ${ebSector} organisation presenting to ${ebPitchTarget}, the evidence below supports your argument:\n\n${relevant
        .map(
          (r, i) =>
            `${i + 1}. ${r.title} (${r.source}, ${r.year})\n   "${r.findings[0]}"\n   Recommended framing: ${r.leadership[0]}`
        )
        .join(
          "\n\n"
        )}\n\nSuggested opening line for your presentation:\n"The evidence base for inclusion as a business performance driver is now substantial. ${relevant[0].findings[0]} This is not a question of values alone — it is a question of competitive performance."`;
      setEbOutput(output);
      setEbLoading(false);
    }, 2200);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid var(--gray-border)",
    fontFamily: "var(--font-body)",
    fontSize: "0.925rem",
    background: "var(--white)",
    color: "var(--charcoal)",
    outline: "none",
    boxSizing: "border-box",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none" as const,
    cursor: "pointer",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "0.8rem",
    color: "var(--charcoal)",
    marginBottom: "0.5rem",
    display: "block",
    letterSpacing: "0.04em",
  };

  /* ── RESEARCH BRIEF VIEW ─────────────────────────────────────────────── */
  if (activeBrief && currentBrief) {
    return (
      <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
        <PlatformNav />

        {/* Breadcrumb */}
        <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/dashboard/evidence" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
            ← Make the Case
          </Link>
          <span style={{ color: "var(--gray-border)" }}>|</span>
          <button onClick={() => { setActiveBrief(null); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); }} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", background: "none", border: "none", cursor: "pointer" }}>
            ← Research and Data
          </button>
          <span style={{ color: "var(--gray-border)" }}>|</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--sage-dark)" }}>{currentBrief.title}</span>
        </nav>

        <main style={{ maxWidth: "820px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{currentBrief.type}</span>
              <span className="badge badge-cream" style={{ fontSize: "0.65rem" }}>{currentBrief.year}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
              {currentBrief.title}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.75rem" }}>
              Published by {currentBrief.source}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-soft)", lineHeight: 1.7 }}>
              {currentBrief.desc}
            </p>
          </div>

          {/* About */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              About this research
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.8, margin: 0 }}>
              {currentBrief.about}
            </p>
          </section>

          {/* Findings */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              What the research found
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {currentBrief.findings.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--white)", background: "var(--sage-dark)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Take to leadership */}
          <section style={{ background: "linear-gradient(135deg, #1E3624 0%, #2C4A31 100%)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--white)", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Take this to your leadership
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem" }}>
              Five arguments to translate this evidence into language your senior leadership will respond to.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {currentBrief.leadership.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", background: "var(--white)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quotes */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Voices from the research
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {currentBrief.quotes.map((q, i) => (
                <div key={i} style={{ borderLeft: "4px solid var(--sage-dark)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 0.5rem 0" }}>
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--sage-dark)", margin: 0 }}>
                    {q.attr}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Source */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Source
            </h2>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ background: "var(--sage-xlight)", borderRadius: "12px", width: "80px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0 }}>
                {currentBrief.icon}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{currentBrief.title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.75rem" }}>{currentBrief.source} · {currentBrief.year}</div>
                <a href={currentBrief.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem", display: "inline-block", textDecoration: "none" }}>
                  Read the full report →
                </a>
              </div>
            </div>
          </section>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button
              onClick={() => { setShowTailorModal(true); setShowRelated(false); }}
              className="btn-primary"
              style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}
            >
              ✨ Tailor this for my organisation
            </button>
            <button
              onClick={() => { setShowRelated(!showRelated); setShowTailorModal(false); }}
              className="btn-secondary"
              style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}
            >
              📚 Read more research like this
            </button>
          </div>

          {/* Tailor modal panel */}
          {showTailorModal && (
            <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem", border: "2px solid var(--sage-dark)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                    Tailor this for my organisation
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)" }}>
                    Tell us about your organisation and we will reframe this research in your context.
                  </p>
                </div>
                <button onClick={() => { setShowTailorModal(false); setTailoredOutput(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--gray-soft)", padding: "0.25rem" }}>✕</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Your sector</label>
                  <select value={tailorSector} onChange={(e) => setTailorSector(e.target.value)} style={selectStyle}>
                    <option value="">Select sector</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Organisation size</label>
                  <select value={tailorSize} onChange={(e) => setTailorSize(e.target.value)} style={selectStyle}>
                    <option value="">Select size</option>
                    {ORG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Main challenge (optional)</label>
                  <select value={tailorChallenge} onChange={(e) => setTailorChallenge(e.target.value)} style={selectStyle}>
                    <option value="">Select a challenge</option>
                    {MAIN_CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={handleTailor}
                disabled={!tailorSector || !tailorSize || tailorLoading}
                className="btn-primary"
                style={{ fontSize: "0.875rem", padding: "0.75rem 1.5rem", opacity: (!tailorSector || !tailorSize) ? 0.5 : 1, cursor: (!tailorSector || !tailorSize) ? "not-allowed" : "pointer" }}
              >
                {tailorLoading ? "Building your summary…" : "Generate my tailored summary →"}
              </button>
              {tailoredOutput && (
                <div style={{ marginTop: "1.5rem", background: "var(--sage-xlight)", borderRadius: "12px", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                    Your tailored summary
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.8, margin: 0 }}>
                    {tailoredOutput}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Related research */}
          {showRelated && relatedBriefs.length > 0 && (
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Read more research like this
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {relatedBriefs.map((r) => r && (
                  <div key={r.id} className="card" style={{ cursor: "pointer" }} onClick={() => { setActiveBrief(r.id); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
                      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                        <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                        <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 0.75rem 0" }}>{r.desc}</p>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--sage-dark)" }}>Read summary →</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
        <BottomBanner />
      </div>
    );
  }

  /* ── MAIN LISTING VIEW ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Make the Case</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            Make the Case
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.25rem" }}>
            Evidence, data, case studies and resources to build a compelling business case for inclusion.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", marginBottom: "1.5rem", maxWidth: "560px" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.95rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search by keyword, topic or source…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search the library"
              style={{ width: "100%", padding: "0.8rem 2.75rem 0.8rem 2.75rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.95rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1rem", padding: "0.2rem" }}>✕</button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--gray-border)", overflowX: "auto" }}>
            {([
              { key: "research", label: "📊 Research and Data" },
              { key: "evidence-builder", label: "🧩 Evidence Builder" },
              { key: "cases", label: "🏢 Case Studies" },
              { key: "downloads", label: "📁 Templates and Resources" },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.5rem", background: "none", border: "none", cursor: "pointer", color: activeTab === tab.key ? "var(--sage-dark)" : "var(--gray-soft)", borderBottom: activeTab === tab.key ? "2px solid var(--sage-dark)" : "2px solid transparent", marginBottom: "-2px", whiteSpace: "nowrap" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* RESEARCH AND DATA */}
        {activeTab === "research" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Key findings from major reports, curated and contextualised for EDI practitioners and the stakeholders they need to influence.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {filteredResearch.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", gridColumn: "1/-1" }}>No research matches your search.</p>}
              {filteredResearch.map((r) => (
                <div key={r.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{r.icon}</span>
                    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                      <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{r.desc}</p>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                    onClick={() => { setActiveBrief(r.id); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    Read summary →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* EVIDENCE BUILDER */}
        {activeTab === "evidence-builder" && (
          <>
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                Evidence Builder
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.925rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Tell us about the argument you are trying to make and who you are making it to. We will surface the most relevant evidence from our research library and give you a structured argument you can take straight into a presentation or document.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
                <div>
                  <label style={labelStyle}>What argument are you trying to make?</label>
                  <textarea
                    value={ebArgument}
                    onChange={(e) => setEbArgument(e.target.value)}
                    placeholder="For example: I need to justify our EDI strategy to the board, or I want to make the case for a pay equity audit to our CFO."
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>What sector are you in?</label>
                    <select value={ebSector} onChange={(e) => setEbSector(e.target.value)} style={selectStyle}>
                      <option value="">Select sector</option>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Organisation size</label>
                    <select value={ebSize} onChange={(e) => setEbSize(e.target.value)} style={selectStyle}>
                      <option value="">Select size</option>
                      {ORG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Who are you presenting to?</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                    {PITCH_TARGETS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setEbPitchTarget(t)}
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "1.5px solid",
                          borderColor: ebPitchTarget === t ? "var(--sage-dark)" : "var(--gray-border)",
                          background: ebPitchTarget === t ? "var(--sage-dark)" : "var(--white)",
                          color: ebPitchTarget === t ? "var(--white)" : "var(--charcoal)",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleEvidenceBuilder}
                disabled={!ebArgument || !ebSector || !ebPitchTarget || ebLoading}
                className="btn-primary"
                style={{ fontSize: "0.925rem", padding: "0.875rem 2rem", opacity: (!ebArgument || !ebSector || !ebPitchTarget) ? 0.5 : 1, cursor: (!ebArgument || !ebSector || !ebPitchTarget) ? "not-allowed" : "pointer" }}
              >
                {ebLoading ? "Building your argument…" : "Build my evidence argument →"}
              </button>

              {ebOutput && (
                <div style={{ marginTop: "2rem", background: "var(--white)", borderRadius: "16px", padding: "2rem", border: "2px solid var(--sage-dark)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    Your evidence argument
                  </div>
                  <pre style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>
                    {ebOutput}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}

        {/* CASE STUDIES */}
        {activeTab === "cases" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Real examples of inclusion driving measurable change for sharing with leadership, informing strategy, or as inspiration.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {filteredCases.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No case studies match your search.</p>}
              {filteredCases.map((c) => (
                <div key={c.title} className="card">
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "280px" }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                        <span className="badge badge-cream" style={{ fontSize: "0.65rem" }}>{c.sector}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{c.org}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{c.title}</h3>
                      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                        {c.tags.map((t) => <span key={t} className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{t}</span>)}
                      </div>
                    </div>
                    <div style={{ background: "var(--sage-xlight)", borderRadius: "10px", padding: "1.25rem", minWidth: "240px", flex: "0 0 auto" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Key outcome</div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{c.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOWNLOADS */}
        {activeTab === "downloads" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Ready-to-use documents and templates to download and adapt for your organisation.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {filteredDownloads.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", gridColumn: "1/-1" }}>No templates match your search.</p>}
              {filteredDownloads.map((d) => (
                <div key={d.title} className="card" style={{ position: "relative" }}>
                  {d.free && (
                    <span className="badge badge-sage" style={{ fontSize: "0.6rem", position: "absolute", top: "1rem", right: "1rem" }}>Free</span>
                  )}
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{d.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{d.title}</div>
                  <span className="badge badge-cream" style={{ fontSize: "0.6rem", marginBottom: "0.75rem", display: "inline-block" }}>{d.type}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>{d.desc}</p>
                  <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", width: "100%" }}>
                    Download →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
      <BottomBanner />
    </div>
  );
}
