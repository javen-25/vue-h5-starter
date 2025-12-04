import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'normalize.css'
import './style.scss'
import App from '@/App.vue'
import router from '@/router'

async function bootstrap() {
  const enableMsw = String(import.meta.env.VITE_ENABLE_MSW) === 'true'
  if (enableMsw) {
    const { worker } = await import('@/mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  app.use(router)
  app.mount('#app')
}

bootstrap()
