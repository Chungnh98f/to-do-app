import { createTypeService } from "./../../services/type/createType";
import { Request, Response } from "express";

export const createTypeController = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ message: "Invalid type" });
    }

    const response = await createTypeService({ name });
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json({
        message: "Created type successfully",
        data: response.data,
    });
};
