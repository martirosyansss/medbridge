import { useState } from "react"

import { COOKIE_CONSENT_EVENT, readCookieChoice, writeCookieChoice, type CookieChoice } from "@/lib/cookieConsent"

export function CookieConsent() {
  const [visible, setVisible] = useState(() => readCookieChoice() === null)

  if (!visible) return null

  const decide = (c: CookieChoice) => {
    writeCookieChoice(c)
    setVisible(false)
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: c }))
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-sm border border-ink/15 bg-paper/95 p-4 shadow-2xl backdrop-blur-sm sm:bottom-4 sm:p-5"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)",
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="text-sm leading-relaxed text-ink/80 sm:flex-1">
          We use only essential cookies and storage required to make the site work. We don't run advertising or
          profiling cookies, and we will ask before turning on any analytics. See our{" "}
          <a className="link underline" href="/privacy.html">Privacy Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-sm border border-ink/25 px-4 py-2 text-sm font-medium text-ink hover:border-ink"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-sm bg-claret px-4 py-2 text-sm font-medium text-bone hover:bg-claret-deep"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
