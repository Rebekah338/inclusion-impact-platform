"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Remembers the last course or lesson a member opened, for "Continue where you left off" on the dashboard.
   Saved in this browser for now; move to the member's account when accounts are connected. */
const LAST_LEARNING_KEY = "tie_last_learning";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/dashboard/learn") return;
    const t = setTimeout(() => {
      try {
        const heading = document.querySelector("main h1, h1")?.textContent?.trim();
        const fallback = pathname.split("/").pop()?.replace(/-/g, " ") || "Your course";
        const title = heading && heading.length < 120 ? heading : fallback.charAt(0).toUpperCase() + fallback.slice(1);
        localStorage.setItem(LAST_LEARNING_KEY, JSON.stringify({ href: pathname, title, date: new Date().toISOString() }));
      } catch { /* storage unavailable */ }
    }, 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
