"use client";
import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getCompleted } from "@/lib/completionStore";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

/* Brand line icons (Lucide style, 1.75px stroke) replace emoji, as set out in the Visual Brand Guide */
const ICON_PATHS: Record<string, string[]> = {
  people: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  systems: ["M12 2 2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  leadership: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
  book: ["M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z", "M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  award: ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89 7 23l5-3 5 3-1.21-9.12"],
  layers: ["M4 4h16v16H4z", "M4 9h16", "M9 9v11"],
  check: ["M20 6 9 17l-5-5"],
  chevron: ["M9 18l6-6-6-6"],
  back: ["M19 12H5", "M12 19l-7-7 7-7"],
};

function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      {(ICON_PATHS[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const pathways = [
  {
    id: "people-culture",
    title: "People & Culture",
    color: "var(--coll-green)",
    bg: "var(--coll-green-tint)",
    mid: "var(--coll-green-mid)",
    icon: "people",
    courses: [
      {
        id: "foundations-of-inclusion",
        title: "Foundations of Inclusion",
        description: "Understand yourself, communicate inclusively, and move from good intentions to real allyship.",
        tags: ["Bias", "Language", "Allyship"],
        modules: [
          {
            id: "understanding-yourself",
            title: "Understanding Yourself",
            lessons: [
              { id: "understanding-your-bias", title: "Understanding Your Bias: A Self-Reflection Starter" },
              { id: "managing-edi-fatigue", title: "Sustaining Your Inclusion Practice: Managing EDI Fatigue" },
            ],
          },
          {
            id: "language-communication",
            title: "Language & Communication",
            lessons: [
              { id: "communicating-inclusively", title: "Communicating Inclusively: Language, Tone and Boundaries" },
              { id: "pronouns-and-language", title: "Pronouns and Language: A Practical Workplace Guide" },
              { id: "speaking-up", title: "Speaking Up: Challenging Exclusionary Behaviour at Work" },
            ],
          },
          {
            id: "allyship-in-action",
            title: "Allyship in Action",
            lessons: [
              { id: "active-allyship", title: "Active Allyship: Moving from Intention to Impact" },
              { id: "what-is-intersectionality", title: "What Is Intersectionality? A Practical Introduction" },
            ],
          },
        ],
      },
      {
        id: "building-inclusive-culture",
        title: "Building an Inclusive Culture",
        description: "Create workplaces where everyone belongs, through culture, representation and identity.",
        tags: ["Culture", "Belonging", "Race"],
        modules: [
          {
            id: "culture-belonging",
            title: "Culture & Belonging",
            lessons: [
              { id: "building-inclusive-workplace", title: "Building an Inclusive Workplace Culture" },
              { id: "run-meetings-that-work", title: "Run Meetings That Work for Everyone" },
              { id: "hybrid-remote", title: "Inclusion Across Distance: Hybrid and Remote Working" },
            ],
          },
          {
            id: "representation-visibility",
            title: "Representation & Visibility",
            lessons: [
              { id: "imagery-inclusively", title: "Representation Matters: Using Imagery Inclusively" },
              { id: "inclusive-events", title: "Plan Events Everyone Can Access" },
              { id: "faith-culture-work", title: "Faith, Culture and Work: What Leaders Must Know" },
            ],
          },
          {
            id: "identity-at-work",
            title: "Identity at Work",
            lessons: [
              { id: "age-inclusive-workplaces", title: "Age-Inclusive Workplaces: Recognising and Addressing Ageism" },
              { id: "gender-equitable-workplaces", title: "Creating Gender-Equitable Workplaces" },
              { id: "anti-racist-practice", title: "Anti-Racist Practice: A Practical Framework" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "systems-processes",
    title: "Systems & Processes",
    color: "var(--coll-purple)",
    bg: "var(--coll-purple-tint)",
    mid: "var(--coll-purple-mid)",
    icon: "systems",
    courses: [
      {
        id: "inclusive-recruitment-retention",
        title: "Inclusive Recruitment & Retention",
        description: "Attract diverse talent, hire without bias, and build conditions where people stay.",
        tags: ["Recruitment", "Policy", "Data & Evidence"],
        modules: [
          {
            id: "attracting-diverse-talent",
            title: "Attracting Diverse Talent",
            lessons: [
              { id: "inclusive-job-descriptions", title: "Write Job Descriptions That Include Everyone" },
              { id: "recruit-inclusively", title: "Recruit Inclusively: Your Quick-Start Checklist" },
              { id: "bias-free-interviewing", title: "Bias-Free Interviewing: Ask Better Questions" },
            ],
          },
          {
            id: "joining-staying",
            title: "Joining & Staying",
            lessons: [
              { id: "onboard-inclusively", title: "Onboard Inclusively From Day One" },
              { id: "exit-interviews-inclusion", title: "Exit Interviews That Surface Inclusion Data" },
              { id: "retention", title: "Retention That Works: Keeping an Inclusive Workforce" },
            ],
          },
        ],
      },
      {
        id: "policy-data-legal",
        title: "Policy, Data & Legal Frameworks",
        description: "Audit your policies, understand the law, collect meaningful data, and embed disability inclusion.",
        tags: ["Policy", "Data & Evidence", "Disability"],
        modules: [
          {
            id: "policy-legal-foundations",
            title: "Policy & Legal Foundations",
            lessons: [
              { id: "policy-audit", title: "Inclusion-Ready Policies: A Practical Audit" },
              { id: "positive-action", title: "Positive Action vs Positive Discrimination: Know the Difference" },
              { id: "equality-act", title: "Understanding the Equality Act: What Practitioners Need to Know" },
            ],
          },
          {
            id: "data-drives-decisions",
            title: "Data That Drives Decisions",
            lessons: [
              { id: "collecting-inclusion-data", title: "Collecting Inclusion Data That Drives Decisions" },
              { id: "gender-pay-gap", title: "The Gender Pay Gap: An Intersectional Approach" },
            ],
          },
          {
            id: "disability-neuroinclusion",
            title: "Disability & Neuroinclusion",
            lessons: [
              { id: "disability-inclusion", title: "Disability Inclusion: Best Practice for Leaders" },
              { id: "neuroinclusion", title: "Neuroinclusion at Work: What Leaders Need to Know" },
              { id: "reasonable-adjustments", title: "Reasonable Adjustments in Practice" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "leadership-strategy",
    title: "Leadership & Strategy",
    color: "var(--coll-amber)",
    bg: "var(--coll-amber-tint)",
    mid: "var(--coll-amber-mid)",
    icon: "leadership",
    courses: [
      {
        id: "inclusive-leadership",
        title: "Inclusive Leadership",
        description: "Develop the reflection, decision-making and stakeholder skills of an inclusive leader.",
        tags: ["Leadership", "Strategy"],
        modules: [
          {
            id: "leading-inclusively",
            title: "Leading Inclusively",
            lessons: [
              { id: "leadership-reflection", title: "Inclusive Leadership: A Structured Reflection Programme" },
              { id: "decide-inclusively", title: "Decide Inclusively: A Framework for Leaders" },
              { id: "psychological-safety", title: "Psychological Safety: What Leaders Need to Create It" },
            ],
          },
          {
            id: "ergs-stakeholders",
            title: "ERGs & Stakeholders",
            lessons: [
              { id: "building-ergs", title: "Building ERGs That Work" },
              { id: "stakeholder-engagement", title: "Inclusive Stakeholder Engagement" },
            ],
          },
        ],
      },
      {
        id: "strategy-organisational-change",
        title: "Strategy & Organisational Change",
        description: "Build the business case, develop a strategy, and embed inclusion at every level of your organisation.",
        tags: ["Strategy", "Data & Evidence", "Leadership"],
        modules: [
          {
            id: "building-business-case",
            title: "Building the Business Case",
            lessons: [
              { id: "business-case-inclusion", title: "Making the Business Case for Inclusion" },
              { id: "measuring-inclusion", title: "Measuring Inclusion: Metrics That Matter" },
            ],
          },
          {
            id: "embedding-systemically",
            title: "Embedding Inclusion Systemically",
            lessons: [
              { id: "edi-strategy", title: "Developing an EDI Strategy from Scratch" },
            ],
          },
        ],
      },
    ],
  },
];

const pathwayById = (id: string) => pathways.find((p) => p.id === id) ?? pathways[0];

const FOUNDATION_LESSONS = [
  {
    id: "understanding-your-bias",
    title: "Understanding Your Bias: A Self-Reflection Starter",
    blurb: "Walk away with a clear picture of your own biases and a simple framework to keep them in check.",
    duration: "20 min",
    pathwayId: "people-culture",
    tag: "Bias",
  },
  {
    id: "recruit-inclusively",
    title: "Recruit Inclusively: Your Quick-Start Checklist",
    blurb: "A practical checklist you can apply to your next recruitment cycle immediately.",
    duration: "8 min",
    pathwayId: "systems-processes",
    tag: "Recruitment",
  },
  {
    id: "run-meetings-that-work",
    title: "Run Meetings That Work for Everyone",
    blurb: "Simple, actionable changes to make every meeting more inclusive from your next one.",
    duration: "12 min",
    pathwayId: "people-culture",
    tag: "Culture",
  },
  {
    id: "pronouns-and-language",
    title: "Pronouns and Language: A Practical Workplace Guide",
    blurb: "Get confident with inclusive language and pronouns, using real workplace examples.",
    duration: "10 min",
    pathwayId: "people-culture",
    tag: "Language",
  },
  {
    id: "positive-action",
    title: "Positive Action vs Positive Discrimination: Know the Difference",
    blurb: "One of the most misunderstood distinctions in EDI, explained clearly in under 15 minutes.",
    duration: "12 min",
    pathwayId: "systems-processes",
    tag: "Policy",
  },
  {
    id: "imagery-inclusively",
    title: "Representation Matters: Using Imagery Inclusively",
    blurb: "Audit your visual communications and make changes that signal inclusion to everyone.",
    duration: "8 min",
    pathwayId: "people-culture",
    tag: "Culture",
  },
  {
    id: "onboard-inclusively",
    title: "Onboard Inclusively From Day One",
    blurb: "Simple changes to your onboarding process that make every new starter feel they belong.",
    duration: "10 min",
    pathwayId: "systems-processes",
    tag: "Recruitment",
  },
  {
    id: "active-allyship",
    title: "Active Allyship: Moving from Intention to Impact",
    blurb: "Move beyond good intentions with a clear framework for everyday allyship in the workplace.",
    duration: "12 min",
    pathwayId: "people-culture",
    tag: "Allyship",
  },
];

const ALL_TAGS = [
  "Allyship", "Belonging", "Bias", "Culture", "Data & Evidence",
  "Disability", "Language", "Leadership", "Policy",
  "Race", "Recruitment", "Strategy",
];

function LearnPageInner() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();
  const courseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setCompletedLessons(getCompleted());
    const handler = () => setCompletedLessons(getCompleted());
    window.addEventListener("tie_completion_changed", handler);
    return () => window.removeEventListener("tie_completion_changed", handler);
  }, []);

  useEffect(() => {
    const from = searchParams.get("from");
    if (!from) return;
    setExpandedCourses((prev) => { const next = new Set(prev); next.add(from); return next; });
    setTimeout(() => {
      const el = courseRefs.current[from];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [searchParams]);

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  };

  const filteredPathways = useMemo(() => {
    const q = search.toLowerCase();
    return pathways.map((pathway) => ({
      ...pathway,
      courses: pathway.courses.map((course) => ({
        ...course,
        modules: course.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.filter((lesson) => {
            const matchesSearch = !q || lesson.title.toLowerCase().includes(q) || course.tags.some((t) => t.toLowerCase().includes(q));
            const matchesTag = !activeTag || course.tags.includes(activeTag);
            return matchesSearch && matchesTag;
          }),
        })).filter((mod) => mod.lessons.length > 0),
      })).filter((course) => {
        if (activeTag && !course.tags.includes(activeTag)) return false;
        if (q) {
          return course.title.toLowerCase().includes(q) ||
            course.modules.some((mod) => mod.lessons.some((l) => l.title.toLowerCase().includes(q)));
        }
        return true;
      }),
    })).filter((p) => p.courses.length > 0);
  }, [search, activeTag]);

  const filteredFoundationLessons = useMemo(() => {
    const q = search.toLowerCase();
    return FOUNDATION_LESSONS.filter((lesson) => {
      const matchesSearch = !q || lesson.title.toLowerCase().includes(q) || lesson.tag.toLowerCase().includes(q) || lesson.blurb.toLowerCase().includes(q);
      const matchesTag = !activeTag || lesson.tag === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  // Auto-expand course modules when a filter or search is active
  useEffect(() => {
    if (activeTag || search) {
      const ids = new Set(filteredPathways.flatMap((p) => p.courses.map((c) => c.id)));
      setExpandedCourses(ids);
    } else {
      setExpandedCourses(new Set());
    }
  }, [activeTag, search, filteredPathways]);

  const totalLessons = pathways.reduce((sum, p) => sum + p.courses.reduce((s, c) => s + c.modules.reduce((ms, m) => ms + m.lessons.length, 0), 0), 0);
  const totalCourses = pathways.reduce((sum, p) => sum + p.courses.length, 0);
  const totalModules = pathways.reduce((sum, p) => sum + p.courses.reduce((s, c) => s + c.modules.length, 0), 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "400px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/learn-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 48%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "2.25rem 1.5rem 2.75rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              Impact Platform: Learn
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Explore</span> <span style={{ color: "var(--hero-mint)" }}>Courses.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "560px", margin: "0 0 1.25rem" }}>
            Build the knowledge and confidence to take action, one practical lesson at a time.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="book" color="var(--hero-cream)" /> {totalCourses} expert developed courses</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="layers" color="var(--hero-cream)" /> {totalModules} modules, {totalLessons} lessons</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="award" color="var(--hero-cream)" /> CPD certificate after every module</span>
          </div>
        </div>
      </header>

      {/* FILTER STRIP */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "1.5rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.25rem" }} aria-label="Learning pathways">
            {pathways.map((p) => (
              <a key={p.id} href={`#pathway-${p.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.45rem 0.95rem", borderRadius: "999px", border: `1.5px solid ${p.color}`, background: "var(--white)", fontSize: "0.85rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: p.color, whiteSpace: "nowrap", textDecoration: "none" }}>
                <Icon name={p.icon} size={16} color={p.color} /> {p.title}
              </a>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex" }}><Icon name="search" color="var(--slate)" /></span>
            <input
              type="search"
              placeholder="Search courses by title or topic"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search courses"
              style={{ width: "100%", padding: "0.9rem 1.25rem 0.9rem 3rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--mist)", color: "var(--ink)", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--slate)", fontSize: "1.1rem", padding: "0.25rem" }}>✕</button>
            )}
          </div>

          {/* TOPIC TAG PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem" }} aria-label="Filter by topic">
            <button onClick={() => setActiveTag(null)} aria-pressed={!activeTag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", padding: "0.45rem 1rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid", borderColor: !activeTag ? "var(--evergreen)" : "var(--line)", background: !activeTag ? "var(--evergreen)" : "var(--white)", color: !activeTag ? "var(--white)" : "var(--ink)", transition: "all 0.15s" }}>
              All courses
            </button>
            {ALL_TAGS.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} aria-pressed={activeTag === tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", padding: "0.45rem 1rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid", borderColor: activeTag === tag ? "var(--evergreen)" : "var(--line)", background: activeTag === tag ? "var(--evergreen)" : "var(--white)", color: activeTag === tag ? "var(--white)" : "var(--ink)", transition: "all 0.15s" }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* FOUNDATION LESSONS */}
        {filteredFoundationLessons.length > 0 && (
        <section style={{ marginBottom: "3.5rem" }} aria-labelledby="foundation-lessons">
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--evergreen)", marginBottom: "0.4rem" }}>
              Short on time
            </div>
            <h2 id="foundation-lessons" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2rem)", color: "var(--ink)", margin: "0 0 0.35rem 0", lineHeight: 1.2 }}>
              Foundation Lessons
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--slate)", margin: 0 }}>
              No time to complete a full module today? Take a foundation lesson in under 20 minutes.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: "1rem" }}>
            {filteredFoundationLessons.map((lesson) => {
              const lp = pathwayById(lesson.pathwayId);
              const done = completedLessons.has(lesson.id);
              return (
              <Link
                key={lesson.id}
                href={`/dashboard/learn/${lesson.id}`}
                style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-md)", overflow: "hidden", border: `1.5px solid ${lp.mid}`, borderTop: `6px solid ${lp.color}`, boxShadow: "var(--shadow-sm)", cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s, transform 0.15s", textDecoration: "none" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "var(--shadow-md)"; el.style.borderColor = lp.color; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "var(--shadow-sm)"; el.style.borderColor = lp.mid; el.style.borderTopColor = lp.color; el.style.transform = "translateY(0)"; }}
              >
                {/* Pale header in the collection tint */}
                <div style={{ background: lp.bg, padding: "0.8rem 1rem", minHeight: "44px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: lp.color, whiteSpace: "nowrap" }}>
                    <Icon name="book" size={16} color={lp.color} /> Foundation lesson
                  </span>
                  {done ? (
                    <span aria-label="Completed" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", flexShrink: 0, whiteSpace: "nowrap", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", color: "var(--white)", background: "var(--evergreen)", borderRadius: "999px", padding: "0.25rem 0.65rem" }}>
                      <Icon name="check" size={13} color="var(--white)" strokeWidth={2.5} /> Done
                    </span>
                  ) : null}
                </div>

                {/* Card body */}
                <div style={{ padding: "1rem 1.1rem 1.15rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)", lineHeight: 1.35 }}>
                    {lesson.title}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.55, margin: 0, flex: 1 }}>
                    {lesson.blurb}
                  </p>
                  <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", color: lp.color, background: lp.bg, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                      {lesson.tag}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--slate)", padding: "0.2rem 0" }}>
                      <Icon name="clock" size={13} color="var(--slate)" /> {lesson.duration}
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>
        )}

        {/* DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--line)" }} />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--slate)", whiteSpace: "nowrap" }}>
            Or explore the full course library
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--line)" }} />
        </div>

        {filteredPathways.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}><Icon name="search" size={40} color="var(--sage)" /></div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--ink)" }}>No courses match your search</p>
            <p>Try a different keyword or <button onClick={() => { setSearch(""); setActiveTag(null); }} style={{ color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-body)", fontSize: "inherit" }}>clear your filters</button>.</p>
          </div>
        )}

        {filteredPathways.map((pathway) => (
          <section key={pathway.id} id={`pathway-${pathway.id}`} style={{ marginBottom: "3.5rem", scrollMarginTop: "90px" }} aria-labelledby={`pathway-title-${pathway.id}`}>

            {/* Section opener: pale tint with a 4px left border in the collection tone */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.5rem", padding: "1.1rem 1.4rem", background: pathway.bg, borderRadius: "var(--radius-md)", borderLeft: `4px solid ${pathway.color}` }}>
              <Icon name={pathway.icon} size={26} color={pathway.color} />
              <div style={{ flex: 1 }}>
                <h2 id={`pathway-title-${pathway.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.35rem", color: pathway.color, margin: 0 }}>
                  {pathway.title}
                </h2>
                <span style={{ fontSize: "0.9rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                  {pathway.courses.length} courses
                </span>
              </div>
            </div>

            {/* Course cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {pathway.courses.map((course) => {
                const isExpanded = expandedCourses.has(course.id);
                const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);
                return (
                  <div key={course.id} ref={(el) => { courseRefs.current[course.id] = el; }} style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", border: `1.5px solid ${isExpanded ? pathway.color : "var(--line)"}`, overflow: "hidden", boxShadow: "var(--shadow-sm)", scrollMarginTop: "90px" }}>

                    {/* Course header: flat rich collection tone, solid white text */}
                    <div style={{ background: pathway.color, padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "var(--white)", margin: "0 0 0.2rem", lineHeight: 1.2 }}>
                          {course.title}
                        </h3>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--white)" }}>
                          {course.modules.length} modules, {lessonCount} lessons, CPD certificate per module
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        {course.tags.map((tag) => (
                          <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", color: pathway.color, background: pathway.bg, padding: "0.25rem 0.65rem", borderRadius: "999px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Course body */}
                    <div style={{ padding: "0.85rem 1.5rem 0.6rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--slate)", lineHeight: 1.6, margin: "0 0 0.25rem 0" }}>
                        {course.description}
                      </p>

                      {/* Expand/collapse modules */}
                      <button
                        onClick={() => toggleCourse(course.id)}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: pathway.color, background: "none", border: "none", cursor: "pointer", padding: 0, minHeight: "44px", display: "flex", alignItems: "center", gap: "0.4rem" }}
                        aria-expanded={isExpanded}
                      >
                        <span style={{ display: "inline-flex", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><Icon name="chevron" size={16} color={pathway.color} strokeWidth={2.25} /></span>
                        {isExpanded ? "Hide" : "Show"} modules and lessons
                      </button>

                      {isExpanded && (
                        <div style={{ margin: "0.5rem 0 0.9rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                          {course.modules.map((mod, modIdx) => (
                            <div key={mod.id} style={{ borderRadius: "var(--radius-md)", border: `1.5px solid ${pathway.mid}`, overflow: "hidden" }}>

                              {/* Module header: pale tint, deep number chip */}
                              <div style={{ padding: "0.8rem 1rem", background: pathway.bg, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                                  <span style={{ minWidth: "30px", height: "30px", borderRadius: "8px", background: "var(--white)", color: pathway.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                                    {modIdx + 1}
                                  </span>
                                  <div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: pathway.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                      Module {modIdx + 1}
                                    </div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)" }}>
                                      {mod.title}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)" }}>
                                    {mod.lessons.length} lessons
                                  </span>
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", color: pathway.color, background: "var(--white)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                                    <Icon name="award" size={13} color={pathway.color} /> Certificate
                                  </span>
                                </div>
                              </div>

                              {/* Lessons list */}
                              <div style={{ padding: "0.25rem 0" }}>
                                {mod.lessons.map((lesson, lessonIdx) => (
                                  <Link key={lesson.id} href={(lesson as any).proposed ? "#" : `/dashboard/learn/${lesson.id}?from=${course.id}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", minHeight: "44px", borderBottom: lessonIdx < mod.lessons.length - 1 ? "1px solid var(--line)" : "none", textDecoration: "none", color: "inherit", pointerEvents: (lesson as any).proposed ? "none" : "auto" }}>
                                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--slate)", minWidth: "1.6rem", fontVariantNumeric: "lining-nums" }}>
                                      {String(lessonIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", flex: 1, lineHeight: 1.4 }}>
                                      {lesson.title}
                                    </span>
                                    {(lesson as any).proposed && (
                                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink)", background: "var(--gold)", padding: "0.2rem 0.55rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                                        Coming soon
                                      </span>
                                    )}
                                    {completedLessons.has(lesson.id) && (
                                      <span aria-label="Completed" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", whiteSpace: "nowrap", background: "var(--evergreen)", color: "var(--white)", borderRadius: "999px", padding: "0.2rem 0.6rem", fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>
                                        <Icon name="check" size={12} color="var(--white)" strokeWidth={2.5} /> Done
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <BottomBanner
        resourceTitle="Request a new lesson"
        resourceBody="Is there a topic or area you wish existed as a lesson or module on the platform? Let us know and we'll build it."
        resourcePlaceholder="Describe the lesson you need…"
      />
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense>
      <LearnPageInner />
    </Suspense>
  );
}
