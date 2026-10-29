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
    title: "Understand what allyship means",
    content: "Allyship is not a badge or a one-time declaration. It is an ongoing, active practice of using your position, privilege, and influence to support people who face barriers you do not. It requires listening more than speaking, and acting even when it is uncomfortable.",
    nudges: {
      "not-yet": "Start by reading one personal account from someone with a different background to yours. Listening before acting is the foundation of allyship.",
      "getting-there": "You have the awareness. Now look for one concrete action you can take this week; not a grand gesture, just a small, consistent step.",
      "doing-this": "You understand this deeply. Think about how you model it: are the people around you learning what allyship means by watching you?",
    },
  },
  {
    id: "s2",
    number: "02",
    title: "Listen before you speak",
    content: "Before offering advice, solutions, or opinions, create space for the people you want to support to share their own experiences. Ask open questions. Resist the urge to fix, minimise, or relate everything back to yourself. The experience of marginalisation is not yours to define.",
    nudges: {
      "not-yet": "Try this: in your next meeting or conversation, count how often you speak before the other person has finished. Just noticing is the first step.",
      "getting-there": "You are getting better at this. The next level is asking 'what would be most helpful right now?' rather than assuming you know what someone needs.",
      "doing-this": "Great listening is rare. Think about how you pass this skill on; do you name it in your team, or model it in how you run meetings?",
    },
  },
  {
    id: "s3",
    number: "03",
    title: "Speak up in the moment",
    content: "When you witness exclusionary behaviour (a joke, an interruption, an assumption) say something. You do not need the perfect words. A quiet 'I am not sure that landed well' or 'I want to make sure we hear from everyone' is enough. Silence reads as agreement.",
    nudges: {
      "not-yet": "Start by simply noticing when exclusionary moments happen. Identifying them is harder than it sounds; and it is the first skill to build.",
      "getting-there": "You are aware of these moments. Try preparing one or two go-to phrases so you have words ready when the moment comes.",
      "doing-this": "You speak up consistently. Now consider: are you doing this only when it feels safe, or also when it costs you something?",
    },
  },
  {
    id: "s4",
    number: "04",
    title: "Amplify and credit marginalised voices",
    content: "If a colleague's idea was talked over, say: 'I want to come back to what [name] said.' If someone is not in the room when their work is being discussed, make sure they get the credit. Amplification is one of the simplest and most impactful forms of allyship.",
    nudges: {
      "not-yet": "This week, notice once when someone's contribution goes uncredited or gets taken over. You do not have to act immediately; just build the habit of noticing.",
      "getting-there": "You credit people when you remember. Now make it a habit: at the end of each meeting, ask yourself whether everyone who contributed was acknowledged.",
      "doing-this": "You do this well. Think about whether you are also doing it in emails, reports, and conversations outside the room; not just in real time.",
    },
  },
  {
    id: "s5",
    number: "05",
    title: "Use your privilege actively",
    content: "Privilege is not about guilt; it is about recognising that some doors open more easily for you, and using that to hold them open for others. This might mean recommending a colleague for an opportunity, sharing your platform, or using your access to raise issues on behalf of people who cannot raise them safely.",
    nudges: {
      "not-yet": "Think about one door that has opened more easily for you. Who could you hold it open for? You do not need to have it all figured out; just start with one person, one moment.",
      "getting-there": "You are starting to see the opportunities. The next step is acting on them without waiting for the perfect moment; small, consistent uses of privilege add up.",
      "doing-this": "You use your position actively. Now think about sustainability: are you burning yourself out by taking on too much, or sharing the load with other allies?",
    },
  },
  {
    id: "s6",
    number: "06",
    title: "Handle mistakes well",
    content: "You will get things wrong. When you do (mispronounce a name, make an assumption, say the wrong thing) the response matters more than the mistake. Apologise briefly and sincerely. Do not over-explain or make it about your feelings. Then do better. Do not let fear of getting it wrong stop you from showing up.",
    nudges: {
      "not-yet": "Think about a recent moment where you could have responded better. What would you do differently? Reflection without self-punishment is a skill worth practising.",
      "getting-there": "You are learning to recover well. The next step is speed: the quicker and more naturally you correct course, the lower the cost for the other person.",
      "doing-this": "You handle this with real skill. Consider whether you are also helping others around you learn to recover well; modelling accountability is powerful.",
    },
  },
  {
    id: "s7",
    number: "07",
    title: "Commit to consistency",
    content: "Allyship that only shows up when it is convenient or publicly visible is not allyship; it is performance. The most meaningful ally behaviours happen in small, private moments: defending someone who is not in the room, questioning a process that disadvantages others, or simply showing up repeatedly over time.",
    nudges: {
      "not-yet": "Consistency is built in small moments. Identify one specific, repeatable action you could take every week; and treat it like any other professional commitment.",
      "getting-there": "You show up a lot of the time. Now examine the moments you do not; what tends to get in the way? Is it risk, energy, or habit?",
      "doing-this": "Consistency is your strength. Think about how you sustain it: what keeps you going, and are you building a culture where others can be consistently ally-like too?",
    },
  },
  {
    id: "s8",
    number: "08",
    title: "Use micro-affirmations",
    content: "Micro-affirmations are small, often subtle acts or words that acknowledge, validate, and support someone's contributions or identity. They are the positive flipside of microaggressions: tiny moments of recognition that build inclusion, belonging, and confidence over time. Practising them consistently is a key part of allyship.",
    nudges: {
      "not-yet": "Start by noticing one colleague this week and acknowledging something they contributed that might have gone unrecognised. Small and specific is more powerful than grand and vague.",
      "getting-there": "You are building this habit. Now make it deliberate: at the end of each week, think about who you affirmed and who you missed.",
      "doing-this": "You do this naturally. Think about whether you are also teaching others what micro-affirmations look like; naming the practice helps it spread.",
    },
  },
  {
    id: "s9",
    number: "09",
    title: "Support accessibility",
    content: "Ensure meetings, materials, and spaces are physically, digitally, and cognitively accessible. Allyship means proactively removing barriers, asking what adjustments are needed, and creating environments where everyone can fully participate and contribute. Accessibility is an ongoing commitment to equity and inclusion in every aspect of the workplace.",
    nudges: {
      "not-yet": "Start by asking: is there anything we could do to make this meeting more accessible? You do not need to know all the answers; asking is the first step.",
      "getting-there": "You are thinking about this more. The next step is building accessibility into your planning from the start, not as an afterthought when someone raises it.",
      "doing-this": "You lead on this well. Think about whether you are also sharing what you know; modelling accessible practice quietly is good, but naming it helps others learn.",
    },
  },
  {
    id: "s10",
    number: "10",
    title: "Reflect and be accountable",
    content: "Expect to make mistakes, then apologise, learn, and adjust. Ask for feedback on your allyship, and act on it. Regularly check: who is included, who is missing, and why? Allyship is a journey of continuous growth; staying open to learning and holding yourself accountable strengthens trust and fosters lasting change.",
    nudges: {
      "not-yet": "Think about a recent moment where you could have responded better. What would you do differently? Honest reflection without self-punishment is the foundation of growth.",
      "getting-there": "You are learning to reflect well. The next level is actively seeking feedback rather than waiting for it; ask someone you trust how your allyship lands.",
      "doing-this": "Accountability is a real strength here. Now think about whether you are creating conditions where others around you can also reflect and be accountable, without fear.",
    },
  },
  {
    id: "s11",
    number: "11",
    title: "Create safe spaces",
    content: "Encourage psychological safety so people can speak up without fear. Allyship means actively listening, validating experiences, and responding with empathy, ensuring everyone feels respected, valued, and able to contribute fully. Consistently model respect, address harmful behaviours, and reinforce that every voice matters in shaping an inclusive culture.",
    nudges: {
      "not-yet": "Think about one space you have influence over: a meeting, a team chat, a one-to-one. What one thing could you do this week to make it feel safer for others?",
      "getting-there": "You are working on this. The next step is checking whether the safety you have created is felt by everyone, not just by those who are most comfortable speaking up.",
      "doing-this": "You build genuine safety for others. Think about sustainability: are you doing the emotional work alone, or are you building a culture where safety is a shared responsibility?",
    },
  },
  {
    id: "s12",
    number: "12",
    title: "Commit to continuous action",
    content: "Embed inclusion in everyday choices: from who you follow online to whose ideas you champion at work. Join or support employee resource groups and EDI initiatives. Recognise allyship as a lifelong journey; making inclusion a consistent part of daily actions helps normalise equity, challenge systemic barriers, and inspire others to do the same.",
    nudges: {
      "not-yet": "Identify one small, specific, repeatable action you can commit to every week; not a declaration, just a habit. That is where sustained allyship begins.",
      "getting-there": "You are showing up regularly. Now think about whether your commitment is growing as you learn more, or whether you have settled into a comfortable routine.",
      "doing-this": "You are in this for the long term. Think about the legacy you are building: are the people around you more equipped to be allies because of how you show up every day?",
    },
  },
];

const RATING_OPTIONS: { value: Rating; label: string; color: string; bg: string; border: string }[] = [
  { value: "not-yet",       label: "Not yet",        color: "#92400e", bg: "#fef3c7", border: "#fcd34d" },
  { value: "getting-there", label: "Getting there",  color: "#1e40af", bg: "#eff6ff", border: "#93c5fd" },
  { value: "doing-this",    label: "Doing this well", color: "#166534", bg: "#f0fdf4", border: "#86efac" },
];

export default function HowToBeAnAllyPage() {
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [showShareMenu, setShowShareMenu] = useState(false);

  const rated = Object.keys(ratings).length;
  const doingWell = Object.values(ratings).filter((r) => r === "doing-this").length;
  const notYet = Object.values(ratings).filter((r) => r === "not-yet").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          ← Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Self-assessment · 12 commitments</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 14px", lineHeight: 1.15 }}>
          How to Be an Ally
        </h1>
        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, maxWidth: 680, margin: "0 0 20px" }}>
          Allyship is a practice, not a status. Work through the seven commitments below and rate yourself honestly on each one. Your ratings will surface a personalised nudge to help you take the next step.
        </p>

        {/* Progress bar; shows once any rating given */}
        {rated > 0 && (
          <div data-noprint="true" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{rated} of 12 rated</span>
                {doingWell > 0 && <span style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>{doingWell} doing well</span>}
              </div>
              <div style={{ background: "#f3f4f6", borderRadius: 6, height: 8, overflow: "hidden" }}>
                <div style={{ background: "var(--sage-dark, #2D5A3C)", height: "100%", width: `${(rated / 12) * 100}%`, borderRadius: 6, transition: "width 0.4s ease" }} />
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
                {/* Card header */}
                <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontFamily: "Raleway, sans-serif", fontSize: 28, fontWeight: 800, color: "#7aab89", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{section.number}</span>
                    <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: 0, lineHeight: 1.3 }}>{section.title}</h2>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "16px 24px 20px", flex: 1 }}>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: "0 0 20px" }}>{section.content}</p>

                  {/* Rating buttons */}
                  <div style={{ marginBottom: 10 }}><p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 3px", display: "flex", alignItems: "center", gap: 6 }}><span style={{ filter: "sepia(1) saturate(3) hue-rotate(330deg) brightness(0.6)" }}>👆</span> How are you doing with this?</p><p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Tap a button to get your personalised nudge</p></div>
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

                  {/* Nudge */}
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

        {/* Completion message */}
        {rated === 12 && (
          <div style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", borderRadius: 16, padding: "32px 36px", marginTop: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
            <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 20, margin: "0 0 10px" }}>You have rated all seven commitments</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", margin: "0 0 20px", lineHeight: 1.7 }}>
              {doingWell === 12
                ? "You are doing all of this well. Think about how you support others to do the same."
                : notYet > 0
                ? `You have identified ${notYet} area${notYet > 1 ? "s" : ""} to develop. Pick one and focus on the nudge for a month before revisiting.`
                : "You are getting there across the board. Consistency is the next step; keep returning to the areas where you want to grow."}
            </p>
            <Link href="/dashboard/apply/challenging-non-inclusive-behaviour" style={{ display: "inline-block", background: "#fff", color: "var(--sage-dark, #2D5A3C)", padding: "12px 24px", borderRadius: 8, fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Next: Challenging Non-Inclusive Behaviour →
            </Link>
          </div>
        )}
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
