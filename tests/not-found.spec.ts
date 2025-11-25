import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from '@/views/not-found/index.vue'

const replaceMock = vi.fn()
vi.mock('vue-router', async () => {
  const actual: any = await vi.importActual('vue-router')
  return { ...actual, useRouter: () => ({ replace: replaceMock }) }
})

describe('NotFound 页面', () => {
  it('点击按钮返回首页', async () => {
    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          'van-button': { template: '<button class="van-button" @click="$emit(\'click\')"><slot /></button>' },
        },
      },
    })

    await wrapper.get('.van-button').trigger('click')
    expect(replaceMock).toHaveBeenCalledWith('/')
  })
})

