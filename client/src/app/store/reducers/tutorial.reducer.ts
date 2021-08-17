import {
  getAllTodoSuccess,
  getAllTodoFailed,
  getAllTodoPending,
  addTodoPending,
  addTodoFailed,
  addTodoSuccess,
  updateTodoFailed,
  updateTodoSuccess,
  updateTodoPending,
  deleteTodoPending,
  deleteTodoSuccess,
  deleteTodoFailed,
} from './../actions/tutorial.actions';
import { createReducer, on } from '@ngrx/store';
import { ITodoState } from './../../interface/todo.interface';

const todoInitialState: ITodoState = {
  pending: false,
  todos: [],
};

export const todoReducer = createReducer(
  todoInitialState,
  // Get all todos
  on(getAllTodoPending, (state, _) => ({ ...state, pending: true })),
  on(getAllTodoSuccess, (state, payload) => ({
    ...state,
    pending: false,
    todos: [...payload.todos],
  })),
  on(getAllTodoFailed, (state, _) => ({ ...state, pending: false, todo: [] })),
  // Create todo
  on(addTodoPending, (state, _) => ({ ...state, pending: true })),
  on(addTodoSuccess, (state, payload) => ({
    ...state,
    pending: false,
    todos: [...state.todos, payload],
  })),
  on(addTodoFailed, (state, _) => ({ ...state, pending: false })),
  // Update todo
  on(updateTodoPending, (state, _) => ({ ...state, pending: true })),
  on(updateTodoSuccess, (state, payload) => ({
    ...state,
    pending: false,
    todos: state.todos.map((todo) => {
      if (todo.id !== payload.id) return todo;
      return payload;
    }),
  })),
  on(updateTodoFailed, (state, _) => ({ ...state, pending: false })),
  // Delete todo
  on(deleteTodoPending, (state, _) => ({ ...state, pending: true })),
  on(deleteTodoSuccess, (state, payload) => ({
    ...state,
    pending: false,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  })),
  on(deleteTodoFailed, (state, _) => ({ ...state, pending: false }))
);
