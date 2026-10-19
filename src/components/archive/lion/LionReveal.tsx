"use client";

import { useEffect, useRef } from "react";

/**
 * Two aligned photos of the same lion — dark/steel and on fire — blended in a
 * fragment shader. Only a small scope under the cursor turns to fire, with a
 * soft rippling edge and a short trail. Every few seconds a wide wave with a
 * flame-like front also rolls across the whole lion on its own (all screen
 * sizes): it turns him orange, holds, then rolls on and he returns to dark. It
 * never starts while the visitor is exploring. On touch screens a tap
 * or drag reveals too. The fire photo is pre-warped to line up with the dark
 * one, so both are sampled at the same point. Raw WebGL: one quad, two textures.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const TRAIL = 10;

const FRAG = `
precision highp float;
uniform sampler2D uDark;
uniform sampler2D uFire;
uniform vec2 uRes;      // canvas size (px)
uniform vec2 uImg;      // image size (px)
uniform vec3 uTrail[${TRAIL}]; // cursor now + recent positions: x, y (px, origin bottom-left), radius (px)
// Sweep: a wide wave that crosses the lion. Positions are in "lion units":
// s = -1 … 1 from one side of the lion to the other along uSweepDir.
uniform vec2 uSweepC;    // lion centre (px, origin bottom-left)
uniform vec2 uSweepDir;  // unit direction of travel
uniform float uSweepExt; // half the lion's extent along uSweepDir (px); 0 = off
uniform float uLead;     // leading edge (turns the lion orange)
uniform float uTail;     // trailing edge (turns it back)
uniform float uTime;
uniform float uFocusX;  // horizontal crop focus (0..1) for object-cover
uniform float uMirror;  // 1.0 = flip horizontally (RTL)

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

vec2 coverUv(vec2 frag) {
  float s = max(uRes.x / uImg.x, uRes.y / uImg.y);
  vec2 size = uImg * s;
  vec2 off = vec2((uRes.x - size.x) * uFocusX, (uRes.y - size.y) * 0.5);
  vec2 uv = (frag - off) / size;
  uv.y = 1.0 - uv.y;
  if (uMirror > 0.5) uv.x = 1.0 - uv.x;
  return uv;
}

// Soft circle whose edge carries outward-travelling ripples (a "wave" edge).
float blob(vec2 frag, vec3 c, out float band) {
  band = 0.0;
  if (c.z < 1.0) return 0.0;
  float d = distance(frag, c.xy);
  float wobble = (noise(frag * 0.012 + uTime * 0.25) - 0.5) * 0.18 * c.z;
  float x = (d + wobble) / c.z;                 // 0 at centre, 1 at the nominal edge
  float wave = sin(x * 18.0 - uTime * 5.0) * 0.05 * smoothstep(0.35, 0.9, x) * (1.0 - smoothstep(0.9, 1.35, x));
  band = smoothstep(0.3, 0.75, x) * (1.0 - smoothstep(0.75, 1.3, x));
  return 1.0 - smoothstep(0.4, 1.2, x + wave);
}

// The sweep band between the trailing and leading edges, with flame-like
// wavy fronts that ripple along their length while they travel.
float sweep(vec2 frag, out float glow) {
  glow = 0.0;
  if (uSweepExt < 1.0) return 0.0;
  vec2 rel = frag - uSweepC;
  float s = dot(rel, uSweepDir) / uSweepExt;
  float q = dot(rel, vec2(-uSweepDir.y, uSweepDir.x)) / uSweepExt;
  s += 0.07 * sin(q * 6.5 + uTime * 2.4)
     + 0.035 * sin(q * 14.0 - uTime * 3.6)
     + 0.09 * (noise(frag * 0.009 + vec2(0.0, -uTime * 0.7)) - 0.5);
  float e = 0.12;
  float m = smoothstep(uTail - e, uTail + e, s) * (1.0 - smoothstep(uLead - e, uLead + e, s));
  // Warm light riding on each moving front (only while it is over the lion).
  float onL = 1.0 - smoothstep(1.0, 1.4, abs(uLead));
  float onT = 1.0 - smoothstep(1.0, 1.4, abs(uTail));
  glow = exp(-pow((s - uLead) / 0.06, 2.0)) * onL + 0.6 * exp(-pow((s - uTail) / 0.06, 2.0)) * onT;
  return m;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = coverUv(frag);

  float m = 0.0;
  float band = 0.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    float b;
    float v = blob(frag, uTrail[i], b);
    m = max(m, v);
    band = max(band, b);
  }

  float glow;
  m = max(m, sweep(frag, glow));
  band = max(band, glow);

  // Images are pre-aligned: sample both at exactly the same point.
  vec3 dark = texture2D(uDark, uv).rgb;
  vec3 fire = texture2D(uFire, uv).rgb;
  vec3 col = mix(dark, fire, m);
  // Faint warm sheen on the moving wave front only.
  col += vec3(1.0, 0.45, 0.15) * band * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Where the lion sits in the photo (uv, x from the left) — used for "hover the lion".
const LION = { x: 0.73, y: 0.52, w: 0.34, h: 0.9 };
// Horizontal crop focus (object-position x) that centres the lion in the box.
function lionFocus(W: number, H: number, iw: number, ih: number) {
  const s = Math.max(W / iw, H / ih);
  const extra = iw * s - W;
  if (extra <= 0.5) return 0.5;
  return Math.min(1, Math.max(0, (LION.x * iw * s - W / 2) / extra));
}

export default function LionReveal({ dark, fire, rtl, onReady }: { dark: string; fire: string; rtl: boolean; onReady?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl) return;

    let disposed = false;
    let raf = 0;
    const cleanup: (() => void)[] = [];

    Promise.all([loadImage(dark), loadImage(fire)]).then(([imgDark, imgFire]) => {
      if (disposed) return;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const tex = (img: HTMLImageElement, unit: number) => {
        const t = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        return t;
      };
      const tDark = tex(imgDark, 0);
      const tFire = tex(imgFire, 1);
      const u = (n: string) => gl.getUniformLocation(prog, n);
      gl.uniform1i(u("uDark"), 0);
      gl.uniform1i(u("uFire"), 1);
      gl.uniform2f(u("uImg"), imgDark.naturalWidth, imgDark.naturalHeight);
      const uFocus = u("uFocusX");
      gl.uniform1f(u("uMirror"), rtl ? 1 : 0);
      const uRes = u("uRes");
      const uTrail = u("uTrail");
      const trail = new Float32Array(TRAIL * 3);
      const uSweepC = u("uSweepC");
      const uSweepDir = u("uSweepDir");
      const uSweepExt = u("uSweepExt");
      const uLead = u("uLead");
      const uTail = u("uTail");
      const uTime = u("uTime");

      // ── Size (render at device pixels, capped for 4K screens) ──
      let W = 0;
      let H = 0;
      let dpr = 1;
      let focus = 0.5;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = canvas.clientWidth;
        H = canvas.clientHeight;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        focus = lionFocus(W, H, imgDark.naturalWidth, imgDark.naturalHeight);
        gl.uniform1f(uFocus, rtl ? 1 - focus : focus);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Lion box in CSS px (same cover math as the shader).
      const lionBox = () => {
        const s = Math.max(W / imgDark.naturalWidth, H / imgDark.naturalHeight);
        const iw = imgDark.naturalWidth * s;
        const ih = imgDark.naturalHeight * s;
        const fx = rtl ? 1 - focus : focus;
        const ox = (W - iw) * fx;
        const oy = (H - ih) * 0.5;
        const lx = rtl ? 1 - LION.x : LION.x;
        return { cx: ox + lx * iw, cy: oy + LION.y * ih, hw: (LION.w * iw) / 2, hh: (LION.h * ih) / 2 };
      };

      // ── The visitor's cursor/finger ──
      type Pt = { x: number; y: number; r: number };
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const user = { target: { x: 0, y: 0, r: 0 }, cur: { x: 0, y: 0, r: 0 }, hist: [] as Pt[] };
      let inside = false;
      let lastMove = 0;

      const onPointer = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
        if (!inside && e.pointerType !== "mouse") return;
        // Jump (don't glide) to a fresh touch point.
        if (e.type === "pointerdown" && e.pointerType !== "mouse") {
          user.cur.x = x;
          user.cur.y = y;
        }
        user.target.x = x;
        user.target.y = y;
        lastMove = performance.now();
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
      cleanup.push(() => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("pointerdown", onPointer);
      });

      // Sweep timeline: wait → the wave rolls in (lion turns orange) → hold →
      // it rolls on (lion returns to dark). Each pass picks a new direction,
      // mostly rising like flames.
      const rand = (a: number, b: number) => a + Math.random() * (b - a);
      const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
      const IN = 2.6; // s, wave rolling across
      const HOLD = 1.2; // s, fully orange
      const OUT = 2.6; // s, wave leaving
      const dirs = [
        { x: 0, y: 1 }, // bottom → top
        { x: 0.6, y: 0.8 }, // diagonal up-right
        { x: -0.6, y: 0.8 }, // diagonal up-left
        { x: 1, y: 0 }, // side to side
        { x: -1, y: 0 },
      ];
      const sweepRun = { active: false, t0: 0, next: 0.9, dir: dirs[0], lastDir: -1 };
      let restUntil = 0;

      const pushTrail = (agent: { cur: Pt; hist: Pt[] }, offset: number) => {
        agent.hist.unshift({ ...agent.cur });
        if (agent.hist.length > TRAIL * 3) agent.hist.length = TRAIL * 3;
        for (let i = 0; i < TRAIL; i++) {
          const h = agent.hist[Math.min(agent.hist.length - 1, i * 3)];
          const age = 1 - i / TRAIL;
          const o = (offset + i) * 3;
          trail[o] = h.x * dpr;
          trail[o + 1] = (H - h.y) * dpr;
          trail[o + 2] = h.r * dpr * (i === 0 ? 1 : 0.85 * age * age);
        }
      };

      // ── Loop ──
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(canvas);
      const start = performance.now();
      let readySent = false;

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const t = (now - start) / 1000;
        const box = lionBox();
        const size = Math.max(70, Math.min(125, Math.min(W, H) * 0.14)); // scales down on phones

        // Visitor: mouse stays lit while inside the hero; touch fades ~1.2s after the finger stops.
        const since = now - lastMove;
        const userActive = lastMove > 0 && (fine ? inside : since < 1200);
        user.target.r = !userActive ? 0 : fine && since > 2600 ? size * 0.6 : size;
        const k = user.target.r > user.cur.r ? 0.08 : 0.05;
        user.cur.r += (user.target.r - user.cur.r) * k;
        user.cur.x += (user.target.x - user.cur.x) * 0.22;
        user.cur.y += (user.target.y - user.cur.y) * 0.22;

        // Sweep: never starts while the visitor is exploring with their own cursor.
        const busy = userActive && since < 2600;
        if (busy) restUntil = t + 2.5;
        let lead = -2;
        let tail = -2;
        if (!reduced) {
          if (sweepRun.active) {
            const el = t - sweepRun.t0;
            lead = -1.4 + 2.8 * ease(el / IN);
            tail = -1.4 + 2.8 * ease((el - IN - HOLD) / OUT);
            if (el >= IN + HOLD + OUT) {
              sweepRun.active = false;
              sweepRun.next = t + rand(2.2, 3.6);
            }
          } else if (t > sweepRun.next && t > restUntil) {
            let i = Math.floor(Math.random() * dirs.length);
            if (i === sweepRun.lastDir) i = (i + 1) % dirs.length;
            sweepRun.lastDir = i;
            sweepRun.dir = dirs[i];
            sweepRun.t0 = t;
            sweepRun.active = true;
          }
        }
        // GL y points up, so "up" on screen is +y here.
        const dir = sweepRun.dir;
        gl.uniform2f(uSweepC, box.cx * dpr, (H - box.cy) * dpr);
        gl.uniform2f(uSweepDir, dir.x, dir.y);
        gl.uniform1f(uSweepExt, sweepRun.active ? (Math.abs(dir.x) * box.hw + Math.abs(dir.y) * box.hh) * 1.05 * dpr : 0);
        gl.uniform1f(uLead, lead);
        gl.uniform1f(uTail, tail);

        pushTrail(user, 0);
        gl.uniform3fv(uTrail, trail);
        gl.uniform1f(uTime, t);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!readySent) {
          readySent = true;
          onReady?.();
        }
      };
      raf = requestAnimationFrame(frame);

      cleanup.push(() => {
        ro.disconnect();
        io.disconnect();
        gl.deleteTexture(tDark);
        gl.deleteTexture(tFire);
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup.forEach((c) => c());
    };
  }, [dark, fire, rtl, onReady]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
