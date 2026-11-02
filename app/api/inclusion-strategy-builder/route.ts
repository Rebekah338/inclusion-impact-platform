import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orgName,
      sector,
      orgSize,
      ediLead,
      currentState,
      pressurePoints,
      pressurePointsOther,
      leadershipCommitment,
      timeline,
      stopDoing,
    } = body;

    const pressureList = [
      ...pressurePoints,
      ...(pressurePointsOther ? [`Other: ${pressurePointsOther}`] : []),
    ].join(', ');

    const timelineLabels: Record<string, string> = {
      scratch: 'Starting from scratch with no existing EDI strategy',
      refresh: 'Refreshing or updating an existing strategy',
      deadline: 'Preparing for a specific deadline (board review, tender, or accreditation)',
    };

    const ediLeadLabels: Record<string, string> = {
      hr: 'HR team',
      leadership: 'Senior leadership',
      inclusion_lead: 'Dedicated inclusion lead or EDI manager',
      manager: 'A manager or champion network',
      none: 'No one currently owns it',
    };

    const prompt = `You are an expert EDI (equity, diversity and inclusion) strategist with deep knowledge of UK and international best practice. You are generating a professional, tailored 12-month EDI strategy framework for a real organisation.

ORGANISATION PROFILE:
- Name: ${orgName || 'Not provided'}
- Sector: ${sector}
- Size: ${orgSize}
- EDI is currently led by: ${ediLeadLabels[ediLead] || ediLead}
- Timeline context: ${timelineLabels[timeline] || timeline}

WHAT IS ALREADY IN PLACE:
${currentState || 'Not provided'}

BIGGEST PRESSURE POINTS (up to 3 selected):
${pressureList}

WHAT LEADERSHIP HAS COMMITTED TO:
${leadershipCommitment || 'Not provided'}

WHAT THEY WANT TO STOP DOING:
${stopDoing || 'Not provided'}

Generate a 12-month EDI strategy framework. Be specific to their sector, size, and stated context. Do not be generic. Do not use dashes anywhere in your output; use colons and semicolons only.

Structure your response with these exact section markers:

FOCUS_AREAS
Write 3 prioritised focus areas, each with: the area name, a 2-3 sentence rationale tied directly to their stated pressure points and context, and why it matters for an organisation of their size and sector.
END_FOCUS_AREAS

OBJECTIVES_METRICS
For each focus area, give 2-3 measurable objectives with suggested evidence sources or metrics. Be specific. Name the kind of data they should be tracking.
END_OBJECTIVES_METRICS

QUICK_WINS
List 4-6 actions they can take in the first 90 days. These should be practical, low-cost, and achievable without external support. Frame each one in one sentence.
END_QUICK_WINS

LONG_TERM_SHIFTS
List 3-4 longer-term structural changes that will sustain progress beyond the first year. These require more resource, time, or leadership will. Be honest about that.
END_LONG_TERM_SHIFTS

BOARD_SUMMARY
Write a single paragraph (4-6 sentences) that could be dropped directly into a board paper or leadership presentation. It should frame the strategy in business terms: risk, reputation, performance, and legal compliance. Professional, confident tone.
END_BOARD_SUMMARY

STOP_DOING
Name one thing organisations in their sector commonly do that looks like action but does not move the needle. Be direct and specific. Explain briefly why it is ineffective and what to do instead.
END_STOP_DOING`;

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text : '';

    function extract(tag: string): string {
      const re = new RegExp(`${tag}\\n([\\s\\S]*?)\\nEND_${tag}`);
      const m = raw.match(re);
      return m ? m[1].trim() : '';
    }

    return NextResponse.json({
      orgName: orgName || '',
      sector,
      focusAreas: extract('FOCUS_AREAS'),
      objectivesMetrics: extract('OBJECTIVES_METRICS'),
      quickWins: extract('QUICK_WINS'),
      longTermShifts: extract('LONG_TERM_SHIFTS'),
      boardSummary: extract('BOARD_SUMMARY'),
      stopDoing: extract('STOP_DOING'),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
