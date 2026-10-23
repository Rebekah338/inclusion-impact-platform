"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { useState } from "react";

const OFFICE_HOURS = [
  { day: "Monday", time: "10:00–11:00am", spots: 2, booked: 1 },
  { day: "Wednesday", time: "12:00–1:00pm", spots: 2, booked: 0 },
  { day: "Friday", time: "9:00–10:00am", spots: 2, booked: 2 },
];

export default function SupportPage() {
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <nav role="navigation" style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Get Support</span>
      </nav>

      <main id="main-content" style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Get Support</h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "2.5rem" }}>Expert coaching, live office hours, and peer support all in one place.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1.5rem" }}>

          {/* Office Hours */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "2rem" }}>🗓️</div>
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>Office Hours with Rebekah</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", margin: 0 }}>
                  Book a 30-minute 1:1 call with Rebekah to get unstuck, think through a challenge, or get feedback on your EDI work. Three sessions available each week.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {OFFICE_HOURS.map((slot) => {
                const available = slot.spots - slot.booked;
                const isConfirmed = bookingConfirmed === `${slot.day}-${slot.time}`;
                return (
                  <div key={slot.day} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "var(--sage-xlight)", borderRadius: "10px", gap: "1rem" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>{slot.day}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)" }}>{slot.time} UK time</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 600, color: available > 0 ? "var(--sage-dark)" : "var(--gray-soft)" }}>
                        {available > 0 ? `${available} spot${available > 1 ? "s" : ""} left` : "Fully booked"}
                      </span>
                      {isConfirmed ? (
                        <span className="badge badge-sage">Booked ✓</span>
                      ) : (
                        <button disabled={available === 0} onClick={() => setBookingConfirmed(`${slot.day}-${slot.time}`)}
                          className={available > 0 ? "btn-primary" : "btn-secondary"}
                          style={{ fontSize: "0.8rem", padding: "0.4rem 1rem", opacity: available === 0 ? 0.5 : 1 }}>
                          Book
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1:1 Coaching */}
          <div className="card">
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎯</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Expert Coaching</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Want deeper support? Book a dedicated 60-minute coaching session with Rebekah for strategy, stakeholder navigation, or working through a specific challenge.
            </p>
            <a href="mailto:hello@theinclusionedit.com?subject=Coaching%20enquiry" className="btn-primary" style={{ fontSize: "0.875rem", textAlign: "center", display: "block" }}>
              Enquire about coaching
            </a>
          </div>

          {/* Community */}
          <div className="card">
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💬</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>The Inclusion Editors</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Your peer community ask questions, share insights, read blogs from Rebekah and guests. Think of it as a private LinkedIn group, just for EDI practitioners.
            </p>
            <Link href="/dashboard/community" className="btn-secondary" style={{ fontSize: "0.875rem", textAlign: "center", display: "block" }}>
              Go to community →
            </Link>
          </div>

          {/* Live events */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📅</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>Live Events</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Monthly live webinars, Q&amp;A sessions, and member-only events. Dates and topics will be announced here.
            </p>
            <div style={{ background: "var(--cream)", borderRadius: "10px", padding: "1.25rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", margin: 0 }}>
                📣 Next event coming soon watch this space.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
