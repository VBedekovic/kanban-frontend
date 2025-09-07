import { Component, Input } from '@angular/core';
import { Task } from '../../types/task-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-column-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-column-card.html',
  styleUrl: './task-column-card.css'
})
export class TaskColumnCard {
  @Input() task!: Task;

  getProgress(): { percent: number; color: string } {
    switch (this.task.status) {
      case 'TO_DO':
        return { percent: 0, color: 'bg-bg-secondary' };
      case 'IN_PROGRESS':
        return { percent: 50, color: 'bg-warning' };
      case 'DONE':
        return { percent: 100, color: 'bg-completed' };
      default:
        return { percent: 0, color: 'bg-bg-secondary' };
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'LOW PRIORITY';
      case 'MED':
        return 'MEDIUM PRIORITY';
      case 'HIGH':
        return 'HIGH PRIORITY';
      default:
        return priority;
    }
  }
}
