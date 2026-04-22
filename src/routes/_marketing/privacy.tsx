import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { seo } from '#/lib/seo'
import { Footer } from '#/components/Footer'

export const Route = createFileRoute('/_marketing/privacy')({
  head: () => {
    const s = seo({ title: 'Privacy Policy', description: 'Privacy Policy for Daemon8.', path: '/privacy' })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-[720px] mx-auto px-4 py-16">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-d8-text-muted hover:text-d8-text tracking-[0.02em] transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
          <p className="text-[13px] text-d8-primary tracking-[0.05em] mb-2" style={{ fontWeight: 500 }}>LEGAL</p>
          <h1 className="text-[32px] text-d8-text tracking-[-0.02em] mb-2">Privacy Policy</h1>
          <p className="text-[13px] text-d8-text-muted mb-12">Last updated: April 20, 2026</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-d8-text-muted">

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Overview</h2>
              <p>
                Daemon8 is operated by Havy.tech LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;). There are two distinct surfaces, and each handles data
                differently:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  <span className="text-d8-text">daemon8.ai</span> &mdash; the website. This is
                  where the waitlist signup, contact form, and public documentation live.
                </li>
                <li>
                  <span className="text-d8-text">Daemon8</span> &mdash; the open-source software
                  you install and run on your own machine.
                </li>
              </ul>
              <p className="mt-3">
                We collect the minimum necessary to run the website. The software is local-first
                and does not phone home.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>What the website collects</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-d8-text text-[14px] mb-1" style={{ fontWeight: 500 }}>Waitlist</p>
                  <p>
                    When you join the waitlist, we collect your email address. Once you confirm
                    the email, you can opt in or out of five categories of updates: major
                    milestones, code releases, essays and deep dives, security advisories, and
                    insider cohort invitations. If you opt into code releases, you can also
                    specify which SDK languages you care about. All preferences are optional and
                    editable at any time.
                  </p>
                </div>
                <div>
                  <p className="text-d8-text text-[14px] mb-1" style={{ fontWeight: 500 }}>Contact form</p>
                  <p>
                    When you submit the contact form, we collect the reason category you
                    selected, your name, your email, your optional company name, your subject
                    line, and your message. We use this only to respond to your submission.
                  </p>
                </div>
                <div>
                  <p className="text-d8-text text-[14px] mb-1" style={{ fontWeight: 500 }}>Server logs</p>
                  <p>
                    Our web servers log standard HTTP request metadata &mdash; IP address, user
                    agent, URL, timestamp, and response code &mdash; for security, debugging, and
                    abuse prevention. These logs are retained for 30 days and are not used for
                    advertising.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>What the software collects</h2>
              <p>
                Nothing that leaves your machine. The Daemon8 binary stores observations in a
                local SQLite database on your own filesystem, with a 24-hour retention sweep.
                The software does not send telemetry, analytics, usage pings, machine
                identifiers, or any other data to us or to anyone else. It has no phone-home
                path, because it does not need one.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Third-party processors</h2>
              <p className="mb-3">
                These providers process data on our behalf to operate the website:
              </p>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-d8-text text-[14px] shrink-0 w-32" style={{ fontWeight: 500 }}>Resend</span>
                  <span>Delivers waitlist confirmation and update emails. Handles the double opt-in flow and preference sync.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-d8-text text-[14px] shrink-0 w-32" style={{ fontWeight: 500 }}>Google Workspace</span>
                  <span>Receives contact form notifications via SMTP. These emails go only to us.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-d8-text text-[14px] shrink-0 w-32" style={{ fontWeight: 500 }}>Cloudflare</span>
                  <span>DNS and CDN for daemon8.ai. Sees the IP addresses of visitors as they reach the site.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-d8-text text-[14px] shrink-0 w-32" style={{ fontWeight: 500 }}>DigitalOcean</span>
                  <span>Hosts the web servers and the managed Postgres database that stores waitlist entries and contact submissions. US-East region.</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Cookies</h2>
              <p>
                The website does not use tracking cookies, advertising cookies, or third-party
                analytics cookies. No fingerprinting. If we add a session cookie in the future
                for a specific feature (for example, saving your waitlist preferences between
                page loads), we&rsquo;ll update this section.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Data retention</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Waitlist entries are retained until you unsubscribe. Every waitlist email includes a one-click unsubscribe link.</li>
                <li>Contact form submissions are retained for up to 90 days, then deleted.</li>
                <li>Server logs are retained for 30 days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Your rights</h2>
              <p>
                You may request a copy of the data we hold about you, ask us to correct
                inaccurate data, or request deletion. Email us at{' '}
                <a href="mailto:mail@daemon8.ai" className="text-d8-primary hover:opacity-80 transition-opacity">mail@daemon8.ai</a>{' '}
                and we&rsquo;ll respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Changes to this policy</h2>
              <p>
                If we make material changes to this policy, we will notify waitlist subscribers
                by email before the changes take effect. Continued use of the website after
                notification constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Contact</h2>
              <p>
                Havy.tech LLC<br />
                <a href="mailto:mail@daemon8.ai" className="text-d8-primary hover:opacity-80 transition-opacity">mail@daemon8.ai</a>
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
