import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

type LogoSurface = 'dark' | 'light' | 'transparent'
type LogoInk = 'brand' | 'mono' | 'reversed'
type LogoKind = 'mark' | 'lockup'

interface LogoPalette {
  bg: string
  text: string
  muted: string
  primary: string
  border: string
  surface: string
  label: string
  id: LogoSurface
}

interface LogoTone {
  label: string
  id: LogoInk
}

interface BrandAsset {
  id: string
  name: string
  note: string
  kind: LogoKind
  width: number
  height: number
  surface: LogoSurface
  ink: LogoInk
}

const PALETTES: Record<LogoSurface, LogoPalette> = {
  dark: {
    id: 'dark',
    bg: '#0B1120',
    text: '#E2E8F0',
    muted: '#8B949E',
    primary: '#6C9EF8',
    border: '#1A2332',
    surface: '#111827',
    label: 'Dark',
  },
  light: {
    id: 'light',
    bg: '#FFFFFF',
    text: '#0D1420',
    muted: '#475569',
    primary: '#2563EB',
    border: '#D8DEE9',
    surface: '#F8FAFC',
    label: 'Light',
  },
  transparent: {
    id: 'transparent',
    bg: 'transparent',
    text: '#E2E8F0',
    muted: '#8B949E',
    primary: '#6C9EF8',
    border: '#2A3445',
    surface: '#111827',
    label: 'Transparent',
  },
}

const TONES: LogoTone[] = [
  { id: 'brand', label: 'Brand color' },
  { id: 'mono', label: 'Monochrome' },
  { id: 'reversed', label: 'Reversed' },
]

const SURFACE_TONES: Record<LogoSurface, LogoTone[]> = {
  dark: TONES,
  light: TONES.filter(tone => tone.id !== 'reversed'),
  transparent: TONES,
}

const COLOR_SWATCHES = [
  { name: 'Brand Blue', value: '#6C9EF8', token: '--d8-primary' },
  { name: 'Night', value: '#0B1120', token: '--d8-bg' },
  { name: 'Text', value: '#E2E8F0', token: '--d8-text' },
  { name: 'Muted', value: '#8B949E', token: '--d8-text-muted' },
  { name: 'Surface', value: '#111827', token: '--d8-surface-1' },
  { name: 'Border', value: '#1A2332', token: '--d8-border' },
]

const ICON_ASSETS: BrandAsset[] = [
  { id: 'favicon-16', name: 'Favicon 16', note: 'Browser tab minimum', kind: 'mark', width: 16, height: 16, surface: 'dark', ink: 'brand' },
  { id: 'favicon-32', name: 'Favicon 32', note: 'Standard favicon', kind: 'mark', width: 32, height: 32, surface: 'dark', ink: 'brand' },
  { id: 'icon-48', name: 'Icon 48', note: 'Windows/browser UI', kind: 'mark', width: 48, height: 48, surface: 'dark', ink: 'brand' },
  { id: 'icon-64', name: 'Icon 64', note: 'Small app icon', kind: 'mark', width: 64, height: 64, surface: 'dark', ink: 'brand' },
  { id: 'icon-96', name: 'Icon 96', note: 'Android density', kind: 'mark', width: 96, height: 96, surface: 'dark', ink: 'brand' },
  { id: 'icon-128', name: 'Icon 128', note: 'Desktop icon', kind: 'mark', width: 128, height: 128, surface: 'dark', ink: 'brand' },
  { id: 'apple-touch-180', name: 'Apple Touch', note: 'iOS home screen', kind: 'mark', width: 180, height: 180, surface: 'dark', ink: 'brand' },
  { id: 'pwa-192', name: 'PWA 192', note: 'Manifest icon', kind: 'mark', width: 192, height: 192, surface: 'dark', ink: 'brand' },
  { id: 'icon-256', name: 'Icon 256', note: 'Large desktop icon', kind: 'mark', width: 256, height: 256, surface: 'dark', ink: 'brand' },
  { id: 'pwa-512', name: 'PWA 512', note: 'Manifest icon', kind: 'mark', width: 512, height: 512, surface: 'dark', ink: 'brand' },
]

const LOCKUP_ASSETS: BrandAsset[] = [
  { id: 'nav-lockup', name: 'Navigation', note: 'Header lockup', kind: 'lockup', width: 240, height: 64, surface: 'transparent', ink: 'brand' },
  { id: 'footer-lockup', name: 'Footer', note: 'Footer/marketing', kind: 'lockup', width: 320, height: 88, surface: 'transparent', ink: 'brand' },
  { id: 'readme-lockup', name: 'README', note: 'Repository masthead', kind: 'lockup', width: 680, height: 140, surface: 'transparent', ink: 'brand' },
  { id: 'social-avatar', name: 'Profile Avatar', note: 'Social profile', kind: 'mark', width: 400, height: 400, surface: 'dark', ink: 'brand' },
  { id: 'og-image', name: 'Open Graph', note: 'Social preview', kind: 'lockup', width: 1200, height: 630, surface: 'dark', ink: 'brand' },
  { id: 'x-header', name: 'X Header', note: 'Header/banner', kind: 'lockup', width: 1500, height: 500, surface: 'dark', ink: 'brand' },
  { id: 'linkedin-cover', name: 'LinkedIn Cover', note: 'Company page', kind: 'lockup', width: 1584, height: 396, surface: 'dark', ink: 'brand' },
  { id: 'square-post', name: 'Square Post', note: 'Instagram/LinkedIn', kind: 'lockup', width: 1080, height: 1080, surface: 'dark', ink: 'brand' },
]

function resolveLogoColors(surface: LogoSurface, ink: LogoInk) {
  const palette = PALETTES[surface]

  if (ink === 'mono') {
    return {
      bg: palette.bg,
      text: surface === 'light' ? '#111827' : '#E5E7EB',
      muted: surface === 'light' ? '#6B7280' : '#9CA3AF',
      primary: surface === 'light' ? '#374151' : '#D1D5DB',
    }
  }

  if (ink === 'reversed') {
    return {
      bg: palette.bg,
      text: '#FFFFFF',
      muted: surface === 'light' ? '#334155' : '#CBD5E1',
      primary: '#FFFFFF',
    }
  }

  return {
    bg: palette.bg,
    text: palette.text,
    muted: palette.muted,
    primary: palette.primary,
  }
}

function PrimaryMark({
  bg = '#0B1120',
  muted = '#8B949E',
  primary = '#6C9EF8',
  className = '',
  style,
}: {
  bg?: string
  muted?: string
  primary?: string
  className?: string
  style?: CSSProperties
}) {
  const isLight = bg === '#FFFFFF'

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={{ overflow: 'visible', ...style }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="20" y1="-1.8" x2="20" y2="38" stroke={primary} strokeWidth="0.7" strokeLinecap="round" opacity="0.58" />
      <circle cx="20" cy="13" r="6.35" fill={bg} />
      <circle cx="20" cy="27" r="6.35" fill={bg} />
      <circle cx="20" cy="13" r="6.5" stroke={primary} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="27" r="6.5" stroke={primary} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="13" r="4.7" stroke={primary} strokeWidth="0.4" fill="none" opacity={isLight ? 0.52 : 0.38} />
      <circle cx="20" cy="13" r="3.0" stroke={primary} strokeWidth="0.38" fill="none" opacity={isLight ? 0.4 : 0.28} />
      <circle cx="20" cy="27" r="4.7" stroke={primary} strokeWidth="0.4" fill="none" opacity={isLight ? 0.52 : 0.38} />
      <circle cx="20" cy="27" r="3.0" stroke={primary} strokeWidth="0.38" fill="none" opacity={isLight ? 0.4 : 0.28} />
      <circle cx="20" cy="13" r="0.52" fill={primary} opacity={isLight ? 0.95 : 0.88} />
      <circle cx="20" cy="27" r="0.52" fill={primary} opacity={isLight ? 0.95 : 0.88} />
      <path d="M 23.21 1.78 A 18.5 18.5 0 1 1 16.79 1.78" stroke={muted} strokeWidth="1.0" fill="none" opacity={isLight ? 0.58 : 0.45} strokeLinecap="butt" />
    </svg>
  )
}

function LogoLockup({
  kind,
  ink,
  surface,
  height,
}: {
  kind: LogoKind
  ink: LogoInk
  height: number
  surface: LogoSurface
}) {
  const colors = resolveLogoColors(surface, ink)

  if (kind === 'mark') {
    return (
      <PrimaryMark
        bg={colors.bg === 'transparent' ? '#0B1120' : colors.bg}
        muted={colors.muted}
        primary={colors.primary}
        style={{ width: height, height }}
      />
    )
  }

  const fontSize = height * 0.42
  const markSize = fontSize * 1.75

  return (
    <span
      className="inline-flex items-center leading-none"
      style={{
        color: colors.text,
        fontSize,
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <span>daemon</span>
      <span
        className="relative inline-flex items-center justify-center"
        style={{ width: markSize, height: markSize, marginLeft: '-0.01em' }}
      >
        <PrimaryMark
          bg={colors.bg === 'transparent' ? '#0B1120' : colors.bg}
          muted={colors.muted}
          primary={colors.primary}
          className="absolute inset-0 h-full w-full"
        />
      </span>
    </span>
  )
}

function SocialComposition({ asset }: { asset: BrandAsset }) {
  const colors = resolveLogoColors(asset.surface, asset.ink)
  const layout = {
    'og-image': { logoHeight: 148, gap: 54, taglineSize: 26, maxWidth: 840, tracking: '0.16em' },
    'x-header': { logoHeight: 132, gap: 42, taglineSize: 22, maxWidth: 980, tracking: '0.22em' },
    'linkedin-cover': { logoHeight: 120, gap: 30, taglineSize: 18, maxWidth: 940, tracking: '0.18em' },
    'square-post': { logoHeight: 148, gap: 46, taglineSize: 24, maxWidth: 760, tracking: '0.12em' },
  }[asset.id]

  if (!layout) {
    return null
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      style={{ gap: layout.gap }}
    >
      <LogoLockup kind="lockup" ink={asset.ink} surface={asset.surface} height={layout.logoHeight} />
      <p
        className="text-center"
        style={{
          maxWidth: layout.maxWidth,
          color: colors.muted,
          fontFamily: 'var(--font-mono)',
          fontSize: layout.taglineSize,
          letterSpacing: layout.tracking,
          lineHeight: 1.25,
        }}
      >
        The admin layer for AI agents.
      </p>
    </div>
  )
}

function AssetContent({ asset }: { asset: BrandAsset }) {
  const socialComposition = SocialComposition({ asset })
  if (socialComposition) {
    return socialComposition
  }

  return (
    <LogoLockup
      kind={asset.kind}
      ink={asset.ink}
      surface={asset.surface}
      height={getLogoHeight(asset)}
    />
  )
}

function AssetPreview({ asset, maxWidth = 360, maxHeight = 210 }: { asset: BrandAsset; maxWidth?: number; maxHeight?: number }) {
  const palette = PALETTES[asset.surface]
  const scale = Math.min(maxWidth / asset.width, maxHeight / asset.height, 1)
  const previewWidth = Math.round(asset.width * scale)
  const previewHeight = Math.round(asset.height * scale)

  return (
    <div className="min-w-0">
      <div
        className="overflow-hidden rounded-[6px] border"
        style={{
          width: previewWidth,
          height: previewHeight,
          borderColor: palette.border,
          backgroundColor: asset.surface === 'transparent' ? '#0B1120' : palette.bg,
        }}
      >
        <div
          data-brand-asset={asset.id}
          data-brand-width={asset.width}
          data-brand-height={asset.height}
          className="flex items-center justify-center"
          style={{
            width: asset.width,
            height: asset.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: asset.surface === 'transparent' ? 'transparent' : palette.bg,
          }}
        >
          <AssetContent asset={asset} />
        </div>
      </div>
    </div>
  )
}

function AssetCard({ asset }: { asset: BrandAsset }) {
  return (
    <article className="rounded-[8px] border border-d8-border bg-d8-surface-1 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-[14px] text-d8-text">{asset.name}</h4>
          <p className="mt-1 text-[12px] text-d8-text-muted">{asset.note}</p>
        </div>
        <code className="shrink-0 rounded border border-d8-border bg-d8-bg px-2 py-1 text-[11px] text-d8-text-muted">
          {asset.width}x{asset.height}
        </code>
      </div>
      <AssetPreview asset={asset} />
    </article>
  )
}

function Section({
  title,
  kicker,
  children,
}: {
  title: string
  kicker: string
  children: ReactNode
}) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-d8-primary" style={{ fontFamily: 'var(--font-mono)' }}>
          {kicker}
        </p>
        <h3 className="mt-1 text-[24px] text-d8-text">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function ToneSpecimen({ surface, ink }: { surface: LogoSurface; ink: LogoInk }) {
  const palette = PALETTES[surface]
  const tone = TONES.find(item => item.id === ink)

  return (
    <div className="rounded-[8px] border border-d8-border bg-d8-surface-1 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[12px] text-d8-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
          {palette.label} / {tone?.label}
        </span>
      </div>
      <div
        className="flex h-[126px] items-center justify-center rounded-[6px] border"
        style={{
          borderColor: palette.border,
          backgroundColor: surface === 'transparent' ? '#0B1120' : palette.bg,
        }}
      >
        <LogoLockup
          kind="lockup"
          ink={ink}
          surface={surface}
          height={72}
        />
      </div>
    </div>
  )
}

function getLogoHeight(asset: BrandAsset) {
  return asset.kind === 'mark'
    ? Math.min(asset.height * 0.72, asset.width * 0.72)
    : Math.min(asset.height * 0.58, asset.width * 0.22)
}

function ExportStage() {
  const assets = [...ICON_ASSETS, ...LOCKUP_ASSETS]

  return (
    <div className="space-y-6 p-6" aria-hidden="true">
      {assets.map(asset => {
        const palette = PALETTES[asset.surface]
        return (
          <div
            key={asset.id}
            data-brand-export={asset.id}
            style={{
              width: asset.width,
              height: asset.height,
              backgroundColor: asset.surface === 'transparent' ? 'transparent' : palette.bg,
            }}
            className="flex items-center justify-center overflow-hidden"
          >
            <AssetContent asset={asset} />
          </div>
        )
      })}
    </div>
  )
}

export function BrandingPage() {
  const [exportMode, setExportMode] = useState(false)

  useEffect(() => {
    setExportMode(new URLSearchParams(window.location.search).get('export') === '1')
  }, [])

  if (exportMode) {
    return (
      <div className="min-h-screen bg-transparent text-d8-text">
        <ExportStage />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-d8-bg text-d8-text">
      <header className="sticky top-0 z-20 border-b border-d8-border bg-d8-bg/92 px-6 py-4 backdrop-blur md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-d8-text-muted transition-colors hover:text-d8-text">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-[22px]">Home</h2>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] space-y-14 px-6 py-10 md:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[12px] border border-d8-border bg-d8-surface-1 p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-d8-primary" style={{ fontFamily: 'var(--font-mono)' }}>
              Branding
            </p>
            <h1 className="mt-3 max-w-[720px] text-[46px] leading-[0.98] tracking-[-0.04em] text-d8-text md:text-[72px]">
              Daemon8 branding kit
            </h1>
          </div>

          <div className="rounded-[12px] border border-d8-border bg-[#050A14] p-8">
            <div className="flex min-h-[300px] items-center justify-center rounded-[10px] border border-d8-border bg-d8-bg">
              <LogoLockup kind="lockup" ink="brand" surface="dark" height={126} />
            </div>
          </div>
        </section>

        <Section title="Logo Controls" kicker="Reusable Inputs">
          <div className="grid gap-4 lg:grid-cols-3">
            {(['dark', 'light', 'transparent'] as const).flatMap(surface => (
              SURFACE_TONES[surface].map(tone => (
                <ToneSpecimen key={`${surface}-${tone.id}`} surface={surface} ink={tone.id} />
              ))
            ))}
          </div>
        </Section>

        <Section title="Color Tokens" kicker="Brand Foundation">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {COLOR_SWATCHES.map(color => (
              <div key={color.token} className="rounded-[8px] border border-d8-border bg-d8-surface-1 p-4">
                <div className="mb-4 h-16 rounded-[6px] border border-d8-border" style={{ backgroundColor: color.value }} />
                <div className="text-[13px] text-d8-text">{color.name}</div>
                <div className="mt-1 text-[11px] text-d8-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
                  {color.value}
                </div>
                <div className="mt-1 text-[10px] text-d8-text-muted/60" style={{ fontFamily: 'var(--font-mono)' }}>
                  {color.token}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Icon Targets" kicker="Mark Only">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ICON_ASSETS.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </Section>

        <Section title="Lockup And Social Targets" kicker="Text + Mark">
          <div className="grid gap-4 lg:grid-cols-2">
            {LOCKUP_ASSETS.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </Section>

        <section className="rounded-[10px] border border-d8-border bg-d8-surface-1 p-6">
          <h3 className="text-[18px] text-d8-text">Export Notes</h3>
          <div className="mt-4 grid gap-3 text-[14px] leading-6 text-d8-text-muted md:grid-cols-3">
            <p>Every preview box has `data-brand-asset`, width, and height attributes so an export script can target exact assets without guessing.</p>
            <p>The logo geometry accepts `primary`, `muted`, and `bg` colors, so new colorways do not require editing SVG paths.</p>
            <p>Browser screenshots should validate the contact sheet. Production files should come from deterministic SVG/raster exports.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
