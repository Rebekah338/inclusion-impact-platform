"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

// Event profile options
const EVENT_TYPES = ["In-person", "Online", "Hybrid"];
const AUDIENCE_SIZES = ["Small team (under 30)", "Medium (30 to 150)", "Large (150+)"];
const AUDIENCE_FOCUSES = [
  "General / mixed audience",
  "Disabled attendees or access needs likely",
  "Faith or cultural communities centred",
  "Global or multi-timezone audience",
  "Neurodivergent attendees likely",
];

// Which sections are especially important per event profile
const HIGHLIGHTED: Record<string, string[]> = {
  "In-person": ["venue", "logistics", "hospitality"],
  "Online": ["digital", "logistics"],
  "Hybrid": ["digital", "venue", "logistics"],
  "Small team (under 30)": ["purpose", "stakeholders"],
  "Medium (30 to 150)": ["registration", "training"],
  "Large (150+)": ["budget", "venue", "training", "logistics"],
  "Disabled attendees or access needs likely": ["venue", "digital", "registration", "logistics"],
  "Faith or cultural communities centred": ["datetime", "hospitality", "programme"],
  "Global or multi-timezone audience": ["datetime", "digital"],
  "Neurodivergent attendees likely": ["digital", "registration", "logistics", "programme"],
};

const PHASES = [
  {
    id: "pre",
    label: "Pre-Event",
    color: "#5C7A6B",
    sections: [
      {
        id: "purpose",
        title: "Purpose, Audience, and Equity",
        items: [
          "Define the event purpose and what inclusion looks like for this specific event",
          "Identify who your audience is and any equity considerations for that group",
          "Ask: who might be excluded from this event and why?",
          "Set a clear intention for inclusive design from the outset",
        ],
      },
      {
        id: "stakeholders",
        title: "Stakeholder Co-Design",
        items: [
          "Involve people from underrepresented groups in the planning process",
          "Seek feedback from disabled people, neurodiverse individuals, carers, and others who may face barriers",
          "Do not co-opt lived experience without recognition or compensation",
          "Create feedback loops so community input shapes the event design",
        ],
      },
      {
        id: "budget",
        title: "Budget and Resource Equity",
        items: [
          "Allocate budget for accessibility provisions: BSL interpretation, captioning, carers",
          "Budget for dietary requirements and inclusive catering",
          "Consider whether ticket pricing or attendance costs create barriers",
          "Plan for any childcare, travel, or accommodation support where relevant",
        ],
      },
      {
        id: "datetime",
        title: "Date and Time Considerations",
        items: [
          "Avoid scheduling on significant religious, cultural, or community observance dates",
          "Consider time zones if the event is global or hybrid",
          "Account for caring responsibilities by avoiding very early mornings or late evenings",
          "Give sufficient notice for people who need to arrange access support in advance",
        ],
      },
      {
        id: "venue",
        title: "Venue Accessibility",
        items: [
          "Confirm step-free access throughout the entire venue",
          "Check accessible toilet facilities are available and clearly signposted",
          "Confirm parking and transport links, including accessible transport",
          "Assess sensory environment: lighting, noise levels, quiet spaces",
          "Review seating options: chairs, benches, standing options for varied needs",
          "Confirm that BSL interpreters and support workers can be accommodated",
        ],
      },
      {
        id: "digital",
        title: "Digital and Hybrid Accessibility",
        items: [
          "Choose a platform that is screen-reader compatible and keyboard navigable",
          "Test captioning and live transcription in advance",
          "Ensure the event link and joining instructions are accessible",
          "Offer dial-in alternatives for those with poor internet connectivity",
          "Brief speakers on being inclusive in a hybrid or virtual environment",
        ],
      },
      {
        id: "registration",
        title: "Registration and Pre-Event Communication",
        items: [
          "Include an access needs question in the registration process",
          "Ask about dietary requirements and religious or cultural considerations",
          "Provide event information in accessible formats: plain English, large print, audio",
          "Confirm access provisions with attendees ahead of the event",
          "Share the agenda and any materials in advance for neurodivergent attendees",
        ],
      },
      {
        id: "hospitality",
        title: "Catering and Hospitality",
        items: [
          "Offer a range of dietary options: vegan, halal, kosher, gluten-free, nut-free",
          "Label all food and drinks clearly including allergen information",
          "Avoid events centred around alcohol as the primary social activity",
          "Provide non-alcoholic alternatives as a default, not an afterthought",
        ],
      },
    ],
  },
  {
    id: "during",
    label: "During the Event",
    color: "#3D5C8A",
    sections: [
      {
        id: "programme",
        title: "Programme and Content Design",
        items: [
          "Ensure speakers and panellists represent diverse identities and perspectives",
          "Brief all speakers on inclusive facilitation: language, pacing, accessibility",
          "Include content warnings where relevant and give people the option to step out",
          "Avoid formats that exclude: speed networking, icebreakers that assume shared experience",
          "Build in breaks: comfort breaks, prayer breaks, and informal time",
        ],
      },
      {
        id: "marketing",
        title: "Marketing and Promotion",
        items: [
          "Use inclusive imagery in all promotional materials",
          "Describe images with alt text on digital content",
          "Avoid language that assumes identity, ability, or background",
          "Promote through channels that reach underrepresented communities",
          "State clearly what accessibility provisions are in place in all communications",
        ],
      },
      {
        id: "vendors",
        title: "Suppliers and Vendors",
        items: [
          "Prioritise diverse suppliers where possible: caterers, AV, photography",
          "Brief all suppliers on your inclusivity expectations",
          "Confirm that any external speakers or facilitators are briefed on inclusive practice",
        ],
      },
      {
        id: "training",
        title: "Staff and Volunteer Briefing",
        items: [
          "Brief all event staff and volunteers on accessible and inclusive hosting",
          "Train staff to respond to access needs without drawing unwanted attention",
          "Designate an inclusion point of contact for attendees to raise concerns",
          "Ensure staff know the location of quiet spaces, accessible toilets, and prayer rooms",
        ],
      },
      {
        id: "logistics",
        title: "Day-of Logistics",
        items: [
          "Set up signage in accessible formats: large print, pictograms, plain language",
          "Confirm BSL interpreters, captioners, and support staff are in position",
          "Check that quiet spaces are available and clearly signposted",
          "Monitor chat and Q&A for online events to ensure inclusive participation",
          "Have a clear process for responding to any incidents or concerns on the day",
        ],
      },
    ],
  },
  {
    id: "post",
    label: "Post-Event",
    color: "#7A5C3D",
    sections: [
      {
        id: "evaluation",
        title: "Evaluation and Continuous Improvement",
        items: [
          "Collect feedback specifically on accessibility and inclusion",
          "Ask attendees what worked well and what could have been better",
          "Review attendance data: were underrepresented groups present?",
          "Document what you learned for future events",
          "Share outcomes and actions with attendees and internal teams",
          "Compensate community members who contributed to evaluation or design",
        ],
      },
    ],
  },
];

export default function InclusiveEventPlanning() {
  // Event profile state
  const [profileDone, setProfileDone] = useState(false);
  const [eventType, setEventType] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [audienceFocus, setAudienceFocus] = useState("");

  // Checklist state
  const [activePhase, setActivePhase] = useState("pre");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Summary panel
  const [showSummary, setShowSummary] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const currentPhase = PHASES.find((p) => p.id === activePhase)!;
  const allItems = PHASES.flatMap((ph) => ph.sections.flatMap((s) => s.items.map((_, i) => `${ph.id}-${s.id}-${i}`)));
  const totalChecked = allItems.filter((k) => checked[k]).length;
  const totalItems = allItems.length;

  // Work out which section IDs to highlight based on profile
  const highlightedSections = new Set<string>([
    ...(HIGHLIGHTED[eventType] || []),
    ...(HIGHLIGHTED[audienceSize] || []),
    ...(HIGHLIGHTED[audienceFocus] || []),
  ]);

  const canStartChecklist = eventType && audienceSize && audienceFocus;

  // Summary text generator
  const summaryLines: string[] = [];
  if (canStartChecklist) {
    summaryLines.push(`Event profile: ${eventType} · ${audienceSize} · ${audienceFocus}`);
    summaryLines.push("");
  }
  PHASES.forEach(ph => {
    const phItems = ph.sections.flatMap((s) => s.items.map((_, i) => `${ph.id}-${s.id}-${i}`));
    const phDone = phItems.filter(k => checked[k]).length;
    summaryLines.push(`${ph.label}: ${phDone}/${phItems.length} items complete`);
    ph.sections.forEach(s => {
      const secDone = s.items.filter((_, i) => checked[`${ph.id}-${s.id}-${i}`]).length;
      const note = notes[`${ph.id}-${s.id}`];
      if (secDone > 0 || note) {
        summaryLines.push(`  ${s.title}: ${secDone}/${s.items.length} checked${note ? ` — ${note}` : ""}`);
      }
    });
    summaryLines.push("");
  });
  summaryLines.push("Planned using the Inclusive Event Planning tool from The Inclusion Edit.");
  const summaryText = summaryLines.join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Planning Tool</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Planning tool &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Inclusive Event Planning
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Plan inclusive events from start to finish. Start by telling us about your event so we can highlight the areas most relevant to you, then work through the checklist and generate a shareable summary for your team.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Events", "Accessibility", "Inclusion Practices"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── STEP 1: Event profile ── */}
        <div style={{ borderRadius: 16, border: `2px solid ${profileDone ? "var(--sage-dark)" : "var(--gray-border)"}`, background: "var(--white)", marginBottom: 24, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--gray-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, background: profileDone ? "var(--sage-dark)" : "var(--gray-border)", color: profileDone ? "#fff" : "var(--charcoal)" }}>
                {profileDone ? "✓" : "1"}
              </span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: "var(--charcoal)", fontFamily: "var(--font-heading)", margin: 0 }}>Tell us about your event</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>We'll highlight the checklist areas most relevant to you</p>
              </div>
            </div>
            {profileDone && (
              <button onClick={() => setProfileDone(false)} style={{ fontSize: 13, color: "var(--sage-dark)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                Edit
              </button>
            )}
          </div>

          {!profileDone ? (
            <div style={{ padding: "24px" }}>
              {/* Event type */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Event format</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {EVENT_TYPES.map(t => (
                    <button key={t} onClick={() => setEventType(t)}
                      style={{ padding: "8px 18px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all 0.15s", background: eventType === t ? "var(--sage-dark)" : "#fff", color: eventType === t ? "#fff" : "var(--charcoal)", borderColor: eventType === t ? "var(--sage-dark)" : "var(--gray-border)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience size */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Expected audience size</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {AUDIENCE_SIZES.map(s => (
                    <button key={s} onClick={() => setAudienceSize(s)}
                      style={{ padding: "8px 18px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all 0.15s", background: audienceSize === s ? "var(--sage-dark)" : "#fff", color: audienceSize === s ? "#fff" : "var(--charcoal)", borderColor: audienceSize === s ? "var(--sage-dark)" : "var(--gray-border)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience focus */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Audience focus</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {AUDIENCE_FOCUSES.map(f => (
                    <button key={f} onClick={() => setAudienceFocus(f)}
                      style={{ padding: "8px 18px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all 0.15s", background: audienceFocus === f ? "var(--sage-dark)" : "#fff", color: audienceFocus === f ? "#fff" : "var(--charcoal)", borderColor: audienceFocus === f ? "var(--sage-dark)" : "var(--gray-border)" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { if (canStartChecklist) setProfileDone(true); }}
                disabled={!canStartChecklist}
                style={{ padding: "10px 28px", borderRadius: 99, fontSize: 14, fontWeight: 700, border: "none", cursor: canStartChecklist ? "pointer" : "not-allowed", background: canStartChecklist ? "var(--sage-dark)" : "var(--gray-border)", color: canStartChecklist ? "#fff" : "#9ca3af", transition: "all 0.15s" }}>
                Start the checklist
              </button>
            </div>
          ) : (
            <div style={{ padding: "16px 24px", display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[eventType, audienceSize, audienceFocus].map(v => (
                <span key={v} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 13, fontWeight: 600, padding: "4px 14px" }}>{v}</span>
              ))}
              {highlightedSections.size > 0 && (
                <span style={{ fontSize: 13, color: "#6b7280", alignSelf: "center" }}>· Priority sections highlighted below</span>
              )}
            </div>
          )}
        </div>

        {/* ── STEP 2: Checklist ── */}
        <div style={{ opacity: profileDone ? 1 : 0.4, pointerEvents: profileDone ? "auto" : "none", transition: "opacity 0.3s" }}>

          {/* Overall progress */}
          <div style={{ borderRadius: 12, padding: "16px 20px", marginBottom: 20, background: "var(--white)", border: "1px solid var(--gray-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8, color: "var(--charcoal)", fontWeight: 600 }}>
              <span>Overall progress</span>
              <span style={{ color: "var(--sage-dark)" }}>{totalChecked} of {totalItems} items</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "var(--gray-border)" }}>
              <div style={{ height: 6, borderRadius: 3, transition: "width 0.3s", width: `${(totalChecked / totalItems) * 100}%`, background: "var(--sage-dark)" }} />
            </div>
          </div>

          {/* Phase tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {PHASES.map(ph => {
              const phItems = ph.sections.flatMap((s) => s.items.map((_, i) => `${ph.id}-${s.id}-${i}`));
              const phChecked = phItems.filter(k => checked[k]).length;
              return (
                <button key={ph.id} onClick={() => setActivePhase(ph.id)}
                  style={{ flex: 1, padding: "12px 8px", borderRadius: 12, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all 0.15s", background: activePhase === ph.id ? ph.color : "var(--white)", color: activePhase === ph.id ? "#fff" : "var(--charcoal)", borderColor: activePhase === ph.id ? ph.color : "var(--gray-border)" }}>
                  <div>{ph.label}</div>
                  <div style={{ fontSize: 12, marginTop: 2, opacity: 0.8 }}>{phChecked}/{phItems.length}</div>
                </button>
              );
            })}
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {currentPhase.sections.map(section => {
              const sectionChecked = section.items.filter((_, i) => checked[`${currentPhase.id}-${section.id}-${i}`]).length;
              const isComplete = sectionChecked === section.items.length;
              const isOpen = expanded[section.id] !== false;
              const isHighlighted = highlightedSections.has(section.id);
              const noteKey = `${currentPhase.id}-${section.id}`;

              return (
                <div key={section.id} style={{ borderRadius: 14, border: `2px solid`, overflow: "hidden", background: "var(--white)", borderColor: isComplete ? currentPhase.color : isHighlighted ? "#f59e0b" : "var(--gray-border)" }}>
                  {/* Priority badge */}
                  {isHighlighted && !isComplete && (
                    <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: "#92400e", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>★</span> Priority for your event type
                    </div>
                  )}

                  {/* Section header */}
                  <button onClick={() => toggleSection(section.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--charcoal)", fontFamily: "var(--font-heading)" }}>{section.title}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: isComplete ? currentPhase.color : "#6b7280" }}>
                        {isComplete ? "✓ Done" : `${sectionChecked}/${section.items.length}`}
                      </span>
                      <span style={{ color: "var(--charcoal)", opacity: 0.4, fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                        {section.items.map((item, i) => {
                          const key = `${currentPhase.id}-${section.id}-${i}`;
                          return (
                            <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                              <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)}
                                style={{ marginTop: 3, flexShrink: 0, width: 16, height: 16, accentColor: currentPhase.color }} />
                              <span style={{ fontSize: 14, color: "var(--charcoal)", lineHeight: 1.55, textDecoration: checked[key] ? "line-through" : "none", opacity: checked[key] ? 0.45 : 1 }}>
                                {item}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Notes field */}
                      <div style={{ borderTop: "1px solid var(--gray-border)", paddingTop: 14 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                          Notes or owner
                        </label>
                        <textarea
                          value={notes[noteKey] || ""}
                          onChange={e => setNotes(p => ({ ...p, [noteKey]: e.target.value }))}
                          placeholder="Add a note or name the person responsible…"
                          rows={2}
                          style={{ width: "100%", borderRadius: 8, border: "1px solid var(--gray-border)", padding: "8px 12px", fontSize: 13, color: "var(--charcoal)", fontFamily: "var(--font-body)", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STEP 3: Shareable summary ── */}
        <div style={{ marginTop: 40, borderRadius: 20, border: "2px solid var(--sage-dark)", background: "var(--white)", overflow: "hidden", opacity: profileDone ? 1 : 0.4, pointerEvents: profileDone ? "auto" : "none" }}>
          <button onClick={() => setShowSummary(p => !p)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "var(--sage-dark)", margin: "0 0 4px" }}>Share your plan</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "var(--charcoal)", fontFamily: "var(--font-heading)", margin: 0 }}>Generate a team summary</p>
              <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>Copy a plain-text summary of your planning progress to share with colleagues or drop into a team doc.</p>
            </div>
            <span style={{ fontSize: 22, color: "var(--sage-dark)", flexShrink: 0, marginLeft: 16 }}>{showSummary ? "▲" : "▼"}</span>
          </button>

          {showSummary && (
            <div style={{ padding: "0 24px 28px", borderTop: "1px solid var(--gray-border)" }}>
              <div style={{ background: "var(--sage-xlight)", borderRadius: 12, padding: "20px 24px", fontSize: 13, color: "var(--charcoal)", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "monospace", border: "1px solid #c6dbc9", marginTop: 20 }}>
                {summaryText}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={handleCopy}
                  style={{ padding: "10px 22px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid", cursor: "pointer", background: copied ? "#dcfce7" : "var(--sage-dark)", color: copied ? "#166534" : "#fff", borderColor: copied ? "#86efac" : "var(--sage-dark)", transition: "all 0.2s" }}>
                  {copied ? "✓ Copied" : "Copy summary"}
                </button>
                <button onClick={() => window.print()}
                  style={{ padding: "10px 22px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "2px solid var(--gray-border)", cursor: "pointer", background: "#fff", color: "var(--charcoal)" }}>
                  Print full checklist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Inclusion in events: why it matters from the start</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Events are one of the most visible expressions of an organisation's culture. Who is invited, who is on the panel, whether dietary and accessibility needs are anticipated, how networking is structured: all of these signal whose presence and participation is valued. When events are poorly planned from an inclusion perspective, people often quietly disengage rather than voice what did not work for them.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The most common mistakes in event inclusion happen at the planning stage, not on the day itself. Last-minute access provision, food options that exclude rather than include, speakers who are overwhelmingly from the same demographic, or social formats that assume everyone drinks alcohol are all avoidable with early attention. Inclusion in events is largely a planning discipline.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Post-event reflection is equally important. Gathering feedback on the experience of attending; asking specifically about accessibility, representation, and belonging; and acting on what you hear closes the loop and builds a track record of continuous improvement. Events that feel genuinely inclusive do not happen by accident: they are the result of deliberate, structured planning and honest review.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { href: "/dashboard/apply/inclusive-onboarding-guide", label: "Checklist", title: "Inclusive Onboarding Guide" },
              { href: "/dashboard/apply/erg-checklist", label: "Checklist", title: "ERG Checklist" },
              { href: "/dashboard/apply/inclusive-remote-hybrid", label: "Audit Tool", title: "Inclusive Remote and Hybrid Working" },
            ].map(r => (
              <Link key={r.href} href={r.href} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
