"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";

const videoCollections = [
  {
    id: "cpd-training",
    title: "CPD Training Videos",
    description: "Structured, CPD-accredited training sessions.",
    color: "#2A6B3A",
    bg: "var(--sage-light)",
    thumbnailBg: "linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)",
    icon: "📽️",
    videos: [
      { id: "what-is-edi", title: "What is EDI and Why Does It Matter?", duration: "25 min", tags: ["Foundations", "Culture"] },
      { id: "inclusive-recruitment-video", title: "Inclusive Recruitment: Common Mistakes", duration: "20 min", tags: ["Recruitment", "Systems"] },
      { id: "edi-data-video", title: "EDI Data: Collecting, Using and Communicating It", duration: "30 min", tags: ["Data & Evidence"] },
      { id: "disability-inclusion", title: "Disability Inclusion in Practice", duration: "25 min", tags: ["Disability", "Policy"] },
    ],
  },
  {
    id: "masterclasses",
    title: "Masterclasses",
    description: "Focused sessions with expert practitioners on specific EDI challenges.",
    color: "#5a4a7a",
    bg: "#f0eef8",
    thumbnailBg: "linear-gradient(135deg, #5a4a7a 0%, #7b6fa0 100%)",
    icon: "🎓",
    videos: [
      { id: "leading-with-inclusion", title: "Leading with Inclusion: A Framework for Managers", duration: "30 min", tags: ["Leadership", "Culture"] },
      { id: "edi-strategy-video", title: "How to Build an EDI Strategy from Scratch", duration: "35 min", tags: ["Strategy", "Leadership"] },
      { id: "business-case-edi", title: "Making the Business Case for EDI", duration: "30 min", tags: ["Strategy", "Data & Evidence"] },
      { id: "anti-racism-video", title: "Anti-Racism at Work: Moving Beyond Awareness", duration: "40 min", tags: ["Race", "Culture"] },
    ],
  },
  {
    id: "nuggets",
    title: "Nuggets & Snapshots",
    description: "Short, actionable video takeaways — 5 to 10 minutes, designed to fit your week.",
    color: "#8a5a28",
    bg: "#fdf3e8",
    thumbnailBg: "linear-gradient(135deg, #8a5a28 0%, #b07d4a 100%)",
    icon: "⚡",
    videos: [
      { id: "intersectionality-video", title: "Understanding Intersectionality", duration: "20 min", tags: ["Race", "Disability", "Culture"] },
      { id: "psychological-safety-video", title: "Psychological Safety in Teams", duration: "25 min", tags: ["Belonging", "Culture", "Wellbeing"] },
    ],
  },
];

const ALL_TAGS = [
  "Belonging", "Culture", "Data & Evidence", "Disability",
  "Foundations", "Leadership", "Policy", "Race",
  "Recruitment", "Strategy", "Systems", "Wellbeing",
];

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
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--charcoal)", letterSpacing: "-0.01em", margin: 0 }}>
                  Explore Videos
                </h1>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                  Coming soon
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem" }}>
                {totalVideos} expert-led videos across three collections. Members notified on launch.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {videoCollections.map((c) => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.75rem", borderRadius: "999px", background: c.bg, fontSize: "0.72rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: c.color, whiteSpace: "nowrap" }}>
                  <span aria-hidden="true">{c.icon}</span> {c.title}
                </div>
              ))}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", color: "var(--gray-soft)" }} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search videos by title or topic…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search videos"
              style={{
                width: "100%",
                padding: "0.9rem 1.25rem 0.9rem 3rem",
                borderRadius: "12px",
                border: "1.5px solid var(--gray-border)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                background: "var(--sage-xlight)",
                color: "var(--charcoal)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)", fontSize: "1.1rem", padding: "0.25rem" }}
              >
                ✕
              </button>
            )}
          </div>

          {/* TOPIC TAG PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingBottom: "1.5rem" }}>
            <button
              onClick={() => setActiveTag(null)}
              style={{
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
                padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
                borderColor: !activeTag ? "var(--sage-dark)" : "var(--gray-border)",
                background: !activeTag ? "var(--sage-dark)" : "transparent",
                color: !activeTag ? "var(--white)" : "var(--charcoal)",
                transition: "all 0.15s",
              }}
            >
              All videos
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
                  padding: "0.4rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1.5px solid",
                  borderColor: activeTag === tag ? "var(--sage-dark)" : "var(--gray-border)",
                  background: activeTag === tag ? "var(--sage-dark)" : "transparent",
                  color: activeTag === tag ? "var(--white)" : "var(--charcoal)",
                  transition: "all 0.15s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIDEOS */}
      <main id="main-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* Results count */}
        {(search || activeTag) && (
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", color: "var(--gray-soft)", marginBottom: "1.5rem" }}>
            {totalVisible === 0 ? "No videos found" : `${totalVisible} video${totalVisible === 1 ? "" : "s"} found`}
            {activeTag && <> in <strong style={{ color: "var(--charcoal)" }}>{activeTag}</strong></>}
            {search && <> matching <strong style={{ color: "var(--charcoal)" }}>&ldquo;{search}&rdquo;</strong></>}
            <button onClick={() => { setSearch(""); setActiveTag(null); }} style={{ marginLeft: "0.75rem", fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear filters
            </button>
          </p>
        )}

        {totalVisible === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)" }}>No videos match your search</p>
            <p>Try a different keyword or clear your filters.</p>
          </div>
        )}

        {filtered.map((collection) => (
          <section key={collection.id} style={{ marginBottom: "3rem" }} aria-labelledby={`collection-${collection.id}`}>
            {/* Collection header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", padding: "0.875rem 1.25rem", background: collection.bg, borderRadius: "12px", borderLeft: `4px solid ${collection.color}` }}>
              <span style={{ fontSize: "1.4rem" }} aria-hidden="true">{collection.icon}</span>
              <div>
                <h2 id={`collection-${collection.id}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>
                  {collection.title}
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                  {collection.description}
                </span>
              </div>
            </div>

            {/* Video cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {collection.videos.map((video, idx) => (
                <div
                  key={video.id}
                  style={{ display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--gray-border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", opacity: 0.85 }}
                >
                  {/* Colour thumbnail */}
                  <div style={{ background: collection.thumbnailBg, height: "100px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "2.25rem" }} aria-hidden="true">▶️</span>
                    <span style={{ position: "absolute", top: "0.6rem", right: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.25)", color: "var(--white)", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                      Coming soon
                    </span>
                    <span style={{ position: "absolute", bottom: "0.6rem", left: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "rgba(255,255,255,0.2)", lineHeight: 1 }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "1rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.35 }}>
                      {video.title}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                      {video.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: collection.color, background: collection.bg, padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "auto", paddingTop: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>⏱ {video.duration}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--sage-dark)", background: "var(--sage-xlight)", padding: "0.18rem 0.5rem", borderRadius: "999px" }}>
                        Notify me
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <BottomBanner />
    </div>
  );
}
