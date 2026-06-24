import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seo";

/**
 * Emitted as /robots.txt during `next build` (output: export).
 *
 * Explicitly welcomes the major AI answer-engine crawlers (GEO) in addition to
 * classic search bots — so ChatGPT, Claude, Perplexity, Gemini and Google AI
 * can index and cite this site. Nothing here is private; allow everything.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const aiAndSearchBots = [
    "*",
    // AI answer engines / training + retrieval crawlers.
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Googlebot",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "Amazonbot",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "DuckAssistBot",
    "meta-externalagent",
    "YouBot",
  ];

  return {
    rules: [{ userAgent: aiAndSearchBots, allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
