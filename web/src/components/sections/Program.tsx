export function Program() {
  return (
    <section id="program" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            04 — Programme
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              One, two, or three weeks at the bedside.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Programmes begin every Saturday. Choose your length, choose your focus specialty, and arrive ready. Longer durations available on request.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          <article className="program-card">
            <span className="program-num">01</span>
            <h3 className="font-display text-2xl">Duration</h3>
            <ul className="mt-5 space-y-2.5 text-ink/85">
              {[1, 2, 3].map((n) => (
                <li key={n} className="dur-row">
                  <span className="font-display text-3xl text-claret leading-none">{n}</span>
                  <span>{n === 1 ? "week" : "weeks"}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink/55">Longer durations on request.</p>
          </article>

          <article className="program-card">
            <span className="program-num">02</span>
            <h3 className="font-display text-2xl">Arrival</h3>
            <p className="mt-5 text-ink/80 text-[0.97rem]">
              All participants arrive on <strong className="font-medium text-ink">Saturday</strong>, with the programme beginning the following Monday.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink/70">
              <li className="check-row">Airport transfer included</li>
              <li className="check-row">Sunday orientation walk</li>
              <li className="check-row">Hospital induction Monday AM</li>
            </ul>
          </article>

          <article className="program-card">
            <span className="program-num">03</span>
            <h3 className="font-display text-2xl">Eligibility</h3>
            <ul className="mt-5 space-y-2 text-sm text-ink/70">
              <li className="check-row">Medical students, years 1–6</li>
              <li className="check-row">Pre-med students (observational programmes)</li>
              <li className="check-row">International healthcare trainees</li>
              <li className="check-row">Young physicians and residents</li>
            </ul>
            <p className="mt-5 text-xs text-ink/55">
              Advanced students may be eligible for supervised hands-on exposure depending on specialty, experience, and hospital approval.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
