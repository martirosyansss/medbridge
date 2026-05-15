import { useMemo, useState } from "react"
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react"
import hospitalExterior from "@/assets/astghik/hospital-exterior.jpg"

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
            src={hospitalExterior}
            alt="Astghik Medical Center building in Yerevan with Armenian flag"
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
            MedBridge is an international medical shadowing program at{" "}
            <span className="hero-subline-strong">Astghik Medical Center in Yerevan, Armenia</span> —
            a JCI-accredited and ISO 9001:2015 certified hospital. The program offers exposure to 24 medical specialties, 15 operating rooms and real clinical practice in an English-speaking environment for pre-med students, medical students, residents and young physicians from around the world.
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
                5<span className="hero-stat-mark">/wk</span>
              </span>
              <span className="hero-stat-label">Surgeries Observed</span>
            </div>
          </div>

          <div className="hero-trust reveal">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />
            <span>
              <strong>JCI-accredited</strong> · ISO 9001:2015 by <strong>TÜV Rheinland</strong>
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
