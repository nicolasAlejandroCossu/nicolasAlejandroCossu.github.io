'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const timeRef   = useRef(0);
  const rafRef    = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width  = w; canvas.height = h;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const frame = () => {
      const w = canvas.width, h = canvas.height;
      const scroll = scrollRef.current, t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      const wp = Math.max(0, Math.min(1, (scroll - 0.12) / 0.82));

      if (wp > 0) {
        const baseY = h * (1.05 - wp * 1.15);
        const amp   = 44 + 16 * Math.sin(t * 0.30);

        // Overshoot by 100px on all sides so blur has no visible boundary edge.
        const OX = 100;
        const pts: string[] = [`M${-OX},${h + OX}`];
        for (let x = -OX; x <= w + OX; x += 6) {
          const y = baseY
            + amp * Math.sin(x * 0.0038 + t * 0.85)
            + amp * 0.42 * Math.sin(x * 0.0086 + t * 1.46 + 1.3);
          pts.push(`L${x},${y}`);
        }
        pts.push(`L${w + OX},${h + OX}`, 'Z');
        const wavePath = new Path2D(pts.join(' '));

        ctx.save();
        ctx.filter = 'blur(20px)';

        const vg = ctx.createLinearGradient(0, baseY - amp * 2.2, 0, baseY + amp);
        vg.addColorStop(0,    'rgba(0,0,0,0)');
        vg.addColorStop(0.48, 'rgba(0,0,0,0.92)');
        vg.addColorStop(1,    'rgba(0,0,0,1)');
        ctx.fillStyle = vg;
        ctx.fill(wavePath);
        ctx.restore();
      }

      timeRef.current += 0.016;
    };

    const loop = () => {
      frame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    let heroTL: gsap.core.Timeline | undefined;

    const wrapper = document.getElementById('hero-scroll-wrap');
    if (wrapper) {
      heroTL = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          onUpdate: (self) => { scrollRef.current = self.progress; },
        },
      });

      heroTL
        .to('[data-hero-nav]', {
          y: 75, opacity: 0, ease: 'power2.in', duration: 0.28,
        }, 0.14)
        .to('[data-hero-name-block]', {
          y: '-40vh', opacity: 0, ease: 'power3.inOut', duration: 0.42,
        }, 0.62);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
      heroTL?.scrollTrigger?.kill();
      heroTL?.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0, zIndex: 76 }}
    />
  );
}
