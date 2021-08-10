import { loginDurationTime } from "./../../constants";
import { ILoginResult } from "../../models/LoginResult";
import { ILoginInput } from "./../../models/LoginInput";
import * as jwt from "jsonwebtoken";

export const loginService = (input: ILoginInput): ILoginResult => {
    const { username, password } = input;

    const accessToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: loginDurationTime }
    );

    const refreshToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET!
    );

    return {
        result: true,
        accessToken,
        refreshToken,
    };
};
