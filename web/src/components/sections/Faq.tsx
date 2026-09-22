import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQS } from "@/data/faq"

export function Faq() {
  return (
    <section id="faq" className="bg-paper py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            FAQ
          </p>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tightest">
              Questions, answered.
            </h2>
          </div>
        </header>

        <div className="reveal mt-12 mx-auto max-w-3xl border-t border-ink/15">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                {/* forceMount keeps every answer in the DOM for crawlers; CSS hides closed panels. */}
                <AccordionContent forceMount>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
