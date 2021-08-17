import { accessTokenLabel } from "./../constants";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { redis } from "../utils/initRedis";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = <string>req.headers["authorization"] || "";
    if (!authHeader) {
        res.status(401).send({ message: "Token required" });
        return;
    }
    const token = authHeader.split(" ")[1];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        res.status(401).send({ message: err });
        return;
    }

    redis.get(jwtPayload.username + accessTokenLabel, (err, data) => {
        if (!data || data !== token) {
            return res.status(401).send({ message: err });
        }

        next();
        return;
    });
};
