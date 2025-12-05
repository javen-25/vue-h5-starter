// 获取各环境的构建输出目录
export function resolveOutDir(mode: string) {
  const map: Record<string, string> = {
    production: 'dist-prod',
    staging: 'dist-staging',
    development: 'dist-dev',
  }
  return map[mode] || 'dist'
}
