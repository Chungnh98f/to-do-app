import { generateRefreshToken } from "./../../utils/generateRefreshToken";
import { User } from "../../entities/User";
import { ILoginResult } from "../../models/LoginResult";
import { redis } from "../../utils/initRedis";
import {
    accessTokenLabel,
    redisLoginDurationTime,
    redisRefresherTokenDurationTime,
    refreshTokenLabel,
} from "./../../constants";
import { generateAccessToken } from "./../../utils/generateAccessToken";

export const refreshTokenService = (user: User): ILoginResult => {
    const accessToken = generateAccessToken({
        username: user.username,
        id: user.id,
    });

    const refreshToken = generateRefreshToken({
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

    redis.set(
        user.username + refreshTokenLabel,
        refreshToken,
        "EX",
        redisRefresherTokenDurationTime,
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
        refreshToken,
    };
};
