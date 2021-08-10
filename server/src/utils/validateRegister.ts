import { IRegisterInput } from "../models/RegisterInput";
import { IValidationResponse } from "../models/ValidationResponse";
import { validateEmail } from "./validateEmail";

export const validateRegister = (
    input: IRegisterInput
): IValidationResponse => {
    const { username, password, email } = input;

    if (!validateEmail(email)) {
        return {
            result: false,
            errorMessage: "Invalid email",
        };
    }

    if (!username || username.length < 6) {
        return {
            result: false,
            errorMessage: "Invalid username",
        };
    }

    if (!password || password.length < 6) {
        return {
            result: false,
            errorMessage: "Invalid password",
        };
    }

    return {
        result: true,
    };
};
