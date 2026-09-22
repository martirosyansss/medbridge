import { STATS, SURGERY_CLAIM } from "@/data/site"

const ROWS = [
  { label: "Setting", typical: "Rotating small clinics", mb: `**JCI-accredited** and **ISO 9001:2015 certified** multidisciplinary hospital with ${STATS.operatingRooms} ORs` },
  { label: "Daily exposure", typical: "Ward rounds and a surgery or two per week", mb: `**${SURGERY_CLAIM}**` },
  { label: "Specialty breadth", typical: "3–6 specialties", mb: `**${STATS.specialties} clinical specialties** under one roof` },
  { label: "Language", typical: "Often local language with translator", mb: "English-language program" },
  { label: "Hands-on access", typical: "Observation only", mb: "Supervised hands-on exposure for advanced students*" },
  { label: "Timing", typical: "Summer cohorts only", mb: "**Start any Saturday**, year-round" },
  { label: "Cost of living", typical: "Western Europe / US benchmarks", mb: "Yerevan: roughly 25–35% of Western Europe" },
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
    <section id="why" className="bg-ink py-section text-bone">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-gold lg:col-span-3">
            <span className="kicker-mark" />
            Why MedBridge
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              A rotation you can <em className="italic font-light text-gold">document</em>, not just describe.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">
              Most international shadowing programs move students across ward rounds at a network of small partner clinics.
              MedBridge is different: every rotation happens inside one hospital, a private, high-volume surgical center with
              the case mix of a regional referral hospital, and ends with a certificate and a letter from the physicians who
              supervised you.
            </p>
          </div>
        </header>

        {/* Desktop (≥1024): comparison table */}
        <div className="reveal mt-14 hidden lg:block overflow-hidden rounded-2xl ring-1 ring-bone/15 bg-bone/[0.03]">
          <table className="w-full text-left text-sm">
            <thead className="bg-bone/5 text-xs uppercase tracking-[0.18em] text-bone/60">
              <tr>
                <th className="px-6 py-4">&nbsp;</th>
                <th className="px-6 py-4">Typical shadowing abroad</th>
                <th className="px-6 py-4 bg-gold/25 text-bone">MedBridge at Astghik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10 text-bone/85">
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th className="px-6 py-5 text-left text-base font-semibold text-bone">{r.label}</th>
                  <td className="px-6 py-5">{r.typical}</td>
                  <td className="px-6 py-5 bg-gold/10 text-bone">{withBold(r.mb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet: stack as comparison cards */}
        <ul className="reveal mt-14 lg:hidden grid gap-4 sm:grid-cols-2">
          {ROWS.map((r) => (
            <li key={r.label} className="rounded-2xl border border-bone/15 bg-bone/[0.04] p-5">
              <p className="text-base font-semibold text-bone">{r.label}</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-bone/65">Typical abroad</p>
                  <p className="mt-1 text-sm text-bone/80">{r.typical}</p>
                </div>
                <div className="rounded-xl bg-gold/10 p-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-soft">MedBridge at Astghik</p>
                  <p className="mt-1 text-sm text-bone">{withBold(r.mb)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="reveal mt-4 text-xs text-bone/65">*Hands-on opportunities depend on academic level, specialty, hospital approval and local regulations.</p>
      </div>
    </section>
  )
}
