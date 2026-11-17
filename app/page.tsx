import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, brandsQuery, siteSettingsQuery, latestPostsQuery } from '@/sanity/lib/queries'
import { HomePage } from '@/components/home-page'
import { SITE_URL, withSettingsFallback } from '@/lib/site-config'

const HOME_TITLE = 'Synergeek | Digital Marketing Agency in Coimbatore'
const HOME_DESCRIPTION =
  'Digital marketing agency in Coimbatore for websites, mobile apps, video production, SEO and social media ads. Get a free growth consultation from Synergeek.'

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: SITE_URL },
  twitter: { title: HOME_TITLE, description: HOME_DESCRIPTION },
}

const DEFAULT_MISSION =
  'To be the creative engine behind brands that refuse to be ignored — turning ideas, content, and ads into measurable growth.'
const DEFAULT_VISION =
  'A world where every business has a creative team that makes it impossible to scroll past.'

export default async function HomePageRoute() {
  const [
    { data: services },
    { data: brands },
    { data: settings },
    { data: latestPosts },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: brandsQuery, tags: ['brands'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
    sanityFetch({ query: latestPostsQuery, tags: ['posts'] }),
  ])

  const resolvedSettings = withSettingsFallback(settings)

  return (
    <HomePage
      services={services ?? []}
      brands={brands ?? []}
      latestPosts={latestPosts ?? []}
      settings={{
        ...resolvedSettings,
        mission: resolvedSettings.mission || DEFAULT_MISSION,
        vision: resolvedSettings.vision || DEFAULT_VISION,
      }}
    />
  )
}
