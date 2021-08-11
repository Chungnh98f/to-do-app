import { refresherTokenDurationTime } from "./../constants";
import * as jwt from "jsonwebtoken";

export const generateRefreshToken = (user: Object) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: refresherTokenDurationTime,
    });
};
