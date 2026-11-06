/* Brand line icons (Lucide style, 1.75px stroke) replace emoji, as set out in the Visual Brand Guide */
const ICON_PATHS: Record<string, string[]> = {
  people: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  systems: ["M12 2 2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  leadership: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
  book: ["M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z", "M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  award: ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89 7 23l5-3 5 3-1.21-9.12"],
  layers: ["M4 4h16v16H4z", "M4 9h16", "M9 9v11"],
  check: ["M20 6 9 17l-5-5"],
  chevron: ["M9 18l6-6-6-6"],
  back: ["M19 12H5", "M12 19l-7-7 7-7"],
  play: ["M8 5.5v13l11-6.5-11-6.5z"],
  video: ["M15 10l5-3v10l-5-3", "M3 6h12v12H3z"],
  graduation: ["M22 10 12 5 2 10l10 5 10-5z", "M6 12v5c3 2 9 2 12 0v-5"],
  zap: ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],
  scale: ["M12 3v18", "M7 21h10", "M5 7h14", "M5 7l-3 7a3 3 0 0 0 6 0z", "M19 7l-3 7a3 3 0 0 0 6 0z"],
  microscope: ["M6 18h8", "M3 22h18", "M14 22a7 7 0 1 0 0-14h-1", "M9 14h2", "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z", "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"],
  chart: ["M3 3v18h18", "M8 17v-5", "M13 17V8", "M18 17v-8"],
  map: ["M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z", "M9 4v14", "M15 6v14"],
  briefcase: ["M3 7h18v13H3z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", "M3 13h18"],
  target: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  clipboard: ["M9 2h6v4H9z", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", "M9 12h6", "M9 16h6"],
  pulse: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  sparkle: ["M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z", "M19 17v4", "M17 19h4"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
};

export default function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      {(ICON_PATHS[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
