import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/frontend',
  base: './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: '../../www',
    emptyOutDir: true,
    sourcemap: true
  }
})
