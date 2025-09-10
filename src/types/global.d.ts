interface Window {
  versions: {
    node: () => string
    chrome: () => string
    electron: () => string
    ping: () => Promise<string>
  }
}

