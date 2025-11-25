import { http, HttpResponse } from 'msw'

export const handlers = [
  // 示例接口：GET /api/hello
  http.get('/api/hello', () => HttpResponse.json({ message: 'Hello from MSW' })),

  // 登录
  http.post('/api/login', async ({ request }) => {
    const body: any = await request.json()
    if (body?.username === 'demo' && body?.password === '123456') {
      return HttpResponse.json({
        token: 'mock-token-123',
        user: {
          id: 'u_001',
          name: '演示用户',
          role: 'user',
          avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
      })
    }
    return HttpResponse.json({ message: '账号或密码错误' }, { status: 401 })
  }),
]
