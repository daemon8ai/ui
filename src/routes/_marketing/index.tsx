import { createFileRoute } from '@tanstack/react-router'
import { HomepagePage } from '#/components/HomepagePage'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/_marketing/')({
  head: () => {
    const s = seo({
      title: 'Daemon8',
      description: 'Unified I/O for AI Agents. See browser console/network, adb, and app logs in one place.',
      path: '/',
    })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: HomepagePage,
})
