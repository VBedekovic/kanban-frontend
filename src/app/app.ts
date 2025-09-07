import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastList } from './components/toast-list/toast-list';
import { PushNotificationService } from './services/push-notification-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kanban-frontend');

  constructor(private _push: PushNotificationService) { };
}
