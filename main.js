const {app, BrowserWindow, Notification, ipcMain, Menu} = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const {REDUX_DEVTOOLS} = require("electron-devtools-installer");
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const appMenu = require('./utils/MainMenu')
const isDev = !app.isPackaged // if this is true, we are in production, else in dev

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png')
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
  mainWindow.loadFile('./index.html').then(r => {})
  // mainWindow.loadURL(`file://${__dirname}/index.html`)
  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {  // window close listener
    mainWindow = null
  })

}

function createSplashScreen() {
  const state = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 400
  })

  let newWindow
  newWindow = new BrowserWindow({
    // x: mainWindow.getPosition().x - 100,
    // y: mainWindow.getPosition().y - 100,
    width: state.width,
    height: state.height,
    minWidth: 350, minHeight: 350,
    backgroundColor: 'white',
    webPreferences: {
      // nodeIntegration: true,
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js'), // this is the path to the preload.js
    }
  })
  // create the app menu
  appMenu(newWindow)
  // Todo: Implement touchbar features
  // if (process.platform === 'darwin') newWindow.setTouchBar(touchbar)

  state.manage(newWindow)
  newWindow.loadFile('./additionalWindow.html').then(r => {})
  // newWindow.loadURL(`file://${__dirname}/index.html`)

  newWindow.on('closed', () => {  // window close listener
    newWindow = null
  })

}


// adding reloading
if (isDev) {
  console.log(`adding electron-reload`, )

  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')  // specify the path into electron
    
  })  // this is the reload 
}

// when the app is ready, create the main window
app.whenReady().then(() => {
  {
    setTimeout(createWindow, 400);
      installExtension(REDUX_DEVTOOLS)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .then((name) => {
        console.log(`Added Extension:  ${name}`)
      })
      .catch((err) => console.log("An error occurred: ", err));
  }
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
  console.log(`QUITTING THE APP`, )
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

