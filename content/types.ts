/**
 * Shared content types. Editing the data files under /content reshapes the
 * whole site — no component changes needed.
 */

export type Accent = "cherry" | "maroon" | "noir";

export interface Metric {
  /** Numeric target for the count-up animation. Omit for text-only metrics. */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  /** Fallback display for non-numeric metrics (e.g. "Harvard · IBM"). */
  display?: string;
  label: string;
}

export interface StoryChapter {
  index: string; // "01"
  year: string;
  kicker: string; // "The Origin"
  headline: string;
  /** Long-read body, one entry per paragraph. */
  paragraphs: string[];
  /** Optional big pull-quote for the chapter. */
  quote?: string;
  /** Optional aside: a learning, a failure, a number. */
  aside?: { label: string; text: string };
  /** Optional prominent highlights row (e.g. honors, stats). */
  highlights?: string[];
  /** Optional image under /public/story. */
  image?: string;
  imageAlt?: string;
  /** Optional era motif. "grass" renders the 3D Minecraft block. */
  motif?: "grass" | "terminal" | "data" | "blueprint";
  /** 0 = lightest (Cotton), 1 = darkest (Noir). Drives the palette shift. */
  depth: number;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  status: "Live" | "In construction" | "On Hold" | "Shipped" | "Case study";
  summary: string;
  description: string[];
  stack: string[];
  highlights?: string[];
  url?: string;
  image?: string;
  accent: Accent;
  featured: boolean;
}

export interface CapabilityGroup {
  index: string;
  title: string;
  blurb: string;
  items: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  image?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string; // "Senior Data Engineer @ Luno"
  avatar?: string;
}
