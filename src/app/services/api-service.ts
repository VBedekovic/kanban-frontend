import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_AUTH_URL = `${environment.apiBaseUrl}/auth`;
  private readonly API_TASKS_URL = `${environment.apiBaseUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.API_AUTH_URL, { username, password });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_TASKS_URL}/${id}`);
  }
}
