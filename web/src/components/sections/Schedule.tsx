const DAYS = [
  {
    label: "Mon",
    title: "Induction & first ORs",
    items: ["Hospital orientation", "OR protocols & sterile field", "2–3 surgical observations", "Post-op debrief"],
  },
  {
    label: "Tue",
    title: "Operating theatre",
    items: ["Up to 5 surgical observations", "Detailed surgeon commentary", "Anaesthesiology overview", "Patient case-file review"],
  },
  {
    label: "Wed",
    title: "Ward rounds & clinic",
    items: ["Morning attending rounds", "Post-operative patient care", "Outpatient clinic shadowing", "Imaging & diagnostics"],
  },
  {
    label: "Thu",
    title: "Specialty focus",
    items: ["Deep-dive in chosen specialty", "Up to 5 surgical observations", "One-on-one with surgeon", "Procedural workshop"],
  },
  {
    label: "Fri",
    title: "Multidisciplinary day",
    items: ["Cross-specialty observations", "Tumour board / case conference", "Programme reflection", "Certificate of completion"],
  },
]

export function Schedule() {
  return (
    <section id="schedule" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            05 — Sample Week
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              A week at Astghik, hour by hour.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              A representative Monday-to-Friday rotation. Actual case mix varies with department and weekly surgical schedule.
            </p>
          </div>
        </header>

        <ol className="reveal mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 ring-1 ring-ink/10 md:grid-cols-5">
          {DAYS.map((d) => (
            <li key={d.label} className="day-card">
              <p className="day-label">{d.label}</p>
              <h3 className="day-title">{d.title}</h3>
              <ul className="day-list">
                {d.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="reveal mt-12 rounded-sm border border-sage/30 bg-sage/5 p-8 lg:p-10">
          <p className="kicker-sm text-sage">
            <span className="kicker-mark" />
            For Advanced Students
          </p>
          <h3 className="mt-3 font-display text-2xl lg:text-3xl tracking-tightest">Selected surgical hands-on exposure</h3>
          <p className="mt-4 max-w-3xl text-ink/80 leading-relaxed">
            Advanced medical students may be eligible for supervised hands-on clinical exposure in selected surgeries and clinical activities — including assisting during selected procedures where permitted, and direct interaction with surgeons and medical teams. Eligibility depends on academic level, specialty, hospital approval, and local regulations.
          </p>
        </div>
      </div>
    </section>
  )
}
