import { Component, Input } from '@angular/core';
import { TaskColumnCard } from '../task-column-card/task-column-card';

@Component({
  selector: 'app-task-column',
  imports: [TaskColumnCard],
  templateUrl: './task-column.html',
  styleUrl: './task-column.css'
})
export class TaskColumn {
  @Input() columnTitle!: string;
}
