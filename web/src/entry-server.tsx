/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Renders the app to static HTML and exposes the extra <head> markup the
 * prerendered page needs (hero + font preloads, FAQPage JSON-LD).
 */
import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import App from "./App"
import { FAQS } from "./data/faq"
import { HERO_AVIF_SRCSET, HERO_SIZES } from "./components/sections/Hero"
// Latin subsets are what the first paint needs; the rest load on demand via @fontsource CSS.
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url"
import frauncesLatin from "@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url"

export function render(): { html: string; head: string } {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://medbridge.am/#faq",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const head = [
    // Preload only the AVIF candidate set: browsers without AVIF ignore a
    // preload whose `type` they cannot decode and fetch WebP/JPEG via <picture>.
    `<link rel="preload" as="image" type="image/avif" imagesrcset="${HERO_AVIF_SRCSET}" imagesizes="${HERO_SIZES}" fetchpriority="high">`,
    `<link rel="preload" as="font" type="font/woff2" href="${interLatin}" crossorigin>`,
    `<link rel="preload" as="font" type="font/woff2" href="${frauncesLatin}" crossorigin>`,
    `<script type="application/ld+json">${JSON.stringify(faqJsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ")

  return { html, head }
}
