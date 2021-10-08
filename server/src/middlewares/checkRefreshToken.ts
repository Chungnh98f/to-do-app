import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { redis } from "../utils/initRedis";
import { refreshTokenLabel } from "./../constants";

export const checkRefreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.body;
    let jwtPayload;

    try {
        console.log(process.env.REFRESH_TOKEN_SECRET);
        jwtPayload = <any>(
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
        );
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        res.status(401).send({ message: err });
        return;
    }

    redis.get(jwtPayload.email + refreshTokenLabel, (err, data) => {
        if (!data || data !== refreshToken) {
            return res.status(401).send({ message: err });
        }

        next();
        return;
    });
};
