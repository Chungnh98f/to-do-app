import { createSelector } from '@ngrx/store';
import { ITodoState } from 'src/app/interface/todo.interface';
import { AppState } from '../app.state';

export const todosSelector = createSelector(
  (state: AppState) => state.tutorial,
  (todos: ITodoState) => todos.todos
);
