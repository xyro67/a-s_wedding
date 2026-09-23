import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const D2R = Math.PI / 180

/** Outer and inner lines of the temple arch that frames the scene. */
const ARCH_OUTER = 'M30,500 L30,180 C30,80 110,20 200,20 C290,20 370,80 370,180 L370,500'
const ARCH_INNER = 'M46,500 L46,182 C46,92 116,36 200,36 C284,36 354,92 354,182 L354,500'

type Leaf = { x: number; y: number; angle: number; side: 1 | -1 }

/** A vine that waves up one side of the arch, with leaves on alternating sides. */
function buildVine(baseX: number) {
  const points: [number, number][] = []
  for (let y = 60; y <= 460; y += 18) {
    points.push([baseX + 14 * Math.sin(y / 48), y])
  }

  let path = `M${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1]
    const [x, y] = points[i]
    path += ` Q${px},${py} ${(px + x) / 2},${(py + y) / 2}`
  }

  const leaves: Leaf[] = []
  points.forEach(([x, y], i) => {
    if (i % 2 !== 0) return
    const [nx, ny] = points[Math.min(i + 1, points.length - 1)]
    leaves.push({
      x,
      y,
      angle: (Math.atan2(ny - y, nx - x) * 180) / Math.PI,
      side: (i / 2) % 2 === 0 ? 1 : -1,
    })
  })

  return { path, leaves }
}

const vine = buildVine(58)

function Vine({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <g transform={mirrored ? 'translate(116,0) scale(-1,1)' : undefined}>
      <path d={vine.path} fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7" />
      {vine.leaves.map((leaf, i) => (
        <path
          key={i}
          d="M0,0 C6,-5 12,-3 14,0 C12,3 6,5 0,0 Z"
          fill={leaf.side > 0 ? 'var(--sage)' : 'var(--muted-gold)'}
          opacity="0.85"
          transform={`translate(${leaf.x},${leaf.y}) rotate(${leaf.angle + (leaf.side > 0 ? -35 : 35)})`}
        />
      ))}
    </g>
  )
}

/**
 * Tail feathers fanned from a pivot behind the bird. Each one bows away from
 * the centre of the fan and is longest in the middle, so the tail curves rather
 * than spiking, and carries an eye at its tip.
 */
const FAN_PIVOT = { x: -8, y: 4 }
const feathers = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10
  const angle = (-168 + 84 * t) * D2R
  const length = 64 + 20 * Math.sin(Math.PI * t)
  const bend = (t - 0.5) * 34
  const dir = { x: Math.cos(angle), y: Math.sin(angle) }
  const perp = { x: -Math.sin(angle), y: Math.cos(angle) }

  const tipX = FAN_PIVOT.x + dir.x * length + perp.x * bend
  const tipY = FAN_PIVOT.y + dir.y * length + perp.y * bend
  const midX = FAN_PIVOT.x + dir.x * length * 0.5 + perp.x * bend * 0.34
  const midY = FAN_PIVOT.y + dir.y * length * 0.5 + perp.y * bend * 0.34
  const width = 7.6

  return {
    vane: `M${FAN_PIVOT.x},${FAN_PIVOT.y} Q${midX + perp.x * width},${midY + perp.y * width} ${tipX},${tipY} Q${midX - perp.x * width},${midY - perp.y * width} ${FAN_PIVOT.x},${FAN_PIVOT.y} Z`,
    shaft: `M${FAN_PIVOT.x},${FAN_PIVOT.y} Q${midX},${midY} ${tipX},${tipY}`,
    fill: i % 2 === 0 ? 'var(--maroon)' : 'var(--gold)',
    tipX,
    tipY,
  }
})

function Peacock({ x, y, mirrored = false }: { x: number; y: number; mirrored?: boolean }) {
  return (
    <g transform={`translate(${x},${y}) scale(${mirrored ? -1 : 1},1)`}>
      {feathers.map((feather, i) => (
        <g key={i}>
          <path d={feather.vane} fill={feather.fill} opacity="0.6" />
          <path d={feather.shaft} fill="none" stroke="var(--gold)" strokeWidth="0.7" opacity="0.75" />
          <circle cx={feather.tipX} cy={feather.tipY} r="4.8" fill="var(--champagne)" />
          <circle cx={feather.tipX} cy={feather.tipY} r="2.8" fill="var(--maroon)" opacity="0.85" />
          <circle cx={feather.tipX} cy={feather.tipY} r="1.1" fill="var(--gold)" />
        </g>
      ))}
      <ellipse cx="-8" cy="7" rx="15.5" ry="11.5" fill="var(--maroon)" />
      <path d="M3,2 C7,-12 16,-23 28,-26 C32,-27 34,-23 31,-21 C22,-15 12,-6 7,5 Z" fill="var(--maroon)" />
      <circle cx="30" cy="-27" r="5.2" fill="var(--maroon)" />
      <path d="M34,-28 L43,-25 L34,-23 Z" fill="var(--gold)" />
      <circle cx="31" cy="-28.6" r="1.1" fill="var(--cream)" />
      <path
        d="M30,-32 C28,-37 27,-39 26,-41 M30,-32 C30,-37 30,-39 30,-42 M30,-32 C32,-37 33,-39 34,-41"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {[
        [26, -41],
        [30, -42],
        [34, -41],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="1.3" fill="var(--gold)" />
      ))}
    </g>
  )
}

/** Mango leaves fanned over the mouth of the kalasham, the outer ones drooping. */
const mangoLeaves = Array.from({ length: 7 }, (_, i) => {
  const t = i / 6
  const angle = (-160 + 140 * t) * D2R
  const length = 34 + 10 * Math.sin(Math.PI * t)
  const droop = 34 * Math.abs(t - 0.5)
  const width = 7

  const tipX = 200 + length * Math.cos(angle)
  const tipY = 344 + length * Math.sin(angle) + droop
  const midX = 200 + length * 0.5 * Math.cos(angle)
  const midY = 344 + length * 0.5 * Math.sin(angle) + droop * 0.3
  const perpX = -Math.sin(angle) * width
  const perpY = Math.cos(angle) * width

  return `M200,344 Q${midX + perpX},${midY + perpY} ${tipX},${tipY} Q${midX - perpX},${midY - perpY} 200,344 Z`
})

/** Jasmine thoran strung across the arch, with a bud hanging from every third flower. */
const thoran = Array.from({ length: 19 }, (_, i) => {
  const t = i / 18
  const x = 58 + 284 * t
  // Quadratic swag from shoulder to shoulder, dipping at the centre.
  const y = (1 - t) * (1 - t) * 168 + 2 * (1 - t) * t * 268 + t * t * 168
  return { x, y, bud: i % 3 === 1 }
})

/** Hanging brass lamp that fills the crown of the arch. */
function HangingLamp() {
  return (
    <g className="temple-scene__lamp">
      <path d="M200,40 L200,132" stroke="var(--gold)" strokeWidth="1.2" />
      {[56, 72, 88, 104, 120].map((y) => (
        <circle key={y} cx="200" cy={y} r="2.4" fill="none" stroke="var(--gold)" strokeWidth="1" />
      ))}
      <path d="M186,132 L214,132 L208,142 L192,142 Z" fill="var(--gold)" />
      <path
        d="M176,142 Q200,137 224,142 Q218,166 200,172 Q182,166 176,142 Z"
        fill="var(--gold)"
        stroke="var(--maroon)"
        strokeWidth="1.1"
      />
      <path d="M180,152 Q200,158 220,152" fill="none" stroke="var(--maroon)" strokeWidth="0.9" opacity="0.7" />
      <path d="M176,146 L164,150 L176,155 Z M224,146 L236,150 L224,155 Z" fill="var(--gold)" />
      <g className="temple-scene__flame">
        <path d="M164,150 Q160,142 164,136 Q168,142 164,150 Z" fill="var(--maroon)" />
        <path d="M236,150 Q240,142 236,136 Q232,142 236,150 Z" fill="var(--maroon)" />
      </g>
    </g>
  )
}

/** Petals drifting upward in front of the scene. */
const petals = [
  { left: '8%', top: '70%', dx: '30px', delay: '0s', fill: 'var(--champagne)' },
  { left: '80%', top: '75%', dx: '-25px', delay: '2.2s', fill: 'var(--maroon)' },
  { left: '50%', top: '80%', dx: '15px', delay: '4.5s', fill: 'var(--gold)' },
  { left: '25%', top: '78%', dx: '-18px', delay: '6.3s', fill: 'var(--champagne)' },
]

/** How far each layer answers the pointer: nearer elements move more. */
const depths = { arch: 0.15, vines: 0.35, peacocks: 0.55, kalash: 0.85 }

/**
 * Hand-drawn temple scene — arch, vines, peacocks and a kalasham — with the
 * layers parallaxing against the pointer. Decorative, so hidden from assistive
 * technology.
 */
export function TempleScene({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (reduceMotion || !wrap) return

    const layers = Array.from(wrap.querySelectorAll<SVGGElement>('[data-depth]'))
    let frame = 0

    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const box = wrap.getBoundingClientRect()
        const x = (event.clientX - box.left) / box.width - 0.5
        const y = (event.clientY - box.top) / box.height - 0.5
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth)
          layer.style.transform = `translate(${(x * 24 * depth).toFixed(2)}px, ${(y * 16 * depth).toFixed(2)}px)`
        })
      })
    }
    const onLeave = () => layers.forEach((layer) => (layer.style.transform = 'translate(0,0)'))

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [reduceMotion])

  return (
    <div className={`temple-scene ${className}`} ref={wrapRef} aria-hidden="true">
      <svg className="temple-scene__svg" viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="templeSceneGlow">
            <stop offset="0%" stopColor="var(--champagne)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="390" r="120" fill="url(#templeSceneGlow)" />
        <g data-depth={depths.arch}>
          <path d={ARCH_OUTER} fill="none" stroke="var(--gold)" strokeWidth="2" />
          <path d={ARCH_INNER} fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.55" />
          <HangingLamp />
        </g>
        <g data-depth={depths.vines}>
          <path
            d={`M${thoran[0].x},${thoran[0].y} Q200,268 ${thoran[18].x},${thoran[18].y}`}
            fill="none"
            stroke="var(--sage)"
            strokeWidth="1"
            opacity="0.7"
          />
          {thoran.map((flower, i) => (
            <g key={i}>
              <circle cx={flower.x} cy={flower.y} r="3.2" fill="var(--cream)" stroke="var(--gold)" strokeWidth="0.7" />
              {flower.bud && (
                <path
                  d={`M${flower.x},${flower.y + 3} L${flower.x},${flower.y + 11}`}
                  stroke="var(--sage)"
                  strokeWidth="0.8"
                />
              )}
              {flower.bud && <circle cx={flower.x} cy={flower.y + 13} r="2.4" fill="var(--rose)" opacity="0.85" />}
            </g>
          ))}
        </g>
        <g data-depth={depths.vines}>
          <Vine />
          <Vine mirrored />
          <g transform="translate(400,0) scale(-1,1)">
            <Vine />
            <Vine mirrored />
          </g>
        </g>
        <g data-depth={depths.peacocks}>
          <Peacock x={95} y={430} />
          <Peacock x={305} y={430} mirrored />
        </g>
        <g data-depth={depths.kalash}>
          <path
            d="M170,380 C170,362 176,352 200,352 C224,352 230,362 230,380 L234,420 C234,436 220,448 200,448 C180,448 166,436 166,420 Z"
            fill="var(--maroon)"
            stroke="var(--gold)"
            strokeWidth="1.5"
          />
          <rect x="190" y="338" width="20" height="16" fill="var(--maroon)" stroke="var(--gold)" strokeWidth="1.2" />
          {mangoLeaves.map((d, i) => (
            <path key={i} d={d} fill="var(--sage)" opacity={i % 2 === 0 ? 0.95 : 0.75} />
          ))}
          <circle cx="200" cy="324" r="17" fill="var(--gold)" stroke="var(--maroon)" strokeWidth="1.2" />
          <path d="M194,318 Q200,312 206,318" fill="none" stroke="var(--maroon)" strokeWidth="1" opacity="0.6" />
          <path d="M168,400 Q200,410 232,400" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.8" />
        </g>
      </svg>
      {petals.map((petal, i) => (
        <span
          key={i}
          className="temple-scene__petal"
          style={
            {
              left: petal.left,
              top: petal.top,
              '--dx': petal.dx,
              animationDelay: petal.delay,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 10 14" aria-hidden="true">
            <path d="M5,0 C9,4 9,10 5,14 C1,10 1,4 5,0 Z" fill={petal.fill} />
          </svg>
        </span>
      ))}
    </div>
  )
}
