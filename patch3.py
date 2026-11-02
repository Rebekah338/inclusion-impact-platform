import sys
path = sys.argv[1]
with open(path, 'r') as f:
    content = f.read()

old = """            {/* Row 2: Watch library */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Watch library</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Get expert insight in the time you actually have</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {([
                  { icon: "\U0001f393", label: "Deep Dives",    sub: "30–45 min",  desc: "In-depth expert sessions on complex EDI topics." },
                  { icon: "\U0001f3ac", label: "Masterclasses", sub: "15–20 min",  desc: "Focused sessions on a single skill or framework." },
                  { icon: "⚡",       label: "Nuggets",        sub: "5–10 min",  desc: "Sharp, actionable takeaways for a busy week." },
                ] as const).map((w) => (
                  <div key={w.label} style={{ background: "var(--white)", borderRadius: "14px", padding: "1.25rem", border: "1.5px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.25rem" }}>{w.icon}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.88rem", color: "var(--charcoal)" }}>{w.label}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--sage-dark)", marginLeft: "auto", whiteSpace: "nowrap" }}>{w.sub}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{w.desc}</p>
                    <div style={{ marginTop: "0.25rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only \U0001f512</div>
                  </div>
                ))}
              </div>
            </div>"""

new = """            {/* Row 2: Watch library */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Watch library</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Get expert insight in the time you actually have</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {([
                  { icon: "\U0001f393", label: "Deep Dives",    sub: "30–45 min", desc: "In-depth expert sessions on complex EDI topics.", img: "/collaboration.jpg" },
                  { icon: "\U0001f3ac", label: "Masterclasses", sub: "15–20 min", desc: "Focused sessions on a single skill or framework.",  img: "/team-meeting.jpg" },
                  { icon: "⚡",     label: "Nuggets",        sub: "5–10 min",  desc: "Sharp, actionable takeaways for a busy week.",       img: "/workshop.jpg" },
                ] as const).map((w) => (
                  <div key={w.label} style={{ background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1.5px solid var(--gray-border)" }}>
                    <div style={{ height: "110px", backgroundImage: `url('${w.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                      <div style={{ position: "absolute", bottom: "0.6rem", left: "0.875rem", right: "0.875rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.82rem", color: "white" }}>{w.icon} {w.label}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{w.sub}</span>
                      </div>
                    </div>
                    <div style={{ padding: "0.875rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{w.desc}</p>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only \U0001f512</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>"""

assert old in content, "MISS watch"
content = content.replace(old, new, 1)

old2 = """            {/* Row 3: Resources */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Resources and frameworks</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Pick up a tool and apply it today</span>
              </div>
              <div className="resources-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {[
                  { icon: "\U0001f4cb", title: "Inclusive Meeting Checklist", type: "Checklist", desc: "Run meetings where every voice is heard and psychological safety is maintained." },
                  { icon: "\U0001f5fa️", title: "EDI Strategy Roadmap",  type: "Framework", desc: "Build a credible, evidence-led EDI strategy from the ground up." },
                  { icon: "\U0001f4ca", title: "Business Case Template",        type: "Template",  desc: "Build the evidence-backed case for EDI investment; tailored for leadership teams." },
                ].map((r) => (
                  <div key={r.title} style={{ background: "var(--white)", borderRadius: "14px", padding: "1.25rem", border: "1.5px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.25rem" }}>{r.icon}</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--sage-dark)" }}>{r.type}</div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.3 }}>{r.title}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                    <div style={{ marginTop: "0.25rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only \U0001f512</div>
                  </div>
                ))}
              </div>
            </div>"""

new2 = """            {/* Row 3: Resources */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)", margin: 0 }}>Resources and frameworks</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-soft)" }}>Pick up a tool and apply it today</span>
              </div>
              <div className="resources-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {[
                  { title: "Inclusive Meeting Checklist", type: "Checklist", desc: "Run meetings where every voice is heard and psychological safety is maintained.", img: "/team-meeting.jpg" },
                  { title: "EDI Strategy Roadmap",        type: "Framework", desc: "Build a credible, evidence-led EDI strategy from the ground up.",               img: "/workshop.jpg" },
                  { title: "Business Case Template",      type: "Template",  desc: "Build the evidence-backed case for EDI investment; tailored for leadership teams.", img: "/collaboration.jpg" },
                ].map((r) => (
                  <div key={r.title} style={{ background: "var(--white)", borderRadius: "14px", overflow: "hidden", border: "1.5px solid var(--gray-border)" }}>
                    <div style={{ height: "110px", backgroundImage: `url('${r.img}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
                      <div style={{ position: "absolute", top: "0.6rem", left: "0.875rem", background: "var(--sage-dark)", color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>{r.type}</div>
                      <div style={{ position: "absolute", bottom: "0.6rem", left: "0.875rem", right: "0.875rem" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.82rem", color: "white", lineHeight: 1.3 }}>{r.title}</span>
                      </div>
                    </div>
                    <div style={{ padding: "0.875rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", color: "var(--sage-dark)" }}>Members only \U0001f512</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>"""

assert old2 in content, "MISS resources"
content = content.replace(old2, new2, 1)

with open(path, 'w') as f:
    f.write(content)
print("Done")
