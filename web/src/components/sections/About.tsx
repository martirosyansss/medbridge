import { Photo } from "@/components/Photo"
import hospitalExterior from "@/assets/astghik/hospital-exterior.jpg"
import icuTeam from "@/assets/astghik/icu-team.jpg"
import lobbyReception from "@/assets/astghik/lobby-reception.jpg"

const FACTS = [
  "One of the leading multidisciplinary hospitals in Armenia",
  "More than 30 medical departments",
  "15 state-of-the-art operating rooms",
  "Joint Commission International (JCI) accredited",
  "ISO 9001:2015 certified by TÜV Rheinland",
  "Advanced MRI, CT, endoscopy and angiography technologies",
  "Internationally trained physicians and surgeons",
  "High-volume surgical and clinical practice",
  "Advanced intensive care and emergency medicine",
  "24/7 medical services",
  "Multidisciplinary approach to patient care",
]

export function About() {
  return (
    <section id="about" className="bg-bone py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            01 — About
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Astghik Medical Center is one of the largest, modern and technologically advanced multidisciplinary hospitals in Armenia.
            </h2>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-4 sm:gap-6 md:grid-cols-12">
          <figure className="md:col-span-7 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-ink/10 bg-bone-deep">
            <Photo
              src={hospitalExterior}
              alt="Astghik Medical Center building in Yerevan"
              className="h-full w-full object-cover"
              fallbackClass="photo-fallback-hospital"
              fallbackLabel="Astghik Medical Center"
            />
          </figure>
          <figure className="md:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-1 md:grid-rows-2">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink/10 bg-bone-deep">
              <Photo
                src={icuTeam}
                alt="Astghik clinical team inside an intensive care unit"
                className="h-full w-full object-cover"
                fallbackClass="photo-fallback-or"
                fallbackLabel="Clinical team"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink/10 bg-bone-deep">
              <Photo
                src={lobbyReception}
                alt="Modern reception and lobby area at Astghik Medical Center"
                className="h-full w-full object-cover"
                fallbackClass="photo-fallback-tech"
                fallbackLabel="Hospital interior"
              />
            </div>
          </figure>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7 space-y-6 text-lg leading-relaxed text-ink/80">
            <p>
              Built according to European healthcare standards, Astghik Medical Center is recognized for its modern infrastructure, advanced medical technologies and internationally trained specialists. The hospital includes more than thirty specialized departments and fifteen state-of-the-art operating rooms equipped to international standards.
            </p>
            <p>
              Astghik actively collaborates with leading clinics and specialists from Europe, Russia and the United States, supporting continuous medical education, international training and the exchange of advanced surgical techniques and innovations.
            </p>
            <p>
              The center is internationally accredited by <strong className="font-medium text-ink">Joint Commission International (JCI)</strong> and certified under <strong className="font-medium text-ink">ISO 9001:2015</strong> quality management standards by <strong className="font-medium text-ink">TÜV Rheinland</strong>, reflecting its commitment to patient safety, healthcare quality and clinical excellence.
            </p>
          </div>

          <aside className="reveal lg:col-span-5">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-ink/65">Key Facts</p>
              <ul className="mt-6 space-y-4 text-[0.97rem] text-ink/85">
                {FACTS.map((f) => (
                  <li key={f} className="fact">
                    <span className="dot" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <blockquote className="reveal mt-20 mx-auto max-w-3xl text-center">
          <p className="font-display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.18] tracking-tightest text-ink">
            "A multidisciplinary surgical center built to European standards — and opened to the international medical community."
          </p>
        </blockquote>
      </div>
    </section>
  )
}
