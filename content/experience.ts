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
 * (100k+ AWS architecture, solo platforms, 70k migration) plus the ownership
 * signals. Client work stays anonymous: milestones and tech, never names.
 */
export const experience: ExperienceTrack[] = [
  {
    key: "professional",
    label: "Professional",
    org: "Luno",
    role: "Semi-Senior Data Engineer",
    period: "April 2025 - Present",
    summary: "Data systems, cloud architecture and full platforms, owned end to end.",
    bullets: [
      "Architected and built the AWS infrastructure to migrate a 100,000+ user platform: strict SLA, high availability, live events at 10,000 concurrent users, hardened security and a full cost model.",
      "Shipped two production platforms in parallel as the sole engineer: a multi-country analytics platform on GCP with dynamic metrics, and an RPA operations console.",
      "Migrated 70,000 users from a legacy system to a modern one in production, with zero disruption.",
      "Built the AI layer of an OCR document pipeline on AWS, with an LLM fallback on Amazon Bedrock.",
      "Own massive APIs and high concurrency systems on Snowflake, with production ETLs.",
      "Wrote the technical proposal that won a key client, then designed its cloud infrastructure from scratch.",
    ],
  },
  {
    key: "entrepreneurship",
    label: "Entrepreneurship",
    org: "Exos",
    role: "Co-Founder",
    period: "May 2026 - Present",
    summary: "Leading delivery for real clients, start to finish.",
    bullets: [
      "Co-founded Exos, a software studio, and lead delivery from first call to production.",
      "Owned CongressIA end to end: negotiation, roadmap, estimation, AI assisted UX, architecture and development.",
      "Wrote and won the proposal for CongressIA, then designed its cloud architecture from scratch.",
      "Built and launched my own ecommerce product, CapyThemAll.",
      "Delivered 6+ projects for Argentine SMBs, from multi-tenant systems to custom platforms, all running in production.",
    ],
  },
];
