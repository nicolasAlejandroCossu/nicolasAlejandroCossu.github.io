/**
 * SEO + GEO (Generative Engine Optimization) source of truth.
 *
 * Everything here is INVISIBLE to visitors but read by search engines and AI
 * answer engines (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini).
 *
 * Two jobs:
 *   1. Classic SEO — titles, descriptions, keywords, canonical, sitemap.
 *   2. GEO — rich JSON-LD so LLMs can state, with confidence, *who Nicolas is*
 *      and *what he does*, and cite this site as the source.
 *
 * Ranking priority for roles (highest first), per Nicolas:
 *   Data Engineer > Forward Deployed Engineer > Team Leader >
 *   Project Manager > Data Scientist > Data Analyst
 */
import { site } from "./site";

export const SITE_URL = "https://nicolasalejandrocossu.github.io";

/** Target roles, in ranking priority order. Drives keywords + knowsAbout. */
export const targetRoles = [
  "Data Engineer",
  "Forward Deployed Engineer",
  "Team Leader",
  "Project Manager",
  "Data Scientist",
  "Data Analyst",
] as const;

/** Core technical competencies surfaced to crawlers and LLMs. */
export const knowsAbout = [
  // Roles first — strongest topical signal for the niches he targets.
  ...targetRoles,
  // Data & infrastructure (his core).
  "Data Engineering",
  "ETL Pipelines",
  "Data Pipelines",
  "Cloud Architecture",
  "Snowflake",
  "Apache Airflow",
  "AWS",
  "Google Cloud Platform",
  "Microsoft Azure",
  "Python",
  "SQL",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Database Design",
  "Backend Development",
  "REST APIs",
  "CI/CD",
  "Multi-tenant Architecture",
  "Data Warehousing",
  // Adjacent strengths.
  "Data Science",
  "Data Analytics",
  "Pandas",
  "NumPy",
  "Tableau",
  "AI Agents",
  "AI Workflows",
  "IoT",
  // Leadership / delivery.
  "Technical Leadership",
  "Project Management",
  "Software Delivery",
  "System Architecture",
] as const;

/**
 * Keyword set for the <meta name="keywords"> tag and OG, in priority order.
 * Names included for personal-brand ("Nicolas Cossu") search dominance.
 */
export const keywords = [
  ...targetRoles,
  "Nicolas Cossu",
  "Nicolas Alejandro Cossu",
  "Nicolas Cossu Data Engineer",
  "Nicolas Cossu Forward Deployed Engineer",
  "Cossu portfolio",
  "Data Engineer Argentina",
  "Data Engineer Buenos Aires",
  "Snowflake Data Engineer",
  "Python Data Engineer",
  "Cloud Architecture",
  "ETL Pipelines",
  "FastAPI",
  "AWS",
] as const;

/** Default page title + description used across the site and OG/Twitter. */
export const defaultTitle =
  "Nicolas Cossu — Data Engineer & Forward Deployed Engineer";

export const defaultDescription =
  "Nicolas Cossu is a Data Engineer and Forward Deployed Engineer based in Buenos Aires, Argentina. He builds and owns production data systems on Snowflake, AWS, Python and FastAPI — migrating 70,000+ users with zero downtime and architecting platforms for 100,000+ users — while leading delivery as a team leader and project manager, with a foundation in data science and analytics.";

/**
 * Organizations referenced by the Person graph. Kept inline (not separate
 * @id nodes) for a compact, self-contained JSON-LD payload.
 */
const luno = {
  "@type": "Organization",
  name: "Luno",
};

const exos = {
  "@type": "Organization",
  name: "Exos",
  url: site.agency.url,
  description:
    "Software studio building validated multi-tenant systems and bespoke platforms for Argentine SMBs.",
};

/**
 * The central Person node. This is what AI engines read to answer
 * "who is Nicolas Cossu?" and "is Nicolas Cossu a data engineer?".
 */
export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#nicolas-cossu`,
  name: "Nicolas Cossu",
  alternateName: ["Nicolas Alejandro Cossu", "Nico Cossu"],
  jobTitle: targetRoles,
  description:
    "Data Engineer at Luno and Forward Deployed Engineer who builds, owns and ships production data systems end to end — from ETL pipelines and cloud architecture to the product on top — and leads delivery as a team leader and project manager.",
  url: SITE_URL,
  image: `${SITE_URL}${site.photo}`,
  email: `mailto:${site.email}`,
  homeLocation: {
    "@type": "Place",
    name: "Buenos Aires, Argentina",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  nationality: {
    "@type": "Country",
    name: "Argentina",
  },
  knowsLanguage: [
    { "@type": "Language", name: "Spanish" },
    { "@type": "Language", name: "English" },
  ],
  worksFor: [luno, exos],
  affiliation: [luno, exos],
  knowsAbout: [...knowsAbout],
  hasOccupation: targetRoles.map((role) => ({
    "@type": "Occupation",
    name: role,
  })),
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Harvard University (CS50)",
    },
    {
      "@type": "EducationalOrganization",
      name: "IBM (Data Science Professional track)",
    },
    {
      "@type": "EducationalOrganization",
      name: "San Vicente Technical School",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "CS50's Introduction to Programming with Python",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: "Harvard University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "CS50's Introduction to Databases with SQL",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: "Harvard University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "IBM Data Science (Introduction, Methodology, Tools)",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: "IBM" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Electronics Technician Degree",
      credentialCategory: "degree",
      recognizedBy: {
        "@type": "Organization",
        name: "San Vicente Technical School",
      },
    },
  ],
  sameAs: [site.links.linkedin, site.links.github, site.agency.url],
} as const;

/** WebSite node — enables sitelinks and ties pages to the Person. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nicolas Cossu",
  description: defaultDescription,
  inLanguage: "en",
  author: { "@id": `${SITE_URL}/#nicolas-cossu` },
  publisher: { "@id": `${SITE_URL}/#nicolas-cossu` },
} as const;

/**
 * Builds the home ProfilePage graph: ProfilePage → Person → WebSite, plus an
 * ItemList of selected work so projects are individually discoverable.
 */
export function buildHomeGraph(projects: { title: string; summary: string; url?: string; slug: string }[]) {
  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: defaultTitle,
    description: defaultDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#nicolas-cossu` },
    mainEntity: { "@id": `${SITE_URL}/#nicolas-cossu` },
  };

  const workList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#selected-work`,
    name: "Selected work by Nicolas Cossu",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        ...(p.url ? { url: p.url } : {}),
        creator: { "@id": `${SITE_URL}/#nicolas-cossu` },
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, personSchema, profilePage, workList],
  };
}

/** Builds the /story page graph: a ProfilePage about the same Person. */
export function buildStoryGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema,
      personSchema,
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/story/#profilepage`,
        url: `${SITE_URL}/story/`,
        name: "Nicolas Cossu — Full History",
        description:
          "The long version of Nicolas Cossu's path: from modding Minecraft at eight to owning data systems at production scale as a Data Engineer.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#nicolas-cossu` },
        mainEntity: { "@id": `${SITE_URL}/#nicolas-cossu` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Full History", item: `${SITE_URL}/story/` },
          ],
        },
      },
    ],
  };
}
