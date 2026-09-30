import type { CapabilityGroup } from "./types";

/**
 * Capability index. Concrete, recruiter-readable technologies first.
 * Add freely: each `items` array renders as tags automatically.
 */
export const capabilities: CapabilityGroup[] = [
  {
    index: "01",
    title: "Data & Backend",
    blurb: "Where I'm deepest. The core of the role.",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "Snowflake",
      "Airflow",
      "ETL & Pipelines",
      "PostgreSQL",
      "SQLAlchemy",
      "Database Design",
      "Backend Development",
      "REST APIs",
    ],
  },
  {
    index: "02",
    title: "Cloud & Infrastructure",
    blurb: "Architecture built for scale, uptime and security, with the cost model to match.",
    items: [
      "AWS",
      "GCP",
      "Azure",
      "Terraform",
      "Docker",
      "CI/CD",
      "High Availability",
      "Disaster Recovery",
      "Cloud Security",
      "Cost Modeling",
      "Linux & Networking",
    ],
  },
  {
    index: "03",
    title: "Engineering Range",
    blurb: "Adjacent strengths I deploy when the problem needs them.",
    items: [
      "Data Science",
      "Data Analytics",
      "Pandas & NumPy",
      "AI Workflows",
      "AI Agents",
      "LLM Integration",
      "OCR Pipelines",
      "RPA & Automation",
      "IoT",
    ],
  },
  {
    index: "04",
    title: "AI-augmented Craft",
    blurb:
      "With AI as a force multiplier, I ship production frontends and dashboards at a standard most engineers don't.",
    items: [
      "UX/UI Design",
      "Frontend Engineering",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Dashboards & Data Viz",
    ],
  },
];
