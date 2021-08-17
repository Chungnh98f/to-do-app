import {
  ACCESS_TOKEN_LABEL,
  REFRESH_TOKEN_LABEL,
} from './../../constants/index';
import { PublicHttpService } from './../../service/public-http.service';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  authMeFailed,
  authMePending,
  authMeSuccess,
  loginFailed,
  loginPending,
  loginSuccess,
  logoutFailed,
  logoutPending,
  logoutSuccess,
  refreshTokenFailed,
  refreshTokenPending,
  refreshTokenSuccess,
  registerFailed,
  registerPending,
  registerSuccess,
} from './../actions/auth.action';
import { AuthHttpService } from './../../service/auth-http.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  authMe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authMePending),
        exhaustMap((action) => {
          return this.authHtppService.authMe().pipe(
            map((response: any) => {
              return authMeSuccess(response.data);
            }),
            catchError((err) => {
              return of(authMeFailed(err));
            })
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  logins$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginPending),
        exhaustMap((action) => {
          return this.publicHttpService
            .login({ username: action.username, password: action.password })
            .pipe(
              map((response: any) => {
                window.sessionStorage.setItem(
                  ACCESS_TOKEN_LABEL,
                  response.accessToken
                );
                window.localStorage.setItem(
                  REFRESH_TOKEN_LABEL,
                  response.refreshToken
                );
                return loginSuccess({
                  accessToken: response.accessToken,
                  refreshToken: response.refreshToken,
                });
              }),
              catchError((err) => of(loginFailed(err)))
            );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerPending),
        exhaustMap((action) => {
          return this.authHtppService
            .register({
              username: action.username,
              password: action.password,
              name: action.name,
              is_admin: action.is_admin,
            })
            .pipe(
              map((response: any) => {
                return registerSuccess(response);
              }),
              catchError((err) => {
                return of(registerFailed(err));
              })
            );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutPending),
        exhaustMap((_) => {
          return this.authHtppService.logout().pipe(
            map((_: any) => {
              window.sessionStorage.removeItem(ACCESS_TOKEN_LABEL);
              window.localStorage.removeItem(REFRESH_TOKEN_LABEL);
              return logoutSuccess();
            }),
            catchError((err) => {
              return of(logoutFailed(err));
            })
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  refreshToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshTokenPending),
        exhaustMap((action) => {
          return this.publicHttpService.refreshToken(action.refreshToken).pipe(
            map((response: any) => {
              window.sessionStorage.setItem(
                ACCESS_TOKEN_LABEL,
                response.accessToken
              );
              window.localStorage.setItem(
                REFRESH_TOKEN_LABEL,
                response.refreshToken
              );
              return refreshTokenSuccess(response);
            }),
            catchError((err) => {
              window.sessionStorage.removeItem(ACCESS_TOKEN_LABEL);
              window.localStorage.removeItem(REFRESH_TOKEN_LABEL);
              return of(refreshTokenFailed(err));
            })
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  constructor(
    private actions$: Actions,
    private authHtppService: AuthHttpService,
    private publicHttpService: PublicHttpService
  ) {}
}
