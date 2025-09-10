const info = document.getElementById('info') as HTMLParagraphElement | null

const chromeVer = (navigator.userAgent.match(/Chrome\/([\d.]+)/)?.[1] ?? 'n/a')
const nodeVer = (navigator.userAgent.match(/Node\/([\d.]+)/)?.[1] ?? 'n/a')
const electronVer = 'browser'

if (info) {
  info.innerText = `This app is using 
Chrome (v${chromeVer}), 
Node.js (v${nodeVer}), 
and Electron (v${electronVer})`.replace(/\n/g, '');
}

export {}
