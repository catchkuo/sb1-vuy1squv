import { Injectable } from '@angular/core';
const { ipcRenderer } = window.require('electron');

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  async executeCommand(command: string): Promise<string> {
    try {
      return await ipcRenderer.invoke('execute-command', command);
    } catch (error) {
      console.error('Failed to execute command:', error);
      throw error;
    }
  }
}