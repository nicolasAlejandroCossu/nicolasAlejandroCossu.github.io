'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroConfig } from './config';
import LightRays from './LightRays';
import SunGlow from './SunGlow';
import HeroText from './HeroText';
import HeroScrollAnimation from './HeroScrollAnimation';

export default function HeroSection() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const offsets = useRef(heroConfig.layers.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const { smoothing, maxOffset } = heroConfig.parallax;

    layerRefs.current.forEach((el) => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50 });
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      mouse.current.y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouse.current.x = (t.clientX - window.innerWidth / 2) / window.innerWidth;
      mouse.current.y = (t.clientY - window.innerHeight / 2) / window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const tick = () => {
      heroConfig.layers.forEach((layer, i) => {
        const tx = mouse.current.x * layer.parallaxFactor * maxOffset;
        const ty = mouse.current.y * layer.parallaxFactor * maxOffset;

        offsets.current[i].x += (tx - offsets.current[i].x) * smoothing;
        offsets.current[i].y += (ty - offsets.current[i].y) * smoothing;

        const el = layerRefs.current[i];
        if (el) gsap.set(el, { x: offsets.current[i].x, y: offsets.current[i].y });
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <section data-hero-section className="relative w-screen h-screen overflow-hidden bg-black">

      {/* ── Parallax image layers ──────────────────────────────────────────── */}
      {heroConfig.layers.map((layer, i) => !layer.visible ? null : (
        <div
          key={layer.id}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: layer.width,
            height: layer.height,
            zIndex: layer.zIndex,
            filter: [
              layer.depthBlur > 0 ? `blur(${layer.depthBlur}px)` : '',
              `drop-shadow(${layer.shadowOffset.x}px ${layer.shadowOffset.y}px ${layer.shadowBlur}px ${layer.shadowColor})`,
            ].filter(Boolean).join(' '),
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layer.src}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: layer.objectFit,
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </div>
      ))}

      {/* ── Depth overlays — dark gradient at the base between each layer pair ── */}
      {heroConfig.depthOverlays.map((overlay, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: overlay.zIndex,
            background: `linear-gradient(to top,
              rgba(0, 4, 2, ${overlay.opacity}) 0%,
              rgba(0, 4, 2, ${overlay.opacity * 0.4}) ${(1 - overlay.reach) * 100 * 0.5}%,
              transparent ${(1 - overlay.reach) * 100}%
            )`,
          }}
        />
      ))}

      {/* ── Sun glow above Layer3 ────────────────────────────────────────────── */}
      {heroConfig.sun.enabled && (
        <SunGlow config={heroConfig.sun} />
      )}

      {/* ── Light rays (disabled by default — toggle in config.ts) ─────────── */}
      {heroConfig.lightRay.enabled && (
        <LightRays config={heroConfig.lightRay} />
      )}

      {/* ── Hero text ────────────────────────────────────────────────────── */}
      <HeroText />

      {/* ── Scroll wave animation ─────────────────────────────────────────── */}
      <HeroScrollAnimation />

      {/* ── Global dark overlay — adjust opacity in config.ts ────────────── */}
      {heroConfig.darkOverlay.enabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: heroConfig.darkOverlay.zIndex,
            backgroundColor: `rgba(0,0,0,${heroConfig.darkOverlay.opacity})`,
          }}
        />
      )}
    </section>
  );
}
