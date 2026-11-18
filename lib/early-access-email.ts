// Builds the confirmation email for the Impact Platform early access list.

const RESOURCE_FILE = "inclusion-maturity-framework.pdf";
const PODCAST_URL = "https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildEarlyAccessEmail(opts: { firstName: string; siteUrl: string }) {
  const subject = "You're on the Impact Platform early access list";
  const preview = "Your free Inclusion Maturity Framework is inside.";
  const name = opts.firstName.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'’-]/g, "").trim().slice(0, 40);
  const hello = `Hi ${name || "there"},`;
  const plannerUrl = `${opts.siteUrl}/free-resources/${RESOURCE_FILE}`;
  const plannerImg = `${opts.siteUrl}/email/maturity-preview.jpg`;
  const photoImg = `${opts.siteUrl}/email/rebekah.jpg`;

  const thanks = "Thank you for joining the early access list for the Impact Platform. We're opening in small groups of 10, in the order people join, and I'll email you as soon as it's your turn.";
  const what = "The Impact Platform is built for the person carrying inclusion: 40 lessons, 45 practical tools, 47 research reports and case studies, 10 Inclusion AI tools and office hours with an inclusion expert, so you're not doing it alone.";
  const planner = "While you wait, here's something you can use straight away: the Inclusion Maturity Framework. It shows where your organisation sits today, from Unaware to Leading, across six areas, and gives you prioritised next steps to take to your leaders. It can also help you decide whether a membership just for you or for your whole organisation would suit you best.";
  const acrobat = "Open it in Adobe Acrobat Reader to type straight into it.";
  const question = "What would make the Impact Platform most useful for you? Hit reply and tell me. Your answer helps shape what we build first.";
  const footer = "You are receiving this because you joined the Impact Platform early access list at theinclusionedit.com. We will only email you about the platform unless you also asked for the newsletter.";

  const text = [
    hello, "", thanks, "", what, "",
    "WHILE YOU WAIT", "", planner, "", `Download Your Framework: ${plannerUrl}`, acrobat, "",
    "ONE QUESTION FOR YOU", "", question, "",
    "Rebekah Hayward", "Founder, The Inclusion Edit", `Listen to For the Love of EDI: ${PODCAST_URL}`, "",
    "The Inclusion Edit | Capacity. Capability. Change.", footer,
  ].join("\n");

  const p = "margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C;";
  const h = "margin:28px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.3;color:#2C4A31;";

  const html = `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F4F7F4">
<div style="display:none;max-height:0;overflow:hidden">${esc(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7F4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1A3220;padding:26px 32px">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#F0E6C8">The Inclusion Edit</p>
<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A8D4B0">Impact Platform: early access</p>
</td></tr>
<tr><td style="padding:30px 32px 8px">
<p style="${p}">${esc(hello)}</p>
<p style="${p}">${esc(thanks)}</p>
<p style="${p}">${esc(what)}</p>
<h2 style="${h}">While you wait</h2>
<p style="${p}">${esc(planner)}</p>
<a href="${esc(plannerUrl)}" style="display:block;margin:0 0 16px;text-decoration:none"><img src="${esc(plannerImg)}" width="260" alt="The first page of the Inclusion Maturity Framework" style="display:block;width:260px;max-width:100%;height:auto;border:1px solid #DCE5DE;border-radius:8px"></a>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 12px"><tr><td style="border-radius:8px;background:#4A6347;border:2px solid #4A6347"><a href="${esc(plannerUrl)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">Download Your Framework</a></td></tr></table>
<p style="${p}font-size:14px;font-style:italic;color:#4B5B4E">${esc(acrobat)}</p>
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
