import { SCREENING } from "@/data/site"

export type StartDate = { iso: string; label: string }

function localISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/**
 * The next `n` Saturdays that are bookable: at least `minLeadDays` from today,
 * so the earliest offered start still allows the pre-arrival lab results to be
 * submitted on time. Used by the hero "Next start" line and the Apply form so
 * they can never disagree.
 */
export function upcomingSaturdays(n: number, minLeadDays = SCREENING.deadlineDaysBeforeArrival, now = new Date()): StartDate[] {
  const d = new Date(now)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + minLeadDays)
  const toSaturday = (6 - d.getDay() + 7) % 7
  d.setDate(d.getDate() + toSaturday)
  const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  const out: StartDate[] = []
  for (let i = 0; i < n; i++) {
    out.push({ iso: localISO(d), label: fmt.format(d) })
    d.setDate(d.getDate() + 7)
  }
  return out
}

/** Short label ("Sat, Oct 10") of the earliest bookable Saturday. */
export function nextStartLabel(now = new Date()): string {
  const [first] = upcomingSaturdays(1, SCREENING.deadlineDaysBeforeArrival, now)
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(new Date(first.iso + "T00:00:00"))
}
