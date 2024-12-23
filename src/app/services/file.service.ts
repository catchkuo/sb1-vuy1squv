import { Injectable } from '@angular/core';
const { ipcRenderer } = window.require('electron');

@Injectable({
  providedIn: 'root'
})
export class FileService {
  async listFiles(path: string): Promise<string[]> {
    return ipcRenderer.invoke('list-files', path);
  }

  async readFile(path: string): Promise<string> {
    return ipcRenderer.invoke('read-file', path);
  }

  async writeFile(path: string, content: string): Promise<void> {
    return ipcRenderer.invoke('write-file', path, content);
  }
}