"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

type Category = "Experience" | "Inclusion and Belonging" | "Leadership" | "Role and Growth" | "Departure Reasons";

const QUESTIONS: { id: number; question: string; category: Category; follow?: string }[] = [
  // Experience
  { id: 1, category: "Experience", question: "How would you describe your overall experience working here?", follow: "What stands out most when you think about your time with us?" },
  { id: 2, category: "Experience", question: "What did you enjoy most about your role and the organisation?" },
  { id: 3, category: "Experience", question: "Were there aspects of your day-to-day experience that consistently made work harder or less enjoyable?" },
  { id: 4, category: "Experience", question: "Did you feel your workload was manageable and fairly distributed?" },
  { id: 5, category: "Experience", question: "How well did the organisation's values match your experience of working here?" },
  // Inclusion and Belonging
  { id: 6, category: "Inclusion and Belonging", question: "Did you feel you could bring your authentic self to work? If not, what got in the way?", follow: "Were there particular situations or environments where this felt more difficult?" },
  { id: 7, category: "Inclusion and Belonging", question: "Did you feel that your voice and perspectives were heard and valued?" },
  { id: 8, category: "Inclusion and Belonging", question: "Did you ever experience or witness behaviour at work that felt exclusionary, discriminatory, or disrespectful?" },
  { id: 9, category: "Inclusion and Belonging", question: "How confident were you that concerns about inclusion or fairness would be taken seriously if raised?" },
  { id: 10, category: "Inclusion and Belonging", question: "Did you feel your identity: whether that relates to race, gender, disability, age, or other factors: affected how you were treated or what opportunities you had access to?" },
  // Leadership
  { id: 11, category: "Leadership", question: "How would you describe the quality of leadership and management you experienced?" },
  { id: 12, category: "Leadership", question: "Did your manager support your development and wellbeing?" },
  { id: 13, category: "Leadership", question: "Were decisions made fairly and transparently in your experience?" },
  { id: 14, category: "Leadership", question: "Did you feel comfortable raising concerns with your manager or senior leadership?" },
  // Role and Growth
  { id: 15, category: "Role and Growth", question: "Did you have the opportunities, resources, and support to do your job well?" },
  { id: 16, category: "Role and Growth", question: "Did you feel your contributions were recognised and fairly rewarded?" },
  { id: 17, category: "Role and Growth", question: "Were there barriers to your progression or development that you felt were unfair?", follow: "What would fairer access to progression have looked like for you?" },
  { id: 18, category: "Role and Growth", question: "What learning or development opportunities would have made a difference to your experience here?" },
  // Departure Reasons
  { id: 19, category: "Departure Reasons", question: "What is the primary reason you decided to leave?" },
  { id: 20, category: "Departure Reasons", question: "Was there a specific moment or event that prompted your decision to go?" },
  { id: 21, category: "Departure Reasons", question: "Is there anything the organisation could have done differently that might have changed your decision?" },
  { id: 22, category: "Departure Reasons", question: "What does your next role offer that you felt was missing here?" },
  { id: 23, category: "Departure Reasons", question: "Is there anything you would want leadership to know that you have not been able to say before now?" },
];

const CATEGORIES: Category[] = ["Experience", "Inclusion and Belonging", "Leadership", "Role and Growth", "Departure Reasons"];

const CAT_COLORS: Record<Category, { bg: string; text: string; border: string; dot: string }> = {
  "Experience":              { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe", dot: "#3b82f6" },
  "Inclusion and Belonging": { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe", dot: "#8b5cf6" },
  "Leadership":              { bg: "var(--sage-xlight)", text: "var(--sage-dark)", border: "#c6dbc9", dot: "#4a7c59" },
  "Role and Growth":         { bg: "#fef3c7", text: "#92400e", border: "#fde68a", dot: "#f59e0b" },
  "Departure Reasons":       { bg: "#fff1f2", text: "#991b1b", border: "#fecaca", dot: "#ef4444" },
};

export default function ExitInterviewQuestions() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [copied, setCopied] = useState<number | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [showFollow, setShowFollow] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  const filtered = QUESTIONS.filter(q => {
    if (activeTab === "saved" && !saved.includes(q.id)) return false;
    if (activeCategory !== "All" && q.category !== activeCategory) return false;
    return true;
  });

  const handleCopy = (q: typeof QUESTIONS[0]) => {
    const text = showFollow[q.id] && q.follow ? `${q.question}\n\nFollow-up: ${q.follow}` : q.question;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(q.id);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const toggleSaved = (id: number) =>
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleDownload = () => {
    const lines: string[] = ["EXIT INTERVIEW QUESTIONS", "The Inclusion Edit", ""];
    CATEGORIES.forEach(cat => {
      lines.push(`\n${cat.toUpperCase()}`);
      QUESTIONS.filter(q => q.category === cat).forEach((q, i) => {
        lines.push(`${i + 1}. ${q.question}`);
        if (q.follow) lines.push(`   Follow-up: ${q.follow}`);
      });
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exit-interview-questions.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Reference Tool</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reference tool &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Exit Interview Questions
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          23 evidence-informed questions for exit interviews, covering employee experience, inclusion and belonging, leadership, progression, and reasons for leaving. Each question is designed to surface honest insight; many include optional follow-up prompts for deeper conversations.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Exit Interviews", "Retention", "Inclusion Practices"].map(tag => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", background: "#fff", borderRadius: 12, padding: "0.375rem", border: "1px solid #e5e7eb" }}>
          {(["all", "saved"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "0.625rem", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", background: activeTab === tab ? "var(--sage-dark)" : "transparent", color: activeTab === tab ? "#fff" : "var(--charcoal)", transition: "all 0.15s" }}>
              {tab === "all" ? `All Questions (${QUESTIONS.length})` : `Saved (${saved.length})`}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {(["All", ...CATEGORIES] as const).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat as any)} style={{ padding: "0.35rem 0.875rem", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", transition: "all 0.15s", borderColor: activeCategory === cat ? "var(--sage-dark)" : "#e5e7eb", background: activeCategory === cat ? "var(--sage-dark)" : "#fff", color: activeCategory === cat ? "#fff" : "var(--charcoal)" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Questions */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--charcoal)", opacity: 0.5 }}>
            <p>{activeTab === "saved" ? "Save questions by clicking the bookmark icon on each card." : "No questions found."}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map(q => {
              const cat = CAT_COLORS[q.category];
              const isOpen = showFollow[q.id];
              return (
                <div key={q.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.dot, flexShrink: 0, marginTop: 6 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cat.text, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 99, padding: "2px 10px" }}>{q.category}</span>
                      </div>
                      <p style={{ margin: "0 0 0.75rem", color: "var(--charcoal)", lineHeight: 1.65, fontSize: "0.9375rem", fontWeight: 500 }}>{q.question}</p>

                      {q.follow && (
                        <>
                          <button onClick={() => setShowFollow(prev => ({ ...prev, [q.id]: !prev[q.id] }))} style={{ fontSize: 12, fontWeight: 700, color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: isOpen ? 8 : 0 }}>
                            {isOpen ? "Hide follow-up" : "Show follow-up prompt"}
                          </button>
                          {isOpen && (
                            <p style={{ margin: "0 0 0.75rem", color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, fontStyle: "italic", background: "var(--sage-xlight)", borderRadius: 8, padding: "8px 12px", borderLeft: "3px solid var(--sage-dark)" }}>
                              {q.follow}
                            </p>
                          )}
                        </>
                      )}

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => toggleSaved(q.id)} style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0.35rem 0.625rem", cursor: "pointer", fontSize: "0.9rem" }} title={saved.includes(q.id) ? "Remove from saved" : "Save this question"}>
                          {saved.includes(q.id) ? "🔖" : "🏷️"}
                        </button>
                        <button onClick={() => handleCopy(q)} style={{ background: "var(--sage-dark)", color: "#fff", border: "none", borderRadius: 8, padding: "0.375rem 0.875rem", fontWeight: 700, fontSize: "0.8125rem", cursor: "pointer" }}>
                          {copied === q.id ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why exit interviews matter for inclusion</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Exit interviews are one of the few moments in the employment cycle where an organisation can hear honest feedback from someone who no longer has anything to lose professionally. Done well, they are a rich source of insight about what is and is not working: particularly for employees from underrepresented groups, who may have stayed silent about experiences of exclusion or unfairness throughout their time with the organisation.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The challenge is that exit interviews often fail to realise this potential. Generic questions about job satisfaction rarely surface the structural or cultural issues that drive attrition among marginalised employees. A question about whether someone enjoyed their role is different from a question about whether they felt their identity affected what opportunities they had access to.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The questions in this resource are designed to surface honest insight about belonging, fairness, leadership, and systemic barriers: the things that drive people to leave, and that are most likely to go unsaid in a standard exit process. The data gathered should feed directly into organisational action, not sit in a report that is never reviewed.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { slug: "diverse-recruitment-checklist", format: "Checklist", title: "Diverse Recruitment Checklist" },
              { slug: "fair-progression-audit-tool", format: "Audit Tool", title: "Fair Progression Audit Tool" },
              { slug: "inclusive-comms-boundaries", format: "Guide", title: "Inclusive Communications and Boundaries" },
            ].map(r => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Save/Print bar */}
      <div style={{ background: "var(--charcoal)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", fontSize: 16 }}>Save or print this resource</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Download all questions as a text file, or print as a PDF from your browser.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleDownload} style={{ background: "#fff", color: "var(--charcoal)", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Download questions (.txt)
            </button>
            <button onClick={() => window.print()} style={{ background: "var(--sage-dark)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Print as PDF
            </button>
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}
