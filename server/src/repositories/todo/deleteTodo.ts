import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const deleteTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { id } = input;

    try {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Todo)
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
