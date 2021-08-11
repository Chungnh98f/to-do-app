import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";
import { getUserById } from "./../user/getUserById";

export const createTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { name, userId } = input;
    const userResponse = await getUserById(userId!);
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }

    let todo = new Todo();
    todo.name = name!;
    todo.is_completed = false;
    todo.user = userResponse.user!;

    try {
        await getConnection().getRepository(Todo).save(todo);
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
        data: todo,
    };
};
