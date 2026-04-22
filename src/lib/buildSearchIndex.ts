import MiniSearch from 'minisearch'
import { allDocs } from 'content-collections'

export type SearchEntry = {
  id: string
  sectionId: string
  pageSlug: string
  pageTitle: string
  title: string
  text: string
}

export function buildSearchIndex(): MiniSearch<SearchEntry> {
  const pageEntries: SearchEntry[] = allDocs.map((doc) => ({
    id: doc.slug,
    sectionId: '',
    pageSlug: doc.slug,
    pageTitle: doc.title,
    title: doc.title,
    text: doc.description,
  }))

  const sectionEntries: SearchEntry[] = allDocs.flatMap((doc) =>
    doc.searchSections.map((section) => ({
      id: `${doc.slug}#${section.id}`,
      sectionId: section.id,
      pageSlug: doc.slug,
      pageTitle: doc.title,
      title: section.title,
      text: section.text,
    })),
  )

  const entries: SearchEntry[] = [...pageEntries, ...sectionEntries]

  const index = new MiniSearch<SearchEntry>({
    idField: 'id',
    fields: ['title', 'text', 'pageTitle'],
    storeFields: ['sectionId', 'pageSlug', 'pageTitle', 'title', 'text'],
    searchOptions: {
      boost: { title: 3, pageTitle: 1.5, text: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
  })

  index.addAll(entries)
  return index
}
