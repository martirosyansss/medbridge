import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import { SPECIALTIES, CATEGORY_LABEL, type SpecialtyCategory } from "@/data/specialties"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  FORM_ENDPOINT,
  isFormEndpointConfigured,
} from "@/lib/contact"

const FALLBACK_EMAIL = CONTACT_EMAIL
const MESSAGE_MAX = 2000
const SUBMIT_TIMEOUT_MS = 12000

const COMMON_COUNTRIES = [
  "United States","United Kingdom","Canada","Germany","France","Italy","Spain","Netherlands","Belgium","Switzerland","Austria","Sweden","Norway","Denmark","Finland","Ireland","Portugal","Greece","Poland","Czech Republic","Hungary","Romania","Russia","Ukraine","Turkey","Georgia","Armenia","Israel","UAE","Saudi Arabia","Egypt","India","Pakistan","China","Japan","South Korea","Singapore","Australia","New Zealand","Brazil","Mexico","Argentina","Chile","South Africa","Nigeria","Kenya","Morocco","Tunisia","Lebanon","Jordan","Qatar","Kuwait",
]

const CATEGORY_ORDER: SpecialtyCategory[] = ["surgical", "cardio", "neuro", "womens", "diagnostic", "other"]

function localISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function nextSaturdays(n: number): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const days = (6 - d.getDay() + 7) % 7 || 7
  d.setDate(d.getDate() + days)
  const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  for (let i = 0; i < n; i++) {
    out.push({ iso: localISO(d), label: fmt.format(d) })
    d.setDate(d.getDate() + 7)
  }
  return out
}

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
  ageConfirm: boolean
  agreeTerms: boolean
  _gotcha: string
}

function buildMailto(form: FormState): string {
  const subject = `MedBridge application — ${form.firstName} ${form.lastName}`.trim()
  const safeMessage = form.message ? form.message.slice(0, 1500) : ""
  const lines = [
    `Name: ${form.firstName} ${form.lastName}`,
    `Email: ${form.email}`,
    form.country && `Country: ${form.country}`,
    form.phone && `Phone / WhatsApp: ${form.phone}`,
    `Education level: ${form.educationLevel}`,
    `Preferred specialty: ${form.preferredSpecialty}`,
    `Programme length: ${form.duration}`,
    form.preferredStart && `Preferred start date: ${form.preferredStart}`,
    safeMessage && `\nMessage:\n${safeMessage}`,
    `\nConfirmations: age ${form.ageConfirm ? "yes" : "no"} · contact consent ${form.consent ? "yes" : "no"} · terms ${form.agreeTerms ? "yes" : "no"}`,
  ].filter(Boolean)
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`
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
  ageConfirm: false,
  agreeTerms: false,
  _gotcha: "",
}

const REQUIRED: (keyof FormState)[] = [
  "firstName",
  "lastName",
  "email",
  "educationLevel",
  "preferredSpecialty",
  "duration",
  "ageConfirm",
  "consent",
  "agreeTerms",
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

const FIELD_TO_DOM_ID: Partial<Record<keyof FormState, string>> = {
  firstName: "f-first",
  lastName: "f-last",
  email: "f-email",
  educationLevel: "f-education",
  preferredSpecialty: "f-specialty",
  duration: "f-duration",
  ageConfirm: "f-age",
  consent: "f-consent",
  agreeTerms: "f-terms",
}

const FIELD_ERROR: Partial<Record<keyof FormState, string>> = {
  firstName: "Please enter your first name.",
  lastName: "Please enter your last name.",
  email: "Please enter a valid email address.",
  educationLevel: "Please select your education level.",
  preferredSpecialty: "Please choose a preferred specialty.",
  duration: "Please choose a programme length.",
  ageConfirm: "Please confirm you are 18 or older (or have parental consent).",
  consent: "Please confirm consent to be contacted.",
  agreeTerms: "Please agree to the Terms of Service and Privacy Policy.",
}

export function Apply() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [invalid, setInvalid] = useState<Set<keyof FormState>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null)

  const saturdays = useMemo(() => nextSaturdays(8), [])

  const groupedSpecialties = useMemo(() => {
    const buckets: Record<SpecialtyCategory, string[]> = {
      surgical: [], cardio: [], neuro: [], womens: [], diagnostic: [], other: [],
    }
    for (const s of SPECIALTIES) {
      const primary = s.cats[0]
      buckets[primary].push(s.name)
    }
    return CATEGORY_ORDER
      .map((cat) => ({ cat, label: CATEGORY_LABEL[cat], names: buckets[cat] }))
      .filter((g) => g.names.length > 0)
  }, [])

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

  const focusFirstInvalid = (bad: Set<keyof FormState>) => {
    const firstKey = REQUIRED.find((k) => bad.has(k))
    if (!firstKey) return
    const id = FIELD_TO_DOM_ID[firstKey]
    if (!id) return
    requestAnimationFrame(() => {
      const el = document.getElementById(id) as HTMLElement | null
      el?.focus({ preventScroll: false })
    })
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
      setError("Please fix the highlighted fields before submitting.")
      focusFirstInvalid(bad)
      return
    }

    const mailto = buildMailto(form)
    const scrollToSuccess = () => {
      setTimeout(() => {
        document.getElementById("form-success")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 50)
    }

    if (!isFormEndpointConfigured) {
      setMailtoUrl(mailto)
      setSuccess(true)
      scrollToSuccess()
      window.location.href = mailto
      return
    }

    setSubmitting(true)
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)
    try {
      // text/plain skips the CORS preflight that Apps Script Web Apps don't
      // answer correctly. The body is still JSON; the script parses it as such.
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          country: form.country,
          phone: form.phone,
          educationLevel: form.educationLevel,
          preferredSpecialty: form.preferredSpecialty,
          duration: form.duration,
          preferredStart: form.preferredStart,
          message: form.message ? form.message.slice(0, 1500) : "",
          consent: form.consent,
          ageConfirm: form.ageConfirm,
          agreeTerms: form.agreeTerms,
          _gotcha: form._gotcha,
          source: typeof window !== "undefined" ? window.location.host : "medbridge.am",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (!data || data.ok !== true) throw new Error("submission_rejected")
      setSuccess(true)
      setMailtoUrl(null)
      scrollToSuccess()
    } catch {
      setMailtoUrl(mailto)
      setError(
        "We couldn't submit your application automatically. Please continue via email — your message is pre-filled.",
      )
    } finally {
      window.clearTimeout(timeoutId)
      setSubmitting(false)
    }
  }

  const ariaInvalid = (k: keyof FormState) => (invalid.has(k) ? "true" : "false")
  const errorIdFor = (k: keyof FormState) => `${FIELD_TO_DOM_ID[k] ?? `f-${k}`}-err`
  const describedBy = (k: keyof FormState) => (invalid.has(k) ? errorIdFor(k) : undefined)
  const renderError = (k: keyof FormState) =>
    invalid.has(k) && FIELD_ERROR[k] ? (
      <p id={errorIdFor(k)} role="alert" className="mt-1 text-xs text-red-700">
        {FIELD_ERROR[k]}
      </p>
    ) : null
  const isLocked = success || submitting

  return (
    <section id="apply" className="bg-bone py-section">
      <div className="mx-auto max-w-content px-container">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="kicker text-claret">
              <span className="kicker-mark" />
              09 — Apply
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Tell us about you.<br />We'll design the rotation.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75 max-w-prose2">
              Your application is reviewed personally by the MedBridge team. You'll hear back within{" "}
              <strong className="font-medium text-ink">two business days</strong> with availability, an all-inclusive quote and the next steps.
            </p>

            {!isFormEndpointConfigured && (
              <div className="mt-6 rounded-sm border border-ink/10 bg-paper p-4">
                <p className="text-sm leading-relaxed text-ink/75">
                  Submitting opens your email client with a pre-filled message. Click <strong className="font-medium text-ink">send</strong> in your email app to complete.
                </p>
              </div>
            )}

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
              <p className="text-xs uppercase tracking-[0.2em] text-ink/65">Prefer to talk first?</p>
              <p className="mt-3 text-ink/80">
                Email <a className="link" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>
                <br />
                Call <a className="link" href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
                <br />
                or write us on WhatsApp.
              </p>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="rounded-sm border border-ink/15 bg-paper p-5 sm:p-8 lg:p-10 shadow-sm">
              <p className="mb-4 text-xs text-ink/65">Fields marked with * are required.</p>
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="f-first">First name *</label>
                  <input
                    id="f-first"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    aria-invalid={ariaInvalid("firstName")}
                    aria-describedby={describedBy("firstName")}
                    disabled={isLocked}
                  />
                  {renderError("firstName")}
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
                    aria-describedby={describedBy("lastName")}
                    disabled={isLocked}
                  />
                  {renderError("lastName")}
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
                    aria-describedby={describedBy("email")}
                    disabled={isLocked}
                  />
                  {renderError("email")}
                </div>
                <div className="field">
                  <label htmlFor="f-country">Country</label>
                  <input
                    id="f-country"
                    type="text"
                    list="country-list"
                    autoComplete="country-name"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    disabled={isLocked}
                  />
                  <datalist id="country-list">
                    {COMMON_COUNTRIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone / WhatsApp</label>
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    disabled={isLocked}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-education">Education level *</label>
                  <select
                    id="f-education"
                    value={form.educationLevel}
                    onChange={(e) => set("educationLevel", e.target.value)}
                    aria-invalid={ariaInvalid("educationLevel")}
                    aria-describedby={describedBy("educationLevel")}
                    disabled={isLocked}
                  >
                    <option value="">Select one…</option>
                    {EDUCATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  {renderError("educationLevel")}
                </div>
                <div className="field">
                  <label htmlFor="f-specialty">Preferred specialty *</label>
                  <select
                    id="f-specialty"
                    value={form.preferredSpecialty}
                    onChange={(e) => set("preferredSpecialty", e.target.value)}
                    aria-invalid={ariaInvalid("preferredSpecialty")}
                    aria-describedby={describedBy("preferredSpecialty")}
                    disabled={isLocked}
                  >
                    <option value="">Select one…</option>
                    {groupedSpecialties.map((g) => (
                      <optgroup key={g.cat} label={g.label}>
                        {g.names.map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </optgroup>
                    ))}
                    <option>Open to suggestions</option>
                  </select>
                  {renderError("preferredSpecialty")}
                </div>
                <div className="field">
                  <label htmlFor="f-duration">Programme length *</label>
                  <select
                    id="f-duration"
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    aria-invalid={ariaInvalid("duration")}
                    aria-describedby={describedBy("duration")}
                    disabled={isLocked}
                  >
                    <option value="">Select one…</option>
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  {renderError("duration")}
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="f-start">Preferred start date</label>
                  <select
                    id="f-start"
                    value={form.preferredStart}
                    onChange={(e) => set("preferredStart", e.target.value)}
                    disabled={isLocked}
                  >
                    <option value="">Select one…</option>
                    {saturdays.map((s) => (
                      <option key={s.iso} value={s.iso}>{s.label}</option>
                    ))}
                    <option value="later">Later — I'll specify in the message</option>
                  </select>
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="f-message">Anything we should know?</label>
                  <textarea
                    id="f-message"
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    placeholder="Specific surgeries you'd like to observe, prior shadowing experience, dietary needs, accommodation preferences…"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    disabled={isLocked}
                  />
                </div>
                <div className="sm:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="f-age"
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-ink/30 text-claret focus:ring-claret"
                        checked={form.ageConfirm}
                        onChange={(e) => set("ageConfirm", e.target.checked)}
                        aria-invalid={ariaInvalid("ageConfirm")}
                        aria-describedby={describedBy("ageConfirm")}
                        disabled={isLocked}
                      />
                      <label htmlFor="f-age" className="text-sm text-ink/75">
                        I confirm I am at least 18 years old, or, if I am 16–17, I have written consent from a parent or legal guardian. *
                      </label>
                    </div>
                    {renderError("ageConfirm")}
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="f-consent"
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-ink/30 text-claret focus:ring-claret"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={ariaInvalid("consent")}
                        aria-describedby={describedBy("consent")}
                        disabled={isLocked}
                      />
                      <label htmlFor="f-consent" className="text-sm text-ink/75">
                        I consent to MedBridge processing the information above to review my application and contact me about it, as described in the{" "}
                        <a className="link underline" href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. *
                      </label>
                    </div>
                    {renderError("consent")}
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        id="f-terms"
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-ink/30 text-claret focus:ring-claret"
                        checked={form.agreeTerms}
                        onChange={(e) => set("agreeTerms", e.target.checked)}
                        aria-invalid={ariaInvalid("agreeTerms")}
                        aria-describedby={describedBy("agreeTerms")}
                        disabled={isLocked}
                      />
                      <label htmlFor="f-terms" className="text-sm text-ink/75">
                        I have read and agree to the{" "}
                        <a className="link underline" href="/terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>. *
                      </label>
                    </div>
                    {renderError("agreeTerms")}
                  </div>
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
                <button type="submit" disabled={isLocked} className="btn-primary btn-lg">
                  {submitting
                    ? "Submitting…"
                    : isFormEndpointConfigured
                      ? "Submit application"
                      : "Continue to email"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-ink/65">We'll reply within 2 business days.</p>
              </div>

              {error && (
                <div role="alert" className="mt-6 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}
              {success && !mailtoUrl && (
                <div id="form-success" role="status" className="mt-8 rounded-sm border border-sage/40 bg-sage/5 p-6">
                  <p className="font-display text-xl text-sage">Application received.</p>
                  <p className="mt-2 text-ink/75">
                    Thank you — we've got your application. A member of the MedBridge team will be in touch within{" "}
                    <strong className="font-medium text-ink">two business days</strong>.
                  </p>
                  <p className="mt-4 text-sm text-ink/65">
                    Need to update your details? Email us at{" "}
                    <a className="link underline" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
                  </p>
                </div>
              )}
              {success && mailtoUrl && (
                <div id="form-success" role="status" className="mt-8 rounded-sm border border-sage/40 bg-sage/5 p-6">
                  <p className="font-display text-xl text-sage">One more step — send the email.</p>
                  <p className="mt-2 text-ink/75">
                    Open your email client to send the application. We've pre-filled the message — just hit{" "}
                    <strong className="font-medium text-ink">send</strong> to finish.
                  </p>
                  <a href={mailtoUrl} className="btn-primary btn-lg mt-5 inline-flex">
                    Open email client
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="mt-4 text-sm text-ink/65">
                    No mail client set up? Email us directly at{" "}
                    <a className="link underline" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>{" "}
                    with the details above, or{" "}
                    <button
                      type="button"
                      className="link underline"
                      onClick={() => { setSuccess(false); setMailtoUrl(null) }}
                    >
                      edit your application
                    </button>
                    .
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
