"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

type Category = "all" | "physical" | "digital" | "communication" | "meetings" | "onboarding" | "culture";

const CATEGORIES: { key: Category; label: string; icon: string; desc: string }[] = [
  { key: "all",           label: "All areas",              icon: "🏛️", desc: "" },
  { key: "physical",      label: "Physical space",          icon: "🏢", desc: "The built environment: offices, meeting rooms, kitchens, entrances, and any space employees are expected to use." },
  { key: "digital",       label: "Digital and tools",       icon: "💻", desc: "The software, platforms, and digital workflows employees rely on to do their work." },
  { key: "communication", label: "Communication",           icon: "📢", desc: "How information is shared: documents, presentations, emails, intranet, and visual content." },
  { key: "meetings",      label: "Meetings and events",     icon: "📅", desc: "How meetings and events are structured, where they happen, and who can meaningfully participate." },
  { key: "onboarding",    label: "Onboarding",              icon: "🚪", desc: "How new employees are brought into the organisation and given access to what they need." },
  { key: "culture",       label: "Culture and process",     icon: "🌱", desc: "The norms, policies, and everyday practices that make environments more or less accessible for everyone." },
];

type Priority = "quick win" | "planned" | "ongoing";

type ToolkitItem = {
  id: string;
  category: Category;
  title: string;
  what: string;
  why: string;
  how: string;
  priority: Priority;
};

const ITEMS: ToolkitItem[] = [
  // Physical
  { id: "ph1", category: "physical", priority: "quick win", title: "Audit entrance and route accessibility", what: "Walk the route from the building entrance to every space employees are expected to use: reception, desks, meeting rooms, toilets, kitchen, and quiet spaces.", why: "Many accessibility barriers in physical environments are invisible to non-disabled people. A step at a side entrance, a heavy door with no automatic opener, a lift that requires navigation through a crowded open-plan floor: each of these tells a disabled employee something about whether they were thought of when the space was designed.", how: "Do the audit with a disabled employee or access consultant, not without one. Ask: could someone with limited mobility navigate this route? Could someone with low vision? Could someone with a chronic condition that is worsened by distance or cold? Document every barrier and assign an owner and a timeframe to each." },
  { id: "ph2", category: "physical", priority: "planned", title: "Create a quiet space", what: "Designate at least one quiet, low-stimulation space in the office that employees can use without booking and without having to explain why.", why: "Neurodivergent employees, employees managing anxiety or chronic pain, and employees who need focus time are not a minority: they are a significant proportion of any workforce. Open-plan offices are designed for socialisation and have been shown to reduce focus and increase stress. A quiet space is not a luxury.", how: "The space should have: reduced lighting (or control over lighting), minimal noise, a door that closes, and a clear signal that noise is not expected inside it. It does not need to be large. It does need to be accessible by any route available to everyone else." },
  { id: "ph3", category: "physical", priority: "ongoing", title: "Maintain accessible furniture options", what: "Ensure that height-adjustable desks, ergonomic chairs, and other adaptive furniture are available and accessible without requiring a formal process to obtain them.", why: "The process of requesting adaptive equipment is itself a barrier. When an employee with a musculoskeletal condition, chronic pain, or a disability needs to complete a form, wait for an occupational health assessment, and justify their need to a manager, the equipment arrives weeks or months after the need begins.", how: "Make a range of equipment available on request or on a self-serve basis, with clear information about what is available and how to get it. Review requests annually to understand demand and adjust stock. Train line managers to respond to requests promptly and without interrogating the reason." },
  // Digital
  { id: "di1", category: "digital", priority: "quick win", title: "Check default tool accessibility settings", what: "Review the default settings on your main digital tools (email, video conferencing, document software, HR systems) for accessibility features and ensure they are enabled by default where possible.", why: "Accessibility features that must be switched on individually are used by far fewer people than those that are on by default. Captions on video calls, high-contrast options in documents, screen reader compatibility: these are not edge-case needs.", how: "For each core tool, identify: what accessibility features exist, whether they are on by default, and what a user needs to do to activate them. Publish a single reference page with instructions for activating key features. For video conferencing: enable automatic captions by default, not as an optional add-on." },
  { id: "di2", category: "digital", priority: "planned", title: "Test internal systems with assistive technology", what: "Have your intranet, HR self-service system, and core internal platforms tested with screen readers and keyboard-only navigation.", why: "Most organisations do this for external-facing digital products and not for internal ones. An HR system that cannot be navigated without a mouse, or an intranet that screen readers cannot parse, tells disabled employees that internal infrastructure was not designed for them.", how: "Commission an accessibility audit from a specialist or work with disabled employees who use assistive technology to test each system. Prioritise systems that are used for high-stakes tasks: submitting expenses, accessing pay information, booking leave. Raise accessibility failures with vendors and include accessibility requirements in procurement criteria for future tools." },
  { id: "di3", category: "digital", priority: "ongoing", title: "Maintain an accessibility-first document library", what: "Ensure all widely-shared internal documents (templates, policy documents, handbooks, forms) meet basic accessibility standards.", why: "A PDF that cannot be read by a screen reader, a presentation with text in images, a form that requires a mouse: these are not niche technical problems. They are barriers that affect blind employees, employees with visual impairments, employees with motor difficulties, and employees using assistive technology of any kind.", how: "Use the accessibility checker in Word, PowerPoint, and PDF tools before sharing documents widely. Require accessible formats: proper heading structure, alt text on images, sufficient colour contrast, not text embedded in images. Designate an owner for the central document library who is responsible for accessibility standards." },
  // Communication
  { id: "co1", category: "communication", priority: "quick win", title: "Add alt text to images in communications", what: "Train everyone who creates internal communications, presentations, or social content to add descriptive alt text to all images.", why: "Alt text is the text that screen readers read aloud when they encounter an image. An image with no alt text produces silence: the screen reader user misses whatever the image was communicating. An image with alt text of 'image.png' produces noise: the filename, which communicates nothing.", how: "Alt text should describe what the image shows in the context it appears in. 'Two colleagues looking at a laptop together' is useful. 'Happy employees' is not. Images that are purely decorative should have null alt text (empty quotes) so screen readers skip them. Include this in induction training and in any onboarding for communications, marketing, or HR roles." },
  { id: "co2", category: "communication", priority: "quick win", title: "Review colour contrast in branded materials", what: "Check that text and background colour combinations in your standard templates and branded materials meet WCAG 2.1 AA contrast standards.", why: "Approximately 8% of men and 0.5% of women have some form of colour vision deficiency. A further significant proportion of the population experience some degree of low vision. Insufficient contrast between text and background is one of the most common and most easily fixed accessibility failures.", how: "Use a free contrast checker (such as the WebAIM Contrast Checker) to test your standard colour combinations. WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. If your brand colours fail this test, work with your design team to identify compliant alternatives for text contexts." },
  { id: "co3", category: "communication", priority: "planned", title: "Offer plain language versions of complex documents", what: "For any complex policy document, legal notice, or multi-page guidance document, produce a plain language summary.", why: "Plain language is not a concession to readers with lower literacy: it is better communication for everyone. Documents that are clear, structured, and free of jargon are more likely to be read, understood, and acted on. For people with cognitive disabilities, literacy difficulties, or English as an additional language, plain language versions may be the only version they can meaningfully access.", how: "Aim for a reading age of approximately 9 (equivalent to clear newspaper writing). Use short sentences, active voice, clear headings, and bullet points for lists of conditions or steps. Test plain language versions with a representative group before distributing." },
  // Meetings
  { id: "me1", category: "meetings", priority: "quick win", title: "Send materials in advance of meetings", what: "Share agendas and any materials to be discussed at least 48 hours before a meeting.", why: "Many accessibility needs are served by preparation time that is not available in real-time meetings: neurodivergent employees who process information more effectively when they have advance sight of it; employees who use communication aids that take time to set up; employees with anxiety who benefit from knowing what to expect; employees with hearing loss who want to read materials before a discussion they may struggle to follow.", how: "Make advance materials a standard expectation, not a courtesy. Include this in your meeting guidance and in any facilitation training for managers. For recurring meetings, establish a standard that materials go out at the start of the week for a mid-week meeting." },
  { id: "me2", category: "meetings", priority: "quick win", title: "Include hybrid and remote accessibility as standard", what: "Ensure that hybrid meetings are set up so that remote participants can contribute as fully as in-person ones.", why: "For many disabled employees, remote working is not a preference but a necessity. A meeting format that prioritises in-person experience and treats remote participants as second-tier creates a two-tier workplace where disabled employees are structurally excluded from full participation.", how: "Use a camera pointed at the whole room (not just the presenter) for remote participants. Repeat questions and comments made in the room so remote participants can hear them. Use the meeting platform's hand-raise feature and monitor it. Nominate a remote participant liaison in every hybrid meeting to monitor the chat and ensure remote voices are heard." },
  { id: "me3", category: "meetings", priority: "planned", title: "Audit event locations for accessibility", what: "Before booking any external event venue, conference, or team away day, check it against an accessibility checklist.", why: "An event held in an inaccessible venue excludes disabled employees from a team experience that may affect their relationships, their visibility, and their sense of belonging. A single inaccessible event can communicate clearly that the organisation did not think about them.", how: "Checklist items: step-free access from entrance to all event spaces; accessible toilet facilities on the same floor as event spaces; hearing loop provision; flexible seating arrangements; dietary options communicated in advance; parking and public transport information; quiet space or breakout option. Ask the venue explicitly about each of these before booking." },
  // Onboarding
  { id: "on1", category: "onboarding", priority: "quick win", title: "Ask access needs before start date", what: "Include a question about access needs and reasonable adjustments as part of the pre-start onboarding process, before the employee arrives.", why: "Asking for access information on day one, when a new employee is navigating an unfamiliar environment, meeting new colleagues, and managing first-day anxiety, is too late. Asking in advance allows adjustments to be in place when they arrive.", how: "Ask clearly: 'Do you have any access requirements or would you like to discuss any adjustments that would help you do your job?' Make it clear that this is routine, that it is confidential (shared only with HR and the direct line manager), and that asking does not commit them to disclosing any specific diagnosis or condition. Review what adjustments may be needed before their first day." },
  { id: "on2", category: "onboarding", priority: "planned", title: "Create an accessible onboarding pack", what: "Ensure all onboarding materials are available in accessible formats: properly structured documents, not scanned PDFs; digital forms, not paper ones; and a point of contact who can provide materials in alternative formats on request.", why: "A new employee who immediately encounters inaccessible materials learns on day one that accessibility was not considered in their organisation's processes. This shapes their expectations of what else will and will not have been considered." , how: "Audit your onboarding materials annually. Remove any documents that are: scanned images rather than text, not tagged for screen reader navigation, or require printing and handwriting to complete. Offer a named contact for anyone who needs materials in a different format." },
  // Culture
  { id: "cu1", category: "culture", priority: "ongoing", title: "Normalise reasonable adjustments", what: "Build a culture in which requesting a reasonable adjustment is normal, does not require medical evidence as a default, and is handled promptly without interrogation.", why: "The most common reason disabled employees do not request adjustments they need is the process itself: it is perceived as burdensome, as requiring disclosure they do not want to make, or as marking them as 'difficult'. A culture where adjustments are seen as a normal management responsibility changes this.", how: "Train managers: an adjustment is not a favour, it is a reasonable management responsibility. Remove the requirement for medical evidence for standard adjustments (adjustable furniture, a quieter workspace, flexible working) and reserve it for cases where it is genuinely necessary. Set a maximum response time (5 working days) for adjustment requests and track compliance with it." },
  { id: "cu2", category: "culture", priority: "ongoing", title: "Make flexibility a default, not an exception", what: "Treat flexible and hybrid working as the default way of working, not as something that must be justified or approved as an exception.", why: "Flexibility is one of the most significant accessibility adjustments for disabled employees, employees with caring responsibilities, employees with chronic health conditions, and neurodivergent employees. When it is treated as an exception, the burden of justification falls on the very people who most need it.", how: "Set a clear policy: flexibility is available to all employees unless there is a specific operational reason it cannot be accommodated. Train managers to respond to flexibility requests with the question 'how can we make this work?' rather than 'why do you need this?'. Monitor uptake by demographic group: if only certain groups are using flexible working, it may not be as available in practice as it appears in policy." },
  { id: "cu3", category: "culture", priority: "planned", title: "Train all staff on accessibility, not just managers", what: "Include basic accessibility awareness in all-staff training, not just in management development or HR upskilling.", why: "Accessibility is not only a management responsibility. Colleagues make environments more or less accessible every day: in how they set up meetings, how they communicate, how they respond to a colleague using a mobility aid or requesting adjustments. Awareness training does not replace structural change but it is a necessary part of the environment being shaped by everyone in it.", how: "Cover: what accessibility means (physical, digital, sensory, cognitive, communication); why it matters (not just compliance, but inclusion and performance); what adjustments look like in practice; and what to do if you notice an accessibility barrier. Keep it under 90 minutes. Make it practical, not theoretical." },
];

export default function AccessibleEnvironmentsToolkitPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    let pool = activeCategory === "all" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory);
    const s = search.toLowerCase();
    if (s) pool = pool.filter((i) => i.title.toLowerCase().includes(s) || i.what.toLowerCase().includes(s) || i.why.toLowerCase().includes(s));
    return pool;
  }, [activeCategory, search]);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const priorityStyle = (p: Priority): React.CSSProperties => {
    const map: Record<Priority, { bg: string; color: string; border: string }> = {
      "quick win": { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
      "planned":   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
      "ongoing":   { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
    };
    const c = map[p];
    return { display: "inline-flex", alignItems: "center", gap: "0.25rem", background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "999px" };
  };

  const priorityIcon = (p: Priority) => ({ "quick win": "⚡", "planned": "📅", "ongoing": "🔄" }[p]);
  const catInfo = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Accessible Environments Toolkit</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>♿</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              🛠️ Toolkit
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Accessible Environments Toolkit
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            Practical actions for making your physical, digital, and cultural environment more accessible: what to do, why it matters, and how to start. Organised by area and priority.
          </p>

          {/* Legend */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {(["quick win", "planned", "ongoing"] as Priority[]).map((p) => (
              <span key={p} style={priorityStyle(p)}>{priorityIcon(p)} {p}</span>
            ))}
          </div>

          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
            <input type="search" placeholder="Search toolkit…" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "1.25rem" }}>
            {CATEGORIES.map((c) => (
              <button key={c.key} onClick={() => setActiveCategory(c.key)} style={chipStyle(activeCategory === c.key)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {catInfo && catInfo.desc && (
            <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "0.25rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--sage-dark)", margin: 0, lineHeight: 1.6 }}>{catInfo.desc}</p>
            </div>
          )}
        </div>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No items match your current filters.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("all"); }} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>Clear filters</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {visible.map((item) => {
            const isOpen = expanded === item.id;
            const catLabel = CATEGORIES.find((c) => c.key === item.category);
            return (
              <div key={item.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setExpanded(isOpen ? null : item.id)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <span style={{ fontSize: "1rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "block", color: "var(--sage-dark)", fontWeight: 700, lineHeight: 1, flexShrink: 0, marginTop: "0.25rem" }}>+</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.35rem", alignItems: "center" }}>
                      <span style={priorityStyle(item.priority)}>{priorityIcon(item.priority)} {item.priority}</span>
                      {activeCategory === "all" && catLabel && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                          {catLabel.icon} {catLabel.label}
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)" }}>{item.title}</span>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.875rem", marginTop: "0" }}>
                    <div style={{ marginTop: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "0.3rem" }}>What to do</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{item.what}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.3rem" }}>Why it matters</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{item.why}</p>
                    </div>
                    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "8px", padding: "0.75rem 0.875rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.3rem" }}>How to start</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{item.how}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>About this toolkit</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            This toolkit provides practical starting points, not a comprehensive accessibility audit. Accessibility is both a legal requirement (under the Equality Act 2010 in the UK, the Americans with Disabilities Act in the US, and equivalent legislation in other jurisdictions) and a meaningful inclusion imperative. For a full compliance audit, work with a specialist accessibility consultant. For digital accessibility specifically, refer to the Web Content Accessibility Guidelines (WCAG 2.1). The best accessibility work is done with disabled employees, not for them.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
