import { Component, ChangeDetectorRef } from '@angular/core';
import { UtilityButton } from '../../components/utility-button/utility-button';
import { TaskColumn } from '../../components/task-column/task-column';
import { ApiService } from '../../services/api-service';
import { ProgressionType } from '../../types/progression-type';
import { Task } from '../../types/task-type';
import { TaskForm } from '../../components/task-form/task-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board-view',
  standalone: true,
  imports: [UtilityButton, TaskColumn, TaskForm, CommonModule],
  templateUrl: './task-board-view.html',
  styleUrl: './task-board-view.css'
})
export class TaskBoardView {
  showModal = false;
  editingTask: Task | null = null;
  modalProgressionType: string | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  openAddTaskModal(progressionType: string) {
    this.editingTask = null;
    this.modalProgressionType = progressionType;
    this.showModal = true;
    this.cdr.markForCheck();
  }

  openEditTaskModal(task: Task) {
    this.editingTask = task;
    this.modalProgressionType = task.status;
    this.showModal = true;
    this.cdr.markForCheck();
  }

  closeModal() {
    this.showModal = false;
    this.editingTask = null;
    this.modalProgressionType = null;
    this.cdr.markForCheck();
  }

  onSubmitTask(task: Task) {

    if (this.editingTask) {
      // TODO: Call update API
    } else {
      this.apiService.postTask({ ...task, status: this.modalProgressionType as ProgressionType }).subscribe(() => {
        this.closeModal();
        // TODO refresh columns
      });
    }
  }
}
