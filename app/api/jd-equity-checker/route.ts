import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { roleLevel, sector, focusAreas, jobSpec } = await req.json();

    const focusNote = focusAreas && focusAreas.length > 0
      ? `The user has indicated they want particular focus on: ${focusAreas.join(", ")}. Review everything thoroughly, but pay extra attention to these areas.`
      : "Review everything thoroughly across all areas.";

    const prompt = `You are an expert EDI (equity, diversity and inclusion) advisor specialising in fair and inclusive recruitment practices. You are reviewing a job specification for equity issues.

Context provided:
- Role level: ${roleLevel || "Not specified — infer from the job spec"}
- Sector: ${sector}
- Focus areas requested: ${focusNote}

Here is the job specification to review:

---
${jobSpec}
---

Please produce a comprehensive equity review. Format your response EXACTLY as follows, using these exact section headers. Do not use dashes anywhere in your response; use colons and semicolons only. Do not use bullet points starting with hyphens; use numbered lists or plain paragraphs.

SCORE:
[A score out of 10 for overall equity. Then one sentence summary of the overall picture. E.g. "7/10: This spec has a clear structure and inclusive tone in places, but several requirements and assumptions are likely putting off qualified candidates from underrepresented groups."]

POSITIVES:
[Two or three genuine things this spec does well. Be specific, not generic. Reference actual content from the spec.]

FLAGS:
[List each issue found. For each one, use this exact format:
CATEGORY: [one of: Gendered language | Unnecessary requirements | Inappropriate request | Ableist assumption | Cultural fit language | Salary transparency | Accessibility | Exclusionary benefits]
ORIGINAL: [exact quote from the spec]
ISSUE: [one to two sentences explaining the problem in plain language]
REWRITE: [suggested replacement, ready to copy]
SEVERITY: [Critical | Recommended | Enhancement]
---
Repeat for each flag. Aim for thoroughness; flag everything that warrants attention.]

MISSING:
[List things that are absent from the spec but should be present. For each one:
ITEM: [what is missing]
WHY: [one sentence on why it matters]
SUGGESTION: [suggested text to add]
---
Always check for: flexible working statement, reasonable adjustments statement, equal opportunities statement, salary range. Add any others relevant to the sector.]

CANDIDATE_LENS:
[One paragraph written from the perspective of a candidate from an underrepresented group reading this spec. Make it specific to what was actually found. Write in first person as the candidate. Example groups to consider: someone returning from a career break, a disabled candidate, a candidate from a working-class background, a candidate who is a carer. Choose the most relevant based on what you found in the spec. Do not use dashes; use colons and semicolons only.]

REQUIREMENTS_COUNT:
[Count the total number of requirements listed in the original spec (essential and desirable combined). Then state how many would remain in the revised version if all suggestions were applied, split into essential and desirable. Format exactly as:
ORIGINAL_COUNT: [number]
REVISED_ESSENTIAL: [number]
REVISED_DESIRABLE: [number]
INSIGHT: [one sentence on what this means for applicant diversity, referencing the research that women tend to apply when meeting 100% of requirements while men apply at around 60%]]

REWRITTEN_SPEC:
[The full rewritten job specification incorporating all suggested improvements. Preserve the original structure and headings. Make it complete and ready to post. Do not use dashes; use colons and semicolons only.]`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0].type === "text" ? message.content[0].text : "";

    const extract = (key: string, nextKey?: string) => {
      const pattern = nextKey
        ? new RegExp(`${key}:\\n([\\s\\S]*?)(?=${nextKey}:|$)`)
        : new RegExp(`${key}:\\n([\\s\\S]*?)$`);
      const match = content.match(pattern);
      return match ? match[1].trim() : "";
    };

    const parseFlags = (raw: string) => {
      const blocks = raw.split(/\n---\n/).filter(b => b.trim());
      return blocks.map(block => {
        const cat = block.match(/CATEGORY:\s*(.+)/)?.[1]?.trim() || "";
        const original = block.match(/ORIGINAL:\s*(.+)/)?.[1]?.trim() || "";
        const issue = block.match(/ISSUE:\s*([\s\S]*?)(?=REWRITE:|$)/)?.[1]?.trim() || "";
        const rewrite = block.match(/REWRITE:\s*([\s\S]*?)(?=SEVERITY:|$)/)?.[1]?.trim() || "";
        const severity = block.match(/SEVERITY:\s*(.+)/)?.[1]?.trim() || "";
        return { category: cat, original, issue, rewrite, severity };
      }).filter(f => f.original);
    };

    const parseMissing = (raw: string) => {
      const blocks = raw.split(/\n---\n/).filter(b => b.trim());
      return blocks.map(block => {
        const item = block.match(/ITEM:\s*(.+)/)?.[1]?.trim() || "";
        const why = block.match(/WHY:\s*([\s\S]*?)(?=SUGGESTION:|$)/)?.[1]?.trim() || "";
        const suggestion = block.match(/SUGGESTION:\s*([\s\S]*?)$/)?.[1]?.trim() || "";
        return { item, why, suggestion };
      }).filter(m => m.item);
    };

    const parseRequirements = (raw: string) => {
      return {
        originalCount: parseInt(raw.match(/ORIGINAL_COUNT:\s*(\d+)/)?.[1] || "0"),
        revisedEssential: parseInt(raw.match(/REVISED_ESSENTIAL:\s*(\d+)/)?.[1] || "0"),
        revisedDesirable: parseInt(raw.match(/REVISED_DESIRABLE:\s*(\d+)/)?.[1] || "0"),
        insight: raw.match(/INSIGHT:\s*([\s\S]*?)$/)?.[1]?.trim() || "",
      };
    };

    return NextResponse.json({
      score: extract("SCORE", "POSITIVES"),
      positives: extract("POSITIVES", "FLAGS"),
      flags: parseFlags(extract("FLAGS", "MISSING")),
      missing: parseMissing(extract("MISSING", "CANDIDATE_LENS")),
      candidateLens: extract("CANDIDATE_LENS", "REQUIREMENTS_COUNT"),
      requirements: parseRequirements(extract("REQUIREMENTS_COUNT", "REWRITTEN_SPEC")),
      rewrittenSpec: extract("REWRITTEN_SPEC"),
    });
  } catch (err) {
    console.error("JD Equity Checker API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
