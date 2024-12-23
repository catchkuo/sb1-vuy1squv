const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');
const fs = require('fs').promises;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4200'
      : url.format({
          pathname: path.join(__dirname, '../dist/demo/browser/index.html'),
          protocol: 'file:',
          slashes: true
        })
  );

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

// IPC handlers for file operations
ipcMain.handle('list-files', async (_, dirPath) => {
  try {
    const files = await fs.readdir(dirPath);
    return files;
  } catch (error) {
    console.error('Failed to list files:', error);
    throw error;
  }
});

ipcMain.handle('read-file', async (_, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Failed to read file:', error);
    throw error;
  }
});

ipcMain.handle('write-file', async (_, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error('Failed to write file:', error);
    throw error;
  }
});

// IPC handler for terminal commands
ipcMain.handle('execute-command', (_, command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout || stderr);
    });
  });
});

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