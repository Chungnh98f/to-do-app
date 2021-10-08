import { getConnection } from "typeorm";
import { getTypeById } from "../type/getTypeById";
import { Todo } from "./../../entities/Todo";
import { ITodoInput } from "./../../models/TodoInput";
import { ITodoResponse } from "./../../models/TodoResponse";

export const updateTodo = async (input: ITodoInput): Promise<ITodoResponse> => {
    const { id, name, is_completed, content, type } = input;

    const todoRepository = getConnection().getRepository(Todo);

    try {
        const todo = await todoRepository.findOne(id);
        if (!todo) {
            return {
                result: false,
                errorMessage: "Todo not found",
            };
        }

        const typeResponse = await getTypeById(type!);
        if (!typeResponse.result) {
            return {
                result: false,
                errorMessage: typeResponse.errorMessage,
            };
        }

        todo.content = content!;
        todo.name = name!;
        todo.is_completed = is_completed!;
        todo.type = typeResponse.data!;

        await todoRepository.save(todo);
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
