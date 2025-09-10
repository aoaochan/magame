import { api } from '../platform'

const info = document.getElementById('info') as HTMLParagraphElement | null

if (info) {
  const v = api.getVersions()
  info.innerText = `This app is using 
Chrome (v${v.chrome}), 
Node.js (v${v.node}), 
and Electron (v${v.electron})`.replace(/\n/g, '')
}

;(async () => {
  const res = await api.ping()
  alert(res)
})()
