import { getTypeById } from "./../type/getTypeById";
import { getConnection } from "typeorm";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";
import { getUserById } from "./../user/getUserById";

export const createTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { userId, name, content, type } = input;
    const userResponse = await getUserById(userId!);
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }

    const typeResponse = await getTypeById(type!);
    if (!typeResponse.result) {
        return {
            result: false,
            errorMessage: typeResponse.errorMessage,
        };
    }

    const todo = new Todo();
    todo.name = name!;
    todo.content = content!;
    todo.is_completed = false;
    todo.user = userResponse.user!;
    todo.type = typeResponse.data!;

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
