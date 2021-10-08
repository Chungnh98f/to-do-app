import { Request, Response } from "express";
import { authMeService } from "./../../services/auth/me";

export const authMeController = async (_: Request, res: Response) => {
    const userId = res.locals.jwtPayload.id;

    const response = await authMeService(Number(userId));
    if (!response.result) {
        return res.status(401).send({
            message: response.errorMessage,
        });
    }

    return res.json({
        data: {
            email: response.user?.email,
            username: response.user?.username,
            is_admin: response.user?.is_admin,
            id: response.user?.id,
        },
    });
};
