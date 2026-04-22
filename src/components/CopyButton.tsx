import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="text-d8-text-muted hover:text-d8-text transition-colors duration-200 p-1">
      {copied ? <Check size={16} className="text-d8-primary" /> : <Copy size={16} />}
    </button>
  )
}
