import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ACCESS_TOKEN_LABEL,
  BASE_URL,
  REFRESH_TOKEN_LABEL,
} from './../constants/index';
import { IUserInput } from '../interface/userInput';

@Injectable({
  providedIn: 'root',
})
export class PublicHttpService {
  constructor(private http: HttpClient) {}

  login(loginData: IUserInput) {
    const { username, password } = loginData;
    return this.http
      .post(
        `${BASE_URL}/api/auth/login`,
        { username, password },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

 

  refreshToken(refreshToken: string) {
    return this.http
      .post(
        `${BASE_URL}/api/auth/refresh-token`,
        { refreshToken },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

 

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
