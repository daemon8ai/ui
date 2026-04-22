import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  plugins: [
    contentCollections(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
  test: {
    environment: 'node',
    globals: true,
  },
})
