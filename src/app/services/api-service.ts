import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task-type';
import { environment } from '../../environments/environment';
import { Page } from '../types/page-type';

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
    status: string,
    page: number,
    size: number,
    sort?: string
  ): Observable<Page<Task>> {
    const params: any = {
      status,
      page: page.toString(),
      size: size.toString()
    };
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
}
