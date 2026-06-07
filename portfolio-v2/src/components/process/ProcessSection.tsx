'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  'Every business problem starts in uncertainty...',
  'Understanding the problem.',
  'Designing the system.',
  'Building the solution.',
  'Deploying to production.',
  'Measuring impact.',
];

const BONE = '#e8e0d0';
const DARK = '#0d0d0d';
const N    = STEPS.length;

const SCHEMES = STEPS.map((_, i) => ({
  bg:      i % 2 === 0 ? DARK : BONE,
  text:    i % 2 === 0 ? BONE : DARK,
  dotFill: i % 2 === 0 ? BONE : DARK,
  dotNum:  i % 2 === 0 ? DARK : BONE,
}));

// Geometry
const DOT_X_VW   = 7;
const DOT_Y_PCTS = [12, 25, 38, 52, 65, 80];
const DOT_R      = 30;   // visual radius px  (60px diameter)
const LINE_GAP   = 10;   // gap between line edge and dot edge px

// Phase fractions within each step's scroll range
const ARRIVE = 0.10;  // dot+text appear at this frac (step 0 = 0)
const DEPART = 0.78;  // dot+text start hiding at this frac

function getPhaseInfo(progress: number) {
  if (progress >= 1) return { stepIdx: N - 1, sitting: true };
  const raw     = progress * N;
  const stepIdx = Math.min(Math.floor(raw), N - 1);
  const frac    = raw - Math.floor(raw);
  const arrive  = stepIdx === 0 ? 0 : ARRIVE; // first step: immediate
  const sitting = frac >= arrive && frac < DEPART;
  return { stepIdx, sitting };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProcessSection() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);

  const dotWrapRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const dotBodyRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const activeRef       = useRef({ dotIdx: -1, textIdx: -1, stepIdx: -1 });
  const prevProgressRef = useRef(0);
  const pulseAnimRef    = useRef<gsap.core.Tween | null>(null);
  const wipeAnimRef     = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrap    = wrapRef.current;
    const bg      = bgRef.current;
    const overlay = overlayRef.current;
    const svg     = svgRef.current;
    const path    = pathRef.current;
    if (!wrap || !bg || !overlay || !svg || !path) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ── Dot pixel positions ───────────────────────────────────────────────────
    const dots = DOT_Y_PCTS.map(pct => ({
      x: vw * DOT_X_VW / 100,
      y: vh * pct / 100,
    }));

    // ── SVG sizing ───────────────────────────────────────────────────────────
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    svg.setAttribute('width',  String(vw));
    svg.setAttribute('height', String(vh));

    // ── SVG mask — black circles at dot centres cut line gaps ────────────────
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('id', 'ps-mask');
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('x', '-200'); bgRect.setAttribute('y', '-200');
    bgRect.setAttribute('width', String(vw + 400));
    bgRect.setAttribute('height', String(vh + 400));
    bgRect.setAttribute('fill', 'white');
    mask.appendChild(bgRect);
    dots.forEach(d => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', String(d.x));
      c.setAttribute('cy', String(d.y));
      c.setAttribute('r',  String(DOT_R + LINE_GAP));
      c.setAttribute('fill', 'black');
      mask.appendChild(c);
    });
    defs.appendChild(mask);
    svg.insertBefore(defs, svg.firstChild);
    path.setAttribute('mask', 'url(#ps-mask)');

    // ── Serpent S-curve path ──────────────────────────────────────────────────
    let d = `M ${dots[0].x},${dots[0].y}`;
    for (let i = 1; i < dots.length; i++) {
      const p   = dots[i - 1];
      const q   = dots[i];
      const seg = q.y - p.y;
      const bul = vw * 0.055 * (i % 2 === 1 ? 1 : -1);
      d += ` C ${p.x + bul},${p.y + seg * 0.45} ${q.x + bul},${q.y - seg * 0.45} ${q.x},${q.y}`;
    }
    path.setAttribute('d', d);
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    // ── Position dot DOM elements ─────────────────────────────────────────────
    dotWrapRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.left = `${dots[i].x - DOT_R}px`;
      el.style.top  = `${dots[i].y - DOT_R}px`;
    });

    // ── Initial state ─────────────────────────────────────────────────────────
    bg.style.backgroundColor = DARK;
    // dots / texts start invisible — set via inline style in JSX

    // ── Animation helpers ─────────────────────────────────────────────────────

    function showDot(idx: number) {
      const el    = dotWrapRefs.current[idx];
      const body  = dotBodyRefs.current[idx];
      const pRing = pulseRefs.current[idx];
      if (!el) return;
      const sc = SCHEMES[idx];
      if (body)  { body.style.backgroundColor = sc.dotFill; body.style.color = sc.dotNum; }
      if (pRing) { pRing.style.borderColor = sc.dotFill; }
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)' });
      if (pulseAnimRef.current) pulseAnimRef.current.kill();
      if (pRing) {
        pulseAnimRef.current = gsap.fromTo(
          pRing,
          { scale: 1, opacity: 0.65 },
          { scale: 3.2, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out', delay: 0.3 }
        );
      }
    }

    function hideDot(idx: number) {
      const el = dotWrapRefs.current[idx];
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 0, scale: 0.6, duration: 0.38, ease: 'power2.in' });
      if (pulseAnimRef.current) { pulseAnimRef.current.kill(); pulseAnimRef.current = null; }
    }

    function showText(idx: number, dir: number) {
      const el = textRefs.current[idx];
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.fromTo(el,
        { opacity: 0, y: dir > 0 ? 85 : -85, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.92, ease: 'expo.out', delay: 0.1 }
      );
    }

    function hideText(idx: number, dir: number) {
      const el = textRefs.current[idx];
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        y: dir > 0 ? -85 : 85,
        scale: dir > 0 ? 1.04 : 0.96,
        duration: 0.46,
        ease: 'expo.in'
      });
    }

    // Diagonal wipe: overlay sweeps from right-to-left with angled leading edge.
    // Forward  → top-left corner arrives first (top-leading diagonal).
    // Backward → bottom-left corner arrives first (bottom-leading diagonal).
    function doColorWipe(toScheme: typeof SCHEMES[0], dir: number) {
      if (wipeAnimRef.current) wipeAnimRef.current.kill();
      overlay.style.backgroundColor = toScheme.bg;
      overlay.style.clipPath = 'polygon(110% -5%, 110% -5%, 110% 105%, 110% 105%)';

      const prx = { t: 0 };
      wipeAnimRef.current = gsap.to(prx, {
        t: 1,
        duration: 0.88,
        ease: 'expo.inOut',
        onUpdate() {
          const t = prx.t;
          // The "leading" corner reaches left edge first; the other lags by 0.3
          const fastT = t;
          const slowT = Math.max(0, (t - 0.3) / 0.7);
          const topX  = (dir > 0 ? (1 - fastT) : (1 - slowT)) * 110;
          const botX  = (dir > 0 ? (1 - slowT) : (1 - fastT)) * 110;
          overlay.style.clipPath =
            `polygon(${topX}% -5%, 110% -5%, 110% 105%, ${botX}% 105%)`;
        },
        onComplete() {
          bg.style.backgroundColor = toScheme.bg;
          overlay.style.clipPath = 'polygon(110% -5%, 110% -5%, 110% 105%, 110% 105%)';
        }
      });
    }

    // ── Main ScrollTrigger ────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const p   = self.progress;
        const dir = p >= prevProgressRef.current ? 1 : -1;
        prevProgressRef.current = p;

        // Serpent draw
        path.style.strokeDashoffset = String(len * (1 - p));

        const { stepIdx, sitting } = getPhaseInfo(p);
        const newDotIdx  = sitting ? stepIdx : -1;
        const newTextIdx = sitting ? stepIdx : -1;
        const prev = activeRef.current;

        // Background colour transition on step change
        if (stepIdx !== prev.stepIdx) {
          doColorWipe(SCHEMES[stepIdx], dir);
          prev.stepIdx = stepIdx;
        }

        // Dot visibility
        if (newDotIdx !== prev.dotIdx) {
          if (prev.dotIdx  >= 0) hideDot(prev.dotIdx);
          if (newDotIdx    >= 0) showDot(newDotIdx);
          prev.dotIdx = newDotIdx;
        }

        // Text visibility
        if (newTextIdx !== prev.textIdx) {
          if (prev.textIdx >= 0) hideText(prev.textIdx, dir);
          if (newTextIdx   >= 0) showText(newTextIdx, dir);
          prev.textIdx = newTextIdx;
        }
      },
    });

    return () => {
      st.kill();
      pulseAnimRef.current?.kill();
      wipeAnimRef.current?.kill();
    };
  }, []);

  // ── JSX ──────────────────────────────────────────────────────────────────────

  return (
    <div ref={wrapRef} style={{ height: '600vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Base background — colour set by GSAP */}
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/*
          Wipe overlay — z-index 2.
          Starts collapsed off-screen right so it's invisible.
          GSAP animates clip-path diagonally to reveal new scheme colour.
          After completion bg inherits the colour and overlay resets.
        */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute', inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            clipPath: 'polygon(110% -5%, 110% -5%, 110% 105%, 110% 105%)',
          }}
        />

        {/*
          Serpent SVG — z-index 5, behind dots.
          mix-blend-mode:difference auto-inverts #fff stroke on dark/bone bg.
          SVG mask (ps-mask) cuts circular gaps at each dot centre so the line
          visually passes behind the dot with a clean margin.
        */}
        <svg
          ref={svgRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            pointerEvents: 'none', zIndex: 5,
            overflow: 'visible',
            mixBlendMode: 'difference',
          }}
        >
          <path
            ref={pathRef}
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Dots — z-index 10, each starts invisible */}
        {STEPS.map((_, i) => (
          <div
            key={i}
            ref={el => { dotWrapRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              width:  DOT_R * 2,
              height: DOT_R * 2,
              zIndex: 10,
              opacity: 0,
            }}
          >
            {/* Expanding pulse ring */}
            <div
              ref={el => { pulseRefs.current[i] = el; }}
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: `2px solid ${BONE}`,
                transformOrigin: 'center',
                pointerEvents: 'none',
                opacity: 0,
              }}
            />
            {/* Dot body */}
            <div
              ref={el => { dotBodyRefs.current[i] = el; }}
              style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%',
                borderRadius: '50%',
                background: BONE,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Colitez', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: DARK,
                userSelect: 'none',
              }}
            >
              {i + 1}
            </div>
          </div>
        ))}

        {/* Text panels — z-index 20, each starts invisible */}
        {STEPS.map((text, i) => (
          <div
            key={i}
            ref={el => { textRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              left:      `calc(${DOT_X_VW}vw + ${DOT_R * 2 + 56}px)`,
              right:     '7vw',
              top:       '50%',
              transform: 'translateY(-50%)',
              zIndex:    20,
              opacity:   0,
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: "'Colitez', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.7rem, 0.95vw, 0.95rem)',
              letterSpacing: '0.3em',
              color: i % 2 === 0 ? BONE : DARK,
              opacity: 0.22,
              marginBottom: '0.55em',
              textTransform: 'uppercase',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{
              fontFamily: "'Colitez', serif",
              fontStyle: 'italic',
              fontWeight: 'normal',
              fontSize: 'clamp(3.4rem, 6.5vw, 9.5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              margin: 0,
              color: i % 2 === 0 ? BONE : DARK,
            }}>
              {text}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
