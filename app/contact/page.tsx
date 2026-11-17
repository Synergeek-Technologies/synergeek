import { sanityFetch } from '@/sanity/lib/live'
import { withSettingsFallback } from '@/lib/site-config'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactPage } from '@/components/contact-page'


export default async function ContactPageRoute() {
  const { data: settings } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })

  return (
    <ContactPage
      settings={withSettingsFallback(settings)}
    />
  )
}
