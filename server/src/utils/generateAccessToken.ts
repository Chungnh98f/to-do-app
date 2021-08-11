import { loginDurationTime } from './../constants';
import * as jwt from "jsonwebtoken";

export const generateAccessToken = (user: Object) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: loginDurationTime,
    });
};
