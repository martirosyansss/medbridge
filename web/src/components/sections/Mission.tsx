import { Photo } from "@/components/Photo"

export function Mission() {
  return (
    <section id="mission" className="relative bg-claret py-28 text-bone lg:py-36 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Photo
          src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=2200&auto=format&fit=crop&q=72"
          srcSet="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&auto=format&fit=crop&q=70 1200w, https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=2200&auto=format&fit=crop&q=72 2200w"
          sizes="100vw"
          alt=""
          className="mission-photo"
          fallbackClass="photo-fallback-or"
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
          To create a bridge between international medical education and clinical excellence in Armenia — by offering meaningful educational experiences that inspire future healthcare professionals.
        </p>
        <div className="reveal mt-12 flex flex-wrap items-center gap-6">
          <a href="#apply" className="btn-on-dark btn-lg">Begin your application</a>
          <a href="#faq" className="text-sm uppercase tracking-[0.2em] text-bone/75 hover:text-bone">Read the FAQ →</a>
        </div>
      </div>
    </section>
  )
}
