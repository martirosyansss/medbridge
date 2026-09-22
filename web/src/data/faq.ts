import { PROGRAM, REFUND, SCREENING, STATS } from "@/data/site"

export type FaqItem = { q: string; a: string }

/**
 * FAQ content. Rendered in the FAQ accordion (all answers stay in the DOM via
 * forceMount) and serialised to FAQPage JSON-LD at prerender time so the same
 * text reaches crawlers that do not execute JavaScript.
 */
export const FAQS: FaqItem[] = [
  {
    q: "Who is eligible to apply?",
    a: "MedBridge is open to medical students in years 1 to 6, international healthcare trainees, residents and young physicians. Pre-med students are eligible for selected observational programs. Advanced medical students may be eligible for supervised hands-on exposure in selected surgeries, depending on specialty, experience and hospital approval.",
  },
  {
    q: "Is MedBridge a degree program?",
    a: "No. MedBridge is a short clinical observership, not an MBBS, MD or any other degree program. You keep your enrolment at your home institution and receive a certificate of completion and a recommendation letter from the supervising physicians at Astghik Medical Center.",
  },
  {
    q: "Is the program observational or hands-on?",
    a: `For most participants the program is observational: observation of up to ${STATS.surgeriesPerDayMax} surgeries daily, detailed surgeon explanations, post-operative discussions, clinical rounds and exposure to operating-room protocols. For advanced and qualified participants, selected programs may include supervised hands-on clinical experience during selected procedures, strictly depending on academic level, qualifications, hospital approval and local regulations.`,
  },
  {
    q: "What language is the program in?",
    a: "The MedBridge program is conducted in English. Astghik's physicians are internationally trained and collaborate with clinics across Europe, Russia and the United States, and English is the working language for international participants inside the hospital.",
  },
  {
    q: "How long is each program and when can I arrive?",
    a: `Programs run for one, two or three weeks, with longer durations available on request. All participants arrive on ${PROGRAM.arrivalDay} and the rotation begins the following ${PROGRAM.startDay}. Intake is rolling, year-round.`,
  },
  {
    q: "Do I need a visa for Armenia?",
    a: "Citizens of EU member states, the United Kingdom, the United States, Canada and Australia, among others, can enter Armenia visa-free for up to 180 days within any 365-day period. If your passport requires a visa, we issue an official invitation letter and send detailed entry guidance with your acceptance letter.",
  },
  {
    q: "What is included in the program fee, and what is not?",
    a: `Included: the clinical program, accommodation near the hospital, airport transfers, pre-arrival health-screening review, cultural excursions, a certificate of completion, a recommendation letter and visa assistance. Not included: flights, travel and medical insurance (which is required), bank transfer fees and the pre-arrival laboratory tests. You receive an itemised quote, valid for ${PROGRAM.quoteValidityDays} days, after you apply.`,
  },
  {
    q: "Which health documents do I need before arrival?",
    a: `Every participant submits laboratory results for HIV 1/2 antigen/antibody, hepatitis B surface antigen, hepatitis B surface antibody (${SCREENING.antiHbsThreshold}), hepatitis B core antibody, hepatitis C antibody and syphilis, dated within the last ${SCREENING.validityMonths} months, as PDFs no later than ${SCREENING.deadlineDaysBeforeArrival} days before arrival. Proof of routine immunisations, including MMR, and tuberculosis screening where indicated, is also required under our terms.`,
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Every participant who completes a program at Astghik Medical Center receives an official certificate of completion, signed by the hospital, listing the rotation length, specialties observed and supervising physicians.",
  },
  {
    q: "How do I apply?",
    a: `Submit the application form on this page. A member of the MedBridge team reviews each application personally and replies within ${PROGRAM.responseTime} with availability, an itemised quote and the next steps. No payment is required at the application stage.`,
  },
  {
    q: "What is your refund and cancellation policy?",
    a: `Cancellations ${REFUND.fullRefundDays} or more days before your start date receive a full refund of the program fee (bank transfer fees excluded). Cancellations ${REFUND.halfRefundFrom} to ${REFUND.halfRefundTo} days before the start date receive a 50% refund. Cancellations less than ${REFUND.halfRefundFrom} days before the start date are non-refundable, except where required by law. You can reschedule your start date once at no charge, subject to availability, if requested at least ${REFUND.rescheduleNoticeDays} days ahead. If your Armenian visa application is refused, send us the official decision and we refund the full program fee.`,
  },
  {
    q: "Do you provide travel and medical insurance?",
    a: "Comprehensive travel and medical insurance is required for participation, but MedBridge does not sell it. We can recommend international brokers that past participants have used. Any provider is acceptable as long as the policy covers the full program duration and clinical placement abroad.",
  },
]
