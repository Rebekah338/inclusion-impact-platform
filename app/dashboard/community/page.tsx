"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";

/* ── Types ─────────────────────────────────────────────────────────────── */

type PostType = "question" | "discussion" | "win";
type Jurisdiction = "UK" | "Bermuda" | "US" | "All";

type Post = {
  id: number;
  type: PostType;
  anonymous: boolean;
  author: string;
  initials: string;
  role: string;
  daysAgo: number;
  title: string;
  body: string;
  jurisdiction: Jurisdiction;
  tags: string[];
  replies: number;
  likes: number;
};

/* ── Sample content (preview only: replaced by real member posts once posting is built) ── */

const SAMPLE_POSTS: Post[] = [
  { id: 1, type: "question", anonymous: false, author: "Priya M.", initials: "PM", role: "Head of People, Tech", daysAgo: 0, title: "How do you handle resistance when introducing EDI frameworks to a sceptical leadership team?", body: "The data is there and the case is made, but I keep hearing \"this doesn't apply to us\" at senior level. What has actually shifted the conversation for you?", jurisdiction: "UK", tags: ["Leadership", "Buy-in"], replies: 4, likes: 11 },
  { id: 2, type: "win", anonymous: false, author: "Damien K.", initials: "DK", role: "HR Business Partner", daysAgo: 1, title: "Our first neurodiversity disclosure process went live this week", body: "Six months of work and it is finally in place. Two candidates have already asked for adjustments at interview stage, which tells me it is working.", jurisdiction: "UK", tags: ["Neurodiversity", "Recruitment"], replies: 7, likes: 19 },
  { id: 3, type: "question", anonymous: true, author: "Anonymous member", initials: "", role: "Member", daysAgo: 2, title: "A senior leader made an offensive comment in a meeting. Where do I start?", body: "Nobody challenged it, including me. I want to handle this properly without putting the person it affected in a harder position. How have others approached this?", jurisdiction: "Bermuda", tags: ["Challenging behaviour", "Leadership"], replies: 9, likes: 14 },
  { id: 4, type: "discussion", anonymous: false, author: "Rachel T.", initials: "RT", role: "EDI Manager, NHS Trust", daysAgo: 3, title: "Which EDI metrics do you actually report on?", body: "We are rebuilding our dashboard. Which metrics do you find meaningful, and which feel like box ticking? Particularly interested in experience measures beyond headcount.", jurisdiction: "UK", tags: ["Data", "Measurement"], replies: 12, likes: 23 },
  { id: 5, type: "win", anonymous: false, author: "Marcus J.", initials: "MJ", role: "Operations Director", daysAgo: 4, title: "Our board agreed to publish our ethnicity pay gap voluntarily", body: "We used the business case template and two of the case studies from Make the Case. It took three meetings, but we got there.", jurisdiction: "Bermuda", tags: ["Pay gap", "Board"], replies: 5, likes: 31 },
  { id: 6, type: "question", anonymous: false, author: "Jordan L.", initials: "JL", role: "Talent Acquisition Lead", daysAgo: 5, title: "Structured interviews across several US states: how do you keep them consistent?", body: "We hire in four states with different rules. How are others keeping interview questions fair and compliant without making the process rigid?", jurisdiction: "US", tags: ["Recruitment", "Compliance"], replies: 3, likes: 8 },
];

const SAMPLE_PERKS = [
  { partner: "Example partner conference", offer: "5% off tickets for Inclusion Editors members", code: "EDITORS5", expires: "31 January 2027" },
  { partner: "Example training provider", offer: "A free place on any open course when you book two", code: "EDITORSPLUS", expires: "28 February 2027" },
];

const SAMPLE_EVENTS = [
  { day: "19", month: "Nov", title: "Editors' Roundtable: making the case to sceptical leaders", detail: "Online · 12:30 to 13:30 GMT", host: "The Inclusion Edit" },
  { day: "04", month: "Dec", title: "Example partner event: inclusive recruitment in practice", detail: "London and online", host: "Partner event" },
  { day: "21", month: "Jan", title: "Editors' Roundtable: planning your EDI year", detail: "Online · 16:00 to 17:00 GMT", host: "The Inclusion Edit" },
];

const TYPE_STYLE: Record<PostType, { label: string; color: string; bg: string; icon: string }> = {
  question: { label: "Question", color: "var(--coll-blue)", bg: "var(--coll-blue-tint)", icon: "message" },
  discussion: { label: "Discussion", color: "var(--coll-green)", bg: "var(--coll-green-tint)", icon: "people" },
  win: { label: "Small win", color: "var(--coll-amber)", bg: "var(--coll-amber-tint)", icon: "award" },
};

/* First Monday of next month: when This Month in EDI is published */
function nextRoundUp(today = new Date()) {
  const d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

const timeAgo = (d: number) => (d === 0 ? "Today" : d === 1 ? "Yesterday" : `${d} days ago`);

const chip = (on: boolean): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem",
  padding: "0.4rem 0.9rem", minHeight: "34px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
  borderColor: on ? "var(--evergreen)" : "var(--line)", background: on ? "var(--evergreen)" : "var(--white)", color: on ? "var(--white)" : "var(--ink)",
});

const panelTitle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 0.85rem" };

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [feed, setFeed] = useState<"all" | "question" | "win">("all");
  const [place, setPlace] = useState<Jurisdiction>("All");
  const [liked, setLiked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Composer
  const [newType, setNewType] = useState<PostType>("question");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newPlace, setNewPlace] = useState<Jurisdiction>("UK");
  const [anonymous, setAnonymous] = useState(false);

  /* Trending: most replies and likes in the last seven days, worked out automatically */
  const trending = useMemo(
    () => [...posts].filter((p) => p.daysAgo <= 7).sort((a, b) => (b.likes + 2 * b.replies) - (a.likes + 2 * a.replies)).slice(0, 3),
    [posts]
  );

  const visible = posts.filter((p) => (feed === "all" || p.type === feed) && (place === "All" || p.jurisdiction === place || p.jurisdiction === "All"));

  const submit = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setPosts((prev) => [{
      id: Date.now(), type: newType, anonymous, author: anonymous ? "Anonymous member" : "You", initials: anonymous ? "" : "Y", role: anonymous ? "Member" : "Inclusion Editors member",
      daysAgo: 0, title: newTitle.trim(), body: newBody.trim(), jurisdiction: newPlace, tags: [], replies: 0, likes: 0,
    }, ...prev]);
    setNewTitle(""); setNewBody(""); setAnonymous(false);
  };

  const toggleLike = (id: number) => {
    const on = liked.includes(id);
    setLiked((l) => (on ? l.filter((x) => x !== id) : [...l, id]));
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + (on ? -1 : 1) } : p)));
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const avatar = (p: Pick<Post, "anonymous" | "initials">, size = 40) => (
    <span aria-hidden="true" style={{ flexShrink: 0, width: `${size}px`, height: `${size}px`, borderRadius: "50%", background: p.anonymous ? "var(--ink)" : "var(--pale-sage)", color: p.anonymous ? "var(--white)" : "var(--evergreen)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem" }}>
      {p.anonymous ? <Icon name="eyeoff" size={18} color="var(--white)" /> : p.initials}
    </span>
  );

  const pill = (text: string, color: string, bg: string, icon?: string) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", color, background: bg, padding: "0.2rem 0.6rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
      {icon && <Icon name={icon} size={12} color={color} />} {text}
    </span>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "400px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/inclusion-editors-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 2.5rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              Impact Platform: Member community
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>The Inclusion</span> <span style={{ color: "var(--hero-mint)" }}>Editors.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "560px", margin: "0 0 1.25rem" }}>
            A peer space for people doing inclusion work: ask what you really need to, share what worked and celebrate the progress.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="eyeoff" color="var(--hero-cream)" /> Ask anonymously</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="globe" color="var(--hero-cream)" /> UK, Bermuda and US</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="ticket" color="var(--hero-cream)" /> Member perks and events</span>
          </div>
        </div>
      </header>

      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 4.5rem" }}>

        {/* Preview notice: honest about what is sample content */}
        <div role="note" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", background: "var(--gold-tint)", border: "1px solid var(--gold)", borderRadius: "var(--radius-md)", padding: "0.85rem 1.15rem", marginBottom: "1.75rem" }}>
          <Icon name="bell" size={18} color="var(--gold-deep)" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>
            <strong style={{ fontFamily: "var(--font-heading)", color: "var(--gold-deep)" }}>Preview:</strong> the posts, perks and events below are sample content to show how the community will work. Posts you add here are not saved yet.
          </p>
        </div>

        {/* TRENDING THIS WEEK (worked out from replies and likes; no updating needed) */}
        <section aria-labelledby="trending" style={{ marginBottom: "2.25rem" }}>
          <h2 id="trending" style={{ ...panelTitle, fontSize: "1.2rem" }}>
            <Icon name="trending" size={20} color="var(--evergreen)" /> Trending this week
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {trending.map((p, i) => {
              const t = TYPE_STYLE[p.type];
              return (
                <article key={p.id} style={{ display: "flex", gap: "0.85rem", background: "var(--white)", borderRadius: "var(--radius-md)", borderTop: `6px solid ${t.color}`, borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", borderLeft: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: "0.95rem 1.05rem" }}>
                  <span style={{ flexShrink: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", lineHeight: 1, color: t.color, fontVariantNumeric: "lining-nums" }}>{i + 1}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>{pill(t.label, t.color, t.bg, t.icon)}{pill(p.jurisdiction, "var(--slate)", "var(--mist)", "globe")}</div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.35, margin: "0 0 0.4rem" }}>{p.title}</h3>
                    <div style={{ display: "flex", gap: "0.9rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem", color: "var(--slate)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Icon name="message" size={14} color="var(--slate)" /> {p.replies} replies</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Icon name="heart" size={14} color="var(--slate)" /> {p.likes}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "1.75rem", alignItems: "start" }} className="editors-layout">

          {/* ── MAIN COLUMN: compose, filter, feed ─────────────────────── */}
          <div>
            {/* Composer */}
            <section aria-labelledby="compose" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.25rem 1.35rem", marginBottom: "1.5rem" }}>
              <h2 id="compose" style={panelTitle}>Start a conversation</h2>
              <div role="radiogroup" aria-label="Type of post" style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
                {(Object.keys(TYPE_STYLE) as PostType[]).map((k) => (
                  <button key={k} role="radio" aria-checked={newType === k} onClick={() => setNewType(k)} style={chip(newType === k)}>
                    <Icon name={TYPE_STYLE[k].icon} size={14} color={newType === k ? "var(--white)" : "var(--slate)"} /> {k === "win" ? "Share a small win" : `Ask a ${TYPE_STYLE[k].label.toLowerCase()}`.replace("Ask a discussion", "Start a discussion")}
                  </button>
                ))}
              </div>
              <label htmlFor="post-title" style={{ position: "absolute", left: "-9999px" }}>Title</label>
              <input id="post-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={newType === "win" ? "What went well?" : "Give your post a clear title"}
                style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1.5px solid var(--line)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--ink)", background: "var(--white)", boxSizing: "border-box", marginBottom: "0.6rem" }} />
              <label htmlFor="post-body" style={{ position: "absolute", left: "-9999px" }}>Your post</label>
              <textarea id="post-body" value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={3}
                placeholder={newType === "win" ? "However small: a conversation that landed, a policy agreed, a colleague who felt included." : "Share the context so others can help. Please leave out names and anything that could identify a person."}
                style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1.5px solid var(--line)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.55, resize: "vertical", boxSizing: "border-box" }} />
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem 1.25rem", marginTop: "0.8rem" }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
                  <Icon name="globe" size={16} color="var(--slate)" /> Applies to
                  <select value={newPlace} onChange={(e) => setNewPlace(e.target.value as Jurisdiction)} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", padding: "0.4rem 0.6rem", minHeight: "36px", border: "1.5px solid var(--line)", borderRadius: "var(--radius-sm)", background: "var(--white)", color: "var(--ink)" }}>
                    <option value="UK">UK</option><option value="Bermuda">Bermuda</option><option value="US">US</option><option value="All">All jurisdictions</option>
                  </select>
                </label>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)", cursor: "pointer" }}>
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: "var(--evergreen)" }} />
                  <Icon name="eyeoff" size={16} color="var(--slate)" /> Post anonymously
                </label>
                <button onClick={submit} disabled={!newTitle.trim() || !newBody.trim()}
                  style={{ marginLeft: "auto", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", padding: "0.7rem 1.5rem", minHeight: "44px", borderRadius: "var(--radius-sm)", border: "none", cursor: newTitle.trim() && newBody.trim() ? "pointer" : "not-allowed", background: newTitle.trim() && newBody.trim() ? "var(--evergreen)" : "var(--line)", color: newTitle.trim() && newBody.trim() ? "var(--white)" : "var(--slate)" }}>
                  Post
                </button>
              </div>
              {anonymous && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)", margin: "0.7rem 0 0", lineHeight: 1.5 }}>
                  Other members will see &ldquo;Anonymous member&rdquo;. Anonymous posts are checked by The Inclusion Edit before they appear.
                </p>
              )}
            </section>

            {/* Feed filters */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem", marginBottom: "1rem" }}>
              {([["all", "Everything"], ["question", "Questions"], ["win", "Small wins"]] as const).map(([k, label]) => (
                <button key={k} onClick={() => setFeed(k)} aria-pressed={feed === k} style={chip(feed === k)}>{label}</button>
              ))}
              <span aria-hidden="true" style={{ width: "1px", height: "26px", background: "var(--line)", margin: "0 0.35rem" }} />
              {(["All", "UK", "Bermuda", "US"] as Jurisdiction[]).map((j) => (
                <button key={j} onClick={() => setPlace(j)} aria-pressed={place === j} style={chip(place === j)}>
                  {j === "All" ? <><Icon name="globe" size={14} color={place === j ? "var(--white)" : "var(--slate)"} /> All jurisdictions</> : j}
                </button>
              ))}
            </div>

            {/* Feed */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {visible.length === 0 && (
                <p style={{ fontFamily: "var(--font-body)", color: "var(--slate)", textAlign: "center", padding: "2rem 0" }}>Nothing here yet. Be the first to post.</p>
              )}
              {visible.map((p) => {
                const t = TYPE_STYLE[p.type];
                const isLiked = liked.includes(p.id);
                return (
                  <article key={p.id} style={{ display: "flex", gap: "0.9rem", background: "var(--white)", borderRadius: "var(--radius-md)", borderLeft: `4px solid ${t.color}`, borderTop: "1px solid var(--line)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: "1rem 1.15rem" }}>
                    {avatar(p)}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.35rem 0.6rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)" }}>{p.author}</span>
                        {!p.anonymous && <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--slate)" }}>{p.role}</span>}
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--slate)" }}>· {timeAgo(p.daysAgo)}</span>
                      </div>
                      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.45rem" }}>
                        {pill(t.label, t.color, t.bg, t.icon)}
                        {pill(p.jurisdiction === "All" ? "All jurisdictions" : p.jurisdiction, "var(--slate)", "var(--mist)", "globe")}
                        {p.tags.map((tag) => <span key={tag}>{pill(tag, "var(--evergreen)", "var(--pale-sage)")}</span>)}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)", lineHeight: 1.35, margin: "0 0 0.35rem" }}>{p.title}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--slate)", lineHeight: 1.6, margin: "0 0 0.6rem" }}>{p.body}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button onClick={() => toggleLike(p.id)} aria-pressed={isLiked} aria-label={`${p.type === "win" ? "Celebrate" : "Like"} this post`}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", padding: "0.35rem 0.8rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: `1.5px solid ${isLiked ? t.color : "var(--line)"}`, background: isLiked ? t.bg : "var(--white)", color: isLiked ? t.color : "var(--slate)" }}>
                          <Icon name={p.type === "win" ? "award" : "heart"} size={14} color={isLiked ? t.color : "var(--slate)"} /> {p.type === "win" ? "Celebrate" : "Like"} · {p.likes}
                        </button>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.82rem", color: "var(--slate)", padding: "0 0.4rem" }}>
                          <Icon name="message" size={14} color="var(--slate)" /> {p.replies} {p.replies === 1 ? "reply" : "replies"}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ── SIDEBAR: This Month in EDI, Member Perks, Upcoming Events ── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* This Month in EDI */}
            <section aria-labelledby="this-month" style={{ borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", boxShadow: "var(--shadow-feature)", padding: "1.35rem 1.4rem", color: "var(--white)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--hero-cream)" }}>
                <Icon name="book" size={14} color="var(--gold-light)" /> Monthly round-up
              </div>
              <h2 id="this-month" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.45rem", lineHeight: 1.2, margin: "0.45rem 0 0.6rem" }}>
                <span style={{ color: "var(--hero-cream)" }}>This Month</span> <span style={{ color: "var(--hero-mint)" }}>in EDI.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.88)", margin: "0 0 0.85rem" }}>
                The legislation, research and news that matter for your work across the UK, Bermuda and the US, in five minutes.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--hero-mint)" }}>
                <Icon name="calendar" size={16} color="var(--hero-mint)" /> Next round-up: {nextRoundUp()}
              </div>
            </section>

            {/* Member Perks */}
            <section aria-labelledby="perks" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.2rem 1.25rem" }}>
              <h2 id="perks" style={panelTitle}><Icon name="ticket" size={19} color="var(--evergreen)" /> Member perks</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {SAMPLE_PERKS.map((perk) => (
                  <div key={perk.code} style={{ background: "var(--pale-sage)", borderRadius: "var(--radius-md)", padding: "0.85rem 0.95rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--evergreen)" }}>{perk.partner}</div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.35, margin: "0.2rem 0 0.55rem" }}>{perk.offer}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button onClick={() => copyCode(perk.code)} aria-label={`Copy code ${perk.code}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", color: "var(--evergreen)", background: "var(--white)", border: "1.5px dashed var(--evergreen)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.75rem", minHeight: "36px", cursor: "pointer" }}>
                        <Icon name="copy" size={14} color="var(--evergreen)" /> {copied === perk.code ? "Copied" : perk.code}
                      </button>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--slate)" }}>Until {perk.expires}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.5, margin: "0.8rem 0 0" }}>
                Offers disappear automatically when they expire.
              </p>
            </section>

            {/* Upcoming Events */}
            <section aria-labelledby="events" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.2rem 1.25rem" }}>
              <h2 id="events" style={panelTitle}><Icon name="calendar" size={19} color="var(--evergreen)" /> Upcoming events</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {SAMPLE_EVENTS.map((ev) => (
                  <li key={ev.title} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: "52px", textAlign: "center", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--line)" }}>
                      <span style={{ display: "block", background: ev.host === "The Inclusion Edit" ? "var(--evergreen)" : "var(--coll-blue)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.15rem 0" }}>{ev.month}</span>
                      <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "var(--ink)", padding: "0.2rem 0", fontVariantNumeric: "lining-nums" }}>{ev.day}</span>
                    </span>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.35 }}>{ev.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--slate)", marginTop: "0.15rem" }}>{ev.detail}</div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: ev.host === "The Inclusion Edit" ? "var(--evergreen)" : "var(--coll-blue)", marginTop: "0.2rem" }}>{ev.host}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
      <BottomBanner />
    </div>
  );
}
