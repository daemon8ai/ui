import { createFileRoute } from '@tanstack/react-router'
import { HomepagePage } from '#/components/HomepagePage'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/_marketing/')({
  head: () => {
    const s = seo({
      title: 'Daemon8',
      description: 'Runtime I/O for AI agents. Daemon8 is a new layer underneath the tools your AI agents already use — going open source. Join the waitlist.',
      path: '/',
    })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: HomepagePage,
})
