"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const WHAT_WE_OFFER = [
  { href: "/edi-consultancy-programmes", label: "Inclusion Consultancy" },
  { href: "/edi-training", label: "Inclusion Training" },
  { href: "/bespoke-inclusion-resources", label: "Bespoke Inclusion Resources" },
];

const CONTACT_LINKS = [
  { href: "/contact-us", label: "Contact Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/subscribe", label: "Newsletter" },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (offerRef.current && !offerRef.current.contains(e.target as Node)) {
        setOfferOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOfferOpen(false);
    setContactOpen(false);
  }, [pathname]);

  const isOfferActive = WHAT_WE_OFFER.some(l => pathname === l.href);
  const isContactActive = CONTACT_LINKS.some(l => pathname === l.href);

  const navLinkStyle = (href: string) => ({
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    fontSize: "0.78rem",
    color: pathname === href ? "var(--sage-dark)" : "var(--charcoal)",
    textDecoration: "none",
    padding: "0.4rem 0.65rem",
    borderRadius: "6px",
    background: pathname === href ? "#d4e4d6" : "transparent",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap" as const,
  });

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "68px", display: "flex", alignItems: "center", gap: "0.125rem" }}>

          <Link href="/" aria-label="The Inclusion Edit home" style={{ textDecoration: "none", flexShrink: 0, marginRight: "0.75rem", display: "flex", alignItems: "center", padding: "0.3rem", borderRadius: "8px", background: pathname === "/" ? "#d4e4d6" : "transparent", transition: "background 0.15s" }}
            onMouseEnter={(e) => { if (pathname !== "/") e.currentTarget.style.background = "#d4e4d6"; }}
            onMouseLeave={(e) => { if (pathname !== "/") e.currentTarget.style.background = "transparent"; }}
          >
            <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: "42px", width: "auto", display: "block" }} />
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: "0.125rem", flex: 1, alignItems: "center" }} className="site-nav-desktop">

            <Link href="/about-us" style={navLinkStyle("/about-us")}
              onMouseEnter={(e) => { if (pathname !== "/about-us") e.currentTarget.style.background = "#d4e4d6"; }}
              onMouseLeave={(e) => { if (pathname !== "/about-us") e.currentTarget.style.background = "transparent"; }}
            >About</Link>

            {/* What We Offer dropdown */}
            <div ref={offerRef} style={{ position: "relative" }}>
              <button
                onClick={() => setOfferOpen(!offerOpen)}
                aria-expanded={offerOpen}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: isOfferActive ? "var(--sage-dark)" : "var(--charcoal)", background: isOfferActive || offerOpen ? "#d4e4d6" : "transparent", border: "none", cursor: "pointer", padding: "0.4rem 0.65rem", borderRadius: "6px", letterSpacing: "0.01em", whiteSpace: "nowrap" as const, display: "flex", alignItems: "center", gap: "0.3rem" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#d4e4d6"; }}
                onMouseLeave={(e) => { if (!isOfferActive && !offerOpen) e.currentTarget.style.background = "transparent"; }}
              >
                What We Offer
                <span style={{ fontSize: "0.6rem", display: "inline-block", transform: offerOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
              </button>
              {offerOpen && (
                <div role="menu" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.13)", minWidth: "240px", overflow: "hidden", zIndex: 200 }}>
                  {WHAT_WE_OFFER.map((item, i) => (
                    <Link key={item.href} href={item.href} role="menuitem"
                      style={{ display: "block", padding: "0.75rem 1.25rem", fontFamily: "var(--font-heading)", fontWeight: pathname === item.href ? 700 : 600, fontSize: "0.82rem", color: pathname === item.href ? "var(--sage-dark)" : "var(--charcoal)", textDecoration: "none", background: pathname === item.href ? "#d4e4d6" : "transparent", borderBottom: i < WHAT_WE_OFFER.length - 1 ? "1px solid var(--gray-border)" : "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#d4e4d6"; }}
                      onMouseLeave={(e) => { if (pathname !== item.href) e.currentTarget.style.background = "transparent"; }}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Impact Platform — own tab */}
            <Link href="/about-our-impact-platform" style={navLinkStyle("/about-our-impact-platform")}
              onMouseEnter={(e) => { if (pathname !== "/about-our-impact-platform") e.currentTarget.style.background = "#d4e4d6"; }}
              onMouseLeave={(e) => { if (pathname !== "/about-our-impact-platform") e.currentTarget.style.background = "transparent"; }}
            >Impact Platform</Link>

            {/* The Inclusion Business Case — own tab */}
            <Link href="/the-inclusion-business-case" style={navLinkStyle("/the-inclusion-business-case")}
              onMouseEnter={(e) => { if (pathname !== "/the-inclusion-business-case") e.currentTarget.style.background = "#d4e4d6"; }}
              onMouseLeave={(e) => { if (pathname !== "/the-inclusion-business-case") e.currentTarget.style.background = "transparent"; }}
            >The Business Case</Link>

            <Link href="/listen-and-read" style={navLinkStyle("/listen-and-read")}
              onMouseEnter={(e) => { if (pathname !== "/listen-and-read") e.currentTarget.style.background = "#d4e4d6"; }}
              onMouseLeave={(e) => { if (pathname !== "/listen-and-read") e.currentTarget.style.background = "transparent"; }}
            >Listen &amp; Read</Link>

            {/* Contact dropdown */}
            <div ref={contactRef} style={{ position: "relative" }} className="site-nav-desktop">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
                style={{ fontFamily: "var(--font-heading)", fontWeight: isContactActive ? 700 : 600, fontSize: "0.78rem", color: isContactActive ? "var(--sage-dark)" : "var(--charcoal)", padding: "0.45rem 0.625rem", borderRadius: "8px", background: isContactActive ? "#d4e4d6" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", whiteSpace: "nowrap" as const }}
                onMouseEnter={(e) => { if (!isContactActive) (e.currentTarget as HTMLButtonElement).style.background = "#d4e4d6"; }}
                onMouseLeave={(e) => { if (!isContactActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                Contact
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {contactOpen && (
                <div role="menu" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.13)", minWidth: "200px", overflow: "hidden", zIndex: 200 }}>
                  {CONTACT_LINKS.map((item, i) => (
                    <Link key={item.href} href={item.href} role="menuitem"
                      style={{ display: "block", padding: "0.75rem 1.25rem", fontFamily: "var(--font-heading)", fontWeight: pathname === item.href ? 700 : 600, fontSize: "0.82rem", color: pathname === item.href ? "var(--sage-dark)" : "var(--charcoal)", textDecoration: "none", background: pathname === item.href ? "#d4e4d6" : "transparent", borderBottom: i < CONTACT_LINKS.length - 1 ? "1px solid var(--gray-border)" : "none" }}
                      onMouseEnter={(e) => { if (pathname !== item.href) e.currentTarget.style.background = "#d4e4d6"; }}
                      onMouseLeave={(e) => { if (pathname !== item.href) e.currentTarget.style.background = "transparent"; }}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", flexShrink: 0, marginLeft: "0.5rem" }} className="site-nav-desktop">
            <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--charcoal)", padding: "0.45rem 0.875rem", borderRadius: "8px", border: "1.5px solid var(--gray-border)", textDecoration: "none", whiteSpace: "nowrap" as const }}>Sign in</Link>
            <Link href="/dashboard" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--sage-dark)", padding: "0.45rem 0.875rem", borderRadius: "8px", border: "1.5px solid var(--sage-dark)", textDecoration: "none", whiteSpace: "nowrap" as const }}>Dashboard</Link>
            <Link href="/pricing" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.45rem 1rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" as const }}>Join now</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} className="site-nav-mobile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--charcoal)", fontSize: "1.25rem", marginLeft: "auto", display: "none" }}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "1rem 1.5rem 1.5rem", position: "sticky", top: "68px", zIndex: 99 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem", marginBottom: "1rem" }}>
            <Link href="/about-us" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.625rem 0.75rem", borderRadius: "8px", display: "block" }}>About</Link>
            <button onClick={() => setMobileOfferOpen(!mobileOfferOpen)}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", background: "none", border: "none", cursor: "pointer", padding: "0.625rem 0.75rem", borderRadius: "8px", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              What We Offer
              <span style={{ fontSize: "0.6rem", transform: mobileOfferOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▼</span>
            </button>
            {mobileOfferOpen && (
              <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                {WHAT_WE_OFFER.map((item) => (
                  <Link key={item.href} href={item.href} style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "0.85rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.5rem 0.75rem", borderRadius: "8px", display: "block" }}>{item.label}</Link>
                ))}
              </div>
            )}
            {[
              { href: "/about-our-impact-platform", label: "Impact Platform" },
              { href: "/the-inclusion-business-case", label: "The Business Case" },
              { href: "/listen-and-read", label: "Listen & Read" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.625rem 0.75rem", borderRadius: "8px", display: "block" }}>{l.label}</Link>
            ))}
            <button onClick={() => setMobileContactOpen(!mobileContactOpen)}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--charcoal)", background: "none", border: "none", cursor: "pointer", padding: "0.625rem 0.75rem", borderRadius: "8px", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              Contact
              <span style={{ fontSize: "0.6rem", transform: mobileContactOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>&#9660;</span>
            </button>
            {mobileContactOpen && (
              <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                {CONTACT_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "0.85rem", color: "var(--charcoal)", textDecoration: "none", padding: "0.5rem 0.75rem", borderRadius: "8px", display: "block" }}>{item.label}</Link>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <Link href="/dashboard" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "transparent", border: "1.5px solid var(--sage-dark)", textDecoration: "none", textAlign: "center", padding: "0.72rem", borderRadius: "8px", display: "block" }}>Dashboard</Link>
            <Link href="/pricing" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "var(--sage-dark)", textDecoration: "none", textAlign: "center", padding: "0.75rem", borderRadius: "8px", display: "block" }}>Join now</Link>
            <Link href="/sign-in" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--charcoal)", textDecoration: "none", textAlign: "center", padding: "0.5rem", display: "block" }}>Sign in</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .site-nav-desktop { display: none !important; }
          .site-nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
