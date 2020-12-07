const {ipcRenderer, contextBridge} = require('electron')

console.log(`preload functions to expose`, )

// add the name of the API that I want to expose
contextBridge.exposeInMainWorld('e_notification', {
  sendNotification(message) {
    ipcRenderer.send('notify', message)
  }

})


// Note: another way to expose specific methods to the renderer
contextBridge.exposeInMainWorld('electron', {
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

