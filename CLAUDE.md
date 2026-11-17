# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Synergeek company website — a Next.js 16 App Router site deployed on Netlify. Marketing/services site with a Sanity CMS-driven blog.

## Commands

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run lint             # ESLint (note: eslint is not currently in devDependencies)
npm test                 # Vitest unit tests (lib/**/*.test.ts)
npm start                # Run production build locally
```

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript
- **TailwindCSS v4** (PostCSS-based, not tailwind.config.js)
- **shadcn/ui** (new-york style, neutral base color, CSS variables) — 59 components in `components/ui/`
- **Framer Motion** for scroll-based animations
- **React Hook Form + Zod** for form validation
- **EmailJS** for contact form submission (no backend API routes)
- **Sanity CMS** (next-sanity) for blog posts, services, brands and site settings; Studio at `/studio`

## Architecture

### Routing

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | Client component | Hero with Framer Motion scroll animations |
| `/blog` | Server component | Blog listing |
| `/blog/[slug]` | Static (SSG via `generateStaticParams`) | Sanity Portable Text posts |
| `/services` | Server component | Services showcase |
| `/contact` | Client component | EmailJS-powered form |

### Key Directories

- `app/` — Next.js App Router pages and layouts
- `components/ui/` — shadcn/ui components (managed by shadcn CLI, avoid manual edits)
- `lib/site-config.ts` — Business NAP, SEO constants, sitewide JSON-LD builders (`ProfessionalService` with `@id`), Sanity settings fallback
- `lib/clients.ts` — Client portfolio (logo strip, testimonials, services client list). Only add `images`/`testimonial` with real work and approved quotes
- `components/site-footer.tsx` — Shared footer used by home, services and contact
- `lib/emailjs-config.ts` — EmailJS service/template IDs

### Conventions

- **Path alias**: `@/*` maps to project root
- **File naming**: kebab-case for files, PascalCase for component exports
- **Theme**: OKLch color system with CSS variables in `globals.css`, dark-only theme
- **Fonts**: Space Grotesk (body), Bebas Neue (condensed headers), Roboto Condensed (variable)
- **SEO**: Metadata defined per-page, JSON-LD structured data via `components/structured-data.tsx`

### Build Notes

- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and allows remote images from `cdn.sanity.io`
- Netlify deploys from `.next` via `@netlify/plugin-nextjs`
- Google Analytics (GA-F3078JXHG0) and Facebook domain verification are in root layout
- Local builds need `NEXT_PUBLIC_SANITY_PROJECT_ID` (and `NEXT_PUBLIC_SANITY_DATASET`, default `production`); Netlify has them set
- Install with `npm ci --legacy-peer-deps` (vaul peer-dep conflict with React 19)
- Legacy Feb–Mar 2026 markdown blog URLs are 308-redirected to `/blog` in `next.config.mjs`
