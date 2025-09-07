import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../types/task-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  @Input() task: Task | null = null;
  @Input() submitLabel: string = 'Save';
  @Output() submitTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form: Partial<Task> = {};

  ngOnInit() {
    if (this.task) {
      this.form = { ...this.task };
    } else {
      this.form = {
        title: '',
        description: '',
        status: 'TO_DO',
        priority: 'LOW',
        version: 0
      };
    }
  }

  onSubmit() {
    if (this.form.title && this.form.description && this.form.status && this.form.priority) {
      this.submitTask.emit(this.form as Task);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
