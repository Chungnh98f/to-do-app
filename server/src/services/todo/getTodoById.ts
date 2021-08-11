import { ITodoResponse } from "./../../models/TodoResponse";
import { getTodoById } from "./../../repositories/todo/getTodo";
import { ITodoInput } from "./../../models/TodoInput";

export const getTodoByIdService = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { userId, id } = input;

    const response = await getTodoById({ userId, id });
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
