import { ITutorial } from './../../interface/todo.interface';
import { createAction, props } from '@ngrx/store';
import { IErrorResponse } from './../../interface/common.interface';

const ADMIN_GET_ALL_TUTORIAL_PENDING = '[REPORT] Admin Get All Pending';
const ADMIN_GET_ALL_TUTORIAL_SUCCESS = '[REPORT] Admin Get All Success';
const ADMIN_GET_ALL_TUTORIAL_FAILED = '[REPORT] Admin Get All Failed';

// Get All todos of all users
export const getReportAllTodoPending = createAction(
  ADMIN_GET_ALL_TUTORIAL_PENDING
);

export const getReportAllTodoSuccess = createAction(
  ADMIN_GET_ALL_TUTORIAL_SUCCESS,
  props<{ todos: ITutorial[] }>()
);

export const getReportAllTodoFailed = createAction(
  ADMIN_GET_ALL_TUTORIAL_FAILED,
  props<IErrorResponse>()
);
