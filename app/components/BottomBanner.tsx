"use client";
import { useState } from "react";

export default function BottomBanner({
  resourceTitle = "Request a new resource",
  resourceBody = "Is there a topic, tool, or framework you wish existed on the platform? Let us know and we\'ll build it.",
  resourcePlaceholder = "Describe the resource you need…",
}: {
  resourceTitle?: string;
  resourceBody?: string;
  resourcePlaceholder?: string;
} = {}) {
  const [challengeText, setChallengeText] = useState("");
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [resourceText, setResourceText] = useState("");
  const [resourceSubmitted, setResourceSubmitted] = useState(false);

  const boxStyle: React.CSSProperties = {
    borderRadius: "20px",
    padding: "1.25rem 1.5rem",
    background: "linear-gradient(135deg, #1E3624 0%, #2C4A31 100%)",
    boxShadow: "0 8px 40px rgba(30,54,36,0.25)",
    position: "relative",
    overflow: "hidden",
    flex: 1,
    minWidth: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-heading)",
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "1rem",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
    color: "var(--white)",
    marginBottom: "0.75rem",
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.95rem",
    marginBottom: "1.25rem",
    lineHeight: 1.65,
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "var(--white)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    resize: "vertical",
    marginBottom: "0.875rem",
    boxSizing: "border-box",
  };

  const btnStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "0.9rem",
    background: "var(--white)",
    color: "var(--sage-dark)",
    padding: "0.75rem 1.75rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  };

  const successStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    border: "1px solid rgba(255,255,255,0.2)",
  };

  return (
    <section aria-label="Community" data-noprint="true" style={{ padding: "4rem 1.5rem", background: "var(--white)" }}>
      <style>{`
        .bottom-banner-textarea::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>

          {/* BOX 1: Share an inclusion challenge */}
          <div style={boxStyle}>
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={labelStyle}>💬 Community</span>
              <h2 style={headingStyle}>Share an inclusion challenge</h2>
              <p style={bodyStyle}>
                Facing something tricky in your EDI work? Share it here and we&apos;ll address it through the platform in content, resources, or our live sessions.
              </p>
              {challengeSubmitted ? (
                <div style={successStyle}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", fontSize: "0.95rem" }}>✅ Thank you, challenge received!</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", marginTop: "0.375rem" }}>We&apos;ll review it and address it through the platform.</div>
                </div>
              ) : (
                <div>
                  <textarea
                    className="bottom-banner-textarea"
                    value={challengeText}
                    onChange={(e) => setChallengeText(e.target.value)}
                    placeholder="Describe your inclusion challenge…"
                    rows={3}
                    style={textareaStyle}
                  />
                  <button
                    onClick={() => { if (challengeText.trim()) setChallengeSubmitted(true); }}
                    style={btnStyle}
                  >
                    Share your challenge →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOX 2: Request a new resource */}
          <div style={boxStyle}>
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={labelStyle}>📚 Resources</span>
              <h2 style={headingStyle}>{resourceTitle}</h2>
              <p style={bodyStyle}>
                {resourceBody}
              </p>
              {resourceSubmitted ? (
                <div style={successStyle}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", fontSize: "0.95rem" }}>✅ Request received, thank you!</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", marginTop: "0.375rem" }}>We&apos;ll consider it for an upcoming release.</div>
                </div>
              ) : (
                <div>
                  <textarea
                    className="bottom-banner-textarea"
                    value={resourceText}
                    onChange={(e) => setResourceText(e.target.value)}
                    placeholder={resourcePlaceholder}
                    rows={3}
                    style={textareaStyle}
                  />
                  <button
                    onClick={() => { if (resourceText.trim()) setResourceSubmitted(true); }}
                    style={btnStyle}
                  >
                    Submit request →
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
