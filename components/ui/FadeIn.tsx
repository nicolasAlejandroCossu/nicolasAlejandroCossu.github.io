"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

interface Props {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

/** Fade + rise on scroll-enter. No-op under reduced motion. */
export default function FadeIn({
  children,
  className,
  y = 42,
  delay = 0,
  duration = 1,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
