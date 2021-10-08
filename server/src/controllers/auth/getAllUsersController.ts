import { Request, Response } from "express";
import { getAllUsersService } from "./../../services/auth/getAllUsers";

export const getAllUsersController = async (_: Request, res: Response) => {
    const response = await getAllUsersService();

    if (!response.result) {
        return res.status(401).send({ message: response.errorMessage });
    }

    return res.json({
        data: {
            users: response.users,
        },
    });
};
