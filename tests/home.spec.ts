import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Home from '@/views/home/index.vue'

// mock 首页接口
vi.mock('@/views/home/apis', () => ({
  getBanners: () => Promise.resolve([
    { id: 'b1', image: 'banner1' },
    { id: 'b2', image: 'banner2' },
  ]),
  getProducts: () => Promise.resolve([
    { id: 'p1001', title: 'A', desc: 'a', price: 1, thumb: '' },
    { id: 'p1002', title: 'B', desc: 'b', price: 2, thumb: '' },
    { id: 'p1003', title: 'C', desc: 'c', price: 3, thumb: '' },
  ]),
}))

// 记录 router.push 调用
const pushMock = vi.fn()

vi.mock('vue-router', async () => {
  const actual: any = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => ({ push: pushMock }),
  }
})

describe('Home 页面', () => {
  it('加载并渲染商品列表，点击跳转详情', async () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          'van-nav-bar': { template: '<div class="van-nav-bar"><slot /></div>' },
          'van-swipe': { template: '<div class="van-swipe"><slot /></div>' },
          'van-swipe-item': { template: '<div class="van-swipe-item"><slot /></div>' },
          'van-image': { template: '<img class="van-image" />' },
          'van-skeleton': { template: '<div class="van-skeleton"><slot /></div>' },
          // 让卡片可被选择与点击
          'van-card': { template: '<div class="van-card" @click="$emit(\'click\')"><slot /></div>' },
        },
      },
    })

    await flushPromises()

    const cards = wrapper.findAll('.van-card')
    expect(cards.length).toBeGreaterThan(0)
    // 基于 MSW 默认数据应为 3 条
    expect(cards.length).toBe(3)

    await cards[0].trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/detail/p1001')
  })
})
