import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Command } from 'cmdk'
import * as Dialog from '@radix-ui/react-dialog'
import { allDocs } from 'content-collections'
import { buildSearchIndex, type SearchEntry } from '#/lib/buildSearchIndex'

type SearchResult = SearchEntry & { score: number }

const DOCS_PAGES = [...allDocs].sort((a, b) => a.order - b.order)

const QUICK_LINK_SLUGS = ['quickstart', 'connect-your-ai-tool', 'mcp-tools', 'http-ingest', 'issue-command']

const GROUP_LABEL: Record<string, string> = {
  'start-here': 'Start Here',
  'user-guide': 'User Guide',
  reference: 'Reference',
}

export function DocsSearch({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const index = useMemo(() => buildSearchIndex(), [])

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return []
    return index.search(query) as unknown as SearchResult[]
  }, [index, query])

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>()
    for (const result of results) {
      const key = result.pageSlug
      const group = map.get(key) ?? []
      group.push(result)
      map.set(key, group)
    }
    return map
  }, [results])

  const quickLinks = useMemo(() => {
    const bySlug = Object.fromEntries(DOCS_PAGES.map((p) => [p.slug, p]))
    return QUICK_LINK_SLUGS.flatMap((slug) => (bySlug[slug] ? [bySlug[slug]] : []))
  }, [])

  const referencePages = useMemo(
    () => DOCS_PAGES.filter((p) => p.group === 'reference' && !QUICK_LINK_SLUGS.includes(p.slug)),
    [],
  )

  if (!mounted) return null

  function handleSelectResult(result: SearchResult) {
    onOpenChange(false)
    setQuery('')
    void navigate({
      to: '/docs/$slug',
      params: { slug: result.pageSlug },
      hash: result.sectionId || undefined,
    })
  }

  function handleSelectPage(slug: string) {
    onOpenChange(false)
    setQuery('')
    void navigate({ to: '/docs/$slug', params: { slug } })
  }

  function handleSelectDocsHome() {
    onOpenChange(false)
    setQuery('')
    void navigate({ to: '/docs' })
  }

  const isIdle = !query.trim()

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) setQuery('')
      }}
      shouldFilter={false}
      label="Search documentation"
      className="docs-search-dialog"
    >
      <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
      <div className="docs-search-panel">
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search docs..."
          className="docs-search-input"
        />
        <Command.List className="docs-search-list">
          {!isIdle && results.length === 0 && (
            <Command.Empty className="docs-search-empty">No results found.</Command.Empty>
          )}

          {isIdle && (
            <>
              <Command.Group heading="Quick Links" className="docs-search-group">
                <Command.Item
                  value="docs-home"
                  onSelect={handleSelectDocsHome}
                  className="docs-search-item"
                >
                  <div className="docs-search-item-body">
                    <span className="docs-search-item-title">Docs Home</span>
                  </div>
                </Command.Item>
                {quickLinks.map((page) => (
                  <Command.Item
                    key={page.slug}
                    value={page.slug}
                    onSelect={() => handleSelectPage(page.slug)}
                    className="docs-search-item"
                  >
                    <div className="docs-search-item-body">
                      <span className="docs-search-item-title">{page.navLabel}</span>
                    </div>
                    <span className="docs-search-item-badge">{GROUP_LABEL[page.group]}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Reference" className="docs-search-group">
                {referencePages.map((page) => (
                  <Command.Item
                    key={page.slug}
                    value={page.slug}
                    onSelect={() => handleSelectPage(page.slug)}
                    className="docs-search-item"
                  >
                    <div className="docs-search-item-body">
                      <span className="docs-search-item-title">{page.navLabel}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            </>
          )}

          {!isIdle &&
            [...grouped.entries()].map(([pageSlug, pageResults]) => (
              <Command.Group
                key={pageSlug}
                heading={pageResults[0].pageTitle}
                className="docs-search-group"
              >
                {pageResults.map((result) => (
                  <Command.Item
                    key={result.id}
                    value={result.id}
                    onSelect={() => handleSelectResult(result)}
                    className="docs-search-item"
                  >
                    <div className="docs-search-item-body">
                      <span className="docs-search-item-title">{result.title}</span>
                      {result.text && (
                        <span className="docs-search-item-excerpt">
                          {result.text.slice(0, 90)}
                          {result.text.length > 90 ? '...' : ''}
                        </span>
                      )}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
        </Command.List>

        <div className="docs-search-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </Command.Dialog>
  )
}
