// Procedural point clouds for the particle field. Every shape returns exactly
// `count` xyz triplets (Float32Array) roughly inside a radius-2.2 volume, so the
// shader can morph any shape into any other one point-for-point.

export type ShapeName =
  | "code"
  | "sphere"
  | "globe"
  | "phone"
  | "dashboard"
  | "brain"
  | "gears"
  | "bag"
  | "ring"
  | "grid"
  | "scatter";

type Rand = () => number;

function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

function fill(count: number, seed: number, pick: (r: Rand, i: number) => [number, number, number]) {
  const r = mulberry32(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [x, y, z] = pick(r, i);
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function onSphere(r: Rand, radius: number): [number, number, number] {
  const u = r() * 2 - 1;
  const t = r() * TAU;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(t) * radius, u * radius, s * Math.sin(t) * radius];
}

/** Point on the surface of a rounded rectangle slab (phone / bag). */
function onRoundedBox(r: Rand, w: number, h: number, d: number, radius: number): [number, number, number] {
  const face = r();
  if (face < 0.8) {
    // front/back faces with rounded corners (rejection sampling)
    for (;;) {
      const x = (r() - 0.5) * w;
      const y = (r() - 0.5) * h;
      const cx = Math.max(Math.abs(x) - (w / 2 - radius), 0);
      const cy = Math.max(Math.abs(y) - (h / 2 - radius), 0);
      if (cx * cx + cy * cy <= radius * radius) return [x, y, (face < 0.4 ? 1 : -1) * (d / 2)];
    }
  }
  // rim
  const per = 2 * (w + h);
  let p = r() * per;
  const z = (r() - 0.5) * d;
  if (p < w) return [p - w / 2, h / 2, z];
  p -= w;
  if (p < h) return [w / 2, h / 2 - p, z];
  p -= h;
  if (p < w) return [w / 2 - p, -h / 2, z];
  p -= w;
  return [-w / 2, -h / 2 + p, z];
}

/** Random point inside a thick 3D stroke from (ax,ay) to (bx,by). */
function onStroke(r: Rand, ax: number, ay: number, bx: number, by: number, thickness: number, depth: number): [number, number, number] {
  const t = r();
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const o = (r() - 0.5) * thickness;
  return [ax + dx * t + nx * o, ay + dy * t + ny * o, (r() - 0.5) * depth];
}

const builders: Record<ShapeName, (count: number) => Float32Array> = {
  // Hero: the </> glyph — "we write code" — extruded as thick strokes.
  code: (count) =>
    fill(count, 11, (r, i) => {
      const k = i % 10;
      const T = 0.34; // stroke thickness
      const D = 0.55; // extrusion depth
      if (k < 2) return onStroke(r, -0.95, 1.25, -2.35, 0, T, D); // "<" upper
      if (k < 4) return onStroke(r, -2.35, 0, -0.95, -1.25, T, D); // "<" lower
      if (k < 6) return onStroke(r, 0.95, 1.25, 2.35, 0, T, D); // ">" upper
      if (k < 8) return onStroke(r, 2.35, 0, 0.95, -1.25, T, D); // ">" lower
      if (k < 9.6) return onStroke(r, 0.45, 1.7, -0.45, -1.7, T, D); // "/"
      // a few drifting "bits" around the glyph
      const [x, y, z] = onSphere(r, 1);
      const d = 2.6 + r() * 0.8;
      return [x * d, y * d * 0.7, z * d * 0.5];
    }),

  // Hero: a dense, slightly noisy sphere shell.
  sphere: (count) =>
    fill(count, 1, (r) => {
      const [x, y, z] = onSphere(r, 1.9 + (r() - 0.5) * 0.08);
      return [x, y, z];
    }),

  // Web: globe with latitude/longitude lines + scattered "cities".
  globe: (count) =>
    fill(count, 2, (r, i) => {
      const R = 1.85;
      const mode = i % 10;
      if (mode < 4) {
        // latitude rings
        const lat = (Math.floor(r() * 9) - 4) * (Math.PI / 10);
        const lon = r() * TAU;
        return [Math.cos(lat) * Math.cos(lon) * R, Math.sin(lat) * R, Math.cos(lat) * Math.sin(lon) * R];
      }
      if (mode < 8) {
        // longitude meridians
        const lon = Math.floor(r() * 12) * (TAU / 12);
        const lat = (r() - 0.5) * Math.PI;
        return [Math.cos(lat) * Math.cos(lon) * R, Math.sin(lat) * R, Math.cos(lat) * Math.sin(lon) * R];
      }
      return onSphere(r, R * (0.98 + r() * 0.04));
    }),

  // Mobile: phone shell, screen grid and a notch.
  phone: (count) =>
    fill(count, 3, (r, i) => {
      if (i % 5 === 0) {
        // screen content rows
        const row = Math.floor(r() * 9);
        const x = (r() - 0.5) * 1.6 * (row % 3 === 0 ? 0.6 : 1);
        return [x, 1.4 - row * 0.34, 0.2];
      }
      return onRoundedBox(r, 2.1, 4.2, 0.36, 0.38);
    }),

  // Custom software: a floating dashboard — panel + bar chart + data rows.
  dashboard: (count) =>
    fill(count, 4, (r, i) => {
      const m = i % 6;
      if (m < 2) {
        // panel outline
        return onRoundedBox(r, 4.2, 2.8, 0.05, 0.15);
      }
      if (m < 4) {
        // bar chart columns
        const bar = Math.floor(r() * 7);
        const h = [0.6, 1.1, 0.8, 1.5, 1.2, 1.8, 1.4][bar];
        return [-1.8 + bar * 0.32 + r() * 0.18, -1.1 + r() * h, 0.25 + r() * 0.1];
      }
      if (m < 5) {
        // line graph on the right
        const t = r();
        return [0.4 + t * 1.5, -0.3 + Math.sin(t * 7) * 0.35 + t * 0.6, 0.25];
      }
      // rows
      const row = Math.floor(r() * 4);
      return [0.4 + r() * 1.5, -0.7 - row * 0.15, 0.2];
    }),

  // AI: two-lobed neural cloud with dense "synapse" clusters.
  brain: (count) =>
    fill(count, 5, (r, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const [x, y, z] = onSphere(r, 1);
      const wobble = 1 + 0.12 * Math.sin(x * 9) * Math.cos(y * 7);
      const shell = (r() < 0.75 ? 1 : 0.55 + r() * 0.4) * wobble;
      return [side * 0.75 + x * 1.15 * shell, y * 1.35 * shell, z * 1.5 * shell];
    }),

  // Automation: two interlocking gears.
  gears: (count) =>
    fill(count, 6, (r, i) => {
      const g = i % 2;
      const teeth = g === 0 ? 12 : 9;
      const base = g === 0 ? 1.25 : 0.95;
      const a = r() * TAU;
      const tooth = Math.cos(a * teeth) > 0.35 ? 0.28 : 0;
      const radius = r() < 0.7 ? base + tooth : base * (0.35 + r() * 0.2);
      const cx = g === 0 ? -0.75 : 1.35;
      const cy = g === 0 ? 0.35 : -0.85;
      const rot = g === 0 ? 0 : Math.PI / teeth;
      return [cx + Math.cos(a + rot) * radius, cy + Math.sin(a + rot) * radius, (r() - 0.5) * 0.35];
    }),

  // E-commerce: shopping bag with handle.
  bag: (count) =>
    fill(count, 7, (r, i) => {
      if (i % 7 === 0) {
        const a = r() * Math.PI;
        return [Math.cos(a) * 0.7, 1.3 + Math.sin(a) * 0.8, (r() - 0.5) * 0.1];
      }
      const [x, y, z] = onRoundedBox(r, 2.8, 2.9, 1.2, 0.2);
      return [x * (1 - (y + 1.45) * 0.04), y - 0.25, z];
    }),

  // CTA: a wide flat ring (portal).
  ring: (count) =>
    fill(count, 8, (r) => {
      const a = r() * TAU;
      const rad = 1.9 + (r() - 0.5) * 0.5 * r();
      return [Math.cos(a) * rad, Math.sin(a) * rad, (r() - 0.5) * 0.25];
    }),

  // Systems: a tilted plane of points (like a city grid / board).
  grid: (count) =>
    fill(count, 9, (r) => {
      const gx = Math.round((r() - 0.5) * 40) / 40;
      const gz = Math.round((r() - 0.5) * 40) / 40;
      const h = Math.max(0, Math.sin(gx * 9) * Math.cos(gz * 7)) * 0.9;
      return [gx * 5.5, -1 + (r() < 0.25 ? r() * h : 0), gz * 5.5];
    }),

  // Ambient: wide loose cloud.
  scatter: (count) =>
    fill(count, 10, (r) => {
      const [x, y, z] = onSphere(r, 1);
      const d = 2.5 + r() * 3.5;
      return [x * d * 1.4, y * d * 0.8, z * d];
    }),
};

const cache = new Map<string, Float32Array>();

export function getShape(name: ShapeName, count: number): Float32Array {
  const key = `${name}:${count}`;
  let shape = cache.get(key);
  if (!shape) {
    shape = builders[name](count);
    cache.set(key, shape);
  }
  return shape;
}

export const shapeNames = Object.keys(builders) as ShapeName[];
