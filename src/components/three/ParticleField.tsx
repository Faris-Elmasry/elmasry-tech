"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Sphere,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { getShape, type ShapeName } from "@/components/three/shapes";

/*
 * One fixed WebGL canvas behind the whole site. Thousands of GPU particles
 * morph into the shape requested by whichever [data-shape] section sits in the
 * middle of the viewport (globe → phone → dashboard → brain → gears → bag …).
 *
 * Section attributes:
 *   data-shape="globe"        shape to form
 *   data-shape-x="0.35"       horizontal offset as a fraction of viewport width (RTL mirrors it)
 *   data-shape-scale="0.8"    scale
 *   data-shape-dim="0.4"      opacity multiplier (to sit quietly behind text)
 */

const vertex = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRand;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFlow;
  uniform vec3 uMouse;
  varying float vRand;
  varying float vDepth;

  float easeInOut(float t) { return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0; }

  void main() {
    float m = easeInOut(clamp(uMix, 0.0, 1.0));
    // Stagger: each particle starts its trip at a slightly different time.
    float local = clamp(m * 1.35 - aRand * 0.35, 0.0, 1.0);
    vec3 p = mix(aFrom, aTo, local);

    // Mid-flight turbulence makes the morph feel like a swarm, not a tween.
    float turb = sin(local * 3.14159) * 0.9;
    float t = uTime * 0.6;
    vec3 flow = vec3(
      sin(t + p.y * 1.7 + aRand * 6.28),
      cos(t * 0.8 + p.z * 1.9 + aRand * 4.0),
      sin(t * 0.7 + p.x * 1.6)
    );
    p += flow * (0.035 * uFlow + turb * 0.55);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Pointer repulsion in view space.
    vec2 d = mv.xy - uMouse.xy;
    float dist = length(d);
    float push = (1.0 - smoothstep(0.0, 1.3, dist)) * 0.55 * uFlow;
    mv.xy += normalize(d + 0.0001) * push;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRand * 0.9) * uPixelRatio * (9.0 / -mv.z);
    vRand = aRand;
    vDepth = smoothstep(-13.0, -6.0, mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vRand;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r);
    vec3 color = vRand > 0.9 ? uAccent : uColor;
    gl_FragColor = vec4(color, alpha * uOpacity * (0.25 + vDepth * 0.75) * (vRand > 0.9 ? 1.0 : 0.75));
  }
`;

interface Target {
  shape: ShapeName;
  x: number;
  scale: number;
  dim: number;
}

// Outside any [data-shape] section the field fades out completely (hero-only by design).
const DEFAULT_TARGET: Target = { shape: "code", x: 0.25, scale: 0.85, dim: 0 };

function readTarget(el: Element, rtl: boolean): Target {
  const ds = (el as HTMLElement).dataset;
  const x = parseFloat(ds.shapeX ?? "0") || 0;
  return {
    shape: (ds.shape as ShapeName) || "scatter",
    x: rtl ? -x : x,
    scale: parseFloat(ds.shapeScale ?? "1") || 1,
    dim: parseFloat(ds.shapeDim ?? "1") || 1,
  };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const rescanRef = useRef<() => void>(() => {});

  useEffect(() => {
    // Re-collect [data-shape] sections after client-side navigation.
    const id = window.setTimeout(() => rescanRef.current(), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const COUNT = small ? 4000 : 9000;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL — the page still works, just without the field.
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const geometry = new BufferGeometry();
    const from = new Float32Array(getShape("scatter", COUNT));
    const to = new Float32Array(getShape("scatter", COUNT));
    const rand = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rand[i] = Math.random();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(COUNT * 3), 3));
    geometry.setAttribute("aFrom", new BufferAttribute(from, 3));
    geometry.setAttribute("aTo", new BufferAttribute(to, 3));
    geometry.setAttribute("aRand", new BufferAttribute(rand, 1));
    geometry.boundingSphere = new Sphere(new Vector3(), 20);

    const uniforms = {
      uMix: { value: 1 },
      uTime: { value: 0 },
      uSize: { value: small ? 3 : 2.8 },
      uPixelRatio: { value: pixelRatio },
      uFlow: { value: reduce ? 0 : 1 },
      uMouse: { value: new Vector3(99, 99, 0) },
      uColor: { value: new Color("#edeae3") },
      uAccent: { value: new Color("#ff5b1f") },
      uOpacity: { value: 0 },
    };

    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    const points = new Points(geometry, material);
    const group = new Group();
    group.add(points);
    scene.add(group);

    // ── State ──
    const rtl = document.documentElement.dir === "rtl";
    let sections: Element[] = [];
    let current: Target = { ...DEFAULT_TARGET, shape: "scatter" };
    let currentShape: ShapeName = "scatter";
    const live = { x: 0, scale: 1, dim: 0.5 };
    let width = 1;
    let height = 1;

    const rescan = () => {
      sections = Array.from(document.querySelectorAll("[data-shape]"));
      pick(true);
    };
    rescanRef.current = rescan;

    function morphTo(shape: ShapeName) {
      if (shape === currentShape) return;
      // Freeze the current blended positions as the new starting point.
      const m = Math.min(Math.max(uniforms.uMix.value, 0), 1);
      const e = m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2;
      for (let i = 0; i < COUNT; i++) {
        const local = Math.min(Math.max(e * 1.35 - rand[i] * 0.35, 0), 1);
        for (let k = 0; k < 3; k++) {
          const j = i * 3 + k;
          from[j] = from[j] + (to[j] - from[j]) * local;
        }
      }
      to.set(getShape(shape, COUNT));
      geometry.attributes.aFrom.needsUpdate = true;
      geometry.attributes.aTo.needsUpdate = true;
      uniforms.uMix.value = reduce ? 1 : 0;
      currentShape = shape;
    }

    function pick(force = false) {
      const mid = window.innerHeight / 2;
      let next: Target | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          next = readTarget(el, rtl);
          break;
        }
      }
      next ??= DEFAULT_TARGET;
      // On narrow screens the text spans the full width: centre the sculpture
      // and keep it faint so copy stays readable.
      if (small) next = { ...next, x: 0, dim: next.dim * 0.4 };
      if (force || next.shape !== current.shape || next.x !== current.x || next.scale !== current.scale || next.dim !== current.dim) {
        current = next;
        morphTo(next.shape);
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // ── Pointer → view-space position on the z=0 plane ──
    const ndc = new Vector2(99, 99);
    const ray = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const hit = new Vector3();
    const onPointer = (e: PointerEvent) => {
      ndc.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
    };
    const onLeave = () => ndc.set(99, 99);

    // ── Scroll velocity adds spin ──
    let lastY = window.scrollY;
    let spin = 0;

    let last = performance.now();
    let frameNo = 0;
    let raf = 0;
    let running = true;

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;

      if (++frameNo % 4 === 0) pick();

      // Morph progress (~1.5s)
      if (uniforms.uMix.value < 1) uniforms.uMix.value = Math.min(1, uniforms.uMix.value + dt / 1.5);

      // Ease layout toward the current section's target
      const k = 1 - Math.pow(0.04, dt);
      live.x += (current.x - live.x) * k;
      live.scale += (current.scale - live.scale) * k;
      live.dim += (current.dim - live.dim) * k;
      const visibleWidth = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
      group.position.x = live.x * visibleWidth;
      const fit = Math.min(1, camera.aspect / 1.1); // shrink on portrait screens
      group.scale.setScalar(live.scale * (0.55 + 0.45 * fit));
      uniforms.uOpacity.value += (live.dim - uniforms.uOpacity.value) * k;

      // Rotation: idle drift + scroll impulse + pointer parallax
      const y = window.scrollY;
      spin += (y - lastY) * 0.0006;
      lastY = y;
      spin *= 0.92;
      if (!reduce) {
        group.rotation.y += 0.0016 + spin;
        const tx = ndc.x === 99 ? 0 : ndc.y * 0.12;
        group.rotation.x += (tx - group.rotation.x) * 0.04;
      }

      // Pointer
      if (ndc.x !== 99) {
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(plane, hit)) {
          hit.applyMatrix4(camera.matrixWorldInverse);
          uniforms.uMouse.value.copy(hit);
        }
      } else {
        uniforms.uMouse.value.set(99, 99, 0);
      }

      // Skip GPU work entirely while the field is invisible.
      if (uniforms.uOpacity.value > 0.005) renderer.render(scene, camera);
      else if (current.dim === 0) renderer.clear();
    }

    const onVisibility = () => {
      running = !document.hidden;
      last = performance.now();
    };

    resize();
    rescan();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-full"
    />
  );
}
