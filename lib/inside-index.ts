// Snapshot of the hub's research, case studies, videos and Inclusion AI tools,
// used by the See What's Inside for You tool on the About the Platform page.
// Generated from the dashboard pages; regenerate when hub content changes.

export type InsideKind = "lesson" | "video" | "ai" | "research" | "case" | "resource";

export type InsideItem = {
  kind: InsideKind;
  id: string;
  title: string;
  desc: string;
  meta: string;
  takeaway: string;
  keywords: string;
  about?: string;
  points?: string[];
  url?: string;
  source?: string;
  file?: string;
};

export const INSIDE_ITEMS: InsideItem[] = [
 {
  "kind": "research",
  "id": "mckinsey-diversity-wins",
  "title": "McKinsey Diversity Wins Report",
  "desc": "Companies in the top quartile for gender diversity are 25% more likely to have above-average profitability. The data on ethnic and cultural diversity is even stronger.",
  "meta": "McKinsey and Company, 2023",
  "takeaway": "Companies in the top quartile for gender diversity on executive teams are 25% more likely to achieve above-average profitability than peer companies.",
  "keywords": "mckinsey diversity wins report companies in the top quartile for gender diversity are 25% more likely to have above-average profitability. the data on ethnic and cultural diversity is even stronger. data business case diversity profitability profitability innovation mckinsey's diversity wins report analysed data from more than 1,000 large companies across 15 countries. it set out to examine the relationship between leadership diversity and financial performance, moving beyond earlier correlation findings to look at what inclusion actually requires and what most organisations still get wrong.",
  "about": "McKinsey's Diversity Wins report analysed data from more than 1,000 large companies across 15 countries. It set out to examine the relationship between leadership diversity and financial performance, moving beyond earlier correlation findings to look at what inclusion actually requires and what most organisations still get wrong.",
  "points": [
   "Companies in the top quartile for gender diversity on executive teams are 25% more likely to achieve above-average profitability than peer companies.",
   "Companies in the top quartile for ethnic and cultural diversity outperform those in the bottom quartile by 36% in profitability.",
   "Despite progress, only 1 in 20 companies globally has closed the representation gap at senior leadership level.",
   "Inclusion has a stronger direct link to financial performance than diversity representation alone. Diverse teams without inclusive cultures do not outperform."
  ],
  "url": "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters"
 },
 {
  "kind": "research",
  "id": "deloitte-millennial-survey",
  "title": "Deloitte Millennial Survey: Inclusion at Work",
  "desc": "76% of respondents consider diversity and inclusion important when evaluating prospective employers. A key driver for attraction and retention.",
  "meta": "Deloitte, 2022",
  "takeaway": "76% of respondents said a diverse and inclusive workplace was an important factor when choosing an employer.",
  "keywords": "deloitte millennial survey: inclusion at work 76% of respondents consider diversity and inclusion important when evaluating prospective employers. a key driver for attraction and retention. talent retention millennial attraction talent retention deloitte surveyed more than 23,000 millennials and gen z workers across 46 countries to understand what they look for in employers and what drives their loyalty, wellbeing and performance at work. inclusion and belonging emerged as central to every dimension of the employment experience.",
  "about": "Deloitte surveyed more than 23,000 millennials and Gen Z workers across 46 countries to understand what they look for in employers and what drives their loyalty, wellbeing and performance at work. Inclusion and belonging emerged as central to every dimension of the employment experience.",
  "points": [
   "76% of respondents said a diverse and inclusive workplace was an important factor when choosing an employer.",
   "Millennials who feel their workplace is highly inclusive are 1.8 times more likely to feel highly engaged.",
   "Nearly half of respondents said they had left a previous employer partly due to a lack of inclusion or belonging.",
   "Gen Z workers are more likely to speak out about discrimination than any previous generation and expect employers to act."
  ],
  "url": "https://www.deloitte.com/global/en/issues/work/content/genzmillennialsurvey.html"
 },
 {
  "kind": "research",
  "id": "gender-pay-gap",
  "title": "Gender Pay Gap Evidence Base",
  "desc": "Comprehensive look at the UK gender pay gap drivers, sector breakdowns, and interventions with the strongest evidence base.",
  "meta": "CIPD and Fawcett Society, 2023",
  "takeaway": "The UK median gender pay gap stands at 14.9% in favour of men, but rises to 35% or more in some sectors including financial services.",
  "keywords": "gender pay gap evidence base comprehensive look at the uk gender pay gap drivers, sector breakdowns, and interventions with the strongest evidence base. gender pay gap uk data pay equity talent retention profitability this joint report from the cipd and the fawcett society draws on uk employer data, academic evidence, and policy analysis to map what is actually driving the gender pay gap in different sectors and what interventions have the strongest evidence base for closing it. it is one of the most practically useful evidence resources for uk employers.",
  "about": "This joint report from the CIPD and the Fawcett Society draws on UK employer data, academic evidence, and policy analysis to map what is actually driving the gender pay gap in different sectors and what interventions have the strongest evidence base for closing it. It is one of the most practically useful evidence resources for UK employers.",
  "points": [
   "The UK median gender pay gap stands at 14.9% in favour of men, but rises to 35% or more in some sectors including financial services.",
   "Occupational segregation accounts for the largest share of the gap: women are disproportionately concentrated in lower-paid roles and sectors.",
   "Flexible working policies that apply equally to men and women reduce the gap more than women-only interventions.",
   "Organisations that publish narrative pay gap reports alongside their statutory data close the gap faster than those that publish numbers alone."
  ],
  "url": "https://www.fawcettsociety.org.uk/"
 },
 {
  "kind": "research",
  "id": "parker-review",
  "title": "Parker Review: Ethnic Diversity in Boardrooms",
  "desc": "Annual tracking of ethnic representation in FTSE 100 and 250 boardrooms with targets, progress, and sector comparison.",
  "meta": "Parker Review Committee, 2022",
  "takeaway": "As of 2022, 96% of FTSE 100 companies had met the target of at least one director from an ethnic minority background, up from 74% in 2020.",
  "keywords": "parker review: ethnic diversity in boardrooms annual tracking of ethnic representation in ftse 100 and 250 boardrooms with targets, progress, and sector comparison. ethnicity leadership board ftse profitability reputation the parker review is an annual government-commissioned report tracking ethnic diversity on the boards of ftse 100 and ftse 250 companies. it sets targets, measures progress, and provides sector-level breakdowns. it is the primary evidence base for conversations about ethnic representation at the most senior levels of uk business.",
  "about": "The Parker Review is an annual government-commissioned report tracking ethnic diversity on the boards of FTSE 100 and FTSE 250 companies. It sets targets, measures progress, and provides sector-level breakdowns. It is the primary evidence base for conversations about ethnic representation at the most senior levels of UK business.",
  "points": [
   "As of 2022, 96% of FTSE 100 companies had met the target of at least one director from an ethnic minority background, up from 74% in 2020.",
   "Progress in the FTSE 250 is significantly slower, with 44% of companies yet to meet the one director target.",
   "Only 16 of the FTSE 100 companies have ethnic minority representation at Chair or CEO level.",
   "The technology and financial services sectors show the highest representation; retail and consumer goods lag behind."
  ],
  "url": "https://parkerreview.co.uk/"
 },
 {
  "kind": "research",
  "id": "neurodiversity-work",
  "title": "Neurodiversity at Work: Business Benefits",
  "desc": "Evidence review on the performance and innovation benefits of building neurodiverse teams, with practical employer guidance.",
  "meta": "ACAS and British Dyslexia Association, 2023",
  "takeaway": "Neurodiverse employees are significantly over-represented in roles requiring pattern recognition, systems thinking, and creative problem-solving.",
  "keywords": "neurodiversity at work: business benefits evidence review on the performance and innovation benefits of building neurodiverse teams, with practical employer guidance. neurodiversity disability inclusion innovation innovation productivity this evidence review draws together research from neuroscience, occupational psychology, and employer practice to examine the business benefits of neurodiverse teams. it covers what neurodiversity is, what barriers neurodiverse employees face, and what adjustments and practices generate the strongest outcomes for both individuals and organisations.",
  "about": "This evidence review draws together research from neuroscience, occupational psychology, and employer practice to examine the business benefits of neurodiverse teams. It covers what neurodiversity is, what barriers neurodiverse employees face, and what adjustments and practices generate the strongest outcomes for both individuals and organisations.",
  "points": [
   "Neurodiverse employees are significantly over-represented in roles requiring pattern recognition, systems thinking, and creative problem-solving.",
   "Companies that actively support neurodiversity report higher innovation output and broader cognitive diversity in decision-making.",
   "Up to 20% of the workforce may be neurodivergent, making this one of the largest underserved talent groups in most organisations.",
   "The most common barrier is disclosure: 50% of neurodiverse employees do not disclose at work due to fear of stigma or disadvantage."
  ],
  "url": "https://www.acas.org.uk/neurodiversity-at-work"
 },
 {
  "kind": "research",
  "id": "stonewall-equality-index",
  "title": "Stonewall Workplace Equality Index 2023",
  "desc": "Findings from 300+ employers on LGBTQ+ inclusion at work and what drives belonging, performance, and retention.",
  "meta": "Stonewall, 2023",
  "takeaway": "Only 30% of LGBTQ+ employees are fully out to all colleagues, rising to 60% in the top-ranked employers.",
  "keywords": "stonewall workplace equality index 2023 findings from 300+ employers on lgbtq+ inclusion at work and what drives belonging, performance, and retention. lgbtq+ belonging measurement retention retention productivity the stonewall workplace equality index draws on submissions from more than 300 employers and surveys of lgbtq+ employees to track the state of lgbtq+ inclusion in uk workplaces. it provides sector benchmarks, employer rankings, and detailed evidence on what drives — and what undermines — genuine inclusion for lgbtq+ people at work.",
  "about": "The Stonewall Workplace Equality Index draws on submissions from more than 300 employers and surveys of LGBTQ+ employees to track the state of LGBTQ+ inclusion in UK workplaces. It provides sector benchmarks, employer rankings, and detailed evidence on what drives — and what undermines — genuine inclusion for LGBTQ+ people at work.",
  "points": [
   "Only 30% of LGBTQ+ employees are fully out to all colleagues, rising to 60% in the top-ranked employers.",
   "LGBTQ+ employees in inclusive workplaces are twice as likely to feel able to bring their full selves to work and significantly more likely to stay.",
   "Trans employees report the highest levels of exclusion, with 1 in 3 having hidden or disguised their identity at work in the past year.",
   "Visible LGBTQ+ role models at senior level are the single strongest predictor of inclusion climate for LGBTQ+ employees."
  ],
  "url": "https://www.stonewall.org.uk/workplace-equality-index"
 },
 {
  "kind": "research",
  "id": "mckinsey-diversity-matters-more",
  "title": "Diversity Matters Even More: The Case for Holistic Impact",
  "desc": "Companies in the top quartile for gender diversity are 39% more likely to outperform financially. The latest McKinsey research shows the business case for inclusion is stronger than ever.",
  "meta": "McKinsey and Company, 2023",
  "takeaway": "Companies in the top quartile for gender diversity on executive teams are 39% more likely to outperform financially compared with the bottom quartile.",
  "keywords": "diversity matters even more: the case for holistic impact companies in the top quartile for gender diversity are 39% more likely to outperform financially. the latest mckinsey research shows the business case for inclusion is stronger than ever. business case financial performance gender ethnicity profitability innovation mckinsey's most comprehensive diversity study to date, drawing on data from more than 1,200 companies across 23 countries. it expands the previous diversity wins research to examine holistic impact: how diversity affects not just financial returns but innovation, talent, resilience, and societal value creation. the research confirms that the business case for inclusion has never been stronger.",
  "about": "McKinsey's most comprehensive diversity study to date, drawing on data from more than 1,200 companies across 23 countries. It expands the previous Diversity Wins research to examine holistic impact: how diversity affects not just financial returns but innovation, talent, resilience, and societal value creation. The research confirms that the business case for inclusion has never been stronger.",
  "points": [
   "Companies in the top quartile for gender diversity on executive teams are 39% more likely to outperform financially compared with the bottom quartile.",
   "The likelihood of outperformance linked to ethnic diversity has increased to 39% from 36% in the previous study, showing a strengthening trend.",
   "Organisations with greater gender and ethnic diversity in leadership are more likely to create better products, make better decisions, and attract stronger talent.",
   "The relationship between inclusion and financial performance is not a correlation but causal: companies that actively improve inclusion see measurable performance lifts."
  ],
  "url": "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact"
 },
 {
  "kind": "research",
  "id": "bcg-diverse-leadership-innovation",
  "title": "How Diverse Leadership Teams Boost Innovation",
  "desc": "Companies with above-average diversity on their management teams report innovation revenue 19 percentage points higher than companies with below-average leadership diversity.",
  "meta": "Boston Consulting Group, 2018",
  "takeaway": "Companies with above-average diversity on management teams report innovation revenue 19 percentage points higher than companies with below-average diversity.",
  "keywords": "how diverse leadership teams boost innovation companies with above-average diversity on their management teams report innovation revenue 19 percentage points higher than companies with below-average leadership diversity. innovation leadership business case revenue profitability innovation bcg surveyed more than 1,700 companies across eight countries to examine the relationship between management team diversity and innovation outcomes. the research moved beyond representation to look at what types of diversity generate the strongest innovation effects and how those effects translate into measurable revenue. it is one of the most-cited studies linking diversity directly to commercial innovation performance.",
  "about": "BCG surveyed more than 1,700 companies across eight countries to examine the relationship between management team diversity and innovation outcomes. The research moved beyond representation to look at what types of diversity generate the strongest innovation effects and how those effects translate into measurable revenue. It is one of the most-cited studies linking diversity directly to commercial innovation performance.",
  "points": [
   "Companies with above-average diversity on management teams report innovation revenue 19 percentage points higher than companies with below-average diversity.",
   "This effect held across all eight countries studied, suggesting the innovation dividend from diversity is a universal rather than a culturally specific phenomenon.",
   "The strongest innovation effects came from combining multiple dimensions of diversity: gender, national origin, career path, age, and educational background together.",
   "The relationship between diversity and innovation revenue was stronger in industries characterised by rapid change and competitive disruption."
  ],
  "url": "https://www.bcg.com/publications/2018/how-diverse-leadership-teams-boost-innovation"
 },
 {
  "kind": "research",
  "id": "deloitte-inclusion-revolution",
  "title": "The Diversity and Inclusion Revolution: Eight Powerful Truths",
  "desc": "Organisations with inclusive cultures are eight times more likely to achieve better business outcomes and twice as likely to meet or exceed financial targets.",
  "meta": "Deloitte Insights, 2018",
  "takeaway": "Organisations with inclusive cultures are eight times more likely to achieve better business outcomes across multiple performance dimensions.",
  "keywords": "the diversity and inclusion revolution: eight powerful truths organisations with inclusive cultures are eight times more likely to achieve better business outcomes and twice as likely to meet or exceed financial targets. culture inclusion business outcomes leadership profitability talent deloitte insights synthesised research across thousands of organisations to identify eight transformational truths about diversity and inclusion. the study moved beyond demographic data to examine the relationship between culture, leadership behaviour, and measurable business performance. it remains one of the most widely referenced frameworks for building the business case for inclusion with senior leaders.",
  "about": "Deloitte Insights synthesised research across thousands of organisations to identify eight transformational truths about diversity and inclusion. The study moved beyond demographic data to examine the relationship between culture, leadership behaviour, and measurable business performance. It remains one of the most widely referenced frameworks for building the business case for inclusion with senior leaders.",
  "points": [
   "Organisations with inclusive cultures are eight times more likely to achieve better business outcomes across multiple performance dimensions.",
   "Inclusive organisations are twice as likely to meet or exceed their financial targets compared with non-inclusive peers.",
   "They are six times more likely to be innovative and agile, and three times more likely to be high-performing.",
   "Inclusion is experienced most directly in day-to-day team interactions, meaning senior leaders must change team-level behaviours, not just policies."
  ],
  "url": "https://www.deloitte.com/content/dam/assets-shared/legacy/docs/insights/2022/DI_Diversity-and-inclusion-revolution.pdf"
 },
 {
  "kind": "research",
  "id": "accenture-culture-equality",
  "title": "Getting to Equal 2019: Culture of Equality as Innovation Multiplier",
  "desc": "A culture of equality makes workers 6 times more innovative, 3 times more likely to stay, and 8 times more likely to be satisfied with their outcomes at work.",
  "meta": "Accenture, 2019",
  "takeaway": "A culture of equality makes employees six times more likely to be innovative and creative at work.",
  "keywords": "getting to equal 2019: culture of equality as innovation multiplier a culture of equality makes workers 6 times more innovative, 3 times more likely to stay, and 8 times more likely to be satisfied with their outcomes at work. culture innovation retention equality innovation profitability accenture surveyed more than 18,000 workers across 27 countries to understand the relationship between workplace culture, equality, and innovation. the study identified 40 specific factors that define a culture of equality and measured their combined effect on worker innovation, satisfaction, and retention. it is one of the largest global studies directly linking equality to innovation performance.",
  "about": "Accenture surveyed more than 18,000 workers across 27 countries to understand the relationship between workplace culture, equality, and innovation. The study identified 40 specific factors that define a culture of equality and measured their combined effect on worker innovation, satisfaction, and retention. It is one of the largest global studies directly linking equality to innovation performance.",
  "points": [
   "A culture of equality makes employees six times more likely to be innovative and creative at work.",
   "Workers in a culture of equality are three times more likely to stay with their employer, directly reducing turnover costs.",
   "Employees are eight times more likely to feel highly satisfied with their work and career outcomes in equal-culture workplaces.",
   "A bold and inclusive leadership style is the most powerful single driver of a culture of equality, accounting for the largest share of its effect."
  ],
  "url": "https://newsroom.accenture.com/news/2019/culture-of-equality-is-powerful-multiplier-of-workplace-innovation-new-accenture-research-finds"
 },
 {
  "kind": "research",
  "id": "mckinsey-women-workplace",
  "title": "Women in the Workplace 2023",
  "desc": "Women are significantly more burned out than men and more likely to leave organisations that do not invest in inclusive culture. The annual benchmark on gender equity in corporate America and the UK.",
  "meta": "McKinsey and Company and LeanIn.Org, 2023",
  "takeaway": "Women remain significantly underrepresented at every level of the corporate pipeline, with the first promotion to manager being the most critical bottleneck.",
  "keywords": "women in the workplace 2023 women are significantly more burned out than men and more likely to leave organisations that do not invest in inclusive culture. the annual benchmark on gender equity in corporate america and the uk. gender retention burnout leadership retention talent profitability women in the workplace is the largest ongoing study of women in corporate america and the uk, published annually by mckinsey and leanin.org. the 2023 edition surveyed more than 27,000 employees and 270 organisations, tracking progress on representation, examining the barriers women face, and identifying what employers who are making progress are doing differently.",
  "about": "Women in the Workplace is the largest ongoing study of women in corporate America and the UK, published annually by McKinsey and LeanIn.Org. The 2023 edition surveyed more than 27,000 employees and 270 organisations, tracking progress on representation, examining the barriers women face, and identifying what employers who are making progress are doing differently.",
  "points": [
   "Women remain significantly underrepresented at every level of the corporate pipeline, with the first promotion to manager being the most critical bottleneck.",
   "Women are 1.5 times more likely than men to consider leaving their jobs due to a desire for greater flexibility and a more inclusive culture.",
   "Women leaders are leaving companies at the highest rate ever recorded in the study's nine-year history, creating a leadership diversity crisis at senior levels.",
   "Companies where women see a clear path to senior leadership have significantly higher retention across all employee groups, not just women."
  ],
  "url": "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/women-in-the-workplace-2023"
 },
 {
  "kind": "research",
  "id": "cipd-inclusion-at-work",
  "title": "Inclusion at Work: Perspectives on LGBT+ Working Lives",
  "desc": "CIPD research into the lived experiences of LGBT+ workers in the UK, showing that inclusive workplaces drive measurable improvements in wellbeing, engagement, and performance.",
  "meta": "CIPD, 2022",
  "takeaway": "LGBT+ workers are significantly more likely to report poor mental health and lower job satisfaction than non-LGBT+ peers in non-inclusive workplaces.",
  "keywords": "inclusion at work: perspectives on lgbt+ working lives cipd research into the lived experiences of lgbt+ workers in the uk, showing that inclusive workplaces drive measurable improvements in wellbeing, engagement, and performance. lgbtq+ uk wellbeing inclusion productivity retention the cipd surveyed more than 2,000 workers in the uk, including an oversampled lgbt+ cohort, to understand the day-to-day experience of inclusion and exclusion at work. the report examines how workplace culture affects mental health, engagement, productivity, and career progression, and what people professionals can do to create genuinely inclusive environments.",
  "about": "The CIPD surveyed more than 2,000 workers in the UK, including an oversampled LGBT+ cohort, to understand the day-to-day experience of inclusion and exclusion at work. The report examines how workplace culture affects mental health, engagement, productivity, and career progression, and what people professionals can do to create genuinely inclusive environments.",
  "points": [
   "LGBT+ workers are significantly more likely to report poor mental health and lower job satisfaction than non-LGBT+ peers in non-inclusive workplaces.",
   "In organisations rated as inclusive by LGBT+ employees, job satisfaction is comparable with the overall workforce average, demonstrating that inclusion eliminates the gap.",
   "Disclosure rates for LGBT+ workers are higher in organisations with visible senior allies and clear non-discrimination policies.",
   "LGBT+ workers who are not out at work report spending significant cognitive energy managing their identity at the expense of their work contribution."
  ],
  "url": "https://www.cipd.org/uk/knowledge/reports/inclusion-work"
 },
 {
  "kind": "research",
  "id": "pwc-women-in-work",
  "title": "PwC Women in Work Index 2024",
  "desc": "The UK fell in the annual PwC Women in Work Index in 2024, highlighting that progress on gender equality in employment is stalling and requires renewed strategic attention.",
  "meta": "PwC, 2024",
  "takeaway": "The UK suffered the largest annual fall in the PwC Women in Work Index in 2024, reversing years of incremental progress.",
  "keywords": "pwc women in work index 2024 the uk fell in the annual pwc women in work index in 2024, highlighting that progress on gender equality in employment is stalling and requires renewed strategic attention. gender uk pay equity workforce talent profitability the pwc women in work index benchmarks 33 oecd countries on five dimensions of female economic empowerment: female labour force participation, the gender pay gap, the female unemployment rate, female full-time employment rate, and female employment in senior roles. the 2024 edition showed the uk falling in the rankings, with the largest annual drop of any country measured, signalling a reversal of hard-won progress.",
  "about": "The PwC Women in Work Index benchmarks 33 OECD countries on five dimensions of female economic empowerment: female labour force participation, the gender pay gap, the female unemployment rate, female full-time employment rate, and female employment in senior roles. The 2024 edition showed the UK falling in the rankings, with the largest annual drop of any country measured, signalling a reversal of hard-won progress.",
  "points": [
   "The UK suffered the largest annual fall in the PwC Women in Work Index in 2024, reversing years of incremental progress.",
   "The UK gender pay gap remains one of the largest among comparable OECD economies, with women earning significantly less per hour than men on average.",
   "Full-time employment rates for women lag significantly behind men, driven by a lack of accessible and affordable childcare and flexible working options.",
   "Countries at the top of the index share three common features: strong parental leave policies, subsidised childcare, and active employer-side equal pay enforcement."
  ],
  "url": "https://www.pwc.co.uk/press-room/press-releases/the-uk-suffers-the-largest-annual-fall-in-ranking-on-pwc-s-women.html"
 },
 {
  "kind": "research",
  "id": "cmi-walking-the-walk",
  "title": "Walking the Walk: CMI Research on Inclusion in Management",
  "desc": "CMI research finds HR leaders have a significant EDI blindspot, underestimating how excluded many employees feel. Culture change requires manager-level accountability, not just strategy.",
  "meta": "Chartered Management Institute, 2024",
  "takeaway": "HR leaders systematically overestimate how inclusive their organisation is: employees report significantly lower levels of inclusion than HR believes to be the case.",
  "keywords": "walking the walk: cmi research on inclusion in management cmi research finds hr leaders have a significant edi blindspot, underestimating how excluded many employees feel. culture change requires manager-level accountability, not just strategy. management culture uk accountability productivity retention the cmi surveyed thousands of uk managers and employees to examine the gap between what organisations say about inclusion and what employees actually experience. the 2024 report found a persistent perception gap: hr and senior leaders consistently believe their organisations are more inclusive than their employees do. the research argues that inclusion requires manager-level accountability and behaviour change, not just better policies.",
  "about": "The CMI surveyed thousands of UK managers and employees to examine the gap between what organisations say about inclusion and what employees actually experience. The 2024 report found a persistent perception gap: HR and senior leaders consistently believe their organisations are more inclusive than their employees do. The research argues that inclusion requires manager-level accountability and behaviour change, not just better policies.",
  "points": [
   "HR leaders systematically overestimate how inclusive their organisation is: employees report significantly lower levels of inclusion than HR believes to be the case.",
   "Only 1 in 3 UK managers say their organisation has given them the skills and tools they need to lead inclusively.",
   "Employees who feel included are significantly more engaged, more productive, and more likely to stay than those who do not.",
   "The most excluded groups in UK workplaces are disabled employees, employees from ethnic minority backgrounds, and those aged 50 and over."
  ],
  "url": "https://www.managers.org.uk/wp-content/uploads/2024/07/Walking-The-Walk-Report.pdf"
 },
 {
  "kind": "research",
  "id": "catalyst-why-dei-matters",
  "title": "Why Diversity and Inclusion Matter: Quick Take",
  "desc": "Catalyst synthesises the evidence that diversity and inclusion drive financial performance, innovation, employee experience, and organisational resilience across industries.",
  "meta": "Catalyst, 2020",
  "takeaway": "Companies with more women in leadership outperform those with fewer on every financial measure studied, including return on assets, return on equity, and total shareholder return.",
  "keywords": "why diversity and inclusion matter: quick take catalyst synthesises the evidence that diversity and inclusion drive financial performance, innovation, employee experience, and organisational resilience across industries. business case evidence synthesis performance us and uk profitability talent catalyst's quick take synthesises findings from hundreds of studies on diversity and inclusion, providing one of the most comprehensive evidence summaries available. it covers financial performance, talent attraction and retention, innovation, customer insight, and the evidence on what specific interventions actually work. catalyst is one of the leading us-based research organisations on workplace inclusion.",
  "about": "Catalyst's Quick Take synthesises findings from hundreds of studies on diversity and inclusion, providing one of the most comprehensive evidence summaries available. It covers financial performance, talent attraction and retention, innovation, customer insight, and the evidence on what specific interventions actually work. Catalyst is one of the leading US-based research organisations on workplace inclusion.",
  "points": [
   "Companies with more women in leadership outperform those with fewer on every financial measure studied, including return on assets, return on equity, and total shareholder return.",
   "Diverse companies are 70% more likely to capture new markets and are better positioned to understand and serve diverse customer bases.",
   "Employees who feel included are more engaged, more innovative, and less likely to leave than those who do not, with consistent effects across industries.",
   "Unconscious bias, non-inclusive leadership behaviours, and inadequate sponsorship are the three most common barriers to inclusion across the organisations studied."
  ],
  "url": "https://catalyst.org/insights/2020/why-diversity-and-inclusion-matter"
 },
 {
  "kind": "research",
  "id": "ilo-women-business-management",
  "title": "Women in Business and Management: The Business Case for Change",
  "desc": "ILO survey of 13,000 organisations across 70 countries finds that 57% of companies with gender diversity policies report improved profitability and productivity.",
  "meta": "International Labour Organization, 2019",
  "takeaway": "57% of companies with gender diversity policies and programmes reported improved profitability and productivity, compared with those without such policies.",
  "keywords": "women in business and management: the business case for change ilo survey of 13,000 organisations across 70 countries finds that 57% of companies with gender diversity policies report improved profitability and productivity. gender global profitability leadership profitability talent the international labour organization surveyed more than 13,000 enterprises across 70 countries to examine how gender diversity in management and leadership affects business performance. it is one of the broadest global studies on women in business and provides robust cross-country evidence for the relationship between female leadership representation and financial and organisational outcomes.",
  "about": "The International Labour Organization surveyed more than 13,000 enterprises across 70 countries to examine how gender diversity in management and leadership affects business performance. It is one of the broadest global studies on women in business and provides robust cross-country evidence for the relationship between female leadership representation and financial and organisational outcomes.",
  "points": [
   "57% of companies with gender diversity policies and programmes reported improved profitability and productivity, compared with those without such policies.",
   "Companies with more women in management are better at attracting and retaining talent, reducing turnover costs, and improving their employer brand.",
   "Access to a wider talent pool was cited by 60% of companies as a primary benefit of gender diversity initiatives.",
   "Gender diversity in decision-making processes leads to better risk assessment and more effective governance, particularly in sectors facing uncertainty."
  ],
  "url": "https://www.ilo.org/resource/news/women-leadership-bring-better-business-performance"
 },
 {
  "kind": "research",
  "id": "kapor-tech-leavers",
  "title": "Tech Leavers Study: The Cost of Non-Inclusion",
  "desc": "Unfair treatment and lack of inclusion cost the US tech industry USD 16 billion annually in voluntary employee turnover. The financial cost of a non-inclusive culture is quantified.",
  "meta": "Kapor Center, 2017",
  "takeaway": "Unfair treatment and lack of inclusion is the primary driver of voluntary turnover among underrepresented groups in tech, cited by more than half of those who left.",
  "keywords": "tech leavers study: the cost of non-inclusion unfair treatment and lack of inclusion cost the us tech industry usd 16 billion annually in voluntary employee turnover. the financial cost of a non-inclusive culture is quantified. retention cost technology us retention profitability the kapor center surveyed more than 2,000 people who had voluntarily left jobs in the us technology sector to understand why they left and what role unfair treatment played in their decision. it was the first large-scale study to quantify the financial cost of non-inclusive workplaces in a specific sector, producing one of the most widely cited business case figures in the inclusion field.",
  "about": "The Kapor Center surveyed more than 2,000 people who had voluntarily left jobs in the US technology sector to understand why they left and what role unfair treatment played in their decision. It was the first large-scale study to quantify the financial cost of non-inclusive workplaces in a specific sector, producing one of the most widely cited business case figures in the inclusion field.",
  "points": [
   "Unfair treatment and lack of inclusion is the primary driver of voluntary turnover among underrepresented groups in tech, cited by more than half of those who left.",
   "The total annual cost of this inclusion-driven turnover to the US tech sector is estimated at USD 16 billion.",
   "Stereotyping, being passed over for promotion, and experiencing unwanted sexual attention are the most commonly cited experiences driving departure.",
   "People who left due to unfairness are far less likely to recommend their former employer and more likely to share their experience publicly, creating reputational damage."
  ],
  "url": "https://www.kaporcenter.org/the-2017-tech-leavers-study/"
 },
 {
  "kind": "research",
  "id": "coqual-being-black",
  "title": "Being Black in Corporate America: An Intersectional Exploration",
  "desc": "3,700 professionals surveyed reveal that Black employees experience significantly greater barriers to advancement and feel less psychologically safe than white colleagues, with measurable impact on performance.",
  "meta": "Coqual (formerly Center for Talent Innovation), 2019",
  "takeaway": "Black professionals are significantly less likely to have sponsors: senior advocates who use their influence to create opportunities: than white professionals with equivalent qualifications.",
  "keywords": "being black in corporate america: an intersectional exploration 3,700 professionals surveyed reveal that black employees experience significantly greater barriers to advancement and feel less psychologically safe than white colleagues, with measurable impact on performance. race black employees barriers us retention productivity coqual surveyed 3,736 us professionals to understand the specific barriers and experiences of black employees in corporate environments. the study used an intersectional lens to examine how race interacts with gender, class, and other dimensions to shape the corporate experience. it remains one of the most thorough examinations of anti-black racism in corporate settings and its impact on talent and performance.",
  "about": "Coqual surveyed 3,736 US professionals to understand the specific barriers and experiences of Black employees in corporate environments. The study used an intersectional lens to examine how race interacts with gender, class, and other dimensions to shape the corporate experience. It remains one of the most thorough examinations of anti-Black racism in corporate settings and its impact on talent and performance.",
  "points": [
   "Black professionals are significantly less likely to have sponsors: senior advocates who use their influence to create opportunities: than white professionals with equivalent qualifications.",
   "58% of Black professionals say they have felt the need to conceal parts of their identity at work, a form of covering that consumes cognitive and emotional energy.",
   "Black employees report significantly lower feelings of psychological safety in teams, which research consistently links to lower innovation and performance contribution.",
   "Despite strong ambition and work ethic, Black professionals advance more slowly through corporate hierarchies than white peers with comparable performance records."
  ],
  "url": "https://coqual.org/?p=501"
 },
 {
  "kind": "research",
  "id": "mercer-when-women-thrive",
  "title": "When Women Thrive: Let's Get Real About Equality",
  "desc": "Mercer's global research of 1,157 organisations finds that women are significantly underrepresented at every level above entry, and most diversity efforts are not designed to address the root causes.",
  "meta": "Mercer, 2020",
  "takeaway": "Across all 1,157 organisations studied, the representation of women falls at every step from entry level to executive: only 23% of executives are women despite women making up 40% of entry-level employees.",
  "keywords": "when women thrive: let's get real about equality mercer's global research of 1,157 organisations finds that women are significantly underrepresented at every level above entry, and most diversity efforts are not designed to address the root causes. gender pipeline global data talent profitability mercer's when women thrive programme is one of the longest-running global research initiatives on gender equity in the workplace. the 2020 edition, subtitled let's get real about equality, analysed data from 1,157 organisations across 54 countries to understand why the gender pipeline remains so persistently unequal and what specific practices distinguish organisations that are making genuine progress.",
  "about": "Mercer's When Women Thrive programme is one of the longest-running global research initiatives on gender equity in the workplace. The 2020 edition, subtitled Let's Get Real About Equality, analysed data from 1,157 organisations across 54 countries to understand why the gender pipeline remains so persistently unequal and what specific practices distinguish organisations that are making genuine progress.",
  "points": [
   "Across all 1,157 organisations studied, the representation of women falls at every step from entry level to executive: only 23% of executives are women despite women making up 40% of entry-level employees.",
   "Fewer than half of organisations have a defined strategy to improve gender equality, despite most claiming diversity as a priority.",
   "The practices most strongly associated with progress are pay equity audits, structured promotion processes, and flexible working at senior level.",
   "Organisations where senior leaders model inclusive behaviours make faster progress than those investing primarily in training programmes."
  ],
  "url": "https://www.mercer.com/en-us/insights/talent-and-transformation/diversity-equity-and-inclusion/lets-get-real-about-equality/"
 },
 {
  "kind": "research",
  "id": "hbr-diverse-teams-smarter",
  "title": "Why Diverse Teams Are Smarter",
  "desc": "Diverse teams outperform homogeneous ones on complex problem-solving and decision-making because they process facts more carefully and challenge assumptions more rigorously.",
  "meta": "Harvard Business Review, 2016",
  "takeaway": "Diverse teams are more likely to examine facts and less likely to rely on groupthink or shared assumptions, producing more rigorous analysis.",
  "keywords": "why diverse teams are smarter diverse teams outperform homogeneous ones on complex problem-solving and decision-making because they process facts more carefully and challenge assumptions more rigorously. decision-making innovation teams cognitive diversity innovation productivity this widely cited harvard business review article by rock and grant synthesises cognitive science and organisational research to explain the mechanism through which diverse teams outperform homogeneous ones. it moves the conversation beyond representation metrics to examine how diversity changes the quality of thinking itself, making it one of the most intellectually compelling entries in the inclusion business case literature.",
  "about": "This widely cited Harvard Business Review article by Rock and Grant synthesises cognitive science and organisational research to explain the mechanism through which diverse teams outperform homogeneous ones. It moves the conversation beyond representation metrics to examine how diversity changes the quality of thinking itself, making it one of the most intellectually compelling entries in the inclusion business case literature.",
  "points": [
   "Diverse teams are more likely to examine facts and less likely to rely on groupthink or shared assumptions, producing more rigorous analysis.",
   "Cognitively diverse groups consistently outperform cognitively homogeneous groups on problem-solving tasks, even when the homogeneous group has higher average ability.",
   "The performance advantage of diverse teams is most pronounced on complex, non-routine tasks where novel thinking is required.",
   "Demographic diversity (gender, ethnicity, age) produces cognitive diversity through different lived experiences, which changes how teams process information."
  ],
  "url": "https://hbr.org/2016/11/why-diverse-teams-are-smarter"
 },
 {
  "kind": "research",
  "id": "bitc-race-at-work",
  "title": "Race at Work: Black Voices Report",
  "desc": "BITC research finds Black employees in the UK face entrenched barriers to advancement despite equal or higher ambition, with direct costs to organisational performance and culture.",
  "meta": "Business in the Community, 2020",
  "takeaway": "Black employees in the UK are significantly less likely to be promoted into management than white peers with equivalent performance and tenure.",
  "keywords": "race at work: black voices report bitc research finds black employees in the uk face entrenched barriers to advancement despite equal or higher ambition, with direct costs to organisational performance and culture. race black employees uk advancement productivity reputation business in the community surveyed black employees across uk organisations to understand their specific experiences of inclusion, exclusion, and advancement. the report went beyond headline statistics to capture qualitative and quantitative evidence of the structural barriers black employees face in uk workplaces, and what organisations with better outcomes were doing differently.",
  "about": "Business in the Community surveyed Black employees across UK organisations to understand their specific experiences of inclusion, exclusion, and advancement. The report went beyond headline statistics to capture qualitative and quantitative evidence of the structural barriers Black employees face in UK workplaces, and what organisations with better outcomes were doing differently.",
  "points": [
   "Black employees in the UK are significantly less likely to be promoted into management than white peers with equivalent performance and tenure.",
   "Only 1 in 10 Black employees say they have a senior sponsor who actively advocates for their career advancement within their organisation.",
   "Black employees report high levels of code-switching: changing their behaviour, language, and self-presentation at work to fit a dominant culture that does not reflect their identity.",
   "Organisations with explicit race equity targets and transparent promotion data show measurably better outcomes for Black employees."
  ],
  "url": "https://www.bitc.org.uk/report/race-at-work-black-voices-report-2020/"
 },
 {
  "kind": "research",
  "id": "disability-confident-uk",
  "title": "Disability Confident: Employer Survey Findings",
  "desc": "UK government research on the Disability Confident scheme finds employers who actively recruit and retain disabled people report direct improvements in team performance, loyalty, and culture.",
  "meta": "UK Department for Work and Pensions, 2022",
  "takeaway": "80% of Disability Confident employers report that recruiting disabled people has helped them access a wider talent pool and fill hard-to-recruit roles.",
  "keywords": "disability confident: employer survey findings uk government research on the disability confident scheme finds employers who actively recruit and retain disabled people report direct improvements in team performance, loyalty, and culture. disability uk recruitment retention talent productivity the department for work and pensions surveyed disability confident scheme participants across thousands of uk employers to understand the business benefits of actively employing and supporting disabled people. the research provides uk-specific evidence on what organisations actually experience when they commit to disability inclusion, moving beyond the moral case to document measurable organisational benefits.",
  "about": "The Department for Work and Pensions surveyed Disability Confident scheme participants across thousands of UK employers to understand the business benefits of actively employing and supporting disabled people. The research provides UK-specific evidence on what organisations actually experience when they commit to disability inclusion, moving beyond the moral case to document measurable organisational benefits.",
  "points": [
   "80% of Disability Confident employers report that recruiting disabled people has helped them access a wider talent pool and fill hard-to-recruit roles.",
   "Disabled employees report higher loyalty and lower voluntary turnover than the average workforce, reducing recruitment and onboarding costs for participating employers.",
   "Employers report improved team morale and culture as a result of employing disabled people, with colleagues citing increased empathy, communication, and collaborative problem-solving.",
   "Reasonable adjustments cost significantly less than most employers expect: the majority of adjustments cost nothing at all, and the average cost is well under GBP 100."
  ],
  "url": "https://www.gov.uk/government/publications/disability-confident-survey-of-participating-employers-may-2022"
 },
 {
  "kind": "research",
  "id": "cipd-race-inclusion",
  "title": "Race Inclusion in the Workplace",
  "desc": "CIPD research shows significant gaps between employer intent and employee experience on race inclusion in UK workplaces, with action on pay gaps, sponsorship, and manager training identified as highest-impact interventions.",
  "meta": "CIPD, 2022",
  "takeaway": "Only 38% of UK organisations have a specific strategy for improving racial inclusion, despite most HR teams citing it as a priority.",
  "keywords": "race inclusion in the workplace cipd research shows significant gaps between employer intent and employee experience on race inclusion in uk workplaces, with action on pay gaps, sponsorship, and manager training identified as highest-impact interventions. race uk action hr productivity reputation the cipd's research on race inclusion draws on surveys of uk hr professionals and employees to understand the current state of race equity in uk workplaces. it examines the gap between policy and practice, identifies the interventions with the strongest evidence base, and provides practical guidance for people professionals working to build genuinely inclusive cultures.",
  "about": "The CIPD's research on race inclusion draws on surveys of UK HR professionals and employees to understand the current state of race equity in UK workplaces. It examines the gap between policy and practice, identifies the interventions with the strongest evidence base, and provides practical guidance for people professionals working to build genuinely inclusive cultures.",
  "points": [
   "Only 38% of UK organisations have a specific strategy for improving racial inclusion, despite most HR teams citing it as a priority.",
   "Employees from ethnic minority backgrounds consistently rate their organisations as less inclusive than their white colleagues do, mirroring the HR perception gap found in other studies.",
   "The three highest-impact interventions for race inclusion are: ethnicity pay gap reporting, structured sponsorship programmes, and mandatory manager training on anti-racist practice.",
   "Ethnic minority employees are more likely to experience microaggressions and less likely to have a trusted confidant at work, contributing to lower psychological safety."
  ],
  "url": "https://www.cipd.org/uk/knowledge/guides/race-work-charter/"
 },
 {
  "kind": "research",
  "id": "stonewall-global-diversity",
  "title": "Global Diversity Report: LGBT+ Inclusion Across Borders",
  "desc": "Stonewall's global research documents the business and talent costs of LGBT+ exclusion in multinational organisations and the performance benefits of consistent, global inclusion standards.",
  "meta": "Stonewall, 2022",
  "takeaway": "LGBT+ employees in multinational organisations experience significantly different levels of inclusion depending on which country they are based in, even within the same employer.",
  "keywords": "global diversity report: lgbt+ inclusion across borders stonewall's global research documents the business and talent costs of lgbt+ exclusion in multinational organisations and the performance benefits of consistent, global inclusion standards. lgbtq+ global multinational belonging reputation talent stonewall's global diversity research examines the experience of lgbt+ employees in multinational organisations and the challenge of maintaining inclusive cultures across jurisdictions with different legal frameworks. the report documents what organisations that succeed at global lgbt+ inclusion do differently and provides the business case for consistent global standards.",
  "about": "Stonewall's global diversity research examines the experience of LGBT+ employees in multinational organisations and the challenge of maintaining inclusive cultures across jurisdictions with different legal frameworks. The report documents what organisations that succeed at global LGBT+ inclusion do differently and provides the business case for consistent global standards.",
  "points": [
   "LGBT+ employees in multinational organisations experience significantly different levels of inclusion depending on which country they are based in, even within the same employer.",
   "Organisations that apply consistent global inclusion standards retain LGBT+ talent at higher rates and attract stronger diverse talent pipelines across all geographies.",
   "Visible commitment from global leadership to LGBT+ inclusion, even in jurisdictions where it is politically complex, is associated with better employee outcomes.",
   "The productivity cost of non-inclusion for LGBT+ employees, including concealment and reduced contribution, is estimated at 30% of potential contribution in non-inclusive environments."
  ],
  "url": "https://www.stonewall.org.uk/resources/global-diversity"
 },
 {
  "kind": "research",
  "id": "enei-benchmarking",
  "title": "ENEI Talent Inclusion and Diversity Evaluation (TIDE)",
  "desc": "ENEI benchmarking data from 150 UK organisations shows that employers with the strongest inclusion scores have 42% lower voluntary turnover and significantly higher employee engagement.",
  "meta": "Employers Network for Equality and Inclusion, 2023",
  "takeaway": "Organisations in the top quartile of the TIDE benchmark have 42% lower voluntary turnover than those in the bottom quartile, one of the strongest retention effects documented in UK data.",
  "keywords": "enei talent inclusion and diversity evaluation (tide) enei benchmarking data from 150 uk organisations shows that employers with the strongest inclusion scores have 42% lower voluntary turnover and significantly higher employee engagement. uk benchmarking turnover engagement retention talent the employers network for equality and inclusion runs the tide benchmarking tool, which allows uk organisations to measure and compare their inclusion performance across multiple dimensions. the 2023 cohort data from 150 participating organisations provides robust uk evidence on the relationship between inclusion measurement, programme investment, and measurable business outcomes.",
  "about": "The Employers Network for Equality and Inclusion runs the TIDE benchmarking tool, which allows UK organisations to measure and compare their inclusion performance across multiple dimensions. The 2023 cohort data from 150 participating organisations provides robust UK evidence on the relationship between inclusion measurement, programme investment, and measurable business outcomes.",
  "points": [
   "Organisations in the top quartile of the TIDE benchmark have 42% lower voluntary turnover than those in the bottom quartile, one of the strongest retention effects documented in UK data.",
   "Employee engagement scores are consistently and significantly higher in organisations with strong TIDE scores, with the effect holding across sectors.",
   "Regular measurement and transparent reporting of inclusion data is one of the strongest predictors of sustained progress over time.",
   "Organisations that invest in inclusion programmes but do not measure outcomes see smaller and less sustained improvements than those that combine investment with rigorous measurement."
  ],
  "url": "https://www.enei.org.uk/tide/"
 },
 {
  "kind": "research",
  "id": "race-equality-foundation",
  "title": "Race Equality at Work: The Evidence for Change",
  "desc": "UK-focused synthesis of the evidence for race equity at work, documenting the organisational and societal costs of racial inequality and the interventions with the strongest evidence base.",
  "meta": "Race Equality Foundation, 2021",
  "takeaway": "Racial inequality at work costs the UK economy an estimated GBP 3.2 billion annually in lost productivity, underemployment, and talent underutilisation.",
  "keywords": "race equality at work: the evidence for change uk-focused synthesis of the evidence for race equity at work, documenting the organisational and societal costs of racial inequality and the interventions with the strongest evidence base. race uk evidence synthesis systemic change productivity reputation the race equality foundation synthesises uk and international evidence on racial inequality in employment to provide a comprehensive evidence base for practitioners and leaders. the report covers the costs of racial inequality, both to individuals and to organisations, and identifies the structural and cultural interventions that have the strongest track record of producing sustained change.",
  "about": "The Race Equality Foundation synthesises UK and international evidence on racial inequality in employment to provide a comprehensive evidence base for practitioners and leaders. The report covers the costs of racial inequality, both to individuals and to organisations, and identifies the structural and cultural interventions that have the strongest track record of producing sustained change.",
  "points": [
   "Racial inequality at work costs the UK economy an estimated GBP 3.2 billion annually in lost productivity, underemployment, and talent underutilisation.",
   "Black and minority ethnic employees in the UK face a 10 percentage point employment gap, a significant earnings differential at every level, and lower rates of progression than white peers.",
   "Structured interventions, including transparent promotion processes, pay gap reporting by ethnicity, and active sponsorship programmes, consistently outperform unstructured diversity programmes.",
   "Psychological safety is significantly lower for ethnic minority employees in UK workplaces, with direct consequences for contribution, innovation, and retention."
  ],
  "url": "https://raceequalityfoundation.org.uk/"
 },
 {
  "kind": "research",
  "id": "adobe-diverse-audiences",
  "title": "Inclusive Design and Diverse Audiences: The Revenue Opportunity",
  "desc": "Businesses that design inclusively and serve diverse audiences access a combined consumer market worth over $13 trillion annually. Most organisations are leaving significant revenue on the table.",
  "meta": "Accenture and AARP, 2022",
  "takeaway": "Disabled consumers and their networks control an estimated $13 trillion in annual disposable income globally, yet most products and services are not designed with them as a primary audience.",
  "keywords": "inclusive design and diverse audiences: the revenue opportunity businesses that design inclusively and serve diverse audiences access a combined consumer market worth over $13 trillion annually. most organisations are leaving significant revenue on the table. customer growth inclusive design market reach revenue customer innovation this report draws on accenture and aarp research to quantify the commercial opportunity in designing products, services and communications for underrepresented consumer groups — including disabled consumers, older adults, ethnic minority communities, and lgbtq+ consumers. it argues that inclusive design is not a cost centre but a market expansion strategy with measurable revenue impact.",
  "about": "This report draws on Accenture and AARP research to quantify the commercial opportunity in designing products, services and communications for underrepresented consumer groups — including disabled consumers, older adults, ethnic minority communities, and LGBTQ+ consumers. It argues that inclusive design is not a cost centre but a market expansion strategy with measurable revenue impact.",
  "points": [
   "Disabled consumers and their networks control an estimated $13 trillion in annual disposable income globally, yet most products and services are not designed with them as a primary audience.",
   "Brands perceived as genuinely inclusive are 35% more likely to appeal to diverse consumers and see higher brand loyalty from those groups.",
   "Companies that reflect diverse customer bases in their leadership and marketing outperform peers in revenue growth within those consumer segments.",
   "78% of consumers say they are more likely to purchase from a brand that demonstrates a commitment to diversity and inclusion in its communications and workforce."
  ],
  "url": "https://www.accenture.com/us-en/insights/retail/inclusive-design"
 },
 {
  "kind": "case",
  "id": "sodexo-gender-balance",
  "title": "Gender-Balanced Management Teams Deliver Stronger Business Results",
  "desc": "Sodexo conducted an internal study across 50,000 managers in 70 entities globally, comparing gender-balanced teams (40:60 female to male) against non-balanced entities over several years, tracking client retention, employee engagement, safety, and financial performance.",
  "meta": "Sodexo, Facilities Management",
  "takeaway": "Gender-balanced entities produced 8 percentage points higher employee retention, 9 percentage points higher client retention, 14 percentage points higher engagement, and significantly higher operating margins than non-balanced entities.",
  "keywords": "gender-balanced management teams deliver stronger business results sodexo conducted an internal study across 50,000 managers in 70 entities globally, comparing gender-balanced teams (40:60 female to male) against non-balanced entities over several years, tracking client retention, employee engagement, safety, and financial performance. gender-balanced entities produced 8 percentage points higher employee retention, 9 percentage points higher client retention, 14 percentage points higher engagement, and significantly higher operating margins than non-balanced entities. gender balance retention operating margins engagement profitability sodexo",
  "about": "Sodexo conducted an internal study across 50,000 managers in 70 entities globally, comparing gender-balanced teams (40:60 female to male) against non-balanced entities over several years, tracking client retention, employee engagement, safety, and financial performance.",
  "points": [
   "Gender-balanced entities produced 8 percentage points higher employee retention, 9 percentage points higher client retention, 14 percentage points higher engagement, and significantly higher operating margins than non-balanced entities.",
   "Using internal longitudinal data rather than external benchmarks made the case undeniable to senior leaders who might dismiss third-party research as irrelevant to their context.",
   "Setting the balanced threshold too high or too low can make it appear unachievable or too easy, reducing motivational force."
  ],
  "url": "https://www.sodexo.com/news/newsroom/2018/gender-balance-study-2018",
  "source": "Sodexo Gender Balance Study, 2018"
 },
 {
  "kind": "case",
  "id": "mckinsey-diversity-wins",
  "title": "Diverse Leadership Teams Are Significantly More Likely to Outperform on Profitability",
  "desc": "McKinsey's Diversity Wins research analysed financial performance across 1,000 large companies in 15 countries, comparing top and bottom quartiles for gender and ethnic diversity in executive teams, controlling for industry and geography.",
  "meta": "McKinsey (cross-sector research, 1,000+ companies), Cross-sector",
  "takeaway": "Companies in the top quartile for ethnic diversity were 36% more likely to achieve above-average profitability than those in the bottom quartile. The advantage for diverse leadership had widened since McKinsey's 2015 study.",
  "keywords": "diverse leadership teams are significantly more likely to outperform on profitability mckinsey's diversity wins research analysed financial performance across 1,000 large companies in 15 countries, comparing top and bottom quartiles for gender and ethnic diversity in executive teams, controlling for industry and geography. companies in the top quartile for ethnic diversity were 36% more likely to achieve above-average profitability than those in the bottom quartile. the advantage for diverse leadership had widened since mckinsey's 2015 study. executive diversity profitability ethnic diversity gender diversity profitability mckinsey (cross-sector research, 1,000+ companies)",
  "about": "McKinsey's Diversity Wins research analysed financial performance across 1,000 large companies in 15 countries, comparing top and bottom quartiles for gender and ethnic diversity in executive teams, controlling for industry and geography.",
  "points": [
   "Companies in the top quartile for ethnic diversity were 36% more likely to achieve above-average profitability than those in the bottom quartile. The advantage for diverse leadership had widened since McKinsey's 2015 study."
  ],
  "url": "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/why-diversity-matters",
  "source": "McKinsey, Diversity Wins: How Inclusion Matters, 2020"
 },
 {
  "kind": "case",
  "id": "zurich-flexible-hiring",
  "title": "Advertising All Roles as Flexible Doubled Applications and Increased Senior Female Hires by a Third",
  "desc": "In 2019, Zurich Insurance UK changed its recruitment approach by advertising all vacancies as flexible and using gender-neutral language across job listings, specifically to widen the female talent pipeline into senior roles.",
  "meta": "Zurich Insurance UK, Insurance and Financial Services",
  "takeaway": "Over 12 months, female applicants for senior roles rose 19.3%, women hired into senior roles increased 33%, and total applications more than doubled. Belonging scores among existing part-time staff improved by 8 percentage points.",
  "keywords": "advertising all roles as flexible doubled applications and increased senior female hires by a third in 2019, zurich insurance uk changed its recruitment approach by advertising all vacancies as flexible and using gender-neutral language across job listings, specifically to widen the female talent pipeline into senior roles. over 12 months, female applicants for senior roles rose 19.3%, women hired into senior roles increased 33%, and total applications more than doubled. belonging scores among existing part-time staff improved by 8 percentage points. flexible working female talent recruitment belonging retention zurich insurance uk",
  "about": "In 2019, Zurich Insurance UK changed its recruitment approach by advertising all vacancies as flexible and using gender-neutral language across job listings, specifically to widen the female talent pipeline into senior roles.",
  "points": [
   "Over 12 months, female applicants for senior roles rose 19.3%, women hired into senior roles increased 33%, and total applications more than doubled. Belonging scores among existing part-time staff improved by 8 percentage points.",
   "Making flexibility the default rather than something candidates had to ask for removed the stigma and psychological barrier that had been suppressing applications.",
   "Advertising roles as flexible without the infrastructure or cultural permission to support it creates false expectations and accelerates disillusionment."
  ],
  "url": "https://www.zurich.co.uk/media-centre/zurich-sees-leap-in-women-applying-for-senior-roles-after-offering-all-jobs-as-flexible",
  "source": "Zurich Insurance UK press release, 2020"
 },
 {
  "kind": "case",
  "id": "jpmorgan-autism-at-work",
  "title": "Neurodiversity Programme Delivers 98% Two-Year Retention and 90% Faster Execution",
  "desc": "JPMorgan Chase launched its Autism at Work programme in 2015, partnering with Specialisterne to create a skills-based evaluation process for autistic candidates in software engineering, data analysis, and testing roles, with ongoing coaching and support.",
  "meta": "JPMorgan Chase, Financial Services",
  "takeaway": "Programme participants showed execution speeds 90% faster than team averages, error rates 48% lower than internal benchmarks, and a two-year retention rate of 98%, compared with technology sector turnover that often exceeds 20% annually.",
  "keywords": "neurodiversity programme delivers 98% two-year retention and 90% faster execution jpmorgan chase launched its autism at work programme in 2015, partnering with specialisterne to create a skills-based evaluation process for autistic candidates in software engineering, data analysis, and testing roles, with ongoing coaching and support. programme participants showed execution speeds 90% faster than team averages, error rates 48% lower than internal benchmarks, and a two-year retention rate of 98%, compared with technology sector turnover that often exceeds 20% annually. neurodiversity autism retention productivity technology retention jpmorgan chase",
  "about": "JPMorgan Chase launched its Autism at Work programme in 2015, partnering with Specialisterne to create a skills-based evaluation process for autistic candidates in software engineering, data analysis, and testing roles, with ongoing coaching and support.",
  "points": [
   "Programme participants showed execution speeds 90% faster than team averages, error rates 48% lower than internal benchmarks, and a two-year retention rate of 98%, compared with technology sector turnover that often exceeds 20% annually.",
   "Replacing abstract competency interviews with work-sample tasks removed bias from the entry point and identified talent the existing process was discarding.",
   "The programme required dedicated coaching and manager training as ongoing investment; without that infrastructure, performance gains did not materialise in pilot sites that cut support early."
  ],
  "url": "https://www.dynseo.com/en/roi-of-neurodiversity-in-business-studies-from-jpmorgan-sap-microsoft-and-2026-figures/",
  "source": "Dynseo, citing JPMorgan internal programme data, 2024"
 },
 {
  "kind": "case",
  "id": "lloyds-race-inclusion",
  "title": "Targeted Race Inclusion Programme Increases Black Senior Representation by 50% in One Year",
  "desc": "Lloyds introduced diverse shortlisting requirements, a development programme for Black heritage managers, a sponsorship programme for ethnic minority colleagues, and a Women in Leadership programme. Lloyds also became the first FTSE 100 company to set a public target for ethnic minority representation in senior roles.",
  "meta": "Lloyds Banking Group, Banking and Financial Services",
  "takeaway": "Black senior representation rose 50% within one year of launching targeted measures. Women in senior management grew from 28% to 38% over seven years. Moody's credit rating agency designated the ethnicity plan 'credit positive', an unusual recognition of an EDI initiative as a driver of creditworthiness.",
  "keywords": "targeted race inclusion programme increases black senior representation by 50% in one year lloyds introduced diverse shortlisting requirements, a development programme for black heritage managers, a sponsorship programme for ethnic minority colleagues, and a women in leadership programme. lloyds also became the first ftse 100 company to set a public target for ethnic minority representation in senior roles. black senior representation rose 50% within one year of launching targeted measures. women in senior management grew from 28% to 38% over seven years. moody's credit rating agency designated the ethnicity plan 'credit positive', an unusual recognition of an edi initiative as a driver of creditworthiness. race inclusion ethnic minority senior representation women in leadership retention lloyds banking group",
  "about": "Lloyds introduced diverse shortlisting requirements, a development programme for Black heritage managers, a sponsorship programme for ethnic minority colleagues, and a Women in Leadership programme. Lloyds also became the first FTSE 100 company to set a public target for ethnic minority representation in senior roles.",
  "points": [
   "Black senior representation rose 50% within one year of launching targeted measures. Women in senior management grew from 28% to 38% over seven years. Moody's credit rating agency designated the ethnicity plan 'credit positive', an unusual recognition of an EDI initiative as a driver of creditworthiness.",
   "Setting a public, specific, time-bound target created accountability that voluntary aspiration had not; the public commitment changed internal behaviour because it created reputational risk for inaction.",
   "Sponsorship programmes without structural changes to promotion panels and diverse shortlisting can produce small cohorts of individually successful people while leaving the system unchanged."
  ],
  "url": "https://www.managers.org.uk/wp-content/uploads/2022/06/cmi-75th-report-edi-in-action-lloyds-case-study.pdf",
  "source": "CMI EDI in Action, Lloyds case study, 2022"
 },
 {
  "kind": "case",
  "id": "sap-autism-at-work",
  "title": "Neurodiversity Programme Delivers 40% More Innovations and 20% Higher Retention",
  "desc": "SAP launched Autism at Work in 2013 targeting 1% neurodivergent workforce representation, redesigning hiring processes to remove barriers for autistic candidates and training managers in neurodiversity inclusion. The programme was positioned explicitly as a business capability investment.",
  "meta": "SAP, Enterprise Software",
  "takeaway": "Recruitment success rates through the adapted process were 15% higher than standard hiring. Three-year retention among participants was 20% above company average. Neurodiverse teams generated 40% more innovations compared with standard teams.",
  "keywords": "neurodiversity programme delivers 40% more innovations and 20% higher retention sap launched autism at work in 2013 targeting 1% neurodivergent workforce representation, redesigning hiring processes to remove barriers for autistic candidates and training managers in neurodiversity inclusion. the programme was positioned explicitly as a business capability investment. recruitment success rates through the adapted process were 15% higher than standard hiring. three-year retention among participants was 20% above company average. neurodiverse teams generated 40% more innovations compared with standard teams. neurodiversity autism talent attraction innovation technology talent sap",
  "about": "SAP launched Autism at Work in 2013 targeting 1% neurodivergent workforce representation, redesigning hiring processes to remove barriers for autistic candidates and training managers in neurodiversity inclusion. The programme was positioned explicitly as a business capability investment.",
  "points": [
   "Recruitment success rates through the adapted process were 15% higher than standard hiring. Three-year retention among participants was 20% above company average. Neurodiverse teams generated 40% more innovations compared with standard teams.",
   "Positioning the programme as a business capability investment rather than a CSR initiative secured executive sponsorship and protected funding during cost pressures that ended comparable programmes elsewhere.",
   "The 1% workforce target required sustained recruiting effort over years; organisations that set similar targets without a dedicated pipeline strategy consistently fell short."
  ],
  "url": "https://www.dynseo.com/en/roi-of-neurodiversity-in-business-studies-from-jpmorgan-sap-microsoft-and-2026-figures/",
  "source": "Dynseo and Womentech Network, citing SAP programme data"
 },
 {
  "kind": "case",
  "id": "vodafone-maternity-policy",
  "title": "Global Maternity Policy Projected to Save US$19 Billion Annually in Talent Costs",
  "desc": "In 2015, Vodafone introduced a global maternity policy guaranteeing 16 weeks' fully paid maternity leave across 30 countries, followed by a six-month return period with a 30-hour full-pay working week, designed to retain experienced women through the period most likely to cause them to leave.",
  "meta": "Vodafone, Telecommunications",
  "takeaway": "KPMG analysis projected that organisations adopting the policy would save approximately US$19 billion annually in reduced turnover, recruitment, and lost productivity costs globally. The policy was adopted across Vodafone's operations in 30 countries and cited by the ILO as a model for market-led talent retention.",
  "keywords": "global maternity policy projected to save us$19 billion annually in talent costs in 2015, vodafone introduced a global maternity policy guaranteeing 16 weeks' fully paid maternity leave across 30 countries, followed by a six-month return period with a 30-hour full-pay working week, designed to retain experienced women through the period most likely to cause them to leave. kpmg analysis projected that organisations adopting the policy would save approximately us$19 billion annually in reduced turnover, recruitment, and lost productivity costs globally. the policy was adopted across vodafone's operations in 30 countries and cited by the ilo as a model for market-led talent retention. maternity leave flexible working women in work talent retention talent vodafone",
  "about": "In 2015, Vodafone introduced a global maternity policy guaranteeing 16 weeks' fully paid maternity leave across 30 countries, followed by a six-month return period with a 30-hour full-pay working week, designed to retain experienced women through the period most likely to cause them to leave.",
  "points": [
   "KPMG analysis projected that organisations adopting the policy would save approximately US$19 billion annually in reduced turnover, recruitment, and lost productivity costs globally. The policy was adopted across Vodafone's operations in 30 countries and cited by the ILO as a model for market-led talent retention.",
   "Commissioning KPMG to model the financial case before announcing the policy meant the announcement led with business value rather than welfare, which secured board approval and changed how the media covered it.",
   "The 30-hour full-pay return phase is the element most organisations struggle to implement because it requires line managers to adjust workloads actively; without manager-level accountability, the policy exists on paper only."
  ],
  "url": "https://www.cnbc.com/2015/03/10/vodafone-launches-new-policy-for-working-moms.html",
  "source": "Vodafone press release and CNBC, 2015"
 },
 {
  "kind": "case",
  "id": "nationwide-women-in-finance",
  "title": "Women in Finance Charter Commitment Drives Senior Female Representation to 39%",
  "desc": "Nationwide signed the Women in Finance Charter and set a public 40% target for female senior leadership, introducing leadership development programmes for women, tracking gender data across the pipeline, and embedding diversity into succession planning.",
  "meta": "Nationwide Building Society, Mutual Financial Services",
  "takeaway": "Women now hold 39% of senior manager and director roles, up from a significantly lower baseline. Nationwide's gender pay gap has shown a consistent downward trend as female representation in senior roles has grown.",
  "keywords": "women in finance charter commitment drives senior female representation to 39% nationwide signed the women in finance charter and set a public 40% target for female senior leadership, introducing leadership development programmes for women, tracking gender data across the pipeline, and embedding diversity into succession planning. women now hold 39% of senior manager and director roles, up from a significantly lower baseline. nationwide's gender pay gap has shown a consistent downward trend as female representation in senior roles has grown. women in finance senior leadership gender pay gap succession planning talent nationwide building society",
  "about": "Nationwide signed the Women in Finance Charter and set a public 40% target for female senior leadership, introducing leadership development programmes for women, tracking gender data across the pipeline, and embedding diversity into succession planning.",
  "points": [
   "Women now hold 39% of senior manager and director roles, up from a significantly lower baseline. Nationwide's gender pay gap has shown a consistent downward trend as female representation in senior roles has grown.",
   "External charter commitments with published annual reporting created accountability that internal targets alone had not, because they introduced public and peer comparison that internal metrics lacked.",
   "Headline representation figures can improve while pay and progression equity remain unchanged; charter compliance without tracking promotion rates and attrition by gender can mask whether real change is occurring."
  ],
  "url": "https://www.nationwide.co.uk/about-us/inclusion-and-diversity/women-in-finance",
  "source": "Nationwide Building Society, Women in Finance page"
 },
 {
  "kind": "case",
  "id": "accenture-disability-inclusion",
  "title": "Disability Inclusion Leaders Deliver 28% Higher Revenue and Double the Net Income",
  "desc": "Accenture, with Disability:IN and AAPD, conducted a four-year longitudinal study of 140 companies on the Disability Equality Index, comparing leaders in disability inclusion against all other participants across multiple financial performance indicators.",
  "meta": "Accenture (cross-sector, 140 companies), Cross-sector",
  "takeaway": "Disability inclusion leaders delivered, on average, 28% higher revenue, approximately double the net income, and 30% higher economic profit margins compared with peer companies. Companies that improved their disability inclusion approach were four times as likely to outperform peers on shareholder returns.",
  "keywords": "disability inclusion leaders deliver 28% higher revenue and double the net income accenture, with disability:in and aapd, conducted a four-year longitudinal study of 140 companies on the disability equality index, comparing leaders in disability inclusion against all other participants across multiple financial performance indicators. disability inclusion leaders delivered, on average, 28% higher revenue, approximately double the net income, and 30% higher economic profit margins compared with peer companies. companies that improved their disability inclusion approach were four times as likely to outperform peers on shareholder returns. disability inclusion revenue net income shareholder returns innovation accenture (cross-sector, 140 companies)",
  "about": "Accenture, with Disability:IN and AAPD, conducted a four-year longitudinal study of 140 companies on the Disability Equality Index, comparing leaders in disability inclusion against all other participants across multiple financial performance indicators.",
  "points": [
   "Disability inclusion leaders delivered, on average, 28% higher revenue, approximately double the net income, and 30% higher economic profit margins compared with peer companies. Companies that improved their disability inclusion approach were four times as likely to outperform peers on shareholder returns.",
   "Measuring disability inclusion leaders against hard financial metrics over multiple years rather than a single point in time made the case much harder to dismiss than cross-sectional survey data.",
   "Organisations that score well on inclusion indices through policy documentation without embedding inclusion in practice will not replicate the financial outcomes the research identifies."
  ],
  "url": "https://newsroom.accenture.com/news/2018/companies-leading-in-disability-inclusion-have-outperformed-peers-accenture-research-finds",
  "source": "Accenture, Getting to Equal: The Disability Inclusion Advantage, 2018"
 },
 {
  "kind": "case",
  "id": "google-project-aristotle",
  "title": "Project Aristotle: Psychological Safety Is the Strongest Predictor of Team Innovation and Performance",
  "desc": "Google's two-year internal research project studied 180 teams to identify what made them effective, analysing hundreds of variables. Psychological safety, defined as confidence that team members can take risks without being penalised, emerged as the strongest single predictor.",
  "meta": "Google, Technology",
  "takeaway": "Teams high in psychological safety were significantly more likely to generate diverse ideas, test new approaches, and receive higher performance ratings from managers. Google redesigned manager training around inclusive behaviours as a direct business response to the findings.",
  "keywords": "project aristotle: psychological safety is the strongest predictor of team innovation and performance google's two-year internal research project studied 180 teams to identify what made them effective, analysing hundreds of variables. psychological safety, defined as confidence that team members can take risks without being penalised, emerged as the strongest single predictor. teams high in psychological safety were significantly more likely to generate diverse ideas, test new approaches, and receive higher performance ratings from managers. google redesigned manager training around inclusive behaviours as a direct business response to the findings. psychological safety innovation team performance inclusive leadership innovation google",
  "about": "Google's two-year internal research project studied 180 teams to identify what made them effective, analysing hundreds of variables. Psychological safety, defined as confidence that team members can take risks without being penalised, emerged as the strongest single predictor.",
  "points": [
   "Teams high in psychological safety were significantly more likely to generate diverse ideas, test new approaches, and receive higher performance ratings from managers. Google redesigned manager training around inclusive behaviours as a direct business response to the findings.",
   "Framing psychological safety as a measurable, manageable team condition rather than an abstract cultural value allowed Google to design specific manager behaviours and training that could be evaluated.",
   "Psychological safety without accountability can slide into conflict avoidance; the research showed it works best when combined with clarity of goals and high standards, not in their absence."
  ],
  "url": "https://www.leaderfactor.com/learn/project-aristotle-psychological-safety",
  "source": "Google re:Work, Project Aristotle"
 },
 {
  "kind": "case",
  "id": "coventry-supply-chain",
  "title": "Diverse Supply Chain Programme Expands Competition and Drives Supplier Innovation",
  "desc": "Coventry Building Society, working with Business in the Community, implemented a diverse and inclusive supply chain programme, actively sourcing goods and services from businesses owned by or employing people from underrepresented groups.",
  "meta": "Coventry Building Society, Mutual Financial Services",
  "takeaway": "The programme expanded Coventry's supplier base and was recognised by BITC as a leading example of how supply chain diversity drives supplier innovation, reduces commercial risk through broader competition, and opens relationships with new customer communities.",
  "keywords": "diverse supply chain programme expands competition and drives supplier innovation coventry building society, working with business in the community, implemented a diverse and inclusive supply chain programme, actively sourcing goods and services from businesses owned by or employing people from underrepresented groups. the programme expanded coventry's supplier base and was recognised by bitc as a leading example of how supply chain diversity drives supplier innovation, reduces commercial risk through broader competition, and opens relationships with new customer communities. supply chain procurement supplier diversity innovation innovation coventry building society",
  "about": "Coventry Building Society, working with Business in the Community, implemented a diverse and inclusive supply chain programme, actively sourcing goods and services from businesses owned by or employing people from underrepresented groups.",
  "points": [
   "The programme expanded Coventry's supplier base and was recognised by BITC as a leading example of how supply chain diversity drives supplier innovation, reduces commercial risk through broader competition, and opens relationships with new customer communities.",
   "Partnering with Business in the Community provided access to a pipeline of diverse suppliers that Coventry could not have built independently, reducing the procurement team effort to implement the programme.",
   "Tier-one supplier diversity without tracking through the supply chain can give a misleading picture; large prime contractors who subcontract to diverse businesses can make headline numbers look good while concentrating commercial benefit at the top."
  ],
  "url": "https://www.bitc.org.uk/case-study/coventry-building-society-advancing-supply-chain-diversity/",
  "source": "Business in the Community, Coventry Building Society case study"
 },
 {
  "kind": "case",
  "id": "nhs-cost-of-exclusion",
  "title": "Bullying and Harassment Costs the NHS £2.281 Billion Every Year",
  "desc": "Researchers Kline and Lewis conducted a quantified financial analysis of the cost of bullying and harassment to the NHS in England, drawing on NHS Staff Survey data and workforce data. The study modelled seven distinct cost categories linked directly to workplace exclusion and discriminatory behaviour.",
  "meta": "NHS England, Public Healthcare",
  "takeaway": "Total estimated annual cost to the NHS: £2.281 billion. This included £483 million in sickness absence, £302 million in cover costs, £231 million replacing staff who left, £575 million in lost productivity from turnover, and £604 million in presenteeism. The authors noted the figures were conservative. Investment in inclusive culture represents a direct and measurable cost-saving opportunity.",
  "keywords": "bullying and harassment costs the nhs £2.281 billion every year researchers kline and lewis conducted a quantified financial analysis of the cost of bullying and harassment to the nhs in england, drawing on nhs staff survey data and workforce data. the study modelled seven distinct cost categories linked directly to workplace exclusion and discriminatory behaviour. total estimated annual cost to the nhs: £2.281 billion. this included £483 million in sickness absence, £302 million in cover costs, £231 million replacing staff who left, £575 million in lost productivity from turnover, and £604 million in presenteeism. the authors noted the figures were conservative. investment in inclusive culture represents a direct and measurable cost-saving opportunity. bullying and harassment cost of exclusion sickness absence presenteeism productivity nhs england",
  "about": "Researchers Kline and Lewis conducted a quantified financial analysis of the cost of bullying and harassment to the NHS in England, drawing on NHS Staff Survey data and workforce data. The study modelled seven distinct cost categories linked directly to workplace exclusion and discriminatory behaviour.",
  "points": [
   "Total estimated annual cost to the NHS: £2.281 billion. This included £483 million in sickness absence, £302 million in cover costs, £231 million replacing staff who left, £575 million in lost productivity from turnover, and £604 million in presenteeism. The authors noted the figures were conservative. Investment in inclusive culture represents a direct and measurable cost-saving opportunity.",
   "Breaking the total cost into seven named categories made the figure actionable; leaders could identify which cost category was most significant in their own trust and prioritise accordingly.",
   "The figures are conservative by the authors own admission; organisations that use them as a ceiling rather than a floor will underestimate the return on investment for inclusion programmes."
  ],
  "url": "https://pearl.plymouth.ac.uk/bitstream/handle/10026.1/12411/Kline%20and%20Lewis%20(V2)%20Cost%20of%20Bullying%20to%20the%20NHS%20in%20England%20final%20version.pdf",
  "source": "Kline and Lewis, The Price of Fear, University of Plymouth"
 },
 {
  "kind": "case",
  "id": "deloitte-inclusive-leadership",
  "title": "Inclusive Leaders Produce Teams 17% More Likely to Be High-Performing and 29% More Collaborative",
  "desc": "Deloitte Australia researched the relationship between inclusive leadership behaviours and team performance across six dimensions of inclusive leadership, comparing outcomes in highly inclusive versus average teams across multiple sectors.",
  "meta": "Deloitte (cross-sector research), Cross-sector",
  "takeaway": "Teams led by inclusive leaders were 17% more likely to report being high-performing, 20% more likely to make high-quality decisions, and 29% more likely to behave collaboratively. A 10% improvement in perceptions of inclusion increased work attendance by almost one day per employee per year.",
  "keywords": "inclusive leaders produce teams 17% more likely to be high-performing and 29% more collaborative deloitte australia researched the relationship between inclusive leadership behaviours and team performance across six dimensions of inclusive leadership, comparing outcomes in highly inclusive versus average teams across multiple sectors. teams led by inclusive leaders were 17% more likely to report being high-performing, 20% more likely to make high-quality decisions, and 29% more likely to behave collaboratively. a 10% improvement in perceptions of inclusion increased work attendance by almost one day per employee per year. inclusive leadership team performance decision-making attendance productivity deloitte (cross-sector research)",
  "about": "Deloitte Australia researched the relationship between inclusive leadership behaviours and team performance across six dimensions of inclusive leadership, comparing outcomes in highly inclusive versus average teams across multiple sectors.",
  "points": [
   "Teams led by inclusive leaders were 17% more likely to report being high-performing, 20% more likely to make high-quality decisions, and 29% more likely to behave collaboratively. A 10% improvement in perceptions of inclusion increased work attendance by almost one day per employee per year.",
   "Identifying six specific, trainable inclusive leadership behaviours gave organisations something concrete to develop rather than an abstract aspiration to be more inclusive.",
   "Self-reported perceptions of inclusion can be inflated in cultures where people fear reprisal for negative feedback; validating inclusion metrics through anonymous channels gives a more accurate picture."
  ],
  "url": "https://www.odenetwork.com/wp-content/uploads/2021/04/DI_Diversity-and-inclusion-revolution.pdf",
  "source": "Deloitte, The Diversity and Inclusion Revolution, 2018"
 },
 {
  "kind": "case",
  "id": "lloyds-credit-positive",
  "title": "Moody's Rates Lloyds' Ethnicity Action Plan 'Credit Positive', Influencing FTSE 350 Standards",
  "desc": "In 2014, Lloyds became the first FTSE 100 company to set a public target for ethnic minority senior representation and voluntarily published its ethnicity pay gap before any legal obligation. These disclosures were part of a broader strategy to rebuild public and investor trust.",
  "meta": "Lloyds Banking Group, Banking and Financial Services",
  "takeaway": "Moody's Investors Service designated the plan 'credit positive', directly linking EDI commitments to creditworthiness in recognition that diversity reduces governance risk, improves talent pipeline resilience, and signals leadership quality to institutional investors. Lloyds' approach subsequently influenced the Parker Review targets adopted across the FTSE 350.",
  "keywords": "moody's rates lloyds' ethnicity action plan 'credit positive', influencing ftse 350 standards in 2014, lloyds became the first ftse 100 company to set a public target for ethnic minority senior representation and voluntarily published its ethnicity pay gap before any legal obligation. these disclosures were part of a broader strategy to rebuild public and investor trust. moody's investors service designated the plan 'credit positive', directly linking edi commitments to creditworthiness in recognition that diversity reduces governance risk, improves talent pipeline resilience, and signals leadership quality to institutional investors. lloyds' approach subsequently influenced the parker review targets adopted across the ftse 350. ethnicity credit rating investor confidence governance parker review reputation lloyds banking group",
  "about": "In 2014, Lloyds became the first FTSE 100 company to set a public target for ethnic minority senior representation and voluntarily published its ethnicity pay gap before any legal obligation. These disclosures were part of a broader strategy to rebuild public and investor trust.",
  "points": [
   "Moody's Investors Service designated the plan 'credit positive', directly linking EDI commitments to creditworthiness in recognition that diversity reduces governance risk, improves talent pipeline resilience, and signals leadership quality to institutional investors. Lloyds' approach subsequently influenced the Parker Review targets adopted across the FTSE 350.",
   "Voluntary disclosure before legal obligation positioned Lloyds as setting the standard rather than meeting it, giving them first-mover reputational advantage with investors who value proactive governance.",
   "Credit positive recognition reflects policy commitment and targets, not outcomes; sustained rating advantage requires demonstrable progress year on year against published targets."
  ],
  "url": "https://www.bloombergquint.com/business/lloyds-ethnic-diversity-plan-is-credit-positive-moody-s-says",
  "source": "Bloomberg and Moody's assessment of Lloyds, 2020"
 },
 {
  "kind": "case",
  "id": "barclays-stonewall",
  "title": "LGBT+ Inclusion Recognised as a Talent Differentiator and Market Opportunity",
  "desc": "Barclays built one of the UK's largest LGBT+ employee networks and became a consistent Stonewall Star Performer over multiple years, investing in active allyship training, LGBT+ inclusive advertising, and external community partnerships positioned explicitly as business strategy.",
  "meta": "Barclays, Banking and Financial Services",
  "takeaway": "Barclays cited its LGBT+ inclusion reputation as a talent differentiator that improved applications and reduced time to fill among values-led professionals. The bank also grew its market share in LGBT+ community banking, a segment where brand trust significantly drives account switching and loyalty.",
  "keywords": "lgbt+ inclusion recognised as a talent differentiator and market opportunity barclays built one of the uk's largest lgbt+ employee networks and became a consistent stonewall star performer over multiple years, investing in active allyship training, lgbt+ inclusive advertising, and external community partnerships positioned explicitly as business strategy. barclays cited its lgbt+ inclusion reputation as a talent differentiator that improved applications and reduced time to fill among values-led professionals. the bank also grew its market share in lgbt+ community banking, a segment where brand trust significantly drives account switching and loyalty. lgbt+ inclusion employer brand talent attraction market share reputation barclays",
  "about": "Barclays built one of the UK's largest LGBT+ employee networks and became a consistent Stonewall Star Performer over multiple years, investing in active allyship training, LGBT+ inclusive advertising, and external community partnerships positioned explicitly as business strategy.",
  "points": [
   "Barclays cited its LGBT+ inclusion reputation as a talent differentiator that improved applications and reduced time to fill among values-led professionals. The bank also grew its market share in LGBT+ community banking, a segment where brand trust significantly drives account switching and loyalty.",
   "Treating LGBT+ inclusion as a commercial brand strategy rather than solely an employee benefit connected the internal programme to revenue, market share, and customer acquisition in a way that secured sustained executive investment.",
   "Visible external commitment creates expectation from employees and customers alike; organisations that brand heavily externally while internal culture remains exclusive face significant trust damage when the gap becomes visible."
  ],
  "url": "https://britishlgbtawards.com/case-study-barclays/",
  "source": "Stonewall Star Performer recognition; British LGBT Awards"
 },
 {
  "kind": "case",
  "id": "diageo-learning-for-life",
  "title": "200,000 Graduates Through Learning for Life Drives ESG Ratings and Social Licence to Operate",
  "desc": "Diageo launched Learning for Life, an employability and skills programme targeting people from disadvantaged and marginalised communities globally, including veterans and ethnic minority groups. The programme was positioned as both community investment and commercial pipeline development.",
  "meta": "Diageo, Consumer Goods",
  "takeaway": "By 2025, over 200,000 graduates had completed the programme across multiple markets. It has been consistently recognised as a reputational asset contributing to Diageo's ESG ratings, employer brand in competitive talent markets, and social licence to operate in communities where alcohol producers face public scrutiny.",
  "keywords": "200,000 graduates through learning for life drives esg ratings and social licence to operate diageo launched learning for life, an employability and skills programme targeting people from disadvantaged and marginalised communities globally, including veterans and ethnic minority groups. the programme was positioned as both community investment and commercial pipeline development. by 2025, over 200,000 graduates had completed the programme across multiple markets. it has been consistently recognised as a reputational asset contributing to diageo's esg ratings, employer brand in competitive talent markets, and social licence to operate in communities where alcohol producers face public scrutiny. social impact esg employer brand community investment reputation diageo",
  "about": "Diageo launched Learning for Life, an employability and skills programme targeting people from disadvantaged and marginalised communities globally, including veterans and ethnic minority groups. The programme was positioned as both community investment and commercial pipeline development.",
  "points": [
   "By 2025, over 200,000 graduates had completed the programme across multiple markets. It has been consistently recognised as a reputational asset contributing to Diageo's ESG ratings, employer brand in competitive talent markets, and social licence to operate in communities where alcohol producers face public scrutiny.",
   "Positioning the programme at the intersection of community need and Diageo's commercial talent requirements gave it dual purpose; it was not charity disconnected from the business, which sustained long-term investment.",
   "ESG ratings and employer brand benefits depend on the credibility of the programme; a large headline number without verifiable impact methodology will attract scrutiny and potentially damage the credibility it was designed to build."
  ],
  "url": "https://www.hrgrapevine.com/content/article/2025-10-14-200000-graduates-diageos-learning-for-life-employability-scheme-keeps-changing-lives",
  "source": "HR Grapevine, October 2025"
 },
 {
  "kind": "case",
  "id": "purple-pound",
  "title": "£249 Billion Purple Pound: 75% of Disabled Customers Walk Away from Inaccessible Businesses",
  "desc": "Purple conducted and published research into the UK spending power of disabled consumers and their households, building the evidence base for the 'Purple Pound' to make the commercial case for investing in accessible products, services, and customer experiences.",
  "meta": "Purple (We Are Purple), Disability Inclusion Research",
  "takeaway": "The UK's disabled consumer market represents £249 billion in annual spending power. Research found that 75% of disabled people and their families had walked away from a business due to poor accessibility or customer experience, representing direct and measurable lost revenue. This data has been adopted by UK government and cited in Disability Confident scheme guidance.",
  "keywords": "£249 billion purple pound: 75% of disabled customers walk away from inaccessible businesses purple conducted and published research into the uk spending power of disabled consumers and their households, building the evidence base for the 'purple pound' to make the commercial case for investing in accessible products, services, and customer experiences. the uk's disabled consumer market represents £249 billion in annual spending power. research found that 75% of disabled people and their families had walked away from a business due to poor accessibility or customer experience, representing direct and measurable lost revenue. this data has been adopted by uk government and cited in disability confident scheme guidance. disability consumer spending accessibility purple pound lost revenue customer purple (we are purple)",
  "about": "Purple conducted and published research into the UK spending power of disabled consumers and their households, building the evidence base for the 'Purple Pound' to make the commercial case for investing in accessible products, services, and customer experiences.",
  "points": [
   "The UK's disabled consumer market represents £249 billion in annual spending power. Research found that 75% of disabled people and their families had walked away from a business due to poor accessibility or customer experience, representing direct and measurable lost revenue. This data has been adopted by UK government and cited in Disability Confident scheme guidance.",
   "Quantifying the lost revenue from poor accessibility in a single headline figure gave organisations a commercial frame that made the case to finance and commercial directors, not just compliance teams.",
   "Addressing physical accessibility without improving digital accessibility or staff attitude and training captures only part of the market; disabled customers who can physically enter a space can still be excluded by the experience."
  ],
  "url": "https://wearepurple.org.uk/?p=558",
  "source": "We Are Purple, Purple Pound research"
 },
 {
  "kind": "case",
  "id": "pg-like-a-girl",
  "title": "Diverse Creative Teams Behind 'Like a Girl' Drive 1.5 Billion Impressions and Significant Sales Growth",
  "desc": "P&G systematically diversified the creative teams behind its brand campaigns, increasing the proportion of female and diverse directors and creatives. The 'Like a Girl' campaign for Always was produced by a gender-diverse creative team, with P&G's Chief Brand Officer publicly linking internal diversity to stronger commercial campaigns.",
  "meta": "Procter and Gamble, Consumer Goods",
  "takeaway": "The campaign achieved 1.5 billion global media impressions. The share of women aged 16 to 24 viewing 'like a girl' as a positive expression rose from 19% to 76%. The CEO attributed significant sales growth and increased market share for Always to the campaign.",
  "keywords": "diverse creative teams behind 'like a girl' drive 1.5 billion impressions and significant sales growth p&g systematically diversified the creative teams behind its brand campaigns, increasing the proportion of female and diverse directors and creatives. the 'like a girl' campaign for always was produced by a gender-diverse creative team, with p&g's chief brand officer publicly linking internal diversity to stronger commercial campaigns. the campaign achieved 1.5 billion global media impressions. the share of women aged 16 to 24 viewing 'like a girl' as a positive expression rose from 19% to 76%. the ceo attributed significant sales growth and increased market share for always to the campaign. diverse creative teams brand equity consumer connection market share customer procter and gamble",
  "about": "P&G systematically diversified the creative teams behind its brand campaigns, increasing the proportion of female and diverse directors and creatives. The 'Like a Girl' campaign for Always was produced by a gender-diverse creative team, with P&G's Chief Brand Officer publicly linking internal diversity to stronger commercial campaigns.",
  "points": [
   "The campaign achieved 1.5 billion global media impressions. The share of women aged 16 to 24 viewing 'like a girl' as a positive expression rose from 19% to 76%. The CEO attributed significant sales growth and increased market share for Always to the campaign.",
   "Changing the demographic composition of the creative team rather than briefing a homogeneous team to think more inclusively produced qualitatively different work; diversity of lived experience showed up directly in the creative output.",
   "Campaign-level success driven by diverse teams can be isolated and one-off if the creative team composition changes project by project; sustained commercial benefit requires structural changes to how agencies are selected and briefed."
  ],
  "url": "https://www.marketingweek.com/pg-diversity-is-how-we-get-great-campaigns-like-like-a-girl/",
  "source": "Marketing Week; Bandt, 2015"
 },
 {
  "kind": "case",
  "id": "barclays-financial-inclusion",
  "title": "Financial Inclusion Programme Opens New Account Relationships and Reduces Credit Risk",
  "desc": "Barclays developed a long-standing community investment programme targeting financially excluded and underserved populations, bringing banking services and financial skills to communities with historically low financial inclusion and developing products for customers not reached by standard retail banking.",
  "meta": "Barclays, Banking and Financial Services",
  "takeaway": "Reaching previously unbanked and underbanked customers opened new account relationships, reduced long-term credit risk by improving financial literacy among customers, and strengthened Barclays' operating licence in communities where regulatory scrutiny of financial exclusion was high.",
  "keywords": "financial inclusion programme opens new account relationships and reduces credit risk barclays developed a long-standing community investment programme targeting financially excluded and underserved populations, bringing banking services and financial skills to communities with historically low financial inclusion and developing products for customers not reached by standard retail banking. reaching previously unbanked and underbanked customers opened new account relationships, reduced long-term credit risk by improving financial literacy among customers, and strengthened barclays' operating licence in communities where regulatory scrutiny of financial exclusion was high. financial inclusion underserved communities credit risk new markets customer barclays",
  "about": "Barclays developed a long-standing community investment programme targeting financially excluded and underserved populations, bringing banking services and financial skills to communities with historically low financial inclusion and developing products for customers not reached by standard retail banking.",
  "points": [
   "Reaching previously unbanked and underbanked customers opened new account relationships, reduced long-term credit risk by improving financial literacy among customers, and strengthened Barclays' operating licence in communities where regulatory scrutiny of financial exclusion was high.",
   "Treating financial inclusion as a market development strategy rather than a community relations exercise sustained commercial investment over the long term, where philanthropy-framed programmes typically lose funding in tighter cycles.",
   "Financial literacy programmes require follow-through into accessible product design; improving knowledge without providing suitable products creates expectation without opportunity."
  ],
  "url": "https://www.bitc.org.uk/wp-content/uploads/2022/06/BarclaysCaseStudy.pdf",
  "source": "Business in the Community, Barclays case study"
 },
 {
  "kind": "case",
  "id": "mckinsey-delivering-diversity",
  "title": "Diverse Executive Teams Better Placed to Serve Diverse Consumer Markets, 33% More Likely to Outperform",
  "desc": "McKinsey's 2018 Delivering Through Diversity report analysed 1,007 companies across 12 countries, examining the relationship between executive and board diversity and financial performance, including the ability to serve diverse and growing consumer segments.",
  "meta": "McKinsey (cross-sector research, 1,007 companies), Cross-sector",
  "takeaway": "Companies in the top quartile for ethnic and cultural diversity were 33% more likely to outperform on profitability. The report found that diverse executive teams were better able to anticipate and serve the needs of increasingly diverse consumer populations, giving them a commercial advantage. Companies that had not progressed on diversity were 29% more likely to underperform.",
  "keywords": "diverse executive teams better placed to serve diverse consumer markets, 33% more likely to outperform mckinsey's 2018 delivering through diversity report analysed 1,007 companies across 12 countries, examining the relationship between executive and board diversity and financial performance, including the ability to serve diverse and growing consumer segments. companies in the top quartile for ethnic and cultural diversity were 33% more likely to outperform on profitability. the report found that diverse executive teams were better able to anticipate and serve the needs of increasingly diverse consumer populations, giving them a commercial advantage. companies that had not progressed on diversity were 29% more likely to underperform. diverse leadership consumer markets profitability ethnic diversity customer mckinsey (cross-sector research, 1,007 companies)",
  "about": "McKinsey's 2018 Delivering Through Diversity report analysed 1,007 companies across 12 countries, examining the relationship between executive and board diversity and financial performance, including the ability to serve diverse and growing consumer segments.",
  "points": [
   "Companies in the top quartile for ethnic and cultural diversity were 33% more likely to outperform on profitability. The report found that diverse executive teams were better able to anticipate and serve the needs of increasingly diverse consumer populations, giving them a commercial advantage. Companies that had not progressed on diversity were 29% more likely to underperform.",
   "Disaggregating diversity data by level, function, and country revealed that aggregate figures masked significant underrepresentation at the most commercially influential decision-making levels.",
   "Diverse executive headcount without inclusion culture does not deliver the decision-making and consumer insight benefits the research identifies; hiring diversely without giving those voices real authority does not replicate the results."
  ],
  "url": "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/why-diversity-matters",
  "source": "McKinsey, Delivering Through Diversity, 2018"
 },
 {
  "kind": "video",
  "id": "what-is-edi",
  "title": "What is EDI and Why Does It Matter?",
  "desc": "Training video, 25 min",
  "meta": "25 min training video",
  "takeaway": "A 25 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "what is edi and why does it matter? foundations culture"
 },
 {
  "kind": "video",
  "id": "inclusive-recruitment-video",
  "title": "Inclusive Recruitment: Common Mistakes",
  "desc": "Training video, 20 min",
  "meta": "20 min training video",
  "takeaway": "A 20 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "inclusive recruitment: common mistakes recruitment systems"
 },
 {
  "kind": "video",
  "id": "edi-data-video",
  "title": "EDI Data: Collecting, Using and Communicating It",
  "desc": "Training video, 30 min",
  "meta": "30 min training video",
  "takeaway": "A 30 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "edi data: collecting, using and communicating it data & evidence"
 },
 {
  "kind": "video",
  "id": "disability-inclusion",
  "title": "Disability Inclusion in Practice",
  "desc": "Training video, 25 min",
  "meta": "25 min training video",
  "takeaway": "A 25 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "disability inclusion in practice disability policy"
 },
 {
  "kind": "video",
  "id": "equality-act",
  "title": "The Equality Act Explained for Managers",
  "desc": "Training video, 30 min",
  "meta": "30 min training video",
  "takeaway": "A 30 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "the equality act explained for managers policy foundations"
 },
 {
  "kind": "video",
  "id": "reasonable-adjustments",
  "title": "Reasonable Adjustments: Getting Them Right",
  "desc": "Training video, 20 min",
  "meta": "20 min training video",
  "takeaway": "A 20 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "reasonable adjustments: getting them right disability policy"
 },
 {
  "kind": "video",
  "id": "unconscious-bias",
  "title": "Understanding Bias in Everyday Decisions",
  "desc": "Training video, 25 min",
  "meta": "25 min training video",
  "takeaway": "A 25 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "understanding bias in everyday decisions foundations culture"
 },
 {
  "kind": "video",
  "id": "inclusive-meetings",
  "title": "Running Inclusive Meetings",
  "desc": "Training video, 15 min",
  "meta": "15 min training video",
  "takeaway": "A 15 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "running inclusive meetings culture belonging"
 },
 {
  "kind": "video",
  "id": "pay-gap",
  "title": "Reading Your Pay Gap Data",
  "desc": "Training video, 30 min",
  "meta": "30 min training video",
  "takeaway": "A 30 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "reading your pay gap data data & evidence strategy"
 },
 {
  "kind": "video",
  "id": "neurodiversity",
  "title": "Neurodiversity at Work",
  "desc": "Training video, 25 min",
  "meta": "25 min training video",
  "takeaway": "A 25 minute training video from the Watch library, ready to watch when you join.",
  "keywords": "neurodiversity at work disability wellbeing"
 },
 {
  "kind": "video",
  "id": "leading-with-inclusion",
  "title": "Leading with Inclusion: A Framework for Managers",
  "desc": "Masterclasses, 30 min",
  "meta": "30 min masterclass",
  "takeaway": "A 30 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "leading with inclusion: a framework for managers leadership culture"
 },
 {
  "kind": "video",
  "id": "edi-strategy-video",
  "title": "How to Build an EDI Strategy from Scratch",
  "desc": "Masterclasses, 35 min",
  "meta": "35 min masterclass",
  "takeaway": "A 35 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "how to build an edi strategy from scratch strategy leadership"
 },
 {
  "kind": "video",
  "id": "business-case-edi",
  "title": "Making the Business Case for EDI",
  "desc": "Masterclasses, 30 min",
  "meta": "30 min masterclass",
  "takeaway": "A 30 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "making the business case for edi strategy data & evidence"
 },
 {
  "kind": "video",
  "id": "anti-racism-video",
  "title": "Anti-Racism at Work: Moving Beyond Awareness",
  "desc": "Masterclasses, 40 min",
  "meta": "40 min masterclass",
  "takeaway": "A 40 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "anti-racism at work: moving beyond awareness race culture"
 },
 {
  "kind": "video",
  "id": "board-governance",
  "title": "EDI at Board Level: Governance and Accountability",
  "desc": "Masterclasses, 40 min",
  "meta": "40 min masterclass",
  "takeaway": "A 40 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "edi at board level: governance and accountability leadership strategy"
 },
 {
  "kind": "video",
  "id": "inclusive-policy",
  "title": "Writing Policies People Actually Use",
  "desc": "Masterclasses, 35 min",
  "meta": "35 min masterclass",
  "takeaway": "A 35 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "writing policies people actually use policy systems"
 },
 {
  "kind": "video",
  "id": "hard-conversations",
  "title": "Handling Difficult Conversations About Race",
  "desc": "Masterclasses, 45 min",
  "meta": "45 min masterclass",
  "takeaway": "A 45 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "handling difficult conversations about race race leadership"
 },
 {
  "kind": "video",
  "id": "measuring-impact",
  "title": "Measuring the Impact of Your EDI Work",
  "desc": "Masterclasses, 35 min",
  "meta": "35 min masterclass",
  "takeaway": "A 35 minute masterclass from the Watch library, ready to watch when you join.",
  "keywords": "measuring the impact of your edi work data & evidence strategy"
 },
 {
  "kind": "video",
  "id": "intersectionality-video",
  "title": "Understanding Intersectionality",
  "desc": "Nuggets & Snapshots, 10 min",
  "meta": "10 min short video",
  "takeaway": "A 10 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "understanding intersectionality race disability culture"
 },
 {
  "kind": "video",
  "id": "psychological-safety-video",
  "title": "Psychological Safety in Teams",
  "desc": "Nuggets & Snapshots, 8 min",
  "meta": "8 min short video",
  "takeaway": "A 8 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "psychological safety in teams belonging culture wellbeing"
 },
 {
  "kind": "video",
  "id": "allyship",
  "title": "Allyship in Five Minutes",
  "desc": "Nuggets & Snapshots, 5 min",
  "meta": "5 min short video",
  "takeaway": "A 5 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "allyship in five minutes belonging culture"
 },
 {
  "kind": "video",
  "id": "microaggressions",
  "title": "Spotting Microaggressions",
  "desc": "Nuggets & Snapshots, 7 min",
  "meta": "7 min short video",
  "takeaway": "A 7 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "spotting microaggressions race culture"
 },
 {
  "kind": "video",
  "id": "inclusive-language",
  "title": "Inclusive Language: Quick Wins",
  "desc": "Nuggets & Snapshots, 6 min",
  "meta": "6 min short video",
  "takeaway": "A 6 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "inclusive language: quick wins foundations culture"
 },
 {
  "kind": "video",
  "id": "job-adverts",
  "title": "Three Fixes for Your Job Adverts",
  "desc": "Nuggets & Snapshots, 5 min",
  "meta": "5 min short video",
  "takeaway": "A 5 minute short video from the Watch library, ready to watch when you join.",
  "keywords": "three fixes for your job adverts recruitment systems"
 },
 {
  "kind": "ai",
  "id": "evidence-argument-builder",
  "title": "Evidence Argument Builder",
  "desc": "Build a structured, evidence-backed argument for EDI investment.",
  "meta": "Making the Case",
  "takeaway": "A tailored business case built from our research library",
  "keywords": "evidence argument builder build a structured, evidence-backed argument for edi investment. tell us what you are trying to argue and who you are presenting to. we surface the most relevant evidence from our research library and build you a tailored business case. what you are arguing and who you are presenting to a tailored business case built from our research library making the case tools to build the evidence, justify investment, and bring leadership with you."
 },
 {
  "kind": "ai",
  "id": "research-interpreter",
  "title": "Personalised Research Interpreter",
  "desc": "Turn academic research into actionable insight for your organisation.",
  "meta": "Making the Case",
  "takeaway": "Key findings, practical takeaways and how they apply to you",
  "keywords": "personalised research interpreter turn academic research into actionable insight for your organisation. paste any research paper, report or article and receive an inclusion-focused summary: key findings, practical takeaways, and how the evidence applies to your specific context. a research paper, report or article key findings, practical takeaways and how they apply to you making the case tools to build the evidence, justify investment, and bring leadership with you."
 },
 {
  "kind": "ai",
  "id": "gender-pay-gap-statement-builder",
  "title": "Gender Pay Gap Statement Builder",
  "desc": "Turn your statutory figures into a clear, honest published statement.",
  "meta": "Making the Case",
  "takeaway": "A clear statement with root causes and action commitments",
  "keywords": "gender pay gap statement builder turn your statutory figures into a clear, honest published statement. input your gender pay gap figures and receive a clear, honest narrative: contextualising your numbers, explaining root causes and setting out your action commitments. your gender pay gap figures a clear statement with root causes and action commitments making the case tools to build the evidence, justify investment, and bring leadership with you."
 },
 {
  "kind": "ai",
  "id": "inclusion-strategy-builder",
  "title": "Inclusion Strategy Builder",
  "desc": "Turn your priorities into a 12-month strategy framework.",
  "meta": "Making the Case",
  "takeaway": "A 12-month framework with objectives and a board-ready summary",
  "keywords": "inclusion strategy builder turn your priorities into a 12-month strategy framework. tell us where your organisation is now and what matters most. we generate a prioritised 12-month framework: focus areas, measurable objectives, quick wins, and a board-ready summary. where you are now and what matters most a 12-month framework with objectives and a board-ready summary making the case tools to build the evidence, justify investment, and bring leadership with you."
 },
 {
  "kind": "ai",
  "id": "jd-equity-checker",
  "title": "Job Spec Equity Check",
  "desc": "Remove bias before your role goes live.",
  "meta": "Recruiting and Hiring Fairly",
  "takeaway": "An equity review with rewritten wording ready to use",
  "keywords": "job spec equity check remove bias before your role goes live. paste any job description and get an instant equity review: gendered language, unnecessary requirements that exclude diverse candidates, accessibility considerations and rewritten suggestions ready to use. a job description an equity review with rewritten wording ready to use recruiting and hiring fairly remove bias from your talent pipeline before it costs you candidates."
 },
 {
  "kind": "ai",
  "id": "interview-question-generator",
  "title": "Interview Question Generator",
  "desc": "Structured, bias-aware questions for every role.",
  "meta": "Recruiting and Hiring Fairly",
  "takeaway": "A structured, bias-aware interview question set",
  "keywords": "interview question generator structured, bias-aware questions for every role. generate a full structured interview question set aligned to your role competencies. each question is designed to surface capability fairly, reduce interviewer bias and create a consistent candidate experience. the role and its competencies a structured, bias-aware interview question set recruiting and hiring fairly remove bias from your talent pipeline before it costs you candidates."
 },
 {
  "kind": "ai",
  "id": "policy-equity-auditor",
  "title": "Policy Equity Auditor",
  "desc": "Turn any policy into an equity action plan.",
  "meta": "Understanding Where You Are",
  "takeaway": "An equity audit and a prioritised improvement plan",
  "keywords": "policy equity auditor turn any policy into an equity action plan. upload or paste an existing policy and receive a comprehensive equity audit: inclusive language assessment, missing provisions, alignment with legal frameworks and charters, and a prioritised improvement plan. an existing policy an equity audit and a prioritised improvement plan understanding where you are diagnostic and audit tools that tell you what to fix and where to start."
 },
 {
  "kind": "ai",
  "id": "inclusion-health-check",
  "title": "Inclusion Health Check",
  "desc": "A rapid diagnostic for your inclusion culture.",
  "meta": "Understanding Where You Are",
  "takeaway": "An inclusion health score across six key areas",
  "keywords": "inclusion health check a rapid diagnostic for your inclusion culture. answer a set of targeted questions about your organisation and receive a clear inclusion health score across key dimensions: leadership, policy, recruitment, culture, data and psychological safety. answers to targeted questions about your organisation an inclusion health score across six key areas understanding where you are diagnostic and audit tools that tell you what to fix and where to start."
 },
 {
  "kind": "ai",
  "id": "case-study-roadmap",
  "title": "Case Study Replication Roadmap",
  "desc": "Turn someone else's success into your action plan.",
  "meta": "Understanding Where You Are",
  "takeaway": "A step-by-step roadmap adapted to your context",
  "keywords": "case study replication roadmap turn someone else's success into your action plan. provide a case study from another organisation and receive a step-by-step replication roadmap adapted to your context: what they did, why it worked, and how you can apply it. a case study from another organisation a step-by-step roadmap adapted to your context understanding where you are diagnostic and audit tools that tell you what to fix and where to start."
 }
];
