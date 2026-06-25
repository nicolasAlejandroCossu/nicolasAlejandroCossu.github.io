import type { Project } from "./types";

/**
 * Selected work. To add a project: copy the template at the bottom, fill it in,
 * drop a 4:3 image in /public/work, and it appears automatically.
 *
 * Note: Luno work is covered as experience only (no client projects shown).
 */
export const projects: Project[] = [
  {
    slug: "congressia",
    title: "CongressIA",
    category: "Platform",
    year: "2026",
    role: "Project lead — strategy, architecture & delivery",
    status: "On Hold",
    summary:
      "A national-scale platform that pulls an entire medical-congress ecosystem — three very different audiences — into a single system.",
    description: [
      "Three roles, one platform: industries that sponsor physicians' training, physicians who get unified agendas plus AI tools that deepen what they learn at each event, and organisers who publish and run their congresses without clashing dates. Underneath it all — certifications, attendance control, live and on-demand streaming, payments and subscriptions.",
      "Exos's first build, before we had even formalised the agency. I owned it almost end to end: leadership, budgets and timelines, the client relationship, backend and infrastructure architecture, and every technical decision in between. Development was completed; the project is currently paused on the client's side.",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
    highlights: [
      "Owned delivery end to end",
      "Architecture & infrastructure from zero",
      "Built for national scale",
    ],
    image: "/work/congressia.webp",
    imageTone: "dark",
    accent: "cherry",
    featured: true,
  },
  {
    slug: "exos",
    title: "Exos",
    category: "Software Agency",
    year: "2026",
    role: "Co-founder & engineer",
    status: "Live",
    summary:
      "The software agency I co-founded — validated multi-tenant systems for Argentine SMBs, and bespoke platforms built to order.",
    description: [
      "We bring Argentine SMBs the kind of software usually reserved for far bigger players: validated, production-ready multi-tenant systems — and fully bespoke platforms when the problem calls for it. From the first scoping call through architecture, delivery and the infrastructure it runs on, we own the whole arc.",
      "Just the two of us, which means we wear every hat and answer for every decision. The pitch is simple: a genuinely high engineering bar, without the agency overhead.",
    ],
    stack: ["Multi-tenant", "AWS", "PostgreSQL", "Redis", "FastAPI", "Next.js"],
    url: "https://exos-landing.vercel.app",
    image: "/work/exos.webp",
    imageTone: "dark",
    accent: "noir",
    featured: true,
  },
  {
    slug: "capythemall",
    title: "CapyThemAll",
    category: "Venture",
    year: "2026",
    role: "Founder & Engineer",
    status: "In construction",
    summary:
      "Collectible capybaras you can actually raise — an ecommerce store, a mobile pet game and a landing, wired into one system.",
    description: [
      "A personal venture that became Exos's pilot project: a storefront for collectible capybaras, a landing to draw people in, and a mobile app where every capy becomes a virtual pet you feed and grow — all running on the same validated multi-tenant ecosystem that powers our client work.",
      "It doubles as our proving ground: where we take an idea all the way from product thinking down to infrastructure before shipping the same patterns to clients.",
    ],
    stack: ["Multi-tenant", "Next.js", "React Native", "FastAPI"],
    url: "https://capythemall.com",
    image: "/work/capythemall.webp",
    imageTone: "light",
    accent: "maroon",
    featured: true,
  },
  {
    slug: "ba-reviews",
    title: "British Airways Reviews",
    category: "Data Science",
    year: "2024",
    role: "Cleaning, exploratory analysis & visualisation",
    status: "Case study",
    summary:
      "Thousands of raw British Airways reviews, turned into a clean dataset and an interactive Tableau dashboard.",
    description: [
      "One of my earliest data projects: I cleaned and structured the raw review data, designed the schema, ran the exploratory analysis and built a Tableau dashboard with dynamic filters to make the patterns explorable. Today I'd approach plenty of it differently — but it's where the fundamentals clicked.",
      "An honest, foundational step from self-taught theory into hands-on practice.",
    ],
    stack: ["MySQL", "Python", "Pandas", "NumPy", "Tableau"],
    url: "https://github.com/nicolasAlejandroCossu/British-Airways",
    image: "/work/ba-reviews.webp",
    imageTone: "dark",
    accent: "cherry",
    featured: false,
  },

  // TEMPLATE: copy, uncomment and fill in to add a project.
  // {
  //   slug: "my-project",
  //   title: "My Project",
  //   category: "Platform",
  //   year: "2026",
  //   role: "Your role",
  //   status: "Live",
  //   summary: "One punchy line.",
  //   description: ["Paragraph one.", "Paragraph two."],
  //   stack: ["Tech", "Tech"],
  //   highlights: ["Outcome", "Outcome"],
  //   url: "https://...",
  //   image: "/work/my-project.png",
  //   accent: "cherry",
  //   featured: true,
  // },
];
