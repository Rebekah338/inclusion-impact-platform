"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

type Theme = "all" | "belonging" | "fairness" | "voice" | "safety" | "inclusion" | "leadership";

const THEMES: { key: Theme; label: string; icon: string; desc: string }[] = [
  { key: "all",       label: "All questions",         icon: "📋", desc: "" },
  { key: "belonging", label: "Belonging",              icon: "🤝", desc: "Whether employees feel they belong in the organisation and in their immediate team, as themselves." },
  { key: "fairness",  label: "Fairness and equity",   icon: "⚖️", desc: "Whether people believe they are treated equitably relative to others and have equal access to opportunities." },
  { key: "voice",     label: "Voice and inclusion",   icon: "💬", desc: "Whether people feel heard, included in decision-making, and that their perspective is valued." },
  { key: "safety",    label: "Psychological safety",  icon: "🛡️", desc: "Whether people feel safe to speak up, raise concerns, disagree, or admit mistakes without negative consequences." },
  { key: "inclusion", label: "Day-to-day inclusion",  icon: "🌱", desc: "The everyday experience of feeling included or excluded in meetings, communications, and social dynamics." },
  { key: "leadership",label: "Leadership commitment", icon: "🏛️", desc: "Whether employees believe leaders take inclusion seriously and act on it, beyond rhetoric." },
];

type Question = {
  id: string;
  theme: Theme;
  text: string;
  scale: string;
  rationale: string;
  watchFor: string;
};

const QUESTIONS: Question[] = [
  // Belonging
  { id: "b1", theme: "belonging", text: "I feel I belong at this organisation.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Sense of belonging is the foundational measure of inclusion and a strong predictor of retention and performance.", watchFor: "Low scores among specific demographic groups reveal where belonging is not universal: belonging that requires conformity is not true inclusion." },
  { id: "b2", theme: "belonging", text: "I can be myself at work without having to hide aspects of my identity.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Psychological safety to bring one's full self — rather than a 'professional' self edited to fit a dominant culture — is a core inclusion indicator.", watchFor: "Gaps between groups on this question often reveal where specific identities are less welcome or less safe to disclose." },
  { id: "b3", theme: "belonging", text: "I feel valued as an individual, not just for the work I produce.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Belonging goes beyond transactional employment: people who feel valued as people, not just producers, are significantly more engaged and less likely to leave.", watchFor: "Low scores combined with high performance ratings may indicate a culture that extracts work without investing in people." },
  { id: "b4", theme: "belonging", text: "There are people at this organisation with whom I have a genuine connection.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Social connection at work is not a nice-to-have: isolation is a significant predictor of both poor wellbeing and early departure.", watchFor: "Low scores among people who joined remotely or during organisational disruption may indicate structural barriers to relationship-building, not individual preference." },
  // Fairness
  { id: "f1", theme: "fairness", text: "I believe my pay reflects my contribution fairly, relative to others doing similar work.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Pay fairness perception is distinct from actual pay equity but predicts engagement and retention independently of both.", watchFor: "Significant score differences by protected characteristic warrant investigation of actual pay data: perceptions are often grounded in observable signals." },
  { id: "f2", theme: "fairness", text: "Promotion decisions at this organisation are made fairly.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Perceived fairness in promotion is one of the most significant drivers of both engagement and departure intent among underrepresented groups.", watchFor: "A wide gap between senior and junior employees on this question may indicate that fairness is perceived differently by those with and without power to make promotion decisions." },
  { id: "f3", theme: "fairness", text: "I have equal access to opportunities to develop and progress, regardless of my background or identity.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Access to development is a key driver of progression gaps. Perception of unequal access is often an accurate signal of actual unequal access.", watchFor: "Consistent low scores among specific groups should be cross-referenced with actual development participation data." },
  { id: "f4", theme: "fairness", text: "The workload in my team is distributed equitably.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Non-promotable, undervalued, or invisible work often falls disproportionately on women and people from underrepresented groups: a phenomenon known as 'office housework'.", watchFor: "Disaggregated results showing women or racially minoritised employees scoring lower than others on this question may signal an office housework problem." },
  // Voice
  { id: "v1", theme: "voice", text: "My perspective is genuinely taken into account in team discussions and decisions.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Inclusion of diverse perspectives in decision-making is both an equity measure and a performance driver: teams that include more views make better decisions.", watchFor: "Low scores among specific groups indicate voice is not equally available: structural inequalities in who is heard are common and often invisible to those whose voice is never questioned." },
  { id: "v2", theme: "voice", text: "I feel comfortable disagreeing with my manager or senior colleagues when I think something is wrong.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Upward dissent is a critical safety signal: teams where it is not safe to disagree are teams where errors go uncorrected and misconduct goes unreported.", watchFor: "Low scores predict compliance cultures rather than learning cultures. In inclusion terms, they also predict that the voices most likely to be suppressed are those already marginalised." },
  { id: "v3", theme: "voice", text: "When I raise a concern or idea, I believe something will happen as a result.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Voice without responsiveness produces cynicism and disengagement that is worse than never having asked. This question measures the perceived consequence of speaking, not just the perceived safety.", watchFor: "Low scores on this question combined with higher scores on safety questions reveal a 'heard but ignored' dynamic: often more damaging to trust than silence." },
  // Psychological safety
  { id: "s1", theme: "safety", text: "I feel safe to raise concerns about how things are done here, without fear of negative consequences.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Psychological safety is the leading predictor of team performance, learning, and innovation. It is also a prerequisite for any of the other inclusion indicators to operate.", watchFor: "Scores below 3.5 on a 5-point scale are a significant warning sign at team level. Gaps between groups indicate that safety is not universal: a critical distinction." },
  { id: "s2", theme: "safety", text: "At this organisation, it is possible to make a mistake without it being held against you.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Fear of failure suppresses risk-taking, innovation, and the admission of errors that allows organisations to learn and recover. It also disproportionately affects those who feel they have less room to fail.", watchFor: "Low scores among underrepresented groups may indicate that the cost of failure is perceived (and often actually) higher for those with less social capital in the organisation." },
  { id: "s3", theme: "safety", text: "I would feel comfortable reporting harassment or discrimination if I experienced or witnessed it.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Willingness to report is the most direct measure of whether formal inclusion infrastructure (policies, reporting mechanisms) is trusted and accessible.", watchFor: "Low scores indicate that policies exist but are not trusted. Reasons include: fear of retaliation, belief that nothing will change, previous negative experiences of reporting." },
  // Day-to-day inclusion
  { id: "in1", theme: "inclusion", text: "I am included in meetings and conversations that are relevant to my work.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Exclusion from relevant meetings is both a practical barrier to contribution and a signal about who is perceived as central to the work.", watchFor: "Part-time workers, remote workers, and people from underrepresented groups often report lower scores on this question: check whether exclusion is structural (meeting scheduling, communication norms) or interpersonal." },
  { id: "in2", theme: "inclusion", text: "The social culture at this organisation is one I feel welcome in.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Social culture — the informal norms, the after-work events, the shared references and humour — is often exclusionary without intending to be. Discomfort in the social culture predicts lower belonging and lower psychological safety.", watchFor: "Low scores among specific groups often point to a dominant culture designed around one demographic: alcohol-centred socialising, sports references, or in-group humour that others cannot safely participate in." },
  { id: "in3", theme: "inclusion", text: "My manager actively includes everyone in the team, not just those they have an obvious connection with.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Inclusion is enacted (or not) in thousands of micro-moments, most of them by line managers. This question measures whether managers are seen to practise inclusion actively rather than passively.", watchFor: "Disaggregate by team to identify managers whose inclusion practices are significantly below or above the organisational mean. Both are useful: low scorers need support; high scorers are a model." },
  // Leadership commitment
  { id: "l1", theme: "leadership", text: "I believe senior leaders take inclusion and belonging seriously as a strategic priority.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Employee belief in leadership commitment is a strong predictor of whether inclusion initiatives are trusted and engaged with.", watchFor: "A significant gap between leadership self-assessment and employee perception of leadership commitment is common and important: it signals a credibility gap that programmes alone cannot close." },
  { id: "l2", theme: "leadership", text: "This organisation takes action on inclusion, not just statements.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Employees distinguish between rhetoric and action. Trust in organisational inclusion intent is built through visible, consistent action: not declarations, not campaigns, not one-off events.", watchFor: "Low scores among underrepresented groups combined with high scores among majority groups may indicate that action is perceived differently by those who are and are not the beneficiaries of it." },
  { id: "l3", theme: "leadership", text: "This organisation holds people accountable when they behave in ways that are not inclusive.", scale: "1 = Strongly disagree, 5 = Strongly agree", rationale: "Accountability for exclusionary behaviour is the single strongest signal of organisational commitment to inclusion: its absence makes everything else untrustworthy.", watchFor: "Low scores on this question are highly predictive of higher scores on leaving intent. Employees who see exclusionary behaviour go unaddressed learn quickly that the organisation does not mean what it says." },
];

export default function InclusionAndBelongingSurveyPage() {
  const [activeTheme, setActiveTheme] = useState<Theme>("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    let pool = activeTheme === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.theme === activeTheme);
    const s = search.toLowerCase();
    if (s) pool = pool.filter((q) => q.text.toLowerCase().includes(s) || q.rationale.toLowerCase().includes(s));
    return pool;
  }, [activeTheme, search]);

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

  const themeInfo = THEMES.find((t) => t.key === activeTheme);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Apply
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Inclusion and Belonging Survey</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🤝</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
              📋 Survey
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>
            Inclusion and Belonging Survey
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            A bank of validated survey questions across six inclusion themes, with the rationale for each question and guidance on interpreting results. Browse by theme or search for a specific topic.
          </p>

          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
            <input type="search" placeholder="Search questions…" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--sage-xlight)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingBottom: "1.25rem" }}>
            {THEMES.map((t) => (
              <button key={t.key} onClick={() => setActiveTheme(t.key)} style={chipStyle(activeTheme === t.key)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {themeInfo && themeInfo.desc && (
            <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "0.25rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--sage-dark)", margin: 0, lineHeight: 1.6 }}>{themeInfo.desc}</p>
            </div>
          )}
        </div>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)", marginBottom: "1rem" }}>{visible.length} question{visible.length !== 1 ? "s" : ""}</p>

        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)" }}>No questions match your current filters.</p>
            <button onClick={() => { setSearch(""); setActiveTheme("all"); }} style={{ marginTop: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer" }}>Clear filters</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {visible.map((q) => {
            const isOpen = expanded === q.id;
            const themeLabel = THEMES.find((t) => t.key === q.theme);
            return (
              <div key={q.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setExpanded(isOpen ? null : q.id)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <span style={{ fontSize: "1rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "block", color: "var(--sage-dark)", fontWeight: 700, lineHeight: 1, flexShrink: 0, marginTop: "0.15rem" }}>+</span>
                  <div style={{ flex: 1 }}>
                    {themeLabel && activeTheme === "all" && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "999px", marginBottom: "0.4rem" }}>
                        {themeLabel.icon} {themeLabel.label}
                      </span>
                    )}
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.5 }}>{q.text}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)", margin: "0.25rem 0 0" }}>{q.scale}</p>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    <div style={{ marginTop: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.3rem" }}>Why this question</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{q.rationale}</p>
                    </div>
                    <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px", padding: "0.75rem 0.875rem" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#92400e", marginBottom: "0.3rem" }}>Watch for</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#374151", lineHeight: 1.7, margin: 0 }}>{q.watchFor}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: "2.5rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", marginBottom: "0.75rem" }}>How to use this survey bank</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.7, margin: 0 }}>
            Select questions relevant to your context: a full survey of 20 or more questions risks lower response rates and survey fatigue. A focused 8 to 12 questions, asked consistently over time, produces more actionable data than an exhaustive one-off census. Always include at least two demographic questions (role level, gender, ethnicity at minimum) so results can be disaggregated: an average score that hides a 30-point gap between groups is worse than useless. And only run a survey if you are prepared to share the results and act on them: a survey that produces no visible change is worse for trust than no survey at all.
          </p>
        </div>
      </main>

      <BottomBanner />
    </div>
  );
}
