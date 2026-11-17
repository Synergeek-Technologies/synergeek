/**
 * GA4 lead events. Names must match the key events configured in the
 * Google Analytics property (Admin → Events → Key events).
 */
export const LEAD_EVENTS = {
  formSubmit: "generate_lead",
  phoneClick: "click_to_call",
  emailClick: "click_email",
} as const

export type LeadEvent = (typeof LEAD_EVENTS)[keyof typeof LEAD_EVENTS]

type Gtag = (command: "event", eventName: string, params?: Record<string, unknown>) => void

/**
 * Send a GA4 event if gtag is loaded. Never throws: analytics must not break the UI
 * (gtag loads lazily and is blocked by many ad blockers).
 */
export function trackEvent(eventName: LeadEvent, params: Record<string, unknown> = {}): boolean {
  if (typeof window === "undefined") return false
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== "function") return false

  try {
    gtag("event", eventName, params)
    return true
  } catch (error) {
    console.warn(`[analytics] failed to send ${eventName}`, error)
    return false
  }
}
