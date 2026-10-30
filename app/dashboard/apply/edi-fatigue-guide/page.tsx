"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

interface Tip {
  id: string;
  number: string;
  title: string;
  points: string[];
  reflection: string;
  ratingLabel: string;
}

const TIPS: Tip[] = [
  {
    id: "t1", number: "01", title: "Recognise and name fatigue",
    points: [
      "Acknowledge that fatigue is normal and valid",
      "Identify signs of disengagement, cynicism, or emotional exhaustion",
      "Check in with teams regularly",
      "Build in regular pause points to reflect on what is working and what is draining energy"
    ],
    reflection: "Where have you noticed signs of fatigue, in yourself or your team, recently?",
    ratingLabel: "How well does your team currently recognise and name fatigue?"
  },
  {
    id: "t2", number: "02", title: "Rotate responsibility",
    points: [
      "Share EDI tasks across all team members",
      "Give everyone a chance to lead or contribute meaningfully",
      "Recognise EDI contributions in workload planning and performance reviews",
      "Avoid relying on staff with lived experience to carry the educational load alone"
    ],
    reflection: "How evenly is EDI work currently shared across your team?",
    ratingLabel: "How well does your team currently share accountability for EDI?"
  },
  {
    id: "t3", number: "03", title: "Celebrate wins frequently",
    points: [
      "Highlight small EDI successes and visible progress",
      "Recognise contributions from individuals and teams",
      "Connect wins to broader organisational goals",
      "Let teams define what progress looks like"
    ],
    reflection: "What recent win in your inclusion work deserves more recognition?",
    ratingLabel: "How well does your team currently celebrate progress?"
  },
  {
    id: "t4", number: "04", title: "Communicate transparently",
    points: [
      "Explain the purpose and impact of EDI initiatives clearly and regularly",
      "Keep messaging simple, consistent, and relatable",
      "Avoid jargon",
      "Share both challenges and successes openly"
    ],
    reflection: "Where could your team benefit from clearer, more open communication?",
    ratingLabel: "How well does your team currently communicate about EDI work?"
  },
  {
    id: "t5", number: "05", title: "Address backlash constructively",
    points: [
      "Respond to pushback with empathy, not defensiveness",
      "Address resistance constructively",
      "Use examples and data",
      "Set clear boundaries around respectful behaviour"
    ],
    reflection: "What typically happens when EDI is challenged in your organisation?",
    ratingLabel: "How well does your team currently respond to pushback?"
  },
  {
    id: "t6", number: "06", title: "Engage stakeholders early",
    points: [
      "Involve teams in shaping decisions and solutions from the outset",
      "Demonstrate how employee feedback informs decision-making",
      "Identify informal influencers",
      "Build shared ownership for inclusive change"
    ],
    reflection: "Who has not been involved in shaping your inclusion work who should be?",
    ratingLabel: "How well does your team currently involve people?"
  },
  {
    id: "t7", number: "07", title: "Build in rest and recovery",
    points: [
      "Schedule protected non-EDI time to prevent burnout",
      "Create breathing space between intensive initiatives",
      "Normalise stepping back from emotionally heavy work",
      "Ensure inclusion workloads are visible in capacity planning"
    ],
    reflection: "Where are the gaps in your team capacity for this work?",
    ratingLabel: "How well does your team currently protect time and energy?"
  },
  {
    id: "t8", number: "08", title: "Make impact visible",
    points: [
      "Share regular updates on what EDI work has achieved",
      "Connect individual efforts to systemic change",
      "Use stories alongside data to illustrate impact",
      "Celebrate milestones publicly"
    ],
    reflection: "In what ways is inclusion work currently communicated?",
    ratingLabel: "How visible and understood is the impact of inclusion work?"
  },
  {
    id: "t9", number: "09", title: "Support wellbeing",
    points: [
      "Promote self-care as part of organisational culture",
      "Encourage clear boundaries around EDI work",
      "Normalise people stepping back temporarily after emotionally heavy moments",
      "Offer mental health and peer support resources"
    ],
    reflection: "What would genuinely sustainable EDI work look like for you personally?",
    ratingLabel: "How well does your team currently protect wellbeing?"
  },
  {
    id: "t10", number: "10", title: "Equip teams with practical tools",
    points: [
      "Provide scripts, guides, and checklists for handling resistance",
      "Give decision-making frameworks",
      "Offer quick-reference resources",
      "Use tools that save time and cognitive load"
    ],
    reflection: "What tool or resource would make your EDI work easier right now?",
    ratingLabel: "How equipped is your team with practical tools?"
  }
];

const SELF_ASSESSMENT = [
  "I have been carrying more EDI work than feels sustainable",
  "I have noticed myself feeling cynical or disengaged about inclusion work recently",
  "I struggle to switch off from this work, even outside working hours",
  "I find it hard to say no to additional EDI tasks, even when I am stretched",
  "I have not had a genuine pause point to reflect in a while",
  "I sometimes feel solely responsible for inclusion progress in my team"
];

function TipCard({ tip, reflection, rating, onReflection, onRating }: {
  tip: Tip; reflection: string; rating: number;
  onReflection: (v: string) => void; onRating: (v: number) => void;
}) {
  return (
    <div style={{ background: "var(--white)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--gray-border)" }}>
      <div style={{ background: "var(--sage-dark)", padding: "1rem 1.5rem", display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ background: "rgba(255,255,255,0.2)", color: "var(--white)", borderRadius: 8, padding: "4px 10px", fontWeight: 800, fontSize: 14 }}>{tip.number}</span>
        <h3 style={{ margin: 0, color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}>{tip.title}</h3>
      </div>
      <div style={{ padding: "1.25rem" }}>
        <ul style={{ margin: "0 0 1.25rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {tip.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--sage-dark)", flexShrink: 0, marginTop: 3 }}>&#10003;</span>
              <span style={{ color: "#444", lineHeight: 1.6, fontSize: 14 }}>{pt}</span>
            </li>
          ))}
        </ul>
        <div style={{ background: "var(--sage-xlight)", borderRadius: 10, padding: "1rem", marginBottom: "1rem" }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark)", display: "block", marginBottom: 8 }}>
            Reflection: {tip.reflection}
          </label>
          <textarea
            value={reflection}
            onChange={e => onReflection(e.target.value)}
            placeholder="Write your thoughts here..."
            style={{ width: "100%", minHeight: 72, padding: "0.625rem", borderRadius: 8, border: "1px solid var(--sage-light)", fontFamily: "var(--font-body)", fontSize: 13, resize: "vertical", outline: "none", background: "var(--white)", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 8 }}>{tip.ratingLabel}</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => onRating(rating === n ? 0 : n)} style={{ fontSize: 22, background: "none", border: "none", cursor: "pointer", color: n <= rating ? "#F59E0B" : "#D1D5DB", padding: "0 2px" }}>&#9733;</button>
            ))}
            {rating > 0 && <span style={{ fontSize: 13, color: "#666", marginLeft: 4 }}>{rating}/5</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EdiFatigueGuidePage() {
  const [currentTip, setCurrentTip] = useState(0);
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selfCheck, setSelfCheck] = useState<Record<number, boolean>>({});
  const [commitments, setCommitments] = useState(["", "", ""]);
  const [view, setView] = useState<"tips" | "self" | "plan">("tips");
  const [showAll, setShowAll] = useState(false);

  const checkedCount = useMemo(() => Object.values(selfCheck).filter(Boolean).length, [selfCheck]);
  const ratedCount = Object.keys(ratings).length;
  const avgRating = useMemo(() => {
    const vals = Object.values(ratings).filter(v => v > 0);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "0.0";
  }, [ratings]);

  const tip = TIPS[currentTip];

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--gray-soft)", minHeight: "100vh" }}>
      <PlatformNav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 6rem" }}>

        <div style={{ background: "var(--white)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem", borderLeft: "5px solid var(--sage-dark)" }}>
          <span style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: 10 }}>Practical Guide</span>
          <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, margin: "0 0 0.75rem" }}>EDI Fatigue: Practical Guide</h1>
          <p style={{ color: "#555", lineHeight: 1.7, margin: 0 }}>
            EDI fatigue is the gradual exhaustion, disengagement, or cynicism that can build when individuals or teams carry equity, diversity and inclusion work without adequate support, recognition, or rest. It is a normal response to sustained effort; not a sign of failure or lack of commitment.
          </p>
        </div>

        <div style={{ background: "var(--white)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--sage-dark)" }}>{avgRating}</div>
            <div style={{ fontSize: 12, color: "#666" }}>Average rating</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "#D97706" }}>{checkedCount}</div>
            <div style={{ fontSize: 12, color: "#666" }}>Fatigue signs</div>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ height: 8, background: "var(--gray-soft)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(ratedCount / 10) * 100}%`, background: "var(--sage-dark)", borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{ratedCount} of 10 tips rated</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", background: "var(--white)", padding: 6, borderRadius: 12, border: "1px solid var(--gray-border)" }}>
          {(["tips", "self", "plan"] as const).map(tab => (
            <button key={tab} onClick={() => setView(tab)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", background: view === tab ? "var(--sage-dark)" : "transparent", color: view === tab ? "var(--white)" : "var(--charcoal)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              {tab === "tips" ? "10 Tips" : tab === "self" ? "Self-Assessment" : "Action Plan"}
            </button>
          ))}
        </div>

        {view === "tips" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <button onClick={() => setShowAll(!showAll)} style={{ padding: "8px 16px", borderRadius: 20, border: "2px solid var(--sage-dark)", background: showAll ? "var(--sage-dark)" : "transparent", color: showAll ? "var(--white)" : "var(--sage-dark)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                {showAll ? "Step through" : "Expand all"}
              </button>
            </div>
            {showAll ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {TIPS.map(t => (
                  <TipCard key={t.id} tip={t} reflection={reflections[t.id] || ""} rating={ratings[t.id] || 0}
                    onReflection={v => setReflections(prev => ({ ...prev, [t.id]: v }))}
                    onRating={v => setRatings(prev => ({ ...prev, [t.id]: v }))} />
                ))}
              </div>
            ) : (
              <div>
                <TipCard tip={tip} reflection={reflections[tip.id] || ""} rating={ratings[tip.id] || 0}
                  onReflection={v => setReflections(prev => ({ ...prev, [tip.id]: v }))}
                  onRating={v => setRatings(prev => ({ ...prev, [tip.id]: v }))} />
                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                  <button onClick={() => setCurrentTip(prev => Math.max(0, prev - 1))} disabled={currentTip === 0}
                    style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid var(--gray-border)", background: "var(--white)", color: "var(--charcoal)", fontWeight: 600, cursor: currentTip === 0 ? "not-allowed" : "pointer", opacity: currentTip === 0 ? 0.4 : 1 }}>
                    Previous
                  </button>
                  <div style={{ display: "flex", gap: 6 }}>
                    {TIPS.map((_, i) => (
                      <button key={i} onClick={() => setCurrentTip(i)} style={{ width: 10, height: 10, borderRadius: "50%", border: "none", background: i === currentTip ? "var(--sage-dark)" : ratings[TIPS[i].id] ? "var(--sage-light)" : "var(--gray-border)", cursor: "pointer", padding: 0 }} />
                    ))}
                  </div>
                  <button onClick={() => setCurrentTip(prev => Math.min(9, prev + 1))} disabled={currentTip === 9}
                    style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid var(--sage-dark)", background: "var(--sage-dark)", color: "var(--white)", fontWeight: 600, cursor: currentTip === 9 ? "not-allowed" : "pointer", opacity: currentTip === 9 ? 0.7 : 1 }}>
                    Next tip
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === "self" && (
          <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>Self-Assessment: Signs of EDI Fatigue</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: "1.5rem" }}>Tick any statements that resonate with your current experience.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SELF_ASSESSMENT.map((item, idx) => (
                <label key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", padding: "0.875rem", borderRadius: 10, border: `2px solid ${selfCheck[idx] ? "var(--sage-dark)" : "var(--gray-border)"}`, background: selfCheck[idx] ? "var(--sage-xlight)" : "var(--white)" }}>
                  <input type="checkbox" checked={!!selfCheck[idx]} onChange={e => setSelfCheck(prev => ({ ...prev, [idx]: e.target.checked }))} style={{ marginTop: 2, accentColor: "var(--sage-dark)", width: 18, height: 18, flexShrink: 0 }} />
                  <span style={{ color: "var(--charcoal)", lineHeight: 1.6, fontSize: 15 }}>{item}</span>
                </label>
              ))}
            </div>
            {checkedCount > 0 && (
              <div style={{ marginTop: "1.5rem", background: checkedCount >= 4 ? "#FEF2F2" : "#FFFBEB", border: `1px solid ${checkedCount >= 4 ? "#FECACA" : "#FDE68A"}`, borderRadius: 12, padding: "1rem 1.25rem" }}>
                <div style={{ fontWeight: 700, color: checkedCount >= 4 ? "#DC2626" : "#92400E", fontSize: 15, marginBottom: 6 }}>
                  {checkedCount >= 4 ? "You may be experiencing significant EDI fatigue" : "Some signs of fatigue are present"}
                </div>
                <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {checkedCount >= 4
                    ? "It is important to prioritise rest, redistribute responsibilities, and seek support. Review the 10 tips for practical steps."
                    : "Consider which tips can help you sustain your inclusion work in a healthier way."}
                </p>
              </div>
            )}
          </div>
        )}

        {view === "plan" && (
          <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--charcoal)", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>My Action Plan</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: "1.5rem" }}>What three commitments will you make to address EDI fatigue in your team?</p>
            {commitments.map((c, idx) => (
              <div key={idx} style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-dark)", display: "block", marginBottom: 6 }}>Commitment {idx + 1}</label>
                <textarea
                  value={c}
                  onChange={e => { const n = [...commitments]; n[idx] = e.target.value; setCommitments(n); }}
                  placeholder="What will you do, and by when?"
                  style={{ width: "100%", minHeight: 80, padding: "0.75rem", borderRadius: 8, border: "2px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            {ratedCount > 0 && (
              <div style={{ marginTop: "1rem", background: "var(--sage-xlight)", borderRadius: 12, padding: "1rem" }}>
                <div style={{ fontWeight: 700, color: "var(--sage-dark)", marginBottom: "0.75rem", fontSize: 14 }}>Your ratings summary</div>
                {TIPS.map(t => ratings[t.id] ? (
                  <div key={t.id} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#555", flex: 1 }}>{t.number}. {t.title}</span>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(n => <span key={n} style={{ fontSize: 12, color: n <= ratings[t.id] ? "#F59E0B" : "#D1D5DB" }}>&#9733;</span>)}
                    </div>
                  </div>
                ) : null)}
              </div>
            )}
          </div>
        )}
      </div>
      <BottomBanner />
    </div>
  );
}
