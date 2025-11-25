// Vitest setup file
// 在测试环境使用 MSW（node 版）
import { setupServer } from 'msw/node'
import { handlers } from '../src/mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
