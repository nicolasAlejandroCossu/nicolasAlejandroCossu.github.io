"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fde } from "@/content/site";

/**
 * The clarity beat. "Deep Engineering" and "Client Frontier" slide inward and
 * fade out as "Forward Deployed Engineer" resolves at center — you watch the
 * bridge form. Pinned + scrubbed. No connecting line; the phrases fade fully so
 * nothing overlaps the term.
 */
export default function Fde() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLHeadingElement>(null);
  const right = useRef<HTMLHeadingElement>(null);
  const term = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=160%",
          pin: pin.current,
          scrub: 0.6,
        },
      });

      tl.to(left.current, { xPercent: 58, autoAlpha: 0, ease: "power1.in" }, 0)
        .to(right.current, { xPercent: -58, autoAlpha: 0, ease: "power1.in" }, 0)
        .fromTo(
          term.current,
          { autoAlpha: 0, scale: 0.82, filter: "blur(10px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "power2.out" },
          0.4,
        )
        .fromTo(
          copy.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, ease: "power2.out" },
          0.65,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Reduced motion: show the resolved state, no pin, no side phrases.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([left.current, right.current], { autoAlpha: 0 });
      gsap.set([term.current, copy.current], { autoAlpha: 1 });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section id="fde" ref={root} className="relative bg-cotton">
      <div
        ref={pin}
        style={{ "--grain-opacity": 0.45 } as React.CSSProperties}
        className="grain flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
      >
        <span className="label mb-10 text-cherry md:mb-16">
          What is a Forward Deployed Engineer?
        </span>

        <div className="relative flex h-[24vh] w-full max-w-[1200px] items-center justify-center">
          <h2
            ref={left}
            className="absolute left-0 max-w-[42%] text-left font-display text-2xl leading-tight md:text-5xl"
          >
            {fde.left}
          </h2>

          <h2
            ref={right}
            className="absolute right-0 max-w-[42%] text-right font-display text-2xl leading-tight md:text-5xl"
          >
            {fde.right}
          </h2>

          <h2
            ref={term}
            className="invisible absolute px-4 text-center font-display text-4xl leading-[0.95] tracking-[-0.03em] md:text-7xl lg:text-8xl"
          >
            Forward Deployed{" "}
            <span className="italic text-cherry">Engineer</span>
          </h2>
        </div>

        <div ref={copy} className="invisible mt-12 max-w-2xl text-center md:mt-16">
          <p className="text-lg leading-relaxed text-noir/80 md:text-xl">
            {fde.lines[0]}
          </p>
          <p className="mt-2 text-lg leading-relaxed text-noir/80 md:text-xl">
            {fde.lines[1]}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
            {fde.pillars.map((p, i) => (
              <span key={p} className="flex items-center gap-6 md:gap-10">
                <span className="label text-noir/70">{p}</span>
                {i < fde.pillars.length - 1 && (
                  <span className="h-3 w-px bg-noir/20" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
