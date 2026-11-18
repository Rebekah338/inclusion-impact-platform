import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Anonymous counts from the website's interactive tools: which options people
// choose, so Rebekah can see what her audience needs most. No names, emails,
// IP addresses or cookies are stored; only the tool, the step and the choices.

const TOOLS = new Set(["starting-point-finder", "see-whats-inside", "programme-finder"]);
const EVENTS = new Set(["result", "tailored", "sharpened"]);
const KEYS = new Set(["need", "typed", "sector", "stage", "query", "topic", "driver", "organisation", "success", "recommended"]);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const tool = typeof body.tool === "string" ? body.tool : "";
  const event = typeof body.event === "string" ? body.event : "";
  if (!TOOLS.has(tool) || !EVENTS.has(event)) return NextResponse.json({ ok: false }, { status: 400 });

  const choices: Record<string, string | boolean> = {};
  if (body.choices && typeof body.choices === "object") {
    for (const [k, v] of Object.entries(body.choices as Record<string, unknown>)) {
      if (!KEYS.has(k)) continue;
      if (typeof v === "boolean") choices[k] = v;
      else if (typeof v === "string" && v.trim()) choices[k] = v.replace(/[\r\n\t]+/g, " ").trim().slice(0, 120);
    }
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  try {
    const { error } = await supabaseAdmin().from("tool_events").insert({ tool, event, choices });
    if (error) console.error("tool_events insert error", error.message);
  } catch (err) {
    console.error("tool_events insert failed", err);
  }
  return NextResponse.json({ ok: true });
}
