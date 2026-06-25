"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { onLoaderDone } from "@/lib/loader";
import RevealText from "@/components/ui/RevealText";
import { site } from "@/content/site";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const eyebrow = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const cv = useRef<HTMLAnchorElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const off = onLoaderDone(() => {
        gsap
          .timeline()
          .fromTo(
            eyebrow.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
          )
          .fromTo(
            tagline.current,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
            0.55,
          )
          .fromTo(
            cv.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
            0.75,
          )
          .fromTo(
            statement.current,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
            0.85,
          )
          .fromTo(cue.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.05);
      });

      const parallax = gsap.to(inner.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        off();
        parallax.scrollTrigger?.kill();
        parallax.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(115% 85% at 82% 8%, rgba(129,1,0,0.10), transparent 55%)",
        }}
      />
      <div
        id="hero-canvas-slot"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <HeroCanvas />
      </div>

      <div
        ref={inner}
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 pb-10 pt-32 text-center md:px-10 md:pb-16 md:pt-36 lg:text-left"
      >
        <div
          ref={eyebrow}
          className="flex items-center justify-center gap-3 opacity-0 lg:justify-start"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cherry" />
          <span className="label">{site.role}</span>
        </div>

        <div className="py-6">
          <RevealText
            as="h1"
            playOn="loader"
            type="words"
            className="whitespace-nowrap font-display leading-[0.92] tracking-[-0.03em] text-[clamp(2.75rem,11vw,11rem)]"
          >
            {site.name}
          </RevealText>
          <p
            ref={tagline}
            className="mx-auto mt-5 max-w-2xl font-display text-2xl italic opacity-0 md:text-3xl lg:mx-0"
          >
            {site.tagline}
          </p>

          <a
            ref={cv}
            href={site.cv}
            download
            className="group mx-auto mt-8 inline-flex items-center gap-2.5 rounded-full border border-noir/25 px-5 py-2.5 opacity-0 transition-colors duration-300 hover:bg-noir hover:text-cotton lg:mx-0"
          >
            <span className="label text-[0.62rem]">Download CV</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div ref={cue} className="flex items-center gap-3 opacity-0">
            <span className="label text-noir/45">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-noir/20">
              <span className="absolute inset-0 block bg-cherry [animation:scrollcue_2.2s_ease-in-out_infinite]" />
            </span>
          </div>
          <p
            ref={statement}
            className="mx-auto max-w-sm text-center text-sm leading-relaxed text-noir/65 opacity-0 md:text-base lg:mx-0 lg:text-right"
          >
            {site.heroStatement}
          </p>
        </div>
      </div>
    </section>
  );
}
