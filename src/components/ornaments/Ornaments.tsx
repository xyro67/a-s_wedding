/** Temple arch outline, drawn in a 0–100 box and stretched with preserveAspectRatio="none". */
const ARCH_PATH = 'M0,100 L0,42 C0,22 40,8.5 50,0 C60,8.5 100,22 100,42 L100,100 Z'

/** Shared SVG definitions, rendered once per page. */
export function OrnamentDefs() {
  return (
    <svg className="svg-defs" aria-hidden="true" focusable="false">
      <clipPath id="templeArch" clipPathUnits="objectBoundingBox">
        <path d="M0,1 L0,0.42 C0,0.22 0.4,0.085 0.5,0 C0.6,0.085 1,0.22 1,0.42 L1,1 Z" />
      </clipPath>
    </svg>
  )
}

/** ॐ — the auspicious emblem printed at the head of the invitation. */
export function Om({ className = '' }: { className?: string }) {
  return (
    <span className={`om ${className}`} aria-hidden="true">
      ॐ
    </span>
  )
}

/** Nilavilakku — the traditional Kerala standing oil lamp. */
export function Vilakku({ className = '' }: { className?: string }) {
  return (
    <svg className={`vilakku ${className}`} viewBox="0 0 64 104" aria-hidden="true">
      <path className="vilakku__flame" d="M32 4c5 7 8.5 11 8.5 16.5a8.5 8.5 0 0 1-17 0C23.5 15 27 11 32 4Z" />
      <path className="vilakku__glow" d="M32 10c3 4 5 7 5 10.5a5 5 0 0 1-10 0c0-3.5 2-6.5 5-10.5Z" />
      <path d="M12 36h40l-7 9H19l-7-9Z" />
      <path d="M29.5 45h5v24h-5Z" />
      <path d="M20 69h24l3.5 7h-31L20 69Z" />
      <path d="M13 79h38l6 9H7l6-9Z" />
      <path d="M4 92h56" />
    </svg>
  )
}

/** Lotus motif used as a chapter and section marker. */
export function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 100 56" aria-hidden="true">
      <path d="M50 4c7 12 7 26 0 44-7-18-7-32 0-44Z" />
      <path d="M50 48C38 44 28 32 26 14c12 6 21 16 24 34Z" />
      <path d="M50 48c12-4 22-16 24-34-12 6-21 16-24 34Z" />
      <path d="M50 48C34 50 18 44 8 32c16-4 32 2 42 16Z" />
      <path d="M50 48c16 2 32-4 42-16-16-4-32 2-42 16Z" />
    </svg>
  )
}

/** Kalasham finial that crowns the temple arch. */
export function Kalasham({ className = '' }: { className?: string }) {
  return (
    <svg className={`kalasham ${className}`} viewBox="0 0 40 52" aria-hidden="true">
      <path d="M20 2v7" />
      <circle cx="20" cy="12" r="3.5" />
      <path d="M8 20h24" />
      <path d="M11 22h18l-2.5 16h-13L11 22Z" />
      <path d="M13 42h14" />
    </svg>
  )
}

/** Pookalam-inspired emblem: concentric petal rings. */
export function Pookalam({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, index) => index * 30)
  return (
    <svg className={`pookalam ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g transform="translate(100 100)">
        {petals.map((angle) => (
          <path key={angle} d="M0-84C10-64 10-48 0-34-10-48-10-64 0-84Z" transform={`rotate(${angle})`} />
        ))}
        {petals.map((angle) => (
          <path
            key={`inner-${angle}`}
            className="pookalam__inner"
            d="M0-52C7-40 7-30 0-22-7-30-7-40 0-52Z"
            transform={`rotate(${angle + 15})`}
          />
        ))}
        <circle r="72" />
        <circle r="16" />
        <circle r="7" className="pookalam__eye" />
      </g>
    </svg>
  )
}

/** Kasavu band — the gold border of a Kerala mundu, used as a section divider. */
export function KasavuBand({ className = '' }: { className?: string }) {
  return <div className={`kasavu ${className}`} aria-hidden="true" />
}

/** Lotus flanked by gold hairlines. */
export function Divider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`divider ${compact ? 'divider--compact' : ''}`} aria-hidden="true">
      <span />
      <Lotus />
      <span />
    </div>
  )
}

/** Mural-inspired corner flourish for cards. */
export function CornerMotifs() {
  return (
    <>
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <svg key={corner} className={`corner-motif corner-motif--${corner}`} viewBox="0 0 60 60" aria-hidden="true">
          <path d="M2 2h22M2 2v22" />
          <path d="M8 8c14 0 24 10 24 24" />
          <path d="M8 20c7 0 12 5 12 12" />
          <circle cx="8" cy="8" r="2.5" />
        </svg>
      ))}
    </>
  )
}

/**
 * Photograph in a gold double-line frame. Used where the subjects sit high in the
 * shot, so the arch silhouette would crop their faces.
 */
export function FramedPhoto({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`photo-frame ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </figure>
  )
}

/** Photograph inside a temple-arch frame, crowned by a kalasham. */
export function ArchPhoto({
  src,
  alt,
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure className={`arch ${className}`}>
      <div className="arch__media">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      <svg className="arch__outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={ARCH_PATH} transform="translate(50 50) scale(0.94 0.95) translate(-50 -50)" />
      </svg>
      <Kalasham className="arch__finial" />
    </figure>
  )
}
