import * as jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { ILoginResult } from "../../models/LoginResult";
import { redis } from "../../utils/initRedis";
import {
    accessTokenLabel,
    redisLoginDurationTime
} from "./../../constants";
import { generateAccessToken } from "./../../utils/generateAccessToken";

export const refreshTokenService = (token: string): ILoginResult => {
    let user: User;

    try {
        user = <any>jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
        return { result: false, errorMessage: err };
    }

    const accessToken = generateAccessToken({
        username: user.username,
        id: user.id,
    });

    redis.set(
        user.username + accessTokenLabel,
        accessToken,
        "EX",
        redisLoginDurationTime,
        (err, _) => {
            return {
                result: false,
                errorMessage: err,
            };
        }
    );

    return {
        result: true,
        accessToken,
    };
};
