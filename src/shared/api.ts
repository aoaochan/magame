export interface Versions {
  chrome: string
  node: string
  electron: string
}

export interface PlatformAPI {
  getVersions(): Versions
  ping(): Promise<string>
  saveData?(key: string, value: string): Promise<void>
  readData?(key: string): Promise<string | null>
}

