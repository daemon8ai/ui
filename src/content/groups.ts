export type DocsGroupId = 'start-here' | 'user-guide' | 'reference'

export type DocsGroup = {
  id: DocsGroupId
  label: string
  summary: string
}

export const DOCS_GROUPS: DocsGroup[] = [
  {
    id: 'start-here',
    label: 'Start Here',
    summary: 'Learn the model, the shift away from scattered logging, and the product split.',
  },
  {
    id: 'user-guide',
    label: 'User Guide',
    summary: 'Put the stream to work in real workflows across tools, browsers, apps, and agents.',
  },
  {
    id: 'reference',
    label: 'Reference',
    summary: 'Look up the exact commands, settings, endpoints, and MCP tool surfaces.',
  },
]
