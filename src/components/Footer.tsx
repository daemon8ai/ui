import { Link, useRouterState } from '@tanstack/react-router'
import { getFooterNavItems, type NavItem } from '#/lib/navItems'

export function Footer() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const items = getFooterNavItems(pathname)

  return (
    <footer className="border-t border-d8-border py-10 px-4 relative">
      <div className="absolute inset-0 bg-d8-surface-1/20" />
      <div className="mx-auto max-w-[960px] flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <nav className="flex flex-wrap justify-center gap-6 text-[13px] text-d8-text-muted tracking-[0.05em]">
          {items.map((item) => (
            <FooterLink key={item.label} item={item} />
          ))}
        </nav>
        <p className="text-[13px] text-d8-text-muted tracking-[0.05em]">&copy; 2026 Havy.tech LLC</p>
      </div>
    </footer>
  )
}

function FooterLink({ item }: { item: NavItem }) {
  const className = 'hover:text-d8-text transition-colors duration-200'
  if (item.kind === 'internal') {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    )
  }
  if (item.kind === 'anchor') {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    )
  }
  const isMailto = item.href.startsWith('mailto:')
  return (
    <a
      href={item.href}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noopener noreferrer'}
      className={className}
    >
      {item.label}
    </a>
  )
}
