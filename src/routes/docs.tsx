import { createFileRoute } from '@tanstack/react-router'
import { DocsPage } from '#/components/DocsPage'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/docs')({
  head: () => {
    const s = seo({
      title: 'Documentation',
      description: 'Install, configure, and get the most out of Daemon8.',
      path: '/docs',
    })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: DocsPage,
})
