"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Theme = "belonging" | "fairness" | "voice" | "safety" | "inclusion" | "leadership";
type Tab = "browse" | "builder" | "guide";

type ThemeMeta = {
  key: Theme;
  label: string;
  icon: string;
  desc: string;
  scenario: string;
};

type Question = {
  id: string;
  theme: Theme;
  text: string;
  scale: string;
  rationale: string;
  watchFor: string;
  whatGoodLooksLike: string;
};

// ── Theme metadata ─────────────────────────────────────────────────────────────
const THEMES: ThemeMeta[] = [
  {
    key: "belonging",
    label: "Belonging",
    icon: "🤝",
    desc: "Whether employees feel they belong in the organisation and in their immediate team, as themselves.",
    scenario: "In an organisation where belonging is low, people edit themselves constantly. They don't mention their weekend if they think it won't resonate. They don't bring up a personal milestone because they're not sure it will be met with warmth. They perform a version of themselves that fits the dominant culture, and over time that performance is exhausting. These questions are designed to surface that experience before it becomes a resignation.",
  },
  {
    key: "fairness",
    label: "Fairness and equity",
    icon: "⚖️",
    desc: "Whether people believe they are treated equitably relative to others and have equal access to opportunities.",
    scenario: "Unfairness rarely announces itself. It accumulates in patterns: who gets the interesting project, who gets called on in the meeting, whose ideas are attributed to someone else. By the time an employee names it, they have usually been carrying it for months. These questions help organisations surface those patterns before they harden into attrition, legal exposure, or reputational risk.",
  },
  {
    key: "voice",
    label: "Voice and inclusion",
    icon: "💬",
    desc: "Whether people feel heard, included in decision-making, and that their perspective is valued.",
    scenario: "When people don't feel heard, they stop trying. But the silence that follows doesn't look like disengagement from the outside: it looks like compliance. People attend meetings, contribute minimally, and privately disengage. This is the 'quiet quitting' that precedes actual departure. These questions are designed to catch that withdrawal early, before it becomes invisible.",
  },
  {
    key: "safety",
    label: "Psychological safety",
    icon: "🛡️",
    desc: "Whether people feel safe to speak up, raise concerns, disagree, or admit mistakes without negative consequences.",
    scenario: "Psychological safety is the prerequisite for everything else. Without it, survey results are unreliable, errors go unreported, harassment goes unchallenged, and diverse perspectives go unspoken. An organisation can have excellent inclusion policies and no psychological safety, in which case the policies are theatre. These questions measure whether the environment is one where people can actually tell the truth.",
  },
  {
    key: "inclusion",
    label: "Day-to-day inclusion",
    icon: "🌱",
    desc: "The everyday experience of feeling included or excluded in meetings, communications, and social dynamics.",
    scenario: "Exclusion is mostly mundane. It happens in who gets cc'd and who doesn't. In who the after-work drinks are designed for. In whose name is mispronounced again without apology. In the meeting that was scheduled without checking the one person it most affects. These questions look for the texture of everyday experience, not the dramatic incidents, because it is the everyday texture that determines whether someone stays.",
  },
  {
    key: "leadership",
    label: "Leadership commitment",
    icon: "🏛️",
    desc: "Whether employees believe leaders take inclusion seriously and act on it, beyond rhetoric.",
    scenario: "Employees are expert readers of leadership behaviour. They notice when a senior leader skips the inclusion training they mandated for everyone else. They notice when a complaint about a high performer is quietly shelved. They notice when the inclusion strategy is presented by someone junior at an all-staff, not by the CEO. These questions measure trust in leadership commitment — which is earned through action, not declaration.",
  },
];

// ── Questions ─────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: "b1", theme: "belonging",
    text: "I feel I belong at this organisation.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Sense of belonging is the foundational measure of inclusion and a strong predictor of retention and performance.",
    watchFor: "Low scores among specific demographic groups reveal where belonging is not universal: belonging that requires conformity is not true inclusion.",
    whatGoodLooksLike: "Consistently high scores across all demographic groups, with no significant gap between majority and minority groups. People describe the organisation as somewhere they feel at home, not just employed.",
  },
  {
    id: "b2", theme: "belonging",
    text: "I can be myself at work without having to hide aspects of my identity.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Psychological safety to bring one's full self — rather than a version edited to fit a dominant culture — is a core inclusion indicator.",
    watchFor: "Gaps between groups on this question often reveal where specific identities are less welcome or less safe to disclose.",
    whatGoodLooksLike: "Scores above 4 across groups, with employees describing workplaces where difference is unremarkable. No-one is performing a version of themselves to fit in.",
  },
  {
    id: "b3", theme: "belonging",
    text: "I feel valued as an individual, not just for the work I produce.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Belonging goes beyond transactional employment: people who feel valued as people, not just producers, are significantly more engaged and less likely to leave.",
    watchFor: "Low scores combined with high performance ratings may indicate a culture that extracts work without investing in people.",
    whatGoodLooksLike: "Managers know something about the person beyond their output. Employees feel their wellbeing is a genuine organisational concern, not a wellbeing programme box-tick.",
  },
  {
    id: "b4", theme: "belonging",
    text: "There are people at this organisation with whom I have a genuine connection.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Social connection at work is not a nice-to-have: isolation is a significant predictor of both poor wellbeing and early departure.",
    watchFor: "Low scores among people who joined remotely or during disruption may indicate structural barriers to relationship-building, not individual preference.",
    whatGoodLooksLike: "People describe at least one or two genuine relationships at work, not just colleagues. Connection-building feels natural, not forced through mandatory team events.",
  },
  {
    id: "f1", theme: "fairness",
    text: "I believe my pay reflects my contribution fairly, relative to others doing similar work.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Pay fairness perception is distinct from actual pay equity but predicts engagement and retention independently of both.",
    watchFor: "Significant score differences by protected characteristic warrant investigation of actual pay data: perceptions are often grounded in observable signals.",
    whatGoodLooksLike: "Employees feel broadly confident in how pay decisions are made and that the process is transparent. Disagreement exists but is directed at the process, not experienced as discrimination.",
  },
  {
    id: "f2", theme: "fairness",
    text: "Promotion decisions at this organisation are made fairly.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Perceived fairness in promotion is one of the most significant drivers of both engagement and departure intent among underrepresented groups.",
    watchFor: "A wide gap between senior and junior employees on this question may indicate that fairness is perceived differently by those with and without power to make promotion decisions.",
    whatGoodLooksLike: "Employees can describe the criteria for promotion clearly. People from underrepresented groups advance at rates comparable to majority groups. Promotion feels earned, not networked.",
  },
  {
    id: "f3", theme: "fairness",
    text: "I have equal access to opportunities to develop and progress, regardless of my background or identity.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Access to development is a key driver of progression gaps. Perception of unequal access is often an accurate signal of actual unequal access.",
    watchFor: "Consistent low scores among specific groups should be cross-referenced with actual development participation data.",
    whatGoodLooksLike: "Development opportunities are proactively shared with all employees. Managers actively encourage people who might self-select out. Participation data shows no significant demographic pattern.",
  },
  {
    id: "f4", theme: "fairness",
    text: "The workload in my team is distributed equitably.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Non-promotable, undervalued work often falls disproportionately on women and people from underrepresented groups — a phenomenon known as 'office housework'.",
    watchFor: "Disaggregated results showing women or racially minoritised employees scoring lower may signal an office housework problem worth investigating directly.",
    whatGoodLooksLike: "Administrative, logistical, and pastoral tasks are shared broadly across the team. High-profile work is allocated deliberately, not defaulted to those with the loudest voice.",
  },
  {
    id: "v1", theme: "voice",
    text: "My perspective is genuinely taken into account in team discussions and decisions.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Inclusion of diverse perspectives in decision-making is both an equity measure and a performance driver: teams that include more views make better decisions.",
    watchFor: "Low scores among specific groups indicate voice is not equally available. Structural inequalities in who is heard are common and often invisible to those whose voice is never questioned.",
    whatGoodLooksLike: "Employees feel their input changes outcomes, not just that they were consulted. Facilitators actively create space for quieter voices. Decisions reference the range of views heard.",
  },
  {
    id: "v2", theme: "voice",
    text: "I feel comfortable disagreeing with my manager or senior colleagues when I think something is wrong.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Upward dissent is a critical safety signal: teams where it is not safe to disagree are teams where errors go uncorrected and misconduct goes unreported.",
    watchFor: "Low scores predict compliance cultures rather than learning cultures. The voices most likely to be suppressed are those already marginalised.",
    whatGoodLooksLike: "Senior leaders visibly welcome challenge. Disagreement is treated as useful data, not disloyalty. People can name a recent example where they pushed back and were heard.",
  },
  {
    id: "v3", theme: "voice",
    text: "When I raise a concern or idea, I believe something will happen as a result.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Voice without responsiveness produces cynicism that is worse than never having asked. This question measures the perceived consequence of speaking, not just the perceived safety.",
    watchFor: "Low scores on this combined with higher safety scores reveal a 'heard but ignored' dynamic — often more damaging to trust than silence.",
    whatGoodLooksLike: "Employees can point to recent examples where their input led to a visible change. Organisations close the feedback loop explicitly: 'you said, we did' communication is routine.",
  },
  {
    id: "s1", theme: "safety",
    text: "I feel safe to raise concerns about how things are done here, without fear of negative consequences.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Psychological safety is the leading predictor of team performance, learning, and innovation. It is also a prerequisite for any of the other inclusion indicators to operate.",
    watchFor: "Scores below 3.5 on a 5-point scale are a significant warning sign at team level. Gaps between groups indicate that safety is not universal.",
    whatGoodLooksLike: "Employees raise concerns without rehearsing them first. Issues reach leadership without being filtered by fear. Whistleblowing mechanisms are trusted, not feared.",
  },
  {
    id: "s2", theme: "safety",
    text: "At this organisation, it is possible to make a mistake without it being held against you.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Fear of failure suppresses risk-taking, innovation, and the admission of errors that allows organisations to learn and recover. It also disproportionately affects those who feel they have less room to fail.",
    watchFor: "Low scores among underrepresented groups may indicate that the cost of failure is perceived (and often actually) higher for those with less social capital.",
    whatGoodLooksLike: "Leaders model fallibility openly, naming their own mistakes without deflection. Post-incident reviews focus on system improvement, not individual blame.",
  },
  {
    id: "s3", theme: "safety",
    text: "I would feel comfortable reporting harassment or discrimination if I experienced or witnessed it.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Willingness to report is the most direct measure of whether formal inclusion infrastructure is trusted and accessible.",
    watchFor: "Low scores indicate that policies exist but are not trusted. Common reasons: fear of retaliation, belief nothing will change, previous negative experiences of reporting.",
    whatGoodLooksLike: "Employees are confident reports are taken seriously and handled confidentially. Previous reports have demonstrably led to action. The process is clear, accessible, and not unnecessarily burdensome.",
  },
  {
    id: "in1", theme: "inclusion",
    text: "I am included in meetings and conversations that are relevant to my work.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Exclusion from relevant meetings is both a practical barrier to contribution and a signal about who is perceived as central to the work.",
    watchFor: "Part-time workers, remote workers, and people from underrepresented groups often report lower scores. Check whether exclusion is structural or interpersonal.",
    whatGoodLooksLike: "Meeting lists are reviewed deliberately. People don't discover decisions that affect them after the fact. Remote and part-time employees are included by default, not as an afterthought.",
  },
  {
    id: "in2", theme: "inclusion",
    text: "The social culture at this organisation is one I feel welcome in.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Social culture — informal norms, events, shared references and humour — is often exclusionary without intending to be. Discomfort here predicts lower belonging and lower psychological safety.",
    watchFor: "Low scores among specific groups often point to a dominant culture designed around one demographic: alcohol-centred socialising, sports references, or in-group humour others cannot safely participate in.",
    whatGoodLooksLike: "Social events are designed with varied preferences in mind. Humour is not at the expense of any group. People across demographic lines mix informally without effort.",
  },
  {
    id: "in3", theme: "inclusion",
    text: "My manager actively includes everyone in the team, not just those they have an obvious connection with.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Inclusion is enacted in thousands of micro-moments, most of them by line managers. This question measures whether managers practise inclusion actively rather than passively.",
    watchFor: "Disaggregate by team to identify managers whose inclusion practices are significantly below or above the mean. Both are useful: low scorers need support; high scorers are a model.",
    whatGoodLooksLike: "Managers are seen to rotate opportunities, draw quieter voices into conversations, and actively check in with those on the margins of the team dynamic.",
  },
  {
    id: "l1", theme: "leadership",
    text: "I believe senior leaders take inclusion and belonging seriously as a strategic priority.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Employee belief in leadership commitment is a strong predictor of whether inclusion initiatives are trusted and engaged with.",
    watchFor: "A significant gap between leadership self-assessment and employee perception of commitment is common and important: it signals a credibility gap that programmes alone cannot close.",
    whatGoodLooksLike: "Leaders speak about inclusion with specificity, not platitude. Inclusion goals appear in business strategy, not just the HR plan. Leaders are visibly accountable for progress.",
  },
  {
    id: "l2", theme: "leadership",
    text: "This organisation takes action on inclusion, not just statements.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Employees distinguish between rhetoric and action. Trust in inclusion intent is built through visible, consistent action: not declarations, campaigns, or one-off events.",
    watchFor: "Low scores among underrepresented groups combined with high scores among majority groups may indicate that action is perceived differently by those who are and are not its beneficiaries.",
    whatGoodLooksLike: "Employees can name specific changes made as a result of inclusion work: a policy changed, a process reformed, a practice dropped. The connection between stated values and observable action is clear.",
  },
  {
    id: "l3", theme: "leadership",
    text: "This organisation holds people accountable when they behave in ways that are not inclusive.",
    scale: "1 = Strongly disagree — 5 = Strongly agree",
    rationale: "Accountability for exclusionary behaviour is the single strongest signal of organisational commitment to inclusion: its absence makes everything else untrustworthy.",
    watchFor: "Low scores on this question are highly predictive of higher leaving intent. Employees who see exclusionary behaviour go unaddressed learn that the organisation does not mean what it says.",
    whatGoodLooksLike: "Consequences for exclusionary behaviour are consistent, regardless of seniority. Employees are aware of instances where accountability was applied, even without knowing all the details.",
  },
];

const DEMOGRAPHIC_QUESTIONS = [
  { id: "d1", text: "What is your role level?", note: "Helps identify whether experience differs by seniority — a common and important gap." },
  { id: "d2", text: "What is your gender?", note: "Include a 'prefer not to say' and non-binary option. Binary-only options produce less accurate data." },
  { id: "d3", text: "What is your ethnicity?", note: "Use UK census categories or equivalent for your context. Do not collapse to 'white / non-white' — this erases meaningful differences." },
  { id: "d4", text: "Do you consider yourself to have a disability or long-term health condition?", note: "Follow the Equality Act definition: a physical or mental impairment with substantial, long-term effect." },
  { id: "d5", text: "What is your primary working pattern?", note: "e.g. full-time office, full-time remote, hybrid, part-time. Often overlooked as a demographic — inclusion experiences vary significantly by working pattern." },
  { id: "d6", text: "How long have you worked at this organisation?", note: "Tenure matters: newer employees often score inclusion lower; longer-tenured employees may score safety lower if they have seen change fail before." },
];

// ── Process guide content ──────────────────────────────────────────────────────
const BEFORE_STEPS = [
  {
    heading: "Commit to sharing the results before you send the survey",
    body: "The single most common mistake in inclusion surveys is running one without a plan for what happens afterwards. Employees who complete a survey and never hear the results are worse off than if they had never been asked. Before you send anything, agree internally how results will be shared, with whom, and by when.",
  },
  {
    heading: "Ensure genuine anonymity — or say so clearly if you cannot",
    body: "Anonymity is not just a data protection consideration: it is the condition under which honest responses are possible. If your survey platform cannot guarantee anonymity (for example, if results are linked to employee IDs, or if small team sizes make individuals identifiable), say so explicitly, and consider whether that changes what you ask. Employees who doubt anonymity will score everything higher.",
  },
  {
    heading: "Set a minimum threshold for disaggregation before you begin",
    body: "A survey average that hides a 30-point gap between demographic groups is worse than useless: it creates false confidence. Decide in advance the minimum group size below which you will not report disaggregated results (typically n=10 or n=15). Do not discover this problem after you have promised employees individual group results.",
  },
  {
    heading: "Use 8 to 12 questions, consistently, over time",
    body: "A focused survey run consistently every 6 to 12 months produces far more actionable data than an exhaustive census run once. Resist the urge to add questions each round: comparability over time is more valuable than comprehensiveness in any given year.",
  },
  {
    heading: "Include at least two demographic questions",
    body: "Role level and one identity characteristic at minimum. Without demographic data you cannot identify who is experiencing inclusion differently — which is the most important thing the survey can tell you.",
  },
];

const AFTER_STEPS = [
  {
    heading: "Share results with employees before you analyse what to do about them",
    body: "Transparency precedes trust. Share top-line results — including the uncomfortable ones — before you have solutions ready. Employees who see results presented honestly are significantly more likely to trust subsequent action.",
  },
  {
    heading: "Disaggregate before you conclude anything",
    body: "An overall score of 3.8 out of 5 can coexist with a score of 2.1 for a specific group. Always look at results by role level and identity characteristics before drawing any organisational conclusion. A gap, not an average, is usually the finding.",
  },
  {
    heading: "Name what you will do — and what you will not",
    body: "Employees are rightly sceptical of inclusion action plans that promise everything. Credibility comes from naming two or three specific, time-bound commitments and then keeping them — not from a comprehensive strategy that never quite gets delivered.",
  },
  {
    heading: "Close the loop explicitly",
    body: "'You said, we did' communication — naming what employees raised and what changed as a result — is the most effective trust-building mechanism available to an organisation after a survey. Do it in every channel where the survey was promoted.",
  },
  {
    heading: "Do not run the survey again until you have acted on this one",
    body: "Survey fatigue is real but it is not caused by frequency: it is caused by pointlessness. Employees will complete a survey annually if they believe it changes something. They will stop completing it after one round if it doesn't.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const THEME_COLORS: Record<Theme, { bg: string; border: string; text: string }> = {
  belonging:   { bg: "#f0fdf4", border: "#86efac", text: "#166534" },
  fairness:    { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
  voice:       { bg: "#fdf4ff", border: "#d8b4fe", text: "#6b21a8" },
  safety:      { bg: "#fff7ed", border: "#fdba74", text: "#9a3412" },
  inclusion:   { bg: "#fefce8", border: "#fde047", text: "#713f12" },
  leadership:  { bg: "#f8fafc", border: "#94a3b8", text: "#1e293b" },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function InclusionAndBelongingSurveyPage() {
  const [tab, setTab] = useState<Tab>("browse");
  const [activeTheme, setActiveTheme] = useState<Theme | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedDemo, setSelectedDemo] = useState<Set<string>>(new Set());
  const [openTheme, setOpenTheme] = useState<Theme | null>(null);

  const visible = useMemo(() => {
    let pool = activeTheme === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.theme === activeTheme);
    const s = search.toLowerCase();
    if (s) pool = pool.filter((q) => q.text.toLowerCase().includes(s) || q.rationale.toLowerCase().includes(s));
    return pool;
  }, [activeTheme, search]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const themeCount = (theme: Theme) => [...selected].filter((id) => QUESTIONS.find((q) => q.id === id)?.theme === theme).length;
  const missingThemes = THEMES.filter((t) => themeCount(t.key) === 0).map((t) => t.label);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 1.1rem", borderRadius: "8px",
    border: active ? "2px solid var(--sage-dark)" : "2px solid transparent",
    background: active ? "var(--sage-dark)" : "transparent",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem",
    cursor: "pointer", transition: "all 0.15s",
  });

  const handlePrintSelection = () => {
    const selectedQs = QUESTIONS.filter((q) => selected.has(q.id));
    const demoQs = DEMOGRAPHIC_QUESTIONS.filter((d) => selectedDemo.has(d.id));
    if (selectedQs.length === 0) return;

    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    const qRows = selectedQs.map((q, idx) => {
      const themeInfo = THEMES.find((t) => t.key === q.theme)!;
      const tc = THEME_COLORS[q.theme];
      return `
        <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid #f3f4f6">
          <div style="display:flex;align-items:flex-start;gap:12px">
            <span style="flex-shrink:0;font-size:20px;font-weight:800;color:#d1d5db;font-family:serif;line-height:1;width:28px">${idx + 1}</span>
            <div style="flex:1">
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${tc.text};background:${tc.bg};border:1px solid ${tc.border};margin-bottom:6px">${themeInfo.icon} ${themeInfo.label}</span>
              <p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px;line-height:1.5">${q.text}</p>
              <p style="font-size:11px;color:#6b7280;margin:0">${q.scale}</p>
            </div>
          </div>
        </div>`;
    }).join("");

    const demoRows = demoQs.length > 0 ? `
      <div style="margin-top:32px;padding-top:24px;border-top:2px solid #2D5A3C">
        <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin:0 0 16px">Demographic questions</h2>
        ${demoQs.map((d, idx) => `
          <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f3f4f6">
            <div style="display:flex;align-items:flex-start;gap:12px">
              <span style="flex-shrink:0;font-size:18px;font-weight:800;color:#d1d5db;font-family:serif;line-height:1;width:28px">${idx + 1}</span>
              <p style="font-size:13px;font-weight:700;color:#111827;margin:0;line-height:1.5">${d.text}</p>
            </div>
          </div>`).join("")}
      </div>` : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Inclusion and Belonging Survey</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:#111827; background:#fff; padding:40px; }
    @media print { body { padding:0; } .no-print { display:none!important; } }
  </style>
</head>
<body>
  <button class="no-print" onclick="window.print()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#2D5A3C;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Print or save as PDF</button>
  <div style="padding-bottom:24px;border-bottom:3px solid #2D5A3C;margin-bottom:28px">
    <h1 style="font-size:22px;font-weight:800;color:#2D5A3C;margin-bottom:4px">Inclusion and Belonging Survey</h1>
    <p style="font-size:12px;color:#6b7280">The Inclusion Edit · theinclusionedit.com · Generated ${date}</p>
    <p style="font-size:12px;color:#6b7280;margin-top:4px">${selectedQs.length} survey question${selectedQs.length !== 1 ? "s" : ""}${demoQs.length > 0 ? ` + ${demoQs.length} demographic question${demoQs.length !== 1 ? "s" : ""}` : ""}</p>
  </div>
  <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin:0 0 16px">Survey questions</h2>
  ${qRows}
  ${demoRows}
  <div style="margin-top:32px;padding:14px 16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:11px;color:#166534;line-height:1.6">
    This survey should be run anonymously. Results should be disaggregated by demographic group before drawing any conclusions. Share findings with your team before deciding what to act on. The Inclusion Edit recommends running this survey every 6 to 12 months for meaningful trend data.
  </div>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>← Apply</Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Inclusion and Belonging Survey</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🤝</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>📋 Survey</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Inclusion and Belonging Survey
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            A practitioner-level survey toolkit: question bank with rationale and interpretation guidance, a survey builder to curate and export your selection, and a process guide on running surveys that actually change something.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("browse")} style={tabStyle(tab === "browse")}>📚 Question bank</button>
            <button onClick={() => setTab("builder")} style={tabStyle(tab === "builder")}>
              🛠️ Survey builder {selected.size > 0 && <span style={{ marginLeft: "0.35rem", background: "rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0 5px", fontSize: "0.7rem" }}>{selected.size}</span>}
            </button>
            <button onClick={() => setTab("guide")} style={tabStyle(tab === "guide")}>📋 Process guide</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── BROWSE TAB ── */}
        {tab === "browse" && (
          <div>
            {/* Theme scenario cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
              {THEMES.map((t) => {
                const tc = THEME_COLORS[t.key];
                const isOpen = openTheme === t.key;
                return (
                  <div key={t.key} style={{ background: tc.bg, border: `1.5px solid ${tc.border}`, borderRadius: "12px", overflow: "hidden" }}>
                    <button onClick={() => setOpenTheme(isOpen ? null : t.key)}
                      style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem", textAlign: "left" as const }}>
                      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{t.icon}</span>
                      <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: tc.text }}>{t.label}</span>
                      <span style={{ fontSize: "0.65rem", color: tc.text, opacity: 0.6, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▼</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 1rem 1rem", borderTop: `1px solid ${tc.border}` }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: tc.text, lineHeight: 1.7, margin: "0.75rem 0 0", fontStyle: "italic" }}>{t.scenario}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              <button onClick={() => setActiveTheme("all")} style={chipStyle(activeTheme === "all")}>All themes</button>
              {THEMES.map((t) => <button key={t.key} onClick={() => setActiveTheme(t.key)} style={chipStyle(activeTheme === t.key)}>{t.icon} {t.label}</button>)}
            </div>

            <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1.5rem" }}>
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
              <input type="search" placeholder="Search questions…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--white)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" as const }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", marginBottom: "0.875rem" }}>{visible.length} question{visible.length !== 1 ? "s" : ""}{selected.size > 0 && ` · ${selected.size} selected for your survey`}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {visible.map((q) => {
                const isOpen = expanded === q.id;
                const tc = THEME_COLORS[q.theme];
                const themeLabel = THEMES.find((t) => t.key === q.theme)!;
                const isSelected = selected.has(q.id);
                return (
                  <div key={q.id} style={{ background: isSelected ? tc.bg : "var(--white)", border: isSelected ? `1.5px solid ${tc.border}` : "1.5px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden", transition: "all 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0", padding: "0.875rem 1rem" }}>
                      {/* Select checkbox */}
                      <button onClick={() => toggleSelect(q.id)}
                        title={isSelected ? "Remove from survey" : "Add to survey"}
                        style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "6px", border: isSelected ? `2px solid ${tc.border}` : "2px solid var(--gray-border)", background: isSelected ? tc.bg : "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginRight: "0.75rem", marginTop: "0.1rem", transition: "all 0.15s", color: tc.text, fontSize: "0.75rem", fontWeight: 800 }}>
                        {isSelected ? "✓" : ""}
                      </button>
                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {activeTheme === "all" && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "999px", marginBottom: "0.4rem" }}>
                            {themeLabel.icon} {themeLabel.label}
                          </span>
                        )}
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.5 }}>{q.text}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", margin: "0.2rem 0 0" }}>{q.scale}</p>
                      </div>
                      {/* Expand toggle */}
                      <button onClick={() => setExpanded(isOpen ? null : q.id)}
                        style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: "0.1rem 0 0 0.75rem", color: "var(--sage-dark)", fontWeight: 800, fontSize: "1rem", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</button>
                    </div>

                    {isOpen && (
                      <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                        <div style={{ marginTop: "1rem" }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.3rem" }}>Why this question</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{q.rationale}</p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                          <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: "8px", padding: "0.75rem 0.875rem" }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#713f12", marginBottom: "0.3rem" }}>⚠ Watch for</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{q.watchFor}</p>
                          </div>
                          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "0.75rem 0.875rem" }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#166534", marginBottom: "0.3rem" }}>✓ What good looks like</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{q.whatGoodLooksLike}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selected.size > 0 && (
              <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", background: "var(--sage-dark)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", margin: 0, flex: 1 }}>
                  {selected.size} question{selected.size !== 1 ? "s" : ""} selected
                </p>
                <button onClick={() => setTab("builder")}
                  style={{ padding: "0.5rem 1.1rem", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.15)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
                  Go to survey builder →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── BUILDER TAB ── */}
        {tab === "builder" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 1rem" }}>Your selected questions</h2>

                {selected.size === 0 ? (
                  <div style={{ background: "var(--white)", border: "1.5px dashed var(--gray-border)", borderRadius: "12px", padding: "3rem 1.5rem", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--gray-soft)", marginBottom: "1rem" }}>No questions selected yet.</p>
                    <button onClick={() => setTab("browse")} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.55rem 1.25rem", cursor: "pointer" }}>Browse question bank →</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {QUESTIONS.filter((q) => selected.has(q.id)).map((q, idx) => {
                      const tc = THEME_COLORS[q.theme];
                      const themeLabel = THEMES.find((t) => t.key === q.theme)!;
                      return (
                        <div key={q.id} style={{ background: "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <span style={{ flexShrink: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#d1d5db", lineHeight: 1, width: "1.5rem", textAlign: "center", marginTop: "0.15rem" }}>{idx + 1}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.12rem 0.45rem", borderRadius: "999px", marginBottom: "0.3rem" }}>{themeLabel.icon} {themeLabel.label}</span>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.84rem", color: "var(--charcoal)", margin: "0 0 0.2rem", lineHeight: 1.45 }}>{q.text}</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--gray-soft)", margin: 0 }}>{q.scale}</p>
                          </div>
                          <button onClick={() => toggleSelect(q.id)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "0.9rem", padding: "0.1rem", lineHeight: 1 }} title="Remove">✕</button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selected.size > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--charcoal)", margin: "0 0 0.75rem" }}>Demographic questions to include</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {DEMOGRAPHIC_QUESTIONS.map((d) => {
                        const on = selectedDemo.has(d.id);
                        return (
                          <div key={d.id} onClick={() => setSelectedDemo((prev) => { const n = new Set(prev); on ? n.delete(d.id) : n.add(d.id); return n; })}
                            style={{ background: on ? "#f0fdf4" : "var(--white)", border: on ? "1.5px solid #86efac" : "1.5px solid var(--gray-border)", borderRadius: "10px", padding: "0.75rem 1rem", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "0.75rem", transition: "all 0.15s" }}>
                            <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "4px", border: on ? "2px solid #86efac" : "2px solid var(--gray-border)", background: on ? "#f0fdf4" : "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", color: "#166534", fontSize: "0.7rem", fontWeight: 800, marginTop: "0.1rem" }}>{on ? "✓" : ""}</div>
                            <div>
                              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--charcoal)", margin: "0 0 0.2rem" }}>{d.text}</p>
                              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", margin: 0, lineHeight: 1.55 }}>{d.note}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar summary */}
              <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "1.125rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--charcoal)", margin: "0 0 0.875rem" }}>Survey at a glance</p>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)" }}>Questions selected</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: selected.size >= 8 && selected.size <= 12 ? "#166534" : selected.size > 12 ? "#b91c1c" : "var(--charcoal)" }}>{selected.size}</span>
                  </div>

                  {selected.size > 0 && (
                    <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden", marginBottom: "0.5rem" }}>
                      <div style={{ height: "100%", width: `${Math.min(100, (selected.size / 12) * 100)}%`, background: selected.size > 12 ? "#dc2626" : selected.size >= 8 ? "#16a34a" : "#d97706", borderRadius: "999px", transition: "all 0.3s" }} />
                    </div>
                  )}

                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--gray-soft)", margin: "0 0 1rem", lineHeight: 1.55 }}>
                    {selected.size === 0 && "Select 8 to 12 questions for best results."}
                    {selected.size > 0 && selected.size < 8 && `Add ${8 - selected.size} more for a minimum viable survey.`}
                    {selected.size >= 8 && selected.size <= 12 && "Good range: focused and complete."}
                    {selected.size > 12 && "Consider trimming: above 12 questions risks lower completion rates."}
                  </p>

                  {THEMES.map((t) => {
                    const count = themeCount(t.key);
                    return (
                      <div key={t.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                        <span style={{ fontSize: "0.8rem", flexShrink: 0 }}>{t.icon}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: count > 0 ? "var(--charcoal)" : "#9ca3af", flex: 1 }}>{t.label}</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: count > 0 ? "#166534" : "#9ca3af" }}>{count > 0 ? count : "—"}</span>
                      </div>
                    );
                  })}

                  {missingThemes.length > 0 && selected.size > 0 && (
                    <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.75rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#92400e", margin: 0, lineHeight: 1.55 }}>
                        No questions yet from: {missingThemes.join(", ")}.
                      </p>
                    </div>
                  )}
                </div>

                <button onClick={handlePrintSelection} disabled={selected.size === 0}
                  style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "none", cursor: selected.size === 0 ? "not-allowed" : "pointer", background: selected.size === 0 ? "var(--gray-border)" : "var(--sage-dark)", color: selected.size === 0 ? "var(--gray-soft)" : "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", transition: "all 0.15s" }}>
                  🖨️ Open print-ready survey
                </button>

                {selected.size > 0 && (
                  <button onClick={() => { setSelected(new Set()); setSelectedDemo(new Set()); }}
                    style={{ width: "100%", padding: "0.5rem 1rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", cursor: "pointer", background: "var(--white)", color: "var(--gray-soft)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem" }}>
                    Clear selection
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── GUIDE TAB ── */}
        {tab === "guide" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--charcoal)", margin: "0 0 1rem" }}>Before you send</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {BEFORE_STEPS.map((step, i) => (
                  <div key={i} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", padding: "1rem 1.125rem" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.45 }}>{step.heading}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--charcoal)", margin: "0 0 1rem" }}>After you get results</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {AFTER_STEPS.map((step, i) => (
                  <div key={i} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", padding: "1rem 1.125rem" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.45 }}>{step.heading}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "12px", padding: "1rem 1.125rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--charcoal)", margin: "0 0 0.375rem" }}>Common mistakes worth naming</p>
                <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {[
                    "Running a survey as a substitute for listening, not a complement to it.",
                    "Sharing only positive results and burying the difficult ones.",
                    "Promising action before you have checked whether you can deliver it.",
                    "Presenting averaged results to leadership without disaggregation first.",
                    "Not returning to the same questions the following year, making trend data impossible.",
                  ].map((m, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)", lineHeight: 1.65 }}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
