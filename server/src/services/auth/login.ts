import { ILoginResult } from "../../models/LoginResult";
import { validateUser } from "../../repositories/user/validateUser";
import { redis } from "../../utils/initRedis";
import {
    accessTokenLabel,
    redisLoginDurationTime,
    redisRefresherTokenDurationTime,
    refreshTokenLabel
} from "./../../constants";
import { ILoginInput } from "./../../models/LoginInput";
import { generateAccessToken } from "./../../utils/generateAccessToken";
import { generateRefreshToken } from "./../../utils/generateRefreshToken";

export const loginService = async (
    input: ILoginInput
): Promise<ILoginResult> => {
    const { username, password } = input;

    let userResponse = await validateUser({ username, password });
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }


    const accessToken = generateAccessToken({
        username,
        id: userResponse.user!.id,
    });

    const refreshToken = generateRefreshToken({
        username,
        id: userResponse.user!.id,
    });

    redis.set(
        username + accessTokenLabel,
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
        username + refreshTokenLabel,
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
