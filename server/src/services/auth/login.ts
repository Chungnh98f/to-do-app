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
    const { email, password } = input;

    let userResponse = await validateUser({ email, password });
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }


    const accessToken = generateAccessToken({
        email,
        id: userResponse.user!.id,
    });

    const refreshToken = generateRefreshToken({
        email,
        id: userResponse.user!.id,
    });

    redis.set(
        email + accessTokenLabel,
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
        email + refreshTokenLabel,
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
