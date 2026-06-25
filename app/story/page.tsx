import type { Metadata } from "next";
import Link from "next/link";
import StoryDeck from "@/components/sections/StoryDeck";
import JsonLd from "@/components/JsonLd";
import { buildStoryGraph } from "@/content/seo";

export const metadata: Metadata = {
  title: "Full History: From Game Modder to Data Engineer",
  description:
    "The long version of Nicolas Cossu's path: from modding Minecraft at eight, through data science and an electronics degree, to owning data systems at production scale as a Data Engineer at Luno and co-founding the software studio Exos.",
  alternates: { canonical: "/story/" },
  openGraph: {
    title: "Nicolas Cossu — Full History",
    description:
      "From modding Minecraft at eight to owning data systems at production scale as a Data Engineer.",
    url: "/story/",
    type: "profile",
  },
};

export default function StoryPage() {
  return (
    <>
      <JsonLd data={buildStoryGraph()} />
      <Link
        href="/"
        style={{ mixBlendMode: "difference" }}
        className="label fixed left-6 top-6 z-50 text-cotton transition-opacity hover:opacity-60 md:left-10 md:top-8"
      >
        ← Back
      </Link>

      <StoryDeck />
    </>
  );
}
