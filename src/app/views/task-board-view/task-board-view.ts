import { Component } from '@angular/core';
import { UtilityButton } from '../../components/utility-button/utility-button';
import { TaskColumn } from '../../components/task-column/task-column';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-task-board-view',
  imports: [UtilityButton, TaskColumn],
  templateUrl: './task-board-view.html',
  styleUrl: './task-board-view.css'
})
export class TaskBoardView {
constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    this.apiService.getTask(1).subscribe(task => {
      console.log(task);
    });
  }
}
