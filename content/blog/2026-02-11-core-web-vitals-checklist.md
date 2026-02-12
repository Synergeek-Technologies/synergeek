---
title: "What makes a website fast in 2026: a Core Web Vitals checklist"
date: "2026-02-11"
excerpt: "A practical Core Web Vitals checklist for 2026: what to measure (LCP, INP, CLS) and the engineering moves that reliably improve real-user performance."
---

Speed in 2026 isn’t “my page loads in 2 seconds on Wi‑Fi.” It’s **how fast your site feels for real users**, across devices, networks, and interactions. Google’s Core Web Vitals remain the most widely adopted *user-centric* performance bar because they map to what people notice:

- **LCP (Largest Contentful Paint):** how quickly the main content appears.
- **INP (Interaction to Next Paint):** how responsive the page feels when users tap/click/type.
- **CLS (Cumulative Layout Shift):** how stable the layout stays while loading.

Below is a technical, shippable checklist teams can use to make CWV improvements that actually show up in production.

## 0) Start with the right data (or you’ll optimize the wrong thing)

- **Instrument Real User Monitoring (RUM)** for CWV (field data). Lab tests are great for debugging, but field data decides rankings and conversions.
- Track CWV per **template + route** (home, listing, PDP, blog, checkout), and segment by **device class** and **network**.
- Define targets (common industry goals):
  - LCP: **≤ 2.5s** (p75)
  - INP: **≤ 200ms** (p75)
  - CLS: **≤ 0.1** (p75)

## 1) LCP checklist (make the “hero” appear sooner)

**Goal:** reduce time-to-first-meaningful content for the majority of users.

- **Lower TTFB first.** LCP often can’t be great if your backend is slow.
  - Use CDN/edge caching for HTML where possible.
  - Cache API responses and precompute expensive pages.
  - Keep TLS, redirects, and server middleware lean.
- **Make the LCP element cheap.** Identify it (usually hero image, H1 block, or banner).
  - Serve responsive images (AVIF/WebP), correct sizes, and compression.
  - Preload the LCP image *only* when it is truly above the fold.
  - Avoid CSS that blocks rendering (large, unscoped bundles).
- **Trim render-blocking work.**
  - Inline critical CSS for above-the-fold where appropriate.
  - Defer non-critical scripts; remove unused CSS/JS.
  - Avoid heavy client-side work before first paint (over-hydration).

## 2) INP checklist (make interactions feel instant)

INP is the 2026 “make or break” metric for app-like sites because it captures responsiveness during real interactions.

- **Reduce main-thread JavaScript.**
  - Code-split aggressively; ship less JS on initial routes.
  - Prefer server-rendered/streamed HTML over client-only rendering.
  - Replace large UI libraries on critical pages if they dominate bundles.
- **Kill long tasks.**
  - Break up work with scheduling (e.g., `requestIdleCallback`, `scheduler.postTask`, or chunked computation).
  - Move expensive logic off the main thread (Web Workers) when it’s CPU-heavy.
- **Be ruthless with third-party scripts.**
  - Audit tags: analytics, chat widgets, A/B testing, ads.
  - Load after interaction-ready, or behind user intent (e.g., load chat only after opening).
- **Optimize event handling.**
  - Keep handlers small; avoid synchronous layout reads/writes in hot paths.
  - Use `passive` listeners for scroll/touch where appropriate.

## 3) CLS checklist (stop the page from jumping)

- **Always reserve space.**
  - Set width/height (or aspect ratio) for images, video, and embeds.
  - Use skeletons/placeholders that match final dimensions.
- **Fonts without layout shift.**
  - Self-host critical fonts, preload selectively, and use `font-display: swap` with good fallbacks.
  - Match fallback metrics (size/line-height) to reduce reflow.
- **Avoid inserting content above existing content.**
  - Banners, cookie notices, and promo bars should overlay or reserve space from the start.

## 4) “Not CWV, but still performance” checks that move the needle

- **Caching strategy:** immutable assets with content hashes, long cache headers, and CDN.
- **Network efficiency:** HTTP/2 or HTTP/3, keep request counts down, preconnect only where justified.
- **Image discipline:** no oversized hero images, lazy-load below the fold, and avoid background images for critical visuals.
- **Streaming/partial rendering:** prioritize rendering the visible shell and primary content first.

## 5) A practical weekly workflow

1. Pick one route with high traffic and poor p75 CWV.
2. Identify the LCP element and top long tasks.
3. Ship one LCP improvement and one INP improvement.
4. Validate in lab, then confirm in RUM after rollout.

The fast websites in 2026 aren’t the ones with the most “performance tips” — they’re the ones with **tight budgets, disciplined measurement, and fewer things on the main thread**. If you treat Core Web Vitals as a weekly engineering habit, speed becomes a compounding advantage.
