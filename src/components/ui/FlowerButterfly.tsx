const petals = [1, 2, 3, 4, 5, 6, 7, 8]

/** One wing, drawn as a large upper lobe and a smaller lower one. */
function Wing({ side }: { side: 'left' | 'right' }) {
  return (
    <svg className={`butterfly__wing butterfly__wing--${side}`} viewBox="0 0 50 70" aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="26" cy="23" rx="24" ry="21" transform="rotate(-14 26 23)" />
        <ellipse cx="31" cy="53" rx="19" ry="15" transform="rotate(-8 31 53)" />
      </g>
    </svg>
  )
}

/**
 * A slowly breathing flower with a butterfly circling it. Purely decorative,
 * so it is hidden from assistive technology.
 */
export function FlowerButterfly({ className = '' }: { className?: string }) {
  return (
    <div className={`bloom ${className}`} aria-hidden="true">
      <div className="flower">
        {petals.map((petal) => (
          <span key={petal} className={`petal petal${petal}`} />
        ))}
        <span className="center" />
      </div>
      <div className="bloom__orbit">
        <div className="bloom__arm">
          <span className="butterfly">
            <Wing side="left" />
            <svg className="butterfly__body" viewBox="0 0 16 72" aria-hidden="true">
              <ellipse cx="8" cy="44" rx="3.4" ry="25" fill="currentColor" />
              <circle cx="8" cy="14" r="4.6" fill="currentColor" />
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 11C5 5 3 4 1.5 3.5" />
                <path d="M8 11c3-6 5-7 6.5-7.5" />
              </g>
            </svg>
            <Wing side="right" />
          </span>
        </div>
      </div>
    </div>
  )
}
