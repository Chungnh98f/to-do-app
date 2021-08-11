import { deleteTodo } from "../../repositories/todo/deleteTodo";
import { getTodoById } from "../../repositories/todo/getTodo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const deleteTodoService = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { userId, id } = input;

    const todoMatch = await getTodoById({ userId, id });
    if (!todoMatch.result) {
        return {
            result: false,
            errorMessage: todoMatch.errorMessage,
        };
    }

    const deleteResponse = await deleteTodo({ id });
    if (!deleteResponse.result) {
        return {
            result: false,
            errorMessage: deleteResponse.errorMessage,
        };
    }

    return {
        result: true,
    };
};
