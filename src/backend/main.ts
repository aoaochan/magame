import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'

// Auto-reload in development when build files change
if (process.env.NODE_ENV !== 'production') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reload = require('electron-reload')
    reload(path.join(__dirname, '..'), { electron: require('electron') })
  } catch {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600
  })

  win.loadFile(path.join(__dirname, '../frontend/index.html'))
}

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => app.quit())
