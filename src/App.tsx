import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Menu, Music2, Pause, X } from 'lucide-react'
import {
  ArchPhoto,
  CornerMotifs,
  Divider,
  FramedPhoto,
  KasavuBand,
  Kalasham,
  Lotus,
  Om,
  OrnamentDefs,
  Pookalam,
  Vilakku,
} from './components/ornaments/Ornaments'
import { ButterflyLoader } from './components/ui/ButterflyLoader'
import { FallingLeaves } from './components/ui/FallingLeaves'
import { FlowerButterfly } from './components/ui/FlowerButterfly'
import { GlowCard } from './components/ui/GlowCard'
import { loveStory } from './data/loveStory'
import { heroPhoto, momentPhotos, wedding } from './data/wedding'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function Intro({ onEnter }: { onEnter: () => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className="intro"
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
      transition={{ duration: 0.8 }}
    >
      <Pookalam className="intro__watermark" />
      <motion.div
        className="intro__content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <p className="eyebrow script">With love, blessings &amp; forever…</p>
        <Divider />
        <h1>
          <span>{wedding.couple.groom}</span>
          <small>with</small>
          <span>{wedding.couple.bride}</span>
        </h1>
        <KasavuBand className="intro__band" />
        <p className="intro__date">2nd December 2026</p>
        <p className="intro__promise">A beautiful beginning to forever.</p>
        <button className="gold-button" onClick={onEnter}>
          <span>Open Invitation</span>
        </button>
      </motion.div>
      <Vilakku className="intro__lamp intro__lamp--left" />
      <Vilakku className="intro__lamp intro__lamp--right" />
      <button className="intro__skip" onClick={onEnter}>
        Skip intro
      </button>
    </motion.div>
  )
}

const navItems = [
  ['Home', 'home'],
  ['Our Story', 'story'],
  ['Wedding', 'wedding'],
  ['Reception', 'reception'],
  ['Moments', 'moments'],
] as const

function Navigation() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])
  return (
    <header className="nav-wrap">
      <a className="monogram" href="#home" aria-label="Akshay and Surya, home">
        <span className="monogram__ripple" aria-hidden="true" />
        <span className="monogram__text">
          A <i>&amp;</i> S
        </span>
      </a>
      <nav className={open ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <FallingLeaves />
      <div className="hero__inner">
        <motion.div
          className="hero__frame"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <ArchPhoto src={heroPhoto.src} alt={heroPhoto.alt} priority />
        </motion.div>
        <motion.div
          className="hero__copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.85 }}
        >
          <p className="eyebrow">Shubha Vivaham</p>
          <Divider compact />
          <h2>
            Two souls,
            <em>one beautiful journey.</em>
          </h2>
          <p className="hero__names">
            {wedding.couple.groom} &amp; {wedding.couple.bride}
          </p>
          <div className="hero__date">
            <ButterflyLoader className="hero__butterfly" />
            <Lotus className="hero__date-motif" />
            <p>
              <span>2 December 2026</span>
              <small>{wedding.ceremony.malayalamDate}</small>
            </p>
          </div>
        </motion.div>
      </div>
      <a href="#story" className="scroll-cue" aria-label="Scroll to our story">
        <span>Our story</span>
        <ArrowDown />
      </a>
      <KasavuBand className="hero__band" />
    </section>
  )
}

/** The muhurtam, in Indian Standard Time. */
const muhurtamAt = new Date('2026-12-02T08:00:00+05:30').getTime()

function timeLeft() {
  const seconds = Math.floor((muhurtamAt - Date.now()) / 1000)
  if (seconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true }
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
    arrived: false,
  }
}

function Countdown() {
  const [left, setLeft] = useState(timeLeft)

  useEffect(() => {
    if (left.arrived) return
    const tick = window.setInterval(() => setLeft(timeLeft()), 1000)
    return () => window.clearInterval(tick)
  }, [left.arrived])

  const units = [
    ['Days', left.days],
    ['Hours', left.hours],
    ['Minutes', left.minutes],
    ['Seconds', left.seconds],
  ] as const

  return (
    <section className="countdown" id="countdown">
      <Pookalam className="countdown__watermark" />
      <motion.div
        className="countdown__inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow script">Every moment brings us closer</p>
        <h2>{left.arrived ? 'Our forever has begun.' : 'Counting down to the muhurtam'}</h2>

        {/* The digits change every second, so they stay out of the accessibility tree. */}
        <div className="countdown__grid" aria-hidden="true">
          {units.map(([label, value]) => (
            <GlowCard key={label} hover="swing" className="countdown__cell">
              <div className="count-card">
                <strong>{String(value).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            </GlowCard>
          ))}
        </div>
        <p className="sr-only">
          {left.arrived
            ? 'The wedding day has arrived.'
            : `${left.days} days and ${left.hours} hours until the wedding.`}
        </p>

        <KasavuBand className="countdown__band" />
        <p className="countdown__note">
          Wednesday, 2 December 2026 · Muhurtam after 8:00 AM
          <small>Sree Krishna Temple, Guruvayur</small>
        </p>
      </motion.div>
    </section>
  )
}

function SectionHeading({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <motion.header
      className="section-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
    >
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {copy && <p className="section-heading__copy">{copy}</p>}
      <Divider compact />
    </motion.header>
  )
}

function Story() {
  return (
    <section className="story section" id="story">
      <SectionHeading label="Our love story" title="Seven chapters. One forever." />
      <div className="story__timeline">
        {loveStory.map((chapter) => (
          <motion.article
            className={`chapter chapter--${chapter.variant}`}
            key={chapter.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.75 }}
          >
            <div className="chapter__copy">
              {chapter.variant === 'finale' ? <Pookalam className="chapter__emblem" /> : <Lotus className="chapter__motif" />}
              <p className="chapter__label">
                Chapter {chapter.number}
              </p>
              <h3>{chapter.title}</h3>
              <p className="chapter__text">{chapter.text}</p>
              {chapter.variant === 'highlight' && <FlowerButterfly className="chapter__bloom" />}
            </div>
            {chapter.variant === 'photo' && chapter.image && (
              <div className="chapter__frame glow-card">
                <FramedPhoto src={chapter.image} alt={chapter.imageAlt ?? ''} />
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="event-detail">
      <span className="event-detail__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="event-detail__label">{label}</p>
        <p>{children}</p>
      </div>
    </div>
  )
}

function MapLink({ url, label = 'View on map' }: { url: string; label?: string }) {
  if (!url) return null
  return (
    <a className="map-link" href={url} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  )
}

function LocationButton({ url }: { url: string }) {
  if (!url) return null
  return (
    <a className="gold-button gold-button--small" href={url} target="_blank" rel="noopener noreferrer">
      <span>Open in Maps</span>
    </a>
  )
}

function EventSection({ reception = false }: { reception?: boolean }) {
  const details = reception ? wedding.reception : wedding.ceremony
  return (
    <section
      className={`event-section section ${reception ? 'event-section--reception' : ''}`}
      id={reception ? 'reception' : 'wedding'}
    >
      <SectionHeading
        label={reception ? 'Celebrate with us' : 'With the blessings of our families'}
        title={reception ? 'The Reception' : 'The Wedding Ceremony'}
        copy={
          reception
            ? 'An evening of joy, celebration & togetherness.'
            : 'We invite you to witness our union.'
        }
      />
      <motion.div
        className="invitation-card-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8 }}
      >
        <GlowCard>
          <div className="invitation-card">
            <CornerMotifs />
            <Kalasham className="invitation-card__crest" />
            <div className="event-date">
              {!reception && <Om className="om--card" />}
              <p>{details.day}</p>
              <strong>{reception ? '3rd' : '2nd'}</strong>
              <div className="event-date__month">
                <span>DECEMBER</span>
                <span>2026</span>
              </div>
              {!reception && <p className="malayalam-date">{wedding.ceremony.malayalamDate}</p>}
            </div>
            <div className="event-details">
              <Detail icon={<MapPin />} label="Venue">
                {details.venue}
                <small>{details.address}</small>
              </Detail>
              <Detail icon={<Clock3 />} label={reception ? 'Time' : 'Muhurtam'}>
                {reception ? wedding.reception.time : wedding.ceremony.muhurtam}
              </Detail>
              {!reception && (
                <Detail icon={<CalendarDays />} label="Followed by wedding rituals at">
                  {wedding.ceremony.ritualsVenue}
                  <small>{wedding.ceremony.ritualsTime}</small>
                  <small>{wedding.ceremony.ritualsAddress}</small>
                  <MapLink url={wedding.ceremony.ritualsMapUrl} />
                </Detail>
              )}
              <LocationButton url={details.mapUrl} />
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </section>
  )
}

function Moments() {
  const [active, setActive] = useState<number | null>(null)
  const show = (index: number) => setActive((index + momentPhotos.length) % momentPhotos.length)

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') show(active + 1)
      if (event.key === 'ArrowLeft') show(active - 1)
    }
    document.body.classList.add('no-scroll')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
        <section className="moments section" id="moments">
      <SectionHeading label="In photographs" title="Moment we cherish" />
      <div className="moments__grid">
        {momentPhotos.map((photo, index) => (
          <motion.button
            type="button"
            className="moment-card"
            key={photo.src}
            onClick={() => setActive(index)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            aria-label={`Open photo: ${photo.label}`}
          >
            <span className="glow-card glow-card--tilt">
              <span className="photo-frame">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </span>
            </span>
            <span className="moment-card__label">{photo.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button className="lightbox__close" onClick={() => setActive(null)} aria-label="Close photo">
              <X />
            </button>
            {momentPhotos.length > 1 && (
              <button
                className="lightbox__arrow lightbox__arrow--left"
                onClick={(event) => {
                  event.stopPropagation()
                  show(active - 1)
                }}
                aria-label="Previous photo"
              >
                <ArrowLeft />
              </button>
            )}
            <motion.figure
              key={momentPhotos[active].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={momentPhotos[active].src} alt={momentPhotos[active].alt} />
              <figcaption>{momentPhotos[active].label}</figcaption>
            </motion.figure>
            {momentPhotos.length > 1 && (
              <button
                className="lightbox__arrow lightbox__arrow--right"
                onClick={(event) => {
                  event.stopPropagation()
                  show(active + 1)
                }}
                aria-label="Next photo"
              >
                <ArrowRight />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function FamilyInvitation() {
  return (
    <section className="family section">
      <SectionHeading label="Together with our families" title="We joyfully invite you." />
      <GlowCard className="family-card-shell">
        <div className="family-card">
          <KasavuBand className="family-card__band family-card__band--top" />
          <div className="family-card__side">
            <Lotus />
            <p className="family-card__role">Groom’s family</p>
            <h3>{wedding.families.groom.names}</h3>
            <p className="family-card__address">{wedding.families.groom.address}</p>
          </div>
          <i className="family-card__divider" />
          <div className="family-card__side">
            <Lotus />
            <p className="family-card__role">Bride’s family</p>
            <h3>{wedding.families.bride.names}</h3>
            <p className="family-card__address">{wedding.families.bride.address}</p>
          </div>
          <KasavuBand className="family-card__band family-card__band--bottom" />
        </div>
      </GlowCard>
    </section>
  )
}

function Closing() {
  return (
    <footer className="closing">
      <Pookalam className="closing__emblem" />
      <motion.div
        className="closing__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={fadeUp}
        transition={{ duration: 0.9 }}
      >
        <Om />
        <p className="eyebrow script">With love and gratitude</p>
        <h2>{wedding.couple.short}</h2>
        <p className="closing__date">2nd December 2026</p>
        <Divider compact />
        <blockquote>“{wedding.closing.blessing}”</blockquote>
        <p className="closing__sharing">{wedding.closing.sharing}</p>
      </motion.div>
      <div className="closing__lamps" aria-hidden="true">
        <Vilakku />
        <Vilakku />
        <Vilakku />
      </div>
      <p className="closing__mark">
        A <span>&amp;</span> S
      </p>
    </footer>
  )
}

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    try {
      await audio.play()
      setAvailable(true)
    } catch {
      setAvailable(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Browsers that permit autoplay start immediately. If they block it, the
    // intro button sends this event within its user gesture and playback starts.
    const startMusic = () => {
      void audio.play().then(() => setAvailable(true)).catch(() => {
        // Autoplay blocking is expected; keep the manual music control usable.
      })
    }
    const onVisibility = () => {
      if (document.hidden && !audio.paused) {
        audio.pause()
      }
    }
    startMusic()
    window.addEventListener('wedding-music-start', startMusic)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('wedding-music-start', startMusic)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="music-wrap">
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/sita-kalyanam.mp3"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {!available && (
        <span className="music-note" role="status">
          Music could not be played
        </span>
      )}
      <button
        className={`music-button ${playing ? 'music-button--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <Pause /> : <Music2 />}
      </button>
    </div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const openInvitation = () => {
    window.dispatchEvent(new Event('wedding-music-start'))
    setEntered(true)
  }

  return (
    <>
      <OrnamentDefs />
      <AnimatePresence>{!entered && <Intro onEnter={openInvitation} />}</AnimatePresence>
      <div className={entered ? 'site' : 'site site--locked'}>
        <Navigation />
        <main>
          <Hero />
          <Story />
          <EventSection />
          <EventSection reception />
          <Moments />
          <FamilyInvitation />
          <Countdown />
        </main>
        <Closing />
        <MusicToggle />
      </div>
    </>
  )
}
