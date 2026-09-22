/**
 * Generate dist/sitemap.xml with <lastmod> taken from the last git commit that
 * touched each page's sources, not from the deploy time. Requires a full clone
 * (fetch-depth: 0 in CI); a shallow clone fails the build because it would
 * produce misleading lastmod dates.
 */
import { execSync } from "node:child_process"
import { writeFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"

const ORIGIN = "https://medbridge.am"

const PAGES = [
  { loc: "/", sources: ["src", "index.html", "scripts/prerender.mjs"] },
  { loc: "/privacy.html", sources: ["public/privacy.html"] },
  { loc: "/terms.html", sources: ["public/terms.html"] },
]

function git(args) {
  return execSync(`git ${args}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()
}

let gitAvailable = true
try {
  if (git("rev-parse --is-shallow-repository") === "true") {
    throw new Error("sitemap: shallow clone — lastmod would be wrong. Use fetch-depth: 0 in CI.")
  }
} catch (err) {
  if (String(err.message).startsWith("sitemap:")) throw err
  gitAvailable = false
  console.warn("sitemap: git unavailable, falling back to today's date for every lastmod")
}

function lastCommitDate(loc, paths) {
  if (gitAvailable) {
    const out = git(`log -1 --format=%cI -- ${paths.map((p) => JSON.stringify(p)).join(" ")}`)
    if (out) return out.slice(0, 10)
    console.warn(`sitemap: no commit found for ${loc}, falling back to today's date`)
  }
  return new Date().toISOString().slice(0, 10)
}

const urls = PAGES.map(
  (p) => `  <url>\n    <loc>${ORIGIN}${p.loc}</loc>\n    <lastmod>${lastCommitDate(p.loc, p.sources)}</lastmod>\n  </url>`
).join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

mkdirSync(resolve("dist"), { recursive: true })
writeFileSync(resolve("dist/sitemap.xml"), xml)
console.log(`sitemap: wrote ${PAGES.length} URLs`)
