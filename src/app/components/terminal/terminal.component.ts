import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalService } from '../../services/terminal.service';
import { TerminalHeaderComponent } from './terminal-header.component';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, TerminalHeaderComponent],
  template: `
    <app-terminal-header></app-terminal-header>
    <div class="terminal-container" #terminal></div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 300px;
      background: #1e1e1e;
    }
    .terminal-container {
      flex: 1;
      padding: 8px;
    }
  `]
})
export class TerminalComponent implements OnInit {
  @ViewChild('terminal', { static: true }) terminalElement!: ElementRef;
  private terminal!: Terminal;
  private fitAddon!: FitAddon;
  private commandBuffer = '';

  constructor(private terminalService: TerminalService) {}

  ngOnInit() {
    this.initializeTerminal();
    this.setupKeyHandlers();
  }

  private initializeTerminal() {
    this.terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff'
      },
      fontSize: 14,
      fontFamily: 'Consolas, "DejaVu Sans Mono", monospace'
    });

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);
    
    this.terminal.open(this.terminalElement.nativeElement);
    this.fitAddon.fit();

    this.terminal.writeln('Welcome to Angular Code Editor Terminal');
    this.terminal.write('$ ');
  }

  private setupKeyHandlers() {
    this.terminal.onKey(({ key, domEvent }) => {
      const ev = domEvent as KeyboardEvent;
      
      if (ev.key === 'Enter') {
        this.terminal.write('\r\n');
        this.executeCommand();
      } else if (ev.key === 'Backspace') {
        if (this.commandBuffer.length > 0) {
          this.commandBuffer = this.commandBuffer.slice(0, -1);
          this.terminal.write('\b \b');
        }
      } else if (!ev.ctrlKey && !ev.altKey) {
        this.commandBuffer += key;
        this.terminal.write(key);
      }
    });
  }

  private async executeCommand() {
    if (!this.commandBuffer) {
      this.terminal.write('$ ');
      return;
    }

    try {
      const result = await this.terminalService.executeCommand(this.commandBuffer);
      this.terminal.writeln(result);
    } catch (error) {
      this.terminal.writeln(`Error: ${error}`);
    }

    this.commandBuffer = '';
    this.terminal.write('$ ');
  }
}