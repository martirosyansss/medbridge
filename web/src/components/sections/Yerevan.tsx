import { ArrowRight } from "lucide-react"
import { Photo } from "@/components/Photo"
import garniTemple from "@/assets/yerevan/garni-temple.jpg"
import garniTempleWebp from "@/assets/yerevan/garni-temple.webp"
import republicSquare from "@/assets/yerevan/republic-square.jpg"
import republicSquareWebp from "@/assets/yerevan/republic-square.webp"
import lakeSevan from "@/assets/yerevan/lake-sevan.jpg"
import lakeSevanWebp from "@/assets/yerevan/lake-sevan.webp"
import cascade from "@/assets/yerevan/cascade.jpg"
import cascadeWebp from "@/assets/yerevan/cascade.webp"

const CARDS = [
  { kicker: "Geography", title: "The Caucasus crossroads", body: "Between Europe and Asia, in sight of Mount Ararat. Direct flights from Vienna, Paris, Frankfurt, Doha and Dubai, and one-stop connections from most major hubs." },
  { kicker: "Visa", title: "Easy entry", body: "Visa-free entry for citizens of the EU, UK, US, Canada, Australia and many other countries for up to 180 days in any 365-day period. We issue invitation letters where a visa is required." },
  { kicker: "Cost of Living", title: "Roughly a quarter of Paris", body: "A meal at a good restaurant: $10–15. A coffee: $2. Monthly transit: under $25. Your budget goes a lot further." },
  { kicker: "Language", title: "English inside the hospital", body: "The program is conducted in English, which is the working language for international participants at Astghik. In central Yerevan, English is widely understood among younger residents." },
]

const MINI_PHOTOS = [
  {
    src: garniTemple,
    webp: garniTempleWebp,
    width: 1200,
    height: 870,
    alt: "Garni Pagan Temple, first-century Hellenistic temple east of Yerevan",
    caption: "Garni Temple",
    fallback: "photo-fallback-garni",
  },
  {
    src: republicSquare,
    webp: republicSquareWebp,
    width: 1200,
    height: 547,
    alt: "Republic Square in central Yerevan with tufa-stone civic architecture",
    caption: "Republic Square",
    fallback: "photo-fallback-soft",
  },
  {
    src: lakeSevan,
    webp: lakeSevanWebp,
    width: 1200,
    height: 800,
    alt: "Sevanavank monastery overlooking Lake Sevan, Armenia's high-altitude alpine lake",
    caption: "Lake Sevan",
    fallback: "photo-fallback-sevan",
  },
]

export function Yerevan() {
  return (
    <section id="yerevan" className="bg-paper py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            Yerevan
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              One of the world's oldest continuously inhabited cities, founded in 782 BC. Now one of the most rewarding places to begin a medical career.
            </h2>
          </div>
        </header>

        <div className="mt-14 grid gap-8 lg:gap-10 lg:grid-cols-12">
          <figure className="reveal lg:col-span-5 row-span-2">
            <div className="aspect-[3/4] sm:aspect-[16/9] lg:aspect-[4/5] overflow-hidden rounded-2xl bg-bone-deep ring-1 ring-ink/10">
              <Photo
                src={cascade}
                webp={cascadeWebp}
                width={1200}
                height={799}
                alt="The Cascade complex in central Yerevan, Armenia"
                className="h-full w-full object-cover"
                fallbackClass="photo-fallback-yerevan"
              />
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-ink/65">Yerevan · The Cascade complex</figcaption>
          </figure>

          <div className="reveal lg:col-span-7 grid gap-4 sm:gap-6 sm:grid-cols-2 self-start">
            {CARDS.map((c) => (
              <div key={c.kicker} className="yerevan-card">
                <p className="kicker-sm text-sage">{c.kicker}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-ink/75 text-[0.97rem] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="reveal lg:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-ink/80">
              Yerevan is a city of cafés, mountain views, late-night promenades and a long history compressed into a walkable downtown. Between rotations, our participants visit Garni Temple, Geghard Monastery, the Areni wine region and Lake Sevan, all within a two-hour drive.
            </p>
            <a href="#program" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-claret hover:text-claret-deep">
              See the weekly program
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="reveal mt-14 grid grid-cols-3 gap-3 sm:gap-4">
          {MINI_PHOTOS.map((p) => (
            <figure key={p.caption} className="mini-photo">
              <div className="mini-photo-frame">
                <Photo
                  src={p.src}
                  webp={p.webp}
                  width={p.width}
                  height={p.height}
                  alt={p.alt}
                  className="h-full w-full object-cover"
                  fallbackClass={p.fallback}
                />
              </div>
              <figcaption className="mini-photo-caption">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
