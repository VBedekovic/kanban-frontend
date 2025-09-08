import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../types/task-type';
import { FormsModule } from '@angular/forms';
import { ProgressionType } from '../../types/progression-type';

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
  @Input() versionConflict: boolean = false;
  @Input() initialStatus: string | null = null;
  @Output() submitTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<Task>();

  form: Partial<Task> = {};
  titleTouched = false;
  descriptionTouched = false;
  titleError = '';
  descriptionError = '';

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes: any) {
    if ((changes['task'] && changes['task'].currentValue) || (changes['initialStatus'] && changes['initialStatus'].currentValue)) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.task) {
      this.form = { ...this.task };
    } else {
      this.form = {
        title: '',
        description: '',
        status: (this.initialStatus as ProgressionType) || 'TO_DO',
        priority: 'LOW',
        version: 0
      };
    }
  }

  onSubmit() {
    this.titleTouched = true;
    this.descriptionTouched = true;
    this.titleError = '';
    this.descriptionError = '';
    let valid = true;
    if (!this.form.title || this.form.title.trim() === '') {
      this.titleError = 'Title cannot be empty.';
      valid = false;
    }
    if (!this.form.description || this.form.description.trim() === '') {
      this.descriptionError = 'Description cannot be empty.';
      valid = false;
    }
    if (valid && this.form.status && this.form.priority) {
      this.submitTask.emit(this.form as Task);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onDelete() {
    if (this.task) {
      this.deleteTask.emit(this.task);
    }
  }
  onTitleBlur() {
    this.titleTouched = true;
    if (!this.form.title || this.form.title.trim() === '') {
      this.titleError = 'Title cannot be empty.';
    } else {
      this.titleError = '';
    }
  }

  onDescriptionBlur() {
    this.descriptionTouched = true;
    if (!this.form.description || this.form.description.trim() === '') {
      this.descriptionError = 'Description cannot be empty.';
    } else {
      this.descriptionError = '';
    }
  }
}
