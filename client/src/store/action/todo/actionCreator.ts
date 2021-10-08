import {
    ADMIN_GET_ALL_TODO_ACTION,
    CREATE_TODO_ACTION,
    DELETE_TODO_ACTION,
    GET_ALL_TODO_ACTION,
    UPDATE_TODO_ACTION,
} from "./action";

export function createTodoPending() {
    return {
        type: CREATE_TODO_ACTION.CREATE_TODO_PENDING,
    };
}

export function createTodoSuccess() {
    return {
        type: CREATE_TODO_ACTION.CREATE_TODO_SUCCESS,
    };
}

export function createTodoFailure(err: string) {
    return {
        type: CREATE_TODO_ACTION.CREATE_TODO_FAILURE,
        payload: err,
    };
}

export function getAllTodoPending() {
    return {
        type: GET_ALL_TODO_ACTION.GET_ALL_TODO_PENDING,
    };
}

export function getAllTodoSuccess(payload: any) {
    return {
        type: GET_ALL_TODO_ACTION.GET_ALL_TODO_SUCCESS,
        payload,
    };
}

export function getAllTodoFailure(err: string) {
    return {
        type: GET_ALL_TODO_ACTION.GET_ALL_TODO_FAILURE,
        payload: err,
    };
}

export function adminGetAllTodoPending() {
    return {
        type: ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_PENDING,
    };
}

export function adminGetAllTodoSuccess(payload: any) {
    return {
        type: ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_SUCCESS,
        payload,
    };
}

export function adminGetAllTodoFailure(err: string) {
    return {
        type: ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_FAILURE,
        payload: err,
    };
}

export function updateTodoPending() {
    return {
        type: UPDATE_TODO_ACTION.UPDATE_TODO_PENDING,
    };
}

export function updateTodoSuccess() {
    return {
        type: UPDATE_TODO_ACTION.UPDATE_TODO_SUCCESS,
    };
}

export function updateTodoFailure(err: string) {
    return {
        type: UPDATE_TODO_ACTION.UPDATE_TODO_FAILURE,
        payload: err,
    };
}

export function deleteTodoPending() {
    return {
        type: DELETE_TODO_ACTION.DELETE_TODO_PENDING,
    };
}

export function deleteTodoSuccess(id: number) {
    return {
        type: DELETE_TODO_ACTION.DELETE_TODO_SUCCESS,
        payload: id,
    };
}

export function deleteTodoFailure(err: string) {
    return {
        type: DELETE_TODO_ACTION.DELETE_TODO_FAILURE,
        payload: err,
    };
}
