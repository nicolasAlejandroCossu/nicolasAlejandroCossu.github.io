export interface ExperienceTrack {
  key: string;
  label: string; // "Professional"
  org: string; // "Luno"
  role: string;
  period: string;
  summary: string;
  bullets: string[];
}

/**
 * Two parallel tracks, CV-style. Hard proof lives here in context
 * (70k migration, 100k+ platforms) plus the ownership signals.
 */
export const experience: ExperienceTrack[] = [
  {
    key: "professional",
    label: "Professional",
    org: "Luno",
    role: "Semi-Senior Data Engineer",
    period: "April 2025 - Present",
    summary: "High volume data systems at production scale.",
    bullets: [
      "Own massive APIs and high concurrency systems on Snowflake, with production ETLs.",
      "Migrated 70,000 users from a legacy system to a modern one in production, with zero disruption.",
      "Engineered platforms built to hold 100,000+ active users.",
      "Wrote the technical proposal that won a key client, then designed its cloud infrastructure from scratch.",
    ],
  },
  {
    key: "entrepreneurship",
    label: "Entrepreneurship",
    org: "Exos",
    role: "Founder",
    period: "May 2026 - Present",
    summary: "Leading delivery for real clients, start to finish.",
    bullets: [
      "Founded Exos, a software studio, and lead delivery from first call to production.",
      "Owned CongressIA end to end: negotiation, roadmap, estimation, AI assisted UX, architecture and development.",
      "Wrote and won the proposal for CongressIA, then designed its cloud architecture from scratch.",
      "Built and launched my own ecommerce product, CapyThemAll.",
      "Build multi-tenant systems and custom platforms for Argentine SMBs.",
    ],
  },
];
