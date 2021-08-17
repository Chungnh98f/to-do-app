import { IRegisterInput } from "../models/RegisterInput";
import { IResponse } from "../models/Response";

export const validateRegister = (input: IRegisterInput): IResponse => {
    const { username, password, name, is_admin } = input;

    if (!name || name.length < 2) {
        return {
            result: false,
            errorMessage: "Invalid name",
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
