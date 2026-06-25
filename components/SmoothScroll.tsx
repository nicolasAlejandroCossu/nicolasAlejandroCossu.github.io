"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll, wired into the GSAP ticker so ScrollTrigger stays in
 * perfect sync. Disabled entirely under prefers-reduced-motion (native scroll).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Gentle section snapping: only nudges to a section edge once the user has
    // settled within ~20% of the viewport from it. Mid-section and the pinned
    // FDE beat (where the nearest edge is far away) stay free-scrolling.
    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "20%",
      duration: 0.9,
      debounce: 450,
    });
    const sections =
      document.querySelectorAll<HTMLElement>("main > section");
    sections.forEach((s) => snap.addElement(s, { align: ["start"] }));

    // Recompute trigger positions once fonts/images settle, so reveals fire in
    // sync instead of "loading late" after layout shifts.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh);
    const t1 = window.setTimeout(refresh, 500);
    const t2 = window.setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      gsap.ticker.remove(tick);
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
