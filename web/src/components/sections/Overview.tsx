import { HOSPITAL, PROGRAM, REFUND, SCREENING, STATS, TIERS } from "@/data/site"

/**
 * Five self-contained passages (130–160 words each) that answer the questions
 * search engines and AI assistants get asked about this program. Each
 * paragraph restates its own subject so it can be quoted on its own.
 */
const PASSAGES: { id: string; title: string; body: string }[] = [
  {
    id: "what",
    title: "What MedBridge is",
    body: `MedBridge is an international medical shadowing and clinical observership program at ${HOSPITAL.name}, a JCI-accredited, ISO 9001:2015 certified multidisciplinary hospital in Yerevan, Armenia. It is not a degree program: participants keep their enrolment at their home university and join the hospital for one, two or three weeks of supervised clinical exposure. Every rotation takes place inside a single hospital with more than ${STATS.departments} departments and ${STATS.operatingRooms} operating rooms, rather than across a network of small partner clinics. Participants observe up to ${STATS.surgeriesPerDayMax} surgeries a day from Monday to Friday, join clinical rounds, take part in post-operative discussions and learn operating-room protocols in ${PROGRAM.language}. The program is run by MedBridge in partnership with the hospital, and on completion every participant receives a certificate signed by the hospital and a recommendation letter from the supervising physicians.`,
  },
  {
    id: "who",
    title: "Who it is for",
    body: `MedBridge accepts medical students in years one to six, pre-med students, international healthcare trainees, residents and young physicians from any country. Pre-med students are placed in observational programs only. Medical students in later years, residents and young physicians may additionally be considered for supervised hands-on exposure in selected surgeries and clinical activities, which depends on academic level, the chosen specialty, the hospital's approval and Armenian regulations, and is never guaranteed in advance. Participants must be 18 or older on the start date (16- and 17-year-olds may join observational programs only, with verifiable written parental consent), hold a valid passport and any visa required for Armenia, and carry comprehensive travel and medical insurance for the whole stay. Because the working language inside the hospital is ${PROGRAM.language}, no Armenian or Russian is needed. Applicants choose one of ${STATS.specialties} clinical specialties, from cardiac surgery and neurosurgery to obstetrics, ophthalmology and reproductive medicine, and can request a second specialty for longer stays.`,
  },
  {
    id: "week",
    title: "What a week looks like",
    body: `Every MedBridge rotation starts on a ${PROGRAM.arrivalDay}: participants arrive in Yerevan, are met at Zvartnots International Airport and transferred to accommodation near the hospital, with an orientation walk on Sunday. Clinical days run Monday to Friday, up to ${STATS.hoursPerWeekMax} hours a week. A typical day combines observation of up to ${STATS.surgeriesPerDayMax} surgeries in the operating rooms with detailed explanations from the surgeon, post-operative discussions, exposure to post-operative patient care, clinical rounds and direct interaction with physicians. Participants also see operating-room protocols and surgical workflow, and, depending on specialty, outpatient clinics, imaging and diagnostics. Advanced students may assist during selected procedures where the hospital permits it. Weekends include excursions to Garni, Geghard, Lake Sevan, the Areni wine region and Dilijan, all within about two hours of the city, with full-day trips on two- and three-week programs. The actual case mix varies with the department and the weekly surgical schedule.`,
  },
  {
    id: "cost",
    title: "What it costs and what is included",
    body: `MedBridge program fees start at $${TIERS[0].price.toLocaleString("en-US")} for one week, $${TIERS[1].price.toLocaleString("en-US")} for two weeks and $${TIERS[2].price.toLocaleString("en-US")} for three weeks, per participant, in US dollars. The fee includes the clinical program at ${HOSPITAL.name}, accommodation near the hospital, airport transfers, a pre-arrival health-screening review, cultural excursions, Armenian culinary experiences, a certificate of completion, a recommendation letter from supervising doctors, and visa assistance including an invitation letter where needed. It does not include flights, the mandatory travel and medical insurance, bank transfer fees or the laboratory tests required before arrival. Groups of ${PROGRAM.groupDiscount.minApplicants} or more applying together receive a ${PROGRAM.groupDiscount.percent}% discount. Applying is free and requires no card; after review, applicants receive an itemised quote that is valid for ${PROGRAM.quoteValidityDays} days. Cancellations ${REFUND.fullRefundDays} or more days before the start date are refunded in full, and a refused Armenian visa always qualifies for a full refund.`,
  },
  {
    id: "proof",
    title: "What you take home, and an honest note on admissions",
    body: `Every MedBridge participant who completes the rotation receives an official certificate of completion signed by ${HOSPITAL.name}, listing the rotation length, the specialties observed and the supervising physicians, together with a recommendation letter from those physicians. Participants log the procedures they observe, which makes the experience easy to document on an application or CV. An honest note: admissions committees, particularly in the United States, value supervised clinical exposure that you can describe specifically over generic travel. MedBridge is designed around that standard: one accredited hospital, a named specialty, a high-volume surgical schedule and written documentation from the physicians who supervised you. It complements, and does not replace, clinical experience in your home country. Before arrival, every participant submits laboratory results for HIV, hepatitis B and C and syphilis, dated within ${SCREENING.validityMonths} months and sent at least ${SCREENING.deadlineDaysBeforeArrival} days before the start date, in line with hospital policy and international patient-safety standards.`,
  },
]

export function Overview() {
  return (
    <section id="overview" className="bg-paper py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            The program in plain terms
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Five things to know before you apply.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Everything below is also spelled out in the sections that follow. This is the short, quotable version.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-8 lg:grid-cols-12">
          <nav aria-label="Overview topics" className="lg:col-span-3">
            <ol className="sticky top-28 space-y-2 text-sm text-ink/70">
              {PASSAGES.map((p, i) => (
                <li key={p.id}>
                  <a className="link" href={`#overview-${p.id}`}>
                    {String(i + 1).padStart(2, "0")} · {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lg:col-span-9 space-y-10">
            {PASSAGES.map((p) => (
              <article key={p.id} id={`overview-${p.id}`} className="scroll-mt-28">
                <h3 className="text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 max-w-[70ch] text-[1.02rem] leading-relaxed text-ink/80">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
