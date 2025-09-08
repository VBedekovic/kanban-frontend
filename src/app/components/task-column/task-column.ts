
import { Component, Input, OnInit, Output, EventEmitter, signal, OnChanges, SimpleChanges, effect } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Task } from '../../types/task-type';
import { ProgressionType } from '../../types/progression-type';
import { CommonModule } from '@angular/common';
import { TaskColumnCard } from '../task-column-card/task-column-card';
import { RequestStoreService } from '../../services/request-store-service';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, TaskColumnCard],
  templateUrl: './task-column.html',
  styleUrl: './task-column.css'
})
export class TaskColumn implements OnInit, OnChanges {
  @Input() refreshTrigger: number = 0;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.loadTasks();
    }
  }
  @Input() columnTitle!: string;
  @Input() progressionType?: ProgressionType;

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
  size = 10;
  sortParams: string[] = [];
  totalPages = signal(1);
  totalElements = signal(0);
  first = signal(true);
  last = signal(true);

  loading = signal(false);


  constructor(private apiService: ApiService, private requestStore: RequestStoreService) {
    effect(() => {
      this.requestStore.sortOptions();
      this.sortParams = this.requestStore.getSortParams();
      this.loadTasks();
    });
    effect(() => {
      this.size = this.requestStore.pageSize();
      this.loadTasks();
    });
    this.sortParams = this.requestStore.getSortParams();
    this.size = this.requestStore.pageSize();
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading.set(true);
    this.apiService.getTasksPage(this.page(), this.size, this.progressionType, this.sortParams.length ? this.sortParams : undefined).subscribe({
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
