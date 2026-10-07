"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AmbientLight,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
  type BufferGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { drawScreen, run, welcome, type TerminalLine } from "@/components/three/terminal";
import type { Locale } from "@/lib/site";

// 60% keyboard: [KeyboardEvent.code, width in key units]
const LAYOUT: [string, number][][] = [
  [["Backquote", 1], ["Digit1", 1], ["Digit2", 1], ["Digit3", 1], ["Digit4", 1], ["Digit5", 1], ["Digit6", 1], ["Digit7", 1], ["Digit8", 1], ["Digit9", 1], ["Digit0", 1], ["Minus", 1], ["Equal", 1], ["Backspace", 2]],
  [["Tab", 1.5], ["KeyQ", 1], ["KeyW", 1], ["KeyE", 1], ["KeyR", 1], ["KeyT", 1], ["KeyY", 1], ["KeyU", 1], ["KeyI", 1], ["KeyO", 1], ["KeyP", 1], ["BracketLeft", 1], ["BracketRight", 1], ["Backslash", 1.5]],
  [["CapsLock", 1.75], ["KeyA", 1], ["KeyS", 1], ["KeyD", 1], ["KeyF", 1], ["KeyG", 1], ["KeyH", 1], ["KeyJ", 1], ["KeyK", 1], ["KeyL", 1], ["Semicolon", 1], ["Quote", 1], ["Enter", 2.25]],
  [["ShiftLeft", 2.25], ["KeyZ", 1], ["KeyX", 1], ["KeyC", 1], ["KeyV", 1], ["KeyB", 1], ["KeyN", 1], ["KeyM", 1], ["Comma", 1], ["Period", 1], ["Slash", 1], ["ShiftRight", 2.75]],
  [["ControlLeft", 1.25], ["MetaLeft", 1.25], ["AltLeft", 1.25], ["Space", 6.25], ["AltRight", 1.25], ["MetaRight", 1.25], ["ContextMenu", 1.25], ["ControlRight", 1.25]],
];

/** Maps a typed character to a key code so soft keyboards (no e.code) still animate. */
function codeForChar(ch: string): string | null {
  const c = ch.toLowerCase();
  if (c >= "a" && c <= "z") return `Key${c.toUpperCase()}`;
  if (c >= "0" && c <= "9") return `Digit${c}`;
  if (c === " ") return "Space";
  return null;
}

interface Props {
  locale: Locale;
  label: string;
}

/**
 * Interactive studio computer. Click (or tap) the screen, then type on your own
 * keyboard: the matching 3D key presses down and glows, and the text appears on
 * the 3D screen — a working mini terminal (try `help`, `services`, `hire`).
 */
export default function Computer3D({ locale, label }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const host = mount.current;
    const field = input.current;
    if (!host || !field) return;
    const rtl = locale === "ar";
    
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.outputColorSpace = SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "pan-y";

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 1.55, 7.4);
    camera.lookAt(0, 0.75, 0);

    // ── Lights: warm key, orange rim, faint fill ──
    scene.add(new AmbientLight(0xffffff, 0.35));
    const key = new DirectionalLight(0xfff1e0, 1.6);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const rim = new PointLight(0xff5b1f, 18, 12);
    rim.position.set(3.2, 2.2, -2.2);
    scene.add(rim);
    const screenGlow = new PointLight(0xffd6bf, 2.2, 4);
    screenGlow.position.set(0, 0.9, 1.4);
    scene.add(screenGlow);

    const rig = new Group();
    scene.add(rig);

    const aluminium = new MeshStandardMaterial({ color: 0x2a2a2e, metalness: 0.75, roughness: 0.35 });
    const dark = new MeshStandardMaterial({ color: 0x111113, metalness: 0.2, roughness: 0.8 });
    const disposables: { dispose(): void }[] = [aluminium, dark];
    const geo = <T extends BufferGeometry>(g: T) => (disposables.push(g), g);

    // ── Desk shadow (fake contact shadow from a radial gradient) ──
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d")!;
    const sg = sctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    sg.addColorStop(0, "rgba(0,0,0,0.65)");
    sg.addColorStop(1, "rgba(0,0,0,0)");
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 256, 256);
    const shadowTex = new CanvasTexture(shadowCanvas);
    const shadowMat = new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    disposables.push(shadowTex, shadowMat);
    const shadow = new Mesh(geo(new CircleGeometry(4.2, 48)), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.46;
    shadow.scale.set(1.25, 0.75, 1);
    rig.add(shadow);

    // ── Monitor ──
    const monitor = new Group();
    monitor.position.set(0, 1.25, -0.35);
    rig.add(monitor);
    monitor.add(new Mesh(geo(new RoundedBoxGeometry(3.6, 2.3, 0.16, 6, 0.08)), aluminium));
    const bezel = new Mesh(geo(new PlaneGeometry(3.46, 2.16)), dark);
    bezel.position.z = 0.081;
    monitor.add(bezel);

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1280;
    screenCanvas.height = 800;
    const screenCtx = screenCanvas.getContext("2d")!;
    const screenTex = new CanvasTexture(screenCanvas);
    screenTex.colorSpace = SRGBColorSpace;
    screenTex.anisotropy = 4;
    const screenMat = new MeshBasicMaterial({ map: screenTex, toneMapped: false });
    disposables.push(screenTex, screenMat);
    const screen = new Mesh(geo(new PlaneGeometry(3.36, 2.06)), screenMat);
    screen.position.z = 0.083;
    monitor.add(screen);

    // Stand: neck + foot
    const neck = new Mesh(geo(new RoundedBoxGeometry(0.42, 1.05, 0.12, 4, 0.04)), aluminium);
    neck.position.set(0, 0.25, -0.5);
    neck.rotation.x = -0.12;
    rig.add(neck);
    const foot = new Mesh(geo(new RoundedBoxGeometry(1.25, 0.06, 0.8, 4, 0.03)), aluminium);
    foot.position.set(0, -0.42, -0.45);
    rig.add(foot);

    // ── Keyboard ──
    const U = 0.2;
    const keyboard = new Group();
    keyboard.position.set(0, -0.36, 1.2);
    keyboard.rotation.x = 0.08;
    rig.add(keyboard);
    const caseW = 15 * U + 0.24;
    const caseD = 5 * U + 0.24;
    keyboard.add(new Mesh(geo(new RoundedBoxGeometry(caseW, 0.12, caseD, 4, 0.05)), aluminium));

    const keyGeos = new Map<number, BufferGeometry>();
    const keys = new Map<string, { mesh: Mesh; mat: MeshStandardMaterial; press: number }>();
    const keyColor = new Color(0x1b1b1e);
    const accentKeys = new Set(["Enter", "Escape", "Space"]);
    LAYOUT.forEach((row, r) => {
      let x = -7.5 * U;
      for (const [code, w] of row) {
        let g = keyGeos.get(w);
        if (!g) {
          g = geo(new RoundedBoxGeometry(w * U - 0.03, 0.09, U - 0.03, 3, 0.025));
          keyGeos.set(w, g);
        }
        const mat = new MeshStandardMaterial({
          color: accentKeys.has(code) ? 0x3a1a10 : keyColor,
          roughness: 0.55,
          metalness: 0.1,
          emissive: new Color(0xff5b1f),
          emissiveIntensity: 0,
        });
        disposables.push(mat);
        const mesh = new Mesh(g, mat);
        mesh.position.set(x + (w * U) / 2, 0.1, -2 * U + r * U);
        keyboard.add(mesh);
        keys.set(code, { mesh, mat, press: 0 });
        x += w * U;
      }
    });

    // ── Coffee mug (a small human detail) ──
    const mugMat = new MeshStandardMaterial({ color: 0xff5b1f, roughness: 0.45 });
    disposables.push(mugMat);
    const mug = new Group();
    mug.position.set(2.05, -0.2, 0.55);
    mug.add(new Mesh(geo(new CylinderGeometry(0.2, 0.18, 0.5, 32)), mugMat));
    const handle = new Mesh(geo(new TorusGeometry(0.12, 0.035, 12, 24, Math.PI)), mugMat);
    handle.position.set(0.2, 0, 0);
    handle.rotation.z = -Math.PI / 2;
    mug.add(handle);
    const coffee = new Mesh(geo(new CircleGeometry(0.18, 32)), new MeshStandardMaterial({ color: 0x2a1408, roughness: 0.2 }));
    disposables.push(coffee.material as MeshStandardMaterial);
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.22;
    mug.add(coffee);
    rig.add(mug);

    // ── Terminal state ──
    const styles = getComputedStyle(document.documentElement);
    const fonts = [styles.getPropertyValue("--font-mono-var"), styles.getPropertyValue("--font-arabic-var"), "monospace"]
      .map((f) => f.trim())
      .filter(Boolean)
      .join(", ");
    // Boot sequence, then the welcome banner.
    let lines: TerminalLine[] = [];
    const boot = rtl
      ? ["[ ok ] تشغيل النواة", "[ ok ] تحميل الخدمات", "[ ok ] الاتصال بالقاهرة", ""]
      : ["[ ok ] starting kernel", "[ ok ] loading services", "[ ok ] connecting to Cairo", ""];
    const timers: number[] = [];
    boot.forEach((text, i) =>
      timers.push(
        window.setTimeout(() => {
          lines = [...lines, { text, tone: "muted" }];
          dirty = true;
        }, 180 * (i + 1))
      )
    );
    timers.push(
      window.setTimeout(() => {
        lines = [...lines, ...welcome(locale)];
        dirty = true;
        field.focus({ preventScroll: true });
      }, 180 * (boot.length + 1))
    );
    let typed = "";
    let caret = true;
    let dirty = true;
    const redraw = () => {
      drawScreen(screenCtx, lines, typed, caret, fonts, rtl);
      screenTex.needsUpdate = true;
      dirty = false;
    };
    // Re-draw once web fonts are ready so the canvas uses them.
    document.fonts?.ready.then(() => (dirty = true));

    const pressKey = (code: string | null) => {
      if (!code) return;
      const k = keys.get(code);
      if (k) k.press = 1;
    };

    const submit = () => {
      const res = run(typed, locale);
      lines = res.clear ? [] : [...lines, ...res.lines].slice(-60);
      typed = "";
      dirty = true;
      if (res.navigate) window.setTimeout(() => router.push(res.navigate!), 900);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      pressKey(e.code || null);
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        typed = typed.slice(0, -1);
        dirty = true;
      } else if (e.key === "Escape") {
        field.blur();
      }
    };
    // Text arrives through the input event (works for desktop and soft keyboards).
    const onInput = () => {
      const v = field.value;
      if (!v) return;
      for (const ch of v) pressKey(codeForChar(ch));
      typed = (typed + v).slice(0, 48);
      field.value = "";
      dirty = true;
    };
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    field.addEventListener("keydown", onKeyDown);
    field.addEventListener("input", onInput);
    field.addEventListener("focus", onFocus);
    field.addEventListener("blur", onBlur);

    // ── Pointer: drag to turn, hover to tilt ──
    let dragging = false;
    let dragX = 0;
    let yaw = 0;
    let targetYaw = 0;
    let tilt = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      dragX = e.clientX;
    };
    // Focus after the click completes; focusing on pointerdown gets undone by
    // the browser moving focus to the clicked (non-focusable) canvas.
    const onClick = () => field.focus({ preventScroll: true });
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tilt = ((e.clientY - r.top) / r.height - 0.5) * 0.12;
      if (!dragging) return;
      targetYaw = Math.max(-0.75, Math.min(0.75, targetYaw + (e.clientX - dragX) * 0.006));
      dragX = e.clientX;
    };
    const onUp = () => (dragging = false);
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("click", onClick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);

    let forceRender = true;
    const resize = () => {
      forceRender = true;
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Pull back on narrow (portrait) frames so the whole desk fits.
      camera.position.z = w / h < 1 ? 11 : 8;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    let blink = 0;
    let rx = 0;
    // Render on demand: the loop is cheap, but the GPU only draws when something
    // actually changed (typing, key travel, dragging, caret blink at 2 fps).
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;

      let needs = forceRender;
      forceRender = false;

      blink += dt;
      if (blink > 0.5) {
        blink = 0;
        caret = !caret;
        dirty = true;
      }
      if (dirty) {
        redraw();
        needs = true;
      }

      for (const k of keys.values()) {
        if (k.press <= 0) continue;
        k.press = Math.max(0, k.press - dt * 4);
        k.mesh.position.y = 0.1 - k.press * 0.055;
        k.mat.emissiveIntensity = k.press * 1.6;
        needs = true;
      }

      if (!dragging) targetYaw *= 0.94; // ease back to centre
      if (Math.abs(targetYaw - yaw) > 0.0005 || Math.abs(tilt - rx) > 0.0005 || dragging) {
        yaw += (targetYaw - yaw) * 0.1;
        rx += (tilt - rx) * 0.08;
        rig.rotation.y = yaw;
        rig.rotation.x = rx;
        needs = true;
      }

      if (needs) renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      field.removeEventListener("keydown", onKeyDown);
      field.removeEventListener("input", onInput);
      field.removeEventListener("focus", onFocus);
      field.removeEventListener("blur", onBlur);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [locale, router]);

  return (
    <div className="relative h-full w-full">
      <div ref={mount} className="absolute inset-0" role="img" aria-label={label} data-cursor={locale === "ar" ? "اكتب" : "type"} />
      {/* Focus target for typing — invisible, but real so mobile keyboards open. */}
      <input
        ref={input}
        aria-label={label}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="send"
        className="absolute bottom-0 start-0 h-px w-px opacity-0"
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-3 flex justify-center transition-opacity duration-500 ${focused ? "opacity-0" : "opacity-100"}`}
      >
        <span className="label rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)]/70 px-4 py-2 backdrop-blur">
          {locale === "ar" ? "اضغط على الشاشة واكتب help" : "Click the screen & type help"}
        </span>
      </div>
    </div>
  );
}
