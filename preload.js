const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  moveWindow: (x, y) => ipcRenderer.send('move-window', x, y),
  getScreenBounds: () => ipcRenderer.invoke('get-screen-bounds'),
  onWindowPosition: (callback) => ipcRenderer.on('window-position', (event, data) => callback(data)),
  resetSize: () => ipcRenderer.send('reset-size')
})