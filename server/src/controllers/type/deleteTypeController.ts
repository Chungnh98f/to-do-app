import { Request, Response } from "express";
import { deleteTypeService } from "../../services/type/deleteType";

export const deleteTypeController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== "number") {
        return res.status(400).send({ message: "Invalid id" });
    }

    const response = await deleteTypeService(id);
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.send({ message: "Delete successfully" });
};
