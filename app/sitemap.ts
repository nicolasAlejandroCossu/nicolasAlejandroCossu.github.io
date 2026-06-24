import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seo";

/**
 * Emitted as /sitemap.xml during `next build` (output: export).
 * Lists every indexable route so crawlers discover them fast.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/story/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
