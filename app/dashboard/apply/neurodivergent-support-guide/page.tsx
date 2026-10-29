"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SECTIONS = [
  {
    id: "what",
    title: "What is neurodivergence?",
    content: [
      "Neurodivergence refers to neurological development that differs from what is considered typical. This includes autism, ADHD, dyslexia, dyspraxia, dyscalculia, Tourette syndrome, and sensory processing differences, among others.",
      "The term 'neurodivergent' was coined to challenge the assumption that one way of thinking, processing, and experiencing the world is the standard against which everyone else is measured. Around 15 to 20 per cent of the global population is neurodivergent; which means neurodivergence is common, and workplaces that are not designed with this in mind are routinely excluding a significant proportion of their workforce.",
      "It is important to note that neurodivergence is not a medical deficit or a disorder to be fixed. Many neurodivergent people bring distinctive strengths to their work; including pattern recognition, hyper-focus, creative thinking, and attention to detail. The challenge is rarely the person; it is the environment.",
    ],
  },
  {
    id: "barriers",
    title: "Common workplace barriers for neurodivergent people",
    content: [
      "Open-plan offices and hot-desking environments can create significant sensory overload for people with autism, ADHD, or sensory processing differences. Noise, bright lighting, unpredictable movement, and the absence of a consistent, quiet workspace can make sustained focus extremely difficult.",
      "Unclear or ambiguous communication creates particular challenges for many autistic people, who may prefer direct, explicit instructions over implied meanings, social cues, or unwritten rules.",
      "Rigid working hours, frequent interruptions, and meetings without agendas or advance materials can be barriers for people with ADHD, who may work most effectively with structured time blocks and advance notice of what to expect.",
      "Unstructured social expectations (networking events, after-work drinks, team-building exercises that rely on improvisation) can be exhausting and exclusionary for people with social communication differences.",
      "Stigma and lack of awareness are among the most consistent barriers. Many neurodivergent people choose not to disclose because they have experienced disbelief, dismissal, or unwanted changes to how they are treated.",
    ],
  },
  {
    id: "adjustments",
    title: "Reasonable adjustments that make a real difference",
    content: [
      "Quiet working spaces or the option to work from home, away from sensory distractions, can be transformative for neurodivergent employees.",
      "Clear, written communication for all tasks, projects, and expectations (rather than relying on verbal briefings or implicit norms) helps many neurodivergent people work more effectively.",
      "Flexible working arrangements, including asynchronous communication and the ability to structure the working day around periods of high focus, can significantly reduce barriers for people with ADHD and autism.",
      "Advance notice of changes, meetings, and social events gives neurodivergent people the time to prepare; which can make the difference between engaging effectively and being unable to participate.",
      "Adjusted interview and assessment processes (such as providing questions in advance, offering written alternatives to verbal tasks, or allowing extra time) enable neurodivergent candidates to demonstrate their actual abilities.",
      "Noise-cancelling headphones, individual desks, and controlled lighting are low-cost physical adjustments that make a significant difference for many neurodivergent people.",
    ],
  },
  {
    id: "disclosure",
    title: "Supporting disclosure and reducing stigma",
    content: [
      "Many neurodivergent people have had negative experiences of disclosure: being disbelieved, being treated differently, having their competence questioned, or having their support needs dismissed. Creating a culture in which disclosure is safe requires sustained, visible commitment from leadership; not just a policy.",
      "Leaders and managers who are open about their own neurodivergence or about their commitment to neurodivergent inclusion send a powerful signal. Employee resource groups and peer networks for neurodivergent employees also create community and reduce isolation.",
      "Adjust your approach to performance management for neurodivergent employees. Clear expectations, written feedback, and consistent check-ins are generally more effective than informal feedback delivered on the assumption that people will infer meaning from tone or body language.",
      "Avoid policing behaviours that look unusual but cause no harm: stimming, avoiding eye contact, wearing headphones, sitting differently, or needing to move. If a behaviour is not disrupting anyone else, it does not need to be managed.",
    ],
  },
  {
    id: "language",
    title: "Language and communication",
    content: [
      "Language around neurodivergence varies and continues to evolve. Some people prefer identity-first language ('I am autistic') while others prefer person-first language ('I have autism'). Follow the preference of the individual you are speaking with, and when in doubt, ask.",
      "Avoid language that frames neurodivergence as a deficit, problem, or tragedy. Terms like 'suffers from', 'afflicted by', or 'a disability like autism' carry assumptions that many neurodivergent people strongly reject.",
      "Do not assume that a diagnosis tells you everything about how someone experiences their neurodivergence. Two autistic people, or two people with ADHD, may have entirely different support needs and entirely different experiences of their own neurodivergence.",
      "Casual and stigmatising uses of neurodivergence-related terms (such as 'I\'m so OCD about tidiness', 'that\'s a bit autistic', or 'she\'s so ADHD') cause harm. Challenge these uses when you hear them, as you would any other stigmatising language.",
    ],
  },
];

export default function NeurodivergentSupportGuidePage() {
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
          <span style={{ color: "#6b7280", fontSize: 13 }}>Support guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Supporting Neurodivergent People at Work
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Around one in seven people is neurodivergent; yet most workplaces are designed in ways that create unnecessary barriers for them. This guide covers what neurodivergence is, common workplace barriers, practical adjustments, and how to build a culture where neurodivergent people can thrive.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Neurodivergence", "Disability Inclusion", "Accessibility"].map((tag) => (
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
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Neurodivergent inclusion is workplace design</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The barriers that neurodivergent people face at work are rarely about capability. They are about workplace design: environments, communication norms, and processes built around a narrow model of how people work that does not reflect the full range of human cognition.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            When organisations genuinely support neurodivergent people, they do not just help those individuals; they often improve conditions for everyone. Clearer communication, flexible working, structured processes, and quieter environments benefit the whole workforce.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Inclusive Meeting Checklist", slug: "inclusive-meeting-checklist", format: "Checklist" },
              { title: "EDI Glossary", slug: "edi-glossary", format: "Glossary" },
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
