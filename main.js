const { app, BrowserWindow, Menu, ipcMain, screen } = require('electron')
const path = require('path')

const width = 200;
const height = 250;

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: width,
    height: 250,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, 'assets', 'favicon.ico'),
    resizable: false,
    maximizable: false,
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('pages/index.html')
  win.webContents.openDevTools()
}

ipcMain.on('move-window', (event, x, y) => {
  const [currentX, currentY] = win.getPosition()
  const [width, height] = win.getSize()
  const { bounds } = screen.getPrimaryDisplay()
  
  // Calculate new position
  let newX = currentX + x
  let newY = currentY + y
  
  // Check boundaries
  if (newX < 0) newX = 0
  if (newY < 0) newY = 0
  if (newX + width > bounds.width) newX = bounds.width - width
  if (newY + height > bounds.height) newY = bounds.height - height
  
  win.setPosition(newX, newY)
  
  // Send back whether we hit the bottom
  const hitBottom = (newY + height >= bounds.height)
  event.reply('window-position', { hitBottom, x: newX, y: newY })
})

ipcMain.handle('get-screen-bounds', () => {
  const { bounds } = screen.getPrimaryDisplay()
  const [x, y] = win.getPosition()
  const [width, height] = win.getSize()
  return { screenWidth: bounds.width, screenHeight: bounds.height, x, y, width, height }
})

ipcMain.on('reset-size', () => {
  win.setSize(width, height)
})

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})