"use client";


import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    id: 1,
    author: "Priya M.",
    initials: "PM",
    role: "Head of People, Tech Sector",
    time: "2 hours ago",
    title: "How do you handle resistance when introducing EDI frameworks to a sceptical leadership team?",
    body: "I've been working on embedding our first EDI strategy and keep hitting a wall at SLT level. The data is there, the case is made but there's still a lot of 'this doesn't apply to us'. Would love to hear how others have navigated this.",
    tags: ["leadership", "buy-in", "strategy"],
    replies: 4,
    likes: 11,
  },
  {
    id: 2,
    author: "Damien K.",
    initials: "DK",
    role: "HR Business Partner",
    time: "Yesterday",
    title: "Sharing: our approach to neurodiversity disclosure what worked",
    body: "We completely overhauled how we handle neurodiversity disclosures during recruitment. Happy to share the process and templates we built if anyone would find it useful.",
    tags: ["neurodiversity", "recruitment", "disclosure"],
    replies: 7,
    likes: 19,
  },
  {
    id: 3,
    author: "Rachel T.",
    initials: "RT",
    role: "EDI Manager, NHS Trust",
    time: "2 days ago",
    title: "Which EDI metrics do you actually report on?",
    body: "We're rebuilding our dashboard and I'm curious what metrics others find most meaningful vs what feels like box-ticking. Particularly interested in experience metrics beyond headcount.",
    tags: ["data", "metrics", "measurement"],
    replies: 12,
    likes: 23,
  },
];

export default function CommunityPage() {
  
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [activeTab, setActiveTab] = useState<"discussion" | "blogs">("discussion");

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>The Inclusion Editors</span>
        <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>Member community</span>
      </nav>

      <main id="main-content" style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            The Inclusion Editors
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem" }}>
            A peer space for EDI practitioners ask questions, share wins, get unstuck together.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--gray-border)", marginBottom: "2rem" }}>
          {(["discussion", "blogs"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", padding: "0.75rem 1.5rem", background: "none", border: "none", cursor: "pointer", color: activeTab === tab ? "var(--sage-dark)" : "var(--gray-soft)", borderBottom: activeTab === tab ? "2px solid var(--sage-dark)" : "2px solid transparent", marginBottom: "-2px", textTransform: "capitalize" }}>
              {tab === "discussion" ? "💬 Discussion" : "✍️ Blogs & Insights"}
            </button>
          ))}
        </div>

        {activeTab === "discussion" && (
          <>
            {/* Post composer */}
            <div className="card" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
                  {"M"}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Give your post a title…"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1.5px solid var(--gray-border)", borderRadius: "8px", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.625rem", outline: "none" }}
                  />
                  <textarea
                    placeholder="Share a question, insight, or experience with the community…"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                    style={{ width: "100%", padding: "0.625rem 0.75rem", border: "1.5px solid var(--gray-border)", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "0.9rem", resize: "vertical", outline: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.625rem" }}>
                    <button
                      disabled={!newPost.trim() || !newTitle.trim()}
                      className="btn-primary"
                      style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem", opacity: !newPost.trim() || !newTitle.trim() ? 0.5 : 1 }}
                    >
                      Post to community
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SAMPLE_POSTS.map((post) => (
                <div key={post.id} className="card" style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div style={{ display: "flex", gap: "0.875rem" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--sage-light)", color: "var(--sage-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>
                      {post.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)" }}>{post.author}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)" }}>{post.role}</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--gray-soft)" }}>· {post.time}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>{post.title}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{post.body}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "0.375rem" }}>
                          {post.tags.map((t) => <span key={t} className="badge badge-cream" style={{ fontSize: "0.6rem" }}>{t}</span>)}
                        </div>
                        <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>💬 {post.replies} replies</span>
                          <span style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>♡ {post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "blogs" && (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✍️</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
              Blogs & Insights coming soon
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>
              Rebekah and guest contributors will post EDI insights, case studies, and practical guides here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
