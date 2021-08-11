import { refreshTokenService } from "./../../services/auth/refreshToken";
import { Request, Response } from "express";

export const refreshTokenController = (req: Request, res: Response) => {
    const { refresherToken } = req.body;

    const response = refreshTokenService(refresherToken);

    if (!response.result) {
        return res.status(401).send({ message: response.errorMessage });
    }

    return res.json({ accessToken: response.accessToken });
};
