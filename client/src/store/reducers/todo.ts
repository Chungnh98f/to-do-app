import {
    ADMIN_GET_ALL_TODO_ACTION,
    CREATE_TODO_ACTION,
    DELETE_TODO_ACTION,
    GET_ALL_TODO_ACTION,
    UPDATE_TODO_ACTION,
} from "./../action/todo/action";
import { IActionType, ITodoState } from "./../interface";

export const initTodoState: ITodoState = {
    pending: false,
    userTodos: [],
    allTodos: [],
};

export const todoReducer = (
    state = initTodoState,
    action: IActionType
): ITodoState => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_TODO_ACTION.CREATE_TODO_PENDING:
        case GET_ALL_TODO_ACTION.GET_ALL_TODO_PENDING:
        case ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_PENDING:
        case UPDATE_TODO_ACTION.UPDATE_TODO_PENDING:
        case DELETE_TODO_ACTION.DELETE_TODO_PENDING:
            return {
                ...state,
                pending: true,
            };
        case CREATE_TODO_ACTION.CREATE_TODO_FAILURE:
        case GET_ALL_TODO_ACTION.GET_ALL_TODO_FAILURE:
        case ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_FAILURE:
        case UPDATE_TODO_ACTION.UPDATE_TODO_FAILURE:
        case DELETE_TODO_ACTION.DELETE_TODO_FAILURE:
        case CREATE_TODO_ACTION.CREATE_TODO_SUCCESS:
        case UPDATE_TODO_ACTION.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                pending: false,
            };

        case GET_ALL_TODO_ACTION.GET_ALL_TODO_SUCCESS:
            return {
                ...state,
                pending: false,
                userTodos: payload,
            };
        case ADMIN_GET_ALL_TODO_ACTION.ADMIN_GET_ALL_TODO_SUCCESS:
            return {
                ...state,
                pending: false,
                allTodos: payload,
            };
        case DELETE_TODO_ACTION.DELETE_TODO_SUCCESS:
            return {
                pending: false,
                userTodos: [...state.userTodos].filter(
                    (todo) => todo.id !== payload
                ),
                allTodos: [...state.allTodos].filter(
                    (todo) => todo.id !== payload
                ),
            };

        default:
            return state;
    }
};
