const { dialog, ipcMain, app, BrowserWindow, screen } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const {getFolderData, loadProjectsFile} = require('./getFolderData');


function createWindow() {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 500,
    height: 1000,
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

  // win.maximize(); // Maximize the window on launch

  // win.on('resize', () => {
  //   const { width, height } = win.getBounds();
  //   console.log(`Window resized - Width: ${width}, Height: ${height}`);
  // });
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

ipcMain.on('openJSON', async (event) => {
  try {
    // Define the path to the JSON file you want to open
    const filePath = path.join(app.getPath('userData'), 'passwords.json');

    // Read the JSON file
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);

    // Send the parsed JSON data back to the renderer process
    event.sender.send('openJSONResponse', parsedData);
  } catch (error) {
    // Handle errors and send an error message back to the renderer process
    event.sender.send('openJSONResponse', { error: `Error opening JSON: ${error.message}` });
  }
});

ipcMain.on('storeJSON', async (event, jsonData) => {
  try {
    // Define the path where you want to store the JSON file
    const filePath = path.join(app.getPath('userData'), 'passwords.json');

    // Write the JSON data to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    // Send a confirmation message back to the renderer process
    event.sender.send('storeJSONResponse', 'JSON data saved successfully');
  } catch (error) {
    // Handle errors and send an error message back to the renderer process
    event.sender.send('storeJSONResponse', `Error saving JSON: ${error.message}`);
  }
});