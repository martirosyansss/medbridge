import { Home, Plane, Compass, Music } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Home,    title: "Accommodation",        body: "Boutique hotels and serviced apartments within 10–20 minutes of the hospital, arranged for you." },
  { icon: Plane,   title: "Airport transfer",     body: "Pickup on arrival at Zvartnots International, drop-off on departure — both included." },
  { icon: Compass, title: "Tours across Armenia", body: "Optional weekend excursions: Garni, Geghard, Lake Sevan, Areni wine region, Dilijan." },
  { icon: Music,   title: "Cultural activities",  body: "Curated dinners, music evenings and meet-ups with local medical students and residents." },
]

export function Services() {
  return (
    <section id="services" className="bg-paper py-section-tight">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            08 — Beyond the Hospital
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.05] tracking-tightest">
              Everything around the rotation, handled.
            </h2>
          </div>
        </header>

        <div className="reveal mt-12 grid gap-px overflow-hidden rounded-sm bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="service-card">
              <Icon className="service-icon" strokeWidth={1.4} />
              <h3 className="service-title">{title}</h3>
              <p className="service-text">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
