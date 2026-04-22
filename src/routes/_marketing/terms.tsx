import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { seo } from '#/lib/seo'
import { Footer } from '#/components/Footer'

export const Route = createFileRoute('/_marketing/terms')({
  head: () => {
    const s = seo({ title: 'Terms of Service', description: 'Terms of Service for Daemon8.', path: '/terms' })
    return { title: s.title, meta: s.meta, links: s.links }
  },
  component: TermsPage,
})

function TermsPage() {
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
          <h1 className="text-[32px] text-d8-text tracking-[-0.02em] mb-2">Terms of Service</h1>
          <p className="text-[13px] text-d8-text-muted mb-12">Last updated: April 20, 2026</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-d8-text-muted">

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Agreement</h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of daemon8.ai (the
                &ldquo;Website&rdquo;), operated by Havy.tech LLC (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;). The Daemon8 software itself is open source
                and is governed separately by its own license, not by these Terms.
              </p>
              <p className="mt-3">
                By using the Website, you agree to these Terms. You must be at least 13 years
                old to use the Website.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>The Website</h2>
              <p>
                daemon8.ai is a marketing site. It offers information about the Daemon8 project,
                a waitlist for launch updates, and a contact form. The Website does not provide
                accounts, payment processing, or any paid services.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>The software</h2>
              <p>
                Daemon8 is open-source software distributed under the Functional Source License,
                version 1.0, with an Apache 2.0 Future License grant (FCL-1.0-ALv2). The full
                license text governs your rights to use, modify, and redistribute the software.
                See{' '}
                <a
                  href="https://github.com/daemon8ai/daemon8/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-d8-primary hover:opacity-80 transition-opacity"
                >
                  github.com/daemon8ai/daemon8/blob/main/LICENSE
                </a>
                .
              </p>
              <p className="mt-3">
                Nothing in these Terms overrides, replaces, or narrows that license. If you are
                using, forking, or distributing the software, the license controls &mdash; not
                this page.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Trademark</h2>
              <p>
                &ldquo;Daemon8&rdquo;, the Daemon8 logo, and related marks are trademarks of
                Havy.tech LLC. The open-source license does not grant trademark rights. A
                separate trademark policy outlining permitted uses (forks, derivative projects,
                articles, talks) will be published alongside the repository; until then, please
                reach out if you&rsquo;re unsure about a specific use.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Acceptable use</h2>
              <p className="mb-3">You may use the Website for lawful purposes. You may not:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Submit fake, automated, or abusive entries to the waitlist or contact form</li>
                <li>Attempt to disrupt the Website, its hosting, or its infrastructure</li>
                <li>Attempt to bypass rate limits, throttling, or other access controls</li>
                <li>Use the Website to facilitate illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Disclaimer of warranties</h2>
              <p>
                THE WEBSITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
                WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO
                NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
                VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
              <p className="mt-3">
                Warranties for the Daemon8 software are governed by its open-source license, not
                by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Limitation of liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HAVY.TECH LLC WILL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
                OF PROFITS OR DATA, ARISING FROM YOUR USE OF THE WEBSITE, EVEN IF WE HAVE BEEN
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of Nevada, United States,
                without regard to its conflict-of-law provisions. Any dispute arising from these
                Terms or the Website will be resolved in the state or federal courts located in
                Clark County, Nevada.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] text-d8-text tracking-[-0.01em] mb-3" style={{ fontWeight: 500 }}>Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes will be
                communicated to waitlist subscribers by email before taking effect. Continued
                use of the Website after the effective date constitutes acceptance of the
                updated Terms.
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
