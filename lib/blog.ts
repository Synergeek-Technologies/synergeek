import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type BlogPostMeta = {
  slug: string
  title: string
  date: string // ISO (YYYY-MM-DD)
  excerpt: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid or missing frontmatter field: ${field}`)
  }
  return value
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs()

  const posts = slugs.map((slug) => {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`)
    const file = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(file)

    return {
      slug,
      title: assertString(data.title, "title"),
      date: assertString(data.date, "date"),
      excerpt: assertString(data.excerpt, "excerpt"),
    }
  })

  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return posts
}

export function getPostBySlug(slug: string): { meta: BlogPostMeta; content: string } {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`)
  const file = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(file)

  const meta: BlogPostMeta = {
    slug,
    title: assertString(data.title, "title"),
    date: assertString(data.date, "date"),
    excerpt: assertString(data.excerpt, "excerpt"),
  }

  return { meta, content }
}
