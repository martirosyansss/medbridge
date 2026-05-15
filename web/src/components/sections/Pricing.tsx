import { Check } from "lucide-react"

const TIERS = [
  {
    name: "1 week",
    duration: "1 week",
    price: 2000,
    tagline: "Foundational rotation with full clinical exposure",
    perks: [
      "Observation of up to 5 surgeries",
      "Specialty deep-dive with one-on-one surgeon time",
      "Tumour board / case conference attendance",
      "Ward round and clinic shadowing",
      "OR protocols overview",
      "Supervised hands-on exposure on selected procedures*",
      "Direct mentorship from senior surgeon",
    ],
  },
  {
    name: "2 weeks",
    duration: "2 weeks",
    price: 3500,
    featured: true,
    tagline: "Extended rotation with deeper case-mix exposure",
    perks: [
      "Everything in the 1-week programme",
      "Extended specialty exposure",
      "Additional one-on-one mentorship hours",
    ],
  },
  {
    name: "3 weeks",
    duration: "3 weeks",
    price: 5000,
    tagline: "Full rotation for advanced students and residents",
    perks: [
      "Everything in the 2-week programme",
      "Broader multi-specialty case mix",
      "Maximum supervised hands-on opportunities*",
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
              className={`relative rounded-sm border bg-paper p-6 md:p-6 lg:p-8 transition ${
                t.featured ? "border-claret shadow-lg shadow-claret/10" : "border-ink/10"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center rounded-sm bg-claret px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone">
                  Most popular
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.22em] text-ink/65">{t.duration}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tightest text-ink">{t.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-medium text-ink">${t.price.toLocaleString()}</span>
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
                className={`mt-8 block w-full rounded-sm px-4 py-2.5 text-center text-sm font-medium transition ${
                  t.featured
                    ? "bg-claret text-bone hover:bg-claret-deep"
                    : "border border-ink/20 text-ink hover:border-ink"
                }`}
              >
                Request a quote
              </a>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-display text-base text-claret">Visa required?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Most passports are visa-free or e-visa for Armenia. We send an official invitation letter for visa applications when needed.
            </p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-display text-base text-claret">Is it refundable?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Full refund 30+ days out; 50% between 14–30 days; non-refundable within 14 days. Visa denial: full refund. <a className="link underline" href="#guarantees">See guarantees</a>.
            </p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-paper p-6">
            <p className="font-display text-base text-claret">Group discount?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Yes — 10% off for 3+ applicants applying together. Mention it in the application message.
            </p>
          </div>
        </div>
        <a href="#faq" className="reveal mt-4 inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">
          See full FAQ <span aria-hidden>→</span>
        </a>

        <p className="reveal mt-8 text-xs text-ink/65">
          *Supervised hands-on exposure depends on academic level, specialty, hospital approval and local regulations.
          Prices in USD. Group discounts available for 3+ applicants. Accommodation and additional services are available for an additional fee.
        </p>
      </div>
    </section>
  )
}
