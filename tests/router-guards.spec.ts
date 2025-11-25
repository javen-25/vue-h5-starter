import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from '@/router/guards'

vi.mock('@/services/auth', () => ({
  // 通过 mockReturnValue 在用例内切换登录态
  getToken: vi.fn(),
}))
import { getToken } from '@/services/auth'

function createTestRouter(routes: RouteRecordRaw[]) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  setupRouterGuards(router)
  return router
}

describe('路由守卫', () => {
  beforeEach(() => {
    // 重置登录态与标题
    ;(getToken as any).mockReset()
    document.title = ''
  })

  it('未登录访问 requiresAuth -> 重定向到 /login 并带 redirect', async () => {
    ;(getToken as any).mockReturnValue(undefined)

    const routes: RouteRecordRaw[] = [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/secure', name: 'secure', component: { template: '<div />' }, meta: { requiresAuth: true, title: '安全页' } },
      { path: '/login', name: 'login', component: { template: '<div />' }, meta: { guestOnly: true, title: '登录' } },
    ]
    const router = createTestRouter(routes)

    await router.push('/secure')

    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.query.redirect).toBe('/secure')
  })

  it('已登录访问 guestOnly -> 按 redirect 或 / 跳转', async () => {
    ;(getToken as any).mockReturnValue('token')

    const routes: RouteRecordRaw[] = [
      { path: '/', name: 'home', component: { template: '<div />' }, meta: { title: '首页' } },
      { path: '/foo', name: 'foo', component: { template: '<div />' }, meta: { title: 'Foo' } },
      { path: '/login', name: 'login', component: { template: '<div />' }, meta: { guestOnly: true, title: '登录' } },
    ]
    const router = createTestRouter(routes)

    await router.push('/login?redirect=/foo')
    expect(router.currentRoute.value.path).toBe('/foo')
  })

  it('路由切换后根据 meta.title 设置 document.title', async () => {
    ;(getToken as any).mockReturnValue(undefined)

    const routes: RouteRecordRaw[] = [
      { path: '/', name: 'home', component: { template: '<div />' }, meta: { title: '首页' } },
      { path: '/public', name: 'public', component: { template: '<div />' }, meta: { title: '公开页' } },
    ]
    const router = createTestRouter(routes)

    await router.push('/public')
    expect(document.title).toBe('公开页')
  })
})

