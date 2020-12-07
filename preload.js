const {ipcRenderer} = require('electron')

console.log(`preload functions to expose`, )

window.sendNotification = (message) => {
  ipcRenderer.send('notify', message)
}

