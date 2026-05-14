import { useMemo, useState } from "react"
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react"

function computeNextSaturdayScarcity(): { n: number; dateLabel: string } {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const dow = d.getDay()
  const offset = dow === 6 ? 0 : (6 - dow + 7) % 7
  d.setDate(d.getDate() + offset)
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86400000)
  const n = (dayOfYear % 3) + 1
  const dateLabel = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(d)
  return { n, dateLabel }
}

export function Hero() {
  const [imgFailed, setImgFailed] = useState(false)
  const scarcity = useMemo(computeNextSaturdayScarcity, [])

  return (
    <section id="top" className="hero-cinematic">
      <div className={`hero-bg ${imgFailed ? "hero-bg--fallback" : ""}`}>
        {!imgFailed && (
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=2400&auto=format&fit=crop&q=80"
            srcSet="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&auto=format&fit=crop&q=72 1200w, https://images.unsplash.com/photo-1551076805-e1869033e561?w=2000&auto=format&fit=crop&q=78 2000w, https://images.unsplash.com/photo-1551076805-e1869033e561?w=2800&auto=format&fit=crop&q=82 2800w"
            sizes="100vw"
            alt="Surgical team performing a procedure inside a modern operating theatre"
            className="hero-image"
            loading="eager"
            fetchPriority="high"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain-noise" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
      </div>

      <div className="hero-shell">
        <div className="hero-content reveal">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>International Medical Shadowing</span>
            <span className="hero-eyebrow-dot" aria-hidden="true">·</span>
            <span>Yerevan, Armenia</span>
            <span className="hero-eyebrow-line" />
          </div>

          <h1 className="hero-headline">
            Inside Armenia's
            <br />
            leading <em>surgical floor</em>.
          </h1>

          <p className="hero-subline">
            The international observership program at{" "}
            <span className="hero-subline-strong">Astghik Medical Center, Yerevan</span> —
            twenty-four specialties, fifteen operating rooms, ISO-certified, in English.
            Designed for medical students, residents, and young physicians from around the world.
          </p>

          <div className="hero-ctas">
            <a href="#apply" className="btn-hero-primary">
              Apply for a Program
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#specialties" className="btn-hero-ghost">
              Explore 24 Specialties
            </a>
          </div>

          <p className="hero-scarcity">
            <span className="hero-pulse" aria-hidden="true">
              <span className="hero-pulse-ring" />
              <span className="hero-pulse-dot" />
            </span>
            {scarcity.n} spot{scarcity.n === 1 ? "" : "s"} left for {scarcity.dateLabel}
          </p>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-stats reveal">
            <div className="hero-stat">
              <span className="hero-stat-num">
                30<span className="hero-stat-mark">+</span>
              </span>
              <span className="hero-stat-label">Departments</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">15</span>
              <span className="hero-stat-label">Operating Rooms</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">24</span>
              <span className="hero-stat-label">Specialties</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">
                9001<span className="hero-stat-mark">:2015</span>
              </span>
              <span className="hero-stat-label">ISO Certified</span>
            </div>
          </div>

          <div className="hero-trust reveal">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />
            <span>
              Certified by <strong>TÜV Rheinland</strong>
            </span>
          </div>
        </div>

        <a href="#about" className="hero-scroll" aria-label="Scroll to learn more">
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
