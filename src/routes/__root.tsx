import { useEffect, useRef } from 'react'
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import appCss from '#/styles/app.css?url'
import { jsonLd, organizationSchema, webSiteSchema, softwareSourceCodeSchema } from '#/lib/structured-data'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0B1120' },
      { name: 'description', content: 'Runtime I/O for AI agents. One local stream for browser, device, and application runtime — queryable from the terminal your agents already use.' },
      { property: 'og:site_name', content: 'Daemon8' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://daemon8.ai/og-image-v2.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://daemon8.ai/og-image-v2.png' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jsonLd(organizationSchema()) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jsonLd(webSiteSchema()) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jsonLd(softwareSourceCodeSchema()) as any,
      { title: 'Daemon8 — Runtime I/O for AI agents' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootShell,
  component: RootLayout,
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script src="https://cdn.usefathom.com/script.js" data-site="SRTWCJTE" data-auto="false" defer />
      </head>
      <body className="bg-d8-bg text-d8-text font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isFirstRender = useRef(true)

  useEffect(() => {
    // On first render: check ?ref= query param, then document.referrer, then nothing.
    // On SPA route changes: check ?ref= only — document.referrer reflects within-site
    // navigation at that point and isn't useful.
    const queryRef = new URLSearchParams(window.location.search).get('ref') || undefined
    const referrer = queryRef ?? (isFirstRender.current ? document.referrer || undefined : undefined)

    isFirstRender.current = false

    const fathom = (window as { fathom?: { trackPageview: (opts?: { referrer?: string }) => void } }).fathom
    if (referrer) {
      fathom?.trackPageview({ referrer })
    } else {
      fathom?.trackPageview()
    }
  }, [pathname])

  return <Outlet />
}
