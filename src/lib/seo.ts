import { brandAssets } from '#/lib/brandAssets'

type SeoOptions = {
  title: string
  description?: string
  path?: string
  image?: string
}

const SITE_NAME = 'Daemon8'
const SITE_URL = 'https://daemon8.ai'
const DEFAULT_DESCRIPTION = 'The admin layer for AI agents. Observe. Act. Coordinate.'
const DEFAULT_IMAGE = brandAssets.ogImagePng

export function seo({ title, description, path, image }: SeoOptions) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const desc = description ?? DEFAULT_DESCRIPTION
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL
  const ogImage = image ?? DEFAULT_IMAGE

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}` },
    ],
    links: [
      { rel: 'canonical', href: canonical },
    ],
  }
}
