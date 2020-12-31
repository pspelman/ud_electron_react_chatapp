const {app, BrowserWindow, Notification, ipcMain, Tray, Menu} = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
// const {REDUX_DEVTOOLS} = require("electron-devtools-installer");
// const {default: installExtension, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer');
const appMenu = require('./utils/MainMenu')
const isDev = !app.isPackaged // if this is true, we are in production, else in dev

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png')
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png')
if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon)
}

let mainWindow;

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
    show: false,
    webPreferences: {
      // nodeIntegration: true,
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // this is the path to the preload.js
    }
  })
  // create the app menu
  appMenu(mainWindow)
  // Todo: Implement touchbar features
  // if (process.platform === 'darwin') mainWindow.setTouchBar(touchbar)

  state.manage(mainWindow)
  mainWindow.loadFile('./index.html').then(r => {
  })
  // mainWindow.loadURL(`file://${__dirname}/index.html`)
  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {  // window close listener
    mainWindow = null
  })
  return mainWindow
}

let splashWindow

function createSplashScreen() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 200,
    minWidth: 350, minHeight: 350,
    backgroundColor: '#6e707e',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    }
  })
  splashWindow.loadFile('splash.html')
  splashWindow.on('closed', () => {  // window close listener
    splashWindow = null
  })
  return splashWindow

}


// adding reloading
if (isDev) {
  console.log(`adding electron-reload`,)

  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')  // specify the path into electron

  })  // this is the reload 
}

let tray = null
// when the app is ready, create the main window
app.whenReady().then(() => {
  mainWindow = createWindow()
  let splash = createSplashScreen()
  mainWindow.once('ready-to-show', () => {
    splash.hide()
    splash.destroy()
    console.log(`trying to show the main window now!!`, )
    mainWindow.show()
  })


  // {
  //   setTimeout(createWindow, 100)
  //   installExtension(REDUX_DEVTOOLS)
  //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //     .then((name) => {
  //       console.log(`Added Extension:  ${name}`)
  //     })
  //     .catch((err) => console.log("An error occurred: ", err));
  // }
  //   (async () => {
  //     console.log(`waiting for mainWindow`, )
  //     while (mainWindow === 'undefined') {
  //       await new Promise(resolve => setTimeout(resolve, 1000))
  //       mainWindow.once('ready-to-show', () => {
  //         splash.destroy()
  //         console.log(`trying to show the main window now!!`, )
  //         mainWindow.show()
  //       })
  //     }
  //   })()

  tray = new Tray(trayIcon)
  let menu = Menu.buildFromTemplate(require('./utils/Menu').createTemplate(app))

  tray.setContextMenu(menu)

  // create macOS menu
  // build the menu

  // const template = require(`${__dirname}/utils/Menu`).createTemplate(app)  // the course approach for adding the menu
  // let menu = Menu.buildFromTemplate(appMenu);
  // set as the main app menu
  // Menu.setApplicationMenu(menu)


  // createWindow()
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

ipcMain.handle('reload-electron-app', () => {
  // console.log(`MAIN PROCESS --> calling app.relaunch()`, )
  // mainWindow = null
  // app.relaunch()
  // app.exit()

});

ipcMain.handle('app-quit', () => {
  console.log(`QUITTING THE APP`,)
  app.exit()
});

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

