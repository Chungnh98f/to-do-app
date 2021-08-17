import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { ACCESS_TOKEN_LABEL } from './../constants/index';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url === `${BASE_URL}/api/auth/login` ||
      req.url === `${BASE_URL}/api/auth/refresh-token`
    ) {
      return next.handle(req);
    }

    const accessToken = window.sessionStorage.getItem(ACCESS_TOKEN_LABEL) || '';
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
    });

    return next.handle(req);
  }
}
