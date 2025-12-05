import { http, HttpResponse } from 'msw'

export const handlers = [
  // 示例接口：GET /api/hello
  http.get('/api/hello', () => HttpResponse.json({ message: 'Hello from MSW' })),
]
