import { createReducer, on } from '@ngrx/store';
import {
  getReportAllTodoFailed,
  getReportAllTodoPending,
  getReportAllTodoSuccess,
} from '../actions/report.action';
import { IReportState } from './../../interface/report.interface';

const reportInitialState: IReportState = {
  pending: false,
  todos: [],
};

export const reportReducer = createReducer(
  reportInitialState,
  // Get all todos
  on(getReportAllTodoPending, (state, _) => ({ ...state, pending: true })),
  on(getReportAllTodoSuccess, (state, payload) => ({
    ...state,
    pending: false,
    todos: [...payload.todos],
  })),
  on(getReportAllTodoFailed, (state, _) => ({
    ...state,
    pending: false,
    todo: [],
  }))
);
