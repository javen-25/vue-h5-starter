# 我的 H5 快速启动模板

自用的 Vue 3 + TypeScript + Vite 起步模版，仅保留最基础的移动端开发配置，方便直接拉取后开写页面。

## 包含的特性
- Vue 3 + TS + Vite 基础脚手架，`<script setup>` 书写体验
- Vue Router + 简单路由守卫（登录校验、动态标题）
- Pinia 状态管理，内置 `pinia-plugin-persistedstate` 持久化
- Vant 4 组件库，按需自动引入（`unplugin-auto-import` / `unplugin-vue-components` + `VantResolver`）
- Axios 轻量封装（统一 baseURL、Token 注入、错误消息规范化）
- PostCSS `px-to-viewport` 移动端适配，默认 375 设计稿
- MSW 开关式 Mock 能力（`VITE_ENABLE_MSW=true` 时启用）
- `normalize.css` + 基础全局样式

## 快速开始
```bash
npm install
npm run dev
```
