import { Component, signal } from '@angular/core';
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
  showModal = signal(false);
  editingTask = signal<Task | null>(null);
  modalProgressionType = signal<string | null>(null);

  constructor(private apiService: ApiService) { }

  openAddTaskModal(progressionType: string) {
    this.editingTask.set(null);
    this.modalProgressionType.set(progressionType);
    this.showModal.set(true);
  }

  openEditTaskModal(task: Task) {
    this.editingTask.set(task);
    this.modalProgressionType.set(task.status);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingTask.set(null);
    this.modalProgressionType.set(null);
  }

  onSubmitTask(task: Task) {
    if (this.editingTask()) {
      // TODO: Call update API
    } else {
      this.apiService.postTask({ ...task, status: this.modalProgressionType() as ProgressionType }).subscribe(() => {
        this.closeModal();
        // TODO refresh columns
      });
    }
  }
}
