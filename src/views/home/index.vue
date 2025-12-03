<script setup lang="ts">
// 仅展示模板包含的能力列表
const features = [
  { title: 'Vue 3 + Vite 工程化', desc: '现代构建链路，默认 TypeScript 支持与按需自动导入。' },
  { title: '状态管理', desc: '集成 Pinia 与持久化示例，方便全局状态维护。' },
  { title: '接口模拟', desc: '内置 Mock Service Worker，支持本地接口调试与联调占位。' },
  { title: '移动端适配', desc: '响应式布局与通用样式基线，覆盖常见 H5 运营场景。' },
]
</script>

<template>
  <div>
    <van-nav-bar title="Vue H5 启动模板" />
    <van-cell title="功能特点" label="模板开箱即用能力清单" />
    <van-cell-group inset>
      <van-cell
        v-for="item in features"
        :key="item.title"
        :title="item.title"
        :label="item.desc"
      />
    </van-cell-group>
  </div>
</template>
