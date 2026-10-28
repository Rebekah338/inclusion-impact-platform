import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { topic, sector, size, audience, resistance, outcome } = await req.json();

    const prompt = `You are an expert EDI strategist helping someone make the case for inclusion at work.

Here is their situation:
Topic: ${topic}
Sector: ${sector}
Organisation size: ${size}
Presenting to: ${audience}
Main resistance they face: ${resistance}
Outcome they want: ${outcome}

Write four clearly labelled sections. Use the exact labels below. Do not use dashes anywhere — use colons and semicolons instead. Keep the tone confident, direct, and grounded in evidence. Write for someone who is short on time and needs to walk into a real conversation.

SECTION1
Write a structured argument of 150 to 200 words for why this topic matters. Lead with the human impact and the moral case in one or two sentences. Then move to the business case (performance, retention, reputation, or legal risk depending on context). Then close with a line that speaks directly to what this audience cares about most, addressing the resistance they have named. Do not use bullet points. Write in paragraphs.

SECTION2
Write five to six talking points this person can draw on in the conversation. Each talking point should be one to two sentences. The first one to two should directly address the resistance they named (${resistance}). The rest should be positive reasons to act. No dashes anywhere. Use colons and semicolons to separate ideas within a sentence.

SECTION3
Write a short paragraph of two to three sentences giving practical advice on how to have this specific conversation. Tell them to book a specific slot rather than a corridor conversation. Tell them to name what they are asking for at the very start. Tell them to send a short agenda in advance. Tell them to follow up in writing after. Adapt the tone to the audience (${audience}) — for a board the tone is formal; for a colleague it is informal.

SECTION4
Write a sentence to acknowledge what they are about to do is not easy, then two or three sentences of encouragement that is specific to the resistance they named (${resistance}) and the outcome they want (${outcome}). End with a single practical reminder: the most important thing they can do is show up prepared and be specific about what they are asking for.

Important: No dashes anywhere. Use colons and semicolons only. Start each section with the exact label (SECTION1, SECTION2, SECTION3, SECTION4) on its own line.`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1600,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text;

    const s1Match = raw.match(/SECTION1\s*([\s\S]*?)SECTION2/);
    const s2Match = raw.match(/SECTION2\s*([\s\S]*?)SECTION3/);
    const s3Match = raw.match(/SECTION3\s*([\s\S]*?)SECTION4/);
    const s4Match = raw.match(/SECTION4\s*([\s\S]*?)$/);

    return NextResponse.json({
      section1: s1Match ? s1Match[1].trim() : "",
      section2: s2Match ? s2Match[1].trim() : "",
      section3: s3Match ? s3Match[1].trim() : "",
      section4: s4Match ? s4Match[1].trim() : "",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
