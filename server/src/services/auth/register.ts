import { IRegisterInput } from "./../../models/RegisterInput";
import { IResponse } from "../../models/Response";
import { createUser } from "./../../repositories/user/createUser";

export const registerService = async (
    input: IRegisterInput
): Promise<IResponse> => {
    const { username, password, name,is_admin } = input;

    const userResponse = await createUser({ username, password, name,is_admin });

    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }

    return {
        result: true,
    };
};
