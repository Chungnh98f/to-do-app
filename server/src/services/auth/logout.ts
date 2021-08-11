import { redis } from "../../utils/initRedis";
import { accessTokenLabel, refreshTokenLabel } from "./../../constants";
import { IResponse } from "../../models/Response";

export const logoutService = (username: string): IResponse => {
    let result: IResponse = { result: true };

    redis.del(
        username + accessTokenLabel,
        username + refreshTokenLabel,
        (err, _) => {
            if (err) {
                result = {
                    result: false,
                    errorMessage: err.toString(),
                };
            }
        }
    );

    return result;
};
