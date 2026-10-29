"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useRef } from "react";

type BiasCategory = "all" | "individual" | "interpersonal" | "systemic";

const BIASES = [
  {
    name: "Affinity Bias",
    category: "interpersonal" as BiasCategory,
    what: "Preferring or gravitating towards people who are similar to us in background, interests, experiences, or personality.",
    example: "You naturally assign a high-profile project to a colleague who shares your interests and background, even though other team members are equally or more qualified.",
    impact: "Leads to homogeneous teams, limits diverse thinking, and disadvantages people who do not share the dominant group's background or social cues.",
    whatToDo: "When making decisions about people, actively ask yourself: am I choosing this person because of their skills and track record, or because they feel familiar? Deliberately consider candidates or colleagues who are different from you.",
  },
  {
    name: "Confirmation Bias",
    category: "individual" as BiasCategory,
    what: "Looking for or focusing on information that confirms what we already believe about a person or situation, while ignoring evidence that challenges those beliefs.",
    example: "You already believe a team member is not detail-oriented, so you notice and remember only their mistakes while overlooking their accurate or high-quality work.",
    impact: "Locks in unfair first impressions, prevents people from being seen accurately, and makes performance management and development conversations less fair.",
    whatToDo: "Before making a judgement, actively seek out evidence that contradicts your current view. Keep a record of specific, observed behaviours rather than relying on general impressions.",
  },
  {
    name: "Halo Effect",
    category: "individual" as BiasCategory,
    what: "Assuming someone is strong in many areas because they perform well in one particular area or have one positive characteristic.",
    example: "A colleague impresses you with a strong presentation, so you assume they are also skilled in leadership, teamwork, and problem-solving, without any evidence for those areas.",
    impact: "Skews performance reviews and promotion decisions in favour of people who are strong in visible or valued skills, regardless of their actual overall performance.",
    whatToDo: "Evaluate each competency separately and with specific evidence. Structured, criteria-based assessments help prevent a single standout moment from distorting the overall picture.",
  },
  {
    name: "Horn Effect",
    category: "individual" as BiasCategory,
    what: "The opposite of the halo effect: allowing one negative impression or characteristic to colour our overall view of a person.",
    example: "A team member stumbles on one project, and you find yourself doubting their capability across all areas of their work, including those where they consistently perform well.",
    impact: "Causes people to be unfairly underestimated after one mistake or misunderstanding, making recovery and progression harder.",
    whatToDo: "Separate individual incidents from overall patterns. One difficult moment is data; it is not the full picture. Reflect on whether your overall assessment is proportionate.",
  },
  {
    name: "Anchoring Bias",
    category: "individual" as BiasCategory,
    what: "Relying too heavily on the first piece of information we receive about a person or situation, which then shapes how we interpret everything that follows.",
    example: "During a performance review, the first piece of feedback you hear about an employee shapes your overall impression, making it hard to weigh later evidence objectively.",
    impact: "First impressions, early rumours, or initial data points become disproportionately influential in how people are assessed and treated.",
    whatToDo: "Gather a range of evidence before forming a view. In panels and review processes, ask each person to record their assessment independently before sharing opinions.",
  },
  {
    name: "Attribution Bias",
    category: "interpersonal" as BiasCategory,
    what: "Explaining people's successes and failures differently depending on whether they are in our in-group or out-group. We attribute our own group's successes to skill and failures to circumstance, while reversing this for people outside our group.",
    example: "When a colleague from a similar background makes a mistake, you put it down to a difficult week. When a colleague from a different background makes the same mistake, you question their competence.",
    impact: "Systematically disadvantages people from underrepresented groups in performance conversations, promotion decisions, and day-to-day credibility.",
    whatToDo: "Apply a consistency test: ask yourself whether you would explain the same behaviour the same way if it came from someone who looked or sounded more like you.",
  },
  {
    name: "Recency Bias",
    category: "individual" as BiasCategory,
    what: "Giving disproportionate weight to the most recent events or interactions when forming an overall assessment, at the expense of a fuller picture.",
    example: "An employee delivers a strong quarter's work but has a difficult week just before their annual review. Their review reflects that difficult week far more than their year-long record.",
    impact: "Makes assessments unreliable and unpredictable. Employees learn that visibility in the run-up to review periods matters more than sustained performance.",
    whatToDo: "Keep running notes on performance throughout the year, not just at review time. Build assessment processes that draw on evidence across the full review period.",
  },
  {
    name: "Beauty Bias",
    category: "interpersonal" as BiasCategory,
    what: "Associating physical attractiveness with positive traits such as intelligence, competence, or leadership potential.",
    example: "In a panel interview, a candidate who is conventionally attractive receives higher scores on leadership potential despite giving comparable answers to other candidates.",
    impact: "Introduces an entirely irrelevant factor into high-stakes decisions, compounding existing inequalities around gender, race, and disability.",
    whatToDo: "Use structured scoring rubrics with predefined criteria and weight them before the interview begins. Debrief panels using recorded scores rather than opening with general impressions.",
  },
  {
    name: "Gender Bias",
    category: "systemic" as BiasCategory,
    what: "Applying different standards, assumptions, or expectations to people based on their gender, often in ways that disadvantage women and non-binary people.",
    example: "Assertiveness in a man is described as leadership; the same behaviour in a woman is described as aggressive or difficult.",
    impact: "Shapes who is recruited, promoted, heard in meetings, and credited for ideas. Gender bias is compounded for women of colour, disabled women, and trans and non-binary people.",
    whatToDo: "Audit the language used in job descriptions, performance reviews, and reference letters. Train managers to spot gendered language and introduce consistent criteria for all assessments.",
  },
  {
    name: "Age Bias (Ageism)",
    category: "systemic" as BiasCategory,
    what: "Making assumptions about a person's capability, relevance, or value based on their age, whether they are perceived as too young or too old.",
    example: "A highly experienced candidate over 55 is passed over for a leadership role because the hiring panel assumes they will resist change or retire soon.",
    impact: "Excludes experienced talent and makes workplaces less intergenerationally diverse. Age bias can operate in both directions but disproportionately harms older workers in hiring and promotion.",
    whatToDo: "Remove age-related information (including graduation years) from early-stage candidate assessments. Focus interview questions on demonstrated capability and specific, recent examples.",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  all: "All types",
  individual: "Individual",
  interpersonal: "Interpersonal",
  systemic: "Systemic",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  individual: "Biases that operate within our own thinking and judgement",
  interpersonal: "Biases that shape how we relate to and perceive others",
  systemic: "Biases embedded in organisational processes and culture",
};

export default function RecognisingBiasPage() {
  const [activeCategory, setActiveCategory] = useState<BiasCategory>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all" ? BIASES : BIASES.filter((b) => b.category === activeCategory);

  const scrollToResults = () => {
    const el = resultsRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCategory = (cat: BiasCategory) => {
    setActiveCategory(cat);
    setExpandedIndex(null);
    scrollToResults();
  };

  const categoryColors: Record<string, string> = {
    individual: "#dbeafe",
    interpersonal: "#fef3c7",
    systemic: "#fce7f3",
  };
  const categoryTextColors: Record<string, string> = {
    individual: "#1e40af",
    interpersonal: "#92400e",
    systemic: "#9d174d",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          href="/dashboard/apply"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
        >
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reference tool &middot; Updated October 2026</span>
        </div>

        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Recognising Bias: Common Types in the Workplace
        </h1>

        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Bias can be conscious or unconscious, and both shape how we interpret situations, relate to colleagues, and make decisions at work. This tool walks through ten of the most common types of workplace bias: what each one is, how it shows up in practice, and what you can do about it.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Bias", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight, #EFF5F0)", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Category filter bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["all", "individual", "interpersonal", "systemic"] as BiasCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "var(--sage-dark, #2D5A3C)" : "#d1d5db",
                background: activeCategory === cat ? "var(--sage-dark, #2D5A3C)" : "transparent",
                color: activeCategory === cat ? "#fff" : "var(--charcoal, #2C2C2C)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        {activeCategory !== "all" && (
          <div style={{ maxWidth: 900, margin: "8px auto 0", fontSize: 13, color: "#6b7280" }}>
            {CATEGORY_DESCRIPTIONS[activeCategory]}
          </div>
        )}
      </div>

      {/* Bias cards */}
      <div ref={resultsRef} style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 24 }}>
          {filtered.length} {filtered.length === 1 ? "type" : "types"} shown
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((bias, i) => {
            const isOpen = expandedIndex === i;
            return (
              <div
                key={bias.name}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}
              >
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 17, color: "var(--charcoal, #2C2C2C)" }}>
                        {bias.name}
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        padding: "2px 10px",
                        borderRadius: 20,
                        background: categoryColors[bias.category],
                        color: categoryTextColors[bias.category],
                      }}>
                        {bias.category}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{bias.what}</p>
                  </div>
                  <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 20, fontWeight: 300, flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s", marginTop: 2 }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid #f3f4f6", padding: "0 24px 24px" }}>
                    <div style={{ height: 20 }} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "16px 18px" }}>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#9ca3af", margin: "0 0 8px" }}>Example at work</p>
                        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{bias.example}</p>
                      </div>
                      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "16px 18px" }}>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#9ca3af", margin: "0 0 8px" }}>Why it matters</p>
                        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{bias.impact}</p>
                      </div>
                      <div style={{ background: "var(--sage-xlight, #EFF5F0)", borderRadius: 8, padding: "16px 18px", border: "1px solid #c6dbc9" }}>
                        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 8px" }}>What to do</p>
                        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{bias.whatToDo}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>
            Understanding bias at work
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Bias is not a character flaw. It is a feature of human cognition: our brains use mental shortcuts to process the world quickly, and those shortcuts are shaped by the cultures, systems, and experiences we grow up in. This means that everyone carries biases, regardless of their values, intentions, or commitment to fairness. The question is not whether we have biases but whether we are willing to do the work of recognising and interrupting them.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            In the workplace, bias shapes consequential decisions: who gets hired, who gets promoted, whose ideas are taken seriously, who is given stretch opportunities, and who is managed out. Because many of these decisions feel like common sense or good judgement in the moment, bias is particularly difficult to challenge without shared language and structured processes. That is why awareness is necessary but not sufficient: recognising bias is the starting point, not the destination.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The most effective organisations address bias at the systemic level: through structured decision-making, diverse panels, clear criteria set in advance, and accountability for outcomes. Individual reflection and awareness matter, and they work best when they are supported by processes that do not rely on individuals always getting it right.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Top 10 Tips to Acknowledge Your Own Personal Bias", slug: "acknowledging-personal-bias", format: "Top Tips" },
              { title: "EDI Glossary", slug: "edi-glossary", format: "Glossary" },
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  {r.format}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

            {/* Share / Download bar */}
      <div data-noprint="true" style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>Useful?</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Share it with a colleague, or save a copy for your records. Print-friendly version included.</p>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sage-dark, #2D5A3C)", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Raleway, sans-serif" }}
            >
              <span>↗</span> Share or download
            </button>
            {showShareMenu && (
              <div style={{ position: "absolute", right: 0, bottom: "calc(100% + 8px)", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", minWidth: 220, zIndex: 50, overflow: "hidden" }}>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                >
                  🔗 Copy link
                </button>
                <button
                  onClick={() => { setShowShareMenu(false); window.print(); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  🖨️ Print or save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
