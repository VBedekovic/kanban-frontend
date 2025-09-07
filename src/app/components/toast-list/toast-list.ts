import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast-list',
  imports: [CommonModule],
  templateUrl: './toast-list.html',
  styleUrl: './toast-list.css'
})
export class ToastList {
  toasts = computed(() => this.toastService.toasts());

  constructor(public toastService: ToastService) {}

  closeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
