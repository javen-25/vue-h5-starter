import type { Router } from 'vue-router'
import { getToken } from '@/services/auth'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    // 已登录则不可访问仅访客可见页面（如登录页）
    if (to.meta?.guestOnly && getToken()) {
      const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/'
      return { path: redirect }
    }

    if (to.meta?.requiresAuth && !getToken()) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
    return true
  })

  router.afterEach((to) => {
    if (to.meta?.title) {
      document.title = String(to.meta.title)
    }
  })
}

export default setupRouterGuards
