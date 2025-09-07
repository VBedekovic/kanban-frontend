import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private client: Client;
  private subscription?: StompSubscription;
  private toastService = inject(ToastService);

  private readonly tasksTopic = '/topic/tasks';

  constructor() {
    this.client = new Client({
      brokerURL: `${environment.apiBaseUrl}/ws`,
      reconnectDelay: 5000,
      debug: () => {},
    });

    this.client.onConnect = () => {
      this.subscribeToTasks();
    };
    this.client.onStompError = (frame) => {
      this.toastService.addToast('WebSocket error: ' + frame.headers['message']);
    };
    this.client.activate();
  }

  private subscribeToTasks() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.client.subscribe(this.tasksTopic, (message: IMessage) => {
      try {
        const parsed = JSON.parse(message.body);
        const action = parsed.action;
        const body = parsed.payload?.body;
        const prettyBody = body ? JSON.stringify(body, null, 2) : '';
        const toastMsg = `<div class="toast-header">${action}</div><pre class="toast-body">${prettyBody}</pre>`;
        this.toastService.addToast(toastMsg);
      } catch {
        this.toastService.addToast(message.body);
      }
    });
  }

  disconnect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    this.client.deactivate();
  }
}
