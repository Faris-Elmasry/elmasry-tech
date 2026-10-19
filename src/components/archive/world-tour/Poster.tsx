import { cn } from "@/lib/utils";

/**
 * Static stand-in for the 3D world: horizon glow, perspective grid floor and
 * two orange rails converging on the same vanishing point the camera uses
 * (66% across on wide LTR screens, 34% in RTL, centred-high on narrow ones).
 * Shown before three.js loads, if WebGL is unavailable, and for reduced motion.
 */
export function Poster({ ar, className }: { ar: boolean; className?: string }) {
  const vx = ar ? 34 : 66;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[var(--bg-primary)] [--vx:50%] [--vy:36%] lg:[--vy:47%]",
        ar ? "lg:[--vx:34%]" : "lg:[--vx:66%]",
        className,
      )}
    >
      {/* Horizon glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 30% at var(--vx) var(--vy), rgba(255,91,31,0.2), rgba(255,91,31,0.05) 55%, transparent 75%), radial-gradient(90% 60% at var(--vx) var(--vy), rgba(255,138,76,0.05), transparent 70%)",
        }}
      />
      {/* Grid floor */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: "var(--vy)", perspective: "460px", perspectiveOrigin: "var(--vx) 0%" }}>
        <div
          className="absolute"
          style={{
            left: "-60%",
            right: "-60%",
            top: 0,
            height: "260%",
            transform: "rotateX(76deg)",
            transformOrigin: "50% 0%",
            backgroundImage:
              "linear-gradient(rgba(237,234,227,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.07) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            backgroundPosition: "center top",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
          }}
        />
      </div>
      {/* Rails — wide screens */}
      <svg className="absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none">
        <line x1={`${vx - 0.3}%`} y1="47%" x2={`${vx - 13}%`} y2="100%" stroke="#ff5b1f" strokeOpacity="0.55" strokeWidth="1" />
        <line x1={`${vx + 0.3}%`} y1="47%" x2={`${vx + 13}%`} y2="100%" stroke="#ff5b1f" strokeOpacity="0.55" strokeWidth="1" />
      </svg>
      {/* Rails — narrow screens */}
      <svg className="absolute inset-0 h-full w-full lg:hidden" preserveAspectRatio="none">
        <line x1="49.4%" y1="36%" x2="8%" y2="100%" stroke="#ff5b1f" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="50.6%" y1="36%" x2="92%" y2="100%" stroke="#ff5b1f" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
      {/* Distant beacon */}
      <div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb38a]"
        style={{ left: "var(--vx)", top: "calc(var(--vy) - 2%)", boxShadow: "0 0 24px 8px rgba(255,91,31,0.45), 0 0 80px 30px rgba(255,91,31,0.18)" }}
      />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(10,10,11,0.85) 100%)" }} />
    </div>
  );
}
