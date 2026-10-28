import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { sector, size, barrier, resources, approver, caseStudyTitle, caseStudySummary } = await req.json();

    const prompt = `You are an expert EDI (equity, diversity and inclusion) implementation advisor. A professional has read a case study and wants to achieve similar results in their own organisation. Your job is to give them a practical, realistic replication roadmap tailored to their context.

Here is the case study they are looking at:
Title: ${caseStudyTitle}
Summary: ${caseStudySummary}

Here is what they told you about their organisation:
- Sector: ${sector}
- Organisation size: ${size}
- Their biggest barrier to implementing this: ${barrier}
- Resources they have available (budget, team, time): ${resources}
- Who needs to approve or sign off: ${approver}

Please produce three distinct sections of output. Format your response EXACTLY as follows, using these exact headings:

SECTION1:
[Write a step-by-step replication plan with 4 to 6 concrete numbered steps. Each step should be specific, actionable and realistic given their sector, size, resources and barrier. Steps should build on each other logically. Write directly to the reader as "you". Do not use dashes; use colons and semicolons only.]

SECTION2:
[Write 3 to 4 short points explaining what was specific to the original organisation in this case study that they will need to adapt. Be honest about what may not translate directly. Help them understand where they may need to modify the approach. Do not use dashes; use colons and semicolons only.]

SECTION3:
[Write a short pitch (3 to 5 sentences) the reader can use to present this plan to ${approver} and get sign-off. Write it in first person as if they are speaking. It should reference the case study as evidence, acknowledge the adaptation needed, and make a clear ask. Tailor the tone to the seniority and role of ${approver}. Do not use dashes; use colons and semicolons only.]`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1400,
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
    console.error("Tool 2 API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
