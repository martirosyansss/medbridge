import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStickyHeader } from "@/hooks/useStickyHeader"
import { useActiveSection } from "@/hooks/useActiveSection"
import logoUrl from "@/assets/logo.png"

const LINKS = [
  { href: "about", label: "About" },
  { href: "why", label: "Why MedBridge" },
  { href: "yerevan", label: "Yerevan" },
  { href: "program", label: "Program" },
  { href: "specialties", label: "Specialties" },
  { href: "pricing", label: "Pricing" },
  { href: "faq", label: "FAQ" },
] as const

const NAV_IDS = LINKS.map((l) => l.href)

const MOBILE_LINKS = [
  ...LINKS.slice(0, 5),
  { href: "schedule", label: "Sample Week" },
  ...LINKS.slice(5),
] as const

export function Nav() {
  const scrolled = useStickyHeader()
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = useState(false)

  return (
    <header
      id="site-header"
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "is-scrolled",
        open && "is-open"
      )}
    >
      <div className="mx-auto max-w-content px-container">
        <nav className="flex items-center justify-between py-4 sm:py-5" aria-label="Primary">
          <a
            href="#top"
            aria-label="MedBridge — home"
            className="brand-mark group inline-flex items-center"
          >
            <img
              src={logoUrl}
              alt="MedBridge"
              width={160}
              height={160}
              className="brand-logo h-10 sm:h-11 w-auto select-none transition-transform group-hover:-rotate-1"
              draggable={false}
            />
          </a>

          <ul className="hidden lg:flex items-center gap-8 text-sm text-ink/80">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  className={cn("nav-link", active === l.href && "is-active")}
                  href={`#${l.href}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a href="#apply" className="btn-primary">
              Apply Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-ink/5"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <div id="mobile-menu" className={cn("lg:hidden pb-6 -mt-2", !open && "hidden")}>
          <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10 text-ink">
            {MOBILE_LINKS.map((l) => (
              <li key={l.href}>
                <a className="mobile-link" href={`#${l.href}`} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#apply" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full justify-center">
            Apply Now
          </a>
        </div>
      </div>
    </header>
  )
}
