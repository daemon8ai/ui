import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Wordmark } from './Wordmark'
import { Menu, X, Github, Mail } from 'lucide-react'
import { getPrimaryNavItems, type NavItem } from '#/lib/navItems'

export function StickyHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const items = getPrimaryNavItems(pathname)

  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-d8-bg/70 backdrop-blur-[8px] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-d8-border bg-d8-bg/90 backdrop-blur-[6px] transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-[960px] px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/"><Wordmark size="sm" /></Link>
            <nav className="hidden md:flex items-center gap-6">
              {items.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-d8-text-muted hover:text-d8-text transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 md:hidden border-b border-d8-border bg-d8-bg/95 backdrop-blur-[6px]">
          <div className="px-5 py-5 flex flex-col gap-4">
            {items.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onNavigate={() => setMenuOpen(false)}
                mobile
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function NavLink({
  item,
  onNavigate,
  mobile = false,
}: {
  item: NavItem
  onNavigate?: () => void
  mobile?: boolean
}) {
  const className = mobile
    ? 'inline-flex items-center gap-2 text-[15px] text-d8-text-muted hover:text-d8-text transition-colors duration-200'
    : 'inline-flex items-center gap-1.5 text-[14px] text-d8-text-muted hover:text-d8-text tracking-[0.02em] transition-colors duration-200'

  const label = item.icon === 'github' ? (
    <>
      <Github size={mobile ? 16 : 15} />
      <span className={mobile ? '' : 'sr-only md:not-sr-only'}>{item.label}</span>
    </>
  ) : item.icon === 'mail' ? (
    <>
      <Mail size={mobile ? 16 : 15} />
      <span className={mobile ? '' : 'sr-only md:not-sr-only'}>{item.label}</span>
    </>
  ) : (
    item.label
  )

  if (item.kind === 'internal') {
    return (
      <Link to={item.to} onClick={onNavigate} className={className}>
        {label}
      </Link>
    )
  }
  if (item.kind === 'anchor') {
    return (
      <a href={item.href} onClick={onNavigate} className={className}>
        {label}
      </a>
    )
  }
  const isMailto = item.href.startsWith('mailto:')
  return (
    <a
      href={item.href}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noopener noreferrer'}
      onClick={onNavigate}
      className={className}
      aria-label={
        item.icon === 'mail'
          ? `Email ${item.label.toLowerCase() === 'email' ? item.href.replace('mailto:', '') : item.label}`
          : item.icon === 'github'
            ? `${item.label} (opens in new tab)`
            : undefined
      }
    >
      {label}
    </a>
  )
}
