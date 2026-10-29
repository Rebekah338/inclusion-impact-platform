"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SECTIONS = [
  {
    id: "understand",
    title: "Understand what anti-racism means",
    content: [
      "Anti-racism is not the same as not being racist. Not being racist is a passive position; a refusal to act in explicitly discriminatory ways. Anti-racism is an active commitment to understanding and dismantling the systems, structures, and behaviours that produce and sustain racial inequality.",
      "Author and scholar Ibram X. Kendi defines anti-racism clearly: there is no neutral position on racism. Policies, practices, and behaviours are either producing more racial equity or less. Choosing not to engage is a choice in favour of the status quo.",
      "Anti-racism requires ongoing learning and action, not a single gesture or declaration. It is a practice, not an identity.",
    ],
  },
  {
    id: "educate",
    title: "Educate yourself; and do not outsource that labour",
    content: [
      "The most important first step is taking responsibility for your own learning. Read books, listen to podcasts, follow researchers and practitioners, and engage with the lived experiences of people who face racial discrimination; not as a tourism exercise, but as a serious commitment to understanding.",
      "Do not rely on colleagues, friends, or employees from racially marginalised groups to educate you. That labour is unpaid, emotionally demanding, and not their responsibility. Use the extensive resources available from Black, Asian, and other racially marginalised writers, researchers, and organisations.",
      "Resist the urge to rush to action before building understanding. Well-intentioned but poorly informed anti-racist gestures can cause harm. Slow down, read, and listen before you act.",
    ],
  },
  {
    id: "workplace",
    title: "Apply anti-racism in workplace practices",
    content: [
      "Review your recruitment processes for racial bias: examine where candidates of colour are lost in your pipeline, what language your job adverts use, who is on your hiring panels, and how decisions are made.",
      "Audit promotion and pay data by ethnicity. If people from racially marginalised groups are concentrated in lower pay bands or roles, ask why; and act on the answer.",
      "Address racist incidents directly and consistently. A culture that ignores or minimises racist comments, jokes, or microaggressions tells people of colour that they are not safe at work. Address every incident, however 'minor' it may seem to others.",
      "Ensure your training, development, and mentoring programmes actively reach employees from racially marginalised groups; and that they are not required to prove themselves further than their white peers to access the same opportunities.",
    ],
  },
  {
    id: "microaggressions",
    title: "Understand and interrupt racial microaggressions",
    content: [
      "Racial microaggressions are everyday verbal, behavioural, or environmental slights (often unintentional) that communicate hostile, derogatory, or negative messages to people of colour. Examples include asking someone 'where are you really from?', commenting on someone's hair in ways that would not happen with white colleagues, or mispronouncing a name repeatedly without effort to correct it.",
      "The impact of microaggressions is cumulative. Each individual instance may seem small; over time, they communicate that a person does not fully belong. Research links repeated exposure to microaggressions with significant negative effects on mental health, job satisfaction, and performance.",
      "When you witness a microaggression, you can interrupt it in the moment: 'I want to check; was that intended to be a comment about [name]'s background?' Or follow up privately: 'I noticed what happened earlier and I wanted to check in with you.'",
      "When you have caused a microaggression (and you will) the appropriate response is a brief, genuine apology and a commitment to do better. Do not ask the affected person to reassure you.",
    ],
  },
  {
    id: "structural",
    title: "Address structural racism, not just individual behaviour",
    content: [
      "Individual attitudes matter; but individual attitudes alone do not produce or sustain racial inequality. Structural racism describes the way that systems, policies, and institutions produce unequal outcomes for people based on race, regardless of the intentions of the individuals within them.",
      "In workplaces, structural racism can appear in pay and promotion gaps, in who is informally mentored and sponsored, in whose names are remembered and whose are mispronounced, in whose work is praised and whose is scrutinised, and in the unwritten cultural norms that define who 'fits'.",
      "Anti-racist practice at the structural level means auditing and redesigning processes; not just educating individuals. It means asking who benefits from the status quo and who does not, and changing systems accordingly.",
      "Track outcomes, not just intentions. If your equality data shows persistent gaps in representation or progression, that is structural information; and it calls for structural change.",
    ],
  },
  {
    id: "accountability",
    title: "Be accountable; to people, not just principles",
    content: [
      "Anti-racism that stays at the level of statements, pledges, and good intentions, without behavioural and structural change, is not anti-racism; it is reputation management.",
      "Accountability means setting specific, measurable goals for racial equity in your team or organisation and reporting on them. It means naming the outcomes you are responsible for and being honest about where you are falling short.",
      "It also means welcoming challenge. When people from racially marginalised groups tell you that your practice is not matching your stated commitments, the response is listening and change; not defensiveness.",
      "Anti-racist practice is also relevant to your supply chain, your partnerships, your event lineups, and your communications. Where you spend money, and whose work you amplify, are also anti-racist choices.",
    ],
  },
];

export default function AntiRacistPracticeGuidePage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Practical guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Anti-Racist Practice Guide
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Being anti-racist requires more than good intentions. This guide covers what anti-racism actually means, how racial bias and microaggressions show up in practice, and what you can do at the individual and structural level to challenge racism at work and beyond.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Anti-Racism", "Racial Equity", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SECTIONS.map((section, i) => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpenSection(isOpen ? null : section.id)} style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--charcoal, #2C2C2C)" }}>{section.title}</span>
                  </div>
                  <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 20, fontWeight: 300, flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid #f3f4f6", padding: "24px 24px 28px" }}>
                    {section.content.map((para, j) => (
                      <p key={j} style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, margin: j < section.content.length - 1 ? "0 0 16px" : "0" }}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Why this matters</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Racial inequality is not a natural or neutral state of affairs; it is the result of historical systems and ongoing practices that continue to shape who gets access to opportunity, resources, and power. Anti-racism is the commitment to understanding those systems and actively working to change them.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            It is also work that never ends. The standard is not perfection; it is consistent, honest, and evolving commitment; with the humility to recognise when you have caused harm and the courage to keep going anyway.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
              { title: "Recognising Bias: Common Types in the Workplace", slug: "recognising-bias", format: "Tool" },
              { title: "Challenging Non-Inclusive Behaviour", slug: "challenging-non-inclusive-behaviour", format: "Guide" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
            {/* Share / Download bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
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
