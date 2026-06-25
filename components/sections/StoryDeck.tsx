"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { story, storyReflection } from "@/content/story";
import { site } from "@/content/site";
import type { StoryChapter } from "@/content/types";

const GrassBlock = dynamic(() => import("@/components/three/GrassBlock"), {
  ssr: false,
});

const COTTON = "#EDEBDE";
const NOIR = "#1B1716";

// Only cotton and noir, strictly alternating so every page-turn is a clear flip.
// `glow` is a subtle texture overlay, not a coloured background.
const PALETTE: { bg: string; glow: string; dark: boolean }[] = [
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // intro
  { bg: NOIR, glow: "rgba(129,1,0,0.20)", dark: true }, // 01 origin
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // 02 exploration
  { bg: NOIR, glow: "rgba(129,1,0,0.20)", dark: true }, // 03 niche
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // 04 learning to lead
  { bg: NOIR, glow: "rgba(129,1,0,0.20)", dark: true }, // 05 the break
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // 06 deep end
  { bg: NOIR, glow: "rgba(129,1,0,0.20)", dark: true }, // 07 send-off
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // 08 exos
  { bg: NOIR, glow: "rgba(129,1,0,0.20)", dark: true }, // 09 now
  { bg: COTTON, glow: "rgba(99,1,2,0.06)", dark: false }, // reflection
];

type Base = { bg: string; glow: string; dark: boolean };
type Page =
  | ({ kind: "intro" } & Base)
  | ({ kind: "chapter"; ch: StoryChapter; i: number } & Base)
  | ({ kind: "reflection" } & Base);

const PAGES: Page[] = [
  { kind: "intro", ...PALETTE[0] },
  ...story.map((ch, i) => ({ kind: "chapter" as const, ch, i, ...PALETTE[i + 1] })),
  { kind: "reflection", ...PALETTE[PALETTE.length - 1] },
];

const CLIP_CLOSED = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
const CLIP_OPEN = "polygon(0% 0%, 140% 0%, 100% 100%, 0% 100%)";

function Media({ ch }: { ch: StoryChapter }) {
  if (ch.motif === "grass") {
    return (
      <div className="mx-auto aspect-square w-full max-w-[20rem]">
        <GrassBlock />
      </div>
    );
  }
  if (ch.image) {
    return (
      <div className="overflow-hidden rounded-sm shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ch.image} alt={ch.imageAlt ?? ""} className="h-full w-full object-cover" />
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

function ChapterContent({ ch, dark, i }: { ch: StoryChapter; dark: boolean; i: number }) {
  const reversed = i % 2 === 1;
  const hasMedia = ch.motif === "grass" || !!ch.image || !!ch.quote;
  const quoteInText = (ch.motif === "grass" || !!ch.image) && !!ch.quote;
  const kicker = dark ? "text-cotton/60" : "text-cherry";
  const accentText = dark ? "text-cotton" : "text-cherry";
  const accentBorder = dark ? "border-cotton/45" : "border-cherry";
  const ledgerLines = dark ? "divide-cotton/15 border-cotton/15" : "divide-noir/12 border-noir/12";

  return (
    <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div
        className={`text-center lg:text-left ${
          hasMedia ? `lg:col-span-7 ${reversed ? "lg:order-2" : ""}` : "lg:col-span-10 lg:col-start-2"
        }`}
      >
        <div data-reveal>
          <span className="block font-display text-5xl leading-none opacity-90 md:text-7xl">{ch.year}</span>
          <span className={`label mt-3 inline-block ${kicker}`}>
            {ch.kicker} · {ch.index}
          </span>
        </div>

        <h2 data-reveal className="mt-6 font-display text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl">
          {ch.headline}
        </h2>

        <div className="mt-6 space-y-4">
          {ch.paragraphs.map((p, pi) => (
            <p key={pi} data-reveal className="mx-auto max-w-xl text-base leading-relaxed opacity-80 md:text-lg lg:mx-0">
              {p}
            </p>
          ))}
        </div>

        {ch.highlights && (
          <div data-reveal className={`mt-10 flex flex-col divide-y border-y md:flex-row md:divide-x md:divide-y-0 ${ledgerLines}`}>
            {ch.highlights.map((h, idx) => (
              <div key={h} className="flex-1 px-5 py-6 text-center">
                <span className="label opacity-45">{`0${idx + 1}`}</span>
                <span className="mt-2 block font-display text-lg leading-tight md:text-2xl">{h}</span>
              </div>
            ))}
          </div>
        )}

        {quoteInText && (
          <blockquote data-reveal className={`mx-auto mt-8 max-w-xl border-l-2 pl-5 text-left font-display text-xl italic leading-snug opacity-90 md:text-2xl lg:mx-0 ${accentBorder}`}>
            “{ch.quote}”
          </blockquote>
        )}

        {ch.aside && (
          <div data-reveal className={`mx-auto mt-10 max-w-lg border-l-4 p-6 text-left lg:mx-0 ${accentBorder} ${dark ? "bg-cotton/[0.05]" : "bg-cherry/[0.06]"}`}>
            <span className={`label ${accentText}`}>{ch.aside.label}</span>
            <p className="mt-3 font-display text-lg leading-snug md:text-xl">{ch.aside.text}</p>
          </div>
        )}
      </div>

      {hasMedia && (
        <div data-reveal className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
          <Media ch={ch} />
        </div>
      )}
    </div>
  );
}

export default function StoryDeck() {
  const [enhanced, setEnhanced] = useState(false);
  const [current, setCurrent] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const animating = useRef(false);
  const goToRef = useRef<(t: number) => void>(() => {});

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnhanced(true);
  }, []);

  useIsoLayoutEffect(() => {
    if (!enhanced) return;
    const deck = rootRef.current;
    if (!deck) return;

    const reveal = (i: number) => {
      const el = pageRefs.current[i];
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { autoAlpha: 0, y: 48, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: "expo.out", delay: 0.08 },
      );
    };
    const hide = (i: number) => {
      const el = pageRefs.current[i];
      if (el) gsap.set(el.querySelectorAll("[data-reveal]"), { autoAlpha: 0, y: 48, scale: 0.985 });
    };

    pageRefs.current.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, zIndex: 1 }));
    PAGES.forEach((_, i) => hide(i));
    currentRef.current = 0;
    setCurrent(0);
    reveal(0);
    document.body.style.overflow = "hidden";

    const goTo = (target: number) => {
      const cur = currentRef.current;
      if (animating.current || target === cur || target < 0 || target >= PAGES.length) return;
      animating.current = true;
      const tEl = pageRefs.current[target];
      const cEl = pageRefs.current[cur];
      hide(target);
      gsap.set(tEl, { autoAlpha: 1, zIndex: 30, clipPath: CLIP_CLOSED });
      gsap.to(tEl, {
        clipPath: CLIP_OPEN,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          if (cEl) gsap.set(cEl, { autoAlpha: 0 });
          gsap.set(tEl, { zIndex: 1, clearProps: "clipPath" });
          const sc = scrollRefs.current[target];
          if (sc) sc.scrollTop = 0;
          currentRef.current = target;
          setCurrent(target);
          reveal(target);
          window.setTimeout(() => (animating.current = false), 120);
        },
      });
    };
    goToRef.current = goTo;

    const atBottom = (sc: HTMLDivElement | null) =>
      !sc || sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2;
    const atTop = (sc: HTMLDivElement | null) => !sc || sc.scrollTop <= 2;

    const THRESH = 320;
    let accum = 0;

    const onWheel = (e: WheelEvent) => {
      if (animating.current) {
        e.preventDefault();
        return;
      }
      const sc = scrollRefs.current[currentRef.current];
      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir > 0 && atBottom(sc)) {
        e.preventDefault();
        accum = Math.max(0, accum) + e.deltaY;
        if (accum > THRESH) {
          accum = 0;
          goTo(currentRef.current + 1);
        }
      } else if (dir < 0 && atTop(sc)) {
        e.preventDefault();
        accum = Math.min(0, accum) + e.deltaY;
        if (accum < -THRESH) {
          accum = 0;
          goTo(currentRef.current - 1);
        }
      } else {
        accum = 0;
      }
    };

    let touchY = 0;
    let touchLive = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchLive = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchLive) return;
      if (animating.current) {
        e.preventDefault();
        return;
      }
      const sc = scrollRefs.current[currentRef.current];
      const dy = touchY - e.touches[0].clientY;
      if (dy > 110 && atBottom(sc)) {
        e.preventDefault();
        touchLive = false;
        goTo(currentRef.current + 1);
      } else if (dy < -110 && atTop(sc)) {
        e.preventDefault();
        touchLive = false;
        goTo(currentRef.current - 1);
      }
    };
    const onTouchEnd = () => {
      touchLive = false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (animating.current) return;
      const sc = scrollRefs.current[currentRef.current];
      if (["ArrowDown", "PageDown", " "].includes(e.key) && atBottom(sc)) {
        e.preventDefault();
        goTo(currentRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key) && atTop(sc)) {
        e.preventDefault();
        goTo(currentRef.current - 1);
      }
    };

    deck.addEventListener("wheel", onWheel, { passive: false });
    deck.addEventListener("touchstart", onTouchStart, { passive: true });
    deck.addEventListener("touchmove", onTouchMove, { passive: false });
    deck.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      deck.removeEventListener("wheel", onWheel);
      deck.removeEventListener("touchstart", onTouchStart);
      deck.removeEventListener("touchmove", onTouchMove);
      deck.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [enhanced]);

  const activeDark = PAGES[current]?.dark;
  const lastLine = storyReflection.lines[storyReflection.lines.length - 1];

  return (
    <div ref={rootRef} className={enhanced ? "fixed inset-0 z-0 overflow-hidden" : "relative"}>
      {PAGES.map((page, idx) => {
        const glowBg = `radial-gradient(50% 45% at ${idx % 2 === 1 ? "14%" : "86%"} ${
          page.dark ? "36%" : "22%"
        }, ${page.glow}, transparent 66%)`;
        return (
          <div
            key={idx}
            ref={(el) => {
              pageRefs.current[idx] = el;
            }}
            style={{ backgroundColor: page.bg, color: page.dark ? "#EDEBDE" : "#1B1716" }}
            className={enhanced ? "absolute inset-0" : "relative"}
          >
            <div className="pointer-events-none absolute inset-0" style={{ background: glowBg }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(125% 100% at 50% 32%, transparent 54%, rgba(0,0,0,0.16))" }}
            />
            <div className="grain pointer-events-none absolute inset-0" />

            <div
              ref={(el) => {
                scrollRefs.current[idx] = el;
              }}
              className={`relative ${enhanced ? "h-full overflow-y-auto" : ""} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
            >
              <div className="flex min-h-screen items-center px-6 py-24 md:px-12">
                {page.kind === "intro" && (
                  <div className="relative mx-auto w-full max-w-[1180px] text-center">
                    <svg
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2"
                      viewBox="0 0 1200 760"
                      preserveAspectRatio="xMidYMid meet"
                      fill="none"
                      aria-hidden
                    >
                      <g stroke="#810100" strokeOpacity="0.2">
                        <path
                          d="M 60 470 C 250 330, 360 640, 520 470 S 800 300, 960 470 S 1150 600, 1150 500"
                          strokeWidth="2.5"
                          strokeDasharray="2 16"
                          strokeLinecap="round"
                          className="[animation:trail_16s_linear_infinite]"
                        />
                        <circle cx="60" cy="470" r="11" strokeWidth="2.5" />
                        <circle cx="520" cy="470" r="11" strokeWidth="2.5" />
                        <circle cx="960" cy="470" r="11" strokeWidth="2.5" />
                        <g strokeWidth="3.5">
                          <line x1="1138" y1="486" x2="1162" y2="516" />
                          <line x1="1162" y1="486" x2="1138" y2="516" />
                        </g>
                      </g>
                    </svg>
                    <div className="relative">
                      <span data-reveal className="label text-cherry">
                        The full history
                      </span>
                      <h1 data-reveal className="mx-auto mt-6 max-w-4xl font-display text-[3rem] leading-[1.02] tracking-[-0.03em] md:text-8xl">
                        The long way here.
                      </h1>
                      <p data-reveal className="mx-auto mt-7 max-w-xl text-base text-noir/65 md:text-lg">
                        From modding a game at eight to systems thousands of people rely on. The unedited version, failures and all.
                      </p>
                    </div>
                  </div>
                )}

                {page.kind === "chapter" && <ChapterContent ch={page.ch} dark={page.dark} i={page.i} />}

                {page.kind === "reflection" && (
                  <div className="mx-auto w-full max-w-[1100px] text-center lg:text-left">
                    <span data-reveal className="label text-cherry">
                      {storyReflection.kicker}
                    </span>
                    <div className="mt-10 space-y-6">
                      {storyReflection.lines.slice(0, -1).map((line, i) => (
                        <p
                          key={i}
                          data-reveal
                          className="mx-auto max-w-3xl font-display text-2xl leading-snug text-noir/85 md:text-4xl lg:mx-0"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <p
                      data-reveal
                      className="mx-auto mt-12 max-w-3xl font-display text-4xl italic leading-[1.05] tracking-[-0.01em] text-cherry md:text-6xl lg:mx-0"
                    >
                      {lastLine}
                    </p>

                    <div data-reveal className="mt-12 flex items-center justify-center gap-4 lg:justify-start">
                      <span className="h-px w-12 bg-noir/30" />
                      <span className="font-display text-lg italic text-noir/70">{site.name}</span>
                    </div>

                    <div data-reveal className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-5 lg:justify-start">
                      <Link href="/#work" className="group inline-flex items-center gap-2 text-noir/80 transition-colors hover:text-cherry">
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        <span className="label relative py-1">
                          Back to portfolio
                          <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-cherry transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                      <a href={site.links.email} className="group inline-flex items-center gap-2 text-noir/80 transition-colors hover:text-cherry">
                        <span className="label relative py-1">
                          Get in touch
                          <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-cherry transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {enhanced && (
        <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          {PAGES.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to section ${idx + 1}`}
              onClick={() => goToRef.current(idx)}
              className="grid place-items-center"
              style={{ color: activeDark ? "#EDEBDE" : "#1B1716" }}
            >
              <span
                className="block rounded-full bg-current transition-all duration-300"
                style={{
                  width: idx === current ? 9 : 6,
                  height: idx === current ? 9 : 6,
                  opacity: idx === current ? 1 : 0.35,
                }}
              />
            </button>
          ))}
        </div>
      )}

      {enhanced && current < PAGES.length - 1 && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-7 z-50 flex justify-center"
          style={{ color: activeDark ? "#EDEBDE" : "#1B1716" }}
        >
          <span className="label flex items-center gap-2 opacity-50">
            Scroll
            <span className="inline-block animate-bounce">↓</span>
          </span>
        </div>
      )}
    </div>
  );
}
