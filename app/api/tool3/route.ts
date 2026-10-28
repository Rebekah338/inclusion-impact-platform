import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { sector, size, argument, audience } = await req.json();

    const prompt = `You are an expert EDI (equity, diversity and inclusion) strategist and communication coach. A professional is about to make the case for an EDI initiative and needs to prepare for pushback.

Here is their situation:
- Sector: ${sector}
- Organisation size: ${size}
- The argument they are making: ${argument}
- Who they are presenting to: ${audience}

Your job is to anticipate the most likely objections this audience will raise and give the professional sharp, confident, evidence-grounded responses to each one.

Please respond in exactly this format:

SECTION1
[List 4 to 5 specific objections this audience is likely to raise, each as a short bold heading followed by a 1-2 sentence explanation of why this particular audience would raise it. Use this format for each:

Objection: [the objection in their words]
Why they raise it: [short explanation]]

SECTION2
[For each objection listed in SECTION1, provide a prepared response. Use this format:

Objection: [repeat the objection heading]
Your response: [2-3 sentences: one that acknowledges the concern, one that reframes it with evidence or logic, one that moves the conversation forward]]

SECTION3
[A short closing paragraph (3-4 sentences) giving strategic advice on how to open the conversation, set the right tone for this specific audience, and land the argument confidently. No bullet points.]

Important: write in plain professional English. No dashes anywhere; use colons and semicolons instead. Be specific to the sector and audience given.`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1800,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text;

    const s1Match = raw.match(/SECTION1\s*([\s\S]*?)SECTION2/);
    const s2Match = raw.match(/SECTION2\s*([\s\S]*?)SECTION3/);
    const s3Match = raw.match(/SECTION3\s*([\s\S]*?)$/);

    const section1 = s1Match ? s1Match[1].trim() : "";
    const section2 = s2Match ? s2Match[1].trim() : "";
    const section3 = s3Match ? s3Match[1].trim() : "";

    return NextResponse.json({ section1, section2, section3 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
