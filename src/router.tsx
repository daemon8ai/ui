import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 30_000,
    defaultNotFoundComponent: () => (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-[28px] text-d8-text tracking-[-0.02em] mb-3">Page not found</h1>
          <a href="/" className="text-d8-primary hover:opacity-80 transition-opacity text-[14px]">
            &larr; Back to daemon8.ai
          </a>
        </div>
      </div>
    ),
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
