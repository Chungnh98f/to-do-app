import { Request, Response } from "express";
import { updateTypeService } from "../../services/type/updateType";

export const updateTypeController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!id || typeof id !== "number" || !name) {
        return res.status(400).send({ message: "Invalid value" });
    }

    const response = await updateTypeService({
        id,
        name,
    });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.send({ message: "Updated successfully" });
};
