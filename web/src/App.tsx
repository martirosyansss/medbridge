import { Nav } from "@/components/Nav"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Why } from "@/components/sections/Why"
import { Yerevan } from "@/components/sections/Yerevan"
import { Program } from "@/components/sections/Program"
import { Schedule } from "@/components/sections/Schedule"
import { Specialties } from "@/components/sections/Specialties"
import { Services } from "@/components/sections/Services"
import { Pricing } from "@/components/sections/Pricing"
import { RiskReversal } from "@/components/sections/RiskReversal"
import { Mission } from "@/components/sections/Mission"
import { Apply } from "@/components/sections/Apply"
import { Faq } from "@/components/sections/Faq"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { CookieConsent } from "@/components/CookieConsent"
import { useReveal } from "@/hooks/useReveal"

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Why />
        <Yerevan />
        <Program />
        <Schedule />
        <Specialties />
        <Services />
        <Pricing />
        <RiskReversal />
        <Mission />
        <Apply />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  )
}
