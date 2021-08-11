import { getAllTodo } from "./../../repositories/todo/getAllTodo";
import { ITodoResponse } from "./../../models/TodoResponse";
import { ITodoInput } from "./../../models/TodoInput";

export const getAllTodoService = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { userId } = input;

    const response = await getAllTodo({ userId });
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
