/**
 * One side of the butterfly: a swept forewing above a rounder hindwing, both
 * hinged on the body edge. Mirrored for the right side.
 */
function Wing({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg viewBox="0 0 50 70" aria-hidden="true">
      <g fill="currentColor" transform={mirrored ? 'translate(50 0) scale(-1 1)' : undefined}>
        <path d="M50 9C38 -1 17 -2 8 8 -1 18 1 30 13 33c10 3 26 2 37-1z" />
        <path d="M50 37c-11-1-24 1-31 7-9 8-6 21 6 22 11 1 20-7 25-15z" opacity="0.78" />
      </g>
    </svg>
  )
}

/** The CSS keys the bobbing motion off a bare `anim1` attribute. */
const bobbing = { anim1: '' } as Record<string, string>

/**
 * Butterfly with flapping wings, built on the Uiverse loader markup: wing, body,
 * wing. Purely decorative, so it is hidden from assistive technology.
 */
export function ButterflyLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`loader ${className}`} {...bobbing} aria-hidden="true">
      <Wing />
      <svg className="loader__body" viewBox="0 0 16 72" aria-hidden="true">
        <ellipse cx="8" cy="44" rx="3.4" ry="25" fill="currentColor" />
        <circle cx="8" cy="14" r="4.6" fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M8 11C5 5 3 4 1.5 3.5" />
          <path d="M8 11c3-6 5-7 6.5-7.5" />
        </g>
      </svg>
      <Wing mirrored />
    </div>
  )
}
