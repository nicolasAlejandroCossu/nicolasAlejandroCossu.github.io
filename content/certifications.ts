import type { CSSProperties } from "react";

export interface Certification {
  title: string;
  issuer: string;
  /** Image in /public/credentials. */
  image?: string;
  /** Link to the credential / issuer page. Leave "" to hide the link. */
  url?: string;
  /**
   * Acquisition date as "YYYY-MM" (e.g. "2023-03") — drives the carousel order
   * (newest first) and is shown as "Mar 2023". "YYYY" alone also works.
   */
  date: string;
}

/**
 * Certificates carousel. Cards are auto-sorted by `date` (newest first), so the
 * order in this array doesn't matter.
 *
 * TODO(Nico): confirm the guessed titles/issuers, set real "YYYY-MM" dates and
 * add credential URLs where you have them.
 */
export const certifications: Certification[] = [
  {
    title: "CS50's Introduction to Programming with Python",
    issuer: "Harvard University",
    image: "/credentials/harvardcs50p.webp",
    url: "https://cs50.harvard.edu/certificates/089c03ca-3b0c-4947-bcf8-980c292da97b",
    date: "2024-07",
  },
  {
    title: "CS50's Introduction to Databases with SQL",
    issuer: "Harvard University",
    image: "/credentials/harvard-cs50sql.webp",
    url: "https://certificates.cs50.io/aeb5e609-645b-4786-b955-71dcc666c586.pdf?size=letter",
    date: "2025-01",
  },
  {
    title: "Introduction to Data Science",
    issuer: "IBM",
    image: "/credentials/ibm-ds0101.webp",
    url: "https://courses.cognitiveclass.ai/certificates/70ecca66b0fa40b0b3e4c4254fba73f1",
    date: "2024-06",
  },
  {
    title: "Data Science Methodology",
    issuer: "IBM",
    image: "/credentials/ibm-ds0103.webp",
    url: "https://courses.cognitiveclass.ai/certificates/4fce395867324203b06c13cd22c3155a",
    date: "2024-09",
  },
  {
    title: "Data Science Tools",
    issuer: "IBM",
    image: "/credentials/ibm-ds0105.webp",
    url: "https://courses.cognitiveclass.ai/certificates/08bc3ab4364a42e7bef9544dce7546ac",
    date: "2024-09",
  },
  {
    title: "EF SET English Certificate",
    issuer: "EF SET",
    image: "/credentials/efset-english.webp",
    url: "https://cert.efset.org/en/QjkEuS",
    date: "2025-02",
  },
  {
    title: "Electronics Technician Degree",
    issuer: "San Vicente Technical School",
    image: "/credentials/san-vicente-electronics-degree.webp",
    url: "",
    date: "2025-12",
  },
  {
    title: "Pedro B. Palacios National Award",
    issuer: "La Plata Deliberative Council",
    image: "/credentials/national-pedro-b-palacios-award.webp",
    url: "",
    date: "2025-12",
  },
  {
    title: "Siemens LOGO! Contest",
    issuer: "Siemens", 
    image: "/credentials/siemens-logo-recognition.webp",
    url: "",
    date: "2025-11",
  },
];

export interface IssuerLogo {
  /** Image in /public/logos (transparent SVG preferred, else PNG). */
  src: string;
  /**
   * Per-logo CSS for DESKTOP (≥1024px), merged over the global LOGO.desktop
   * defaults. Tune `width` plus any of top/right/bottom/left to place each logo
   * — handy because some are wide, others square. e.g. { width: "440px", top: "12%", right: "8%" }
   */
  desktop?: CSSProperties;
  /**
   * Per-logo CSS for MOBILE/TABLET (<1024px). Stays centered up top, so usually
   * you only override `width` (and maybe `top`).
   */
  compact?: CSSProperties;
}

/**
 * Big background watermark logo per institution, shown behind the carousel and
 * cross-faded as each issuer comes to the front.
 *
 * Drop transparent SVG (preferred) or PNG files in /public/logos with these
 * `src` paths (change the extension if you use .png). Keys MUST match the
 * `issuer` strings above. A missing file simply shows nothing — nothing breaks.
 *
 * Sizes/positions below are starting points — adjust per logo to taste.
 */
export const issuerLogos: Record<string, IssuerLogo> = {
  "Harvard University": {
    src: "/logos/harvard.svg",
    desktop: { width: "min(42vw, 440px)", top: "6%", right: "8%" },
    compact: { width: "min(70vw, 340px)" },
  },
  IBM: {
    src: "/logos/ibm.svg",
    desktop: { width: "min(40vw, 750px)", top: "16%", right: "6%" },
    compact: { width: "min(60vw, 300px)" },
  },
  "EF SET": {
    src: "/logos/ef-set.svg",
    desktop: { width: "min(40vw, 750px)", top: "16%", right: "6%" },
    compact: { width: "min(66vw, 320px)" },
  },
  "San Vicente Technical School": {
    src: "/logos/san-vicente.svg",
    desktop: { width: "min(32vw, 340px)", top: "8%", right: "10%" },
    compact: { width: "min(56vw, 280px)" },
  },
  "National Recognition": {
    src: "/logos/pedro-palacios.svg",
    desktop: { width: "min(32vw, 500px)", top: "10%", right: "19%" },
    compact: { width: "min(56vw, 280px)" },
  },
  "Siemens": {
    src: "/logos/siemens.svg",
    desktop: { width: "min(46vw, 800px)", top: "20%", right: "6%" },
    compact: { width: "min(72vw, 360px)" },
  },
};
