// Shared content for the Starting Point Finder: used by the homepage and by the
// email that sends people their steps, so the two always match.

export type FinderRoute = "policy" | "training" | "business-case" | "strategy" | "data" | "general";

export const FINDER_STEPS: Record<FinderRoute, string> = {
  "policy": `When working on inclusion policy, a strong foundation makes everything else easier. Here are five steps to get you started:

1. Review two or three example policies from organisations in your sector; look at structure, language and scope rather than copying content.
2. Gather your own organisational data first: demographics, pay gaps, recruitment and retention figures, exit interview themes. Your policy needs to reflect your actual context.
3. Consult with your people before drafting; run listening sessions or a short survey to surface what staff actually need the policy to address.
4. Map your legal obligations in each place you operate (for example, the Equality Act 2010 in Great Britain), plus any sector duties and any commitments to clients or funders.
5. Draft in plain language with clear ownership: who is responsible for each commitment, how it will be monitored, and when it will be reviewed.

Once you have those foundations, you are in a much stronger position to build a policy that actually lands.`,
  "training": `When inclusion training is not sticking, the problem is rarely the training itself. Here are five steps to diagnose and fix it:

1. Audit what has already been delivered: what was the content, who attended, and what behaviour change was expected afterwards?
2. Identify the gap between training and practice; talk to managers and ask what gets in the way of applying what they learned.
3. Check whether leadership models the behaviours the training asks of others; culture follows leaders, not slide decks.
4. Build in accountability: make inclusion commitments part of performance conversations, not a separate project.
5. Consider whether your training content reflects your specific context; generic content rarely drives specific change.

Once you have that picture, the right next step becomes much clearer.`,
  "business-case": `Making the business case for inclusion is one of the most important and most winnable conversations you can have. Here are five steps:

1. Lead with data that speaks your leadership's language: financial performance, staff retention costs, recruitment reach, client expectations.
2. Benchmark against your sector: what are comparable organisations doing and what outcomes are they reporting?
3. Quantify the cost of inaction: calculate turnover costs, absence rates linked to belonging, and any reputational or regulatory risk.
4. Frame inclusion as a business enabler, not a compliance requirement; use the language of opportunity, not obligation.
5. Prepare for objections: know the two or three most likely pushbacks and have evidence-based responses ready.

A well-constructed business case does not just win the argument once; it creates the mandate for everything that follows.`,
  "strategy": `Building an inclusion strategy that actually drives change takes more than a document. Here are five steps to get it right:

1. Start with a diagnostic: before setting priorities, understand where you actually are through data, listening and an honest audit of current activity.
2. Define what success looks like in your context; vague aspirations do not drive accountability.
3. Set time-bound priorities rather than trying to tackle everything; three well-executed commitments create more impact than ten aspirational ones.
4. Build in governance: who owns each priority, what resources are allocated, and how will progress be reported?
5. Communicate the strategy in a way that makes it real for different audiences; what it means for a team manager is different from what it means for a board member.

A strategy is only as strong as the infrastructure that supports it.`,
  "data": `Getting your data and measurement right is one of the highest-leverage things you can do for inclusion. Here are five steps:

1. Start with what you already collect: HR data, engagement survey results, exit interview themes, recruitment funnel data.
2. Identify the gaps: what protected characteristics do you have data on, and what are you missing entirely?
3. Run a voluntary declaration exercise with clear communication about why you are collecting data and how it will be used.
4. Analyse intersectionally where possible; averages can hide significant disparities within groups.
5. Decide how you will report: internally to leadership, externally to stakeholders, and to your own workforce.

Good data does not just tell you where you are; it gives you the mandate to act.`,
  "general": `Wherever you are starting from, a few things make the biggest difference early on:

1. Get clear on your current baseline: what do you know about where you are, and what data or evidence do you have to support that picture?
2. Talk to your people before making decisions; the best inclusion strategies are built from listening, not assumption.
3. Identify one or two priorities rather than trying to do everything at once; focus creates momentum.
4. Map what resources, time and budget are actually available; an ambitious plan with no resource behind it stalls quickly.
5. Find out what already exists in your organisation that could be built on; you rarely need to start from scratch.

Starting well sets the tone for everything that follows.`,
};

export const SECTOR_PHRASE: Record<string, string> = {
  "Corporate or private sector": "in the corporate or private sector",
  "Public sector": "in the public sector",
  "Education": "in education",
  "Charity or third sector": "in the charity or third sector",
  "Healthcare": "in healthcare",
  "Other": "in your sector",
};

export const STAGE_LABEL: Record<string, string> = {
  "Just starting": "just starting out",
  "In progress": "already under way",
  "Want to go deeper": "ready to go deeper",
};

// The free resource and welcome email wording for each route
export const FINDER_EMAILS: Record<FinderRoute, { subject: string; preview: string; resource: string; file: string; kind: string; blurb: string; button: string; support: string; supportHeading: string }> = {
  policy: {
    subject: "Your five steps for an inclusive policy",
    preview: "Plus a free checklist to audit any policy against 14 criteria.",
    resource: "Making Policies Inclusive",
    file: "making-policies-inclusive.pdf",
    kind: "checklist",
    blurb: "Making Policies Inclusive takes you through 14 tips across design, scope, process and review. Use it to audit one policy you already have, tick off what it meets, and leave with your three priority changes.",
    button: "Download Making Policies Inclusive",
    supportHeading: "You do not have to work through this alone",
    support: "If you would like a second pair of eyes on your policy, or help deciding where to start, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
  training: {
    subject: "Your five steps for training that sticks",
    preview: "Plus a free self-assessment to share with your managers.",
    resource: "the Inclusive Leadership Self-Assessment",
    file: "inclusive-leadership-self-assessment.pdf",
    kind: "self-assessment",
    blurb: "The Inclusive Leadership Self-Assessment asks 12 questions across four areas of leadership practice, each with a real workplace example. Ask your managers to complete it privately, then discuss the patterns together: it turns step 3 into a conversation rather than a lecture.",
    button: "Download the Self-Assessment",
    supportHeading: "You do not have to work through this alone",
    support: "If you would like help working out why learning is not reaching practice in your organisation, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
  "business-case": {
    subject: "Your five steps to a business case leaders act on",
    preview: "Plus free scripts for the five objections you are most likely to hear.",
    resource: "Talking to Sceptical Stakeholders",
    file: "talking-to-sceptical-stakeholders.pdf",
    kind: "toolkit",
    blurb: "Talking to Sceptical Stakeholders is built for step 5. It covers five common objections, from \"this is divisive\" to \"we cannot afford it\", with what they usually mean, a reframe, and conversation scripts you can adapt for a board, a finance lead or a one-to-one.",
    button: "Download the Toolkit",
    supportHeading: "You do not have to make the case alone",
    support: "If you have a leadership conversation coming up and would like to test your argument first, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
  strategy: {
    subject: "Your five steps to an inclusion strategy that drives change",
    preview: "Plus a free 30/60/90 day planner to turn them into your first quarter.",
    resource: "the 30/60/90 Day Action Planner",
    file: "30-60-90-day-action-planner.pdf",
    kind: "planner",
    blurb: "The 30/60/90 Day Action Planner breaks your first quarter into three phases: understand, plan, then launch. It has 30 practical actions with space for an owner, a status and notes on each, plus six top tips for making the plan land.",
    button: "Download the Planner",
    supportHeading: "You do not have to build this alone",
    support: "If you would like a sounding board on your priorities before you take them to leadership, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
  data: {
    subject: "Your five steps to inclusion data people trust",
    preview: "Plus a free guide to collecting equality data ethically and legally.",
    resource: "the Inclusive Data Collection guide",
    file: "inclusive-data-collection.pdf",
    kind: "guide",
    blurb: "Inclusive Data Collection takes you through eight steps, the common mistakes at each one, and the legal frameworks that apply. It ends with a short planning section whose answers you can use as the rationale in a DPIA, a board paper or your staff communications.",
    button: "Download the Guide",
    supportHeading: "You do not have to work this out alone",
    support: "If you would like help designing your questions or deciding what to report, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
  general: {
    subject: "Your five steps to start well on inclusion",
    preview: "Plus a free framework to see where your organisation stands today.",
    resource: "the Inclusion Maturity Framework",
    file: "inclusion-maturity-framework.pdf",
    kind: "framework",
    blurb: "The Inclusion Maturity Framework helps with step 1. Assess six areas, from leadership to culture, on a scale from Unaware to Leading, find your three lowest, and leave with next steps you can take to your leadership team.",
    button: "Download the Framework",
    supportHeading: "You do not have to start alone",
    support: "If you would like help making sense of your results or choosing your first priority, book a free 30 minute call. No obligation; just a practical conversation about your context.",
  },
};
