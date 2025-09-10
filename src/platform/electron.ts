import type { PlatformAPI, Versions } from '../shared/api'

const getVersions = (): Versions => ({
  chrome: window.versions.chrome(),
  node: window.versions.node(),
  electron: window.versions.electron()
})

export const electronApi: PlatformAPI = {
  getVersions,
  async ping() {
    return window.versions.ping()
  },
  async saveData(key: string, value: string) {
    localStorage.setItem(key, value)
  },
  async readData(key: string) {
    return localStorage.getItem(key)
  }
}

