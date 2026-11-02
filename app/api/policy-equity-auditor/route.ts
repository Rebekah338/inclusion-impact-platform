import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LEGAL_FRAMEWORKS: Record<string, string[]> = {
  'England': ['Equality Act 2010','ACAS Code of Practice','Public Sector Equality Duty','Modern Slavery Act 2015','Human Rights Act 1998'],
  'Scotland': ['Equality Act 2010','ACAS Code of Practice','Public Sector Equality Duty','Fairer Scotland Duty'],
  'Wales': ['Equality Act 2010','ACAS Code of Practice','Public Sector Equality Duty','Well-being of Future Generations Act 2015'],
  'Northern Ireland': ['Employment Equality (Age) Regulations 2006 (NI)','Race Relations Order 1997','Sex Discrimination Order 1976','Disability Discrimination Act 1995','Equality Commission NI guidance'],
  'Republic of Ireland': ['Employment Equality Acts 1998 to 2015','Equal Status Acts 2000 to 2018','Maternity Protection Acts','Safety, Health and Welfare at Work Act 2005'],
  'Bermuda': ['Human Rights Act 1981','Employment Act 2000','Workers (Temporary Amendment) Act 2020'],
  'United States': ['Title VII of the Civil Rights Act 1964','ADA (Americans with Disabilities Act)','ADEA (Age Discrimination in Employment Act)','FMLA (Family and Medical Leave Act)','EEOC guidelines'],
};

const SECTOR_FRAMEWORKS: Record<string, string[]> = {
  'Healthcare / NHS': ['NHS People Plan 2020 to 2025','NHS Accessible Information Standard','NHS Workforce Race Equality Standard (WRES)','NHS Workforce Disability Equality Standard (WDES)'],
  'Education (schools)': ['Keeping Children Safe in Education','Teachers Standards','SEND Code of Practice','Equality Act 2010 (schools duties)'],
  'Education (higher education)': ['Athena SWAN Charter','Race Equality Charter','OfS Access and Participation guidance'],
  'Financial services': ['FCA Diversity and Inclusion Policy Statement','PRA guidance on D&I','Senior Managers and Certification Regime'],
  'Legal': ['SRA Diversity in Law guidance','Bar Council Equality Rules'],
  'Public sector': ['Public Sector Equality Duty','Cabinet Office diversity guidance','Civil Service Diversity and Inclusion Strategy'],
  'Third sector / charity': ['Charity Commission guidance on equality','NCVO good governance code'],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      policyName, policyType, jurisdiction, usState,
      sector, orgSize, lastReviewed,
      policyDescription, doesWell, focusOn,
      policyText,
    } = body;

    const legalRefs = [
      ...(LEGAL_FRAMEWORKS[jurisdiction] || []),
      ...(SECTOR_FRAMEWORKS[sector] || []),
    ];

    const prompt = `You are a specialist equity and inclusion policy auditor with deep knowledge of UK, Irish, Bermudian, and US employment law and EDI best practice. Conduct a thorough equity audit of the policy below.

POLICY CONTEXT:
- Policy name: ${policyName}
- Policy type: ${policyType}
- Jurisdiction: ${jurisdiction}${usState ? ` (${usState})` : ''}
- Sector: ${sector}
- Organisation size: ${orgSize}
- Last reviewed: ${lastReviewed}
- Description: ${policyDescription || 'Not provided'}
- What user thinks works well: ${doesWell || 'Not provided'}
- What user wants us to focus on: ${focusOn || 'Not provided'}
- Relevant legal frameworks: ${legalRefs.join(', ')}

POLICY TEXT:
${policyText}

Return a JSON object with this exact structure. Do not include markdown code fences or any text outside the JSON.

{
  "overallRating": "needs_work" | "developing" | "strong",
  "overallSummary": "2-3 sentence summary of the policy's equity standing",
  "dimensions": [
    {
      "name": "Language and Tone",
      "status": "red" | "amber" | "green",
      "findings": [
        {
          "quote": "exact text from policy or empty string if general",
          "finding": "what the issue or strength is",
          "severity": "critical" | "recommended" | "enhancement"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "id": "rw1",
      "section": "dimension name",
      "original_text": "exact quote from policy",
      "suggested_text": "improved replacement text",
      "reason": "one sentence explanation",
      "severity": "critical" | "recommended" | "enhancement"
    }
  ],
  "actionPlan": {
    "signOff": "who needs to sign this off and at what level",
    "nextReview": "when it should next be reviewed and why",
    "consultation": "who needs to be consulted before finalising",
    "frameworks": ["list of specific frameworks to align to given their sector and jurisdiction"],
    "equalityImpact": "whether a standalone EIA is needed and why",
    "communication": "who needs to see this policy and how it should be shared"
  },
  "legalReferences": ["list of specific acts, standards and guidance documents relevant to this policy, jurisdiction and sector"]
}

The dimensions array MUST include all seven: Language and Tone; Legal Framework Alignment; Coverage of Protected Characteristics; Accountability and Governance; Action vs Aspiration; Intersectionality; Accessibility of the Document.

Each dimension should have 2 to 4 findings. Quote exact text from the policy where possible. Be specific and constructive. Reference the actual jurisdiction and sector in legal findings.

The rewrites array should contain 4 to 10 concrete text substitutions. Each original_text must be a verbatim excerpt from the policy text provided. Keep suggested rewrites professional and in the same register as the original policy.

Do not use dashes in any text fields. Use colons and semicolons only.`;

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text : '{}';
    
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Parse error' };
    }

    return NextResponse.json({ ...parsed, policyName, jurisdiction, sector });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
