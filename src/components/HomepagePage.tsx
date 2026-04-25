import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { CopyButton } from "./CopyButton";
import { ContactForm } from "./ContactForm";
import { Footer } from "./Footer";
import { ProofTerminal } from "./ProofTerminal";
import { HighlightedCodeBlock } from "./HighlightedCodeBlock";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[13px] tracking-[0.05em] text-d8-text-muted mb-4"
      style={{ fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

const installCommand = `cargo install --git https://github.com/daemon8ai/daemon8 daemon8
daemon8 setup`;

const mcpSnippet = `// ask
● daemon8 - query_observations (MCP)({ since: "5m", kind: ["console", "network", "exception"], severity: ["warn", "error"] })

// answer
  ⎿ [
      { origin: "browser:checkout", kind: "exception", text: "Cannot read property 'token' of undefined", t: "15:42:01.334" },
      { origin: "api:laravel",      kind: "sql",       text: "SELECT * FROM orders WHERE user_id = ?",    t: "15:42:01.298" },
      { origin: "browser:checkout", kind: "network",   text: "POST /api/checkout 500",                    t: "15:42:01.331" }
    ]`;

const faqItems: { q: string; a: React.ReactNode }[] = [
  {
    q: "Where is the code?",
    a: (
      <>
        On{" "}
        <a
          href="https://github.com/daemon8ai/daemon8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-d8-primary hover:opacity-80 transition-opacity"
        >
          GitHub
        </a>
        . Written in Rust. The PHP sdks are shipping in alpha; other language SDKs follow
        based on real use.
      </>
    ),
  },
  {
    q: "What's in the release?",
    a: "Observation, query, checkpointing, subscriptions, the browser command surface (DOM inspection, JavaScript evaluation, CSS injection, viewport control, screenshots), and the agent-to-agent bus. All of it.",
  },
  {
    q: "Does observation data leave my machine?",
    a: "No. Observations are stored locally in a SQLite database, and a background sweep deletes anything older than 24 hours. Nothing leaves the machine.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-0 border-t border-d8-border">
      {faqItems.map((item, i) => (
        <div key={item.q} className="border-b border-d8-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left text-d8-text hover:text-d8-primary transition-colors duration-200"
          >
            <span className="text-[16px] pr-4">{item.q}</span>
            {open === i ? (
              <ChevronUp size={18} className="text-d8-text-muted shrink-0" />
            ) : (
              <ChevronDown size={18} className="text-d8-text-muted shrink-0" />
            )}
          </button>
          {open === i && (
            <p className="pb-4 text-[15px] text-d8-text-muted leading-relaxed">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function InstallBlock() {
  return (
    <div className="mt-9 max-w-[560px]">
      <div className="border border-d8-border-bright rounded-[8px] bg-d8-surface-2 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-d8-border bg-d8-surface-1/80">
          <span
            className="text-[11px] tracking-[0.05em] text-d8-text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            install
          </span>
          <CopyButton text={installCommand} />
        </div>
        <HighlightedCodeBlock
          code={installCommand}
          lang="bash"
          showHeader={false}
          showCopyButton={false}
          className="border-0 rounded-none my-0"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-d8-border-bright bg-d8-surface-2 text-[14px] text-d8-text hover:bg-d8-surface-1 transition-colors"
        >
          <BookOpen size={16} aria-hidden="true" />
          Read Docs
        </Link>
        <a
          href="https://github.com/daemon8ai/daemon8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-d8-border-bright bg-d8-surface-2 text-[14px] text-d8-text hover:bg-d8-surface-1 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}

function McpSnippet() {
  return (
    <div className="border border-d8-border-bright rounded-[8px] bg-d8-surface-2 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-d8-border flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
        </div>
        <span
          className="text-[12px] text-d8-text-muted tracking-[0.05em] ml-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          mcp interface
        </span>
        <div className="ml-auto">
          <CopyButton text={mcpSnippet} />
        </div>
      </div>
      <HighlightedCodeBlock
        code={mcpSnippet}
        lang="javascript"
        showHeader={false}
        showCopyButton={false}
        className="border-0 rounded-none my-0"
      />
    </div>
  );
}

export function HomepagePage() {
  return (
    <div>
      <section className="px-4 pt-20 md:pt-16 pb-16 md:pb-20">
        <div className="mx-auto max-w-[960px]">
          <div className="max-w-[640px]">
            <Wordmark size="lg" />
            <h1 className="mt-9 text-[clamp(1.6rem,5.2vw,3.25rem)] leading-[1.02] tracking-[-0.03em] text-d8-text max-w-[560px]">
              The admin layer for AI agents.
            </h1>
            <p className="mt-6 text-[15px] md:text-[18px] text-d8-text-muted leading-relaxed max-w-[560px]">
              See browser console/network, adb, and app logs in one place.
              <br />
              <span className="text-[13px] md:text-[15px]">
                (more logging sources to come, e.g. nginx, redis, all popular programming langs/frameworks, etc.)
              </span>
            </p>
            <InstallBlock />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 border-t border-d8-border">
        <div className="mx-auto max-w-[960px]">
          <SectionLabel>MCP INTERFACE</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div>
              <h2 className="text-[26px] md:text-[36px] tracking-[-0.03em] text-d8-text max-w-[520px]">
                One question.
                <br />
                One well-informed answer.
              </h2>
              <p className="mt-5 text-[15px] md:text-[16px] text-d8-text-muted leading-relaxed max-w-[520px]">
                Eight MCP tools sit on top of the stream. Query recent
                observations, snapshot health, checkpoint a position, drive the
                browser, ingest from inside the agent loop. Works with Claude
                Code, Cursor, Continue.dev, and any MCP client over HTTP.
              </p>
            </div>
            <McpSnippet />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 border-t border-d8-border relative">
        <div className="absolute inset-0 bg-d8-surface-1/30" />
        <div className="mx-auto max-w-[960px] relative z-10">
          <SectionLabel>QUERY</SectionLabel>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Browser",
                desc: "Console and network activity stream in real time over Chrome DevTools Protocol.",
              },
              {
                title: "Android",
                desc: "ADB logs stream in real time from any attached device or emulator.",
              },
              {
                title: "Amazon Vega",
                desc: "VVD logs stream in real time from the Vega emulator and Fire TV devices.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-d8-border rounded-[8px] bg-d8-surface-1 p-5"
              >
                <p
                  className="text-[15px] text-d8-text mb-2"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </p>
                <p className="text-[14px] text-d8-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <SectionLabel>COMMAND</SectionLabel>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Browser control, no extension",
                  desc: "Read and write through Chrome DevTools Protocol directly. No extension install, no browser restart, no context-menu loop.",
                },
                {
                  title: "Console and network, live",
                  desc: "Inject CSS, run JavaScript, inspect the DOM, and see the console and network consequences in the same stream.",
                },
                {
                  title: "Per-agent slices",
                  desc: "Each agent subscribes to the slice of the stream it cares about. Narrow scope, less noise, faster loops.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-d8-border rounded-[8px] bg-d8-surface-1 p-5"
                >
                  <p
                    className="text-[15px] text-d8-text mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[14px] text-d8-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 border-t border-d8-border">
        <div className="mx-auto max-w-[960px]">
          <SectionLabel>THE STREAM</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div>
              <h2 className="text-[26px] md:text-[36px] tracking-[-0.03em] text-d8-text max-w-[520px]">
                Agents coordinate naturally.
              </h2>
              <p className="mt-5 text-[15px] md:text-[16px] text-d8-text-muted leading-relaxed max-w-[520px]">
                Browser, device, and application runtime converge into one
                local store &mdash; one shape, one query surface. When multiple
                agents share that stream, coordination stops being overhead - requiring human intervention.
              </p>
            </div>
            <ProofTerminal />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 border-t border-d8-border">
        <div className="mx-auto max-w-[760px]">
          <SectionLabel>FAQ</SectionLabel>
          <FAQ />
        </div>
      </section>

      <section
        id="contact"
        className="px-4 py-16 md:py-24 border-t border-d8-border relative"
      >
        <div className="absolute inset-0 bg-d8-surface-1/40" />
        <div className="mx-auto max-w-[560px] relative z-10">
          <SectionLabel>CONTACT</SectionLabel>
          <h2 className="text-[24px] md:text-[36px] tracking-[-0.02em] text-d8-text mb-3">
            Get in touch
          </h2>
          <p className="text-[15px] text-d8-text-muted mb-4 leading-relaxed">
            Questions, feedback, or a sharp use case we should know about.
          </p>
          <p className="text-[14px] text-d8-text-muted mb-8 leading-relaxed">
            Bug reports and feature requests are tracked on{" "}
            <a
              href="https://github.com/daemon8ai/daemon8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-d8-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <div className="border border-d8-border rounded-[8px] bg-d8-surface-1/80 backdrop-blur-sm p-5 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
