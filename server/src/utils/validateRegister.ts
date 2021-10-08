import { IRegisterInput } from "../models/RegisterInput";
import { IResponse } from "../models/Response";

export const validateRegister = (input: IRegisterInput): IResponse => {
    const { username, password, email, is_admin } = input;

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
        return {
            result: false,
            errorMessage: "Invalid email",
        };
    }

    if (!username || username.length < 5) {
        return {
            result: false,
            errorMessage: "Invalid username",
        };
    }

    if (!password || password.length < 5) {
        return {
            result: false,
            errorMessage: "Invalid password",
        };
    }

    if (typeof is_admin !== "boolean") {
        return {
            result: false,
            errorMessage: "Invalid role",
        };
    }

    return {
        result: true,
    };
};
