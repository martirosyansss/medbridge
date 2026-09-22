import { useCookieChoice, writeCookieChoice, type CookieChoice } from "@/lib/cookieConsent"

/**
 * Slim, non-modal consent bar. Absent from the prerendered HTML and only shown
 * after hydration when no choice is stored, so it never blocks first paint or
 * hides the hero CTAs on mobile.
 */
export function CookieConsent() {
  const choice = useCookieChoice()
  if (choice !== null) return null

  const decide = (c: CookieChoice) => writeCookieChoice(c)

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Cookie notice"
      className="cookie-bar fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-4 gap-y-2 px-container py-2.5 text-xs text-ink/75 sm:text-[0.8rem]">
        <p className="min-w-0 flex-1 leading-snug">
          Essential cookies only. No ads, no analytics without asking.{" "}
          <a className="link underline" href="/privacy.html#cookies">Privacy Policy</a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-full border border-ink/20 px-3 py-1.5 font-medium text-ink hover:border-ink"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-claret px-3.5 py-1.5 font-medium text-white hover:bg-claret-deep"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
