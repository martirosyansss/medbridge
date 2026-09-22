import { useRef } from "react"
import { useImageFailed } from "@/hooks/useImageFailed"

type PhotoProps = {
  src: string
  /** Optional WebP rendition of `src` (a URL or a full srcset string), served via <picture> when present. */
  webp?: string
  srcSet?: string
  sizes?: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackClass?: string
  fallbackLabel?: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  objectPosition?: string
}

export function Photo({
  src,
  webp,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = "",
  fallbackClass = "photo-fallback-soft",
  fallbackLabel,
  loading = "lazy",
  fetchPriority,
  objectPosition,
}: PhotoProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [failed, markFailed] = useImageFailed(ref)

  if (failed) {
    return (
      <div
        className={`${fallbackClass} ${className}`}
        role="img"
        aria-label={alt}
        data-fallback-label={fallbackLabel || alt}
      />
    )
  }

  const img = (
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      style={objectPosition ? { objectPosition } : undefined}
      onError={markFailed}
    />
  )

  if (!webp) return img
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      {img}
    </picture>
  )
}
