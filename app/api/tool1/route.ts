import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { sector, size, progress, challenge, outcomes, audience, researchTitle, researchSummary } = await req.json();

    const prompt = `You are an expert EDI (equity, diversity and inclusion) advisor. A professional has asked you to help them make a piece of research relevant to their organisation.

Here is the research they are looking at:
Title: ${researchTitle}
Summary: ${researchSummary}

Here is what they told you about their organisation:
- Sector: ${sector}
- Organisation size: ${size}
- Where they currently are with this area of work: ${progress}
- Their biggest inclusion challenge right now: ${challenge}
- The outcomes they would like to see: ${outcomes}
- Who this needs to land with: ${audience}

Please produce three distinct sections of output. Format your response EXACTLY as follows, using these exact headings:

SECTION1:
[Write 2-3 paragraphs reframing what this research means specifically for this organisation. Write directly to the reader as "you" and "your organisation". Make it feel personal to their sector, size, and challenge. Do not use dashes; use colons and semicolons only.]

SECTION2:
[Write 3 concrete suggestions for what they could do next to explore this topic further in their organisation. These are options to consider, not a fixed plan. Think about things like auditing their own data, running a staff survey, commissioning internal research, or starting a working group. Be specific to their sector and size. Do not use dashes; use colons and semicolons only.]

SECTION3:
[Write a short script (2-4 sentences) the reader can use to explain why this research matters and why it deserves attention from ${audience}. Write it in first person as if they are speaking. It should open a conversation, not present a finished plan. Tailor the language and tone to the seniority and role of ${audience}. Do not use dashes; use colons and semicolons only.]`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0].type === "text" ? message.content[0].text : "";

    const section1Match = content.match(/SECTION1:\n([\s\S]*?)(?=SECTION2:|$)/);
    const section2Match = content.match(/SECTION2:\n([\s\S]*?)(?=SECTION3:|$)/);
    const section3Match = content.match(/SECTION3:\n([\s\S]*?)$/);

    return NextResponse.json({
      section1: section1Match ? section1Match[1].trim() : "",
      section2: section2Match ? section2Match[1].trim() : "",
      section3: section3Match ? section3Match[1].trim() : "",
    });
  } catch (err) {
    console.error("Tool 1 API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
