"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import Icon from "@/app/components/BrandIcon";

/* Office hours: the first Tuesday and the third Thursday of every month, 2pm to 5pm UK time.
   Dates work themselves out, so nothing needs updating by hand. */
const SLOT_TIMES = ["2:00pm", "3:00pm", "4:00pm"];
const SUPPORT_EMAIL = "info@theinclusionedit.com";

function nthWeekday(year: number, month: number, weekday: number, n: number) {
  const d = new Date(year, month, 1);
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1);
  d.setDate(d.getDate() + 7 * (n - 1));
  return d;
}

function upcomingSessions(count = 2, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const out: Date[] = [];
  for (let m = 0; out.length < count && m < 6; m++) {
    const y = from.getFullYear() + Math.floor((from.getMonth() + m) / 12);
    const mo = (from.getMonth() + m) % 12;
    [nthWeekday(y, mo, 2, 1), nthWeekday(y, mo, 4, 3)].forEach((d) => { if (d >= today && out.length < count) out.push(d); });
  }
  return out;
}

const fmt = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

/* What do you need? Routes members to the right kind of help */
const ROUTES = [
  { icon: "sparkle", title: "A quick answer", body: "Get a first draft or a fast review in minutes.", href: "/dashboard/inclusion-ai", cta: "Use Inclusion AI", gold: true },
  { icon: "book", title: "A practical resource", body: "Guides, checklists and templates to use today.", href: "/dashboard/apply", cta: "Browse Apply" },
  { icon: "people", title: "A peer's view", body: "Ask people who have faced the same challenge.", href: "/dashboard/community", cta: "Ask the Editors" },
  { icon: "message", title: "A real conversation", body: "Thirty minutes with an inclusion expert.", href: "#office-hours", cta: "Book Office Hours" },
  { icon: "briefcase", title: "A bigger piece of work", body: "Strategy, training or consultancy for your organisation.", href: "#more-support", cta: "Talk to Us" },
];

export default function SupportPage() {
  const sessions = useMemo(() => upcomingSessions(2), []);
  const [chosen, setChosen] = useState<string | null>(null);
  const [topic, setTopic] = useState("");

  const bookingLink = () => {
    const subject = `Office hours request: ${chosen}`;
    const body = `Hello,\n\nI would like to book office hours with an inclusion expert.\n\nSlot: ${chosen} (UK time)\nWhat I would like to talk about: ${topic.trim() || "(please add a line or two)"}\n\nThank you`;
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--mist)" }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, compact) */}
      <header style={{ position: "relative", minHeight: "400px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest)" }}>
        <img src="/get-support-hero.jpg" alt="" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: "28%", width: "72%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 2.5rem", width: "100%", boxSizing: "border-box" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", textDecoration: "none", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.9rem", backdropFilter: "blur(4px)" }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--white)", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "0.4rem 1rem" }}>
              Impact Platform: Get Support
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.05, color: "var(--white)", margin: "1rem 0 0.75rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--hero-cream)" }}>Get</span> <span style={{ color: "var(--hero-mint)" }}>Support.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "var(--white)", maxWidth: "560px", margin: "0 0 1.25rem" }}>
            A quick answer, a peer&apos;s view or a real conversation with an inclusion expert: help that fits the moment you are in.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--hero-cream)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="message" color="var(--hero-cream)" /> Office hours twice a month</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="clock" color="var(--hero-cream)" /> 30 minutes, one to one</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}><Icon name="globe" color="var(--hero-cream)" /> UK, Bermuda and US</span>
          </div>
        </div>
      </header>

      <main id="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.25rem 1.5rem 4.5rem" }}>

        {/* WHAT DO YOU NEED? */}
        <section aria-labelledby="what-you-need" style={{ marginBottom: "2.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--evergreen)", marginBottom: "0.35rem" }}>Start here</div>
            <h2 id="what-you-need" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 2.8vw, 1.85rem)", color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>What do you need right now?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "0.85rem" }}>
            {ROUTES.map((r) => (
              <a key={r.title} href={r.href} style={{ display: "flex", flexDirection: "column", gap: "0.4rem", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", padding: "1rem 1.05rem", textDecoration: "none" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--pale-sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.2rem" }}>
                  <Icon name={r.icon} size={19} color={r.gold ? "var(--gold-deep)" : "var(--evergreen)"} strokeWidth={r.gold ? 2 : 1.75} />
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)" }}>{r.title}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--slate)", lineHeight: 1.5 }}>{r.body}</span>
                <span style={{ marginTop: "auto", paddingTop: "0.35rem", display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--evergreen)" }}>
                  {r.cta} <Icon name="chevron" size={15} color="var(--evergreen)" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* OFFICE HOURS WITH AN INCLUSION EXPERT */}
        <section id="office-hours" aria-labelledby="office-hours-title" style={{ marginBottom: "2.5rem", scrollMarginTop: "90px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem", padding: "0.85rem 1.25rem", background: "var(--pale-sage)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--evergreen)" }}>
            <Icon name="message" size={22} color="var(--evergreen)" />
            <div style={{ flex: 1, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.2rem 0.75rem" }}>
              <h2 id="office-hours-title" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--evergreen)", margin: 0 }}>Office Hours with an Inclusion Expert</h2>
              <span style={{ fontSize: "0.9rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>Thirty minutes, one to one, with a real person.</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {/* Note: why, and how it works */}
            <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.5rem 1.75rem" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--evergreen)" }}>A note from The Inclusion Edit</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.3rem, 2.2vw, 1.55rem)", lineHeight: 1.2, color: "var(--ink)", margin: "0.45rem 0 0.65rem" }}>
                You told us you wanted a real person. So we made time.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.65, color: "var(--slate)", margin: "0 0 0.9rem" }}>
                Tools and resources go a long way, but sometimes you need to talk it through with someone who understands inclusion work. Office hours are a conversation, not a course: bring a challenge, a decision or a draft, and leave with a clearer next step.
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {[
                  { icon: "calendar", text: "Twice a month: the first Tuesday and the third Thursday" },
                  { icon: "clock", text: "30 minutes between 2pm and 5pm UK time, which is late morning in Bermuda and on the US East Coast" },
                  { icon: "people", text: "One booking per member each month, so everyone gets a turn" },
                  { icon: "clipboard", text: "Tell us your topic when you book, so we can come prepared" },
                ].map((i) => (
                  <li key={i.text} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--ink)" }}>
                    <span style={{ flexShrink: 0, marginTop: "0.1rem", display: "flex" }}><Icon name={i.icon} size={17} color="var(--evergreen)" /></span> {i.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking: next two sessions, worked out automatically */}
            <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.5rem 1.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 0.9rem" }}>Choose a time</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {sessions.map((d) => (
                  <div key={d.toISOString()}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--evergreen)", marginBottom: "0.5rem" }}>
                      <Icon name="calendar" size={16} color="var(--evergreen)" /> {fmt(d)}
                    </div>
                    <div role="radiogroup" aria-label={`Times on ${fmt(d)}`} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {SLOT_TIMES.map((t) => {
                        const key = `${fmt(d)} at ${t}`;
                        const on = chosen === key;
                        return (
                          <button key={t} role="radio" aria-checked={on} onClick={() => setChosen(on ? null : key)}
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", padding: "0.55rem 1.1rem", minHeight: "44px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: `1.5px solid ${on ? "var(--evergreen)" : "var(--line)"}`, background: on ? "var(--evergreen)" : "var(--white)", color: on ? "var(--white)" : "var(--ink)", fontVariantNumeric: "lining-nums" }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <label htmlFor="topic" style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "var(--ink)", margin: "1.1rem 0 0.4rem" }}>What would you like to talk about?</label>
              <textarea id="topic" rows={2} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="A line or two is plenty. Please leave out names."
                style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1.5px solid var(--line)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.5, resize: "vertical", boxSizing: "border-box" }} />
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem 1rem", marginTop: "0.85rem" }}>
                {chosen ? (
                  <a href={bookingLink()} style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--evergreen)", color: "var(--white)", textDecoration: "none" }}>
                    Request This Time
                  </a>
                ) : (
                  <span aria-disabled="true" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--line)", color: "var(--slate)" }}>
                    Request This Time
                  </span>
                )}
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--slate)" }}>
                  {chosen ? `Selected: ${chosen}. This opens an email to us, and we will confirm your time by reply.` : "Choose a time first."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MORE SUPPORT and WHERE ELSE TO GET HELP */}
        <div id="more-support" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", scrollMarginTop: "90px" }}>
          <section aria-labelledby="bigger" style={{ borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)", boxShadow: "var(--shadow-feature)", padding: "1.5rem 1.75rem", color: "var(--white)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--hero-cream)" }}>Need more than 30 minutes?</div>
            <h2 id="bigger" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", lineHeight: 1.2, margin: "0.45rem 0 0.6rem" }}>
              <span style={{ color: "var(--hero-cream)" }}>Let&apos;s talk about</span> <span style={{ color: "var(--hero-mint)" }}>your organisation.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.65, color: "rgba(255,255,255,0.88)", margin: "0 0 1.1rem" }}>
              For an EDI strategy, training for your teams or support with a specific project, book a Free Inclusion Call. We will listen first, then tell you honestly how we can help.
            </p>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Free Inclusion Call")}`} style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", padding: "0.75rem 1.5rem", minHeight: "44px", boxSizing: "border-box", borderRadius: "var(--radius-sm)", background: "var(--white)", color: "var(--evergreen)", textDecoration: "none" }}>
              Book a Free Inclusion Call
            </a>
          </section>

          <section aria-labelledby="elsewhere" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.5rem 1.75rem" }}>
            <h2 id="elsewhere" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 0.5rem" }}>
              <Icon name="shield" size={19} color="var(--evergreen)" /> Where else to get help
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--slate)", margin: "0 0 0.85rem" }}>
              Office hours are not legal advice. If you need advice on employment law or a formal complaint, speak to an employment lawyer or your HR policy owner, or contact the official body where you are:
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { place: "UK", body: "Acas, for free workplace advice" },
                { place: "Bermuda", body: "The Human Rights Commission" },
                { place: "US", body: "The Equal Employment Opportunity Commission (EEOC)" },
              ].map((x) => (
                <li key={x.place} style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)" }}>
                  <span style={{ flexShrink: 0, minWidth: "68px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--evergreen)" }}>{x.place}</span> {x.body}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.55, color: "var(--slate)", margin: "0.9rem 0 0" }}>
              Something not working on the platform? Email <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--evergreen)", fontWeight: 700 }}>{SUPPORT_EMAIL}</a>.
            </p>
          </section>
        </div>
      </main>
      <BottomBanner />
    </div>
  );
}
