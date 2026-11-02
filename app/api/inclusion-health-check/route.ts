import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function extract(text: string, marker: string): string {
  const regex = new RegExp(`${marker}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`);
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

type TrafficLight = 'green' | 'amber' | 'red';

interface DimensionResult {
  name: string;
  status: TrafficLight;
  observation: string;
  whatGoodLooksLike: string;
}

interface PriorityArea {
  name: string;
  why: string;
}

interface StartThisWeek {
  action: string;
}

interface LeadershipQuestion {
  question: string;
}

interface RecommendedResource {
  title: string;
  description: string;
  link: string;
}

interface HealthCheckResult {
  orgName: string;
  headline: string;
  dimensions: DimensionResult[];
  priorityAreas: PriorityArea[];
  startThisWeek: StartThisWeek[];
  leadershipQuestions: LeadershipQuestion[];
  recommendedResources: RecommendedResource[];
}

function parseStatus(raw: string): TrafficLight {
  const s = raw.toLowerCase().trim();
  if (s === 'green') return 'green';
  if (s === 'red') return 'red';
  return 'amber';
}

function parseDimensions(raw: string): DimensionResult[] {
  const blocks = raw.split(/\n---\n/).filter(b => b.trim());
  return blocks.map(block => ({
    name: extract(block, 'NAME'),
    status: parseStatus(extract(block, 'STATUS')),
    observation: extract(block, 'OBSERVATION'),
    whatGoodLooksLike: extract(block, 'WHAT_GOOD_LOOKS_LIKE'),
  })).filter(d => d.name);
}

function parsePriorityAreas(raw: string): PriorityArea[] {
  const blocks = raw.split(/\n---\n/).filter(b => b.trim());
  return blocks.map(block => ({
    name: extract(block, 'NAME'),
    why: extract(block, 'WHY'),
  })).filter(p => p.name);
}

function parseListItems(raw: string, key: string): string[] {
  return raw
    .split('\n')
    .map(l => l.replace(/^[-*\d.]\s*/, '').replace(new RegExp(`^${key}:\\s*`), '').trim())
    .filter(l => l.length > 0);
}

function parseResources(raw: string): RecommendedResource[] {
  const blocks = raw.split(/\n---\n/).filter(b => b.trim());
  return blocks.map(block => ({
    title: extract(block, 'TITLE'),
    description: extract(block, 'DESCRIPTION'),
    link: extract(block, 'LINK'),
  })).filter(r => r.title);
}

export async function POST(request: NextRequest) {
  try {
    const {
      orgName,
      sector,
      orgSize,
      userRole,
      leadership,
      recruitment,
      culture,
      data,
      policy,
      learning,
    } = await request.json();

    if (!sector || !orgSize || !leadership || !recruitment || !culture || !data || !policy || !learning) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orgLabel = orgName ? `Organisation: ${orgName}` : 'Organisation: not provided';
    const roleLabel = userRole ? `Your role: ${userRole}` : '';

    const prompt = `You are a senior EDI consultant at The Inclusion Edit, an award-winning equity, diversity and inclusion consultancy. You have been given responses from an organisation completing an Inclusion Health Check. Your job is to produce a thorough, honest, and practical diagnostic report.

${orgLabel}
Sector: ${sector}
Organisation size: ${orgSize}
${roleLabel}

DIMENSION RESPONSES:

Leadership and Governance:
${leadership}

Recruitment and Hiring:
${recruitment}

Culture and Belonging:
${culture}

Data and Evidence:
${data}

Policy and Process:
${policy}

Learning and Development:
${learning}

IMPORTANT RULES:
- Use NO dashes or hyphens in any text content. Use colons and semicolons instead.
- Write in plain, direct, professional English. No jargon.
- Be honest and specific. Draw your observations directly from what they wrote.
- Do not be generic. Every observation should feel like it was written about this specific organisation.
- Pitch the language appropriately for the sector and size given.
- The tone should feel like a trusted consultant, not a chatbot.

Generate the output in this EXACT format:

HEADLINE:
[One to two sentences summarising the overall picture. Honest, specific, not generic.]

END_HEADLINE

DIMENSIONS:
---
NAME: Leadership and Governance
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote. Specific and honest.]
WHAT_GOOD_LOOKS_LIKE: [One sentence describing what high-performing organisations do in this area.]
---
NAME: Recruitment and Hiring
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote.]
WHAT_GOOD_LOOKS_LIKE: [One sentence.]
---
NAME: Culture and Belonging
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote.]
WHAT_GOOD_LOOKS_LIKE: [One sentence.]
---
NAME: Data and Evidence
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote.]
WHAT_GOOD_LOOKS_LIKE: [One sentence.]
---
NAME: Policy and Process
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote.]
WHAT_GOOD_LOOKS_LIKE: [One sentence.]
---
NAME: Learning and Development
STATUS: [green, amber, or red]
OBSERVATION: [Two to three sentences drawing directly from what they wrote.]
WHAT_GOOD_LOOKS_LIKE: [One sentence.]
END_DIMENSIONS

PRIORITY_AREAS:
---
NAME: [Dimension name]
WHY: [Two sentences explaining why this is the highest priority given their specific context.]
---
NAME: [Second dimension name]
WHY: [Two sentences.]
---
NAME: [Third dimension name]
WHY: [Two sentences.]
END_PRIORITY_AREAS

START_THIS_WEEK:
- [Concrete, specific action they can take this week with no budget and no sign-off. Not generic advice.]
- [Second action.]
- [Third action.]
END_START_THIS_WEEK

LEADERSHIP_QUESTIONS:
- [A question they could put on a leadership agenda or use to start an upward conversation.]
- [Second question.]
- [Third question.]
- [Fourth question.]
END_LEADERSHIP_QUESTIONS

RECOMMENDED_RESOURCES:
---
TITLE: Job Spec Equity Check
DESCRIPTION: [One sentence on why this is relevant to their specific gaps.]
LINK: /dashboard/inclusion-ai/jd-equity-checker
---
TITLE: Interview Question Generator
DESCRIPTION: [One sentence on why this is relevant to their specific gaps.]
LINK: /dashboard/inclusion-ai/interview-question-generator
---
TITLE: Inclusive Hiring Questions
DESCRIPTION: [One sentence on why this is relevant.]
LINK: /dashboard/apply/bias-free-interview-question-bank
---
TITLE: Inclusion Maturity Framework
DESCRIPTION: [One sentence on why this is relevant.]
LINK: /dashboard/apply/inclusion-maturity-framework
END_RECOMMENDED_RESOURCES

Only include resources that are genuinely relevant to the gaps identified. Remove any that are not relevant.`;

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    const text = content.text;

    const headlineMatch = text.match(/HEADLINE:\s*([\s\S]*?)END_HEADLINE/);
    const dimensionsMatch = text.match(/DIMENSIONS:\s*([\s\S]*?)END_DIMENSIONS/);
    const priorityMatch = text.match(/PRIORITY_AREAS:\s*([\s\S]*?)END_PRIORITY_AREAS/);
    const startMatch = text.match(/START_THIS_WEEK:\s*([\s\S]*?)END_START_THIS_WEEK/);
    const leadershipMatch = text.match(/LEADERSHIP_QUESTIONS:\s*([\s\S]*?)END_LEADERSHIP_QUESTIONS/);
    const resourcesMatch = text.match(/RECOMMENDED_RESOURCES:\s*([\s\S]*?)END_RECOMMENDED_RESOURCES/);

    const result: HealthCheckResult = {
      orgName: orgName || '',
      headline: headlineMatch ? headlineMatch[1].trim() : '',
      dimensions: dimensionsMatch ? parseDimensions(dimensionsMatch[1]) : [],
      priorityAreas: priorityMatch ? parsePriorityAreas(priorityMatch[1]) : [],
      startThisWeek: startMatch
        ? parseListItems(startMatch[1], 'ACTION').map(a => ({ action: a }))
        : [],
      leadershipQuestions: leadershipMatch
        ? parseListItems(leadershipMatch[1], 'QUESTION').map(q => ({ question: q }))
        : [],
      recommendedResources: resourcesMatch ? parseResources(resourcesMatch[1]) : [],
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('Inclusion health check error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
