import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { setupRouterGuards } from '@/router/guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupRouterGuards(router)

export default router
