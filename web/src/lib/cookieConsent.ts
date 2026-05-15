export const COOKIE_CONSENT_KEY = "mb-cookie-consent"
export const COOKIE_CONSENT_EVENT = "mb-cookie-consent-change"

export type CookieChoice = "accepted" | "rejected"

export function readCookieChoice(): CookieChoice | null {
  if (typeof window === "undefined") return "accepted"
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return v === "accepted" || v === "rejected" ? v : null
  } catch {
    return "accepted"
  }
}

export function writeCookieChoice(c: CookieChoice) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, c)
  } catch {
    // storage unavailable — silently skip
  }
}
