import { updateTodoService } from "./../../services/todo/updateTodo";
import { Request, Response } from "express";

export const updateTodoController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = res.locals.jwtPayload.id;
    const { name, is_completed } = req.body;
    if (
        !id ||
        typeof id !== "number" ||
        !name ||
        typeof is_completed !== "boolean"
    ) {
        return res.status(400).send({ message: "Invalid value" });
    }

    const response = await updateTodoService({
        userId,
        id,
        name,
        is_completed,
    });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.send({ message: "Updated successfully" });
};
