import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../../models/file.model';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="file-item"
      [class.selected]="selected"
      (click)="onSelect.emit(file)">
      <span class="icon">{{ file.type === 'directory' ? '📁' : '📄' }}</span>
      <span class="name">{{ file.name }}</span>
    </div>
  `,
  styles: [`
    .file-item {
      padding: 4px 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
    }
    .file-item:hover {
      background: #2a2d2e;
    }
    .file-item.selected {
      background: #37373d;
    }
    .icon {
      font-size: 14px;
    }
    .name {
      font-size: 13px;
    }
  `]
})
export class FileItemComponent {
  @Input() file!: FileNode;
  @Input() selected = false;
  @Output() onSelect = new EventEmitter<FileNode>();
}