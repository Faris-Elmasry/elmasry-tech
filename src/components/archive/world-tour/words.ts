/**
 * Extruded 3D text for the CSS3D layer: one element with `preserve-3d` and a
 * stack of copies pushed back in depth (orange → ember → near-black), plus a
 * bright front face. Real text, so Arabic shapes correctly and it stays sharp.
 *
 * Fading uses a `--o` custom property on the children — setting `opacity` on
 * the root would flatten the 3D stack.
 */

export interface Extruded {
  el: HTMLDivElement;
  front: HTMLSpanElement;
}

type Face = "bone" | "orange";

const mix = (a: [number, number, number], b: [number, number, number], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

export function makeExtruded(
  text: string,
  { fontSize, layers, depth, arabic, face }: { fontSize: number; layers: number; depth: number; arabic: boolean; face: Face },
): Extruded {
  const el = document.createElement("div");
  el.dir = arabic ? "rtl" : "ltr";
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = [
    "transform-style: preserve-3d",
    "pointer-events: none",
    "white-space: nowrap",
    arabic
      ? "font-family: var(--font-arabic-display-var), var(--font-arabic-var), sans-serif; line-height: 1.35; letter-spacing: 0"
      : "font-family: var(--font-display-var), var(--font-arabic-display-var), sans-serif; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase",
    "font-weight: 700",
    `font-size: ${fontSize}px`,
    "--o: 0",
  ].join(";");

  const near: [number, number, number] = face === "bone" ? [255, 91, 31] : [214, 64, 13];
  const far: [number, number, number] = [26, 9, 4];
  const step = depth / layers;

  for (let k = layers; k >= 1; k--) {
    const s = document.createElement("span");
    s.textContent = text;
    const t = (k - 1) / Math.max(1, layers - 1);
    s.style.cssText = [
      "position: absolute",
      "inset: 0",
      `transform: translateZ(${(-k * step).toFixed(2)}px)`,
      `color: ${mix(near, far, Math.pow(t, 0.7))}`,
      "opacity: var(--o)",
      k === layers ? `text-shadow: 0 0 ${Math.round(fontSize * 0.45)}px rgba(255,91,31,0.55)` : "",
    ]
      .filter(Boolean)
      .join(";");
    el.appendChild(s);
  }

  const front = document.createElement("span");
  front.textContent = text;
  front.style.cssText = [
    "position: relative",
    "display: block",
    "opacity: var(--o)",
    face === "bone"
      ? "background-image: linear-gradient(180deg, #ffffff 0%, #f1ede5 50%, #c9bfb0 100%)"
      : "background-image: linear-gradient(180deg, #ffd2b5 0%, #ff8a4c 45%, #ff5b1f 100%)",
    "-webkit-background-clip: text",
    "background-clip: text",
    "color: transparent",
  ].join(";");
  el.appendChild(front);
  return { el, front };
}
