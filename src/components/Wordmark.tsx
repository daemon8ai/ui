function D8Mark({
  primary = 'var(--d8-primary)',
  muted = 'var(--d8-text-muted, #8B949E)',
  bg = 'var(--d8-bg, #0B1120)',
}: {
  primary?: string
  muted?: string
  bg?: string
}) {
  return (
    <>
      <line x1="20" y1="-1.8" x2="20" y2="38" stroke={primary} strokeWidth="0.7" strokeLinecap="round" opacity="0.58" />
      <circle cx="20" cy="13" r="6.35" fill={bg} />
      <circle cx="20" cy="27" r="6.35" fill={bg} />
      <circle cx="20" cy="13" r="6.5" stroke={primary} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="27" r="6.5" stroke={primary} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="13" r="4.7" stroke={primary} strokeWidth="0.4" fill="none" opacity="0.38" />
      <circle cx="20" cy="13" r="3.0" stroke={primary} strokeWidth="0.38" fill="none" opacity="0.28" />
      <circle cx="20" cy="27" r="4.7" stroke={primary} strokeWidth="0.4" fill="none" opacity="0.38" />
      <circle cx="20" cy="27" r="3.0" stroke={primary} strokeWidth="0.38" fill="none" opacity="0.28" />
      <circle cx="20" cy="13" r="0.52" fill={primary} opacity="0.88" />
      <circle cx="20" cy="27" r="0.52" fill={primary} opacity="0.88" />
      <path d="M 23.21 1.78 A 18.5 18.5 0 1 1 16.79 1.78" stroke={muted} strokeWidth="1.0" fill="none" opacity="0.45" strokeLinecap="butt" />
    </>
  )
}

export function Wordmark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-[18px]',
    md: 'text-[24px]',
    lg: 'text-[40px] md:text-[56px]',
  }

  return (
    <span className={`font-mono tracking-[-0.02em] ${sizes[size]} inline-flex items-center leading-none`}>
      <span className="text-d8-text relative z-10" style={{ fontWeight: 400 }}>daemon</span>
      <span
        className="relative inline-flex items-center justify-center"
        style={{ width: '1.75em', height: '1.75em', marginLeft: '-0.01em' }}
      >
        <svg
          viewBox="0 0 40 40"
          className="absolute inset-0 w-full h-full z-0"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <D8Mark />
        </svg>
      </span>
    </span>
  )
}

export function LogoMark({ className = '', primary, muted, bg }: {
  className?: string
  primary?: string
  muted?: string
  bg?: string
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <D8Mark primary={primary} muted={muted} bg={bg} />
    </svg>
  )
}
