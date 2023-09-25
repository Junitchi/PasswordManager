const path = require('path');
const { dialog, ipcMain, app, BrowserWindow, screen } = require('electron');
const isDev = require('electron-is-dev');
const {getFolderData, loadProjectsFile} = require('./getFolderData');


function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.maximize(); // Maximize the window on launch

  win.on('resize', () => {
    const { width, height } = win.getBounds();
    console.log(`Window resized - Width: ${width}, Height: ${height}`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
