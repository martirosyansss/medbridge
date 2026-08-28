import { Check } from "lucide-react"

const TIERS = [
  {
    name: "1 week",
    duration: "1 week",
    price: 1500,
    tagline: "Foundational rotation with full clinical exposure",
    perks: [
      "Up to 40 hours of clinical shadowing per week",
      "24 medical specialties",
      "Up to 5 surgeries observed per week",
      "Clinical rounds & hospital experience",
      "Accommodation near the hospital",
      "Airport transfers",
      "Medical screening on arrival",
      "Cultural excursions around Armenia",
      "Armenian cuisine & authentic culinary experiences",
      "Certificate of Completion",
      "Recommendation letter from supervising doctors",
      "Visa assistance",
    ],
  },
  {
    name: "2 weeks",
    duration: "2 weeks",
    price: 3800,
    featured: true,
    tagline: "Extended rotation with deeper case-mix exposure",
    perks: [
      "Everything in the 1-week programme",
      "Full-day excursions on Saturday and Sunday",
      "Armenian cuisine dinners on Saturday and Sunday",
    ],
  },
  {
    name: "3 weeks",
    duration: "3 weeks",
    price: 4500,
    tagline: "Full rotation for advanced students and residents",
    perks: [
      "Everything in the 2-week programme",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-bone py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            Pricing
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Programme pricing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Choose a length. Your personalised quote — locked in for 14 days — arrives within 48 hours of application.
              No card required to apply.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={`relative rounded-3xl border bg-paper p-6 md:p-6 lg:p-8 transition ${
                t.featured ? "border-claret/50 shadow-2xl shadow-claret/15 ring-1 ring-claret/20" : "border-ink/8 shadow-[0_18px_44px_-32px_rgba(14,23,38,0.28)]"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-claret px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white shadow-md shadow-claret/30">
                  Most popular
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.22em] text-ink/65">{t.duration}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{t.name}</h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-ink/65">from</span>
                <span className="text-4xl font-semibold tracking-tight text-ink">${t.price.toLocaleString()}</span>
                <span className="text-xs text-ink/65">USD</span>
              </p>
              <p className="mt-1 text-xs text-ink/65">per participant</p>
              <p className="mt-5 text-sm text-ink/70 leading-relaxed">{t.tagline}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink/75">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" strokeWidth={2} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#apply"
                className={`mt-8 block w-full rounded-full px-4 py-3 text-center text-sm font-medium transition ${
                  t.featured
                    ? "bg-claret text-white shadow-lg shadow-claret/25 hover:bg-claret-deep"
                    : "border border-ink/15 bg-white text-ink hover:border-ink/40"
                }`}
              >
                Request a quote
              </a>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Visa required?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Most passports are visa-free or e-visa for Armenia. We send an official invitation letter for visa applications when needed.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Is it refundable?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Full refund 30+ days out; 50% between 14–30 days; non-refundable within 14 days. Visa denial: full refund. <a className="link underline" href="#guarantees">See guarantees</a>.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Group discount?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Yes — 10% off for 3+ applicants applying together. Mention it in the application message.
            </p>
          </div>
        </div>
        <a href="#faq" className="reveal mt-4 inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">
          See full FAQ <span aria-hidden>→</span>
        </a>

        <p className="reveal mt-8 text-xs text-ink/65">
          Prices in USD, per participant. Your personalised quote is confirmed after application.
          Group discounts available for 3+ applicants. Additional services are available for an additional fee.
        </p>
      </div>
    </section>
  )
}
