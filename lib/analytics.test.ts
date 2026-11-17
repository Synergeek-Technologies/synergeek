import { afterEach, describe, expect, test, vi } from "vitest"
import { LEAD_EVENTS, trackEvent } from "./analytics"

const globalWithWindow = globalThis as unknown as { window?: unknown }

afterEach(() => {
  delete globalWithWindow.window
  vi.restoreAllMocks()
})

describe("trackEvent", () => {
  test("returns false on the server where window is undefined", () => {
    expect(trackEvent(LEAD_EVENTS.formSubmit)).toBe(false)
  })

  test("returns false when gtag has not loaded (lazy load or ad blocker)", () => {
    globalWithWindow.window = {}
    expect(trackEvent(LEAD_EVENTS.phoneClick)).toBe(false)
  })

  test("sends the GA4 event with params when gtag is available", () => {
    const gtag = vi.fn()
    globalWithWindow.window = { gtag }

    const sent = trackEvent(LEAD_EVENTS.formSubmit, { form_name: "contact" })

    expect(sent).toBe(true)
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form_name: "contact" })
  })

  test("swallows gtag errors so analytics never breaks the UI", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {})
    globalWithWindow.window = {
      gtag: () => {
        throw new Error("blocked")
      },
    }

    expect(trackEvent(LEAD_EVENTS.emailClick)).toBe(false)
    expect(console.warn).toHaveBeenCalled()
  })
})
