import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TerminalComponent } from './app/components/terminal/terminal.component';
import { FileExplorerComponent } from './app/components/file-explorer/file-explorer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TerminalComponent, FileExplorerComponent],
  template: `
    <div class="app-container">
      <div class="sidebar">
        <app-file-explorer></app-file-explorer>
      </div>
      <div class="main-content">
        <!-- Editor will be added here -->
        <app-terminal></app-terminal>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background: #1e1e1e;
      color: #ffffff;
    }
    .sidebar {
      width: 250px;
      background: #252526;
      border-right: 1px solid #3c3c3c;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class App {
  name = 'Angular Code Editor';
}

bootstrapApplication(App);