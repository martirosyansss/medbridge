import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/**
 * `false` during server rendering and the hydration pass, `true` afterwards.
 * Use it for values that must not be baked into the prerendered HTML
 * (dates, localStorage) without triggering hydration mismatches.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
