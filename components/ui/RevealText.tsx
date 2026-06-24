"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { onLoaderDone } from "@/lib/loader";

type RevealType = "lines" | "words" | "chars";

interface Props {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  type?: RevealType;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  /** "scroll" reveals on enter; "loader" waits for the preloader curtain. */
  playOn?: "scroll" | "loader";
}

/**
 * Typographic fade-up reveal. Splits after fonts are ready so line breaks are
 * correct. No overflow mask, so tall serif ascenders/descenders never clip.
 * No-op under reduced motion (content renders statically).
 */
export default function RevealText({
  children,
  as = "div",
  className,
  type = "lines",
  stagger = 0.09,
  duration = 0.95,
  delay = 0,
  start = "top 85%",
  playOn = "scroll",
}: Props) {
  const ref = useRef<any>(null);
  const Tag = as as any;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let tl: gsap.core.Timeline | undefined;
      let off: (() => void) | undefined;
      let killed = false;

      const setup = () => {
        if (killed || !ref.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        split = new SplitText(el, { type, linesClass: "split-line" } as any);
        const targets = (split as unknown as Record<string, Element[]>)[type];

        if (playOn === "loader") {
          gsap.set(targets, { yPercent: 100, autoAlpha: 0 });
          tl = gsap.timeline({ paused: true });
          tl.to(targets, {
            yPercent: 0,
            autoAlpha: 1,
            duration,
            stagger,
            delay,
            ease: "power4.out",
          });
          off = onLoaderDone(() => tl?.play());
        } else {
          tween = gsap.from(targets, {
            yPercent: 100,
            autoAlpha: 0,
            duration,
            stagger,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start, once: true },
          });
        }
      };

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(setup);
      } else {
        setup();
      }

      return () => {
        killed = true;
        off?.();
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tl?.kill();
        split?.revert();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
