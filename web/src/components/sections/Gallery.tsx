import { Photo } from "@/components/Photo"

type Tile = {
  src: string
  alt: string
  label: string
  caption: string
  fallback: string
  span?: "tall" | "wide" | "square"
}

const TILES: Tile[] = [
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1400&auto=format&fit=crop&q=72",
    alt: "Surgical team performing a procedure under operating-room lights",
    label: "Operating Theatre",
    caption: "Up to 5 procedures observed daily",
    fallback: "photo-fallback-or",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=72",
    alt: "Gloved surgeon hands holding precision instruments",
    label: "Precision",
    caption: "Hands-on exposure for advanced students",
    fallback: "photo-fallback-or",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1000&auto=format&fit=crop&q=72",
    alt: "MRI scanner in a modern diagnostic imaging suite",
    label: "Imaging",
    caption: "MRI · CT · angiography · ultrasound",
    fallback: "photo-fallback-tech",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&auto=format&fit=crop&q=72",
    alt: "International medical students gathered around a teaching table",
    label: "Clinical Rounds",
    caption: "Discussion after every observed case",
    fallback: "photo-fallback-students",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1000&auto=format&fit=crop&q=72",
    alt: "Senior surgeon explaining a procedure to a trainee",
    label: "Mentorship",
    caption: "One-on-one with attending surgeons",
    fallback: "photo-fallback-doctor",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=72",
    alt: "Modern hospital façade at dusk",
    label: "The Hospital",
    caption: "ISO 9001:2015 · TÜV Rheinland certified",
    fallback: "photo-fallback-hospital",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1589537368054-6a9c11ba1eac?w=1200&auto=format&fit=crop&q=72",
    alt: "Yerevan skyline with Mount Ararat in the distance",
    label: "Yerevan",
    caption: "Live where you learn",
    fallback: "photo-fallback-yerevan",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1602253020023-90f2a4ee0f1d?w=1000&auto=format&fit=crop&q=72",
    alt: "Garni Temple, a first-century Hellenistic monument near Yerevan",
    label: "Weekend",
    caption: "Garni · Geghard · Sevan · Areni",
    fallback: "photo-fallback-garni",
    span: "square",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            Glimpses
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              From the operating floor to <em className="italic font-light text-claret">Mount Ararat</em>.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              A week in MedBridge alternates between gowns and morning coffee, between sterile corridors and a city older than Rome.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 gallery-grid">
          {TILES.map((t) => (
            <figure
              key={t.label}
              className={`gallery-tile gallery-tile--${t.span ?? "square"}`}
            >
              <Photo
                src={t.src}
                alt={t.alt}
                className="gallery-img"
                fallbackClass={t.fallback}
              />
              <figcaption className="gallery-caption">
                <span className="gallery-label">{t.label}</span>
                <span className="gallery-sub">{t.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
