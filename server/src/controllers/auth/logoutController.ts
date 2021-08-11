import { Request, Response } from "express";
import { logoutService } from "./../../services/auth/logout";

export const logoutController = async (_: Request, res: Response) => {
    const { username } = res.locals.jwtPayload;

    const logoutResponse = logoutService(username);

    if (!logoutResponse.result) {
        return res.status(403).send({ message: logoutResponse.errorMessage });
    }

    return res.status(204).send({ message: "Log out successful" });
};
