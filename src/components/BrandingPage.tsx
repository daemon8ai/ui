import { useRef, useState, useEffect, useCallback, useId } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Download, X } from 'lucide-react'

const CX = 20, CY = 20, R = 18.5

function bpPt(aDeg: number, r: number = R) {
  const rad = (aDeg * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

const CONN_R = 17.2
const bpConn0 = bpPt(0, CONN_R), bpConn45 = bpPt(45, CONN_R)
const bpConn135 = bpPt(135, CONN_R), bpConn180 = bpPt(180, CONN_R)
const bpConn225 = bpPt(225, CONN_R), bpConn315 = bpPt(315, CONN_R)
const bpLine0 = bpPt(0, 16.2), bpLine45 = bpPt(45, 16.2)
const bpLine135 = bpPt(135, 16.2), bpLine180 = bpPt(180, 16.2)
const bpLine225 = bpPt(225, 16.2), bpLine315 = bpPt(315, 16.2)

function LogoSVG({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="bp-inner-clip">
          <circle cx="20" cy="20" r="17.9" />
        </clipPath>
      </defs>
      <g clipPath="url(#bp-inner-clip)">
        <circle cx="20" cy="20" r="14" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.025" />
        <circle cx="20" cy="20" r="11.5" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.03" />
        <circle cx="20" cy="20" r="9.5" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.035" />
        <circle cx="20" cy="20" r="8" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.04" />
        <circle cx="20" cy="20" r="6.8" stroke={primaryColor} strokeWidth="0.3" fill="none" opacity="0.05" />
        <circle cx="20" cy="20" r="5.8" stroke={primaryColor} strokeWidth="0.3" fill="none" opacity="0.055" />
        <circle cx="20" cy="20" r="5" stroke={primaryColor} strokeWidth="0.35" fill="none" opacity="0.06" />
        <circle cx="20" cy="20" r="4" stroke={primaryColor} strokeWidth="0.45" fill="none" opacity="0.09" />
        <line x1={bpLine225.x} y1={bpLine225.y} x2="20" y2="20" stroke={mutedColor} strokeWidth="0.7" opacity="0.18" />
        <line x1={bpLine315.x} y1={bpLine315.y} x2="20" y2="20" stroke={mutedColor} strokeWidth="0.7" opacity="0.18" />
        <line x1={bpLine135.x} y1={bpLine135.y} x2="20" y2="20" stroke={mutedColor} strokeWidth="0.7" opacity="0.18" />
        <line x1={bpLine45.x} y1={bpLine45.y} x2="20" y2="20" stroke={mutedColor} strokeWidth="0.7" opacity="0.18" />
        <line x1={bpLine180.x} y1={bpLine180.y} x2="18" y2="20" stroke={mutedColor} strokeWidth="0.9" opacity="0.25" />
        <line x1={bpLine0.x} y1={bpLine0.y} x2="22" y2="20" stroke={mutedColor} strokeWidth="0.9" opacity="0.25" />
        {[bpConn45, bpConn135, bpConn225, bpConn315].map((p, i) => (
          <g key={`dc-${i}`}>
            <circle cx={p.x} cy={p.y} r="1.0" stroke={mutedColor} strokeWidth="0.6" fill="none" opacity="0.25" />
            <circle cx={p.x} cy={p.y} r="0.6" fill={mutedColor} opacity="0.12" />
            <circle cx={p.x} cy={p.y} r="0.35" fill={mutedColor} opacity="0.5" />
          </g>
        ))}
        {[bpConn180, bpConn0].map((p, i) => (
          <g key={`hc-${i}`}>
            <circle cx={p.x} cy={p.y} r="1.3" stroke={mutedColor} strokeWidth="0.7" fill="none" opacity="0.3" />
            <circle cx={p.x} cy={p.y} r="0.8" fill={mutedColor} opacity="0.12" />
            <circle cx={p.x} cy={p.y} r="0.45" fill={mutedColor} opacity="0.55" />
          </g>
        ))}
        <circle cx="20" cy="11.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="28.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="3.2" fill={primaryColor} opacity="0.05" />
        <circle cx="20" cy="20" r="2.5" fill={primaryColor} opacity="0.10" />
        <circle cx="20" cy="20" r="1.8" fill={primaryColor} opacity="0.18" />
        <circle cx="20" cy="20" r="1.3" fill={primaryColor} />
      </g>
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85" />
    </svg>
  )
}

function LogoSVGV6({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', showGlow = true, className = '', style = {} }: { primaryColor?: string; mutedColor?: string; showGlow?: boolean; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `bp-d8-clip-v6-${uid}`
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="17.9" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {showGlow && <>
          <circle cx="20" cy="20" r="14" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.025" />
          <circle cx="20" cy="20" r="11.5" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.03" />
          <circle cx="20" cy="20" r="9.5" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.035" />
          <circle cx="20" cy="20" r="8" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.04" />
          <circle cx="20" cy="20" r="6.8" stroke={primaryColor} strokeWidth="0.3" fill="none" opacity="0.05" />
          <circle cx="20" cy="20" r="5.8" stroke={primaryColor} strokeWidth="0.3" fill="none" opacity="0.055" />
          <circle cx="20" cy="20" r="5" stroke={primaryColor} strokeWidth="0.35" fill="none" opacity="0.06" />
          <circle cx="20" cy="20" r="4" stroke={primaryColor} strokeWidth="0.45" fill="none" opacity="0.09" />
        </>}
        <line x1="20" y1="1.5" x2="20" y2="4.5" stroke={mutedColor} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="20" y1="38.5" x2="20" y2="35.5" stroke={mutedColor} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <polyline points="1,16.5 6,20 1,23.5" stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="39,16.5 34,20 39,23.5" stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="12.5" r="5" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="27.5" r="5" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        {showGlow && <>
          <circle cx="20" cy="20" r="3.2" fill={primaryColor} opacity="0.05" />
          <circle cx="20" cy="20" r="2.5" fill={primaryColor} opacity="0.10" />
          <circle cx="20" cy="20" r="1.8" fill={primaryColor} opacity="0.18" />
        </>}
        <circle cx="20" cy="20" r="1.3" fill={primaryColor} />
      </g>
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  )
}

// v7A — Event Horizon: each circle becomes a dark void with accretion glow
function LogoSVGV7A({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `bp-d8-v7a-${uid}`
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id={clipId}><circle cx="20" cy="20" r="17.9" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="20" cy="20" r="14" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.025" />
        <circle cx="20" cy="20" r="11.5" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.03" />
        <circle cx="20" cy="20" r="9.5" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.035" />
        <circle cx="20" cy="20" r="8" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.04" />
        <circle cx="20" cy="20" r="6.8" stroke={primaryColor} strokeWidth="0.3" fill="none" opacity="0.05" />
        <line x1="20" y1="1.5" x2="20" y2="4.5" stroke={mutedColor} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="20" y1="38.5" x2="20" y2="35.5" stroke={mutedColor} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <polyline points="1,16.5 6,20 1,23.5" stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="39,16.5 34,20 39,23.5" stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="12.5" r="7" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.1" />
        <circle cx="20" cy="27.5" r="7" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.1" />
        <circle cx="20" cy="12.5" r="6" stroke={primaryColor} strokeWidth="0.6" fill="none" opacity="0.15" />
        <circle cx="20" cy="27.5" r="6" stroke={primaryColor} strokeWidth="0.6" fill="none" opacity="0.15" />
        <circle cx="20" cy="12.5" r="5" fill={bg} stroke={primaryColor} strokeWidth="1.5" />
        <circle cx="20" cy="27.5" r="5" fill={bg} stroke={primaryColor} strokeWidth="1.5" />
      </g>
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  )
}

// v8 — High-Fidelity Orbital Discs.
// Per-BH accretion disc: 8 concentric ellipse rings, constant ry/rx=0.309 (72° inclination),
// escalating opacity+weight from faint outer corona to bright photon-plane innermost ring.
// Disc tilted ±12° in-plane for each body. Hard void fill. Relativistic jets.
function LogoSVGV8({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `bp-d8-v8-${uid}`

  // ry = rx * 0.309  (cos 72°) — all rings same inclination
  // void r=6.5, BHs at cy=12.5/27.5 → 2-unit waist gap → reads as "8"
  // All rings must have rx > 6.5 so wings extend past the void
  const rings = [
    { rx: 14.0, ry: 4.33, sw: 0.09, op: 0.05 }, // outer corona — 7.5u wing
    { rx: 12.5, ry: 3.86, sw: 0.13, op: 0.09 }, //                6.0u wing
    { rx: 11.0, ry: 3.40, sw: 0.18, op: 0.15 }, //                4.5u wing
    { rx:  9.5, ry: 2.94, sw: 0.27, op: 0.23 }, //                3.0u wing
    { rx:  8.5, ry: 2.63, sw: 0.40, op: 0.33 }, //                2.0u wing
    { rx:  7.7, ry: 2.38, sw: 0.62, op: 0.47 }, //                1.2u wing
    { rx:  7.3, ry: 2.26, sw: 0.92, op: 0.63 }, //                0.8u wing
    { rx:  7.0, ry: 2.16, sw: 1.40, op: 0.80 }, // photon plane — 0.5u wing
  ]

  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs><clipPath id={clipId}><circle cx="20" cy="20" r="17.9" /></clipPath></defs>

      {/* Jets drawn outside clip — protrude through the outer ring */}
      {/* Upper jet: starts at top of void (y=6.0), protrudes to y=-2 */}
      <line x1="20"   y1="6.2"  x2="20"   y2="-2.0" stroke={primaryColor} strokeWidth="0.40" opacity="0.30" strokeLinecap="round"/>
      <line x1="19.3" y1="6.4"  x2="17.7" y2="-2.0" stroke={primaryColor} strokeWidth="0.13" opacity="0.16" strokeLinecap="round"/>
      <line x1="20.7" y1="6.4"  x2="22.3" y2="-2.0" stroke={primaryColor} strokeWidth="0.13" opacity="0.16" strokeLinecap="round"/>
      {/* Lower jet: starts at bottom of void (y=34.0), protrudes to y=42 */}
      <line x1="20"   y1="33.8" x2="20"   y2="42.0" stroke={primaryColor} strokeWidth="0.40" opacity="0.30" strokeLinecap="round"/>
      <line x1="19.3" y1="33.6" x2="17.7" y2="42.0" stroke={primaryColor} strokeWidth="0.13" opacity="0.16" strokeLinecap="round"/>
      <line x1="20.7" y1="33.6" x2="22.3" y2="42.0" stroke={primaryColor} strokeWidth="0.13" opacity="0.16" strokeLinecap="round"/>

      <g clipPath={`url(#${clipId})`}>

        {/* ── UPPER BLACK HOLE at (20, 12.5) — disc tilted -12° in-plane ── */}
        <g transform="rotate(-12, 20, 12.5)">
          {rings.map((r, i) => (
            <ellipse key={`u${i}`} cx="20" cy="12.5" rx={r.rx} ry={r.ry}
              stroke={primaryColor} strokeWidth={r.sw} fill="none" opacity={r.op}/>
          ))}
        </g>
        <circle cx="20" cy="12.5" r="6.5" fill={bg}/>
        <circle cx="20" cy="12.5" r="6.5" stroke={primaryColor} strokeWidth="1.6" fill="none" opacity="0.96"/>
        <circle cx="20" cy="12.5" r="5.9" fill={bg}/>

        {/* ── LOWER BLACK HOLE at (20, 27.5) — disc tilted +12° in-plane ── */}
        <g transform="rotate(12, 20, 27.5)">
          {rings.map((r, i) => (
            <ellipse key={`l${i}`} cx="20" cy="27.5" rx={r.rx} ry={r.ry}
              stroke={primaryColor} strokeWidth={r.sw} fill="none" opacity={r.op}/>
          ))}
        </g>
        <circle cx="20" cy="27.5" r="6.5" fill={bg}/>
        <circle cx="20" cy="27.5" r="6.5" stroke={primaryColor} strokeWidth="1.6" fill="none" opacity="0.96"/>
        <circle cx="20" cy="27.5" r="5.9" fill={bg}/>

        {/* Tidal stream — 2-unit matter bridge at the "8" waist (y=19→21) */}
        <line x1="20" y1="19.1" x2="20" y2="20.9" stroke={primaryColor} strokeWidth="0.28" opacity="0.18" strokeLinecap="round"/>

      </g>
      {/* Outer ring — higher opacity on light backgrounds for contrast */}
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="0.9" fill="none" opacity={bg === '#FFFFFF' ? 0.60 : 0.35}/>
    </svg>
  )
}

// v9 — IO Disk Stack
// Concept: two IO disk platters on a shared stream channel form the "8".
// The stream (vertical line) threads both device centers. The outer ring is the daemon.
// Hub void = figure-ground: the stream pierces each disk at its center hole.
function LogoSVGV9({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `d8-v9-${uid}`
  const UCY = 12.5, LCY = 27.5
  const HR = 1.5

  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id={clipId}><circle cx="20" cy="20" r="17.9" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        {/* IO device outer rings — two disk platters; their silhouette forms the "8" */}
        <circle cx="20" cy={UCY} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy={LCY} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        {/* Disk surface — concentric track rings (data storage area detail) */}
        <circle cx="20" cy={UCY} r="4.3" stroke={primaryColor} strokeWidth="0.28" fill="none" opacity="0.2" />
        <circle cx="20" cy={UCY} r="2.7" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.15" />
        <circle cx="20" cy={LCY} r="4.3" stroke={primaryColor} strokeWidth="0.28" fill="none" opacity="0.2" />
        <circle cx="20" cy={LCY} r="2.7" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.15" />
        {/* IO stream — the information channel threading both devices */}
        <line x1="20" y1="2" x2="20" y2="38" stroke={primaryColor} strokeWidth="0.65" strokeLinecap="round" opacity="0.5" />
        {/* Hub void — stream "disappears" into each disk's center hole, re-emerges below */}
        <circle cx="20" cy={UCY} r={HR} fill={bg} />
        <circle cx="20" cy={LCY} r={HR} fill={bg} />
        {/* Hub ring — spindle mount, frames the pass-through point */}
        <circle cx="20" cy={UCY} r={HR} stroke={primaryColor} strokeWidth="0.75" fill="none" opacity="0.75" />
        <circle cx="20" cy={LCY} r={HR} stroke={primaryColor} strokeWidth="0.75" fill="none" opacity="0.75" />
        {/* Hub center — spindle axis */}
        <circle cx="20" cy={UCY} r="0.42" fill={primaryColor} opacity="0.9" />
        <circle cx="20" cy={LCY} r="0.42" fill={primaryColor} opacity="0.9" />
      </g>
      {/* Outer daemon ring — the daemon receiving and routing the IO stream */}
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="0.9" fill="none" opacity="0.4" />
    </svg>
  )
}

// v9B — IO Disk Stack (Character)
// Subversion of v9: same foundational concept + actuator arms, stream protrusions, daemon motion ring.
// Arms: one per disk, sweeping from outer track toward hub at consistent rotational angle.
// Stream: IO line protrudes above and below the daemon ring with directional chevrons.
// Motion ring: segmented outer ring at r=19.5 suggests daemon processing velocity.
function LogoSVGV9B({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `d8-v9b-${uid}`
  const UCY = 12.5, LCY = 27.5
  const HR = 1.5

  return (
    <svg viewBox="0 0 40 40" className={className} style={{ overflow: 'visible', ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id={clipId}><circle cx="20" cy="20" r="17.9" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        {/* IO stream — drawn first so disk bodies can cover it inside the platter */}
        <line x1="20" y1="2" x2="20" y2="38" stroke={primaryColor} strokeWidth="0.65" strokeLinecap="round" opacity="0.55" />
        {/* IO device outer rings — disk platters forming the "8" */}
        <circle cx="20" cy={UCY} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy={LCY} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        {/* Disk body fills — opaque, covers the stream line inside each platter */}
        <circle cx="20" cy={UCY} r="5.9" fill={bg} />
        <circle cx="20" cy={LCY} r="5.9" fill={bg} />
        {/* Track rings — concentric data storage surface texture, drawn on disk body */}
        <circle cx="20" cy={UCY} r="4.3" stroke={primaryColor} strokeWidth="0.28" fill="none" opacity="0.2" />
        <circle cx="20" cy={UCY} r="2.7" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.15" />
        <circle cx="20" cy={LCY} r="4.3" stroke={primaryColor} strokeWidth="0.28" fill="none" opacity="0.2" />
        <circle cx="20" cy={LCY} r="2.7" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.15" />
        {/* Actuator arms — read head sweeps outer track toward hub; both on right side (same rotation) */}
        <line x1="23.86" y1="7.9" x2="21.74" y2="10.43" stroke={primaryColor} strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="21.74" cy="10.43" r="0.45" fill={primaryColor} opacity="0.6" />
        <line x1="25.2" y1="30.5" x2="22.34" y2="28.85" stroke={primaryColor} strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="22.34" cy="28.85" r="0.45" fill={primaryColor} opacity="0.6" />
        {/* Hub ring — spindle mount */}
        <circle cx="20" cy={UCY} r={HR} stroke={primaryColor} strokeWidth="0.75" fill="none" opacity="0.75" />
        <circle cx="20" cy={LCY} r={HR} stroke={primaryColor} strokeWidth="0.75" fill="none" opacity="0.75" />
        {/* Hub center — spindle axis */}
        <circle cx="20" cy={UCY} r="0.42" fill={primaryColor} opacity="0.9" />
        <circle cx="20" cy={LCY} r="0.42" fill={primaryColor} opacity="0.9" />
      </g>
      {/* Input stream — protrudes above daemon ring with directional chevron (stream enters downward) */}
      <line x1="20" y1="1.5" x2="20" y2="-1" stroke={primaryColor} strokeWidth="0.65" strokeLinecap="round" opacity="0.32" />
      <path d="M 19.4 -0.7 L 20 0.2 L 20.6 -0.7" stroke={primaryColor} strokeWidth="0.45" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.32" />
      {/* Output stream — protrudes below daemon ring with directional chevron (stream exits downward) */}
      <line x1="20" y1="38.5" x2="20" y2="41" stroke={primaryColor} strokeWidth="0.65" strokeLinecap="round" opacity="0.32" />
      <path d="M 19.4 39.9 L 20 40.8 L 20.6 39.9" stroke={primaryColor} strokeWidth="0.45" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.32" />
      {/* Outer daemon ring */}
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="0.9" fill="none" opacity="0.4" />
      {/* Daemon loop motion indicator — segmented ring outside the boundary, ~6 arcs suggest processing velocity */}
      <circle cx="20" cy="20" r="19.5" stroke={mutedColor} strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="16 4.5" />
    </svg>
  )
}

// v9C — Geometric Figure-8 (Pure Form)
// The two disk platters nearly kiss at y=20 (UCY=13.5, LCY=26.5, r=6 — 1-unit pinch gap).
// The "8" is geometric: the brain reads it through near-tangency, not just proximity.
// Outer ring is a 340° arc — 20° gap at the TOP aligns with the stream entry point.
// Two stroke weights only: 1.4 structural, 0.28 detail. No arms, no motion ring. Discipline of subtraction.
function LogoSVGV9C({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const UCY = 13, LCY = 27
  const isLight = bg === '#FFFFFF'

  return (
    <svg viewBox="0 0 40 40" className={className} style={{ overflow: 'visible', ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Single stream from protrusion tip through to bottom — disk body fills occlude it inside each platter.
          No clipPath, no separate protrusion: eliminates the two-element junction and opacity seam. */}
      <line x1="20" y1="-1.8" x2="20" y2="38" stroke={primaryColor} strokeWidth="0.7" strokeLinecap="round" opacity="0.58" />
      {/* Disk body fills — drawn after stream, occlude it inside each platter */}
      <circle cx="20" cy={UCY} r="6.35" fill={bg} />
      <circle cx="20" cy={LCY} r="6.35" fill={bg} />
      {/* Disk platter outer rings */}
      <circle cx="20" cy={UCY} r="6.5" stroke={primaryColor} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy={LCY} r="6.5" stroke={primaryColor} strokeWidth="1.4" fill="none" />
      {/* Track rings */}
      <circle cx="20" cy={UCY} r="4.7" stroke={primaryColor} strokeWidth="0.4" fill="none" opacity={isLight ? 0.52 : 0.38} />
      <circle cx="20" cy={UCY} r="3.0" stroke={primaryColor} strokeWidth="0.38" fill="none" opacity={isLight ? 0.4 : 0.28} />
      <circle cx="20" cy={LCY} r="4.7" stroke={primaryColor} strokeWidth="0.4" fill="none" opacity={isLight ? 0.52 : 0.38} />
      <circle cx="20" cy={LCY} r="3.0" stroke={primaryColor} strokeWidth="0.38" fill="none" opacity={isLight ? 0.4 : 0.28} />
      {/* Hub dots */}
      <circle cx="20" cy={UCY} r="0.52" fill={primaryColor} opacity={isLight ? 0.95 : 0.88} />
      <circle cx="20" cy={LCY} r="0.52" fill={primaryColor} opacity={isLight ? 0.95 : 0.88} />
      {/* Outer daemon ring — drawn last so it overlaps the stream cleanly at the boundary */}
      <path d="M 23.21 1.78 A 18.5 18.5 0 1 1 16.79 1.78" stroke={mutedColor} strokeWidth="1.0" fill="none" opacity={isLight ? 0.58 : 0.45} strokeLinecap="butt" />
    </svg>
  )
}

// v7B — Pre-Merge: circles pulled close (2-unit overlap), no crosshair, pure binary pull
function LogoSVGV7B({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', bg = '#0B1120', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; bg?: string; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `bp-d8-v7b-${uid}`
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id={clipId}><circle cx="20" cy="20" r="17.9" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="20" cy="20" r="16" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.02" />
        <circle cx="20" cy="20" r="13" stroke={primaryColor} strokeWidth="0.2" fill="none" opacity="0.025" />
        <circle cx="20" cy="20" r="10" stroke={primaryColor} strokeWidth="0.25" fill="none" opacity="0.03" />
        <circle cx="20" cy="16" r="7.5" stroke={primaryColor} strokeWidth="1.2" fill="none" opacity="0.08" />
        <circle cx="20" cy="24" r="7.5" stroke={primaryColor} strokeWidth="1.2" fill="none" opacity="0.08" />
        <circle cx="20" cy="16" r="6.5" stroke={primaryColor} strokeWidth="0.8" fill="none" opacity="0.14" />
        <circle cx="20" cy="24" r="6.5" stroke={primaryColor} strokeWidth="0.8" fill="none" opacity="0.14" />
        <circle cx="20" cy="16" r="5" fill={bg} stroke={primaryColor} strokeWidth="1.5" />
        <circle cx="20" cy="24" r="5" fill={bg} stroke={primaryColor} strokeWidth="1.5" />
      </g>
      <circle cx="20" cy="20" r="18.5" stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  )
}

function bpArcPath(a1Deg: number, a2Deg: number, r: number): string {
  const a1 = (a1Deg * Math.PI) / 180, a2 = (a2Deg * Math.PI) / 180
  const x1 = CX + r * Math.cos(a1), y1 = CY + r * Math.sin(a1)
  const x2 = CX + r * Math.cos(a2), y2 = CY + r * Math.sin(a2)
  return `M ${x1} ${y1} A ${r} ${r} 0 ${Math.abs(a2Deg - a1Deg) > 180 ? 1 : 0} 1 ${x2} ${y2}`
}
function bpFoldPath(ax: number, ay: number, armX: number, armY: number): string {
  return `M ${ax} ${ay} Q ${armX + (ax - armX) * 0.5} ${armY} ${armX} ${armY}`
}
const bpGAP = 15
const bpTopArc = bpArcPath(180 + bpGAP, 360 - bpGAP, R)
const bpBotArc = bpArcPath(0 + bpGAP, 180 - bpGAP, R)
const bpTL = bpPt(180 + bpGAP), bpTR = bpPt(360 - bpGAP)
const bpBR = bpPt(0 + bpGAP), bpBL = bpPt(180 - bpGAP)
const bpArmL = { x: CX - R + 1.5, y: CY }, bpArmR = { x: CX + R - 1.5, y: CY }
const bpFTL = bpFoldPath(bpTL.x, bpTL.y, bpArmL.x, bpArmL.y)
const bpFTR = bpFoldPath(bpTR.x, bpTR.y, bpArmR.x, bpArmR.y)
const bpFBR = bpFoldPath(bpBR.x, bpBR.y, bpArmR.x, bpArmR.y)
const bpFBL = bpFoldPath(bpBL.x, bpBL.y, bpArmL.x, bpArmL.y)

function LogoSVGV4({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={bpTopArc} stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d={bpBotArc} stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d={bpFTL} stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d={bpFTR} stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d={bpFBL} stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d={bpFBR} stroke={mutedColor} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      <line x1={bpArmL.x} y1={CY} x2={CX - 2} y2={CY} stroke={mutedColor} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1={bpArmR.x} y1={CY} x2={CX + 2} y2={CY} stroke={mutedColor} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1={CX} y1={CY - 2} x2={CX} y2={CY - 2.5} stroke={primaryColor} strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      <line x1={CX} y1={CY + 2} x2={CX} y2={CY + 2.5} stroke={primaryColor} strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      <circle cx={CX} cy={CY - 8.5} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <circle cx={CX} cy={CY + 8.5} r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <circle cx={CX} cy={CY} r="2" fill={primaryColor} opacity="0.15" />
      <circle cx={CX} cy={CY} r="1.5" fill={primaryColor} />
    </svg>
  )
}

function bpPtV3(aDeg: number, r: number = 18.5) {
  const rad = (aDeg * Math.PI) / 180
  return { x: 20 + r * Math.cos(rad), y: 20 + r * Math.sin(rad) }
}
function LogoSVGV3({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; className?: string; style?: React.CSSProperties }) {
  const cw = [185,200,218,238,258,278,298,318,338,355]
  const ccw = [355,340,322,302,282,262,242,222,205,190]
  const trail = (angles: number[], d: string) => angles.map((a,i) => {
    const p = bpPtV3(a); const t = i/(angles.length-1)
    return <circle key={`${d}-${i}`} cx={p.x} cy={p.y} r={0.35+t*0.35} fill={mutedColor} opacity={0.12+t*0.28} />
  })
  const chev = (aDeg: number, fDeg: number, op: number) => {
    const p = bpPtV3(aDeg); const rad=(fDeg*Math.PI)/180
    const a1={x:p.x-1.4*Math.cos(rad)+0.65*Math.sin(rad),y:p.y-1.4*Math.sin(rad)-0.65*Math.cos(rad)}
    const a2={x:p.x-1.4*Math.cos(rad)-0.65*Math.sin(rad),y:p.y-1.4*Math.sin(rad)+0.65*Math.cos(rad)}
    return <polyline key={`c-${aDeg}-${fDeg}`} points={`${a1.x},${a1.y} ${p.x},${p.y} ${a2.x},${a2.y}`} stroke={mutedColor} strokeWidth="0.6" fill="none" opacity={op} strokeLinecap="round" strokeLinejoin="round" />
  }
  const sDots = (side: 'left'|'right') => {
    const pos = side==='left'?[2.5,5.5,8.5,11.5,14.5,16.5]:[37.5,34.5,31.5,28.5,25.5,23.5]
    return pos.map((x,i)=>{const t=i/(pos.length-1);return <circle key={`s-${side}-${i}`} cx={x} cy={20} r={0.3+t*0.55} fill={mutedColor} opacity={0.15+t*0.35}/>})
  }
  const sChev = (x: number, side: 'left'|'right', op: number) => {
    const d=side==='left'?1:-1
    return <polyline key={`sc-${side}-${x}`} points={`${x-d*1.2},${19.2} ${x},${20} ${x-d*1.2},${20.8}`} stroke={mutedColor} strokeWidth="0.6" fill="none" opacity={op} strokeLinecap="round" strokeLinejoin="round" />
  }
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.7" opacity="0.2" strokeDasharray="2 1.5 5 2 3 1 7 2 4 2.5" />
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.35" opacity="0.08" />
      {trail(cw,'cw')}{chev(220,310,0.3)}{chev(280,370,0.35)}{chev(340,430,0.4)}
      {trail(ccw,'ccw')}{chev(320,230,0.3)}{chev(260,170,0.35)}{chev(200,110,0.4)}
      <line x1="1.5" y1="20" x2="17.5" y2="20" stroke={mutedColor} strokeWidth="0.6" opacity="0.15" />
      {sDots('left')}{sChev(6,'left',0.2)}{sChev(10,'left',0.3)}{sChev(14,'left',0.4)}
      <line x1="22.5" y1="20" x2="38.5" y2="20" stroke={mutedColor} strokeWidth="0.6" opacity="0.15" />
      {sDots('right')}{sChev(34,'right',0.2)}{sChev(30,'right',0.3)}{sChev(26,'right',0.4)}
      <circle cx="20" cy="20" r="5" stroke={primaryColor} strokeWidth="0.4" opacity="0.06" fill="none" />
      <circle cx="20" cy="20" r="4" stroke={primaryColor} strokeWidth="0.5" opacity="0.1" fill="none" />
      <circle cx="20" cy="20" r="3.5" fill={primaryColor} opacity="0.04" />
      <circle cx="20" cy="20" r="2.8" fill={primaryColor} opacity="0.1" />
      <circle cx="20" cy="20" r="2" fill={primaryColor} opacity="0.2" />
      <circle cx="20" cy="20" r="1.5" fill={primaryColor} />
      <line x1="20" y1="15.5" x2="20" y2="18.2" stroke={primaryColor} strokeWidth="1.3" opacity="0.45" />
      <circle cx="20" cy="16.8" r="0.9" fill={primaryColor} opacity="0.6" />
      <line x1="20" y1="21.8" x2="20" y2="24.5" stroke={primaryColor} strokeWidth="1.3" opacity="0.45" />
      <circle cx="20" cy="23.2" r="0.9" fill={primaryColor} opacity="0.6" />
      <circle cx="20" cy="11.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="28.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function LogoSVGV2({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; className?: string; style?: React.CSSProperties }) {
  const sa = [15,48,72,105,138,160,200,230,255,290,320,345]
  const ss = [0.5,0.7,0.4,0.6,0.5,0.8,0.4,0.7,0.5,0.6,0.5,0.4]
  const so = [0.2,0.35,0.15,0.3,0.25,0.4,0.18,0.32,0.22,0.28,0.2,0.15]
  const dots = sa.map((a,i)=>{const rad=(a*Math.PI)/180;return <circle key={`s${i}`} cx={20+18.5*Math.cos(rad)} cy={20+18.5*Math.sin(rad)} r={ss[i]} fill={mutedColor} opacity={so[i]}/>})
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 2 6 2 2 3 8 2 4 3" />
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
      {dots}
      <line x1="17.5" y1="20" x2="2" y2="20" stroke={mutedColor} strokeWidth="1" opacity="0.3" />
      <circle cx="14" cy="20" r="0.7" fill={mutedColor} opacity="0.4" /><circle cx="9" cy="20" r="0.6" fill={mutedColor} opacity="0.3" /><circle cx="5" cy="20" r="0.5" fill={mutedColor} opacity="0.2" />
      <circle cx="1.5" cy="20" r="1.2" stroke={mutedColor} strokeWidth="0.8" fill="none" opacity="0.35" /><circle cx="1.5" cy="20" r="0.4" fill={mutedColor} opacity="0.4" />
      <line x1="22.5" y1="20" x2="38" y2="20" stroke={mutedColor} strokeWidth="1" opacity="0.3" />
      <circle cx="26" cy="20" r="0.7" fill={mutedColor} opacity="0.4" /><circle cx="31" cy="20" r="0.6" fill={mutedColor} opacity="0.3" /><circle cx="35" cy="20" r="0.5" fill={mutedColor} opacity="0.2" />
      <circle cx="38.5" cy="20" r="1.2" stroke={mutedColor} strokeWidth="0.8" fill="none" opacity="0.35" /><circle cx="38.5" cy="20" r="0.4" fill={mutedColor} opacity="0.4" />
      <line x1="20" y1="15" x2="20" y2="18" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" /><circle cx="20" cy="16.5" r="1" fill={primaryColor} opacity="0.6" />
      <line x1="20" y1="22" x2="20" y2="25" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" /><circle cx="20" cy="23.5" r="1" fill={primaryColor} opacity="0.6" />
      <circle cx="20" cy="11.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" /><circle cx="20" cy="28.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="4" fill={primaryColor} opacity="0.08" /><circle cx="20" cy="20" r="2.5" fill={primaryColor} opacity="0.18" /><circle cx="20" cy="20" r="1.5" fill={primaryColor} />
    </svg>
  )
}

function LogoSVGV1({ primaryColor = '#6C9EF8', mutedColor = '#8B949E', className = '', style = {} }: { primaryColor?: string; mutedColor?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="15" x2="20" y2="18" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" /><circle cx="20" cy="16.5" r="1" fill={primaryColor} opacity="0.6" />
      <line x1="20" y1="22" x2="20" y2="25" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" /><circle cx="20" cy="23.5" r="1" fill={primaryColor} opacity="0.6" />
      <line x1="13" y1="20" x2="17" y2="20" stroke={mutedColor} strokeWidth="1.2" opacity="0.4" /><circle cx="15" cy="20" r="0.8" fill={mutedColor} opacity="0.45" />
      <line x1="23" y1="20" x2="27" y2="20" stroke={mutedColor} strokeWidth="1.2" opacity="0.4" /><circle cx="25" cy="20" r="0.8" fill={mutedColor} opacity="0.45" />
      <circle cx="20" cy="11.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" /><circle cx="20" cy="28.5" r="6" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="20" r="3" stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.5" /><circle cx="30" cy="20" r="3" stroke={mutedColor} strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="20" cy="20" r="4" fill={primaryColor} opacity="0.08" /><circle cx="20" cy="20" r="2.5" fill={primaryColor} opacity="0.18" /><circle cx="20" cy="20" r="1.5" fill={primaryColor} />
    </svg>
  )
}

type VariantKind = 'integrated' | 'wordmark' | 'logomark' | 'lockup-stacked' | 'lockup-tagline' | 'favicon'
type ColorMode = 'color' | 'greyscale'

const PRIMARY_COLOR = '#6C9EF8'
const GREY_PRIMARY = '#A0A0A0'
const GREY_MUTED = '#707070'
const MUTED_COLOR = '#8B949E'

function LogoVariantFinal({ kind, colorMode, containerW, containerH, bg }: {
  kind: VariantKind
  colorMode: ColorMode
  containerW: number
  containerH: number
  bg: string
}) {
  const isColor = colorMode === 'color'
  const isLight = bg === BG_LIGHT

  const primary = isColor
    ? (isLight ? '#2563EB' : PRIMARY_COLOR)
    : (isLight ? '#374151' : GREY_PRIMARY)
  const muted = isColor
    ? (isLight ? '#475569' : MUTED_COLOR)
    : (isLight ? '#6B7280' : GREY_MUTED)

  const textColor = isLight ? '#0D1420' : '#E2E8F0'
  const eightColor = isColor ? primary : (isLight ? '#374151' : '#6B6B6B')

  const minDim = Math.min(containerW, containerH)
  const logoSize = Math.max(24, Math.min(minDim * 0.35, 120))
  const fontSize = Math.max(10, Math.min(minDim * 0.08, 36))

  return (
    <div
      className="flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: containerW, height: containerH, backgroundColor: bg, borderRadius: 4 }}
    >
      {kind === 'logomark' && (
        <LogoSVGV9C primaryColor={primary} mutedColor={muted} bg={bg} style={{ width: logoSize * 1.5, height: logoSize * 1.5 }} />
      )}

      {kind === 'wordmark' && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize, letterSpacing: '-0.02em', color: textColor }}>
          daemon<span style={{ color: eightColor }}>8</span>
        </span>
      )}

      {kind === 'integrated' && (
        <span className="inline-flex items-center" style={{ fontFamily: 'var(--font-mono)', fontSize, letterSpacing: '-0.02em', color: textColor }}>
          daemon
          <span className="relative inline-flex items-center justify-center" style={{ width: fontSize * 1.75, height: fontSize * 1.75, marginLeft: '-0.01em' }}>
            <LogoSVGV9C primaryColor={primary} mutedColor={muted} bg={bg} className="absolute inset-0 w-full h-full" />
          </span>
        </span>
      )}

      {kind === 'lockup-stacked' && (
        <div className="flex flex-col items-center" style={{ gap: fontSize * 0.3 }}>
          <LogoSVGV9C primaryColor={primary} mutedColor={muted} bg={bg} style={{ width: logoSize, height: logoSize }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: fontSize * 0.7, letterSpacing: '-0.02em', color: textColor }}>
            daemon<span style={{ color: eightColor }}>8</span>
          </span>
        </div>
      )}

      {kind === 'lockup-tagline' && (
        <div className="flex flex-col items-center" style={{ gap: fontSize * 0.15 }}>
          <span className="inline-flex items-center" style={{ fontFamily: 'var(--font-mono)', fontSize, letterSpacing: '-0.02em', color: textColor }}>
            daemon
            <span className="relative inline-flex items-center justify-center" style={{ width: fontSize * 1.75, height: fontSize * 1.75, marginLeft: '-0.01em' }}>
              <LogoSVGV9C primaryColor={primary} mutedColor={muted} bg={bg} className="absolute inset-0 w-full h-full" />
            </span>
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: fontSize * 0.35, letterSpacing: '0.12em', color: isColor ? (isLight ? '#475569' : '#8B949E') : (isLight ? '#6B7280' : '#707070'), textTransform: 'uppercase' }}>
            Runtime I/O for AI agents.
          </span>
        </div>
      )}

      {kind === 'favicon' && (
        <LogoSVGV9C primaryColor={primary} mutedColor={muted} bg={bg} style={{ width: minDim * 0.75, height: minDim * 0.75 }} />
      )}
    </div>
  )
}

interface SocialSize {
  platform: string
  label: string
  w: number
  h: number
}

const SOCIAL_SIZES: SocialSize[] = [
  { platform: 'Facebook', label: 'Profile', w: 170, h: 170 },
  { platform: 'Facebook', label: 'Cover', w: 820, h: 312 },
  { platform: 'Facebook', label: 'Post', w: 1200, h: 630 },
  { platform: 'LinkedIn', label: 'Profile', w: 400, h: 400 },
  { platform: 'LinkedIn', label: 'Banner', w: 1584, h: 396 },
  { platform: 'LinkedIn', label: 'Post', w: 1200, h: 627 },
  { platform: 'X', label: 'Profile', w: 400, h: 400 },
  { platform: 'X', label: 'Header', w: 1500, h: 500 },
  { platform: 'X', label: 'Post', w: 1200, h: 675 },
  { platform: 'TikTok', label: 'Profile', w: 200, h: 200 },
  { platform: 'TikTok', label: 'Video Cover', w: 1080, h: 1920 },
  { platform: 'Instagram', label: 'Profile', w: 320, h: 320 },
  { platform: 'Instagram', label: 'Post', w: 1080, h: 1080 },
  { platform: 'Instagram', label: 'Story', w: 1080, h: 1920 },
]

const VARIANT_LABELS: Record<VariantKind, string> = {
  integrated: 'DAEMON + Watermark',
  wordmark: 'DAEMON8 (Text Only)',
  logomark: 'Watermark Only',
  'lockup-stacked': 'Stacked Lockup',
  'lockup-tagline': 'Integrated + Tagline',
  favicon: 'Favicon / App Icon',
}

const ALL_VARIANTS: VariantKind[] = ['integrated', 'wordmark', 'logomark', 'lockup-stacked', 'lockup-tagline', 'favicon']

const BG_DARK = '#0B1120'
const BG_LIGHT = '#FFFFFF'

function downloadAsset(ref: HTMLDivElement | null, filename: string, w: number, h: number) {
  if (!ref) return
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">${ref.innerHTML}</div>
      </foreignObject>
    </svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename + '.svg'
  a.click()
  URL.revokeObjectURL(url)
}

const MAX_PREVIEW_W = 320

interface ModalTarget {
  kind: VariantKind
  colorMode: ColorMode
  size: SocialSize
  bg: string
}

function AssetModal({ target, onClose }: { target: ModalTarget; onClose: () => void }) {
  const { kind, colorMode, size, bg } = target
  const ref = useRef<HTMLDivElement>(null)

  const maxW = Math.min(window.innerWidth * 0.85, 960)
  const maxH = window.innerHeight * 0.78
  const scale = Math.min(maxW / size.w, maxH / size.h, 1)
  const displayW = Math.round(size.w * scale)
  const displayH = Math.round(size.h * scale)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-3"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-d8-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
            {VARIANT_LABELS[kind]} · {colorMode} · {size.w}×{size.h}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadAsset(ref.current, `daemon8-${kind}-${colorMode}-${size.platform.toLowerCase()}-${size.label.toLowerCase().replace(/\s/g, '-')}`, size.w, size.h)}
              className="flex items-center gap-1.5 text-[12px] text-d8-text-muted hover:text-d8-primary transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Download size={13} /> Download SVG
            </button>
            <button onClick={onClose} className="text-d8-text-muted hover:text-d8-text transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
        <div
          className="border border-d8-border rounded overflow-hidden"
          style={{ width: displayW, height: displayH }}
        >
          <div ref={ref} style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: size.w, height: size.h }}>
            <LogoVariantFinal kind={kind} colorMode={colorMode} containerW={size.w} containerH={size.h} bg={bg} />
          </div>
        </div>
        <p className="text-[11px] text-d8-text-muted/50 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
          click outside or press esc to close
        </p>
      </div>
    </div>
  )
}

function AssetCard({ kind, colorMode, size, bg, onPreview }: {
  kind: VariantKind
  colorMode: ColorMode
  size: SocialSize
  bg: string
  onPreview: (t: ModalTarget) => void
}) {
  const scale = Math.min(MAX_PREVIEW_W / size.w, 160 / size.h, 1)
  const displayW = size.w * scale
  const displayH = size.h * scale
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col gap-2">
      <div
        className="border border-d8-border rounded overflow-hidden cursor-zoom-in hover:border-d8-primary/50 transition-colors"
        style={{ width: displayW, height: displayH }}
        onClick={() => onPreview({ kind, colorMode, size, bg })}
        title="Click to preview"
      >
        <div ref={ref} style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: size.w, height: size.h }}>
          <LogoVariantFinal kind={kind} colorMode={colorMode} containerW={size.w} containerH={size.h} bg={bg} />
        </div>
      </div>
      <div className="flex items-center justify-between" style={{ width: displayW }}>
        <span className="text-[11px] text-d8-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
          {size.w}×{size.h}
        </span>
        <button
          onClick={() => downloadAsset(ref.current, `daemon8-${kind}-${colorMode}-${size.platform.toLowerCase()}-${size.label.toLowerCase().replace(/\s/g, '-')}`, size.w, size.h)}
          className="text-d8-text-muted hover:text-d8-primary transition-colors"
          title="Download SVG"
        >
          <Download size={12} />
        </button>
      </div>
    </div>
  )
}

export function BrandingPage() {
  const platforms = ['Facebook', 'LinkedIn', 'X', 'TikTok', 'Instagram'] as const
  const [modal, setModal] = useState<ModalTarget | null>(null)
  const openModal = useCallback((t: ModalTarget) => setModal(t), [])
  const closeModal = useCallback(() => setModal(null), [])

  return (
    <>
    {modal && <AssetModal target={modal} onClose={closeModal} />}
    <div className="min-h-screen text-d8-text" style={{ minWidth: 1200 }}>
      <div className="border-b border-d8-border px-8 py-5 flex items-center gap-4">
        <Link to="/" className="text-d8-text-muted hover:text-d8-text transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-[22px]">Daemon8 Branding Kit</h2>
          <p className="text-[13px] text-d8-text-muted mt-0.5">Logo variations across all social media platforms — color &amp; greyscale, dark &amp; light backgrounds</p>
        </div>
      </div>

      <div className="px-8 py-10 space-y-16">

        <section>
          <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Color Palette</h3>
          <div className="flex gap-4 flex-wrap">
            {[
              { name: 'Brand Blue', hex: '#6C9EF8', var: '--d8-primary' },
              { name: 'Background', hex: '#0B1120', var: '--d8-bg' },
              { name: 'Text', hex: '#E2E8F0', var: '--d8-text' },
              { name: 'Muted', hex: '#8B949E', var: '--d8-text-muted' },
              { name: 'Surface 1', hex: '#111827', var: '--d8-surface-1' },
              { name: 'Surface 2', hex: '#1A2332', var: '--d8-surface-2' },
            ].map(c => (
              <div key={c.var} className="flex items-center gap-3 px-4 py-3 border border-d8-border rounded-[4px] bg-d8-surface-1 min-w-[180px]">
                <div className="w-8 h-8 rounded-[3px] shrink-0" style={{ backgroundColor: c.hex }} />
                <div>
                  <div className="text-[13px] text-d8-text">{c.name}</div>
                  <div className="text-[11px] text-d8-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Typography</h3>
          <div className="flex gap-8">
            {[
              { name: 'Headlines', family: 'var(--font-serif)', sample: 'Cormorant Garamond' },
              { name: 'Body', family: 'var(--font-sans)', sample: 'DM Sans' },
              { name: 'Code / Logo', family: 'var(--font-mono)', sample: 'Inconsolata' },
            ].map(t => (
              <div key={t.name} className="px-5 py-4 border border-d8-border rounded-[4px] bg-d8-surface-1 min-w-[200px]">
                <div className="text-[11px] text-d8-text-muted tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>{t.name}</div>
                <div className="text-[20px] text-d8-text" style={{ fontFamily: t.family }}>{t.sample}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Logo Variants</h3>
          <div className="grid grid-cols-3 gap-6">
            {ALL_VARIANTS.map(kind => (
              <div key={kind} className="border border-d8-border rounded-[6px] bg-d8-surface-1 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-d8-border">
                  <span className="text-[12px] text-d8-text-muted tracking-[0.05em]" style={{ fontFamily: 'var(--font-mono)' }}>{VARIANT_LABELS[kind]}</span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-d8-border">
                  <div className="bg-d8-surface-1 p-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-d8-text-muted/60" style={{ fontFamily: 'var(--font-mono)' }}>Color / Dark</span>
                    <LogoVariantFinal kind={kind} colorMode="color" containerW={200} containerH={100} bg={BG_DARK} />
                  </div>
                  <div className="bg-d8-surface-1 p-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-d8-text-muted/60" style={{ fontFamily: 'var(--font-mono)' }}>Color / Light</span>
                    <LogoVariantFinal kind={kind} colorMode="color" containerW={200} containerH={100} bg={BG_LIGHT} />
                  </div>
                  <div className="bg-d8-surface-1 p-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-d8-text-muted/60" style={{ fontFamily: 'var(--font-mono)' }}>Greyscale / Dark</span>
                    <LogoVariantFinal kind={kind} colorMode="greyscale" containerW={200} containerH={100} bg={BG_DARK} />
                  </div>
                  <div className="bg-d8-surface-1 p-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-d8-text-muted/60" style={{ fontFamily: 'var(--font-mono)' }}>Greyscale / Light</span>
                    <LogoVariantFinal kind={kind} colorMode="greyscale" containerW={200} containerH={100} bg={BG_LIGHT} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Version History</h3>
          <div className="flex flex-col gap-4 max-w-[1000px]">

            {/* Exploration rows — full-width, specimens left, description right */}
            {([
              {
                label: 'v9C — Geometric Figure-8 (Pure Form)', badge: 'Active', badgeClass: 'text-d8-primary border-d8-primary/30',
                description: 'The two disk platters are moved to near-tangency (UCY=13.5, LCY=26.5, r=6) — their outer rings nearly kiss at y=20 with a 1-unit pinch gap. The "8" is now geometric: the brain reads the form through near-tangency, not proximity. Outer ring is a 340° arc with the 20° gap at the TOP, precisely aligned with the stream entry point — the stream passes through the opening, making the gap meaningful rather than decorative. Two stroke weights only (1.4 structural, 0.28 detail) and no arms, no motion ring. Discipline of subtraction.',
                swatches: [
                  { label: 'Color / Dark',  bg: BG_DARK,  child: <LogoSVGV9C primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light', bg: BG_LIGHT, child: <LogoSVGV9C primaryColor="#2563EB" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',   bg: BG_DARK,  child: <LogoSVGV9C primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',  bg: BG_LIGHT, child: <LogoSVGV9C primaryColor="#374151" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
              {
                label: 'v9B — IO Disk (Character)', badge: 'Exploration', badgeClass: 'text-d8-pro border-d8-pro/30',
                description: 'Subversion of v9. Same foundational concept — two IO disk platters, vertical stream, daemon ring — with three contextual additions. Actuator arms: one per disk, sweeping from the outer track toward the hub at a consistent rotational angle, read head marked with a small dot. Stream protrusions: the IO line crosses the daemon ring both above and below, with directional chevrons pointing down — stream enters the daemon from above, exits below. Daemon motion ring: a segmented outer arc at r=19.5 with six visible arc segments suggests the daemon\'s processing loop and angular velocity.',
                swatches: [
                  { label: 'Color / Dark',  bg: BG_DARK,  child: <LogoSVGV9B primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light', bg: BG_LIGHT, child: <LogoSVGV9B primaryColor="#2563EB" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',   bg: BG_DARK,  child: <LogoSVGV9B primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',  bg: BG_LIGHT, child: <LogoSVGV9B primaryColor="#374151" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
              {
                label: 'v9 — IO Disk', badge: 'Exploration', badgeClass: 'text-d8-pro border-d8-pro/30',
                description: 'Two IO disk platters share a vertical stream channel — their outline forms the "8". The stream line threads both device centers; a hub void at each center creates figure-ground: the stream appears to pierce the disk at its spindle hole and re-emerge. Concentric track rings give each disk physical presence. The outer ring is the daemon boundary — the processor receiving and routing the stream.',
                swatches: [
                  { label: 'Color / Dark',  bg: BG_DARK,  child: <LogoSVGV9 primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light', bg: BG_LIGHT, child: <LogoSVGV9 primaryColor="#2563EB" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',   bg: BG_DARK,  child: <LogoSVGV9 primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',  bg: BG_LIGHT, child: <LogoSVGV9 primaryColor="#374151" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
              {
                label: 'v8 — Orbital Discs', badge: 'Exploration', badgeClass: 'text-d8-pro border-d8-pro/30',
                description: 'Eight concentric ellipse rings per BH, all at 72° inclination (ry/rx = 0.309). Opacity and stroke escalate from faint outer corona to bright photon-plane innermost ring. Innermost ring extends past the void as disc wings. Hard event-horizon fill. Relativistic jet cone per body.',
                swatches: [
                  { label: 'Color / Dark',  bg: BG_DARK,  child: <LogoSVGV8 primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light', bg: BG_LIGHT, child: <LogoSVGV8 primaryColor="#2563EB" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',   bg: BG_DARK,  child: <LogoSVGV8 primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',  bg: BG_LIGHT, child: <LogoSVGV8 primaryColor="#374151" mutedColor="#1E293B" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
              {
                label: 'v7b — Pre-Merge', badge: 'Exploration', badgeClass: 'text-d8-pro border-d8-pro/30',
                description: 'No crosshair. Circles pulled to near-overlap (2-unit merge zone). Accretion halos collide at the equator, creating a bright tidal bridge. Just the two bodies and the frame.',
                swatches: [
                  { label: 'Color / Dark',      bg: BG_DARK,  child: <LogoSVGV7B primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light',     bg: BG_LIGHT, child: <LogoSVGV7B primaryColor="#2563EB" mutedColor="#475569" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',       bg: BG_DARK,  child: <LogoSVGV7B primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',      bg: BG_LIGHT, child: <LogoSVGV7B primaryColor="#374151" mutedColor="#6B7280" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
              {
                label: 'v7a — Event Horizon', badge: 'Exploration', badgeClass: 'text-d8-pro border-d8-pro/30',
                description: 'Each circle filled with void — pure absence of color creates the event horizon. Layered accretion glow rings radiate outward. Crosshair reticle frames the binary system like a gravitational wave detector locked on.',
                swatches: [
                  { label: 'Color / Dark',      bg: BG_DARK,  child: <LogoSVGV7A primaryColor="#6C9EF8" mutedColor="#8B949E" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Color / Light',     bg: BG_LIGHT, child: <LogoSVGV7A primaryColor="#2563EB" mutedColor="#475569" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Dark',       bg: BG_DARK,  child: <LogoSVGV7A primaryColor="#A0A0A0" mutedColor="#606060" bg={BG_DARK}  style={{ width: 88, height: 88 }} /> },
                  { label: 'Grey / Light',      bg: BG_LIGHT, child: <LogoSVGV7A primaryColor="#374151" mutedColor="#6B7280" bg={BG_LIGHT} style={{ width: 88, height: 88 }} /> },
                ],
              },
            ] as const).map(row => (
              <div key={row.label} className="border border-d8-border rounded-[6px] bg-d8-surface-1 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-d8-border flex items-center gap-2">
                  <span className="text-[12px] text-d8-text-muted tracking-[0.05em]" style={{ fontFamily: 'var(--font-mono)' }}>{row.label}</span>
                  <span className={`text-[10px] border rounded px-1.5 py-0.5 ${row.badgeClass}`} style={{ fontFamily: 'var(--font-mono)' }}>{row.badge}</span>
                </div>
                <div className="p-5 flex gap-8 items-center">
                  {/* 4-up specimen grid — two dark, two light, bordered cells */}
                  <div className="grid grid-cols-4 gap-3 flex-1">
                    {row.swatches.map(s => (
                      <div key={s.label} className="flex flex-col gap-1.5">
                        <span className="text-[9px] text-d8-text-muted/50 tracking-[0.06em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</span>
                        <div
                          className="border border-d8-border/60 rounded-[4px] flex items-center justify-center"
                          style={{ backgroundColor: s.bg, padding: 14 }}
                        >
                          {s.child}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Description — right column, vertically centered */}
                  <div className="w-[196px] shrink-0 self-center">
                    <p className="text-[12px] text-d8-text-muted/75 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                      {row.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Archive rows — 3-up grid, each card: specimen on dark bg + description below */}
            <div className="grid grid-cols-3 gap-4">
              {([
                {
                  label: 'v8 — Orbital Discs', badge: 'Archive', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Binary black hole system — two accreted event horizons form the numeral "8" through proximity. Relativistic jets protrude through the outer containment ring. 72° inclination accretion discs.',
                  child: <LogoSVGV8 bg={BG_DARK} style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v6', badge: 'Backup', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Crosshair with bracket chevrons on left and right, short tick lines at top and bottom. Smaller, tighter "8" circles. Clean scope aesthetic.',
                  child: <LogoSVGV6 className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v5', badge: 'Backup', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Extended from v1. Horizontal arms and X-shaped diagonals reach from hub to outer circle with secondary muted styling. Blue "8" circles remain prominent.',
                  child: <LogoSVG className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v4', badge: 'Backup', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Hemisphere arcs with fold-in curves at the equator. Clean lines optimized for scalability.',
                  child: <LogoSVGV4 className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v3', badge: 'Backup', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Bidirectional data streams orbit the outer ring. Directional intake arms funnel inward with chevrons. Gravitational focal point with concentric pull rings.',
                  child: <LogoSVGV3 className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v2', badge: 'Backup', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Extended arms with scatter dots on a dashed outer ring. First iteration connecting the hub to the chaotic log world.',
                  child: <LogoSVGV2 className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
                {
                  label: 'v1 — Original', badge: 'Legacy', badgeClass: 'text-d8-text-muted/50 border-d8-border',
                  description: 'Original design with short arms, small side circles, and solid outer ring.',
                  child: <LogoSVGV1 className="text-d8-text" style={{ width: 96, height: 96 }} />,
                },
              ] as const).map(card => (
                <div key={card.label} className="border border-d8-border rounded-[6px] bg-d8-surface-1 overflow-hidden flex flex-col">
                  <div className="px-4 py-2.5 border-b border-d8-border flex items-center gap-2">
                    <span className="text-[12px] text-d8-text-muted tracking-[0.05em]" style={{ fontFamily: 'var(--font-mono)' }}>{card.label}</span>
                    <span className={`text-[10px] border rounded px-1.5 py-0.5 ${card.badgeClass}`} style={{ fontFamily: 'var(--font-mono)' }}>{card.badge}</span>
                  </div>
                  {/* Specimen on a proper dark background, bordered */}
                  <div className="mx-4 mt-4 border border-d8-border/60 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: BG_DARK, padding: 20 }}>
                    {card.child}
                  </div>
                  <p className="text-[11px] text-d8-text-muted/70 leading-relaxed px-4 py-4" style={{ fontFamily: 'var(--font-sans)' }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {platforms.map(platform => {
          const sizes = SOCIAL_SIZES.filter(s => s.platform === platform)
          return (
            <section key={platform}>
              <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>{platform}</h3>
              <p className="text-[13px] text-d8-text-muted/60 mb-5">
                {sizes.map(s => `${s.label} (${s.w}×${s.h})`).join(' · ')}
              </p>
              {ALL_VARIANTS.map(kind => (
                <div key={kind} className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[12px] text-d8-text tracking-[0.04em]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {VARIANT_LABELS[kind]}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-[10px] text-d8-text-muted/60 tracking-[0.06em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Color</span>
                  </div>
                  <div className="flex gap-4 items-end flex-wrap mb-4">
                    {sizes.map(size => (
                      <AssetCard key={`${size.label}-color`} kind={kind} colorMode="color" size={size} bg={BG_DARK} onPreview={openModal} />
                    ))}
                  </div>
                  <div className="mb-1">
                    <span className="text-[10px] text-d8-text-muted/60 tracking-[0.06em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Greyscale</span>
                  </div>
                  <div className="flex gap-4 items-end flex-wrap mb-4">
                    {sizes.map(size => (
                      <AssetCard key={`${size.label}-grey`} kind={kind} colorMode="greyscale" size={size} bg={BG_DARK} onPreview={openModal} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )
        })}

        <section className="border border-d8-border rounded-[6px] bg-d8-surface-1 p-6 max-w-[800px]">
          <h3 className="text-[16px] text-d8-text-muted tracking-[0.08em] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Usage Guidelines</h3>
          <div className="space-y-3 text-[14px] text-d8-text/80" style={{ fontFamily: 'var(--font-sans)' }}>
            {[
              'Always maintain clear space around the logo equal to the height of the "D" in DAEMON.',
              'Use the color variant on dark backgrounds (#0B1120 or darker). On light backgrounds, the text color should be inverted to dark.',
              'The greyscale variant should be used in contexts where color is unavailable or in co-branding scenarios.',
              'Do not rotate, skew, add drop shadows, or apply gradients to the logo.',
              'The "DAEMON + Watermark" integrated form is the primary brand mark. Use "DAEMON8" text-only where the watermark is too small to render clearly.',
              'For profile pictures / avatars, prefer the "Watermark Only" or "Favicon" variants.',
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-d8-primary shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
    </>
  )
}
