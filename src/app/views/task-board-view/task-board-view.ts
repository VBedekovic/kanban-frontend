
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
  versionConflict = signal(false);

  refreshTrigger = signal(0);

  constructor(private apiService: ApiService) { }

  refreshColumns() {
    this.refreshTrigger.set(this.refreshTrigger() + 1);
  }

  openAddTaskModal(progressionType: string) {
    this.editingTask.set(null);
    this.modalProgressionType.set(progressionType);
    this.versionConflict.set(false);
    this.showModal.set(true);
  }

  openEditTaskModal(task: Task) {
    this.editingTask.set(task);
    this.modalProgressionType.set(task.status);
    this.versionConflict.set(false);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingTask.set(null);
    this.modalProgressionType.set(null);
    this.versionConflict.set(false);
  }

  creatingNewTask(task: Task) {
    this.apiService.postTask({ ...task, status: this.modalProgressionType() as ProgressionType }).subscribe(() => {
      this.closeModal();
      this.refreshColumns();
    });
  }

  editingExistingTask(task: Task) {
    this.apiService.updateTask(this.editingTask()!.id, task).subscribe({
      next: () => {
        this.closeModal();
        this.refreshColumns();
      },
      error: (err) => {
        if (err.status === 409) { // version conflict
          this.apiService.getTask(this.editingTask()!.id).subscribe((fresh) => {
            this.editingTask.set(fresh);
            this.versionConflict.set(true);
            this.refreshColumns();
          });
        }
      }
    });
  }

  onSubmitTask(task: Task) {
    if (this.editingTask()) {
      this.editingExistingTask(task);
    } else {
      this.creatingNewTask(task);
    }
  }

  onDeleteTask(task: Task) {
    this.apiService.deleteTask(task.id).subscribe(() => {
      this.closeModal();
      this.refreshColumns();
    });
  }

}
