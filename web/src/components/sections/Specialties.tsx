import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { SPECIALTIES, CATEGORY_LABEL, type SpecialtyCategory } from "@/data/specialties"

type Filter = "all" | SpecialtyCategory

const FILTERS: { key: Filter; label: string; showCount?: boolean }[] = [
  { key: "all", label: "All", showCount: true },
  { key: "surgical", label: "Surgical" },
  { key: "cardio", label: "Cardiac & Vascular" },
  { key: "neuro", label: "Neuro" },
  { key: "womens", label: "Women's Health" },
  { key: "diagnostic", label: "Diagnostic" },
  { key: "other", label: "Other" },
]

export function Specialties() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SPECIALTIES.filter((s) => {
      const matchesFilter = activeFilter === "all" || s.cats.includes(activeFilter)
      const matchesQuery = !q || s.name.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  return (
    <section id="specialties" className="bg-bone py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            07 — Specialties
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Twenty-four clinical specialties. One hospital.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              Browse the full case mix. Filter by domain, or search by name.
            </p>
          </div>
        </header>

        <div className="reveal mt-12 flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Filter specialties" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={activeFilter === f.key}
                onClick={() => setActiveFilter(f.key)}
                className={cn("chip", activeFilter === f.key && "chip-active")}
              >
                {f.label}
                {f.showCount && <span className="chip-count">{SPECIALTIES.length}</span>}
              </button>
            ))}
          </div>
          <div className="ml-auto relative w-full sm:w-72">
            <input
              type="search"
              placeholder="Search specialties…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-h-11 rounded-full border border-ink/12 bg-paper px-5 py-2.5 pr-11 shadow-sm text-base sm:text-sm placeholder:text-ink/55 focus:border-claret focus:outline-none focus:ring-2 focus:ring-claret/20"
              aria-label="Search specialties"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/55" strokeWidth={1.8} />
          </div>
        </div>

        <div
          role="region"
          aria-label="Specialties"
          aria-live="polite"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s, idx) => (
            <article key={s.name} className="spec-card reveal">
              <p className="spec-num">{String(idx + 1).padStart(2, "0")}</p>
              <h3 className="spec-title">{s.name}</h3>
              <ul className="spec-procs">
                {s.procs.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <span className="spec-tag">{CATEGORY_LABEL[s.cats[0]]}</span>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="col-span-full mt-8 text-center text-ink/65">No specialties match your search.</p>
          )}
        </div>
      </div>
    </section>
  )
}
