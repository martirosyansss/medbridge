import logoUrl from "@/assets/logo.png"
import {
  CONTACT_ADDRESS_LINE,
  CONTACT_CITY_COUNTRY,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "@/lib/contact"

export function Footer() {
  return (
    <footer className="bg-ink text-bone/80 pt-16 pb-10 sm:pt-20">
      <div className="mx-auto max-w-content px-container">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-5">
            <a href="#top" aria-label="MedBridge — home" className="inline-flex items-center">
              <img
                src={logoUrl}
                alt="MedBridge — Bridging knowledge. Inspiring care."
                width={160}
                height={160}
                className="brand-logo brand-logo--on-dark h-20 w-auto select-none"
                draggable={false}
              />
            </a>
            <p className="mt-5 max-w-md text-bone/65 leading-relaxed">
              The international observership programme at Astghik Medical Center — bridging international medical education and clinical excellence in Armenia.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.22em] text-bone/65">Programme</p>
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
            <p className="text-xs uppercase tracking-[0.22em] text-bone/65">Location</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-bone/85">
              Astghik Medical Center<br />
              {CONTACT_ADDRESS_LINE}<br />
              {CONTACT_CITY_COUNTRY}
            </address>
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-bone/65">Contact</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                <a className="footer-link" href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
              </li>
            </ul>
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-bone/65">Legal</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><a className="footer-link" href="/privacy.html">Privacy policy</a></li>
              <li><a className="footer-link" href="/terms.html">Terms of service</a></li>
              <li>
                <a className="footer-link" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                  EU online dispute resolution
                </a>
              </li>
              <li>
                <a className="footer-link" href="https://www.foi.am/en/personal-data-protection-agency/" target="_blank" rel="noopener noreferrer">
                  Armenia PDP Agency
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/15 pt-8 text-xs text-bone/65 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} MedBridge. All rights reserved.</p>
          <p>Astghik Medical Center is JCI-accredited and ISO 9001:2015 certified by TÜV Rheinland.</p>
        </div>
      </div>
    </footer>
  )
}
