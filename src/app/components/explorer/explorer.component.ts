import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemService, FileNode } from '../../services/file-system.service';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="explorer-container">
      <div class="explorer-header">
        <h2>Explorer</h2>
        <button (click)="openFolder()">Open Folder</button>
      </div>
      <div class="file-tree">
        <ng-container *ngFor="let node of fileTree">
          <div 
            class="file-node"
            [class.file]="node.type === 'file'"
            [class.directory]="node.type === 'directory'"
            (click)="handleNodeClick(node)">
            {{ node.name }}
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .explorer-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .explorer-header {
      padding: 8px;
      border-bottom: 1px solid #333;
    }
    .file-tree {
      flex: 1;
      overflow: auto;
    }
    .file-node {
      padding: 4px 8px;
      cursor: pointer;
    }
    .file-node:hover {
      background-color: #2a2d2e;
    }
    .file {
      padding-left: 24px;
    }
    .directory {
      font-weight: bold;
    }
  `]
})
export class ExplorerComponent implements OnInit {
  fileTree: FileNode[] = [];

  constructor(private fileSystem: FileSystemService) {}

  ngOnInit() {
    this.fileSystem.fileTree$.subscribe(tree => {
      this.fileTree = tree;
    });
  }

  openFolder() {
    this.fileSystem.openDirectory();
  }

  handleNodeClick(node: FileNode) {
    if (node.type === 'file') {
      this.fileSystem.openFile(node.path);
    }
  }
}