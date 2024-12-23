const { app } = require('electron');
const { createWindow } = require('./window');
const { setupFileSystemHandlers } = require('./fileSystem');
const { setupTerminalHandlers, cleanup } = require('./terminal');

function initializeApp() {
  setupFileSystemHandlers();
  setupTerminalHandlers();
}

app.whenReady().then(() => {
  createWindow();
  initializeApp();
});

app.on('window-all-closed', () => {
  cleanup();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!getMainWindow()) {
    createWindow();
    initializeApp();
  }
});