import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task-type';
import { environment } from '../../environments/environment';
import { Page } from '../types/page-type';
import { TasksQueryParams } from '../types/tasks-query-params-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_AUTH_URL = `${environment.apiBaseUrl}/auth`;
  private readonly API_TASKS_URL = `${environment.apiBaseUrl}/api/tasks`;

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.API_AUTH_URL, { username, password });
  }

  getTasksPage(
    page: number,
    size: number,
    status?: string,
    sort?: string
  ): Observable<Page<Task>> {
    const params: TasksQueryParams = {
      page: page,
      size: size
    };
    if (status) {
      params.status = status;
    }
    if (sort) {
      params.sort = sort;
    }
    return this.http.get<Page<Task>>(this.API_TASKS_URL, { params });
  }

  postTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_TASKS_URL, task);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_TASKS_URL}/${id}`);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_TASKS_URL}/${id}`, task);
  }

  deleteTask(id: number): Observable<{id: number}> {
    return this.http.delete<{id: number}>(`${this.API_TASKS_URL}/${id}`);
  }
}
