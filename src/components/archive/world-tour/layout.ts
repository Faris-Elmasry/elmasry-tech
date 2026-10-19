/**
 * World layout for the 3D tour — plain numbers, no three.js import, so the
 * static (reduced-motion) composition can share the panel specs.
 *
 * Units: 1 world unit = 1 CSS pixel of a panel at scale 1. Panels are real
 * DOM elements rendered by CSS3DRenderer, so keeping them at scale 1 means the
 * browser rasterises text at the projected size — always crisp.
 *
 * Everything is authored for LTR (panels on the right, copy on the left);
 * the scene mirrors x for RTL.
 */

export type Vec3 = readonly [number, number, number];

export const FLOOR_Y = -420;

/** Station centres. 0 = "Your idea" (the glowing core), 1–4 = the services. */
export const STATIONS: readonly Vec3[] = [
  [40, 60, 0],
  [0, 40, -3000],
  [40, 40, -6000],
  [0, 50, -9000],
  [30, 50, -12000],
];

/** The glowing gate at the end of the path. */
export const PORTAL: Vec3 = [0, 250, -15200];

/** The idea light bulb, relative to the idea station (scale = world size multiplier). */
export const CORE = {
  wide: { pos: [-60, 10, -60] as Vec3, scale: 1.2 },
  compact: { pos: [0, 150, -120] as Vec3, scale: 1.05 },
};
/** Keep-out ellipse around the bulb in world units at scale 1 (glass width × full height incl. base). */
export const CORE_RADIUS = { x: 165, y: 258 };

/** Big 3D words: centre relative to their station, and the widest they may get. */
export const WORD_PLACE = { wide: { y: 500, z: -170, maxW: 900 }, compact: { y: 640, z: -170, maxW: 860 } };
/** Extra lift for the intro word so it floats clear of the bulb's keep-out zone. */
export const IDEA_WORD_LIFT = 70;

/** Big step numerals tilted back on the floor in front of stations 1–4 (wide screens; on phones that floor sits under the copy). */
export const NUMERAL_PLACE = { wide: { x: -20, z: 110 }, compact: { x: 0, z: 300 } };

export type PanelKind =
  | "idea-note"
  | "web-shop"
  | "web-search"
  | "app-photo"
  | "app-phone"
  | "app-notify"
  | "biz-today"
  | "ai-chat"
  | "ai-247";

export interface PanelPlacement {
  pos: Vec3;
  /** Yaw in degrees (LTR). */
  rot: number;
  /** Optional roll in degrees (LTR) — a slight "held in the hand" tilt. */
  roll?: number;
}

export interface PanelSpec {
  id: string;
  kind: PanelKind;
  station: number;
  w: number;
  h: number;
  wide: PanelPlacement;
  /** Placement on narrow screens; omitted = hidden there. */
  compact?: PanelPlacement;
}

export const PANELS: readonly PanelSpec[] = [
  // 0 — Your idea: the bulb + a sticky note (beside it, never over it)
  { id: "s0a", kind: "idea-note", station: 0, w: 400, h: 240, wide: { pos: [380, -270, 150], rot: -10 } },

  // 1 — Website: the café's site on a laptop + how people find it
  { id: "s1a", kind: "web-shop", station: 1, w: 820, h: 540, wide: { pos: [-60, 30, 0], rot: 6 }, compact: { pos: [0, 70, 0], rot: 0 } },
  { id: "s1b", kind: "web-search", station: 1, w: 420, h: 300, wide: { pos: [325, 230, 210], rot: -10 } },

  // 2 — App: Mona on her sofa, her phone showing the order on its way, the notification
  { id: "s2a", kind: "app-photo", station: 2, w: 380, h: 430, wide: { pos: [-270, 10, -120], rot: 12, roll: 4 } },
  { id: "s2b", kind: "app-phone", station: 2, w: 340, h: 700, wide: { pos: [120, 20, 30], rot: -6, roll: -3 }, compact: { pos: [0, 20, 0], rot: 0, roll: -3 } },
  { id: "s2c", kind: "app-notify", station: 2, w: 440, h: 118, wide: { pos: [300, 300, 250], rot: -8 }, compact: { pos: [70, 340, 230], rot: -4 } },

  // 3 — One screen: the owner's tablet with today's three numbers
  { id: "s3a", kind: "biz-today", station: 3, w: 900, h: 600, wide: { pos: [-10, 30, 0], rot: 5 }, compact: { pos: [0, 60, 0], rot: 0 } },

  // 4 — Assistant: WhatsApp-style chat answered by the assistant at night
  { id: "s4a", kind: "ai-chat", station: 4, w: 360, h: 720, wide: { pos: [-110, 20, 0], rot: 7 }, compact: { pos: [-30, 30, 0], rot: 0 } },
  { id: "s4b", kind: "ai-247", station: 4, w: 380, h: 190, wide: { pos: [300, -130, 200], rot: -10 } },
];

/** Which panels the static (reduced-motion) layout shows per service station. */
export const PREVIEW: readonly (readonly PanelKind[])[] = [
  ["web-shop", "web-search"],
  ["app-phone", "app-photo"],
  ["biz-today"],
  ["ai-chat", "ai-247"],
];

export function panelSize(kind: PanelKind): { w: number; h: number } {
  const spec = PANELS.find((p) => p.kind === kind);
  return spec ? { w: spec.w, h: spec.h } : { w: 400, h: 300 };
}

const add = (a: Vec3, x: number, y: number, z: number): Vec3 => [a[0] + x, a[1] + y, a[2] + z];

/**
 * Camera rig: control points for the camera path and a matching set of
 * look-at targets. Even points are the station "dwell" viewpoints (0 = the
 * idea / hero); odd points swing the camera past each cluster on the copy
 * side, so panels always exit on the far side of the screen.
 */
export function cameraRig(compact: boolean): { cam: Vec3[]; look: Vec3[] } {
  const cam: Vec3[] = [];
  const look: Vec3[] = [];
  const last = STATIONS[STATIONS.length - 1];
  if (compact) {
    for (const c of STATIONS) {
      cam.push(add(c, 0, 220, 1950));
      look.push(add(c, 0, 130, 0));
      cam.push(add(c, -980, 230, -220));
      look.push(add(c, -820, 80, -1900));
    }
    cam.pop();
    look.pop();
    cam.push(add(last, -900, 220, -1400));
    look.push(add(last, -600, 120, -3000));
    cam.push([PORTAL[0], 260, PORTAL[2] + 2500]);
    look.push(PORTAL);
  } else {
    for (const c of STATIONS) {
      cam.push(add(c, -250, 160, 1760));
      look.push(add(c, 30, 90, 0));
      cam.push(add(c, -900, 90, -200));
      look.push(add(c, -660, 50, -1850));
    }
    cam.pop();
    look.pop();
    cam.push(add(last, -880, 120, -1300));
    look.push(add(last, -500, 120, -3000));
    cam.push([PORTAL[0] - 160, 230, PORTAL[2] + 2350]);
    look.push(PORTAL);
  }
  return { cam, look };
}

/** Control-point indices the scroll stops on: idea, 4 stations, end. */
export const STOP_INDEX = [0, 2, 4, 6, 8, 10] as const;
/** Scroll progress at each stop. */
export const STOP_PROGRESS = [0, 0.2, 0.4, 0.6, 0.8, 1] as const;

/** Floor rail centre-line (x, z): a straight runway that bends gently into the end gate. */
export function railLine(): [number, number][] {
  return [
    [-560, 6400],
    [-560, -3000],
    [-560, -9000],
    [-500, -12600],
    [-160, PORTAL[2] + 900],
    [PORTAL[0], PORTAL[2] + 200],
  ];
}
