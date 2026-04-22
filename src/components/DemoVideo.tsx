import { useEffect, useRef, useState } from 'react'

interface DemoVideoProps {
  src: string
  poster?: string
  title: string
  description?: string
  muted?: boolean
}

export function DemoVideo({ src, poster, title, description, muted = true }: DemoVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px 200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="rounded-[8px] border border-d8-border overflow-hidden bg-d8-surface-1">
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-d8-border bg-d8-surface-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C840]" />
        <span className="ml-2 text-[11px] text-d8-text-muted tracking-[0.03em] truncate">{title}</span>
      </div>
      <div ref={frameRef} className="aspect-video">
        {shouldLoad ? (
          <video
            poster={poster}
            preload="none"
            muted={muted}
            playsInline
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            className="w-full h-full block"
          >
            <source src={`${src}.webm`} type="video/webm" />
            <source src={`${src}.mp4`} type="video/mp4" />
          </video>
        ) : poster ? (
          <img src={poster} alt={title} className="w-full h-full object-cover block" />
        ) : (
          <div className="w-full h-full bg-d8-surface-2" />
        )}
      </div>
      {description && (
        <p className="px-4 py-3 text-[13px] text-d8-text-muted border-t border-d8-border">{description}</p>
      )}
    </div>
  )
}
