import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { ServicesPage } from '@/components/services-page'


export default async function ServicesPageRoute() {
  const [
    { data: services },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  const serviceItems = (services ?? []).map((s: any) => ({
    title: s.title,
    description: s.description ?? '',
    section: s.section ?? '',
  }))

  return (
    <ServicesPage
      services={serviceItems}
      settings={settings ?? {
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
        orgName: 'Synergeek',
        companyDescription: 'A creative marketing agency that turns content, ads, and social into customers — every day.',
      }}
    />
  )
}
