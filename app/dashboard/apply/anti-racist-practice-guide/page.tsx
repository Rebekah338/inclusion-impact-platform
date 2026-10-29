"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SECTIONS = [
  {
    id: "s1",
    number: "01",
    title: "Understanding anti-racist practice",
    content: "Anti-racist practice means actively identifying, challenging, and dismantling racism at interpersonal, organisational, and systemic levels. It goes beyond being \"not racist\" by intentionally creating policies, cultures, and behaviours that promote equity and justice. This includes recognising power imbalances, understanding lived experiences of racism, and committing to continuous learning, unlearning, and accountability.",
    isList: false,
  },
  {
    id: "s2",
    number: "02",
    title: "Recognising racism: overt, covert, structural and systemic",
    content: [
      "Overt racism: slurs, exclusion, discriminatory policies.",
      "Covert racism: microaggressions, assumptions, stereotyping, tone-policing, coded language.",
      "Structural racism: refers to how different institutions, systems, and parts of society interconnect to produce and reproduce racial inequality. It is the combined effect of norms, culture, and historical inequity.",
      "Systemic racism: refers to racism that is built into the policies, practices, and procedures of a particular system or institution.",
    ],
    isList: true,
  },
  {
    id: "s3",
    number: "03",
    title: "Building anti-racist awareness",
    content: [
      "Understand your own identity, privilege, and biases.",
      "Learn about racial inequity and its historical and global context.",
      "Reflect on how racism impacts people differently depending on their intersectional identities (for example: gender, disability, class, religion).",
      "Engage with stories and lived experiences without placing emotional labour on colleagues of colour.",
    ],
    isList: true,
  },
  {
    id: "s4",
    number: "04",
    title: "Inclusive and anti-racist communication",
    content: [
      "Use accurate, respectful language and avoid stereotypes or generalisations.",
      "Challenge biased narratives in conversations, emails, reports, and policies.",
      "Avoid tone-policing, defensiveness, or dismissing lived experiences.",
      "Ensure images and stories represent people authentically and avoid tokenism.",
    ],
    isList: true,
  },
  {
    id: "s5",
    number: "05",
    title: "Responding to racism and microaggressions",
    content: [
      "Challenge comments and behaviours immediately; use phrases like: \"That comment is harmful, let's reframe it.\" or \"That comment doesn't align with our organisational values of respect and inclusion.\"",
      "Support the person affected by checking in privately, validating their experience, and asking what they need to move forward; escalate the actions of the perpetrator through the appropriate channels.",
      "Encourage bystander intervention, reinforce learning, and follow up with action to ensure accountability and long-term change.",
    ],
    isList: true,
  },
  {
    id: "s6",
    number: "06",
    title: "Making anti-racist decisions",
    content: [
      "Before making a decision ask yourself: Who benefits? Who is disadvantaged?",
      "Have we considered the impact on staff of colour?",
      "Do we have diverse voices informing this decision?",
      "Are we reproducing inequity, even unintentionally?",
      "This ensures policies, hiring decisions, curriculum choices, and disciplinary procedures are equitable.",
    ],
    isList: true,
  },
  {
    id: "s7",
    number: "07",
    title: "Equitable policies and systems",
    content: [
      "Review hiring, pay, and progression processes for bias.",
      "Ensure diverse panels and transparent criteria.",
      "Use data to identify inequities in recruitment, retention, and staff experience.",
      "Create clear reporting mechanisms and offer safe, confidential routes to raise racial concerns.",
      "Build accountability into systems, not just individual behaviour.",
    ],
    isList: true,
  },
  {
    id: "s8",
    number: "08",
    title: "Everyday anti-racist actions for staff",
    content: [
      "Call in or call out bias when you see it.",
      "Amplify the voices of colleagues of colour in meetings and projects.",
      "Share credit, opportunities, and visibility fairly.",
      "Avoid placing diversity labour solely on staff of colour.",
      "Challenge stereotypes in conversations, policies, and decision-making.",
      "Learn how different cultures communicate, collaborate, and express themselves.",
    ],
    isList: true,
  },
  {
    id: "s9",
    number: "09",
    title: "Supporting staff of colour",
    content: [
      "Create psychologically safe environments for feedback.",
      "Provide mentorship and sponsorship opportunities.",
      "Protect staff of colour from disproportionate workloads or emotional labour.",
      "Validate racialised experiences instead of minimising or questioning them.",
      "Offer wellbeing support that recognises racial trauma and workplace inequity.",
    ],
    isList: true,
  },
  {
    id: "s10",
    number: "10",
    title: "Learning, unlearning and accountability",
    content: [
      "Anti-racist practice is a continuous journey. Leaders and staff should engage in regular training and use reflective practice tools.",
      "Review your own behaviours and assumptions, and accept feedback without defensiveness.",
      "Commit to measurable action and track progress.",
      "Celebrate improvements while staying honest about areas needing change.",
    ],
    isList: true,
  },
];

const REFLECTION_QUESTIONS = [
  "How do I challenge bias in my daily interactions?",
  "Do my decisions reinforce or reduce inequity?",
  "Whose voices are missing from this conversation or policy?",
  "How am I using my privilege to support colleagues of colour?",
  "How do I respond when someone raises a racial concern?",
];

export default function AntiRacistPracticeGuidePage() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const downloadAsWord = () => {
    const css = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2C2C2C;margin:2cm}h1{font-family:Calibri,Arial,sans-serif;font-size:20pt;color:#2D5A3C;margin-bottom:4pt}h2{font-family:Calibri,Arial,sans-serif;font-size:13pt;color:#2D5A3C;margin-top:18pt;margin-bottom:6pt;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt}h3{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2D5A3C;margin-top:12pt;margin-bottom:4pt}p{font-size:11pt;line-height:1.5;margin:4pt 0}ul{margin:6pt 0 12pt 20pt}li{margin-bottom:6pt;line-height:1.5}.meta{color:#6b7280;font-size:10pt;margin-bottom:16pt}.footer{font-size:9pt;color:#6b7280;margin-top:24pt;border-top:1pt solid #e5e7eb;padding-top:8pt}.reflection{background:#f4f8f5;border-left:3pt solid #2D5A3C;padding:8pt 12pt;margin:12pt 0}';
    const body = SECTIONS.map((s) => "<h2>" + s.number + ". " + s.title + "</h2>" + (s.isList ? "<ul>" + (s.content as string[]).map((c) => "<li>" + c + "</li>").join("") + "</ul>" : "<p>" + (s.content as string) + "</p>")).join("") + "<h2>Tools and Reflection Questions</h2><ul>" + REFLECTION_QUESTIONS.map((q) => "<li>" + q + "</li>").join("") + "</ul>";
    const html =
      "<html xmlns:o=\'urn:schemas-microsoft-com:office:office\'" +
      " xmlns:w=\'urn:schemas-microsoft-com:office:word\'" +
      " xmlns=\'http://www.w3.org/TR/REC-html40\'>" +
      "<head><meta charset=\'utf-8\'><title>A Practical Guide to Anti-Racist Practice</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>A Practical Guide to Anti-Racist Practice</h1>" +
      "<p class=\'meta\'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class=\'footer\'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["\uFEFF", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anti-racist-practice-guide.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div data-noprint="true" style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Practical guide · 10 areas · Reflection tool</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 14px", lineHeight: 1.15 }}>
          A Practical Guide to Anti-Racist Practice
        </h1>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, maxWidth: 700, margin: "0 0 20px" }}>
          This resource offers clear, actionable strategies to help organisations and individuals recognise, challenge, and reduce racism in everyday practice. It provides practical tools for addressing bias, creating equitable systems, responding confidently to racism, and uplifting the voices and experiences of people of colour.
        </p>
        <div data-noprint="true" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Anti-Racism", "Racial Equity", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 20 }}>
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              style={{
                background: "#fff",
                border: "2px solid #e5e7eb",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card header */}
              <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontFamily: "Raleway, sans-serif", fontSize: 28, fontWeight: 800, color: "#7aab89", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{section.number}</span>
                  <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0, lineHeight: 1.3 }}>{section.title}</h2>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "16px 24px 24px", flex: 1 }}>
                {section.isList ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {(section.content as string[]).map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151", lineHeight: 1.7 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark, #2D5A3C)", flexShrink: 0, marginTop: 8 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: 0 }}>{section.content as string}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reflection questions block */}
        <div style={{ marginTop: 32, background: "var(--sage-dark, #2D5A3C)", borderRadius: 16, padding: "32px 36px" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 8px" }}>Section 11</p>
          <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", margin: "0 0 20px", lineHeight: 1.3 }}>Tools and reflection questions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {REFLECTION_QUESTIONS.map((q, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(255,255,255,0.10)", borderRadius: 10, padding: "14px 18px" }}>
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.5)", flexShrink: 0, lineHeight: 1.6 }}>{String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, margin: 0 }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related resources */}
      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "How to Be an Ally: A Step-by-Step Guide", slug: "how-to-be-an-ally", format: "Guide" },
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
                <button
                  onClick={downloadAsWord}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  📄 Download as Word doc
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
