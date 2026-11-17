import { describe, expect, test } from "vitest"
import {
  BUSINESS,
  BUSINESS_ID,
  GBP_URL,
  SITE_URL,
  buildBusinessSchema,
  buildFaqSchema,
  buildWebsiteSchema,
  formattedAddress,
  toTelHref,
  withSettingsFallback,
} from "./site-config"

describe("withSettingsFallback", () => {
  test("fills every NAP field when Sanity returns nothing", () => {
    const settings = withSettingsFallback(null)

    expect(settings.orgName).toBe(BUSINESS.name)
    expect(settings.contactEmail).toBe(BUSINESS.email)
    expect(settings.phone1).toBe(BUSINESS.phones[0])
    expect(settings.phone2).toBe(BUSINESS.phones[1])
    expect(settings.address).toBe(formattedAddress())
    expect(settings.instagramUrl).toBe(BUSINESS.instagramUrl)
  })

  test("treats empty and whitespace-only strings as missing", () => {
    const settings = withSettingsFallback({ contactEmail: "", phone1: "   ", address: null })

    expect(settings.contactEmail).toBe(BUSINESS.email)
    expect(settings.phone1).toBe(BUSINESS.phones[0])
    expect(settings.address).toBe(formattedAddress())
  })

  test("keeps real Sanity values over fallbacks without mutating the input", () => {
    const input = { orgName: "Synergeek Studio", mission: "Grow brands" }
    const snapshot = { ...input }

    const settings = withSettingsFallback(input)

    expect(settings.orgName).toBe("Synergeek Studio")
    expect(settings.mission).toBe("Grow brands")
    expect(input).toEqual(snapshot)
  })
})

describe("toTelHref", () => {
  test("strips spaces and punctuation but keeps the leading plus", () => {
    expect(toTelHref("+91 96777-41597")).toBe("tel:+919677741597")
  })
})

describe("buildBusinessSchema", () => {
  const schema = buildBusinessSchema()

  test("is a LocalBusiness subtype with a stable @id", () => {
    expect(schema["@type"]).toBe("ProfessionalService")
    expect(schema["@id"]).toBe(BUSINESS_ID)
    expect(schema["@id"].startsWith(SITE_URL)).toBe(true)
  })

  test("has a complete Coimbatore postal address and E.164-style phone", () => {
    expect(schema.address).toMatchObject({
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641002",
      addressCountry: "IN",
    })
    expect(schema.telephone).toMatch(/^\+91\d{10}$/)
  })

  test("matches the Google Business Profile street spelling exactly", () => {
    expect(schema.address.streetAddress).toBe("182, Subramaniam Road, R S Puram")
  })

  test("publishes Mon–Sat 09:30–18:30 opening hours and no Sunday hours", () => {
    expect(schema.openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ])
  })

  test("links the Google Business Profile in sameAs", () => {
    expect(schema.sameAs).toContain(GBP_URL)
    expect(schema.sameAs).toContain(BUSINESS.instagramUrl)
  })

  test("serves Coimbatore first and marks Tamil Nadu as a State", () => {
    expect(schema.areaServed[0]).toEqual({ "@type": "City", name: "Coimbatore" })
    expect(schema.areaServed.find((area) => area.name === "Tamil Nadu")?.["@type"]).toBe("State")
  })
})

describe("buildWebsiteSchema", () => {
  test("references the business as publisher by @id", () => {
    expect(buildWebsiteSchema().publisher).toEqual({ "@id": BUSINESS_ID })
  })
})

describe("buildFaqSchema", () => {
  test("maps every question and answer into FAQPage entities", () => {
    const schema = buildFaqSchema([
      { question: "Where are you?", answer: "RS Puram, Coimbatore." },
      { question: "Do you build apps?", answer: "Yes." },
    ])

    expect(schema["@type"]).toBe("FAQPage")
    expect(schema.mainEntity).toHaveLength(2)
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Where are you?",
      acceptedAnswer: { "@type": "Answer", text: "RS Puram, Coimbatore." },
    })
  })
})
