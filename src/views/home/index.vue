<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/services/request'

// 模板能力清单（与 README 同步）
const features = [
  { title: '工程化基础', desc: 'Vue 3 + TS + Vite，<script setup> 与自动导入开箱可用。' },
  { title: '路由守卫', desc: '登录校验、仅访客可访问页、动态标题。' },
  { title: '状态管理', desc: 'Pinia + 持久化插件，演示全局状态存储。' },
  { title: 'UI 组件', desc: 'Vant 4 按需加载，示例导航栏、表单与按钮。' },
  { title: '接口封装', desc: 'Axios 统一 baseURL/Token/错误文案，含上传示例。' },
  { title: '移动端适配', desc: 'PostCSS px-to-viewport，默认 375 设计稿。' },
  { title: '本地 Mock', desc: 'MSW 开关式启用，提供 hello 接口示例。' },
  { title: '全局样式', desc: 'normalize.css 与基础样式基线。' },
]

const helloMessage = ref<string>('加载中...')
const helloError = ref('')
const mockFeature = features.find((f) => f.title === '本地 Mock')

async function fetchHello() {
  helloError.value = ''
  try {
    // BASE_URL 默认 /api，此处仅填相对路径避免重复前缀
    const res = await http.get<{ message: string }>('/hello')
    helloMessage.value = res.message
  } catch (err: any) {
    helloError.value = err?.normalizedMessage || '获取 hello 失败'
  }
}

onMounted(fetchHello)

const mockStatus = computed(() => {
  if (helloError.value) {
    return {
      tag: 'Mock 异常',
      type: 'danger' as const,
      text: helloError.value,
    }
  }
  if (helloMessage.value === '加载中...') {
    return {
      tag: 'Mock 加载中',
      type: 'primary' as const,
      text: '正在请求 hello 接口',
    }
  }
  return {
    tag: 'Mock 正常',
    type: 'success' as const,
    text: helloMessage.value,
  }
})
</script>

<template>
  <div>
    <van-nav-bar title="Vue H5 启动模板" />
    <van-cell title="最新功能" label="开箱即用的移动端开发能力" />
    <van-cell-group inset>
    <van-cell
      v-for="item in features.filter((f) => f.title !== '本地 Mock')"
      :key="item.title"
      :title="item.title"
      :label="item.desc"
    />

    <van-cell v-if="mockFeature" title="本地 Mock">
      <template #label>
        <div class="mock-label">
          <span class="mock-desc">{{ mockFeature.desc }}</span>
          <div class="mock-status">
            <van-tag size="medium" plain :type="mockStatus.type">
              {{ mockStatus.tag }}
            </van-tag>
            <span class="mock-status__text">{{ mockStatus.text }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
  </div>
</template>

<style scoped lang="scss">
.mock-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #646566;
  font-size: 14px;
  line-height: 1.5;
}

.mock-desc {
  color: #7d7e80;
}

.mock-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mock-status__text {
  color: #8c8c8c;
  font-size: 13px;
}
</style>
