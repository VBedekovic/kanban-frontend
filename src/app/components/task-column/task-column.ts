import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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

  tasks: Task[] = [];
  page = 0;
  size = 5;
  totalPages = 1;
  totalElements = 0;
  first = true;
  last = true;

  loading = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.apiService.getTasksPage(this.progressionType, this.page, this.size).subscribe({
      next: (res) => {
        this.tasks = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.first = res.first;
        this.last = res.last;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.tasks = [];
        this.totalPages = 1;
        this.first = true;
        this.last = true;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  prevPage() {
    if (!this.first) {
      this.page--;
      this.loadTasks();
    }
  }

  nextPage() {
    if (!this.last) {
      this.page++;
      this.loadTasks();
    }
  }
}
