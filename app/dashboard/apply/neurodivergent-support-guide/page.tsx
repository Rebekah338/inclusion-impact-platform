"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Rating = "not-yet" | "getting-there" | "doing-this";

const SECTIONS = [
  {
    id: "s1",
    number: "01",
    title: "Create flexible working conditions",
    content: "Flexible working is one of the most impactful adjustments you can make. Offering flexible hours, hybrid or remote options, and adjusted schedules removes structural barriers that affect many neurodivergent people. Allow movement breaks, quiet time, and sensory regulation breaks without stigma, and provide real choice in work location including quiet zones, low-light areas, and private spaces.",
    nudges: {
      "not-yet": "Start with one small change: ask your team whether the current working setup works for them, and whether there is anything that would help them do their best work. That question alone opens the door.",
      "getting-there": "You are offering some flexibility. The next step is making sure it is genuinely available without people having to fight for it: does your team know they can use these options without needing to explain themselves?",
      "doing-this": "You are leading well here. Think about whether flexibility is embedded in how you plan and operate, or whether people still have to ask permission each time. Systemic flexibility is more powerful than case-by-case allowances.",
    },
  },
  {
    id: "s2",
    number: "02",
    title: "Adapt the physical environment",
    content: "Sensory environments have a significant impact on neurodivergent people. Reducing sensory overload from harsh lighting, loud spaces, and strong smells is a practical step with real impact. Provide noise-cancelling headphones, desk dividers, or low-stimulation areas where possible, and ensure seating and workspace layouts can be adjusted to individual needs.",
    nudges: {
      "not-yet": "Walk through your workspace with fresh eyes: is there anything that might be overwhelming for someone with sensory sensitivities? Noticing is the first step toward changing it.",
      "getting-there": "You are making some adjustments. Now ask the people in your team directly: is there anything about this environment that makes it harder for you to focus or feel comfortable? Their answer will be more specific than any checklist.",
      "doing-this": "You are proactive here. Think about whether these adaptations are visible and normalised, or whether people feel they have to ask for them quietly. Openly available options reduce the burden on individuals to disclose.",
    },
  },
  {
    id: "s3",
    number: "03",
    title: "Improve communication practices",
    content: "Clear, predictable communication reduces the cognitive load on neurodivergent team members. Use clear, concise instructions in both written and verbal form, and provide information in multiple formats: visual, step-by-step, and video where possible. Allow extra processing time and avoid putting people on the spot in meetings. Share agendas in advance and summarise key points afterwards.",
    nudges: {
      "not-yet": "Choose one upcoming meeting and try two things: send the agenda at least 24 hours in advance, and follow up with a written summary of key points. See what difference it makes.",
      "getting-there": "You are communicating more inclusively in some areas. The next step is consistency: do these practices apply to all communications, or only when you remember? Building them into your default approach is what makes the real difference.",
      "doing-this": "Your communication practices are strong. Think about whether you are also creating space for people to tell you when they have not understood something, without it feeling awkward or risky for them.",
    },
  },
  {
    id: "s4",
    number: "04",
    title: "Adjust workload and expectations",
    content: "Many neurodivergent people work best with clear structure and predictability. Break large tasks into manageable steps, and use project management tools that support organisation. Provide clarity on priorities so people know what is urgent versus non-urgent, and avoid sudden changes without explanation where possible. Consistency in expectations reduces anxiety and supports sustained performance.",
    nudges: {
      "not-yet": "Think about the last time you gave someone a large task. Did you break it down, or hand it over as one block? Try chunking your next task brief into smaller steps and see how it lands.",
      "getting-there": "You are building better structure into how work is assigned. Now look at your approach to changing priorities: when things shift, do you explain why? That context makes a significant difference to neurodivergent team members.",
      "doing-this": "You manage workload and expectations well. Think about whether this structure is benefiting everyone on your team, or whether some people are still experiencing ambiguity. A quick one-to-one check-in can reveal a lot.",
    },
  },
  {
    id: "s5",
    number: "05",
    title: "Offer role-specific adjustments",
    content: "Standard ways of demonstrating competence do not always reflect actual ability. Allow alternative ways for people to show what they can do: written instead of verbal, individual instead of group, asynchronous instead of real-time. Permit camera-off meetings when sensory or fatigue issues arise, and tailor performance metrics to remove unnecessary barriers that are not related to the core requirements of the role.",
    nudges: {
      "not-yet": "Think about one area of your role or team's work where there is only one accepted way of doing things. Is that format actually necessary, or is it just the default? Questioning defaults is where inclusion starts.",
      "getting-there": "You are opening up some alternatives. Now check whether the adjustments you are offering are actually used: if people are not taking them up, ask yourself whether they feel safe enough to do so.",
      "doing-this": "You are creating genuine flexibility here. Think about whether these adjustments are documented and consistently applied, so they survive changes in management or team structure.",
    },
  },
  {
    id: "s6",
    number: "06",
    title: "Provide supportive technology and tools",
    content: "The right tools can make a significant difference to how neurodivergent people manage their work. Speech-to-text and text-to-speech software, mind-mapping tools for planning ideas, timers and reminders, digital organisers, dyslexia-friendly fonts, and colour overlays are all worth making available. The goal is to ensure access to the tools people actually need, not just the tools you have always used.",
    nudges: {
      "not-yet": "Ask your team: are there any tools or software that would help you work better? You do not need a budget to start: many accessibility tools are free or already built into existing systems.",
      "getting-there": "You are providing some tools. Now make sure people know what is available and how to access it: awareness of options is as important as the options themselves.",
      "doing-this": "You are well set up here. Think about whether access to tools is equitable across your team: are remote workers or those in different locations getting the same support as those on-site?",
    },
  },
  {
    id: "s7",
    number: "07",
    title: "Build a neuroinclusive culture",
    content: "Individual adjustments are only sustainable in a culture that understands and values neurodiversity. Train all staff in neurodiversity awareness, not just managers. Normalise adjustments by making them available to everyone, not just those who have disclosed a diagnosis. Encourage understanding, patience, and non-judgemental communication, and actively challenge stereotypes and deficit-based language about neurodivergent people.",
    nudges: {
      "not-yet": "Start with a conversation. Raise neurodiversity in your next team meeting or one-to-one: not to put anyone on the spot, but to signal that it is something you take seriously and want to support.",
      "getting-there": "You are raising awareness. The next step is making sure training and conversation translate into changed behaviour: what specifically is different about how your team communicates or works together since you started this work?",
      "doing-this": "You are building something real here. Think about sustainability: what happens when a new person joins the team, or when you are not around? Is the culture embedded, or does it depend on you?",
    },
  },
  {
    id: "s8",
    number: "08",
    title: "Protect psychological safety",
    content: "Neurodivergent people are more likely to mask, and masking is exhausting. Protecting psychological safety means providing safe spaces for disclosure without ever pressuring it. Challenge microaggressions and ableist assumptions when they arise. Encourage managers to ask: what do you need to work at your best? and foster a culture where mistakes are treated as learning opportunities rather than failures.",
    nudges: {
      "not-yet": "Think about the last time someone in your team made a mistake. How was it handled? The way mistakes are responded to tells people a great deal about how safe it is to be themselves.",
      "getting-there": "You are creating more safety. The next step is making it explicit: do people on your team know they can disclose or ask for support without it affecting how they are perceived?",
      "doing-this": "You have built genuine psychological safety. Think about how you sustain it under pressure: are you as consistent when things are difficult as when they are easy?",
    },
  },
  {
    id: "s9",
    number: "09",
    title: "Strengthen support systems",
    content: "Individual support matters. Mentoring or buddy systems can provide neurodivergent employees with trusted points of contact beyond their direct manager. Regular one-to-one check-ins should focus on wellbeing as well as performance, and employees should have clear, accessible routes to occupational health, coaching, or employee assistance programmes. The goal is for people to feel they have somewhere to go.",
    nudges: {
      "not-yet": "Think about someone on your team who might benefit from additional support. Is there a clear route for them to access it? If not, that is where to start.",
      "getting-there": "You have some support structures in place. Now check whether they are actually being used: if not, ask yourself whether the route to accessing them is clear, visible, and free of stigma.",
      "doing-this": "Your support systems are strong. Think about whether they work equally well for everyone on your team, including those who are less likely to ask for help directly.",
    },
  },
  {
    id: "s10",
    number: "10",
    title: "Co-create adjustments",
    content: "The most effective adjustments are developed collaboratively with the individual. Develop personalised support plans together rather than imposing a standard template. Review adjustments regularly, because needs can evolve over time, and what worked six months ago may no longer be the right fit. Ensure confidentiality and autonomy in all decision-making, and respect that the individual is the expert on their own experience.",
    nudges: {
      "not-yet": "If you manage someone who has disclosed a neurodivergent condition, ask them directly: what would help most right now? If no one on your team has disclosed, reflect on whether the environment makes disclosure feel safe.",
      "getting-there": "You are involving people in their own support. Now make sure this is a regular conversation rather than a one-off event: set a reminder to check in on how adjustments are working every few months.",
      "doing-this": "You are genuinely co-creating here. Think about whether the process feels comfortable for the people involved: do they feel heard and respected throughout, or does it sometimes feel like a compliance exercise?",
    },
  },
  {
    id: "s11",
    number: "11",
    title: "Inclusive hiring and onboarding",
    content: "Barriers to neurodivergent candidates often appear before they even start a role. Provide interview questions in advance, offer alternative application formats, and avoid panel-heavy or rapid-fire interviews that disadvantage people who process information differently. Give structured, predictable onboarding with clear expectations: a well-designed start reduces anxiety and sets neurodivergent employees up to contribute from the beginning.",
    nudges: {
      "not-yet": "Look at your current interview or onboarding process. Is there one thing that could be improved to reduce unnecessary pressure or unpredictability? Start there.",
      "getting-there": "You are making your processes more inclusive. Now check whether these changes are consistently applied: do all hiring managers know about them, and do all candidates benefit from them?",
      "doing-this": "Your hiring and onboarding are strong. Think about whether candidates know in advance what to expect: proactive communication about the process is one of the simplest and most effective things you can do.",
    },
  },
];

const RATING_OPTIONS: { value: Rating; label: string; color: string; bg: string; border: string }[] = [
  { value: "not-yet",       label: "Not yet",         color: "#92400e", bg: "#fef3c7", border: "#fcd34d" },
  { value: "getting-there", label: "Getting there",   color: "#1e40af", bg: "#eff6ff", border: "#93c5fd" },
  { value: "doing-this",    label: "Doing this well", color: "#166534", bg: "#f0fdf4", border: "#86efac" },
];

export default function NeurodivergentSupportGuidePage() {
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [showShareMenu, setShowShareMenu] = useState(false);

  const downloadAsWord = () => {
    const css = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2C2C2C;margin:2cm}h1{font-family:Calibri,Arial,sans-serif;font-size:20pt;color:#2D5A3C;margin-bottom:4pt}h2{font-family:Calibri,Arial,sans-serif;font-size:13pt;color:#2D5A3C;margin-top:18pt;margin-bottom:6pt;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt}p{font-size:11pt;line-height:1.5;margin:4pt 0}.meta{color:#6b7280;font-size:10pt;margin-bottom:16pt}.footer{font-size:9pt;color:#6b7280;margin-top:24pt;border-top:1pt solid #e5e7eb;padding-top:8pt}';
    const body = SECTIONS.map((s) => "<h2>" + s.number + ". " + s.title + "</h2><p>" + s.content + "</p>").join("");
    const html =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office'" +
      " xmlns:w='urn:schemas-microsoft-com:office:word'" +
      " xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Supporting Neurodivergent Employees: Guidance and Considerations</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>Supporting Neurodivergent Employees</h1>" +
      "<p class='meta'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class='footer'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["﻿", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neurodivergent-support-guide.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const rated = Object.keys(ratings).length;
  const total = SECTIONS.length;
  const doingWell = Object.values(ratings).filter((r) => r === "doing-this").length;
  const notYet = Object.values(ratings).filter((r) => r === "not-yet").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Self-assessment &middot; 11 practice areas</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 14px", lineHeight: 1.15 }}>
          Supporting Neurodivergent Employees
        </h1>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, maxWidth: 680, margin: "0 0 20px" }}>
          This guide covers eleven practical areas for creating a neuroinclusive workplace. Rate yourself honestly on each one and get a personalised nudge to help you take the next step in your practice.
        </p>

        {rated > 0 && (
          <div data-noprint="true" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{rated} of {total} rated</span>
                {doingWell > 0 && <span style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>{doingWell} doing well</span>}
              </div>
              <div style={{ background: "#f3f4f6", borderRadius: 6, height: 8, overflow: "hidden" }}>
                <div style={{ background: "var(--sage-dark, #2D5A3C)", height: "100%", width: `${(rated / total) * 100}%`, borderRadius: 6, transition: "width 0.4s ease" }} />
              </div>
            </div>
            {notYet > 0 && (
              <span style={{ fontSize: 13, color: "#92400e", background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>
                {notYet} area{notYet > 1 ? "s" : ""} to develop
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card grid */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 20 }}>
          {SECTIONS.map((section) => {
            const rating = ratings[section.id] as Rating | undefined;
            const nudge = rating ? section.nudges[rating] : null;
            const ratingMeta = RATING_OPTIONS.find((r) => r.value === rating);

            return (
              <div key={section.id} style={{
                background: "#fff",
                border: `2px solid ${ratingMeta ? ratingMeta.border : "#e5e7eb"}`,
                borderRadius: 16,
                overflow: "hidden",
                transition: "border-color 0.2s",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontFamily: "Raleway, sans-serif", fontSize: 28, fontWeight: 800, color: "#7aab89", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{section.number}</span>
                    <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0, lineHeight: 1.3 }}>{section.title}</h2>
                  </div>
                </div>

                <div style={{ padding: "16px 24px 20px", flex: 1 }}>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: "0 0 20px" }}>{section.content}</p>

                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 3px", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ filter: "sepia(1) saturate(3) hue-rotate(330deg) brightness(0.6)" }}>👆</span> How are you doing with this?
                    </p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Tap a button to get your personalised nudge</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {RATING_OPTIONS.map((opt) => {
                      const selected = rating === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setRatings((prev) => ({ ...prev, [section.id]: opt.value }))}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 20,
                            border: `1.5px solid ${selected ? opt.border : "#e5e7eb"}`,
                            background: selected ? opt.bg : "#fff",
                            color: selected ? opt.color : "#6b7280",
                            fontSize: 13,
                            fontWeight: selected ? 700 : 500,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          {selected ? "✓ " : ""}{opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {nudge && ratingMeta && (
                    <div style={{
                      marginTop: 16,
                      padding: "12px 16px",
                      background: ratingMeta.bg,
                      border: `1px solid ${ratingMeta.border}`,
                      borderRadius: 10,
                      fontSize: 13,
                      color: ratingMeta.color,
                      lineHeight: 1.7,
                    }}>
                      {nudge}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {rated === total && (
          <div style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", borderRadius: 16, padding: "32px 36px", marginTop: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
            <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 20, margin: "0 0 10px" }}>You have rated all eleven areas</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", margin: "0 0 20px", lineHeight: 1.7 }}>
              {doingWell === total
                ? "You are doing all of this well. Think about how you help others in your organisation reach the same standard."
                : notYet > 0
                ? `You have identified ${notYet} area${notYet > 1 ? "s" : ""} to develop. Pick one and act on its nudge before revisiting the others.`
                : "You are getting there across all areas. Consistency is what turns good intentions into lasting neuroinclusive practice."}
            </p>
            <Link href="/dashboard/apply/inclusive-leadership-reflection" style={{ display: "inline-block", background: "#fff", color: "var(--sage-dark, #2D5A3C)", padding: "12px 24px", borderRadius: 8, fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Next: Inclusive Leadership Reflection &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* About section */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Neurodiversity in the workplace</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Neurodiversity refers to the natural variation in how human brains work. Conditions including ADHD, autism, dyslexia, dyspraxia, dyscalculia, and Tourette syndrome are all examples of neurodivergent profiles. Around one in five people is neurodivergent, meaning the likelihood is high that someone on your team or in your organisation is navigating a workplace that was not designed with them in mind.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Neuroinclusion is not about lowering standards: it is about removing barriers so that people can meet them. The adjustments in this guide benefit everyone, not just those who have disclosed a diagnosis.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
              { title: "Inclusive Leadership Reflection Tool", slug: "inclusive-leadership-reflection", format: "Reflection Tool" },
              { title: "Recognising Bias: Common Types in the Workplace", slug: "recognising-bias", format: "Tool" },
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
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
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
