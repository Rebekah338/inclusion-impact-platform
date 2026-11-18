import { NextRequest, NextResponse } from "next/server";
import { saveToMailchimp } from "@/lib/mailchimp";
import { buildWelcomeEmail } from "@/lib/newsletter-email";
import { backupSubmission } from "@/lib/backup";

// Newsletter sign up (the /subscribe form and the homepage box): adds the person to Mailchimp as subscribed,
// tagged so they appear in the "Newsletter list" segment, then sends the welcome
// email with the free 30/60/90 Day Action Planner through Resend.

const clean = (v: unknown, max = 80) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

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

  const sector = clean(body.sector);
  const role = clean(body.role);
  const heard = clean(body.source);
  const job = clean(body.job, 120);

  const tags = ["Newsletter: yes", clean(body.origin) === "homepage" ? "Source: Homepage" : "Source: Newsletter page"];
  if (sector) tags.push(`Sector: ${sector}`);
  if (role) tags.push(`Role: ${role}`);
  if (heard) tags.push(`Heard via: ${heard}`);

  const firstName = clean(body.first, 60);
  const lastName = clean(body.last, 60);
  const backedUp = await backupSubmission({
    form: "newsletter",
    email,
    firstName,
    lastName,
    details: { from: clean(body.origin) === "homepage" ? "Homepage" : "Newsletter page", sector, role, heard, job },
  });
  const result = await saveToMailchimp({
    email,
    firstName,
    lastName,
    tags,
    note: job ? `Newsletter sign up: job title "${job}"` : undefined,
    optIn: true,
  });

  if (result === "ok" || ((result === "failed" || result === "not_configured") && backedUp)) {
    await sendWelcome(email, firstName, (process.env.SITE_URL || req.nextUrl.origin).replace(/\/$/, ""));
    return NextResponse.json({ ok: true });
  }
  if (result === "compliance") return NextResponse.json({ ok: false, error: "compliance" }, { status: 409 });
  if (result === "not_configured") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
}

// The welcome email is a bonus: if it fails, they are still subscribed
async function sendWelcome(email: string, firstName: string, siteUrl: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("Resend is not configured; welcome email not sent");
    return;
  }
  const message = buildWelcomeEmail({ firstName, siteUrl });
  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "The Inclusion Edit <info@hello.theinclusionedit.com>",
        to: [email],
        reply_to: "info@theinclusionedit.com",
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });
    if (!sent.ok) {
      const detail = await sent.json().catch(() => ({}));
      console.error("Resend welcome error", sent.status, detail?.name, detail?.message);
    }
  } catch (err) {
    console.error("Resend welcome request failed", err);
  }
}
