import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUserInput } from '../interface/userInput';
import { BASE_URL } from './../constants/index';
import { ITutorial } from './../interface/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  // Authentication
  register(registerData: IUserInput) {
    const { username, password, name, is_admin } = registerData;
    return this.http
      .post(
        `${BASE_URL}/api/auth/register`,
        { username, password, name, is_admin },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

  authMe() {
    return this.http
      .get(`${BASE_URL}/api/auth/me`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  logout() {
    return this.http
      .delete(`${BASE_URL}/api/auth/logout`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  // Get All Report for admin
  getAllReport() {
    return this.http
      .get(`${BASE_URL}/api/todo/admin/all`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  // CRUD Todo
  getAllTodo() {
    return this.http
      .get(`${BASE_URL}/api/todo/all`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  addTodo(todo: ITutorial) {
    return this.http
      .post(
        `${BASE_URL}/api/todo`,
        { name: todo.name },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: ITutorial) {
    return this.http
      .put(
        `${BASE_URL}/api/todo/${todo.id}`,
        { name: todo.name, is_completed: todo.is_completed },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: number) {
    return this.http
      .delete(`${BASE_URL}/api/todo/${id}`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      // window.sessionStorage.removeItem(ACCESS_TOKEN_LABEL);
      // window.localStorage.removeItem(REFRESH_TOKEN_LABEL);
      // window.location.reload();
    }
    return throwError(error.error);
  }
}
