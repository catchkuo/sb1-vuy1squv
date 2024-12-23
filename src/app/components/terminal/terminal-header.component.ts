import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="terminal-header">
      <div class="left">
        <span class="icon">⌨️</span>
        <span class="title">Terminal</span>
      </div>
      <div class="actions">
        <button class="action-btn" title="Clear">🗑️</button>
        <button class="action-btn" title="Kill Process">⏹️</button>
      </div>
    </div>
  `,
  styles: [`
    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      background: #252526;
      border-top: 1px solid #3c3c3c;
    }
    .left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon {
      font-size: 14px;
    }
    .title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
    .action-btn {
      background: none;
      border: none;
      color: #cccccc;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      font-size: 12px;
    }
    .action-btn:hover {
      background: #2a2d2e;
    }
  `]
})
export class TerminalHeaderComponent {}