export const WHATSAPP_NUMBER = "37477338333"
export const WHATSAPP_MESSAGE = "Hi MedBridge — I'd like to learn more about the program."
export const isWhatsAppPlaceholder = /[xX]/.test(WHATSAPP_NUMBER)
export const whatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const CONTACT_EMAIL = "info@medbridge.am"
export const CONTACT_PHONE_DISPLAY = "+374 77 33 83 33"
export const CONTACT_PHONE_E164 = "+37477338333"
export const CONTACT_ADDRESS_LINE = "13 Khanjyan str."
export const CONTACT_CITY_COUNTRY = "Yerevan, Armenia"

// Google Apps Script Web App URL that receives application submissions and
// fans them out to the team Sheet, email, and (optionally) Telegram.
// Provided at build time via VITE_FORM_ENDPOINT (see web/.env.example,
// doc/setup-form-backend.md, and the GitHub Pages workflow).
// When empty, the Apply form falls back to opening the user's email client.
export const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT ?? "").trim()
export const isFormEndpointConfigured = FORM_ENDPOINT.length > 0
