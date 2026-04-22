import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Wordmark } from '#/components/Wordmark'
import { Footer } from '#/components/Footer'
import {
  getWaitlistPreferences,
  updateWaitlistPreferences,
  type SdkLanguage,
  type WaitlistPreferences,
  type WaitlistPreferencesRecord,
} from '#/lib/api'
import { seo } from '#/lib/seo'

type BooleanPrefKey =
  | 'wants_milestones'
  | 'wants_releases'
  | 'wants_essays'
  | 'wants_security'
  | 'wants_insider'

const waitlistCategories: Array<{ key: BooleanPrefKey; label: string; hint: string }> = [
  { key: 'wants_milestones', label: 'Major milestones', hint: 'Big moments — infrequent.' },
  { key: 'wants_releases', label: 'Code releases', hint: 'When new versions ship.' },
  { key: 'wants_essays', label: 'Essays & deep dives', hint: 'Longer-form writing, roughly monthly.' },
  { key: 'wants_security', label: 'Security advisories', hint: 'If you run the daemon.' },
  { key: 'wants_insider', label: 'Insider cohort invitations', hint: 'Early access, reserved for engaged supporters.' },
]

const sdkLanguageOptions: Array<{ key: SdkLanguage; label: string }> = [
  { key: 'php', label: 'PHP' },
  { key: 'js', label: 'JavaScript / TypeScript' },
  { key: 'python', label: 'Python' },
  { key: 'rust', label: 'Rust' },
  { key: 'dotnet', label: '.NET / C#' },
  { key: 'go', label: 'Go' },
]

export const Route = createFileRoute('/_marketing/waitlist/confirmed')({
  head: () => {
    const s = seo({
      title: "You're in — Daemon8",
      description: "You're on the Daemon8 newsletter. Pick which updates you want to hear about.",
      path: '/waitlist/confirmed',
    })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  validateSearch: (search: Record<string, unknown>) => ({
    status: typeof search.status === 'string' ? search.status : undefined,
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  component: WaitlistConfirmedPage,
})

interface EditState {
  wants_milestones: boolean
  wants_releases: boolean
  wants_essays: boolean
  wants_security: boolean
  wants_insider: boolean
  sdk_language_scope: 'all' | 'specific' | null
  sdk_languages: SdkLanguage[]
}

function toEditState(record: WaitlistPreferencesRecord): EditState {
  return {
    wants_milestones: record.wants_milestones ?? false,
    wants_releases: record.wants_releases ?? false,
    wants_essays: record.wants_essays ?? false,
    wants_security: record.wants_security ?? false,
    wants_insider: record.wants_insider ?? false,
    sdk_language_scope: (record.sdk_language_scope as 'all' | 'specific' | null) ?? null,
    sdk_languages: (record.sdk_languages as SdkLanguage[]) ?? [],
  }
}

function WaitlistConfirmedPage() {
  const { status, token } = useSearch({ from: '/_marketing/waitlist/confirmed' })
  const invalid = status === 'invalid'

  const [email, setEmail] = useState<string | null>(null)
  const [state, setState] = useState<EditState | null>(null)
  const [loading, setLoading] = useState(!!token)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  useEffect(() => () => abortRef.current?.abort(), [])

  useEffect(() => {
    if (!token || invalid) return
    let cancelled = false
    getWaitlistPreferences(token)
      .then((record) => {
        if (cancelled) return
        setEmail(record.email)
        setState(toEditState(record))
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message)
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [token, invalid])

  function toggleRelease(on: boolean) {
    setState((prev) =>
      prev
        ? {
            ...prev,
            wants_releases: on,
            sdk_language_scope: on ? (prev.sdk_language_scope ?? 'all') : null,
            sdk_languages: on ? prev.sdk_languages : [],
          }
        : prev,
    )
  }

  function toggleLanguage(lang: SdkLanguage, checked: boolean) {
    setState((prev) =>
      prev
        ? {
            ...prev,
            sdk_languages: checked
              ? Array.from(new Set([...prev.sdk_languages, lang]))
              : prev.sdk_languages.filter((l) => l !== lang),
          }
        : prev,
    )
  }

  const specificButEmpty =
    state !== null &&
    state.wants_releases &&
    state.sdk_language_scope === 'specific' &&
    state.sdk_languages.length === 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!state || !token) return
    if (specificButEmpty) {
      setError('Pick at least one language, or choose All.')
      return
    }
    setError(null)
    setSaving(true)

    const controller = new AbortController()
    abortRef.current = controller

    const payload: WaitlistPreferences = {
      wants_milestones: state.wants_milestones,
      wants_releases: state.wants_releases,
      wants_essays: state.wants_essays,
      wants_security: state.wants_security,
      wants_insider: state.wants_insider,
      sdk_language_scope: state.wants_releases ? state.sdk_language_scope : null,
      sdk_languages:
        state.wants_releases && state.sdk_language_scope === 'specific'
          ? state.sdk_languages
          : [],
    }

    try {
      await updateWaitlistPreferences(token, payload, controller.signal)
      setSaved(true)
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      abortRef.current = null
      setSaving(false)
    }
  }

  return (
    <div>
      <section className="px-4 pt-20 md:pt-16 pb-12">
        <div className="mx-auto max-w-[760px]">
          <Wordmark size="lg" />
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-[13px] text-d8-text-muted hover:text-d8-text tracking-[0.02em] transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to the landing
          </Link>

          {invalid && (
            <>
              <h1 className="mt-8 text-[clamp(1.35rem,4.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-d8-text">
                That link didn&rsquo;t work.
              </h1>
              <p className="mt-5 text-[15px] md:text-[17px] text-d8-text-muted leading-relaxed">
                It may have expired or been used already. Subscribe again from the
                landing page and a fresh confirmation link will arrive in your inbox.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-d8-primary text-d8-bg rounded-[4px] text-[14px] tracking-[0.02em] hover:opacity-90 transition-opacity duration-200"
                style={{ fontWeight: 600 }}
              >
                Back home
              </Link>
            </>
          )}

          {!invalid && !token && (
            <>
              <h1 className="mt-8 text-[clamp(1.35rem,4.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-d8-text">
                You&rsquo;re on the list.
              </h1>
              <p className="mt-5 text-[15px] md:text-[17px] text-d8-text-muted leading-relaxed">
                Your email is confirmed. You&rsquo;ll hear from me about the categories you pick &mdash;
                nothing else. Every email carries an unsubscribe link for each category, so you can
                narrow or leave the list any time.
              </p>
            </>
          )}

          {!invalid && token && (
            <>
              <h1 className="mt-8 text-[clamp(1.35rem,4.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-d8-text">
                You&rsquo;re on the list.
              </h1>
              {email && (
                <p className="mt-3 text-[14px] text-d8-text-muted">
                  Signed in as <span className="text-d8-text">{email}</span>.
                </p>
              )}

              {loading && (
                <p className="mt-8 text-[14px] text-d8-text-muted">Loading your preferences...</p>
              )}

              {!loading && error && !state && (
                <div className="mt-8 p-5 border border-d8-border rounded-[8px] bg-d8-surface-1">
                  <p className="text-[15px] text-d8-text">{error}</p>
                  <Link
                    to="/"
                    className="mt-5 inline-flex items-center justify-center px-5 py-2.5 bg-d8-primary text-d8-bg rounded-[4px] text-[14px] tracking-[0.02em] hover:opacity-90 transition-opacity duration-200"
                    style={{ fontWeight: 600 }}
                  >
                    Back home
                  </Link>
                </div>
              )}

              {state && saved && (
                <div className="mt-8 p-5 border border-d8-border rounded-[8px] bg-d8-surface-1">
                  <p className="text-[15px] text-d8-text">Preferences saved.</p>
                  <p className="mt-2 text-[13px] text-d8-text-muted">
                    You can close this tab. The next email will reflect your updated preferences.
                  </p>
                </div>
              )}

              {state && !saved && (
                <form onSubmit={handleSubmit} className="mt-8 max-w-[560px]">
                  <p className="text-[15px] md:text-[17px] text-d8-text-muted leading-relaxed mb-6">
                    Pick which updates you want to hear about. You can change your mind any time.
                  </p>
                  <fieldset>
                    <legend
                      className="text-[12px] tracking-[0.05em] text-d8-text-muted mb-3"
                      style={{ fontWeight: 500 }}
                    >
                      UPDATES YOU WANT TO HEAR ABOUT
                    </legend>
                    <div className="space-y-2.5">
                      {waitlistCategories.map((item) => (
                        <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={state[item.key]}
                            onChange={(e) => {
                              if (item.key === 'wants_releases') {
                                toggleRelease(e.target.checked)
                              } else {
                                setState((prev) => (prev ? { ...prev, [item.key]: e.target.checked } : prev))
                              }
                            }}
                            className="mt-1 accent-d8-primary"
                          />
                          <span className="text-[14px] leading-relaxed">
                            <span className="text-d8-text group-hover:text-d8-primary transition-colors duration-200">
                              {item.label}
                            </span>
                            <span className="text-d8-text-muted">{' — '}{item.hint}</span>
                          </span>
                        </label>
                      ))}
                    </div>

                    {state.wants_releases && (
                      <div className="mt-5 ml-7 pl-4 border-l border-d8-border space-y-3">
                        <p
                          className="text-[12px] tracking-[0.05em] text-d8-text-muted"
                          style={{ fontWeight: 500 }}
                        >
                          FOR WHICH LANGUAGES?
                        </p>
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="sdk-scope"
                              value="all"
                              checked={state.sdk_language_scope === 'all'}
                              onChange={() =>
                                setState((prev) =>
                                  prev ? { ...prev, sdk_language_scope: 'all', sdk_languages: [] } : prev,
                                )
                              }
                              className="accent-d8-primary"
                            />
                            <span className="text-[14px] text-d8-text">All languages</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="sdk-scope"
                              value="specific"
                              checked={state.sdk_language_scope === 'specific'}
                              onChange={() =>
                                setState((prev) =>
                                  prev ? { ...prev, sdk_language_scope: 'specific' } : prev,
                                )
                              }
                              className="accent-d8-primary"
                            />
                            <span className="text-[14px] text-d8-text">Specific languages</span>
                          </label>
                        </div>

                        {state.sdk_language_scope === 'specific' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {sdkLanguageOptions.map((lang) => (
                              <label key={lang.key} className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={state.sdk_languages.includes(lang.key)}
                                  onChange={(e) => toggleLanguage(lang.key, e.target.checked)}
                                  className="accent-d8-primary"
                                />
                                <span className="text-[14px] text-d8-text">{lang.label}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </fieldset>

                  {error && (
                    <p className="mt-4 text-[14px] text-d8-error" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={saving || specificButEmpty}
                      className="inline-flex items-center justify-center px-6 py-3 bg-d8-primary text-d8-bg rounded-[4px] text-[14px] tracking-[0.02em] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                      style={{ fontWeight: 600 }}
                    >
                      {saving ? 'Saving...' : 'Save preferences'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
