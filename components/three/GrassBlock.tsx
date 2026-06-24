"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Floating Minecraft grass block, loaded from /public/models. It bobs gently
 * with a tiny sway (no full spin). Vanilla Three.js, lazy-loaded, reduced-motion
 * safe. Textures are forced to nearest-filter so the pixels stay crisp.
 */
const MODEL_URL = "/models/minecraft_grass_block.glb";
// Fraction of the frame the block's bounding SPHERE fills. Sphere-based so the
// rotating cube's corners always stay inside the frame (never clipped); the bob
// uses the leftover margin. Bump toward ~0.95 for bigger, down for more air.
const FRAME_FILL = 0.92;

export default function GrassBlock() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    el.appendChild(canvas);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    cam.position.set(3.1, 2.45, 3.55);
    cam.lookAt(0, 0, 0);

    // Soft, fairly even lighting so the pixel textures read flat & crisp.
    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.55);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(-4, 1, -2);
    scene.add(fill);

    // The block lives inside a group we animate, so centering/scaling the model
    // never fights the bob/sway transform.
    const group = new THREE.Group();
    scene.add(group);

    let model: THREE.Object3D | null = null;
    let disposed = false;

    const renderFrame = () => renderer.render(scene, cam);

    // Scale the model so its bounding sphere fills FRAME_FILL of the (square)
    // frustum, then recenter — corners stay inside the frame at any rotation.
    const fitModel = () => {
      if (!model) return;
      model.scale.setScalar(1);
      model.position.set(0, 0, 0);
      const r0 =
        new THREE.Box3()
          .setFromObject(model)
          .getBoundingSphere(new THREE.Sphere()).radius || 1;
      const dist = cam.position.length(); // camera looks at the origin
      const halfV = Math.tan((cam.fov * Math.PI) / 180 / 2) * dist;
      const half = Math.min(halfV, halfV * cam.aspect); // smaller frame axis
      model.scale.setScalar((half * FRAME_FILL) / r0);
      const c = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
      model.position.sub(c);
    };

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;

        // Crunchy pixel look: nearest filtering, no mipmap blur.
        model.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (!mesh.isMesh) return;
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((mat) => {
            const map = (mat as THREE.MeshStandardMaterial).map;
            if (map) {
              map.magFilter = THREE.NearestFilter;
              map.minFilter = THREE.NearestFilter;
              map.generateMipmaps = false;
              map.needsUpdate = true;
            }
          });
        });

        group.add(model);
        fitModel();
        if (reduce) {
          // Static, slightly turned pose for a nicer silhouette.
          group.rotation.y = 0.5;
          group.rotation.x = 0.04;
          renderFrame();
        }
      },
      undefined,
      () => {
        /* model failed to load — canvas just stays empty, no crash */
      },
    );

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return; // not laid out yet — wait for a real size
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      fitModel();
      renderFrame();
    };
    // A ResizeObserver catches the container's real size on mount AND any layout
    // change that doesn't fire a window 'resize' — e.g. the story deck switching
    // from in-flow to fixed on mobile, or the URL bar collapsing. Those left the
    // canvas sized wrong (broken/blank) with a window-only listener.
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Recover gracefully if a mobile GPU drops the WebGL context.
    const onLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onLost, false);

    const clock = new THREE.Clock();
    let raf = 0;
    let last = -1;
    const FRAME_MS = 1000 / 30; // a slow bob — 30fps is imperceptible from 60

    // Gate the loop on tab visibility AND on-screen presence (and never animate
    // under reduced motion). Off-screen, the second WebGL context goes idle.
    let tabVisible = !document.hidden;
    let onScreen = true;
    const shouldRun = () => !reduce && tabVisible && onScreen;

    const frame = (now: number) => {
      if (!shouldRun()) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      if (last >= 0 && now - last < FRAME_MS) return; // throttle to ~30fps
      last = now;
      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 0.9) * 0.07;
      group.rotation.y = Math.sin(t * 0.45) * 0.12;
      group.rotation.x = 0.02 + Math.sin(t * 0.6) * 0.04;
      renderFrame();
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

    const onVis = () => {
      tabVisible = !document.hidden;
      tabVisible ? start() : stop();
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      document.removeEventListener("visibilitychange", onVis);
      model?.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        mats.forEach((mat) => {
          const m = mat as THREE.MeshStandardMaterial;
          m.map?.dispose();
          m.dispose();
        });
      });
      renderer.dispose();
      if (canvas.parentNode === el) el.removeChild(canvas);
    };
  }, []);

  return <div ref={mount} className="h-full w-full" aria-hidden />;
}
