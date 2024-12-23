import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IpcService } from './ipc.service';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
}

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private fileTreeSubject = new BehaviorSubject<FileNode[]>([]);
  fileTree$ = this.fileTreeSubject.asObservable();

  constructor(private ipc: IpcService) {
    this.ipc.receive('fs:readdir', (files: FileNode[]) => {
      this.fileTreeSubject.next(files);
    });
  }

  openDirectory() {
    this.ipc.send('dialog:openFolder');
  }

  openFile(path: string) {
    this.ipc.send('fs:readFile', path);
  }
}