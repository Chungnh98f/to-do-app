import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  getReportAllTodoFailed,
  getReportAllTodoPending,
  getReportAllTodoSuccess,
} from '../actions/report.action';
import { AuthHttpService } from './../../service/auth-http.service';

@Injectable()
export class ReportEffects {
  getReport$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getReportAllTodoPending),
        exhaustMap((_) => {
          return this.authHtppService.getAllReport().pipe(
            map((response: any) => {
              return getReportAllTodoSuccess({ todos: response.data });
            }),
            catchError((err) => {
              return of(getReportAllTodoFailed(err));
            })
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  constructor(
    private actions$: Actions,
    private authHtppService: AuthHttpService
  ) {}
}
