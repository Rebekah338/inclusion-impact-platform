"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "physical" | "digital" | "communication" | "meetings" | "onboarding" | "culture";
type Priority = "quick win" | "planned" | "ongoing";
type Owner = "HR" | "Facilities" | "IT" | "Line managers" | "Communications";
type ActionStatus = "not started" | "in progress" | "done";
type AssessmentRating = "not started" | "partial" | "in place";
type Tab = "assess" | "browse" | "tracker";

// ── Category metadata ──────────────────────────────────────────────────────────
const CATEGORIES: { key: Category; label: string; icon: string; desc: string; scenario: string }[] = [
  {
    key: "physical", label: "Physical space", icon: "🏢",
    desc: "The built environment: offices, meeting rooms, kitchens, entrances, and any space employees are expected to use.",
    scenario: "Think about the route from your building entrance to every space an employee is expected to use. Not the main entrance on a good day: the entrance when the automatic door is broken, when the accessible toilet is out of order, when the lift is under maintenance. A disabled employee has already made that calculation before they accept a job offer. If the answer they arrive at is 'I'm not sure I can do this', the organisation has already lost them.",
  },
  {
    key: "digital", label: "Digital and tools", icon: "💻",
    desc: "The software, platforms, and digital workflows employees rely on to do their work.",
    scenario: "Your HR system works fine for most people. But for a blind employee using a screen reader, a form that requires a mouse click to submit is not an inconvenience: it is a locked door. They cannot submit their expenses, book their leave, or access their payslip without asking a sighted colleague for help. That colleague becomes their proxy for basic employment administration. That is not inclusion: it is managed dependency.",
  },
  {
    key: "communication", label: "Communication", icon: "📢",
    desc: "How information is shared: documents, presentations, emails, intranet, and visual content.",
    scenario: "A new policy goes out to all staff as a scanned PDF. It is unreadable by any screen reader. It has no heading structure, no alt text, and the contrast between the text and background fails WCAG standards. For most employees, this is a minor formatting irritation. For a blind employee, an employee with low vision, or an employee with dyslexia, it may be entirely inaccessible. The organisation has communicated clearly, just not to everyone.",
  },
  {
    key: "meetings", label: "Meetings and events", icon: "📅",
    desc: "How meetings and events are structured, where they happen, and who can meaningfully participate.",
    scenario: "The team away day is at a venue with three steps at the entrance and no lift. The agenda goes out the morning of the event. The social dinner is at a noisy restaurant. For most people, this is a fine day out. For a wheelchair user, a deaf colleague, or someone with sensory sensitivities, it communicates something precise: we planned this without you in mind. That message lands harder than any wellbeing initiative that follows it.",
  },
  {
    key: "onboarding", label: "Onboarding", icon: "🚪",
    desc: "How new employees are brought into the organisation and given access to what they need.",
    scenario: "A new employee with a visual impairment joins on Monday. Their screen reader software has not been installed. Their onboarding pack is a set of scanned PDFs. No one asked in advance about their access needs. By lunchtime on day one, they have already learned three things about their new employer: that they were not thought about, that they will need to advocate for themselves from the start, and that this is likely to be a pattern.",
  },
  {
    key: "culture", label: "Culture and process", icon: "🌱",
    desc: "The norms, policies, and everyday practices that make environments more or less accessible for everyone.",
    scenario: "An employee with a chronic health condition needs to occasionally start at 10am instead of 9am. Their manager says this needs to go through HR as a formal flexible working request, which takes six weeks to process. The employee has to choose between disclosing a diagnosis to trigger occupational health or working through symptoms for six weeks. The policy said flexibility was available. What the culture said was: only if you can prove you need it.",
  },
];

// ── Owner colours ──────────────────────────────────────────────────────────────
const OWNER_STYLE: Record<Owner, { bg: string; color: string; border: string }> = {
  "HR":              { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Facilities":      { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "IT":              { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Line managers":   { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
  "Communications":  { bg: "#fefce8", color: "#a16207", border: "#fde68a" },
};

// ── Toolkit items ──────────────────────────────────────────────────────────────
type ToolkitItem = {
  id: string;
  category: Category;
  title: string;
  what: string;
  why: string;
  how: string;
  priority: Priority;
  owners: Owner[];
};

const ITEMS: ToolkitItem[] = [
  { id: "ph1", category: "physical", priority: "quick win", owners: ["Facilities", "HR"],
    title: "Audit entrance and route accessibility",
    what: "Walk the route from the building entrance to every space employees are expected to use: reception, desks, meeting rooms, toilets, kitchen, and quiet spaces.",
    why: "Many accessibility barriers in physical environments are invisible to non-disabled people. A step at a side entrance, a heavy door with no automatic opener, a lift that requires navigation through a crowded open-plan floor: each of these tells a disabled employee something about whether they were thought of when the space was designed.",
    how: "Do the audit with a disabled employee or access consultant, not without one. Ask: could someone with limited mobility navigate this route? Could someone with low vision? Could someone with a chronic condition that is worsened by distance or cold? Document every barrier and assign an owner and a timeframe to each." },
  { id: "ph2", category: "physical", priority: "planned", owners: ["Facilities"],
    title: "Create a quiet space",
    what: "Designate at least one quiet, low-stimulation space in the office that employees can use without booking and without having to explain why.",
    why: "Neurodivergent employees, employees managing anxiety or chronic pain, and employees who need focus time are not a minority: they are a significant proportion of any workforce. Open-plan offices are designed for socialisation and have been shown to reduce focus and increase stress. A quiet space is not a luxury.",
    how: "The space should have: reduced lighting (or control over lighting), minimal noise, a door that closes, and a clear signal that noise is not expected inside it. It does not need to be large. It does need to be accessible by any route available to everyone else." },
  { id: "ph3", category: "physical", priority: "ongoing", owners: ["Facilities", "HR"],
    title: "Maintain accessible furniture options",
    what: "Ensure that height-adjustable desks, ergonomic chairs, and other adaptive furniture are available and accessible without requiring a formal process to obtain them.",
    why: "The process of requesting adaptive equipment is itself a barrier. When an employee with a musculoskeletal condition, chronic pain, or a disability needs to complete a form, wait for an occupational health assessment, and justify their need to a manager, the equipment arrives weeks or months after the need begins.",
    how: "Make a range of equipment available on request or on a self-serve basis, with clear information about what is available and how to get it. Review requests annually to understand demand and adjust stock. Train line managers to respond to requests promptly and without interrogating the reason." },
  { id: "di1", category: "digital", priority: "quick win", owners: ["IT"],
    title: "Check default tool accessibility settings",
    what: "Review the default settings on your main digital tools (email, video conferencing, document software, HR systems) for accessibility features and ensure they are enabled by default where possible.",
    why: "Accessibility features that must be switched on individually are used by far fewer people than those that are on by default. Captions on video calls, high-contrast options in documents, screen reader compatibility: these are not edge-case needs.",
    how: "For each core tool, identify: what accessibility features exist, whether they are on by default, and what a user needs to do to activate them. Publish a single reference page with instructions for activating key features. For video conferencing: enable automatic captions by default, not as an optional add-on." },
  { id: "di2", category: "digital", priority: "planned", owners: ["IT", "HR"],
    title: "Test internal systems with assistive technology",
    what: "Have your intranet, HR self-service system, and core internal platforms tested with screen readers and keyboard-only navigation.",
    why: "Most organisations do this for external-facing digital products and not for internal ones. An HR system that cannot be navigated without a mouse, or an intranet that screen readers cannot parse, tells disabled employees that internal infrastructure was not designed for them.",
    how: "Commission an accessibility audit from a specialist or work with disabled employees who use assistive technology to test each system. Prioritise systems that are used for high-stakes tasks: submitting expenses, accessing pay information, booking leave. Raise accessibility failures with vendors and include accessibility requirements in procurement criteria for future tools." },
  { id: "di3", category: "digital", priority: "ongoing", owners: ["IT", "Communications"],
    title: "Maintain an accessibility-first document library",
    what: "Ensure all widely-shared internal documents (templates, policy documents, handbooks, forms) meet basic accessibility standards.",
    why: "A PDF that cannot be read by a screen reader, a presentation with text in images, a form that requires a mouse: these are not niche technical problems. They are barriers that affect blind employees, employees with visual impairments, employees with motor difficulties, and employees using assistive technology of any kind.",
    how: "Use the accessibility checker in Word, PowerPoint, and PDF tools before sharing documents widely. Require accessible formats: proper heading structure, alt text on images, sufficient colour contrast, not text embedded in images. Designate an owner for the central document library who is responsible for accessibility standards." },
  { id: "co1", category: "communication", priority: "quick win", owners: ["Communications", "HR"],
    title: "Add alt text to images in communications",
    what: "Train everyone who creates internal communications, presentations, or social content to add descriptive alt text to all images.",
    why: "Alt text is the text that screen readers read aloud when they encounter an image. An image with no alt text produces silence: the screen reader user misses whatever the image was communicating. An image with alt text of 'image.png' produces noise: the filename, which communicates nothing.",
    how: "Alt text should describe what the image shows in the context it appears in. 'Two colleagues looking at a laptop together' is useful. 'Happy employees' is not. Images that are purely decorative should have null alt text (empty quotes) so screen readers skip them. Include this in induction training and in any onboarding for communications, marketing, or HR roles." },
  { id: "co2", category: "communication", priority: "quick win", owners: ["Communications"],
    title: "Review colour contrast in branded materials",
    what: "Check that text and background colour combinations in your standard templates and branded materials meet WCAG 2.1 AA contrast standards.",
    why: "Approximately 8% of men and 0.5% of women have some form of colour vision deficiency. A further significant proportion of the population experience some degree of low vision. Insufficient contrast between text and background is one of the most common and most easily fixed accessibility failures.",
    how: "Use a free contrast checker (such as the WebAIM Contrast Checker) to test your standard colour combinations. WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. If your brand colours fail this test, work with your design team to identify compliant alternatives for text contexts." },
  { id: "co3", category: "communication", priority: "planned", owners: ["Communications", "HR"],
    title: "Offer plain language versions of complex documents",
    what: "For any complex policy document, legal notice, or multi-page guidance document, produce a plain language summary.",
    why: "Plain language is not a concession to readers with lower literacy: it is better communication for everyone. Documents that are clear, structured, and free of jargon are more likely to be read, understood, and acted on. For people with cognitive disabilities, literacy difficulties, or English as an additional language, plain language versions may be the only version they can meaningfully access.",
    how: "Aim for a reading age of approximately 9 (equivalent to clear newspaper writing). Use short sentences, active voice, clear headings, and bullet points for lists of conditions or steps. Test plain language versions with a representative group before distributing." },
  { id: "me1", category: "meetings", priority: "quick win", owners: ["Line managers", "HR"],
    title: "Send materials in advance of meetings",
    what: "Share agendas and any materials to be discussed at least 48 hours before a meeting.",
    why: "Many accessibility needs are served by preparation time that is not available in real-time meetings: neurodivergent employees who process information more effectively when they have advance sight of it; employees who use communication aids that take time to set up; employees with anxiety who benefit from knowing what to expect; employees with hearing loss who want to read materials before a discussion they may struggle to follow.",
    how: "Make advance materials a standard expectation, not a courtesy. Include this in your meeting guidance and in any facilitation training for managers. For recurring meetings, establish a standard that materials go out at the start of the week for a mid-week meeting." },
  { id: "me2", category: "meetings", priority: "quick win", owners: ["IT", "Line managers"],
    title: "Include hybrid and remote accessibility as standard",
    what: "Ensure that hybrid meetings are set up so that remote participants can contribute as fully as in-person ones.",
    why: "For many disabled employees, remote working is not a preference but a necessity. A meeting format that prioritises in-person experience and treats remote participants as second-tier creates a two-tier workplace where disabled employees are structurally excluded from full participation.",
    how: "Use a camera pointed at the whole room (not just the presenter) for remote participants. Repeat questions and comments made in the room so remote participants can hear them. Use the meeting platform's hand-raise feature and monitor it. Nominate a remote participant liaison in every hybrid meeting to monitor the chat and ensure remote voices are heard." },
  { id: "me3", category: "meetings", priority: "planned", owners: ["HR", "Facilities"],
    title: "Audit event locations for accessibility",
    what: "Before booking any external event venue, conference, or team away day, check it against an accessibility checklist.",
    why: "An event held in an inaccessible venue excludes disabled employees from a team experience that may affect their relationships, their visibility, and their sense of belonging. A single inaccessible event can communicate clearly that the organisation did not think about them.",
    how: "Checklist items: step-free access from entrance to all event spaces; accessible toilet facilities on the same floor as event spaces; hearing loop provision; flexible seating arrangements; dietary options communicated in advance; parking and public transport information; quiet space or breakout option. Ask the venue explicitly about each of these before booking." },
  { id: "on1", category: "onboarding", priority: "quick win", owners: ["HR"],
    title: "Ask access needs before start date",
    what: "Include a question about access needs and reasonable adjustments as part of the pre-start onboarding process, before the employee arrives.",
    why: "Asking for access information on day one, when a new employee is navigating an unfamiliar environment, meeting new colleagues, and managing first-day anxiety, is too late. Asking in advance allows adjustments to be in place when they arrive.",
    how: "Ask clearly: 'Do you have any access requirements or would you like to discuss any adjustments that would help you do your job?' Make it clear that this is routine, that it is confidential (shared only with HR and the direct line manager), and that asking does not commit them to disclosing any specific diagnosis or condition. Review what adjustments may be needed before their first day." },
  { id: "on2", category: "onboarding", priority: "planned", owners: ["HR", "IT"],
    title: "Create an accessible onboarding pack",
    what: "Ensure all onboarding materials are available in accessible formats: properly structured documents, not scanned PDFs; digital forms, not paper ones; and a point of contact who can provide materials in alternative formats on request.",
    why: "A new employee who immediately encounters inaccessible materials learns on day one that accessibility was not considered in their organisation's processes. This shapes their expectations of what else will and will not have been considered.",
    how: "Audit your onboarding materials annually. Remove any documents that are: scanned images rather than text, not tagged for screen reader navigation, or require printing and handwriting to complete. Offer a named contact for anyone who needs materials in a different format." },
  { id: "cu1", category: "culture", priority: "ongoing", owners: ["HR", "Line managers"],
    title: "Normalise reasonable adjustments",
    what: "Build a culture in which requesting a reasonable adjustment is normal, does not require medical evidence as a default, and is handled promptly without interrogation.",
    why: "The most common reason disabled employees do not request adjustments they need is the process itself: it is perceived as burdensome, as requiring disclosure they do not want to make, or as marking them as 'difficult'. A culture where adjustments are seen as a normal management responsibility changes this.",
    how: "Train managers: an adjustment is not a favour, it is a reasonable management responsibility. Remove the requirement for medical evidence for standard adjustments (adjustable furniture, a quieter workspace, flexible working) and reserve it for cases where it is genuinely necessary. Set a maximum response time (5 working days) for adjustment requests and track compliance with it." },
  { id: "cu2", category: "culture", priority: "ongoing", owners: ["HR", "Line managers"],
    title: "Make flexibility a default, not an exception",
    what: "Treat flexible and hybrid working as the default way of working, not as something that must be justified or approved as an exception.",
    why: "Flexibility is one of the most significant accessibility adjustments for disabled employees, employees with caring responsibilities, employees with chronic health conditions, and neurodivergent employees. When it is treated as an exception, the burden of justification falls on the very people who most need it.",
    how: "Set a clear policy: flexibility is available to all employees unless there is a specific operational reason it cannot be accommodated. Train managers to respond to flexibility requests with the question 'how can we make this work?' rather than 'why do you need this?'. Monitor uptake by demographic group: if only certain groups are using flexible working, it may not be as available in practice as it appears in policy." },
  { id: "cu3", category: "culture", priority: "planned", owners: ["HR", "Line managers"],
    title: "Train all staff on accessibility, not just managers",
    what: "Include basic accessibility awareness in all-staff training, not just in management development or HR upskilling.",
    why: "Accessibility is not only a management responsibility. Colleagues make environments more or less accessible every day: in how they set up meetings, how they communicate, how they respond to a colleague using a mobility aid or requesting adjustments. Awareness training does not replace structural change but it is a necessary part of the environment being shaped by everyone in it.",
    how: "Cover: what accessibility means (physical, digital, sensory, cognitive, communication); why it matters (not just compliance, but inclusion and performance); what adjustments look like in practice; and what to do if you notice an accessibility barrier. Keep it under 90 minutes. Make it practical, not theoretical." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; border: string }> = {
  "quick win": { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "planned":   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "ongoing":   { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
};
const PRIORITY_ICON: Record<Priority, string> = { "quick win": "⚡", "planned": "📅", "ongoing": "🔄" };

const STATUS_STYLE: Record<ActionStatus, { bg: string; color: string; border: string; label: string }> = {
  "not started": { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb", label: "Not started" },
  "in progress": { bg: "#fefce8", color: "#a16207", border: "#fde68a", label: "In progress" },
  "done":        { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", label: "Done" },
};

const ASSESSMENT_OPTIONS: { value: AssessmentRating; label: string; color: string }[] = [
  { value: "not started", label: "Not started", color: "#dc2626" },
  { value: "partial",     label: "Partial",     color: "#d97706" },
  { value: "in place",    label: "In place",    color: "#16a34a" },
];

// ── Main component ─────────────────────────────────────────────────────────────
export default function AccessibleEnvironmentsToolkitPage() {
  const [tab, setTab] = useState<Tab>("assess");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activePriority, setActivePriority] = useState<Priority | "all">("all");
  const [activeOwner, setActiveOwner] = useState<Owner | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<Record<string, ActionStatus>>({});
  const [assessment, setAssessment] = useState<Record<Category, AssessmentRating>>({
    physical: "not started", digital: "not started", communication: "not started",
    meetings: "not started", onboarding: "not started", culture: "not started",
  });
  const [openScenario, setOpenScenario] = useState<Category | null>(null);
  const [showQuickWinsOnly, setShowQuickWinsOnly] = useState(false);

  const assessmentComplete = Object.values(assessment).every((v) => v !== "not started");

  const visible = useMemo(() => {
    let pool = ITEMS;
    if (activeCategory !== "all") pool = pool.filter((i) => i.category === activeCategory);
    if (activePriority !== "all") pool = pool.filter((i) => i.priority === activePriority);
    if (activeOwner !== "all") pool = pool.filter((i) => i.owners.includes(activeOwner as Owner));
    if (showQuickWinsOnly) pool = pool.filter((i) => i.priority === "quick win");
    const s = search.toLowerCase();
    if (s) pool = pool.filter((i) => i.title.toLowerCase().includes(s) || i.what.toLowerCase().includes(s) || i.why.toLowerCase().includes(s));
    return pool;
  }, [activeCategory, activePriority, activeOwner, search, showQuickWinsOnly]);

  // Smart prioritisation from assessment
  const prioritisedItems = useMemo(() => {
    const gapCategories = (Object.entries(assessment) as [Category, AssessmentRating][])
      .filter(([, v]) => v === "not started")
      .map(([k]) => k);
    const partialCategories = (Object.entries(assessment) as [Category, AssessmentRating][])
      .filter(([, v]) => v === "partial")
      .map(([k]) => k);
    return ITEMS.filter((i) => gapCategories.includes(i.category) || partialCategories.includes(i.category))
      .sort((a, b) => {
        const pOrder = { "quick win": 0, "planned": 1, "ongoing": 2 };
        const catOrderA = gapCategories.includes(a.category) ? 0 : 1;
        const catOrderB = gapCategories.includes(b.category) ? 0 : 1;
        return catOrderA - catOrderB || pOrder[a.priority] - pOrder[b.priority];
      });
  }, [assessment]);

  // Tracker stats
  const trackerItems = ITEMS.filter((i) => actionStatus[i.id]);
  const doneCount = Object.values(actionStatus).filter((s) => s === "done").length;
  const inProgressCount = Object.values(actionStatus).filter((s) => s === "in progress").length;
  const totalTracked = trackerItems.length;
  const progressPct = ITEMS.length > 0 ? Math.round((doneCount / ITEMS.length) * 100) : 0;

  const catProgress = (cat: Category) => {
    const items = ITEMS.filter((i) => i.category === cat);
    const done = items.filter((i) => actionStatus[i.id] === "done").length;
    return { done, total: items.length };
  };

  const chipStyle = (active: boolean, small = false): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: small ? "0.3rem 0.65rem" : "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: small ? "0.72rem" : "0.78rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 1.1rem", borderRadius: "8px",
    border: active ? "2px solid var(--sage-dark)" : "2px solid transparent",
    background: active ? "var(--sage-dark)" : "transparent",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem",
    cursor: "pointer", transition: "all 0.15s",
  });

  const badgeStyle = (p: Priority): React.CSSProperties => {
    const c = PRIORITY_STYLE[p];
    return { display: "inline-flex", alignItems: "center", gap: "0.25rem", background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.15rem 0.5rem", borderRadius: "999px" };
  };

  const handlePrintQuickWins = () => {
    const qwItems = ITEMS.filter((i) => i.priority === "quick win");
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const rows = qwItems.map((item, idx) => {
      const cat = CATEGORIES.find((c) => c.key === item.category)!;
      return `<div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f3f4f6">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="flex-shrink:0;font-size:22px;font-weight:800;color:#d1d5db;font-family:serif;width:28px;line-height:1">${idx + 1}</span>
          <div style="flex:1">
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#15803d;background:#f0fdf4;border:1px solid #bbf7d0">⚡ Quick win</span>
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#374151;background:#f9fafb;border:1px solid #e5e7eb">${cat.icon} ${cat.label}</span>
            </div>
            <p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 6px;line-height:1.45">${item.title}</p>
            <p style="font-size:12px;color:#374151;line-height:1.65;margin:0 0 6px">${item.what}</p>
            <div style="background:#f9fafb;border-left:3px solid #2D5A3C;padding:8px 12px;margin-top:8px;border-radius:0 6px 6px 0">
              <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#2D5A3C;margin:0 0 3px">How to start</p>
              <p style="font-size:12px;color:#374151;line-height:1.6;margin:0">${item.how}</p>
            </div>
            <p style="font-size:11px;color:#9ca3af;margin:8px 0 0">Owner${item.owners.length > 1 ? "s" : ""}: ${item.owners.join(", ")}</p>
          </div>
        </div>
      </div>`;
    }).join("");
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Accessible Environments: Quick Wins</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}@media print{body{padding:0}.no-print{display:none!important}}</style></head>
    <body><button class="no-print" onclick="window.print()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#2D5A3C;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Print or save as PDF</button>
    <div style="padding-bottom:20px;border-bottom:3px solid #2D5A3C;margin-bottom:24px">
      <h1 style="font-size:20px;font-weight:800;color:#2D5A3C;margin-bottom:4px">Accessible Environments: Quick Wins</h1>
      <p style="font-size:12px;color:#6b7280">The Inclusion Edit · theinclusionedit.com · Generated ${date}</p>
      <p style="font-size:12px;color:#6b7280;margin-top:2px">${qwItems.length} actions you can start this week</p>
    </div>${rows}
    <div style="margin-top:24px;padding:12px 16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:11px;color:#166534;line-height:1.6">
      Quick wins are starting points, not endpoints. Pair them with longer-term structural change. The best accessibility work is done with disabled employees, not for them.
    </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  const handlePrintActionPlan = () => {
    const inProgressItems = ITEMS.filter((i) => actionStatus[i.id] === "in progress");
    const notStartedItems = ITEMS.filter((i) => !actionStatus[i.id] || actionStatus[i.id] === "not started");
    const doneItems = ITEMS.filter((i) => actionStatus[i.id] === "done");
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const renderSection = (title: string, items: ToolkitItem[], accent: string) => items.length === 0 ? "" : `
      <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin:24px 0 12px">${title}</h2>
      ${items.map((item) => {
        const cat = CATEGORIES.find((c) => c.key === item.category)!;
        return `<div style="margin-bottom:12px;padding:12px 14px;background:#f9fafb;border-left:3px solid ${accent};border-radius:0 8px 8px 0">
          <p style="font-size:13px;font-weight:700;color:#111827;margin:0 0 3px">${item.title}</p>
          <p style="font-size:11px;color:#6b7280;margin:0">${cat.icon} ${cat.label} · Owner${item.owners.length > 1 ? "s" : ""}: ${item.owners.join(", ")}</p>
        </div>`;
      }).join("")}`;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Accessibility Action Plan</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}@media print{body{padding:0}.no-print{display:none!important}}</style></head>
    <body><button class="no-print" onclick="window.print()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#2D5A3C;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Print or save as PDF</button>
    <div style="padding-bottom:20px;border-bottom:3px solid #2D5A3C;margin-bottom:8px">
      <h1 style="font-size:20px;font-weight:800;color:#2D5A3C;margin-bottom:4px">Accessibility Action Plan</h1>
      <p style="font-size:12px;color:#6b7280">The Inclusion Edit · theinclusionedit.com · Generated ${date}</p>
      <p style="font-size:12px;color:#6b7280;margin-top:2px">${doneCount} of ${ITEMS.length} actions complete (${progressPct}%)</p>
    </div>
    ${renderSection("In progress", inProgressItems, "#d97706")}
    ${renderSection("Not yet started", notStartedItems, "#9ca3af")}
    ${renderSection("Completed", doneItems, "#16a34a")}
    </body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  const OWNERS_LIST: Owner[] = ["HR", "Facilities", "IT", "Line managers", "Communications"];

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>← Apply</Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Accessible Environments Toolkit</span>
      </nav>

      {/* Header */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>♿</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>🛠️ Toolkit</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Accessible Environments Toolkit</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            Practical actions for making your physical, digital, and cultural environment more accessible. Start with the self-assessment, build your action plan, and track progress over time.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("assess")} style={tabStyle(tab === "assess")}>🔍 Self-assessment</button>
            <button onClick={() => setTab("browse")} style={tabStyle(tab === "browse")}>📚 Action library</button>
            <button onClick={() => setTab("tracker")} style={tabStyle(tab === "tracker")}>
              ✅ Progress tracker {doneCount > 0 && <span style={{ marginLeft: "0.35rem", background: "rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0 5px", fontSize: "0.7rem" }}>{doneCount}/{ITEMS.length}</span>}
            </button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── SELF-ASSESSMENT TAB ── */}
        {tab === "assess" && (
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--gray-soft)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
              Rate your organisation's current state in each area. Your ratings generate a prioritised action plan tailored to your gaps.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {CATEGORIES.map((cat) => {
                const rating = assessment[cat.key];
                const isOpen = openScenario === cat.key;
                const progress = catProgress(cat.key);
                return (
                  <div key={cat.key} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", overflow: "hidden" }}>
                    <div style={{ padding: "1.125rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "0.875rem" }}>
                        <span style={{ fontSize: "1.3rem", flexShrink: 0, lineHeight: 1, marginTop: "0.1rem" }}>{cat.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.2rem" }}>{cat.label}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", margin: 0, lineHeight: 1.55 }}>{cat.desc}</p>
                        </div>
                        {progress.done > 0 && (
                          <span style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "999px", padding: "0.2rem 0.55rem" }}>
                            {progress.done}/{progress.total} done
                          </span>
                        )}
                      </div>
                      {/* Rating buttons */}
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                        {ASSESSMENT_OPTIONS.map((opt) => {
                          const active = rating === opt.value;
                          return (
                            <button key={opt.value} onClick={() => setAssessment((prev) => ({ ...prev, [cat.key]: opt.value }))}
                              style={{ padding: "0.4rem 0.9rem", borderRadius: "8px", border: active ? `2px solid ${opt.color}` : "1.5px solid var(--gray-border)", background: active ? `${opt.color}18` : "var(--white)", color: active ? opt.color : "var(--gray-soft)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                              {opt.value === "not started" ? "⬜ Not started" : opt.value === "partial" ? "🟡 Partial" : "✅ In place"}
                            </button>
                          );
                        })}
                      </div>
                      {/* Scenario toggle */}
                      <button onClick={() => setOpenScenario(isOpen ? null : cat.key)}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", padding: 0 }}>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", fontSize: "0.6rem" }}>▼</span>
                        {isOpen ? "Hide context" : "Why this area matters"}
                      </button>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 1.25rem 1.125rem", borderTop: "1px solid var(--gray-border)" }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--charcoal)", lineHeight: 1.75, margin: "1rem 0 0", fontStyle: "italic" }}>{cat.scenario}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prioritised action plan */}
            {assessmentComplete && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", margin: 0 }}>
                    Your prioritised action plan
                    <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)", fontWeight: 400 }}>
                      {prioritisedItems.length} actions based on your ratings
                    </span>
                  </h2>
                </div>

                {prioritisedItems.length === 0 ? (
                  <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "2rem", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.4rem" }}>Everything is in place</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", margin: 0 }}>You've rated all areas as "In place." Use the action library and tracker tabs to maintain and evidence progress.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {prioritisedItems.map((item) => {
                      const cat = CATEGORIES.find((c) => c.key === item.category)!;
                      const status = actionStatus[item.id];
                      const isOpen = expanded === item.id;
                      return (
                        <div key={item.id} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", padding: "0.875rem 1rem", gap: "0.75rem" }}>
                            {/* Status cycle button */}
                            <button onClick={() => setActionStatus((prev) => {
                              const cur = prev[item.id] || "not started";
                              const next: ActionStatus = cur === "not started" ? "in progress" : cur === "in progress" ? "done" : "not started";
                              return { ...prev, [item.id]: next };
                            })} title="Cycle status" style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${STATUS_STYLE[status || "not started"].border}`, background: STATUS_STYLE[status || "not started"].bg, color: STATUS_STYLE[status || "not started"].color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.7rem", fontWeight: 800, transition: "all 0.15s", marginTop: "0.15rem" }}>
                              {status === "done" ? "✓" : status === "in progress" ? "→" : ""}
                            </button>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                                <span style={badgeStyle(item.priority)}>{PRIORITY_ICON[item.priority]} {item.priority}</span>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{cat.icon} {cat.label}</span>
                                {status && <span style={{ display: "inline-flex", alignItems: "center", background: STATUS_STYLE[status].bg, border: `1px solid ${STATUS_STYLE[status].border}`, color: STATUS_STYLE[status].color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{STATUS_STYLE[status].label}</span>}
                              </div>
                              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.45, textDecoration: status === "done" ? "line-through" : "none", opacity: status === "done" ? 0.5 : 1 }}>{item.title}</p>
                              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", margin: "0.2rem 0 0" }}>Owner{item.owners.length > 1 ? "s" : ""}: {item.owners.join(", ")}</p>
                            </div>
                            <button onClick={() => setExpanded(isOpen ? null : item.id)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "var(--sage-dark)", fontSize: "0.65rem", fontWeight: 700, padding: "0.1rem 0 0 0.5rem", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</button>
                          </div>
                          {isOpen && (
                            <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--charcoal)", lineHeight: 1.7, margin: "0.875rem 0 0" }}>{item.what}</p>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                                <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#713f12", margin: "0 0 0.3rem" }}>Why it matters</p>
                                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.why}</p>
                                </div>
                                <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.3rem" }}>How to start</p>
                                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.how}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {!assessmentComplete && (
              <div style={{ background: "var(--white)", border: "1.5px dashed var(--gray-border)", borderRadius: "14px", padding: "2rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", margin: 0 }}>Rate all six areas above to generate your prioritised action plan.</p>
              </div>
            )}
          </div>
        )}

        {/* ── BROWSE TAB ── */}
        {tab === "browse" && (
          <div>
            {/* Quick wins banner */}
            <div style={{ background: showQuickWinsOnly ? "var(--sage-dark)" : "var(--white)", border: showQuickWinsOnly ? "none" : "1px solid var(--gray-border)", borderRadius: "12px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" as const }}>
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: showQuickWinsOnly ? "var(--white)" : "var(--charcoal)", margin: "0 0 0.2rem" }}>⚡ {ITEMS.filter(i => i.priority === "quick win").length} quick wins available</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: showQuickWinsOnly ? "rgba(255,255,255,0.75)" : "var(--gray-soft)", margin: 0 }}>Actions you can start this week, with no budget required. Printable as a one-page handout.</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button onClick={() => setShowQuickWinsOnly(!showQuickWinsOnly)}
                  style={{ padding: "0.45rem 1rem", borderRadius: "8px", border: showQuickWinsOnly ? "2px solid rgba(255,255,255,0.4)" : "1.5px solid var(--gray-border)", background: showQuickWinsOnly ? "rgba(255,255,255,0.15)" : "var(--white)", color: showQuickWinsOnly ? "var(--white)" : "var(--charcoal)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                  {showQuickWinsOnly ? "Show all" : "Filter to quick wins"}
                </button>
                <button onClick={handlePrintQuickWins}
                  style={{ padding: "0.45rem 1rem", borderRadius: "8px", border: showQuickWinsOnly ? "2px solid rgba(255,255,255,0.4)" : "1.5px solid var(--sage-dark)", background: showQuickWinsOnly ? "rgba(255,255,255,0.2)" : "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                  🖨️ Print handout
                </button>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <button onClick={() => setActiveCategory("all")} style={chipStyle(activeCategory === "all", true)}>All areas</button>
              {CATEGORIES.map((c) => <button key={c.key} onClick={() => setActiveCategory(c.key)} style={chipStyle(activeCategory === c.key, true)}>{c.icon} {c.label}</button>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <button onClick={() => setActivePriority("all")} style={chipStyle(activePriority === "all", true)}>All priorities</button>
              {(["quick win", "planned", "ongoing"] as Priority[]).map((p) => <button key={p} onClick={() => setActivePriority(p)} style={chipStyle(activePriority === p, true)}>{PRIORITY_ICON[p]} {p}</button>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              <button onClick={() => setActiveOwner("all")} style={chipStyle(activeOwner === "all", true)}>All owners</button>
              {OWNERS_LIST.map((o) => <button key={o} onClick={() => setActiveOwner(o)} style={chipStyle(activeOwner === o, true)}>{o}</button>)}
            </div>

            <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1rem" }}>
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
              <input type="search" placeholder="Search actions…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--white)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" as const }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", marginBottom: "0.875rem" }}>
              {visible.length} action{visible.length !== 1 ? "s" : ""}{showQuickWinsOnly ? " (quick wins only)" : ""}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {visible.map((item) => {
                const isOpen = expanded === item.id;
                const cat = CATEGORIES.find((c) => c.key === item.category)!;
                const status = actionStatus[item.id];
                return (
                  <div key={item.id} style={{ background: status === "done" ? "#f9fafb" : "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden", opacity: status === "done" ? 0.7 : 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", padding: "0.875rem 1rem", gap: "0.75rem" }}>
                      {/* Status toggle */}
                      <button onClick={() => setActionStatus((prev) => {
                        const cur = prev[item.id] || "not started";
                        const next: ActionStatus = cur === "not started" ? "in progress" : cur === "in progress" ? "done" : "not started";
                        return { ...prev, [item.id]: next };
                      })} title="Cycle status" style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${STATUS_STYLE[status || "not started"].border}`, background: STATUS_STYLE[status || "not started"].bg, color: STATUS_STYLE[status || "not started"].color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.7rem", fontWeight: 800, transition: "all 0.15s", marginTop: "0.15rem" }}>
                        {status === "done" ? "✓" : status === "in progress" ? "→" : ""}
                      </button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.3rem", alignItems: "center" }}>
                          <span style={badgeStyle(item.priority)}>{PRIORITY_ICON[item.priority]} {item.priority}</span>
                          {activeCategory === "all" && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{cat.icon} {cat.label}</span>}
                          {status && <span style={{ display: "inline-flex", alignItems: "center", background: STATUS_STYLE[status].bg, border: `1px solid ${STATUS_STYLE[status].border}`, color: STATUS_STYLE[status].color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{STATUS_STYLE[status].label}</span>}
                        </div>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", margin: "0 0 0.15rem", lineHeight: 1.45, textDecoration: status === "done" ? "line-through" : "none" }}>{item.title}</p>
                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                          {item.owners.map((o) => {
                            const oc = OWNER_STYLE[o];
                            return <span key={o} style={{ display: "inline-flex", alignItems: "center", background: oc.bg, border: `1px solid ${oc.border}`, color: oc.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "0.1rem 0.4rem", borderRadius: "999px" }}>{o}</span>;
                          })}
                        </div>
                      </div>
                      <button onClick={() => setExpanded(isOpen ? null : item.id)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "var(--sage-dark)", fontSize: "0.65rem", fontWeight: 700, padding: "0.1rem 0 0 0.5rem", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</button>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ marginTop: "0.875rem" }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--charcoal)", margin: "0 0 0.3rem" }}>What to do</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{item.what}</p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                          <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#713f12", margin: "0 0 0.3rem" }}>Why it matters</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.why}</p>
                          </div>
                          <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 0.3rem" }}>How to start</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.how}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {visible.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1rem" }}>No actions match your current filters.</p>
                  <button onClick={() => { setSearch(""); setActiveCategory("all"); setActivePriority("all"); setActiveOwner("all"); setShowQuickWinsOnly(false); }}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.55rem 1.25rem", cursor: "pointer" }}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TRACKER TAB ── */}
        {tab === "tracker" && (
          <div>
            {/* Overall progress */}
            <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "0.875rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", margin: "0 0 0.15rem" }}>Overall progress</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", margin: 0 }}>{doneCount} of {ITEMS.length} actions complete · {inProgressCount} in progress</p>
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: progressPct === 100 ? "#15803d" : "var(--charcoal)", lineHeight: 1 }}>{progressPct}%</span>
              </div>
              <div style={{ height: "8px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden", marginBottom: "1.25rem" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: progressPct === 100 ? "#16a34a" : "var(--sage-dark)", borderRadius: "999px", transition: "width 0.4s ease" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.625rem" }}>
                {CATEGORIES.map((cat) => {
                  const p = catProgress(cat.key);
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <div key={cat.key} style={{ background: "var(--sage-xlight)", borderRadius: "10px", padding: "0.75rem 0.875rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)", margin: "0 0 0.25rem" }}>{cat.icon} {cat.label}</p>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: pct === 100 ? "#15803d" : "var(--charcoal)", margin: "0 0 0.4rem" }}>{p.done}/{p.total}</p>
                      <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#16a34a" : "var(--sage-dark)", borderRadius: "999px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status sections */}
            {(["in progress", "not started", "done"] as ActionStatus[]).map((status) => {
              const sItems = ITEMS.filter((i) => (actionStatus[i.id] || "not started") === status);
              if (status === "not started" && sItems.length === ITEMS.length) return null; // nothing tracked yet
              return (
                <div key={status} style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", color: STATUS_STYLE[status].color, margin: "0 0 0.75rem" }}>
                    {status === "in progress" ? `→ In progress (${sItems.length})` : status === "done" ? `✓ Completed (${sItems.length})` : `◯ Not yet started (${sItems.length})`}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {sItems.map((item) => {
                      const cat = CATEGORIES.find((c) => c.key === item.category)!;
                      return (
                        <div key={item.id} style={{ background: "var(--white)", border: `1.5px solid ${STATUS_STYLE[status].border}`, borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <button onClick={() => setActionStatus((prev) => {
                            const cur = prev[item.id] || "not started";
                            const next: ActionStatus = cur === "not started" ? "in progress" : cur === "in progress" ? "done" : "not started";
                            return { ...prev, [item.id]: next };
                          })} style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${STATUS_STYLE[status].border}`, background: STATUS_STYLE[status].bg, color: STATUS_STYLE[status].color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.7rem", fontWeight: 800, transition: "all 0.15s" }}>
                            {status === "done" ? "✓" : status === "in progress" ? "→" : ""}
                          </button>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.84rem", color: "var(--charcoal)", margin: "0 0 0.15rem", textDecoration: status === "done" ? "line-through" : "none", opacity: status === "done" ? 0.5 : 1 }}>{item.title}</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--gray-soft)", margin: 0 }}>{cat.icon} {cat.label} · {PRIORITY_ICON[item.priority]} {item.priority} · {item.owners.join(", ")}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {totalTracked === 0 && (
              <div style={{ background: "var(--white)", border: "1.5px dashed var(--gray-border)", borderRadius: "14px", padding: "2.5rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Nothing tracked yet</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", margin: "0 0 1.25rem" }}>Use the checkbox on any action in the library or your action plan to mark it as in progress or done.</p>
                <button onClick={() => setTab("browse")} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.55rem 1.25rem", cursor: "pointer" }}>Browse action library →</button>
              </div>
            )}

            {totalTracked > 0 && (
              <button onClick={handlePrintActionPlan}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem", borderRadius: "10px", border: "none", background: "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", marginTop: "0.5rem" }}>
                🖨️ Export action plan
              </button>
            )}
          </div>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
