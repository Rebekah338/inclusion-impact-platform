"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

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
  const [activePhase, setActivePhase] = useState("pre");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const toggleSection = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const currentPhase = PHASES.find((p) => p.id === activePhase)!;
  const allItems = PHASES.flatMap((ph) => ph.sections.flatMap((s) => s.items.map((_, i) => `${ph.id}-${s.id}-${i}`)));
  const totalChecked = allItems.filter((k) => checked[k]).length;
  const totalItems = allItems.length;

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/dashboard/apply" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>
            ← Back to Apply
          </Link>
          <h1 className="text-3xl font-bold mt-3 mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)" }}>
            Inclusive Event Planning Checklist
          </h1>
          <p className="text-base" style={{ color: "var(--charcoal)", opacity: 0.75 }}>
            Plan events that are accessible, equitable, and welcoming to everyone. Work through each phase in order.
          </p>
        </div>

        {/* Overall progress */}
        <div className="rounded-xl p-4 mb-6 border" style={{ background: "var(--white)", borderColor: "var(--gray-border)" }}>
          <div className="flex justify-between text-sm mb-2" style={{ color: "var(--charcoal)" }}>
            <span>Overall progress</span>
            <span>{totalChecked} of {totalItems} items</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "var(--gray-border)" }}>
            <div className="h-2 rounded-full transition-all" style={{ width: `${(totalChecked / totalItems) * 100}%`, background: "var(--sage-dark)" }} />
          </div>
        </div>

        {/* Phase tabs */}
        <div className="flex gap-2 mb-6">
          {PHASES.map((ph) => {
            const phItems = ph.sections.flatMap((s) => s.items.map((_, i) => `${ph.id}-${s.id}-${i}`));
            const phChecked = phItems.filter((k) => checked[k]).length;
            return (
              <button key={ph.id} onClick={() => setActivePhase(ph.id)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all"
                style={activePhase === ph.id
                  ? { background: ph.color, color: "#fff", borderColor: ph.color }
                  : { background: "var(--white)", color: "var(--charcoal)", borderColor: "var(--gray-border)" }}>
                <div>{ph.label}</div>
                <div className="text-xs mt-0.5 opacity-75">{phChecked}/{phItems.length}</div>
              </button>
            );
          })}
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {currentPhase.sections.map((section) => {
            const sectionChecked = section.items.filter((_, i) => checked[`${currentPhase.id}-${section.id}-${i}`]).length;
            const isOpen = expanded[section.id] !== false;

            return (
              <div key={section.id} className="rounded-xl border overflow-hidden" style={{ background: "var(--white)", borderColor: sectionChecked === section.items.length ? currentPhase.color : "var(--gray-border)" }}>
                <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-semibold" style={{ color: "var(--charcoal)", fontFamily: "var(--font-heading)" }}>{section.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: currentPhase.color }}>{sectionChecked}/{section.items.length}</span>
                    {sectionChecked === section.items.length && <span style={{ color: currentPhase.color }}>✓</span>}
                    <span style={{ color: "var(--charcoal)", opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-2">
                    {section.items.map((item, i) => {
                      const key = `${currentPhase.id}-${section.id}-${i}`;
                      return (
                        <label key={key} className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)}
                            className="mt-0.5 shrink-0 w-4 h-4" style={{ accentColor: currentPhase.color }} />
                          <span className="text-sm" style={{ color: "var(--charcoal)", opacity: checked[key] ? 0.5 : 1, textDecoration: checked[key] ? "line-through" : "none" }}>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => window.print()} className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ background: "var(--sage-dark)", color: "var(--white)" }}>
            Print Checklist
          </button>
        </div>
      </main>
      <BottomBanner />
    </div>
  );
}
