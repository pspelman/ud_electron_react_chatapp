// modules
const {shell, Menu, dialog} = require('electron')

module.exports = (appWindow) => {
  let template = [
    {'role': 'editMenu'},
    {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              // console.log('in FOCUS!');
              const {BrowserWindow} = require('electron');
              BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) {
                  // console.log('Closing!');
                  win.close();
                }
              })
            }
            focusedWindow.reload()
          }
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }, {
        type: 'separator'
      }, {
        label: 'App Menu Demo',
        click: function (_, focusedWindow) {
          if (focusedWindow) {
            const options = {
              type: 'info',
              title: 'Application Menu Demo',
              buttons: ['Ok'],
              message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
            }
            dialog.showMessageBox(focusedWindow, options)
          }
        }
      }]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        // nooooop
        role: 'minimize'
      }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        type: 'separator'
      }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        click: () => {
          app.emit('activate')
        }
      }]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: () => {
          // The shell module provides functions related to desktop integration.
          // An example of opening a URL in the user's default browser:
          const {shell} = require('electron');
          shell.openExternal('http://electron.atom.io')
        }
      }]
    }
  ]
  // create macOS menu
  if (process.platform === 'darwin') template.unshift({role: 'appMenu'})  // appMenu is used by Electron to make the Mac menu

  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

}