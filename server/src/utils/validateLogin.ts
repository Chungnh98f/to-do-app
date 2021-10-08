import { IResponse } from "../models/Response";
import { ILoginInput } from "../models/LoginInput";

export const validateLogin = (input: ILoginInput): IResponse => {
    const { email, password } = input;

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
        return {
            result: false,
            errorMessage: "Invalid email",
        };
    }

    if (!password || password.length < 5) {
        return {
            result: false,
            errorMessage: "Invalid password",
        };
    }

    return {
        result: true,
    };
};
