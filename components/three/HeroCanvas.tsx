"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero ambient surface — a slow-flowing "ink on paper" field in the Cotton →
 * oxblood palette. Vanilla Three.js (no R3F), a single full-screen shader quad.
 * Lazy-loaded (ssr:false), reduced-motion aware, pauses when tab is hidden.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_res;
  uniform vec2 u_mouse;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float asp = u_res.x / max(u_res.y, 1.0);
    vec2 p = vec2(uv.x * asp, uv.y);
    vec2 m = (u_mouse - 0.5);
    float t = u_time * 0.05;

    vec2 q = vec2(fbm(p * 1.5 + t + m * 0.3), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
    float f = fbm(p * 2.0 + q * 1.2 + m * 0.2);
    f = smoothstep(-0.2, 0.9, f);

    vec3 cotton = vec3(0.929, 0.921, 0.871);
    vec3 cherry = vec3(0.506, 0.004, 0.0);
    vec3 maroon = vec3(0.388, 0.004, 0.008);
    vec3 noir = vec3(0.106, 0.090, 0.086);

    // soft oxblood clouds drifting toward the top-right
    float grad = smoothstep(0.2, 1.0, uv.x * 0.6 + uv.y * 0.6);
    vec3 col = cotton;
    col = mix(col, maroon, f * 0.16 * grad);
    col = mix(col, cherry, pow(f, 2.0) * 0.10 * grad);
    col = mix(col, noir, pow(f, 3.0) * 0.04);

    // faint paper grain
    col += hash(uv * u_res * 0.5).x * 0.015;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = mount.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // no WebGL — static wash remains
    }
    // A full-screen fractal-noise shader is fill-rate bound, so device pixel
    // ratio is the single biggest cost lever. 1.25 stays crisp on retina while
    // roughly halving the shaded pixels vs a 1.6 cap.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    el.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let targetX = 0.5;
    let targetY = 0.5;
    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const clock = new THREE.Clock();
    let raf = 0;
    let last = -1;
    const FRAME_MS = 1000 / 30; // ambient wash — 30fps is plenty, halves shader work

    // Two independent gates: the loop only runs when the tab is visible AND the
    // hero is actually on screen. Scroll past it and the expensive shader stops.
    let tabVisible = !document.hidden;
    let onScreen = true;
    const shouldRun = () => tabVisible && onScreen;

    const frame = (now: number) => {
      if (!shouldRun()) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      if (last >= 0 && now - last < FRAME_MS) return; // throttle to ~30fps
      last = now;
      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_mouse.value.x += (targetX - uniforms.u_mouse.value.x) * 0.08;
      uniforms.u_mouse.value.y += (targetY - uniforms.u_mouse.value.y) * 0.08;
      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf || !shouldRun()) return; // guard against stacking loops
      last = -1;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    start();

    const onVisibility = () => {
      tabVisible = !document.hidden;
      tabVisible ? start() : stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === el) el.removeChild(canvas);
    };
  }, []);

  return <div ref={mount} className="absolute inset-0 h-full w-full" />;
}
