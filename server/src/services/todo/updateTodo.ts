import { getTodoById } from "./../../repositories/todo/getTodo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";
import { updateTodo } from "../../repositories/todo/updateTodo";

export const updateTodoService = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { id, userId, name, is_completed } = input;

    const todoMatch = await getTodoById({ userId, id });
    if (!todoMatch.result) {
        return {
            result: false,
            errorMessage: todoMatch.errorMessage,
        };
    }

    const updateResponse = await updateTodo({ id, name, is_completed });
    if (!updateResponse.result) {
        return {
            result: false,
            errorMessage: updateResponse.errorMessage,
        };
    }

    return {
        result: true,
    };
};
