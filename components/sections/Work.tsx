"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Draggable } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";
import Atmosphere from "@/components/ui/Atmosphere";
import { projects } from "@/content/projects";
import { ACCENT_HEX } from "@/lib/accents";
import type { Project } from "@/content/types";

function CardFace({ p }: { p: Project }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border border-noir/15 shadow-2xl"
      style={{ backgroundColor: p.image ? undefined : ACCENT_HEX[p.accent] }}
    >
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.image}
          alt={p.title}
          draggable={false}
          className="h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 flex flex-col justify-between p-5"
        style={{
          background: p.image
            ? "linear-gradient(to top, rgba(27,23,22,0.92), rgba(27,23,22,0.05) 62%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 55%)",
        }}
      >
        <span className="label text-cotton/70">{p.category}</span>
        <div>
          <span className="block font-display text-2xl text-cotton md:text-3xl">
            {p.title}
          </span>
          <span className="label mt-1 block text-cotton/50">{p.year}</span>
        </div>
      </div>
    </div>
  );
}

function Detail({ p }: { p: Project }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label text-cherry">{p.status}</span>
        <span className="label text-noir/40">
          {p.category} · {p.year}
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl md:text-4xl">{p.title}</h3>
      <p className="mt-3 max-w-lg leading-relaxed text-noir/70">{p.summary}</p>
      {p.description?.[0] && (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-noir/55">
          {p.description[0]}
        </p>
      )}
      <p className="mt-4 text-sm text-noir/55">
        <span className="text-noir/40">Role: </span>
        {p.role}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="label rounded-full border border-noir/20 px-3 py-1.5 text-[0.6rem] text-noir/65"
          >
            {s}
          </span>
        ))}
      </div>
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="label mt-6 inline-flex items-center gap-2 text-cherry transition-opacity hover:opacity-70"
        >
          Visit {p.title} →
        </a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shared 3D carousel. Drives a looping deck of cards along one axis,
 * auto-advancing on a timer (pauses on hover / while dragging).
 * ------------------------------------------------------------------ */
interface CarouselConfig {
  stage: HTMLDivElement;
  proxy: HTMLDivElement;
  cards: HTMLDivElement[];
  axis: "x" | "y";
  pos: { v: number };
  indexRef: { current: number };
  goToRef: { current: (i: number) => void };
  goToNearestRef: { current: (norm: number) => void };
  onFocus: (norm: number) => void;
  measure: () => { w: number; h: number };
  spacingRatio: number;
  depthRatio: number;
  tilt: number;
  autoMs: number;
}

function setupCarousel(cfg: CarouselConfig) {
  const {
    stage, proxy, cards, axis, pos, indexRef,
    goToRef, goToNearestRef, onFocus, measure,
    spacingRatio, depthRatio, tilt, autoMs,
  } = cfg;
  const count = cards.length;
  const rot = axis === "y" ? "rotationX" : "rotationY";
  // Negative tilt curves neighbours away like the face of a wheel.
  const rotSign = -1;
  let spacing = 0;
  let depth = 0;

  const offsetOf = (i: number, pv: number) => {
    let off = (i - pv) % count;
    if (off > count / 2) off -= count;
    if (off < -count / 2) off += count;
    return off;
  };

  const render = (pv: number) => {
    cards.forEach((card, i) => {
      const off = offsetOf(i, pv);
      const a = Math.abs(off);
      gsap.set(card, {
        [axis]: off * spacing,
        z: -a * depth,
        [rot]: rotSign * off * tilt,
        scale: a >= 2 ? 0.5 : 1 - a * 0.14,
        opacity: Math.max(0, Math.min(1, 1.75 - a)),
        zIndex: Math.round(100 - a * 10),
        overwrite: "auto",
      });
    });
  };

  const layout = () => {
    const { w, h } = measure();
    const along = axis === "y" ? h : w;
    spacing = along * spacingRatio;
    depth = along * depthRatio;
    cards.forEach((card) => {
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;
      card.style.marginLeft = `${-w / 2}px`;
      card.style.marginTop = `${-h / 2}px`;
    });
    render(pos.v);
  };
  layout();
  window.addEventListener("resize", layout);

  const focus = (index: number) => {
    indexRef.current = index;
    onFocus(((index % count) + count) % count);
  };

  let auto: ReturnType<typeof setInterval> | null = null;
  const stopAuto = () => {
    if (auto) {
      clearInterval(auto);
      auto = null;
    }
  };
  const startAuto = () => {
    stopAuto();
    if (autoMs > 0)
      auto = setInterval(() => goToRef.current(indexRef.current + 1), autoMs);
  };

  goToRef.current = (index: number) => {
    focus(index);
    gsap.to(pos, {
      v: index,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => render(pos.v),
    });
  };

  goToNearestRef.current = (norm: number) => {
    const cur = indexRef.current;
    const curNorm = ((cur % count) + count) % count;
    let d = norm - curNorm;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    goToRef.current(cur + d);
  };

  focus(0);
  render(0);
  startAuto();

  let pressV = 0;
  let pressPos = 0;
  const [drag] = Draggable.create(proxy, {
    type: axis,
    trigger: stage,
    dragClickables: false,
    onPress() {
      pressV = pos.v;
      pressPos = this[axis];
      stopAuto();
      gsap.killTweensOf(pos);
    },
    onDrag() {
      pos.v = pressV - (this[axis] - pressPos) / spacing;
      render(pos.v);
    },
    onDragEnd() {
      goToRef.current(Math.round(pos.v));
      startAuto();
    },
  });

  const onEnter = () => stopAuto();
  const onLeave = () => startAuto();
  stage.addEventListener("mouseenter", onEnter);
  stage.addEventListener("mouseleave", onLeave);

  return () => {
    stopAuto();
    window.removeEventListener("resize", layout);
    stage.removeEventListener("mouseenter", onEnter);
    stage.removeEventListener("mouseleave", onLeave);
    drag?.kill();
    gsap.killTweensOf(pos);
  };
}

export default function Work() {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  // Mobile carousel height tracks the card height (card = width·3/4) so the
  // stage hugs the card instead of leaving big empty bands above/below it.
  const [hStageH, setHStageH] = useState(208);

  // Desktop vertical carousel
  const vStage = useRef<HTMLDivElement>(null);
  const vProxy = useRef<HTMLDivElement>(null);
  const vCards = useRef<(HTMLDivElement | null)[]>([]);
  const vDetail = useRef<HTMLDivElement>(null);
  const vPos = useRef({ v: 0 });
  const vIndex = useRef(0);
  const vGoTo = useRef<(i: number) => void>(() => {});
  const vGoToNearest = useRef<(norm: number) => void>(() => {});

  // Mobile horizontal carousel
  const hStage = useRef<HTMLDivElement>(null);
  const hProxy = useRef<HTMLDivElement>(null);
  const hCards = useRef<(HTMLDivElement | null)[]>([]);
  const hDetail = useRef<HTMLDivElement>(null);
  const hPos = useRef({ v: 0 });
  const hIndex = useRef(0);
  const hGoTo = useRef<(i: number) => void>(() => {});
  const hGoToNearest = useRef<(norm: number) => void>(() => {});

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setEnhanced(true);
  }, []);

  useEffect(() => {
    const compute = () => {
      // Same card width formula as the mobile carousel's measure().
      const w = Math.max(240, Math.min(window.innerWidth * 0.62, 460));
      setHStageH(Math.round((w * 3) / 4 + 24)); // card height + small margin
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useIsoLayoutEffect(() => {
    if (!enhanced) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const stage = vStage.current;
      const proxy = vProxy.current;
      if (!stage || !proxy) return;
      const cards = vCards.current.filter(Boolean) as HTMLDivElement[];
      return setupCarousel({
        stage,
        proxy,
        cards,
        axis: "y",
        pos: vPos.current,
        indexRef: vIndex,
        goToRef: vGoTo,
        goToNearestRef: vGoToNearest,
        onFocus: setActive,
        measure: () => {
          let h = Math.max(280, Math.min(stage.offsetHeight * 0.56, 460));
          let w = (h * 4) / 3;
          const maxW = stage.offsetWidth;
          if (w > maxW) {
            w = maxW;
            h = (w * 3) / 4;
          }
          return { w, h };
        },
        spacingRatio: 0.42,
        depthRatio: 0.62,
        tilt: 26,
        autoMs: 4200,
      });
    });

    mm.add("(max-width: 1023.98px)", () => {
      const stage = hStage.current;
      const proxy = hProxy.current;
      if (!stage || !proxy) return;
      const cards = hCards.current.filter(Boolean) as HTMLDivElement[];
      return setupCarousel({
        stage,
        proxy,
        cards,
        axis: "x",
        pos: hPos.current,
        indexRef: hIndex,
        goToRef: hGoTo,
        goToNearestRef: hGoToNearest,
        onFocus: setActive,
        measure: () => {
          const w = Math.max(240, Math.min(window.innerWidth * 0.62, 460));
          return { w, h: (w * 3) / 4 };
        },
        spacingRatio: 0.62,
        depthRatio: 0.42,
        tilt: 36,
        autoMs: 4200,
      });
    });

    return () => mm.revert();
  }, [enhanced]);

  // Cross-fade the detail panel when the focused project changes.
  useIsoLayoutEffect(() => {
    if (!enhanced) return;
    const targets = [vDetail.current, hDetail.current].filter(
      Boolean,
    ) as HTMLDivElement[];
    if (!targets.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    });
    return () => mm.revert();
  }, [active, enhanced]);

  const p = projects[active];

  return (
    <section
      id="work"
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-t border-noir/10 bg-cotton px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32"
    >
      <Atmosphere
        grainOpacity={0.5}
        glows={[
          "-bottom-[20%] -right-[10%] h-[60vh] w-[60vh] bg-cherry/10 blur-[140px]",
        ]}
      />
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <FadeIn>
          <span className="label text-cherry">Work</span>
        </FadeIn>
        <RevealText
          as="h2"
          className="mb-5 mt-6 font-display text-3xl leading-[1.08] tracking-[-0.01em] md:mb-14 md:text-5xl"
        >
          Built for clients, and for myself.
        </RevealText>

        {enhanced ? (
          <>
            {/* Desktop: indicator · vertical carousel · description ── */}
            <div className="hidden flex-1 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-2 xl:gap-x-4">
              {/* Left scroll indicator + prev/next */}
              <div className="flex flex-col items-center justify-center gap-5 lg:col-span-1">
                <button
                  aria-label="Previous project"
                  onClick={() => vGoTo.current(vIndex.current - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-noir/20 text-noir/60 transition-colors hover:border-cherry hover:text-cherry"
                >
                  ↑
                </button>

                <div className="flex flex-col items-center gap-4 py-2">
                  {projects.map((proj, i) => (
                    <button
                      key={proj.slug}
                      aria-label={`Go to ${proj.title}`}
                      onClick={() => vGoToNearest.current(i)}
                      className="group flex items-center gap-2"
                    >
                      <span
                        className={`label text-[0.6rem] transition-colors ${
                          i === active
                            ? "text-cherry"
                            : "text-noir/30 group-hover:text-noir/60"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`block h-px transition-all duration-300 ${
                          i === active
                            ? "w-6 bg-cherry"
                            : "w-3 bg-noir/25 group-hover:w-4 group-hover:bg-noir/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  aria-label="Next project"
                  onClick={() => vGoTo.current(vIndex.current + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-noir/20 text-noir/60 transition-colors hover:border-cherry hover:text-cherry"
                >
                  ↓
                </button>
              </div>

              <div className="lg:col-span-5">
                <div
                  ref={vStage}
                  className="relative h-[clamp(460px,64vh,680px)] cursor-grab touch-none select-none active:cursor-grabbing"
                  style={{ perspective: "1700px" }}
                >
                  {projects.map((proj, i) => (
                    <div
                      key={proj.slug}
                      ref={(el) => {
                        vCards.current[i] = el;
                      }}
                      onClick={() => vGoToNearest.current(i)}
                      className="absolute left-1/2 top-1/2 will-change-transform"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <CardFace p={proj} />
                    </div>
                  ))}
                  <div
                    ref={vProxy}
                    className="pointer-events-none absolute inset-0"
                  />
                </div>
              </div>

              <div ref={vDetail} className="lg:col-span-6 lg:pl-6 xl:pl-10">
                <Detail p={p} />
              </div>
            </div>

            {/* Mobile: horizontal carousel, description below ───────── */}
            <div className="flex flex-1 flex-col lg:hidden">
              <div
                ref={hStage}
                className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
                style={{ perspective: "1500px", height: hStageH }}
              >
                {projects.map((proj, i) => (
                  <div
                    key={proj.slug}
                    ref={(el) => {
                      hCards.current[i] = el;
                    }}
                    onClick={() => hGoToNearest.current(i)}
                    className="absolute left-1/2 top-1/2 will-change-transform"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <CardFace p={proj} />
                  </div>
                ))}
                <div
                  ref={hProxy}
                  className="pointer-events-none absolute inset-0"
                />
              </div>

              {/* All descriptions are stacked in one grid cell so the panel is
                  always as tall as the LONGEST project — swiping between them no
                  longer shifts the page up/down. Only the active one shows. */}
              <div
                ref={hDetail}
                className="mx-auto mt-4 grid w-full max-w-2xl border-t border-noir/12 pt-5"
              >
                {projects.map((proj, i) => (
                  <div
                    key={proj.slug}
                    aria-hidden={i !== active}
                    className={i === active ? "" : "invisible"}
                    style={{ gridArea: "1 / 1" }}
                  >
                    <Detail p={proj} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Reduced motion: plain stacked list, no animation. */
          <div className="space-y-14">
            {projects.map((proj) => (
              <div
                key={proj.slug}
                className="grid grid-cols-1 gap-6 border-t border-noir/12 pt-8 md:grid-cols-12"
              >
                <div className="md:col-span-5">
                  <div
                    className="aspect-[4/3] overflow-hidden rounded-lg border border-noir/15"
                    style={{
                      backgroundColor: proj.image
                        ? undefined
                        : ACCENT_HEX[proj.accent],
                    }}
                  >
                    {proj.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="md:col-span-7">
                  <Detail p={proj} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
