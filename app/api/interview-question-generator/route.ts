import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function extract(text: string, marker: string): string {
  const regex = new RegExp(`${marker}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`);
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

interface Question {
  id: string;
  text: string;
  assessing: string;
  probes: string[];
}

interface Theme {
  name: string;
  questions: Question[];
}

interface WhatNotToAsk {
  questionType: string;
  why: string;
  alternative: string;
}

function parseThemes(raw: string): Theme[] {
  const themes: Theme[] = [];
  const themeBlocks = raw.split(/\n===\n/).filter(b => b.trim());

  themeBlocks.forEach((block, themeIdx) => {
    const lines = block.trim().split('\n');
    const nameLine = lines.find(l => l.startsWith('THEME:'));
    const themeName = nameLine ? nameLine.replace(/^THEME:\s*/, '').trim() : `Theme ${themeIdx + 1}`;
    const questionBlocks = block.split(/\n---\n/).slice(1);

    const questions: Question[] = [];
    questionBlocks.forEach((qBlock, qIdx) => {
      const qText = extract(qBlock, 'QUESTION');
      const assessing = extract(qBlock, 'ASSESSING');
      const probesRaw = extract(qBlock, 'PROBES');
      const probes = probesRaw
        .split('\n')
        .map(p => p.replace(/^[-*\d.]\s*/, '').trim())
        .filter(p => p.length > 0);

      if (qText) {
        questions.push({
          id: `t${themeIdx}_q${qIdx}`,
          text: qText,
          assessing,
          probes,
        });
      }
    });

    if (themeName && questions.length > 0) {
      themes.push({ name: themeName, questions });
    }
  });

  return themes;
}

function parseWhatNotToAsk(raw: string): WhatNotToAsk[] {
  const items: WhatNotToAsk[] = [];
  const blocks = raw.split(/\n---\n/).filter(b => b.trim());

  blocks.forEach(block => {
    const questionType = extract(block, 'QUESTION_TYPE');
    const why = extract(block, 'WHY');
    const alternative = extract(block, 'ALTERNATIVE');

    if (questionType) {
      items.push({ questionType, why, alternative });
    }
  });

  return items;
}

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, roleLevel, sector, interviewFormat, jobSpec, aboutOrg } = await request.json();

    if (!jobTitle || !roleLevel || !sector || !interviewFormat || !jobSpec) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orgContext = aboutOrg
      ? `\n\nAbout the organisation:\n${aboutOrg}`
      : '';

    const prompt = `You are an expert in inclusive recruitment and employment law. Generate a comprehensive, inclusive interview question bank for the following role.

Role: ${jobTitle}
Level: ${roleLevel}
Sector: ${sector}
Interview format: ${interviewFormat}
Job specification:
${jobSpec}${orgContext}

IMPORTANT FORMATTING RULES:
- Use NO dashes or hyphens in any text content. Use colons and semicolons instead.
- Hyphenated compound words (e.g. competency-based, follow-up) are fine.
- All questions must be legally safe and free from protected-characteristic assumptions under the Equality Act 2010.
- Questions must be calibrated to the role level.

Generate the output in this EXACT format:

THEMES:
===
THEME: Skills and Experience
---
QUESTION: [question text]
ASSESSING: [one-line description of what this assesses]
PROBES:
- [follow-up probe 1]
- [follow-up probe 2]
- [follow-up probe 3]
---
QUESTION: [next question]
ASSESSING: [assessment description]
PROBES:
- [probe 1]
- [probe 2]
===
THEME: Values and Culture
---
[questions in same format]
===
THEME: Behaviour and Situational Judgement
---
[questions in same format]
===
THEME: Collaboration and Communication
---
[questions in same format]
===
THEME: Problem-Solving and Decision-Making
---
[questions in same format]
===
THEME: Commitment to Equity and Inclusion
---
[at least 2 questions here]
END_THEMES

WHAT_NOT_TO_ASK:
---
QUESTION_TYPE: Questions about childcare or family plans
WHY: These questions risk sex discrimination and are irrelevant to the ability to do the job.
ALTERNATIVE: If availability at specific times is genuinely required, ask: "This role requires availability on [specific days/hours]. Is that something you can commit to?"
---
QUESTION_TYPE: Questions about nationality, origin or first language
WHY: Asking where someone is from or about their first language risks race discrimination under the Equality Act 2010.
ALTERNATIVE: If language skills are genuinely required, ask: "This role requires written and spoken English at [level]. Can you confirm you meet that requirement?"
---
QUESTION_TYPE: Questions about health or disability before a job offer is made
WHY: Under the Equality Act 2010, employers cannot ask health-related questions before making a job offer except in very limited circumstances.
ALTERNATIVE: After a job offer is made, you can ask health questions for the purposes of making reasonable adjustments.
---
QUESTION_TYPE: Questions about age or year of graduation
WHY: Asking how old someone is or when they graduated can lead to age discrimination claims under the Equality Act 2010.
ALTERNATIVE: Ask about the substance: "Can you describe your relevant experience in [area]?"
---
QUESTION_TYPE: Questions about religion or religious observance
WHY: Questions about religious holidays or practice risk religion or belief discrimination.
ALTERNATIVE: If specific availability is required, state the requirement directly and ask whether the candidate can meet it.
---
QUESTION_TYPE: Questions about relationship status or living arrangements
WHY: Questions about marital status or where someone lives are personal, irrelevant, and can signal discriminatory assumptions.
ALTERNATIVE: If the role has genuine location or travel requirements, state them explicitly.
---
QUESTION_TYPE: Loaded questions that assume unavailability
WHY: Asking about weekend or evening availability without establishing this is a genuine requirement can deter disabled candidates, those with caring responsibilities, or those with religious observances.
ALTERNATIVE: Only ask about availability requirements if they are genuine and essential. State the requirement clearly.
END_WHAT_NOT_TO_ASK

Generate a minimum of 20 questions across all themes. Include at least 2 questions in the equity and inclusion theme. Tailor all questions specifically to the ${jobTitle} role at ${roleLevel} level in the ${sector} sector using a ${interviewFormat} format.`;

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const text = content.text;

    // Extract sections
    const themesMatch = text.match(/THEMES:\s*([\s\S]*?)END_THEMES/);
    const whatNotMatch = text.match(/WHAT_NOT_TO_ASK:\s*([\s\S]*?)END_WHAT_NOT_TO_ASK/);

    const themesRaw = themesMatch ? themesMatch[1] : '';
    const whatNotRaw = whatNotMatch ? whatNotMatch[1] : '';

    const themes = parseThemes(themesRaw);
    const whatNotToAsk = parseWhatNotToAsk(whatNotRaw);

    return NextResponse.json({ themes, whatNotToAsk });
  } catch (err) {
    console.error('Interview question generator error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
