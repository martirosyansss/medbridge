/**
 * Prerender the single route into dist/index.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle in
 * dist-ssr/). Injects the rendered markup into #root and the extra head tags
 * (hero image + font preloads, FAQPage JSON-LD) before </head>. Fails loudly:
 * a broken prerender must never ship an empty <div id="root"> or a dangling
 * asset URL.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { resolve } from "node:path"

const distIndex = resolve("dist/index.html")
const ssrEntry = resolve("dist-ssr/entry-server.js")

if (!existsSync(distIndex)) throw new Error(`prerender: ${distIndex} not found — run vite build first`)
if (!existsSync(ssrEntry)) throw new Error(`prerender: ${ssrEntry} not found — run vite build --ssr first`)

const { render } = await import(pathToFileURL(ssrEntry).href)
const { html, head } = render()

if (!html || html.length < 10_000) {
  throw new Error(`prerender: rendered HTML is suspiciously small (${html?.length ?? 0} bytes)`)
}

const ROOT_TAG = '<div id="root"></div>'
const SCRIPT_TAG = /<script type="module" crossorigin src="/g
let template = readFileSync(distIndex, "utf8")
if (!template.includes(ROOT_TAG)) throw new Error("prerender: template has no empty #root container")
if (!template.includes("</head>")) throw new Error("prerender: template has no </head>")

const scriptTags = template.match(SCRIPT_TAG)?.length ?? 0
if (scriptTags !== 1) throw new Error(`prerender: expected exactly 1 module script tag, found ${scriptTags}`)

// Replacer functions: a plain string replacement would interpret `$&`, `$'`
// etc. inside the rendered HTML and silently corrupt the page.
template = template
  .replace(ROOT_TAG, () => `<div id="root">${html}</div>`)
  .replace("</head>", () => `    ${head}\n  </head>`)
  // The page is already rendered; hydration can wait behind CSS, fonts and
  // the hero image so they do not share bandwidth with a 100 KB bundle.
  .replace(SCRIPT_TAG, () => '<script type="module" crossorigin fetchpriority="low" src="')

// Every /assets/* URL the SSR bundle emitted must exist in the client build
// (content hashes are expected to match; this turns a mismatch into a build
// failure instead of a broken hero or 404 font preloads in production).
const assetUrls = new Set([...template.matchAll(/\/assets\/[A-Za-z0-9_.\-]+/g)].map((m) => m[0]))
const missing = [...assetUrls].filter((u) => !existsSync(resolve("dist", u.slice(1))))
if (missing.length) throw new Error(`prerender: ${missing.length} referenced asset(s) missing from dist:\n  ${missing.join("\n  ")}`)

writeFileSync(distIndex, template)

const kb = (Buffer.byteLength(template) / 1024).toFixed(1)
const faqCount = head.match(/"@type":"Question"/g)?.length ?? 0
console.log(`prerender: wrote dist/index.html (${kb} KB, ${faqCount} FAQ entries in JSON-LD, ${assetUrls.size} assets verified)`)
