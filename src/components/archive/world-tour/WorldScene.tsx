"use client";

import { useEffect, useEffectEvent, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import {
  ACESFilmicToneMapping,
  CatmullRomCurve3,
  Color,
  Fog,
  Group,
  MathUtils,
  Mesh,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Material,
  type Texture,
} from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { WORDS } from "./copy";
import { PanelView } from "./Panels";
import { makeExtruded } from "./words";
import {
  CORE,
  CORE_RADIUS,
  FLOOR_Y,
  IDEA_WORD_LIFT,
  NUMERAL_PLACE,
  PANELS,
  PORTAL,
  STATIONS,
  STOP_INDEX,
  STOP_PROGRESS,
  WORD_PLACE,
  cameraRig,
  railLine,
  type PanelSpec,
  type Vec3,
} from "./layout";
import {
  ACCENT,
  BG,
  EMBER,
  FOG_FAR,
  FOG_NEAR,
  makeCard,
  makeCardTexture,
  bulbPower,
  makeBulb,
  makeDust,
  makeFloor,
  makeGlow,
  makeGlowTexture,
  makePortal,
  makeRails,
  makeRing,
} from "./sceneParts";

export interface WorldSceneProps {
  ar: boolean;
  progressRef: RefObject<number>;
  onReady: () => void;
  onError: () => void;
}

interface Slot {
  spec: PanelSpec;
  el: HTMLDivElement;
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Desktop/tablet-landscape vs. narrow layout. Must match the overlay's `lg` breakpoint. */
const isCompact = (w: number) => w < 1024;

function makeSlot(spec: PanelSpec): Slot {
  const el = document.createElement("div");
  el.style.width = `${spec.w}px`;
  el.style.height = `${spec.h}px`;
  el.style.pointerEvents = "none";
  return { spec, el };
}

/**
 * The flight. One PerspectiveCamera drives two renderers every frame:
 *  - WebGL (behind): floor grid fading into fog, orange rails, dust, glows,
 *    the idea light bulb and the end gate, plus a cheap planar reflection (mirrored
 *    clones under a translucent floor).
 *  - CSS3D (in front): the UI panels as real DOM (React portals), so text
 *    is rasterised by the browser at its projected size — never blurry.
 */
export default function WorldScene({ ar, progressRef, onReady, onError }: WorldSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [slots] = useState<Slot[]>(() => PANELS.map(makeSlot));
  const ready = useEffectEvent(() => onReady());
  const fail = useEffectEvent(() => onError());

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const mx = ar ? -1 : 1; // RTL mirrors the world: panels on the left, copy on the right.

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      fail();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(BG, 1);
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const css = new CSS3DRenderer();
    const cssEl = css.domElement;
    cssEl.style.position = "absolute";
    cssEl.style.inset = "0";
    cssEl.style.pointerEvents = "none";
    // CSS3D positions elements from the physical top-left; an inherited RTL
    // direction would snap them to the right edge. Panels set their own dir.
    cssEl.style.direction = "ltr";
    host.appendChild(cssEl);

    const scene = new Scene();
    scene.background = new Color(BG);
    scene.fog = new Fog(BG, FOG_NEAR, FOG_FAR);
    const cssScene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 20, 40000);

    // Image-based lighting: reflections on the bulb glass and its metal base.
    const pmrem = new PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envRT = pmrem.fromScene(room, 0.04);
    room.dispose();
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.75;

    const glowTex = makeGlowTexture();
    const cardTex = makeCardTexture();
    const textures: Texture[] = [glowTex, cardTex];

    const at = (v: Vec3, out = new Vector3()) => out.set(v[0] * mx, v[1], v[2]);
    const stationPos = STATIONS.map((s) => at(s));
    const portalPos = at(PORTAL);

    // ── Reflectable world (gets a mirrored clone under the floor) ──
    const world = new Group();
    scene.add(world);

    stationPos.forEach((c) => {
      const g = makeGlow(glowTex, ACCENT, 2400, 0.16);
      g.position.set(c.x, c.y + 60, c.z - 700);
      world.add(g);
      const g2 = makeGlow(glowTex, EMBER, 900, 0.1);
      g2.position.set(c.x + 260 * mx, c.y + 220, c.z - 300);
      world.add(g2);
    });

    // "Your idea": a real light bulb that switches on when the tour starts.
    const core = makeBulb(glowTex);
    world.add(core.group);
    const coreLight = new PointLight(0xffb070, 0, 1500, 2);
    scene.add(coreLight);
    const hotWorld = new Vector3();

    const portal = makePortal(glowTex);
    portal.group.position.copy(portalPos);
    world.add(portal.group);

    // A light card behind every panel (reflected on the floor as the panel's glow).
    const cards = slots.map(({ spec }) => {
      const card = makeCard(spec.w, spec.h, cardTex);
      world.add(card);
      return card;
    });

    // Mirror clone for the floor reflection. Geometry/material are shared.
    const mirror = world.clone(true);
    mirror.scale.y = -1;
    mirror.position.y = 2 * FLOOR_Y;
    mirror.traverse((o) => (o.renderOrder = 0));
    scene.add(mirror);
    const worldNodes: Object3D[] = [];
    const mirrorNodes: Object3D[] = [];
    world.traverse((o) => worldNodes.push(o));
    mirror.traverse((o) => mirrorNodes.push(o));

    // ── Non-reflected atmosphere ──
    const pools = [...stationPos.map((c) => c.clone()), portalPos.clone()];
    const floor = makeFloor(pools);
    scene.add(floor);

    const rails = makeRails(railLine(), mx);
    scene.add(rails.group);

    stationPos.forEach((c) => {
      const ring = makeRing(720, 0.22);
      ring.position.set(c.x, FLOOR_Y + 2, c.z);
      scene.add(ring);
      const ring2 = makeRing(760, 0.08);
      ring2.position.set(c.x, FLOOR_Y + 2, c.z);
      scene.add(ring2);
    });

    const dust = makeDust(isCompact(host.clientWidth) ? 650 : 2000, mx);
    scene.add(dust);

    // ── CSS3D panels ──
    const items = slots.map(({ spec, el }, i) => {
      const obj = new CSS3DObject(el);
      el.dir = ar ? "rtl" : "ltr";
      el.style.pointerEvents = "none";
      el.style.opacity = "0";
      cssScene.add(obj);
      return {
        spec,
        el,
        obj,
        card: cards[i],
        base: new Vector3(),
        rot: 0,
        roll: 0,
        hidden: false,
        phase: i * 1.37,
        opacity: -1,
      };
    });

    // Big extruded words above each station, and step numerals tilted back on the floor.
    const wordText = WORDS[ar ? "ar" : "en"];
    const words = stationPos.map((c, i) => {
      const ex = makeExtruded(wordText[i], { fontSize: ar ? 150 : 128, layers: 12, depth: 48, arabic: ar, face: "bone" });
      const obj = new CSS3DObject(ex.el);
      ex.el.style.pointerEvents = "none";
      cssScene.add(obj);
      return { ...ex, obj, c, base: new Vector3(), fit: 1, w: 0, h: 0, needsFit: true, opacity: -1, phase: i * 2.3 };
    });
    const numerals = stationPos.slice(1).map((c, i) => {
      const ex = makeExtruded(String(i + 1), { fontSize: 340, layers: 10, depth: 40, arabic: false, face: "orange" });
      const obj = new CSS3DObject(ex.el);
      ex.el.style.pointerEvents = "none";
      obj.rotation.x = MathUtils.degToRad(-76);
      cssScene.add(obj);
      return { ...ex, obj, c, w: 0, h: 0, opacity: -1 };
    });
    let disposed = false;
    // Re-measure the words once the web fonts are in (they change the width).
    document.fonts?.ready.then(() => {
      if (!disposed) words.forEach((w) => (w.needsFit = true));
    });

    // ── Camera rig ──
    let coreRx = CORE_RADIUS.x;
    let coreRy = CORE_RADIUS.y;
    let viewW = 1;
    let viewH = 1;
    let focalPx = 1;
    let compact = isCompact(host.clientWidth);
    let camCurve = new CatmullRomCurve3();
    let lookCurve = new CatmullRomCurve3();
    let stopU: number[] = [];

    // ── Rest-pose framing ──
    // Each station's resting camera is pulled back along its view line just far
    // enough that the station's word and devices (and the bulb) sit fully inside
    // the free part of the screen — clear of the copy column, the navbar and the
    // edges — for this exact viewport size and direction. Nothing at rest is ever
    // faded or clipped to hide an overflow.
    const fitCam = new PerspectiveCamera();
    const fitDir = new Vector3();
    const fitP = new Vector3();
    const fitPts: Vector3[] = [];
    const dummy = new Object3D();
    let rigDirty = false;

    const pushRect = (pos: Vector3, rotY: number, roll: number, w: number, h: number) => {
      dummy.position.copy(pos);
      dummy.rotation.set(0, rotY, roll);
      dummy.updateMatrix();
      for (let k = 0; k < 4; k++) fitPts.push(new Vector3((k & 1 ? 0.5 : -0.5) * w, (k & 2 ? 0.5 : -0.5) * h, 0).applyMatrix4(dummy.matrix));
    };

    const safeRect = (station: number) => {
      if (compact) return { x0: 10, x1: viewW - 10, y0: 72, y1: viewH * 0.52 };
      // Copy column: start padding + text width (the intro copy is wider) + a gap.
      const ps = MathUtils.clamp(viewW * 0.055, 32, 104);
      const copyEnd = ps + (station === 0 ? 660 : 584) + 28;
      const y0 = 76;
      const y1 = viewH - 18;
      return mx > 0 ? { x0: copyEnd, x1: viewW - 18, y0, y1 } : { x0: 18, x1: viewW - copyEnd, y0, y1 };
    };

    const fitStation = (V: Vector3, L: Vector3, station: number) => {
      fitPts.length = 0;
      for (const it of items) {
        if (!it.hidden && it.spec.station === station) pushRect(it.base, it.rot, it.roll, it.spec.w + 16, it.spec.h + 28);
      }
      const w = words[station];
      const maxW = compact ? WORD_PLACE.compact.maxW : WORD_PLACE.wide.maxW;
      const ww = w.w > 0 ? w.w * w.fit : maxW;
      const wh = w.h > 0 ? w.h * w.fit : ar ? 205 : 135;
      pushRect(w.base, 0, 0, ww + 50, wh + 30);
      if (station === 0) pushRect(core.group.position, 0, 0, coreRx * 2 + 30, coreRy * 2 + 40);
      const r = safeRect(station);
      fitCam.copy(camera);
      fitDir.subVectors(V, L);
      for (let k = 1; k <= 2.4; k += 0.03) {
        fitCam.position.copy(L).addScaledVector(fitDir, k);
        fitCam.lookAt(L);
        fitCam.updateMatrixWorld();
        let ok = true;
        for (const p of fitPts) {
          fitP.copy(p).project(fitCam);
          const x = (fitP.x * 0.5 + 0.5) * viewW;
          const y = (-fitP.y * 0.5 + 0.5) * viewH;
          if (x < r.x0 || x > r.x1 || y < r.y0 || y > r.y1) {
            ok = false;
            break;
          }
        }
        if (ok) break;
      }
      V.copy(fitCam.position);
    };

    const buildRig = () => {
      // Panels / core / words move to the layout for this screen size.
      for (const it of items) {
        const place = compact ? it.spec.compact : it.spec.wide;
        it.hidden = !place;
        if (!place) continue;
        const c = stationPos[it.spec.station];
        it.base.set(c.x + place.pos[0] * mx, c.y + place.pos[1], c.z + place.pos[2]);
        it.rot = MathUtils.degToRad(place.rot) * mx;
        it.roll = MathUtils.degToRad(place.roll ?? 0) * mx;
      }
      const corePlace = compact ? CORE.compact : CORE.wide;
      const corePos = corePlace.pos;
      const c0 = stationPos[0];
      core.group.position.set(c0.x + corePos[0] * mx, c0.y + corePos[1], c0.z + corePos[2]);
      core.group.scale.setScalar(corePlace.scale);
      coreRx = CORE_RADIUS.x * corePlace.scale;
      coreRy = CORE_RADIUS.y * corePlace.scale;
      const wp = compact ? WORD_PLACE.compact : WORD_PLACE.wide;
      words.forEach((w, i) => {
        w.base.set(w.c.x + 20 * mx, w.c.y + wp.y + (i === 0 ? IDEA_WORD_LIFT : 0), w.c.z + wp.z);
      });
      const np = compact ? NUMERAL_PLACE.compact : NUMERAL_PLACE.wide;
      // Tilted 76° back: lift the centre so the deepest layer rests on the floor.
      numerals.forEach((n) => n.obj.position.set(n.c.x + np.x * mx, FLOOR_Y + 170 * Math.cos(MathUtils.degToRad(76)) + 42, n.c.z + np.z));

      // Camera path, with every station's rest pose fitted to this viewport.
      const rig = cameraRig(compact);
      const cam = rig.cam.map((p) => at(p));
      const look = rig.look.map((p) => at(p));
      for (let st = 0; st < stationPos.length; st++) fitStation(cam[STOP_INDEX[st]], look[STOP_INDEX[st]], st);
      camCurve = new CatmullRomCurve3(cam, false, "centripetal");
      lookCurve = new CatmullRomCurve3(look, false, "centripetal");
      camCurve.arcLengthDivisions = 2400;
      const lengths = camCurve.getLengths();
      const total = lengths[lengths.length - 1];
      const n = cam.length - 1;
      stopU = STOP_INDEX.map((k) => lengths[Math.round((k / n) * camCurve.arcLengthDivisions)] / total);
    };

    /** Scroll progress → curve parameter, easing into every stop so the camera settles at each station. */
    const progressToT = (p: number) => {
      let i = 0;
      while (i < STOP_PROGRESS.length - 2 && p > STOP_PROGRESS[i + 1]) i++;
      const a = STOP_PROGRESS[i];
      const b = STOP_PROGRESS[i + 1];
      const l = MathUtils.clamp((p - a) / (b - a), 0, 1);
      const e = 0.12 * l + 0.88 * smootherstep(l);
      const u = stopU[i] + (stopU[i + 1] - stopU[i]) * e;
      return camCurve.getUtoTmapping(MathUtils.clamp(u, 0, 1), 0);
    };

    const layout = () => {
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      css.setSize(w, h);
      const nextCompact = isCompact(w);
      const aspect = w / h;
      camera.aspect = aspect;
      camera.fov = aspect < 0.8 ? 56 : nextCompact ? 48 : 40;
      // Shift the vanishing point away from the copy: right (LTR) / left (RTL)
      // on wide screens, up on narrow ones where the copy sits at the bottom.
      if (nextCompact) camera.setViewOffset(w, h, 0, h * 0.15, w, h);
      else camera.setViewOffset(w, h, -w * 0.19 * mx, 0, w, h);
      camera.updateProjectionMatrix();
      viewW = w;
      viewH = h;
      focalPx = h / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)));
      dust.material.uniforms.uFocal.value = h / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)));
      dust.material.uniforms.uPR.value = renderer.getPixelRatio();
      // The rest-pose framing depends on the exact size, so re-fit on every resize.
      compact = nextCompact;
      buildRig();
    };
    layout();

    // ── Pointer parallax (fine pointers only) ──
    const pointer = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    // ── Frame loop ──
    const camPos = new Vector3();
    const lookPos = new Vector3();
    const lastCam = new Vector3();
    const camDir = new Vector3();
    const tmp = new Vector3();
    const proj = new Vector3();
    const corner = new Vector3();
    // Two screen-space rules for every HTML element in the 3D layer:
    //  1. The bulb is WebGL and the CSS3D layer always paints over the canvas,
    //     so any element whose on-screen box would touch the bulb fades out —
    //     the bulb is never cut by a panel, a word or a numeral, near or far.
    //  2. While flying, a word or device that starts to leave the screen fades
    //     out before it reaches the edge, so nothing is ever seen half-clipped.
    let coreOn = false;
    let ccx = 0;
    let ccy = 0;
    let crx = 0;
    let cry = 0;
    const screenFactor = (obj: Object3D, w: number, h: number, edgeWeight: number) => {
      if (w <= 0 || h <= 0 || (!coreOn && edgeWeight <= 0)) return 1;
      obj.updateMatrixWorld();
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (let k = 0; k < 4; k++) {
        corner.set((k & 1 ? 0.5 : -0.5) * w, (k & 2 ? 0.5 : -0.5) * h, 0).applyMatrix4(obj.matrixWorld).project(camera);
        const x = (corner.x * 0.5 + 0.5) * viewW;
        const y = (-corner.y * 0.5 + 0.5) * viewH;
        x0 = Math.min(x0, x);
        x1 = Math.max(x1, x);
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y);
      }
      let f = 1;
      if (edgeWeight > 0) {
        // Starts fading 56px before the edge, gone by the time 20px would be cut.
        const over = Math.max(-x0, x1 - viewW, -y0, y1 - viewH);
        f *= 1 - edgeWeight * smoothstep(-56, 20, over);
      }
      if (coreOn) {
        const dx = Math.max(x0 - ccx, 0, ccx - x1);
        const dy = Math.max(y0 - ccy, 0, ccy - y1);
        f *= smoothstep(0, 56, Math.hypot(dx, dy * (crx / cry)) - crx);
      }
      return f;
    };
    let prog = progressRef.current;
    let roll = 0;
    let time = 0;
    let last = performance.now();
    let raf = 0;
    let first = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      time += dt;

      if (rigDirty) {
        rigDirty = false;
        buildRig();
      }

      // Inertia on top of Lenis: the camera glides after the scroll.
      const target = progressRef.current;
      prog += (target - prog) * (1 - Math.exp(-dt * 5));
      if (Math.abs(target - prog) < 1e-5) prog = target;

      const t = progressToT(prog);
      camCurve.getPoint(t, camPos);
      lookCurve.getPoint(t, lookPos);

      const k = 1 - Math.exp(-dt * 2.5);
      parallax.x += (pointer.x - parallax.x) * k;
      parallax.y += (pointer.y - parallax.y) * k;
      camPos.x += parallax.x * 70;
      camPos.y -= parallax.y * 40;

      // Bank gently into lateral motion; settles to level when still.
      const vx = dt > 0 && !first ? (camPos.x - lastCam.x) / dt : 0;
      lastCam.copy(camPos);
      const rollTarget = MathUtils.clamp(-vx * 0.00005, -0.06, 0.06);
      roll += (rollTarget - roll) * (1 - Math.exp(-dt * 3));

      camera.position.copy(camPos);
      camera.lookAt(lookPos);
      camera.rotateZ(roll);
      camera.updateMatrixWorld();
      camera.getWorldDirection(camDir);

      // Where the core is on screen right now (if at all).
      const coreDepth = tmp.copy(core.group.position).sub(camPos).dot(camDir);
      coreOn = false;
      if (coreDepth > 80 && coreDepth < FOG_FAR) {
        proj.copy(core.group.position).project(camera);
        ccx = (proj.x * 0.5 + 0.5) * viewW;
        ccy = (-proj.y * 0.5 + 0.5) * viewH;
        crx = (coreRx * focalPx) / coreDepth;
        cry = (coreRy * focalPx) / coreDepth;
        coreOn = ccx + crx > 0 && ccx - crx < viewW && ccy + cry > 0 && ccy - cry < viewH;
      }

      // Near a stop, that station's own word and devices are exempt from the
      // edge fade (their rest pose is fitted to the frame); the fade only takes
      // over once the camera is really flying.
      const nearStop = Math.round(prog / 0.2);
      const flying = smoothstep(0.012, 0.035, Math.abs(prog - nearStop * 0.2));
      const edgeWeightFor = (station: number) => (station === nearStop ? flying : 1);

      // Panels: float, then fade by depth — emerge from the fog, dissolve before they reach the lens.
      for (const it of items) {
        if (it.hidden) {
          it.obj.visible = false;
          it.card.visible = false;
          continue;
        }
        const y = it.base.y + Math.sin(time * 0.55 + it.phase) * 10;
        it.obj.position.set(it.base.x, y, it.base.z);
        it.obj.rotation.set(0, it.rot + Math.sin(time * 0.32 + it.phase) * 0.014, it.roll);
        const d = tmp.copy(it.obj.position).sub(camPos).dot(camDir);
        let op = (1 - smoothstep(2800, 4500, d)) * smoothstep(320, 1000, d);
        if (op > 0.008) op *= screenFactor(it.obj, it.spec.w, it.spec.h, edgeWeightFor(it.spec.station));
        const vis = op > 0.008;
        it.obj.visible = vis;
        it.card.visible = vis;
        if (vis) {
          it.card.position.set(it.base.x, y, it.base.z - 6);
          it.card.rotation.copy(it.obj.rotation);
          it.card.material.opacity = 0.075 * op;
          if (Math.abs(op - it.opacity) > 0.004) {
            it.opacity = op;
            it.el.style.opacity = op.toFixed(3);
          }
        }
      }
      const wordMax = compact ? WORD_PLACE.compact.maxW : WORD_PLACE.wide.maxW;
      for (let wi = 0; wi < words.length; wi++) {
        const w = words[wi];
        if (w.needsFit && w.el.isConnected) {
          // Measure even while hidden (CSS3D re-applies display on render), so
          // every station's framing is final before the camera gets there.
          if (w.el.style.display === "none") w.el.style.display = "";
          const width = w.front.offsetWidth;
          if (width > 0) {
            w.fit = Math.min(1, wordMax / width);
            w.w = width;
            w.h = w.front.offsetHeight;
            w.needsFit = false;
            rigDirty = true; // real word size known → re-fit the rest poses
          }
        }
        w.obj.scale.setScalar(w.fit);
        w.obj.position.set(w.base.x, w.base.y + Math.sin(time * 0.45 + w.phase) * 12, w.base.z);
        w.obj.rotation.y = Math.sin(time * 0.27 + w.phase) * 0.035;
        const d = tmp.copy(w.obj.position).sub(camPos).dot(camDir);
        let op = (1 - smoothstep(3000, 4700, d)) * smoothstep(520, 1300, d);
        if (op > 0.008) op *= screenFactor(w.obj, w.w, w.h, edgeWeightFor(wi));
        w.obj.visible = op > 0.008;
        if (w.obj.visible && Math.abs(op - w.opacity) > 0.004) {
          w.opacity = op;
          w.el.style.setProperty("--o", op.toFixed(3));
        }
      }
      for (let ni = 0; ni < numerals.length; ni++) {
        const n = numerals[ni];
        const d = tmp.copy(n.obj.position).sub(camPos).dot(camDir);
        if (compact) {
          n.obj.visible = false;
          continue;
        }
        if (n.w === 0 && n.el.isConnected) {
          if (n.el.style.display === "none") n.el.style.display = "";
          n.w = n.front.offsetWidth;
          n.h = n.front.offsetHeight;
        }
        let op = (1 - smoothstep(2600, 4300, d)) * smoothstep(250, 800, d) * 0.92;
        if (op > 0.008) op *= screenFactor(n.obj, n.w, n.h, edgeWeightFor(ni + 1));
        n.obj.visible = op > 0.008;
        if (n.obj.visible && Math.abs(op - n.opacity) > 0.004) {
          n.opacity = op;
          n.el.style.setProperty("--o", op.toFixed(3));
        }
      }

      // Idea bulb: gentle float, slow turn, switch-on flicker, warm light.
      const power = bulbPower(time);
      core.pivot.position.y = Math.sin(time * 0.6) * 12;
      core.pivot.rotation.set(0, time * 0.22, Math.sin(time * 0.4) * 0.05);
      core.filament.color.setRGB(0.23 + 0.77 * power, 0.1 + 0.76 * power, 0.05 + 0.55 * power);
      core.glassGlow.opacity = 0.075 * power;
      for (const g of core.glows) g.sprite.material.opacity = g.max * power;
      core.pivot.updateMatrixWorld();
      hotWorld.copy(core.hot).applyMatrix4(core.pivot.matrixWorld);
      coreLight.position.copy(hotWorld);
      coreLight.intensity = 70000 * power;
      portal.inner.rotation.z = time * 0.05;
      portal.inner.scale.setScalar(1 + Math.sin(time * 0.8) * 0.01);

      for (let i = 1; i < worldNodes.length; i++) {
        const a = worldNodes[i];
        const b = mirrorNodes[i];
        b.position.copy(a.position);
        b.quaternion.copy(a.quaternion);
        b.scale.copy(a.scale);
        b.visible = a.visible;
      }

      for (const m of rails.materials) m.uniforms.uTime.value = time;
      dust.material.uniforms.uTime.value = time;

      renderer.render(scene, camera);
      css.render(cssScene, camera);

      if (first) {
        first = false;
        requestAnimationFrame(() => ready());
      }
    };

    // ── Run only while visible ──
    let inView = true;
    let pageVisible = !document.hidden;
    const sync = () => {
      const run = inView && pageVisible;
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(host);
    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const ro = new ResizeObserver(() => layout());
    ro.observe(host);
    sync();

    const onLost = (e: Event) => {
      e.preventDefault();
      fail();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);

      // CSS3D: removing an object detaches its element (portal content stays with React).
      for (const it of items) cssScene.remove(it.obj);
      disposed = true;
      for (const w of words) cssScene.remove(w.obj);
      for (const n of numerals) cssScene.remove(n.obj);

      const materials = new Set<Material>();
      scene.traverse((o) => {
        const m = o as Partial<Mesh>;
        if (m.geometry) m.geometry.dispose();
        if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => materials.add(x));
      });
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envRT.dispose();
      pmrem.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      cssEl.remove();
    };
  }, [slots, ar, progressRef]);

  return (
    <>
      <div ref={hostRef} aria-hidden="true" className="absolute inset-0 overflow-hidden" />
      {slots.map(({ spec, el }) => createPortal(<PanelView kind={spec.kind} ar={ar} />, el, spec.id))}
    </>
  );
}
