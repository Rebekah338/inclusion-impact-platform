"use client";

// Preview panels for the Impact Platform page: show the shape of each area (real screenshots
// with the content blurred, what is inside, one worked example for Inclusion AI tools)
// without giving the content itself away.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/app/components/BrandIcon";
import { bookingLink } from "@/lib/booking";

type Area = {
  icon: string;
  eyebrow: string;
  title: string;
  intro: string;
  shots: [string, string];
  tall: string;
  shotAlt: [string, string];
  stats: { value: string; label: string }[];
  points: string[];
  soon?: string;
};

export const AREAS: Record<string, Area> = {
  learn: {
    icon: "book",
    eyebrow: "Learn",
    title: "Learning pathways",
    intro: "Expert developed courses that build the knowledge and confidence to act, one practical lesson at a time.",
    tall: "/images/platform-preview/learn-tall.jpg",
    shots: ["/images/platform-preview/learn-1.jpg", "/images/platform-preview/learn-2.jpg"],
    shotAlt: ["The Learn page of the Impact Platform, with course filters and topics", "Foundation lessons and course library on the Learn page, with lesson content blurred"],
    stats: [{ value: "6", label: "expert courses" }, { value: "15", label: "modules" }, { value: "CPD", label: "certificate per module" }],
    points: ["Three pathways: people and culture, systems and processes, leadership and strategy", "Foundation lessons you can finish in under 20 minutes", "Search by topic, from allyship to recruitment and policy"],
  },
  watch: {
    icon: "video",
    eyebrow: "Watch",
    title: "Expert videos",
    intro: "Expert insight you can apply the same week, in the time you actually have.",
    tall: "/images/platform-preview/watch-tall.jpg",
    shots: ["/images/platform-preview/watch-1.jpg", "/images/platform-preview/watch-2.jpg"],
    shotAlt: ["The Watch page of the Impact Platform, with video collections", "Video library on the Watch page, with video titles blurred"],
    stats: [{ value: "28", label: "expert videos" }, { value: "3", label: "collections" }, { value: "CPD", label: "training videos" }],
    points: ["Masterclasses, skills sessions and quick takes", "Short starter videos for anyone new to inclusion", "Filter by topic, from belonging to policy"],
    soon: "Video library opening soon after launch. Members are told as each collection goes live.",
  },
  ai: {
    icon: "sparkle",
    eyebrow: "Inclusion AI",
    title: "Specialist AI tools",
    intro: "Tools built for the real complexity of inclusion work: audit policies, build evidence, remove recruitment bias and analyse pay gaps.",
    tall: "/images/platform-preview/inclusion-ai-tall.jpg",
    shots: ["/images/platform-preview/inclusion-ai-1.jpg", "/images/platform-preview/inclusion-ai-2.jpg"],
    shotAlt: ["The Inclusion AI page of the Impact Platform", "Inclusion AI tools grouped by task, with tool details blurred"],
    stats: [{ value: "3", label: "tool groups" }, { value: "Time back", label: "for the work that matters" }, { value: "Built", label: "by EDI specialists" }],
    points: ["Making the case: evidence, research and strategy tools", "Recruiting and hiring fairly: job specs and interview questions", "Understanding where you are: health check and pay gap tools"],
  },
  apply: {
    icon: "wrench",
    eyebrow: "Apply",
    title: "Practical resources",
    intro: "Guides, checklists and toolkits that turn what you have learned into what you do next.",
    tall: "/images/platform-preview/apply-tall.jpg",
    shots: ["/images/platform-preview/apply-1.jpg", "/images/platform-preview/apply-2.jpg"],
    shotAlt: ["The Apply page of the Impact Platform, with resource collections", "Practical resources on the Apply page, with resource content blurred"],
    stats: [{ value: "6", label: "collections" }, { value: "4", label: "formats" }, { value: "Save", label: "to My Toolkit" }],
    points: ["Recruitment, policy, culture, leadership, people and events", "Checklists, guides, toolkits and frameworks", "Ready to use today, and to adapt for your organisation"],
  },
  case: {
    icon: "chart",
    eyebrow: "Make the Case",
    title: "Research and case studies",
    intro: "The research, real examples and templates you need to win support for inclusion, from the budget meeting to the boardroom.",
    tall: "/images/platform-preview/make-the-case-tall.jpg",
    shots: ["/images/platform-preview/make-the-case-1.jpg", "/images/platform-preview/make-the-case-2.jpg"],
    shotAlt: ["The Make the Case page of the Impact Platform", "Research summaries on the Make the Case page, with summaries blurred"],
    stats: [{ value: "27", label: "research summaries" }, { value: "20", label: "case studies" }, { value: "3", label: "Inclusion AI tools" }],
    points: ["Research grouped by outcome: financial performance, talent, innovation and risk", "Real organisations and what they did", "Templates to present your case to leaders"],
  },
  editors: {
    icon: "people",
    eyebrow: "The Inclusion Editors",
    title: "Member community",
    intro: "A peer space for people doing inclusion work: ask what you really need to, share what worked and celebrate the progress.",
    tall: "/images/platform-preview/community-tall.jpg",
    shots: ["/images/platform-preview/community-1.jpg", "/images/platform-preview/community-2.jpg"],
    shotAlt: ["The Inclusion Editors community page", "Community posts and member perks, with post content blurred"],
    stats: [{ value: "Ask", label: "anonymously" }, { value: "Worldwide", label: "members" }, { value: "Perks", label: "and events" }],
    points: ["Questions, discussions and small wins from people like you", "A monthly round up of what is happening in EDI", "Member perks and upcoming events"],
  },
  support: {
    icon: "message",
    eyebrow: "Get Support",
    title: "Office hours and expert help",
    intro: "A quick answer, a peer's view or a real conversation with an inclusion expert: help that fits the moment you are in.",
    tall: "/images/platform-preview/support-tall.jpg",
    shots: ["/images/platform-preview/support-1.jpg", "/images/platform-preview/support-2.jpg"],
    shotAlt: ["The Get Support page of the Impact Platform", "Office hours booking on the Get Support page, with details blurred"],
    stats: [{ value: "Twice", label: "a month" }, { value: "30 min", label: "one to one" }, { value: "Real", label: "inclusion expert" }],
    points: ["Book office hours with an inclusion expert on organisation memberships", "A monthly 1:1 with Rebekah on the Expert Track", "Bring a challenge and get an expert perspective"],
  },
};

AREAS.onboarding = {
  icon: "graduation",
  eyebrow: "Onboarding",
  title: "Inclusion Foundations for new starters",
  intro: "Twelve short pieces that build confidence, knowledge and practice from day one, with a certificate at the end.",
  tall: "/images/platform-preview/onboarding-tall.jpg",
    shots: ["/images/platform-preview/onboarding-1.jpg", "/images/platform-preview/onboarding-2.jpg"],
  shotAlt: ["The Inclusion Foundations onboarding page", "Onboarding programme details, with content blurred"],
  stats: [{ value: "12", label: "short pieces" }, { value: "3 to 4", label: "hours in total" }, { value: "Yes", label: "certificate" }],
  points: ["Watch, learn, and read and reflect: four items from each", "Progress saves automatically, at each person's own pace", "Included with organisation memberships, for 25 to 200 new starters a year"],
};

export type AiVariant = { label: string; input: string; output: string[] };
export type AiExample = { name: string; desc: string; soon?: boolean; input: string; output: string[]; choose?: string; steps?: string[]; variants?: AiVariant[] };

export const AI_EXAMPLES: Record<string, AiExample> = {
  "Evidence Argument Builder": {
    name: "Evidence Argument Builder", desc: "",
    input: "Make the case to our board for funding inclusive leadership training. 300 staff, rising turnover in two teams.",
    output: ["Lead with the cost you already report: turnover in the two teams and what each leaver costs to replace.", "Three pieces of research that link inclusive leadership to retention, each with its source.", "Your ask, the measures you will report back on, and when."],
    choose: "Presenting to",
    steps: ["Reading your context", "Checking our research library", "Shaping it for your audience"],
    variants: [
      { label: "The board", input: "Make the case to our board for funding inclusive leadership training. 300 staff, rising turnover in two teams.", output: ["Lead with the cost you already report: turnover in the two teams and what each leaver costs to replace.", "Three pieces of research that link inclusive leadership to retention, each with its source.", "Your ask, the measures you will report back on, and when."] },
      { label: "Line managers", input: "Help me explain to our line managers why inclusive leadership training matters. They already feel stretched.", output: ["Start with what is in it for them: fewer difficult conversations and steadier teams.", "One short, relatable finding on how inclusive managers keep people longer, with its source.", "What the training asks of them: two half days, and one practice to try the next week."] },
      { label: "Finance director", input: "Our finance director needs a one page case for £6,000 of inclusive leadership training.", output: ["The cost of doing nothing: what last year's leavers cost to replace, set against the £6,000.", "The return you can measure, how you will measure it, and when you will report back.", "A one page summary in plain numbers, ready to forward."] },
    ],
  },
  "Research Interpreter": {
    name: "Research Interpreter", desc: "",
    input: "A 40 page report on flexible working and retention. We are a 120 person housing association.",
    output: ["What the report found, in a sentence, and how far it applies to an organisation like yours.", "The takeaways that matter most for your size and sector.", "One action for this month, and one question to take to your leaders."],
    choose: "Report about",
    steps: ["Reading the report", "Pulling out what matters", "Applying it to you"],
    variants: [
      { label: "Flexible working", input: "A 40 page report on flexible working and retention. We are a 120 person housing association.", output: ["What the report found, in a sentence, and how far it applies to an organisation like yours.", "The takeaways that matter most for your size and sector.", "One action for this month, and one question to take to your leaders."] },
      { label: "Menopause at work", input: "A national survey on menopause in the workplace. Most of our staff work shifts.", output: ["The findings that matter most for shift-based teams.", "Where your current approach may be falling short.", "Practical first steps for managers, and what to tell staff."] },
      { label: "Ethnicity pay", input: "An academic paper on ethnicity pay gaps. We have not reported ours before.", output: ["The paper's main point, in plain language.", "What it means for an organisation preparing a first report.", "The data you would need, and how to start gathering it."] },
    ],
  },
  "Case Study Roadmap": {
    name: "Case Study Roadmap", desc: "",
    input: "A case study of a retailer that improved disability inclusion in hiring. We are a 40 person charity.",
    output: ["What they did, broken into clear steps.", "Which steps work at your size, and which to scale down.", "A 90 day plan, with an owner for each step."],
    choose: "Your organisation",
    steps: ["Reading the case study", "Spotting what transfers", "Building your plan"],
    variants: [
      { label: "Small charity", input: "A case study of a retailer that improved disability inclusion in hiring. We are a 40 person charity.", output: ["What they did, broken into clear steps.", "Which steps work at your size, and which to scale down.", "A 90 day plan, with an owner for each step."] },
      { label: "School", input: "The same retailer case study. We are a secondary school recruiting support staff.", output: ["The steps that translate to school recruitment.", "What to adapt for safeguarding and term time.", "A plan that fits the school year."] },
      { label: "Large employer", input: "The same retailer case study. We have 3,000 staff across several sites.", output: ["How to pilot it at one site before rolling it out.", "Who needs to be involved at each stage.", "The measures to report back on as it grows."] },
    ],
  },
  "Policy Equity Auditor": {
    name: "Policy Equity Auditor", desc: "", soon: true,
    input: "Our parental leave policy.",
    output: ["Wording that assumes one kind of family, and suggested changes.", "Situations the policy does not yet cover.", "Action points ranked by priority, with the clauses to change."],
    choose: "Policy",
    steps: ["Reading your policy", "Checking language and gaps", "Ranking the actions"],
    variants: [
      { label: "Parental leave", input: "Our parental leave policy.", output: ["Wording that assumes one kind of family, and suggested changes.", "Situations the policy does not yet cover.", "Action points ranked by priority, with the clauses to change."] },
      { label: "Dress code", input: "Our dress and appearance policy.", output: ["Rules that may disadvantage people because of religion, race or disability.", "Where the wording could be clearer and fairer.", "Priority changes, with a short reason for each."] },
      { label: "Flexible working", input: "Our flexible working policy.", output: ["Where the process may put people off asking.", "Gaps against good practice and the law.", "A ranked list of changes, ready to discuss."] },
    ],
  },
  "Job Description Equity Checker": {
    name: "Job Description Equity Checker", desc: "", soon: true,
    input: "Our advert for a head of operations.",
    output: ["Words and phrases that may put some candidates off, flagged one by one.", "Requirements that may not be essential, and the effect they could have.", "A clearer, more welcoming rewrite, with the reason for each change."],
    choose: "Role",
    steps: ["Scanning the wording", "Checking for barriers", "Suggesting changes"],
    variants: [
      { label: "Senior leader", input: "Our advert for a head of operations.", output: ["Words and phrases that may put some candidates off, flagged one by one.", "Requirements that may not be essential, and the effect they could have.", "A clearer, more welcoming rewrite, with the reason for each change."] },
      { label: "Graduate", input: "Our graduate scheme advert.", output: ["Wording that suggests an age or a background, flagged.", "Barriers in how and when people can apply.", "Suggested changes, with the reason for each."] },
      { label: "Part time", input: "Our part time administrator advert.", output: ["Phrases that make the role sound less flexible than it is.", "Details people need before applying, which are missing.", "A clearer rewrite, with the reason for each change."] },
    ],
  },
  "Interview Question Generator": {
    name: "Interview Question Generator", desc: "", soon: true,
    input: "Team leader role. Our values are collaboration and fairness.",
    output: ["Structured questions that ask for real examples of both values.", "What a strong answer includes, so every panel member scores the same way.", "The same questions for every candidate, so answers can be compared fairly."],
    choose: "Role",
    steps: ["Reading the role", "Matching your values", "Writing fair questions"],
    variants: [
      { label: "Team leader", input: "Team leader role. Our values are collaboration and fairness.", output: ["Structured questions that ask for real examples of both values.", "What a strong answer includes, so every panel member scores the same way.", "The same questions for every candidate, so answers can be compared fairly."] },
      { label: "Customer service", input: "Customer service adviser. Our values are care and respect.", output: ["Questions that draw out how candidates treat people, not how polished they sound.", "Adjustments to offer, so every candidate can show their best.", "A simple scoring guide for the panel."] },
      { label: "Head of finance", input: "Head of finance. Our values are integrity and openness.", output: ["Questions that test judgement as well as technical skill.", "Ways to reduce bias on the panel.", "A scoring guide, so decisions can be explained."] },
    ],
  },
  "Inclusion Health Check": {
    name: "Inclusion Health Check", desc: "", soon: true,
    input: "Answers to a short set of questions. We have no inclusion plan yet.",
    output: ["What you already have in place that you can build on.", "The gaps that matter most to close first.", "Your top three priorities for the next quarter."],
    choose: "Where you are",
    steps: ["Reading your answers", "Comparing with good practice", "Setting your priorities"],
    variants: [
      { label: "Just starting", input: "Answers to a short set of questions. We have no inclusion plan yet.", output: ["What you already have in place that you can build on.", "The gaps that matter most to close first.", "Your top three priorities for the next quarter."] },
      { label: "Some progress", input: "Answers to the same questions. We have a plan but progress has stalled.", output: ["What is working, and what may be holding you back.", "Where effort is going but not making a difference.", "Three priorities to restart progress."] },
      { label: "Well established", input: "Answers to the same questions. Inclusion is part of our strategy.", output: ["Your strengths, and how to show them to leaders.", "The less visible gaps that are easy to miss.", "Priorities for your next stage."] },
    ],
  },
  "Pay Gap Narrative Generator": {
    name: "Pay Gap Narrative Generator", desc: "", soon: true,
    input: "Our gender pay gap figures for this year and last. The gap has narrowed.",
    output: ["A clear opening that states the gap and what drives it.", "What has helped it narrow, and what still needs to change.", "Commitments for next year, written for staff to read."],
    choose: "Your figures",
    steps: ["Reading your figures", "Finding the drivers", "Drafting your narrative"],
    variants: [
      { label: "Gap is falling", input: "Our gender pay gap figures for this year and last. The gap has narrowed.", output: ["A clear opening that states the gap and what drives it.", "What has helped it narrow, and what still needs to change.", "Commitments for next year, written for staff to read."] },
      { label: "Gap has grown", input: "Our figures for this year and last. The gap has widened.", output: ["An honest explanation of why the gap has grown.", "What you are doing about it, in plain language.", "Commitments that are specific and realistic."] },
      { label: "First report", input: "Our figures. This is our first published report.", output: ["An opening that explains what the figures mean.", "The main drivers, explained simply.", "Your first set of commitments."] },
    ],
  },
  "Gender Pay Gap Analysis Tool": {
    name: "Gender Pay Gap Analysis Tool", desc: "", soon: true,
    input: "Pay data by role and gender for a retailer with stores and a head office.",
    output: ["Where the gap is largest, role by role.", "The likely drivers, such as progression or hours.", "Recommended actions, linked to each driver."],
    choose: "Organisation",
    steps: ["Reading your pay data", "Finding where the gap sits", "Linking actions to causes"],
    variants: [
      { label: "Retail", input: "Pay data by role and gender for a retailer with stores and a head office.", output: ["Where the gap is largest, role by role.", "The likely drivers, such as progression or hours.", "Recommended actions, linked to each driver."] },
      { label: "Charity", input: "Pay data by grade and gender for a national charity.", output: ["Where the gap sits across grades.", "Whether starting pay, progression or part time work is driving it.", "Recommended actions, linked to each cause."] },
      { label: "Professional services", input: "Pay data by level and gender for a consultancy.", output: ["Where the gap opens up as people progress.", "The part bonuses play, if any.", "Recommended actions, linked to each cause."] },
    ],
  },
};

const font = { display: "var(--font-display)", heading: "var(--font-heading)", body: "var(--font-body)" };

export default function PlatformPreview({ area, tool, onClose }: { area?: string | null; tool?: string | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const a = area ? AREAS[area] : null;
  const t = tool ? AI_EXAMPLES[tool] : null;
  const open = Boolean(a || t);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [open, onClose]);

  if (!open) return null;
  const view = t ? AREAS.ai : a!;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="pp-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(20,40,25,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "var(--white)", borderRadius: "18px", width: "100%", maxWidth: "920px", maxHeight: "94vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
        <div className="pp-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "1.4rem 1.6rem 0.6rem" }}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: font.heading, fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--evergreen)", background: "#E3F5E2", borderRadius: "999px", padding: "0.3rem 0.8rem" }}>
                <Icon name="eye" size={13} /> Preview
              </span>
              <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)" }}>{t ? "Inclusion AI" : view.eyebrow}</span>
              {t?.soon && <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1C1C1C", background: "#E2C265", borderRadius: "999px", padding: "0.2rem 0.6rem" }}>Coming soon</span>}
            </div>
            <h2 id="pp-title" style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.85rem)", color: "var(--forest)", margin: "0 0 0.4rem", lineHeight: 1.15 }}>{t ? t.name : view.title}</h2>
            <p style={{ fontFamily: font.body, fontSize: "0.95rem", color: "var(--slate)", margin: 0, lineHeight: 1.6, maxWidth: "620px" }}>{t ? (t.variants ? "Watch an example run, then switch the example to see how the answer changes." : "Here is the kind of thing it does, using a made up example.") : view.intro}</p>
          </div>
          <div className="pp-actions" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
          <Link href="/early-access#join" onClick={onClose} className="pp-top-cta" style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.88rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.7rem 1.25rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Get Early Access</Link>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close preview" style={{ flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid var(--line, #DCE5DE)", background: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--forest)" }}>
            <Icon name="x" size={18} />
          </button>
          </div>
        </div>

        {t ? (
          <AiDemo t={t} />
        ) : (
          <div style={{ padding: "0.8rem 1.6rem 0.2rem" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--line, #DCE5DE)", boxShadow: "0 6px 24px rgba(26,50,32,0.12)", background: "#F4F7F4" }}>
              <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.5rem 0.8rem", background: "#EEF2EE", borderBottom: "1px solid var(--line, #DCE5DE)" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D6DDD7" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D6DDD7" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D6DDD7" }} />
                <span style={{ marginLeft: "0.6rem", fontFamily: font.body, fontSize: "0.74rem", color: "var(--slate)" }}>Impact Platform: {view.eyebrow}</span>
              </div>
              <div className="pp-scroll" tabIndex={0} role="region" aria-label={`Scrollable preview of the ${view.eyebrow} page, with content blurred`} style={{ height: "clamp(300px, 52vh, 500px)", overflowY: "auto", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={view.tall} alt={view.shotAlt[1]} width={1000} height={1875} style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
            </div>
            <p style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: font.body, fontSize: "0.8rem", color: "var(--slate)", margin: "0.5rem 0 0" }}>
              <Icon name="chevron" size={14} /> Scroll inside the window to see the whole page. Content is blurred in this preview.
            </p>
          </div>
        )}

        <div style={{ padding: "0.9rem 1.6rem 0.4rem" }}>
          {!t && (
            <>
              <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)", margin: "0 0 0.6rem" }}>What&apos;s inside</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "0.6rem", marginBottom: "0.85rem" }}>
                {view.stats.map((s) => (
                  <div key={s.label} style={{ background: "linear-gradient(160deg, #F7FBF7 0%, #EEF6EE 100%)", border: "1px solid rgba(107,143,113,0.25)", borderRadius: "12px", padding: "0.65rem 0.8rem" }}>
                    <p style={{ fontFamily: font.display, fontWeight: 800, fontSize: "1.25rem", color: "var(--forest)", margin: 0, lineHeight: 1.1 }}>{s.value}</p>
                    <p style={{ fontFamily: font.body, fontSize: "0.8rem", color: "var(--slate)", margin: "0.15rem 0 0" }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {view.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: "0.5rem", fontFamily: font.body, fontSize: "0.9rem", color: "#1C1C1C", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--evergreen)", marginTop: "0.12rem" }}><Icon name="check" size={15} /></span><span>{p}</span>
                  </li>
                ))}
              </ul>
              {view.soon && <p style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", margin: "0.7rem 0 0", fontStyle: "italic" }}>{view.soon}</p>}
            </>
          )}
          {t && <p style={{ fontFamily: font.body, fontSize: "0.82rem", color: "var(--slate)", margin: "0.2rem 0 0", lineHeight: 1.6 }}>The full tool works with your own details, explains its reasoning and gives you a draft you can edit and share. {t.soon ? "This tool is being finished now and opens to members after launch." : "Available to members from launch."}</p>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", padding: "1rem 1.6rem 1.4rem", marginTop: "0.6rem", borderTop: "1px solid var(--line, #DCE5DE)" }}>
          <p style={{ fontFamily: font.body, fontSize: "0.88rem", color: "var(--slate)", margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: "var(--forest)" }}>Included in membership.</strong> Prefer a live walkthrough?{" "}
            <a href={bookingLink("A walkthrough of the Impact Platform")} target="_blank" rel="noopener noreferrer" style={{ color: "var(--evergreen)", fontWeight: 700 }}>Book a call<span className="a11y-sr"> (opens in a new tab)</span></a>
          </p>
          <Link href="/early-access#join" onClick={onClose} style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.92rem", color: "var(--white)", background: "var(--evergreen)", padding: "0.8rem 1.6rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Get Early Access</Link>
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .pp-example { grid-template-columns: 1fr !important; } .pp-head { flex-direction: column-reverse; gap: 0.6rem !important; } .pp-actions { align-self: stretch; justify-content: space-between; } .pp-scroll { height: 55vh !important; } }`}</style>
      <style>{`.pp-scroll::-webkit-scrollbar { width: 10px; } .pp-scroll::-webkit-scrollbar-thumb { background: #B8C9BB; border-radius: 999px; border: 2px solid #F4F7F4; } .pp-scroll:focus-visible { outline: 3px solid var(--evergreen); outline-offset: -3px; }`}</style>
    </div>
  );
}


// A replay of an example run: the input types in, the tool works through its steps, then the answer arrives line by line.
// Switching the example input replays it, so visitors see the answer change with what goes in. Not a live tool.
function AiDemo({ t }: { t: AiExample }) {
  const variants = t.variants ?? [{ label: "", input: t.input, output: t.output }];
  const steps = t.steps ?? ["Reading your details", "Checking our guidance", "Drafting your answer"];
  const [vi, setVi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(-1);
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const v = variants[vi];

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setTyped(v.input.length); setStep(steps.length); setShown(v.output.length); return; }
    setTyped(0); setStep(-1); setShown(0);
    const timers: number[] = [];
    let i = 0;
    const typer = window.setInterval(() => { i += 2; setTyped(Math.min(i, v.input.length)); if (i >= v.input.length) window.clearInterval(typer); }, 18);
    const typeMs = Math.ceil(v.input.length / 2) * 18 + 150;
    steps.forEach((_, k) => timers.push(window.setTimeout(() => setStep(k), typeMs + k * 650)));
    const outStart = typeMs + steps.length * 650;
    timers.push(window.setTimeout(() => setStep(steps.length), outStart));
    v.output.forEach((_, k) => timers.push(window.setTimeout(() => setShown(k + 1), outStart + 150 + k * 450)));
    return () => { window.clearInterval(typer); timers.forEach((x) => window.clearTimeout(x)); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vi, run]);

  const working = step >= 0 && step < steps.length;
  const done = step >= steps.length;

  return (
    <div style={{ padding: "0.8rem 1.6rem 0.4rem" }}>
      {t.variants && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)" }}>{t.choose}:</span>
          {variants.map((x, k) => (
            <button key={x.label} type="button" onClick={() => { setVi(k); setRun((r) => r + 1); }} aria-pressed={vi === k}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", padding: "0.45rem 0.9rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: vi === k ? "2px solid var(--evergreen)" : "1.5px solid rgba(0,0,0,0.18)", background: vi === k ? "#E3F5E2" : "var(--white)", color: vi === k ? "var(--evergreen)" : "#1C1C1C" }}>
              {x.label}
            </button>
          ))}
        </div>
      )}
      <div className="pp-example" style={{ display: "grid", gridTemplateColumns: "1fr auto 1.35fr", gap: "0.9rem", alignItems: "stretch" }}>
        <div style={{ background: "var(--mist, #F4F7F4)", border: "1px solid var(--line, #DCE5DE)", borderRadius: "14px", padding: "1rem 1.1rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)", margin: "0 0 0.5rem" }}>You give</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "#1C1C1C", margin: 0, lineHeight: 1.6, minHeight: "4.8em" }}>
            {v.input.slice(0, typed)}{typed < v.input.length && <span className="ai-caret" aria-hidden="true" />}
          </p>
        </div>

        <div className="ai-mid" aria-hidden="true" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.4rem", minWidth: "64px" }}>
          <span className={working ? "ai-spark ai-spin" : "ai-spark"} style={{ width: "46px", height: "46px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#1A3220", background: "linear-gradient(135deg, #C9A84C 0%, #E2C265 100%)", boxShadow: working ? "0 0 0 6px rgba(226,194,101,0.25), 0 0 24px rgba(226,194,101,0.55)" : "0 4px 12px rgba(201,168,76,0.35)", transition: "box-shadow 0.3s ease" }}>
            <Icon name="sparkle" size={22} strokeWidth={2} />
          </span>
          <span className="ai-arrow" style={{ color: "var(--evergreen)", display: "inline-flex" }}><Icon name="chevron" size={22} strokeWidth={2.25} /></span>
        </div>

        <div style={{ background: "var(--white)", border: done ? "1.5px solid rgba(107,143,113,0.5)" : "1.5px dashed rgba(107,143,113,0.4)", borderRadius: "14px", padding: "1rem 1.1rem", transition: "border-color 0.3s ease" }} aria-live="polite">
          <p style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--evergreen)", margin: "0 0 0.55rem" }}><Icon name="sparkle" size={13} /> You get {done ? "(shortened)" : ""}</p>
          {!done && (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {steps.map((st, k) => (
                <li key={st} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: k <= step ? "#1C1C1C" : "rgba(28,28,28,0.35)" }}>
                  <span style={{ width: "18px", display: "inline-flex", justifyContent: "center", color: "var(--evergreen)" }}>{k < step ? <Icon name="check" size={15} /> : k === step ? <span className="ai-dot" /> : null}</span>
                  {st}{k === step ? "…" : ""}
                </li>
              ))}
            </ul>
          )}
          {done && (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {v.output.slice(0, shown).map((o) => (
                <li key={o} className="ai-line" style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#1C1C1C", lineHeight: 1.55 }}>
                  <span style={{ color: "var(--evergreen)", marginTop: "0.15rem" }}><Icon name="check" size={15} /></span><span>{o}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)" }}>Example run, shortened</span>
        <button type="button" onClick={() => setRun((r) => r + 1)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--evergreen)", textDecoration: "underline", textUnderlineOffset: "3px", padding: "0.3rem 0" }}>Replay</button>
      </div>
      <style>{`
        .ai-caret { display: inline-block; width: 2px; height: 1em; background: var(--evergreen); margin-left: 2px; vertical-align: -2px; animation: aiBlink 0.8s step-end infinite; }
        .ai-spin svg { animation: aiSpin 1.1s linear infinite; }
        .ai-dot { width: 8px; height: 8px; border-radius: 50%; background: #C9A84C; animation: aiPulse 0.9s ease-in-out infinite; }
        .ai-line { animation: aiIn 0.35s ease both; }
        @keyframes aiBlink { 50% { opacity: 0; } }
        @keyframes aiSpin { to { transform: rotate(360deg); } }
        @keyframes aiPulse { 0%, 100% { transform: scale(0.7); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 1; } }
        @keyframes aiIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @media (max-width: 700px) { .ai-mid { flex-direction: row !important; } .ai-arrow { transform: rotate(90deg); } }
        @media (prefers-reduced-motion: reduce) { .ai-spin svg, .ai-dot, .ai-caret, .ai-line { animation: none !important; } }
      `}</style>
    </div>
  );
}
