import { brandAssets } from '#/lib/brandAssets'

const SITE_URL = 'https://daemon8.ai'
const SITE_NAME = 'Daemon8'
const REPO_URL = 'https://github.com/daemon8ai/daemon8'
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`
const DEFAULT_DESCRIPTION = 'The admin layer for AI agents. Observe. Act. Coordinate.'

export function jsonLd(schema: Record<string, unknown>) {
  return { 'script:ld+json': { '@context': 'https://schema.org', ...schema } }
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}${brandAssets.faviconSvg}` },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'mail@daemon8.ai',
      contactType: 'technical support',
    },
  }
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function softwareSourceCodeSchema() {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${SITE_URL}/#software`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    codeRepository: REPO_URL,
    programmingLanguage: 'Rust',
    license: LICENSE_URL,
    url: SITE_URL,
    author: { '@id': `${SITE_URL}/#organization` },
  }
}
