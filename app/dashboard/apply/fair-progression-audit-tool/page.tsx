"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Tab = "audit" | "frameworks";
type Rating = "not_in_place" | "partially" | "fully" | null;

type CheckItem = { id: string; text: string; prompt: string };
type Section = { key: string; heading: string; icon: string; items: CheckItem[] };

const SECTIONS: Section[] = [
  {
    key: "pathways", heading: "Progression pathways and transparency", icon: "🗺️",
    items: [
      { id: "pp1", text: "Have clear progression pathways that are documented and accessible to all employees.", prompt: "Where are these pathways documented, and how do employees access them?" },
      { id: "pp2", text: "Ensure that criteria for promotion is consistent across all teams and roles.", prompt: "Who checks that criteria are consistent, and how often is this reviewed?" },
      { id: "pp3", text: "Ensure all employees understand the criteria and what is required to progress.", prompt: "How do you know employees understand the criteria? What evidence do you have?" },
      { id: "pp4", text: "Ensure all progression information is shared proactively with employees, not only on request.", prompt: "What mechanisms exist to proactively share this information?" },
    ],
  },
  {
    key: "data", heading: "Promotion data and outcomes", icon: "📊",
    items: [
      { id: "pd1", text: "Ensure promotion data is reviewed regularly to identify gaps or discrimination.", prompt: "How often is this data reviewed, and who is responsible for the review?" },
      { id: "pd2", text: "Regularly disaggregate the data by protected characteristics, including gender, race, ethnicity, disability, and age.", prompt: "Which characteristics do you currently disaggregate by, and are there any gaps?" },
      { id: "pd3", text: "Ensure any disparities in progression outcomes are investigated and not ignored; seek to rectify practices to ensure discrimination does not continue.", prompt: "Can you name a recent example where a disparity was identified and acted on?" },
      { id: "pd4", text: "Be transparent about all findings and share with all senior leaders and stakeholders.", prompt: "Who currently receives this data, and is it shared beyond HR?" },
    ],
  },
  {
    key: "performance", heading: "Performance management and bias", icon: "⚖️",
    items: [
      { id: "pm1", text: "Performance criteria must be clear, measurable, and role-relevant.", prompt: "How are criteria set, and who verifies they are free from subjectivity?" },
      { id: "pm2", text: "Train managers and senior leaders to recognise their own privileges and identify biases.", prompt: "When did managers last receive this training, and what did it cover?" },
      { id: "pm3", text: "Review language used in performance criteria for bias or exclusion; remove gendered and elitist language.", prompt: "Who has reviewed your language, and when was this last done?" },
      { id: "pm4", text: "Ensure consistent progression criteria is used rather than perceived potential defined by likability or personal preference.", prompt: "What safeguards prevent personal preference from influencing outcomes?" },
      { id: "pm5", text: "Ensure subjective traits are not involved in decision making, such as style, appearance, personality type, accent, or culture fit.", prompt: "Is 'culture fit' used in your process? If so, how is it defined and bounded?" },
    ],
  },
  {
    key: "development", heading: "Access to development opportunities", icon: "🌱",
    items: [
      { id: "dev1", text: "Training and development opportunities must be advertised and shared openly with all employees.", prompt: "How are opportunities shared, and is there a central place employees can find them?" },
      { id: "dev2", text: "All employees should be encouraged to apply for progression opportunities; managers should mitigate their own biases in this process.", prompt: "How do you know managers are encouraging all employees equally?" },
      { id: "dev3", text: "Offer mentoring and sponsorship opportunities to all and ensure these are accessible to marginalised groups.", prompt: "Who currently benefits from mentoring and sponsorship, and is this tracked?" },
      { id: "dev4", text: "Learn employees' personal circumstances and become aware of barriers such as time, cost, caring responsibilities, and location; seek to support these with appropriate interventions.", prompt: "What adjustments or support do you currently offer to remove these barriers?" },
      { id: "dev5", text: "Ensure remote and hybrid workers have equal access to development and are not excluded from progression opportunities.", prompt: "Is access to development tracked by work pattern or location?" },
    ],
  },
  {
    key: "allocation", heading: "Opportunity allocation", icon: "🎯",
    items: [
      { id: "oa1", text: "Ensure high-profile and stretch projects are allocated fairly and equitably to give all employees the chance to develop.", prompt: "Who decides who gets stretch opportunities, and is this process audited?" },
      { id: "oa2", text: "Decision-making about progression opportunities must be transparent; all decisions must be documented and supported by justification.", prompt: "How are decisions documented, and are employees told the reasons for outcomes?" },
    ],
  },
  {
    key: "leadership", heading: "Leadership and decision-making", icon: "👥",
    items: [
      { id: "ld1", text: "Promotional decisions should be made by more than one person and deliberated over using fair criteria.", prompt: "Who is involved in promotion decisions, and what criteria guides the panel?" },
      { id: "ld2", text: "Decision-making panels should be diverse and trained in inclusive decision-making and mitigating biases.", prompt: "How diverse are your current panels, and when did they last receive training?" },
      { id: "ld3", text: "Ensure there are open channels of communication where employees can ask for feedback on promotion outcomes.", prompt: "How easy is it for employees to request feedback, and is it consistently given?" },
    ],
  },
  {
    key: "intersectionality", heading: "Intersectionality check", icon: "🔗",
    items: [
      { id: "int1", text: "Critically examine power and privilege dynamics to inform fair, inclusive decision-making.", prompt: "In what ways do power dynamics show up in your progression processes?" },
      { id: "int2", text: "Assess how intersecting identities can lead to compounded disadvantage; for example, race and gender, disability and caregiving responsibilities.", prompt: "Does your data analysis look at intersecting characteristics, not just single ones?" },
      { id: "int3", text: "Actively work to dismantle barriers to ensure certain groups are not consistently stalled at the same level.", prompt: "Which groups are currently stalled, and what targeted action is underway?" },
    ],
  },
  {
    key: "voice", heading: "Employee voice and lived experience", icon: "💬",
    items: [
      { id: "ev1", text: "Create safe opportunities for employees to share their views on progression fairness twice a year.", prompt: "When did employees last have a structured opportunity to share views on progression?" },
      { id: "ev2", text: "Ensure chosen feedback mechanisms are varied and include anonymous and accessible channels.", prompt: "Can employees share concerns anonymously, and are all accessibility needs met?" },
      { id: "ev3", text: "Use exit interview data to capture progression-related insights; ensure all feedback leads to visible action.", prompt: "What changes have been made in the last year as a result of employee feedback?" },
    ],
  },
  {
    key: "accountability", heading: "Accountability and review", icon: "✅",
    items: [
      { id: "acc1", text: "Ensure inclusion goals are built into performance objectives and embedded into appraisal, promotion, and reward processes.", prompt: "Who currently has inclusion goals in their performance objectives?" },
      { id: "acc2", text: "Leaders should clearly own responsibility for fair progression, and leadership actions should be tracked and reviewed.", prompt: "Which leaders are held accountable for progression equity, and how?" },
      { id: "acc3", text: "Regularly review this audit to better your organisation's progression practices.", prompt: "When will you revisit this audit, and who will be part of that review?" },
    ],
  },
];

type FrameworkGroup = { heading: string; items: { name: string; desc: string }[] };
const FRAMEWORK_GROUPS: FrameworkGroup[] = [
  {
    heading: "Legal frameworks and statutory guidance",
    items: [
      { name: "Equality Act 2010", desc: "This foundational legislation protects individuals from discrimination based on protected characteristics, including sex and gender reassignment. It mandates equal treatment in employment and access to services." },
      { name: "Public Sector Equality Duty (PSED)", desc: "Public bodies must have due regard to eliminating discrimination, advancing equality, and fostering good relations between different people." },
      { name: "Worker Protection (Amendment of Equality Act 2010) Act 2023", desc: "Effective from October 2023, this act imposes a proactive duty on employers to prevent sexual harassment in the workplace." },
      { name: "Positive Action in the Workplace", desc: "Practical UK Government guidance on how employers can use positive action to remove barriers and improve equality in recruitment and promotion." },
    ],
  },
  {
    heading: "Industry standards and accreditation frameworks",
    items: [
      { name: "Athena SWAN Charter", desc: "A framework used across the UK to support and transform gender equality within higher education and research institutions." },
      { name: "British Academy's Gender Equality in Research and Innovation Framework", desc: "This framework defines minimum standards and provides guidance on enhancing gender equality within research and innovation sectors." },
      { name: "National Equality Standard (NES)", desc: "Developed in collaboration with the UK government, NES provides a comprehensive framework for organisations to assess and benchmark their EDI performance." },
      { name: "Global Equality Standard", desc: "The GES takes into account the nuances of each culture across the globe including external socio-political environment, legislative and regulatory requirements, and external/industry levels of DE&I maturation and best practice." },
    ],
  },
  {
    heading: "Educational frameworks and research",
    items: [
      { name: "UCL Institute of Education: Accountability for Gender Equality in Education", desc: "UCL's framework supports national and international commitments to gender equality in education, providing tools for measuring and promoting equity." },
      { name: "CIPD: Discrimination at Work Factsheet", desc: "Chartered Institute of Personnel and Development resource which explains how the Equality Act protects employees from discrimination across hiring, training, and promotion." },
      { name: "UK Research and Innovation (UKRI) EDI Guidance", desc: "Offers best practices for integrating EDI principles into research design and organisational culture." },
    ],
  },
];

const RATING_CONFIG: Record<NonNullable<Rating>, { short: string; label: string; color: string; bg: string; border: string; score: number }> = {
  not_in_place: { short: "Not in place",   label: "Not in place",   color: "#b91c1c", bg: "#fef2f2", border: "#fca5a5", score: 0 },
  partially:    { short: "Partial",         label: "Partially embedded", color: "#92400e", bg: "#fffbeb", border: "#fcd34d", score: 1 },
  fully:        { short: "Fully embedded",  label: "Fully embedded", color: "#166534", bg: "#f0fdf4", border: "#86efac", score: 2 },
};

// ── Radar chart (inline SVG) ──────────────────────────────────────────────────
function RadarChart({ sections, ratings, size = 320 }: { sections: Section[]; ratings: Record<string, Rating>; size?: number }) {
  const cx = size / 2; const cy = size / 2; const r = size * 0.375;
  const n = sections.length;
  const levels = [0.25, 0.5, 0.75, 1];

  const sectionScore = (s: Section) => {
    const rated = s.items.filter((i) => ratings[i.id]);
    if (rated.length === 0) return 0;
    const total = rated.reduce((sum, i) => sum + (ratings[i.id] ? RATING_CONFIG[ratings[i.id] as NonNullable<Rating>].score : 0), 0);
    return total / (s.items.length * 2);
  };

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, frac: number) => ({
    x: cx + Math.cos(angle(i)) * r * frac,
    y: cy + Math.sin(angle(i)) * r * frac,
  });

  const scores = sections.map(sectionScore);
  const filled = scores.some((s) => s > 0);

  const dataPath = scores
    .map((s, i) => {
      const p = pt(i, Math.max(s, 0.04));
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ") + " Z";

  const shortLabels: Record<string, string> = {
    pathways: "Pathways", data: "Data", performance: "Performance",
    development: "Development", allocation: "Allocation", leadership: "Leadership",
    intersectionality: "Intersectionality", voice: "Voice", accountability: "Accountability",
  };

  const labelR = r + (size * 0.068);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: size, display: "block", margin: "0 auto" }}>
      {levels.map((lv) => (
        <polygon key={lv}
          points={sections.map((_, i) => { const p = pt(i, lv); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ")}
          fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {sections.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x.toFixed(1)} y2={p.y.toFixed(1)} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {filled && (
        <path d={dataPath} fill="rgba(45,90,60,0.18)" stroke="#2D5A3C" strokeWidth="2" strokeLinejoin="round" />
      )}
      {scores.map((s, i) => {
        if (s === 0) return null;
        const p = pt(i, Math.max(s, 0.04));
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2D5A3C" />;
      })}
      {sections.map((sec, i) => {
        const p = { x: cx + Math.cos(angle(i)) * labelR, y: cy + Math.sin(angle(i)) * labelR };
        const anchor = Math.cos(angle(i)) > 0.1 ? "start" : Math.cos(angle(i)) < -0.1 ? "end" : "middle";
        return (
          <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)} textAnchor={anchor} dominantBaseline="middle"
            style={{ fontSize: `${size * 0.028}px`, fontFamily: "sans-serif", fill: "#4b5563", fontWeight: 600 }}>
            {sec.icon} {shortLabels[sec.key]}
          </text>
        );
      })}
      {!filled && (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: `${size * 0.031}px`, fontFamily: "sans-serif", fill: "#9ca3af" }}>
          Rate sections to build your profile
        </text>
      )}
    </svg>
  );
}

// ── Print report generator ────────────────────────────────────────────────────
function buildPrintHTML(
  sections: Section[],
  ratings: Record<string, Rating>,
  notes: Record<string, string>,
  orgName: string,
): string {
  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
  const totalRated = sections.reduce((s, sec) => s + sec.items.filter((i) => ratings[i.id]).length, 0);
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const sectionScore = (sec: Section) => {
    const rated = sec.items.filter((i) => ratings[i.id]);
    if (rated.length === 0) return 0;
    return rated.reduce((sum, i) => sum + (ratings[i.id] ? RATING_CONFIG[ratings[i.id] as NonNullable<Rating>].score : 0), 0) / (sec.items.length * 2);
  };

  // Build inline SVG for the radar (larger for print)
  const size = 440; const cx = size / 2; const cy = size / 2; const r = size * 0.33;
  const n = sections.length;
  const levels = [0.25, 0.5, 0.75, 1];
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, frac: number) => ({
    x: cx + Math.cos(angle(i)) * r * frac,
    y: cy + Math.sin(angle(i)) * r * frac,
  });
  const scores = sections.map(sectionScore);
  const filled = scores.some((s) => s > 0);
  const dataPath = scores.map((s, i) => {
    const p = pt(i, Math.max(s, 0.04));
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ") + " Z";
  const shortLabels: Record<string, string> = {
    pathways: "Pathways", data: "Data", performance: "Performance",
    development: "Development", allocation: "Allocation", leadership: "Leadership",
    intersectionality: "Intersectionality", voice: "Voice", accountability: "Accountability",
  };
  const labelR = r + size * 0.09;

  const radarSvg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    ${levels.map((lv) => `<polygon points="${sections.map((_, i) => { const p = pt(i, lv); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ")}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`).join("")}
    ${sections.map((_, i) => { const p = pt(i, 1); return `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/>`; }).join("")}
    ${filled ? `<path d="${dataPath}" fill="rgba(45,90,60,0.18)" stroke="#2D5A3C" stroke-width="2.5" stroke-linejoin="round"/>` : ""}
    ${scores.map((s, i) => { if (s === 0) return ""; const p = pt(i, Math.max(s, 0.04)); return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5" fill="#2D5A3C"/>`; }).join("")}
    ${sections.map((sec, i) => {
      const p = { x: cx + Math.cos(angle(i)) * labelR, y: cy + Math.sin(angle(i)) * labelR };
      const anchor = Math.cos(angle(i)) > 0.1 ? "start" : Math.cos(angle(i)) < -0.1 ? "end" : "middle";
      return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" style="font-size:12px;font-family:sans-serif;fill:#374151;font-weight:600">${sec.icon} ${shortLabels[sec.key]}</text>`;
    }).join("")}
  </svg>`;

  const sectionRows = sections.map((sec) => {
    const sc = sectionScore(sec);
    const ratedCount = sec.items.filter((i) => ratings[i.id]).length;
    const pct = Math.round(sc * 100);
    let ratingLabel = "Not started";
    let ratingColor = "#6b7280";
    let ratingBg = "#f9fafb";
    let ratingBorder = "#e5e7eb";
    if (ratedCount > 0) {
      if (sc >= 0.75) { ratingLabel = "Strong"; ratingColor = "#166534"; ratingBg = "#f0fdf4"; ratingBorder = "#86efac"; }
      else if (sc >= 0.4) { ratingLabel = "Developing"; ratingColor = "#92400e"; ratingBg = "#fffbeb"; ratingBorder = "#fcd34d"; }
      else { ratingLabel = "Needs attention"; ratingColor = "#b91c1c"; ratingBg = "#fef2f2"; ratingBorder = "#fca5a5"; }
    }

    const itemRows = sec.items.map((item) => {
      const r = ratings[item.id];
      const cfg = r ? RATING_CONFIG[r] : null;
      const note = notes[item.id];
      return `
        <tr style="border-bottom:1px solid #f3f4f6">
          <td style="padding:8px 10px;font-size:12px;line-height:1.55;color:#374151;vertical-align:top">${item.text}</td>
          <td style="padding:8px 10px;vertical-align:top;white-space:nowrap">
            ${cfg
              ? `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;color:${cfg.color};background:${cfg.bg};border:1px solid ${cfg.border}">${cfg.label}</span>`
              : `<span style="color:#9ca3af;font-size:11px">Not rated</span>`}
          </td>
          ${note ? `<td style="padding:8px 10px;font-size:11px;color:#6b7280;line-height:1.5;font-style:italic;vertical-align:top">${note}</td>` : `<td></td>`}
        </tr>`;
    }).join("");

    return `
      <div style="margin-bottom:24px;page-break-inside:avoid">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <span style="font-size:18px">${sec.icon}</span>
          <h3 style="margin:0;font-size:13px;font-weight:700;color:#1f2937;flex:1">${sec.heading}</h3>
          <span style="padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;color:${ratingColor};background:${ratingBg};border:1px solid ${ratingBorder}">${ratingLabel} — ${pct}%</span>
        </div>
        <div style="background:#f9fafb;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#f3f4f6">
                <th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;font-weight:700;width:55%">Practice</th>
                <th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;font-weight:700;width:20%">Rating</th>
                <th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;font-weight:700;width:25%">Notes</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </div>
      </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fair Progression Audit — ${orgName || "Maturity Report"}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #1f2937; background: #fff; padding: 40px; font-size: 13px; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    .cover { padding-bottom: 32px; border-bottom: 3px solid #2D5A3C; margin-bottom: 32px; }
    .cover h1 { font-size: 22px; font-weight: 800; color: #2D5A3C; margin-bottom: 4px; }
    .cover p { font-size: 13px; color: #6b7280; }
    .meta { display: flex; gap: 32px; margin-top: 16px; }
    .meta-item { font-size: 12px; }
    .meta-item strong { display: block; color: #1f2937; font-size: 13px; }
    .meta-item span { color: #6b7280; }
    .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; align-items: start; }
    .legend { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
    .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
    h2 { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 16px; }
    .print-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: #2D5A3C; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; margin-bottom: 24px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <button class="no-print print-btn" onclick="window.print()">🖨️ Print or save as PDF</button>

  <div class="cover">
    <h1>Fair Progression Audit</h1>
    <p>An equity-focused maturity profile — produced by The Inclusion Edit</p>
    <div class="meta">
      <div class="meta-item"><span>Organisation</span><strong>${orgName || "Not specified"}</strong></div>
      <div class="meta-item"><span>Date completed</span><strong>${date}</strong></div>
      <div class="meta-item"><span>Items rated</span><strong>${totalRated} of ${totalItems}</strong></div>
    </div>
  </div>

  <div class="summary-grid">
    <div>
      <h2>Maturity profile</h2>
      ${radarSvg}
    </div>
    <div>
      <h2>Section scores</h2>
      ${sections.map((sec) => {
        const sc = sectionScore(sec);
        const ratedCount = sec.items.filter((i) => ratings[i.id]).length;
        const pct = Math.round(sc * 100);
        let barColor = "#e5e7eb";
        if (ratedCount > 0) {
          if (sc >= 0.75) barColor = "#16a34a";
          else if (sc >= 0.4) barColor = "#d97706";
          else barColor = "#dc2626";
        }
        return `
          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px">
              <span style="font-size:11px;font-weight:600;color:#374151">${sec.icon} ${sec.heading}</span>
              <span style="font-size:11px;font-weight:700;color:${barColor}">${ratedCount > 0 ? pct + "%" : "—"}</span>
            </div>
            <div style="height:5px;background:#f3f4f6;border-radius:999px;overflow:hidden">
              <div style="height:100%;width:${ratedCount > 0 ? pct : 0}%;background:${barColor};border-radius:999px"></div>
            </div>
          </div>`;
      }).join("")}
      <div class="legend">
        <div class="legend-item"><span style="width:12px;height:12px;border-radius:3px;background:#f0fdf4;border:1.5px solid #86efac;flex-shrink:0"></span><span style="color:#166534">Fully embedded (75 – 100%)</span></div>
        <div class="legend-item"><span style="width:12px;height:12px;border-radius:3px;background:#fffbeb;border:1.5px solid #fcd34d;flex-shrink:0"></span><span style="color:#92400e">Developing (40 – 74%)</span></div>
        <div class="legend-item"><span style="width:12px;height:12px;border-radius:3px;background:#fef2f2;border:1.5px solid #fca5a5;flex-shrink:0"></span><span style="color:#b91c1c">Needs attention (0 – 39%)</span></div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>
  <h2 style="margin-bottom:20px">Detailed findings</h2>
  ${sectionRows}

  <div class="footer">
    Fair Progression Audit Tool — The Inclusion Edit · theinclusionedit.com · Generated ${date}
  </div>
</body>
</html>`;
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function FairProgressionAuditToolPage() {
  const [tab, setTab] = useState<Tab>("audit");
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [showOrgInput, setShowOrgInput] = useState(false);

  const setRating = (id: string, rating: Rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
    if (rating) setExpanded((prev) => ({ ...prev, [id]: true }));
  };
  const toggleExpanded = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (key: string) => setOpenSection((prev) => (prev === key ? null : key));

  const sectionScore = (s: Section) => {
    const rated = s.items.filter((i) => ratings[i.id]);
    if (rated.length === 0) return 0;
    return rated.reduce((sum, i) => sum + (ratings[i.id] ? RATING_CONFIG[ratings[i.id] as NonNullable<Rating>].score : 0), 0) / (s.items.length * 2);
  };

  const totalRated = SECTIONS.reduce((sum, s) => sum + s.items.filter((i) => ratings[i.id]).length, 0);
  const totalItems = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

  const handlePrint = () => {
    if (!orgName) { setShowOrgInput(true); return; }
    const html = buildPrintHTML(SECTIONS, ratings, notes, orgName);
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const ratingBtn = (id: string, rv: NonNullable<Rating>) => {
    const cfg = RATING_CONFIG[rv];
    const active = ratings[id] === rv;
    return (
      <button key={rv} onClick={() => setRating(id, active ? null : rv)}
        style={{
          flex: 1, padding: "0.4rem 0.35rem", borderRadius: "8px", cursor: "pointer",
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem",
          lineHeight: 1.3, textAlign: "center" as const,
          border: active ? `2px solid ${cfg.border}` : "1.5px solid var(--gray-border)",
          background: active ? cfg.bg : "var(--white)",
          color: active ? cfg.color : "#6b7280",
          transition: "all 0.15s ease",
          boxShadow: active ? `0 0 0 2px ${cfg.border}` : "none",
        }}>
        {cfg.short}
      </button>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>← Apply</Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Fair Progression Audit Tool</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🔍</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>🛠️ Tool</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Fair Progression Audit: An Equity-Focused Assessment Tool
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "680px", margin: "0 0 1.25rem" }}>
            Open each section and rate how well your organisation embeds each practice. Your profile builds in the chart as you go.
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("audit")} style={chipStyle(tab === "audit")}>📋 Self-assessment</button>
            <button onClick={() => setTab("frameworks")} style={chipStyle(tab === "frameworks")}>📚 Legal and research frameworks</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {tab === "audit" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: "2rem", alignItems: "start" }}>

              {/* Radar + export panel — sticky */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "sticky", top: "80px" }}>
                <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--charcoal)", margin: "0 0 0.5rem", textAlign: "center" }}>Maturity profile</p>
                  <RadarChart sections={SECTIONS} ratings={ratings} />
                  <div style={{ marginTop: "0.875rem", borderTop: "1px solid var(--gray-border)", paddingTop: "0.875rem" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--charcoal)", margin: "0 0 0.4rem" }}>Progress</p>
                    <div style={{ height: "6px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${totalItems > 0 ? (totalRated / totalItems) * 100 : 0}%`, background: "var(--sage-dark)", borderRadius: "999px", transition: "width 0.3s ease" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)", margin: "0.35rem 0 0", textAlign: "right" }}>{totalRated} of {totalItems} rated</p>
                  </div>
                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {(["not_in_place", "partially", "fully"] as NonNullable<Rating>[]).map((rv) => (
                      <div key={rv} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: RATING_CONFIG[rv].bg, border: `1.5px solid ${RATING_CONFIG[rv].border}`, flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: RATING_CONFIG[rv].color }}>{RATING_CONFIG[rv].short}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export panel */}
                <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "1.125rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>📄 Save or share your report</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", lineHeight: 1.55, margin: "0 0 0.75rem" }}>
                    Download a print-ready PDF of your maturity profile, section scores, and notes — ready for a board presentation or team review.
                  </p>
                  {showOrgInput && (
                    <div style={{ marginBottom: "0.625rem" }}>
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", color: "var(--charcoal)", display: "block", marginBottom: "0.3rem" }}>Organisation name</label>
                      <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. Acme Ltd"
                        autoFocus
                        style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "0.8rem", padding: "0.4rem 0.625rem", border: "1.5px solid var(--gray-border)", borderRadius: "7px", outline: "none", color: "var(--charcoal)" }}
                      />
                    </div>
                  )}
                  <button
                    onClick={handlePrint}
                    style={{
                      width: "100%", padding: "0.6rem 1rem", borderRadius: "8px", border: "none", cursor: "pointer",
                      background: totalRated === 0 ? "var(--gray-border)" : "var(--sage-dark)",
                      color: totalRated === 0 ? "var(--gray-soft)" : "var(--white)",
                      fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem",
                      transition: "all 0.15s",
                    }}
                    disabled={totalRated === 0}
                  >
                    {totalRated === 0 ? "Rate at least one item to export" : "🖨️ Open print report"}
                  </button>
                  {totalRated > 0 && !showOrgInput && !orgName && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--gray-soft)", margin: "0.4rem 0 0", textAlign: "center" }}>
                      You will be asked for your organisation name first.
                    </p>
                  )}
                </div>
              </div>

              {/* Sections list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {SECTIONS.map((section) => {
                  const isOpen = openSection === section.key;
                  const sc = sectionScore(section);
                  const ratedInSection = section.items.filter((i) => ratings[i.id]).length;
                  const allDone = ratedInSection === section.items.length;
                  const anyRated = ratedInSection > 0;

                  let sectionColor = "#6b7280";
                  let sectionBg = "var(--white)";
                  let sectionBorder = "var(--gray-border)";
                  if (allDone) {
                    if (sc >= 0.75) { sectionColor = RATING_CONFIG.fully.color; sectionBg = RATING_CONFIG.fully.bg; sectionBorder = RATING_CONFIG.fully.border; }
                    else if (sc >= 0.4) { sectionColor = RATING_CONFIG.partially.color; sectionBg = RATING_CONFIG.partially.bg; sectionBorder = RATING_CONFIG.partially.border; }
                    else { sectionColor = RATING_CONFIG.not_in_place.color; sectionBg = RATING_CONFIG.not_in_place.bg; sectionBorder = RATING_CONFIG.not_in_place.border; }
                  }

                  return (
                    <div key={section.key} style={{ background: allDone ? sectionBg : "var(--white)", border: `1.5px solid ${allDone ? sectionBorder : "var(--gray-border)"}`, borderRadius: "12px", overflow: "hidden", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                      <button onClick={() => toggleSection(section.key)}
                        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.65rem", textAlign: "left" as const }}>
                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{section.icon}</span>
                        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: allDone ? sectionColor : "var(--charcoal)", lineHeight: 1.4 }}>{section.heading}</span>
                        {allDone ? (
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", color: sectionColor, background: sectionBg, border: `1px solid ${sectionBorder}`, padding: "0.15rem 0.5rem", borderRadius: "999px", flexShrink: 0 }}>✓ Done</span>
                        ) : anyRated ? (
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", flexShrink: 0 }}>{ratedInSection}/{section.items.length}</span>
                        ) : (
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", flexShrink: 0 }}>{section.items.length} items</span>
                        )}
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>▼</span>
                      </button>

                      {isOpen && (
                        <div style={{ borderTop: "1px solid var(--gray-border)", padding: "0.875rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          {section.items.map((item) => {
                            const r = ratings[item.id] as NonNullable<Rating> | undefined;
                            const cfg = r ? RATING_CONFIG[r] : null;
                            const isExp = expanded[item.id];
                            return (
                              <div key={item.id} style={{ background: cfg ? cfg.bg : "#fafafa", border: `1.5px solid ${cfg ? cfg.border : "#f0f0f0"}`, borderRadius: "10px", overflow: "hidden", transition: "all 0.15s" }}>
                                <div style={{ padding: "0.875rem 0.875rem 0.75rem" }}>
                                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", lineHeight: 1.65, color: "var(--charcoal)", margin: "0 0 0.65rem" }}>{item.text}</p>
                                  <div style={{ display: "flex", gap: "0.35rem" }}>
                                    {(["not_in_place", "partially", "fully"] as NonNullable<Rating>[]).map((rv) => ratingBtn(item.id, rv))}
                                  </div>
                                </div>
                                {r && (
                                  <div style={{ borderTop: `1px solid ${cfg!.border}`, padding: "0.625rem 0.875rem" }}>
                                    <button onClick={() => toggleExpanded(item.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "0.35rem", width: "100%", marginBottom: isExp ? "0.5rem" : 0 }}>
                                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", color: cfg!.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>💭 Reflection prompt</span>
                                      <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: cfg!.color, transform: isExp ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                                    </button>
                                    {isExp && (
                                      <>
                                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.79rem", color: cfg!.color, lineHeight: 1.6, margin: "0 0 0.5rem", fontStyle: "italic" }}>{item.prompt}</p>
                                        <textarea
                                          value={notes[item.id] || ""}
                                          onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                          placeholder="Add your notes here..."
                                          rows={2}
                                          style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "0.79rem", lineHeight: 1.6, color: "var(--charcoal)", background: "rgba(255,255,255,0.75)", border: `1px solid ${cfg!.border}`, borderRadius: "7px", padding: "0.4rem 0.625rem", resize: "vertical" as const, outline: "none" }}
                                        />
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card" style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem", marginTop: 0 }}>About this tool</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
                This tool supports teams to identify gaps, bias, and hidden barriers within promotion, development, and opportunity allocation. Rate each practice honestly to build your organisation's maturity profile. It is not a substitute for legal advice: where your audit reveals potential unlawful discrimination, seek specialist HR or legal counsel before publishing findings externally. Your responses are not saved when you leave this page.
              </p>
            </div>
          </div>
        )}

        {tab === "frameworks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {FRAMEWORK_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.875rem" }}>{group.heading}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {group.items.map((item) => (
                    <div key={item.name} className="card" style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", margin: "0 0 0.375rem" }}>{item.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomBanner />
    </div>
  );
}
