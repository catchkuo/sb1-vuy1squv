const { ipcMain } = require('electron');
const { spawn } = require('child_process');
const { getMainWindow } = require('./window');

let terminalProcess = null;

function setupTerminalHandlers() {
  ipcMain.on('terminal:execute', handleTerminalExecute);
}

function handleTerminalExecute(event, command) {
  try {
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    
    if (terminalProcess) {
      terminalProcess.kill();
    }

    terminalProcess = spawn(shell);

    terminalProcess.stdout.on('data', handleTerminalOutput);
    terminalProcess.stderr.on('data', handleTerminalOutput);

    terminalProcess.stdin.write(`${command}\n`);
  } catch (error) {
    console.error('Error executing terminal command:', error);
    getMainWindow()?.webContents.send('terminal:output', `Error: ${error.message}\n`);
  }
}

function handleTerminalOutput(data) {
  getMainWindow()?.webContents.send('terminal:output', data.toString());
}

function cleanup() {
  if (terminalProcess) {
    terminalProcess.kill();
    terminalProcess = null;
  }
}

module.exports = {
  setupTerminalHandlers,
  cleanup
};