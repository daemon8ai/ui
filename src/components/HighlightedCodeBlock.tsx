import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CopyButton } from '#/components/CopyButton'

type HighlightedCodeBlockProps = {
  code: string
  lang?: string
  wrap?: boolean
  showHeader?: boolean
  showCopyButton?: boolean
  className?: string
}

const DAEMON8_THEME = {
  name: 'daemon8-night',
  type: 'dark',
  colors: {
    'editor.background': '#1A2332',
    'editor.foreground': '#E2E8F0',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8B949E', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'keyword.operator'], settings: { foreground: '#6C9EF8' } },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#6EE7A0' } },
    { scope: ['constant.numeric', 'number'], settings: { foreground: '#E5A84B' } },
    { scope: ['constant.language', 'constant.character.escape'], settings: { foreground: '#C4A6F5' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#7DD3FC' } },
    { scope: ['entity.name.type', 'support.type', 'support.class'], settings: { foreground: '#C4A6F5' } },
    { scope: ['variable', 'meta.definition.variable'], settings: { foreground: '#E2E8F0' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#94A3B8' } },
    { scope: ['invalid'], settings: { foreground: '#E06C75' } },
  ],
}

const LANGUAGE_ALIASES: Record<string, string> = {
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  json: 'json',
  http: 'hurl',
  hurl: 'hurl',
  text: 'console',
  txt: 'console',
  plaintext: 'console',
  console: 'console',
  toml: 'toml',
  yaml: 'yaml',
  yml: 'yaml',
  rust: 'rust',
  rs: 'rust',
  python: 'python',
  py: 'python',
  php: 'php',
  javascript: 'javascript',
  js: 'javascript',
  ts: 'javascript',
  typescript: 'javascript',
  powershell: 'powershell',
  ps1: 'powershell',
  pwsh: 'powershell',
  sql: 'sql',
}

let highlighterPromise: Promise<any> | null = null

function normalizeLang(lang?: string) {
  if (!lang) return 'text'
  return LANGUAGE_ALIASES[lang.toLowerCase()] ?? 'text'
}

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('@shikijs/langs/bash'),
      import('@shikijs/langs/json'),
      import('@shikijs/langs/hurl'),
      import('@shikijs/langs/console'),
      import('@shikijs/langs/toml'),
      import('@shikijs/langs/yaml'),
      import('@shikijs/langs/rust'),
      import('@shikijs/langs/python'),
      import('@shikijs/langs/php'),
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/powershell'),
      import('@shikijs/langs/sql'),
    ]).then(
      ([
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        { default: langBash },
        { default: langJson },
        { default: langHurl },
        { default: langConsole },
        { default: langToml },
        { default: langYaml },
        { default: langRust },
        { default: langPython },
        { default: langPhp },
        { default: langJavascript },
        { default: langPowershell },
        { default: langSql },
      ]) =>
        createHighlighterCore({
          engine: createJavaScriptRegexEngine(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          themes: [DAEMON8_THEME as any],
          langs: [
            langBash,
            langJson,
            langHurl,
            langConsole,
            langToml,
            langYaml,
            langRust,
            langPython,
            langPhp,
            langJavascript,
            langPowershell,
            langSql,
          ],
        }),
    )
  }
  return highlighterPromise
}

function normalizeHtml(html: string) {
  return html.replace(
    /<pre class="shiki[^"]*" style="[^"]*" tabindex="0">/,
    '<pre class="shiki" tabindex="0">',
  )
}

export function HighlightedCodeBlock({
  code,
  lang = 'text',
  wrap = false,
  showHeader = true,
  showCopyButton = true,
  className = '',
}: HighlightedCodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const normalizedLang = normalizeLang(lang)

    getHighlighter()
      .then((highlighter) =>
        highlighter.codeToHtml(code, {
          lang: normalizedLang,
          theme: DAEMON8_THEME.name,
        }),
      )
      .then((html: string) => {
        if (!cancelled) setHighlighted(normalizeHtml(html))
      })
      .catch(() => {
        if (!cancelled) setHighlighted(null)
      })

    return () => {
      cancelled = true
    }
  }, [code, lang])

  const bodyClassName = wrap
    ? [
        'overflow-x-auto px-4 py-4',
        '[&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:font-mono',
        '[&_pre]:text-[13px] [&_pre]:leading-[1.4] [&_pre]:whitespace-pre-wrap',
        '[&_code]:block [&_.line]:block [&_.line]:whitespace-pre-wrap [&_.line]:break-words',
      ].join(' ')
    : [
        'overflow-x-auto px-4 py-4',
        '[&_pre]:m-0 [&_pre]:min-w-max [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:font-mono',
        '[&_pre]:text-[13px] [&_pre]:leading-[1.4] [&_pre]:whitespace-pre',
        '[&_code]:block [&_.line]:block',
      ].join(' ')

  return (
    <div className={twMerge('relative border border-d8-border-bright rounded-[10px] bg-d8-surface-2 overflow-hidden my-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]', className)}>
      {showHeader ? (
        <div className="flex items-center justify-between px-3 py-2 border-b border-d8-border bg-d8-surface-1/80">
          <span
            className="text-[11px] uppercase text-d8-text-muted tracking-[0.12em]"
            style={{ fontWeight: 500 }}
          >
            {lang}
          </span>
          {showCopyButton ? <CopyButton text={code} /> : <span />}
        </div>
      ) : showCopyButton ? (
        <div className="absolute top-2 right-2 z-10 rounded-[4px] bg-d8-surface-1/70">
          <CopyButton text={code} />
        </div>
      ) : null}

      {highlighted ? (
        <div
          className={`${bodyClassName} ${!showHeader && showCopyButton ? 'pr-12' : ''}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre
          className={`px-4 py-4 font-mono text-[13px] text-d8-text leading-[1.4] overflow-x-auto min-w-max ${
            !showHeader && showCopyButton ? 'pr-12 ' : ''
          }${
            wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
          }`}
        >
          {code}
        </pre>
      )}
    </div>
  )
}
