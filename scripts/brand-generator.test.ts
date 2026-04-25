import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { encodeOutput, findAvailablePort, resolveOutputPath } from './brand-generator'

const appRoot = path.resolve(import.meta.dirname, '..')

describe('brand-generator helpers', () => {
  it('encodes ico output from a png buffer without exploding file size', async () => {
    const png = await readFile(path.join(appRoot, 'design-kit/mark/icon-32.png'))
    const ico = await encodeOutput(png, { target: 'design-kit', path: 'favicon.ico', format: 'ico' })

    expect(ico.subarray(0, 4)).toEqual(Buffer.from([0x00, 0x00, 0x01, 0x00]))
    expect(ico.length).toBeLessThan(16_000)
  })

  it('resolves public outputs under the runtime asset base', () => {
    const result = resolveOutputPath('/tmp/design-kit', '/tmp/public', 'assets/brand', 'public', 'social/og-image.png')
    expect(result).toBe('/tmp/public/assets/brand/social/og-image.png')
  })

  it('finds an open localhost port', async () => {
    const port = await findAvailablePort()
    expect(port).toBeGreaterThan(0)
  })
})

