/**
 * Shared motion maths for the "Code → Product" demo.
 * One easing curve is used everywhere (scrubbed transforms, staggers,
 * counters and the few CSS transitions via EASE_CSS) so the whole story
 * moves with a single rhythm.
 */

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Linear 0→1 progress of `v` across the window [a, b]. */
export const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

/** easeInOutCubic — the only curve in this demo. */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Same curve for CSS transitions. */
export const EASE_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type RGB = readonly [number, number, number];

export const mixRGB = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export const rgb = (c: RGB) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
