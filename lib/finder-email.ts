// Builds the "your five steps" email for the Starting Point Finder.
// Everything comes from lib/finder-content.ts, so nothing a visitor types is
// ever placed in the email except their sector and stage, which are checked
// against fixed lists first.

import { FINDER_EMAILS, FINDER_STEPS, SECTOR_PHRASE, STAGE_LABEL, type FinderRoute } from "./finder-content";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildFinderEmail(opts: { route: FinderRoute; who: string; sector: string; stage: string; siteUrl: string }) {
  const e = FINDER_EMAILS[opts.route];
  const whoText = opts.who === "Individual" ? "working on this as an individual" : "approaching this as an organisation or team";
  const sectorText = SECTOR_PHRASE[opts.sector] || "in your sector";
  const stageText = STAGE_LABEL[opts.stage] || "at an early stage";
  const context = `You told us you are ${whoText} ${sectorText}, and you are ${stageText}.`;

  // Split the steps text into its intro line, the five numbered steps and the closing line
  const lines = FINDER_STEPS[opts.route].split("\n").map((l) => l.trim()).filter(Boolean);
  const intro = lines[0].replace(/ Here are five steps[^.:]*[.:]$/, "").replace(/:$/, ".");
  const steps = lines.filter((l) => /^\d\.\s/.test(l)).map((l) => l.replace(/^\d\.\s/, ""));
  const closing = lines[lines.length - 1];

  const pdfUrl = `${opts.siteUrl}/free-resources/${e.file}`;
  const callUrl = `${opts.siteUrl}/contact-us`;
  const resourceTitle = e.resource.replace(/^the /, "");

  const text = [
    "Hello,",
    "",
    `Thank you for using the Starting Point Finder. Here are your five steps, as promised, plus a free copy of ${e.resource}.`,
    "",
    context,
    "",
    "YOUR FIVE STEPS",
    "",
    intro,
    "",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    closing,
    "",
    `YOUR FREE ${e.kind.toUpperCase()}`,
    "",
    e.blurb,
    "",
    `${e.button}: ${pdfUrl}`,
    "",
    "Download it, then open it in Adobe Acrobat Reader, Chrome or Edge to fill it in and save your progress.",
    "",
    e.supportHeading.toUpperCase(),
    "",
    e.support,
    "",
    `Book a Free Inclusion Call: ${callUrl}`,
    "",
    "Warm wishes,",
    "Rebekah Hayward",
    "Founder, The Inclusion Edit",
    "",
    "The Inclusion Edit | Capacity. Capability. Change.",
    "You are receiving this because you asked for your steps from the Starting Point Finder at theinclusionedit.com.",
  ].join("\n");

  const p = "margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C;";
  const h = "margin:28px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.3;color:#2C4A31;";
  const btn = (label: string, href: string, solid: boolean) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr><td style="border-radius:8px;background:${solid ? "#4A6347" : "#ffffff"};border:2px solid #4A6347"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:${solid ? "#ffffff" : "#4A6347"};text-decoration:none">${esc(label)}</a></td></tr></table>`;

  const html = `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(e.subject)}</title></head>
<body style="margin:0;padding:0;background:#F4F7F4">
<div style="display:none;max-height:0;overflow:hidden">${esc(e.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7F4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1A3220;padding:26px 32px">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#F0E6C8">The Inclusion Edit</p>
<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A8D4B0">Capacity. Capability. Change.</p>
</td></tr>
<tr><td style="padding:30px 32px 8px">
<p style="${p}">Hello,</p>
<p style="${p}">Thank you for using the Starting Point Finder. Here are your five steps, as promised, plus a free copy of <strong>${esc(e.resource)}</strong>.</p>
<p style="${p}color:#4B5B4E">${esc(context)}</p>
<h2 style="${h}">Your five steps</h2>
<p style="${p}">${esc(intro)}</p>
<ol style="margin:0 0 16px;padding-left:22px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C">
${steps.map((s) => `<li style="margin:0 0 10px">${esc(s)}</li>`).join("\n")}
</ol>
<p style="${p}">${esc(closing)}</p>
<h2 style="${h}">Your free ${esc(e.kind)}</h2>
<p style="${p}">${esc(e.blurb)}</p>
${btn(e.button, pdfUrl, true)}
<p style="${p}font-size:14px;color:#4B5B4E">Download it, then open it in Adobe Acrobat Reader, Chrome or Edge to fill it in and save your progress.</p>
<h2 style="${h}">${esc(e.supportHeading)}</h2>
<p style="${p}">${esc(e.support)}</p>
${btn("Book a Free Inclusion Call", callUrl, false)}
<p style="${p}">Warm wishes,<br>Rebekah Hayward<br>Founder, The Inclusion Edit</p>
</td></tr>
<tr><td style="background:#E8F0E9;padding:18px 32px">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#4B5B4E">You are receiving this because you asked for your steps from the Starting Point Finder at theinclusionedit.com. Questions? Reply to this email and it will reach a real person.</p>
</td></tr>
</table></td></tr></table></body></html>`;

  return { subject: e.subject, html, text, resourceTitle };
}
