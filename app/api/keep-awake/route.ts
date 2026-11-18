import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Daily keep awake: a tiny read from Supabase so the free project is not paused for
// inactivity. Vercel runs it once a day (see vercel.json). When CRON_SECRET is set in
// Vercel, only Vercel's own scheduled request is accepted.

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const { error } = await supabaseAdmin().from("website_signups").select("id").limit(1);
    if (error) {
      console.error("Keep awake read failed", error.message);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keep awake failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
