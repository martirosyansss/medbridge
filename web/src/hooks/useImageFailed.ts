import { useEffect, useState } from "react"
import type { RefObject } from "react"

/**
 * Detects a broken image even when the `error` event fired before hydration
 * (the <img> already exists in the prerendered HTML). Returns the failed flag
 * and a setter to pass as `onError`.
 */
export function useImageFailed(ref: RefObject<HTMLImageElement | null>) {
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0 && el.currentSrc) setFailed(true)
  }, [ref])
  return [failed, () => setFailed(true)] as const
}
