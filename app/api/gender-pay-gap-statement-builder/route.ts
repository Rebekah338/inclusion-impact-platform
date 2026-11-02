import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface QuartileRow { upper: string; upperMiddle: string; lowerMiddle: string; lower: string; }

export async function POST(req: NextRequest) {
  try {
    const {
      orgName, sector, reportingYear, tone,
      meanPayGap, medianPayGap, meanBonusGap, medianBonusGap,
      menBonus, womenBonus,
      quartileMale, quartileFemale,
      mainDriver, actions,
    } = await req.json();

    if (!meanPayGap || !medianPayGap || !sector || !mainDriver || !actions) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const SECTOR_BENCHMARKS: Record<string, { mean: number; median: number; note: string }> = {
      'Financial services':       { mean: 28, median: 22, note: 'one of the highest gaps of any UK sector, driven largely by underrepresentation of women at senior levels' },
      'Legal':                    { mean: 22, median: 19, note: 'persistently high, reflecting a concentration of women in support roles and underrepresentation at partner level' },
      'Technology':               { mean: 18, median: 15, note: 'driven primarily by a lower proportion of women in senior technical and leadership roles' },
      'Healthcare / NHS':         { mean: 12, median: 8,  note: 'lower than many sectors, though gaps persist at the most senior levels and in specialist pay bands' },
      'Education (higher education)': { mean: 16, median: 14, note: 'reflecting underrepresentation of women in professorial and senior leadership roles' },
      'Education (schools)':      { mean: 10, median: 7,  note: 'among the lower gaps nationally, though leadership representation remains a factor' },
      'Public sector':            { mean: 13, median: 11, note: 'generally lower than private sector, with variation across departments and seniority levels' },
      'Third sector / Charity':   { mean: 11, median: 9,  note: 'lower than many sectors, though senior leadership gaps persist in larger organisations' },
      'Hospitality and retail':   { mean: 10, median: 8,  note: 'often driven by part-time working patterns and occupational segregation rather than like-for-like pay differences' },
      'Private sector':           { mean: 16, median: 13, note: 'the overall private sector average, with significant variation by industry' },
      'Other':                    { mean: 14, median: 12, note: 'the UK national average across all reporting employers' },
    };

    const bench = SECTOR_BENCHMARKS[sector] || SECTOR_BENCHMARKS['Other'];
    const userMean = parseFloat(meanPayGap);
    const userMedian = parseFloat(medianPayGap);
    const meanComparison = userMean > bench.mean ? `above the ${sector} sector average of ${bench.mean}%` : userMean < bench.mean ? `below the ${sector} sector average of ${bench.mean}%` : `in line with the ${sector} sector average of ${bench.mean}%`;
    const medianComparison = userMedian > bench.median ? `above the ${sector} sector median of ${bench.median}%` : userMedian < bench.median ? `below the ${sector} sector median of ${bench.median}%` : `in line with the ${sector} sector median of ${bench.median}%`;

    const toneInstruction =
      tone === 'Formal' ? 'Write in a formal, professional register suitable for a statutory report or annual report publication.' :
      tone === 'Direct and transparent' ? 'Write in a direct, transparent register. Be honest about shortcomings. Avoid corporate hedging. This should read as genuine accountability, not PR.' :
      'Write in a balanced register: professional but accessible, honest without being self-critical to the point of undermining confidence.';

    const prompt = `You are a senior EDI consultant at The Inclusion Edit, a specialist equity, diversity and inclusion consultancy. You are writing a gender pay gap narrative statement for ${orgName || 'an organisation'} in the ${sector} sector, covering the ${reportingYear || 'current'} reporting year.

Their figures:
- Mean gender pay gap: ${meanPayGap}%
- Median gender pay gap: ${medianPayGap}%
- Mean bonus gap: ${meanBonusGap || 'not provided'}%
- Median bonus gap: ${medianBonusGap || 'not provided'}%
- Men receiving a bonus: ${menBonus || 'not provided'}%
- Women receiving a bonus: ${womenBonus || 'not provided'}%
- Pay quartiles (% male / % female):
  Upper quartile: ${(quartileMale as QuartileRow)?.upper || '?'}% male / ${(quartileFemale as QuartileRow)?.upper || '?'}% female
  Upper middle: ${(quartileMale as QuartileRow)?.upperMiddle || '?'}% male / ${(quartileFemale as QuartileRow)?.upperMiddle || '?'}% female
  Lower middle: ${(quartileMale as QuartileRow)?.lowerMiddle || '?'}% male / ${(quartileFemale as QuartileRow)?.lowerMiddle || '?'}% female
  Lower quartile: ${(quartileMale as QuartileRow)?.lower || '?'}% male / ${(quartileFemale as QuartileRow)?.lower || '?'}% female

Main driver they identified: ${mainDriver}
Actions they described: ${actions}

Sector benchmarks: Mean ${bench.mean}%, Median ${bench.median}% (${bench.note}).
Their mean is ${meanComparison}. Their median is ${medianComparison}.

Tone instruction: ${toneInstruction}

Important: Do not use dashes anywhere in your output. Use colons or semicolons instead. Write in plain, direct professional English. Be specific to this organisation's figures and context, not generic. Do not write things that could apply to any organisation.

Produce your response in this exact format, with each section clearly marked:

STATEMENT:
[A 300 to 450 word narrative statement ready to publish. Structure: what our figures show; what is driving the gap; what we are doing about it; our commitment going forward. Be specific. Reference the actual numbers. Do not use hollow corporate language.]
END_STATEMENT

SECTOR_CONTEXT:
[2 to 3 sentences placing their figures in sector context. Reference the benchmark figures provided. Be factual and specific.]
END_SECTOR_CONTEXT

ACTIONS_REVIEW:
[Assess the actions they described. If any are well-evidenced and likely to have meaningful impact, say so. If any are commonly used but have limited impact on their own (such as unconscious bias training alone, awareness campaigns, or aspirational statements without structural change), flag this directly and constructively. Suggest one or two stronger or complementary actions grounded in evidence. Do not be harsh; be helpful. 150 to 200 words.]
END_ACTIONS_REVIEW

STRENGTHEN_NEXT_YEAR:
[Two or three specific, actionable recommendations for what this organisation should work on so that next year's statement can honestly report something different. Be concrete. Avoid vague suggestions like "continue to monitor". Each recommendation on its own line, starting with a dash replaced by a colon.]
END_STRENGTHEN_NEXT_YEAR

SHORT_VERSION:
[A 2 to 3 sentence summary suitable for a social post or internal announcement when they publish. Professional, honest, not self-congratulatory.]
END_SHORT_VERSION`;

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    const extract = (start: string, end: string) => {
      const m = text.match(new RegExp(`${start}:\\s*([\\s\\S]*?)${end}`));
      return m ? m[1].trim() : '';
    };

    return NextResponse.json({
      orgName: orgName || '',
      sector,
      reportingYear: reportingYear || '',
      meanPayGap, medianPayGap,
      meanComparison, medianComparison,
      benchMean: bench.mean, benchMedian: bench.median,
      statement:      extract('STATEMENT', 'END_STATEMENT'),
      sectorContext:  extract('SECTOR_CONTEXT', 'END_SECTOR_CONTEXT'),
      actionsReview:  extract('ACTIONS_REVIEW', 'END_ACTIONS_REVIEW'),
      strengthenNext: extract('STRENGTHEN_NEXT_YEAR', 'END_STRENGTHEN_NEXT_YEAR'),
      shortVersion:   extract('SHORT_VERSION', 'END_SHORT_VERSION'),
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
