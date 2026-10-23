"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard/learn", label: "Learn" },
  { href: "/dashboard/watch", label: "Watch" },
  { href: "/dashboard/apply", label: "Apply" },
  { href: "/dashboard/evidence", label: "Make the Case" },
  { href: "/dashboard/community", label: "Inclusion Editors" },
  { href: "/dashboard/support", label: "Get Support" },
];

export default function PlatformNav() {
  const pathname = usePathname();

  return (
    <nav role="navigation" aria-label="Platform navigation" style={{
      background: "var(--white)",
      borderBottom: "1px solid var(--gray-border)",
      padding: "0 1.5rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
      gap: "1rem",
    }}>
      <Link href="/" aria-label="Home" style={{
        fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem",
        letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)",
        textDecoration: "none", flexShrink: 0,
      }}>
        THE INCLUSION EDIT
        <span style={{ color: "var(--sage)", marginLeft: "0.5rem", fontWeight: 400 }}>· Impact Platform</span>
      </Link>

      <div style={{ display: "flex", gap: "0.1rem", flex: 1, overflowX: "auto" }}>
        {NAV_LINKS.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--font-heading)", fontWeight: active ? 700 : 600,
              fontSize: "0.78rem", color: active ? "var(--sage-dark)" : "var(--charcoal)",
              textDecoration: "none", padding: "0.4rem 0.65rem", borderRadius: "6px",
              whiteSpace: "nowrap",
              background: active ? "var(--sage-xlight)" : "transparent",
              borderBottom: active ? "2px solid var(--sage)" : "2px solid transparent",
              transition: "background 0.15s",
            }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--sage-xlight)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <Link href="/dashboard" style={{
          fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem",
          color: "var(--sage-dark)", textDecoration: "none", whiteSpace: "nowrap",
        }}>
          Dashboard
        </Link>
        <Link href="/sign-in" style={{
          fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem",
          color: "var(--charcoal)", padding: "0.4rem 0.875rem", borderRadius: "8px",
          border: "1.5px solid var(--gray-border)", textDecoration: "none", whiteSpace: "nowrap",
        }}>
          Sign in
        </Link>
        <Link href="/sign-up" style={{
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem",
          color: "var(--white)", padding: "0.4rem 1rem", borderRadius: "8px",
          background: "var(--sage-dark)", textDecoration: "none", whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(42,74,48,0.25)",
        }}>
          Join now
        </Link>
      </div>
    </nav>
  );
}
