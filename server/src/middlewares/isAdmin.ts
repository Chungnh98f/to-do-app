import { getUserById } from "./../repositories/user/getUserById";
import { Request, Response, NextFunction } from "express";

export const isAdmin = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    const id = res.locals.jwtPayload.id;

    const userResponse = await getUserById(id);
    if (!userResponse.result) {
        return res.status(401).send({ message: userResponse.errorMessage });
    }

    if (userResponse.user!.is_admin) {
        next();
        return;
    }
    return res.status(403).send({ message: "You're not admin" });
};
