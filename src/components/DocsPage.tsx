import { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Menu, Search, X } from 'lucide-react'
import { Wordmark } from './Wordmark'
import { allDocs } from 'content-collections'
import { MDXContent } from '@content-collections/mdx/react'
import { DOCS_GROUPS, type DocsGroup } from '#/content/groups'
import { mdxComponents } from './MdxComponents'
import { DocsSearch } from './DocsSearch'

type DocsParams = {
  slug?: string
}

type Doc = (typeof allDocs)[number]

const DOCS_PAGES: Doc[] = [...allDocs].sort((a, b) => a.order - b.order)
const DOCS_PAGE_BY_SLUG = Object.fromEntries(DOCS_PAGES.map((p) => [p.slug, p]))

function groupPages(group: DocsGroup): Doc[] {
  return DOCS_PAGES.filter((page) => page.group === group.id)
}

function DocsLanding() {
  const groupsWithPages = DOCS_GROUPS.map((group) => ({
    group,
    pages: groupPages(group),
  })).filter(({ pages }) => pages.length > 0)

  return (
    <>
      <h1 className="text-[28px] md:text-[36px] font-sans text-d8-text tracking-[-0.02em] mb-2">
        Daemon8 Documentation
      </h1>
      <p className="text-[18px] md:text-[20px] font-sans text-d8-text-muted tracking-[-0.01em] mb-8">
        Unified I/O for AI Agents.
      </p>

      <blockquote className="mb-7 border-l-2 border-d8-primary/50 pl-4 md:pl-5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-d8-primary mb-2" style={{ fontWeight: 500 }}>
          Defined Term
        </p>
        <p className="text-[16px] md:text-[18px] text-d8-text mb-2" style={{ fontWeight: 500 }}>
          Relay Tax
        </p>
        <p className="text-[14px] text-d8-text-muted leading-relaxed">
          The time cost of locating, gathering, and carrying runtime output — logs, network
          traffic, browser console, device output — from where it lives to where it is needed.
          Paid by the human every time a tool boundary, session boundary, or format mismatch
          gets in the way.
        </p>
      </blockquote>

      <p className="text-[15px] text-d8-text-muted leading-relaxed mb-4">
        Daemon8 is a local daemon. Output from browsers, applications, and devices flows
        into one durable, queryable stream on your machine. Agents connect through MCP and
        read from that stream directly. Nothing leaves the machine unless you choose to
        expose it.
      </p>
      <p className="text-[15px] text-d8-text-muted leading-relaxed mb-4">
        The model is simple: every piece of useful runtime output — a console error, a
        network request, a failed query, an agent finding — is an observation. Observations
        land in one stream. The stream is local. The relay tax stops being the default.
      </p>
      <p className="text-[15px] text-d8-text-muted leading-relaxed mb-10">
        Free gives you the full query layer: observe, filter, checkpoint, subscribe, and
        ingest from any tool or language. Pro adds the command layer: act through connected
        browsers and devices in response to what the stream shows you. Start with Free.
        The model proves itself quickly.
      </p>

      <p className="text-[12px] text-d8-text-muted/70 leading-relaxed mb-10 italic">
        A tip of the hat to the Philotic Web in the Enderverse.
      </p>

      <div className="space-y-3">
        {groupsWithPages.map(({ group, pages }) => {
          const firstPage = pages[0]
          return (
            <Link
              key={group.id}
              to="/docs/$slug"
              params={{ slug: firstPage.slug }}
              className="block rounded-[8px] border border-d8-border bg-d8-surface-1 px-4 py-4 hover:border-d8-border-bright transition-colors duration-200"
            >
              <p
                className="text-[11px] uppercase tracking-[0.12em] text-d8-primary mb-2"
                style={{ fontWeight: 500 }}
              >
                {group.label}
              </p>
              <p className="text-[13px] text-d8-text-muted leading-relaxed">
                {group.summary}
              </p>
              <p className="text-[12px] text-d8-text-muted/70 leading-relaxed mt-3">
                {pages.length} {pages.length === 1 ? 'page' : 'pages'} in this section. Starts with{' '}
                <span className="text-d8-text">{firstPage.title}</span>.
              </p>
            </Link>
          )
        })}
      </div>
    </>
  )
}

function DocsNotFound() {
  return (
    <div className="py-16">
      <h1 className="text-[28px] font-sans text-d8-text tracking-[-0.02em] mb-3">
        Docs page not found
      </h1>
      <p className="text-[15px] text-d8-text-muted leading-relaxed">
        That page could not be found. Choose another page from the docs.
      </p>
    </div>
  )
}

export function DocsPage() {
  const params = useParams({ strict: false }) as DocsParams
  const slug = params.slug
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const page = slug ? DOCS_PAGE_BY_SLUG[slug] : undefined
  const activeIndex = page ? DOCS_PAGES.findIndex((entry) => entry.slug === page.slug) : -1
  const prev = activeIndex > 0 ? DOCS_PAGES[activeIndex - 1] : null
  const next =
    activeIndex >= 0 && activeIndex < DOCS_PAGES.length - 1
      ? DOCS_PAGES[activeIndex + 1]
      : null

  const groupedPages = useMemo(
    () =>
      DOCS_GROUPS.map((group) => ({
        group,
        pages: DOCS_PAGES.filter((entry) => entry.group === group.id),
      })),
    [],
  )

  return (
    <div className="min-h-screen">
      <header className="border-b border-d8-border h-16 flex items-center sticky top-0 bg-d8-bg/95 backdrop-blur-[4px] z-40">
        <div className="mx-auto max-w-[1040px] w-full flex items-center px-4">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="md:hidden text-d8-text-muted shrink-0"
              aria-label="Toggle docs navigation"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="shrink-0">
              <span className="md:hidden"><Wordmark size="sm" /></span>
              <span className="hidden md:inline"><Wordmark size="md" /></span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-[13px] text-d8-text-muted hover:text-d8-text transition-colors duration-200 border border-d8-border rounded-[6px] px-3 py-1.5"
              aria-label="Search documentation"
            >
              <Search size={13} />
              <span>Search</span>
              <kbd className="text-[11px] text-d8-text-muted/60 ml-1">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center justify-end gap-5 ml-auto">
            <a
              href="/#contact"
              className="hidden md:inline text-[13px] text-d8-text-muted hover:text-d8-text transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="https://github.com/daemon8ai/daemon8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-[13px] text-d8-text-muted hover:text-d8-text transition-colors duration-200"
            >
              GitHub
            </a>
            <Link
              to="/"
              className="text-[13px] text-d8-text-muted hover:text-d8-text transition-colors duration-200"
            >
              &larr; daemon8.ai
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1040px] md:flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-40 bg-d8-bg/70 backdrop-blur-[4px] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={[
            'border-r border-d8-border p-4 overflow-y-auto',
            'md:block md:w-[250px] md:shrink-0 md:sticky md:top-16 md:h-[calc(100vh-64px)]',
            sidebarOpen
              ? 'fixed top-16 left-0 z-50 w-[280px] h-[calc(100vh-64px)] bg-d8-bg'
              : 'hidden',
          ].join(' ')}
        >
          <p
            className="text-[12px] text-d8-text-muted tracking-[0.05em] mb-3"
            style={{ fontWeight: 500 }}
          >
            DOCUMENTATION
          </p>
          <nav className="space-y-5">
            <Link
              to="/docs"
              onClick={() => setSidebarOpen(false)}
              className={`block px-3 py-1.5 rounded-[4px] text-[13px] transition-colors duration-200 ${
                !slug
                  ? 'bg-d8-surface-2 text-d8-primary'
                  : 'text-d8-text-muted hover:text-d8-text'
              }`}
            >
              Docs Home
            </Link>
            {groupedPages.map(({ group, pages }) => (
              <div key={group.id}>
                <p
                  className="px-3 mb-2 text-[10px] uppercase text-d8-text-muted/70 tracking-[0.12em]"
                  style={{ fontWeight: 500 }}
                >
                  {group.label}
                </p>
                <div className="space-y-1 border-l border-d8-border/70 ml-3 pl-3">
                  {pages.map((entry) => (
                    <Link
                      key={entry.slug}
                      to="/docs/$slug"
                      params={{ slug: entry.slug }}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-3 py-2 rounded-[6px] text-[13px] leading-relaxed transition-colors duration-200 ${
                        slug === entry.slug
                          ? 'bg-d8-surface-2 text-d8-primary'
                          : 'text-d8-text hover:bg-d8-surface-1 hover:text-d8-primary'
                      }`}
                    >
                      {entry.navLabel}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="w-full flex-1 min-w-0 px-4 md:px-8 py-8">
          <div className="mx-auto max-w-[760px] md:max-w-none">
            <p className="text-[12px] text-d8-text-muted mb-6">
              <Link
                to="/docs"
                className="hover:text-d8-text transition-colors duration-200"
              >
                Docs
              </Link>
              {page ? (
                <>
                  <span className="mx-1.5">/</span>
                  <span>{page.title}</span>
                </>
              ) : null}
            </p>

            {!slug ? (
              <DocsLanding />
            ) : page ? (
              <>
                <h1 className="text-[28px] md:text-[36px] font-sans text-d8-text tracking-[-0.02em] mb-2">
                  {page.title}
                </h1>
                <MDXContent code={page.body} components={mdxComponents} />
              </>
            ) : (
              <DocsNotFound />
            )}

            {page ? (
              <div className="grid gap-3 md:grid-cols-2 mt-12 pt-6 border-t border-d8-border">
                {prev ? (
                  <Link
                    to="/docs/$slug"
                    params={{ slug: prev.slug }}
                    className="block rounded-[8px] border border-d8-border bg-d8-surface-1 px-4 py-4 hover:border-d8-border-bright transition-colors duration-200"
                  >
                    <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-d8-text-muted mb-1">
                      <ChevronLeft size={14} /> Previous
                    </p>
                    <p className="text-[15px] text-d8-text" style={{ fontWeight: 500 }}>
                      {prev.navLabel}
                    </p>
                    <p className="text-[13px] text-d8-text-muted leading-relaxed mt-1">
                      {prev.description}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden md:block" />
                )}
                {next ? (
                  <Link
                    to="/docs/$slug"
                    params={{ slug: next.slug }}
                    className="block rounded-[8px] border border-d8-border bg-d8-surface-1 px-4 py-4 hover:border-d8-border-bright transition-colors duration-200 text-left"
                  >
                    <p className="flex items-center justify-end gap-1 text-[11px] uppercase tracking-[0.12em] text-d8-primary mb-1">
                      Next Up <ChevronRight size={14} />
                    </p>
                    <p
                      className="text-[15px] text-d8-text text-right"
                      style={{ fontWeight: 500 }}
                    >
                      {next.navLabel}
                    </p>
                    <p className="text-[13px] text-d8-text-muted leading-relaxed mt-1 text-right">
                      {next.description}
                    </p>
                  </Link>
                ) : (
                  <span className="hidden md:block" />
                )}
              </div>
            ) : null}
          </div>
        </main>
      </div>

      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
