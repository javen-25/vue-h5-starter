<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { getHello } from './apis/index'
import type { HelloResponse } from './types'

// Pinia store
const counterStore = useCounterStore()

// Mock data state
const helloMessage = ref<HelloResponse | null>(null)
const loading = ref(false)

// Load mock data
const loadMockData = async () => {
  loading.value = true
  try {
    const [helloRes] = await Promise.all([
      getHello()
    ])
    helloMessage.value = helloRes
  } catch (error) {
    console.error('Mock 数据加载失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMockData()
})

// Pinia interactions
const incrementCounter = () => {
  counterStore.increment()
}

const resetCounter = () => {
  counterStore.reset()
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <p class="hero-badge">H5 Starter</p>
      <h1>Vue H5 启动模板</h1>
      <p class="hero-desc">一套即开即用的移动端模板，内置状态管理、接口模拟与 TypeScript 支持，帮助你快速完成业务验证。</p>
      <div class="hero-highlights">
        <div>
          <p class="hero-highlights__label">技术栈</p>
          <p class="hero-highlights__value">Vue 3 · Pinia · Vite</p>
        </div>
        <div>
          <p class="hero-highlights__label">适用场景</p>
          <p class="hero-highlights__value">活动页 · 轻应用 · H5 运营</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <h2>状态响应示例</h2>
        <p>Pinia 的计数器状态与双倍计算属性，方便核对状态联动。</p>
      </div>
      <div class="counter-display">
        <div>
          <span class="counter-label">当前计数</span>
          <span class="counter-value">{{ counterStore.count }}</span>
        </div>
        <span class="counter-double">双倍值：{{ counterStore.double }}</span>
      </div>
      <div class="counter-controls">
        <button @click="incrementCounter" class="btn btn-primary">增加计数</button>
        <button @click="resetCounter" class="btn">重置计数</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <h2>Mock 接口示例</h2>
        <p>通过 Mock Service Worker 返回示例文案，便于验证接口流程。</p>
      </div>
      <div v-if="loading" class="loading">接口响应中...</div>
      <div v-else>
        <div v-if="helloMessage" class="hello-block">
          <h3>返回数据</h3>
          <p class="hello-content">{{ helloMessage.message }}</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <h2>模板亮点</h2>
        <p>沉淀关键能力，满足常见 H5 项目需求。</p>
      </div>
      <div class="feature-list">
        <article class="feature-item">
          <h4>工程化脚手架</h4>
          <p>Vite 构建 + TypeScript 类型提示，提升开发体验。</p>
        </article>
        <article class="feature-item">
          <h4>数据 Mock</h4>
          <p>MSW 驱动的接口模拟，前后端并行开发不受阻。</p>
        </article>
        <article class="feature-item">
          <h4>组件化布局</h4>
          <p>组合式 API 与 Pinia 协作，保持页面结构清晰。</p>
        </article>
        <article class="feature-item">
          <h4>移动端适配</h4>
          <p>内置响应式样式与视觉节奏，适配常见 H5 场景。</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding: 32px 20px 80px;
  background: linear-gradient(180deg, #f5f7ff 0%, #ffffff 60%);
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.hero {
  max-width: 1040px;
  margin: 0 auto 32px;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(circle at top, rgba(82, 111, 255, 0.12), transparent 55%);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(82, 111, 255, 0.4);
  color: #526fff;
  font-size: 12px;
  letter-spacing: 0.1em;
}

.hero h1 {
  margin: 16px 0 12px;
  font-size: 32px;
  color: #101828;
}

.hero-desc {
  margin: 0 auto 24px;
  max-width: 560px;
  color: #475467;
  line-height: 1.6;
}

.hero-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.hero-highlights__label {
  margin: 0;
  color: #98a2b3;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-highlights__value {
  margin: 4px 0 0;
  color: #101828;
  font-size: 18px;
}

.panel {
  max-width: 960px;
  margin: 0 auto 20px;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
}

.panel__header h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #0f172a;
}

.panel__header p {
  margin: 0 0 20px;
  color: #475467;
}

.counter-display {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #f4f7ff;
  color: #0f172a;
}

.counter-label {
  color: #475467;
  font-size: 14px;
  margin-right: 12px;
}

.counter-value {
  font-size: 32px;
  font-weight: 600;
  color: #101828;
}

.counter-double {
  font-size: 14px;
  color: #526fff;
}

.counter-controls {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 120px;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #fff;
  color: #101828;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #6675ff, #8e94ff);
  color: #fff;
  border: none;
  box-shadow: 0 10px 20px rgba(102, 117, 255, 0.3);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(15, 23, 42, 0.12);
}

.loading {
  padding: 32px;
  text-align: center;
  color: #475467;
}

.hello-block {
  padding: 20px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e4e7ec;
}

.hello-block h3 {
  margin: 0 0 12px;
  color: #0f172a;
}

.hello-content {
  margin: 0;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  color: #475467;
  word-break: break-word;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.feature-item {
  padding: 16px;
  border-radius: 12px;
  background: #f7f9ff;
  border: 1px solid rgba(82, 111, 255, 0.15);
}

.feature-item h4 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #101828;
}

.feature-item p {
  margin: 0;
  color: #475467;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
  }

  .hero h1 {
    font-size: 26px;
  }

  .panel {
    padding: 20px;
  }

  .counter-controls {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
