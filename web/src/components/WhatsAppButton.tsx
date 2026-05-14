// TODO: replace the placeholder below with the real WhatsApp business line.
// Format: country code + digits, no spaces or symbols. Example: "37491123456".
// Keep at least one literal "X" while the number is unset — the component
// refuses to render with any "X" in the value, so a placeholder cannot ship.
const WHATSAPP_NUMBER = "374XXXXXXXX"
const WHATSAPP_MESSAGE = "Hi MedBridge — I'd like to learn more about the program."

const isPlaceholder = /[xX]/.test(WHATSAPP_NUMBER)

export function WhatsAppButton() {
  if (isPlaceholder) {
    // Refuse to render with a placeholder number so the live site never
    // ships a broken or zero-routed WhatsApp link.
    return null
  }

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.55-1.71a12.74 12.74 0 0 0 6.25 1.6h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.69-12.81-12.69Zm0 23.27a10.43 10.43 0 0 1-5.32-1.46l-.38-.22-3.88 1.02 1.04-3.78-.25-.39A10.46 10.46 0 0 1 5.62 16c0-5.73 4.66-10.4 10.4-10.4s10.4 4.66 10.4 10.4-4.67 10.4-10.42 10.4Zm5.71-7.78c-.31-.16-1.86-.92-2.14-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.69.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.76.33 1.35.53 1.81.67.76.24 1.45.21 2 .13.61-.09 1.86-.76 2.12-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37Z" />
      </svg>
    </a>
  )
}
