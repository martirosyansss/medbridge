import { Photo } from "@/components/Photo"

const FACTS = [
  "One of the leading multidisciplinary hospitals in Armenia",
  "More than 30 medical departments",
  "15 modern operating rooms",
  "ISO 9001:2015 certification (TÜV Rheinland)",
  "Modern MRI, CT, endoscopy, angiography",
  "Internationally trained physicians and surgeons",
  "High-volume surgical and clinical practice",
  "Advanced intensive care and emergency medicine",
  "24/7 medical services",
  "Multidisciplinary approach to patient care",
]

export function About() {
  return (
    <section id="about" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            01 — About
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Astghik Medical Center is one of the largest, most modern, and most technologically advanced multidisciplinary hospitals in Armenia.
            </h2>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-6 sm:grid-cols-12">
          <figure className="sm:col-span-7 aspect-[16/10] overflow-hidden rounded-sm ring-1 ring-ink/10 bg-bone-deep">
            <Photo
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&auto=format&fit=crop&q=78"
              srcSet="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop&q=72 900w, https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&auto=format&fit=crop&q=78 1600w"
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt="Modern multidisciplinary hospital exterior at dusk"
              className="h-full w-full object-cover"
              fallbackClass="photo-fallback-hospital"
              fallbackLabel="Hospital exterior"
            />
          </figure>
          <figure className="sm:col-span-5 grid grid-rows-2 gap-6">
            <div className="aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-ink/10 bg-bone-deep">
              <Photo
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1000&auto=format&fit=crop&q=75"
                srcSet="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&auto=format&fit=crop&q=72 600w, https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1000&auto=format&fit=crop&q=75 1000w"
                sizes="(min-width: 1024px) 30vw, 50vw"
                alt="Operating room equipped with modern surgical lights and monitors"
                className="h-full w-full object-cover"
                fallbackClass="photo-fallback-or"
                fallbackLabel="Operating room"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-ink/10 bg-bone-deep">
              <Photo
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=75"
                srcSet="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=72 600w, https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=75 1000w"
                sizes="(min-width: 1024px) 30vw, 50vw"
                alt="Modern MRI scanner inside a diagnostic imaging suite"
                className="h-full w-full object-cover"
                fallbackClass="photo-fallback-tech"
                fallbackLabel="Diagnostic imaging"
              />
            </div>
          </figure>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7 space-y-6 text-lg leading-relaxed text-ink/80">
            <p>
              Built according to European healthcare standards, Astghik is recognised for its modern infrastructure, advanced medical technologies, and internationally trained specialists. The center includes more than thirty specialised departments and fifteen state-of-the-art operating rooms equipped to international standards.
            </p>
            <p>
              Astghik actively collaborates with leading clinics and specialists from Europe, Russia, and the United States — allowing physicians to continuously exchange experience, participate in international trainings, and stay updated with the latest medical innovations and surgical techniques.
            </p>
            <p>
              The center is internationally certified under <strong className="font-medium text-ink">ISO 9001:2015</strong> quality management standards by <strong className="font-medium text-ink">TÜV Rheinland</strong>, reflecting its commitment to patient safety, healthcare quality, and clinical excellence.
            </p>
          </div>

          <aside className="reveal lg:col-span-5">
            <div className="rounded-sm border border-ink/10 bg-paper p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-ink/55">Key Facts</p>
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
