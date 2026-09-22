import { useSyncExternalStore } from "react"

export const COOKIE_CONSENT_KEY = "mb-cookie-consent"
export const COOKIE_CONSENT_EVENT = "mb-cookie-consent-change"

export type CookieChoice = "accepted" | "rejected"

/** In-memory copy so the bar can be dismissed even when storage is blocked. */
let memoryChoice: CookieChoice | null = null

/** Returns the stored choice, or null when the visitor has not decided yet. */
export function readCookieChoice(): CookieChoice | null {
  if (memoryChoice) return memoryChoice
  if (typeof window === "undefined") return null
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return v === "accepted" || v === "rejected" ? v : null
  } catch {
    // Storage blocked (private mode, disabled site data): undecided for this
    // page load; a click still dismisses the bar via memoryChoice.
    return null
  }
}

export function writeCookieChoice(c: CookieChoice) {
  memoryChoice = c
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, c)
  } catch {
    // storage unavailable — memoryChoice keeps the choice for this page load
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: c }))
}

function subscribe(onChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/**
 * Current cookie choice as a React value. `undefined` while server-rendering
 * or hydrating (so the prerendered HTML never shows the bar), then the stored
 * choice or null once mounted.
 */
export function useCookieChoice(): CookieChoice | null | undefined {
  return useSyncExternalStore(subscribe, readCookieChoice, () => undefined)
}
