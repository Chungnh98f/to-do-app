import { Request, Response } from "express";
import { getAllTypeService } from "../../services/type/getAllType";

export const getAllTypeController = async (_: Request, res: Response) => {
    const response = await getAllTypeService();
    if (!response.result) {
        return res.status(400).send({ message: response.errorMessage });
    }

    return res.json({
        data: response.data,
    });
};
