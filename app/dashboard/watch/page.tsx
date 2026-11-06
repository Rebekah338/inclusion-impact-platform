"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";

const videoCollections = [
  {
    id: "cpd-training",
    title: "CPD Training Videos",
    description: "Structured, CPD-accredited training sessions.",
    color: "var(--coll-green)",
    bg: "var(--coll-green-tint)",
    mid: "var(--coll-green-mid)",
    icon: "video",
    videos: [
      { id: "what-is-edi", image: "/watch-1-team-coffee.jpg", title: "What is EDI and Why Does It Matter?", duration: "25 min", tags: ["Foundations", "Culture"] },
      { id: "inclusive-recruitment-video", image: "/watch-2-collaboration.jpg", title: "Inclusive Recruitment: Common Mistakes", duration: "20 min", tags: ["Recruitment", "Systems"] },
      { id: "edi-data-video", image: "/watch-3-team-review.jpg", title: "EDI Data: Collecting, Using and Communicating It", duration: "30 min", tags: ["Data & Evidence"] },
      { id: "disability-inclusion", image: "/watch-4-meeting-discussion.jpg", title: "Disability Inclusion in Practice", duration: "25 min", tags: ["Disability", "Policy"] },
    ],
  },
  {
    id: "masterclasses",
    title: "Masterclasses",
    description: "Focused sessions with expert practitioners on specific EDI challenges.",
    color: "var(--coll-purple)",
    bg: "var(--coll-purple-tint)",
    mid: "var(--coll-purple-mid)",
    icon: "graduation",
    videos: [
      { id: "leading-with-inclusion", image: "/watch-5-team-presentation.jpg", title: "Leading with Inclusion: A Framework for Managers", duration: "30 min", tags: ["Leadership", "Culture"] },
      { id: "edi-strategy-video", image: "/watch-6-strategy.jpg", title: "How to Build an EDI Strategy from Scratch", duration: "35 min", tags: ["Strategy", "Leadership"] },
      { id: "business-case-edi", image: "/watch-7-diverse-meeting.jpg", title: "Making the Business Case for EDI", duration: "30 min", tags: ["Strategy", "Data & Evidence"] },
      { id: "anti-racism-video", image: "/watch-8-working-together.jpg", title: "Anti-Racism at Work: Moving Beyond Awareness", duration: "40 min", tags: ["Race", "Culture"] },
    ],
  },
  {
    id: "nuggets",
    title: "Nuggets & Snapshots",
    description: "Short, actionable video takeaways designed to fit your week.",
    color: "var(--coll-amber)",
    bg: "var(--coll-amber-tint)",
    mid: "var(--coll-amber-mid)",
    icon: "zap",
    videos: [
      { id: "intersectionality-video", image: "/watch-masterclass.jpg", title: "Understanding Intersectionality", duration: "20 min", tags: ["Race", "Disability", "Culture"] },
      { id: "psychological-safety-video", image: "/collaboration.jpg", title: "Psychological Safety in Teams", duration: "25 min", tags: ["Belonging", "Culture", "Wellbeing"] },
    ],
  },
];

const ALL_TAGS = [
  "Belonging", "Culture", "Data & Evidence", "Disability",
  "Foundations", "Leadership", "Policy", "Race",
  "Recruitment", "Strategy", "Systems", "Wellbeing",
];

const chipStyle = (selected: boolean): React.CSSProperties => ({
  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.85rem",
  padding: "0.45rem 1rem", minHeight: "36px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
  borderColor: selected ? "var(--evergreen)" : "var(--line)",
  background: selected ? "var(--evergreen)" : "var(--white)",
  color: selected ? "var(--white)" : "var(--ink)",
  transition: "all 0.15s",
});

export default function WatchPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return videoCollections.map((col) => ({
      ...col,
      videos: col.videos.filter((v) => {
        const matchesSearch = !q || v.title.toLowerCase().includes(q) || v.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTag = !activeTag || v.tags.includes(activeTag);
        return matchesSearch && matchesTag;
      }),
    })).filter((c) => c.videos.length > 0);
  }, [search, activeTag]);

  const totalVisible = filtered.reduce((sum, c) => sum + c.videos.length, 0);
  const totalVideos = videoCollections.reduce((sum, c) => sum + c.videos.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "500px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/watch-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 44%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 2.75rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              Impact Platform: Watch
            </span>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", background: "var(--gold)", borderRadius: "999px", padding: "0.4rem 0.9rem" }}>
              Coming soon
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Explore</span> <span style={{ color: "var(--hero-mint)" }}>Videos.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "560px", margin: "0 0 1.25rem" }}>
            Expert insight you can apply the same week, in the time you actually have.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="play" color="var(--hero-cream)" /> {totalVideos} expert-led videos</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="layers" color="var(--hero-cream)" /> {videoCollections.length} collections</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="bell" color="var(--hero-cream)" /> Members notified on launch</span>
          </div>
        </div>
      </header>

      {/* FILTER STRIP */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "1.5rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.25rem" }} aria-label="Video collections">
            {videoCollections.map((c) => (
              <a key={c.id} href={`#collection-${c.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.45rem 0.95rem", borderRadius: "999px", border: `1.5px solid ${c.color}`, background: "var(--white)", fontSize: "0.85rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: c.color, whiteSpace: "nowrap", textDecoration: "none" }}>
                <Icon name={c.icon} size={16} color={c.color} /> {c.title}
              </a>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
            <span style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", display: "flex" }}><Icon name="search" color="var(--slate)" /></span>
            <input
              type="search"
              placeholder="Search videos by title or topic"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search videos"
              style={{ width: "100%", padding: "0.9rem 1.25rem 0.9rem 3rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)", fontSize: "1rem", background: "var(--mist)", color: "var(--ink)", boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--slate)", fontSize: "1.1rem", padding: "0.25rem" }}>✕</button>
            )}
          </div>

          {/* TOPIC TAG PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem" }} aria-label="Filter by topic">
            <button onClick={() => setActiveTag(null)} aria-pressed={!activeTag} style={chipStyle(!activeTag)}>All videos</button>
            {ALL_TAGS.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} aria-pressed={activeTag === tag} style={chipStyle(activeTag === tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIDEOS */}
      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* Results count */}
        {(search || activeTag) && (
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--slate)", marginBottom: "1.5rem" }} aria-live="polite">
            {totalVisible === 0 ? "No videos found" : `${totalVisible} video${totalVisible === 1 ? "" : "s"} found`}
            {activeTag && <> in <strong style={{ color: "var(--ink)" }}>{activeTag}</strong></>}
            {search && <> matching <strong style={{ color: "var(--ink)" }}>&ldquo;{search}&rdquo;</strong></>}
            <button onClick={() => { setSearch(""); setActiveTag(null); }} style={{ marginLeft: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--evergreen)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear filters
            </button>
          </p>
        )}

        {totalVisible === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}><Icon name="search" size={40} color="var(--sage)" /></div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--ink)" }}>No videos match your search</p>
            <p>Try a different keyword or clear your filters.</p>
          </div>
        )}

        {filtered.map((collection) => (
          <section key={collection.id} id={`collection-${collection.id}`} style={{ marginBottom: "2.75rem", scrollMarginTop: "90px" }} aria-labelledby={`collection-title-${collection.id}`}>
            {/* Section opener: pale tint with a 4px left border in the collection tone */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "0.95rem 1.35rem", background: collection.bg, borderRadius: "var(--radius-md)", borderLeft: `4px solid ${collection.color}` }}>
              <Icon name={collection.icon} size={22} color={collection.color} />
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.25rem 0.75rem" }}>
                <h2 id={`collection-title-${collection.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: collection.color, margin: 0 }}>
                  {collection.title}
                </h2>
                <span style={{ fontSize: "0.9rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                  {collection.description}
                </span>
              </div>
            </div>

            {/* Video cards: tinted photo thumbnails, one choice per row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {collection.videos.map((video, idx) => {
                return (
                  <article
                    key={video.id}
                    style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-md)", overflow: "hidden", border: `1.5px solid ${collection.mid}`, boxShadow: "var(--shadow-sm)" }}
                  >
                    {/* Thumbnail: tinted photo with the 6px collection band on top */}
                    <div style={{ height: "130px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderTop: `6px solid ${collection.color}`, background: "var(--forest)" }}>
                      <img src={video.image} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--photo-tint)" }} />
                      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,40,25,0) 45%, rgba(20,40,25,0.7) 100%)" }} />
                      <span style={{ position: "relative", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(26,50,32,0.55)", border: "2px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "3px", backdropFilter: "blur(2px)" }} aria-hidden="true">
                        <Icon name="play" size={22} color="var(--white)" />
                      </span>
                      <span style={{ position: "absolute", top: "0.6rem", right: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "var(--gold)", color: "var(--ink)", padding: "0.22rem 0.6rem", borderRadius: "999px" }}>
                        Coming soon
                      </span>
                      <span style={{ position: "absolute", bottom: "0.55rem", left: "0.85rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--white)", lineHeight: 1, fontVariantNumeric: "lining-nums" }} aria-hidden="true">
                        Video {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "1rem 1.1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)", lineHeight: 1.35, margin: 0 }}>
                        {video.title}
                      </h3>

                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {video.tags.slice(0, 2).map((tag) => (
                          <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", color: collection.color, background: collection.bg, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "var(--slate)", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                          <Icon name="clock" size={14} color="var(--slate)" /> {video.duration}
                        </span>
                      </div>
                    </div>
                  </article>
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
