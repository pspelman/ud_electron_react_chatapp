const {ipcRenderer, contextBridge} = require('electron')
const fs = require('fs')
const { devToolsEnhancer } = require('electron-redux-devtools')

// const devToolsEnhancer = require('electron-redux-devtools')

// want to write to desktop
// could get the location via IPC
// let desktopPath
// ipcRenderer.invoke('desktop-path').then(path => {
//   desktopPath = path
// })

window.writeToFile = text => {
  console.log(`[preload.js] trying to write to file: `, text)
  fs.writeFile(`${desktopPath}/app.txt`, text, console.log)
}

const restart_app = () => {
  console.log(`sending command to reload application`,)
  ipcRenderer.invoke('reload-electron-app')
}

window.versions = {
  electron: process.versions.electron,
  node: process.versions.node,
}

console.log(`preload functions to expose`,)

// add the name of the API that I want to expose
contextBridge.exposeInMainWorld('e_notification', {
  sendNotification(message) {
    ipcRenderer.send('notify', message)
  }

})


// Note: another way to expose specific methods to the renderer
contextBridge.exposeInMainWorld('electron', {
  devToolsEnhancer,
  controlApi: {
    restartApp() {
      console.log(`invoking restart app`, )
      ipcRenderer.invoke('reload-electron-app')
    },
    quitApp() {
      ipcRenderer.invoke('app-quit')
    }
  },
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('battery-status', batteryStatus)
    }
  },
  batteryApi: {
    sendBatteryStatus(batteryStatus) {
      ipcRenderer.send('battery-status', batteryStatus)
    }
  },
  fileApi: {
    // files and stuff
  }


})

window.sendNotification = (message) => {
  ipcRenderer.send('notify', message)
}

