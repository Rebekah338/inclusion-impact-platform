"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";


/* ─── CATEGORIES ────────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    key: "profitability",
    label: "Profitability and financial performance",
    icon: "📈",
    desc: "The direct link between diverse leadership and bottom-line results.",
  },
  {
    key: "innovation",
    label: "Innovation and decision-making",
    icon: "💡",
    desc: "How diverse teams make better decisions and generate more ideas.",
  },
  {
    key: "retention",
    label: "Retention and reducing turnover costs",
    icon: "🔁",
    desc: "What non-inclusion actually costs, and what you save when people stay.",
  },
  {
    key: "talent",
    label: "Talent attraction and workforce capability",
    icon: "🌟",
    desc: "Why the best candidates choose inclusive employers.",
  },
  {
    key: "productivity",
    label: "Productivity and team performance",
    icon: "⚡",
    desc: "Belonging and psychological safety as drivers of day-to-day output.",
  },
  {
    key: "reputation",
    label: "Reputation, risk and accountability",
    icon: "🛡️",
    desc: "Brand protection, ESG accountability, and stakeholder trust.",
  },
  {
    key: "customer",
    label: "Customer and market growth",
    icon: "🛍️",
    desc: "Reaching broader audiences and the revenue opportunity in inclusive design.",
  },
];

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const RESEARCH_REPORTS = [
  {
    id: "mckinsey-diversity-wins",
    categories: ["profitability", "innovation"],
    icon: "📊",
    title: "McKinsey Diversity Wins Report",
    year: "2023",
    source: "McKinsey and Company",
    desc: "Companies in the top quartile for gender diversity are 25% more likely to have above-average profitability. The data on ethnic and cultural diversity is even stronger.",
    tags: ["data", "business case", "diversity", "profitability"],
    type: "Research Report",
    url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters",
    about: "McKinsey's Diversity Wins report analysed data from more than 1,000 large companies across 15 countries. It set out to examine the relationship between leadership diversity and financial performance, moving beyond earlier correlation findings to look at what inclusion actually requires and what most organisations still get wrong.",
    findings: [
      "Companies in the top quartile for gender diversity on executive teams are 25% more likely to achieve above-average profitability than peer companies.",
      "Companies in the top quartile for ethnic and cultural diversity outperform those in the bottom quartile by 36% in profitability.",
      "Despite progress, only 1 in 20 companies globally has closed the representation gap at senior leadership level.",
      "Inclusion has a stronger direct link to financial performance than diversity representation alone. Diverse teams without inclusive cultures do not outperform.",
      "The most common barriers to inclusion are microaggressions, lack of sponsorship, and bias in performance reviews — not pipeline shortages.",
    ],
    leadership: [
      "Your organisation is statistically leaving profitability on the table if you are not in the top quartile for leadership diversity. Use this figure directly in budget conversations.",
      "Ethnic and cultural diversity at leadership level produces a 36% profitability premium. If your board lacks this diversity, ask what the cost of inaction is in financial terms.",
      "Representation targets without inclusion programmes deliver nothing. Use this to justify investment in culture alongside recruitment.",
      "If your organisation has a diverse workforce but senior leadership remains homogeneous, the research shows you are not yet converting diversity into performance.",
      "Microaggressions and bias in performance reviews are the top barriers identified. Tackle these specifically — not just representation numbers — to see financial return.",
    ],
    quotes: [
      { text: "Inclusion is not a soft concept. It is a measurable business performance lever.", attr: "McKinsey Diversity Wins, 2023" },
      { text: "The most diverse companies are now more likely than ever to outperform less diverse peers on profitability.", attr: "McKinsey Diversity Wins, 2023" },
    ],
    related: ["deloitte-millennial-survey", "stonewall-equality-index"],
  },
  {
    id: "deloitte-millennial-survey",
    categories: ["talent", "retention"],
    icon: "💡",
    title: "Deloitte Millennial Survey: Inclusion at Work",
    year: "2022",
    source: "Deloitte",
    desc: "76% of respondents consider diversity and inclusion important when evaluating prospective employers. A key driver for attraction and retention.",
    tags: ["talent", "retention", "millennial", "attraction"],
    type: "Research Report",
    url: "https://www.deloitte.com/global/en/issues/work/content/genzmillennialsurvey.html",
    about: "Deloitte surveyed more than 23,000 millennials and Gen Z workers across 46 countries to understand what they look for in employers and what drives their loyalty, wellbeing and performance at work. Inclusion and belonging emerged as central to every dimension of the employment experience.",
    findings: [
      "76% of respondents said a diverse and inclusive workplace was an important factor when choosing an employer.",
      "Millennials who feel their workplace is highly inclusive are 1.8 times more likely to feel highly engaged.",
      "Nearly half of respondents said they had left a previous employer partly due to a lack of inclusion or belonging.",
      "Gen Z workers are more likely to speak out about discrimination than any previous generation and expect employers to act.",
      "Organisations with strong inclusion records report significantly lower voluntary turnover than those without.",
    ],
    leadership: [
      "If you are struggling to attract early-career talent, your inclusion record is likely a factor. Three in four candidates are checking for it.",
      "Engagement levels are nearly double in inclusive workplaces. Use this to frame inclusion as a productivity and performance investment.",
      "Nearly half of your leavers may have left partly because they did not feel included. Calculate your cost of turnover and apply inclusion as a retention strategy.",
      "Gen Z workers will hold organisations to account publicly if they feel inclusion is performative. The reputational risk of inaction is growing.",
      "Inclusion is now a baseline expectation for new entrants to the workforce, not a differentiator. Falling behind is a competitive risk.",
    ],
    quotes: [
      { text: "For millennials and Gen Z, diversity and inclusion is table stakes. It is the starting point, not the bonus.", attr: "Deloitte Millennial Survey, 2022" },
      { text: "Organisations that fail to demonstrate genuine inclusion are losing talent to those that do.", attr: "Deloitte Millennial Survey, 2022" },
    ],
    related: ["mckinsey-diversity-wins", "gender-pay-gap"],
  },
  {
    id: "gender-pay-gap",
    categories: ["talent", "retention", "profitability"],
    icon: "📈",
    title: "Gender Pay Gap Evidence Base",
    year: "2023",
    source: "CIPD and Fawcett Society",
    desc: "Comprehensive look at the UK gender pay gap drivers, sector breakdowns, and interventions with the strongest evidence base.",
    tags: ["gender pay gap", "UK", "data", "pay equity"],
    type: "Data Report",
    url: "https://www.fawcettsociety.org.uk/",
    about: "This joint report from the CIPD and the Fawcett Society draws on UK employer data, academic evidence, and policy analysis to map what is actually driving the gender pay gap in different sectors and what interventions have the strongest evidence base for closing it. It is one of the most practically useful evidence resources for UK employers.",
    findings: [
      "The UK median gender pay gap stands at 14.9% in favour of men, but rises to 35% or more in some sectors including financial services.",
      "Occupational segregation accounts for the largest share of the gap: women are disproportionately concentrated in lower-paid roles and sectors.",
      "Flexible working policies that apply equally to men and women reduce the gap more than women-only interventions.",
      "Organisations that publish narrative pay gap reports alongside their statutory data close the gap faster than those that publish numbers alone.",
      "Sponsorship programmes for women at middle-management level have stronger evidence behind them than mentoring programmes alone.",
    ],
    leadership: [
      "Your statutory gender pay gap report is the floor, not the ceiling. Use this research to show leadership what a meaningful response looks like.",
      "The financial services gap of 35%+ is a reputational and legal risk. Early action is significantly cheaper than late remediation.",
      "Flexible working for all, not just women, is one of the highest-impact interventions. Frame this as a workforce design question, not a diversity programme.",
      "Narrative reporting signals accountability. Organisations that explain what they are doing and why close the gap faster. Use this to make the case for a fuller report.",
      "Mentoring alone does not move the needle. Sponsorship and structural change do. Use this evidence to redirect investment.",
    ],
    quotes: [
      { text: "The gender pay gap is not a pipeline problem. It is a structural problem that requires structural solutions.", attr: "Fawcett Society, 2023" },
      { text: "Publishing a number without a narrative is compliance without commitment.", attr: "CIPD Gender Pay Gap Report, 2023" },
    ],
    related: ["mckinsey-diversity-wins", "parker-review"],
  },
  {
    id: "parker-review",
    categories: ["profitability", "reputation"],
    icon: "🌍",
    title: "Parker Review: Ethnic Diversity in Boardrooms",
    year: "2022",
    source: "Parker Review Committee",
    desc: "Annual tracking of ethnic representation in FTSE 100 and 250 boardrooms with targets, progress, and sector comparison.",
    tags: ["ethnicity", "leadership", "board", "FTSE"],
    type: "Data Report",
    url: "https://parkerreview.co.uk/",
    about: "The Parker Review is an annual government-commissioned report tracking ethnic diversity on the boards of FTSE 100 and FTSE 250 companies. It sets targets, measures progress, and provides sector-level breakdowns. It is the primary evidence base for conversations about ethnic representation at the most senior levels of UK business.",
    findings: [
      "As of 2022, 96% of FTSE 100 companies had met the target of at least one director from an ethnic minority background, up from 74% in 2020.",
      "Progress in the FTSE 250 is significantly slower, with 44% of companies yet to meet the one director target.",
      "Only 16 of the FTSE 100 companies have ethnic minority representation at Chair or CEO level.",
      "The technology and financial services sectors show the highest representation; retail and consumer goods lag behind.",
      "Voluntary targets have driven faster progress than mandatory reporting alone, but the pipeline into the boardroom remains narrow.",
    ],
    leadership: [
      "FTSE 100 progress is visible and tracked publicly. If your sector is lagging, that is a reputational risk as much as an EDI one.",
      "One director is a starting point, not a destination. Use this report to challenge the board on what representation looks like at Chair and CEO level.",
      "Voluntary targets have outperformed mandatory reporting in driving change. Propose internal targets with public accountability.",
      "The pipeline into the boardroom is the real problem. Use this to make the case for investment in development and succession planning for diverse talent.",
      "Sector comparison data gives you a benchmark. If your sector peers are ahead, your organisation is at a competitive disadvantage in talent markets.",
    ],
    quotes: [
      { text: "Having one person from an ethnic minority background on a board is progress. Having none is no longer acceptable.", attr: "Parker Review, 2022" },
      { text: "Targets without accountability are intentions. Accountability without targets is motion without direction.", attr: "Parker Review Committee, 2022" },
    ],
    related: ["mckinsey-diversity-wins", "deloitte-millennial-survey"],
  },
  {
    id: "neurodiversity-work",
    categories: ["innovation", "productivity"],
    icon: "🧠",
    title: "Neurodiversity at Work: Business Benefits",
    year: "2023",
    source: "ACAS and British Dyslexia Association",
    desc: "Evidence review on the performance and innovation benefits of building neurodiverse teams, with practical employer guidance.",
    tags: ["neurodiversity", "disability", "inclusion", "innovation"],
    type: "Research Summary",
    url: "https://www.acas.org.uk/neurodiversity-at-work",
    about: "This evidence review draws together research from neuroscience, occupational psychology, and employer practice to examine the business benefits of neurodiverse teams. It covers what neurodiversity is, what barriers neurodiverse employees face, and what adjustments and practices generate the strongest outcomes for both individuals and organisations.",
    findings: [
      "Neurodiverse employees are significantly over-represented in roles requiring pattern recognition, systems thinking, and creative problem-solving.",
      "Companies that actively support neurodiversity report higher innovation output and broader cognitive diversity in decision-making.",
      "Up to 20% of the workforce may be neurodivergent, making this one of the largest underserved talent groups in most organisations.",
      "The most common barrier is disclosure: 50% of neurodiverse employees do not disclose at work due to fear of stigma or disadvantage.",
      "Reasonable adjustments for neurodiverse employees cost on average less than £75 and often benefit the wider workforce.",
    ],
    leadership: [
      "One in five of your employees may be neurodivergent and not disclosing. The question is not whether you have neurodiverse employees but whether they feel safe enough to tell you.",
      "If innovation is a business priority, neurodiverse thinking styles are a competitive asset. Frame inclusion as a capability investment.",
      "The average cost of a reasonable adjustment is under £75. The cost of losing a skilled employee who does not feel supported is many times higher.",
      "Non-disclosure due to stigma is a leadership culture problem. Address it directly rather than assuming disclosure rates reflect the true proportion of neurodiverse employees.",
      "Practices that support neurodiverse employees — clear communication, flexibility, written instructions — improve performance for the whole workforce.",
    ],
    quotes: [
      { text: "Neurodiversity is not a problem to be managed. It is a capability to be unlocked.", attr: "British Dyslexia Association, 2023" },
      { text: "The organisations that will win the talent war in the next decade are those that design for difference, not despite it.", attr: "ACAS Neurodiversity at Work, 2023" },
    ],
    related: ["deloitte-millennial-survey", "stonewall-equality-index"],
  },
  {
    id: "stonewall-equality-index",
    categories: ["retention", "productivity"],
    icon: "🏳️‍🌈",
    title: "Stonewall Workplace Equality Index 2023",
    year: "2023",
    source: "Stonewall",
    desc: "Findings from 300+ employers on LGBTQ+ inclusion at work and what drives belonging, performance, and retention.",
    tags: ["LGBTQ+", "belonging", "measurement", "retention"],
    type: "Index Report",
    url: "https://www.stonewall.org.uk/workplace-equality-index",
    about: "The Stonewall Workplace Equality Index draws on submissions from more than 300 employers and surveys of LGBTQ+ employees to track the state of LGBTQ+ inclusion in UK workplaces. It provides sector benchmarks, employer rankings, and detailed evidence on what drives — and what undermines — genuine inclusion for LGBTQ+ people at work.",
    findings: [
      "Only 30% of LGBTQ+ employees are fully out to all colleagues, rising to 60% in the top-ranked employers.",
      "LGBTQ+ employees in inclusive workplaces are twice as likely to feel able to bring their full selves to work and significantly more likely to stay.",
      "Trans employees report the highest levels of exclusion, with 1 in 3 having hidden or disguised their identity at work in the past year.",
      "Visible LGBTQ+ role models at senior level are the single strongest predictor of inclusion climate for LGBTQ+ employees.",
      "Employers in the top quartile of the index have 40% lower LGBTQ+ specific voluntary turnover than those in the bottom quartile.",
    ],
    leadership: [
      "If LGBTQ+ employees are not out at work, your inclusion data is incomplete. Low disclosure is a signal about psychological safety, not about your workforce composition.",
      "A 40% reduction in LGBTQ+ specific turnover in inclusive employers translates directly into recruitment and onboarding cost savings. Quantify this for your CFO.",
      "Visible senior role models are the highest-impact, lowest-cost intervention available. Ask who at leadership level is out and visible, and whether that is by choice or by climate.",
      "Trans inclusion is the area of greatest unmet need. A separate, specific trans inclusion policy signals commitment beyond generic statements.",
      "Index benchmarking allows you to compare your progress against sector peers. Use this to create urgency with leadership by showing where you rank relative to competitors.",
    ],
    quotes: [
      { text: "Inclusion is not about tolerance. It is about belonging. And belonging shows up in your retention data whether you are measuring it or not.", attr: "Stonewall Workplace Equality Index, 2023" },
      { text: "The gap between the best employers and the rest on LGBTQ+ inclusion is widening, not narrowing.", attr: "Stonewall, 2023" },
    ],
    related: ["neurodiversity-work", "deloitte-millennial-survey"],
  },
  {
    id: "mckinsey-diversity-matters-more",
    categories: ["profitability", "innovation"],
    icon: "📊",
    title: "Diversity Matters Even More: The Case for Holistic Impact",
    year: "2023",
    source: "McKinsey and Company",
    desc: "Companies in the top quartile for gender diversity are 39% more likely to outperform financially. The latest McKinsey research shows the business case for inclusion is stronger than ever.",
    tags: ["business case", "financial performance", "gender", "ethnicity"],
    type: "Research Report",
    url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact",
    about: "McKinsey's most comprehensive diversity study to date, drawing on data from more than 1,200 companies across 23 countries. It expands the previous Diversity Wins research to examine holistic impact: how diversity affects not just financial returns but innovation, talent, resilience, and societal value creation. The research confirms that the business case for inclusion has never been stronger.",
    findings: [
      "Companies in the top quartile for gender diversity on executive teams are 39% more likely to outperform financially compared with the bottom quartile.",
      "The likelihood of outperformance linked to ethnic diversity has increased to 39% from 36% in the previous study, showing a strengthening trend.",
      "Organisations with greater gender and ethnic diversity in leadership are more likely to create better products, make better decisions, and attract stronger talent.",
      "The relationship between inclusion and financial performance is not a correlation but causal: companies that actively improve inclusion see measurable performance lifts.",
      "Despite progress, women and ethnic minorities remain severely underrepresented at the C-suite and board level across all geographies studied.",
    ],
    leadership: [
      "The financial premium for diverse leadership is now 39%. If your organisation is not in the top quartile, this is a measurable business performance gap, not a values question alone.",
      "The trend is strengthening across all McKinsey cohorts. Early movers are compounding their advantage; late movers face a growing performance deficit.",
      "Holistic impact means diversity affects your innovation pipeline, talent attraction, and decision quality, not just profit margins. Frame your EDI investment accordingly.",
      "The research shows causality, not just correlation. Boards asking for proof that inclusion drives performance now have it in peer-reviewed, multi-country data.",
      "The gap between the most and least diverse organisations continues to widen. Present this trajectory to leadership as a strategic risk with a known remedy.",
    ],
    quotes: [
      { text: "The case for diversity and inclusion is not just stronger than ever. It is now causal, not merely correlational.", attr: "McKinsey Diversity Matters Even More, 2023" },
      { text: "Organisations that fail to invest in inclusion are not just missing an opportunity. They are falling behind peers who are not.", attr: "McKinsey, 2023" },
    ],
    related: ["mckinsey-diversity-wins", "bcg-diverse-leadership-innovation"],
  },
  {
    id: "bcg-diverse-leadership-innovation",
    categories: ["profitability", "innovation"],
    icon: "💡",
    title: "How Diverse Leadership Teams Boost Innovation",
    year: "2018",
    source: "Boston Consulting Group",
    desc: "Companies with above-average diversity on their management teams report innovation revenue 19 percentage points higher than companies with below-average leadership diversity.",
    tags: ["innovation", "leadership", "business case", "revenue"],
    type: "Research Report",
    url: "https://www.bcg.com/publications/2018/how-diverse-leadership-teams-boost-innovation",
    about: "BCG surveyed more than 1,700 companies across eight countries to examine the relationship between management team diversity and innovation outcomes. The research moved beyond representation to look at what types of diversity generate the strongest innovation effects and how those effects translate into measurable revenue. It is one of the most-cited studies linking diversity directly to commercial innovation performance.",
    findings: [
      "Companies with above-average diversity on management teams report innovation revenue 19 percentage points higher than companies with below-average diversity.",
      "This effect held across all eight countries studied, suggesting the innovation dividend from diversity is a universal rather than a culturally specific phenomenon.",
      "The strongest innovation effects came from combining multiple dimensions of diversity: gender, national origin, career path, age, and educational background together.",
      "The relationship between diversity and innovation revenue was stronger in industries characterised by rapid change and competitive disruption.",
      "Diverse teams generated a higher share of revenue from new products and services introduced in the past three years.",
    ],
    leadership: [
      "A 19 percentage point innovation revenue premium is not a rounding error. Calculate what this means in absolute revenue terms for your organisation and present it to your board.",
      "Multidimensional diversity produces the strongest effects. Do not treat gender diversity alone as a proxy for the full range of cognitive difference that drives innovation.",
      "Industries undergoing disruption benefit most. If your sector is changing fast, the competitive case for diverse leadership is even stronger than the average figures suggest.",
      "This research gives you a direct line from diversity investment to product and service pipeline. Use it with your chief innovation or product officer, not just HR.",
      "The effect is consistent across geographies. Use this to counter arguments that diversity is a Western or culturally specific priority.",
    ],
    quotes: [
      { text: "Diversity does not just make teams feel different. It makes them perform differently, and better, on the metrics that matter most to boards.", attr: "BCG, 2018" },
      { text: "The innovation premium from diverse management teams is real, repeatable, and significant enough to demand strategic attention.", attr: "BCG How Diverse Leadership Teams Boost Innovation, 2018" },
    ],
    related: ["mckinsey-diversity-matters-more", "accenture-culture-equality"],
  },
  {
    id: "deloitte-inclusion-revolution",
    categories: ["profitability", "talent"],
    icon: "🔄",
    title: "The Diversity and Inclusion Revolution: Eight Powerful Truths",
    year: "2018",
    source: "Deloitte Insights",
    desc: "Organisations with inclusive cultures are eight times more likely to achieve better business outcomes and twice as likely to meet or exceed financial targets.",
    tags: ["culture", "inclusion", "business outcomes", "leadership"],
    type: "Research Report",
    url: "https://www.deloitte.com/content/dam/assets-shared/legacy/docs/insights/2022/DI_Diversity-and-inclusion-revolution.pdf",
    about: "Deloitte Insights synthesised research across thousands of organisations to identify eight transformational truths about diversity and inclusion. The study moved beyond demographic data to examine the relationship between culture, leadership behaviour, and measurable business performance. It remains one of the most widely referenced frameworks for building the business case for inclusion with senior leaders.",
    findings: [
      "Organisations with inclusive cultures are eight times more likely to achieve better business outcomes across multiple performance dimensions.",
      "Inclusive organisations are twice as likely to meet or exceed their financial targets compared with non-inclusive peers.",
      "They are six times more likely to be innovative and agile, and three times more likely to be high-performing.",
      "Inclusion is experienced most directly in day-to-day team interactions, meaning senior leaders must change team-level behaviours, not just policies.",
      "The biggest barrier to inclusion is not prejudice but apathy: leaders and managers who are not actively hostile but are simply not acting.",
    ],
    leadership: [
      "Eight times more likely to achieve better business outcomes is one of the strongest effect sizes in the inclusion research literature. Use it as your opening line in any leadership conversation.",
      "Inclusion is an everyday team experience, not a policy or programme. Use this to shift accountability from HR to line managers and to the executive team.",
      "The research identifies apathy, not active prejudice, as the primary barrier. This is important: your leadership team may need a reason to act, not a lesson in values.",
      "Three times more likely to be high-performing gives you a clear link between inclusion culture and operational excellence. Frame it as a management quality issue.",
      "Six times more likely to be innovative: if your organisation lists innovation as a strategic priority, this data makes inclusion a board-level conversation, not a compliance one.",
    ],
    quotes: [
      { text: "Inclusion is not a nice to have. It is a multiplier on every other business capability you are trying to build.", attr: "Deloitte Insights, 2018" },
      { text: "The biggest risk to inclusion is not resistance. It is indifference.", attr: "Deloitte, The Diversity and Inclusion Revolution, 2018" },
    ],
    related: ["bcg-diverse-leadership-innovation", "accenture-culture-equality"],
  },
  {
    id: "accenture-culture-equality",
    categories: ["innovation", "profitability"],
    icon: "⚡",
    title: "Getting to Equal 2019: Culture of Equality as Innovation Multiplier",
    year: "2019",
    source: "Accenture",
    desc: "A culture of equality makes workers 6 times more innovative, 3 times more likely to stay, and 8 times more likely to be satisfied with their outcomes at work.",
    tags: ["culture", "innovation", "retention", "equality"],
    type: "Research Report",
    url: "https://newsroom.accenture.com/news/2019/culture-of-equality-is-powerful-multiplier-of-workplace-innovation-new-accenture-research-finds",
    about: "Accenture surveyed more than 18,000 workers across 27 countries to understand the relationship between workplace culture, equality, and innovation. The study identified 40 specific factors that define a culture of equality and measured their combined effect on worker innovation, satisfaction, and retention. It is one of the largest global studies directly linking equality to innovation performance.",
    findings: [
      "A culture of equality makes employees six times more likely to be innovative and creative at work.",
      "Workers in a culture of equality are three times more likely to stay with their employer, directly reducing turnover costs.",
      "Employees are eight times more likely to feel highly satisfied with their work and career outcomes in equal-culture workplaces.",
      "A bold and inclusive leadership style is the most powerful single driver of a culture of equality, accounting for the largest share of its effect.",
      "Closing the gender pay gap would add 85 million workers to the global GDP, worth an estimated USD 3.4 trillion.",
    ],
    leadership: [
      "Six times more innovative is one of the most striking figures in the inclusion literature. Innovation is a strategic boardroom priority in almost every sector; use this data to put inclusion on that agenda.",
      "Three times more likely to stay: translate this into a cost figure for your organisation based on your current turnover rate and average replacement cost to make it concrete.",
      "Leadership style is the biggest lever. This is not about policy documents or diversity programmes. It is about how your leaders actually behave in the room.",
      "The global economic case reinforces the organisational one. Use the macro argument to signal that inclusion is a civilisational priority, not a corporate trend.",
      "The 40 factors Accenture identifies give you an actionable audit framework. Use them to diagnose where your culture is and what to fix first.",
    ],
    quotes: [
      { text: "A culture of equality is not just the right thing to build. It is the smart thing to build. It makes everyone more innovative.", attr: "Accenture Getting to Equal, 2019" },
      { text: "Equality is the foundation on which every other inclusion effort rests. Without it, you are building on sand.", attr: "Accenture, 2019" },
    ],
    related: ["deloitte-inclusion-revolution", "mckinsey-women-workplace"],
  },
  {
    id: "mckinsey-women-workplace",
    categories: ["retention", "talent", "profitability"],
    icon: "👩‍💼",
    title: "Women in the Workplace 2023",
    year: "2023",
    source: "McKinsey and Company and LeanIn.Org",
    desc: "Women are significantly more burned out than men and more likely to leave organisations that do not invest in inclusive culture. The annual benchmark on gender equity in corporate America and the UK.",
    tags: ["gender", "retention", "burnout", "leadership"],
    type: "Research Report",
    url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/women-in-the-workplace-2023",
    about: "Women in the Workplace is the largest ongoing study of women in corporate America and the UK, published annually by McKinsey and LeanIn.Org. The 2023 edition surveyed more than 27,000 employees and 270 organisations, tracking progress on representation, examining the barriers women face, and identifying what employers who are making progress are doing differently.",
    findings: [
      "Women remain significantly underrepresented at every level of the corporate pipeline, with the first promotion to manager being the most critical bottleneck.",
      "Women are 1.5 times more likely than men to consider leaving their jobs due to a desire for greater flexibility and a more inclusive culture.",
      "Women leaders are leaving companies at the highest rate ever recorded in the study's nine-year history, creating a leadership diversity crisis at senior levels.",
      "Companies where women see a clear path to senior leadership have significantly higher retention across all employee groups, not just women.",
      "Allies matter: organisations where men actively advocate for gender equality in meetings and decisions show faster progress than those relying on women-led networks alone.",
    ],
    leadership: [
      "Women leaders leaving at record rates is not a diversity problem. It is a talent retention crisis for the people most likely to carry your organisation's strategic priorities forward.",
      "The first promotion bottleneck is where gender parity is lost. If your organisation does not actively address promotion criteria and bias at this level, senior diversity will remain elusive regardless of hiring.",
      "Flexibility is now a retention issue, not a wellbeing benefit. Organisations that have not institutionalised flexible working are at a structural disadvantage in retaining women.",
      "Male allies are a multiplier. Equip your male leaders with specific skills and expectations for active allyship rather than passive support.",
      "The data covers both US and UK markets, making it relevant for organisations operating in both. Use the year-on-year trend data to show progress or stagnation in your sector.",
    ],
    quotes: [
      { text: "We are facing a leadership diversity crisis at the top of organisations, driven by women walking away from environments that do not work for them.", attr: "McKinsey Women in the Workplace, 2023" },
      { text: "The pipeline is not broken at entry level. It breaks at the first and second promotion, and never fully repairs.", attr: "LeanIn.Org and McKinsey, 2023" },
    ],
    related: ["gender-pay-gap", "accenture-culture-equality"],
  },
  {
    id: "cipd-inclusion-at-work",
    categories: ["productivity", "retention"],
    icon: "🇬🇧",
    title: "Inclusion at Work: Perspectives on LGBT+ Working Lives",
    year: "2022",
    source: "CIPD",
    desc: "CIPD research into the lived experiences of LGBT+ workers in the UK, showing that inclusive workplaces drive measurable improvements in wellbeing, engagement, and performance.",
    tags: ["LGBTQ+", "UK", "wellbeing", "inclusion"],
    type: "Research Report",
    url: "https://www.cipd.org/uk/knowledge/reports/inclusion-work",
    about: "The CIPD surveyed more than 2,000 workers in the UK, including an oversampled LGBT+ cohort, to understand the day-to-day experience of inclusion and exclusion at work. The report examines how workplace culture affects mental health, engagement, productivity, and career progression, and what people professionals can do to create genuinely inclusive environments.",
    findings: [
      "LGBT+ workers are significantly more likely to report poor mental health and lower job satisfaction than non-LGBT+ peers in non-inclusive workplaces.",
      "In organisations rated as inclusive by LGBT+ employees, job satisfaction is comparable with the overall workforce average, demonstrating that inclusion eliminates the gap.",
      "Disclosure rates for LGBT+ workers are higher in organisations with visible senior allies and clear non-discrimination policies.",
      "LGBT+ workers who are not out at work report spending significant cognitive energy managing their identity at the expense of their work contribution.",
      "People managers are the single most important lever: LGBT+ workers with a supportive line manager report significantly better outcomes on all dimensions measured.",
    ],
    leadership: [
      "The mental health gap between LGBT+ and non-LGBT+ workers disappears in genuinely inclusive workplaces. Frame this as a wellbeing strategy with a known intervention: culture change.",
      "Cognitive energy spent managing identity is energy not spent on work. Non-disclosure has a direct productivity cost that organisations are currently absorbing invisibly.",
      "Senior visible allies are not symbolic gestures. The data shows they drive measurable increases in disclosure and wellbeing outcomes. Ask your leaders to be visible.",
      "Line managers are the most important inclusion lever in this research. Invest in manager training and hold managers accountable for inclusion outcomes in their teams.",
      "UK-specific data makes this directly applicable for organisations operating under the Equality Act 2010. Use it to ground culture conversations in the UK context.",
    ],
    quotes: [
      { text: "Inclusion is not about who you allow through the door. It is about what happens to people once they are inside.", attr: "CIPD Inclusion at Work, 2022" },
      { text: "A line manager who creates safety makes more difference to an LGBT+ worker than any policy the organisation has written.", attr: "CIPD, 2022" },
    ],
    related: ["stonewall-equality-index", "deloitte-millennial-survey"],
  },
  {
    id: "pwc-women-in-work",
    categories: ["talent", "profitability"],
    icon: "📉",
    title: "PwC Women in Work Index 2024",
    year: "2024",
    source: "PwC",
    desc: "The UK fell in the annual PwC Women in Work Index in 2024, highlighting that progress on gender equality in employment is stalling and requires renewed strategic attention.",
    tags: ["gender", "UK", "pay equity", "workforce"],
    type: "Index Report",
    url: "https://www.pwc.co.uk/press-room/press-releases/the-uk-suffers-the-largest-annual-fall-in-ranking-on-pwc-s-women.html",
    about: "The PwC Women in Work Index benchmarks 33 OECD countries on five dimensions of female economic empowerment: female labour force participation, the gender pay gap, the female unemployment rate, female full-time employment rate, and female employment in senior roles. The 2024 edition showed the UK falling in the rankings, with the largest annual drop of any country measured, signalling a reversal of hard-won progress.",
    findings: [
      "The UK suffered the largest annual fall in the PwC Women in Work Index in 2024, reversing years of incremental progress.",
      "The UK gender pay gap remains one of the largest among comparable OECD economies, with women earning significantly less per hour than men on average.",
      "Full-time employment rates for women lag significantly behind men, driven by a lack of accessible and affordable childcare and flexible working options.",
      "Countries at the top of the index share three common features: strong parental leave policies, subsidised childcare, and active employer-side equal pay enforcement.",
      "Closing the gender employment gap in OECD countries could add trillions to global economic output, making this an economic rather than purely social priority.",
    ],
    leadership: [
      "The UK's falling index position is a macro indicator of employer-side failure. Organisations that are waiting for the market to improve are contributing to the problem and missing a first-mover opportunity.",
      "The top-performing countries share specific policy features that UK employers can replicate independently of government action: flexible working by default, equal parental leave, and pay transparency.",
      "Affordable childcare access is consistently the single biggest structural barrier to female full-time employment. Consider whether employer support for childcare is an inclusion investment with measurable return.",
      "The economic case is quantified: closing the gap adds trillions to GDP. Translate this into a sector-specific figure to make it concrete for your board.",
      "Year-on-year index data allows you to track whether your sector is contributing to progress or decline. Use it to set a directional target and report against it.",
    ],
    quotes: [
      { text: "The UK's fall in the Women in Work Index is a warning that progress on gender equality is fragile and can be reversed. It requires sustained, active effort.", attr: "PwC Women in Work Index, 2024" },
      { text: "The countries making fastest progress are not waiting for culture to change. They are changing the conditions that shape culture.", attr: "PwC, 2024" },
    ],
    related: ["gender-pay-gap", "mckinsey-women-workplace"],
  },
  {
    id: "cmi-walking-the-walk",
    categories: ["productivity", "retention"],
    icon: "🏢",
    title: "Walking the Walk: CMI Research on Inclusion in Management",
    year: "2024",
    source: "Chartered Management Institute",
    desc: "CMI research finds HR leaders have a significant EDI blindspot, underestimating how excluded many employees feel. Culture change requires manager-level accountability, not just strategy.",
    tags: ["management", "culture", "UK", "accountability"],
    type: "Research Report",
    url: "https://www.managers.org.uk/wp-content/uploads/2024/07/Walking-The-Walk-Report.pdf",
    about: "The CMI surveyed thousands of UK managers and employees to examine the gap between what organisations say about inclusion and what employees actually experience. The 2024 report found a persistent perception gap: HR and senior leaders consistently believe their organisations are more inclusive than their employees do. The research argues that inclusion requires manager-level accountability and behaviour change, not just better policies.",
    findings: [
      "HR leaders systematically overestimate how inclusive their organisation is: employees report significantly lower levels of inclusion than HR believes to be the case.",
      "Only 1 in 3 UK managers say their organisation has given them the skills and tools they need to lead inclusively.",
      "Employees who feel included are significantly more engaged, more productive, and more likely to stay than those who do not.",
      "The most excluded groups in UK workplaces are disabled employees, employees from ethnic minority backgrounds, and those aged 50 and over.",
      "Organisations that hold managers formally accountable for inclusion outcomes see measurably better results than those that treat inclusion as a voluntary leadership behaviour.",
    ],
    leadership: [
      "The perception gap between HR and employees is one of the most practically important findings in recent UK inclusion research. Do not assume your culture feels as you think it does; measure it at employee level.",
      "Two in three managers lack the skills to lead inclusively. Training and accountability are not optional extras; they are the difference between strategy and delivery.",
      "Disabled employees, ethnic minority employees, and older workers are the most excluded groups in UK workplaces. Targeted action on these groups will have the highest measurable impact.",
      "Manager accountability for inclusion outcomes changes behaviour in ways that voluntary training does not. Consider how inclusion is reflected in performance frameworks for your managers.",
      "Employee engagement, productivity, and retention all improve with inclusion. Use this to frame manager inclusion capability as a bottom-line issue, not an HR initiative.",
    ],
    quotes: [
      { text: "There is a persistent and damaging gap between what organisations believe about their inclusion and what their employees actually experience.", attr: "CMI Walking the Walk, 2024" },
      { text: "Inclusion does not happen through strategy documents. It happens through the daily choices of line managers.", attr: "Chartered Management Institute, 2024" },
    ],
    related: ["cipd-inclusion-at-work", "deloitte-inclusion-revolution"],
  },
  {
    id: "catalyst-why-dei-matters",
    categories: ["profitability", "talent"],
    icon: "🌱",
    title: "Why Diversity and Inclusion Matter: Quick Take",
    year: "2020",
    source: "Catalyst",
    desc: "Catalyst synthesises the evidence that diversity and inclusion drive financial performance, innovation, employee experience, and organisational resilience across industries.",
    tags: ["business case", "evidence synthesis", "performance", "US and UK"],
    type: "Research Summary",
    url: "https://catalyst.org/insights/2020/why-diversity-and-inclusion-matter",
    about: "Catalyst's Quick Take synthesises findings from hundreds of studies on diversity and inclusion, providing one of the most comprehensive evidence summaries available. It covers financial performance, talent attraction and retention, innovation, customer insight, and the evidence on what specific interventions actually work. Catalyst is one of the leading US-based research organisations on workplace inclusion.",
    findings: [
      "Companies with more women in leadership outperform those with fewer on every financial measure studied, including return on assets, return on equity, and total shareholder return.",
      "Diverse companies are 70% more likely to capture new markets and are better positioned to understand and serve diverse customer bases.",
      "Employees who feel included are more engaged, more innovative, and less likely to leave than those who do not, with consistent effects across industries.",
      "Unconscious bias, non-inclusive leadership behaviours, and inadequate sponsorship are the three most common barriers to inclusion across the organisations studied.",
      "The evidence is clear: inclusion is a business performance driver, not a cost centre. Organisations that treat it as compliance are systematically underinvesting.",
    ],
    leadership: [
      "Catalyst synthesises hundreds of studies, giving you a single source that covers the full breadth of the business case. Use it as a reference document in board presentations.",
      "The market capture finding is powerful in sectors undergoing demographic change: diverse teams understand diverse customers better. Use it with commercial leadership.",
      "The three barriers Catalyst identifies are actionable and concrete. Use them as a diagnostic framework to identify where your organisation is leaking inclusion value.",
      "Framing inclusion as a business performance driver rather than a compliance obligation changes the level of leadership engagement. This evidence base supports that reframing.",
      "US-origin research with broad international applicability makes this relevant for organisations with transatlantic operations or aspirations.",
    ],
    quotes: [
      { text: "Inclusion is not a social good that costs money. It is a business capability that generates it.", attr: "Catalyst, 2020" },
      { text: "The organisations that lead on inclusion are not doing so because it is required. They are doing so because they have read the evidence.", attr: "Catalyst Why Diversity and Inclusion Matter, 2020" },
    ],
    related: ["mckinsey-diversity-matters-more", "deloitte-inclusion-revolution"],
  },
  {
    id: "ilo-women-business-management",
    categories: ["profitability", "talent"],
    icon: "🌐",
    title: "Women in Business and Management: The Business Case for Change",
    year: "2019",
    source: "International Labour Organization",
    desc: "ILO survey of 13,000 organisations across 70 countries finds that 57% of companies with gender diversity policies report improved profitability and productivity.",
    tags: ["gender", "global", "profitability", "leadership"],
    type: "Research Report",
    url: "https://www.ilo.org/resource/news/women-leadership-bring-better-business-performance",
    about: "The International Labour Organization surveyed more than 13,000 enterprises across 70 countries to examine how gender diversity in management and leadership affects business performance. It is one of the broadest global studies on women in business and provides robust cross-country evidence for the relationship between female leadership representation and financial and organisational outcomes.",
    findings: [
      "57% of companies with gender diversity policies and programmes reported improved profitability and productivity, compared with those without such policies.",
      "Companies with more women in management are better at attracting and retaining talent, reducing turnover costs, and improving their employer brand.",
      "Access to a wider talent pool was cited by 60% of companies as a primary benefit of gender diversity initiatives.",
      "Gender diversity in decision-making processes leads to better risk assessment and more effective governance, particularly in sectors facing uncertainty.",
      "The business case for women in leadership is a global consensus: the findings were consistent across all regions studied, including Europe, North America, Africa, and Asia.",
    ],
    leadership: [
      "ILO data covers 70 countries and 13,000 organisations, giving it unmatched breadth. Use it to counter arguments that inclusion is culturally specific or irrelevant to your sector or geography.",
      "Access to a wider talent pool is the most-cited benefit by employers themselves. Frame your inclusion case in the language of talent strategy, not social responsibility.",
      "Better governance and risk assessment from diverse decision-making teams is particularly relevant for regulated sectors. Use it in conversations with your risk function.",
      "The consistency of results across regions makes this a robust global evidence base. If your organisation operates internationally, use it to drive consistency of approach.",
      "57% reporting improved profitability is a self-reported measure: organisations themselves are attributing performance gains to gender diversity. This is powerful endorsement from business leaders, not academics.",
    ],
    quotes: [
      { text: "Across 70 countries and every industry studied, the business case for women in leadership is the same. It improves performance.", attr: "ILO Women in Business and Management, 2019" },
      { text: "Gender diversity is not a nice addition to a strong business. It is a structural component of one.", attr: "International Labour Organization, 2019" },
    ],
    related: ["mckinsey-women-workplace", "pwc-women-in-work"],
  },
  {
    id: "kapor-tech-leavers",
    categories: ["retention", "profitability"],
    icon: "💸",
    title: "Tech Leavers Study: The Cost of Non-Inclusion",
    year: "2017",
    source: "Kapor Center",
    desc: "Unfair treatment and lack of inclusion cost the US tech industry USD 16 billion annually in voluntary employee turnover. The financial cost of a non-inclusive culture is quantified.",
    tags: ["retention", "cost", "technology", "US"],
    type: "Research Report",
    url: "https://www.kaporcenter.org/the-2017-tech-leavers-study/",
    about: "The Kapor Center surveyed more than 2,000 people who had voluntarily left jobs in the US technology sector to understand why they left and what role unfair treatment played in their decision. It was the first large-scale study to quantify the financial cost of non-inclusive workplaces in a specific sector, producing one of the most widely cited business case figures in the inclusion field.",
    findings: [
      "Unfair treatment and lack of inclusion is the primary driver of voluntary turnover among underrepresented groups in tech, cited by more than half of those who left.",
      "The total annual cost of this inclusion-driven turnover to the US tech sector is estimated at USD 16 billion.",
      "Stereotyping, being passed over for promotion, and experiencing unwanted sexual attention are the most commonly cited experiences driving departure.",
      "People who left due to unfairness are far less likely to recommend their former employer and more likely to share their experience publicly, creating reputational damage.",
      "Retention of underrepresented talent is significantly cheaper than recruitment: the average cost of replacing a technical employee is 1.5 to 2 times their annual salary.",
    ],
    leadership: [
      "USD 16 billion is the annual cost of non-inclusion in one sector in one country. Translate this proportionally to your organisation to make the cost of inaction concrete and credible.",
      "Unfair treatment is not an abstract concept in this research: it manifests as stereotyping, promotion bias, and harassment. These are specific, addressable management behaviours.",
      "Reputational damage from departing employees is a second-order cost not typically included in turnover calculations. Add it when making the business case.",
      "The study gives you a retention argument that CFOs understand: it costs significantly more to replace technical talent than to retain it through a more inclusive culture.",
      "This is US tech sector data but the principle generalises: any organisation can apply the same calculation using its own turnover figures and replacement cost data.",
    ],
    quotes: [
      { text: "Unfairness alone will cost tech companies 16 billion dollars this year. The business case for inclusion does not get more concrete than that.", attr: "Kapor Center Tech Leavers Study, 2017" },
      { text: "People do not leave companies. They leave cultures. And the bill arrives in your finance team's inbox every quarter.", attr: "Kapor Center, 2017" },
    ],
    related: ["deloitte-millennial-survey", "cmi-walking-the-walk"],
  },
  {
    id: "coqual-being-black",
    categories: ["retention", "productivity"],
    icon: "✊",
    title: "Being Black in Corporate America: An Intersectional Exploration",
    year: "2019",
    source: "Coqual (formerly Center for Talent Innovation)",
    desc: "3,700 professionals surveyed reveal that Black employees experience significantly greater barriers to advancement and feel less psychologically safe than white colleagues, with measurable impact on performance.",
    tags: ["race", "Black employees", "barriers", "US"],
    type: "Research Report",
    url: "https://coqual.org/?p=501",
    about: "Coqual surveyed 3,736 US professionals to understand the specific barriers and experiences of Black employees in corporate environments. The study used an intersectional lens to examine how race interacts with gender, class, and other dimensions to shape the corporate experience. It remains one of the most thorough examinations of anti-Black racism in corporate settings and its impact on talent and performance.",
    findings: [
      "Black professionals are significantly less likely to have sponsors: senior advocates who use their influence to create opportunities: than white professionals with equivalent qualifications.",
      "58% of Black professionals say they have felt the need to conceal parts of their identity at work, a form of covering that consumes cognitive and emotional energy.",
      "Black employees report significantly lower feelings of psychological safety in teams, which research consistently links to lower innovation and performance contribution.",
      "Despite strong ambition and work ethic, Black professionals advance more slowly through corporate hierarchies than white peers with comparable performance records.",
      "Companies with explicitly anti-racist cultures and structured advocacy programmes show measurably better outcomes for Black employees on every dimension studied.",
    ],
    leadership: [
      "Sponsorship is the most powerful intervention for Black professionals. It is not a mentoring programme; it is an active commitment by a senior person to use their influence. Ask how many of your senior leaders are actively sponsoring Black talent.",
      "Covering is invisible to leaders who are not looking for it. Create the conditions where Black employees do not need to conceal their identities by addressing the behaviours that make covering feel necessary.",
      "Psychological safety is not a wellbeing aspiration; it is a performance driver. If Black employees feel less safe, they are contributing less, and your organisation is paying the price.",
      "Ambition does not explain the advancement gap: Black professionals have equivalent or higher ambition than white peers. The gap is structural. Audit your promotion criteria and decision-making processes.",
      "US data, but directly applicable to UK and global organisations. The structural barriers this research documents exist wherever diverse talent lacks the informal networks and sponsorship that dominant groups take for granted.",
    ],
    quotes: [
      { text: "Black employees are not lacking ambition or capability. They are lacking the structural support that enables ambition and capability to convert into advancement.", attr: "Coqual Being Black in Corporate America, 2019" },
      { text: "Covering is not a personal choice. It is a rational response to an environment that signals that your authentic self is a professional liability.", attr: "Coqual, 2019" },
    ],
    related: ["parker-review", "kapor-tech-leavers"],
  },
  {
    id: "mercer-when-women-thrive",
    categories: ["talent", "profitability"],
    icon: "🔬",
    title: "When Women Thrive: Let's Get Real About Equality",
    year: "2020",
    source: "Mercer",
    desc: "Mercer's global research of 1,157 organisations finds that women are significantly underrepresented at every level above entry, and most diversity efforts are not designed to address the root causes.",
    tags: ["gender", "pipeline", "global", "data"],
    type: "Research Report",
    url: "https://www.mercer.com/en-us/insights/talent-and-transformation/diversity-equity-and-inclusion/lets-get-real-about-equality/",
    about: "Mercer's When Women Thrive programme is one of the longest-running global research initiatives on gender equity in the workplace. The 2020 edition, subtitled Let's Get Real About Equality, analysed data from 1,157 organisations across 54 countries to understand why the gender pipeline remains so persistently unequal and what specific practices distinguish organisations that are making genuine progress.",
    findings: [
      "Across all 1,157 organisations studied, the representation of women falls at every step from entry level to executive: only 23% of executives are women despite women making up 40% of entry-level employees.",
      "Fewer than half of organisations have a defined strategy to improve gender equality, despite most claiming diversity as a priority.",
      "The practices most strongly associated with progress are pay equity audits, structured promotion processes, and flexible working at senior level.",
      "Organisations where senior leaders model inclusive behaviours make faster progress than those investing primarily in training programmes.",
      "Data transparency is a key driver: organisations that share their gender pipeline data internally and with employees close the gap faster than those that do not.",
    ],
    leadership: [
      "The pipeline leak is not a pipeline problem. Women enter in large numbers and are systematically lost at every promotion point. Fix the promotion process, not the pipeline.",
      "Fewer than half of organisations with diversity as a stated priority have a strategy to deliver it. Intentions without plans are not enough; use this finding to challenge your leadership to move from rhetoric to structure.",
      "Pay equity audits are one of the highest-return interventions in this research. If your organisation has not conducted one, you do not know whether your pay practices are equitable.",
      "Senior leader behaviour is a stronger predictor of progress than training expenditure. Evaluate how inclusion shows up in your leaders' day-to-day decisions, not just their stated commitments.",
      "54-country data gives this research exceptional geographical breadth. Use it to benchmark your organisation against global and regional peers.",
    ],
    quotes: [
      { text: "We cannot fix what we are not honest about. Getting real about gender equality means confronting the data, not celebrating the aspiration.", attr: "Mercer When Women Thrive, 2020" },
      { text: "Women are not leaving the pipeline. Organisations are allowing conditions that push them out and calling it a pipeline problem.", attr: "Mercer, 2020" },
    ],
    related: ["mckinsey-women-workplace", "ilo-women-business-management"],
  },
  {
    id: "hbr-diverse-teams-smarter",
    categories: ["innovation", "productivity"],
    icon: "🧩",
    title: "Why Diverse Teams Are Smarter",
    year: "2016",
    source: "Harvard Business Review",
    desc: "Diverse teams outperform homogeneous ones on complex problem-solving and decision-making because they process facts more carefully and challenge assumptions more rigorously.",
    tags: ["decision-making", "innovation", "teams", "cognitive diversity"],
    type: "Research Summary",
    url: "https://hbr.org/2016/11/why-diverse-teams-are-smarter",
    about: "This widely cited Harvard Business Review article by Rock and Grant synthesises cognitive science and organisational research to explain the mechanism through which diverse teams outperform homogeneous ones. It moves the conversation beyond representation metrics to examine how diversity changes the quality of thinking itself, making it one of the most intellectually compelling entries in the inclusion business case literature.",
    findings: [
      "Diverse teams are more likely to examine facts and less likely to rely on groupthink or shared assumptions, producing more rigorous analysis.",
      "Cognitively diverse groups consistently outperform cognitively homogeneous groups on problem-solving tasks, even when the homogeneous group has higher average ability.",
      "The performance advantage of diverse teams is most pronounced on complex, non-routine tasks where novel thinking is required.",
      "Demographic diversity (gender, ethnicity, age) produces cognitive diversity through different lived experiences, which changes how teams process information.",
      "Discomfort is a feature, not a bug: diverse teams feel less socially comfortable but perform better because the friction forces more careful thinking.",
    ],
    leadership: [
      "Diverse teams outperform on complex, non-routine decisions: exactly the decisions your leadership team is most paid to make well. Use this to frame board diversity as a decision quality investment.",
      "The mechanism is cognitive diversity, not social comfort. This is a practical business argument: you want friction in your thinking, not harmony, when solving hard problems.",
      "Demographic diversity as a proxy for cognitive diversity means your representation strategy has a direct performance rationale, not just a moral or compliance one.",
      "High-ability homogeneous teams are outperformed by diverse teams of average ability. This is evidence that who is in the room matters more than how individually capable they are.",
      "HBR authority and readability make this one of the most accessible pieces of evidence to share with sceptical senior leaders. Use it as a first conversation starter.",
    ],
    quotes: [
      { text: "Diverse teams are not just more representative. They are more intelligent, because intelligence is not just about individual ability but about how a group thinks together.", attr: "HBR Why Diverse Teams Are Smarter, 2016" },
      { text: "If you want your leadership team to make better decisions, the evidence is unambiguous: make it more diverse.", attr: "Rock and Grant, Harvard Business Review, 2016" },
    ],
    related: ["bcg-diverse-leadership-innovation", "deloitte-inclusion-revolution"],
  },
  {
    id: "bitc-race-at-work",
    categories: ["productivity", "reputation"],
    icon: "📋",
    title: "Race at Work: Black Voices Report",
    year: "2020",
    source: "Business in the Community",
    desc: "BITC research finds Black employees in the UK face entrenched barriers to advancement despite equal or higher ambition, with direct costs to organisational performance and culture.",
    tags: ["race", "Black employees", "UK", "advancement"],
    type: "Research Report",
    url: "https://www.bitc.org.uk/report/race-at-work-black-voices-report-2020/",
    about: "Business in the Community surveyed Black employees across UK organisations to understand their specific experiences of inclusion, exclusion, and advancement. The report went beyond headline statistics to capture qualitative and quantitative evidence of the structural barriers Black employees face in UK workplaces, and what organisations with better outcomes were doing differently.",
    findings: [
      "Black employees in the UK are significantly less likely to be promoted into management than white peers with equivalent performance and tenure.",
      "Only 1 in 10 Black employees say they have a senior sponsor who actively advocates for their career advancement within their organisation.",
      "Black employees report high levels of code-switching: changing their behaviour, language, and self-presentation at work to fit a dominant culture that does not reflect their identity.",
      "Organisations with explicit race equity targets and transparent promotion data show measurably better outcomes for Black employees.",
      "The business cost of under-utilising Black talent includes lost leadership capability, reduced innovation from cognitive diversity, and damage to employer brand in an increasingly diverse talent market.",
    ],
    leadership: [
      "Only 1 in 10 Black employees has a senior sponsor. Sponsorship is not naturally distributed: it flows along lines of similarity. Create structured sponsorship programmes that deliberately disrupt this pattern.",
      "Code-switching is a form of invisible labour that disadvantages Black employees and costs organisations the authentic contribution of a significant part of their workforce.",
      "Promotion data by ethnicity is the most powerful diagnostic tool available. If your organisation does not track this, you do not know whether your systems are working equitably.",
      "Explicit race equity targets with public accountability drive change in ways that aspirational statements do not. Use this evidence to push for targets in your organisation.",
      "UK-specific data makes this directly relevant for organisations operating under the Equality Act. Use it alongside Parker Review data to present a comprehensive picture of UK race equity at work.",
    ],
    quotes: [
      { text: "Black employees are not lacking in ambition or in ability. They are working in systems that have not been designed with them in mind.", attr: "BITC Race at Work Black Voices Report, 2020" },
      { text: "If your promotion data is not ethnically disaggregated, you are flying blind on one of the most important equity questions your organisation faces.", attr: "Business in the Community, 2020" },
    ],
    related: ["parker-review", "coqual-being-black"],
  },
  {
    id: "disability-confident-uk",
    categories: ["talent", "productivity"],
    icon: "♿",
    title: "Disability Confident: Employer Survey Findings",
    year: "2022",
    source: "UK Department for Work and Pensions",
    desc: "UK government research on the Disability Confident scheme finds employers who actively recruit and retain disabled people report direct improvements in team performance, loyalty, and culture.",
    tags: ["disability", "UK", "recruitment", "retention"],
    type: "Research Report",
    url: "https://www.gov.uk/government/publications/disability-confident-survey-of-participating-employers-may-2022",
    about: "The Department for Work and Pensions surveyed Disability Confident scheme participants across thousands of UK employers to understand the business benefits of actively employing and supporting disabled people. The research provides UK-specific evidence on what organisations actually experience when they commit to disability inclusion, moving beyond the moral case to document measurable organisational benefits.",
    findings: [
      "80% of Disability Confident employers report that recruiting disabled people has helped them access a wider talent pool and fill hard-to-recruit roles.",
      "Disabled employees report higher loyalty and lower voluntary turnover than the average workforce, reducing recruitment and onboarding costs for participating employers.",
      "Employers report improved team morale and culture as a result of employing disabled people, with colleagues citing increased empathy, communication, and collaborative problem-solving.",
      "Reasonable adjustments cost significantly less than most employers expect: the majority of adjustments cost nothing at all, and the average cost is well under GBP 100.",
      "One in five people in the UK has a disability or long-term health condition, making disability the largest protected characteristic group in the workforce.",
    ],
    leadership: [
      "One in five workers has a disability. If your organisation is not proactively inclusive of disability, you are excluding a fifth of the available workforce from full contribution.",
      "The talent pool argument is the strongest employer-side driver in this research: disability inclusive employers can access candidates that non-inclusive ones cannot. Use it in talent strategy conversations.",
      "Higher loyalty and lower turnover among disabled employees is a retention dividend that rarely appears in disability inclusion business cases. Quantify it using your own turnover cost data.",
      "Adjustments cost less than fear of cost allows. The most common reason organisations do not make adjustments is financial concern; the evidence shows this concern is systematically overstated.",
      "The Disability Confident scheme provides a ready-made framework and public commitment mechanism. Use it to structure your disability inclusion commitment and signal it externally.",
    ],
    quotes: [
      { text: "Employers who dismiss disability inclusion as a cost are making a decision based on assumption, not evidence. The evidence shows the opposite.", attr: "DWP Disability Confident Survey, 2022" },
      { text: "One in five people has a disability. Any workforce strategy that does not actively include disabled people is operating at 80% of available talent.", attr: "UK Department for Work and Pensions, 2022" },
    ],
    related: ["neurodiversity-work", "cmi-walking-the-walk"],
  },
  {
    id: "cipd-race-inclusion",
    categories: ["productivity", "reputation"],
    icon: "📣",
    title: "Race Inclusion in the Workplace",
    year: "2022",
    source: "CIPD",
    desc: "CIPD research shows significant gaps between employer intent and employee experience on race inclusion in UK workplaces, with action on pay gaps, sponsorship, and manager training identified as highest-impact interventions.",
    tags: ["race", "UK", "action", "HR"],
    type: "Research Report",
    url: "https://www.cipd.org/uk/knowledge/guides/race-work-charter/",
    about: "The CIPD's research on race inclusion draws on surveys of UK HR professionals and employees to understand the current state of race equity in UK workplaces. It examines the gap between policy and practice, identifies the interventions with the strongest evidence base, and provides practical guidance for people professionals working to build genuinely inclusive cultures.",
    findings: [
      "Only 38% of UK organisations have a specific strategy for improving racial inclusion, despite most HR teams citing it as a priority.",
      "Employees from ethnic minority backgrounds consistently rate their organisations as less inclusive than their white colleagues do, mirroring the HR perception gap found in other studies.",
      "The three highest-impact interventions for race inclusion are: ethnicity pay gap reporting, structured sponsorship programmes, and mandatory manager training on anti-racist practice.",
      "Ethnic minority employees are more likely to experience microaggressions and less likely to have a trusted confidant at work, contributing to lower psychological safety.",
      "Organisations that have signed the Race at Work Charter and implemented its recommendations show measurably better outcomes on race equity metrics over time.",
    ],
    leadership: [
      "Only 38% of organisations have a race inclusion strategy. If yours does not, you are in the majority but not on the right side of the trend. Use this data to create urgency.",
      "The perception gap on race inclusion mirrors the disability and gender perception gaps: leaders believe organisations are more inclusive than employees do. Measure at employee level, not leadership level.",
      "Ethnicity pay gap reporting is voluntary in the UK but strongly associated with faster progress. Voluntary commitment signals a higher level of intent than compliance alone.",
      "Microaggressions are often invisible to those who do not experience them. Invest in manager education that is specific and concrete, not abstract.",
      "The Race at Work Charter provides a public accountability framework. Signing up is a signal; delivering against the charter's commitments is the test.",
    ],
    quotes: [
      { text: "A race inclusion strategy that exists only in the HR team has not yet become a race inclusion strategy. It becomes one when it changes what line managers do.", attr: "CIPD Race Inclusion in the Workplace, 2022" },
      { text: "Ethnic minority employees and their white colleagues are experiencing the same workplace very differently. Both sets of data are telling the truth.", attr: "CIPD, 2022" },
    ],
    related: ["bitc-race-at-work", "coqual-being-black"],
  },
  {
    id: "stonewall-global-diversity",
    categories: ["reputation", "talent"],
    icon: "🌍",
    title: "Global Diversity Report: LGBT+ Inclusion Across Borders",
    year: "2022",
    source: "Stonewall",
    desc: "Stonewall's global research documents the business and talent costs of LGBT+ exclusion in multinational organisations and the performance benefits of consistent, global inclusion standards.",
    tags: ["LGBTQ+", "global", "multinational", "belonging"],
    type: "Research Report",
    url: "https://www.stonewall.org.uk/resources/global-diversity",
    about: "Stonewall's global diversity research examines the experience of LGBT+ employees in multinational organisations and the challenge of maintaining inclusive cultures across jurisdictions with different legal frameworks. The report documents what organisations that succeed at global LGBT+ inclusion do differently and provides the business case for consistent global standards.",
    findings: [
      "LGBT+ employees in multinational organisations experience significantly different levels of inclusion depending on which country they are based in, even within the same employer.",
      "Organisations that apply consistent global inclusion standards retain LGBT+ talent at higher rates and attract stronger diverse talent pipelines across all geographies.",
      "Visible commitment from global leadership to LGBT+ inclusion, even in jurisdictions where it is politically complex, is associated with better employee outcomes.",
      "The productivity cost of non-inclusion for LGBT+ employees, including concealment and reduced contribution, is estimated at 30% of potential contribution in non-inclusive environments.",
      "Employers who lead on LGBT+ inclusion in their sector attract disproportionately strong talent and benefit from the quality premium associated with diverse teams.",
    ],
    leadership: [
      "A 30% productivity cost from concealment and non-inclusion is a significant operating cost that most finance teams do not know they are carrying. Make it visible.",
      "Global consistency matters for multinational talent: LGBT+ employees who face a patchwork of inclusion standards by geography do not feel genuinely included. Global standards signal genuine commitment.",
      "Sector leadership on LGBT+ inclusion is a talent market differentiator. Top candidates across all groups are more likely to choose employers with a clear, public inclusion commitment.",
      "The political complexity of some jurisdictions is not a reason to lower standards; it is a reason to be explicit about the standards you are committed to as an employer.",
      "Stonewall offers assessment and benchmarking tools for global employers. Use them to identify where your inclusion gaps are by geography and function.",
    ],
    quotes: [
      { text: "The cost of non-inclusion is not just to the individuals who experience it. It is to the organisations that are operating below their potential because of it.", attr: "Stonewall Global Diversity Report, 2022" },
      { text: "You cannot build a global culture of inclusion by being selective about which employees your inclusion applies to.", attr: "Stonewall, 2022" },
    ],
    related: ["stonewall-equality-index", "accenture-culture-equality"],
  },
  {
    id: "enei-benchmarking",
    categories: ["retention", "talent"],
    icon: "📏",
    title: "ENEI Talent Inclusion and Diversity Evaluation (TIDE)",
    year: "2023",
    source: "Employers Network for Equality and Inclusion",
    desc: "ENEI benchmarking data from 150 UK organisations shows that employers with the strongest inclusion scores have 42% lower voluntary turnover and significantly higher employee engagement.",
    tags: ["UK", "benchmarking", "turnover", "engagement"],
    type: "Index Report",
    url: "https://www.enei.org.uk/tide/",
    about: "The Employers Network for Equality and Inclusion runs the TIDE benchmarking tool, which allows UK organisations to measure and compare their inclusion performance across multiple dimensions. The 2023 cohort data from 150 participating organisations provides robust UK evidence on the relationship between inclusion measurement, programme investment, and measurable business outcomes.",
    findings: [
      "Organisations in the top quartile of the TIDE benchmark have 42% lower voluntary turnover than those in the bottom quartile, one of the strongest retention effects documented in UK data.",
      "Employee engagement scores are consistently and significantly higher in organisations with strong TIDE scores, with the effect holding across sectors.",
      "Regular measurement and transparent reporting of inclusion data is one of the strongest predictors of sustained progress over time.",
      "Organisations that invest in inclusion programmes but do not measure outcomes see smaller and less sustained improvements than those that combine investment with rigorous measurement.",
      "Senior leader sponsorship of inclusion measurement is the factor most strongly associated with the sustained embedding of inclusion practice over time.",
    ],
    leadership: [
      "42% lower voluntary turnover in top-quartile inclusion organisations is a concrete, measurable business return on inclusion investment. Translate this into a cost figure for your organisation.",
      "What gets measured gets managed. If your organisation is not measuring inclusion outcomes, you are managing the inputs (programmes and policies) without knowing whether they are working.",
      "The TIDE tool provides a structured external benchmark. Use it to place your organisation on a peer comparison and identify specific gaps rather than relying on internal perception.",
      "The combination of investment and measurement produces the strongest results. Programmes without data cannot be optimised; data without action cannot produce change.",
      "Senior sponsorship of measurement is the most important leadership behaviour. Ask your executive team who is responsible for tracking your inclusion metrics and what they do with the data.",
    ],
    quotes: [
      { text: "Organisations that measure inclusion are not just more accountable. They are more effective. Measurement is not a bureaucratic exercise; it is how you know what is working.", attr: "ENEI TIDE Benchmarking, 2023" },
      { text: "42% lower turnover in the top quartile. Inclusion is not a cost. It is your most underleveraged retention strategy.", attr: "Employers Network for Equality and Inclusion, 2023" },
    ],
    related: ["cmi-walking-the-walk", "catalyst-why-dei-matters"],
  },
  {
    id: "race-equality-foundation",
    categories: ["productivity", "reputation"],
    icon: "🔍",
    title: "Race Equality at Work: The Evidence for Change",
    year: "2021",
    source: "Race Equality Foundation",
    desc: "UK-focused synthesis of the evidence for race equity at work, documenting the organisational and societal costs of racial inequality and the interventions with the strongest evidence base.",
    tags: ["race", "UK", "evidence synthesis", "systemic change"],
    type: "Research Summary",
    url: "https://raceequalityfoundation.org.uk/",
    about: "The Race Equality Foundation synthesises UK and international evidence on racial inequality in employment to provide a comprehensive evidence base for practitioners and leaders. The report covers the costs of racial inequality, both to individuals and to organisations, and identifies the structural and cultural interventions that have the strongest track record of producing sustained change.",
    findings: [
      "Racial inequality at work costs the UK economy an estimated GBP 3.2 billion annually in lost productivity, underemployment, and talent underutilisation.",
      "Black and minority ethnic employees in the UK face a 10 percentage point employment gap, a significant earnings differential at every level, and lower rates of progression than white peers.",
      "Structured interventions, including transparent promotion processes, pay gap reporting by ethnicity, and active sponsorship programmes, consistently outperform unstructured diversity programmes.",
      "Psychological safety is significantly lower for ethnic minority employees in UK workplaces, with direct consequences for contribution, innovation, and retention.",
      "The organisations making the most progress on race equity share two features: explicit senior accountability for outcomes and disaggregated data that makes inequity visible.",
    ],
    leadership: [
      "GBP 3.2 billion in lost productivity annually is the macro cost of racial inequality in UK employment. The organisational share of this cost is invisible on most balance sheets but real in every turnover and promotion data set.",
      "A 10 percentage point employment gap means ethnic minority talent is systematically underemployed. This is a labour market failure with a talent strategy solution.",
      "Explicit senior accountability is the strongest predictor of progress. If no named leader in your organisation is accountable for race equity outcomes, progress will remain aspirational.",
      "Disaggregated data by ethnicity makes invisible inequities visible. If you cannot see the gap, you cannot close it. Invest in data infrastructure before investing in programmes.",
      "Psychological safety for ethnic minority employees is a performance and retention issue. Use wellbeing survey data disaggregated by ethnicity to benchmark where your organisation stands.",
    ],
    quotes: [
      { text: "Racial inequality at work is not a problem of individual prejudice. It is a problem of systems and structures that produce unequal outcomes regardless of individual intent.", attr: "Race Equality Foundation, 2021" },
      { text: "The organisations that are making progress are not the ones with the best values statements. They are the ones with the clearest accountability structures and the most honest data.", attr: "Race Equality Foundation, 2021" },
    ],
    related: ["bitc-race-at-work", "cipd-race-inclusion"],
  },
  {
    id: "adobe-diverse-audiences",
    categories: ["customer", "innovation"],
    icon: "🛍️",
    title: "Inclusive Design and Diverse Audiences: The Revenue Opportunity",
    year: "2022",
    source: "Accenture and AARP",
    desc: "Businesses that design inclusively and serve diverse audiences access a combined consumer market worth over $13 trillion annually. Most organisations are leaving significant revenue on the table.",
    tags: ["customer growth", "inclusive design", "market reach", "revenue"],
    type: "Industry Report",
    url: "https://www.accenture.com/us-en/insights/retail/inclusive-design",
    about: "This report draws on Accenture and AARP research to quantify the commercial opportunity in designing products, services and communications for underrepresented consumer groups — including disabled consumers, older adults, ethnic minority communities, and LGBTQ+ consumers. It argues that inclusive design is not a cost centre but a market expansion strategy with measurable revenue impact.",
    findings: [
      "Disabled consumers and their networks control an estimated $13 trillion in annual disposable income globally, yet most products and services are not designed with them as a primary audience.",
      "Brands perceived as genuinely inclusive are 35% more likely to appeal to diverse consumers and see higher brand loyalty from those groups.",
      "Companies that reflect diverse customer bases in their leadership and marketing outperform peers in revenue growth within those consumer segments.",
      "78% of consumers say they are more likely to purchase from a brand that demonstrates a commitment to diversity and inclusion in its communications and workforce.",
      "Organisations that fail to serve diverse audiences are increasingly at risk of market share loss as demographic shifts make majority-minority markets the norm in many sectors.",
    ],
    leadership: [
      "If your product or service is not designed for disabled consumers, you are ignoring a $13 trillion market. Frame inclusive design as product strategy, not compliance.",
      "Brand perception among diverse consumers is measurable. If inclusion is not visible in your communications and workforce, you are already losing share to competitors who have noticed.",
      "A 35% improvement in brand appeal among diverse consumers is not a marginal gain. Use this to make the case for representation in marketing and product development budgets.",
      "78% of consumers factor a brand's inclusion record into purchasing decisions. This is not a niche preference; it is mainstream consumer behaviour and it belongs in your brand and revenue strategy.",
      "Demographic change is not a future trend. In many sectors, the majority customer is already diverse. Ask your leadership team when your product, service or marketing last reflected that reality.",
    ],
    quotes: [
      { text: "Inclusive design is not a cost. It is a market expansion strategy that most organisations have not yet discovered.", attr: "Accenture Inclusive Design Report, 2022" },
      { text: "The disability market alone is larger than China's consumer economy. It is the most underserved market in the world.", attr: "AARP and Accenture, 2022" },
    ],
    related: ["mckinsey-diversity-wins", "bcg-diverse-leadership-innovation"],
  },
];
const CASE_STUDIES = [
  {
    org: "NHS Trust",
    sector: "Healthcare",
    title: "Building Psychological Safety Across Clinical Teams",
    outcome: "37% reduction in staff turnover over 18 months following EDI strategy implementation.",
    tags: ["psychological safety", "retention", "healthcare"],
  },
  {
    org: "Tech company (anonymised)",
    sector: "Technology",
    title: "Closing the Gender Pay Gap Through Structural Change",
    outcome: "Gap reduced from 18% to 9% in two years through targeted sponsorship and flexible working reform.",
    tags: ["gender pay gap", "sponsorship", "flexible working"],
  },
  {
    org: "Local Authority",
    sector: "Public Sector",
    title: "Disability Inclusion and Reasonable Adjustments at Scale",
    outcome: "Disclosure rate increased from 12% to 31% following introduction of Disability Confident Champion programme.",
    tags: ["disability", "disclosure", "reasonable adjustments"],
  },
];

const DOWNLOADS = [
  {
    icon: "📋",
    title: "Business Case for Inclusion: Template",
    type: "Word document",
    desc: "A structured template for building a board-ready business case for your EDI strategy, with prompts, data placeholders and example language.",
    free: true,
  },
  {
    icon: "📊",
    title: "EDI Data Dashboard Template",
    type: "Excel spreadsheet",
    desc: "Track and visualise your key EDI metrics across recruitment, retention, pay, progression and engagement in one place.",
    free: false,
  },
  {
    icon: "✅",
    title: "Inclusion Audit Checklist",
    type: "PDF",
    desc: "A 60-point checklist for auditing inclusion across seven organisational areas, with a scoring framework and priority matrix.",
    free: true,
  },
  {
    icon: "📝",
    title: "EDI Strategy One-Pager Template",
    type: "Word document",
    desc: "A one-page summary template for communicating your EDI strategy to senior stakeholders, with guided prompts.",
    free: false,
  },
];

const SECTORS = [
  "Healthcare", "Education", "Financial Services", "Technology",
  "Public Sector", "Charity and Third Sector", "Retail and Consumer",
  "Professional Services", "Creative Industries", "Manufacturing",
];

const ORG_SIZES = [
  "Under 50 employees", "50 to 250 employees",
  "250 to 1,000 employees", "Over 1,000 employees",
];

const MAIN_CHALLENGES = [
  "Making the case for EDI budget",
  "Improving retention and reducing turnover",
  "Preparing for a board or trustee review",
  "Responding to a specific incident or complaint",
  "Building our first EDI strategy",
];

const PITCH_TARGETS = [
  "CEO or Executive Team",
  "CFO or Finance Director",
  "HR Director or People Team",
  "Board of Trustees or Non-Executives",
  "Line Managers",
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */

type Tab = "research" | "evidence-builder" | "cases" | "downloads";

function EvidencePageInner() {
  const [activeTab, setActiveTab] = useState<Tab>("research");
  const [search, setSearch] = useState("");

  // Research brief state
  const [activeBrief, setActiveBrief] = useState<string | null>(null);
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [tailorSector, setTailorSector] = useState("");
  const [tailorSize, setTailorSize] = useState("");
  const [tailorChallenge, setTailorChallenge] = useState("");
  const [tailoredOutput, setTailoredOutput] = useState("");
  const [tailorLoading, setTailorLoading] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  // Evidence builder state
  const [ebArgument, setEbArgument] = useState("");
  const [ebSector, setEbSector] = useState("");
  const [ebSize, setEbSize] = useState("");
  const [ebPitchTarget, setEbPitchTarget] = useState("");
  const [ebOutput, setEbOutput] = useState("");
  const [ebLoading, setEbLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialise from URL param; updates when URL changes
  const activeCategory = searchParams.get("category");

  function setActiveCategory(key: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (key) {
      params.set("category", key);
    } else {
      params.delete("category");
    }
    router.push(`/dashboard/evidence?${params.toString()}`, { scroll: false });
  }

  const currentBrief = RESEARCH_REPORTS.find((r) => r.id === activeBrief) ?? null;
  const relatedBriefs = currentBrief
    ? currentBrief.related.map((id) => RESEARCH_REPORTS.find((r) => r.id === id)).filter(Boolean)
    : [];

  const filteredResearch = useMemo(() => {
    const q = search.toLowerCase();
    let results = RESEARCH_REPORTS;
    if (activeCategory) {
      results = results.filter((r) => r.categories?.includes(activeCategory));
    }
    if (!q) return results;
    return results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search, activeCategory]);

  const filteredCases = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return CASE_STUDIES;
    return CASE_STUDIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.outcome.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredDownloads = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return DOWNLOADS;
    return DOWNLOADS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q)
    );
  }, [search]);

  function handleTailor() {
    if (!tailorSector || !tailorSize) return;
    setTailorLoading(true);
    setTailoredOutput("");
    setTimeout(() => {
      const brief = currentBrief!;
      const challengeText = tailorChallenge ? ` Your stated challenge is: ${tailorChallenge.toLowerCase()}.` : "";
      const output = `For a ${tailorSize.toLowerCase()} organisation in the ${tailorSector} sector, the ${brief.title} offers particularly relevant evidence.${challengeText} The finding that ${brief.findings[0].toLowerCase()} translates directly into your context: in ${tailorSector}, where talent competition and retention pressures are significant, this data provides a quantified argument for investment in inclusion. Specifically, you can point to the ${brief.findings[1].toLowerCase()} as evidence that the financial case is not theoretical. We recommend opening your board presentation with the headline statistic, contextualising it to your sector, and following with the three actions most relevant to your current priorities from the "Take this to your leadership" section of this brief.`;
      setTailoredOutput(output);
      setTailorLoading(false);
    }, 1800);
  }

  function handleEvidenceBuilder() {
    if (!ebArgument || !ebSector || !ebPitchTarget) return;
    setEbLoading(true);
    setEbOutput("");
    setTimeout(() => {
      const relevant = RESEARCH_REPORTS.filter(
        (r) =>
          r.tags.some((t) =>
            ebArgument.toLowerCase().includes(t.toLowerCase())
          ) || Math.random() > 0.4
      ).slice(0, 3);
      const output = `Business Case Argument: ${ebArgument}\n\nFor a ${ebSector} organisation presenting to ${ebPitchTarget}, the evidence below supports your argument:\n\n${relevant
        .map(
          (r, i) =>
            `${i + 1}. ${r.title} (${r.source}, ${r.year})\n   "${r.findings[0]}"\n   Recommended framing: ${r.leadership[0]}`
        )
        .join(
          "\n\n"
        )}\n\nSuggested opening line for your presentation:\n"The evidence base for inclusion as a business performance driver is now substantial. ${relevant[0].findings[0]} This is not a question of values alone — it is a question of competitive performance."`;
      setEbOutput(output);
      setEbLoading(false);
    }, 2200);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid var(--gray-border)",
    fontFamily: "var(--font-body)",
    fontSize: "0.925rem",
    background: "var(--white)",
    color: "var(--charcoal)",
    outline: "none",
    boxSizing: "border-box",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none" as const,
    cursor: "pointer",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "0.8rem",
    color: "var(--charcoal)",
    marginBottom: "0.5rem",
    display: "block",
    letterSpacing: "0.04em",
  };

  /* ── RESEARCH BRIEF VIEW ─────────────────────────────────────────────── */
  if (activeBrief && currentBrief) {
    return (
      <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
        <PlatformNav />

        {/* Breadcrumb */}
        <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/dashboard/evidence" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
            ← Make the Case
          </Link>
          <span style={{ color: "var(--gray-border)" }}>|</span>
          <button onClick={() => { setActiveBrief(null); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); }} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", background: "none", border: "none", cursor: "pointer" }}>
            ← Research and Data
          </button>
          <span style={{ color: "var(--gray-border)" }}>|</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--sage-dark)" }}>{currentBrief.title}</span>
        </nav>

        <main style={{ maxWidth: "820px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{currentBrief.type}</span>
              <span className="badge badge-cream" style={{ fontSize: "0.65rem" }}>{currentBrief.year}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
              {currentBrief.title}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.75rem" }}>
              Published by {currentBrief.source}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-soft)", lineHeight: 1.7 }}>
              {currentBrief.desc}
            </p>
          </div>

          {/* About */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              About this research
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.8, margin: 0 }}>
              {currentBrief.about}
            </p>
          </section>

          {/* Findings */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              What the research found
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {currentBrief.findings.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--white)", background: "var(--sage-dark)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Take to leadership */}
          <section style={{ background: "linear-gradient(135deg, #1E3624 0%, #2C4A31 100%)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--white)", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Take this to your leadership
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem" }}>
              Five arguments to translate this evidence into language your senior leadership will respond to.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {currentBrief.leadership.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", background: "var(--white)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quotes */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Voices from the research
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {currentBrief.quotes.map((q, i) => (
                <div key={i} style={{ borderLeft: "4px solid var(--sage-dark)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal)", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 0.5rem 0" }}>
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--sage-dark)", margin: 0 }}>
                    {q.attr}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Source */}
          <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Source
            </h2>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ background: "var(--sage-xlight)", borderRadius: "12px", width: "80px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0 }}>
                {currentBrief.icon}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{currentBrief.title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.75rem" }}>{currentBrief.source} · {currentBrief.year}</div>
                <a href={currentBrief.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem", display: "inline-block", textDecoration: "none" }}>
                  Read the full report →
                </a>
              </div>
            </div>
          </section>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button
              onClick={() => { setShowTailorModal(true); setShowRelated(false); }}
              className="btn-primary"
              style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}
            >
              ✨ Tailor this for my organisation
            </button>
            <button
              onClick={() => { setShowRelated(!showRelated); setShowTailorModal(false); }}
              className="btn-secondary"
              style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}
            >
              📚 Read more research like this
            </button>
          </div>

          {/* Tailor modal panel */}
          {showTailorModal && (
            <section style={{ background: "var(--white)", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem", border: "2px solid var(--sage-dark)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                    Tailor this for my organisation
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)" }}>
                    Tell us about your organisation and we will reframe this research in your context.
                  </p>
                </div>
                <button onClick={() => { setShowTailorModal(false); setTailoredOutput(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--gray-soft)", padding: "0.25rem" }}>✕</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Your sector</label>
                  <select value={tailorSector} onChange={(e) => setTailorSector(e.target.value)} style={selectStyle}>
                    <option value="">Select sector</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Organisation size</label>
                  <select value={tailorSize} onChange={(e) => setTailorSize(e.target.value)} style={selectStyle}>
                    <option value="">Select size</option>
                    {ORG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Main challenge (optional)</label>
                  <select value={tailorChallenge} onChange={(e) => setTailorChallenge(e.target.value)} style={selectStyle}>
                    <option value="">Select a challenge</option>
                    {MAIN_CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={handleTailor}
                disabled={!tailorSector || !tailorSize || tailorLoading}
                className="btn-primary"
                style={{ fontSize: "0.875rem", padding: "0.75rem 1.5rem", opacity: (!tailorSector || !tailorSize) ? 0.5 : 1, cursor: (!tailorSector || !tailorSize) ? "not-allowed" : "pointer" }}
              >
                {tailorLoading ? "Building your summary…" : "Generate my tailored summary →"}
              </button>
              {tailoredOutput && (
                <div style={{ marginTop: "1.5rem", background: "var(--sage-xlight)", borderRadius: "12px", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                    Your tailored summary
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", color: "var(--charcoal)", lineHeight: 1.8, margin: 0 }}>
                    {tailoredOutput}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Related research */}
          {showRelated && relatedBriefs.length > 0 && (
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Read more research like this
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {relatedBriefs.map((r) => r && (
                  <div key={r.id} className="card" style={{ cursor: "pointer" }} onClick={() => { setActiveBrief(r.id); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
                      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                        <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                        <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 0.75rem 0" }}>{r.desc}</p>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--sage-dark)" }}>Read summary →</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
        <BottomBanner
          resourceTitle="Request evidence on a topic"
          resourceBody="Is there a topic where you need stronger evidence to make the case? Tell us what you are working on and we will source and add the most relevant research to the library."
          resourcePlaceholder="What topic do you need evidence for? Include any context about your sector or audience if it helps."
        />
      </div>
    );
  }

  /* ── MAIN LISTING VIEW ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Make the Case</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            Make the Case
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1.25rem" }}>
            Evidence, data, case studies and resources to build a compelling business case for inclusion.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", marginBottom: "1.5rem", maxWidth: "560px" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.95rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search by keyword, topic or source…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search the library"
              style={{ width: "100%", padding: "0.8rem 2.75rem 0.8rem 2.75rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.95rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1rem", padding: "0.2rem" }}>✕</button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--gray-border)", overflowX: "auto" }}>
            {([
              { key: "research", label: "📊 Research and Data" },
              { key: "evidence-builder", label: "🧩 Evidence Builder" },
              { key: "cases", label: "🏢 Case Studies" },
              { key: "downloads", label: "📁 Templates and Resources" },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.5rem", background: "none", border: "none", cursor: "pointer", color: activeTab === tab.key ? "var(--sage-dark)" : "var(--gray-soft)", borderBottom: activeTab === tab.key ? "2px solid var(--sage-dark)" : "2px solid transparent", marginBottom: "-2px", whiteSpace: "nowrap" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* RESEARCH AND DATA */}
        {activeTab === "research" && (
          <>
            {/* ── TILE LANDING (no category selected, no search active) ── */}
            {!activeCategory && !search && (
              <>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                  Choose a business outcome to explore the evidence, or use the search bar above to find a specific report.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                    {CATEGORIES.slice(0, 4).map((cat) => {
                      const count = RESEARCH_REPORTS.filter((r) => r.categories?.includes(cat.key)).length;
                      return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      style={{
                        textAlign: "center",
                        background: "linear-gradient(160deg, #f0f6f1 0%, #daeadc 60%, #c8deca 100%)",
                        border: "2.5px solid #8faf93",
                        borderRadius: "16px",
                        padding: "3rem 1.75rem 2.75rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 2px 8px rgba(74,99,71,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
                      }}
                    >
                      <div style={{ fontSize: "2.75rem", marginBottom: "0.875rem", lineHeight: 1 }}>{cat.icon}</div>
                      <div style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--charcoal)",
                        lineHeight: 1.35,
                        marginBottom: "0.75rem",
                        textAlign: "center",
                      }}>{cat.label}</div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--sage-dark)",
                        marginTop: "auto",
                      }}>{count} {count === 1 ? "report" : "reports"}</div>
                    </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", width: "75%", margin: "0 auto" }}>
                    {CATEGORIES.slice(4).map((cat) => {
                      const count = RESEARCH_REPORTS.filter((r) => r.categories?.includes(cat.key)).length;
                      return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      style={{
                        textAlign: "center",
                        background: "linear-gradient(160deg, #f0f6f1 0%, #daeadc 60%, #c8deca 100%)",
                        border: "2.5px solid #8faf93",
                        borderRadius: "16px",
                        padding: "3rem 1.75rem 2.75rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 2px 8px rgba(74,99,71,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
                      }}
                    >
                      <div style={{ fontSize: "2.75rem", marginBottom: "0.875rem", lineHeight: 1 }}>{cat.icon}</div>
                      <div style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--charcoal)",
                        lineHeight: 1.35,
                        marginBottom: "0.75rem",
                        textAlign: "center",
                      }}>{cat.label}</div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--sage-dark)",
                        marginTop: "auto",
                      }}>{count} {count === 1 ? "report" : "reports"}</div>
                    </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* ── CATEGORY VIEW (category selected) ── */}
            {activeCategory && !search && (
              <>
                {/* Back link */}
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--sage-dark)",
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: "1.5rem",
                  }}
                >
                  ← All categories
                </button>
                <div style={{ marginBottom: "1.75rem" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                    {CATEGORIES.find((c) => c.key === activeCategory)?.icon}{" "}
                    {CATEGORIES.find((c) => c.key === activeCategory)?.label}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem" }}>
                    {filteredResearch.length} {filteredResearch.length === 1 ? "report" : "reports"}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
                  {filteredResearch.map((r) => (
                    <div key={r.id} className="card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{r.icon}</span>
                        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                          <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                          <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{r.desc}</p>
                      <button
                        className="btn-secondary"
                        style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                        onClick={() => { setActiveBrief(r.id); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        Read summary →
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── SEARCH RESULTS (search active, ignores category) ── */}
            {search && (
              <>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                  {filteredResearch.length === 0
                    ? "No reports match your search."
                    : `${filteredResearch.length} ${filteredResearch.length === 1 ? "report" : "reports"} found`}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
                  {filteredResearch.map((r) => (
                    <div key={r.id} className="card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "1.75rem" }} aria-hidden="true">{r.icon}</span>
                        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                          <span className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{r.type}</span>
                          <span className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{r.year}</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{r.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", fontWeight: 600, marginBottom: "0.625rem" }}>{r.source}</div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>{r.desc}</p>
                      <button
                        className="btn-secondary"
                        style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                        onClick={() => { setActiveBrief(r.id); setShowRelated(false); setShowTailorModal(false); setTailoredOutput(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        Read summary →
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

                {/* EVIDENCE BUILDER */}
        {activeTab === "evidence-builder" && (
          <>
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                Evidence Builder
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.925rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Tell us about the argument you are trying to make and who you are making it to. We will surface the most relevant evidence from our research library and give you a structured argument you can take straight into a presentation or document.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
                <div>
                  <label style={labelStyle}>What argument are you trying to make?</label>
                  <textarea
                    value={ebArgument}
                    onChange={(e) => setEbArgument(e.target.value)}
                    placeholder="For example: I need to justify our EDI strategy to the board, or I want to make the case for a pay equity audit to our CFO."
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>What sector are you in?</label>
                    <select value={ebSector} onChange={(e) => setEbSector(e.target.value)} style={selectStyle}>
                      <option value="">Select sector</option>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Organisation size</label>
                    <select value={ebSize} onChange={(e) => setEbSize(e.target.value)} style={selectStyle}>
                      <option value="">Select size</option>
                      {ORG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Who are you presenting to?</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                    {PITCH_TARGETS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setEbPitchTarget(t)}
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "1.5px solid",
                          borderColor: ebPitchTarget === t ? "var(--sage-dark)" : "var(--gray-border)",
                          background: ebPitchTarget === t ? "var(--sage-dark)" : "var(--white)",
                          color: ebPitchTarget === t ? "var(--white)" : "var(--charcoal)",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleEvidenceBuilder}
                disabled={!ebArgument || !ebSector || !ebPitchTarget || ebLoading}
                className="btn-primary"
                style={{ fontSize: "0.925rem", padding: "0.875rem 2rem", opacity: (!ebArgument || !ebSector || !ebPitchTarget) ? 0.5 : 1, cursor: (!ebArgument || !ebSector || !ebPitchTarget) ? "not-allowed" : "pointer" }}
              >
                {ebLoading ? "Building your argument…" : "Build my evidence argument →"}
              </button>

              {ebOutput && (
                <div style={{ marginTop: "2rem", background: "var(--white)", borderRadius: "16px", padding: "2rem", border: "2px solid var(--sage-dark)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    Your evidence argument
                  </div>
                  <pre style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>
                    {ebOutput}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}

        {/* CASE STUDIES */}
        {activeTab === "cases" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Real examples of inclusion driving measurable change for sharing with leadership, informing strategy, or as inspiration.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {filteredCases.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No case studies match your search.</p>}
              {filteredCases.map((c) => (
                <div key={c.title} className="card">
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "280px" }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                        <span className="badge badge-cream" style={{ fontSize: "0.65rem" }}>{c.sector}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{c.org}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>{c.title}</h3>
                      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                        {c.tags.map((t) => <span key={t} className="badge badge-sage" style={{ fontSize: "0.6rem" }}>{t}</span>)}
                      </div>
                    </div>
                    <div style={{ background: "var(--sage-xlight)", borderRadius: "10px", padding: "1.25rem", minWidth: "240px", flex: "0 0 auto" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Key outcome</div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.6, margin: 0 }}>{c.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOWNLOADS */}
        {activeTab === "downloads" && (
          <>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
              Ready-to-use documents and templates to download and adapt for your organisation.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {filteredDownloads.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", gridColumn: "1/-1" }}>No templates match your search.</p>}
              {filteredDownloads.map((d) => (
                <div key={d.title} className="card" style={{ position: "relative" }}>
                  {d.free && (
                    <span className="badge badge-sage" style={{ fontSize: "0.6rem", position: "absolute", top: "1rem", right: "1rem" }}>Free</span>
                  )}
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }} aria-hidden="true">{d.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>{d.title}</div>
                  <span className="badge badge-cream" style={{ fontSize: "0.6rem", marginBottom: "0.75rem", display: "inline-block" }}>{d.type}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>{d.desc}</p>
                  <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", width: "100%" }}>
                    Download →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
      <BottomBanner
          resourceTitle="Request evidence on a topic"
          resourceBody="Is there a topic where you need stronger evidence to make the case? Tell us what you are working on and we will source and add the most relevant research to the library."
          resourcePlaceholder="What topic do you need evidence for? Include any context about your sector or audience if it helps."
        />
    </div>
  );
}

export default function EvidencePage() {
  return (
    <Suspense>
      <EvidencePageInner />
    </Suspense>
  );
}
