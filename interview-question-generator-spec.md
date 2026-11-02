# Interview Question Generator: Full Feature Specification

## Overview

A real AI-powered tool (calls Claude API) that generates a full bank of inclusive, bias-free interview questions tailored to a specific role and organisation. Output is grouped by theme with follow-up probes, a "what not to ask" section, and a "Build your interview" tab where users select and compile their own question set.

---

## Step 1: Pre-Questions

All fields appear on one form before the user submits.

### Job title — free text, required
Used to tailor questions to the specific role rather than generating generic output.

### Role level — dropdown, required
- Entry level / Junior
- Mid-level
- Senior / Specialist
- Manager / Team lead
- Director / Head of
- Executive / C-suite

### Sector — dropdown, required
- Private sector
- Public sector
- Third sector / Charity
- Education (schools)
- Education (higher education)
- Healthcare / NHS
- Financial services
- Legal
- Technology
- Hospitality and retail
- Other

### Interview format — dropdown, required
- Structured (same questions, same order, for every candidate)
- Competency-based (evidence of past behaviour)
- Values-based (alignment with organisational values)
- Panel interview (multiple interviewers present)

### Job specification — paste area, required
Full job spec including responsibilities and requirements. Used to generate role-relevant questions.

### About your organisation — paste area, optional
Hint text beneath: "Paste your mission statement, values, a description of your team, or anything that helps us tailor the questions to your culture and ways of working."

---

## Step 2: Processing State

Loading indicator cycling through:
- Reading your job specification...
- Generating role-specific questions...
- Adding follow-up probes...
- Checking for bias and exclusionary language...
- Compiling your what not to ask list...
- Building your question bank...

---

## Step 3: Output — Three Tabs

### Tab 1: Question Bank

Full set of inclusive, bias-free interview questions grouped by theme. Themes will vary by role but will draw from:

- Skills and experience
- Values and culture
- Behaviour and situational judgement
- Leadership and management (for senior roles)
- Collaboration and communication
- Problem-solving and decision-making
- Commitment to equity and inclusion

Each question shows:
- The question itself
- What it is assessing (one line, e.g. "Assesses: collaborative problem-solving")
- Two or three follow-up probes (e.g. "What was your role specifically?", "What would you do differently now?")
- A checkbox (used in Tab 3: Build your interview)
- A copy icon to copy that individual question and its probes

At the top of Tab 1: a reasonable adjustments reminder — a highlighted box with suggested wording for what to say to every candidate at the start of the interview: "Before we begin, I want to check whether you need any adjustments to take part in this interview today. This might include the format, timing, or anything else that would help you perform at your best."

### Tab 2: What Not to Ask

A list of question types that are problematic in interviews, with plain-English explanations of why. Always includes:

- Questions about childcare or family plans ("Do you have children?", "Are you planning a family?") — sex discrimination risk; irrelevant to ability to do the job
- Questions about nationality or origin ("Where are you from originally?", "What is your first language?") — race discrimination risk
- Questions about health or disability before a job offer is made — Equality Act 2010 restriction (UK); equivalent in other jurisdictions
- Questions about age ("How old are you?", "When did you graduate?") — age discrimination risk
- Questions about religion or religious practice ("Do you observe any religious holidays?") — religion or belief discrimination risk
- Questions about relationship status or living arrangements — personal and irrelevant
- Questions that assume availability ("Can you work weekends?") without first establishing whether this is a genuine requirement

Each entry shows:
- The problematic question or question type
- Why it is a problem (one to two sentences in plain language)
- What to ask instead (a legal, relevant alternative)

### Tab 3: Build Your Interview

A compiled view of all questions the user has checked in Tab 1.

- Intro text: "Select the questions that work best for your role. Your chosen questions will appear here ready to copy or download."
- If no questions selected: a prompt to go back to Tab 1 and check the questions they want
- Selected questions appear in theme order with their follow-up probes
- Reasonable adjustments reminder included at the top automatically
- "Copy all" button: copies the full compiled interview to clipboard
- "Download as Word document" button: downloads a clean .docx

---

## What the AI generates (full list)

### Question bank
- Minimum 20 questions across all themes
- All questions written in plain, accessible language
- All questions legally safe and free from protected-characteristic assumptions
- Questions calibrated to role level: entry-level questions ask for examples from any context (study, volunteering, part-time work); senior-level questions ask for strategic and leadership examples
- Follow-up probes for every question
- Inclusion-specific questions included in every bank (at least two): questions that assess the candidate's own understanding of and commitment to equity and inclusion, written to feel natural rather than tokenistic

### What not to ask
- Minimum 7 entries
- Sector-specific additions where relevant (e.g. education sector: questions about parental status are particularly common and particularly problematic)
- Jurisdiction-aware where possible (Equality Act 2010 for UK; Human Rights Act 1981 for Bermuda; federal and state law for US)

---

## Technical notes

- Real Claude API call (ANTHROPIC_API_KEY already in .env.local)
- Model: claude-opus-4-5, max_tokens: 4000
- API route: app/api/interview-question-generator/route.ts
- Page: app/dashboard/inclusion-ai/interview-question-generator/page.tsx
- Section parsing: THEMES, WHAT_NOT_TO_ASK sections
- Each theme block parsed into: theme name, questions array (each with text, assessing, probes[])
- Each what-not-to-ask block parsed into: question, why, alternative
- Tab 3 state managed client-side: checked question IDs tracked in state, compiled view renders from selection
- Word document download: client-side using docx npm package or server-side generation

---

## Future iterations (not in v1)

- Save and reuse: save a compiled interview pack for a role
- Team sharing: share the question bank with a colleague or hiring panel
- Scoring guide: add what a strong vs weak answer looks like for each question (deliberately out of v1 to keep the tool focused on question quality rather than assessment rubrics)
