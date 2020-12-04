const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')
let mainWindow

function createWindow() {
  let state = windowStateKeeper({
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
      nodeIntegration: true,
    }
  })

  state.manage(mainWindow)
  mainWindow.loadFile('./index.html')
  mainWindow.webContents.openDevTools()

}

// when the app is ready, create the main window
app.whenReady().then(createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
