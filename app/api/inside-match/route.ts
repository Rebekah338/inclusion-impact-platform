import { NextRequest, NextResponse } from "next/server";
import { matchInside } from "@/lib/inside-match";

// See What's Inside for You: returns four matched starting points for what the
// visitor is working on. No personal details are asked for or stored here.

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const query = typeof body.query === "string" ? body.query.replace(/[\r\n\t]+/g, " ").trim().slice(0, 300) : "";
  if (query.length < 2) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  return NextResponse.json({ ok: true, cards: matchInside(query) });
}
