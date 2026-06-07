'use client';

import { useEffect, useRef } from 'react';
import type { SunConfig } from './config';

export default function SunGlow({ config }: { config: SunConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set both the bitmap size AND the CSS pixel size to the same value.
    // This avoids any CSS scaling mismatch — canvas coords map 1:1 to screen pixels.
    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const { position, color, intensity, pulseSpeed, pulseAmount } = config;
    const [cr, cg, cb] = color;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const t = timeRef.current;
      const cx = position.x * w;
      const cy = position.y * h;

      const pulse = 1 + Math.sin(t * pulseSpeed) * pulseAmount;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // ── 1. Wide atmospheric scatter ──────────────────────────────────────
      const outerR = config.outerGlowRadius * pulse;
      const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
      outerGrad.addColorStop(0.00, `rgba(${cr},${cg},${cb},${intensity * 0.18})`);
      outerGrad.addColorStop(0.35, `rgba(${cr},${cg},${cb},${intensity * 0.07})`);
      outerGrad.addColorStop(0.70, `rgba(${cr},${cg},${cb},${intensity * 0.02})`);
      outerGrad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, w, h);

      // ── 2. Warm inner halo ───────────────────────────────────────────────
      const innerR = config.innerGlowRadius * pulse;
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
      innerGrad.addColorStop(0.00, `rgba(${cr},${cg},${cb},${intensity * 0.90})`);
      innerGrad.addColorStop(0.25, `rgba(${cr},${cg},${cb},${intensity * 0.55})`);
      innerGrad.addColorStop(0.60, `rgba(${cr},${cg},${cb},${intensity * 0.15})`);
      innerGrad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.fill();

      // ── 3. Bright solar disc ─────────────────────────────────────────────
      const coreR = config.coreRadius * pulse;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0.00, `rgba(255,255,255,${intensity})`);
      coreGrad.addColorStop(0.40, `rgba(${cr},${cg},${cb},${intensity * 0.95})`);
      coreGrad.addColorStop(0.80, `rgba(${cr},${cg},${cb},${intensity * 0.40})`);
      coreGrad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        top: 0,
        left: 0,
        zIndex: config.zIndex,
        mixBlendMode: 'screen',
      }}
    />
  );
}
