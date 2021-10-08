import { Dispatch } from "react";
import {
    adminGetAllTodoFailure,
    adminGetAllTodoPending,
    adminGetAllTodoSuccess,
    createTodoFailure,
    createTodoPending,
    createTodoSuccess,
    deleteTodoFailure,
    deleteTodoPending,
    deleteTodoSuccess,
    getAllTodoFailure,
    getAllTodoPending,
    getAllTodoSuccess,
    updateTodoFailure,
    updateTodoPending,
    updateTodoSuccess,
} from "../action/todo/actionCreator";

import {
    adminGetAllTodoEffect,
    createTodoEffect,
    deleteTodoEffect,
    getAllTodoEffect,
    updateTodoEffect,
} from "../effect/todo";
import { IActionType, ITodoInput } from "../interface";

export const createTodo = async (
    dispatch: Dispatch<IActionType>,
    data: ITodoInput
) => {
    dispatch(createTodoPending());
    const res: any = await createTodoEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        dispatch(createTodoSuccess());
        return {
            result: true,
            message: notification || "Create Todo Successfully",
            data,
        };
    }
    dispatch(createTodoFailure(notification));
    return {
        result: false,
        message: notification || "Cannot Create Todo",
    };
};

export const getAllTodo = async (dispatch: Dispatch<IActionType>) => {
    dispatch(getAllTodoPending());
    const res: any = await getAllTodoEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const todos = res.data.data;
        dispatch(getAllTodoSuccess(todos || []));
        return {
            result: true,
            message: notification || "Get all todos",
        };
    }
    dispatch(getAllTodoFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const adminGetAllTodo = async (dispatch: Dispatch<IActionType>) => {
    dispatch(adminGetAllTodoPending());
    const res: any = await adminGetAllTodoEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const todos = res.data?.data;
        dispatch(adminGetAllTodoSuccess(todos || []));
        return {
            result: true,
            message: notification || "Get all todos",
        };
    }
    dispatch(adminGetAllTodoFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something went wrong",
    };
};

export const updateTodo = async (
    dispatch: Dispatch<IActionType>,
    data: ITodoInput
) => {
    dispatch(updateTodoPending());
    const res: any = await updateTodoEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(updateTodoSuccess());
        return {
            result: true,
            message: notification || "Update todo successful",
        };
    }
    dispatch(updateTodoFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const deleteTodo = async (
    dispatch: Dispatch<IActionType>,
    id: number
) => {
    dispatch(deleteTodoPending());
    const res: any = await deleteTodoEffect(id);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(deleteTodoSuccess(id));
        return {
            result: true,
            message: notification || "Delete todo Successfully",
        };
    }
    dispatch(deleteTodoFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something went wrong",
    };
};
