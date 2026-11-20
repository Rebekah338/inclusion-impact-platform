import type { MetadataRoute } from "next";

// Public pages are open to search engines and AI assistants; member and system areas are not
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/api/", "/sign-in", "/sign-up", "/onboarding"] }],
    sitemap: "https://theinclusionedit.com/sitemap.xml",
    host: "https://theinclusionedit.com",
  };
}
