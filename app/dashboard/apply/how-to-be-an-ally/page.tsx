"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useRef } from "react";

const SECTIONS = [
  {
    id: "understand",
    title: "Understand what allyship actually means",
    content: [
      "Allyship is not a badge or a label — it is a practice. You do not become an ally once; you choose to act as one, repeatedly, in ways that may cost you something.",
      "An ally uses their privilege and position to support people who face systemic disadvantage. This means listening, learning, and taking action even when it is uncomfortable — especially in spaces where marginalised people are not present or are unlikely to be heard.",
      "Allyship is not about performing solidarity for approval. It is about showing up consistently, including when nobody is watching.",
    ],
  },
  {
    id: "listen",
    title: "Listen before you speak",
    content: [
      "Before you can be an effective ally, you need to understand the experiences of the people you want to support. Listen to those experiences with the intention of understanding, not defending or problem-solving.",
      "Resist the urge to minimise, compare, or explain. When someone shares an experience of discrimination or exclusion, your job is to hear them — not to tell them why it may not have been as bad as it seemed, or to share a similar experience of your own.",
      "Seek out books, podcasts, articles, and organisations led by people from the groups you want to support. Do not rely solely on individuals from marginalised groups to educate you — that labour is often unpaid and exhausting.",
    ],
  },
  {
    id: "speak-up",
    title: "Speak up in the moment",
    content: [
      "One of the most powerful things an ally can do is interrupt bias and exclusion when it happens — in meetings, in corridors, in group chats, in hiring decisions.",
      "You do not need to be aggressive or confrontational. A simple, calm response is often most effective: 'I want to go back to something that was said earlier' or 'I'm not sure that landed the way it was intended — can we revisit it?'",
      "If you miss the moment, follow up privately with the person who was affected. Check in and ask what, if anything, would be helpful from you.",
      "Be especially alert to patterns rather than isolated incidents — who gets interrupted in meetings, whose ideas are credited, who is excluded from social events, who is always asked to take notes.",
    ],
  },
  {
    id: "amplify",
    title: "Amplify and credit marginalised voices",
    content: [
      "Notice when a colleague from an underrepresented group makes a point that is ignored, then repeated by someone else and celebrated. Name what happened: 'I want to come back to what [name] said earlier, because I think it deserves more attention.'",
      "Credit ideas clearly and consistently. If you are presenting something that came from someone else, say so — especially if they are not in the room.",
      "Recommend colleagues from underrepresented groups for speaking opportunities, stretch projects, panels, and promotions. Use your access to open doors.",
    ],
  },
  {
    id: "use-privilege",
    title: "Use your privilege actively",
    content: [
      "Privilege is not something to feel guilty about — it is something to use. Ask yourself who has access to the spaces and conversations you move through, and how you can use that access to advocate for others.",
      "This might mean raising concerns about a hiring process, pushing back on a policy that disadvantages a particular group, or simply ensuring that the right people are in the room before key decisions are made.",
      "Be willing to take up less space so that others can take up more. This does not mean disappearing — it means redirecting attention, credit, and opportunities towards people who are systematically denied them.",
    ],
  },
  {
    id: "mistakes",
    title: "Handle mistakes well",
    content: [
      "You will get things wrong. Allyship does not require perfection — it requires accountability.",
      "When you make a mistake, resist the urge to centre your own discomfort. Apologise briefly and sincerely, correct the behaviour, and move on. Do not make the affected person responsible for reassuring you.",
      "Equally, do not let the fear of making mistakes stop you from acting. Staying silent to avoid saying the wrong thing is a choice that protects your comfort at the expense of others.",
      "Use mistakes as data: what did you miss, and what will you do differently? Then do it differently.",
    ],
  },
  {
    id: "consistency",
    title: "Commit to consistency",
    content: [
      "Allyship that only appears when it is visible, celebrated, or convenient is not allyship — it is performance.",
      "Commit to the less visible work: reading, reflecting, having difficult conversations with peers and family, pushing back in meetings where the stakes feel low, and advocating for structural change rather than just individual gestures.",
      "Check in with yourself regularly: where have I spoken up this month, and where have I stayed quiet? What has my silence enabled?",
    ],
  },
];

export default function HowToBeAnAllyPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Guide
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Practical guide &middot; Updated October 2026</span>
        </div>

        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          How to Be an Ally: A Practical Guide
        </h1>

        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Allyship is one of the most talked-about concepts in EDI — and one of the most misunderstood. This guide cuts through the noise and focuses on what effective allyship actually looks like in practice: at work, in everyday interactions, and over time.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Allyship", "Inclusion Practices", "Behaviour Change"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div ref={resultsRef} style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SECTIONS.map((section, i) => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--charcoal, #2C2C2C)" }}>
                      {section.title}
                    </span>
                  </div>
                  <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 20, fontWeight: 300, flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid #f3f4f6", padding: "24px 24px 28px" }}>
                    {section.content.map((para, j) => (
                      <p key={j} style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, margin: j < section.content.length - 1 ? "0 0 16px" : "0" }}>
                        {para}
                      </p>
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
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>
            Why allyship matters
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Inclusion does not happen because organisations declare it a priority. It happens because individuals in positions of relative power consistently choose to act in ways that dismantle barriers for others. That is what allyship is — not an identity, but a series of choices.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Research consistently shows that allyship from majority group members is one of the most effective drivers of inclusive workplace culture. It shifts responsibility for inclusion away from the people who already bear the greatest cost of exclusion, and towards those with the most structural power to change things.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Recognising Bias: Common Types in the Workplace", slug: "recognising-bias", format: "Tool" },
              { title: "Challenging Non-Inclusive Behaviour", slug: "challenging-non-inclusive-behaviour", format: "Guide" },
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
