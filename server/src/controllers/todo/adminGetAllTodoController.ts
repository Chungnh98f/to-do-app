import { getAllTodoService } from "./../../services/todo/getAllTodo";
import { Request, Response } from "express";

export const adminGetAllTodoController = async (
    _: Request,
    res: Response
) => {
    const response = await getAllTodoService({});
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json({
        data: response.data,
    });
};
