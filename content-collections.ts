import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { toString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import { z } from 'zod'
import type { Root, Heading, Paragraph, List, Blockquote } from 'mdast'

type TocEntry = { id: string; title: string }
type SearchSection = { id: string; title: string; text: string }

function extractSections(content: string): { toc: TocEntry[]; sections: SearchSection[] } {
  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(content) as Root
  const slugger = new GithubSlugger()
  const toc: TocEntry[] = []
  const sections: SearchSection[] = []
  let current: SearchSection | null = null

  for (const node of tree.children) {
    if (node.type === 'heading' && (node as Heading).depth === 2) {
      if (current) sections.push(current)
      const title = toString(node as Heading)
      const id = slugger.slug(title)
      toc.push({ id, title })
      current = { id, title, text: '' }
    } else if (current && (node.type === 'paragraph' || node.type === 'list' || node.type === 'blockquote')) {
      const text = toString(node as Paragraph | List | Blockquote).trim()
      if (text) current.text += (current.text ? ' ' : '') + text
    }
  }

  if (current) sections.push(current)
  return { toc, sections }
}

const docs = defineCollection({
  name: 'docs',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    navLabel: z.string(),
    group: z.enum(['start-here', 'user-guide', 'reference']),
    description: z.string(),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const { toc, sections } = extractSections(doc.content)

    const body = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'prepend', properties: { ariaLabel: 'Link to section' } }],
      ],
    })

    return {
      ...doc,
      slug: doc._meta.path,
      body,
      toc,
      searchSections: sections,
    }
  },
})

export default defineConfig({
  content: [docs],
})
