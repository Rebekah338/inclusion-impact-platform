import { NextRequest, NextResponse } from "next/server";
import { backupSubmission } from "@/lib/backup";

// Contact page form: emails the enquiry to info@theinclusionedit.com through Resend
// (reply goes straight to the person) and keeps a backup copy in Supabase.

const clean = (v: unknown, max = 120) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";
const cleanMessage = (v: unknown) =>
  typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, 5000) : "";
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const INTERESTS = new Set([
  "Inclusion Consultancy",
  "Inclusion Training",
  "Bespoke Inclusion Resources",
  "Impact Platform membership",
  "Speaking or events",
  "Something else",
]);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Hidden field that people never see; bots tend to fill it in
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  const firstName = clean(body.firstName, 60);
  const lastName = clean(body.lastName, 60);
  const org = clean(body.org);
  const interestRaw = clean(body.interest);
  const interest = INTERESTS.has(interestRaw) ? interestRaw : "";
  const message = cleanMessage(body.message);
  // What they told one of the website's interactive tools, carried over by the "Book a call" link
  const context = clean(body.context, 300);
  if (!message) {
    return NextResponse.json({ ok: false, error: "no_message" }, { status: 400 });
  }

  const backedUp = await backupSubmission({
    form: "contact",
    email,
    firstName,
    lastName,
    details: { organisation: org, interest, message, ...(context ? { from_tool: context } : {}) },
  });

  let emailed = false;
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const name = `${firstName} ${lastName}`.trim() || email;
    const subject = `Website enquiry: ${interest || "General"} from ${name}${org ? `, ${org}` : ""}`;
    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Organisation", org || "Not given"],
      ["Interested in", interest || "Not given"],
      ...(context ? ([["From the website", context]] as [string, string][]) : []),
    ];
    const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", message, "", "Reply to this email to answer them directly."].join("\n");
    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1C1C1C">
<p style="margin:0 0 12px;font-weight:bold;color:#2C4A31">New enquiry from the website contact form</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 16px">${rows
      .map(([k, v]) => `<tr><td style="padding:2px 16px 2px 0;color:#4B5B4E">${esc(k)}</td><td style="padding:2px 0">${esc(v)}</td></tr>`)
      .join("")}</table>
<p style="margin:0 0 6px;color:#4B5B4E">Message:</p>
<p style="margin:0 0 16px;white-space:pre-wrap">${esc(message)}</p>
<p style="margin:0;font-size:13px;color:#4B5B4E">Reply to this email to answer them directly.</p></div>`;
    try {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "The Inclusion Edit <info@hello.theinclusionedit.com>",
          to: ["info@theinclusionedit.com"],
          reply_to: email,
          subject,
          html,
          text,
        }),
      });
      emailed = sent.ok;
      if (!sent.ok) {
        const detail = await sent.json().catch(() => ({}));
        console.error("Resend contact error", sent.status, detail?.name, detail?.message);
      }
    } catch (err) {
      console.error("Resend contact request failed", err);
    }
  } else {
    console.error("Resend is not configured; enquiry not emailed");
  }

  if (!emailed && !backedUp) {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
