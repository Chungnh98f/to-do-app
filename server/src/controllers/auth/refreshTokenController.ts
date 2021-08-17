import { Request, Response } from "express";
import { refreshTokenService } from "./../../services/auth/refreshToken";

export const refreshTokenController = (_: Request, res: Response) => {
    const user = res.locals.jwtPayload;

    const response = refreshTokenService(user);

    if (!response.result) {
        return res.status(401).send({ message: response.errorMessage });
    }

    return res.json({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
    });
};
