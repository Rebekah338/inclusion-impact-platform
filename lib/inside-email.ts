// Builds the email for the See What's Inside for You tool: the one item the
// person chose (a research summary, a case study or a free resource), plus the
// rest of their starting points, which wait on their dashboard when they join.

import type { InsideItem } from "@/lib/inside-index";

const PODCAST_URL = "https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM";

// Some hub copy still has spaced dashes; show them as commas (number ranges are left alone)
const undash = (t: string) => t.replace(/\s[\u2013\u2014]\s/g, ", ");

const esc = (s: string) =>
  undash(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const KIND_LABEL: Record<string, string> = {
  research: "Research",
  case: "Case study",
  resource: "Resource",
  lesson: "Lesson",
  video: "Video",
  ai: "Inclusion AI tool",
};

export function buildInsideEmail(opts: { firstName: string; chosen: InsideItem; others: InsideItem[]; siteUrl: string }) {
  const { chosen, others, siteUrl } = opts;
  const kind = KIND_LABEL[chosen.kind].toLowerCase();
  const subject = `Your ${kind}: ${chosen.title}`;
  const preview = "Plus the rest of your starting points, saved for when you join.";
  const name = opts.firstName.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'’-]/g, "").trim().slice(0, 40);
  const hello = `Hi ${name || "there"},`;
  const intro = `Here's the ${kind} you chose from the Impact Platform. It's yours to keep.`;
  const earlyUrl = `${siteUrl}/early-access`;
  const photoImg = `${siteUrl}/email/rebekah.jpg`;
  const waiting = "Your other starting points are saved and will be waiting on your dashboard when you become a member.";
  const question = "Did this help with what you're working on? Hit reply and tell me. I read every message.";
  const footer = "You are receiving this because you asked us to send you a starting point from the Impact Platform at theinclusionedit.com. We will only email you about it unless you also asked for the newsletter.";

  // The chosen item, as text and HTML
  const fileUrl = chosen.file ? `${siteUrl}/free-resources/${chosen.file}` : "";
  const button = chosen.kind === "resource"
    ? { label: "Download Your Resource", url: fileUrl }
    : chosen.url ? { label: chosen.kind === "research" ? "Read the Original Research" : "Read the Original Source", url: chosen.url } : null;
  const summary = chosen.kind === "resource" ? chosen.desc : chosen.about || chosen.desc;
  const pointsHeading = chosen.kind === "research" ? "Key findings" : chosen.kind === "case" ? "What happened and what to take from it" : "";
  const points = chosen.points || [];
  const sourceLine = chosen.kind === "case" && chosen.source ? `Source: ${chosen.source}` : chosen.kind === "research" ? `Source: ${chosen.meta}` : "";

  const text = [
    hello, "", intro, "",
    `${KIND_LABEL[chosen.kind].toUpperCase()}: ${chosen.title}`, chosen.kind === "resource" ? "" : chosen.meta, "",
    summary, "",
    ...(points.length ? [pointsHeading, ...points.map((p) => `* ${p}`), ""] : []),
    ...(sourceLine ? [sourceLine, ""] : []),
    ...(button ? [`${button.label}: ${button.url}`, ""] : []),
    "WAITING FOR YOU WHEN YOU JOIN", "", waiting,
    ...others.map((o) => `* ${KIND_LABEL[o.kind]}: ${o.title}`), "",
    `Get Early Access: ${earlyUrl}`, "",
    question, "",
    "Rebekah Hayward", "Founder, The Inclusion Edit", `Listen to For the Love of EDI: ${PODCAST_URL}`, "",
    "The Inclusion Edit | Capacity. Capability. Change.", footer,
  ].map(undash).join("\n");

  const p = "margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C;";
  const h = "margin:28px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.3;color:#2C4A31;";
  const btn = (label: string, url: string) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 16px"><tr><td style="border-radius:8px;background:#4A6347;border:2px solid #4A6347"><a href="${esc(url)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">${esc(label)}</a></td></tr></table>`;

  const pointsHtml = points.length
    ? `<p style="${p}margin-bottom:8px;font-weight:bold;color:#2C4A31">${esc(pointsHeading)}</p><ul style="margin:0 0 16px;padding-left:20px">${points
        .map((x) => `<li style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1C1C1C">${esc(x)}</li>`)
        .join("")}</ul>`
    : "";

  const othersHtml = others
    .map(
      (o) => `<tr><td style="padding:10px 14px;border-top:1px solid #DCE5DE;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1C1C1C">&#128274;&nbsp; <span style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#4A6347;font-weight:bold">${esc(KIND_LABEL[o.kind])}</span><br>${esc(o.title)}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F4F7F4">
<div style="display:none;max-height:0;overflow:hidden">${esc(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7F4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1A3220;padding:26px 32px">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#F0E6C8">The Inclusion Edit</p>
<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A8D4B0">Impact Platform: your starting point</p>
</td></tr>
<tr><td style="padding:30px 32px 8px">
<p style="${p}">${esc(hello)}</p>
<p style="${p}">${esc(intro)}</p>
<p style="margin:8px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#4A6347;font-weight:bold">${esc(KIND_LABEL[chosen.kind])}${chosen.kind === "resource" ? "" : ` &middot; ${esc(chosen.meta)}`}</p>
<h2 style="${h}margin-top:0">${esc(chosen.title)}</h2>
<p style="${p}">${esc(summary)}</p>
${pointsHtml}
${sourceLine ? `<p style="${p}font-size:14px;color:#4B5B4E">${esc(sourceLine)}</p>` : ""}
${button ? btn(button.label, button.url) : ""}
<h2 style="${h}">Waiting for you when you join</h2>
<p style="${p}">${esc(waiting)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid #DCE5DE;border-radius:8px;border-collapse:separate;background:#F4F7F4">${othersHtml}</table>
${btn("Get Early Access", earlyUrl)}
<p style="${p}">${esc(question)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 16px"><tr>
<td style="vertical-align:middle;padding-right:16px"><img src="${esc(photoImg)}" width="64" height="64" alt="Rebekah Hayward" style="display:block;width:64px;height:64px;border-radius:50%"></td>
<td style="vertical-align:middle"><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C">Rebekah Hayward<br>Founder, The Inclusion Edit<br><a href="${esc(PODCAST_URL)}" style="color:#4A6347;font-weight:bold;text-decoration:underline">Listen to For the Love of EDI</a></p></td>
</tr></table>
</td></tr>
<tr><td style="background:#E8F0E9;padding:18px 32px">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#4B5B4E">${esc(footer)}</p>
</td></tr>
</table></td></tr></table></body></html>`;

  return { subject, html, text };
}
