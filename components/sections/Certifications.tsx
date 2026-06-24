"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Draggable } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import FadeIn from "@/components/ui/FadeIn";
import Atmosphere from "@/components/ui/Atmosphere";
import { certifications, issuerLogos } from "@/content/certifications";

/**
 * Background institution logo — customize freely.
 * `desktop` (viewport ≥ 1024px) sits where you place it via top/right (or
 * left/bottom). Phones & tablets (< 1024px) use `compact`, centered across the
 * top of the section. All values are plain CSS, so vw / px / % all work.
 */
const LOGO = {
  opacity: 0.14,
  desktop: {
    width: "min(46vw, 540px)",
    top: "10%",
    right: "8%",
  },
  compact: {
    width: "min(70vw, 340px)",
    top: "2%",
  },
} as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2023-03" → "Mar 2023"; "2023" → "2023"; anything else shown as-is. */
function formatDate(d: string) {
  const m = /^(\d{4})-(\d{2})$/.exec(d);
  if (m) return `${MONTHS[+m[2] - 1] ?? ""} ${m[1]}`.trim();
  return d;
}

/** Sortable key: "YYYY-MM" or "YYYY" → comparable number (newest = largest). */
function dateKey(d: string) {
  const m = /^(\d{4})(?:-(\d{2}))?$/.exec(d);
  return m ? +m[1] * 100 + (m[2] ? +m[2] : 0) : 0;
}

// Newest first; array order in content/certifications.ts is irrelevant.
const sortedCertifications = [...certifications].sort(
  (a, b) => dateKey(b.date) - dateKey(a.date),
);

function Card({
  c,
  onClick,
  floatCaption = false,
}: {
  c: (typeof certifications)[number];
  onClick: () => void;
  /**
   * When true, the title/issuer caption is positioned absolutely below the
   * image (out of flow). The card's measured height is then just the image, so
   * a longer title can't change the card's height or vertical position in the
   * ring — the text simply flows below. Used by the carousel, not the grid.
   */
  floatCaption?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group block w-full text-left ${floatCaption ? "relative" : ""}`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-md border border-noir/10 bg-white/70 shadow-xl ring-1 ring-noir/5 transition-shadow duration-300 group-hover:shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={`${c.title}, ${c.issuer}`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className={floatCaption ? "absolute inset-x-0 top-full mt-3" : "mt-3"}>
        <p className="text-sm leading-snug text-noir/85 md:text-base">
          {c.title}
        </p>
        <p className="label mt-1.5 text-noir/40">
          {c.issuer} · {formatDate(c.date)}
        </p>
      </div>
    </button>
  );
}

export default function Certifications() {
  const [reduced, setReduced] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [sel, setSel] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoWrap = useRef<HTMLDivElement>(null);
  const logoImg = useRef<HTMLImageElement>(null);
  const items = sortedCertifications;

  // Issuer whose card is currently at the front of the ring → drives the big
  // background logo. Seeded with the newest so a logo shows immediately.
  const [activeIssuer, setActiveIssuer] = useState<string | null>(
    items[0]?.issuer ?? null,
  );
  const activeLogo = activeIssuer ? issuerLogos[activeIssuer] : undefined;
  const activeSrc = activeLogo?.src;

  // Cylinder geometry, recomputed responsively. ringLen is derived so the big
  // circle stays densely packed (cards close together) instead of spread out.
  const [geo, setGeo] = useState({
    cardW: 280,
    radius: 700,
    perspective: 8400,
    bandH: 420,
    ringLen: 12,
  });

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const compute = () => {
      const w = band.current?.offsetWidth ?? window.innerWidth;
      const vw = window.innerWidth;
      // Bigger share of the screen on phones/tablets (where there's room to
      // spare); desktop keeps its previous, narrower proportion.
      const frac = vw < 640 ? 0.5 : vw < 1024 ? 0.52 : 0.26;
      const cap = vw < 1024 ? 460 : 360;
      const cardW = Math.round(Math.max(240, Math.min(w * frac, cap)));
      // Big, fixed radius so the sides run off-screen — independent of count.
      const radius = Math.round(cardW * 2.5);
      // Pack enough cards around it that neighbours nearly touch (~1.12·cardW apart).
      const ringLen = Math.max(
        items.length,
        Math.round((2 * Math.PI * radius) / (cardW * 1.12)),
      );
      // High perspective keeps the front card near its true size → stays crisp.
      const perspective = radius * 12;
      const bandH = Math.round((cardW * 0.75 + 92) * 1.18);
      setGeo({ cardW, radius, perspective, bandH, ringLen });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useIsoLayoutEffect(() => {
    if (sel === null || !dialog.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        dialog.current,
        { autoAlpha: 0, scale: 0.95, y: 12 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    });
    return () => mm.revert();
  }, [sel]);

  // Slow auto-rotating ring you can also drag. Every card is styled from the
  // live rotation: the one nearest the front scales up, brightens and casts a
  // deeper shadow; neighbours recede, dim and flatten. Releasing a drag snaps
  // to the closest card. Auto-advance pauses while hovering or dragging.
  useIsoLayoutEffect(() => {
    if (reduced) return;
    const ringEl = ringRef.current;
    const proxyEl = proxyRef.current;
    const triggerEl = band.current;
    if (!ringEl || !proxyEl || !triggerEl) return;

    const len = items.length;
    const ringLen = geo.ringLen;
    const stepAngle = 360 / ringLen;
    const degPerPx = stepAngle / (geo.cardW * 0.9); // ~one card per card-width drag

    const rot = { v: 0 };
    let killed = false;
    let hovering = false;
    let dragging = false;
    let lastFront = -1;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let tween: gsap.core.Tween | undefined;

    const norm = (deg: number) => (((deg % 360) + 540) % 360) - 180; // [-180,180)

    const render = (v: number) => {
      gsap.set(ringEl, { rotationY: v });
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) continue;
        const a = Math.abs(norm(stepAngle * i + v)); // 0° = dead front
        const g = Math.max(0, 1 - a / 82); // front-ness → size + shadow only
        // Depth comes from scale + shadow, NOT from dimming. Cards across the
        // front arc stay fully opaque; opacity only ramps down to hide the ones
        // wrapping around to the side/back (no more visible rear of the ring).
        const vis = a <= 48 ? 1 : a >= 85 ? 0 : (85 - a) / 37;
        const scale = 0.84 + 0.22 * g;
        const yoff = (6 + 22 * g).toFixed(1);
        const blur = (10 + 40 * g).toFixed(1);
        const alpha = (0.14 + 0.34 * g).toFixed(3);
        el.style.transform = `scale(${scale.toFixed(3)})`;
        el.style.opacity = vis.toFixed(3);
        el.style.zIndex = String(Math.round(100 - a));
        el.style.pointerEvents = vis < 0.5 ? "none" : "auto";
        el.style.filter = `drop-shadow(0 ${yoff}px ${blur}px rgba(0,0,0,${alpha}))`;
      }
      const front = ((((Math.round(-v / stepAngle) % ringLen) + ringLen) % ringLen)) % len;
      if (front !== lastFront) {
        lastFront = front;
        setActiveIssuer(items[front]?.issuer ?? null);
      }
    };

    render(0);

    const isPaused = () => killed || hovering || dragging;
    const maybeSchedule = (delay: number) => {
      clearTimeout(timer);
      if (!isPaused() && (!tween || !tween.isActive()))
        timer = setTimeout(advance, delay);
    };

    function advance() {
      if (isPaused()) return;
      const target = Math.round(rot.v / stepAngle) * stepAngle - stepAngle;
      tween = gsap.to(rot, {
        v: target,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => render(rot.v),
        onComplete: () => maybeSchedule(2200),
      });
    }

    maybeSchedule(2200);

    const onEnter = () => {
      hovering = true;
      clearTimeout(timer);
    };
    const onLeave = () => {
      hovering = false;
      maybeSchedule(700);
    };
    ringEl.addEventListener("mouseenter", onEnter);
    ringEl.addEventListener("mouseleave", onLeave);

    let pressV = 0;
    let pressX = 0;
    const [drag] = Draggable.create(proxyEl, {
      type: "x",
      trigger: triggerEl,
      dragClickables: true,
      inertia: false,
      onPress() {
        dragging = true;
        clearTimeout(timer);
        gsap.killTweensOf(rot);
        pressV = rot.v;
        pressX = this.x;
      },
      onDrag() {
        rot.v = pressV + (this.x - pressX) * degPerPx;
        render(rot.v);
      },
      onRelease() {
        // Snap to the nearest card, then resume auto-advance.
        gsap.killTweensOf(rot);
        tween = gsap.to(rot, {
          v: Math.round(rot.v / stepAngle) * stepAngle,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => render(rot.v),
          onComplete: () => {
            dragging = false;
            maybeSchedule(1600);
          },
        });
      },
    });

    return () => {
      killed = true;
      clearTimeout(timer);
      tween?.kill();
      gsap.killTweensOf(rot);
      drag?.kill();
      ringEl.removeEventListener("mouseenter", onEnter);
      ringEl.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, geo.ringLen, geo.cardW, items]);

  // Cross-fade the background logo when the active issuer changes.
  useIsoLayoutEffect(() => {
    if (!logoImg.current || !activeSrc) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        logoImg.current,
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: LOGO.opacity, scale: 1, duration: 0.9, ease: "power2.out" },
      );
    });
    return () => mm.revert();
  }, [activeSrc]);

  // Parallax: the logo drifts gently upward as the section scrolls past.
  useIsoLayoutEffect(() => {
    const el = logoWrap.current;
    if (!el || reduced) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tw = gsap.fromTo(
        el,
        { yPercent: 14 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    });
    return () => mm.revert();
  }, [reduced]);

  // Logo placement: global LOGO defaults, overridden by the active logo's own
  // desktop/compact CSS so each (wide vs square) can be sized/placed on its own.
  const logoStyle: React.CSSProperties = isDesktop
    ? { ...LOGO.desktop, ...activeLogo?.desktop }
    : {
        ...LOGO.compact,
        ...activeLogo?.compact,
        left: 0,
        right: 0,
        marginInline: "auto",
      };

  const cert = sel !== null ? items[sel] : null;

  // Fill the ring by repeating the list to the derived length.
  const ring = Array.from(
    { length: geo.ringLen },
    (_, i) => items[i % items.length],
  );

  return (
    <section
      id="certifications"
      ref={section}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cotton py-24 md:py-32"
    >
      <Atmosphere
        grainOpacity={0.5}
        glows={[
          "-top-[12%] left-1/2 h-[55vh] w-[80vh] -translate-x-1/2 bg-cherry/10 blur-[150px]",
        ]}
      />

      {/* Big institution logo — per-issuer watermark with parallax.
          Desktop: placed via LOGO.desktop. Mobile/tablet: centered up top. */}
      <div
        ref={logoWrap}
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={logoStyle}
      >
        {activeSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={activeSrc}
            ref={logoImg}
            src={activeSrc}
            alt=""
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{ opacity: LOGO.opacity }}
            className="h-auto w-full select-none"
          />
        )}
      </div>

      {/* Heading + intro */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 text-center md:px-10 lg:text-left">
        <FadeIn>
          <span className="label text-cherry">Certificates &amp; Recognition</span>
        </FadeIn>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-[1.08] tracking-[-0.01em] md:text-5xl lg:mx-0">
          Backed by Harvard, IBM and others.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-noir/60 lg:mx-0">
          I&apos;m largely self-taught. These are the certificates and
          recognitions that put institutions behind the work.
        </p>
      </div>

      {/* 3D ring band */}
      <div
        ref={band}
        className={`relative mt-10 md:mt-14 ${
          reduced ? "" : "cursor-grab select-none active:cursor-grabbing"
        }`}
        style={{
          perspective: `${geo.perspective}px`,
          height: reduced ? undefined : geo.bandH,
        }}
      >
        {reduced ? (
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 md:grid-cols-4 md:px-10">
            {items.map((c, i) => (
              <Card key={i} c={c} onClick={() => setSel(i)} />
            ))}
          </div>
        ) : (
          <>
            {/* No edge veils: cards fade out by angle as they reach the sides
                (see `vis` in render), so there's nothing hard to mask. */}
            <div
              ref={ringRef}
              className="absolute inset-0 [transform-style:preserve-3d]"
            >
              {ring.map((c, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: geo.cardW,
                    transform: `translate(-50%, -50%) rotateY(${
                      (360 / geo.ringLen) * i
                    }deg) translateZ(${geo.radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="will-change-transform"
                  >
                    <Card
                      c={c}
                      onClick={() => setSel(i % items.length)}
                      floatCaption
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Invisible drag proxy — GSAP Draggable tracks its x to spin the ring */}
            <div ref={proxyRef} className="pointer-events-none absolute inset-0" />
          </>
        )}
      </div>

      {/* Lightbox */}
      {cert && (
        <div
          onClick={() => setSel(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center p-5 md:p-10"
        >
          <div className="absolute inset-0 bg-noir/85 backdrop-blur-md" />
          <div
            ref={dialog}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-md bg-cotton shadow-2xl"
          >
            <button
              onClick={() => setSel(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-noir/10 text-noir/60 transition-colors hover:bg-noir/20 hover:text-noir"
            >
              ✕
            </button>

            <div className="flex items-center justify-center bg-noir/[0.04] p-6 md:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-[58vh] w-auto max-w-full rounded-sm object-contain shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-noir/10 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl md:text-2xl">{cert.title}</p>
                <p className="label mt-1 text-noir/50">
                  {cert.issuer} · {formatDate(cert.date)}
                </p>
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex shrink-0 items-center gap-2 rounded-full bg-cherry px-5 py-2.5 text-cotton transition-colors hover:bg-maroon"
                >
                  View original ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
