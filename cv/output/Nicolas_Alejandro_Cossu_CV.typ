// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Nicolas Alejandro Cossu",
  title: "Nicolas Cossu - CV",
  footer: context { [#emph[Nicolas Alejandro Cossu -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in June 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.45in,
  page-bottom-margin: 0.45in,
  page-left-margin: 0.55in,
  page-right-margin: 0.55in,
  page-show-footer: false,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(20, 20, 20),
  colors-headline: rgb(60, 60, 60),
  colors-connections: rgb(60, 60, 60),
  colors-section-titles: rgb(20, 20, 20),
  colors-links: rgb(40, 40, 40),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.45em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 8.5pt,
  typography-font-size-name: 23pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.15em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.3cm,
  header-space-below-headline: 0.3cm,
  header-space-below-connections: 0.3cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.25cm,
  section-titles-space-below: 0.15cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.12em,
  sections-space-between-regular-entries: 0.45em,
  entries-date-and-location-width: 3.5cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 6,
    day: 24,
  ),
)


= Nicolas Alejandro Cossu

  #headline([Data Engineer & Forward Deployed Engineer])

#connections(
  [#connection-with-icon("location-dot")[Buenos Aires, Argentina]],
  [#link("mailto:nicolas.cossu2006@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[nicolas.cossu2006\@gmail.com]]],
  [#link("https://nicolasalejandrocossu.github.io/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[nicolasalejandrocossu.github.io]]],
  [#link("https://linkedin.com/in/nicolas-cossu", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[nicolas-cossu]]],
  [#link("https://github.com/nicolasAlejandroCossu", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[nicolasAlejandroCossu]]],
)


== Summary

Self-taught Data Engineer who builds, owns and ships production data systems end to end — from ETL pipelines and cloud architecture to the product on top. I turn ambiguous problems into systems people trust at scale, and I lead delivery from the first scoping call to production. Strong foundation in data science and analytics, with AI as a force multiplier across the stack.

== Experience

#regular-entry(
  [
    #strong[Luno], Semi-Senior Data Engineer

    - Migrated #strong[70,000+ users] from an undocumented legacy database to a modern system in production with #strong[zero disruption], via custom parsing scripts, fallbacks and automatic backups in a single 10+ hour run.

    - Engineered backend platforms architected to hold #strong[100,000+ active users], owning high-volume, high-concurrency APIs and production ETL pipelines.

    - Wrote the technical proposal that #strong[won a key client], then designed its cloud infrastructure from scratch.

    - Built and maintained REST APIs (FastAPI), relational schemas and full backends on Snowflake, Airflow and AWS, with CI\/CD, automated backups and migrations.

    - Promoted to Semi-Senior and made permanent; now guide projects and mentor teammates within a 20-person multidisciplinary team working under Scrum.

  ],
  [
    New York, US (Remote)

    Apr 2025 – present

  ],
)

#regular-entry(
  [
    #strong[Exos], Co-Founder & Engineer

    - Co-founded a software studio delivering validated multi-tenant systems and bespoke platforms for Argentine SMBs — owning the full arc from scoping to production.

    - Owned #strong[CongressIA] end to end — a national-scale platform for medical congresses (three connected systems for industries, physicians and organisers): negotiation, roadmap, estimation, architecture, backend, infrastructure and full frontend. Two people, three months.

    - Won the CongressIA proposal, then architected its cloud infrastructure from zero (Next.js, FastAPI, PostgreSQL, AWS).

    - Built and launched #strong[CapyThemAll], an ecommerce product with a companion mobile pet game, running on the studio's multi-tenant ecosystem.

  ],
  [
    Buenos Aires, Argentina

    May 2026 – present

  ],
)

== Projects

#regular-entry(
  [
    #strong[#link("https://capythemall.com")[CapyThemAll]]

    #summary[Ecommerce storefront for collectible capybaras plus a companion mobile pet game, running on a validated multi-tenant ecosystem (Next.js, React Native, FastAPI).]

  ],
  [
    Jan 2026

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/nicolasAlejandroCossu/British-Airways")[British Airways Reviews]]

    #summary[Thousands of raw airline reviews cleaned and structured into an interactive Tableau dashboard with dynamic filters (Python, Pandas, NumPy, MySQL, Tableau).]

  ],
  [
    Jan 2024

  ],
)

== Education

#education-entry(
  [
    #strong[San Vicente Technical High School], Electronics

    - #strong[Top-performing student of the entire institution] · flag-bearer · GPA 9.45\/10

    - Led the data infrastructure (MQTT, REST APIs, documented PostgreSQL schema) for the Siemens LOGO! national contest team.

  ],
  [
    Buenos Aires, AR

    Mar 2019 – Dec 2025

  ],
  degree-column: [
    #strong[Tech.]
  ],
)

== Skills

#strong[Languages:] Python, SQL, Bash

#strong[Data & Infrastructure:] Snowflake, Apache Airflow, FastAPI, PostgreSQL, Redis, ETL\/ELT, Data Warehousing, Database Design, REST APIs, CI\/CD

#strong[Cloud:] AWS, Google Cloud Platform, Microsoft Azure, Docker, Multi-tenant Architecture

#strong[Data Science & Analytics:] Pandas, NumPy, Matplotlib, Seaborn, scikit-learn, XGBoost, PySpark, dbt, Tableau, Power BI

#strong[AI & Automation:] AI Agents, AI Workflows, n8n, Make

#strong[Ways of working:] Technical Leadership, Project Management, System Architecture, Scrum, Notion, Swagger

#strong[Languages:] Spanish (native), English (fluent — EF SET C1)

== Certificates and Awards

- #strong[Harvard CS50] — Introduction to Programming with Python (2024) · Introduction to Databases with SQL (2025)

- #strong[IBM Data Science] — Introduction to Data Science, Data Science Methodology, Data Science Tools (2024)

- #strong[EF SET English Certificate] — C1 Advanced (2025)

- #strong[Siemens LOGO! National Contest] — Recognition, as Project Manager & Data Engineer (2025)

- #strong[Pedro B. Palacios National Award] — La Plata Deliberative Council (2025)
