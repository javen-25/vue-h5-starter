export type UserInfo = {
  id: string
  name: string
  role?: string
  [key: string]: any
}

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {}
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {}
}

export function getUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserInfo) : null
  } catch {
    return null
  }
}

export function setUser(user: UserInfo) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {}
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY)
  } catch {}
}

