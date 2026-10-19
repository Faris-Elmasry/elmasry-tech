import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { AppScreen, ChatScreen } from "./PhoneScreens";
import { DEPTH, LH, LW, PHONE_H, PHONE_W, THICK, laptopParts } from "./rig";

const p3d: CSSProperties = { transformStyle: "preserve-3d" };

/* Space-grey aluminium */
const ALU_LID = "linear-gradient(180deg,#3d3d42 0%,#2b2b2f 5%,#252528 55%,#202023 100%)";
const ALU_DECK = "linear-gradient(180deg,#1d1d20 0%,#2f2f33 3.5%,#2b2b2f 45%,#262629 100%)";
const ALU_EDGE = "linear-gradient(180deg,#56565c 0%,#2c2c30 35%,#18181a 100%)";
const GLARE = "linear-gradient(120deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.018) 32%,rgba(255,255,255,0) 52%)";

/* Keyboard layout: rows of relative key widths. */
const ROWS: { h: number; keys: number[] }[] = [
  { h: 19, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { h: 34, keys: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5] },
  { h: 34, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { h: 34, keys: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75] },
  { h: 34, keys: [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3] },
  { h: 34, keys: [1, 1, 1, 1.25, 5.2, 1.25, 1, 3] },
];

const KEY: CSSProperties = {
  background: "linear-gradient(180deg,#151517 0%,#0c0c0d 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.07), 0 0 0 .5px rgba(0,0,0,.7)",
  borderRadius: 5,
};

function Keyboard() {
  return (
    <div className="absolute inset-[8px] flex flex-col gap-[5px]">
      {ROWS.map((row, r) => (
        <div key={r} className="flex gap-[5px]" style={{ height: row.h }}>
          {row.keys.map((w, k) =>
            r === 5 && k === row.keys.length - 1 ? (
              // Arrow cluster: half-height up/down in the middle
              <div key={k} className="flex gap-[5px]" style={{ flex: w }}>
                <span className="mt-auto h-1/2 flex-1" style={KEY} />
                <span className="flex flex-1 flex-col gap-[2px]">
                  <span className="flex-1" style={KEY} />
                  <span className="flex-1" style={KEY} />
                </span>
                <span className="mt-auto h-1/2 flex-1" style={KEY} />
              </div>
            ) : (
              <span key={k} style={{ ...KEY, flex: w }} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

function Grille({ style }: { style: CSSProperties }) {
  return (
    <div
      className="absolute rounded-[4px] opacity-70"
      style={{ ...style, backgroundImage: "radial-gradient(circle,rgba(0,0,0,.75) 0 1px,transparent 1.3px)", backgroundSize: "5px 5px" }}
    />
  );
}

export function Laptop() {
  const parts = laptopParts(1);
  return (
    <div data-k="laptop" className="absolute inset-0" style={p3d}>
      {/* ── Lid ── */}
      <div data-k="lid" className="absolute inset-0" style={{ ...p3d, transformOrigin: "50% 100%", transform: parts.lid }}>
        <div
          data-k="shell"
          className="absolute inset-0 rounded-[22px_22px_10px_10px]"
          style={{ ...p3d, background: ALU_LID, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.28)", transform: parts.shell }}
        >
          {/* top edge (lid thickness) */}
          <div className="absolute inset-x-[20px] top-0 h-[7px] origin-top" style={{ background: ALU_EDGE, transform: "rotateX(-90deg)" }} />
        </div>
        <div
          data-k="panel"
          className="absolute inset-[3px] overflow-hidden rounded-[19px_19px_8px_8px] bg-[#050506]"
          style={{ transform: parts.panel, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)" }}
        >
          <span className="absolute left-1/2 top-[6px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#1a1a22] shadow-[0_0_0_1.5px_#0d0d10]" />
          {/* Display glass. The live UI is NOT drawn here (3D layers blur text); a flat 2D
              overlay is laid over this exact rectangle once the laptop is assembled. */}
          <div
            data-k="display"
            className="absolute overflow-hidden rounded-[5px]"
            style={{ left: 14, right: 14, top: 16, bottom: 24, background: "radial-gradient(90% 70% at 70% 110%,rgba(255,91,31,.1),transparent 60%),#000" }}
          >
            <div className="absolute inset-0" style={{ background: GLARE }} />
          </div>
        </div>
      </div>

      {/* ── Base ── */}
      <div
        data-k="base"
        className="absolute left-0"
        style={{ ...p3d, top: LH, width: LW, height: DEPTH, transformOrigin: "50% 0", transform: parts.base }}
      >
        {/* floor shadow */}
        <div
          data-k="shadow"
          className="absolute"
          style={{
            left: -90,
            top: -40,
            width: LW + 180,
            height: DEPTH + 150,
            background: "radial-gradient(closest-side,rgba(0,0,0,.85),rgba(0,0,0,.45) 55%,transparent)",
            transform: parts.shadow,
            opacity: 0.4,
          }}
        />
        <div data-k="deck" className="absolute inset-0" style={{ ...p3d, transform: parts.deck }}>
          {/* Top surface: one flat layer (no coplanar 3D siblings → no sorting artefacts) */}
          <div
            className="absolute inset-0 rounded-[6px_6px_14px_14px]"
            style={{ background: ALU_DECK, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08), inset 0 -1.5px 0 rgba(255,255,255,.16)" }}
          >
            <div className="absolute inset-x-[110px] top-0 h-[12px] rounded-b-[4px] bg-gradient-to-b from-[#0e0e10] to-[#1e1e21]" />
            <div className="absolute rounded-[10px] bg-[#141416]" style={{ left: 62, top: 30, width: 596, height: 238, boxShadow: "inset 0 1px 3px rgba(0,0,0,.8)" }} />
            <Grille style={{ left: 18, top: 34, width: 32, height: 230 }} />
            <Grille style={{ right: 18, top: 34, width: 32, height: 230 }} />
            <div className="absolute rounded-[12px] bg-[#1f1f22]" style={{ left: (LW - 304) / 2, top: 288, width: 304, height: 184 }} />
            <div
              data-k="spill"
              className="absolute inset-0 rounded-[6px_6px_14px_14px]"
              style={{ background: "radial-gradient(70% 55% at 50% 0%,rgba(255,120,60,.2),transparent 70%)", opacity: 0 }}
            />
          </div>
          {/* front edge with thumb notch */}
          <div className="absolute inset-x-[10px] origin-top" style={{ top: DEPTH, height: THICK, background: ALU_EDGE, transform: "rotateX(-90deg)" }}>
            <span className="absolute left-1/2 top-0 h-[5px] w-[120px] -translate-x-1/2 rounded-b-[6px] bg-black/50" />
          </div>
          {/* side edges */}
          <div className="absolute left-0 top-[6px] origin-left" style={{ width: THICK, height: DEPTH - 16, background: "linear-gradient(90deg,#3a3a3f,#18181a)", transform: "rotateY(90deg)" }} />
          <div className="absolute top-[6px] origin-left" style={{ left: LW, width: THICK, height: DEPTH - 16, background: "linear-gradient(90deg,#3a3a3f,#18181a)", transform: "rotateY(90deg)" }} />
        </div>

        {/* keyboard (floats as its own part) */}
        <div data-k="keys" className="absolute" style={{ left: 62, top: 30, width: 596, height: 238, transform: parts.keys }}>
          <div data-k="kbGlow" className="absolute inset-[4px] rounded-[8px]" style={{ background: "radial-gradient(120% 140% at 50% 50%,rgba(255,110,50,.5),rgba(255,110,50,.18))", opacity: 0 }} />
          <Keyboard />
        </div>

        {/* trackpad (floats as its own part) */}
        <div
          data-k="pad"
          className="absolute rounded-[12px]"
          style={{
            left: (LW - 300) / 2,
            top: 290,
            width: 300,
            height: 180,
            background: "linear-gradient(180deg,#323236,#2a2a2e)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.11), inset 0 1px 0 rgba(255,255,255,.08), 0 0 0 1px rgba(0,0,0,.35)",
            transform: parts.pad,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Flat 2D phone (no 3D, no transform scaling): authored at PHONE_W × PHONE_H and
 * sized with CSS zoom, so its UI is laid out at the real on-screen size.
 */
export function Phone({ locale }: { locale: Locale }) {
  return (
    <div
      data-k="phone"
      className="absolute left-0 top-0 rounded-[54px] p-[3px]"
      style={{
        width: PHONE_W,
        height: PHONE_H,
        zoom: 0.5,
        opacity: 0,
        background: "linear-gradient(135deg,#6a6a70 0%,#2c2c30 22%,#1c1c1f 60%,#4a4a50 100%)",
        boxShadow: "0 40px 80px -24px rgba(0,0,0,.85), 0 0 0 1px rgba(0,0,0,.6)",
      }}
    >
      <span className="absolute -right-[2px] top-[170px] h-[84px] w-[4px] rounded-r-[3px] bg-[#3a3a3f]" />
      <span className="absolute -left-[2px] top-[120px] h-[32px] w-[4px] rounded-l-[3px] bg-[#3a3a3f]" />
      <span className="absolute -left-[2px] top-[172px] h-[56px] w-[4px] rounded-l-[3px] bg-[#3a3a3f]" />
      <span className="absolute -left-[2px] top-[240px] h-[56px] w-[4px] rounded-l-[3px] bg-[#3a3a3f]" />
      <div className="relative h-full w-full rounded-[51px] bg-[#050506] p-[7px]">
        <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-black">
          <div data-k="phApp" className="absolute inset-0" style={{ contentVisibility: "hidden" }}>
            <AppScreen locale={locale} />
          </div>
          <div data-k="phChat" className="absolute inset-0" style={{ opacity: 0, contentVisibility: "hidden" }}>
            <ChatScreen locale={locale} />
          </div>
          <span className="absolute left-1/2 top-[11px] h-[28px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
