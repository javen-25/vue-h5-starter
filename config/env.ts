import { loadEnv } from 'vite'

// 统一加载环境变量并提供默认值
export function resolveEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE || '/',
  }
}
