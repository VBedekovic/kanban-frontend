import { Component, Input, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Task } from '../../types/task-type';
import { ProgressionType } from '../../types/progression-type';
import { CommonModule } from '@angular/common';
import { TaskColumnCard } from '../task-column-card/task-column-card';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, TaskColumnCard],
  templateUrl: './task-column.html',
  styleUrl: './task-column.css'
})
export class TaskColumn implements OnInit {
  @Input() columnTitle!: string;
  @Input() progressionType!: ProgressionType;

  @Output() addTask = new EventEmitter<void>();
  @Output() editTask = new EventEmitter<Task>();

  onAddTaskClick() {
    this.addTask.emit();
  }

  onEditTaskClick(task: Task) {
    this.editTask.emit(task);
  }

  tasks = signal<Task[]>([]);
  page = signal(0);
  size = 5;
  totalPages = signal(1);
  totalElements = signal(0);
  first = signal(true);
  last = signal(true);

  loading = signal(false);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading.set(true);
    this.apiService.getTasksPage(this.progressionType, this.page(), this.size).subscribe({
      next: (res) => {
        this.tasks.set(res.content);
        this.totalElements.set(res.totalElements);
        this.totalPages.set(res.totalPages);
        this.first.set(res.first);
        this.last.set(res.last);
        this.loading.set(false);
      },
      error: () => {
        this.tasks.set([]);
        this.totalPages.set(1);
        this.first.set(true);
        this.last.set(true);
        this.loading.set(false);
      }
    });
  }

  prevPage() {
    if (!this.first()) {
      this.page.set(this.page() - 1);
      this.loadTasks();
    }
  }

  nextPage() {
    if (!this.last()) {
      this.page.set(this.page() + 1);
      this.loadTasks();
    }
  }
}
