import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import './style.css'
import App from '@/App.vue'
import router from '@/router'

async function bootstrap() {
  const enableMsw = String(import.meta.env.VITE_ENABLE_MSW) === 'true'
  if (enableMsw) {
    const { worker } = await import('@/mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

bootstrap()
