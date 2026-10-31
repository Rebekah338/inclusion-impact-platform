"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type PhaseKey = "30" | "60" | "90";
type ItemStatus = "not-yet" | "in-progress" | "done";

interface ActionItem {
  id: string;
  text: string;
  owner?: string;
}

const STATUS_CONFIG: Record<ItemStatus, { label: string; color: string; bg: string; border: string }> = {
  "not-yet": { label: "Not yet", color: "#6b7280", bg: "#f9fafb", border: "#d1d5db" },
  "in-progress": { label: "In progress", color: "#92400e", bg: "#fef3c7", border: "#f59e0b" },
  "done": { label: "Done ✓", color: "#065F46", bg: "#D1FAE5", border: "#059669" },
};

const PHASES: { key: PhaseKey; label: string; color: string; bg: string; border: string; icon: string; goal: string; focus: string }[] = [
  {
    key: "30",
    label: "Days 1 to 30",
    color: "#2563EB",
    bg: "#DBEAFE",
    border: "#2563EB",
    icon: "🔍",
    goal: "Understand",
    focus: "Gather data, listen, and establish your starting point. Do not launch initiatives before you understand the landscape.",
  },
  {
    key: "60",
    label: "Days 31 to 60",
    color: "#7C3AED",
    bg: "#EDE9FE",
    border: "#7C3AED",
    icon: "🎯",
    goal: "Plan",
    focus: "Use what you have learned to design your strategy. Secure commitments and create the infrastructure for delivery.",
  },
  {
    key: "90",
    label: "Days 61 to 90",
    color: "#065F46",
    bg: "#D1FAE5",
    border: "#065F46",
    icon: "🚀",
    goal: "Launch",
    focus: "Begin visible delivery on your earliest priorities. Communicate progress, address resistance, and build momentum.",
  },
];

const ACTION_ITEMS: Record<PhaseKey, ActionItem[]> = {
  "30": [
    { id: "30-1", text: "Meet with your senior EDI sponsor and agree on priorities for the first 90 days" },
    { id: "30-2", text: "Review all existing EDI policies, data, and previous reports" },
    { id: "30-3", text: "Identify what diversity data is already collected and where the gaps are" },
    { id: "30-4", text: "Map your key internal stakeholders: allies, sceptics, and neutral parties" },
    { id: "30-5", text: "Schedule one-to-one listening sessions with employees from underrepresented groups" },
    { id: "30-6", text: "Attend at least one team meeting at each level of the organisation" },
    { id: "30-7", text: "Identify any legally mandated reporting requirements and their deadlines" },
    { id: "30-8", text: "Review current learning and development offer for EDI content" },
    { id: "30-9", text: "Identify any existing EDI working groups, networks, or champions" },
    { id: "30-10", text: "Produce a brief summary of findings to share with your sponsor at day 30" },
  ],
  "60": [
    { id: "60-1", text: "Draft your EDI strategy with clear objectives, owners, and success metrics" },
    { id: "60-2", text: "Present your findings and proposed strategy to senior leadership" },
    { id: "60-3", text: "Secure formal leadership sign-off on at least three near-term commitments" },
    { id: "60-4", text: "Launch or formalise your diversity data collection if not already in place" },
    { id: "60-5", text: "Establish or refresh an EDI steering group with leadership representation" },
    { id: "60-6", text: "Map your EDI budget: what exists, what is needed, where gaps are" },
    { id: "60-7", text: "Identify your first two or three visible quick wins for phase three" },
    { id: "60-8", text: "Begin stakeholder engagement for initiatives that require buy-in before launch" },
    { id: "60-9", text: "Review and update job adverts, recruitment processes, and onboarding materials" },
    { id: "60-10", text: "Produce a communication plan for how you will announce and explain EDI activity" },
  ],
  "90": [
    { id: "90-1", text: "Launch your first visible EDI initiative or programme" },
    { id: "90-2", text: "Publish your EDI strategy or plan internally, with a message from leadership" },
    { id: "90-3", text: "Hold your first formal EDI steering group meeting" },
    { id: "90-4", text: "Share your baseline diversity data internally with context and next steps" },
    { id: "90-5", text: "Deliver your first all-staff EDI communication from senior leadership" },
    { id: "90-6", text: "Begin your first round of EDI learning or awareness activity" },
    { id: "90-7", text: "Address the most urgent policy gap identified in your review" },
    { id: "90-8", text: "Hold a review with your sponsor: what has worked, what has not, what to adjust" },
    { id: "90-9", text: "Begin planning your 12-month EDI calendar based on what you have learned" },
    { id: "90-10", text: "Celebrate and communicate at least one early win, however small" },
  ],
};

const CUSTOM_NOTES_PLACEHOLDER: Record<PhaseKey, string> = {
  "30": "Add your own priorities for the first 30 days...",
  "60": "Add your own priorities for days 31 to 60...",
  "90": "Add your own priorities for days 61 to 90...",
};

export default function EdiActionPlannerPage() {
  const [itemStatus, setItemStatus] = useState<Record<string, ItemStatus>>({});
  const [customNotes, setCustomNotes] = useState<Record<PhaseKey, string>>({ "30": "", "60": "", "90": "" });
  const [expanded, setExpanded] = useState<Record<PhaseKey, boolean>>({ "30": true, "60": false, "90": false });
  const [orgName, setOrgName] = useState("");
  const [plannerName, setPlannerName] = useState("");
  const [startDate, setStartDate] = useState("");

  const cycleStatus = (id: string) => {
    setItemStatus((prev) => {
      const current = prev[id] || "not-yet";
      const next: ItemStatus = current === "not-yet" ? "in-progress" : current === "in-progress" ? "done" : "not-yet";
      return { ...prev, [id]: next };
    });
  };

  const phaseProgress = (key: PhaseKey) => {
    const items = ACTION_ITEMS[key];
    const done = items.filter((i) => (itemStatus[i.id] || "not-yet") === "done").length;
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
  };

  const overallDone = Object.values(ACTION_ITEMS).flat().filter((i) => (itemStatus[i.id] || "not-yet") === "done").length;
  const overallTotal = Object.values(ACTION_ITEMS).flat().length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Planning Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          30/60/90 Day EDI Action Planner
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Structure your first 90 days in an EDI role or at the start of a new EDI programme. Each phase has a clear goal: understand your landscape, plan your strategy, and launch your first initiatives.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Planning", "Strategy", "EDI Leadership"].map((tag) => (
            <span key={tag} style={{ background: "var(--white)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Plan details */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "24px", marginBottom: 28 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px" }}>
            About This Plan
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Organisation</label>
              <input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Your organisation name"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-border)", borderRadius: 8, fontSize: 14, color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" }} />
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Plan owner</label>
              <input value={plannerName} onChange={(e) => setPlannerName(e.target.value)} placeholder="Your name or role"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-border)", borderRadius: 8, fontSize: 14, color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" }} />
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-border)", borderRadius: 8, fontSize: 14, color: "var(--charcoal)", background: "var(--sage-xlight)", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "20px", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--charcoal)" }}>Overall progress</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: "var(--sage-dark)" }}>{overallDone} of {overallTotal} complete</span>
          </div>
          <div style={{ height: 10, background: "var(--sage-xlight)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.round((overallDone / overallTotal) * 100)}%`, background: "var(--sage-dark)", borderRadius: 5, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            {PHASES.map((p) => {
              const prog = phaseProgress(p.key);
              return (
                <div key={p.key} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: p.color, fontWeight: 700, marginBottom: 4 }}>{p.icon} {p.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)" }}>{prog.done}/{prog.total}</div>
                  <div style={{ height: 4, background: "var(--sage-xlight)", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${prog.pct}%`, background: p.color, borderRadius: 2, transition: "width 0.4s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PHASES.map((phase) => {
            const isOpen = expanded[phase.key];
            const prog = phaseProgress(phase.key);
            return (
              <div key={phase.key} style={{ background: "var(--white)", border: `1px solid ${phase.border}`, borderLeft: `4px solid ${phase.border}`, borderRadius: 12, overflow: "hidden", boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
                <button onClick={() => setExpanded((p) => ({ ...p, [phase.key]: !p[phase.key] }))}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: phase.color, color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {phase.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: phase.color }}>{phase.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)" }}>{phase.goal}</span>
                    </div>
                    {!isOpen && (
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{prog.done} of {prog.total} actions complete</div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: phase.color, background: phase.bg, padding: "3px 10px", borderRadius: 10, border: `1px solid ${phase.border}` }}>
                      {prog.pct}%
                    </span>
                    <span style={{ color: "var(--sage-dark)", fontSize: 11, fontWeight: 700 }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)" }}>
                    {/* Phase goal */}
                    <div style={{ padding: "16px 20px", background: phase.bg, borderBottom: "1px solid var(--gray-border)" }}>
                      <p style={{ fontSize: 14, color: phase.color, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                        🎯 Phase goal: {phase.focus}
                      </p>
                    </div>

                    {/* Action items */}
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                        {ACTION_ITEMS[phase.key].map((item, idx) => {
                          const status: ItemStatus = itemStatus[item.id] || "not-yet";
                          const cfg = STATUS_CONFIG[status];
                          return (
                            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 8 }}>
                              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: phase.color, color: "var(--white)", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                                {idx + 1}
                              </span>
                              <span style={{ flex: 1, fontSize: 14, color: "var(--charcoal)", lineHeight: 1.6 }}>{item.text}</span>
                              <button onClick={() => cycleStatus(item.id)}
                                style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${cfg.border}`, color: cfg.color, background: "var(--white)", whiteSpace: "nowrap" }}>
                                {cfg.label}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Custom notes */}
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Your additional priorities
                        </label>
                        <textarea value={customNotes[phase.key]} onChange={(e) => setCustomNotes((p) => ({ ...p, [phase.key]: e.target.value }))}
                          placeholder={CUSTOM_NOTES_PLACEHOLDER[phase.key]} rows={3}
                          style={{ width: "100%", padding: "12px", border: "1px solid var(--gray-border)", borderRadius: 8, fontSize: 14, color: "var(--charcoal)", background: "var(--sage-xlight)", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status legend */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 12, padding: "16px 20px", marginTop: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>How to use: click any action to cycle its status</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {(["not-yet", "in-progress", "done"] as ItemStatus[]).map((s) => {
              const cfg = STATUS_CONFIG[s];
              return (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: cfg.color, fontWeight: 700 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: cfg.border, display: "inline-block" }} />
                  {cfg.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* About section */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this tool
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            Why structure your first 90 days?
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            The first 90 days of an EDI role or programme are among the highest-leverage moments available to any practitioner. Get it right and you build the credibility, relationships, and data you need to do meaningful work for years. Rush it and you risk launching initiatives before you understand the landscape, alienating potential allies, or setting expectations you cannot meet.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The 30/60/90 structure is a discipline as much as a plan. It forces you to separate listening from planning and planning from launching; three things that most EDI practitioners are tempted to do simultaneously from day one.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/dashboard/apply/inclusion-maturity-framework" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Self-Assessment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusion Maturity Framework</span>
            </Link>
            <Link href="/dashboard/apply/edi-strategy-guide" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Getting Started with EDI Strategy</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
