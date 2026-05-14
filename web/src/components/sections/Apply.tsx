import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { SPECIALTIES } from "@/data/specialties"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME"

type FormState = {
  firstName: string
  lastName: string
  email: string
  country: string
  phone: string
  educationLevel: string
  preferredSpecialty: string
  duration: string
  preferredStart: string
  message: string
  consent: boolean
  _gotcha: string
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: "",
  educationLevel: "",
  preferredSpecialty: "",
  duration: "",
  preferredStart: "",
  message: "",
  consent: false,
  _gotcha: "",
}

const REQUIRED: (keyof FormState)[] = [
  "firstName",
  "lastName",
  "email",
  "educationLevel",
  "preferredSpecialty",
  "duration",
  "consent",
]

const EDUCATION_OPTIONS = [
  "Pre-med student",
  "Medical student — Years 1–3",
  "Medical student — Years 4–6",
  "Resident",
  "Young physician",
  "Healthcare trainee (other)",
]

const DURATION_OPTIONS = ["1 week", "2 weeks", "3 weeks", "Longer (please specify)"]

const SPECIALTY_OPTIONS = [...SPECIALTIES.map((s) => s.name), "Open to suggestions"]

export function Apply() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [invalid, setInvalid] = useState<Set<keyof FormState>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (invalid.has(key)) {
      setInvalid((s) => {
        const n = new Set(s)
        n.delete(key)
        return n
      })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form._gotcha) return // honeypot

    const bad = new Set<keyof FormState>()
    REQUIRED.forEach((k) => {
      const v = form[k]
      if (typeof v === "boolean" ? !v : !String(v).trim()) bad.add(k)
    })
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) bad.add("email")

    if (bad.size) {
      setInvalid(bad)
      setError("Please fill in the highlighted fields before submitting.")
      return
    }

    setSubmitting(true)
    try {
      const usingPlaceholder = FORMSPREE_ENDPOINT.includes("REPLACE_ME")
      if (usingPlaceholder) {
        await new Promise((r) => setTimeout(r, 600))
      } else {
        const data = new FormData()
        Object.entries(form).forEach(([k, v]) => {
          if (k !== "_gotcha") data.append(k, String(v))
        })
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        })
        if (!res.ok) throw new Error("Form service returned an error.")
      }
      setSuccess(true)
      setTimeout(() => {
        document.getElementById("form-success")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 50)
    } catch (err) {
      console.error(err)
      setError("Sorry — we couldn't submit your application. Please try again, or email hello@medbridge.am.")
    } finally {
      setSubmitting(false)
    }
  }

  const ariaInvalid = (k: keyof FormState) => (invalid.has(k) ? "true" : "false")

  return (
    <section id="apply" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="kicker text-claret">
              <span className="kicker-mark" />
              08 — Apply
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Tell us about you.<br />We'll design the rotation.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75 max-w-prose2">
              Your application is reviewed personally by the MedBridge team. You'll hear back within{" "}
              <strong className="font-medium text-ink">two business days</strong> with availability, an all-inclusive quote, and the next steps.
            </p>

            <ul className="mt-8 space-y-3 text-[0.97rem] text-ink/80">
              {[
                "Review by a real human, within 48 hours",
                "Personalised quote: programme + accommodation + transfers",
                "No commitment — no card required to apply",
                "Programme begins every Saturday, year-round",
              ].map((f) => (
                <li key={f} className="fact">
                  <span className="dot" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm border border-ink/10 bg-paper p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/55">Prefer to talk first?</p>
              <p className="mt-3 text-ink/80">
                Email <a className="link" href="mailto:hello@medbridge.am">hello@medbridge.am</a>
                <br />
                or write us on WhatsApp.
              </p>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="rounded-sm border border-ink/15 bg-paper p-6 sm:p-10 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="f-first">First name *</label>
                  <input
                    id="f-first"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    aria-invalid={ariaInvalid("firstName")}
                    disabled={success}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-last">Last name *</label>
                  <input
                    id="f-last"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    aria-invalid={ariaInvalid("lastName")}
                    disabled={success}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email *</label>
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={ariaInvalid("email")}
                    disabled={success}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-country">Country</label>
                  <input
                    id="f-country"
                    type="text"
                    autoComplete="country-name"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    disabled={success}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone / WhatsApp</label>
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    disabled={success}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-education">Education level *</label>
                  <select
                    id="f-education"
                    value={form.educationLevel}
                    onChange={(e) => set("educationLevel", e.target.value)}
                    aria-invalid={ariaInvalid("educationLevel")}
                    disabled={success}
                  >
                    <option value="">Select one…</option>
                    {EDUCATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-specialty">Preferred specialty *</label>
                  <select
                    id="f-specialty"
                    value={form.preferredSpecialty}
                    onChange={(e) => set("preferredSpecialty", e.target.value)}
                    aria-invalid={ariaInvalid("preferredSpecialty")}
                    disabled={success}
                  >
                    <option value="">Select one…</option>
                    {SPECIALTY_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-duration">Programme length *</label>
                  <select
                    id="f-duration"
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    aria-invalid={ariaInvalid("duration")}
                    disabled={success}
                  >
                    <option value="">Select one…</option>
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="f-start">Preferred start date</label>
                  <input
                    id="f-start"
                    type="date"
                    value={form.preferredStart}
                    onChange={(e) => set("preferredStart", e.target.value)}
                    disabled={success}
                  />
                  <p className="hint">Programmes begin on Saturdays.</p>
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="f-message">Anything we should know?</label>
                  <textarea
                    id="f-message"
                    rows={4}
                    placeholder="Specific surgeries you'd like to observe, prior shadowing experience, dietary needs, accommodation preferences…"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    disabled={success}
                  />
                </div>
                <div className="sm:col-span-2 flex items-start gap-3">
                  <input
                    id="f-consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-ink/30 text-claret focus:ring-claret"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={ariaInvalid("consent")}
                    disabled={success}
                  />
                  <label htmlFor="f-consent" className="text-sm text-ink/75">
                    I agree that MedBridge may use the information above to contact me about my application. *
                  </label>
                </div>
              </div>

              <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                value={form._gotcha}
                onChange={(e) => set("_gotcha", e.target.value)}
              />

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={submitting || success} className="btn-primary btn-lg">
                  {submitting ? "Sending…" : "Submit application"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="text-xs text-ink/55">We'll reply within 2 business days.</p>
              </div>

              {error && (
                <div role="alert" className="mt-6 rounded-sm border border-claret/40 bg-claret/5 px-4 py-3 text-sm text-claret-deep">
                  {error}
                </div>
              )}
              {success && (
                <div id="form-success" className="mt-8 rounded-sm border border-sage/40 bg-sage/5 p-6">
                  <p className="font-display text-xl text-sage">Application received. Thank you.</p>
                  <p className="mt-2 text-ink/75">
                    A member of the MedBridge team will be in touch within two business days with availability and a personalised quote. Check your inbox (and spam folder, just in case).
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
