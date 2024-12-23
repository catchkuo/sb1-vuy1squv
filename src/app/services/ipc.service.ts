import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  send(channel: string, data?: any) {
    (window as any).api?.send(channel, data);
  }

  receive(channel: string, func: (...args: any[]) => void) {
    (window as any).api?.receive(channel, func);
  }
}