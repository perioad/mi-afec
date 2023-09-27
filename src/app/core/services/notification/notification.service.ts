import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notification$ = new Subject<string>();

  public readonly notifications$ = this.notification$.asObservable();

  public showNotification(message: string): void {
    this.notification$.next(message);
  }
}
