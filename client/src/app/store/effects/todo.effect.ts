import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  addTodoFailed,
  addTodoPending,
  addTodoSuccess,
  deleteTodoFailed,
  deleteTodoPending,
  deleteTodoSuccess,
  getAllTodoFailed,
  getAllTodoPending,
  getAllTodoSuccess,
  updateTodoFailed,
  updateTodoPending,
  updateTodoSuccess,
} from '../actions/tutorial.actions';
import { AuthHttpService } from './../../service/auth-http.service';

@Injectable()
export class TodoEffects {
  getAllTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getAllTodoPending),
        exhaustMap((action) => {
          return this.authHtppService.getAllTodo().pipe(
            map((response: any) => {
              return getAllTodoSuccess({ todos: response.data });
            }),
            catchError((err) => {
              return of(getAllTodoFailed(err));
            })
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  addTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodoPending),
        exhaustMap((action) => {
          return this.authHtppService
            .addTodo({
              name: action.name,
              id: action.id,
              is_completed: action.is_completed,
            })
            .pipe(
              map((response: any) => {
                return addTodoSuccess(response.data);
              }),
              catchError((err) => {
                return of(addTodoFailed(err));
              })
            );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  updateTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTodoPending),
        exhaustMap((action) => {
          return this.authHtppService
            .updateTodo({
              name: action.name,
              id: action.id,
              is_completed: action.is_completed,
            })
            .pipe(
              map((_: any) => {
                return updateTodoSuccess({
                  name: action.name,
                  id: action.id,
                  is_completed: action.is_completed,
                });
              }),
              catchError((err) => {
                return of(updateTodoFailed(err));
              })
            );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  deleteTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTodoPending),
        exhaustMap((action) => {
          return this.authHtppService.deleteTodo(action.id).pipe(
            map((_: any) => {
              return deleteTodoSuccess({ id: action.id });
            }),
            catchError((err) => {
              return of(deleteTodoFailed(err));
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
