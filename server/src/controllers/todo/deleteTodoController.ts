import { Request, Response } from "express";
import { deleteTodoService } from "../../services/todo/deleteTodo";

export const deleteTodoController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = res.locals.jwtPayload.id;
    if (!id || typeof id !== "number") {
        return res.status(400).send({ message: "Invalid id" });
    }

    const response = await deleteTodoService({ userId, id });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.send({ message: "Delete successfully" });
};
