"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { markLoaderDone } from "@/lib/loader";
import { site } from "@/content/site";

/**
 * Cotton-on-Noir loader: a hairline draws across as a counter runs 000 → 100,
 * then the whole curtain lifts away and hands off to the Hero intro.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(root.current, { display: "none" });
      markLoaderDone();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: markLoaderDone });

    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current)
          count.current.textContent = String(Math.round(counter.v)).padStart(
            3,
            "0",
          );
      },
    });
    tl.fromTo(
      line.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
      0,
    );
    tl.to(count.current, { autoAlpha: 0, duration: 0.4 }, ">-0.1");
    tl.to(
      root.current,
      { yPercent: -100, duration: 1, ease: "power4.inOut" },
      ">",
    );
    tl.set(root.current, { display: "none" });

    // Safety: never trap the user behind the curtain if a tween stalls.
    const safety = window.setTimeout(markLoaderDone, 6000);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir text-cotton"
    >
      <div className="flex flex-col items-center gap-7">
        <span ref={count} className="label text-cotton/55">
          000
        </span>
        <div className="h-px w-44 overflow-hidden bg-cotton/15">
          <div
            ref={line}
            className="h-full w-full origin-left bg-cherry"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span className="label text-cotton/40">{site.name}</span>
      </div>
    </div>
  );
}
