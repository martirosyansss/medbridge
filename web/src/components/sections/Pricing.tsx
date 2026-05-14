import { Check } from "lucide-react"

const INCLUSIONS = [
  "Clinical programme at Astghik Medical Center",
  "Accommodation (boutique hotel or apartment, 10–20 min from hospital)",
  "Airport transfers (arrival + departure)",
  "Hospital induction & sterile-field training",
  "Certificate of completion (signed by Astghik)",
  "24/7 in-country support",
]

const TIERS = [
  {
    name: "Observership",
    duration: "1 week",
    price: 1499,
    tagline: "Best for pre-med & 1st–3rd year students",
    perks: ["Observation of up to 25 surgeries", "Ward rounds & clinic shadowing", "OR protocols overview"],
  },
  {
    name: "Intensive",
    duration: "2 weeks",
    price: 2499,
    featured: true,
    tagline: "Best for 4th-year+ students & residents",
    perks: [
      "Everything in Observership",
      "Specialty deep-dive with one-on-one surgeon time",
      "Tumour board / case conference attendance",
    ],
  },
  {
    name: "Hands-on",
    duration: "3 weeks",
    price: 3299,
    tagline: "For advanced students eligible for supervised assistance",
    perks: [
      "Everything in Intensive",
      "Supervised hands-on exposure on selected procedures*",
      "Direct mentorship from senior surgeon",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            Investment
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              All-inclusive. Transparent. Less than a week of European tuition.
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
              className={`relative rounded-sm border bg-paper p-8 transition ${
                t.featured ? "border-claret shadow-lg shadow-claret/10" : "border-ink/10"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center rounded-sm bg-claret px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bone">
                  Most popular
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.22em] text-ink/55">{t.duration}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tightest text-ink">{t.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-xs text-ink/55">from</span>
                <span className="font-display text-4xl font-medium text-ink">${t.price.toLocaleString()}</span>
              </p>
              <p className="mt-1 text-xs text-ink/55">all-inclusive · per participant</p>
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

        <div className="reveal mt-12 grid gap-8 rounded-sm border border-ink/10 bg-paper p-8 lg:grid-cols-12 lg:p-10">
          <div className="lg:col-span-5">
            <p className="kicker-sm text-sage">
              <span className="kicker-mark" />
              What's always included
            </p>
            <p className="mt-3 font-display text-2xl tracking-tightest">No hidden fees.</p>
            <p className="mt-3 text-sm text-ink/70 leading-relaxed">
              A single transparent quote covers everything below. Optional weekend tours and cultural add-ons are listed
              separately in your acceptance email.
            </p>
          </div>
          <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2 text-sm text-ink/80">
            {INCLUSIONS.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-claret" strokeWidth={2} />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal mt-4 text-xs text-ink/55">
          *Supervised hands-on exposure depends on academic level, specialty, hospital approval, and local regulations.
          Prices in USD. Group discounts available for 3+ applicants.
        </p>
      </div>
    </section>
  )
}
