import { createFileRoute, notFound } from '@tanstack/react-router'
import { BrandingPage } from '#/components/BrandingPage'

export const Route = createFileRoute('/_marketing/branding')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] }),
  loader: () => {
    if (process.env.NODE_ENV !== 'development') throw notFound()
  },
  component: BrandingPage,
})
