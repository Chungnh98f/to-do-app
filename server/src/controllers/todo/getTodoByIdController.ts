import { getTodoByIdService } from "./../../services/todo/getTodoById";
import { Request, Response } from "express";

export const getTodoByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = res.locals.jwtPayload.id;
    if (!id || typeof id !== "number") {
        return res.status(400).send({ message: "Invalid id" });
    }

    const response = await getTodoByIdService({ id, userId });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json({
        data: response.data,
    });
};
