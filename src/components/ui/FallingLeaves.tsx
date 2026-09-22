import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Leaf = {
  /** Horizontal start, as a percentage of the hero width. */
  x: number
  size: number
  /** Seconds for one fall, and how long before the first one starts. */
  fall: number
  delay: number
  /** Seconds for one tumble, and how far it drifts sideways on the way down. */
  spin: number
  drift: number
  /** How strongly the leaf answers the pointer: nearer leaves move more. */
  depth: number
  tint: 1 | 2 | 3 | 4
  shape: 'a' | 'b'
}

/** Hand-picked rather than random, so the fall never clumps or flickers on re-render. */
const leaves: Leaf[] = [
  { x: 3, size: 28, fall: 15, delay: 0, spin: 7, drift: 40, depth: 0.8, tint: 1, shape: 'a' },
  { x: 9, size: 19, fall: 19, delay: 6, spin: 9, drift: -28, depth: 0.4, tint: 2, shape: 'b' },
  { x: 15, size: 33, fall: 13, delay: 9, spin: 6, drift: 52, depth: 1, tint: 3, shape: 'a' },
  { x: 22, size: 17, fall: 22, delay: 3, spin: 11, drift: -20, depth: 0.3, tint: 4, shape: 'b' },
  { x: 28, size: 24, fall: 17, delay: 12, spin: 8, drift: 34, depth: 0.6, tint: 2, shape: 'a' },
  { x: 34, size: 30, fall: 14, delay: 5, spin: 6.5, drift: -46, depth: 0.9, tint: 1, shape: 'b' },
  { x: 40, size: 18, fall: 21, delay: 15, spin: 10, drift: 24, depth: 0.35, tint: 3, shape: 'a' },
  { x: 46, size: 26, fall: 16, delay: 2, spin: 7.5, drift: -36, depth: 0.7, tint: 4, shape: 'b' },
  { x: 52, size: 34, fall: 12, delay: 10, spin: 5.5, drift: 44, depth: 1, tint: 2, shape: 'a' },
  { x: 58, size: 18, fall: 23, delay: 7, spin: 12, drift: -22, depth: 0.3, tint: 1, shape: 'b' },
  { x: 64, size: 29, fall: 15.5, delay: 13, spin: 7, drift: 38, depth: 0.75, tint: 3, shape: 'a' },
  { x: 70, size: 21, fall: 18, delay: 4, spin: 9.5, drift: -30, depth: 0.5, tint: 4, shape: 'b' },
  { x: 76, size: 25, fall: 20, delay: 17, spin: 8.5, drift: 26, depth: 0.55, tint: 2, shape: 'a' },
  { x: 82, size: 31, fall: 13.5, delay: 8, spin: 6.8, drift: -42, depth: 0.95, tint: 1, shape: 'b' },
  { x: 88, size: 17, fall: 24, delay: 1, spin: 11.5, drift: 20, depth: 0.3, tint: 3, shape: 'a' },
  { x: 94, size: 27, fall: 16.5, delay: 11, spin: 7.8, drift: -34, depth: 0.7, tint: 2, shape: 'b' },
  { x: 98, size: 20, fall: 21.5, delay: 19, spin: 10.5, drift: 30, depth: 0.45, tint: 4, shape: 'a' },
]

/** A symmetric leaf and a curved one, both with a midrib and a short stem. */
const shapes = {
  a: (
    <>
      <path d="M32 3c19 15 24 33 0 55C8 36 13 18 32 3z" />
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.35">
        <path d="M32 10v44" />
        <path d="M32 24 20 18M32 24l12-6M32 38 21 33M32 38l11-5" />
      </g>
      <path d="M32 56v6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  b: (
    <>
      <path d="M40 3c16 18 12 40-12 56C12 42 16 17 40 3z" />
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.35">
        <path d="M38 10c-6 14-10 30-10 45" />
        <path d="M34 24l-9-3M31 38l-9-2" />
      </g>
      <path d="M28 57l-3 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
}

/**
 * Leaves drifting down behind the hero. They tumble in 3D and lean towards the
 * pointer by depth, so the page feels layered. Decorative only.
 */
export function FallingLeaves() {
  const reduceMotion = useReducedMotion()
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const host = layer?.parentElement
    if (reduceMotion || !layer || !host) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const box = host.getBoundingClientRect()
        const x = (event.clientX - box.left) / box.width - 0.5
        const y = (event.clientY - box.top) / box.height - 0.5
        layer.style.setProperty('--px', `${(-x * 26).toFixed(1)}px`)
        layer.style.setProperty('--py', `${(-y * 16).toFixed(1)}px`)
      })
    }
    const onLeave = () => {
      layer.style.setProperty('--px', '0px')
      layer.style.setProperty('--py', '0px')
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [reduceMotion])

  return (
    <div className="leaves" ref={layerRef} aria-hidden="true">
      {leaves.map((leaf, index) => (
        <span
          key={index}
          className={`leaf leaf--${leaf.tint}`}
          style={
            {
              '--x': `${leaf.x}%`,
              '--size': `${leaf.size}px`,
              '--fall': `${leaf.fall}s`,
              '--delay': `${leaf.delay}s`,
              '--spin': `${leaf.spin}s`,
              '--drift': `${leaf.drift}px`,
              '--depth': leaf.depth,
            } as React.CSSProperties
          }
        >
          <span className="leaf__fall">
            <svg className="leaf__spin" viewBox="0 0 64 64" fill="currentColor">
              {shapes[leaf.shape]}
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}
