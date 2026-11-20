import { NextRequest, NextResponse } from "next/server";
import { saveToMailchimp } from "@/lib/mailchimp";
import { buildEarlyAccessEmail } from "@/lib/early-access-email";
import { backupSubmission } from "@/lib/backup";

// Impact Platform early access list (/early-access): saves the person in Mailchimp
// with tags so they can be emailed at launch, then sends a confirmation through Resend.

const clean = (v: unknown, max = 80) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

const SIZES = new Set(["Just me", "Around 5 people", "Around 10 people", "Around 25 people", "50 or more people", "Not sure yet"]);
const TIERS: Record<string, string> = {
  individual: "Individual",
  "practitioner-plus": "Practitioner Plus",
  "expert-track": "Expert Track",
  "small-teams": "Small Teams",
  "growing-teams": "Growing Teams",
  established: "Established Teams",
  enterprise: "Enterprise",
};

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
  const size = clean(body.size);
  const tier = TIERS[clean(body.tier)];
  const newsletter = body.newsletter === true;

  const tags = ["Early access: Impact Platform", "Source: Early access page", newsletter ? "Newsletter: yes" : "Newsletter: no"];
  if (SIZES.has(size)) tags.push(`Size: ${size}`);
  if (tier) tags.push(`Interested in: ${tier}`);

  const backedUp = await backupSubmission({
    form: "early-access",
    email,
    firstName,
    details: { size, tier: tier || null, newsletter },
  });
  const saved = await saveToMailchimp({ email, firstName, tags, optIn: newsletter });
  if ((saved === "not_configured" || saved === "failed") && !backedUp) {
    return NextResponse.json({ ok: false, error: saved }, { status: saved === "failed" ? 502 : 503 });
  }
  // "compliance" means they unsubscribed in the past: they are still on record, so carry on

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("Resend is not configured; early access confirmation not sent");
    return NextResponse.json({ ok: true });
  }
  const siteUrl = (process.env.SITE_URL || req.nextUrl.origin).replace(/\/$/, "");
  const message = buildEarlyAccessEmail({ firstName, siteUrl });
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
      console.error("Resend early access error", sent.status, detail?.name, detail?.message);
    }
  } catch (err) {
    console.error("Resend early access request failed", err);
  }
  return NextResponse.json({ ok: true });
}
