import { electronApi } from './electron'
import { webApi } from './web'
import type { PlatformAPI } from '../shared/api'

const isElectron = !!(window as any).versions?.electron

export const api: PlatformAPI = isElectron ? electronApi : webApi

