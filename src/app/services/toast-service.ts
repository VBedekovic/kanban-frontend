import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  timeout?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  private nextId = 1;

  addToast(message: string) {
    const id = this.nextId++;
    const toast: Toast = { id, message };
    this.toasts.update(list => [toast, ...list]);
    toast.timeout = setTimeout(() => this.removeToast(id), 5000);
    return id;
  }

  removeToast(id: number) {
    this.toasts.update(list => {
      const idx = list.findIndex(t => t.id === id);
      if (idx === -1) return list;

      const toast = list[idx];
      if (toast.timeout) {
        clearTimeout(toast.timeout);
      }

      const newList = [...list];
      newList.splice(idx, 1);
      return newList;
    });
  }
}
