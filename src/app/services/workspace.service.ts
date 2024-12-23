import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileNode } from '../models/file.model';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private currentFileSubject = new BehaviorSubject<string>('');
  currentFile$ = this.currentFileSubject.asObservable();

  private workspaceFilesSubject = new BehaviorSubject<FileNode[]>([]);
  workspaceFiles$ = this.workspaceFilesSubject.asObservable();

  constructor(private fileService: FileService) {}

  async loadWorkspace(path: string) {
    try {
      const files = await this.fileService.listFiles(path);
      const fileNodes = await Promise.all(
        files.map(async (file) => {
          const fullPath = `${path}/${file}`;
          return {
            name: file,
            path: fullPath,
            type: 'file' as const
          };
        })
      );
      this.workspaceFilesSubject.next(fileNodes);
    } catch (error) {
      console.error('Failed to load workspace:', error);
    }
  }

  setCurrentFile(filePath: string) {
    this.currentFileSubject.next(filePath);
  }
}