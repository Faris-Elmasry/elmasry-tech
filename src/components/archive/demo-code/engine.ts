import { CODE_LENGTH, CODE_LINES, CODE_TIMES, CODE_TOKENS } from "./code";
import { clamp01, ease, lerp, mixRGB, rgb, seg, type RGB } from "./motion";

/* ── Timeline (in viewport heights of scroll) ──────────────────────────────
   hold │ 01 trans · hold │ 02 trans · hold │ 03 trans · hold │ 04 trans · hold │ tail
   `f`   = scene position 0…4 that only moves during transitions (flat on holds)
   `raw` = continuous scene position 0…4 (keeps moving through holds; used for
           the AI chat so its typing plays while the scene is "parked"). */
export const T = { hold: 0.35, seg: 1, trans: 0.62, tail: 0.35 } as const;
export const TOTAL = T.hold + 4 * T.seg + T.tail;
/** Section height in svh: one screen for the sticky stage + the scroll track. */
export const STORY_SVH = Math.round((1 + TOTAL) * 100);

/* ── Canvas keyframes (design px; the whole rig is scaled to fit) ─────────── */
interface Key {
  w: number;
  h: number;
  r: number;
  /** Panel shift along the inline axis (negative = toward the start side) and vertically. */
  dx: number;
  dy: number;
  /** Bounding box to fit (panel + anything hanging off it). */
  fw: number;
  fh: number;
  bg: RGB;
  /** 0 = dark UI, 1 = light UI (drives window-bar ink). */
  light: number;
}

const CHAT_W = 300;
const CHAT_H = 350;
/** Chat top, measured from the dashboard's top edge (just under the KPI row). */
const CHAT_TOP = 177;
/** How far the chat sticks out past the dashboard's end edge / bottom edge. */
const CHAT_OVERHANG = 150;
const CHAT_DROP = CHAT_TOP + CHAT_H - 450;

const KEYS: readonly Key[] = [
  { w: 560, h: 440, r: 16, dx: 0, dy: 0, fw: 560, fh: 440, bg: [14, 14, 16], light: 0 }, // editor
  { w: 640, h: 440, r: 14, dx: 0, dy: 0, fw: 640, fh: 440, bg: [245, 240, 232], light: 1 }, // website
  { w: 272, h: 540, r: 44, dx: 0, dy: 0, fw: 272, fh: 540, bg: [246, 242, 235], light: 1 }, // phone
  { w: 660, h: 450, r: 16, dx: 0, dy: 0, fw: 660, fh: 450, bg: [17, 17, 19], light: 0 }, // dashboard
  // + AI: the assistant hangs off the bottom-end corner, below the KPI row (so the
  // "Low stock" tile it talks about stays visible). Group re-centred via dx/dy.
  { w: 660, h: 450, r: 16, dx: -CHAT_OVERHANG / 2, dy: -Math.round(CHAT_DROP / 2), fw: 660 + CHAT_OVERHANG, fh: 450 + CHAT_DROP, bg: [17, 17, 19], light: 0 },
];

const BONE: RGB = [237, 234, 227];
const INK: RGB = [29, 23, 18];

/** Shared product cards: web card (row of 3) ⇄ app list row. Coordinates are relative to the panel centre (LTR). */
const WEB_CARD = (i: number) => ({ x: -290 + 198 * i, y: 66, w: 184, h: 122, r: 12 });
const APP_CARD = (i: number) => ({ x: -119, y: -24 + 60 * i, w: 238, h: 54, r: 14 });

const MOBILE_GAP = 18;

export interface StoryEngine {
  measure(): void;
  update(force?: boolean): void;
  setReduced(v: boolean): void;
}

interface Options {
  rtl: boolean;
  reduced: boolean;
  userText: string;
  replyText: string;
  kpiTargets: readonly number[];
  onLeaveHero: () => void;
}

export function createEngine(root: HTMLElement, opts: Options): StoryEngine {
  const map = new Map<string, HTMLElement[]>();
  root.querySelectorAll<HTMLElement>("[data-a]").forEach((el) => {
    const key = el.dataset.a ?? "";
    const list = map.get(key);
    if (list) list.push(el);
    else map.set(key, [el]);
  });
  const all = (k: string) => map.get(k) ?? [];
  const one = (k: string) => map.get(k)?.[0];
  const need = (k: string) => {
    const el = one(k);
    if (!el) throw new Error(`[code demo] missing [data-a="${k}"]`);
    return el;
  };

  const stage = need("stage");
  const area = need("area");
  const cell = need("copy-cell");
  const rig = need("rig");
  const panel = need("panel");
  const glow = one("glow");
  const bezel = one("bezel");
  const island = one("island");
  const bar = one("bar");
  const barTabs = one("bar-tabs");
  const barUrl = one("bar-url");
  const urlWeb = one("url-web");
  const urlDash = one("url-dash");
  const codeRows = all("code-row");
  const editorChrome = all("editor-chrome");
  const webItems = all("web");
  const cards = all("card");
  const cardWeb = all("card-web");
  const cardApp = all("card-app");
  const appItems = all("app");
  const notif = one("notif");
  const dashItems = all("dash");
  const kpiVals = all("kpi-val");
  const kpiRing = one("kpi-ring");
  const aiNav = one("ai-nav");
  const bars = all("bar-col");
  const topFills = all("top-fill");
  const rows = all("row");
  const chat = one("chat");
  const chatUser = one("chat-user");
  const chatReply = one("chat-reply");
  const chatReplyText = one("chat-reply-text");
  const chatDots = one("chat-dots");
  const chatPo = one("chat-po");
  const chatInput = one("chat-input");
  const chatPlaceholder = one("chat-placeholder");
  const chatCaret = one("chat-caret");
  const copies = all("copy");
  const stepFills = all("step-fill");
  const stepLabels = all("step-label");
  const steps = all("steps");
  const cues = all("cue");

  let reduced = opts.reduced;
  const sign = opts.rtl ? -1 : 1;
  /** Mirror an LTR box (x, width) for RTL. */
  const X = (x: number, w: number) => (opts.rtl ? -(x + w) : x);

  /* ── tiny DOM writers ── */
  const st = (el: HTMLElement | undefined, o: number, tf?: string) => {
    if (!el) return;
    const s = el.style;
    s.opacity = o >= 0.999 ? "1" : o <= 0.001 ? "0" : o.toFixed(3);
    s.visibility = o <= 0.001 ? "hidden" : "";
    if (tf !== undefined) s.transform = tf;
  };
  const ty = (y: number) => (Math.abs(y) < 0.01 ? "none" : `translate3d(0,${y.toFixed(2)}px,0)`);
  const texts = new WeakMap<HTMLElement, string>();
  const setText = (el: HTMLElement | undefined, v: string) => {
    if (!el || texts.get(el) === v) return;
    texts.set(el, v);
    el.textContent = v;
  };
  const show = (el: HTMLElement | undefined, on: boolean) => {
    if (!el) return;
    const v = on ? "" : "none";
    if (el.style.display !== v) el.style.display = v;
  };
  const flag = (el: HTMLElement | undefined, on: boolean) => {
    if (!el) return;
    if (on && el.dataset.on !== "true") el.dataset.on = "true";
    else if (!on && el.dataset.on) delete el.dataset.on;
  };
  const even = (v: number) => 2 * Math.round(v / 2);
  const num = (v: number) => Math.round(v).toLocaleString("en-US");

  /** Staggered in/out: element i fades + rises in over [inA + i·step, +dur], and out likewise. */
  const stagger = (els: HTMLElement[], f: number, inA: number, step: number, dur: number, outA?: number, outStep = 0.03, outDur = 0.24) => {
    els.forEach((el, i) => {
      const p = ease(seg(f, inA + i * step, inA + i * step + dur));
      const q = outA === undefined ? 0 : ease(seg(f, outA + i * outStep, outA + i * outStep + outDur));
      st(el, p * (1 - q), ty((1 - p) * 14 - q * 10));
    });
  };

  /* ── measurement (relative to the sticky stage) ── */
  const m = { stageH: 1, desktop: true, left: 0, right: 0, top: 0, bottom: 0, heroBottom: 0, sceneBottom: 0 };
  function measure() {
    const s = stage.getBoundingClientRect();
    const a = area.getBoundingClientRect();
    const c = cell.getBoundingClientRect();
    m.stageH = stage.offsetHeight || window.innerHeight;
    m.desktop = window.matchMedia("(min-width: 1024px)").matches;
    m.left = a.left - s.left;
    m.right = a.right - s.left;
    m.top = a.top - s.top;
    m.bottom = a.bottom - s.top - (m.desktop ? 0 : 8);
    const cellTop = c.top - s.top;
    const bottomOf = (el: HTMLElement) => cellTop + el.offsetTop + el.offsetHeight;
    m.heroBottom = copies[0] ? bottomOf(copies[0]) : m.top;
    m.sceneBottom = copies.slice(1).reduce((mx, el) => Math.max(mx, bottomOf(el)), 0);
  }

  /* ── one frame ── */
  function render(f: number, raw: number) {
    const k = Math.min(3, Math.floor(f));
    const x = f - k;
    const e = ease(x);
    const A = KEYS[k];
    const B = KEYS[k + 1];

    // Panel geometry
    const w = even(lerp(A.w, B.w, e));
    const h = even(lerp(A.h, B.h, e));
    const r = lerp(A.r, B.r, e);
    const dx = Math.round(lerp(A.dx, B.dx, e));
    const dy = Math.round(lerp(A.dy, B.dy, e));
    const fw = lerp(A.fw, B.fw, e);
    const fh = lerp(A.fh, B.fh, e);
    const mix = ease(seg(x, 0.28, 0.62));
    const light = lerp(A.light, B.light, mix);

    // Fit the rig into the free area (never over the copy)
    const top = m.desktop ? m.top : lerp(m.heroBottom, m.sceneBottom, ease(seg(f, 0.35, 1))) + MOBILE_GAP;
    const aw = Math.max(1, m.right - m.left);
    const ah = Math.max(1, m.bottom - top);
    const s = Math.max(0.05, Math.min(1, aw / fw, ah / fh));
    const cx = Math.round((m.left + m.right) / 2);
    const cy = Math.round((top + m.bottom) / 2);
    rig.style.transform = `translate3d(${cx}px,${cy}px,0) scale(${s.toFixed(4)})`;

    const ps = panel.style;
    ps.width = `${w}px`;
    ps.height = `${h}px`;
    ps.borderRadius = `${r.toFixed(2)}px`;
    ps.transform = `translate3d(${X(-w / 2 + dx, w)}px,${-h / 2 + dy}px,0)`;
    ps.backgroundColor = rgb(mixRGB(A.bg, B.bg, mix));

    if (glow) {
      const gw = w + 220;
      const gh = h + 220;
      glow.style.width = `${gw}px`;
      glow.style.height = `${gh}px`;
      glow.style.transform = `translate3d(${X(-gw / 2 + dx, gw)}px,${-gh / 2 + dy}px,0)`;
    }

    // Phone bezel + island
    const bz = 7 * (ease(seg(f, 1.35, 1.8)) - ease(seg(f, 2.0, 2.35)));
    if (bezel) bezel.style.boxShadow = bz > 0.05 ? `inset 0 0 0 ${bz.toFixed(2)}px #0b0b0c, inset 0 0 0 ${(bz + 1).toFixed(2)}px rgba(255,255,255,0.08)` : "none";
    st(island, ease(seg(f, 1.45, 1.75)) * (1 - ease(seg(f, 2.0, 2.2))));

    // Window bar: editor tabs → URL → hidden on the phone → admin URL
    if (bar) {
      st(bar, clamp01(1 - ease(seg(f, 1.0, 1.3)) + ease(seg(f, 2.5, 2.8))));
      bar.style.color = rgb(mixRGB(BONE, INK, light));
    }
    st(barTabs, 1 - ease(seg(f, 0.3, 0.55)));
    st(barUrl, ease(seg(f, 0.45, 0.7)));
    st(urlWeb, f < 2 ? 1 : 0);
    st(urlDash, f < 2 ? 0 : 1);

    // 01 · code folds away, line by line
    codeRows.forEach((row, i) => {
      const p = ease(seg(f, 0.04 + i * 0.02, 0.24 + i * 0.02));
      st(row, 1 - p, p < 0.001 ? "none" : `translate3d(0,${(-6 * p).toFixed(2)}px,0) rotateX(${(-88 * p).toFixed(2)}deg)`);
    });
    editorChrome.forEach((el) => st(el, 1 - ease(seg(f, 0.3, 0.55))));

    // 01 · website builds in
    stagger(webItems, f, 0.42, 0.05, 0.3, 1.0);

    // Shared product cards: web card → app row → gone
    cards.forEach((card, i) => {
      const a = WEB_CARD(i);
      const b = APP_CARD(i);
      const p = ease(seg(f, 0.55 + i * 0.05, 0.85 + i * 0.05));
      const q = ease(seg(f, 2.0 + i * 0.04, 2.24 + i * 0.04));
      const mm = ease(seg(f, 1.08 + i * 0.035, 1.68 + i * 0.035));
      const cw = lerp(a.w, b.w, mm);
      const ch = lerp(a.h, b.h, mm);
      const y = lerp(a.y, b.y, mm) + (1 - p) * 14 - q * 10;
      const cs = card.style;
      cs.width = `${cw.toFixed(1)}px`;
      cs.height = `${ch.toFixed(1)}px`;
      cs.borderRadius = `${lerp(a.r, b.r, mm).toFixed(2)}px`;
      st(card, p * (1 - q), `translate3d(${X(lerp(a.x, b.x, mm), cw).toFixed(1)}px,${y.toFixed(1)}px,0)`);
      st(cardWeb[i], 1 - ease(seg(f, 1.08 + i * 0.035, 1.4 + i * 0.035)));
      st(cardApp[i], ease(seg(f, 1.28 + i * 0.035, 1.6 + i * 0.035)));
    });

    // 02 · app UI + notification
    stagger(appItems, f, 1.36, 0.05, 0.3, 2.0);
    {
      const n = ease(seg(f, 1.72, 1.98));
      const q = ease(seg(f, 2.0, 2.1));
      st(notif, n * (1 - q), ty(-(1 - n) * 64));
    }

    // 03 · dashboard: tiles, counters, bars, rows
    stagger(dashItems, f, 2.38, 0.035, 0.3);
    const kv = ease(seg(f, 2.55, 3.0));
    kpiVals.forEach((el, i) => setText(el, num((opts.kpiTargets[i] ?? 0) * kv)));
    bars.forEach((el, j) => {
      el.style.transform = `scaleY(${ease(seg(f, 2.6 + j * 0.033, 2.8 + j * 0.033)).toFixed(3)})`;
    });
    topFills.forEach((el, j) => {
      el.style.transform = `scaleX(${ease(seg(f, 2.7 + j * 0.05, 2.95 + j * 0.05)).toFixed(3)})`;
    });
    rows.forEach((el, j) => {
      const p = ease(seg(f, 2.66 + j * 0.05, 2.86 + j * 0.05));
      st(el, p, p > 0.999 ? "none" : `translate3d(${(sign * (1 - p) * 18).toFixed(2)}px,0,0)`);
    });

    // 04 · assistant slides out of the dashboard, then the conversation plays
    if (chat) {
      const sl = ease(seg(f, 3.08, 4));
      const panelRight = w / 2 + dx;
      const left = panelRight + lerp(-CHAT_W - 12, CHAT_OVERHANG - CHAT_W, sl);
      const y = -h / 2 + dy + CHAT_TOP - (1 - sl) * 16;
      st(chat, ease(seg(f, 3.05, 3.35)), `translate3d(${X(left, CHAT_W).toFixed(1)}px,${y.toFixed(1)}px,0) scale(${lerp(0.96, 1, sl).toFixed(4)})`);
    }
    st(aiNav, ease(seg(f, 3.0, 3.4)));

    const U = opts.userText;
    const R = opts.replyText;
    const typed = Math.round(seg(raw, 3.2, 3.4) * U.length);
    const sent = raw >= 3.44;
    setText(chatInput, sent ? "" : U.slice(0, typed));
    show(chatPlaceholder, sent || typed === 0);
    st(chatCaret, typed > 0 && !sent ? 1 : 0);

    show(chatUser, sent);
    const ui = ease(seg(raw, 3.44, 3.5));
    st(chatUser, ui, ty((1 - ui) * 10));

    const replyOn = raw >= 3.5;
    show(chatReply, replyOn);
    const ri = ease(seg(raw, 3.5, 3.55));
    st(chatReply, ri, ty((1 - ri) * 10));
    const rn = Math.round(seg(raw, 3.58, 3.88) * R.length);
    setText(chatReplyText, R.slice(0, rn));
    show(chatDots, rn === 0);

    show(chatPo, raw >= 3.88);
    const po = ease(seg(raw, 3.88, 3.96));
    st(chatPo, po, ty((1 - po) * 10));
    st(kpiRing, ease(seg(raw, 3.7, 3.8)));

    // Copy column: hero → 01 → 02 → 03 → 04 (one block visible at a time)
    copies.forEach((el, i) => {
      let o: number;
      let y: number;
      if (i === 0) {
        const q = ease(seg(f, 0.05, 0.4));
        o = 1 - q;
        y = -24 * q;
      } else {
        const p = ease(seg(f, i - 0.45, i - 0.05));
        const q = i < 4 ? ease(seg(f, i + 0.05, i + 0.4)) : 0;
        o = p * (1 - q);
        y = (1 - p) * 24 - q * 24;
      }
      st(el, o, ty(y));
      el.style.pointerEvents = o > 0.5 ? "" : "none";
    });

    // Progress rail
    const stepsO = ease(seg(f, 0.25, 0.6));
    steps.forEach((el) => st(el, stepsO));
    cues.forEach((el) => st(el, 1 - ease(seg(f, 0, 0.25))));
    stepFills.forEach((el, i) => {
      const j = i % 4;
      el.style.transform = `scaleX(${ease(seg(f, j, j + 1)).toFixed(3)})`;
    });
    stepLabels.forEach((el, i) => flag(el, f >= (i % 4) + 0.5));
  }

  let lastF = -1;
  let lastRaw = -1;
  let revealed = false;

  function update(force = false) {
    const rect = root.getBoundingClientRect();
    const range = Math.max(1, rect.height - m.stageH);
    const u = clamp01(-rect.top / range) * TOTAL;
    let raw = Math.min(4, Math.max(0, (u - T.hold) / T.seg));
    const k = Math.min(3, Math.floor(raw));
    let f = k + clamp01((raw - k) / T.trans);
    if (reduced) {
      // No in-between motion: scenes swap like slides.
      f = Math.round(f);
      raw = f;
    }
    if (!force && f === lastF && raw === lastRaw) return;
    lastF = f;
    lastRaw = raw;
    if (f > 0.02) opts.onLeaveHero();
    render(f, raw);
    if (!revealed) {
      revealed = true;
      rig.style.opacity = "1";
    }
  }

  return {
    measure,
    update,
    setReduced(v: boolean) {
      reduced = v;
      update(true);
    },
  };
}

/* ── Hero editor: code types itself on load (time-based, DOM writes only) ── */
export interface Typer {
  start(delay: number): void;
  finish(): void;
  stop(): void;
}

export function createTyper(root: HTMLElement): Typer {
  const toks = Array.from(root.querySelectorAll<HTMLElement>('[data-a="code-tok"]'));
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-a="code-row"]'));
  const carets = Array.from(root.querySelectorAll<HTMLElement>('[data-a="caret"]'));
  const shown = new Array<number>(toks.length).fill(-1);
  let count = -1;
  let line = -1;
  let raf = 0;
  let timer = 0;
  let t0 = 0;
  let done = false;

  function render(n: number) {
    if (n === count) return;
    count = n;
    CODE_TOKENS.forEach((t, i) => {
      const v = Math.max(0, Math.min(t.text.length, n - t.start));
      if (v !== shown[i] && toks[i]) {
        shown[i] = v;
        toks[i].textContent = t.text.slice(0, v);
      }
    });
    let L = 0;
    for (let i = 0; i < CODE_LINES.length; i++) if (n >= CODE_LINES[i].start) L = i;
    if (L !== line) {
      if (line >= 0) {
        delete rows[line]?.dataset.on;
        delete carets[line]?.dataset.on;
      }
      line = L;
      if (rows[L]) rows[L].dataset.on = "true";
      if (carets[L]) carets[L].dataset.on = "true";
    }
  }

  function tick(now: number) {
    const elapsed = now - t0;
    let c = Math.max(0, count);
    while (c < CODE_TIMES.length && CODE_TIMES[c] <= elapsed) c++;
    if (c >= CODE_TIMES.length) {
      finish();
      return;
    }
    render(Math.min(c, CODE_LENGTH));
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(raf);
    window.clearTimeout(timer);
  }

  function finish() {
    if (done) return;
    done = true;
    stop();
    render(CODE_LENGTH);
    if (carets[line]) carets[line].dataset.blink = "true";
  }

  return {
    start(delay: number) {
      render(0);
      timer = window.setTimeout(() => {
        t0 = performance.now();
        raf = requestAnimationFrame(tick);
      }, delay);
    },
    finish,
    stop,
  };
}
