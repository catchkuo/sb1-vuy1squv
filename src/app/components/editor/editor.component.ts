import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpcService } from '../../services/ipc.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <span>{{ currentFile || 'No file open' }}</span>
      </div>
      <div class="editor-content" #editorContent></div>
    </div>
  `,
  styles: [`
    .editor-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .editor-header {
      padding: 8px;
      border-bottom: 1px solid #333;
    }
    .editor-content {
      flex: 1;
      padding: 8px;
      font-family: monospace;
      white-space: pre;
      overflow: auto;
    }
  `]
})
export class EditorComponent implements OnInit {
  @ViewChild('editorContent', { static: true }) editorContent!: ElementRef;
  currentFile: string | null = null;

  constructor(private ipc: IpcService) {}

  ngOnInit() {
    this.ipc.receive('fs:fileContent', (data: { path: string, content: string }) => {
      this.currentFile = data.path;
      if (this.editorContent) {
        this.editorContent.nativeElement.textContent = data.content;
      }
    });
  }
}