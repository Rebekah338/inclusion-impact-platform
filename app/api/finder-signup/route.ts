import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { FINDER_EMAILS, type FinderRoute } from "@/lib/finder-content";
import { buildFinderEmail } from "@/lib/finder-email";

// Starting Point Finder: emails the visitor their five steps and free resource
// through Resend, and adds them to Mailchimp with tags so they can be followed up.
// Needs RESEND_API_KEY (and optionally RESEND_FROM, SITE_URL) plus
// MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX and MAILCHIMP_AUDIENCE_ID.

const ROUTE_TAGS: Record<FinderRoute, string> = {
  policy: "Finder: Policy",
  training: "Finder: Training",
  "business-case": "Finder: Business case",
  strategy: "Finder: Strategy",
  data: "Finder: Data",
  general: "Finder: General",
};

const clean = (v: unknown, max = 80) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

async function addToMailchimp(email: string, tags: string[], need: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const audience = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !server || !audience) {
    console.error("Mailchimp is not configured; contact not saved");
    return;
  }
  const base = `https://${server}.api.mailchimp.com/3.0/lists/${audience}/members/${createHash("md5").update(email).digest("hex")}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    "Content-Type": "application/json",
  };
  try {
    const member = await fetch(base, {
      method: "PUT",
      headers,
      body: JSON.stringify({ email_address: email, status_if_new: "subscribed" }),
    });
    if (!member.ok) {
      const detail = await member.json().catch(() => ({}));
      console.error("Mailchimp member error", member.status, detail?.title, detail?.detail);
      return;
    }
    const tagged = await fetch(`${base}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: tags.map((name) => ({ name, status: "active" })) }),
    });
    if (!tagged.ok) console.error("Mailchimp tag error", tagged.status);
    if (need) {
      // Their own words about what they need help with, saved as a note on the contact
      await fetch(`${base}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ note: `Starting Point Finder: needs help with "${need}"` }),
      });
    }
  } catch (err) {
    console.error("Mailchimp request failed", err);
  }
}

export async function POST(req: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

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

  const routeKey = clean(body.route);
  const route: FinderRoute = routeKey in FINDER_EMAILS ? (routeKey as FinderRoute) : "general";
  const sector = clean(body.sector);
  const stage = clean(body.stage);
  const who = clean(body.who);
  const newsletter = body.newsletter === true;

  // 1. Send their steps and free resource
  const siteUrl = (process.env.SITE_URL || req.nextUrl.origin).replace(/\/$/, "");
  const message = buildFinderEmail({ route, who, sector, stage, siteUrl });
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
      console.error("Resend error", sent.status, detail?.name, detail?.message);
      return NextResponse.json({ ok: false, error: sent.status === 429 ? "busy" : "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  // 2. Save them in Mailchimp so they can be followed up (a failure here does not undo the email)
  const tags = [ROUTE_TAGS[route], "Source: Starting Point Finder", newsletter ? "Newsletter: yes" : "Newsletter: no"];
  if (sector) tags.push(`Sector: ${sector}`);
  if (stage) tags.push(`Stage: ${stage}`);
  if (who) tags.push(`For: ${who}`);
  await addToMailchimp(email, tags, clean(body.need, 500));

  return NextResponse.json({ ok: true });
}
