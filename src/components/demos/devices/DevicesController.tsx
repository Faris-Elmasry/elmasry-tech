"use client";

/**
 * The only client JS of the section: one scroll-driven renderer that writes
 * transforms/opacity to the server-rendered markup (found via data-k hooks).
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLenis } from "lenis/react";
import type { Locale } from "@/lib/site";
import { money } from "./format";
import { BOUNDS, cameraTransform, DISPLAY_Q, SCREEN_W, clamp01, ease, easeOut, fitFrame, fitScale, laptopParts, lerpBox, phoneRect, recede } from "./rig";

/* ── Timeline (fractions of the pinned section's scroll) ── */
const ASSEMBLE: [number, number] = [0.005, 0.12];
/** Copy blocks: [in-start, in-end, out-start, out-end]. The hero is visible from the top. */
const COPY: [number, number, number, number][] = [
  [-1, -1, 0.1, 0.14],
  [0.15, 0.19, 0.36, 0.4],
  [0.41, 0.45, 0.58, 0.62],
  [0.62, 0.66, 0.78, 0.82],
  [0.82, 0.86, 2, 2],
];
const SEGMENTS: [number, number][] = [
  [0.15, 0.4],
  [0.4, 0.62],
  [0.62, 0.82],
  [0.82, 0.985],
];
/** Phone screen switches from the app to the chat while it is off stage. */
const CHAT_FROM = 0.72;
/** Chat script: user messages are typed into the composer, then sent; replies show dots, then type. */
const CHAT: ({ me: true; typeAt: number; sendAt: number } | { me: false; dotsAt: number; typeAt: number; doneAt: number })[] = [
  { me: true, typeAt: 0.848, sendAt: 0.865 },
  { me: false, dotsAt: 0.869, typeAt: 0.877, doneAt: 0.905 },
  { me: true, typeAt: 0.909, sendAt: 0.921 },
  { me: false, dotsAt: 0.924, typeAt: 0.931, doneAt: 0.952 },
];
const CARD_AT = 0.956;

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const sliceChars = (s: string, k: number) => {
  const chars = Array.from(s);
  return chars.slice(0, Math.round(chars.length * clamp01(k))).join("");
};
/** 2D vertical offset in whole pixels; identity at rest so nothing sits on a sub-pixel. */
const ty = (px: number) => (Math.round(px) === 0 ? "none" : `translateY(${Math.round(px)}px)`);

export function DevicesController({ locale }: { locale: Locale }) {
  const side = locale === "ar" ? -1 : 1;
  const markerRef = useRef<HTMLSpanElement>(null);
  const applyRef = useRef<(() => void) | null>(null);
  const reduced = useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM).matches,
    () => false,
  );

  // One update per frame: Lenis calls this from its own rAF; native scroll (no Lenis) is rAF-throttled.
  useLenis(() => applyRef.current?.());

  useEffect(() => {
    const section = markerRef.current?.closest("section");
    if (!section) return;
    const one = (k: string) => section.querySelector<HTMLElement>(`[data-k="${k}"]`);
    const all = (sel: string) => Array.from(section.querySelectorAll<HTMLElement>(sel));

    const el = {
      col: one("col"),
      frame: one("frame"),
      glow: one("glow"),
      scene: one("scene"),
      lid: one("lid"),
      shell: one("shell"),
      panel: one("panel"),
      base: one("base"),
      deck: one("deck"),
      keys: one("keys"),
      pad: one("pad"),
      shadow: one("shadow"),
      kbGlow: one("kbGlow"),
      spill: one("spill"),
      lscreen: one("lscreen"),
      lzoom: one("lzoom"),
      boot: one("boot"),
      bootBar: one("bootBar"),
      scrWeb: one("scrWeb"),
      scrDash: one("scrDash"),
      scrDim: one("scrDim"),
      webViewport: one("webViewport"),
      webPage: one("webPage"),
      phoneBox: one("phoneBox"),
      phone: one("phone"),
      phApp: one("phApp"),
      phChat: one("phChat"),
      appBtn: one("appBtn"),
      appSheet: one("appSheet"),
      rider: one("rider"),
      chatCard: one("chatCard"),
      chatInput: one("chatInput"),
      chatMic: one("chatMic"),
      chatSend: one("chatSend"),
    };
    const route = section.querySelector<SVGPathElement>('[data-k="route"]');
    const routeLen = route?.getTotalLength() ?? 0;
    const copy = all("[data-copy]");
    const segs = all("[data-seg]");
    const segLabels = all("[data-seglabel]");
    const bars = all("[data-bar]");
    const rows = all("[data-row]");
    const counts = all("[data-count]");
    const steps = all("[data-step]");
    const msgs = all("[data-msg]").map((m) => ({
      root: m,
      dots: m.querySelector<HTMLElement>("[data-dots]"),
      text: m.querySelector<HTMLElement>("[data-text]"),
      meta: m.querySelector<HTMLElement>("[data-meta]"),
    }));

    // Only touch the DOM when a value actually changes.
    const last = new WeakMap<Element, Record<string, string>>();
    const set = (node: HTMLElement | SVGElement | null, prop: string, value: string) => {
      if (!node) return;
      let rec = last.get(node);
      if (!rec) last.set(node, (rec = {}));
      if (rec[prop] === value) return;
      rec[prop] = value;
      if (prop === "text") node.textContent = value;
      else if (prop.startsWith("@")) node.setAttribute(prop.slice(1), value);
      else node.style.setProperty(prop, value);
    };
    const op = (node: HTMLElement | null, v: number) => set(node, "opacity", (Math.round(v * 1000) / 1000).toString());
    const show = (node: HTMLElement | null, on: boolean, display = "flex") => set(node, "display", on ? display : "none");
    /** Promote to its own GPU layer only while moving; back to normal (crisp re-raster) at rest. */
    const moving = (node: HTMLElement | null, on: boolean) => set(node, "will-change", on ? "transform, opacity" : "auto");
    /** Fully hidden screen layers skip rendering work entirely. */
    const live = (node: HTMLElement | null, v: number) => {
      op(node, v);
      set(node, "content-visibility", v > 0 ? "visible" : "hidden");
    };

    /* ── Geometry cache: computed on resize only, never per frame ── */
    let sectionTop = 0;
    let span = 1;
    let colW = 0;
    let colH = 0;
    let webMax = 0; // design px the page inside the laptop scrolls
    let webStepPx = 1; // rendered px per design px (for whole-pixel scrolling)
    let lastY = -1;

    const measure = () => {
      const sr = section.getBoundingClientRect();
      sectionTop = sr.top + window.scrollY;
      span = Math.max(1, section.offsetHeight - window.innerHeight);
      if (!el.col) return;
      const c = el.col.getBoundingClientRect();
      colW = c.width;
      colH = c.height;

      // Laptop screen overlay: the face-on display rectangle in the solo pose, snapped to whole pixels.
      const { s, fx, fy } = fitScale(BOUNDS.solo, side, colW, colH);
      const cx = colW / 2;
      const cy = colH / 2;
      const left = Math.round(c.left + cx + s * (DISPLAY_Q[0] + fx)) - c.left;
      const top = Math.round(c.top + cy + s * (DISPLAY_Q[1] + fy)) - c.top;
      const w = Math.round(s * (DISPLAY_Q[2] - DISPLAY_Q[0]));
      const h = Math.round(s * (DISPLAY_Q[3] - DISPLAY_Q[1]));
      const z = w / SCREEN_W;
      set(el.lscreen, "left", `${left}px`);
      set(el.lscreen, "top", `${top}px`);
      set(el.lscreen, "width", `${w}px`);
      set(el.lscreen, "height", `${h}px`);
      // Pivot = column centre, so the recede transform matches the 3D frame's own scale/offset exactly.
      set(el.lscreen, "transform-origin", `${(cx - left).toFixed(2)}px ${(cy - top).toFixed(2)}px`);
      set(el.lzoom, "zoom", z.toFixed(5));
      set(el.lzoom, "height", `${(h / z).toFixed(3)}px`);
      webStepPx = z;

      // Phone: whole-pixel box, UI laid out at real size via zoom.
      const ph = phoneRect(colW, colH, side);
      set(el.phoneBox, "left", `${Math.round(c.left + ph.left) - c.left}px`);
      set(el.phoneBox, "top", `${Math.round(c.top + ph.top) - c.top}px`);
      set(el.phoneBox, "width", `${ph.w}px`);
      set(el.phoneBox, "height", `${ph.h}px`);
      set(el.phone, "zoom", ph.zoom.toFixed(5));

      // How far the shop page scrolls inside the laptop (ratio of two heights in the same space).
      if (el.webViewport && el.webPage && el.scrWeb) {
        const prev = el.scrWeb.style.contentVisibility;
        el.scrWeb.style.contentVisibility = "visible";
        const vpH = el.webViewport.offsetHeight;
        const pgH = el.webPage.offsetHeight;
        el.scrWeb.style.contentVisibility = prev;
        webMax = vpH > 0 ? Math.max(0, ((pgH - vpH) / vpH) * (h / z - 30)) : 0;
      }
    };

    let prev: Record<string, number> = {};
    const changed = (key: string, v: number) => {
      if (prev[key] === v) return 0;
      prev[key] = v;
      return 1;
    };

    const render = (p: number) => {
      const tw = (a: number, b: number) => (reduced ? (p >= (a + b) / 2 ? 1 : 0) : clamp01((p - a) / (b - a)));
      const A = reduced ? 1 : ease(tw(...ASSEMBLE));
      const assembling = A < 0.9999;
      const on = tw(0.125, 0.15);
      // Phone on stage: Mobile scene, off for Systems, back for AI.
      const phoneOn = Math.max(Math.min(ease(tw(0.4, 0.47)), 1 - ease(tw(0.6, 0.66))), ease(tw(0.8, 0.86)));
      const phoneMoving = phoneOn > 0.0005 && phoneOn < 0.9995;
      // Each group below only runs while its own inputs change (most frames touch 1–2 groups).
      const bodyChanged = changed("A", A) + changed("phone", phoneOn) > 0;
      const lightChanged = changed("on", on) + changed("phone2", phoneOn) > 0;

      /* ── 3D laptop body (no text inside) ── */
      if (bodyChanged && colW > 0) set(el.frame, "transform", fitFrame(lerpBox(BOUNDS.exploded, BOUNDS.solo, A), side, colW, colH, phoneOn));
      if (changed("A2", A)) {
        const parts = laptopParts(1 - A);
        set(el.scene, "transform", cameraTransform(A, side));
        set(el.lid, "transform", parts.lid);
        set(el.shell, "transform", parts.shell);
        set(el.panel, "transform", parts.panel);
        set(el.base, "transform", parts.base);
        set(el.deck, "transform", parts.deck);
        set(el.keys, "transform", parts.keys);
        set(el.pad, "transform", parts.pad);
        set(el.shadow, "transform", parts.shadow);
        op(el.shadow, 0.35 + 0.65 * A);
      }
      if (lightChanged) {
        op(el.glow, 0.6 + 0.4 * on);
        op(el.kbGlow, 0.3 * on * (1 - 0.7 * phoneOn));
        op(el.spill, on * (1 - 0.6 * phoneOn));
      }

      /* ── Flat screen overlay: laid out once (resize); per frame only transform/opacity ── */
      set(el.lscreen, "visibility", assembling ? "hidden" : "visible");
      const { k, dx, dy } = recede(phoneOn, side, colW, colH);
      set(el.lscreen, "transform", phoneOn <= 0.0005 ? "none" : `translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px) scale(${k.toFixed(4)})`);
      moving(el.lscreen, phoneMoving);
      const bootV = Math.min(tw(0.125, 0.14), 1 - tw(0.17, 0.185));
      live(el.boot, bootV);
      set(el.bootBar, "transform", `scaleX(${tw(0.13, 0.17).toFixed(3)})`);
      live(el.scrWeb, tw(0.175, 0.2) * (1 - tw(0.6, 0.62)));
      live(el.scrDash, tw(0.62, 0.645));
      op(el.scrDim, 0.62 * phoneOn);
      const scrollK = reduced ? 0 : ease(tw(0.26, 0.36));
      const scrollPx = Math.round(webMax * webStepPx * scrollK);
      set(el.webPage, "transform", scrollPx === 0 ? "none" : `translateY(${(-scrollPx / webStepPx).toFixed(4)}px)`);
      moving(el.webPage, scrollK > 0 && scrollK < 1);

      /* Dashboard */
      if (changed("dash", clamp01((p - 0.64) / 0.12))) {
        const count = easeOut(tw(0.645, 0.71));
        counts.forEach((c) => {
          const v = Math.round(Number(c.dataset.count) * count);
          set(c, "text", c.dataset.money ? money(v, locale) : String(v));
        });
        bars.forEach((b, i) => {
          const g = easeOut(tw(0.65 + i * 0.008, 0.68 + i * 0.008));
          set(b, "transform", g >= 1 ? "none" : `scaleY(${g.toFixed(3)})`);
        });
        rows.forEach((row, i) => {
          const g = tw(0.69 + i * 0.02, 0.71 + i * 0.02);
          op(row, g);
          set(row, "transform", ty((1 - g) * 10));
        });
      }

      /* ── Phone (flat 2D, slides in from the outer edge) ── */
      const slide = Math.round(side * (1 - phoneOn) * colW * 0.65);
      set(el.phoneBox, "transform", slide === 0 ? "none" : `translateX(${slide}px)`);
      set(el.phoneBox, "visibility", phoneOn > 0.0005 ? "visible" : "hidden");
      moving(el.phoneBox, phoneMoving);
      op(el.phone, clamp01(phoneOn * 2.5));
      const chatOn = p >= CHAT_FROM;
      live(el.phApp, chatOn || phoneOn <= 0.0005 ? 0 : 1);
      live(el.phChat, chatOn && phoneOn > 0.0005 ? 1 : 0);

      // App: tap "Order now" → tracking sheet slides up → route draws, rider moves.
      if (changed("app", clamp01((p - 0.48) / 0.12))) {
        const press = tw(0.485, 0.5);
        set(el.appBtn, "transform", press > 0 && press < 1 ? `scale(${(1 - 0.04 * Math.sin(Math.PI * press)).toFixed(3)})` : "none");
        const sheet = easeOut(tw(0.5, 0.54));
        set(el.appSheet, "transform", sheet >= 1 ? "none" : `translateY(${((1 - sheet) * 105).toFixed(2)}%)`);
        const trip = tw(0.535, 0.595);
        if (route) {
          set(route, "stroke-dashoffset", (1 - trip).toFixed(4));
          const pt = route.getPointAtLength(routeLen * trip);
          set(el.rider, "@cx", pt.x.toFixed(1));
          set(el.rider, "@cy", pt.y.toFixed(1));
        }
        steps.forEach((s, i) => {
          const g = tw(0.535 + i * 0.02, 0.555 + i * 0.02) * (i === 2 ? 0.6 : 1);
          set(s, "transform", g >= 1 ? "none" : `scaleX(${g.toFixed(3)})`);
        });
      }

      // Chat
      if (changed("chat", clamp01((p - 0.84) / 0.13))) {
        let composer = "";
        CHAT.forEach((c, i) => {
          const m = msgs[i];
          if (!m) return;
          const full = m.text?.dataset.full ?? "";
          if (c.me) {
            const shown = p >= c.sendAt;
            show(m.root, shown);
            set(m.text, "text", shown ? full : "");
            if (p >= c.typeAt && p < c.sendAt) composer = sliceChars(full, tw(c.typeAt, c.sendAt - 0.003));
          } else {
            const shown = p >= c.dotsAt;
            const typing = p >= c.typeAt;
            show(m.root, shown);
            show(m.dots, shown && !typing);
            set(m.text, "text", typing ? sliceChars(full, tw(c.typeAt, c.doneAt)) : "");
            show(m.meta, typing && p >= c.doneAt, "inline-flex");
          }
        });
        show(el.chatCard, p >= CARD_AT);
        set(el.chatInput, "text", composer || el.chatInput?.dataset.placeholder || "");
        set(el.chatInput, "color", composer ? "#e9edef" : "#8696a0");
        show(el.chatMic, !composer, "inline");
        show(el.chatSend, !!composer, "inline");
      }

      /* ── Copy blocks ── */
      copy.forEach((node, i) => {
        const [a, b, c, d] = COPY[i];
        const v = Math.min(a < 0 ? 1 : tw(a, b), 1 - tw(c, d));
        const leaving = a < 0 || p > (b + c) / 2;
        op(node, v);
        set(node, "transform", ty((1 - v) * (leaving ? -24 : 24)));
        set(node, "visibility", v > 0.001 ? "visible" : "hidden");
        set(node, "pointer-events", v > 0.6 ? "auto" : "none");
        moving(node, v > 0.001 && v < 0.999);
      });
      segs.forEach((s, j) => {
        const [a, b] = SEGMENTS[j % SEGMENTS.length];
        set(s, "transform", `scaleX(${clamp01((p - a) / (b - a)).toFixed(3)})`);
      });
      segLabels.forEach((s, j) => {
        const [a, b] = SEGMENTS[j];
        op(s, p >= a && (p < b || j === SEGMENTS.length - 1) ? 1 : 0.85); // 0.85 keeps inactive labels ≥ 4.5:1 contrast
      });
    };

    /** Reads only window.scrollY (no layout) and renders when it changed. */
    const apply = () => {
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;
      render(clamp01((y - sectionTop) / span));
    };
    let raf = 0;
    const onNativeScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), apply()));
    };
    const refresh = () => {
      measure();
      prev = {};
      lastY = -1;
      apply();
    };

    refresh();
    applyRef.current = apply;
    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(refresh);
    });
    if (el.col) ro.observe(el.col);
    ro.observe(section);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    // Fonts change heights once loaded.
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      applyRef.current = null;
      ro.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("scroll", onNativeScroll);
    };
  }, [reduced, locale, side]);

  return <span ref={markerRef} hidden />;
}
