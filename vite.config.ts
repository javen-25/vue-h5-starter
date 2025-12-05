import { defineConfig } from 'vite'
import { resolveEnv } from './config/env'
import { alias } from './config/alias'
import { createPlugins } from './config/plugins'
import { resolveOutDir } from './config/build'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { base } = resolveEnv(mode)
  return {
    base,
    resolve: {
      alias,
    },
    plugins: createPlugins(),
    build: {
      outDir: resolveOutDir(mode),
    },
  }
})
