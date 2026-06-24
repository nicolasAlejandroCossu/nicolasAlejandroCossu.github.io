import type { CapabilityGroup } from "./types";

/**
 * Capability index. Concrete, recruiter-readable technologies first.
 * Add freely: each `items` array renders as tags automatically.
 */
export const capabilities: CapabilityGroup[] = [
  {
    index: "01",
    title: "Data & Infrastructure",
    blurb: "Where I'm deepest. The core of the role.",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "Snowflake",
      "Airflow",
      "ETL & Pipelines",
      "AWS",
      "GCP",
      "Azure",
      "Database Design",
      "Backend Development",
      "CI/CD",
      "REST APIs",
    ],
  },
  {
    index: "02",
    title: "Engineering Range",
    blurb: "Adjacent strengths I deploy when the problem needs them.",
    items: [
      "Data Science",
      "Data Analytics",
      "Pandas & NumPy",
      "AI Workflows",
      "AI Agents",
      "IoT",
    ],
  },
  {
    index: "03",
    title: "AI-augmented Craft",
    blurb:
      "Not my core, but with AI as a force multiplier I ship UX and frontends at a standard most engineers don't.",
    items: ["UX/UI Design", "Frontend Engineering"],
  },
];
