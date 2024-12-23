import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private commandOutputSubject = new Subject<string>();
  commandOutput$ = this.commandOutputSubject.asObservable();

  constructor(private ipc: IpcService) {
    this.ipc.receive('terminal:output', (data: string) => {
      this.commandOutputSubject.next(data);
    });
  }

  executeCommand(command: string) {
    this.ipc.send('terminal:execute', command);
  }
}