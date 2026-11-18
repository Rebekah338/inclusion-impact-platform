// Matching for the See What's Inside for You tool (About the Platform page).
// Runs on the server so the full content index never goes to the browser.
// Returns four cards: one research report or case study and one free resource
// (both can be sent by email), plus one lesson and one video or Inclusion AI tool
// (members only).

import { CONTENT } from "@/lib/content";
import { FINDER_EMAILS } from "@/lib/finder-content";
import { INSIDE_ITEMS, type InsideItem } from "@/lib/inside-index";

const LESSONS: InsideItem[] = CONTENT.filter((c) => c.type === "module").map((c) => ({
  kind: "lesson",
  id: c.id,
  title: c.title,
  desc: c.desc,
  meta: c.duration ? `${c.duration} lesson` : "Lesson",
  takeaway: c.desc,
  keywords: [c.title, c.subtitle, c.desc, c.pathway, ...c.tags].filter(Boolean).join(" ").toLowerCase(),
}));

const RESOURCE_WORDS: Record<string, string> = {
  policy: "policy policies audit handbook procedure",
  training: "training managers manager leadership leaders self assessment development skills bias psychological safety belonging team",
  "business-case": "business case buy-in buyin board sceptical sceptic stakeholders leaders roi persuade convince investment",
  strategy: "strategy plan planning action start starting roadmap priorities goals",
  data: "data survey monitoring measure measuring pay gap reporting metrics",
  general: "maturity framework where start organisation overall progress",
};

// The blurbs were written for the homepage finder's five steps; drop those references here
const clean = (b: string) =>
  b.replace(/ is built for step \d+\. It covers/, " covers")
    .replace(/ helps with step \d+\./, " helps you see where you are.")
    .replace(/: it turns step \d+ into a conversation rather than a lecture\./, ", turning it into a conversation rather than a lecture.");

const RESOURCES: InsideItem[] = Object.entries(FINDER_EMAILS).map(([key, r]) => {
  const title = r.resource.replace(/^the /, "");
  return {
    kind: "resource",
    id: key,
    title: (title.charAt(0).toUpperCase() + title.slice(1)).replace(/ guide$/, " Guide"),
    desc: clean(r.blurb),
    meta: `Free ${r.kind}`,
    takeaway: clean(r.blurb),
    keywords: `${title} ${r.kind} ${RESOURCE_WORDS[key] || ""}`.toLowerCase(),
    file: r.file,
  };
});

export const ALL_INSIDE: InsideItem[] = [...INSIDE_ITEMS, ...LESSONS, ...RESOURCES];

const STOP = new Set("a an and are as at be by do for from get have help how i in is it me my need of on or our so that the this to us we what with you your".split(" "));

const SYNONYMS: Record<string, string> = {
  hiring: "recruitment recruiting hiring interview job",
  recruit: "recruitment recruiting hiring interview job",
  pay: "pay gap gender reporting",
  gap: "pay gap",
  buyin: "leadership buy-in board business case sceptical stakeholders",
  leadership: "leadership leaders leader senior board",
  safety: "psychological safety speaking up trust belonging",
  neurodiversity: "neurodiversity neurodivergent autism adjustments",
  disability: "disability accessibility adjustments",
  race: "race racism ethnicity anti-racism ethnic",
  roi: "roi business case profitability performance evidence",
};

function tokens(q: string): string[] {
  const words = q.toLowerCase().replace(/buy-in/g, "buyin").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
  const out = new Set<string>();
  for (const w of words) {
    out.add(w);
    if (w.endsWith("s") && w.length > 3) out.add(w.slice(0, -1));
    for (const s of (SYNONYMS[w] || SYNONYMS[w.replace(/s$/, "")] || "").split(" ")) if (s) out.add(s);
  }
  return [...out];
}

function score(item: InsideItem, toks: string[]): number {
  const title = item.title.toLowerCase();
  let n = 0;
  for (const t of toks) {
    if (title.includes(t)) n += 3;
    if (item.keywords.includes(t)) n += 1;
  }
  return n;
}

function best(pool: InsideItem[], toks: string[], fallbackId: string): InsideItem {
  let top = pool.find((i) => i.id === fallbackId) || pool[0];
  let topScore = 0;
  for (const i of pool) {
    const s = score(i, toks);
    if (s > topScore) { top = i; topScore = s; }
  }
  return top;
}

export type InsideCard = {
  kind: InsideItem["kind"];
  id: string;
  title: string;
  desc: string;
  meta: string;
  takeaway: string;
  sendable: boolean;
};

// Some hub copy still has spaced dashes; show them as commas (number ranges are left alone)
const undash = (t: string) => t.replace(/\s[\u2013\u2014]\s/g, ", ");

const toCard = (i: InsideItem): InsideCard => ({
  kind: i.kind,
  id: i.id,
  title: undash(i.title),
  desc: undash(i.desc),
  meta: i.meta,
  takeaway: undash(i.takeaway),
  sendable: i.kind === "research" || i.kind === "case" || i.kind === "resource",
});

export function matchInside(query: string): InsideCard[] {
  const toks = tokens(query);
  const evidence = best(ALL_INSIDE.filter((i) => i.kind === "research" || i.kind === "case"), toks, "deloitte-millennial-survey");
  const resource = best(RESOURCES, toks, "general");
  const lesson = best(LESSONS, toks, LESSONS[0]?.id || "");
  const video = best(ALL_INSIDE.filter((i) => i.kind === "video"), toks, "");
  const ai = best(ALL_INSIDE.filter((i) => i.kind === "ai"), toks, "inclusion-health-check");
  const fourth = score(video, toks) > score(ai, toks) ? video : ai;
  return [evidence, resource, lesson, fourth].map(toCard);
}

export function findInside(kind: string, id: string): InsideItem | undefined {
  return ALL_INSIDE.find((i) => i.kind === kind && i.id === id);
}
