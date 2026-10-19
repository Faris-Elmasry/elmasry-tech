import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  CylinderGeometry,
  Group,
  LatheGeometry,
  Line,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type ColorRepresentation,
  type Texture,
} from "three";
import { FLOOR_Y } from "./layout";

export const BG = 0x0a0a0b;
export const ACCENT = 0xff5b1f;
export const EMBER = 0xff8a4c;
export const BONE = 0xedeae3;
export const FOG_NEAR = 1700;
export const FOG_FAR = 7400;

/* Shared GLSL: our shader materials do their own distance fade so additive
   layers fade to nothing (not to the fog colour). */
const DEPTH_VERT = /* glsl */ `
  varying float vDepth;
`;

/* ── Textures ── */

/** Soft round glow, white (tinted by material colour). */
export function makeGlowTexture(): CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d") as CanvasRenderingContext2D;
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.18, "rgba(255,255,255,0.55)");
  grd.addColorStop(0.45, "rgba(255,255,255,0.14)");
  grd.addColorStop(0.75, "rgba(255,255,255,0.03)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Soft-edged card, brightest along its bottom edge — the light a glass panel spills. */
export function makeCardTexture(): CanvasTexture {
  const w = 128;
  const h = 128;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d") as CanvasRenderingContext2D;
  const v = g.createLinearGradient(0, 0, 0, h);
  v.addColorStop(0, "rgba(255,255,255,0.05)");
  v.addColorStop(0.7, "rgba(255,255,255,0.35)");
  v.addColorStop(1, "rgba(255,255,255,1)");
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = "destination-in";
  const hz = g.createLinearGradient(0, 0, w, 0);
  hz.addColorStop(0, "rgba(0,0,0,0)");
  hz.addColorStop(0.15, "rgba(0,0,0,1)");
  hz.addColorStop(0.85, "rgba(0,0,0,1)");
  hz.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = hz;
  g.fillRect(0, 0, w, h);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

export function makeGlow(tex: Texture, color: ColorRepresentation, size: number, opacity: number): Sprite {
  const s = new Sprite(
    new SpriteMaterial({ map: tex, color, transparent: true, opacity, blending: AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false }),
  );
  s.scale.set(size, size, 1);
  // Drawn after the floor, without depth test, so the glow spills over it instead of being cut at the horizon.
  s.renderOrder = 2;
  return s;
}

/* ── Floor: procedural grid, glow pools, fades into the fog ── */

export function makeFloor(pools: Vector3[]): Mesh<PlaneGeometry, ShaderMaterial> {
  const geo = new PlaneGeometry(18000, 30000, 1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new ShaderMaterial({
    uniforms: {
      uBg: { value: new Color(BG) },
      uAccent: { value: new Color(ACCENT) },
      uPools: { value: pools },
      uFogNear: { value: FOG_NEAR * 0.7 },
      uFogFar: { value: FOG_FAR },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      ${DEPTH_VERT}
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        vec4 mv = viewMatrix * w;
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBg;
      uniform vec3 uAccent;
      uniform vec3 uPools[6];
      uniform float uFogNear;
      uniform float uFogFar;
      varying vec3 vWorld;
      varying float vDepth;

      // Anti-aliased grid line that also fades out before it can moiré.
      float grid(vec2 p, float size) {
        vec2 c = p / size;
        vec2 d = fwidth(c);
        vec2 g = abs(fract(c - 0.5) - 0.5) / max(d, vec2(1e-4));
        float line = 1.0 - min(min(g.x, g.y), 1.0);
        float fade = 1.0 - smoothstep(0.12, 0.45, max(d.x, d.y));
        return line * fade;
      }

      void main() {
        vec2 p = vWorld.xz;
        vec3 col = uBg * 1.25;
        col += vec3(0.9, 0.88, 0.84) * (grid(p, 120.0) * 0.010 + grid(p, 600.0) * 0.026);
        for (int i = 0; i < 6; i++) {
          vec2 q = p - uPools[i].xz;
          float d2 = dot(q, q);
          col += uAccent * (exp(-d2 / 1400000.0) * 0.035 + exp(-d2 / 160000.0) * 0.03);
        }
        float f = smoothstep(uFogNear, uFogFar, vDepth);
        col = mix(col, uBg, f);
        gl_FragColor = vec4(col, mix(0.84, 1.0, f));
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new Mesh(geo, mat);
  mesh.position.set(0, FLOOR_Y, -6000);
  mesh.renderOrder = 1;
  return mesh;
}

/* ── Rails: crisp 1px light lines + a soft glow ribbon, with pulses travelling forward ── */

const railUniforms = () => ({
  uTime: { value: 0 },
  uAccent: { value: new Color(ACCENT) },
  uFogNear: { value: FOG_NEAR * 0.6 },
  uFogFar: { value: FOG_FAR * 1.05 },
});

const RAIL_FRAG_HEAD = /* glsl */ `
  uniform float uTime;
  uniform vec3 uAccent;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vT;
  varying float vDepth;
  float pulse(float t) {
    float x = fract(t * 9.0 - uTime * 0.045);
    return pow(x, 18.0);
  }
`;

export function makeRails(line: [number, number][], mirrorX: number): { group: Group; materials: ShaderMaterial[] } {
  const curve = new CatmullRomCurve3(
    line.map(([x, z]) => new Vector3(x * mirrorX, FLOOR_Y + 1.5, z)),
    false,
    "centripetal",
  );
  const N = 1400;
  const group = new Group();

  const lineMat = new ShaderMaterial({
    uniforms: railUniforms(),
    vertexShader: /* glsl */ `
      attribute float aT;
      varying float vT;
      ${DEPTH_VERT}
      void main() {
        vT = aT;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      ${RAIL_FRAG_HEAD}
      void main() {
        float fog = 1.0 - smoothstep(uFogNear, uFogFar, vDepth);
        float near = smoothstep(30.0, 260.0, vDepth);
        float k = (0.55 + 2.4 * pulse(vT)) * fog * near;
        gl_FragColor = vec4(uAccent * k, 1.0);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  const ribbonMat = new ShaderMaterial({
    uniforms: railUniforms(),
    vertexShader: /* glsl */ `
      attribute float aT;
      attribute float aU;
      varying float vT;
      varying float vU;
      ${DEPTH_VERT}
      void main() {
        vT = aT;
        vU = aU;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      ${RAIL_FRAG_HEAD}
      varying float vU;
      void main() {
        float fog = 1.0 - smoothstep(uFogNear, uFogFar, vDepth);
        float across = 1.0 - abs(vU * 2.0 - 1.0);
        float glow = across * across * across;
        float k = (0.07 + 0.55 * pulse(vT)) * glow * fog;
        gl_FragColor = vec4(uAccent * k, 1.0);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  });

  const p = new Vector3();
  const tan = new Vector3();
  const side = new Vector3();
  for (const offset of [-240, 240]) {
    const linePos = new Float32Array((N + 1) * 3);
    const lineT = new Float32Array(N + 1);
    const ribPos = new Float32Array((N + 1) * 2 * 3);
    const ribT = new Float32Array((N + 1) * 2);
    const ribU = new Float32Array((N + 1) * 2);
    const index: number[] = [];
    const half = 46;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      curve.getPointAt(t, p);
      curve.getTangentAt(t, tan);
      side.set(-tan.z, 0, tan.x).normalize();
      const cx = p.x + side.x * offset;
      const cz = p.z + side.z * offset;
      linePos.set([cx, FLOOR_Y + 2, cz], i * 3);
      lineT[i] = t;
      ribPos.set([cx - side.x * half, FLOOR_Y + 1, cz - side.z * half, cx + side.x * half, FLOOR_Y + 1, cz + side.z * half], i * 6);
      ribT[i * 2] = ribT[i * 2 + 1] = t;
      ribU[i * 2] = 0;
      ribU[i * 2 + 1] = 1;
      if (i < N) {
        const a = i * 2;
        index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const lg = new BufferGeometry();
    lg.setAttribute("position", new BufferAttribute(linePos, 3));
    lg.setAttribute("aT", new BufferAttribute(lineT, 1));
    const l = new Line(lg, lineMat);
    l.renderOrder = 2;
    l.frustumCulled = false;
    group.add(l);

    const rg = new BufferGeometry();
    rg.setAttribute("position", new BufferAttribute(ribPos, 3));
    rg.setAttribute("aT", new BufferAttribute(ribT, 1));
    rg.setAttribute("aU", new BufferAttribute(ribU, 1));
    rg.setIndex(index);
    const r = new Mesh(rg, ribbonMat);
    r.renderOrder = 2;
    r.frustumCulled = false;
    group.add(r);
  }
  return { group, materials: [lineMat, ribbonMat] };
}

/* ── Dust: soft drifting motes, fogged, size-attenuated ── */

export function makeDust(count: number, mirrorX: number): Points<BufferGeometry, ShaderMaterial> {
  const pos = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const phase = new Float32Array(count);
  const warm = new Float32Array(count);
  // Deterministic pseudo-random so every visit looks the same.
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (rnd() * 2 - 1) * 2800 * mirrorX - 300 * mirrorX;
    pos[i * 3 + 1] = FLOOR_Y + 30 + Math.pow(rnd(), 1.4) * 1700;
    pos[i * 3 + 2] = 4400 - rnd() * 21500;
    size[i] = 2.2 + Math.pow(rnd(), 3) * 7;
    phase[i] = rnd();
    warm[i] = rnd() < 0.22 ? 0.85 : rnd() * 0.15;
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(pos, 3));
  geo.setAttribute("aSize", new BufferAttribute(size, 1));
  geo.setAttribute("aPhase", new BufferAttribute(phase, 1));
  geo.setAttribute("aWarm", new BufferAttribute(warm, 1));
  const mat = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uFocal: { value: 800 },
      uPR: { value: 1 },
      uBone: { value: new Color(BONE) },
      uAccent: { value: new Color(EMBER) },
      uFogNear: { value: FOG_NEAR * 0.6 },
      uFogFar: { value: FOG_FAR * 0.95 },
    },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      attribute float aWarm;
      uniform float uTime;
      uniform float uFocal;
      uniform float uPR;
      uniform float uFogNear;
      uniform float uFogFar;
      varying float vAlpha;
      varying float vWarm;
      void main() {
        vec3 p = position;
        float ph = aPhase * 6.2831;
        p.x += sin(uTime * 0.11 + ph) * 34.0;
        p.y += sin(uTime * 0.17 + ph * 2.0) * 26.0;
        p.z += cos(uTime * 0.08 + ph * 3.0) * 30.0;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float d = max(-mv.z, 1.0);
        float px = aSize * uFocal / d;
        gl_PointSize = clamp(px, 1.4, 9.0) * uPR;
        gl_Position = projectionMatrix * mv;
        float far = 1.0 - smoothstep(uFogNear, uFogFar, d);
        float near = smoothstep(60.0, 380.0, d);
        float twinkle = 0.6 + 0.4 * sin(uTime * 1.1 + aPhase * 50.0);
        vAlpha = far * near * twinkle * clamp(px / 1.4, 0.25, 1.0);
        vWarm = aWarm;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBone;
      uniform vec3 uAccent;
      varying float vAlpha;
      varying float vWarm;
      void main() {
        float r = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, r);
        a *= a;
        vec3 col = mix(uBone, uAccent, vWarm);
        gl_FragColor = vec4(col, a * vAlpha * 0.7);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const pts = new Points(geo, mat);
  pts.frustumCulled = false;
  pts.renderOrder = 3;
  return pts;
}

/* ── Station floor ring ── */

export function makeRing(radius: number, opacity: number): LineLoop {
  const n = 256;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    arr.set([Math.cos(a) * radius, 0, Math.sin(a) * radius], i * 3);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(arr, 3));
  const loop = new LineLoop(
    g,
    new LineBasicMaterial({ color: ACCENT, transparent: true, opacity, toneMapped: false, depthWrite: false, blending: AdditiveBlending }),
  );
  loop.renderOrder = 2;
  return loop;
}

/* ── Idea bulb: thin glass, glowing coil filament, aluminium screw base ── */

export interface Bulb {
  /** Positioned by the layout; its origin is the bulb's visual centre. */
  group: Group;
  /** Floats and turns inside `group`. */
  pivot: Group;
  filament: MeshBasicMaterial;
  glassGlow: MeshBasicMaterial;
  glows: { sprite: Sprite; max: number }[];
  /** Filament position in `pivot` space (for the warm point light). */
  hot: Vector3;
}

const v2 = (r: number, y: number) => new Vector2(r, y);

export function makeBulb(glowTex: Texture): Bulb {
  const group = new Group();
  const pivot = new Group();
  group.add(pivot);
  // Authored with the base contact at y≈-208 and the glass top at y=284; centre it.
  const body = new Group();
  body.position.y = -38;
  pivot.add(body);

  // Glass envelope (classic A-shape), thin and clear: transmission + clearcoat + env reflections.
  const glassProfile = [
    v2(55, -60), v2(58, -44), v2(66, -22), v2(84, 8), v2(110, 44), v2(134, 82), v2(150, 122), v2(155, 160),
    v2(149, 198), v2(134, 230), v2(108, 258), v2(72, 277), v2(34, 285), v2(0, 287),
  ];
  const glass = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.035,
    transmission: 1,
    thickness: 2.5,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    specularIntensity: 1,
    envMapIntensity: 1.4,
    side: DoubleSide,
    transparent: true,
  });
  body.add(new Mesh(new LatheGeometry(glassProfile, 128), glass));

  // Warm light filling the glass once it is on.
  const glassGlow = new MeshBasicMaterial({ color: 0xffb46b, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, toneMapped: false });
  const fill = new Mesh(new SphereGeometry(128, 48, 32), glassGlow);
  fill.position.y = 160;
  fill.scale.set(1, 0.92, 1);
  body.add(fill);

  // Glass stem + two support wires.
  const stemMat = new MeshPhysicalMaterial({ color: 0xf3efe8, roughness: 0.1, transmission: 0.9, thickness: 4, ior: 1.5, transparent: true });
  body.add(new Mesh(new LatheGeometry([v2(22, -58), v2(16, -20), v2(9, 30), v2(6, 64), v2(0, 66)], 48), stemMat));
  const wireMat = new MeshStandardMaterial({ color: 0x9a948c, metalness: 1, roughness: 0.35 });
  for (const sx of [-1, 1]) {
    const wire = new CatmullRomCurve3([new Vector3(sx * 4, 40, 0), new Vector3(sx * 18, 96, 0), new Vector3(sx * 46, 150, 0)]);
    body.add(new Mesh(new TubeGeometry(wire, 24, 1.3, 8, false), wireMat));
  }

  // Coiled filament, slightly arched between the wires.
  const coil: Vector3[] = [];
  const turns = 22;
  for (let i = 0; i <= 600; i++) {
    const t = i / 600;
    const a = t * turns * Math.PI * 2;
    coil.push(new Vector3(-46 + 92 * t, 150 + Math.sin(Math.PI * t) * 16 + Math.cos(a) * 4.2, Math.sin(a) * 4.2));
  }
  const filament = new MeshBasicMaterial({ color: 0x3a1a0c, toneMapped: false });
  body.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(coil), 1200, 1.15, 6, false), filament));
  const hot = new Vector3(0, 160 - 38, 0);

  const glows = [
    { sprite: makeGlow(glowTex, 0xfff0d2, 170, 0), max: 0.95 },
    { sprite: makeGlow(glowTex, 0xffb466, 520, 0), max: 0.55 },
    { sprite: makeGlow(glowTex, EMBER, 1500, 0), max: 0.24 },
  ];
  for (const g of glows) {
    g.sprite.position.copy(hot);
    pivot.add(g.sprite);
  }

  // Screw base: collar, threads, black glass insulator, brass contact.
  const alu = new MeshStandardMaterial({ color: 0xcfc9bf, metalness: 1, roughness: 0.26 });
  const collar = new Mesh(new CylinderGeometry(60, 57, 16, 64), alu);
  collar.position.y = -66;
  body.add(collar);
  const thread: Vector2[] = [];
  for (let i = 0; i <= 160; i++) {
    const y = -74 - (i / 160) * 100;
    thread.push(v2(55 + 4.6 * Math.sin((y / 17) * Math.PI * 2), y));
  }
  body.add(new Mesh(new LatheGeometry(thread.reverse(), 96), alu));
  const insulator = new MeshStandardMaterial({ color: 0x0d0d0f, metalness: 0.1, roughness: 0.22 });
  body.add(new Mesh(new LatheGeometry([v2(30, -200), v2(42, -192), v2(50, -180), v2(52, -174)], 64), insulator));
  const tip = new Mesh(new CylinderGeometry(15, 19, 12, 40), new MeshStandardMaterial({ color: 0xb08d57, metalness: 1, roughness: 0.3 }));
  tip.position.y = -205;
  body.add(tip);

  return { group, pivot, filament, glassGlow, glows, hot };
}

/** 0 → 1 "switch-on": dark, a couple of flickers, then steady with a faint shimmer. */
export function bulbPower(t: number): number {
  if (t < 0.35) return 0;
  if (t < 0.43) return 0.85;
  if (t < 0.58) return 0.12;
  if (t < 0.66) return 1;
  if (t < 0.8) return 0.35;
  const ramp = Math.min(1, (t - 0.8) / 0.45);
  return ramp * (0.97 + 0.03 * Math.sin(t * 23) * Math.sin(t * 7.3));
}

/* ── End gate ── */

export function makePortal(glowTex: Texture): { group: Group; inner: Mesh } {
  const group = new Group();
  const outer = new Mesh(
    new TorusGeometry(540, 2.6, 12, 320),
    new MeshBasicMaterial({ color: ACCENT, toneMapped: false }),
  );
  const inner = new Mesh(
    new TorusGeometry(600, 0.9, 8, 320),
    new MeshBasicMaterial({ color: BONE, transparent: true, opacity: 0.22, toneMapped: false }),
  );
  group.add(outer, inner);
  group.add(makeGlow(glowTex, ACCENT, 2600, 0.35));
  group.add(makeGlow(glowTex, EMBER, 900, 0.25));
  return { group, inner };
}

/** Faint light card behind a panel; its floor reflection reads as the panel's reflection. */
export function makeCard(w: number, h: number, tex: Texture): Mesh<PlaneGeometry, MeshBasicMaterial> {
  const m = new Mesh(
    new PlaneGeometry(w * 0.94, h * 0.94),
    new MeshBasicMaterial({
      map: tex,
      color: BONE,
      transparent: true,
      opacity: 0.08,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      side: DoubleSide,
    }),
  );
  m.renderOrder = 2;
  return m;
}
