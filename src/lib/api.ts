// Laravel backend base URL.
// - Local dev: set to "http://localhost:8977" because frontend (:3000) and
//   backend (:8977) are different origins.
// - Production: empty. Caddy proxies /api/* to Laravel on the same origin.
const API_BASE = process.env.LARAVEL_API_URL ?? ''
const SITE_URL = process.env.SITE_URL ?? ''

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: SITE_URL,
      ...init?.headers,
    },
  })
}

export type SdkLanguage = 'php' | 'js' | 'python' | 'rust' | 'dotnet' | 'go'
export type SdkLanguageScope = 'all' | 'specific' | null

export interface WaitlistPreferences {
  wants_milestones?: boolean
  wants_releases?: boolean
  wants_essays?: boolean
  wants_security?: boolean
  wants_insider?: boolean
  sdk_language_scope?: SdkLanguageScope
  sdk_languages?: SdkLanguage[]
}

export async function subscribeToWaitlist(
  email: string,
  platform: string = 'oss-launch',
  signal?: AbortSignal,
): Promise<{ ok: true }> {
  const res = await apiFetch('/api/waitlist', {
    method: 'POST',
    body: JSON.stringify({ email, platform }),
    signal,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? data.message ?? 'Could not join the waitlist. Try again in a moment.')
  }
  return res.json()
}

export interface WaitlistPreferencesRecord extends Required<WaitlistPreferences> {
  email: string
}

export async function getWaitlistPreferences(token: string): Promise<WaitlistPreferencesRecord> {
  const res = await apiFetch(`/api/waitlist/preferences?token=${encodeURIComponent(token)}`)
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Could not load preferences. The link may have expired.')
  }
  return res.json()
}

export async function updateWaitlistPreferences(
  token: string,
  preferences: WaitlistPreferences,
  signal?: AbortSignal,
): Promise<{ ok: true }> {
  const res = await apiFetch('/api/waitlist/preferences', {
    method: 'POST',
    body: JSON.stringify({ token, ...preferences }),
    signal,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Could not save your preferences. Try again in a moment.')
  }
  return res.json()
}

export type ContactReason = 'bug' | 'question' | 'feedback' | 'other'

export interface ContactSubmissionPayload {
  reason: ContactReason
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

export async function submitContact(
  payload: ContactSubmissionPayload,
  signal?: AbortSignal,
): Promise<{ ok: true }> {
  const res = await apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
    signal,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? data.message ?? 'Could not send your message. Try again in a moment.')
  }
  return res.json()
}

export { API_BASE, SITE_URL }
