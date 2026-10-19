/**
 * Geometry and pose maths for the device rig.
 *
 * Only the laptop BODY is CSS 3D (lid, deck, keys, trackpad) — it has no text,
 * so it can be scaled freely (and is never scaled above 1). Everything with
 * text — the laptop screen UI and the whole phone — is a flat 2D layer laid
 * out at its real on-screen pixel size (CSS `zoom`, integer positions), so it
 * stays crisp at any distance.
 *
 * 3D coordinates (+x right, +y down, +z toward the viewer): the lid stands on
 * the hinge and leans back LEAN degrees; the camera tilts the scene by -LEAN,
 * which leaves the screen exactly face-on once assembled.
 */

export const LW = 720; // laptop width
export const LH = 470; // lid height
export const DEPTH = 490; // keyboard deck depth
export const THICK = 15; // deck thickness
export const LEAN = 18; // lid lean-back = camera tilt

export const FW = 1120; // 3D frame width (design px)
export const FH = 820; // 3D frame height
export const SCENE_TOP = 70; // lid top inside the frame (assembled)

/** Screen UI design sizes (CSS px before zoom). */
export const SCREEN_W = 640; // laptop display (686 × 424 in the 3D panel → same 1.62 ratio)
export const PHONE_W = 320; // phone incl. frame
export const PHONE_H = 660;

export type Box = [number, number, number, number];
/** Projected laptop bounds (frame px, LTR) when exploded and when assembled — measured from the render. */
export const BOUNDS: Record<"exploded" | "solo", Box> = {
  exploded: [146, 2, 954, 802],
  solo: [134, 70, 986, 751],
};

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Smooth in-out (smootherstep). */
export const ease = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export const lerpBox = (a: Box, b: Box, t: number): Box => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];

const r = (n: number) => Math.round(n * 100) / 100;

/** Scale (≤ 1) and centring offset that fit a pose box into a cw × ch column. */
export function fitScale(box: Box, side: number, cw: number, ch: number) {
  const l = side > 0 ? box[0] : FW - box[2];
  const rr = side > 0 ? box[2] : FW - box[0];
  const pad = cw < 640 ? 1.04 : 1.08;
  const s = Math.max(0.05, Math.min(cw / ((rr - l) * pad), ch / ((box[3] - box[1]) * pad), 1));
  return { s, fx: FW / 2 - (l + rr) / 2, fy: FH / 2 - (box[1] + box[3]) / 2 };
}

/** How far the laptop steps back while the phone is the star (`phone` 0 → 1). */
export const recede = (phone: number, side: number, cw: number, ch: number) => ({ k: 1 - 0.3 * phone, dx: -side * cw * 0.17 * phone, dy: -ch * 0.04 * phone });

/** 2D transform of the 3D frame inside its column (only transform changes per frame). */
export function fitFrame(box: Box, side: number, cw: number, ch: number, phone: number) {
  const { s, fx, fy } = fitScale(box, side, cw, ch);
  const { k, dx, dy } = recede(phone, side, cw, ch);
  return `translate(-50%,-50%) translate(${r(dx)}px,${r(dy)}px) scale(${(s * k).toFixed(4)}) translate(${r(fx)}px,${r(fy)}px)`;
}

/**
 * The assembled display glass, relative to the frame centre, in frame px
 * [left, top, right, bottom] — measured once from the render (it is constant:
 * once assembled the screen is face-on). Lets the flat screen overlay be placed
 * with pure arithmetic instead of reading layout every frame.
 */
export const DISPLAY_Q: Box = [-343.114, -321.093, 343.114, 103.048];

/**
 * Server-rendered first paint: the frame's fit scale before any JS runs.
 * Column size is a function of the viewport here, so stepped media queries
 * (rounded down → never too big) get within a few % of the JS value.
 */
export function ssrFitCss(scope: string) {
  const [l, t, rr, b] = BOUNDS.exploded;
  const bw = rr - l;
  const bh = b - t;
  const out: string[] = [`${scope}{--sw:.4;--sh:1}`];
  for (let vw = 320; vw < 1024; vw += 12) {
    const cw = vw - (vw >= 640 ? 64 : 40);
    out.push(`@media(min-width:${vw}px){${scope}{--sw:${(cw / (bw * (cw < 640 ? 1.04 : 1.08))).toFixed(3)}}}`);
  }
  for (let vw = 1024; vw <= 1440; vw += 16) out.push(`@media(min-width:${vw}px){${scope}{--sw:${Math.min(1, ((vw - 112) * 0.64) / (bw * 1.08)).toFixed(3)}}}`);
  for (let vh = 560; vh <= 1400; vh += 24) {
    out.push(`@media(max-width:1023px) and (min-height:${vh}px){${scope}{--sh:${Math.min(1, (vh - 470) / (bh * 1.04)).toFixed(3)}}}`);
    out.push(`@media(min-width:1024px) and (min-height:${vh}px){${scope}{--sh:${Math.min(1, (vh - 136) / (bh * 1.08)).toFixed(3)}}}`);
  }
  out.push(`@media(min-width:1024px) and (max-height:559px){${scope}{--sh:.48}}`);
  return out.join("");
}

/** Transforms for each laptop part; e = explode amount (1 = apart, 0 = assembled → all flat/identity offsets). */
export function laptopParts(e: number) {
  return {
    lid: `rotateX(${r(LEAN - 6 * e)}deg) translate3d(0px, ${r(-110 * e)}px, ${r(-60 * e)}px)`,
    shell: `translate3d(0px, ${r(-18 * e)}px, ${r(-110 * e)}px)`,
    panel: `translate3d(0px, ${r(14 * e)}px, ${r(1 + 30 * e)}px)`,
    base: `rotateX(90deg) translate3d(0px, ${r(70 * e)}px, ${r(-30 * e)}px)`,
    deck: `translate3d(0px, 0px, ${r(-80 * e)}px)`,
    keys: `translate3d(0px, ${r(-10 * e)}px, ${r(1 + 40 * e)}px)`,
    pad: `translate3d(0px, ${r(90 * e)}px, ${r(1 + 110 * e)}px) rotateZ(${r(-9 * e)}deg)`,
    shadow: `translate3d(0px, 0px, ${r(-(THICK + 2) - 80 * e)}px)`,
  };
}

/** Scene camera: tilt + the explode turn. Assembled, the screen is exactly face-on. */
export function cameraTransform(a: number, side: number) {
  const e = 1 - a;
  return `translate3d(${r(side * 70 * e)}px, ${r(-120 * e)}px, 0px) rotateX(${r(-LEAN - 6 * e)}deg) rotateY(${r(-side * 26 * e)}deg) rotateZ(${r(side * 2.5 * e)}deg) scale(${r((0.58 + 0.42 * a) * 1000) / 1000})`;
}

/** Phone rectangle (integer px inside the column) when it is on stage. */
export function phoneRect(cw: number, ch: number, side: number) {
  const h = Math.round(Math.min(ch * 0.9, PHONE_H, cw * 0.62 * (PHONE_H / PHONE_W)));
  const w = Math.round((h * PHONE_W) / PHONE_H);
  const margin = Math.round(Math.max(12, cw * 0.04));
  const left = side > 0 ? cw - margin - w : margin;
  const top = Math.round((ch - h) / 2 + ch * 0.02);
  return { left, top, w, h, zoom: w / PHONE_W };
}
