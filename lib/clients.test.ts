import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import { clientHref, clients, getClient, hasStory } from "./clients"

const PUBLIC_DIR = join(__dirname, "..", "public")

describe("clients data", () => {
  test("slugs are unique", () => {
    const slugs = clients.map((client) => client.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test("every logo and work image exists in /public", () => {
    const assets = clients.flatMap((client) => [client.logo, ...(client.images ?? [])])
    const missing = assets.filter((asset) => !existsSync(join(PUBLIC_DIR, asset)))
    expect(missing).toEqual([])
  })

  test("every client has a public link", () => {
    expect(clients.filter((client) => clientHref(client) === "#")).toEqual([])
  })

  test("Crucifer AI is listed without placeholder testimonial or work images", () => {
    const crucifer = clients.find((client) => client.slug === "crucifer-ai")

    expect(crucifer).toBeDefined()
    expect(crucifer?.testimonial).toBeUndefined()
    expect(crucifer?.images).toBeUndefined()
    expect(hasStory(crucifer!)).toBe(false)
    expect(clientHref(crucifer!)).toBe("https://www.linkedin.com/company/cruciferai/")
  })
})

describe("clientHref", () => {
  test("falls back to Instagram when no url is set", () => {
    expect(clientHref(getClient("dentiq"))).toBe("https://www.instagram.com/dentiq_erode/")
  })
})

describe("getClient", () => {
  test("returns showcase clients with images and a testimonial", () => {
    const client = getClient("velvette-martini")
    expect(client.images).toHaveLength(2)
    expect(client.testimonial.quote.length).toBeGreaterThan(0)
  })

  test("throws for clients without a story instead of returning undefined", () => {
    expect(() => getClient("crucifer-ai")).toThrow(/not a showcase client/)
    expect(() => getClient("does-not-exist")).toThrow()
  })
})
