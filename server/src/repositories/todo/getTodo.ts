import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const getTodoById = async (
    input: ITodoInput
): Promise<ITodoResponse> => {
    const { id, userId } = input;
    let todo: Todo | undefined;

    try {
        if (userId) {
            todo = await getConnection()
                .getRepository(Todo)
                .createQueryBuilder("todo")
                .leftJoinAndSelect("todo.user", "user")
                .leftJoinAndSelect("todo.type", "type")
                .where("user.id = :userId", { userId })
                .andWhere("todo.id = :id", { id })
                .getOne();
        } else {
            todo = await getConnection()
                .getRepository(Todo)
                .createQueryBuilder("todo")
                .leftJoinAndSelect("todo.user", "user")
                .leftJoinAndSelect("todo.type", "type")
                .where("todo.id = :id", { id })
                .getOne();
        }
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    if (!todo) {
        return {
            result: false,
            errorMessage: "Not found",
        };
    }

    return {
        result: true,
        data: todo,
    };
};
