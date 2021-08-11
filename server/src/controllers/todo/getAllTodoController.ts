import { getAllTodoService } from "./../../services/todo/getAllTodo";
import { Request, Response } from "express";

export const getAllTodoController = async (_: Request, res: Response) => {
    const userId = res.locals.jwtPayload.id;

    const response = await getAllTodoService({ userId });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json({
        data: response.data,
    });
};
