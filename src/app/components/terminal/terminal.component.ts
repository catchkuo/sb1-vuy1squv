import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="terminal-container" #terminal></div>
  `
})
export class TerminalComponent implements OnInit {
  @ViewChild('terminal', { static: true }) terminalElement!: ElementRef;
  private terminal!: Terminal;
  private fitAddon!: FitAddon;

  constructor(private terminalService: TerminalService) {}

  ngOnInit() {
    this.initTerminal();
    this.setupTerminalEvents();
  }

  private initTerminal() {
    this.terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e'
      }
    });

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);
    
    this.terminal.open(this.terminalElement.nativeElement);
    this.fitAddon.fit();

    this.terminal.write('$ ');
  }

  private setupTerminalEvents() {
    let currentCommand = '';

    this.terminal.onKey(({ key, domEvent }) => {
      const char = key;

      if (domEvent.keyCode === 13) { // Enter key
        this.terminal.write('\r\n');
        if (currentCommand.trim()) {
          this.terminalService.executeCommand(currentCommand);
        }
        currentCommand = '';
        this.terminal.write('$ ');
      } else if (domEvent.keyCode === 8) { // Backspace
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          this.terminal.write('\b \b');
        }
      } else {
        currentCommand += char;
        this.terminal.write(char);
      }
    });

    this.terminalService.commandOutput$.subscribe(output => {
      this.terminal.write(output);
    });
  }
}