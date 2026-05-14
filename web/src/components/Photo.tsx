import { useState } from "react"

type PhotoProps = {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  className?: string
  fallbackClass?: string
  fallbackLabel?: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  objectPosition?: string
}

export function Photo({
  src,
  srcSet,
  sizes,
  alt,
  className = "",
  fallbackClass = "photo-fallback-soft",
  fallbackLabel,
  loading = "lazy",
  fetchPriority,
  objectPosition,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

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

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      style={objectPosition ? { objectPosition } : undefined}
      onError={() => setFailed(true)}
    />
  )
}
