const {app, BrowserWindow, Notification} = require('electron')
const windowStateKeeper = require('electron-window-state')

let mainWindow

function createWindow() {
  const state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350, minHeight: 350,
    backgroundColor: 'white',
    webPreferences: {
      // nodeIntegration: true,
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    }
  })

  state.manage(mainWindow)
  mainWindow.loadFile('./index.html').then(r => {})
  // mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {  // window close listener
    mainWindow = null
  })

}

// when the app is ready, create the main window
app.whenReady().then(() => {

  createWindow()
  //
  // const notification = new Notification({title: 'Welcome', body: 'You\'re online'})
  // notification.on('click', e => {
  //   mainWindow.focus()
  // })
  // notification.show()
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
    return
  }
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Webpack -> a module builder, main purpose is to bundle JS files for usage in browser
// Babel --> a JS compiler

