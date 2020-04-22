import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, FbCreateResponseTask} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
      return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
      .pipe(map((response: FbCreateResponseTask) => {
        return {
          ...task,
          id: response.name,
          date: new Date(task.date)
        }
      }))
  }

  getAllTasks(): Observable<Task[]> {
      return this.http.get(`${environment.fbDbUrl}/tasks.json`)
          .pipe(map((response: { [key: string]: any }) => {
              return Object
                  .keys(response)
                  .map(key => ({
                      ...response[key],
                      id: key,
                      date: new Date(response[key].date)
                  }))
          }))
  }

  getByIdTask(id: string): Observable<Task>{
      return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
          .pipe(map((task:Task) => {
              return {
                  ...task, id,
                  date: new Date(task.date)
              }
          }))
  }
    remove(id: string): Observable<void>{
      return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }
}
