import { Quote } from "lucide-react"

// TODO: replace these placeholder testimonials with real participant quotes,
// names, photos, and outcomes (residency match, medical school admission, etc.).
const TESTIMONIALS = [
  {
    quote:
      "I observed forty-one surgeries in two weeks — more than I'd seen in two years of medical school. My residency interviewers wanted to hear about MedBridge before anything else on my CV.",
    name: "Sofia M.",
    role: "5th-year medical student",
    detail: "University of Bologna · Cardiac surgery rotation",
    initials: "SM",
  },
  {
    quote:
      "The hands-on time was real. I scrubbed in on a laparoscopic cholecystectomy on day three. Nothing in Germany would have given me that as a 4th-year.",
    name: "Daniel K.",
    role: "4th-year medical student",
    detail: "Charité Berlin · General surgery rotation",
    initials: "DK",
  },
  {
    quote:
      "Yerevan surprised me. Mornings in scrubs, evenings in cafés. The program team handled everything — airport, apartment, even the SIM card. I just had to show up and learn.",
    name: "Aiyana R.",
    role: "Pre-med student",
    detail: "Columbia University · Multi-specialty rotation",
    initials: "AR",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            Voices
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              "It made my residency application."
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Past participants on what MedBridge changed for them — clinically, academically, and personally.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="relative flex flex-col rounded-sm border border-ink/10 bg-bone p-7">
              <Quote className="h-7 w-7 text-claret/30" strokeWidth={1.5} />
              <blockquote className="mt-4 grow text-[0.97rem] leading-relaxed text-ink/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-claret/10 font-display text-sm text-claret">
                  {t.initials}
                </span>
                <div>
                  <p className="font-display text-base text-ink leading-tight">{t.name}</p>
                  <p className="mt-0.5 text-xs text-ink/60">{t.role}</p>
                  <p className="mt-0.5 text-xs text-ink/55">{t.detail}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reveal mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-sm border border-ink/10 bg-bone px-6 py-5 text-center">
            <p className="font-display text-3xl text-claret">450+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/55">Alumni since 2022</p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-bone px-6 py-5 text-center">
            <p className="font-display text-3xl text-claret">38</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/55">Countries represented</p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-bone px-6 py-5 text-center">
            <p className="font-display text-3xl text-claret">4.9 / 5</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/55">Average participant rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
