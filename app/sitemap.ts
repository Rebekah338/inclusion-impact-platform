import type { MetadataRoute } from "next";

const SITE = "https://theinclusionedit.com";

const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about-our-impact-platform", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/early-access", priority: 0.9 },
  { path: "/edi-consultancy-programmes", priority: 0.8 },
  { path: "/edi-training", priority: 0.8 },
  { path: "/bespoke-inclusion-resources", priority: 0.7 },
  { path: "/the-inclusion-business-case", priority: 0.7 },
  { path: "/about-us", priority: 0.6 },
  { path: "/listen-and-read", priority: 0.6 },
  { path: "/faqs", priority: 0.6 },
  { path: "/contact-us", priority: 0.6 },
  { path: "/subscribe", priority: 0.5 },
  { path: "/legal", priority: 0.3 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/cookies", priority: 0.2 },
  { path: "/legal/terms", priority: 0.2 },
  { path: "/legal/membership-terms", priority: 0.2 },
  { path: "/legal/community-guidelines", priority: 0.2 },
  { path: "/legal/inclusion-ai", priority: 0.2 },
  { path: "/legal/accessibility", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({ url: `${SITE}${p.path}`, lastModified: now, priority: p.priority }));
}
