import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItemComponent } from './file-item.component';
import { WorkspaceService } from '../../services/workspace.service';
import { FileNode } from '../../models/file.model';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, FileItemComponent],
  template: `
    <div class="file-explorer">
      <div class="header">
        <span class="title">Explorer</span>
        <button class="refresh-btn" (click)="refreshWorkspace()">🔄</button>
      </div>
      <div class="files-list">
        <app-file-item
          *ngFor="let file of files$ | async"
          [file]="file"
          [selected]="file.path === (currentFile$ | async)"
          (onSelect)="selectFile(file)">
        </app-file-item>
      </div>
    </div>
  `,
  styles: [`
    .file-explorer {
      height: 100%;
      background: #252526;
      color: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .header {
      padding: 10px;
      font-weight: bold;
      border-bottom: 1px solid #3c3c3c;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .refresh-btn {
      background: none;
      border: none;
      color: #cccccc;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }
    .refresh-btn:hover {
      background: #2a2d2e;
    }
    .files-list {
      padding: 8px;
      overflow-y: auto;
      flex: 1;
    }
  `]
})
export class FileExplorerComponent implements OnInit {
  files$ = this.workspaceService.workspaceFiles$;
  currentFile$ = this.workspaceService.currentFile$;

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit() {
    this.refreshWorkspace();
  }

  refreshWorkspace() {
    this.workspaceService.loadWorkspace('.');
  }

  selectFile(file: FileNode) {
    this.workspaceService.setCurrentFile(file.path);
  }
}