export type NavIcon = 'github' | 'mail'

export type NavItem =
  | { label: string; kind: 'internal'; to: string; icon?: NavIcon }
  | { label: string; kind: 'anchor'; href: string; icon?: NavIcon }
  | { label: string; kind: 'external'; href: string; icon?: NavIcon }

/**
 * Primary nav surface (StickyHeader). Filters out links to the current page
 * and scopes Contact to the homepage only (it's a section anchor, not a route).
 * GitHub is always shown as a quick link to the repo.
 */
export function getPrimaryNavItems(pathname: string): NavItem[] {
  const items: NavItem[] = []
  if (pathname !== '/') items.push({ label: 'Home', kind: 'internal', to: '/' })
  if (!pathname.startsWith('/docs')) items.push({ label: 'Docs', kind: 'internal', to: '/docs' })
  if (pathname === '/') items.push({ label: 'Contact', kind: 'anchor', href: '#contact' })
  items.push({
    label: 'GitHub',
    kind: 'external',
    href: 'https://github.com/daemon8ai/daemon8',
    icon: 'github',
  })
  items.push({
    label: 'Email',
    kind: 'external',
    href: 'mailto:mail@daemon8.ai',
    icon: 'mail',
  })
  return items
}

/**
 * Footer nav surface. Exhaustive by design, but still filters out links to
 * the current page to avoid self-referential nav items.
 */
export function getFooterNavItems(pathname: string): NavItem[] {
  const items: NavItem[] = []
  if (pathname !== '/') items.push({ label: 'Home', kind: 'internal', to: '/' })
  if (!pathname.startsWith('/docs')) items.push({ label: 'Docs', kind: 'internal', to: '/docs' })
  items.push({ label: 'Contact', kind: 'anchor', href: '/#contact' })
  items.push({ label: 'GitHub', kind: 'external', href: 'https://github.com/daemon8ai/daemon8' })
  items.push({ label: 'Email', kind: 'external', href: 'mailto:mail@daemon8.ai' })
  if (pathname !== '/privacy') items.push({ label: 'Privacy', kind: 'internal', to: '/privacy' })
  if (pathname !== '/terms') items.push({ label: 'Terms', kind: 'internal', to: '/terms' })
  return items
}
