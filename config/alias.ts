import { fileURLToPath, URL } from 'node:url'

// Vite 与 TS 保持一致的路径别名
export const alias = {
  '@': fileURLToPath(new URL('../src', import.meta.url)),
}
