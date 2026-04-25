import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { Resvg } from '@resvg/resvg-js'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { z } from 'zod'
import { encodeOutput, findAvailablePort, resolveOutputPath } from './brand-generator'

const rootDir = path.resolve(import.meta.dir, '..')
const designKitDir = path.join(rootDir, 'design-kit')
const publicDir = path.join(rootDir, 'public')

const outputSchema = z.object({
  target: z.enum(['design-kit', 'public']),
  path: z.string().min(1),
  format: z.enum(['png', 'jpg', 'ico']).optional(),
  quality: z.number().int().min(1).max(100).optional(),
})

const variantSchema = z.object({
  id: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  outputs: z.array(outputSchema).min(1),
})

const assetSchema = z.discriminatedUnion('sourceType', [
  z.object({
    id: z.string().min(1),
    sourceType: z.literal('copy'),
    source: z.string().min(1),
    outputs: z.array(z.object({ target: z.enum(['design-kit', 'public']), path: z.string().min(1) })).min(1),
  }),
  z.object({
    id: z.string().min(1),
    sourceType: z.literal('svg'),
    source: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    outputs: z.array(outputSchema).min(1),
  }),
  z.object({
    id: z.string().min(1),
    sourceType: z.literal('svg-set'),
    source: z.string().min(1),
    variants: z.array(variantSchema).min(1),
  }),
  z.object({
    id: z.string().min(1),
    sourceType: z.literal('branding-page'),
    source: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    outputs: z.array(outputSchema).min(1),
  }),
])

const brandSchema = z.object({
  name: z.string(),
  slogan: z.string(),
  referenceDir: z.string(),
  brandingPageRoute: z.string(),
  runtimeBase: z.string(),
  sources: z.record(z.string(), z.string()),
  assets: z.array(assetSchema).min(1),
})

type BrandManifest = z.infer<typeof brandSchema>
const checkMode = process.argv.includes('--check')

async function main() {
  const manifest = await loadManifest()
  const writes = new Map<string, Buffer | string>()
  let browserServer: ReturnType<typeof startViteServer> | null = null
  let pageAssetBuffers: Map<string, Buffer> | null = null

  try {
    for (const asset of manifest.assets) {
      if (asset.sourceType === 'copy') {
        const svgText = await readSourceText(manifest, asset.source)
        for (const output of asset.outputs) {
          writes.set(
            resolveOutputPath(designKitDir, publicDir, manifest.runtimeBase, output.target, output.path),
            svgText,
          )
        }
        continue
      }

      if (asset.sourceType === 'svg') {
        const sourceSvg = await readSourceText(manifest, asset.source)
        const png = renderSvgToPng(sourceSvg, asset.width, asset.height)
        for (const output of asset.outputs) {
          writes.set(
            resolveOutputPath(designKitDir, publicDir, manifest.runtimeBase, output.target, output.path),
            await encodeOutput(png, output),
          )
        }
        continue
      }

      if (asset.sourceType === 'svg-set') {
        const sourceSvg = await readSourceText(manifest, asset.source)
        for (const variant of asset.variants) {
          const png = renderSvgToPng(sourceSvg, variant.width, variant.height)
          for (const output of variant.outputs) {
            writes.set(
              resolveOutputPath(designKitDir, publicDir, manifest.runtimeBase, output.target, output.path),
              await encodeOutput(png, output),
            )
          }
        }
        continue
      }

      if (!browserServer) {
        browserServer = await startViteServer()
      }
      if (!pageAssetBuffers) {
        pageAssetBuffers = await captureBrandingPageAssets(browserServer.baseUrl, manifest)
      }
      const png = pageAssetBuffers.get(asset.source)
      if (!png) {
        throw new Error(`Missing branding-page capture for ${asset.source}`)
      }
      for (const output of asset.outputs) {
        writes.set(
          resolveOutputPath(designKitDir, publicDir, manifest.runtimeBase, output.target, output.path),
          await encodeOutput(png, output),
        )
      }
    }

    await syncOutputs(writes)
    await removeLegacyRootAssets()
    if (checkMode) {
      console.log(`brand:check OK (${writes.size} files)`)
    } else {
      console.log(`brand:build wrote ${writes.size} files`)
    }
  } finally {
    if (browserServer) {
      browserServer.process.kill('SIGTERM')
      await onceClosed(browserServer.process)
    }
  }
}

async function loadManifest() {
  const raw = await readFile(path.join(designKitDir, 'brand.json'), 'utf8')
  return brandSchema.parse(JSON.parse(raw))
}

async function readSourceText(manifest: BrandManifest, sourceKey: string) {
  const relativePath = manifest.sources[sourceKey]
  if (!relativePath) {
    throw new Error(`Unknown source key: ${sourceKey}`)
  }
  return readFile(path.join(designKitDir, relativePath), 'utf8')
}

function renderSvgToPng(svg: string, width: number, height: number) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: 'rgba(0,0,0,0)',
  })
  const png = resvg.render()
  const rendered = png.asPng()
  return sharp(rendered).resize(width, height).png().toBuffer()
}

async function captureBrandingPageAssets(baseUrl: string, manifest: BrandManifest) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } })
  try {
    await page.goto(`${baseUrl}${manifest.brandingPageRoute}`, { waitUntil: 'networkidle' })
    const output = new Map<string, Buffer>()
    for (const asset of manifest.assets) {
      if (asset.sourceType !== 'branding-page') continue
      const selector = `[data-brand-export="${asset.source}"]`
      const element = await page.waitForSelector(selector, { state: 'attached' })
      const buffer = await element.screenshot({ type: 'png' })
      const metadata = await sharp(buffer).metadata()
      if (metadata.width !== asset.width || metadata.height !== asset.height) {
        throw new Error(`Captured ${asset.source} at ${metadata.width}x${metadata.height}, expected ${asset.width}x${asset.height}`)
      }
      output.set(asset.source, buffer)
    }
    return output
  } finally {
    await browser.close()
  }
}

async function syncOutputs(writes: Map<string, Buffer | string>) {
  const changed: string[] = []
  for (const [filePath, nextContent] of writes) {
    await mkdir(path.dirname(filePath), { recursive: true })
    const current = await readExisting(filePath)
    if (current !== null && buffersEqual(current, nextContent)) {
      continue
    }
    changed.push(filePath)
    if (!checkMode) {
      await writeFile(filePath, nextContent)
    }
  }

  if (checkMode && changed.length > 0) {
    throw new Error(`Generated branding assets are stale:\n${changed.join('\n')}`)
  }
}

async function readExisting(filePath: string) {
  try {
    return await readFile(filePath)
  } catch {
    return null
  }
}

function buffersEqual(current: Buffer, next: Buffer | string) {
  const nextBuffer = typeof next === 'string' ? Buffer.from(next) : next
  return current.equals(nextBuffer)
}

async function removeLegacyRootAssets() {
  const legacy = [
    'apple-touch-icon.png',
    'favicon.ico',
    'icon-192.png',
    'icon-512.png',
    'icon.svg',
    'og-image-v2.png',
    'og-image-v2.jpg',
    'x-banner.png',
    'x-banner.jpg',
  ]

  const stale: string[] = []
  for (const relativePath of legacy) {
    const absolutePath = path.join(publicDir, relativePath)
    try {
      await stat(absolutePath)
      stale.push(relativePath)
      if (!checkMode) {
        await rm(absolutePath, { force: true })
      }
    } catch {
      continue
    }
  }

  if (checkMode && stale.length > 0) {
    throw new Error(`Legacy root branding files still exist:\n${stale.join('\n')}`)
  }
}

async function startViteServer() {
  const port = await findAvailablePort()
  const child = spawn('bun', ['x', 'vite', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: rootDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, CI: '1' },
  })

  let stdout = ''
  let stderr = ''
  child.stdout.on('data', chunk => { stdout += String(chunk) })
  child.stderr.on('data', chunk => { stderr += String(chunk) })

  const baseUrl = `http://127.0.0.1:${port}`
  const deadline = Date.now() + 30_000

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Vite dev server exited early.\n${stdout}\n${stderr}`)
    }
    try {
      const response = await fetch(baseUrl)
      if (response.ok) {
        return { baseUrl, process: child }
      }
    } catch {
      // keep polling
    }
    await delay(250)
  }

  child.kill('SIGTERM')
  throw new Error(`Timed out waiting for Vite dev server.\n${stdout}\n${stderr}`)
}

async function onceClosed(child: ReturnType<typeof spawn>) {
  if (child.exitCode !== null) return
  await new Promise<void>(resolve => child.once('close', () => resolve()))
}

await main()
