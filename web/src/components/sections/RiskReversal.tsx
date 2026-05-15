import { ShieldCheck, RotateCcw, CalendarX, Stamp, Umbrella } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const GUARANTEES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Full refund 30+ days out",
    body: "Cancel with at least thirty days' notice and we return the full programme fee — no questions, no fine print.",
  },
  {
    icon: RotateCcw,
    title: "50% refund 14–30 days out",
    body: "Plans change. Cancel between fourteen and thirty days before your start date and we refund half of the programme fee.",
  },
  {
    icon: CalendarX,
    title: "Free reschedule, once",
    body: "Move your start date once at no charge, subject to availability, when you let us know at least fourteen days ahead.",
  },
  {
    icon: Stamp,
    title: "Visa denied? Full refund.",
    body: "If your Armenian visa application is refused, send us the official decision and we refund the full programme fee.",
  },
  {
    icon: Umbrella,
    title: "Insurance: required, advised",
    body: "Comprehensive travel and medical insurance is required for participation. We're glad to recommend trusted brokers used by past participants.",
  },
]

export function RiskReversal() {
  return (
    <section id="guarantees" className="bg-paper py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-sage lg:col-span-3">
            <span className="kicker-mark" />
            Guarantees
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Booking abroad feels risky.<br />We make sure it isn't.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              A clear, written set of guarantees on refunds, rescheduling and visa contingencies — so the only thing left to decide is the rotation.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.map(({ icon: Icon, title, body }) => (
            <article key={title} className="bg-paper p-7">
              <Icon className="h-7 w-7 text-claret" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-xl tracking-tightest text-ink">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{body}</p>
            </article>
          ))}
        </div>

        <p className="reveal mt-6 text-xs text-ink/65">
          Full details are spelled out in your acceptance email and the programme agreement. See our{" "}
          <a className="link underline" href="/terms.html" target="_blank" rel="noopener noreferrer">terms of service</a> for the complete refund and cancellation policy.
        </p>
      </div>
    </section>
  )
}
