const ROWS = [
  { label: "Setting", typical: "Rotating small clinics", mb: "One ISO-certified multidisciplinary hospital, 15 ORs" },
  { label: "Daily exposure", typical: "Ward rounds and a surgery or two per week", mb: "Observation of up to **5 surgeries daily**, Mon–Fri" },
  { label: "Specialty breadth", typical: "3–6 specialties", mb: "**24 clinical specialties** under one roof" },
  { label: "Language", typical: "Often local language with translator", mb: "English-language program" },
  { label: "Hands-on access", typical: "Observation only", mb: "Supervised hands-on exposure for advanced students*" },
  { label: "Cost of living", typical: "Western Europe / US benchmarks", mb: "Yerevan: ~25–35% of Western Europe" },
]

function withBold(s: string) {
  // tiny inline-bold parser for **text**
  const parts = s.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-bone">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  )
}

export function Why() {
  return (
    <section id="why" className="bg-ink py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-gold lg:col-span-3">
            <span className="kicker-mark" />
            02 — Why MedBridge
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              A summer abroad you'll talk about in <em className="italic font-light text-gold">every</em> interview.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">
              Most international shadowing programs hop students across small ward rounds at a network of partner clinics. MedBridge is different: every rotation happens inside one hospital — a private, high-volume surgical center with the case mix of a regional referral hospital.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 overflow-hidden rounded-sm ring-1 ring-bone/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-bone/5 text-xs uppercase tracking-[0.18em] text-bone/60">
              <tr>
                <th className="px-6 py-4">&nbsp;</th>
                <th className="px-6 py-4">Typical shadowing abroad</th>
                <th className="px-6 py-4 bg-claret/30 text-bone">MedBridge at Astghik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10 text-bone/85">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th className="px-6 py-5 text-left font-display text-base font-medium text-bone">{r.label}</th>
                  <td className="px-6 py-5">{r.typical}</td>
                  <td className="px-6 py-5 bg-claret/10 text-bone">{withBold(r.mb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="reveal mt-4 text-xs text-bone/55">*Hands-on opportunities depend on academic level, specialty, hospital approval, and local regulations.</p>
      </div>
    </section>
  )
}
