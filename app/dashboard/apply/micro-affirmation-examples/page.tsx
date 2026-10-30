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
];

const CATEGORIES = ["All", "Recognition", "Voice and Space", "Identity and Respect", "Validation", "Collaboration"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Recognition: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
  "Voice and Space": { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" },
  "Identity and Respect": { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" },
  Validation: { bg: "var(--sage-xlight)", text: "var(--sage-dark)", border: "var(--sage-light)" },
  Collaboration: { bg: "#fdf2f8", text: "#9d174d", border: "#fbcfe8" },
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
    <div style={{ minHeight: "100vh", background: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/dashboard/apply" style={{ color: "var(--sage-dark)", fontSize: "0.875rem", textDecoration: "none" }}>
            Back to Resources
          </Link>
          <div style={{ marginTop: "1rem", background: "var(--sage-dark)", borderRadius: 16, padding: "2rem", color: "var(--white)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.5rem" }}>
              Practical Resource
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, margin: "0 0 0.75rem" }}>
              Micro-Affirmation Examples To Use At Work
            </h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              Micro-affirmations are small, often subtle acts or words that acknowledge, validate, and support someone's contributions or identity. They are the positive flipside of microaggressions: tiny moments of recognition that build inclusion, belonging, and confidence over time.
            </p>
          </div>
        </div>

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
      <BottomBanner />
    </div>
  );
}
