import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const getAllTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { userId } = input;
    let todos: any[];

    try {
        if (userId) {
            todos = await getConnection()
                .getRepository(Todo)
                .createQueryBuilder("todo")
                .leftJoinAndSelect("todo.user", "user")
                .leftJoinAndSelect("todo.type", "type")
                .where("user.id = :id", { id: userId })
                .orderBy("updated_at", "DESC")
                .getMany();
        } else {
            todos = await getConnection()
                .getRepository(Todo)
                .createQueryBuilder("todo")
                .leftJoinAndSelect("todo.user", "user")
                .leftJoinAndSelect("todo.type", "type")
                .orderBy("updated_at", "DESC")
                .getMany();
        }
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    if (!todos) {
        return {
            result: true,
            data: [],
        };
    }

    return {
        result: true,
        data: todos,
    };
};
