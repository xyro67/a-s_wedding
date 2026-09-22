import type { ReactNode } from 'react'

/**
 * Wraps a card in an offset gradient edge and a soft blurred halo.
 * The wrapper owns both layers so the card inside keeps its own borders.
 */
export function GlowCard({
  children,
  className = '',
  hover = 'lift',
}: {
  children: ReactNode
  /** Extra classes for the wrapper. */
  className?: string
  /**
   * How the gradient edge reacts on hover. `swing` is the full quarter turn and
   * only suits small cards, where it stays within the neighbouring gap.
   */
  hover?: 'lift' | 'tilt' | 'swing'
}) {
  return <div className={`glow-card glow-card--${hover} ${className}`}>{children}</div>
}
