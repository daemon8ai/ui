import { createFileRoute } from '@tanstack/react-router'
import { HomepagePage } from '#/components/HomepagePage'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/_marketing/')({
  head: () => {
    const s = seo({
      title: 'Daemon8',
      description: 'The admin layer for AI agents. Observe. Act. Coordinate.',
      path: '/',
    })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: HomepagePage,
})
