"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const COMMON_PRONOUNS = [
  { pronouns: "She/her", example: "'She presented the report. Her analysis was excellent. The credit is hers.'" },
  { pronouns: "He/him", example: "'He led the meeting. His input was valued. The decision was his.'" },
  { pronouns: "They/them", example: "'They presented the report. Their analysis was excellent. The credit is theirs.'" },
  { pronouns: "Ze/hir", example: "'Ze presented the report. Hir analysis was excellent. The credit is hirs.'" },
  { pronouns: "Ze/zir", example: "'Ze presented the report. Zir analysis was excellent. The credit is zirs.'" },
  { pronouns: "Xe/xem", example: "'Xe presented the report. Xyr analysis was excellent. The credit is xyrs.'" },
];

const FAQS = [
  {
    q: "Isn't 'they/them' grammatically incorrect for a single person?",
    a: "No. Singular 'they' has been used in English for centuries: Shakespeare used it, Jane Austen used it, and we use it naturally all the time when someone's gender is unknown: 'Someone left their umbrella: I hope they come back for it.' The singular 'they' for a known person is a straightforward extension of a well-established usage. Major style guides, including the Oxford English Dictionary, the AP Stylebook, and the Chicago Manual of Style, all accept it.",
  },
  {
    q: "What if I find it difficult or uncomfortable to use someone's pronouns?",
    a: "Discomfort is understandable, especially if using non-binary or unfamiliar pronouns is new. But discomfort with change does not outweigh another person's right to be referred to correctly. The solution to discomfort is practice; say the pronouns out loud, use them in sentences when you are not with the person, and commit to getting it right. The discomfort reduces over time; the harm of being misgendered does not.",
  },
  {
    q: "What should I do if I make a mistake?",
    a: "Correct yourself briefly: 'she; sorry, they said...' and continue. Do not make a lengthy apology that requires the other person to reassure you. Do not make the same mistake again, because repeated misgendering after correction communicates that you do not consider the effort worthwhile.",
  },
  {
    q: "Should I ask everyone their pronouns?",
    a: "In a workplace context, normalising the sharing of pronouns (in introductions, on name badges, in email signatures, in team profile fields) is more effective than asking individuals one by one, which can single people out. Make it easy for everyone to share their pronouns if they choose to, and make it clear that not sharing is also fine.",
  },
  {
    q: "What if someone's pronouns change?",
    a: "Use the pronouns someone currently uses. If someone tells you their pronouns have changed, update your practice. It is not necessary to understand the reason; simply respect the request.",
  },
  {
    q: "Can I correct others if they use the wrong pronouns?",
    a: "Yes; and this is one of the most important things allies can do. A gentle, low-key correction in the moment normalises the use of correct pronouns and removes the burden from the person who has been misgendered. You do not need to make it a big issue; a brief 'actually they prefer they/them' is enough.",
  },
];

export default function PronounsGuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const downloadAsWord = () => {
    const css = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2C2C2C;margin:2cm}h1{font-family:Calibri,Arial,sans-serif;font-size:20pt;color:#2D5A3C;margin-bottom:4pt}h2{font-family:Calibri,Arial,sans-serif;font-size:13pt;color:#2D5A3C;margin-top:18pt;margin-bottom:6pt;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt}h3{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2D5A3C;margin-top:12pt;margin-bottom:4pt}p{font-size:11pt;line-height:1.5;margin:4pt 0}ul{margin:6pt 0 12pt 20pt}li{margin-bottom:6pt;line-height:1.5}.meta{color:#6b7280;font-size:10pt;margin-bottom:16pt}.footer{font-size:9pt;color:#6b7280;margin-top:24pt;border-top:1pt solid #e5e7eb;padding-top:8pt}.reflection{background:#f4f8f5;border-left:3pt solid #2D5A3C;padding:8pt 12pt;margin:12pt 0}';
    const body = FAQS.map((f) => "<h2>" + f.question + "</h2><p>" + f.answer + "</p>").join("");
    const html =
      "<html xmlns:o=\'urn:schemas-microsoft-com:office:office\'" +
      " xmlns:w=\'urn:schemas-microsoft-com:office:word\'" +
      " xmlns=\'http://www.w3.org/TR/REC-html40\'>" +
      "<head><meta charset=\'utf-8\'><title>Pronouns and Inclusive Language Guide</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>Pronouns and Inclusive Language Guide</h1>" +
      "<p class=\'meta\'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class=\'footer\'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["\uFEFF", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pronouns-guide.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div data-noprint="true" style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reference guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Understanding and Using Pronouns
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Using someone's correct pronouns is a basic act of respect. This guide explains what pronouns are, which ones people use, how to handle mistakes, and how to create a workplace where everyone can be referred to correctly.
        </p>
        <div data-noprint="true" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Gender Inclusion", "LGBTQ+", "Inclusive Language"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* What are pronouns */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 16 }}>What are pronouns, and why do they matter?</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 14 }}>
            Pronouns are the words we use to refer to someone when we are not using their name: he, she, they, and others. Most people have pronouns they are referred to by, and most people rarely have to think about this because their pronouns are assumed correctly by others.
          </p>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 14 }}>
            For trans, non-binary, and gender non-conforming people, their pronouns may not match what others assume based on their appearance. Being consistently referred to with the wrong pronouns (being misgendered) is harmful: it signals that a person is not seen or respected as they are, and research links repeated misgendering with significant impacts on mental health and wellbeing.
          </p>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
            Using someone's correct pronouns is not a political statement. It is a basic act of respect, equivalent to spelling someone's name correctly or using the name they have told you they prefer.
          </p>
        </div>

        {/* Common pronouns table */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 6 }}>Pronouns in use</h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>The same sentence: 'They/she/he presented the report', shown with each pronoun set.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {COMMON_PRONOUNS.map((item) => (
              <div key={item.pronouns} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 16px", background: "var(--sage-xlight, #f4f8f5)", borderRadius: 8 }}>
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 14, color: "var(--sage-dark, #2D5A3C)", minWidth: 80, paddingTop: 2 }}>{item.pronouns}</span>
                <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{item.example}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 12, lineHeight: 1.6 }}>This is not an exhaustive list. Some people use other pronoun sets, or multiple sets, or no pronouns at all (preferring their name only). When in doubt, ask or default to they/them.</p>
        </div>

        {/* How to share */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 16 }}>Creating a culture where people share pronouns</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "In introductions", body: "When you introduce yourself (in a meeting, a workshop, or a new team setting) share your own pronouns: 'I'm Alex, I use she/her.' This normalises the practice and signals that sharing is welcome, without putting anyone on the spot." },
              { title: "In email signatures", body: "Adding your pronouns to your email signature is a simple, visible signal that you take this seriously. Many organisations now include a field for this in their standard signature template." },
              { title: "In team profiles and systems", body: "Where your HR or intranet systems allow, enable a pronouns field and encourage people to complete it. Make clear that it is optional; the goal is to make it easy for those who want to share, not to compel disclosure." },
              { title: "In event and meeting facilitation", body: "Build pronouns into name badges, online profile names, and introductions for events. A simple 'feel free to share your pronouns as you introduce yourself' is enough; do not require it." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px", background: "#f9fafb", borderRadius: 8 }}>
                <div>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--charcoal, #2C2C2C)", margin: "0 0 6px" }}>{item.title}</p>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Common questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: "100%", textAlign: "left", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.5 }}>{faq.q}</span>
                    <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 18, fontWeight: 300, flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #f3f4f6", padding: "16px 20px" }}>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Gender identity at work</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Creating a workplace where trans, non-binary, and gender non-conforming people can be themselves requires both cultural and structural change. Pronouns are one visible, practical element of that; but they sit alongside policies on gender recognition, changing facilities, dress codes, and harassment, as well as the everyday culture shaped by leadership and team norms.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Getting pronouns right is not the finish line. It is a starting point for broader work on gender inclusion; and it signals clearly that your organisation intends to do that work.
          </p>
        </div>
      </div>

      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "EDI Glossary", slug: "edi-glossary", format: "Glossary" },
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
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
