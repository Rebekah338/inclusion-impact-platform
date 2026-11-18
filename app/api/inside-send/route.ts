import { NextRequest, NextResponse } from "next/server";
import { saveToMailchimp } from "@/lib/mailchimp";
import { backupSubmission } from "@/lib/backup";
import { findInside } from "@/lib/inside-match";
import { buildInsideEmail } from "@/lib/inside-email";

// See What's Inside for You: emails the one research summary, case study or free
// resource the visitor chose, saves all four of their starting points in the
// Supabase backup (so their dashboard can show them when they join), and adds
// them to Mailchimp with tags. Lessons, videos and Inclusion AI tools are never sent.

const SENDABLE = new Set(["research", "case", "resource"]);

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
  const firstName = clean(body.firstName, 60);
  const newsletter = body.newsletter === true;
  const query = clean(body.query, 300);

  const chosen = body.chosen as { kind?: unknown; id?: unknown } | undefined;
  const chosenItem = chosen && SENDABLE.has(clean(chosen.kind)) ? findInside(clean(chosen.kind), clean(chosen.id, 120)) : undefined;
  if (!chosenItem) return NextResponse.json({ ok: false, error: "bad_item" }, { status: 400 });

  const matches = Array.isArray(body.matches) ? body.matches.slice(0, 4) : [];
  const others = matches
    .map((m) => findInside(clean((m as { kind?: unknown }).kind), clean((m as { id?: unknown }).id, 120)))
    .filter((m): m is NonNullable<typeof m> => !!m && !(m.kind === chosenItem.kind && m.id === chosenItem.id));

  const tags = ["Source: See What's Inside", `Chose: ${chosenItem.kind === "case" ? "Case study" : chosenItem.kind === "research" ? "Research" : "Resource"}`, newsletter ? "Newsletter: yes" : "Newsletter: no"];

  const backedUp = await backupSubmission({
    form: "see-whats-inside",
    email,
    firstName,
    details: {
      query,
      chosen: { kind: chosenItem.kind, id: chosenItem.id, title: chosenItem.title },
      saved_for_dashboard: others.map((o) => ({ kind: o.kind, id: o.id, title: o.title })),
      newsletter,
    },
  });
  const saved = await saveToMailchimp({
    email,
    firstName,
    tags,
    note: query ? `See What's Inside: working on "${query}"; chose "${chosenItem.title}"` : undefined,
    optIn: newsletter,
  });
  if ((saved === "not_configured" || saved === "failed") && !backedUp) {
    return NextResponse.json({ ok: false, error: saved }, { status: saved === "failed" ? 502 : 503 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("Resend is not configured; See What's Inside email not sent");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  const siteUrl = (process.env.SITE_URL || req.nextUrl.origin).replace(/\/$/, "");
  const message = buildInsideEmail({ firstName, chosen: chosenItem, others, siteUrl });
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
      console.error("Resend See What's Inside error", sent.status, detail?.name, detail?.message);
      return NextResponse.json({ ok: false, error: sent.status === 429 ? "busy" : "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend See What's Inside request failed", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
