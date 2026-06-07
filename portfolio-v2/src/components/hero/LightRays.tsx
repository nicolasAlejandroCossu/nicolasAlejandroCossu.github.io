'use client';

import { useEffect, useRef } from 'react';
import type { LightRayConfig } from './config';

interface Props {
  config: LightRayConfig;
}

export default function LightRays({ config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const {
      source,
      color,
      intensity,
      rayCount,
      spreadAngle,
      baseAngle,
      rayLength,
      flickerSpeed,
      flickerAmount,
    } = config;

    const cr = color[0], cg = color[1], cb = color[2];

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const t = timeRef.current;
      const sx = source.x * width;
      const sy = source.y * height;
      const diagonal = Math.sqrt(width * width + height * height);
      const rayLen = rayLength * diagonal;

      const baseAngleRad = (baseAngle * Math.PI) / 180;
      const halfSpread = (spreadAngle * Math.PI) / 180 / 2;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // ── Ambient glow sphere at source ──────────────────────────────────────
      const glowRadius = diagonal * 0.38;
      const glowIntensity =
        intensity * (0.85 + Math.sin(t * flickerSpeed * 0.5) * 0.15);
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
      glow.addColorStop(0, `rgba(${cr},${cg},${cb},${glowIntensity * 0.55})`);
      glow.addColorStop(0.05, `rgba(${cr},${cg},${cb},${glowIntensity * 0.30})`);
      glow.addColorStop(0.18, `rgba(${cr},${cg},${cb},${glowIntensity * 0.10})`);
      glow.addColorStop(0.40, `rgba(${cr},${cg},${cb},${glowIntensity * 0.03})`);
      glow.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // ── Individual rays ────────────────────────────────────────────────────
      for (let i = 0; i < rayCount; i++) {
        const frac = rayCount > 1 ? i / (rayCount - 1) : 0.5; // 0..1

        // Angle for this ray within the spread fan
        const rawAngle = baseAngleRad - halfSpread + frac * halfSpread * 2;

        // Subtle sway per ray (different frequency per ray index)
        const sway =
          Math.sin(t * flickerSpeed * 0.28 + i * 1.91) * 0.018 +
          Math.sin(t * flickerSpeed * 0.13 + i * 3.07) * 0.009;
        const rayAngle = rawAngle + sway;

        // Per-ray flicker composed of two sine waves
        const flicker1 = Math.sin(t * flickerSpeed + i * 1.73) * 0.5 + 0.5;
        const flicker2 = Math.sin(t * flickerSpeed * 0.62 + i * 2.81 + 2.1) * 0.5 + 0.5;
        const flickerVal = flicker1 * 0.6 + flicker2 * 0.4;
        const flickerMult = 1 - flickerAmount + flickerAmount * flickerVal;

        // Center rays brighter than edge rays (bell-curve falloff)
        const centerBell = Math.max(0, 1 - Math.abs(frac - 0.5) * 2);
        const rayOpacity = intensity * flickerMult * (0.35 + centerBell * 0.65);

        // Endpoint of the ray
        const ex = sx + Math.cos(rayAngle) * rayLen;
        const ey = sy + Math.sin(rayAngle) * rayLen;

        // Ray widens from source (point) to tip
        const tipHalfWidth = rayLen * 0.055 * (0.5 + centerBell * 0.8);
        const perpAngle = rayAngle - Math.PI / 2;

        // Gradient along the ray direction
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0.00, `rgba(${cr},${cg},${cb},${rayOpacity * 0.95})`);
        grad.addColorStop(0.12, `rgba(${cr},${cg},${cb},${rayOpacity * 0.80})`);
        grad.addColorStop(0.40, `rgba(${cr},${cg},${cb},${rayOpacity * 0.30})`);
        grad.addColorStop(0.75, `rgba(${cr},${cg},${cb},${rayOpacity * 0.08})`);
        grad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);

        // Triangle: apex at source, base at tip
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(
          ex + Math.cos(perpAngle) * tipHalfWidth,
          ey + Math.sin(perpAngle) * tipHalfWidth
        );
        ctx.lineTo(
          ex - Math.cos(perpAngle) * tipHalfWidth,
          ey - Math.sin(perpAngle) * tipHalfWidth
        );
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

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
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: config.zIndex,
        mixBlendMode: 'screen',
      }}
    />
  );
}
