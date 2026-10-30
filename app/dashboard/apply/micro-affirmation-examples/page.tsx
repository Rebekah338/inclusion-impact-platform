"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

const AFFIRMATIONS = [
  { id: 1, text: "Thanking someone for their input in a meeting.", category: "Recognition" },
  { id: 2, text: "Tagging someone in an email to highlight their great work.", category: "Recognition" },
  { id: 3, text: "Bringing the focus back to a colleague who was dismissed.", category: "Voice and Space" },
  { id: 4, text: "Acknowledging a colleague's effort on a project, even for small contributions.", category: "Recognition" },
  { id: 5, text: "Using someone's correct pronouns and name consistently.", category: "Identity and Respect" },
  { id: 6, text: "Complimenting a creative idea or innovative approach.", category: "Validation" },
  { id: 7, text: "Encouraging quieter team members to share their perspectives.", category: "Voice and Space" },
  { id: 8, text: "Following up on someone's suggestion and implementing it when possible.", category: "Voice and Space" },
  { id: 9, text: "Giving credit publicly to someone who contributed behind the scenes.", category: "Recognition" },
  { id: 10, text: "Asking for someone's opinion before making a decision.", category: "Voice and Space" },
  { id: 11, text: "Recognising milestones, such as work anniversaries or achievements.", category: "Recognition" },
  { id: 12, text: "Sending a quick thank you email or message for assistance.", category: "Recognition" },
  { id: 13, text: "Smiling or nodding to show active listening during conversations.", category: "Voice and Space" },
  { id: 14, text: "Encouraging someone to take the lead on a task that matches their strengths.", category: "Voice and Space" },
  { id: 15, text: "Validating emotions: I understand why you feel that way; that makes sense.", category: "Validation" },
  { id: 16, text: "Offering mentorship or guidance when someone asks for help.", category: "Collaboration" },
  { id: 17, text: "Recognising diverse perspectives as valuable, not just conventional ideas.", category: "Validation" },
  { id: 18, text: "Celebrating small wins in team updates or meetings.", category: "Validation" },
  { id: 19, text: "Acknowledging personal circumstances that might affect work without judgment.", category: "Identity and Respect" },
  { id: 20, text: "Showing patience and understanding during learning moments or mistakes.", category: "Identity and Respect" },
  { id: 21, text: "Inviting someone to collaborate on a project where their skills shine.", category: "Collaboration" },
  { id: 22, text: "Publicly appreciating someone's commitment to inclusion or equity initiatives.", category: "Recognition" },
  { id: 23, text: "Calmly naming what happened: That comment touched on race and I think it is worth us pausing on that.", category: "Responding to Microaggressions" },
  { id: 24, text: "Gently redirecting after a gendered assumption: She is actually the lead engineer on this project, not the note-taker.", category: "Responding to Microaggressions" },
  { id: 25, text: "Affirming someone after a dismissive comment about their age: Your perspective on this is really valuable and I want to make sure we hear it.", category: "Responding to Microaggressions" },
  { id: 26, text: "Quietly checking in after a microaggression is directed at a colleague: Are you okay? I noticed what just happened and I am sorry you experienced that.", category: "Responding to Microaggressions" },
  { id: 27, text: "Speaking up in the moment when an LGBTQ+ colleague is misgendered: Just so we are all on the same page, Alex uses they/them pronouns.", category: "Responding to Microaggressions" },
];

const CATEGORIES = ["All", "Recognition", "Voice and Space", "Identity and Respect", "Validation", "Collaboration", "Responding to Microaggressions"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Recognition: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
  "Voice and Space": { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" },
  "Identity and Respect": { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" },
  Validation: { bg: "var(--sage-xlight)", text: "var(--sage-dark)", border: "var(--sage-light)" },
  Collaboration: { bg: "#fdf2f8", text: "#9d174d", border: "#fbcfe8" },
  "Responding to Microaggressions": { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa" },
};

export default function MicroAffirmationExamples() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favourites, setFavourites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favourites">("all");
  const [copied, setCopied] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [todayPick, setTodayPick] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = activeTab === "favourites" ? AFFIRMATIONS.filter(a => favourites.includes(a.id)) : AFFIRMATIONS;
    if (activeCategory !== "All") list = list.filter(a => a.category === activeCategory);
    if (search.trim()) list = list.filter(a => a.text.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [activeCategory, activeTab, favourites, search]);

  const handleCopy = (a: typeof AFFIRMATIONS[0]) => {
    navigator.clipboard.writeText(a.text).then(() => {
      setCopied(a.id);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const toggleFav = (id: number) => setFavourites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const pickToday = () => {
    const pick = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    setTodayPick(pick.id);
  };

  const todayAff = AFFIRMATIONS.find(a => a.id === todayPick);

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />
      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Reference Tool
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reference tool &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Micro-Affirmation Examples
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Browse practical examples of micro-affirmations: small, deliberate actions that signal belonging and respect. Micro-affirmations are the positive flipside of microaggressions: tiny moments of recognition that build inclusion, belonging, and confidence over time. This resource also includes examples of how to respond when a microaggression occurs in the moment.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Inclusion Practices", "Communication", "Culture"].map((tag) => (
            <span key={tag} style={{ background: "var(--sage-xlight)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 4rem" }}>

        <div style={{ background: "var(--white)", borderRadius: 16, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", border: "1px solid var(--gray-border)", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {todayAff ? (
              <>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Try this today</div>
                <p style={{ margin: 0, color: "var(--charcoal)", fontWeight: 500, lineHeight: 1.5 }}>{todayAff.text}</p>
              </>
            ) : (
              <p style={{ margin: 0, color: "var(--charcoal)", opacity: 0.7 }}>Get a random micro-affirmation to try at work today.</p>
            )}
          </div>
          <button onClick={pickToday} style={{ background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 10, padding: "0.625rem 1.25rem", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
            {todayAff ? "New suggestion" : "Try one today"}
          </button>
        </div>

        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search affirmations..." style={{ width: "100%", border: "1.5px solid var(--gray-border)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.9375rem", fontFamily: "var(--font-body)", marginBottom: "1rem", boxSizing: "border-box", outline: "none" }} />

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", background: "var(--white)", borderRadius: 12, padding: "0.375rem", border: "1px solid var(--gray-border)" }}>
          {(["all", "favourites"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "0.6rem", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", background: activeTab === tab ? "var(--sage-dark)" : "transparent", color: activeTab === tab ? "var(--white)" : "var(--charcoal)", transition: "all 0.15s" }}>
              {tab === "all" ? `All (${AFFIRMATIONS.length})` : `Favourites (${favourites.length})`}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "0.4rem 1rem", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: "0.8125rem", transition: "all 0.15s", borderColor: activeCategory === cat ? "var(--sage-dark)" : "var(--gray-border)", background: activeCategory === cat ? "var(--sage-dark)" : "var(--white)", color: activeCategory === cat ? "var(--white)" : "var(--charcoal)" }}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--charcoal)", opacity: 0.5 }}>
            <p>No affirmations found. Try a different search or category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {filtered.map(a => {
              const cat = CATEGORY_COLORS[a.category];
              return (
                <div key={a.id} style={{ background: "var(--white)", borderRadius: 14, padding: "1.25rem", border: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cat.text, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 99, padding: "0.2rem 0.625rem", alignSelf: "flex-start" }}>
                    {a.category}
                  </span>
                  <p style={{ margin: 0, color: "var(--charcoal)", lineHeight: 1.6, flex: 1, fontSize: "0.9375rem" }}>{a.text}</p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => toggleFav(a.id)} style={{ background: "none", border: "1.5px solid var(--gray-border)", borderRadius: 8, padding: "0.375rem 0.625rem", cursor: "pointer", fontSize: "0.9rem" }} title={favourites.includes(a.id) ? "Remove from favourites" : "Add to favourites"}>
                      {favourites.includes(a.id) ? "❤️" : "🤍"}
                    </button>
                    <button onClick={() => handleCopy(a)} style={{ flex: 1, background: "var(--sage-dark)", color: "var(--white)", border: "none", borderRadius: 8, padding: "0.375rem 0.75rem", fontWeight: 700, fontSize: "0.8125rem", cursor: "pointer" }}>
                      {copied === a.id ? "Copied!" : "Copy"}
                    </button>
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
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>
            About this topic
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>
            What are micro-affirmations and why do they matter?
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Micro-affirmations are small, often spontaneous gestures that communicate respect, recognition, and belonging. The term was coined by Mary Rowe at MIT, who observed that inclusion in organisations is built not only through policy and structure but through the accumulation of everyday interactions: the nod that says your idea was heard, the email that acknowledges your contribution, the pause that makes space for someone to finish their point.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            The power of micro-affirmations lies in their cumulative effect. No single gesture is transformative on its own; taken together, they create an environment in which people from all backgrounds feel valued and able to contribute. They are also the counterweight to micro-aggressions: the small, often unintentional interactions that signal exclusion. Where micro-aggressions erode belonging over time, micro-affirmations build it.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            Practising micro-affirmations does not require a new framework or a training course. It requires attention: noticing when someone is not being heard, choosing to credit ideas accurately, taking the time to learn and use someone's name correctly. These are small acts with significant impact, and they are available to everyone regardless of seniority or positional power.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link key="inclusive-comms-boundaries" href={`/dashboard/apply/inclusive-comms-boundaries`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Guide
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Inclusive Communications and Boundaries
                </span>
              </Link>
              <Link key="acknowledging-personal-bias" href={`/dashboard/apply/acknowledging-personal-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Top Tips
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Top 10 Tips to Acknowledge Your Own Personal Bias
                </span>
              </Link>
              <Link key="recognising-bias" href={`/dashboard/apply/recognising-bias`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  Reference Tool
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>
                  Recognising Bias: Common Types in the Workplace
                </span>
              </Link>
          </div>
        </div>
      </div>
            <BottomBanner />
    </div>
  );
}
