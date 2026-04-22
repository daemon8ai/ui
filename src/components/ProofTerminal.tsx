const lines = [
  { origin: 'you ~$', msg: 'Open a second agent and have it review the checkout regression through Daemon8.', color: '#E8915A' },
  { origin: ':@Lead>', msg: 'Initiating. :@Page> inspect the browser trace. :@Wire> watch the API side.', color: '#6C9EF8' },
  { origin: ':@Page>', msg: 'I can see the failing request and the console complaint. Narrowing to checkout only.', color: '#6EE7A0' },
  { origin: ':@Wire>', msg: 'Server-side error matches the same flow. Looking at the payment branch now.', color: '#C4A6F5' },
  { origin: ':@Page>', msg: 'Found the browser-side assumption. Posting the DOM state and request sequence to the stream.', color: '#6EE7A0' },
  { origin: ':@Lead>', msg: 'Good. I have both sides now. Assigning the fix and keeping the stream pinned to this path.', color: '#6C9EF8' },
]

export function ProofTerminal() {
  return (
    <div className="border border-d8-border-bright rounded-[8px] bg-d8-surface-2 overflow-hidden max-w-full">
      <div className="px-4 py-2.5 border-b border-d8-border flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-d8-text-muted/20" />
        </div>
        <span className="text-[12px] text-d8-text-muted tracking-[0.05em] ml-2" style={{ fontFamily: 'var(--font-mono)' }}>multi-agent collaboration</span>
      </div>
      <div className="p-4 space-y-2 overflow-x-auto">
        {lines.map((l, i) => (
          <div
            key={i}
            className="flex gap-x-0 text-[13px] md:text-[14px] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="shrink-0" style={{ color: l.color }}>{l.origin}</span>
            <span className="text-d8-text-muted mx-1.5">&rarr;</span>
            <span className="text-d8-text/80">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
