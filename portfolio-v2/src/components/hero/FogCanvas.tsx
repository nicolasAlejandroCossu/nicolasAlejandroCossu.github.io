'use client';

import { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';
import type { FogBandConfig, FogConfig } from './config';

interface Props {
  band: FogBandConfig;
  fogConfig: FogConfig;
}

export default function FogCanvas({ band, fogConfig }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  // Noise instance is stable for the lifetime of this component
  const noise2D = useRef(createNoise2D());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const { color, noiseScale, noiseSpeed, globalIntensity } = fogConfig;
    const [cr, cg, cb] = color;
    const nfn = noise2D.current;

    // Number of vertical columns to sample — higher = smoother horizontal variation
    const COLS = 90;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const t = timeRef.current;
      const colW = width / COLS;

      for (let c = 0; c < COLS; c++) {
        const nx = c / COLS;

        // Two octaves of 2D noise for organic, non-repeating movement
        const n1 =
          nfn(
            nx * noiseScale * 320 + t * band.scrollSpeed * 0.8,
            t * noiseSpeed * 320
          ) *
            0.5 +
          0.5;
        const n2 =
          nfn(
            nx * noiseScale * 680 + t * band.scrollSpeed * 0.55 + 4.7,
            t * noiseSpeed * 500 + 2.9
          ) *
            0.5 +
          0.5;

        // Blend octaves (first octave dominates shape, second adds fine turbulence)
        const n = n1 * 0.68 + n2 * 0.32;

        // Vertical position and spread vary with noise → wavy fog edge
        const yShift = (n - 0.5) * 0.07;
        const yCtr = (band.yCenter + yShift) * height;
        const ySprd = band.ySpread * height * (0.78 + n * 0.44);
        const opacity = band.baseOpacity * globalIntensity * n;

        if (opacity < 0.005) continue;

        const grad = ctx.createLinearGradient(0, yCtr - ySprd, 0, yCtr + ySprd);
        grad.addColorStop(0.00, `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(0.30, `rgba(${cr},${cg},${cb},${opacity * 0.6})`);
        grad.addColorStop(0.50, `rgba(${cr},${cg},${cb},${opacity})`);
        grad.addColorStop(0.70, `rgba(${cr},${cg},${cb},${opacity * 0.6})`);
        grad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);

        ctx.fillStyle = grad;
        // Overlap columns by 1px on each side to avoid visible seams
        ctx.fillRect(c * colW - 1, yCtr - ySprd, colW + 2, ySprd * 2);
      }

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, [band, fogConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0, zIndex: band.zIndex }}
    />
  );
}
