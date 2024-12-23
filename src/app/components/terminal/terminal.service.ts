import { Injectable } from '@angular/core';
const { ipcRenderer } = window.require('electron');

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  async executeCommand(command: string): Promise<string> {
    return ipcRenderer.invoke('execute-command', command);
  }
}