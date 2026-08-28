import { FileCheck2, ShieldPlus, Microscope, Syringe, ScanLine, FlaskConical, TestTubes } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type TestItem = {
  icon: LucideIcon
  name: string
  detail: string
}

const TESTS: TestItem[] = [
  {
    icon: ShieldPlus,
    name: "HIV 1/2 Antigen/Antibody",
    detail: "4th-generation combined antigen/antibody screen.",
  },
  {
    icon: Microscope,
    name: "Hepatitis B Surface Antigen (HBsAg)",
    detail: "Active hepatitis B infection screen.",
  },
  {
    icon: Syringe,
    name: "Hepatitis B Surface Antibody (Anti-HBs)",
    detail: "Immunity titre — ≥10 mIU/mL required.",
  },
  {
    icon: ScanLine,
    name: "Hepatitis B Core Antibody (Anti-HBc Total)",
    detail: "Past or current hepatitis B exposure.",
  },
  {
    icon: FlaskConical,
    name: "Hepatitis C Antibody (Anti-HCV)",
    detail: "Hepatitis C virus exposure screen.",
  },
  {
    icon: TestTubes,
    name: "Syphilis Screening",
    detail: "RPR or VDRL, with TPHA / FTA-ABS confirmation where indicated.",
  },
]

export function Screening() {
  return (
    <section id="screening" className="bg-bone-deep py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-sage lg:col-span-3">
            <span className="kicker-mark" />
            05 — Health Screening
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Required health documentation, before you arrive.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              In line with hospital policy and international patient-safety standards, every participant must submit the following laboratory results <strong className="font-medium text-ink">before the programme begins</strong>. Results are reviewed confidentially by the medical office and are not shared outside the admissions process.
            </p>
          </div>
        </header>

        <div className="reveal mt-14 grid gap-8 lg:grid-cols-12">
          <ul className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
            {TESTS.map(({ icon: Icon, name, detail }) => (
              <li key={name} className="card card-hover p-6 sm:p-7">
                <span className="icon-tile"><Icon strokeWidth={1.7} /></span>
                <h3 className="mt-5 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{detail}</p>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-4 rounded-2xl border border-sage/25 bg-sage/5 p-6 sm:p-8">
            <p className="kicker-sm text-sage">
              <span className="kicker-mark" />
              Submission
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">How to submit</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem] text-ink/80">
              <li className="flex gap-3">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-claret" strokeWidth={1.6} />
                <span>Results dated <strong className="font-medium text-ink">within the last 6 months</strong>, in English or with certified translation.</span>
              </li>
              <li className="flex gap-3">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-claret" strokeWidth={1.6} />
                <span>Issued by an accredited clinical laboratory, on official letterhead with stamp or signature.</span>
              </li>
              <li className="flex gap-3">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-claret" strokeWidth={1.6} />
                <span>Sent as PDF to the admissions team <strong className="font-medium text-ink">no later than 14 days before arrival</strong>.</span>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ink/65">
              Participants whose results indicate non-immunity to hepatitis B (Anti-HBs &lt; 10 mIU/mL) will be advised on next steps before the programme starts.
            </p>
          </aside>
        </div>

        <p className="reveal mt-6 text-xs text-ink/65">
          These requirements protect patients, hospital staff and you. They are non-negotiable and apply to all participants regardless of programme length or specialty.
        </p>
      </div>
    </section>
  )
}
