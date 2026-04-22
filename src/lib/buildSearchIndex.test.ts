import { describe, it, expect, beforeAll } from 'vitest'
import MiniSearch from 'minisearch'
import { buildSearchIndex, type SearchEntry } from './buildSearchIndex'

let index: MiniSearch<SearchEntry>

beforeAll(() => {
  index = buildSearchIndex()
})

describe('search index', () => {
  it('indexes docs — documentCount > 0 (canary: extraction plugin running)', () => {
    expect(index.documentCount).toBeGreaterThan(0)
  })

  it('returns results for "mcp"', () => {
    const results = index.search('mcp')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.pageSlug === 'mcp-tools')).toBe(true)
  })

  it('returns results for "browser"', () => {
    const results = index.search('browser')
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns results for "install"', () => {
    const results = index.search('install')
    expect(results.length).toBeGreaterThan(0)
  })

  it('prefix search — "brow" matches browser content', () => {
    const results = index.search('brow')
    expect(results.length).toBeGreaterThan(0)
  })

  it('fuzzy search — "configration" matches configuration content', () => {
    // fuzzy:0.2 on a 12-char term = floor(12*0.2)=2 edit distance — catches one missing letter
    const results = index.search('configration')
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns empty for nonsense query', () => {
    const results = index.search('xyzzynotaword')
    expect(results.length).toBe(0)
  })

  it('search text contains no raw JSX component syntax', () => {
    const results = index.search('setup')
    expect(results.length).toBeGreaterThan(0)
    for (const r of results) {
      expect(r.text).not.toMatch(/<[A-Z]/)
    }
  })

  it('each result has required fields', () => {
    const results = index.search('daemon')
    expect(results.length).toBeGreaterThan(0)
    for (const r of results) {
      expect(r).toHaveProperty('pageSlug')
      expect(r).toHaveProperty('pageTitle')
      expect(r).toHaveProperty('title')
      expect(r).toHaveProperty('sectionId')
    }
  })
})
