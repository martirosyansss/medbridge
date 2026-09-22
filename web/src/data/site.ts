/**
 * Single source of truth for every number and claim that appears in more than
 * one place on the site. Mirrors doc/info.md (the client's brief). If a fact
 * changes, change it here and nowhere else.
 */

export const SITE = {
  name: "MedBridge",
  url: "https://medbridge.am/",
  tagline: "Medical shadowing & observership in Armenia",
} as const

export const HOSPITAL = {
  name: "Astghik Medical Center",
  /** Official hospital website (verified 2026-09). astghik.am is NOT the hospital. */
  url: "https://mcastghik.com/",
  facebook: "https://www.facebook.com/astghikmedicalcenter",
  /** JCI public directory of accredited organisations. */
  jciDirectoryUrl: "https://www.jointcommissioninternational.org/who-we-are/accredited-organizations/",
  jci: { effective: "31 May 2025", through: "30 May 2028" },
  iso: { standard: "ISO 9001:2015", body: "TÜV Rheinland", firstCertified: 2018, validFrom: "2024-08-26", validTo: "2027-08-26" },
} as const

export const STATS = {
  departments: 30,
  operatingRooms: 15,
  specialties: 24,
  /** doc/info.md: "Observation of up to 5 surgeries daily". */
  surgeriesPerDayMax: 5,
  /** Monday to Friday. */
  clinicalDaysPerWeek: 5,
  /** Up to 8 hours a day, Mon–Fri. */
  hoursPerWeekMax: 40,
} as const

/** One phrasing of the surgical-volume claim, used everywhere. */
export const SURGERY_CLAIM = `Up to ${STATS.surgeriesPerDayMax} surgeries observed daily, Monday to Friday`
export const SURGERY_CLAIM_SHORT = `Up to ${STATS.surgeriesPerDayMax} surgeries observed per day`

export const PROGRAM = {
  durationsWeeks: [1, 2, 3] as const,
  arrivalDay: "Saturday",
  startDay: "Monday",
  language: "English",
  /** Reply time promised on the Apply section and in the FAQ. */
  responseTime: "two business days",
  quoteValidityDays: 14,
  groupDiscount: { percent: 10, minApplicants: 3 },
} as const

export const SCREENING = {
  /** Lab results must be sent this many days before arrival. */
  deadlineDaysBeforeArrival: 14,
  /** Results must be dated within this many months. */
  validityMonths: 6,
  antiHbsThreshold: "≥10 mIU/mL",
} as const

/** Disjoint bands: ≥30 days full refund, 14–29 days 50%, <14 days none. Mirrors terms.html §7.1. */
export const REFUND = {
  fullRefundDays: 30,
  halfRefundFrom: 14,
  halfRefundTo: 29,
  rescheduleNoticeDays: 14,
} as const

export type Tier = {
  weeks: 1 | 2 | 3
  name: string
  price: number
  featured?: boolean
  tagline: string
  perks: string[]
}

/**
 * Pricing tiers. Prices are "from" prices in USD per participant.
 * NOTE for the client: per-week cost is $1,500 / $1,900 / $1,500. The 2-week
 * tier is the most expensive per week and carries the "Most popular" badge.
 */
export const TIERS: Tier[] = [
  {
    weeks: 1,
    name: "1 week",
    price: 1500,
    tagline: "Foundational rotation with full clinical exposure",
    perks: [
      `Up to ${STATS.hoursPerWeekMax} hours of clinical shadowing per week`,
      `${STATS.specialties} medical specialties to choose from`,
      SURGERY_CLAIM_SHORT,
      "Clinical rounds and hospital experience",
      "Accommodation near the hospital",
      "Airport transfers",
      "Pre-arrival health-screening review",
      "Cultural excursions around Armenia",
      "Armenian cuisine and culinary experiences",
      "Certificate of Completion",
      "Recommendation letter from supervising doctors",
      "Visa assistance and invitation letter",
    ],
  },
  {
    weeks: 2,
    name: "2 weeks",
    price: 3800,
    featured: true,
    tagline: "Extended rotation with deeper case-mix exposure",
    perks: [
      "Everything in the 1-week program",
      "Full-day excursions on Saturday and Sunday",
      "Armenian cuisine dinners on Saturday and Sunday",
    ],
  },
  {
    weeks: 3,
    name: "3 weeks",
    price: 4500,
    tagline: "Full rotation for advanced students and residents",
    perks: [
      "Everything in the 2-week program",
      "Three consecutive weeks in your chosen specialty",
      "Second specialty on request, subject to hospital approval",
    ],
  },
]

export const NOT_INCLUDED = ["Flights", "Travel and medical insurance (required)", "Bank transfer and intermediary fees", "Pre-arrival laboratory tests"]
