import React, { useId, useState } from "react";

/**
 * DeskLamp — articulated brass lamp for the E06 desk scene.
 *
 * USAGE
 *   const [lampOn, setLampOn] = useState(true);
 *   <DeskLamp
 *     on={lampOn}
 *     onChange={setLampOn}          // also drive your "Lamp: OFF" pill from lampOn
 *     size={150}                    // width in px; height follows
 *     style={{ position: "absolute", right: "7%", bottom: "BOTTOM_PX" }}
 *   />
 *
 * PLACEMENT (this is what "sits on the table" means)
 *   The bottom edge of the component box is the underside of the lamp base.
 *   Set `bottom` (or `top`) so that edge lands on the desk surface at the depth
 *   where you want the lamp. Nothing else needs tuning.
 *
 * REQUIREMENTS
 *   - Render it last inside the scene so it paints above the desk objects.
 *   - Do not give the lamp's own wrapper a z-index/transform/opacity: that would
 *     isolate the light layer and stop it from blending with the desk. Put the
 *     stacking context on the scene container instead.
 *   - The scene container should have overflow: hidden (the light spills far).
 *
 * WHY THE HEAD NEVER DETACHES
 *   The shade is drawn inside <g transform="translate(J2) rotate(TILT)">, and the
 *   upper arm ends at J2. Arm end and shade apex are the same point by
 *   construction. The light pool is derived from the shade angle, so changing
 *   TILT moves the beam and the pool with it.
 */

export interface DeskLampProps {
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  size?: number;
  dimRoom?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface Point {
  x: number;
  y: number;
}

/* ---------- geometry (SVG units). Everything below derives from these ---------- */
const VB = { x: 0, y: 80, w: 260, h: 414 };
const BASE: Point = { x: 110, y: 452 }; // lower pivot, on top of the base collar
const J1: Point = { x: 215, y: 255 }; // elbow
const J2: Point = { x: 95, y: 118 }; // head pivot = apex of the shade
const TILT = 28; // degrees; shade points down and to the left
const DESK_Y = 488; // height at which the beam meets the desk
const POOL_RX = 205;
const POOL_RY = 62;
const SHADE_R = 54; // shade radius at the mouth
const SHADE_H = 62; // shade height along its axis

const rad = (d: number) => (d * Math.PI) / 180;
const rot = (p: Point, d: number): Point => ({
  x: p.x * Math.cos(rad(d)) - p.y * Math.sin(rad(d)),
  y: p.x * Math.sin(rad(d)) + p.y * Math.cos(rad(d)),
});
const fromShade = (p: Point): Point => {
  const r = rot(p, TILT);
  return { x: J2.x + r.x, y: J2.y + r.y };
};

const rimL = fromShade({ x: -SHADE_R, y: SHADE_H });
const rimR = fromShade({ x: SHADE_R, y: SHADE_H });
const mouth = fromShade({ x: 0, y: SHADE_H + 4 });
const axis = rot({ x: 0, y: 1 }, TILT);
const pool = {
  x: mouth.x + axis.x * ((DESK_Y - mouth.y) / axis.y),
  y: DESK_Y,
};
const beamPoints = [
  `${rimL.x},${rimL.y}`,
  `${pool.x - POOL_RX * 0.9},${DESK_Y}`,
  `${pool.x + POOL_RX * 0.9},${DESK_Y}`,
  `${rimR.x},${rimR.y}`,
].join(" ");

/* ---------- small parts ---------- */
function Rod({ a, b, gap = 0 }: { a: Point; b: Point; gap?: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * gap;
  const ny = (dx / len) * gap;
  const p = { x1: a.x + nx, y1: a.y + ny, x2: b.x + nx, y2: b.y + ny };
  return (
    <g strokeLinecap="round">
      <line {...p} stroke="#2a1c0c" strokeWidth="7.5" />
      <line {...p} stroke="#b98a3a" strokeWidth="5" />
      <line
        x1={p.x1 - 1}
        y1={p.y1 - 1}
        x2={p.x2 - 1}
        y2={p.y2 - 1}
        stroke="#f0d28a"
        strokeWidth="1.4"
        opacity="0.75"
      />
    </g>
  );
}

function Spring({ a, b }: { a: Point; b: Point }) {
  const p = { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  return (
    <g strokeLinecap="butt">
      <line {...p} stroke="#2a1c0c" strokeWidth="4" />
      <line {...p} stroke="#e4d2a0" strokeWidth="2.6" strokeDasharray="1.6 2.4" />
    </g>
  );
}

function Joint({ at, r = 11, brass }: { at: Point; r?: number; brass: string }) {
  return (
    <g transform={`translate(${at.x} ${at.y})`}>
      <circle r={r} fill={`url(#${brass})`} stroke="#2a1c0c" strokeWidth="1.5" />
      <circle r={r * 0.38} fill="#2a1c0c" />
      <circle r={r * 0.38 - 1.6} cx="-0.6" cy="-0.6" fill="#8a6a2c" />
    </g>
  );
}

/* ---------- component ---------- */
export default function DeskLamp({
  on,
  defaultOn = true,
  onChange,
  size = 220,
  dimRoom = true,
  className = "",
  style,
}: DeskLampProps) {
  const [inner, setInner] = useState(defaultOn);
  const lit = on ?? inner;
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${uid}-${n}`;

  const toggle = () => {
    const next = !lit;
    if (on === undefined) setInner(next);
    onChange?.(next);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const viewBox = `${VB.x} ${VB.y} ${VB.w} ${VB.h}`;
  const height = (size * VB.h) / VB.w;
  const layer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  };

  return (
    <div
      className={`desk-lamp ${lit ? "is-on" : ""} ${className}`}
      style={{ position: "relative", width: size, height, ...style }}
    >
      <style>{`
        .desk-lamp .glow { opacity: 0; transition: opacity .35s ease; }
        .desk-lamp.is-on .glow { opacity: 1; animation: lamp-strike .5s linear; }
        .desk-lamp .dim { opacity: 0; transition: opacity .5s ease; }
        .desk-lamp.is-on .dim { opacity: 1; }
        .desk-lamp .lamp-body { pointer-events: auto; cursor: pointer; outline: none; }
        .desk-lamp .focus-ring { opacity: 0; }
        .desk-lamp .lamp-body:focus-visible .focus-ring { opacity: 1; }
        @keyframes lamp-strike {
          0% { opacity: 0 } 16% { opacity: .9 } 28% { opacity: .2 }
          46% { opacity: 1 } 60% { opacity: .65 } 100% { opacity: 1 }
        }
        @media (prefers-reduced-motion: reduce) {
          .desk-lamp .glow, .desk-lamp .dim { transition: none; animation: none !important; }
        }
      `}</style>

      {/* LAYER A — light. Screen-blended so it brightens the desk underneath. */}
      <svg viewBox={viewBox} style={{ ...layer, mixBlendMode: "screen" }} aria-hidden="true">
        <defs>
          <radialGradient id={id("pool")}>
            <stop offset="0" stopColor="#ffd58c" stopOpacity="0.62" />
            <stop offset="0.5" stopColor="#ffb85a" stopOpacity="0.24" />
            <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={id("beam")}
            gradientUnits="userSpaceOnUse"
            x1={mouth.x}
            y1={mouth.y}
            x2={pool.x}
            y2={pool.y}
          >
            <stop offset="0" stopColor="#ffe2a8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffb85a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("bloom")}>
            <stop offset="0" stopColor="#fff1c8" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="#ffc873" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
          </radialGradient>
          <filter
            id={id("soft")}
            filterUnits="userSpaceOnUse"
            x="-700"
            y="0"
            width="1200"
            height="700"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g className="glow">
          <ellipse cx={pool.x} cy={pool.y} rx={POOL_RX} ry={POOL_RY} fill={`url(#${id("pool")})`} />
          <polygon points={beamPoints} fill={`url(#${id("beam")})`} filter={`url(#${id("soft")})`} />
          <circle cx={mouth.x} cy={mouth.y} r="58" fill={`url(#${id("bloom")})`} />
        </g>
      </svg>

      {/* LAYER B — room falloff + the lamp itself */}
      <svg viewBox={viewBox} style={layer}>
        <defs>
          <radialGradient id={id("brass")} cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#f4dc9a" />
            <stop offset="0.55" stopColor="#c8963f" />
            <stop offset="1" stopColor="#6e4a1a" />
          </radialGradient>
          <linearGradient id={id("enamel")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0c0a08" />
            <stop offset="0.28" stopColor="#3b3128" />
            <stop offset="0.6" stopColor="#17120e" />
            <stop offset="1" stopColor="#070605" />
          </linearGradient>
          <linearGradient id={id("shell")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#cdbf9c" />
            <stop offset="0.3" stopColor="#f6ebcd" />
            <stop offset="0.7" stopColor="#d9c8a0" />
            <stop offset="1" stopColor="#8d7d5c" />
          </linearGradient>
          <radialGradient id={id("shellglow")} cx="0.5" cy="1" r="0.8">
            <stop offset="0" stopColor="#ffc060" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={id("dim")}
            gradientUnits="userSpaceOnUse"
            cx={pool.x}
            cy={pool.y - 20}
            r="1100"
          >
            <stop offset="0" stopColor="#0a0500" stopOpacity="0" />
            <stop offset="0.3" stopColor="#0a0500" stopOpacity="0" />
            <stop offset="1" stopColor="#0a0500" stopOpacity="0.45" />
          </radialGradient>
          <filter id={id("blur4")} x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={id("blur15")} x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {dimRoom && (
          <rect
            className="dim"
            x="-2500"
            y="-2500"
            width="5000"
            height="5000"
            fill={`url(#${id("dim")})`}
          />
        )}

        {/* contact shadows: this is what pins the base to the wood */}
        <ellipse cx="120" cy="490" rx="78" ry="11" fill="#000" opacity="0.55" filter={`url(#${id("blur4")})`} />
        <ellipse cx="110" cy="491" rx="64" ry="8" fill="#000" opacity="0.65" filter={`url(#${id("blur15")})`} />

        <g
          className="lamp-body"
          role="switch"
          aria-checked={lit}
          aria-label="Desk lamp"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={onKey}
        >
          <rect
            className="focus-ring"
            x="8"
            y="100"
            width="244"
            height="394"
            rx="14"
            fill="none"
            stroke="#f0d28a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* generous hit area so the lamp is easy to tap */}
          <rect x="14" y="104" width="232" height="388" fill="transparent" />

          {/* base */}
          <path
            d={`M${BASE.x - 62} 466 V480 A62 12 0 0 0 ${BASE.x + 62} 480 V466 Z`}
            fill={`url(#${id("enamel")})`}
          />
          <ellipse cx={BASE.x} cy="466" rx="62" ry="12" fill="#241d16" stroke="#5a4a38" strokeWidth="0.8" />
          <ellipse cx={BASE.x} cy="464" rx="50" ry="9" fill="#14100c" />
          <ellipse cx={BASE.x} cy="458" rx="18" ry="5.5" fill={`url(#${id("brass")})`} stroke="#2a1c0c" strokeWidth="1" />

          {/* arms: lower pair with spring, upper pair */}
          <Spring a={{ x: BASE.x + 2, y: BASE.y - 6 }} b={{ x: J1.x - 2, y: J1.y + 8 }} />
          <Rod a={BASE} b={J1} gap={6} />
          <Rod a={BASE} b={J1} gap={-6} />
          <Rod a={J1} b={J2} gap={5} />
          <Rod a={J1} b={J2} gap={-5} />

          {/* shade: origin = J2, so it is welded to the arm end */}
          <g transform={`translate(${J2.x} ${J2.y}) rotate(${TILT})`}>
            <path
              d={`M0 0 C22 0 ${SHADE_R} 24 ${SHADE_R} ${SHADE_H} A${SHADE_R} 10 0 0 1 ${-SHADE_R} ${SHADE_H} C${-SHADE_R} 24 -22 0 0 0 Z`}
              fill={`url(#${id("shell")})`}
              stroke="#4a3a22"
              strokeWidth="1.2"
            />
            {/* highlight streak */}
            <path d="M-30 30 C-26 18 -14 8 -4 5" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
            {/* brass band near the rim */}
            <path
              d={`M${-SHADE_R + 1} ${SHADE_H - 8} A${SHADE_R - 1} 9 0 0 0 ${SHADE_R - 1} ${SHADE_H - 8}`}
              fill="none"
              stroke="#b98a3a"
              strokeWidth="2.4"
            />
            {/* lit shell + light spilling from under the rim */}
            <g className="glow">
              <path
                d={`M0 0 C22 0 ${SHADE_R} 24 ${SHADE_R} ${SHADE_H} A${SHADE_R} 10 0 0 1 ${-SHADE_R} ${SHADE_H} C${-SHADE_R} 24 -22 0 0 0 Z`}
                fill={`url(#${id("shellglow")})`}
              />
              <ellipse cx="0" cy={SHADE_H + 6} rx={SHADE_R - 6} ry="5" fill="#ffe3a6" opacity="0.95" filter={`url(#${id("blur15")})`} />
            </g>
            {/* clevis cap on the apex */}
            <ellipse cx="0" cy="1" rx="9" ry="4" fill={`url(#${id("brass")})`} stroke="#2a1c0c" strokeWidth="1" />
          </g>

          <Joint at={BASE} r={10} brass={id("brass")} />
          <Joint at={J1} r={11} brass={id("brass")} />
          <Joint at={J2} r={8} brass={id("brass")} />
        </g>
      </svg>
    </div>
  );
}
