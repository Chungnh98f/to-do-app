import { IValidationResponse } from "../models/ValidationResponse";
import { ILoginInput } from "../models/LoginInput";

export const validateLogin = (input: ILoginInput): IValidationResponse => {
    const { username, password } = input;
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

    return {
        result: true,
    };
};
