"use client";

import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import FadeIn from "@/components/ui/FadeIn";
import { story } from "@/content/story";
import type { StoryChapter } from "@/content/types";

const GrassBlock = dynamic(() => import("@/components/three/GrassBlock"), {
  ssr: false,
});

const BG = [
  "#EDEBDE",
  "#ECE8DA",
  "#E9E4D2",
  "#E6E0CA",
  "#2A1A17",
  "#251714",
  "#211512",
  "#1E1412",
  "#1B1716",
];
const isDark = (d: number) => d >= 0.5;
const colorAt = (i: number) =>
  BG[i] ?? (isDark(story[i]?.depth ?? 0) ? "#1B1716" : "#EDEBDE");

// Diagonal "page wipe": each chapter overlaps the previous and is clipped along
// a slant, so its colour sweeps in diagonally as you scroll. Direction alternates.
const SLANT = 12; // vh
const clipFor = (reversed: boolean) =>
  reversed
    ? `polygon(0 0, 100% ${SLANT}vh, 100% 100%, 0 100%)`
    : `polygon(0 ${SLANT}vh, 100% 0, 100% 100%, 0 100%)`;

function Media({ ch }: { ch: StoryChapter }) {
  if (ch.motif === "grass") {
    return (
      <div className="mx-auto aspect-square w-full max-w-[22rem]">
        <GrassBlock />
      </div>
    );
  }
  if (ch.image) {
    return (
      <div className="overflow-hidden rounded-sm shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ch.image}
          alt={ch.imageAlt ?? ""}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  if (ch.quote) {
    return (
      <blockquote className="text-center font-display text-2xl italic leading-snug opacity-90 md:text-3xl lg:text-left lg:text-4xl">
        “{ch.quote}”
      </blockquote>
    );
  }
  return null;
}

export default function Story() {
  return (
    <section id="story" className="relative">
      {story.map((ch, i) => {
        const dark = isDark(ch.depth);
        const reversed = i % 2 === 1;
        const hasMedia = ch.motif === "grass" || !!ch.image || !!ch.quote;
        const quoteInText = (ch.motif === "grass" || !!ch.image) && !!ch.quote;
        const kicker = dark ? "text-cotton/55" : "text-cherry";
        const accentText = dark ? "text-cotton" : "text-cherry";
        const accentBorder = dark ? "border-cotton/45" : "border-cherry";
        const ledgerLines = dark
          ? "divide-cotton/15 border-cotton/15"
          : "divide-noir/12 border-noir/12";

        const wipe =
          i > 0
            ? {
                marginTop: `-${SLANT}vh`,
                paddingTop: "16vh",
                clipPath: clipFor(reversed),
              }
            : undefined;

        return (
          <article
            key={ch.index}
            style={{
              backgroundColor: colorAt(i),
              color: dark ? "#EDEBDE" : "#1B1716",
              ...wipe,
            }}
            className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-24 md:px-12 md:pb-28 md:pt-28"
          >
            {/* subtle warm glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(46% 42% at ${
                  reversed ? "14%" : "86%"
                } ${dark ? "40%" : "26%"}, rgba(129,1,0,${
                  dark ? 0.2 : 0.06
                }), transparent 66%)`,
              }}
            />
            <div className="grain pointer-events-none absolute inset-0" />

            <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div
                className={`text-center lg:text-left ${
                  hasMedia
                    ? `lg:col-span-7 ${reversed ? "lg:order-2" : ""}`
                    : "lg:col-span-10 lg:col-start-2"
                }`}
              >
                <FadeIn y={18}>
                  <span className="block font-display text-5xl leading-none opacity-90 md:text-7xl">
                    {ch.year}
                  </span>
                  <span className={`label mt-3 inline-block ${kicker}`}>
                    {ch.kicker} · {ch.index}
                  </span>
                </FadeIn>

                <RevealText
                  as="h2"
                  className="mt-6 text-center font-display text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-left"
                >
                  {ch.headline}
                </RevealText>

                <div className="mt-6 space-y-4">
                  {ch.paragraphs.map((p, pi) => (
                    <FadeIn key={pi} delay={pi * 0.05}>
                      <p className="mx-auto max-w-xl text-base leading-relaxed opacity-80 md:text-lg lg:mx-0">
                        {p}
                      </p>
                    </FadeIn>
                  ))}
                </div>

                {ch.highlights && (
                  <FadeIn>
                    <div
                      className={`mt-10 flex flex-col divide-y border-y md:flex-row md:divide-x md:divide-y-0 ${ledgerLines}`}
                    >
                      {ch.highlights.map((h, idx) => (
                        <div key={h} className="flex-1 px-5 py-6 text-center">
                          <span className="label opacity-45">{`0${idx + 1}`}</span>
                          <span className="mt-2 block font-display text-lg leading-tight md:text-2xl">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                )}

                {quoteInText && (
                  <FadeIn>
                    <blockquote
                      className={`mx-auto mt-8 max-w-xl border-l-2 pl-5 text-left font-display text-xl italic leading-snug opacity-90 md:text-2xl lg:mx-0 ${accentBorder}`}
                    >
                      “{ch.quote}”
                    </blockquote>
                  </FadeIn>
                )}

                {ch.aside && (
                  <FadeIn>
                    <div
                      className={`mx-auto mt-10 max-w-lg border-l-4 p-6 text-left lg:mx-0 ${accentBorder} ${
                        dark ? "bg-cotton/[0.05]" : "bg-cherry/[0.06]"
                      }`}
                    >
                      <span className={`label ${accentText}`}>
                        {ch.aside.label}
                      </span>
                      <p className="mt-3 font-display text-lg leading-snug md:text-xl">
                        {ch.aside.text}
                      </p>
                    </div>
                  </FadeIn>
                )}
              </div>

              {hasMedia && (
                <FadeIn
                  className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}
                >
                  <Media ch={ch} />
                </FadeIn>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
