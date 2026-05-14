import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <section id="top" className="relative overflow-hidden bg-bone pt-32 lg:pt-36">
      <div className="hero-grain" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 reveal">
            <p className="kicker text-sage">
              <span className="kicker-mark" />
              International Medical Shadowing · Yerevan, Armenia
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.4rem,6.2vw,5.5rem)] leading-[0.98] tracking-tightest text-ink">
              Inside Armenia's<br />
              leading <em className="italic font-light text-claret">surgical floor</em>.
            </h1>

            <p className="mt-7 max-w-prose2 text-lg leading-relaxed text-ink/75">
              MedBridge is the international observership program at{" "}
              <span className="font-medium text-ink">Astghik Medical Center, Yerevan</span> — twenty-four specialties, fifteen operating rooms, ISO-certified, in English. Designed for medical students, pre-med students, residents, and young physicians from around the world.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#apply" className="btn-primary btn-lg">
                Apply for a Program
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#specialties" className="btn-secondary btn-lg">
                Explore 24 Specialties
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 border-t border-ink/15 pt-7">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">Departments</dt>
                <dd className="mt-1 font-display text-2xl font-medium">
                  30<span className="text-claret">+</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">Operating Rooms</dt>
                <dd className="mt-1 font-display text-2xl font-medium">15</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">Specialties</dt>
                <dd className="mt-1 font-display text-2xl font-medium">24</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">ISO Certified</dt>
                <dd className="mt-1 font-display text-2xl font-medium">
                  9001<span className="text-claret">:2015</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 reveal">
            <figure className={`relative aspect-[4/5] overflow-hidden rounded-sm bg-bone-deep shadow-2xl ring-1 ring-ink/10 ${imgFailed ? "photo-fallback" : ""}`}>
              {!imgFailed && (
                <img
                  src="https://images.unsplash.com/photo-1758206523711-f20bb01033a5?w=1200&auto=format&fit=crop&q=72"
                  alt="Surgeons during a procedure in a modern operating theatre"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => setImgFailed(true)}
                />
              )}
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-6 text-bone">
                <p className="font-display text-xl leading-snug">"Step into the operating theatre. Stay for the medicine."</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bone/75">Astghik Medical Center · Yerevan</p>
              </figcaption>
            </figure>
            <div className="mt-5 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-ink/55">
              <span className="h-px flex-1 bg-ink/15" />
              Certified by TÜV Rheinland
              <span className="h-px flex-1 bg-ink/15" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 lg:mt-28 border-t border-ink/10" />
    </section>
  )
}
