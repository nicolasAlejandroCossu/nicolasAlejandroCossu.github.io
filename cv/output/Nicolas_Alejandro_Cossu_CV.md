# Nicolas Alejandro Cossu's CV

- Email: [nicolas.cossu2006@gmail.com](mailto:nicolas.cossu2006@gmail.com)
- Location: Buenos Aires, Argentina
- Website: [nicolasalejandrocossu.github.io](https://nicolasalejandrocossu.github.io/)
- LinkedIn: [nicolas-cossu](https://linkedin.com/in/nicolas-cossu)
- GitHub: [nicolasAlejandroCossu](https://github.com/nicolasAlejandroCossu)


# Summary
Self-taught Data & Cloud Engineer who builds, owns and ships production systems end to end, from ETL pipelines and high-availability cloud architecture on AWS and GCP to the product on top. I turn ambiguous problems into systems people trust at scale, and I lead delivery from the first scoping call to production, alone or guiding a small team. Strong foundation in data science and analytics, with AI as a force multiplier across the stack.

# Experience
## **Luno**, Semi-Senior Data Engineer

New York, US (Remote)

Apr 2025 – present

- Migrated **70,000+ users** from an undocumented legacy database to a modern system in production with **zero disruption**, via custom parsing scripts, fallbacks and automatic backups in a single 10+ hour run.

- Architected and built with Terraform the AWS infrastructure to migrate a **100,000+ user** platform under a strict SLA with **high availability**: ECS Fargate (Graviton), RDS Multi-AZ + RDS Proxy, ElastiCache, CloudFront + WAF and Cognito, sized for **live events with 10,000 concurrent users** through scheduled pre-scaling and a shared WebSocket layer.

- Hardened it with private-only networking (no public subnets, egress allow-list), GuardDuty, Security Hub, KMS, immutable backups and cross-region DR. Built the cost model with usage scenarios and savings levers of up to **~27%**, and audited the app, surfacing **21 security findings**.

- Delivered **two production platforms in parallel as the sole engineer** (~7 weeks, ~60k lines, 100+ endpoints). First, a multi-country credit-analytics platform (FastAPI, React, Snowflake) with a user-defined SQL metrics engine, per-country data isolation and RBAC, on **GCP** (Cloud Run, Cloud SQL, Secret Manager) with Terraform and keyless CI/CD.

- Second, an **RPA** operations console orchestrating a Playwright bot fleet across 5 countries over a WireGuard VPN, with a PostgreSQL job queue, encrypted credentials, an immutable audit log and live compliance dashboards.

- Built the AI layer of a serverless OCR document pipeline on AWS (S3, Lambda, Textract, SNS), with an **Amazon Bedrock** LLM fallback running in-VPC for layouts the rules can't resolve.

- Own high-volume, high-concurrency APIs (FastAPI), relational schemas and production ETL pipelines on Snowflake, Airflow and AWS, with CI/CD, automated backups and migrations.

- Wrote the winning technical proposal **for a key client**, then designed its cloud infrastructure from scratch.

- Promoted to Semi-Senior and made permanent; now guide projects and mentor a junior teammate in a multidisciplinary company of ~50 people, working under Scrum.



## **Exos**, Co-Founder & Engineer

Buenos Aires, Argentina

May 2026 – present

- Co-founded a software studio delivering validated multi-tenant systems and bespoke platforms for Argentine SMBs, owning the full arc from scoping to production, with **6+ projects** delivered and running in production.

- Owned **CongressIA** end to end, a national-scale platform for medical congresses (three connected systems for industries, physicians and organisers): negotiation, roadmap, estimation, architecture, backend, infrastructure and full frontend. Two people, three months.

- Won the CongressIA proposal, then architected its cloud infrastructure from zero (Next.js, FastAPI, PostgreSQL, AWS).

- Building **CapyThemAll**, an ecommerce product with a companion mobile pet game, running on the studio's multi-tenant ecosystem.



# Education
## **San Vicente Technical High School**, Electronics

**Technician**


Buenos Aires, Argentina


Mar 2019 – Dec 2025

- **Top-performing student of the entire institution**, flag-bearer, GPA 9.45/10

- Led the data infrastructure (MQTT, REST APIs, documented PostgreSQL schema) for the Siemens LOGO! national contest team.



# Skills
**Programming:** Python, SQL, TypeScript, Bash

**Data & Backend:** Snowflake, Apache Airflow, FastAPI, PostgreSQL, SQLAlchemy, Alembic, Redis, ETL/ELT, Data Warehousing, Database Design, REST APIs

**Cloud & DevOps:** AWS (EC2, ECS Fargate, Lambda, EventBridge, S3, RDS, ElastiCache, CloudFront, WAF, Cognito, SNS, SES, Route 53, CloudWatch, Secrets Manager, Textract, Bedrock), GCP (Cloud Run, Cloud SQL, Secret Manager, Artifact Registry), Microsoft Azure, Terraform, Docker, GitHub Actions, CI/CD

**Architecture & Security:** High Availability, Disaster Recovery, Multi-tenant Architecture, Cloud Cost Modeling, OAuth/OIDC, JWT, RBAC, Encryption (KMS, AES-256-GCM), WireGuard

**Data Science & Analytics:** Pandas, NumPy, Matplotlib, Seaborn, scikit-learn, XGBoost, PySpark, dbt, Tableau, Power BI

**AI & Automation:** AI Agents, AI Workflows, LLM integration (Amazon Bedrock, Gemini), OCR, RPA (Playwright), n8n, Make

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Recharts, React Native. Production dashboards and admin apps, shipped with AI as a force multiplier.

**Ways of working:** Technical Leadership, Project Management, System Architecture, Scrum, Notion, Swagger

**Languages:** Spanish (native), English (fluent, EF SET C1)

# Certificates and Awards
- **Harvard CS50:** Introduction to Programming with Python (2024); Introduction to Databases with SQL (2025)

- **IBM Data Science:** Introduction to Data Science, Data Science Methodology, Data Science Tools (2024)

- **EF SET English Certificate:** C1 Advanced (2025)

- **Siemens LOGO! National Contest:** Recognition, as Project Manager & Data Engineer (2025)

- **Pedro B. Palacios National Award:** La Plata Deliberative Council (2025)
