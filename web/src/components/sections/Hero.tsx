import { useMemo, useRef } from "react"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { HOSPITAL, STATS } from "@/data/site"
import { useMounted } from "@/hooks/useMounted"
import { nextStartLabel } from "@/lib/dates"
import { useImageFailed } from "@/hooks/useImageFailed"
import heroJpg from "@/assets/astghik/hospital-exterior-1400.jpg"
import heroAvif900 from "@/assets/astghik/hospital-exterior-900.avif"
import heroAvif1400 from "@/assets/astghik/hospital-exterior-1400.avif"
import heroAvif2000 from "@/assets/astghik/hospital-exterior-2000.avif"
import heroWebp900 from "@/assets/astghik/hospital-exterior-900.webp"
import heroWebp1400 from "@/assets/astghik/hospital-exterior-1400.webp"
import heroWebp2000 from "@/assets/astghik/hospital-exterior-2000.webp"

export const HERO_AVIF_SRCSET = `${heroAvif900} 900w, ${heroAvif1400} 1400w, ${heroAvif2000} 2000w`
export const HERO_WEBP_SRCSET = `${heroWebp900} 900w, ${heroWebp1400} 1400w, ${heroWebp2000} 2000w`
export const HERO_SIZES = "100vw"

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgFailed, markImgFailed] = useImageFailed(imgRef)
  // Computed after mount so the prerendered HTML never carries a stale date.
  // Same helper as the Apply form, so the advertised start is always bookable.
  const mounted = useMounted()
  const nextStart = useMemo(() => (mounted ? nextStartLabel() : null), [mounted])

  return (
    <section id="top" className="hero-cinematic">
      <div className={`hero-bg ${imgFailed ? "hero-bg--fallback" : ""}`}>
        {!imgFailed && (
          <picture>
            <source type="image/avif" srcSet={HERO_AVIF_SRCSET} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
            <img
              ref={imgRef}
              src={heroJpg}
              width={1400}
              height={933}
              alt="Astghik Medical Center building in Yerevan with Armenian flag"
              className="hero-image"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={markImgFailed}
            />
          </picture>
        )}
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain-noise" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
      </div>

      <div className="hero-shell">
        <div className="hero-content hero-enter">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>Inside one of Armenia's largest surgical floors</span>
            <span className="hero-eyebrow-dot" aria-hidden="true">·</span>
            <span>Yerevan, Armenia</span>
            <span className="hero-eyebrow-line" />
          </div>

          <h1 className="hero-headline">
            Medical shadowing in Armenia,
            <br />
            inside one <em>JCI-accredited hospital</em>.
          </h1>

          <p className="hero-subline">
            MedBridge is an international medical shadowing and observership program at{" "}
            <span className="hero-subline-strong">{HOSPITAL.name} in Yerevan, Armenia</span>, a JCI-accredited and ISO 9001:2015
            certified hospital. Choose one of {STATS.specialties} specialties, observe up to {STATS.surgeriesPerDayMax} surgeries a
            day across {STATS.operatingRooms} operating rooms, and train in English alongside pre-med students, medical students,
            residents and young physicians from around the world.
          </p>

          <div className="hero-ctas">
            <a href="#apply" className="btn-hero-primary">
              Apply for a Program
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#specialties" className="btn-hero-ghost">
              Explore {STATS.specialties} Specialties
            </a>
          </div>

          <p className="hero-scarcity">
            <span className="hero-pulse" aria-hidden="true">
              <span className="hero-pulse-ring" />
              <span className="hero-pulse-dot" />
            </span>
            {nextStart ? `Earliest start: ${nextStart} · ` : ""}Rolling intake, every Saturday, year-round
          </p>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-stats hero-enter hero-enter--late">
            <div className="hero-stat">
              <span className="hero-stat-num">
                {STATS.departments}<span className="hero-stat-mark">+</span>
              </span>
              <span className="hero-stat-label">Departments</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">{STATS.operatingRooms}</span>
              <span className="hero-stat-label">Operating Rooms</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">{STATS.specialties}</span>
              <span className="hero-stat-label">Specialties</span>
            </div>
            <span className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">
                {STATS.surgeriesPerDayMax}<span className="hero-stat-mark">/day</span>
              </span>
              <span className="hero-stat-label">Surgeries Observed, up to</span>
            </div>
          </div>

          <div className="hero-trust hero-enter hero-enter--late">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />
            <span>
              <strong>JCI-accredited</strong> · ISO 9001:2015 by <strong>TÜV Rheinland</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
