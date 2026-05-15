import { Photo } from "@/components/Photo"
import missionBg from "@/assets/astghik/icu-team.jpg"

export function Mission() {
  return (
    <section id="mission" className="relative bg-claret py-28 text-bone lg:py-36 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Photo
          src={missionBg}
          alt=""
          className="mission-photo"
          fallbackClass="photo-fallback-or"
          loading="lazy"
        />
        <div className="mission-overlay" />
        <div className="mission-grain" />
      </div>
      <div className="relative mx-auto max-w-content px-6 lg:px-10">
        <p className="kicker text-gold-soft reveal">
          <span className="kicker-mark" />
          Our mission
        </p>
        <p className="reveal mt-8 font-display text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.08] tracking-tightest max-w-5xl">
          Our mission is to create a bridge between international medical education and clinical excellence in Armenia by offering meaningful educational experiences that inspire future healthcare professionals.
        </p>
        <div className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#apply" className="btn-on-dark btn-lg">Begin your application</a>
          <a href="#faq" className="text-base text-bone/75 underline underline-offset-4 decoration-bone/30 hover:text-bone hover:decoration-bone/60">
            Read the FAQ →
          </a>
        </div>
      </div>
    </section>
  )
}
