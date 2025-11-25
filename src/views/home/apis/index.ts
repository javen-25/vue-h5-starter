import { http } from '@/services/request'
import type { HelloResponse } from '@/views/home/types'

export function getHello() {
  return http.get<HelloResponse>('/hello')
}
