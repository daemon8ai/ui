import { useEffect, useRef, useState } from 'react'
import { subscribeToWaitlist } from '#/lib/api'

export function WaitlistForm({ source = 'oss-launch' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  useEffect(() => () => abortRef.current?.abort(), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setError(null)
    setSubmitting(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await subscribeToWaitlist(email, source, controller.signal)
      setSubmitted(true)
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') return
      const message =
        err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
    } finally {
      abortRef.current = null
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mt-9 p-5 border border-d8-border rounded-[8px] bg-d8-surface-1 max-w-[560px]">
        <p className="text-[15px] text-d8-text">
          Thanks. Check your inbox to confirm your subscription &mdash; then
          you can pick which updates you want.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-9 max-w-[560px]">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Your email address"
          className="flex-1 px-4 py-3 bg-d8-surface-1 border border-d8-border rounded-[4px] text-[15px] text-d8-text placeholder:text-d8-text-muted focus:border-d8-primary focus:outline-none transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-6 py-3 bg-d8-primary text-d8-bg rounded-[4px] text-[14px] tracking-[0.02em] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
          style={{ fontWeight: 600 }}
        >
          {submitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-[14px] text-d8-error" role="alert">
          {error}
        </p>
      )}

      <p className="mt-5 text-[13px] text-d8-text-muted leading-relaxed">
        Confirm your email, then pick which updates you want to hear about.
        Unsubscribe anytime.
      </p>
    </form>
  )
}
