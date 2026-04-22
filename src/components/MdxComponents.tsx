import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { CommandTabs } from '#/components/CommandTabs'
import { HighlightedCodeBlock } from '#/components/HighlightedCodeBlock'
import { McpConfigTabs } from '#/components/McpConfigTabs'

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-d8-primary bg-d8-surface-1 px-4 py-3 my-5 rounded-r-[4px]">
      <div className="text-[14px] text-d8-text-muted leading-relaxed">{children}</div>
    </div>
  )
}

function SimpleTable({
  headers,
  rows,
  colWidths,
}: {
  headers: string[]
  rows: ReactNode[][]
  colWidths?: string[]
}) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-[14px]">
        {colWidths && (
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
        )}
        <thead>
          <tr className="border-b border-d8-border bg-d8-surface-1">
            {headers.map((header) => (
              <th
                key={header}
                className="text-left py-2.5 pl-3 pr-4 text-[11px] uppercase tracking-[0.1em] text-d8-text"
                style={{ fontWeight: 600 }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-d8-border/50 align-top">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={`py-3 pl-3 ${index < row.length - 1 ? 'pr-6' : ''} ${index === 0 ? 'text-d8-text' : 'text-d8-text-muted'} leading-relaxed`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RouterLink({
  to,
  params,
  children,
  className,
}: {
  to: string
  params?: Record<string, string>
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      params={params}
      className={className ?? 'text-d8-primary hover:opacity-80 transition-opacity'}
    >
      {children}
    </Link>
  )
}

function DocsH2({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <h2
      id={id}
      className="docs-h2 text-[18px] md:text-[22px] font-sans text-d8-text tracking-[-0.02em] mt-10 mb-3"
    >
      {children}
      {id && (
        <a href={`#${id}`} className="docs-anchor" aria-label="Link to section">
          #
        </a>
      )}
    </h2>
  )
}

function DocsH3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="docs-h2 text-[15px] md:text-[17px] font-sans text-d8-text tracking-[-0.01em] mt-6 mb-2"
    >
      {children}
      {id && (
        <a href={`#${id}`} className="docs-anchor" aria-label="Link to section">
          #
        </a>
      )}
    </h3>
  )
}

function DocsP({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] text-d8-text-muted leading-relaxed mt-4 first:mt-0">
      {children}
    </p>
  )
}

function DocsPre({
  children,
}: {
  children: React.ReactElement<{ className?: string; children?: string }>
}) {
  const className = children?.props?.className ?? ''
  const lang = className.replace('language-', '') || 'text'
  const code = children?.props?.children ?? ''
  return <HighlightedCodeBlock code={code} lang={lang} />
}

function DocsCode({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-d8-text text-[13px] bg-d8-surface-2 px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

function DocsA({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="text-d8-primary hover:opacity-80 transition-opacity"
      {...props}
    >
      {children}
    </a>
  )
}

function DocsUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 mt-4 space-y-1.5 text-[15px] text-d8-text-muted leading-relaxed marker:text-d8-text-muted">
      {children}
    </ul>
  )
}

function DocsOl({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal pl-5 mt-4 space-y-1.5 text-[15px] text-d8-text-muted leading-relaxed marker:text-d8-text-muted">
      {children}
    </ol>
  )
}

function DocsLi({ children }: { children: ReactNode }) {
  return <li className="pl-1">{children}</li>
}

function DocsStrong({ children }: { children: ReactNode }) {
  return (
    <strong className="text-d8-text" style={{ fontWeight: 500 }}>
      {children}
    </strong>
  )
}

export const mdxComponents = {
  h2: DocsH2,
  h3: DocsH3,
  p: DocsP,
  pre: DocsPre,
  code: DocsCode,
  a: DocsA,
  ul: DocsUl,
  ol: DocsOl,
  li: DocsLi,
  strong: DocsStrong,
  Callout,
  SimpleTable,
  CommandTabs,
  McpConfigTabs,
  Link: RouterLink,
}
