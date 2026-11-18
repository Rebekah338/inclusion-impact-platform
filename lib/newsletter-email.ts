// Builds the welcome email sent when someone subscribes to the newsletter
// (the homepage box or the /subscribe page). Wording approved by Rebekah on 15 November 2026.

// Paste the link to the latest Mailchimp edition here. While it is empty, the
// "Read the Latest Edition" button is left out of the email.
export const LATEST_EDITION_URL = "";

const PLANNER_FILE = "30-60-90-day-action-planner.pdf";
const PODCAST_URL = "https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildWelcomeEmail(opts: { firstName: string; siteUrl: string }) {
  const subject = "Welcome to The Inclusion Edit newsletter";
  const preview = "Your free 30/60/90 Day Action Planner is inside.";
  // Only letters, spaces, apostrophes and hyphens from the name they typed
  const name = opts.firstName.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'’-]/g, "").trim().slice(0, 40);
  const hello = `Hi ${name || "there"},`;
  const plannerUrl = `${opts.siteUrl}/free-resources/${PLANNER_FILE}`;
  // Images load from the live site, so they only appear once the site is live
  const plannerImg = `${opts.siteUrl}/email/planner-preview.jpg`;
  const photoImg = `${opts.siteUrl}/email/rebekah.jpg`;
  const latest = LATEST_EDITION_URL.trim();

  const welcome = "Thank you for subscribing. You're now part of a community of people doing the real work of inclusion, often with too little time and too few hands.";
  const monthly = "Once a month, you'll get one practical inclusion idea, unpacked properly, with tips you can use straight away.";
  const planner = "To get you started, here's the 30/60/90 Day Action Planner: a fillable plan to help you decide what to focus on first, what to build next and how to show the progress you've made.";
  const acrobat = "Open it in Adobe Acrobat Reader to type straight into it.";
  const question = "What's the one inclusion challenge on your desk right now? Hit reply and tell me. I read every reply, and it helps me make each edition more useful for you.";
  const footer = "You are receiving this because you subscribed to The Inclusion Edit newsletter at theinclusionedit.com. Every edition includes a link to unsubscribe.";

  const text = [
    hello,
    "",
    welcome,
    "",
    monthly,
    "",
    "YOUR FREE PLANNER",
    "",
    planner,
    "",
    `Download Your Planner: ${plannerUrl}`,
    acrobat,
    ...(latest ? ["", `Read the Latest Edition: ${latest}`] : []),
    "",
    "ONE QUESTION FOR YOU",
    "",
    question,
    "",
    "Rebekah Hayward",
    "Founder, The Inclusion Edit",
    `Listen to For the Love of EDI: ${PODCAST_URL}`,
    "",
    "The Inclusion Edit | Capacity. Capability. Change.",
    footer,
  ].join("\n");

  const p = "margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C;";
  const h = "margin:28px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.3;color:#2C4A31;";
  const btn = (label: string, href: string, solid: boolean) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 12px"><tr><td style="border-radius:8px;background:${solid ? "#4A6347" : "#ffffff"};border:2px solid #4A6347"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:${solid ? "#ffffff" : "#4A6347"};text-decoration:none">${esc(label)}</a></td></tr></table>`;

  const html = `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F4F7F4">
<div style="display:none;max-height:0;overflow:hidden">${esc(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7F4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1A3220;padding:26px 32px">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#F0E6C8">The Inclusion Edit</p>
<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A8D4B0">Capacity. Capability. Change.</p>
</td></tr>
<tr><td style="padding:30px 32px 8px">
<p style="${p}">${esc(hello)}</p>
<p style="${p}">${esc(welcome)}</p>
<p style="${p}">${esc(monthly)}</p>
<h2 style="${h}">Your free planner</h2>
<p style="${p}">${esc(planner)}</p>
<a href="${esc(plannerUrl)}" style="display:block;margin:0 0 16px;text-decoration:none"><img src="${esc(plannerImg)}" width="260" alt="The first page of the 30/60/90 Day Action Planner" style="display:block;width:260px;max-width:100%;height:auto;border:1px solid #DCE5DE;border-radius:8px"></a>
${btn("Download Your Planner", plannerUrl, true)}
<p style="${p}font-size:14px;font-style:italic;color:#4B5B4E">${esc(acrobat)}</p>
${latest ? btn("Read the Latest Edition", latest, false) : ""}
<h2 style="${h}">One question for you</h2>
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
