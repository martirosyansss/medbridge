import { Check, Minus } from "lucide-react"
import { NOT_INCLUDED, PROGRAM, REFUND, TIERS } from "@/data/site"

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
              Program pricing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Choose a length. Your itemised quote, locked in for {PROGRAM.quoteValidityDays} days, arrives within {PROGRAM.responseTime} of application.
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
              <p className="text-xs uppercase tracking-[0.22em] text-ink/65">{t.weeks === 1 ? "1 week" : `${t.weeks} weeks`}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{t.name}</h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-ink/65">from</span>
                <span className="text-4xl font-semibold tracking-tight text-ink">${t.price.toLocaleString("en-US")}</span>
                <span className="text-xs text-ink/65">USD</span>
              </p>
              <p className="mt-1 text-xs text-ink/65">
                per participant · about ${Math.round(t.price / t.weeks).toLocaleString("en-US")} per week
              </p>
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

        <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Not included</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/75">
              {NOT_INCLUDED.map((n) => (
                <li key={n} className="flex items-start gap-2">
                  <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/40" strokeWidth={2} />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Visa required?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Most passports are visa-free or e-visa for Armenia. We send an official invitation letter for visa applications when needed.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Is it refundable?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Full refund {REFUND.fullRefundDays}+ days out; 50% between {REFUND.halfRefundFrom}–{REFUND.halfRefundTo} days; non-refundable within {REFUND.halfRefundFrom} days. Visa denial: full refund. <a className="link underline" href="#guarantees">See guarantees</a>.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-base font-semibold text-claret">Group discount?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Yes: {PROGRAM.groupDiscount.percent}% off for {PROGRAM.groupDiscount.minApplicants}+ applicants applying together. Mention it in the application message.
            </p>
          </div>
        </div>
        <a href="#faq" className="reveal mt-4 inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">
          See full FAQ <span aria-hidden>→</span>
        </a>

        <p className="reveal mt-8 text-xs text-ink/65">
          Prices in USD, per participant, payable by bank transfer. Your itemised quote is confirmed after application.
          Group discounts available for {PROGRAM.groupDiscount.minApplicants}+ applicants. Additional services are available for an additional fee.
        </p>
      </div>
    </section>
  )
}
