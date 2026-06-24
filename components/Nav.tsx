"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { onLoaderDone } from "@/lib/loader";
import { nav, site } from "@/content/site";

/**
 * Fixed nav. Clean wordmark (no dot). Inline links on desktop; a hamburger
 * overlay menu on mobile / tablet (below lg). mix-blend-difference keeps the
 * bar legible over both the Cotton and Noir halves.
 */
export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);

  useIsoLayoutEffect(() => {
    const off = onLoaderDone(() => {
      gsap.fromTo(
        bar.current,
        { y: -24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
      );
    });
    return off;
  }, []);

  // Hide on scroll down, reveal on scroll up (always visible near the top or
  // while the mobile menu is open) so it doesn't interrupt reading.
  useEffect(() => {
    let lastY = window.scrollY;
    let hidden = false;
    const setHidden = (h: boolean) => {
      if (h === hidden || !bar.current) return;
      hidden = h;
      gsap.to(bar.current, {
        yPercent: h ? -130 : 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (openRef.current || y < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIsoLayoutEffect(() => {
    openRef.current = open;
    const el = overlay.current;
    if (!el) return;
    if (open) {
      gsap.set(bar.current, { yPercent: 0 });
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-mlink]"),
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.08 },
      );
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlay.current) overlay.current.style.display = "none";
        },
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (target: string) => {
    setOpen(false);
    requestAnimationFrame(() =>
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <>
      <header
        ref={bar}
        style={{ mixBlendMode: "difference", opacity: 0 }}
        className="fixed inset-x-0 top-0 z-[60] text-cotton"
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              jump("#top");
            }}
            className="text-sm font-medium tracking-tight"
          >
            {site.name}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.target}>
                <a
                  href={item.target}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(item.target);
                  }}
                  className="label text-[0.68rem] transition-opacity hover:opacity-60"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative flex h-6 w-7 flex-col justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        ref={overlay}
        style={{ display: "none" }}
        className="fixed inset-0 z-[55] flex-col items-center justify-center gap-3 bg-noir text-cotton lg:!hidden"
      >
        {nav.map((item) => (
          <a
            key={item.target}
            data-mlink
            href={item.target}
            onClick={(e) => {
              e.preventDefault();
              jump(item.target);
            }}
            className="font-display text-4xl leading-tight transition-colors hover:text-cherry"
          >
            {item.label}
          </a>
        ))}
        <a
          data-mlink
          href={site.links.email}
          className="label mt-8 text-cotton/50 transition-colors hover:text-cherry"
        >
          {site.email}
        </a>
      </div>
    </>
  );
}
