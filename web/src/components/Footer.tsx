import { Plus } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-ink text-bone/80 pt-20 pb-10">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2 font-display text-2xl tracking-tightest text-bone">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-claret text-bone">
                <Plus className="h-5 w-5" strokeWidth={2.2} />
              </span>
              MedBridge
            </a>
            <p className="mt-5 max-w-md text-bone/65 leading-relaxed">
              The international observership programme at Astghik Medical Center — bridging international medical education and clinical excellence in Armenia.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.22em] text-bone/45">Programme</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="footer-link" href="#about">About Astghik</a></li>
              <li><a className="footer-link" href="#program">Programme</a></li>
              <li><a className="footer-link" href="#specialties">Specialties</a></li>
              <li><a className="footer-link" href="#schedule">Sample Week</a></li>
              <li><a className="footer-link" href="#pricing">Pricing</a></li>
              <li><a className="footer-link" href="#apply">Apply</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-bone/45">Location</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-bone/85">
              Astghik Medical Center<br />
              Yerevan, Armenia
            </address>
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-bone/45">Contact</p>
            <p className="mt-3 text-sm">
              <a className="footer-link" href="mailto:hello@medbridge.am">hello@medbridge.am</a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/15 pt-8 text-xs text-bone/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} MedBridge. All rights reserved.</p>
          <p>Astghik Medical Center is ISO 9001:2015 certified by TÜV Rheinland.</p>
        </div>
      </div>
    </footer>
  )
}
