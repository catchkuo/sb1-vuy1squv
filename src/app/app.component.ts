import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { EditorComponent } from './components/editor/editor.component';
import { TerminalComponent } from './components/terminal/terminal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExplorerComponent, EditorComponent, TerminalComponent],
  template: `
    <div class="app-container">
      <div class="left-panel">
        <app-explorer></app-explorer>
      </div>
      <div class="right-panel">
        <div class="editor-panel">
          <app-editor></app-editor>
        </div>
        <div class="terminal-panel">
          <app-terminal></app-terminal>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Initialize app
  }
}