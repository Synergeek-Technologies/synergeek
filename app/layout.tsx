import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed, Instrument_Serif } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { SanityLive } from "@/sanity/lib/live"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { StructuredData } from "@/components/structured-data"
import { SITE_URL, buildBusinessSchema, buildWebsiteSchema } from "@/lib/site-config"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument-serif" })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

const DEFAULT_TITLE = "Synergeek | Digital Marketing Agency in Coimbatore"
const DEFAULT_DESCRIPTION =
  "Synergeek is a digital marketing agency in Coimbatore building websites, mobile apps, videos, SEO and social media campaigns that turn attention into customers."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Synergeek"
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Synergeek", url: "https://www.synergeek.in" }],
  creator: "Synergeek",
  publisher: "Synergeek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Synergeek',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/synergeek-og.png',
        width: 1600,
        height: 900,
        alt: 'Synergeek — Digital Marketing Agency in Coimbatore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/synergeek-og.png'],
  },
  alternates: {
    canonical: 'https://www.synergeek.in',
    types: {
      'application/rss+xml': 'https://www.synergeek.in/feed.xml',
    },
  },
  category: 'Marketing & Advertising',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/synergeek-og.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="cfhzzbdcpl610u3v3qsdk9pzox2vss" />
        {/* Sitewide business + website JSON-LD — referenced by @id from page-level schema */}
        <StructuredData data={buildBusinessSchema()} id="business-schema" />
        <StructuredData data={buildWebsiteSchema()} id="website-schema" />
        {/* Google Analytics & Google Ads Conversion ID: AW-16812402326 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3078JXHG0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3078JXHG0');
            gtag('config', 'AW-16812402326/ftygCI3tsdYbEJbN49A-', {
              'phone_conversion_number': '9677741597'
            });
            gtag('config', 'AW-16812402326');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased ${robotoCondensed.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
        <Navigation />
        {children}
        <Toaster />
        {isDraftMode && <VisualEditing />}
        <SanityLive />
      </body>
    </html>
  )
}
