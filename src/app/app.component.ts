import { Component, OnInit } from '@angular/core';
import { NotificationService } from './core/services/notification/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_CONFIG } from './core/constants/notifications.constants';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.notificationService.notifications$.subscribe((message: string) => {
      const action = undefined;

      this.snackBar.open(message, action, NOTIFICATIONS_CONFIG);
    });
  }
}
