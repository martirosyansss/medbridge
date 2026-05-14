import { useState } from "react"
import { ArrowRight } from "lucide-react"

const CARDS = [
  { kicker: "Geography", title: "The Caucasus crossroads", body: "Between Europe and Asia, in sight of Mount Ararat. Daily direct flights from Vienna, Paris, Rome, Frankfurt, Athens, and Doha." },
  { kicker: "Visa", title: "Easy entry", body: "Visa-free entry for citizens of most EU, UK, US, and Schengen-area countries for stays up to 180 days." },
  { kicker: "Cost of Living", title: "Roughly a quarter of Paris", body: "A meal at a good restaurant: $10–15. A coffee: $2. Monthly transit: under $25. Your stipend stretches." },
  { kicker: "Language", title: "English everywhere", body: "The program is conducted in English. Most physicians, residents, and younger Yerevantsi speak English fluently." },
]

export function Yerevan() {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <section id="yerevan" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            03 — Yerevan
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              The oldest continuously inhabited capital in the world. Now one of the most exciting places to begin a medical career.
            </h2>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <figure className="reveal lg:col-span-5 row-span-2">
            <div className={`aspect-[4/5] overflow-hidden rounded-sm bg-bone-deep ring-1 ring-ink/10 ${imgFailed ? "photo-fallback-yerevan" : ""}`}>
              {!imgFailed && (
                <img
                  src="https://images.unsplash.com/photo-1589537368054-6a9c11ba1eac?w=1000&auto=format&fit=crop&q=70"
                  alt="The skyline of Yerevan, Armenia, with Mount Ararat in the distance"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                />
              )}
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-ink/55">Yerevan · view toward Mount Ararat</figcaption>
          </figure>

          <div className="reveal lg:col-span-7 grid gap-6 sm:grid-cols-2 self-start">
            {CARDS.map((c) => (
              <div key={c.kicker} className="yerevan-card">
                <p className="kicker-sm text-sage">{c.kicker}</p>
                <h3 className="mt-2 font-display text-xl">{c.title}</h3>
                <p className="mt-3 text-ink/75 text-[0.97rem] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="reveal lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink/80">
              Yerevan is a city of cafés, mountain views, late-night promenades, and a thousand-year history compressed into a walkable downtown. Between rotations, our participants visit Garni Temple, Geghard Monastery, the Areni wine region, and Lake Sevan — all within a two-hour drive.
            </p>
            <a href="#program" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-claret hover:text-claret-deep">
              See the weekly programme
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
