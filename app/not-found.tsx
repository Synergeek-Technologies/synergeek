import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const SUGGESTED_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Our services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact us' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="text-primary font-semibold tracking-widest">404</p>
      <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tighter">This page moved or never existed.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Looking for a website, app, video or marketing partner in Coimbatore? Start here:
      </p>
      <nav aria-label="Suggested pages" className="mt-10 flex flex-wrap justify-center gap-4">
        {SUGGESTED_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-primary hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
