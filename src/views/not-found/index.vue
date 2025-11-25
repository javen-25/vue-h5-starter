<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.replace('/')
}
</script>

<template>
  <div class="not-found">
    <h2>页面不存在（404）</h2>
    <p>你访问的页面不存在或已被移动。</p>
    <van-button type="primary" size="small" @click="goHome">返回首页</van-button>
  </div>
</template>

<style scoped>
.not-found {
  padding: 16px;
}
</style>

