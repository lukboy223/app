const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, 'assets', 'favicon.ico'),
    resizable: false,
    maximizable: false,

  })

  win.loadFile('pages/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})