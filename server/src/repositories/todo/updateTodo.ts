import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const updateTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { id, name, is_completed } = input;

    try {
        await getConnection()
            .createQueryBuilder()
            .update(Todo)
            .set({ name, is_completed })
            .where("id = :id", { id })
            .execute();
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
    };
};
