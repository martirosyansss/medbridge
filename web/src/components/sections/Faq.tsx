import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQS = [
  {
    q: "Who is eligible to apply?",
    a: "Our programmes are open to medical students in years 1–6, international healthcare trainees, young physicians and residents. Pre-med students are eligible for selected observational shadowing programmes. Advanced medical students may be eligible for supervised hands-on exposure in selected surgeries, depending on specialty, experience and hospital approval.",
  },
  {
    q: "Is the programme purely observational, or hands-on?",
    a: "For most participants the programme is observational — observation of up to 5 surgeries weekly, detailed surgeon explanations, post-operative discussions, clinical rounds and exposure to OR protocols. For advanced and qualified participants, selected programmes may include supervised hands-on clinical experience during selected procedures, strictly depending on academic level, qualifications, hospital approval and local regulations.",
  },
  {
    q: "What language is the programme in?",
    a: "The MedBridge programme is conducted in English. Astghik's physicians are internationally trained and collaborate with clinics across Europe, Russia and the United States — English is the working language for international participants.",
  },
  {
    q: "How long is each programme and when can I arrive?",
    a: "Programmes run for one, two or three weeks. Longer durations are available on request. All participants arrive on Saturday; the rotation begins the following Monday.",
  },
  {
    q: "Do I need a visa for Armenia?",
    a: "Citizens of EU member states, the UK, the US, Canada, Australia and most Schengen-area countries can enter Armenia visa-free for stays of up to 180 days. We'll send detailed entry guidance with your acceptance letter.",
  },
  {
    q: "What's included in the programme fee?",
    a: "The clinical programme, accommodation near the hospital, airport transfers, medical screening on arrival, cultural excursions, a certificate of completion, a recommendation letter and visa assistance are included. Additional services are available for an additional fee. You'll receive a personalised quote after you apply.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Every participant who completes a programme at Astghik Medical Center receives an official certificate of completion, signed by the hospital, listing the rotation length, specialties observed and supervising physicians.",
  },
  {
    q: "How do I apply?",
    a: "Submit the application form on this page. A member of the MedBridge team reviews each application personally and replies within two business days with availability, a personalised quote and the next steps. No payment is required at the application stage.",
  },
  {
    q: "What is your refund and cancellation policy?",
    a: "Cancellations 30 or more days before your programme start date receive a full refund. Cancellations 14 to 30 days before the start date receive a 50% refund. Cancellations less than 14 days before the start date are non-refundable, except where required by Armenian law. You can also reschedule your start date once at no charge, subject to availability, if requested at least 14 days ahead. If your Armenian visa application is denied, send us the official decision and we will refund the full programme fee.",
  },
  {
    q: "Do you provide travel and medical insurance?",
    a: "Comprehensive travel and medical insurance is required for participation, but MedBridge does not provide it directly. We're happy to recommend trusted international brokers that past participants have used. You're free to use any provider as long as the policy covers the full programme duration and your country of origin.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="bg-paper py-section">
      <div className="mx-auto max-w-content px-container">
        <header className="reveal grid gap-6 lg:grid-cols-12">
          <p className="kicker text-claret lg:col-span-3">
            <span className="kicker-mark" />
            10 — FAQ
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
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
