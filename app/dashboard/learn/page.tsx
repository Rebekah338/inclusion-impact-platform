"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const pathways = [
  {
    id: "people-culture",
    title: "People & Culture",
    color: "#2A6B3A",
    bg: "var(--sage-light)",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    icon: "🤝",
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
              { id: "pronouns-language", title: "Pronouns and Language: A Practical Workplace Guide" },
              { id: "speaking-up", title: "Speaking Up: Challenging Exclusionary Behaviour at Work" },
            ],
          },
          {
            id: "allyship-in-action",
            title: "Allyship in Action",
            lessons: [
              { id: "active-allyship", title: "Active Allyship: Moving from Intention to Impact" },
              { id: "what-is-intersectionality", title: "What Is Intersectionality? A Practical Introduction", proposed: true },
            ],
          },
        ],
      },
      {
        id: "building-inclusive-culture",
        title: "Building an Inclusive Culture",
        description: "Create workplaces where everyone belongs — through culture, representation, and identity.",
        tags: ["Culture", "Belonging", "Race"],
        modules: [
          {
            id: "culture-belonging",
            title: "Culture & Belonging",
            lessons: [
              { id: "building-inclusive-workplace", title: "Building an Inclusive Workplace Culture" },
              { id: "run-meetings", title: "Run Meetings That Work for Everyone" },
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
              { id: "ageism", title: "Age-Inclusive Workplaces: Recognising and Addressing Ageism" },
              { id: "gender-equitable", title: "Creating Gender-Equitable Workplaces" },
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
    color: "#5a4a7a",
    bg: "#f0eef8",
    thumbnailBg: "linear-gradient(135deg, #5a4a7a 0%, #7b6fa0 100%)",
    icon: "⚙️",
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
              { id: "job-descriptions", title: "Write Job Descriptions That Include Everyone" },
              { id: "recruit-inclusively", title: "Recruit Inclusively: Your Quick-Start Checklist" },
              { id: "bias-free-interviewing", title: "Bias-Free Interviewing: Ask Better Questions" },
            ],
          },
          {
            id: "joining-staying",
            title: "Joining & Staying",
            lessons: [
              { id: "onboard-inclusively", title: "Onboard Inclusively From Day One" },
              { id: "exit-interviews", title: "Exit Interviews That Surface Inclusion Data" },
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
              { id: "equality-act", title: "Understanding the Equality Act: What Practitioners Need to Know", proposed: true },
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
              { id: "reasonable-adjustments", title: "Reasonable Adjustments in Practice", proposed: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "leadership-strategy",
    title: "Leadership & Strategy",
    color: "#8a5a28",
    bg: "#fdf3e8",
    thumbnailBg: "linear-gradient(135deg, #8a5a28 0%, #b07d4a 100%)",
    icon: "🎯",
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
              { id: "psychological-safety", title: "Psychological Safety: What Leaders Need to Create It", proposed: true },
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
              { id: "business-case-inclusion", title: "Making the Business Case for Inclusion", proposed: true },
              { id: "measuring-inclusion", title: "Measuring Inclusion: Metrics That Matter", proposed: true },
            ],
          },
          {
            id: "embedding-systemically",
            title: "Embedding Inclusion Systemically",
            lessons: [
              { id: "edi-strategy", title: "Developing an EDI Strategy from Scratch", proposed: true },
            ],
          },
        ],
      },
    ],
  },
];

const QUICK_LESSONS = [
  {
    id: "understanding-your-bias",
    title: "Understanding Your Bias: A Self-Reflection Starter",
    blurb: "Walk away with a clear picture of your own biases and a simple framework to keep them in check.",
    duration: "10 min",
    color: "#2A6B3A",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    tag: "Bias",
  },
  {
    id: "recruit-inclusively",
    title: "Recruit Inclusively: Your Quick-Start Checklist",
    blurb: "A practical checklist you can apply to your next recruitment cycle immediately.",
    duration: "8 min",
    color: "#5a4a7a",
    thumbnailBg: "linear-gradient(135deg, #5a4a7a 0%, #7b6fa0 100%)",
    tag: "Recruitment",
  },
  {
    id: "run-meetings",
    title: "Run Meetings That Work for Everyone",
    blurb: "Simple, actionable changes to make every meeting more inclusive from your next one.",
    duration: "12 min",
    color: "#2A6B3A",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    tag: "Culture",
  },
  {
    id: "pronouns-language",
    title: "Pronouns and Language: A Practical Workplace Guide",
    blurb: "Get confident with inclusive language and pronouns — with real workplace examples.",
    duration: "10 min",
    color: "#2A6B3A",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    tag: "Language",
  },
  {
    id: "positive-action",
    title: "Positive Action vs Positive Discrimination: Know the Difference",
    blurb: "One of the most misunderstood distinctions in EDI — explained clearly in under 15 minutes.",
    duration: "12 min",
    color: "#5a4a7a",
    thumbnailBg: "linear-gradient(135deg, #5a4a7a 0%, #7b6fa0 100%)",
    tag: "Policy",
  },
  {
    id: "imagery-inclusively",
    title: "Representation Matters: Using Imagery Inclusively",
    blurb: "Audit your visual communications and make changes that signal inclusion to everyone.",
    duration: "8 min",
    color: "#2A6B3A",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    tag: "Culture",
  },
];

const ALL_TAGS = [
  "Allyship", "Belonging", "Bias", "Culture", "Data & Evidence",
  "Disability", "Language", "Leadership", "Policy",
  "Race", "Recruitment", "Strategy",
];

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

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

  const totalLessons = pathways.reduce((sum, p) => sum + p.courses.reduce((s, c) => s + c.modules.reduce((ms, m) => ms + m.lessons.length, 0), 0), 0);
  const totalCourses = pathways.reduce((sum, p) => sum + p.courses.length, 0);
  const totalModules = pathways.reduce((sum, p) => sum + p.courses.reduce((s, c) => s + c.modules.length, 0), 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      {/* PAGE HEADER */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2.5rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link href="/dashboard" style={{ fontSize: "0.8rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
            ← Back to dashboard
          </Link>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--charcoal)", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                Explore Courses
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem" }}>
                {totalCourses} CPD-accredited courses · {totalModules} modules · {totalLessons} lessons · Certificate after every module
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {pathways.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.75rem", borderRadius: "999px", background: p.bg, fontSize: "0.72rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: p.color, whiteSpace: "nowrap" }}>
                  <span aria-hidden="true">{p.icon}</span> {p.title}
                </div>
              ))}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search courses by title or topic…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search courses"
              style={{ width: "100%", padding: "0.9rem 1.25rem 0.9rem 3rem", borderRadius: "12px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1.1rem", padding: "0.25rem" }}>✕</button>
            )}
          </div>

          {/* TOPIC TAG PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem" }}>
            <button onClick={() => setActiveTag(null)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid", borderColor: !activeTag ? "var(--sage-dark)" : "var(--gray-border)", background: !activeTag ? "var(--sage-dark)" : "transparent", color: !activeTag ? "var(--white)" : "var(--charcoal)", transition: "all 0.15s" }}>
              All courses
            </button>
            {ALL_TAGS.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid", borderColor: activeTag === tag ? "var(--sage-dark)" : "var(--gray-border)", background: activeTag === tag ? "var(--sage-dark)" : "transparent", color: activeTag === tag ? "var(--white)" : "var(--charcoal)", transition: "all 0.15s" }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* SHORT ON TIME SECTION */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--charcoal)", margin: "0 0 0.35rem 0" }}>
              ⚡ Short on time? Start here.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", margin: 0 }}>
              No time for a full module? These standalone lessons deliver practical tools in under 15 minutes.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {QUICK_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--gray-border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer", transition: "box-shadow 0.18s, transform 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.11)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {/* Thumbnail */}
                <div style={{ background: lesson.thumbnailBg, height: "80px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem" }} aria-hidden="true">▶️</span>
                  <span style={{ position: "absolute", top: "0.6rem", right: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.25)", color: "var(--white)", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                    ⚡ Quick lesson
                  </span>
                  <span style={{ position: "absolute", bottom: "0.6rem", left: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", background: "rgba(0,0,0,0.2)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                    ⏱ {lesson.duration}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: "1rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.35 }}>
                    {lesson.title}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0, flex: 1 }}>
                    {lesson.blurb}
                  </p>
                  <div style={{ marginTop: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: lesson.color, background: lesson.color + "18", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                      {lesson.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--gray-border)" }} />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gray-soft)", whiteSpace: "nowrap" }}>
            Or explore the full course library
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--gray-border)" }} />
        </div>

        {filteredPathways.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)" }}>No courses match your search</p>
            <p>Try a different keyword or <button onClick={() => { setSearch(""); setActiveTag(null); }} style={{ color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-body)", fontSize: "inherit" }}>clear your filters</button>.</p>
          </div>
        )}

        {filteredPathways.map((pathway) => (
          <section key={pathway.id} style={{ marginBottom: "3.5rem" }} aria-labelledby={`pathway-${pathway.id}`}>

            {/* Pathway header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", padding: "0.875rem 1.25rem", background: pathway.bg, borderRadius: "12px", borderLeft: `4px solid ${pathway.color}` }}>
              <span style={{ fontSize: "1.4rem" }} aria-hidden="true">{pathway.icon}</span>
              <div>
                <h2 id={`pathway-${pathway.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>
                  {pathway.title}
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                  {pathway.courses.length} courses
                </span>
              </div>
            </div>

            {/* Course cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {pathway.courses.map((course) => {
                const isExpanded = expandedCourses.has(course.id);
                const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);
                return (
                  <div key={course.id} style={{ background: "var(--white)", borderRadius: "16px", border: "1px solid var(--gray-border)", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

                    {/* Course header band */}
                    <div style={{ background: pathway.thumbnailBg, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--white)", marginBottom: "0.3rem" }}>
                          {course.title}
                        </div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                          {course.modules.length} modules · {lessonCount} lessons · CPD certificate per module
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        {course.tags.map((tag) => (
                          <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--white)", background: "rgba(255,255,255,0.2)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Course body */}
                    <div style={{ padding: "1.25rem 1.5rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                        {course.description}
                      </p>

                      {/* Expand/collapse modules */}
                      <button
                        onClick={() => toggleCourse(course.id)}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: pathway.color, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}
                        aria-expanded={isExpanded}
                      >
                        <span style={{ display: "inline-block", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", fontSize: "0.7rem" }}>▶</span>
                        {isExpanded ? "Hide" : "Show"} modules & lessons
                      </button>

                      {isExpanded && (
                        <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                          {course.modules.map((mod, modIdx) => (
                            <div key={mod.id} style={{ borderRadius: "10px", border: `1px solid ${pathway.bg === "var(--sage-light)" ? "var(--sage-light)" : pathway.bg}`, overflow: "hidden" }}>

                              {/* Module header */}
                              <div style={{ padding: "0.75rem 1rem", background: pathway.bg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.7rem", color: pathway.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    Module {modIdx + 1}
                                  </span>
                                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)" }}>
                                    {mod.title}
                                  </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)" }}>
                                    {mod.lessons.length} lessons
                                  </span>
                                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.07em", color: pathway.color, background: "rgba(255,255,255,0.7)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                                    🎓 Certificate
                                  </span>
                                </div>
                              </div>

                              {/* Lessons list */}
                              <div style={{ padding: "0.5rem 0" }}>
                                {mod.lessons.map((lesson, lessonIdx) => (
                                  <div key={lesson.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1rem", borderBottom: lessonIdx < mod.lessons.length - 1 ? "1px solid var(--gray-border)" : "none" }}>
                                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", color: "var(--gray-soft)", minWidth: "1.5rem" }}>
                                      {String(lessonIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", flex: 1, lineHeight: 1.4 }}>
                                      {lesson.title}
                                    </span>
                                    {(lesson as any).proposed && (
                                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "#8a5a28", background: "#fdf3e8", padding: "0.15rem 0.5rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                                        Coming soon
                                      </span>
                                    )}
                                    <span style={{ fontSize: "0.7rem", color: "var(--gray-soft)" }}>🔒</span>
                                  </div>
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
      <BottomBanner />
    </div>
  );
}
