import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Inspector from 'vite-plugin-vue-inspector'

// 集中管理插件，方便扩展/测试
export function createPlugins() {
  return [
    vue(),
    Inspector(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [VantResolver({ importStyle: true })],
      dts: 'src/components.d.ts',
    }),
  ]
}
