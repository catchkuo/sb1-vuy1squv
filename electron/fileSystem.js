const { ipcMain, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { getMainWindow } = require('./window');

function setupFileSystemHandlers() {
  ipcMain.on('dialog:openFolder', handleOpenFolder);
  ipcMain.on('fs:readFile', handleReadFile);
}

async function handleOpenFolder() {
  try {
    const mainWindow = getMainWindow();
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    
    if (!result.canceled) {
      const dirPath = result.filePaths[0];
      readDirectory(dirPath);
    }
  } catch (error) {
    console.error('Error opening folder dialog:', error);
  }
}

async function readDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const fileNodes = await Promise.all(files.map(async (file) => {
      const filePath = path.join(dirPath, file.name);
      return {
        name: file.name,
        path: filePath,
        type: file.isDirectory() ? 'directory' : 'file'
      };
    }));
    getMainWindow()?.webContents.send('fs:readdir', fileNodes);
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

async function handleReadFile(event, filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    getMainWindow()?.webContents.send('fs:fileContent', { path: filePath, content });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

module.exports = {
  setupFileSystemHandlers
};