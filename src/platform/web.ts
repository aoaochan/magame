import type { PlatformAPI, Versions } from '../shared/api'

const parseUA = (re: RegExp) => navigator.userAgent.match(re)?.[1] ?? 'n/a'

const getVersions = (): Versions => ({
  chrome: parseUA(/Chrome\/([\d.]+)/),
  node: parseUA(/Node\/([\d.]+)/),
  electron: 'browser'
})

export const webApi: PlatformAPI = {
  getVersions,
  async ping() {
    return 'pong(web)'
  },
  async saveData(key: string, value: string) {
    localStorage.setItem(key, value)
  },
  async readData(key: string) {
    return localStorage.getItem(key)
  }
}

