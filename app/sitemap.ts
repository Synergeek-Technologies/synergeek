import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SITE_URL } from '@/lib/site-config'

// Bump when a static page's content meaningfully changes, so lastmod stays truthful.
const STATIC_PAGES_UPDATED = new Date('2026-11-17')

const STATIC_ROUTES: ReadonlyArray<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; date: string; updatedAt: string }[]>(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, date, "updatedAt": _updatedAt }`
    )
    blogEntries = (posts ?? []).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog posts from Sanity', error)
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: STATIC_PAGES_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticEntries, ...blogEntries]
}
