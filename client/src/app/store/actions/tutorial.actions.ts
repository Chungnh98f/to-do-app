import { ITutorial } from './../../interface/todo.interface';
import { createAction, props } from '@ngrx/store';
import { IErrorResponse } from './../../interface/common.interface';

const GET_ALL_TUTORIAL_PENDING = '[TUTORIAL] Get All Pending';
const GET_ALL_TUTORIAL_SUCCESS = '[TUTORIAL] Get All Success';
const GET_ALL_TUTORIAL_FAILED = '[TUTORIAL] Get All Failed';

const ADD_TUTORIAL_PENDING = '[TUTORIAL] Add Pending';
const ADD_TUTORIAL_SUCCESS = '[TUTORIAL] Add Success';
const ADD_TUTORIAL_FAILED = '[TUTORIAL] Add Failed';

const REMOVE_TUTORIAL_PENDING = '[TUTORIAL] Remove Pending';
const REMOVE_TUTORIAL_SUCCESS = '[TUTORIAL] Remove Success';
const REMOVE_TUTORIAL_FAILED = '[TUTORIAL] Remove Failed';

const UPDATE_TUTORIAL_PENDING = '[TUTORIAL] Update Pending';
const UPDATE_TUTORIAL_SUCCESS = '[TUTORIAL] Update Success';
const UPDATE_TUTORIAL_FAILED = '[TUTORIAL] Update Failed';

// Get All todos of one user
export const getAllTodoPending = createAction(GET_ALL_TUTORIAL_PENDING);

export const getAllTodoSuccess = createAction(
  GET_ALL_TUTORIAL_SUCCESS,
  props<{ todos: ITutorial[] }>()
);

export const getAllTodoFailed = createAction(
  GET_ALL_TUTORIAL_FAILED,
  props<IErrorResponse>()
);

// Create todo
export const addTodoPending = createAction(
  ADD_TUTORIAL_PENDING,
  props<ITutorial>()
);

export const addTodoSuccess = createAction(
  ADD_TUTORIAL_SUCCESS,
  props<ITutorial>()
);

export const addTodoFailed = createAction(
  ADD_TUTORIAL_FAILED,
  props<IErrorResponse>()
);

// Update todo
export const updateTodoPending = createAction(
  UPDATE_TUTORIAL_PENDING,
  props<ITutorial>()
);

export const updateTodoSuccess = createAction(
  UPDATE_TUTORIAL_SUCCESS,
  props<ITutorial>()
);

export const updateTodoFailed = createAction(
  UPDATE_TUTORIAL_FAILED,
  props<IErrorResponse>()
);

// Delete todo
export const deleteTodoPending = createAction(
  REMOVE_TUTORIAL_PENDING,
  props<{ id: number }>()
);

export const deleteTodoSuccess = createAction(
  REMOVE_TUTORIAL_SUCCESS,
  props<{ id: number }>()
);

export const deleteTodoFailed = createAction(
  REMOVE_TUTORIAL_FAILED,
  props<IErrorResponse>()
);
