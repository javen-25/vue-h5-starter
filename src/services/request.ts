import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

// 轻量 Axios 封装：
// - 统一 baseURL、超时、通用 Header
// - 请求拦截注入 Token（如有）
// - 响应拦截统一错误处理，返回 data

const BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? '/'

function getToken(): string | undefined {
  try {
    return localStorage.getItem('token') || undefined
  } catch {
    return undefined
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: false,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    const headers = AxiosHeaders.from(config.headers)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    // 默认 JSON
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    config.headers = headers
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // 统一错误信息
    let message = '网络异常，请稍后重试'
    const status = error.response?.status
    if (status) {
      switch (status) {
        case 400:
          message = '请求错误(400)'
          break
        case 401:
          message = '未授权或登录已过期(401)'
          break
        case 403:
          message = '拒绝访问(403)'
          break
        case 404:
          message = '资源不存在(404)'
          break
        case 500:
          message = '服务器错误(500)'
          break
        default:
          message = `请求失败(${status})`
      }
    } else if (error.message?.includes('timeout')) {
      message = '请求超时，请检查网络'
    }
    ;(error as AxiosError & { normalizedMessage?: string }).normalizedMessage = message
    return Promise.reject(error)
  },
)

// 便捷方法：直接返回 data，避免处处 .data
async function request<T = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<T> {
  const res: AxiosResponse<T> = await instance.request<T, AxiosResponse<T>, D>(config)
  return res.data
}

function get<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return request<T>({ url, method: 'GET', ...(config || {}) })
}

function post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return request<T, D>({ url, method: 'POST', data, ...(config || {}) })
}

function put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return request<T, D>({ url, method: 'PUT', data, ...(config || {}) })
}

function del<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return request<T>({ url, method: 'DELETE', ...(config || {}) })
}

// 文件上传示例
function upload<T = unknown>(url: string, formData: FormData, config?: AxiosRequestConfig<FormData>) {
  return request<T, FormData>({
    url,
    method: 'POST',
    data: formData,
    headers: AxiosHeaders.from({ 'Content-Type': 'multipart/form-data' }),
    ...(config || {}),
  })
}

export const http = {
  instance,
  request,
  get,
  post,
  put,
  del,
  upload,
}

export default http
