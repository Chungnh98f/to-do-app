import { createTodo } from "./../../repositories/todo/createTodo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const createTodoService = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { userId, name, content, type } = input;

    const response = await createTodo({ userId, name, content, type });
    if (!response.result) {
        return {
            result: response.result,
            errorMessage: response.errorMessage,
        };
    }

    return {
        result: true,
        data: response.data,
    };
};
