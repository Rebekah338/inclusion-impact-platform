"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";

/* Topic taxonomy (consistent with Learn) */
const TOPIC_CHIPS = [
  "Race and Ethnicity",
  "Gender",
  "Disability",
  "Age",
  "Sexual Orientation and Gender Identity",
  "Religion and Belief",
  "Pregnancy and Maternity",
  "Neurodiversity",
  "Socioeconomic Background",
  "Mental Health",
  "Inclusion Practices",
];

/* Format chips (AI tools have their own row above the library) */
const FORMAT_CHIPS = ["Guide", "Checklist", "Toolkit", "Reflection", "Survey", "Framework", "Glossary"];

const FORMAT_ICONS: Record<string, string> = {
  Guide: "book",
  Checklist: "checklist",
  Reflection: "message",
  Survey: "chart",
  Toolkit: "wrench",
  Framework: "layers",
  Glossary: "book",
  "AI Inclusion Tool": "sparkle",
};

/* Resource data */
type Resource = {
  id: string;
  title: string;
  desc: string;
  format: string;
  topics: string[];
  time: string;
};

const ALL_RESOURCES: Resource[] = [
  // --- LIVE: pages built and routed ---
  { id: "r1",  title: "Recognising Bias",                         desc: "Identify the 10 most common cognitive biases that shape workplace decisions, from affinity bias to the halo effect, with examples and practical strategies.", format: "Toolkit",       topics: ["Inclusion Practices"],                         time: "20 min"      },
  { id: "r2",  title: "How to Be an Ally: A Practical Guide",     desc: "Move from awareness to action with seven practical commitments: listening, speaking up, amplifying marginalised voices, using privilege, and staying consistent.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "12 min read"  },
  { id: "r3",  title: "Diverse Recruitment Checklist",             desc: "22 checkpoints across three phases of recruitment (before you advertise, during the process, and after the decision) to reduce bias and widen your talent pool.", format: "Checklist",  topics: ["Inclusion Practices", "Race and Ethnicity", "Gender", "Disability"], time: "15 min" },
  { id: "r4",  title: "Cultural Competence Reflection",            desc: "Score yourself across 16 questions in four dimensions: self-awareness, cultural knowledge, communication and relationships, and taking action.", format: "Reflection", topics: ["Inclusion Practices"],                         time: "15 min"      },
  { id: "r5",  title: "Inclusive Leadership Reflection",           desc: "16 questions across visibility, fairness, belonging and psychological safety, and development; with a focus area highlighted based on your lowest-scoring section.", format: "Reflection", topics: ["Inclusion Practices"],                         time: "15 min"      },
  { id: "r6",  title: "Anti-Racist Practice Guide",                desc: "Six practical sections covering what anti-racism means, self-education, workplace application, interrupting microaggressions, structural racism, and accountability.", format: "Guide",      topics: ["Race and Ethnicity", "Inclusion Practices"],   time: "20 min read"  },
  { id: "r7",  title: "A Guide to Pronouns in the Workplace",     desc: "What pronouns are, common pronoun sets with examples, how to create a sharing culture, and an FAQ covering mistakes, name badges, and email signatures.", format: "Guide",      topics: ["Gender"],                                      time: "10 min read"  },
  { id: "r8",  title: "Supporting Neurodivergent Colleagues",      desc: "Five sections: what neurodivergence is, common workplace barriers, reasonable adjustments, supporting disclosure, and inclusive language and communication.", format: "Guide",      topics: ["Neurodiversity", "Disability"],                 time: "15 min read"  },
  { id: "r9",  title: "Inclusive Meeting Checklist",               desc: "19 checkpoints across three stages (before, during, and after the meeting) to ensure every meeting is accessible, equitable, and productive.", format: "Checklist",  topics: ["Disability", "Neurodiversity", "Inclusion Practices"], time: "5 min"   },
  { id: "r10", title: "Challenging Non-Inclusive Behaviour",       desc: "Real language for real situations: six common scenarios (interruptions, idea theft, discriminatory jokes, exclusion, name mispronunciation, and stereotyping assumptions) with in-the-moment and follow-up responses.", format: "Guide", topics: ["Inclusion Practices"], time: "15 min read" },
  { id: "r18", title: "EDI Glossary",                              desc: "A comprehensive glossary of EDI terms, concepts, and definitions: from allyship to intersectionality, psychological safety to systemic racism.", format: "Glossary",   topics: ["Inclusion Practices"],                         time: "Reference"   },
  // --- AI INCLUSION TOOLS ---
  { id: "ai1", title: "Job Spec Equity Check",            desc: "Paste your job description and get an equity audit in seconds: non-inclusive language flagged, a rationale for each suggestion, and a rewritten version ready to use.", format: "AI Inclusion Tool", topics: ["Gender", "Disability", "Inclusion Practices"], time: "5 min" },
  { id: "ai2", title: "Interview Question Generator",              desc: "Tell us the role, sector, and any equity focus areas: this tool generates a bank of bias-free, competency-based interview questions tailored to your context.", format: "AI Inclusion Tool", topics: ["Inclusion Practices", "Gender", "Disability", "Neurodiversity"], time: "5 min" },
  { id: "ai3", title: "Inclusion Strategy Builder",              desc: "Tell us where your organisation is now and what matters most. We generate a prioritised 12-month framework: focus areas, measurable objectives, quick wins, and a board-ready summary.", format: "AI Inclusion Tool", topics: ["Gender", "Race and Ethnicity", "Socioeconomic Background"], time: "10 min" },
  { id: "w1",  title: "Inclusive Hiring Questions",             desc: "21 bias-free, competency-based interview questions across 9 categories (general, behavioural, disability, gender, neurodiversity, race and ethnicity, age, religion, and wellbeing): with what to listen for and watch out for guidance for each.", format: "Toolkit",       topics: ["Inclusion Practices", "Gender", "Disability", "Neurodiversity", "Race and Ethnicity"], time: "Reference" },
  { id: "w2",  title: "Inclusive Language: Job Description Examples",  desc: "Before-and-after examples across 5 language categories: gendered language, ableist language, jargon and gatekeeping, inflated requirements, and tone and culture fit; with the problem explained and the fix justified.", format: "Toolkit",       topics: ["Gender", "Disability", "Inclusion Practices", "Socioeconomic Background"],          time: "Reference" },
  { id: "w3",  title: "Intersectional Gender Pay Gap Framework",       desc: "A structured 5-section framework for pay gap analysis that goes beyond binary gender reporting: data collection, intersectional analysis, driver identification, action planning, and reporting.", format: "Framework",  topics: ["Gender", "Race and Ethnicity", "Disability", "Inclusion Practices"],               time: "45 min"    },
  { id: "w4",  title: "Fair Progression Audit Tool",                   desc: "A 5-step progression audit process with checklists: preparing scope, gathering data, running the audit, interpreting findings, and translating them into action; with progress tracking.", format: "Toolkit",       topics: ["Inclusion Practices", "Gender", "Race and Ethnicity", "Disability"],               time: "60 min"    },
  { id: "w5",  title: "Inclusion and Belonging Survey",                desc: "A bank of 20 validated survey questions across 6 inclusion themes (belonging, fairness and equity, voice and inclusion, psychological safety, day-to-day inclusion, leadership commitment): with rationale and interpretation guidance for each.", format: "Survey",     topics: ["Inclusion Practices"],                                                               time: "Reference" },
  { id: "w6",  title: "Accessible Environments Toolkit",               desc: "Practical actions for making physical, digital, and cultural environments more accessible: 15 items across 6 areas (physical space, digital and tools, communication, meetings and events, onboarding, culture and process) with what to do, why it matters, and how to start.", format: "Toolkit",    topics: ["Disability", "Neurodiversity", "Inclusion Practices"],                               time: "Reference" },
  // --- NEW RESOURCES (built this session) ---
  { id: "s1",  title: "Acknowledging Personal Bias",              desc: "12 practical strategies for recognising and addressing your own biases: from slowing down decisions to seeking out counter-narratives and building accountability.", format: "Reflection", topics: ["Inclusion Practices"],                         time: "20 min"      },
  { id: "s2",  title: "Religious and Cultural Observance Guide",  desc: "An 11-section guide covering prayer, fasting, religious dress, sabbath, death and mourning, and more: with practical steps for managers and HR teams.", format: "Guide",      topics: ["Religion and Belief", "Inclusion Practices"], time: "20 min read"  },
  { id: "s3",  title: "Supporting Physical Disabilities",          desc: "19 reflection questions across four sections: physical environment, communication, culture and attitude, and processes and adjustments; with a 5-point rating scale.", format: "Reflection", topics: ["Disability", "Inclusion Practices"],           time: "20 min"      },
  { id: "s4",  title: "Inclusive Onboarding Guide",               desc: "A 7-phase timeline from pre-start to 90 days: covering systems access, buddy programmes, culture introduction, and long-term integration with a checklist per phase.", format: "Guide",      topics: ["Inclusion Practices", "Disability", "Neurodiversity"], time: "20 min read" },
  { id: "s5",  title: "Inclusive Remote and Hybrid Working",       desc: "9 pillars of inclusive remote and hybrid working: from equal access to tools and psychological safety in virtual spaces, to visibility, wellbeing, and leadership.", format: "Toolkit",   topics: ["Disability", "Neurodiversity", "Inclusion Practices"], time: "20 min"    },
  { id: "s6",  title: "Mitigating Sexism and Misogyny",           desc: "12 sections covering workplace culture, recruitment, promotion, pay, harassment, language, allyship, and structural action: with yes/partially/not-yet action tracking.", format: "Toolkit",   topics: ["Gender", "Inclusion Practices"],               time: "25 min"      },
  { id: "s7",  title: "EDI Fatigue Guide",                        desc: "10 practical tips for navigating EDI fatigue as a practitioner or changemaker: with self-assessment checkboxes, reflection boxes, and a personal action plan.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "20 min read"  },
  { id: "s8",  title: "Positive Action Guide",                    desc: "A clear explanation of positive action versus positive discrimination, with 10 before-and-after examples and an interactive quiz to test your understanding.", format: "Guide",      topics: ["Inclusion Practices", "Race and Ethnicity", "Gender", "Disability"], time: "20 min read" },
  { id: "s9",  title: "Supporting Diversity: A Strategy Guide",   desc: "14 evidence-based strategies for embedding diversity across the organisation: from senior leadership commitment to supplier diversity and community partnerships.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "25 min read"  },
  { id: "s10", title: "Making Policies Inclusive",                desc: "14 tips for designing inclusive policies from scratch or auditing existing ones: with an interactive checklist mode and a policy audit tracker.", format: "Checklist",  topics: ["Inclusion Practices", "Disability", "Gender"], time: "20 min"      },
  { id: "s11", title: "Inclusive Leadership Self-Assessment",     desc: "12 questions across 4 leadership dimensions with a 5-point scale: score your section tiers and identify your highest-priority development areas.", format: "Reflection", topics: ["Inclusion Practices"],                         time: "15 min"      },
  { id: "s12", title: "Inclusive Comms and Boundaries",           desc: "A traffic-light phrase guide (green/amber/red) for inclusive workplace communication, with a copy-to-clipboard feature, favourites, and a practice mode.", format: "Toolkit",   topics: ["Inclusion Practices"],                         time: "15 min"      },
  { id: "s13", title: "Micro-Affirmation Examples",               desc: "22 examples of micro-affirmations across 7 categories: filterable, copyable, and with a \"Try this today\" feature for immediate action.", format: "Toolkit",   topics: ["Inclusion Practices"],                         time: "10 min"      },
  { id: "s14", title: "Exit Interview Questions",                 desc: "A bank of exit interview questions across 7 thematic sections: select the questions most relevant to your context and export or copy your chosen set.", format: "Toolkit",   topics: ["Inclusion Practices"],                         time: "Reference"   },
  { id: "s15", title: "Inclusive Imagery Checklist",              desc: "10 sections covering authentic representation, challenging stereotypes, accessibility, trauma-informed imagery, and ongoing review: with sub-point checkboxes and a quick audit mode.", format: "Checklist",  topics: ["Inclusion Practices", "Disability", "Race and Ethnicity"], time: "20 min" },
  { id: "s16", title: "ERG and Staff Network Checklist",          desc: "10 sections for setting up or auditing an employee resource group: from foundations and governance to impact, sustainability, and equity practices; with a health rating per section.", format: "Checklist",  topics: ["Inclusion Practices"],                         time: "20 min"      },
  { id: "s17", title: "Inclusive Event Planning Checklist",       desc: "A 3-phase checklist (pre-event, during, post-event) across 14 sections: from stakeholder co-design and venue accessibility to catering, communications, and evaluation.", format: "Checklist",  topics: ["Disability", "Religion and Belief", "Inclusion Practices"], time: "25 min" },
  { id: "s18", title: "Challenging Ageism in the Workplace",    desc: "An 11-area audit covering recruitment, progression, performance, leadership, culture, flexible working, intersectionality, and measurement: with yes/partially/not-yet status tracking.", format: "Toolkit",   topics: ["Age", "Inclusion Practices"],                  time: "20 min"      },
  { id: "s19", title: "Inclusive Data Collection",                desc: "A 7-step guide to collecting equality data ethically: with a pre-collection planning tool, step-by-step guidance, and a UK legal framework callout.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "20 min read"  },
  // --- AI INCLUSION TOOLS: not yet built ---
  { id: "ai-policy",  title: "Policy Equity Auditor",       desc: "Paste any existing policy and receive a structured audit report: inclusive language review, legal framework alignment, accountability checks, and a prioritised action list.", format: "AI Inclusion Tool", topics: ["Inclusion Practices"], time: "10 min" },
  { id: "ai-health",  title: "Inclusion Health Check",       desc: "A 15-question diagnostic across five inclusion dimensions: get a traffic light rating for each area and a prioritised list of next steps.", format: "AI Inclusion Tool", topics: ["Inclusion Practices"], time: "10 min" },
  { id: "ai-paygap",  title: "Gender Pay Gap Statement Builder",  desc: "Input your gender pay gap figures and receive a statutory narrative report: honest, constructive, legally sound, and ready to publish.", format: "AI Inclusion Tool", topics: ["Gender", "Inclusion Practices"], time: "10 min" },
  // --- COMING SOON: placeholder resources ---
  { id: "r11", title: "Inclusion Maturity Framework",              desc: "Assess where your organisation sits on the inclusion maturity spectrum and identify the most impactful next steps.", format: "Framework",  topics: ["Inclusion Practices"],                         time: "45 min"      },
  { id: "r13", title: "30/60/90 Day EDI Action Planner",           desc: "A practical planning tool for those new to an EDI role or kicking off a new strategy. Break your first quarter into focused, achievable steps.", format: "Toolkit",       topics: ["Inclusion Practices"],                         time: "60 min"      },
  { id: "r14", title: "Getting Started with EDI Strategy",         desc: "A step-by-step guide to scoping, designing, and launching your first organisation-wide EDI strategy from baseline audit to board sign-off.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "20 min read"  },
  { id: "r15", title: "Talking to Sceptical Stakeholders",         desc: "How to navigate resistance from senior leaders and budget holders with evidence-based arguments and conversation frameworks.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "10 min read"  },
  { id: "r20", title: "Intersectionality in Practice",             desc: "How to apply an intersectional lens to your EDI work in research, policy, and practice without tokenism or oversimplification.", format: "Guide",      topics: ["Inclusion Practices"],                         time: "15 min read"  },
];

const AI_IDS = new Set(["ai1", "ai2", "ai3", "ai-policy", "ai-health", "ai-paygap"]);
const AI_ICONS: Record<string, string> = { ai1: "briefcase", ai2: "target", ai3: "map", "ai-policy": "clipboard", "ai-health": "pulse", "ai-paygap": "chart" };

const CATEGORY_MAP: Record<string, string[]> = {
  "Recruitment and Hiring":    ["r3", "r2", "w1", "w2", "w4", "w5"],
  "Policy and Process":        ["r11", "r13", "r14", "s10", "s19", "w3"],
  "Culture and Belonging":     ["r1", "r4", "r9", "r10", "s1", "s7", "s12", "s13", "s14", "s16"],
  "Leadership and Strategy":   ["r5", "r15", "r20", "s9", "s11", "s18"],
  "People and Characteristics":["r6", "r7", "r8", "r18", "s2", "s3", "s6", "s8"],
  "Events, Comms and Culture": ["r2", "s4", "s5", "s15", "s17", "w6"],
};

type Tone = { color: string; bg: string; mid: string };

/* One colour per category, kept everywhere: four hub collection tones plus two from the category palette */
const CATEGORY_STYLE: Record<string, Tone & { icon: string; description: string }> = {
  "Recruitment and Hiring":     { color: "var(--coll-blue)", bg: "var(--coll-blue-tint)", mid: "var(--coll-blue-mid)", icon: "briefcase", description: "Fairer hiring, from the job advert to the offer." },
  "Policy and Process":         { color: "#1F5C73", bg: "#E2F0F4", mid: "#5FA3BA", icon: "clipboard", description: "Policies, plans and data that make inclusion stick." },
  "Culture and Belonging":      { color: "var(--coll-green)", bg: "var(--coll-green-tint)", mid: "var(--coll-green-mid)", icon: "people", description: "Everyday behaviours that shape how people feel at work." },
  "Leadership and Strategy":    { color: "var(--coll-purple)", bg: "var(--coll-purple-tint)", mid: "var(--coll-purple-mid)", icon: "leadership", description: "Lead inclusion with confidence and bring others with you." },
  "People and Characteristics": { color: "#9A4325", bg: "#FBE9E1", mid: "#E08A62", icon: "heart", description: "Practical support for specific groups and identities." },
  "Events, Comms and Culture":  { color: "var(--coll-amber)", bg: "var(--coll-amber-tint)", mid: "var(--coll-amber-mid)", icon: "megaphone", description: "Inclusive events, onboarding, imagery and ways of working." },
};
const DEFAULT_TONE: Tone = { color: "var(--coll-green)", bg: "var(--coll-green-tint)", mid: "var(--coll-green-mid)" };

const RESOURCE_SLUGS: Record<string, string> = {
  r1:  "recognising-bias",
  r2:  "how-to-be-an-ally",
  r3:  "diverse-recruitment-checklist",
  r4:  "cultural-competence-reflection",
  r5:  "inclusive-leadership-reflection",
  r6:  "anti-racist-practice-guide",
  r7:  "pronouns-guide",
  r8:  "neurodivergent-support-guide",
  r9:  "inclusive-meeting-checklist",
  r10: "challenging-non-inclusive-behaviour",
  r18: "edi-glossary",
  ai1: "/dashboard/inclusion-ai/jd-equity-checker",
  ai2: "/dashboard/inclusion-ai/interview-question-generator",
  ai3: "/dashboard/inclusion-ai/inclusion-strategy-builder",
  w1:  "bias-free-interview-question-bank",
  w2:  "inclusive-language-job-description-examples",
  w3:  "intersectional-gender-pay-gap-framework",
  w4:  "fair-progression-audit-tool",
  w5:  "inclusion-and-belonging-survey",
  w6:  "accessible-environments-toolkit",
  s1:  "acknowledging-personal-bias",
  s2:  "religious-cultural-observance",
  s3:  "supporting-physical-disabilities",
  s4:  "inclusive-onboarding-guide",
  s5:  "inclusive-remote-hybrid",
  s6:  "mitigating-sexism-misogyny",
  s7:  "edi-fatigue-guide",
  s8:  "positive-action-guide",
  s9:  "supporting-diversity-guide",
  s10: "making-policies-inclusive",
  s11: "inclusive-leadership-self-assessment",
  s12: "inclusive-comms-boundaries",
  s13: "micro-affirmation-examples",
  s14: "exit-interview-questions",
  s15: "inclusive-imagery-checklist",
  s16: "erg-checklist",
  s17: "inclusive-event-planning",
  s18: "challenging-ageism",
  s19: "inclusive-data-collection",
  r11: "inclusion-maturity-framework",
  r13: "edi-action-planner",
  r14: "edi-strategy-guide",
  r15: "sceptical-stakeholders",
  r20: "intersectionality",
  "ai-policy": "policy-equity-auditor",
  "ai-health": "/dashboard/inclusion-ai/inclusion-health-check",
  "ai-paygap": "/dashboard/inclusion-ai/gender-pay-gap-statement-builder",
};

const hrefFor = (id: string) => {
  const slug = RESOURCE_SLUGS[id];
  if (!slug) return null;
  return slug.startsWith("/") ? slug : `/dashboard/apply/${slug}`;
};

const PREVIEW_COUNT = 4;

const chipStyle = (selected: boolean): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: "0.35rem",
  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem",
  padding: "0.4rem 0.9rem", minHeight: "34px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
  borderColor: selected ? "var(--evergreen)" : "var(--line)",
  background: selected ? "var(--evergreen)" : "var(--white)",
  color: selected ? "var(--white)" : "var(--ink)",
  transition: "all 0.15s",
});

const iconButton = (active: boolean, tone: Tone): React.CSSProperties => ({
  width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  border: `1.5px solid ${active ? tone.color : "var(--white)"}`, background: active ? tone.color : "var(--white)",
});

export default function ApplyPage() {
  const [search, setSearch] = useState("");
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [myToolkit, setMyToolkit] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [toolkitView, setToolkitView] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [shareMenuId, setShareMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isFiltering = Boolean(search || activeTopics.length || activeFormats.length);
  const libraryCount = ALL_RESOURCES.filter((r) => !AI_IDS.has(r.id)).length;
  const aiTools = ALL_RESOURCES.filter((r) => AI_IDS.has(r.id));

  const matches = (r: Resource) => {
    const q = search.toLowerCase();
    const okSearch = !q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
    const okTopic = !activeTopics.length || r.topics.some((t) => activeTopics.includes(t));
    const okFormat = !activeFormats.length || activeFormats.includes(r.format);
    return okSearch && okTopic && okFormat;
  };

  const categories = useMemo(() => Object.keys(CATEGORY_MAP).map((cat) => ({
    name: cat,
    style: CATEGORY_STYLE[cat],
    resources: (CATEGORY_MAP[cat] || []).map((id) => ALL_RESOURCES.find((r) => r.id === id)).filter((r): r is Resource => Boolean(r) && !AI_IDS.has((r as Resource).id)).filter(matches),
  })).filter((c) => c.resources.length > 0),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [search, activeTopics, activeFormats]);

  const toolkitResources = ALL_RESOURCES.filter((r) => myToolkit.includes(r.id));
  const totalVisible = new Set(categories.flatMap((c) => c.resources.map((r) => r.id))).size;

  const toggleTopic = (t: string) => setActiveTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleFormat = (f: string) => setActiveFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  const toggleToolkit = (id: string) => setMyToolkit((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const markVisited = (id: string) => setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const clearAll = () => { setSearch(""); setActiveTopics([]); setActiveFormats([]); };

  const categoryOf = (id: string) => Object.keys(CATEGORY_MAP).find((c) => CATEGORY_MAP[c].includes(id));

  const copyLink = (id: string) => {
    const href = hrefFor(id);
    if (!href || typeof window === "undefined") return;
    navigator.clipboard.writeText(`${window.location.origin}${href}`);
    setCopiedId(id);
    setShareMenuId(null);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderCard = (r: Resource, tone: Tone) => {
    const href = hrefFor(r.id);
    const isVisited = visited.includes(r.id);
    const isSaved = myToolkit.includes(r.id);
    const formatIcon = FORMAT_ICONS[r.format] || "book";
    return (
      <article key={r.id} style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-md)", borderTop: `6px solid ${tone.color}`, borderRight: `1.5px solid ${tone.mid}`, borderBottom: `1.5px solid ${tone.mid}`, borderLeft: `1.5px solid ${tone.mid}`, boxShadow: "var(--shadow-sm)", position: "relative" }}>
        {/* Pale header: format, visited state, save and share */}
        <div style={{ background: tone.bg, padding: "0.6rem 0.75rem 0.6rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", borderRadius: "6px 6px 0 0" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: tone.color, whiteSpace: "nowrap" }}>
            <Icon name={formatIcon} size={16} color={tone.color} /> {r.format}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {isVisited && (
              <span aria-label="Opened" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--white)", background: "var(--evergreen)", borderRadius: "999px", padding: "0.2rem 0.55rem" }}>
                <Icon name="check" size={12} color="var(--white)" strokeWidth={2.5} /> Opened
              </span>
            )}
            <button onClick={() => toggleToolkit(r.id)} aria-pressed={isSaved} aria-label={isSaved ? `Remove ${r.title} from My Toolkit` : `Save ${r.title} to My Toolkit`} title={isSaved ? "Saved to My Toolkit" : "Save to My Toolkit"} style={iconButton(isSaved, tone)}>
              <Icon name="bookmark" size={16} color={isSaved ? "var(--white)" : tone.color} />
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShareMenuId(shareMenuId === r.id ? null : r.id)} aria-expanded={shareMenuId === r.id} aria-label={`Share or print ${r.title}`} title="Share or print" style={iconButton(false, tone)}>
                <Icon name="share" size={16} color={tone.color} />
              </button>
              {shareMenuId === r.id && href && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-md)", padding: "0.35rem", zIndex: 20, minWidth: "190px" }}>
                  <button onClick={() => copyLink(r.id)} style={{ display: "flex", alignItems: "center", gap: "0.55rem", width: "100%", padding: "0.6rem 0.75rem", minHeight: "44px", background: "none", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", textAlign: "left" }}>
                    <Icon name="link" size={16} color="var(--slate)" /> Copy link
                  </button>
                  <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => setShareMenuId(null)} style={{ display: "flex", alignItems: "center", gap: "0.55rem", width: "100%", padding: "0.6rem 0.75rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "6px", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", textDecoration: "none" }}>
                    <Icon name="printer" size={16} color="var(--slate)" /> Print or save as PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "0.9rem 1.05rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)", lineHeight: 1.35, margin: 0 }}>
            {href ? <Link href={href} onClick={() => markVisited(r.id)} style={{ color: "inherit", textDecoration: "none" }}>{r.title}</Link> : r.title}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {r.desc}
          </p>
          <div style={{ marginTop: "auto", paddingTop: "0.55rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--slate)" }}>
              <Icon name="clock" size={14} color="var(--slate)" /> {r.time}
            </span>
            {href && (
              <Link href={href} onClick={() => markVisited(r.id)} aria-label={`Open ${r.title}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)", textDecoration: "none" }}>
                Open {r.format} <Icon name="chevron" size={15} color="var(--evergreen)" />
              </Link>
            )}
          </div>
        </div>
        {copiedId === r.id && (
          <span role="status" style={{ position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", background: "var(--ink)", borderRadius: "999px", padding: "0.3rem 0.8rem" }}>
            Link copied
          </span>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/apply-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 2.5rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              Impact Platform: Apply
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Explore</span> <span style={{ color: "var(--hero-mint)" }}>Resources.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "580px", margin: "0 0 1.25rem" }}>
            Guides, checklists and toolkits that turn what you have learned into what you do next.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="book" color="var(--hero-cream)" /> {libraryCount} practical resources</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="layers" color="var(--hero-cream)" /> {Object.keys(CATEGORY_MAP).length} collections</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="bookmark" color="var(--hero-cream)" /> Save favourites to My Toolkit</span>
          </div>
        </div>
      </header>

      {/* FILTER STRIP */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "1.35rem 1.5rem 1.25rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }} aria-label="Resource collections">
            {Object.keys(CATEGORY_MAP).map((cat) => {
              const st = CATEGORY_STYLE[cat];
              return (
                <a key={cat} href={`#collection-${cat.replace(/[^a-z]+/gi, "-").toLowerCase()}`} onClick={() => setToolkitView(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.85rem", borderRadius: "999px", border: `1.5px solid ${st.color}`, background: "var(--white)", fontSize: "0.82rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: st.color, whiteSpace: "nowrap", textDecoration: "none" }}>
                  <Icon name={st.icon} size={15} color={st.color} /> {cat}
                </a>
              );
            })}
            <button onClick={() => setToolkitView((v) => !v)} aria-pressed={toolkitView} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", border: "1.5px solid var(--evergreen)", background: toolkitView ? "var(--evergreen)" : "var(--pale-sage)", color: toolkitView ? "var(--white)" : "var(--evergreen)", fontSize: "0.82rem", fontFamily: "var(--font-heading)", fontWeight: 700, cursor: "pointer", marginLeft: "auto" }}>
              <Icon name="bookmark" size={15} color={toolkitView ? "var(--white)" : "var(--evergreen)"} /> My Toolkit{myToolkit.length > 0 ? ` (${myToolkit.length})` : ""}
            </button>
          </div>

          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex" }}><Icon name="search" color="var(--slate)" /></span>
            <input
              type="search"
              placeholder="Search guides, checklists and toolkits"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search resources"
              style={{ width: "100%", padding: "0.85rem 1.25rem 0.85rem 3rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--mist)", color: "var(--ink)", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", alignItems: "center", marginBottom: "0.6rem" }} aria-label="Filter by topic">
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)", marginRight: "0.3rem" }}>Topic</span>
            {TOPIC_CHIPS.map((t) => (
              <button key={t} onClick={() => toggleTopic(t)} aria-pressed={activeTopics.includes(t)} style={chipStyle(activeTopics.includes(t))}>
                {activeTopics.includes(t) && <Icon name="check" size={13} color="var(--white)" strokeWidth={2.5} />} {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", alignItems: "center" }} aria-label="Filter by format">
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)", marginRight: "0.3rem" }}>Format</span>
            {FORMAT_CHIPS.map((f) => (
              <button key={f} onClick={() => toggleFormat(f)} aria-pressed={activeFormats.includes(f)} style={chipStyle(activeFormats.includes(f))}>
                <Icon name={FORMAT_ICONS[f]} size={14} color={activeFormats.includes(f) ? "var(--white)" : "var(--slate)"} /> {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 4.5rem" }}>

        {/* MY TOOLKIT VIEW */}
        {toolkitView ? (
          <section aria-labelledby="toolkit-title">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "0.95rem 1.35rem", background: "var(--pale-sage)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--evergreen)" }}>
              <Icon name="bookmark" size={22} color="var(--evergreen)" />
              <h2 id="toolkit-title" style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--evergreen)", margin: 0 }}>My Toolkit</h2>
              <button onClick={() => setToolkitView(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Back to all resources</button>
            </div>
            {toolkitResources.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1.5rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}><Icon name="bookmark" size={38} color="var(--sage)" /></div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 0.4rem" }}>Your toolkit is empty</p>
                <p style={{ margin: 0 }}>Save any resource with the bookmark on its card and it will appear here.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                {toolkitResources.map((r) => renderCard(r, CATEGORY_STYLE[categoryOf(r.id) || ""] || DEFAULT_TONE))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* INCLUSION AI: a compact row of the AI tools that sit with these resources */}
            {!isFiltering && (
              <section aria-labelledby="ai-for-apply" style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem 1rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--evergreen)", marginBottom: "0.3rem" }}>
                      <Icon name="sparkle" size={14} color="var(--gold)" strokeWidth={2} /> Short on time
                    </div>
                    <h2 id="ai-for-apply" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.6vw, 1.75rem)", color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>
                      Let Inclusion AI do the first draft
                    </h2>
                  </div>
                  <Link href="/dashboard/inclusion-ai" style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--evergreen)", textDecoration: "none" }}>
                    See all AI tools <Icon name="chevron" size={15} color="var(--evergreen)" />
                  </Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "0.85rem" }}>
                  {aiTools.map((t) => {
                    const href = hrefFor(t.id) || "/dashboard/inclusion-ai";
                    return (
                      <Link key={t.id} href={href} style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "var(--white)", border: "1.5px solid var(--coll-green-mid)", borderLeft: "4px solid var(--coll-green)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", padding: "0.75rem 1rem", textDecoration: "none", minHeight: "64px" }}>
                        <span style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "var(--coll-green-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={AI_ICONS[t.id] || "sparkle"} size={19} color="var(--coll-green)" />
                        </span>
                        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.3 }}>{t.title}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--coll-green)", background: "var(--coll-green-tint)", padding: "0.22rem 0.6rem", borderRadius: "999px" }}>
                          <Icon name="sparkle" size={12} color="var(--gold)" strokeWidth={2} /> Inclusion AI
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {isFiltering && (
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--slate)", margin: "0 0 1.5rem" }} aria-live="polite">
                {totalVisible === 0 ? "No resources found" : `${totalVisible} resource${totalVisible === 1 ? "" : "s"} found`}
                <button onClick={clearAll} style={{ marginLeft: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Clear filters
                </button>
              </p>
            )}

            {isFiltering && totalVisible === 0 && (
              <div style={{ textAlign: "center", padding: "3rem 1.5rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}><Icon name="search" size={38} color="var(--sage)" /></div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 0.4rem" }}>No resources match your filters</p>
                <p style={{ margin: 0 }}>Try a different keyword or fewer filters.</p>
              </div>
            )}

            {/* COLLECTIONS: section opener, first four cards, then Show all */}
            {categories.map((c) => {
              const slug = c.name.replace(/[^a-z]+/gi, "-").toLowerCase();
              const open = isFiltering || expanded[c.name];
              const shown = open ? c.resources : c.resources.slice(0, PREVIEW_COUNT);
              return (
                <section key={c.name} id={`collection-${slug}`} style={{ marginBottom: "2.5rem", scrollMarginTop: "90px" }} aria-labelledby={`title-${slug}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem", padding: "0.85rem 1.25rem", background: c.style.bg, borderRadius: "var(--radius-md)", borderLeft: `4px solid ${c.style.color}` }}>
                    <Icon name={c.style.icon} size={22} color={c.style.color} />
                    <div style={{ flex: 1, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.2rem 0.75rem" }}>
                      <h2 id={`title-${slug}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: c.style.color, margin: 0 }}>{c.name}</h2>
                      <span style={{ fontSize: "0.9rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>{c.style.description}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: c.style.color, whiteSpace: "nowrap" }}>
                      {c.resources.length} resource{c.resources.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div id={`list-${slug}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                    {shown.map((r) => renderCard(r, c.style))}
                  </div>
                  {!isFiltering && c.resources.length > PREVIEW_COUNT && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1.1rem" }}>
                      <button
                        onClick={() => setExpanded((e) => ({ ...e, [c.name]: !e[c.name] }))}
                        aria-expanded={Boolean(expanded[c.name])}
                        aria-controls={`list-${slug}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: c.style.color, background: "var(--white)", border: `1.5px solid ${c.style.color}`, borderRadius: "999px", padding: "0.55rem 1.35rem", minHeight: "44px", cursor: "pointer" }}
                      >
                        {expanded[c.name] ? "Show fewer" : `Show all ${c.resources.length} resources`}
                        <span style={{ display: "flex", transform: expanded[c.name] ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.2s" }}>
                          <Icon name="chevron" size={16} color={c.style.color} />
                        </span>
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
