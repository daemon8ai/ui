import { useRef, useState, type KeyboardEvent } from 'react'
import { CopyButton } from './CopyButton'
import { HighlightedCodeBlock } from './HighlightedCodeBlock'

export type CommandPanel = {
  label: string
  lang: string
  code: string
  helper?: string
}

type TabKey = 'simple' | 'manual'

type CommandTabsProps = {
  simple: CommandPanel
  manual: CommandPanel
  defaultTab?: TabKey
  ariaLabel?: string
}

const TAB_ORDER: TabKey[] = ['simple', 'manual']

export function CommandTabs({
  simple,
  manual,
  defaultTab = 'simple',
  ariaLabel = 'Command options',
}: CommandTabsProps) {
  const [active, setActive] = useState<TabKey>(defaultTab)
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({ simple: null, manual: null })

  const panels: Record<TabKey, CommandPanel> = { simple, manual }
  const activePanel = panels[active]

  function focusTab(key: TabKey) {
    setActive(key)
    tabRefs.current[key]?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const index = TAB_ORDER.indexOf(active)
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusTab(TAB_ORDER[(index + 1) % TAB_ORDER.length])
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusTab(TAB_ORDER[(index - 1 + TAB_ORDER.length) % TAB_ORDER.length])
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusTab(TAB_ORDER[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      focusTab(TAB_ORDER[TAB_ORDER.length - 1])
    }
  }

  return (
    <div className="relative border border-d8-border-bright rounded-[10px] bg-d8-surface-2 overflow-hidden my-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-d8-border bg-d8-surface-1/80">
        <div role="tablist" aria-label={ariaLabel} className="flex gap-1">
          {TAB_ORDER.map((key) => {
            const panel = panels[key]
            const selected = key === active
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el
                }}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`commandtabs-panel-${key}`}
                id={`commandtabs-tab-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(key)}
                onKeyDown={handleKeyDown}
                className={`px-2.5 py-1 text-[11px] tracking-[0.04em] rounded-[3px] transition-colors duration-150 ${
                  selected
                    ? 'bg-d8-surface-3 text-d8-text'
                    : 'text-d8-text-muted hover:text-d8-text'
                }`}
                style={{ fontWeight: selected ? 600 : 400 }}
              >
                {panel.label}
              </button>
            )
          })}
        </div>
        <CopyButton text={activePanel.code} />
      </div>
      <div
        role="tabpanel"
        id={`commandtabs-panel-${active}`}
        aria-labelledby={`commandtabs-tab-${active}`}
      >
        <HighlightedCodeBlock
          code={activePanel.code}
          lang={activePanel.lang}
          showHeader={false}
          showCopyButton={false}
          className="my-0 border-0 rounded-none shadow-none bg-transparent"
        />
        {activePanel.helper ? (
          <p className="text-[12px] text-d8-text-muted px-4 pb-3 leading-relaxed">
            {activePanel.helper}
          </p>
        ) : null}
      </div>
    </div>
  )
}
