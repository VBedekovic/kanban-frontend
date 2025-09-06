import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskColumn } from './task-column/task-column';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskColumn],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kanban-frontend');
}
