import { createTodoService } from "./../../services/todo/createTodo";
import { Request, Response } from "express";

export const createTodoController = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.id;
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ message: "Invalid todo" });
    }

    const response = await createTodoService({ userId, name });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json("Created todo successfully");
};
